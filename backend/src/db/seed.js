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
  // 1. Check the curriculum BEFORE touching the database, so a bad course can't
  //    leave us with a half-dropped schema.
  const problems = courses.flatMap(validateCourse);
  if (problems.length) {
    console.error('Curriculum is invalid — nothing was written:\n');
    for (const p of problems) console.error(`  • ${p}`);
    process.exit(1);
  }

  console.log('Resetting database...');

  // 2. Apply schema (drops + recreates every table)
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

    for (const course of courses) {
      const courseId = (
        await client.query(
          'INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING id',
          [course.title, course.description],
        )
      ).rows[0].id;

      // flattenCourse assigns position in topic order, easy -> medium -> hard,
      // which is the ordering the adaptation engine walks.
      for (const lesson of flattenCourse(course)) {
        const lessonId = (
          await client.query(
            `INSERT INTO lessons (course_id, title, body, topic, difficulty, position)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [
              courseId,
              lesson.title,
              lesson.body,
              lesson.topic,
              lesson.difficulty,
              lesson.position,
            ],
          )
        ).rows[0].id;

        const quizId = (
          await client.query(
            'INSERT INTO quizzes (lesson_id, title) VALUES ($1, $2) RETURNING id',
            [lessonId, `${lesson.title} — Quiz`],
          )
        ).rows[0].id;

        for (const question of lesson.questions) {
          // Shuffled so the correct answer isn't reliably option A — see schema.js.
          const q = shuffleQuestion(question);
          await client.query(
            `INSERT INTO questions (quiz_id, text, options, correct_index, explanation)
             VALUES ($1, $2, $3, $4, $5)`,
            [quizId, q.text, JSON.stringify(q.options), q.correct_index, q.explanation || ''],
          );
        }
      }
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
  console.log(
    `Seeded ${await count('courses')} courses, ${await count('lessons')} lessons, ` +
      `${await count('quizzes')} quizzes, ${await count('questions')} questions, 2 demo users.`,
  );
  console.log('Done. Login with student@learnly.dev / password123');

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
