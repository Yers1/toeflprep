// Score scale data from ETS public materials (Jan 2026 score scale) plus the
// practice-estimate model this app uses. Only ETS issues real TOEFL scores.

export const BANDS = [6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1];

export const CEFR = { 6: 'C2', 5.5: 'C1', 5: 'C1', 4.5: 'B2', 4: 'B2', 3.5: 'B1', 3: 'B1', 2.5: 'A2', 2: 'A2', 1.5: 'A1', 1: 'A1' };

// Section score ranges on the old 0–30 scale that correspond to each band.
// Source: ets.org/toefl/test-takers/ibt/scores/understand-scores.html
export const CONCORDANCE = {
  reading:   { 6: [29, 30], 5.5: [27, 28], 5: [24, 26], 4.5: [22, 23], 4: [18, 21], 3.5: [12, 17], 3: [6, 11], 2.5: [4, 5], 2: [3, 3], 1.5: [2, 2], 1: [0, 1] },
  listening: { 6: [28, 30], 5.5: [26, 27], 5: [22, 25], 4.5: [20, 21], 4: [17, 19], 3.5: [13, 16], 3: [9, 12], 2.5: [6, 8], 2: [4, 5], 1.5: [2, 3], 1: [0, 1] },
  speaking:  { 6: [28, 30], 5.5: [27, 27], 5: [25, 26], 4.5: [23, 24], 4: [20, 22], 3.5: [18, 19], 3: [16, 17], 2.5: [13, 15], 2: [10, 12], 1.5: [5, 9], 1: [0, 4] },
  writing:   { 6: [29, 30], 5.5: [27, 28], 5: [24, 26], 4.5: [21, 23], 4: [17, 20], 3.5: [15, 16], 3: [13, 14], 2.5: [11, 12], 2: [7, 10], 1.5: [3, 6], 1: [0, 2] },
};

// Overall band → range of the comparable 0–120 total.
export const TOTAL_120 = { 6: [114, 120], 5.5: [107, 113], 5: [95, 106], 4.5: [86, 94], 4: [72, 85], 3.5: [58, 71], 3: [44, 57], 2.5: [34, 43], 2: [24, 33], 1.5: [12, 23], 1: [0, 11] };

// ETS IELTS comparison for the overall score.
export const IELTS_FOR_TOTAL = { 6: '8–9', 5.5: '7.5', 5: '7', 4.5: '6.5', 4: '6', 3.5: '5.5', 3: '5–5.5', 2.5: '5', 2: '4.5', 1.5: '4', 1: '<4' };

export const CEFR_DESCRIPTORS = {
  C2: 'Understands virtually everything; expresses ideas precisely and flexibly.',
  C1: 'Understands long, demanding texts and implicit meaning; uses language flexibly for academic purposes.',
  B2: 'Follows extended discussion on familiar topics; writes clear, organized, detailed text.',
  B1: 'Understands main points on familiar matters; expresses the main point comprehensibly.',
  A2: 'Understands frequently used expressions; writes short everyday messages.',
  A1: 'Recognizes familiar words and very basic phrases.',
};

export function roundHalf(x) {
  return Math.round(x * 2) / 2;
}

export function clampBand(x) {
  return Math.min(6, Math.max(1, roundHalf(x)));
}

export function fmtBand(b) {
  return b == null || Number.isNaN(b) ? '—' : Number(b).toFixed(1);
}

export function bandFromRaw30(section, raw) {
  const table = CONCORDANCE[section];
  const r = Math.round(raw);
  for (const band of BANDS) {
    const [lo, hi] = table[band];
    if (r >= lo && r <= hi) return band;
  }
  return r > 30 ? 6 : 1;
}

// Reading / Listening: proportion correct across both modules. Test takers
// routed to the easier second module cannot reach the top of the scale.
export function objectiveSectionBand(section, correct, total, route) {
  if (!total) return null;
  const p = correct / total;
  const ceiling = route === 'easy' ? 21 : 30;
  return bandFromRaw30(section, p * ceiling);
}

// Average of 0–5 rubric scores → 1–6 band (practice estimate).
export function rubricToBand(avg) {
  if (avg == null || Number.isNaN(avg)) return null;
  return clampBand(1 + avg);
}

// Writing: Build a Sentence accuracy + Email + Discussion, each on 0–5.
export function writingBand({ sentenceCorrect, sentenceTotal, email, discussion }) {
  const parts = [];
  if (sentenceTotal) parts.push([(sentenceCorrect / sentenceTotal) * 5, 0.3]);
  if (email != null) parts.push([email, 0.3]);
  if (discussion != null) parts.push([discussion, 0.4]);
  if (!parts.length) return null;
  const w = parts.reduce((s, [, wt]) => s + wt, 0);
  const avg = parts.reduce((s, [v, wt]) => s + v * wt, 0) / w;
  return { avg, band: rubricToBand(avg) };
}

export function overallBand(sectionBands) {
  const vals = Object.values(sectionBands).filter((v) => v != null);
  if (vals.length < 4) return null;
  return roundHalf(vals.reduce((a, b) => a + b, 0) / vals.length);
}

export function total120(band) {
  const r = TOTAL_120[band];
  return r ? `${r[0]}–${r[1]}` : '—';
}

// Practice estimate for a single task attempt, used on the dashboard.
export function attemptBand(attempt) {
  const s = attempt.score || {};
  if (s.band != null) return s.band;
  if (s.rubric != null) return rubricToBand(s.rubric);
  if (s.total) return objectiveSectionBand(attempt.section, s.correct, s.total, 'hard');
  return null;
}
