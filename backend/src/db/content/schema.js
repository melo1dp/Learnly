// Shape of the seed curriculum, plus the checks that keep it compatible with
// the adaptation engine.
//
// A course is: topics in teaching order, each offering an easy / medium / hard
// lesson. The engine leans on that hard:
//
//   * "you're struggling"  -> it looks for an EASIER lesson on the SAME topic
//   * "you've got this"    -> it looks for a HARDER lesson on the SAME topic
//   * "you've mastered it" -> it takes the first lesson with a GREATER position
//                             and a DIFFERENT topic
//
// So every topic needs all three difficulties, and a topic's lessons must occupy
// a contiguous block of positions — otherwise "skip to the next topic" can land
// back inside the topic the learner just finished. Positions are therefore
// derived here rather than written by hand.

export const DIFFICULTIES = ['easy', 'medium', 'hard'];

// ---------------------------------------------------------------------------
//  Answer-key de-biasing
// ---------------------------------------------------------------------------
// Hand-written quizzes drift towards putting the correct answer first — one of
// the seed courses landed 62% of its answers on option A. A learner who always
// taps the first option would then "pass", which quietly poisons the whole
// adaptation demo. So the options get shuffled at seed time and correct_index
// is remapped to follow the right answer to its new slot.
//
// None of the seed questions use order-dependent options ("all of the above"),
// so reordering is safe. The PRNG is seeded and the shuffle is keyed by the
// question text, which keeps a reset reproducible.

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Shuffle a question's options, keeping correct_index pointed at the same answer. */
export function shuffleQuestion(question) {
  const rand = mulberry32(hashString(question.text));
  const correctAnswer = question.options[question.correct_index];

  const options = [...question.options];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return { ...question, options, correct_index: options.indexOf(correctAnswer) };
}

/**
 * Flatten a course into rows ready for insertion, assigning positions in
 * topic order and, within a topic, easy -> medium -> hard.
 */
export function flattenCourse(course) {
  const lessons = [];
  let position = 1;

  for (const { topic, lessons: byDifficulty } of course.topics) {
    for (const difficulty of DIFFICULTIES) {
      const lesson = byDifficulty[difficulty];
      lessons.push({ ...lesson, topic, difficulty, position: position++ });
    }
  }

  return lessons;
}

/**
 * Fail loudly at seed time rather than shipping a curriculum the engine can't
 * navigate. Returns a list of problems; empty means good.
 */
export function validateCourse(course) {
  const problems = [];
  const at = (msg) => problems.push(`[${course.title}] ${msg}`);

  if (!course.title) at('missing title');
  if (!course.topics?.length) at('has no topics');

  const seenTopics = new Set();

  for (const { topic, lessons } of course.topics ?? []) {
    if (seenTopics.has(topic)) {
      // Two blocks of the same topic would break the contiguity the engine needs.
      at(`topic "${topic}" appears twice — merge them into one block`);
    }
    seenTopics.add(topic);

    for (const difficulty of DIFFICULTIES) {
      const lesson = lessons?.[difficulty];
      if (!lesson) {
        at(`topic "${topic}" is missing its ${difficulty} lesson`);
        continue;
      }
      if (!lesson.title) at(`topic "${topic}" (${difficulty}) has no title`);
      if (!lesson.body?.trim()) at(`topic "${topic}" (${difficulty}) has an empty body`);

      const questions = lesson.questions ?? [];
      if (questions.length < 2) {
        at(`"${lesson.title}" has ${questions.length} question(s) — a quiz needs at least 2`);
      }

      questions.forEach((q, i) => {
        const where = `"${lesson.title}" Q${i + 1}`;
        if (!q.text?.trim()) at(`${where} has no text`);
        if (!Array.isArray(q.options) || q.options.length < 2) {
          at(`${where} needs at least 2 options`);
          return;
        }
        if (q.options.some((o) => !String(o).trim())) at(`${where} has a blank option`);
        if (new Set(q.options).size !== q.options.length) at(`${where} has duplicate options`);
        if (!Number.isInteger(q.correct_index) ||
            q.correct_index < 0 ||
            q.correct_index >= q.options.length) {
          at(`${where} has correct_index ${q.correct_index}, outside its ${q.options.length} options`);
        }
      });
    }
  }

  return problems;
}
