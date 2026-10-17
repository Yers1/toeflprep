# TOEFL Prep 2026

A free, independent practice platform for the TOEFL iBT format used since **January 21, 2026**.

Full rebuild (v3): a from-scratch research pass on the new ETS format and official scoring
guides, then a new architecture built around rubric-based feedback for Writing and Speaking.
See [`docs/RESEARCH.md`](docs/RESEARCH.md) for the format/scoring research and
[`docs/PLAN.md`](docs/PLAN.md) for the product and technical plan.

## What's here

- **2 full adaptive mock tests** — Reading and Listening in two modules (module 2 is chosen by
  your module 1 score), timed Writing and Speaking, and a 1–6 score report with CEFR and an
  approximate 0–120 equivalent.
- **All 12 January 2026 task types**, practiced individually with instant feedback:
  - Reading: Complete the Words, Read in Daily Life, Read an Academic Passage
  - Listening: Listen and Choose a Response, Conversation, Announcement, Academic Talk
  - Writing: Build a Sentence, Write an Email, Academic Discussion
  - Speaking: Listen and Repeat (20 campus scenes, 140 sentences), Take an Interview (22 sets, 88 questions)
- **Natural recorded voices** — every Listening and Speaking prompt plays a pre-recorded neural
  voice (Kokoro, Apache-2.0) from `audio/`, so the app no longer depends on robotic browser
  voices. Anything without a recording falls back to browser speech; Settings can turn the
  recordings off.
- **Writing & Speaking scored against the official ETS rubrics** — every response is broken
  down by criterion (elaboration, conventions, fluency, intelligibility, etc.), with an offline
  estimate always available and an optional AI rater for full feedback, corrections and a
  level-5 rewrite.
- **A scoring-criteria reference** (`#/criteria`) with the paraphrased ETS rubric levels,
  checklists, common score-killers and annotated sample responses at different score levels.
- **A personal study plan** from today to your test date, weighted toward your weakest
  sections, with daily tasks and two built-in mock tests.
- **A resources directory** (`#/resources`) linking every official and third-party practice
  test we could find for the 2026 format.
- **Flashcards** (`#/flashcards`) — spaced-repetition (Leitner) practice for academic
  vocabulary, in 6 decks, with example sentences and translations.
- **Listening Drill** (`#/drill`) — the Listen and Repeat mechanic (hear a sentence once,
  repeat it aloud, get scored) opened up into a daily trainer: an adjustable playback speed and
  a much bigger, rotating sentence pool, plus a per-day words-recalled log so progress across
  days is visible.
- Local history, JSON export/import, and a log for tests you take elsewhere (ETS, Magoosh, etc.).

Live app: https://toeflprep-omega.vercel.app

## Run locally

```bash
npm start
# open http://localhost:8000
```

Plain HTML, CSS and ES modules — no build step, no framework, no dependencies.

## Validate

```bash
npm test
```

Checks every practice set and both mock tests for structural correctness (question counts,
answer indices, script/voice consistency, Build-a-Sentence self-consistency, etc.) before
deploy.

It also runs a scoring calibration (`tools/calibration.mjs`): real learner responses must not be
over-scored, model answers must not be under-scored, and every grammar rule must fire on its
error and stay quiet on the correct form.

## Regenerate the recorded voices

After adding or editing any spoken text in `content/`:

```bash
pip install kokoro-onnx soundfile   # once; also needs ffmpeg on PATH
npm run audio
```

The model files `kokoro-v1.0.onnx` and `voices-v1.0.bin` come from the
[kokoro-onnx releases](https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0)
and are read from `~/tts-models` (or `KOKORO_DIR`). Only missing clips are generated, clips for
removed text are deleted, and `audio/manifest.json` is rewritten.

## How the offline estimate scores

The local estimate is deliberately conservative, because it cannot hear pronunciation or fully
parse grammar:

- The overall level is at most one level above the weakest criterion, and ties round down.
- Language and accuracy top out at 4 offline; a 5 needs the AI rater (or a teacher).
- `src/analyzers/grammar.js` flags frequent learner errors: articles, prepositions, verb patterns,
  agreement, fragments, comma splices and calques.
- Discussion: the position must come first, the example must be specific, and “I would add…”
  must not just repeat a classmate.
- Interview: an answer, a reason and a specific example are needed for 4+; pace under 100 wpm or
  two or more long pauses pull fluency down; recognizer confidence can lower intelligibility but
  never confirm a 5.
- Listen and Repeat: a missing content word is level 3, as in the ETS descriptor; level 4 allows
  only one or two small changes.

## Optional AI feedback

Writing and Speaking can be scored by an AI rater in two ways:

1. **Server** — set `ANTHROPIC_API_KEY` (and optionally `TOEFL_AI_MODEL`) on the deployment;
   `api/evaluate.js` then scores requests for every visitor with a small per-IP rate limit.
2. **Bring your own key** — in Settings, paste a key for Anthropic, OpenAI, Gemini, DeepSeek or
   GitHub Models. By default the key lives only in `sessionStorage` and disappears when the tab
   closes; permanent storage is opt-in and should not be used on shared computers.

Objective tasks (Reading, Listening, Build a Sentence) and a solid offline estimate for every
Writing/Speaking task work with **no key at all**.

## Content policy

All practice questions, mock tests, model answers and rubric summaries in `content/` and
`src/data/` are original, written for this project from the public ETS format and scoring-guide
descriptions. No ETS (or other publisher's) questions are reproduced. `docs/RESEARCH.md` lists
the official sources used and links to the original ETS Writing and Speaking Scoring Guides.

TOEFL and TOEFL iBT are registered trademarks of ETS. This project is not affiliated with or
endorsed by ETS.

## Scoring limits

This app does not issue or reproduce an official TOEFL score. The real test is adaptive,
scored by ETS's own AI engine under certified-rater oversight, and statistically equated.
Everything here — band estimates, CEFR mapping, rubric scores — is a practice estimate to guide
study, never an official result. Only ETS can issue TOEFL scores.

## Privacy

Progress, plan and history live only in this browser's `localStorage`. Recordings made during
Speaking practice stay in memory for the current tab and are never uploaded; only the text sent
for optional AI feedback leaves your device.

## License

MIT
