// ============================================================================
//  ★ THE ADAPTATION ENGINE ★
//  This is the heart of the project: rules-based adaptive content delivery.
//
//  After a learner submits a quiz, `adaptAfterQuiz` runs. It:
//    1. nudges the learner's mastery level for that topic up or down,
//    2. updates their status (mastered / needs_review / in_progress),
//    3. recommends the next lesson to study.
//
//  The rules are intentionally simple and explainable — perfect for a report
//  and easy to demo live. Tune the thresholds below to change the behaviour.
// ============================================================================

import db from '../db/connection.js';

// --- Tunable rule thresholds (change these to tune the "adaptivity") ---
export const RULES = {
  STRUGGLING_BELOW: 50, // score under this % => learner is struggling
  MASTERED_AT_OR_ABOVE: 80, // score at/above this % => learner has mastered it
  MASTERY_TO_ADVANCE: 2, // mastery level needed before we skip to the next topic
};

// Difficulty ordering used when picking an easier/harder lesson.
const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'];

/**
 * Main entry point. Call this right after saving a quiz attempt.
 *
 * @param {number} userId
 * @param {number} lessonId  the lesson whose quiz was just taken
 * @param {number} score     percentage 0-100
 * @returns {{ outcome, mastery, status, reason, nextLesson }}
 */
export function adaptAfterQuiz(userId, lessonId, score) {
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(lessonId);
  if (!lesson) throw new Error(`Lesson ${lessonId} not found`);

  const topic = lesson.topic;

  // Load (or create) the learner's progress row for this topic.
  let progress = db
    .prepare('SELECT * FROM learner_progress WHERE user_id = ? AND topic = ?')
    .get(userId, topic);
  if (!progress) {
    db.prepare(
      'INSERT INTO learner_progress (user_id, topic, mastery_level, status) VALUES (?, ?, 0, ?)'
    ).run(userId, topic, 'in_progress');
    progress = { user_id: userId, topic, mastery_level: 0, status: 'in_progress' };
  }

  // --- Apply the rules ---
  let mastery = progress.mastery_level;
  let outcome; // 'struggling' | 'mastered' | 'reinforce'
  let status;
  let reason;
  let nextLesson;

  if (score < RULES.STRUGGLING_BELOW) {
    // Struggling: drop mastery, route to an EASIER lesson on the same topic.
    outcome = 'struggling';
    mastery = Math.max(mastery - 1, 0);
    status = 'needs_review';
    nextLesson = findLesson({ courseId: lesson.course_id, topic, easierThan: lesson.difficulty });
    reason = `You scored ${score}% (below ${RULES.STRUGGLING_BELOW}%). Let's revisit this topic with something easier.`;
  } else if (score >= RULES.MASTERED_AT_OR_ABOVE) {
    // Doing great: raise mastery. Once high enough, skip to the NEXT topic.
    outcome = 'mastered';
    mastery = mastery + 1;
    if (mastery >= RULES.MASTERY_TO_ADVANCE) {
      status = 'mastered';
      nextLesson = findLesson({ courseId: lesson.course_id, afterTopicOf: lesson });
      reason = `You scored ${score}% and mastered "${topic}". Moving you ahead to new material.`;
    } else {
      status = 'in_progress';
      nextLesson = findLesson({ courseId: lesson.course_id, topic, harderThan: lesson.difficulty });
      reason = `Great job — ${score}%! Here's a harder lesson on "${topic}" to lock it in.`;
    }
  } else {
    // In-between: reinforce with another MEDIUM lesson on the same topic.
    outcome = 'reinforce';
    status = 'in_progress';
    nextLesson = findLesson({ courseId: lesson.course_id, topic, difficulty: 'medium', excludeId: lesson.id })
      || findLesson({ courseId: lesson.course_id, topic, excludeId: lesson.id });
    reason = `You scored ${score}%. Solid — let's reinforce "${topic}" before moving on.`;
  }

  // Persist updated learner profile.
  db.prepare(
    `UPDATE learner_progress
       SET mastery_level = ?, status = ?, updated_at = datetime('now')
     WHERE user_id = ? AND topic = ?`
  ).run(mastery, status, userId, topic);

  // Fallback: if no specific lesson matched, suggest the next unseen lesson in the course.
  if (!nextLesson) {
    nextLesson = findNextUnseenLesson(userId, lesson.course_id, lesson.id);
  }

  // Persist the adaptation decision so the UI can show history + Continue.
  db.prepare(
    `INSERT INTO recommendations
       (user_id, lesson_id, next_lesson_id, score, outcome, reason, mastery, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    userId,
    lessonId,
    nextLesson?.id ?? null,
    score,
    outcome,
    reason,
    mastery,
    status
  );

  return { outcome, mastery, status, reason, nextLesson: nextLesson || null };
}

// ---------------------------------------------------------------------------
//  Lesson-selection helpers
// ---------------------------------------------------------------------------

// Flexible finder used by the rules above.
function findLesson({ courseId, topic, difficulty, easierThan, harderThan, excludeId, afterTopicOf }) {
  // Jump to the first lesson of the *next* topic in the course.
  if (afterTopicOf) {
    return db
      .prepare(
        `SELECT * FROM lessons
          WHERE course_id = ? AND position > ? AND topic != ?
          ORDER BY position ASC LIMIT 1`
      )
      .get(courseId, afterTopicOf.position, afterTopicOf.topic);
  }

  let targetDifficulty = difficulty;
  if (easierThan) targetDifficulty = stepDifficulty(easierThan, -1);
  if (harderThan) targetDifficulty = stepDifficulty(harderThan, +1);

  const clauses = ['course_id = ?'];
  const params = [courseId];
  if (topic) { clauses.push('topic = ?'); params.push(topic); }
  if (targetDifficulty) { clauses.push('difficulty = ?'); params.push(targetDifficulty); }
  if (excludeId) { clauses.push('id != ?'); params.push(excludeId); }

  return db
    .prepare(`SELECT * FROM lessons WHERE ${clauses.join(' AND ')} ORDER BY position ASC LIMIT 1`)
    .get(...params);
}

// Move one step easier (-1) or harder (+1) in the difficulty ladder, clamped.
function stepDifficulty(current, delta) {
  const i = DIFFICULTY_ORDER.indexOf(current);
  const next = Math.min(Math.max(i + delta, 0), DIFFICULTY_ORDER.length - 1);
  return DIFFICULTY_ORDER[next];
}

// Fallback: the earliest lesson in the course the learner has not yet taken a quiz on.
function findNextUnseenLesson(userId, courseId, currentLessonId) {
  return db
    .prepare(
      `SELECT l.* FROM lessons l
        WHERE l.course_id = ?
          AND l.id != ?
          AND l.id NOT IN (
            SELECT q.lesson_id FROM quizzes q
            JOIN attempts a ON a.quiz_id = q.id
            WHERE a.user_id = ?
          )
        ORDER BY l.position ASC LIMIT 1`
    )
    .get(courseId, currentLessonId, userId);
}
