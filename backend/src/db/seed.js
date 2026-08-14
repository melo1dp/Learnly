// Rebuilds the database from schema.sql and fills it with the demo curriculum.
// Run with: npm run db:reset  (from repo root or the backend workspace)
//
// The curriculum itself lives in ./content — this file only inserts it.

import "dotenv/config";
import bcrypt from 'bcryptjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import pool from './connection.js';
import { courses } from './content/index.js';
import { flattenCourse, shuffleQuestion, validateCourse } from './content/schema.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  // 0. This script's first act is DROP TABLE against whatever DATABASE_URL
  //    happens to be in the environment. That is the intended behaviour locally
  //    and a catastrophe against a live database, so production needs the
  //    destruction to be asked for explicitly.
  if (process.env.NODE_ENV === "production" && process.env.CONFIRM_DB_RESET !== "yes") {
    console.error(
      "Refusing to reset the database with NODE_ENV=production.\n" +
        "This drops every table, including all registered users and their quiz history.\n" +
        "If that is genuinely what you want, re-run with CONFIRM_DB_RESET=yes.",
    );
    process.exit(1);
  }

  // 1. Check the curriculum BEFORE touching the database, so a bad course can't
  //    leave us with a half-dropped schema.
  const problems = courses.flatMap(validateCourse);
  if (problems.length) {
    console.error('Curriculum is invalid — nothing was written:\n');
    for (const p of problems) console.error(`  • ${p}`);
    process.exit(1);
  }

  console.log('Resetting database...');

  // 2. Take the same advisory lock initDb() uses, and hold it for the whole
  //    reset. This script opens with DROP TABLE, so two overlapping runs — or a
  //    run overlapping a server start-up seed — will happily drop the tables the
  //    other just filled and finish reporting success over an empty database.
  //    The lock serialises them; the second waits rather than interleaving.
  const lock = await pool.connect();
  await lock.query('SELECT pg_advisory_lock(727501)');

  try {
    await seedEverything();
  } finally {
    try {
      await lock.query('SELECT pg_advisory_unlock(727501)');
    } catch {
      /* the connection is closing anyway, which releases the lock */
    }
    lock.release();
  }
}

async function seedEverything() {
  // 2a. Apply schema (drops + recreates every table)
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8');
  await pool.query(schema);

  // 3. Users
  const hash = (pw) => bcrypt.hashSync(pw, 10);
  await pool.query(
    'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)',
    ['Demo Student', 'student@learnly.dev', hash('password123'), 'student'],
  );
  await pool.query(
    'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)',
    ['Demo Instructor', 'instructor@learnly.dev', hash('password123'), 'instructor'],
  );

  // 4. Courses, lessons, quizzes, questions — one transaction: either the whole
  //    curriculum lands or none of it does.
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Inserted a row at a time, the curriculum is ~870 sequential round trips.
    // Against a hosted database that is minutes of latency, and because it all
    // runs in one transaction nothing is visible until it commits — so a slow
    // seed is indistinguishable from a hung one. Batching each course into four
    // multi-row statements takes it to ~52 round trips.
    for (const course of courses) {
      const courseId = (
        await client.query(
          `INSERT INTO courses (title, description, category, level, rating)
           VALUES ($1, $2, $3, $4, $5) RETURNING id`,
          [
            course.title,
            course.description,
            course.category || '',
            course.level || 'beginner',
            course.rating ?? null,
          ],
        )
      ).rows[0].id;

      // flattenCourse assigns position in topic order, easy -> medium -> hard,
      // which is the ordering the adaptation engine walks.
      const lessons = flattenCourse(course);

      // `position` is unique within a course, so it correlates a returned id
      // back to its lesson without relying on multi-row RETURNING order.
      const lessonIdByPosition = new Map(
        (
          await client.query(
            `INSERT INTO lessons (course_id, title, body, topic, difficulty, position)
             SELECT $1, * FROM UNNEST($2::text[], $3::text[], $4::text[], $5::text[], $6::int[])
             RETURNING id, position`,
            [
              courseId,
              lessons.map((l) => l.title),
              lessons.map((l) => l.body),
              lessons.map((l) => l.topic),
              lessons.map((l) => l.difficulty),
              lessons.map((l) => l.position),
            ],
          )
        ).rows.map((r) => [r.position, r.id]),
      );

      const quizIdByLessonId = new Map(
        (
          await client.query(
            `INSERT INTO quizzes (lesson_id, title)
             SELECT * FROM UNNEST($1::int[], $2::text[])
             RETURNING id, lesson_id`,
            [
              lessons.map((l) => lessonIdByPosition.get(l.position)),
              lessons.map((l) => `${l.title} — Quiz`),
            ],
          )
        ).rows.map((r) => [r.lesson_id, r.id]),
      );

      // Shuffled so the correct answer isn't reliably option A — see schema.js.
      const questions = lessons.flatMap((lesson) => {
        const quizId = quizIdByLessonId.get(lessonIdByPosition.get(lesson.position));
        return lesson.questions.map((question) => ({ ...shuffleQuestion(question), quizId }));
      });

      await client.query(
        `INSERT INTO questions (quiz_id, text, options, correct_index, explanation)
         SELECT * FROM UNNEST($1::int[], $2::text[], $3::jsonb[], $4::int[], $5::text[])`,
        [
          questions.map((q) => q.quizId),
          questions.map((q) => q.text),
          questions.map((q) => JSON.stringify(q.options)),
          questions.map((q) => q.correct_index),
          questions.map((q) => q.explanation || ''),
        ],
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }

  const count = async (table) =>
    Number((await pool.query(`SELECT COUNT(*) AS c FROM ${table}`)).rows[0].c);

  const seeded = {
    courses: await count('courses'),
    lessons: await count('lessons'),
    quizzes: await count('quizzes'),
    questions: await count('questions'),
  };

  // Reporting "Seeded 0 courses" and then "Done" reads as success. It is not —
  // it means the curriculum never landed, and the next thing the developer sees
  // is an empty catalogue with no idea why. Fail loudly instead.
  if (seeded.courses === 0 || seeded.lessons === 0) {
    throw new Error(
      `Seed finished but the database is empty (${seeded.courses} courses, ` +
        `${seeded.lessons} lessons). The curriculum defines ${courses.length} courses, ` +
        `so something rolled the writes back — most often a second db:reset running ` +
        `at the same time.`,
    );
  }

  console.log(
    `Seeded ${seeded.courses} courses, ${seeded.lessons} lessons, ` +
      `${seeded.quizzes} quizzes, ${seeded.questions} questions, 2 demo users.`,
  );
  console.log('Done. Login with student@learnly.dev / password123');
}

main()
  .then(() => pool.end())
  .catch(async (err) => {
    console.error(err);
    await pool.end().catch(() => {});
    process.exit(1);
  });
