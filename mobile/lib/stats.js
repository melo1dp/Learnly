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

const MASTERY_CAP = 3;

/** Average mastery_level (0-1 normalized) per course category, for the radar chart.
 *  `courses` must include each course's `category` and `topics` (as returned by
 *  GET /courses). A topic with no mastery row yet counts as 0. */
export function masteryByCategory(courses, mastery) {
  const levelByTopic = new Map(mastery.map((m) => [m.topic, m.mastery_level]));
  const byCategory = new Map();

  for (const course of courses || []) {
    const category = course.category || 'Other';
    if (!byCategory.has(category)) byCategory.set(category, { total: 0, count: 0 });
    const bucket = byCategory.get(category);
    for (const topic of course.topics || []) {
      bucket.total += levelByTopic.get(topic) || 0;
      bucket.count += 1;
    }
  }

  return Array.from(byCategory.entries())
    .filter(([, b]) => b.count > 0)
    .map(([category, b]) => ({ category, value: b.total / b.count / MASTERY_CAP }));
}

/** Per-course completion: % of that course's topics at 'mastered' status. */
export function courseCompletion(course, mastery) {
  const statusByTopic = new Map(mastery.map((m) => [m.topic, m.status]));
  const topics = course.topics || [];
  if (topics.length === 0) return { pct: 0, status: 'not_started' };

  const masteredCount = topics.filter((t) => statusByTopic.get(t) === 'mastered').length;
  const startedCount = topics.filter((t) => statusByTopic.has(t)).length;
  const pct = masteredCount / topics.length;

  let status = 'not_started';
  if (masteredCount === topics.length) status = 'completed';
  else if (startedCount > 0) status = 'in_progress';

  return { pct, status };
}
