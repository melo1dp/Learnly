# Learnly — Adaptive E-Learning Platform
### Project Report

> A report outline for a mini project. Fill the *[bracketed]* bits with your name,
> course code, and any screenshots. Everything else describes the system as built.

---

## 1. Abstract

Learnly is a **mobile** e-learning platform that delivers **adaptive content**: instead of
showing every learner the same lessons in the same order, it adjusts each learner's path
based on how they perform on quizzes. A learner who struggles is routed to easier,
remedial material; a learner who demonstrates mastery is advanced to harder content or a
new topic. The adaptation is driven by a transparent, **rules-based engine** rather than
machine learning, making the behaviour predictable, explainable, and fully demonstrable.

The system ships as a native iOS/Android app (React Native + Expo) talking to a Node/Express
REST API over JWT-authenticated HTTP, backed by SQLite.

---

## 2. Problem Statement & Objectives

**Problem.** Traditional online courses are "one size fits all." Fast learners are bored;
struggling learners are left behind because content does not respond to their needs.

**Objective.** Build a platform that personalises the learning path automatically, and
deliver it on the device learners actually carry.

**Specific goals**
1. Let learners register, browse courses, study lessons, and take quizzes on a phone.
2. Automatically grade quizzes and record each learner's performance.
3. Adapt the next recommended lesson to the learner's demonstrated ability.
4. Let instructors author courses, lessons, and quizzes from the same app.
5. Show learners their progress (mastery per topic, quiz history).

---

## 3. Scope

**In scope (delivered)**
- Native mobile client (iOS + Android) from a single React Native codebase
- Authentication with two roles (student, instructor)
- Course / lesson / quiz browsing and consumption
- Automatic quiz grading
- Rules-based adaptation engine
- Learner progress dashboard
- Instructor authoring (create courses, lessons, and quizzes)
- A seed curriculum of 13 courses / 117 lessons / 618 questions spanning computing and non-CS subjects

**Deliberately out of scope** (stated to show conscious scoping)
- Machine-learning / AI-based recommendation
- A parallel web client (the project targets mobile only; see the note below)
- Video streaming, file uploads, rich-text authoring
- Payments, certificates, discussion forums
- Offline mode / background sync

> **Scoping note 1 — rules over ML.** We chose a **rules-based** engine on purpose. For a
> mini project it is achievable in the time available, requires no training data, and —
> importantly — its decisions can be explained line-by-line in this report and shown live
> in a demo.
>
> **Scoping note 2 — mobile over web.** An earlier iteration of this project had a React +
> Vite web client. It was replaced by a React Native app rather than kept alongside it: two
> clients would double the surface area to maintain and test for no additional marks. The
> API is client-agnostic, so a web front end could be re-added later without touching the
> backend.

---

## 4. Literature / Background (short)

Adaptive learning systems generally fall into three tiers of sophistication:

| Tier | Approach | Example |
|------|----------|---------|
| Rules-based | `if score < X then …` explicit rules | **This project** |
| Knowledge/mastery models | track a proficiency value per skill | Bayesian Knowledge Tracing |
| ML / AI | learn patterns from many learners | Deep Knowledge Tracing |

We implement Tier 1, and additionally keep a lightweight per-topic **mastery level** (a
small integer nudged up/down), which borrows the core idea from Tier 2 without its
complexity. *[Cite 1–2 sources your course expects here.]*

---

## 5. System Architecture

A classic **three-tier architecture**, with a native client as the presentation tier:

```
┌───────────────────────────────────────────────┐
│  PRESENTATION — React Native app (Expo)       │
│  Login · Courses · Lesson · Quiz · Dashboard  │
│  Instructor: New Course · New Lesson+Quiz     │
│  JWT stored in the device keychain/keystore   │
└──────────────────────┬────────────────────────┘
                       │  HTTP / JSON (REST), JWT in Authorization header
┌──────────────────────▼────────────────────────┐
│  APPLICATION  — Node + Express REST API       │
│  ┌───────────┐  ┌──────────────────────────┐  │
│  │ Auth      │  │ Courses / Lessons / Quiz │  │
│  │ (JWT)     │  └───────────┬──────────────┘  │
│  └───────────┘              │ on quiz submit  │
│                    ┌────────▼───────────────┐  │
│                    │ ★ ADAPTATION ENGINE    │  │
│                    │  (rules + mastery)     │  │
│                    └────────────────────────┘  │
└──────────────────────┬────────────────────────┘
                       │  SQL (better-sqlite3)
┌──────────────────────▼────────────────────────┐
│  DATA  — SQLite (single file)                 │
│  users · courses · lessons · quizzes ·        │
│  questions · attempts · learner_progress      │
└───────────────────────────────────────────────┘
```

**Technology choices and justification**

| Layer | Technology | Why |
|-------|-----------|-----|
| Mobile client | React Native + Expo (SDK 57) | One codebase for iOS and Android; Expo removes most native build setup |
| Navigation | expo-router | File-based routes; a route guard replaces per-page auth wrappers |
| Token storage | expo-secure-store | Keychain (iOS) / Keystore (Android) — not plain device storage |
| Backend | Node + Express | Lightweight, ubiquitous, easy REST |
| Database | SQLite (better-sqlite3) | Zero-setup single file; graders run it instantly |
| Auth | JWT + bcrypt | Stateless auth; passwords never stored in plaintext |
| Repo | npm workspaces monorepo | Backend + mobile in one place, one `npm run dev` |

**A note on the API base URL.** A browser can proxy `/api` to the backend; a phone cannot —
it is a separate device and needs an absolute address. In development the app derives the
API host from the address it downloaded its own JS bundle from, so a physical handset on
the same Wi-Fi finds the backend with no configuration. A packaged build instead requires
`EXPO_PUBLIC_API_URL` to be set. See `mobile/lib/api.js`.

---

## 6. Data Model

Seven tables (see `backend/src/db/schema.sql`):

| Table | Purpose | Key fields |
|-------|---------|-----------|
| `users` | students & instructors | role, password_hash |
| `courses` | top-level container | title, description |
| `lessons` | content units | **topic**, **difficulty**, position |
| `quizzes` | one per lesson | lesson_id |
| `questions` | quiz items | options (JSON), correct_index |
| `attempts` | every quiz submission | score, taken_at |
| `learner_progress` | the learner's living profile | **mastery_level**, status |

**Entity relationships**

```
users ──< attempts >── quizzes ──1:1── lessons >── courses
  │                                       │
  └──< learner_progress (per topic)       └──< questions
```

The two fields that make adaptation possible are **`lessons.difficulty`** (easy/medium/hard)
and **`learner_progress.mastery_level`** — one describes content, the other describes the
learner, and the engine reads and writes both.

**An invariant worth stating.** `lessons.position` orders lessons within a course, and the
engine's "skip to the next topic" rule selects the first lesson with a *greater position and
a different topic*. That is only correct if each topic occupies a **contiguous block** of
positions — otherwise "advance" can land the learner back inside the topic they just
finished. Positions are therefore **derived at seed time** from the order of the curriculum
data (`backend/src/db/content/schema.js`) rather than numbered by hand, so the invariant
cannot be broken by a typo.

---

## 7. The Adaptation Engine (core contribution)

Location: `backend/src/engine/adaptation.js`. It runs every time a quiz is submitted.

**Inputs:** the learner, the lesson just quizzed, and the score (0–100).
**Outputs:** an updated mastery level + status, a human-readable reason, and the next
recommended lesson.

**The rules**

```
score = graded percentage

if score < 50%:                      # STRUGGLING
    mastery -= 1  (floored at 0)
    status  = needs_review
    next    = an EASIER lesson on the same topic

elif score >= 80%:                   # MASTERED
    mastery += 1
    if mastery >= 2:                 # confident mastery
        status = mastered
        next   = first lesson of the NEXT topic   (skip ahead)
    else:
        next   = a HARDER lesson on the same topic (lock it in)

else:                                # 50–79% — REINFORCE
    status = in_progress
    next   = another MEDIUM lesson on the same topic
```

Thresholds live in one `RULES` object at the top of the file, so the "adaptivity" is
tunable in a single place — useful to demonstrate and to discuss in a viva.

**Why it is adaptive.** Two learners taking the *same* course receive *different* next
lessons depending on their scores — the path is computed per learner, not fixed.

**Worked example (captured from live testing against the running API)**

| Learner action | Score | Engine outcome | Next lesson served |
|----------------|-------|----------------|--------------------|
| Fails the *Inserting and Removing Elements* quiz (`arrays`/medium) | 0% | `struggling`, mastery stays 0 | *Arrays and Indexing* (`arrays`/**easy**) — stepped down |
| Aces *Arrays and Indexing* (`arrays`/easy) | 100% | `mastered`, mastery 0→1 | *Inserting and Removing Elements* (`arrays`/**medium**) — stepped up, same topic |
| Aces that too | 100% | `mastered`, mastery 1→**2** | *Key-Value Lookups with Hash Maps* (`hash-maps`/easy) — **skipped to the next topic** |

The third row is the one to demonstrate: mastery crossing the threshold of 2 is what
promotes the learner out of the topic entirely, rather than merely to a harder lesson
within it.

---

## 8. The Seed Curriculum

Content lives in `backend/src/db/content/` as one module per course, kept separate from the
insertion logic in `seed.js`.

| Course | Topics (teaching order) |
|--------|-------------------------|
| Intro to Programming | variables → loops → functions |
| Web Development Foundations | html → css → dom |
| Databases & SQL | tables → queries → joins |
| Data Structures Essentials | arrays → hash-maps → complexity |
| Python Basics | syntax → functions → collections |

**13 courses · 39 topics · 117 lessons · 618 questions.** Every topic carries an easy, a
medium and a hard lesson — a hard requirement, because the engine's "give me something
easier / harder on this topic" queries return nothing if a rung of the ladder is missing.
Each lesson body is ~180 words: the concept, a worked example, a common mistake, and a
one-line takeaway.

Two safeguards run at seed time, both in `content/schema.js`:

- **Validation.** The curriculum is checked *before* the database is touched — every topic
  has all three difficulties, every `correct_index` lies inside its options array, no blank
  or duplicate options. A malformed course aborts the seed instead of producing a database
  the engine cannot navigate.
- **Answer-key shuffling.** Hand-written quizzes drift toward putting the correct answer
  first; one course was measured at 62% option-A. A learner who simply always tapped the
  first option would have scored 62% — read by the engine as "reinforce" — which would
  quietly invalidate any demonstration. Options are therefore deterministically shuffled at
  seed time (seeded PRNG keyed by question text, so a reset is reproducible) and
  `correct_index` is remapped to follow its answer.

---

## 9. Feature List (MVP status)

| # | Feature | Status |
|---|---------|--------|
| 1 | Register / login (student & instructor) | ✅ Done |
| 2 | Browse courses → course → lessons | ✅ Done |
| 3 | Read a lesson, take its quiz | ✅ Done |
| 4 | Auto-grade quiz, store attempt | ✅ Done |
| 5 | **Adaptation engine recommends next lesson** | ✅ Done |
| 6 | Progress dashboard (mastery + history) | ✅ Done |
| 7 | Instructor authoring (courses, lessons, quizzes) | ✅ Done |
| 8 | Configurable rule thresholds | ✅ Done |
| 9 | Runs natively on iOS and Android | ✅ Done |
| — | ML-based recommendation | ❌ Out of scope (see §3) |
| — | Web client | ❌ Out of scope (see §3) |

---

## 10. API Reference (summary)

| Method & path | Auth | Purpose |
|---------------|------|---------|
| `POST /api/auth/register` | – | Create account, returns JWT |
| `POST /api/auth/login` | – | Log in, returns JWT |
| `GET /api/auth/me` | token | Current user |
| `GET /api/courses` | token | List courses |
| `GET /api/courses/:id` | token | Course + its lessons |
| `POST /api/courses` | instructor | Create course |
| `GET /api/lessons/:id` | token | Lesson + quiz reference |
| `POST /api/lessons` | instructor | Create lesson (+ optional quiz) |
| `GET /api/quizzes/:id` | token | Quiz questions (**no answers**) |
| `POST /api/quizzes/:id/submit` | token | Grade + **run adaptation** |
| `GET /api/progress` | token | Learner mastery + attempts |

Security notes: passwords are bcrypt-hashed; routes are JWT-protected; instructor-only
routes are gated by a role check; quiz answers are never sent to the client; on the device
the JWT is held in the OS keychain rather than plain storage.

---

## 11. Testing

Approach: **manual API testing** with `curl`, plus a **UI walkthrough on the iOS
Simulator**. Every result below was observed against the running system, not assumed.

**Adaptation behaviour**

| Test | Expected | Result |
|------|----------|--------|
| Submit all-wrong quiz on a medium lesson | `struggling`, easier lesson, same topic | ✅ served `arrays`/easy |
| Submit all-correct quiz (first time) | `mastered`, mastery→1, harder lesson, same topic | ✅ served `arrays`/medium |
| Submit all-correct quiz (mastery reaches 2) | `mastered`, **skip to next topic** | ✅ served `hash-maps`/easy |

**Authorisation and validation**

| Test | Expected | Result |
|------|----------|--------|
| Login with seeded student | 200 + token | ✅ |
| Login with wrong password | 401 | ✅ |
| Request `/api/courses` with no token | 401 | ✅ |
| Student attempts to create a course | 403 Forbidden | ✅ |
| Lesson posted with out-of-range `correct_index` | 400 Bad Request | ✅ |
| `GET /api/quizzes/:id` response inspected for answers | no `correct_index` field | ✅ no leak |

**Data integrity**

| Test | Expected | Result |
|------|----------|--------|
| Curriculum validator over all 13 courses | no structural defects | ✅ |
| Answer text preserved through the seed-time shuffle | 618/618 intact | ✅ |
| Answer-key distribution after shuffling | no dominant option | ✅ 25% / 28% / 33% / 13% |
| Mobile app bundles for iOS | no resolution or syntax errors | ✅ |

**Defects found and fixed during testing** (worth reporting honestly — each was invisible to
the layer above it):

1. The app crashed on *every* screen because the API base URL was computed at module load
   and threw when it could not resolve a host; this took down the whole module graph and
   surfaced as a misleading "missing default export" warning. Resolving it lazily fixed it.
   It compiled cleanly throughout — only *running* the app exposed this.
2. A DOM quiz question asserted that registering the same `addEventListener` handler twice
   fires it twice. Per the DOM specification an identical registration is discarded, so it
   fires once. The lesson prose taught the same falsehood; both were corrected.
3. The answer-key bias described in §8, caught by measuring the distribution rather than by
   reading the questions.

*[Insert screenshots: login, the courses list, a quiz result banner showing adaptation, the dashboard.]*

---

## 12. Challenges & Design Decisions

- **Rules vs ML.** Chose rules for explainability and zero data requirements (§3).
- **Mastery as an integer.** A single small counter captures "getting better/worse" at a
  topic without a full statistical model.
- **Positions derived, not written.** The engine's topic-advance rule silently depends on
  contiguous positions per topic. Rather than document that as a rule for authors to
  remember, the seeder computes positions from the curriculum's structure, making the
  invariant unbreakable (§6).
- **Refetching on screen focus.** A web page re-fetches simply by being navigated to. Screens
  in a native stack stay mounted underneath the one on top, so returning from a quiz would
  otherwise show a stale mastery figure. Screens re-fetch when refocused.
- **One-shot lesson+quiz creation.** The instructor form posts a lesson and its questions
  together, wrapped in a DB transaction so it is all-or-nothing.
- **SQLite over a server DB.** Removes setup friction for anyone running/grading the project.

---

## 13. Future Work

- Instructor analytics (average score per topic, weakest topics across a cohort)
- Editing/deleting existing content (currently create-only)
- Offline mode: cache lessons so a learner can study without connectivity
- Push notifications to prompt a return to a weak topic
- A knowledge-tracing model to replace fixed thresholds
- Spaced-repetition scheduling to revisit weak topics over time
- Badges / streaks for motivation

---

## 14. How to Run

Full prerequisites and platform-specific (macOS / Windows) instructions are in the
project [README](../README.md). The short version:

```bash
npm install         # install backend + mobile dependencies
npm run db:reset    # create + seed the SQLite database
npm run dev         # backend on :4000  +  Expo dev server
```

Then press `i` for the iOS Simulator (macOS only) or `a` for an Android emulator, or scan
the QR code with **Expo Go** to run on a physical phone.

Demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Student | student@Learnly.dev | password123 |
| Instructor | instructor@Learnly.dev | password123 |

---

## 15. Conclusion

Learnly demonstrates adaptive content delivery end-to-end on a mobile device: learners follow
personalised paths produced by a transparent rules engine, instructors author content
through the app, and progress is tracked per topic. The design intentionally favours clarity
and demonstrability over algorithmic sophistication, which suits both the project scope and
the need to explain every decision the system makes.

---

### Appendix A — File map

```
backend/src/
  engine/adaptation.js     ★ the rules-based engine
  routes/                  auth, courses, lessons, quizzes, progress
  db/schema.sql            the seven-table schema
  db/seed.js               inserts the curriculum (validates it first)
  db/content/              the curriculum: one module per course
    schema.js              validation, position derivation, answer shuffling

mobile/
  app/                     expo-router file-based routes
    _layout.jsx            auth guard + navigation stack
    login.jsx, register.jsx
    (tabs)/                Courses · My Progress
    courses/[id]/          course detail; new-lesson authoring
    courses/new.jsx        new-course authoring
    lessons/[id].jsx       lesson + link to its quiz
    quizzes/[id].jsx       quiz taking + the adaptation result banner
  components/ui.jsx        shared UI primitives (Card, Button, Pill, Banner…)
  lib/api.js               REST client; resolves the API base URL
  lib/auth.jsx             session context; JWT in expo-secure-store
  lib/theme.js             design tokens
```

Adaptation is server-side only — the client never decides what comes next, it only renders
what the engine returns.
