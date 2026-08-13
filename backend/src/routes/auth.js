import { Router } from "express";
import bcrypt from "bcryptjs";
import pool from "../db/connection.js";
import { signToken, requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

function publicUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    created_at: row.created_at,
  };
}

// POST /api/auth/register  { name, email, password, role? }
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body || {};
    const trimmedName = String(name || "").trim();
    const normalizedEmail = normalizeEmail(email);

    if (!trimmedName || !normalizedEmail || !password) {
      return res
        .status(400)
        .json({ error: "name, email and password are required" });
    }

    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [normalizedEmail],
    );
    if (existing.rows[0]) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const wantedRole = role === "instructor" ? "instructor" : "student";
    const passwordHash = bcrypt.hashSync(password, 10);
    const inserted = await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [trimmedName, normalizedEmail, passwordHash, wantedRole],
    );
    const user = inserted.rows[0];

    res.status(201).json({ token: signToken(user), user });
  }),
);

// POST /api/auth/login  { email, password }
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body || {};
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const result = await pool.query(
      "SELECT id, name, email, password_hash, role, created_at FROM users WHERE email = $1",
      [normalizedEmail],
    );
    const row = result.rows[0];
    if (!row || !bcrypt.compareSync(password, row.password_hash)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = publicUser(row);
    res.json({ token: signToken(user), user });
  }),
);

// GET /api/auth/me  — who am I (requires token)
router.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const result = await pool.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = $1",
      [req.user.id],
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    res.json({ user });
  }),
);

export default router;
