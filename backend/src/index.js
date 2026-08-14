import "dotenv/config";
import express from "express";
import cors from "cors";

import pool, { initDb } from "./db/connection.js";
import { rateLimit, securityHeaders } from "./middleware/rateLimit.js";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import lessonRoutes from "./routes/lessons.js";
import quizRoutes from "./routes/quizzes.js";
import attemptRoutes from "./routes/attempts.js";
import progressRoutes from "./routes/progress.js";

const app = express();

// Render terminates TLS upstream, so req.ip is the proxy's address unless we
// trust the forwarding header. The rate limiter keys on req.ip and would
// otherwise bucket every user in the world together.
app.set("trust proxy", 1);

app.use(securityHeaders);
app.use(cors());
app.use(express.json({ limit: "256kb" }));

// A liveness probe that doesn't touch the database reports "healthy" while
// Postgres is unreachable — which is the one failure the probe exists to catch.
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "up" });
  } catch {
    res.status(503).json({ ok: false, db: "down" });
  }
});

// Login and registration are the credential-guessing surface, and bcrypt makes
// each attempt expensive for us as well as for the attacker.
app.use(
  "/api/auth",
  rateLimit({ max: 30, message: "Too many attempts. Please try again in a few minutes." }),
  authRoutes,
);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/progress", progressRoutes);

// Unmatched API routes: JSON, not Express's default HTML error page. The client
// parses every response as JSON and would otherwise fail on the HTML.
app.use("/api", (req, res) => {
  res.status(404).json({ error: `No such endpoint: ${req.method} ${req.originalUrl}` });
});

// Fallback error handler.
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;

  if (status >= 500) {
    console.error(err.stack || err);
  }

  // Client errors carry a message written for a user; 5xx messages are internal
  // (Postgres names tables, columns and constraints in its errors) and must not
  // be echoed back.
  const message =
    status >= 500 ? "Something went wrong on our end." : err.message || "Bad request";

  res.status(status).json({ error: message });
});

const PORT = process.env.PORT || 4000;

initDb()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Learnly API running on http://0.0.0.0:${PORT}`);
      console.log(`Health check: http://0.0.0.0:${PORT}/api/health`);
    });
  })
  .catch((err) => {
    console.error("Database initialization failed:", err);
    process.exit(1);
  });
