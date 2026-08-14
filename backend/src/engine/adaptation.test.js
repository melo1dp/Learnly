// Tests for the adaptation engine — the project's core contribution.
//
// Run with: npm test  (Node's built-in runner; no test framework to install)
//
// These exercise the rules through adaptAfterQuiz's `db` parameter, so they
// cover the real decision path — thresholds, mastery transitions, and lesson
// selection — without needing a live Postgres.

import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { adaptAfterQuiz, RULES } from "./adaptation.js";
import { buildCourse, makeFakeDb } from "./fakeDb.js";

const USER = 1;

// Course 1: arrays (ids 1-3, positions 0-2), hash-maps (ids 4-6, positions 3-5).
const ARRAYS_EASY = 1;
const ARRAYS_MEDIUM = 2;
const ARRAYS_HARD = 3;
const HASHMAPS_EASY = 4;

function standardCourse() {
  return buildCourse({ courseId: 1, topics: ["arrays", "hash-maps"] });
}

function setup({ progress = [], attemptedLessonIds = [] } = {}) {
  return makeFakeDb({ lessons: standardCourse(), progress, attemptedLessonIds });
}

describe("struggling (score below STRUGGLING_BELOW)", () => {
  test("routes to an easier lesson on the same topic", async () => {
    const db = setup();
    const result = await adaptAfterQuiz(USER, ARRAYS_MEDIUM, 0, db);

    assert.equal(result.outcome, "struggling");
    assert.equal(result.status, "needs_review");
    assert.equal(result.nextLesson.id, ARRAYS_EASY);
    assert.equal(result.nextLesson.difficulty, "easy");
  });

  test("never re-serves the lesson just failed, even at the bottom of the ladder", async () => {
    // The regression this suite exists for. stepDifficulty('easy', -1) clamps
    // back to 'easy', so without an exclusion the engine handed a struggling
    // beginner the exact lesson they had just failed — an infinite loop.
    const db = setup();
    const result = await adaptAfterQuiz(USER, ARRAYS_EASY, 0, db);

    assert.equal(result.outcome, "struggling");
    assert.notEqual(
      result.nextLesson?.id,
      ARRAYS_EASY,
      "engine recommended the lesson the learner just failed",
    );
  });

  test("mastery decrements but is floored at zero", async () => {
    const db = setup({
      progress: [{ user_id: USER, course_id: 1, topic: "arrays", mastery_level: 0 }],
    });
    const result = await adaptAfterQuiz(USER, ARRAYS_MEDIUM, 10, db);

    assert.equal(result.mastery, 0);
    assert.equal(db.progressRows[0].mastery_level, 0);
  });

  test("a score one point below the threshold still counts as struggling", async () => {
    const db = setup();
    const result = await adaptAfterQuiz(USER, ARRAYS_MEDIUM, RULES.STRUGGLING_BELOW - 1, db);
    assert.equal(result.outcome, "struggling");
  });
});

describe("mastered (score at or above MASTERED_AT_OR_ABOVE)", () => {
  test("first pass raises mastery and steps up within the topic", async () => {
    const db = setup();
    const result = await adaptAfterQuiz(USER, ARRAYS_EASY, 100, db);

    assert.equal(result.outcome, "mastered");
    assert.equal(result.mastery, 1);
    assert.equal(result.status, "in_progress");
    assert.equal(result.nextLesson.id, ARRAYS_MEDIUM);
    assert.equal(result.nextLesson.difficulty, "medium");
  });

  test("reaching MASTERY_TO_ADVANCE skips to the next topic", async () => {
    const db = setup({
      progress: [
        {
          user_id: USER,
          course_id: 1,
          topic: "arrays",
          mastery_level: RULES.MASTERY_TO_ADVANCE - 1,
        },
      ],
    });
    const result = await adaptAfterQuiz(USER, ARRAYS_MEDIUM, 100, db);

    assert.equal(result.mastery, RULES.MASTERY_TO_ADVANCE);
    assert.equal(result.status, "mastered");
    assert.equal(result.nextLesson.id, HASHMAPS_EASY);
    assert.equal(result.nextLesson.topic, "hash-maps");
  });

  test("never re-serves the lesson just passed at the top of the ladder", async () => {
    // Mirror of the struggling case: stepDifficulty('hard', +1) clamps to
    // 'hard', so acing a hard lesson below the advance threshold would
    // otherwise recommend that same hard lesson.
    const db = setup();
    const result = await adaptAfterQuiz(USER, ARRAYS_HARD, 100, db);

    assert.equal(result.mastery, 1);
    assert.notEqual(
      result.nextLesson?.id,
      ARRAYS_HARD,
      "engine recommended the lesson the learner just passed",
    );
  });

  test("mastery is capped, so re-taking one quiz cannot inflate it", async () => {
    const db = setup({
      progress: [
        {
          user_id: USER,
          course_id: 1,
          topic: "arrays",
          mastery_level: RULES.MASTERY_TO_ADVANCE,
        },
      ],
    });
    const result = await adaptAfterQuiz(USER, ARRAYS_MEDIUM, 100, db);

    assert.equal(result.mastery, RULES.MASTERY_TO_ADVANCE);
  });

  test("exactly at the threshold counts as mastered", async () => {
    const db = setup();
    const result = await adaptAfterQuiz(USER, ARRAYS_EASY, RULES.MASTERED_AT_OR_ABOVE, db);
    assert.equal(result.outcome, "mastered");
  });
});

describe("reinforce (between the two thresholds)", () => {
  test("recommends another lesson on the same topic, never the current one", async () => {
    const db = setup();
    const result = await adaptAfterQuiz(USER, ARRAYS_EASY, 65, db);

    assert.equal(result.outcome, "reinforce");
    assert.equal(result.status, "in_progress");
    assert.equal(result.nextLesson.topic, "arrays");
    assert.notEqual(result.nextLesson.id, ARRAYS_EASY);
  });

  test("mastery is left unchanged", async () => {
    const db = setup({
      progress: [{ user_id: USER, course_id: 1, topic: "arrays", mastery_level: 1 }],
    });
    const result = await adaptAfterQuiz(USER, ARRAYS_MEDIUM, 65, db);

    assert.equal(result.mastery, 1);
  });

  test("exactly at STRUGGLING_BELOW is reinforce, not struggling", async () => {
    const db = setup();
    const result = await adaptAfterQuiz(USER, ARRAYS_MEDIUM, RULES.STRUGGLING_BELOW, db);
    assert.equal(result.outcome, "reinforce");
  });

  test("one point below MASTERED_AT_OR_ABOVE is reinforce, not mastered", async () => {
    const db = setup();
    const result = await adaptAfterQuiz(
      USER,
      ARRAYS_MEDIUM,
      RULES.MASTERED_AT_OR_ABOVE - 1,
      db,
    );
    assert.equal(result.outcome, "reinforce");
  });
});

describe("progress is scoped to a course, not to a bare topic name", () => {
  test("the same topic name in two courses keeps separate mastery", async () => {
    // "functions" is a topic in Intro to Programming, Python Basics AND
    // Algebra Foundations. Keyed on topic alone, progress in one course would
    // be read when deciding what to serve in another.
    const lessons = [
      ...buildCourse({ courseId: 1, topics: ["functions"], startId: 1, startPosition: 0 }),
      ...buildCourse({ courseId: 2, topics: ["functions"], startId: 10, startPosition: 0 }),
    ];
    const db = makeFakeDb({
      lessons,
      progress: [
        { user_id: USER, course_id: 1, topic: "functions", mastery_level: 1 },
      ],
    });

    // Ace the *course 2* "functions" easy lesson (id 10).
    const result = await adaptAfterQuiz(USER, 10, 100, db);

    // Course 2 starts from zero, so this is a first pass — not an advance.
    assert.equal(result.mastery, 1);
    assert.equal(result.status, "in_progress");

    const courseOne = db.progressRows.find((r) => r.course_id === 1);
    const courseTwo = db.progressRows.find((r) => r.course_id === 2);
    assert.equal(courseOne.mastery_level, 1, "course 1 mastery was modified");
    assert.equal(courseTwo.mastery_level, 1);
  });
});

describe("the decision is recorded", () => {
  test("a recommendation row captures the outcome and the next lesson", async () => {
    const db = setup();
    const result = await adaptAfterQuiz(USER, ARRAYS_MEDIUM, 100, db);

    assert.equal(db.recommendations.length, 1);
    const row = db.recommendations[0];
    assert.equal(row.user_id, USER);
    assert.equal(row.lesson_id, ARRAYS_MEDIUM);
    assert.equal(row.next_lesson_id, result.nextLesson.id);
    assert.equal(row.score, 100);
    assert.equal(row.outcome, "mastered");
    assert.match(row.reason, /100%/);
  });

  test("two learners taking the same lesson are routed differently", async () => {
    // The claim the whole project rests on, asserted directly.
    const failing = await adaptAfterQuiz(USER, ARRAYS_MEDIUM, 20, setup());
    const acing = await adaptAfterQuiz(USER, ARRAYS_MEDIUM, 95, setup());

    assert.notEqual(failing.nextLesson.id, acing.nextLesson.id);
    assert.equal(failing.nextLesson.difficulty, "easy");
    assert.equal(acing.nextLesson.difficulty, "hard");
  });

  test("an unknown lesson is rejected rather than silently adapting", async () => {
    const db = setup();
    await assert.rejects(() => adaptAfterQuiz(USER, 9999, 50, db), /not found/);
  });
});
