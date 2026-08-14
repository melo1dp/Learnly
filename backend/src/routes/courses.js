import { Router } from 'express';
import pool from '../db/connection.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { intParam } from '../middleware/validate.js';

const router = Router();

// node-postgres returns NUMERIC as a *string* to preserve arbitrary precision,
// so `rating` would reach the client as "4.7" and break any arithmetic or
// .toFixed() the UI does with it. Cast it to a float in SQL.
const COURSE_FIELDS =
  'id, title, description, category, level, rating::float8 AS rating';

const VALID_LEVELS = ['beginner', 'intermediate', 'advanced'];

// GET /api/courses — list all courses, each with its distinct topic list
// (so the client can cross-reference against /progress mastery data to
// compute a per-course completion percentage without a extra round trip).
router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const coursesResult = await pool.query(
      `SELECT ${COURSE_FIELDS} FROM courses ORDER BY id`,
    );
    const topicsResult = await pool.query(
      'SELECT DISTINCT course_id, topic FROM lessons',
    );

    const topicsByCourse = {};
    for (const row of topicsResult.rows) {
      (topicsByCourse[row.course_id] ??= []).push(row.topic);
    }

    const courses = coursesResult.rows.map((course) => ({
      ...course,
      topics: topicsByCourse[course.id] || [],
    }));

    res.json(courses);
  }),
);

// GET /api/courses/:id — a course with its lessons (ordered)
router.get(
  '/:id',
  requireAuth,
  intParam('id'),
  asyncHandler(async (req, res) => {
    const courseResult = await pool.query(
      `SELECT ${COURSE_FIELDS} FROM courses WHERE id = $1`,
      [req.params.id],
    );
    const course = courseResult.rows[0];
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // Each lesson carries whether *this* learner has completed it and their
    // best score. Without it every row in a nine-lesson course looked
    // identical, so the adaptive path the app is built around was invisible on
    // the one screen where the learner chooses what to do next.
    const lessons = (
      await pool.query(
        `SELECT l.id, l.title, l.topic, l.difficulty, l.position,
                (best.score IS NOT NULL) AS completed,
                best.score AS best_score
           FROM lessons l
           LEFT JOIN quizzes q ON q.lesson_id = l.id
           LEFT JOIN LATERAL (
             SELECT MAX(a.score) AS score
               FROM attempts a
              WHERE a.quiz_id = q.id AND a.user_id = $2
           ) best ON TRUE
          WHERE l.course_id = $1
          ORDER BY l.position`,
        [course.id, req.user.id],
      )
    ).rows;

    res.json({
      ...course,
      lessons,
      completedCount: lessons.filter((l) => l.completed).length,
    });
  }),
);

// POST /api/courses — create a course (instructors only)
router.post(
  '/',
  requireAuth,
  requireRole('instructor'),
  asyncHandler(async (req, res) => {
    const { title, description, category, level } = req.body || {};
    const trimmedTitle = typeof title === 'string' ? title.trim() : '';
    if (!trimmedTitle) return res.status(400).json({ error: 'title is required' });
    if (trimmedTitle.length > 200) {
      return res.status(400).json({ error: 'title must be at most 200 characters' });
    }

    // Checked here rather than left to the CHECK constraint, which would arrive
    // as an unreadable 500 rather than a message the form can display.
    const wantedLevel = level || 'beginner';
    if (!VALID_LEVELS.includes(wantedLevel)) {
      return res
        .status(400)
        .json({ error: `level must be one of: ${VALID_LEVELS.join(', ')}` });
    }

    const inserted = await pool.query(
      `INSERT INTO courses (title, description, category, level)
       VALUES ($1, $2, $3, $4) RETURNING ${COURSE_FIELDS}`,
      [
        trimmedTitle,
        typeof description === 'string' ? description : '',
        typeof category === 'string' ? category : '',
        wantedLevel,
      ],
    );
    res.status(201).json(inserted.rows[0]);
  }),
);

export default router;
