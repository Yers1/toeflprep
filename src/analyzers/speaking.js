// Offline speaking analysis.
// Listen and Repeat: word alignment against the target, mapped onto the
// official 0–5 descriptors. Interview: timing and language measures mapped
// onto the four interview criteria.

import { words as tokenize, contentWords, stem } from './writing.js';

const FUNCTION_WORDS = new Set('a an the and or but if of to in on at for from by with about as is are was were be been being am do does did have has had will would can could should may might must shall this that these those it its he she they we you i me him her us them my your his our their there here not no so than then just very some any all'.split(' '));

const CONTRACTIONS = {
  "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are', "it's": 'it is', "that's": 'that is',
  "there's": 'there is', "what's": 'what is', "he's": 'he is', "she's": 'she is', "i've": 'i have', "we've": 'we have',
  "you've": 'you have', "they've": 'they have', "i'll": 'i will', "you'll": 'you will', "we'll": 'we will',
  "they'll": 'they will', "it'll": 'it will', "i'd": 'i would', "you'd": 'you would', "we'd": 'we would',
  "don't": 'do not', "doesn't": 'does not', "didn't": 'did not', "can't": 'can not', "cannot": 'can not',
  "won't": 'will not', "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not', "weren't": 'were not',
  "haven't": 'have not', "hasn't": 'has not', "hadn't": 'had not', "wouldn't": 'would not', "couldn't": 'could not',
  "shouldn't": 'should not', "let's": 'let us',
};

const NUMBERS = { zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: '10', eleven: '11', twelve: '12', fifteen: '15', twenty: '20', thirty: '30', forty: '40', fifty: '50', hundred: '100' };

const FILLERS = /\b(uh+|um+|er+m?|ah+|hmm+|you know|i mean|like,)\b/gi;
const CONNECTORS = /\b(because|so|but|however|for example|for instance|also|and then|that's why|which means|actually|on the other hand|first|second|finally|in my opinion|i think|the main reason|as a result|although|while|if|when)\b/gi;

export function normalize(text) {
  let t = String(text).toLowerCase().replace(/[’]/g, "'").replace(/\bcannot\b/g, 'can not');
  t = t.replace(/\b[a-z]+'[a-z]+\b/g, (m) => CONTRACTIONS[m] || m.replace(/'s$/, ' s'));
  return t
    .replace(/[^a-z0-9\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => NUMBERS[w] || w.replace(/'/g, ''))
    .filter((w) => !/^(uh+|um+|er+m?|ah+|hmm+)$/.test(w));
}

// Levenshtein alignment on words. Returns operations in order.
export function align(target, said) {
  const a = target, b = said;
  const n = a.length, m = b.length;
  const d = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 0; i <= n; i++) d[i][0] = i;
  for (let j = 0; j <= m; j++) d[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const same = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + same);
    }
  }
  const ops = [];
  let i = n, j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && d[i][j] === d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) {
      ops.unshift(a[i - 1] === b[j - 1] ? { op: 'ok', t: a[i - 1] } : { op: 'sub', t: a[i - 1], s: b[j - 1] });
      i--; j--;
    } else if (i > 0 && d[i][j] === d[i - 1][j] + 1) {
      ops.unshift({ op: 'del', t: a[i - 1] });
      i--;
    } else {
      ops.unshift({ op: 'ins', s: b[j - 1] });
      j--;
    }
  }
  return ops;
}

function isSwap(ops, k) {
  const x = ops[k], y = ops[k + 1];
  return x && y && x.op === 'sub' && y.op === 'sub' && x.t === y.s && y.t === x.s;
}

function movedInsert(ops, moved, word) {
  // The insertion that pairs with a moved deletion is not an extra word.
  for (const k of moved) if (ops[k].t === word) return true;
  return false;
}

function relatedWord(t, s) {
  if (!s) return false;
  return stem(t) === stem(s) || t.startsWith(s) || s.startsWith(t);
}

// Maps a repetition attempt onto the Listen and Repeat descriptors.
export function scoreRepeat(targetText, saidText) {
  const target = normalize(targetText);
  const said = normalize(saidText);
  const ops = align(target, said);
  const contentTotal = target.filter((w) => !FUNCTION_WORDS.has(w)).length || 1;
  let fnErr = 0, contentErr = 0, markerErr = 0, related = 0, swaps = 0, matched = 0, contentMatched = 0, inserted = 0;

  // A word that is missing in one place but inserted elsewhere was moved:
  // the rubric treats transposed words as a minor change.
  const insertedWords = ops.filter((o) => o.op === 'ins').map((o) => o.s);
  const moved = new Set();
  ops.forEach((o, k) => {
    const i = o.op === 'del' ? insertedWords.indexOf(o.t) : -1;
    if (i >= 0) { moved.add(k); insertedWords.splice(i, 1); }
  });

  for (let k = 0; k < ops.length; k++) {
    const o = ops[k];
    if (o.op === 'ok') { matched++; if (!FUNCTION_WORDS.has(o.t)) contentMatched++; continue; }
    if (isSwap(ops, k)) { swaps++; matched += 2; k++; continue; }
    if (moved.has(k)) { swaps++; matched++; if (!FUNCTION_WORDS.has(o.t)) contentMatched++; continue; }
    if (o.op === 'ins' && movedInsert(ops, moved, o.s)) continue;
    if (o.op === 'ins') { inserted++; continue; }
    if (FUNCTION_WORDS.has(o.t)) { fnErr++; continue; }
    if (o.op === 'sub' && stem(o.t) === stem(o.s)) { markerErr++; continue; }
    if (o.op === 'sub' && relatedWord(o.t, o.s)) { related++; continue; }
    contentErr++;
  }

  const coverage = target.length ? matched / target.length : 0;
  const contentCoverage = (contentMatched + markerErr + related) / contentTotal;
  const minorErrors = fnErr + markerErr + related + swaps + Math.max(0, inserted - 1);
  let score;
  let reason;
  if (!said.length) { score = 0; reason = 'No speech was captured.'; }
  else if (coverage === 1 && inserted === 0 && swaps === 0) { score = 5; reason = 'Exact repetition.'; }
  else if (contentErr === 0 && minorErrors <= 3 && fnErr <= 2) { score = 4; reason = 'Meaning kept; small changes to function words or endings.'; }
  else if (contentErr <= 1 && minorErrors <= 2 && target.length >= 12) { score = 4; reason = 'Meaning mostly kept; one content word missing in a long sentence.'; }
  else if (contentCoverage >= 0.6 && said.length >= target.length * 0.7) { score = 3; reason = 'Nearly complete, but some content words are missing or changed.'; }
  else if (coverage >= 0.3 || contentCoverage >= 0.35) { score = 2; reason = 'A significant part of the sentence is missing.'; }
  else if (said.length >= 1 && matched >= 1) { score = 1; reason = 'Only a few words match the sentence.'; }
  else { score = 0; reason = 'The response does not match the sentence.'; }

  return { score, reason, ops, coverage, contentCoverage, errors: { function: fnErr, content: contentErr, endings: markerErr, related, swaps, inserted } };
}

// Window for each Listen and Repeat response: 8–12 s depending on length.
export function repeatWindow(sentence) {
  const n = tokenize(sentence).length;
  return Math.min(12, Math.max(8, Math.round(5 + n * 0.45)));
}

const clamp = (x, lo = 0, hi = 5) => Math.max(lo, Math.min(hi, x));
const r1 = (x) => Math.round(x * 2) / 2;
const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);

export function interviewMetrics(question, transcript, capture = {}) {
  const t = capture.timing || {};
  const toks = tokenize(transcript);
  const wordsN = toks.length;
  const talkTime = t.span && t.span > 1 ? t.span : capture.duration || 45;
  const wpm = talkTime ? (wordsN / talkTime) * 60 : 0;
  const fillers = (String(transcript).match(FILLERS) || []).length;
  const connectors = (String(transcript).match(CONNECTORS) || []).length;
  const unique = new Set(toks).size;
  const qWords = new Set(contentWords(question).map(stem));
  const aWords = contentWords(transcript).map(stem);
  const overlap = new Set(aWords.filter((w) => qWords.has(w))).size;
  const echo = wordsN ? aWords.filter((w) => qWords.has(w)).length / Math.max(1, aWords.length) : 0;
  return {
    words: wordsN,
    talkTime: Math.round(talkTime * 10) / 10,
    speechTime: t.speech ?? null,
    latency: t.onset ?? null,
    wpm: Math.round(wpm),
    pauses: t.pauses ?? null,
    longPauses: t.longPauses ?? null,
    longestPause: t.longestPause ?? null,
    pauseRatio: t.pauseRatio != null ? Math.round(t.pauseRatio * 100) / 100 : null,
    fillers,
    connectors,
    diversity: wordsN ? Math.round((unique / wordsN) * 100) / 100 : 0,
    topicOverlap: overlap,
    echo: Math.round(echo * 100) / 100,
    asrConfidence: capture.confidence != null ? Math.round(capture.confidence * 100) / 100 : null,
    hasAudio: t.span != null,
  };
}

export function scoreInterview(question, transcript, capture = {}) {
  const m = interviewMetrics(question, transcript, capture);
  const notes = [];

  let development = 1;
  if (m.words >= 40) development += 1;
  if (m.words >= 70) development += 1;
  if (m.words >= 95) development += 0.5;
  if (m.connectors >= 2) development += 0.5;
  if (m.connectors >= 4) development += 0.5;
  if (m.topicOverlap === 0 && m.words > 10) development -= 1.5;
  if (m.echo > 0.6) development -= 1;
  development = clamp(r1(development));

  let fluency = 3;
  if (m.wpm >= 115 && m.wpm <= 175) fluency += 1;
  else if (m.wpm < 80) fluency -= 1.5;
  else if (m.wpm < 100) fluency -= 0.5;
  if (m.hasAudio) {
    if (m.longPauses === 0) fluency += 1;
    else if (m.longPauses >= 3) fluency -= 1;
    if (m.pauseRatio > 0.35) fluency -= 0.5;
    if (m.latency != null && m.latency > 3) fluency -= 0.5;
  }
  if (m.fillers >= 5) fluency -= 0.5;
  fluency = clamp(r1(fluency));

  // Without an audio model, the recognizer's confidence is only a proxy.
  let intelligibility = m.asrConfidence == null ? null : clamp(r1(1 + m.asrConfidence * 4.4));

  let language = 2;
  if (m.words >= 30) { if (m.diversity >= 0.55) language += 1; else if (m.diversity >= 0.45) language += 0.5; }
  if (/\b(would|could|if|although|which|who|whereas|while|unless)\b/i.test(transcript)) language += 1;
  if (m.words >= 70) language += 0.5;
  language = clamp(r1(language));

  const crit = { development, fluency, language };
  if (intelligibility != null) crit.intelligibility = intelligibility;
  let overall = mean(Object.values(crit));
  if (m.words < 5) overall = Math.min(overall, m.words ? 1 : 0);
  else if (m.words < 25) overall = Math.min(overall, 2);
  else if (m.words < 45) overall = Math.min(overall, 3);

  if (m.words < 70) notes.push({ criterion: 'development', tone: 'fix', text: `${m.words} words in ${m.talkTime}s. Use the full 45 seconds — add a reason and an example.` });
  else notes.push({ criterion: 'development', tone: 'good', text: `Full answer: ${m.words} words.` });
  if (m.connectors < 2) notes.push({ criterion: 'development', tone: 'fix', text: 'Link ideas: “The main reason is…”, “For example…”, “That’s why…”.' });
  if (m.echo > 0.6) notes.push({ criterion: 'development', tone: 'fix', text: 'Much of the answer repeats the question’s words.' });
  if (m.wpm && (m.wpm < 100)) notes.push({ criterion: 'fluency', tone: 'fix', text: `Pace ${m.wpm} wpm is slow; natural conversational pace is about 120–160.` });
  else if (m.wpm > 185) notes.push({ criterion: 'fluency', tone: 'fix', text: `Pace ${m.wpm} wpm is very fast; slow down so every word is clear.` });
  else if (m.wpm) notes.push({ criterion: 'fluency', tone: 'good', text: `Natural pace (${m.wpm} wpm).` });
  if (m.hasAudio && m.longPauses) notes.push({ criterion: 'fluency', tone: 'fix', text: `${m.longPauses} long pause${m.longPauses > 1 ? 's' : ''} (longest ${m.longestPause}s). Use a short phrase like “Let me think about an example…” instead of silence.` });
  if (m.latency != null && m.latency > 3) notes.push({ criterion: 'fluency', tone: 'fix', text: `You started ${m.latency.toFixed(1)}s after the beep. Begin with a framing sentence right away.` });
  if (m.fillers >= 3) notes.push({ criterion: 'fluency', tone: 'fix', text: `${m.fillers} fillers detected (uh/um/you know).` });
  if (intelligibility != null && intelligibility < 3.5) notes.push({ criterion: 'intelligibility', tone: 'fix', text: 'The recognizer struggled with parts of the answer; slow down on key words and stress them clearly.' });

  return { overall: clamp(Math.round(overall)), criteria: crit, metrics: m, notes, method: 'local' };
}
