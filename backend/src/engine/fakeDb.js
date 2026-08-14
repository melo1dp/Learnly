// An in-memory stand-in for a pg client, for testing the adaptation engine.
//
// adaptAfterQuiz takes its database handle as a parameter (so it can join the
// quiz-submit transaction), which means the rules can be exercised without a
// live Postgres. This interprets the specific statements the engine issues
// rather than implementing SQL — if the engine's queries change shape, these
// throw loudly instead of quietly returning nothing.

function normalize(sql) {
  return sql.replace(/\s+/g, " ").trim();
}

/**
 * @param {object} opts
 * @param {Array}  opts.lessons            lesson rows
 * @param {Array}  [opts.progress]         pre-existing learner_progress rows
 * @param {Array}  [opts.attemptedLessonIds] lessons the learner already quizzed
 */
export function makeFakeDb({ lessons, progress = [], attemptedLessonIds = [] }) {
  const progressRows = progress.map((p) => ({
    mastery_level: 0,
    status: "in_progress",
    ...p,
  }));
  const recommendations = [];

  function findProgress([userId, courseId, topic]) {
    return progressRows.find(
      (r) => r.user_id === userId && r.course_id === courseId && r.topic === topic,
    );
  }

  async function query(rawSql, params = []) {
    const sql = normalize(rawSql);

    if (/^SELECT \* FROM lessons WHERE id = \$1$/.test(sql)) {
      return { rows: lessons.filter((l) => l.id === params[0]) };
    }

    if (sql.startsWith("INSERT INTO learner_progress")) {
      const [userId, courseId, topic] = params;
      if (!findProgress(params)) {
        progressRows.push({
          user_id: userId,
          course_id: courseId,
          topic,
          mastery_level: 0,
          status: "in_progress",
        });
      }
      return { rows: [] };
    }

    if (sql.includes("FROM learner_progress") && sql.includes("FOR UPDATE")) {
      const row = findProgress(params);
      return { rows: row ? [row] : [] };
    }

    if (sql.startsWith("UPDATE learner_progress")) {
      const [mastery, status, userId, courseId, topic] = params;
      const row = findProgress([userId, courseId, topic]);
      if (!row) throw new Error("FakeDb: UPDATE against a missing progress row");
      row.mastery_level = mastery;
      row.status = status;
      return { rows: [] };
    }

    // "Advance to the next topic" — must be matched before the general finder,
    // whose pattern would otherwise also match this.
    if (sql.includes("position > $2") && sql.includes("topic != $3")) {
      const [courseId, position, topic] = params;
      const match = lessons
        .filter(
          (l) => l.course_id === courseId && l.position > position && l.topic !== topic,
        )
        .sort((a, b) => a.position - b.position)[0];
      return { rows: match ? [match] : [] };
    }

    // Fallback: earliest lesson in the course with no attempt yet.
    if (sql.includes("NOT IN") && sql.includes("FROM lessons l")) {
      const [courseId, currentLessonId] = params;
      const match = lessons
        .filter(
          (l) =>
            l.course_id === courseId &&
            l.id !== currentLessonId &&
            !attemptedLessonIds.includes(l.id),
        )
        .sort((a, b) => a.position - b.position)[0];
      return { rows: match ? [match] : [] };
    }

    // The general finder, whose WHERE clause is assembled at runtime.
    const finder = sql.match(/FROM lessons WHERE (.+) ORDER BY position ASC LIMIT 1$/);
    if (finder) {
      let out = lessons.slice();
      for (const clause of finder[1].split(" AND ")) {
        const m = clause.match(/^(\w+) (=|!=) \$(\d+)$/);
        if (!m) throw new Error(`FakeDb: unhandled WHERE clause "${clause}"`);
        const [, column, op, position] = m;
        const value = params[Number(position) - 1];
        out = out.filter((l) => (op === "=" ? l[column] === value : l[column] !== value));
      }
      out.sort((a, b) => a.position - b.position);
      return { rows: out.slice(0, 1) };
    }

    if (sql.startsWith("INSERT INTO recommendations")) {
      const [user_id, lesson_id, next_lesson_id, score, outcome, reason, mastery, status] =
        params;
      recommendations.push({
        user_id,
        lesson_id,
        next_lesson_id,
        score,
        outcome,
        reason,
        mastery,
        status,
      });
      return { rows: [] };
    }

    throw new Error(`FakeDb: unhandled SQL: ${sql}`);
  }

  return { query, progressRows, recommendations };
}

/**
 * A course shaped the way the seeder builds them: every topic carries an easy,
 * a medium and a hard lesson, in contiguous position order.
 */
export function buildCourse({ courseId = 1, topics = ["arrays"], startId = 1, startPosition = 0 }) {
  const difficulties = ["easy", "medium", "hard"];
  const lessons = [];
  let id = startId;
  let position = startPosition;

  for (const topic of topics) {
    for (const difficulty of difficulties) {
      lessons.push({
        id,
        course_id: courseId,
        title: `${topic} ${difficulty}`,
        topic,
        difficulty,
        position,
      });
      id += 1;
      position += 1;
    }
  }
  return lessons;
}
