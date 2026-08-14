import { Router } from 'express';
import pool from '../db/connection.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { intParam } from '../middleware/validate.js';
import { adaptAfterQuiz } from '../engine/adaptation.js';

const router = Router();

/**
 * Read a submitted answer as an option index.
 *
 * Only real integers and their string forms count. A bare `Number()` would
 * grade `true` as index 1 and `null` as index 0, letting a malformed body score
 * points by accident.
 */
function parseChoice(raw) {
  if (typeof raw === 'number') return Number.isInteger(raw) ? raw : Number.NaN;
  if (typeof raw === 'string' && /^[0-9]+$/.test(raw.trim())) return Number(raw.trim());
  return Number.NaN;
}

// GET /api/quizzes/:id — quiz questions WITHOUT the correct answers.
router.get(
  '/:id',
  requireAuth,
  intParam('id'),
  asyncHandler(async (req, res) => {
    const quizResult = await pool.query('SELECT * FROM quizzes WHERE id = $1', [
      req.params.id,
    ]);
    const quiz = quizResult.rows[0];
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const questions = (
      await pool.query('SELECT id, text, options FROM questions WHERE quiz_id = $1', [
        quiz.id,
      ])
    ).rows.map((q) => ({ id: q.id, text: q.text, options: q.options }));

    res.json({ id: quiz.id, title: quiz.title, lesson_id: quiz.lesson_id, questions });
  }),
);

// POST /api/quizzes/:id/submit  { answers: { [questionId]: chosenIndex } }
// Grades the quiz, stores the attempt, then runs the adaptation engine.
router.post(
  '/:id/submit',
  requireAuth,
  intParam('id'),
  asyncHandler(async (req, res) => {
    const answers = (req.body && req.body.answers) || {};
    if (typeof answers !== 'object' || Array.isArray(answers)) {
      return res.status(400).json({ error: 'answers must be an object' });
    }

    // Grading, recording the attempt and running the engine happen in one
    // transaction. Previously the attempt was committed before adaptation ran,
    // so an engine failure left the learner looking at a 500 for a quiz that had
    // in fact been recorded — and the mastery row it should have updated was
    // left behind. All of it lands, or none of it does.
    const client = await pool.connect();
    let payload;
    try {
      await client.query('BEGIN');

      const quiz = (
        await client.query('SELECT * FROM quizzes WHERE id = $1', [req.params.id])
      ).rows[0];
      if (!quiz) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'Quiz not found' });
      }

      const questions = (
        await client.query('SELECT * FROM questions WHERE quiz_id = $1 ORDER BY id', [quiz.id])
      ).rows;
      if (questions.length === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: 'Quiz has no questions' });
      }

      // --- Grade ---
      let correct = 0;
      const perQuestion = questions.map((q) => {
        const chosen = parseChoice(answers[q.id]);
        const isCorrect = chosen === q.correct_index;
        if (isCorrect) correct += 1;
        return {
          questionId: q.id,
          text: q.text,
          options: q.options,
          chosen: Number.isNaN(chosen) ? null : chosen,
          correct_index: q.correct_index,
          isCorrect,
          explanation: q.explanation,
        };
      });
      const score = Math.round((correct / questions.length) * 100);

      // --- Record the attempt, and what was actually answered ---
      const attemptId = (
        await client.query(
          'INSERT INTO attempts (user_id, quiz_id, score) VALUES ($1, $2, $3) RETURNING id',
          [req.user.id, quiz.id, score],
        )
      ).rows[0].id;

      await client.query(
        `INSERT INTO attempt_answers (attempt_id, question_id, chosen_index, is_correct)
         SELECT $1, * FROM UNNEST($2::int[], $3::int[], $4::bool[])`,
        [
          attemptId,
          perQuestion.map((q) => q.questionId),
          perQuestion.map((q) => q.chosen),
          perQuestion.map((q) => q.isCorrect),
        ],
      );

      // --- Run the adaptation engine (the star of the show) ---
      const adaptation = await adaptAfterQuiz(req.user.id, quiz.lesson_id, score, client);

      await client.query('COMMIT');
      payload = {
        attemptId,
        score,
        correct,
        total: questions.length,
        perQuestion,
        adaptation, // { outcome, mastery, status, reason, nextLesson }
      };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }

    res.json(payload);
  }),
);

export default router;
