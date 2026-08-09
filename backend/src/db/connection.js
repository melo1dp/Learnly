import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { courses } from "./content/index.js";
import {
  flattenCourse,
  shuffleQuestion,
  validateCourse,
} from "./content/schema.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Single-file SQLite database living next to the source. Regenerate with `npm run db:reset`.
export const DB_PATH = join(__dirname, "..", "..", "learnly.sqlite");

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

function tableExists(name) {
  return db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get(name);
}

function ensureDatabase() {
  if (!tableExists("users")) {
    console.log("Initializing Learnly database...");
    const schema = readFileSync(join(__dirname, "schema.sql"), "utf8");
    db.exec(schema);
  }

  const userCount = db.prepare("SELECT COUNT(*) AS c FROM users").get().c;
  if (userCount === 0) {
    console.log("Seeding demo content...");

    const problems = courses.flatMap(validateCourse);
    if (problems.length) {
      throw new Error(`Curriculum is invalid: ${problems.join("; ")}`);
    }

    const hash = (pw) => bcrypt.hashSync(pw, 10);
    const insertUser = db.prepare(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
    );
    insertUser.run(
      "Demo Student",
      "student@learnly.dev",
      hash("password123"),
      "student",
    );
    insertUser.run(
      "Demo Instructor",
      "instructor@learnly.dev",
      hash("password123"),
      "instructor",
    );

    const insertCourse = db.prepare(
      "INSERT INTO courses (title, description) VALUES (?, ?)",
    );
    const insertLesson = db.prepare(
      `INSERT INTO lessons (course_id, title, body, topic, difficulty, position)
       VALUES (@course_id, @title, @body, @topic, @difficulty, @position)`,
    );
    const insertQuiz = db.prepare(
      "INSERT INTO quizzes (lesson_id, title) VALUES (?, ?)",
    );
    const insertQuestion = db.prepare(
      `INSERT INTO questions (quiz_id, text, options, correct_index)
       VALUES (@quiz_id, @text, @options, @correct_index)`,
    );

    const seedAll = db.transaction(() => {
      for (const course of courses) {
        const courseId = insertCourse.run(
          course.title,
          course.description,
        ).lastInsertRowid;

        for (const lesson of flattenCourse(course)) {
          const lessonId = insertLesson.run({
            course_id: courseId,
            title: lesson.title,
            body: lesson.body,
            topic: lesson.topic,
            difficulty: lesson.difficulty,
            position: lesson.position,
          }).lastInsertRowid;

          const quizId = insertQuiz.run(
            lessonId,
            `${lesson.title} — Quiz`,
          ).lastInsertRowid;

          for (const question of lesson.questions) {
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
  }
}

ensureDatabase();

export default db;
