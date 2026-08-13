import { Router } from 'express';
import pool from '../db/connection.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

// GET /api/progress — mastery, attempts, adaptation history, and continue CTA.
router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const mastery = (
      await pool.query(
        `SELECT topic, mastery_level, status, updated_at
           FROM learner_progress
          WHERE user_id = $1
          ORDER BY updated_at DESC`,
        [req.user.id],
      )
    ).rows;

    const attempts = (
      await pool.query(
        `SELECT a.id, a.score, a.taken_at, l.title AS lesson_title, l.topic
           FROM attempts a
           JOIN quizzes q ON q.id = a.quiz_id
           JOIN lessons l ON l.id = q.lesson_id
          WHERE a.user_id = $1
          ORDER BY a.taken_at DESC
          LIMIT 20`,
        [req.user.id],
      )
    ).rows;

    const recommendations = (
      await pool.query(
        `SELECT r.id, r.score, r.outcome, r.reason, r.mastery, r.status, r.created_at,
                r.next_lesson_id, nl.title AS next_lesson_title, nl.difficulty AS next_lesson_difficulty,
                l.title AS from_lesson_title, l.topic
           FROM recommendations r
           JOIN lessons l ON l.id = r.lesson_id
           LEFT JOIN lessons nl ON nl.id = r.next_lesson_id
          WHERE r.user_id = $1
          ORDER BY r.created_at DESC
          LIMIT 20`,
        [req.user.id],
      )
    ).rows;

    // Latest recommendation with a concrete next lesson → Continue learning card.
    const latest = recommendations.find((r) => r.next_lesson_id);
    const continueLearning = latest
      ? {
          outcome: latest.outcome,
          reason: latest.reason,
          nextLesson: {
            id: latest.next_lesson_id,
            title: latest.next_lesson_title,
            difficulty: latest.next_lesson_difficulty,
          },
        }
      : null;

    res.json({ mastery, attempts, recommendations, continueLearning });
  }),
);

export default router;
