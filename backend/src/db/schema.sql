-- Learnly adaptive e-learning schema (Postgres)
-- Kept deliberately small: six core tables cover the whole MVP.

DROP TABLE IF EXISTS learner_progress;
DROP TABLE IF EXISTS recommendations;
DROP TABLE IF EXISTS attempts;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;

-- Students and instructors
CREATE TABLE users (
  id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name          TEXT    NOT NULL,
  email         TEXT    NOT NULL UNIQUE,
  password_hash TEXT    NOT NULL,
  role          TEXT    NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'instructor')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Top-level course container
CREATE TABLE courses (
  id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT ''
);

-- Content units. `difficulty` and `topic` are what the adaptation engine reads.
CREATE TABLE lessons (
  id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  course_id     INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title         TEXT    NOT NULL,
  body          TEXT    NOT NULL DEFAULT '',
  topic         TEXT    NOT NULL,
  difficulty    TEXT    NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  position      INTEGER NOT NULL DEFAULT 0
);

-- One quiz per lesson
CREATE TABLE quizzes (
  id        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title     TEXT    NOT NULL DEFAULT 'Quiz'
);

-- Quiz questions. `options` is a native JSON array of strings; `correct_index` points into it.
-- `explanation` is only ever sent to the client after a quiz is submitted, never before.
CREATE TABLE questions (
  id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quiz_id       INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  text          TEXT    NOT NULL,
  options       JSONB   NOT NULL,          -- ["A", "B", "C", "D"]
  correct_index INTEGER NOT NULL,
  explanation   TEXT    NOT NULL DEFAULT ''
);

-- Every quiz submission, with the resulting score (0-100). The data trail.
CREATE TABLE attempts (
  id       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_id  INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  score    INTEGER NOT NULL,               -- percentage 0-100
  taken_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Adaptation decisions: why the engine recommended a next lesson after a quiz.
CREATE TABLE recommendations (
  id              INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id       INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  next_lesson_id  INTEGER REFERENCES lessons(id) ON DELETE SET NULL,
  score           INTEGER NOT NULL,
  outcome         TEXT    NOT NULL,
  reason          TEXT    NOT NULL,
  mastery         INTEGER NOT NULL,
  status          TEXT    NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- The learner's living profile: one row per (user, topic).
-- mastery_level is a small integer that the engine nudges up/down.
CREATE TABLE learner_progress (
  user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic         TEXT    NOT NULL,
  mastery_level INTEGER NOT NULL DEFAULT 0,
  status        TEXT    NOT NULL DEFAULT 'in_progress'
                  CHECK (status IN ('in_progress', 'mastered', 'needs_review')),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, topic)
);
