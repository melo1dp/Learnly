// Rebuilds the database from schema.sql and fills it with the demo curriculum.
// Run with: npm run db:reset  (from repo root or the backend workspace)
//
// The curriculum itself lives in ./content — this file only inserts it.

import bcrypt from 'bcryptjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import db from './connection.js';
import { courses } from './content/index.js';
import { flattenCourse, shuffleQuestion, validateCourse } from './content/schema.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
db.exec(schema);

// 3. Users
const hash = (pw) => bcrypt.hashSync(pw, 10);
const insertUser = db.prepare(
  'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)'
);
insertUser.run('Demo Student', 'student@learnly.dev', hash('password123'), 'student');
insertUser.run('Demo Instructor', 'instructor@learnly.dev', hash('password123'), 'instructor');

// 4. Courses, lessons, quizzes, questions
const insertCourse = db.prepare('INSERT INTO courses (title, description) VALUES (?, ?)');
const insertLesson = db.prepare(
  `INSERT INTO lessons (course_id, title, body, topic, difficulty, position)
   VALUES (@course_id, @title, @body, @topic, @difficulty, @position)`
);
const insertQuiz = db.prepare('INSERT INTO quizzes (lesson_id, title) VALUES (?, ?)');
const insertQuestion = db.prepare(
  `INSERT INTO questions (quiz_id, text, options, correct_index)
   VALUES (@quiz_id, @text, @options, @correct_index)`
);

// One transaction: either the whole curriculum lands or none of it does.
const seedAll = db.transaction(() => {
  for (const course of courses) {
    const courseId = insertCourse.run(course.title, course.description).lastInsertRowid;

    // flattenCourse assigns position in topic order, easy -> medium -> hard,
    // which is the ordering the adaptation engine walks.
    for (const lesson of flattenCourse(course)) {
      const lessonId = insertLesson.run({
        course_id: courseId,
        title: lesson.title,
        body: lesson.body,
        topic: lesson.topic,
        difficulty: lesson.difficulty,
        position: lesson.position,
      }).lastInsertRowid;

      const quizId = insertQuiz.run(lessonId, `${lesson.title} — Quiz`).lastInsertRowid;

      for (const question of lesson.questions) {
        // Shuffled so the correct answer isn't reliably option A — see schema.js.
        const q = shuffleQuestion(question);
        insertQuestion.run({
          quiz_id: quizId,
          text: q.text,
          options: JSON.stringify(q.options),
          correct_index: q.correct_index,
        });
      }
    }
  }
});

seedAll();

const count = (table) => db.prepare(`SELECT COUNT(*) AS c FROM ${table}`).get().c;
console.log(
  `Seeded ${count('courses')} courses, ${count('lessons')} lessons, ` +
    `${count('quizzes')} quizzes, ${count('questions')} questions, 2 demo users.`
);
console.log('Done. Login with student@learnly.dev / password123');
