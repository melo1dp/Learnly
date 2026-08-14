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
    // course_id is part of the key: topic names repeat across courses, so the
    // client needs both to match a mastery row to the course it belongs to.
    const mastery = (
      await pool.query(
        `SELECT course_id, topic, mastery_level, status, updated_at
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

    // Latest recommendation whose next lesson the learner has NOT since
    // completed → Continue learning card.
    //
    // Scanning the 20-row window above for the first row with a next_lesson_id
    // had two failure modes: it kept pointing at a lesson the learner had
    // already finished, and it vanished entirely once 20 newer no-next-lesson
    // recommendations pushed the last useful one out of the window. Asking the
    // database directly avoids both.
    const continueRow = (
      await pool.query(
        `SELECT r.outcome, r.reason, r.next_lesson_id,
                nl.title AS next_lesson_title, nl.difficulty AS next_lesson_difficulty
           FROM recommendations r
           JOIN lessons nl ON nl.id = r.next_lesson_id
          WHERE r.user_id = $1
            AND r.next_lesson_id IS NOT NULL
            AND NOT EXISTS (
              SELECT 1
                FROM quizzes q
                JOIN attempts a ON a.quiz_id = q.id
               WHERE q.lesson_id = r.next_lesson_id
                 AND a.user_id = $1
            )
          ORDER BY r.created_at DESC
          LIMIT 1`,
        [req.user.id],
      )
    ).rows[0];

    const continueLearning = continueRow
      ? {
          outcome: continueRow.outcome,
          reason: continueRow.reason,
          nextLesson: {
            id: continueRow.next_lesson_id,
            title: continueRow.next_lesson_title,
            difficulty: continueRow.next_lesson_difficulty,
          },
        }
      : null;

    res.json({ mastery, attempts, recommendations, continueLearning });
  }),
);

export default router;
