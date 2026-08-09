import { Router } from "express";
import bcrypt from "bcryptjs";
import { signToken, requireAuth } from "../middleware/auth.js";

const router = Router();

const fallbackDemoUsers = {
  "student@learnly.dev": {
    password: "password123",
    user: {
      id: 1,
      name: "Demo Student",
      email: "student@learnly.dev",
      role: "student",
    },
  },
  "instructor@learnly.dev": {
    password: "password123",
    user: {
      id: 2,
      name: "Demo Instructor",
      email: "instructor@learnly.dev",
      role: "instructor",
    },
  },
};

// POST /api/auth/register  { name, email, password, role? }
router.post("/register", (req, res, next) => {
  try {
    const { name, email, password, role } = req.body || {};
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "name, email and password are required" });
    }

    const wantedRole = role === "instructor" ? "instructor" : "student";
    const existing = fallbackDemoUsers[email];
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const user = {
      id: Date.now(),
      name,
      email,
      role: wantedRole,
    };
    fallbackDemoUsers[email] = {
      password,
      user,
    };

    res.status(201).json({ token: signToken(user), user });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login  { email, password }
router.post("/login", (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    let user;
    const fallback = fallbackDemoUsers[email];

    if (fallback && fallback.password === password) {
      user = fallback.user;
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ token: signToken(user), user });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me  — who am I (requires token)
router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
