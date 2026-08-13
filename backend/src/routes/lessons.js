import { Router } from 'express';
import pool from '../db/connection.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

// GET /api/lessons/:id — a single lesson plus its quiz id (no answers leaked)
router.get(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const lessonResult = await pool.query('SELECT * FROM lessons WHERE id = $1', [
      req.params.id,
    ]);
    const lesson = lessonResult.rows[0];
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

    const quizResult = await pool.query(
      'SELECT id, title FROM quizzes WHERE lesson_id = $1',
      [lesson.id],
    );
    res.json({ ...lesson, quiz: quizResult.rows[0] || null });
  }),
);

// POST /api/lessons — create a lesson, optionally with its quiz (instructors only).
// Body: { course_id, title, body, topic, difficulty, position,
//         questions?: [{ text, options: string[], correct_index }] }
router.post(
  '/',
  requireAuth,
  requireRole('instructor'),
  asyncHandler(async (req, res) => {
    const { course_id, title, body, topic, difficulty, position, questions } = req.body || {};
    if (!course_id || !title || !topic) {
      return res.status(400).json({ error: 'course_id, title and topic are required' });
    }

    // Validate any provided questions before touching the database.
    const cleanQuestions = Array.isArray(questions) ? questions : [];
    for (const [i, q] of cleanQuestions.entries()) {
      if (!q.text || !Array.isArray(q.options) || q.options.length < 2) {
        return res.status(400).json({ error: `Question ${i + 1} needs text and at least 2 options` });
      }
      if (typeof q.correct_index !== 'number' || q.correct_index < 0 || q.correct_index >= q.options.length) {
        return res.status(400).json({ error: `Question ${i + 1} has an invalid correct answer` });
      }
    }

    // Wrap lesson + quiz + questions in a transaction so it's all-or-nothing.
    const client = await pool.connect();
    let lessonId;
    try {
      await client.query('BEGIN');

      lessonId = (
        await client.query(
          `INSERT INTO lessons (course_id, title, body, topic, difficulty, position)
           VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
          [course_id, title, body || '', topic, difficulty || 'medium', position || 0],
        )
      ).rows[0].id;

      if (cleanQuestions.length > 0) {
        const quizId = (
          await client.query(
            'INSERT INTO quizzes (lesson_id, title) VALUES ($1, $2) RETURNING id',
            [lessonId, `${title} — Quiz`],
          )
        ).rows[0].id;

        for (const q of cleanQuestions) {
          await client.query(
            'INSERT INTO questions (quiz_id, text, options, correct_index) VALUES ($1, $2, $3, $4)',
            [quizId, q.text, JSON.stringify(q.options), q.correct_index],
          );
        }
      }

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }

    const lessonResult = await pool.query('SELECT * FROM lessons WHERE id = $1', [lessonId]);
    res.status(201).json(lessonResult.rows[0]);
  }),
);

export default router;
