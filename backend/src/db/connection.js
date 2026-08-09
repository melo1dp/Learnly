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

function seedDemoUsers() {
  console.log("Seeding demo users...");
  const hash = (pw) => bcrypt.hashSync(pw, 10);
  db.prepare(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
  ).run("Demo Student", "student@learnly.dev", hash("password123"), "student");
  db.prepare(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
  ).run(
    "Demo Instructor",
    "instructor@learnly.dev",
    hash("password123"),
    "instructor",
  );
}

function seedCurriculum() {
  const problems = courses.flatMap(validateCourse);
  if (problems.length) {
    throw new Error(
      `Curriculum is invalid — cannot seed database:\n${problems.join("\n")}`,
    );
  }

  console.log("Seeding demo curriculum...");
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

function initializeDatabase() {
  try {
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table'")
      .all();
    const exists = tables.some((row) => row.name === "users");

    if (!exists) {
      console.log("Initializing SQLite schema...");
      const schema = readFileSync(join(__dirname, "schema.sql"), "utf8");
      db.exec(schema);
    }

    const userCount = db.prepare("SELECT COUNT(*) AS c FROM users").get().c;
    if (userCount === 0) {
      seedDemoUsers();
    }

    const courseCount = db.prepare("SELECT COUNT(*) AS c FROM courses").get().c;
    if (courseCount === 0) {
      seedCurriculum();
    }
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}

initializeDatabase();

export default db;
