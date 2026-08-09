import "dotenv/config";
import express from "express";
import cors from "cors";
import { existsSync } from "node:fs";

import { DB_PATH } from "./db/connection.js";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import lessonRoutes from "./routes/lessons.js";
import quizRoutes from "./routes/quizzes.js";
import progressRoutes from "./routes/progress.js";

if (!existsSync(DB_PATH)) {
  console.warn(
    "\n⚠  Database file not found. Run `npm run db:reset` to create + seed it.\n",
  );
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/progress", progressRoutes);

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  const message = err.message || "Internal server error";
  res.status(500).json({ error: message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Learnly API running on http://0.0.0.0:${PORT}`);
  console.log(`Health check: http://0.0.0.0:${PORT}/api/health`);
});
