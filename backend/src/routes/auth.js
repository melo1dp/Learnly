import { Router } from "express";
import bcrypt from "bcryptjs";
import db from "../db/connection.js";
import { signToken, requireAuth } from "../middleware/auth.js";

const router = Router();

const insertUser = db.prepare(
  "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
);
const findUserByEmail = db.prepare(
  "SELECT id, name, email, password_hash, role FROM users WHERE email = ?",
);
const findUserById = db.prepare(
  "SELECT id, name, email, role FROM users WHERE id = ?",
);

function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

function publicUser(row) {
  return { id: row.id, name: row.name, email: row.email, role: row.role };
}

// POST /api/auth/register  { name, email, password, role? }
router.post("/register", (req, res, next) => {
  try {
    const { name, email, password, role } = req.body || {};
    const trimmedName = String(name || "").trim();
    const normalizedEmail = normalizeEmail(email);

    if (!trimmedName || !normalizedEmail || !password) {
      return res
        .status(400)
        .json({ error: "name, email and password are required" });
    }

    if (findUserByEmail.get(normalizedEmail)) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const wantedRole = role === "instructor" ? "instructor" : "student";
    const passwordHash = bcrypt.hashSync(password, 10);
    const info = insertUser.run(
      trimmedName,
      normalizedEmail,
      passwordHash,
      wantedRole,
    );
    const user = findUserById.get(info.lastInsertRowid);

    res.status(201).json({ token: signToken(user), user });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login  { email, password }
router.post("/login", (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const row = findUserByEmail.get(normalizedEmail);
    if (!row || !bcrypt.compareSync(password, row.password_hash)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = publicUser(row);
    res.json({ token: signToken(user), user });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me  — who am I (requires token)
router.get("/me", requireAuth, (req, res, next) => {
  try {
    const user = findUserById.get(req.user.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

export default router;
