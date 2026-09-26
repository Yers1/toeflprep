# Design system

## Direction

Calm academic instrument — closer to a well-edited research notebook than a gamified language
app or an AI-startup dashboard. Quiet neutral surfaces, one accent color, section identity
carried only by small dots/borders, never full-color blocks.

## Tokens (see `styles/app.css` for exact values, incl. dark mode)

- Background `--bg`, surface `--surface` / `--surface-2`, ink `--ink`, body `--text`,
  muted `--muted`, hairline `--line` / `--line-strong`
- Accent: one teal (`--accent`), with a soft tint (`--accent-soft`) for selected/active states
- Status: `--good` / `--mid` / `--low`, each with a `-soft` background tint
- Section markers (small dots/borders only): `--reading` blue, `--listening` violet,
  `--writing` amber, `--speaking` pink
- Full light/dark pairs defined under `@media (prefers-color-scheme: dark)` and
  `[data-theme="dark"]`, with an explicit `[data-theme="light"]` override

## Typography

- Primary: Geist (Google Fonts)
- Scores, timers, bands: Geist Mono — anything that is a *number to compare* gets the mono face
- Headlines: tight tracking, compact line height
- Body copy: capped measure (`.lead` ~68ch) so paragraphs stay readable

## Components

- 12px radius for buttons/inputs, 14–20px for cards and panels
- Cards only for genuinely distinct functional surfaces (a rubric result, a day in the plan,
  a resource link) — not wrapped around everything
- One accent color used throughout; correct/incorrect and score bands never rely on color
  alone (icon/label/mark always present alongside the color)
- Choice cards (radio) instead of bare radio buttons for MCQ; a lettered badge (A–D) doubles as
  the visual state indicator
- Rubric result card: fixed layout — big score chip, level label, per-criterion meter row,
  then progressively-disclosed strengths/fixes/corrections/improved-version blocks
- Navigation is a persistent left sidebar (icon + label per item, active item as an
  accent-soft "pill"), not a top bar; it collapses to a slim top bar with a dropdown menu
  below 920px, and hides entirely in exam mode

## Interaction

- Timers are sticky/visible during any timed task and shift color (ok → warn → critical) in the
  last 20%/10% of the clock, never relying on the number alone
- Countdown is wall-clock based (drift-free) so a slow tab never gains time
- Speaking tasks: a level meter (mic RMS) and a circular countdown ring give constant feedback
  during recording; a short beep marks start/stop
- Exam mode hides the site nav/footer entirely to reduce distraction and match the real test's
  single-task focus
- Reduced-motion preference removes the wave/pulse/ring animations and transitions, keeping the
  same information as static state changes
