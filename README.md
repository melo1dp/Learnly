# Learnly — Adaptive E-Learning Platform

A mini e-learning platform with **rules-based adaptive content delivery**. After each quiz,
an adaptation engine decides what the learner should study next based on their score —
remedial content when struggling, harder content when mastering a topic.

The client is a **native mobile app** (iOS + Android) built with React Native and Expo,
talking to a Node/Express API backed by SQLite.

---

## Contents

- [What's in the box](#whats-in-the-box)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Running the app — macOS](#running-the-app--macos)
- [Running the app — Windows](#running-the-app--windows)
- [Running on a physical phone](#running-on-a-physical-phone)
- [Demo accounts](#demo-accounts)
- [How the adaptation works](#how-the-adaptation-works)
- [Project layout](#project-layout)
- [Available scripts](#available-scripts)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

---

## What's in the box

| Layer    | Choice                                                          |
| -------- | --------------------------------------------------------------- |
| Mobile   | React Native + Expo (SDK 57), expo-router                       |
| Backend  | Node + Express (REST, port 4000)                                |
| Database | SQLite via better-sqlite3 (a single file, no server to install) |
| Auth     | JWT + bcrypt; the token is stored in the device keychain        |

Seed curriculum: **13 courses, 117 lessons, 618 quiz questions** across computing, maths, science, social science, and humanities.

### What to highlight in the demo

- Sign in or create an account, then browse the course catalogue.
- Open a lesson, answer a quiz, and watch the adaptive path update.
- Switch to the instructor role to create a new course or lesson.

---

## Prerequisites

### Required on every platform

| Tool        | Version                        | Notes                                                                                                                |
| ----------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Node.js** | **20.19.4+**, 22.13+, or 24.3+ | React Native rejects older versions. [nodejs.org](https://nodejs.org) — the LTS build is fine. Check with `node -v`. |
| **npm**     | 10+                            | Ships with Node. Check with `npm -v`.                                                                                |
| **Git**     | any                            | To clone the repo.                                                                                                   |

You also need **a device to run the app on** — pick at least one:

- an **iOS Simulator** (macOS only),
- an **Android emulator** (macOS or Windows), or
- a **physical phone** with the free **Expo Go** app (macOS or Windows — the easiest option
  if you don't want to install Xcode or Android Studio).

### To use the iOS Simulator (macOS only)

- **Xcode** from the Mac App Store, plus its command-line tools.
- Open Xcode once and let it install its additional components.
- Install a simulator runtime: _Xcode → Settings → Components → iOS Simulator_.
- Verify: `xcodebuild -version` prints a version.

> iOS builds are **not possible on Windows** — this is an Apple restriction, not a project
> limitation. On Windows, use an Android emulator or Expo Go on a phone.

### To use an Android emulator (macOS or Windows)

- **Android Studio** ([developer.android.com/studio](https://developer.android.com/studio)).
- During setup, make sure these are ticked: _Android SDK_, _Android SDK Platform_,
  _Android Virtual Device_.
- Create an emulator: _Android Studio → Device Manager → Create Device_ (any recent Pixel,
  with a Google Play system image).
- Set the `ANDROID_HOME` environment variable:
  - **macOS** — add to `~/.zshrc`:
    ```bash
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
    ```
    then run `source ~/.zshrc`.
  - **Windows** — _Settings → System → About → Advanced system settings → Environment
    Variables_. Add a user variable `ANDROID_HOME` =
    `C:\Users\<you>\AppData\Local\Android\Sdk`, and add
    `%ANDROID_HOME%\platform-tools` to `Path`.
- Verify: `adb --version` prints a version.

---

## Quick start

```bash
git clone <repo-url>
cd Learnly

npm install       # installs backend + mobile dependencies (one npm workspaces install)
npm run db:reset  # creates and seeds backend/Learnly.sqlite
npm run dev       # starts the API on :4000 and the Expo dev server together
```

`npm run dev` prints a QR code and a menu. From there, press:

| Key      | Action                            | Works on                        |
| -------- | --------------------------------- | ------------------------------- |
| `i`      | open the iOS Simulator            | macOS only                      |
| `a`      | open the Android emulator         | macOS, Windows                  |
| —        | scan the QR code with **Expo Go** | macOS, Windows (physical phone) |
| `r`      | reload the app                    |                                 |
| `Ctrl+C` | stop                              |                                 |

> ⚠️ **`npm run db:reset` wipes the database and re-seeds it.** That's how you get the demo
> courses and accounts, but it also deletes any quiz attempts you've recorded. Run it once
> on first setup, and after that only when you want a clean slate.

---

## Running the app — macOS

**1. Install Node** (if `node -v` prints below 20.19.4):

```bash
brew install node
```

**2. Install and seed:**

```bash
npm install
npm run db:reset
```

**3. Start everything:**

```bash
npm run dev
```

**4. Press `i`** to launch the iOS Simulator. The app builds and opens automatically.

Prefer to skip the interactive menu? Run the two halves in separate terminals:

```bash
# terminal 1
npm run dev:backend

# terminal 2
npm run ios        # or: npm run android
```

The first native build takes a few minutes while Xcode compiles; subsequent launches are
fast.

---

## Running the app — Windows

Everything works on Windows **except the iOS Simulator** (Apple does not permit iOS builds
off macOS). Use an Android emulator or a physical phone with Expo Go.

Use **PowerShell** or **Command Prompt** — the commands are identical to macOS.

**1. Install Node** from [nodejs.org](https://nodejs.org) (LTS), or with winget:

```powershell
winget install OpenJS.NodeJS.LTS
```

Close and reopen your terminal afterwards so `PATH` updates, then check `node -v`.

**2. Install and seed:**

```powershell
npm install
npm run db:reset
```

`better-sqlite3` is a native module. It normally installs a prebuilt binary with no
compiler needed. If — and only if — `npm install` fails while building it, install the C++
build tools and retry:

```powershell
winget install Microsoft.VisualStudio.2022.BuildTools
```

Then in the Visual Studio Installer, tick the **"Desktop development with C++"** workload.
Reopen your terminal and run `npm install` again.

**3. Start the Android emulator** — open Android Studio → Device Manager → ▶ on your
virtual device. Wait for it to reach the home screen.

**4. Start everything:**

```powershell
npm run dev
```

**5. Press `a`** to install and open the app on the running emulator.

Or, in two terminals:

```powershell
# terminal 1
npm run dev:backend

# terminal 2
npm run android
```

---

## Running on a physical phone

This is the quickest route on either OS, and needs no Xcode or Android Studio.

1. Install **Expo Go** from the App Store or Google Play.
2. Put your phone and your computer **on the same Wi-Fi network**.
3. Run `npm run dev`.
4. Scan the QR code — **iOS:** the Camera app. **Android:** the "Scan QR code" button
   inside Expo Go.

The app figures out your computer's LAN address automatically (it reuses the host it
downloaded its JavaScript from), so the API just works with no configuration.

**If the app loads but every screen says it can't reach the backend,** your firewall is
blocking port 4000:

- **Windows** — the first run usually pops up a Windows Defender prompt; click **Allow
  access** and tick _Private networks_. If you dismissed it, add an inbound rule for port
  4000 in _Windows Defender Firewall → Advanced Settings_.
- **macOS** — _System Settings → Network → Firewall → Options_ → allow incoming connections
  for `node`.

---

## Demo accounts

Created by `npm run db:reset`:

| Role       | Email                    | Password      |
| ---------- | ------------------------ | ------------- |
| Student    | `student@learnly.dev`    | `password123` |
| Instructor | `instructor@learnly.dev` | `password123` |

Log in as the **student** to see the adaptive path in action. Log in as the **instructor**
to author a new course or lesson (a `+` appears in the header).

---

## How the adaptation works

When a student submits a quiz, [`backend/src/engine/adaptation.js`](backend/src/engine/adaptation.js) runs:

- **score < 50%** → mastery drops → recommend an **easier** lesson on the same topic
- **score ≥ 80%** → mastery rises → a **harder** lesson, and once mastery reaches 2,
  **skip ahead to the next topic**
- **otherwise** → recommend another **medium** lesson to reinforce the topic

Two students taking the same course are therefore routed down different paths. The
thresholds are all in one `RULES` object at the top of that file if you want to tune them.

**To see it happen:** log in as the student, open any lesson, take its quiz, and deliberately
answer everything wrong — the result screen will route you _down_ to an easier lesson. Ace
two quizzes on the same topic instead and it promotes you to a new topic entirely.

---

## Project layout

```
Learnly/
├── backend/                    Node + Express REST API, SQLite
│   └── src/
│       ├── engine/adaptation.js    ★ the rules-based recommendation engine
│       ├── routes/                 auth, courses, lessons, quizzes, progress
│       ├── db/schema.sql           the seven-table schema
│       ├── db/seed.js              inserts the curriculum
│       └── db/content/             the curriculum — one module per course
└── mobile/                     React Native (Expo) app
    ├── app/                        expo-router file-based routes
    │   ├── _layout.jsx             auth guard + navigation stack
    │   ├── (tabs)/                 Courses · My Progress
    │   ├── courses/, lessons/, quizzes/
    │   └── login.jsx, register.jsx
    ├── components/ui.jsx           shared UI primitives
    └── lib/                        api client, auth context, theme
```

To add a course to the seed data, drop a new module in `backend/src/db/content/`, list it in
that folder's `index.js`, and re-run `npm run db:reset`. The seeder validates the curriculum
before it writes anything, so a malformed course fails loudly instead of producing a broken
database.

---

## Available scripts

Run these from the **repo root**:

| Script                | What it does                                     |
| --------------------- | ------------------------------------------------ |
| `npm run dev`         | Backend + Expo dev server together               |
| `npm run dev:backend` | Just the API, on :4000 (auto-restarts on change) |
| `npm run dev:mobile`  | Just the Expo dev server                         |
| `npm run ios`         | Build and open on the iOS Simulator (macOS only) |
| `npm run android`     | Build and open on the Android emulator           |
| `npm run db:reset`    | **Wipe** and re-seed the database                |

---

## Configuration

The backend reads `PORT` (default `4000`) and `JWT_SECRET` from the environment, via a
`.env` file in `backend/` if you make one:

```
PORT=4000
JWT_SECRET=change-me-in-production
```

The app resolves the API address in this order:

1. **`EXPO_PUBLIC_API_URL`**, if set — use this to point at a staging or production API, and
   note it is **required** for a packaged (non-development) build:
   ```bash
   EXPO_PUBLIC_API_URL=https://api.example.com npm run dev:mobile
   ```
2. Otherwise, in development, the host serving the JS bundle (your computer), on port 4000.

See [`mobile/lib/api.js`](mobile/lib/api.js).

---

## Troubleshooting

**`npm install` fails building better-sqlite3 (Windows).**
Install the C++ build tools — see [step 2 of the Windows guide](#running-the-app--windows).

**"Database file not found" when the backend starts.**
Run `npm run db:reset`.

**The app opens but every screen shows "Can't reach the Learnly backend…".**
The API isn't running or is unreachable. Confirm `npm run dev:backend` is up by visiting
<http://localhost:4000/api/health> — it should return `{"ok":true}`. On a physical phone,
this is almost always a firewall blocking port 4000; see
[Running on a physical phone](#running-on-a-physical-phone).

**Metro fails with "Unable to resolve module …".**
Stale caches. Stop the dev server and run:

```bash
npx expo start --clear
```

If that doesn't do it, reinstall from the repo root:

```bash
rm -rf node_modules mobile/node_modules && npm install
```

**Pressing `a` says no emulator is running.**
Start the emulator from Android Studio's Device Manager _first_, wait for the Android home
screen, then press `a`.

**Pressing `i` does nothing / Xcode errors (macOS).**
Open Xcode once, accept the licence, and install a simulator runtime under
_Settings → Components_.

**The login screen keeps reappearing after I log in.**
The stored token is stale — usually because the database was re-seeded underneath it. Tap
**Log out**, or reinstall the app in the simulator, and log in again.
