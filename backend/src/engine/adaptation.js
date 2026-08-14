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

import pool from '../db/connection.js';

// --- Tunable rule thresholds (change these to tune the "adaptivity") ---
export const RULES = {
  STRUGGLING_BELOW: 50, // score under this % => learner is struggling
  MASTERED_AT_OR_ABOVE: 80, // score at/above this % => learner has mastered it
  MASTERY_TO_ADVANCE: 2, // mastery level needed before we skip to the next topic
};

// Mastery is clamped to this range. Without an upper bound, re-taking the same
// quiz at >=80% increments it forever; nothing above MASTERY_TO_ADVANCE carries
// any meaning, so letting it grow just inflates a number the UI displays.
const MASTERY_MIN = 0;
const MASTERY_MAX = RULES.MASTERY_TO_ADVANCE;

// Difficulty ordering used when picking an easier/harder lesson.
const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'];

/**
 * Main entry point. Call this right after saving a quiz attempt.
 *
 * @param {number} userId
 * @param {number} lessonId  the lesson whose quiz was just taken
 * @param {number} score     percentage 0-100
 * @param {object} db        pool, or a client already inside a transaction
 * @returns {{ outcome, mastery, status, reason, nextLesson }}
 */
export async function adaptAfterQuiz(userId, lessonId, score, db = pool) {
  const lesson = (await db.query('SELECT * FROM lessons WHERE id = $1', [lessonId])).rows[0];
  if (!lesson) throw new Error(`Lesson ${lessonId} not found`);

  const topic = lesson.topic;
  const courseId = lesson.course_id;

  // Ensure the learner's progress row exists, then lock it for the read-modify-
  // write below. ON CONFLICT makes the insert safe when two submissions race to
  // create the same row; FOR UPDATE then serialises them so neither increment is
  // lost. (Both are no-ops when `db` is the pool rather than a transaction, so
  // callers outside a transaction still behave correctly — just without the
  // cross-statement guarantee.)
  await db.query(
    `INSERT INTO learner_progress (user_id, course_id, topic, mastery_level, status)
     VALUES ($1, $2, $3, 0, 'in_progress')
     ON CONFLICT (user_id, course_id, topic) DO NOTHING`,
    [userId, courseId, topic],
  );
  const progress = (
    await db.query(
      `SELECT * FROM learner_progress
        WHERE user_id = $1 AND course_id = $2 AND topic = $3
        FOR UPDATE`,
      [userId, courseId, topic],
    )
  ).rows[0];

  // --- Apply the rules ---
  let mastery = progress.mastery_level;
  let outcome; // 'struggling' | 'mastered' | 'reinforce'
  let status;
  let reason;
  let nextLesson;

  // Every branch excludes the lesson just taken. The difficulty ladder has only
  // three rungs and stepDifficulty() clamps at both ends, so without excludeId a
  // learner who fails an *easy* lesson is handed that same lesson straight back
  // — an infinite loop for exactly the struggling learner this is meant to help.
  // The same applies at the top: acing a *hard* lesson below the advance
  // threshold would re-serve it. When the step lands nowhere, nextLesson stays
  // undefined and the unseen-lesson fallback below takes over.
  if (score < RULES.STRUGGLING_BELOW) {
    // Struggling: drop mastery, route to an EASIER lesson on the same topic.
    outcome = 'struggling';
    mastery = Math.max(mastery - 1, MASTERY_MIN);
    status = 'needs_review';
    nextLesson = await findLesson(
      { courseId, topic, easierThan: lesson.difficulty, excludeId: lesson.id },
      db,
    );
    reason = `You scored ${score}% (below ${RULES.STRUGGLING_BELOW}%). Let's revisit this topic with something easier.`;
  } else if (score >= RULES.MASTERED_AT_OR_ABOVE) {
    // Doing great: raise mastery. Once high enough, skip to the NEXT topic.
    outcome = 'mastered';
    mastery = Math.min(mastery + 1, MASTERY_MAX);
    if (mastery >= RULES.MASTERY_TO_ADVANCE) {
      status = 'mastered';
      nextLesson = await findLesson({ courseId, afterTopicOf: lesson }, db);
      reason = `You scored ${score}% and mastered "${topic}". Moving you ahead to new material.`;
    } else {
      status = 'in_progress';
      nextLesson = await findLesson(
        { courseId, topic, harderThan: lesson.difficulty, excludeId: lesson.id },
        db,
      );
      reason = `Great job — ${score}%! Here's a harder lesson on "${topic}" to lock it in.`;
    }
  } else {
    // In-between: reinforce with another MEDIUM lesson on the same topic.
    outcome = 'reinforce';
    status = 'in_progress';
    nextLesson =
      (await findLesson({ courseId, topic, difficulty: 'medium', excludeId: lesson.id }, db)) ||
      (await findLesson({ courseId, topic, excludeId: lesson.id }, db));
    reason = `You scored ${score}%. Solid — let's reinforce "${topic}" before moving on.`;
  }

  // Persist updated learner profile.
  await db.query(
    `UPDATE learner_progress
       SET mastery_level = $1, status = $2, updated_at = NOW()
     WHERE user_id = $3 AND course_id = $4 AND topic = $5`,
    [mastery, status, userId, courseId, topic],
  );

  // Fallback: if no specific lesson matched, suggest the next unseen lesson in the course.
  if (!nextLesson) {
    nextLesson = await findNextUnseenLesson(userId, courseId, lesson.id, db);
  }

  // Persist the adaptation decision so the UI can show history + Continue.
  await db.query(
    `INSERT INTO recommendations
       (user_id, lesson_id, next_lesson_id, score, outcome, reason, mastery, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [userId, lessonId, nextLesson?.id ?? null, score, outcome, reason, mastery, status],
  );

  return { outcome, mastery, status, reason, nextLesson: nextLesson || null };
}

// ---------------------------------------------------------------------------
//  Lesson-selection helpers
// ---------------------------------------------------------------------------

// Columns the engine and the client actually need. Deliberately excludes
// `body`: lesson bodies run to several KB and the client re-fetches the lesson
// in full on navigation anyway, so shipping it inside every quiz result just
// inflates the response.
const LESSON_FIELDS = 'id, course_id, title, topic, difficulty, position';

// Flexible finder used by the rules above.
async function findLesson(
  { courseId, topic, difficulty, easierThan, harderThan, excludeId, afterTopicOf },
  db = pool,
) {
  // Jump to the first lesson of the *next* topic in the course.
  if (afterTopicOf) {
    return (
      await db.query(
        `SELECT ${LESSON_FIELDS} FROM lessons
          WHERE course_id = $1 AND position > $2 AND topic != $3
          ORDER BY position ASC LIMIT 1`,
        [courseId, afterTopicOf.position, afterTopicOf.topic],
      )
    ).rows[0];
  }

  let targetDifficulty = difficulty;
  if (easierThan) targetDifficulty = stepDifficulty(easierThan, -1);
  if (harderThan) targetDifficulty = stepDifficulty(harderThan, +1);

  const clauses = ['course_id = $1'];
  const params = [courseId];
  if (topic) { params.push(topic); clauses.push(`topic = $${params.length}`); }
  if (targetDifficulty) { params.push(targetDifficulty); clauses.push(`difficulty = $${params.length}`); }
  if (excludeId) { params.push(excludeId); clauses.push(`id != $${params.length}`); }

  return (
    await db.query(
      `SELECT ${LESSON_FIELDS} FROM lessons WHERE ${clauses.join(' AND ')} ORDER BY position ASC LIMIT 1`,
      params,
    )
  ).rows[0];
}

// Move one step easier (-1) or harder (+1) in the difficulty ladder, clamped.
function stepDifficulty(current, delta) {
  const i = DIFFICULTY_ORDER.indexOf(current);
  const next = Math.min(Math.max(i + delta, 0), DIFFICULTY_ORDER.length - 1);
  return DIFFICULTY_ORDER[next];
}

// Fallback: the earliest lesson in the course the learner has not yet taken a quiz on.
async function findNextUnseenLesson(userId, courseId, currentLessonId, db = pool) {
  return (
    await db.query(
      `SELECT l.id, l.course_id, l.title, l.topic, l.difficulty, l.position FROM lessons l
        WHERE l.course_id = $1
          AND l.id != $2
          AND l.id NOT IN (
            SELECT q.lesson_id FROM quizzes q
            JOIN attempts a ON a.quiz_id = q.id
            WHERE a.user_id = $3
          )
        ORDER BY l.position ASC LIMIT 1`,
      [courseId, currentLessonId, userId],
    )
  ).rows[0];
}
