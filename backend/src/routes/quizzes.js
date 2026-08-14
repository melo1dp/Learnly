import { Router } from 'express';
import pool from '../db/connection.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { adaptAfterQuiz } from '../engine/adaptation.js';

const router = Router();

// GET /api/quizzes/:id — quiz questions WITHOUT the correct answers.
router.get(
  '/:id',
  requireAuth,
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
  asyncHandler(async (req, res) => {
    const quizResult = await pool.query('SELECT * FROM quizzes WHERE id = $1', [
      req.params.id,
    ]);
    const quiz = quizResult.rows[0];
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const answers = (req.body && req.body.answers) || {};
    const questions = (
      await pool.query('SELECT * FROM questions WHERE quiz_id = $1', [quiz.id])
    ).rows;
    if (questions.length === 0) return res.status(400).json({ error: 'Quiz has no questions' });

    // --- Grade ---
    let correct = 0;
    const perQuestion = questions.map((q) => {
      const chosen = Number(answers[q.id]);
      const isCorrect = chosen === q.correct_index;
      if (isCorrect) correct += 1;
      return {
        questionId: q.id,
        text: q.text,
        options: q.options,
        chosen,
        correct_index: q.correct_index,
        isCorrect,
        explanation: q.explanation,
      };
    });
    const score = Math.round((correct / questions.length) * 100);

    // --- Record the attempt ---
    await pool.query('INSERT INTO attempts (user_id, quiz_id, score) VALUES ($1, $2, $3)', [
      req.user.id,
      quiz.id,
      score,
    ]);

    // --- Run the adaptation engine (the star of the show) ---
    const adaptation = await adaptAfterQuiz(req.user.id, quiz.lesson_id, score);

    res.json({
      score,
      correct,
      total: questions.length,
      perQuestion,
      adaptation, // { outcome, mastery, status, reason, nextLesson }
    });
  }),
);

export default router;
