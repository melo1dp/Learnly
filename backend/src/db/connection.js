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
// Verify the server's TLS certificate. Neon and Supabase both present
// publicly-trusted certificates, so this works out of the box; disabling
// verification (as this used to do unconditionally) means an intercepting proxy
// can read and rewrite every query, including password hashes in transit.
// DATABASE_SSL_INSECURE exists as an escape hatch for a self-signed local
// Postgres — it should never be set against a hosted database.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: process.env.DATABASE_SSL_INSECURE !== "true",
  },
  // Fail fast instead of hanging indefinitely if the network stalls the
  // Postgres wire protocol handshake (seen with some local security software).
  // No query_timeout: initDb()'s pg_advisory_lock() call is meant to block
  // for as long as another instance is mid-seed, and a cold Neon compute can
  // add real latency to the first query — either one legitimately outlasts a
  // short fixed timeout, and killing that wait crashes the process for no
  // real problem.
  connectionTimeoutMillis: 10_000,
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
          `INSERT INTO courses (title, description, category, level, rating)
           VALUES ($1, $2, $3, $4, $5) RETURNING id`,
          [
            course.title,
            course.description,
            course.category || "",
            course.level || "beginner",
            course.rating ?? null,
          ],
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
            `INSERT INTO questions (quiz_id, text, options, correct_index, explanation)
             VALUES ($1, $2, $3, $4, $5)`,
            [quizId, q.text, JSON.stringify(q.options), q.correct_index, q.explanation || ''],
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
  // Serialize startup seeding across concurrent processes (e.g. a leftover
  // dev-server instance plus a fresh `db:reset` run) with a Postgres advisory
  // lock. Without this, two processes can both see an empty table and both
  // seed, producing duplicate rows — the check-then-insert isn't atomic
  // otherwise.
  const client = await pool.connect();
  try {
    await client.query("SELECT pg_advisory_lock(727501)");

    const tables = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
    );
    const exists = tables.rows.some((row) => row.table_name === "users");

    if (!exists) {
      console.log("Initializing Postgres schema...");
      const schema = readFileSync(join(__dirname, "schema.sql"), "utf8");
      await client.query(schema);
    }

    const userCount = Number(
      (await client.query("SELECT COUNT(*) AS c FROM users")).rows[0].c,
    );
    if (userCount === 0) {
      await seedDemoUsers();
    }

    const courseCount = Number(
      (await client.query("SELECT COUNT(*) AS c FROM courses")).rows[0].c,
    );
    if (courseCount === 0) {
      await seedCurriculum();
    }
  } finally {
    // If the block above threw, this client may already be in a failed state and
    // the unlock will throw too — masking the real startup error with a useless
    // one. The lock is released by the connection closing regardless.
    try {
      await client.query("SELECT pg_advisory_unlock(727501)");
    } catch (unlockErr) {
      console.warn("Could not release the seed advisory lock:", unlockErr.message);
    }
    client.release();
  }
}

export default pool;
