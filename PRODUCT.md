# Product

## Audience

Students preparing for the TOEFL iBT format introduced on January 21, 2026, usually against a
real application deadline. They need practice that mirrors the actual test mechanics (adaptive
modules, new task types, the 1–6 scale) and feedback on Writing and Speaking that explains
*why* a response scored what it did — not just a number.

## Product purpose

TOEFL Prep is an independent, browser-based practice environment covering all 12 current task
families, with two full adaptive mock tests, a rubric-based feedback system for the four
free-response tasks, a personal study plan, and a directory of every other practice resource
(official and third-party) for this format.

## Product principles

1. **Current format first.** Structure, timing, adaptive routing and scoring all follow the
   public ETS specifications for the January 2026 test — see `docs/RESEARCH.md`.
2. **Rubric transparency.** Every Writing/Speaking score is broken down by the same criteria
   ETS raters use, with a checklist and score-killers a learner can act on immediately.
3. **Honest estimation.** The app never presents a practice conversion as an official score;
   band estimates, CEFR levels and the 0–120 equivalent are always labeled as estimates.
4. **Works with no key.** A capable offline estimate — length, coverage, register, sentence
   variety, mechanics for writing; word alignment, pace and pause analysis for speaking — is
   always available. An AI rater is an upgrade, not a requirement.
5. **Actionable history and planning.** Attempts feed a per-section band estimate and a
   per-criterion weak-spot panel; the study plan adapts to test date, target band and current
   level, and reschedules around a diagnostic and a final mock test.
6. **Privacy by default.** No account. Data lives in `localStorage`; recordings never leave the
   browser tab; API keys default to session-only storage.
7. **Original content, real resources.** All practice material is authored for this project.
   Where other official or third-party practice tests exist, they're linked in `#/resources`
   rather than reproduced.

## Success criteria

- A learner can take a full adaptive mock test and get a 1–6 report with a section-by-section
  and item-by-item breakdown, with no account and no key.
- Every Write an Email, Academic Discussion, Listen and Repeat and Take an Interview response
  gets a rubric score broken down by ETS's own criteria, plus at least one concrete, specific
  fix — with or without AI.
- The dashboard identifies the single weakest rubric criterion across recent attempts.
- The study plan updates itself as the target date approaches and reflects real weak sections.
- Timers, scores and the scale conversion never imply more precision than the method supports.

## Accessibility

- WCAG 2.1 AA target
- Keyboard-visible focus states throughout, including custom controls (tile bank, choice cards)
- Semantic fieldsets/legends for answer choices; labelled form fields everywhere
- `prefers-reduced-motion` disables timers' pulsing, wave animation and transitions
- Responsive layout from phone width up; exam mode collapses navigation to reduce distraction
- Every objective answer has a text explanation — never color alone
