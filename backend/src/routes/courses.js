import { Router } from 'express';
import db from '../db/connection.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// GET /api/courses — list all courses
router.get('/', requireAuth, (req, res) => {
  const courses = db.prepare('SELECT * FROM courses ORDER BY id').all();
  res.json(courses);
});

// GET /api/courses/:id — a course with its lessons (ordered)
router.get('/:id', requireAuth, (req, res) => {
  const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });

  const lessons = db
    .prepare('SELECT id, title, topic, difficulty, position FROM lessons WHERE course_id = ? ORDER BY position')
    .all(course.id);

  res.json({ ...course, lessons });
});

// POST /api/courses — create a course (instructors only)
router.post('/', requireAuth, requireRole('instructor'), (req, res) => {
  const { title, description } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title is required' });

  const info = db
    .prepare('INSERT INTO courses (title, description) VALUES (?, ?)')
    .run(title, description || '');
  res.status(201).json(db.prepare('SELECT * FROM courses WHERE id = ?').get(info.lastInsertRowid));
});

export default router;
