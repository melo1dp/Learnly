import { Pool } from "pg";
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

// Hosted Postgres (e.g. Neon) lives outside the API container's filesystem,
// so the database survives restarts/redeploys — unlike the old SQLite file.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  // Fail fast instead of hanging indefinitely if the network stalls the
  // Postgres wire protocol handshake (seen with some local security software).
  connectionTimeoutMillis: 10_000,
  query_timeout: 20_000,
});

async function seedDemoUsers() {
  console.log("Seeding demo users...");
  const hash = (pw) => bcrypt.hashSync(pw, 10);
  await pool.query(
    "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)",
    ["Demo Student", "student@learnly.dev", hash("password123"), "student"],
  );
  await pool.query(
    "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)",
    ["Demo Instructor", "instructor@learnly.dev", hash("password123"), "instructor"],
  );
}

async function seedCurriculum() {
  const problems = courses.flatMap(validateCourse);
  if (problems.length) {
    throw new Error(
      `Curriculum is invalid — cannot seed database:\n${problems.join("\n")}`,
    );
  }

  console.log("Seeding demo curriculum...");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const course of courses) {
      const courseId = (
        await client.query(
          "INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING id",
          [course.title, course.description],
        )
      ).rows[0].id;

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
            "INSERT INTO quizzes (lesson_id, title) VALUES ($1, $2) RETURNING id",
            [lessonId, `${lesson.title} — Quiz`],
          )
        ).rows[0].id;

        for (const question of lesson.questions) {
          // Shuffled so the correct answer isn't reliably option A — see schema.js.
          const q = shuffleQuestion(question);
          await client.query(
            `INSERT INTO questions (quiz_id, text, options, correct_index)
             VALUES ($1, $2, $3, $4)`,
            [quizId, q.text, JSON.stringify(q.options), q.correct_index],
          );
        }
      }
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function initDb() {
  const tables = await pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
  );
  const exists = tables.rows.some((row) => row.table_name === "users");

  if (!exists) {
    console.log("Initializing Postgres schema...");
    const schema = readFileSync(join(__dirname, "schema.sql"), "utf8");
    await pool.query(schema);
  }

  const userCount = Number(
    (await pool.query("SELECT COUNT(*) AS c FROM users")).rows[0].c,
  );
  if (userCount === 0) {
    await seedDemoUsers();
  }

  const courseCount = Number(
    (await pool.query("SELECT COUNT(*) AS c FROM courses")).rows[0].c,
  );
  if (courseCount === 0) {
    await seedCurriculum();
  }
}

export default pool;
