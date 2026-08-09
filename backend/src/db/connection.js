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
      console.log("Seeding demo users...");
      const hash = (pw) => bcrypt.hashSync(pw, 10);
      db.prepare(
        "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      ).run(
        "Demo Student",
        "student@learnly.dev",
        hash("password123"),
        "student",
      );
      db.prepare(
        "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      ).run(
        "Demo Instructor",
        "instructor@learnly.dev",
        hash("password123"),
        "instructor",
      );
    }
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}

initializeDatabase();

export default db;
