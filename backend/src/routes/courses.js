import { Router } from 'express';
import pool from '../db/connection.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

// GET /api/courses — list all courses
router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const result = await pool.query('SELECT * FROM courses ORDER BY id');
    res.json(result.rows);
  }),
);

// GET /api/courses/:id — a course with its lessons (ordered)
router.get(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const courseResult = await pool.query('SELECT * FROM courses WHERE id = $1', [
      req.params.id,
    ]);
    const course = courseResult.rows[0];
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const lessons = (
      await pool.query(
        'SELECT id, title, topic, difficulty, position FROM lessons WHERE course_id = $1 ORDER BY position',
        [course.id],
      )
    ).rows;

    res.json({ ...course, lessons });
  }),
);

// POST /api/courses — create a course (instructors only)
router.post(
  '/',
  requireAuth,
  requireRole('instructor'),
  asyncHandler(async (req, res) => {
    const { title, description } = req.body || {};
    if (!title) return res.status(400).json({ error: 'title is required' });

    const inserted = await pool.query(
      'INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING *',
      [title, description || ''],
    );
    res.status(201).json(inserted.rows[0]);
  }),
);

export default router;
