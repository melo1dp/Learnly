import { Router } from 'express';
import pool from '../db/connection.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { intParam } from '../middleware/validate.js';

const router = Router();

// GET /api/attempts/:id — a past attempt, reviewable in full.
//
// The result screen used to exist only in the component state of the quiz
// screen: correct answers, the learner's choice and the explanations were
// rendered once and then unrecoverable the moment they navigated away.
router.get(
  '/:id',
  requireAuth,
  intParam('id'),
  asyncHandler(async (req, res) => {
    // Scoped by user_id as well as id: without it, any learner could read any
    // other learner's attempt by guessing the number.
    const attempt = (
      await pool.query(
        `SELECT a.id, a.score, a.taken_at, a.quiz_id,
                q.title AS quiz_title,
                l.id AS lesson_id, l.title AS lesson_title, l.topic, l.difficulty
           FROM attempts a
           JOIN quizzes q ON q.id = a.quiz_id
           JOIN lessons l ON l.id = q.lesson_id
          WHERE a.id = $1 AND a.user_id = $2`,
        [req.params.id, req.user.id],
      )
    ).rows[0];
    if (!attempt) return res.status(404).json({ error: 'Attempt not found' });

    // LEFT JOIN from questions, so a question added to the quiz after this
    // attempt still appears (as unanswered) rather than silently vanishing.
    const perQuestion = (
      await pool.query(
        `SELECT qu.id AS "questionId", qu.text, qu.options, qu.correct_index,
                qu.explanation, aa.chosen_index AS chosen,
                COALESCE(aa.is_correct, FALSE) AS "isCorrect"
           FROM questions qu
           LEFT JOIN attempt_answers aa
             ON aa.question_id = qu.id AND aa.attempt_id = $1
          WHERE qu.quiz_id = $2
          ORDER BY qu.id`,
        [attempt.id, attempt.quiz_id],
      )
    ).rows;

    res.json({
      id: attempt.id,
      score: attempt.score,
      taken_at: attempt.taken_at,
      correct: perQuestion.filter((q) => q.isCorrect).length,
      total: perQuestion.length,
      quiz: { id: attempt.quiz_id, title: attempt.quiz_title },
      lesson: {
        id: attempt.lesson_id,
        title: attempt.lesson_title,
        topic: attempt.topic,
        difficulty: attempt.difficulty,
      },
      perQuestion,
    });
  }),
);

export default router;
