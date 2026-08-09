import { Router } from 'express';
import db from '../db/connection.js';
import { requireAuth } from '../middleware/auth.js';
import { adaptAfterQuiz } from '../engine/adaptation.js';

const router = Router();

// GET /api/quizzes/:id — quiz questions WITHOUT the correct answers.
router.get('/:id', requireAuth, (req, res) => {
  const quiz = db.prepare('SELECT * FROM quizzes WHERE id = ?').get(req.params.id);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

  const questions = db
    .prepare('SELECT id, text, options FROM questions WHERE quiz_id = ?')
    .all(quiz.id)
    .map((q) => ({ id: q.id, text: q.text, options: JSON.parse(q.options) }));

  res.json({ id: quiz.id, title: quiz.title, lesson_id: quiz.lesson_id, questions });
});

// POST /api/quizzes/:id/submit  { answers: { [questionId]: chosenIndex } }
// Grades the quiz, stores the attempt, then runs the adaptation engine.
router.post('/:id/submit', requireAuth, (req, res) => {
  const quiz = db.prepare('SELECT * FROM quizzes WHERE id = ?').get(req.params.id);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

  const answers = (req.body && req.body.answers) || {};
  const questions = db.prepare('SELECT * FROM questions WHERE quiz_id = ?').all(quiz.id);
  if (questions.length === 0) return res.status(400).json({ error: 'Quiz has no questions' });

  // --- Grade ---
  let correct = 0;
  const perQuestion = questions.map((q) => {
    const chosen = Number(answers[q.id]);
    const isCorrect = chosen === q.correct_index;
    if (isCorrect) correct += 1;
    return { questionId: q.id, chosen, correct_index: q.correct_index, isCorrect };
  });
  const score = Math.round((correct / questions.length) * 100);

  // --- Record the attempt ---
  db.prepare('INSERT INTO attempts (user_id, quiz_id, score) VALUES (?, ?, ?)')
    .run(req.user.id, quiz.id, score);

  // --- Run the adaptation engine (the star of the show) ---
  const adaptation = adaptAfterQuiz(req.user.id, quiz.lesson_id, score);

  res.json({
    score,
    correct,
    total: questions.length,
    perQuestion,
    adaptation, // { outcome, mastery, status, reason, nextLesson }
  });
});

export default router;
