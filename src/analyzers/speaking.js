// Offline speaking analysis.
// Listen and Repeat: word alignment against the target, mapped onto the
// official 0–5 descriptors. Interview: timing and language measures mapped
// onto the four interview criteria.

import { words as tokenize, contentWords, stem, holistic, sentences } from './writing.js';
import { grammarIssues } from './grammar.js';

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
  // Level 4 allows only small changes: one or two function words, an ending,
  // a related-word swap or two transposed words. A missing content word means
  // the meaning is no longer captured accurately, which is level 3.
  else if (contentErr === 0 && minorErrors <= 2) { score = 4; reason = 'Meaning kept; one or two small changes to function words, endings or word order.'; }
  else if (contentCoverage >= 0.75 && said.length >= target.length * 0.75) {
    score = 3;
    reason = contentErr ? 'A full sentence, but a content word is missing or changed, so the meaning is not exact.' : 'Several small changes add up; the repetition is no longer accurate.';
  }
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

const REASON_RE = /\b(because|since|the (main|biggest|key) reason|that's why|that is why|so that|which means|as a result)\b/i;
const EXAMPLE_RE = /\b(for example|for instance|i remember|once|last (year|month|week|summer|semester|time)|when i was|in my (city|country|hometown|school|family|experience)|my (friend|brother|sister|cousin|mother|father|parents|roommate|classmate|teacher))\b/i;
const CLAUSE_RE = /\b(because|although|though|while|whereas|which|who|that|if|when|unless|so that|even though)\b/gi;

// Offline interview estimate, made deliberately conservative: it cannot hear
// pronunciation or fully judge grammar, so those criteria top out at 4, and
// the overall level follows the weakest criterion (see holistic()).
export function scoreInterview(question, transcript, capture = {}) {
  const m = interviewMetrics(question, transcript, capture);
  const text = String(transcript);
  const notes = [];
  const hasReason = REASON_RE.test(text);
  const hasExample = EXAMPLE_RE.test(text);
  const first = sentences(text)[0] || text.split(/\s+/).slice(0, 15).join(' ');
  const qStems = new Set(contentWords(question).map(stem));
  const answersFirst = contentWords(first).some((w) => qStems.has(stem(w))) || /\b(i think|i'd say|i would say|i prefer|i believe|yes|no|definitely|honestly|for me)\b/i.test(first);
  const grammar = m.words >= 10 ? grammarIssues(text) : [];
  const clauses = (text.match(CLAUSE_RE) || []).length;

  // Topic development: a full answer is a direct answer, a reason and a
  // specific example. Official level-5 answers run about 60–90 words.
  let development = m.words < 25 ? 1 : m.words < 45 ? 2 : m.words < 60 ? 2.5 : m.words < 80 ? 3 : 3.5;
  if (hasReason) development += 0.5;
  if (hasExample) development += 0.5;
  if (m.connectors >= 3) development += 0.5;
  if (!answersFirst) development -= 0.5;
  if (!hasExample) development = Math.min(development, 3.5);
  if (m.topicOverlap === 0 && m.words > 10) development -= 1.5;
  if (m.echo > 0.6) development -= 1;
  development = clamp(r1(development));

  // Fluency: pace plus how often and how long the speaker stops.
  let fluency = 3.5;
  if (m.wpm >= 115 && m.wpm <= 175) fluency += 1;
  else if (m.wpm >= 100 && m.wpm < 115) fluency += 0.5;
  else if (m.wpm >= 90 && m.wpm < 100) fluency -= 0.5;
  else if (m.wpm >= 80 && m.wpm < 90) fluency -= 1;
  else if (m.wpm && m.wpm < 80) fluency -= 1.5;
  else if (m.wpm > 190) fluency -= 0.5;
  if (m.hasAudio) {
    if (m.longPauses === 0) fluency += 0.5;
    else if (m.longPauses === 2) fluency -= 0.5;
    else if (m.longPauses >= 3 && m.longPauses <= 4) fluency -= 1;
    else if (m.longPauses >= 5) fluency -= 1.5;
    if (m.longestPause > 3) fluency -= 0.5;
    if (m.pauseRatio > 0.35) fluency -= 0.5;
    if (m.latency != null && m.latency > 3) fluency -= 0.5;
  }
  if (m.fillers >= 5) fluency -= 0.5;
  fluency = clamp(r1(fluency));

  // Recognizer confidence is a weak proxy for intelligibility: it can lower
  // the estimate, never confirm a 5.
  const conf = m.asrConfidence;
  const intelligibility = conf == null ? null : clamp(r1(conf >= 0.88 ? 4 : conf >= 0.8 ? 3.5 : conf >= 0.7 ? 3 : conf >= 0.55 ? 2.5 : 2), 0, 4);

  let language = 2.5;
  if (m.words >= 30) { if (m.diversity >= 0.6) language += 1; else if (m.diversity >= 0.5) language += 0.5; }
  if (clauses >= 2) language += 0.5;
  if (clauses >= 4) language += 0.5;
  language -= Math.min(1.5, grammar.length * 0.5);
  language = clamp(r1(language), 0, 4);

  const crit = { development, fluency, language };
  if (intelligibility != null) crit.intelligibility = intelligibility;
  let overall = holistic(crit);
  if (m.words < 5) overall = Math.min(overall, m.words ? 1 : 0);
  else if (m.words < 25) overall = Math.min(overall, 2);
  else if (m.words < 45) overall = Math.min(overall, 3);

  if (!answersFirst) notes.push({ criterion: 'development', tone: 'fix', text: 'Answer the question in your first sentence (“I’d say…”, “For me, it’s definitely…”), then explain.' });
  if (m.words < 60) notes.push({ criterion: 'development', tone: 'fix', text: `${m.words} words in ${m.talkTime}s. A full answer is 60–100 words: an answer, a reason and an example.` });
  else notes.push({ criterion: 'development', tone: 'good', text: `Full-length answer: ${m.words} words.` });
  notes.push(hasReason
    ? { criterion: 'development', tone: 'good', text: 'You give a reason.' }
    : { criterion: 'development', tone: 'fix', text: 'No clear reason: add “The main reason is that…”.' });
  notes.push(hasExample
    ? { criterion: 'development', tone: 'good', text: 'You support the answer with a specific example.' }
    : { criterion: 'development', tone: 'fix', text: 'No specific example: add one real situation (“For example, last year I…”). Without it the estimate stays below 4.' });
  if (m.connectors < 3) notes.push({ criterion: 'development', tone: 'fix', text: 'Link ideas: “The main reason is…”, “For example…”, “Because of that…”, “So overall…”.' });
  if (m.echo > 0.6) notes.push({ criterion: 'development', tone: 'fix', text: 'Much of the answer repeats the question’s words.' });
  if (m.wpm && m.wpm < 100) notes.push({ criterion: 'fluency', tone: 'fix', text: `Pace ${m.wpm} wpm is slow; a natural conversational pace is about 115–160. Plan the example before you finish your first sentence so you do not stop to think mid-answer.` });
  else if (m.wpm > 190) notes.push({ criterion: 'fluency', tone: 'fix', text: `Pace ${m.wpm} wpm is very fast; slow down so every word is clear.` });
  else if (m.wpm) notes.push({ criterion: 'fluency', tone: 'good', text: `Natural pace (${m.wpm} wpm).` });
  if (m.hasAudio && m.longPauses) notes.push({ criterion: 'fluency', tone: m.longPauses >= 2 ? 'fix' : 'good', text: `${m.longPauses} long pause${m.longPauses > 1 ? 's' : ''} (longest ${m.longestPause}s). Fill thinking time with a phrase: “Let me think of an example…”, “What I mean is…”.` });
  if (m.latency != null && m.latency > 3) notes.push({ criterion: 'fluency', tone: 'fix', text: `You started ${m.latency.toFixed(1)}s after the beep. Begin with a framing sentence right away.` });
  if (m.fillers >= 3) notes.push({ criterion: 'fluency', tone: 'fix', text: `${m.fillers} fillers detected (uh / um / like / you know).` });
  if (intelligibility != null && intelligibility < 3.5) notes.push({ criterion: 'intelligibility', tone: 'fix', text: 'The recognizer struggled with parts of the answer; slow down on key words and stress them clearly.' });
  if (intelligibility != null) notes.push({ criterion: 'intelligibility', tone: 'good', text: 'Pronunciation cannot be heard offline, so this estimate is capped at 4. Use AI feedback or a teacher for a real check.' });
  const seen = new Set();
  grammar.forEach((g) => {
    if (seen.has(g.hint)) return;
    seen.add(g.hint);
    notes.push({ criterion: 'language', tone: 'fix', text: `${g.hint} (“${g.sample}”)` });
  });
  if (clauses < 2 && m.words >= 30) notes.push({ criterion: 'language', tone: 'fix', text: 'Mostly simple sentences. Join ideas with because / which / although / when.' });

  return { overall: clamp(Math.round(overall)), criteria: crit, metrics: m, notes, grammar, method: 'local' };
}
