// Small derived-stat helpers shared by the dashboard and profile screens.
// Everything here is computed from data the API already returns (attempts,
// mastery, course/topic/category lists) — no new backend endpoints.

function dayKey(dateLike) {
  return new Date(dateLike).toISOString().slice(0, 10);
}

/** Consecutive days (ending today or yesterday) with at least one quiz attempt. */
export function computeStreak(attempts) {
  if (!attempts?.length) return 0;
  const days = new Set(attempts.map((a) => dayKey(a.taken_at)));

  let cursor = new Date();
  if (!days.has(dayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/**
 * A timestamp a person can read. Postgres hands back an ISO string
 * ("2026-08-14T09:31:07.221Z"), which was being rendered verbatim into the UI.
 */
export function formatWhen(dateLike) {
  const date = new Date(dateLike);
  if (Number.isNaN(date.getTime())) return '';

  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
  });
}

export function attemptsInLastDays(attempts, days = 7) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return (attempts || []).filter((a) => new Date(a.taken_at).getTime() >= cutoff).length;
}

/** One entry per of the last `days` days (oldest first), with that day's attempt count. */
export function dailyAttemptCounts(attempts, days = 7) {
  const counts = new Map();
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    counts.set(dayKey(d), 0);
  }
  for (const a of attempts || []) {
    const key = dayKey(a.taken_at);
    if (counts.has(key)) counts.set(key, counts.get(key) + 1);
  }
  return Array.from(counts.entries()).map(([date, count]) => ({ date, count }));
}

export function computeBadges({ attempts = [], mastery = [] }) {
  const masteredCount = mastery.filter((m) => m.status === 'mastered').length;
  const streak = computeStreak(attempts);
  const hasPerfect = attempts.some((a) => a.score === 100);

  return [
    { key: 'first-quiz', label: 'First Quiz', icon: 'flag', earned: attempts.length >= 1 },
    { key: 'perfectionist', label: 'Perfectionist', icon: 'star', earned: hasPerfect },
    { key: 'on-a-roll', label: 'On a Roll', icon: 'flame', earned: streak >= 3 },
    { key: 'topic-master', label: 'Topic Master', icon: 'ribbon', earned: masteredCount >= 1 },
    { key: 'dedicated', label: 'Dedicated Learner', icon: 'trophy', earned: attempts.length >= 10 },
    { key: 'renaissance', label: 'Renaissance Learner', icon: 'planet', earned: masteredCount >= 5 },
  ];
}

// Matches RULES.MASTERY_TO_ADVANCE in the engine, which clamps mastery_level to
// that value. If they drift apart the radar chart silently mis-normalises.
const MASTERY_CAP = 2;

/**
 * Index mastery rows for lookup by (course, topic).
 *
 * Keyed on the pair, not on `topic` alone: topic names repeat across the
 * curriculum — "functions" is a topic in Intro to Programming, Python Basics
 * *and* Algebra Foundations — so a topic-only key would show a learner's
 * Python progress on their algebra course.
 *
 * Built once by the caller and passed in, because it used to be rebuilt inside
 * courseCompletion on every call: once per course tile, on every keystroke of
 * the catalogue search.
 */
export function masteryIndex(mastery) {
  const index = new Map();
  for (const m of mastery || []) {
    index.set(`${m.course_id}:${m.topic}`, m);
  }
  return index;
}

/** Average mastery_level (0-1 normalized) per course category, for the radar chart.
 *  `courses` must include each course's `category` and `topics` (as returned by
 *  GET /courses). A topic with no mastery row yet counts as 0. */
export function masteryByCategory(courses, index) {
  const byCategory = new Map();

  for (const course of courses || []) {
    const category = course.category || 'Other';
    if (!byCategory.has(category)) byCategory.set(category, { total: 0, count: 0 });
    const bucket = byCategory.get(category);
    for (const topic of course.topics || []) {
      bucket.total += index.get(`${course.id}:${topic}`)?.mastery_level || 0;
      bucket.count += 1;
    }
  }

  return Array.from(byCategory.entries())
    .filter(([, b]) => b.count > 0)
    .map(([category, b]) => ({
      category,
      value: Math.min(b.total / b.count / MASTERY_CAP, 1),
    }));
}

/** Per-course completion: % of that course's topics at 'mastered' status. */
export function courseCompletion(course, index) {
  const topics = course.topics || [];
  if (topics.length === 0) return { pct: 0, status: 'not_started' };

  let masteredCount = 0;
  let startedCount = 0;
  for (const topic of topics) {
    const row = index.get(`${course.id}:${topic}`);
    if (!row) continue;
    startedCount += 1;
    if (row.status === 'mastered') masteredCount += 1;
  }
  const pct = masteredCount / topics.length;

  let status = 'not_started';
  if (masteredCount === topics.length) status = 'completed';
  else if (startedCount > 0) status = 'in_progress';

  return { pct, status };
}
