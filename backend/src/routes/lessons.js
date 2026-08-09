import { Router } from 'express';
import db from '../db/connection.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// GET /api/lessons/:id — a single lesson plus its quiz id (no answers leaked)
router.get('/:id', requireAuth, (req, res) => {
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

  const quiz = db.prepare('SELECT id, title FROM quizzes WHERE lesson_id = ?').get(lesson.id);
  res.json({ ...lesson, quiz: quiz || null });
});

// POST /api/lessons — create a lesson, optionally with its quiz (instructors only).
// Body: { course_id, title, body, topic, difficulty, position,
//         questions?: [{ text, options: string[], correct_index }] }
router.post('/', requireAuth, requireRole('instructor'), (req, res) => {
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
  const create = db.transaction(() => {
    const lessonId = db
      .prepare(
        `INSERT INTO lessons (course_id, title, body, topic, difficulty, position)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(course_id, title, body || '', topic, difficulty || 'medium', position || 0)
      .lastInsertRowid;

    if (cleanQuestions.length > 0) {
      const quizId = db
        .prepare('INSERT INTO quizzes (lesson_id, title) VALUES (?, ?)')
        .run(lessonId, `${title} — Quiz`).lastInsertRowid;
      const insertQ = db.prepare(
        'INSERT INTO questions (quiz_id, text, options, correct_index) VALUES (?, ?, ?, ?)'
      );
      for (const q of cleanQuestions) {
        insertQ.run(quizId, q.text, JSON.stringify(q.options), q.correct_index);
      }
    }
    return lessonId;
  });

  const lessonId = create();
  res.status(201).json(db.prepare('SELECT * FROM lessons WHERE id = ?').get(lessonId));
});

export default router;
