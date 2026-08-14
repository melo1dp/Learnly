import { Router } from "express";
import bcrypt from "bcryptjs";
import pool from "../db/connection.js";
import { signToken, requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { isValidEmail, passwordProblem } from "../middleware/validate.js";

const router = Router();

const BCRYPT_ROUNDS = 10;

// Compared against when no user matches, so a wrong email and a wrong password
// cost the same time. `String(email)` used to turn a missing field into the
// literal "undefined" — truthy, and therefore a registerable address.
const DUMMY_HASH = bcrypt.hashSync("unmatchable-placeholder", BCRYPT_ROUNDS);

function normalizeEmail(email) {
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase();
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

// POST /api/auth/register  { name, email, password }
//
// `role` is deliberately NOT read from the body. It used to be, which meant an
// unauthenticated caller could hand themselves the instructor role simply by
// asking for it — making requireRole('instructor') on the authoring routes a
// formality rather than a control. Instructor accounts are provisioned by the
// seeder; promoting a user is a database operation, not a public endpoint.
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body || {};
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail = normalizeEmail(email);

    if (!trimmedName || !normalizedEmail || !password) {
      return res
        .status(400)
        .json({ error: "name, email and password are required" });
    }
    if (trimmedName.length > 100) {
      return res.status(400).json({ error: "Name must be at most 100 characters" });
    }
    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ error: "Enter a valid email address" });
    }
    const pwProblem = passwordProblem(password);
    if (pwProblem) return res.status(400).json({ error: pwProblem });

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    // ON CONFLICT rather than SELECT-then-INSERT: the check and the write are
    // one statement, so two concurrent registrations for the same address can't
    // both pass the check and have the loser surface as a unique-violation 500.
    const inserted = await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, 'student')
       ON CONFLICT (email) DO NOTHING
       RETURNING id, name, email, role, created_at`,
      [trimmedName, normalizedEmail, passwordHash],
    );
    const user = inserted.rows[0];
    if (!user) {
      return res.status(409).json({ error: "Email already registered" });
    }

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

    // Always run the comparison, even with no matching user. Short-circuiting on
    // `!row` returns measurably faster for unknown addresses, which leaks which
    // emails are registered. bcrypt is async here so a burst of login attempts
    // doesn't block the event loop for ~90ms each.
    const matches = await bcrypt.compare(
      typeof password === "string" ? password : "",
      row ? row.password_hash : DUMMY_HASH,
    );
    if (!row || !matches) {
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

// PATCH /api/auth/password  { currentPassword, newPassword }
router.patch(
  "/password",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "currentPassword and newPassword are required" });
    }
    const pwProblem = passwordProblem(newPassword);
    if (pwProblem) {
      return res.status(400).json({ error: pwProblem.replace("Password", "New password") });
    }

    const result = await pool.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [req.user.id],
    );
    const row = result.rows[0];
    const matches =
      row &&
      (await bcrypt.compare(
        typeof currentPassword === "string" ? currentPassword : "",
        row.password_hash,
      ));
    if (!matches) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      passwordHash,
      req.user.id,
    ]);

    res.json({ ok: true });
  }),
);

export default router;
