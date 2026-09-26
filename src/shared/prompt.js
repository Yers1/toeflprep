// Prompt construction shared by the browser (own-key mode) and the Vercel
// function. Keeps the rater instructions identical in both paths.

import { RUBRICS } from '../data/rubrics.js';

const MAX_RESPONSE_CHARS = 6000;

function rubricText(task) {
  const r = RUBRICS[task];
  const levels = [5, 4, 3, 2, 1, 0].map((n) => {
    const l = r.levels[n];
    const pts = l.points.length ? `\n    - ${l.points.join('\n    - ')}` : '';
    return `  ${n} — ${l.label}: ${l.summary}${pts}`;
  }).join('\n');
  const crit = r.criteria.map((c) => `  - ${c.id} (${c.name}): ${c.desc}`).join('\n');
  return `Task: ${r.task}\nWhat raters look for: ${r.focus}\nCriteria:\n${crit}\nScore levels:\n${levels}`;
}

function itemText(task, item) {
  switch (task) {
    case 'writing_email':
      return `Scenario: ${item.scenario}\nRecipient: ${item.to}\nRequired points:\n${(item.goals || []).map((g, i) => `  ${i + 1}. ${g.text}`).join('\n')}\nExpected register: ${item.register || 'formal'}`;
    case 'writing_discussion':
      return `Course: ${item.course}\nProfessor ${item.professor.name}: ${item.professor.text}\n${item.students.map((s) => `${s.name}: ${s.text}`).join('\n')}`;
    case 'speaking_interview':
      return `Interview topic: ${item.topic}\nQuestion: ${item.question}`;
    default:
      return JSON.stringify(item).slice(0, 2000);
  }
}

function metricsText(task, metrics) {
  if (!metrics) return '';
  if (task === 'speaking_interview') {
    const m = metrics;
    return `Measured from the recording (45-second limit):
  words: ${m.words}; speaking span: ${m.talkTime}s; pace: ${m.wpm} words/min
  pauses ≥0.4s: ${m.pauses ?? 'n/a'}; pauses ≥1.2s: ${m.longPauses ?? 'n/a'}; longest pause: ${m.longestPause ?? 'n/a'}s; share of silence: ${m.pauseRatio ?? 'n/a'}
  start delay after beep: ${m.latency ?? 'n/a'}s; fillers in transcript: ${m.fillers}; speech-recognizer confidence: ${m.asrConfidence ?? 'n/a'}`;
  }
  return `Word count: ${metrics.words}`;
}

export function buildPrompt({ task, item, response, metrics }) {
  const isSpeaking = task.startsWith('speaking');
  const criteriaIds = RUBRICS[task].criteria.map((c) => c.id);
  const system = `You are a calibrated TOEFL iBT rater trained on the ETS scoring guides for the January 2026 test.
Score strictly against the rubric below. Anchor your judgment on the level descriptions, not on effort or length alone.
Most intermediate learners score 3; award 5 only when every descriptor of level 5 is met.
${isSpeaking ? 'You receive an automatic transcript, not audio. Recognition errors can appear as odd words: do not penalize a word that is obviously misrecognized. Judge fluency from the measured timing data. Judge intelligibility cautiously from the recognizer confidence and transcript coherence, and say that it is an estimate.' : ''}
Write feedback for the learner in clear, simple English. Be specific: quote their words.
Reply with one JSON object only, no markdown.`;

  const user = `${rubricText(task)}

--- PROMPT SHOWN TO THE TEST TAKER ---
${itemText(task, item)}

--- RESPONSE ---
${String(response || '').slice(0, MAX_RESPONSE_CHARS) || '(empty)'}

${metricsText(task, metrics)}

Return JSON with exactly these keys:
{
  "score": integer 0-5 (overall rubric level),
  "level_summary": "one sentence: why this level and not the next one up",
  "criteria": [${criteriaIds.map((id) => `{"id":"${id}","score":0-5 (halves allowed),"comment":"1-2 sentences with evidence"}`).join(',')}],
  "strengths": ["up to 3 short items"],
  "fixes": [{"issue":"what limits the score","how":"concrete instruction or example sentence"}] (top 3, most score-relevant first),
  "corrections": [{"original":"exact words from the response","corrected":"fixed version","why":"short rule"}] (up to 8 real errors; empty if none),
  "improved": "${isSpeaking ? 'a model spoken answer (about 100 words) that keeps the learner\'s ideas' : 'a rewrite at level 5 that keeps the learner\'s ideas and length range'}",
  "next_level": "the single most important change to reach the next score"
}`;
  return { system, user };
}

const clampNum = (v, lo, hi) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : null;
};

export function normalizeResult(j, task) {
  const ids = RUBRICS[task]?.criteria.map((c) => c.id) || [];
  const criteria = {};
  const comments = {};
  (Array.isArray(j.criteria) ? j.criteria : []).forEach((c) => {
    if (!c || !ids.includes(c.id)) return;
    const s = clampNum(c.score, 0, 5);
    if (s != null) criteria[c.id] = Math.round(s * 2) / 2;
    if (c.comment) comments[c.id] = String(c.comment);
  });
  const arr = (x) => (Array.isArray(x) ? x : []);
  return {
    overall: Math.round(clampNum(j.score, 0, 5) ?? 0),
    summary: String(j.level_summary || ''),
    criteria,
    comments,
    strengths: arr(j.strengths).map(String).slice(0, 4),
    fixes: arr(j.fixes).filter((f) => f && f.issue).map((f) => ({ issue: String(f.issue), how: String(f.how || '') })).slice(0, 4),
    corrections: arr(j.corrections).filter((c) => c && c.original).map((c) => ({ original: String(c.original), corrected: String(c.corrected || ''), why: String(c.why || '') })).slice(0, 10),
    improved: String(j.improved || ''),
    nextLevel: String(j.next_level || ''),
  };
}
