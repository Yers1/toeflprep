// Offline writing analysis. It measures what can be measured reliably without
// a language model (length, coverage, variety, register, copying, mechanics)
// and maps it onto the rubric criteria. Grammar accuracy is only partly
// observable here, so the local estimate never awards more than 4 on accuracy.

const STOP = new Set('a an the and or but if of to in on at for from by with about as is are was were be been being am do does did have has had i you he she it we they me him her us them my your his its our their this that these those there here what which who whom whose when where why how not no so very can could would should will shall may might must just also than then too into out up down over under again more most some any all each other such own same only both few many much s t don doesn didn isn aren wasn weren won wouldn couldn shouldn im ive id ill youre theyre thats its'.split(' '));

const SUBORDINATORS = /\b(because|although|though|even though|while|whereas|since|unless|if|when|whenever|which|who|whom|whose|so that|in order to|as long as|as soon as|once|until|rather than|instead of|despite|not only)\b/gi;
const TRANSITIONS = /\b(however|therefore|for example|for instance|moreover|furthermore|in addition|on the other hand|as a result|consequently|first|second|finally|overall|in my opinion|personally|that said|admittedly|in contrast|similarly|in fact|for this reason|to be specific|in short|ultimately)\b/gi;
const POLITE = /\b(would|could you|please|i would appreciate|i was wondering|thank you|thanks|sorry|apologi[sz]e|i hope|if possible|would it be possible|kindly|grateful)\b/gi;
const INFORMAL = /\b(gonna|wanna|gotta|lol|u|ur|thx|pls|plz|yeah|yep|nope|kinda|sorta|dude|hey guys)\b|!!+/gi;
const STANCE = /\b(i think|i believe|in my opinion|in my view|from my perspective|i agree|i disagree|i side with|personally|i would argue|i am convinced|it seems to me|i support|i favor|i prefer)\b/gi;
const EXAMPLE = /\b(for example|for instance|such as|in my experience|when i|imagine|consider|a good example|to illustrate|last (year|semester|summer|month)|my (friend|brother|sister|cousin|roommate|classmate|father|mother|parents))\b/gi;
const REASON = /\b(because|since|the (main|key|biggest) reason|this means|as a result|that is why|which means|so that|therefore)\b/gi;

export function words(text) {
  return (String(text).toLowerCase().match(/[a-z0-9’']+/g) || []).map((w) => w.replace(/[’']/g, ''));
}

export function sentences(text) {
  return String(text)
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Za-z"“(])/)
    .map((s) => s.trim())
    .filter((s) => /[a-z]/i.test(s));
}

function count(re, text) {
  return (String(text).match(re) || []).length;
}

function mean(a) { return a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0; }
function sd(a) {
  if (a.length < 2) return 0;
  const m = mean(a);
  return Math.sqrt(mean(a.map((x) => (x - m) ** 2)));
}

// Moving-average type/token ratio: stable across response lengths.
function mattr(tokens, window = 40) {
  if (tokens.length === 0) return 0;
  if (tokens.length <= window) return new Set(tokens).size / tokens.length;
  let total = 0, n = 0;
  for (let i = 0; i + window <= tokens.length; i += 5) {
    total += new Set(tokens.slice(i, i + window)).size / window;
    n++;
  }
  return total / n;
}

function ngramOverlap(tokens, sourceTokens, n = 5) {
  if (tokens.length < n || sourceTokens.length < n) return 0;
  const src = new Set();
  for (let i = 0; i + n <= sourceTokens.length; i++) src.add(sourceTokens.slice(i, i + n).join(' '));
  let hit = 0, total = 0;
  for (let i = 0; i + n <= tokens.length; i++) {
    total++;
    if (src.has(tokens.slice(i, i + n).join(' '))) hit++;
  }
  return total ? hit / total : 0;
}

export function contentWords(text) {
  return words(text).filter((w) => w.length > 2 && !STOP.has(w));
}

// Crude stemmer, enough for keyword matching (reschedule/rescheduling).
export function stem(w) {
  return w.replace(/(ing|ed|es|s|ly|ment|ion|ions|er|ers)$/, '');
}

function mechanics(text) {
  const issues = [];
  const add = (type, sample, hint) => issues.push({ type, sample, hint });
  const t = String(text);
  for (const m of t.matchAll(/(^|[\s(])i(?=[\s,.;:!?'’]|$)/g)) add('capital', 'i', 'Capitalize the pronoun “I”.');
  for (const s of sentences(t)) if (/^[a-z]/.test(s)) add('capital', s.slice(0, 30), 'Start each sentence with a capital letter.');
  for (const m of t.matchAll(/\b(\w+)\s+\1\b/gi)) if (!/^(that|had|very)$/i.test(m[1])) add('repeat', m[0], 'Repeated word.');
  for (const m of t.matchAll(/[,.;:!?](?=[A-Za-z])/g)) add('spacing', t.slice(Math.max(0, m.index - 8), m.index + 8), 'Add a space after punctuation.');
  for (const m of t.matchAll(/\b(alot|dont|cant|wont|doesnt|didnt|isnt|im|ive|thats|could of|would of|should of|irregardless|everyday life is|more better|most easiest)\b/gi)) {
    add('spelling', m[0], `Check “${m[0]}”.`);
  }
  for (const s of sentences(t)) if (words(s).length > 45) add('length', s.slice(0, 40) + '…', 'Very long sentence: split it to keep control.');
  if (t.trim() && !/[.!?]["’”)]?\s*$/.test(t.trim().split('\n').filter((l) => l.trim()).slice(-1)[0] || '') && !/^(best|regards|sincerely|thanks|thank you|cheers|yours)/i.test(t.trim().split('\n').slice(-2)[0] || '')) {
    add('punctuation', t.trim().slice(-20), 'End your last sentence with punctuation.');
  }
  return issues;
}

export function analyzeText(text, promptText = '') {
  const toks = words(text);
  const sents = sentences(text);
  const lens = sents.map((s) => words(s).length);
  const content = toks.filter((w) => w.length > 2 && !STOP.has(w));
  const freq = {};
  content.forEach((w) => { freq[w] = (freq[w] || 0) + 1; });
  const promptStems = new Set(contentWords(promptText).map(stem));
  const overused = Object.entries(freq)
    .filter(([w, c]) => c >= 4 && !promptStems.has(stem(w)))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  return {
    words: toks.length,
    sentences: sents.length,
    paragraphs: String(text).split(/\n\s*\n|\n(?=\S)/).filter((p) => p.trim()).length,
    avgSentence: mean(lens),
    sentenceSd: sd(lens),
    diversity: mattr(toks),
    subordinators: count(SUBORDINATORS, text),
    transitions: count(TRANSITIONS, text),
    polite: count(POLITE, text),
    informal: count(INFORMAL, text),
    stance: count(STANCE, text),
    examples: count(EXAMPLE, text),
    reasons: count(REASON, text),
    copyRatio: ngramOverlap(toks, words(promptText)),
    overused,
    issues: mechanics(text),
  };
}

const clamp = (x, lo = 0, hi = 5) => Math.max(lo, Math.min(hi, x));
const r1 = (x) => Math.round(x * 2) / 2;

function languageScore(s) {
  const subPer = s.sentences ? s.subordinators / s.sentences : 0;
  let v = 2;
  v += s.diversity >= 0.74 ? 1 : s.diversity >= 0.64 ? 0.5 : 0;
  v += subPer >= 0.5 ? 1 : subPer >= 0.25 ? 0.5 : 0;
  v += s.sentenceSd >= 5 ? 1 : s.sentenceSd >= 3 ? 0.5 : 0;
  if (s.avgSentence < 8) v -= 0.5;
  if (s.overused.length >= 2) v -= 0.5;
  return clamp(r1(v));
}

function accuracyScore(s) {
  const per100 = s.words ? (s.issues.length / s.words) * 100 : 0;
  const v = 4 - per100 * 0.8;
  return clamp(r1(v), 0, 4);
}

function capByLength(score, wordsN, caps) {
  for (const [minWords, cap] of caps) if (wordsN < minWords) return Math.min(score, cap);
  return score;
}

function goalCoverage(text, goals = []) {
  const stems = new Set(words(text).map(stem));
  const lower = String(text).toLowerCase();
  return goals.map((g) => {
    const hit = (g.keywords || []).some((k) => {
      const kw = String(k).toLowerCase();
      return kw.includes(' ') ? lower.includes(kw) : stems.has(stem(kw));
    });
    return { goal: g.text, covered: hit };
  });
}

export function scoreEmail(item, text) {
  const promptText = [item.scenario, ...(item.goals || []).map((g) => g.text)].join(' ');
  const s = analyzeText(text, promptText);
  const coverage = goalCoverage(text, item.goals);
  const covered = coverage.filter((c) => c.covered).length;
  const goalsN = coverage.length || 3;
  const firstLine = String(text).trim().split('\n')[0] || '';
  const greeting = /^(dear|hi|hello|good (morning|afternoon|evening)|to whom)/i.test(firstLine.trim());
  const closing = /(best regards|kind regards|warm regards|regards|sincerely|best wishes|best,|thank you|thanks|cheers|all the best|yours|take care|see you)/i.test(String(text).trim().split('\n').slice(-4).join(' '));
  const formal = item.register !== 'informal';

  let elaboration = (covered / goalsN) * 5;
  if (s.words < 60) elaboration -= 1.5;
  else if (s.words < 90) elaboration -= 0.5;
  elaboration = clamp(r1(elaboration));

  let conventions = 1;
  if (greeting) conventions += 1;
  if (closing) conventions += 1;
  if (s.polite >= 1) conventions += 1;
  if (s.polite >= 2 || s.paragraphs >= 3) conventions += 0.5;
  if (formal && s.informal) conventions -= 1.5;
  conventions = clamp(r1(conventions));

  const criteria = {
    elaboration,
    language: languageScore(s),
    conventions,
    accuracy: accuracyScore(s),
  };
  let overall = mean(Object.values(criteria));
  if (covered < goalsN) overall = Math.min(overall, covered === 0 ? 2 : 3);
  overall = capByLength(overall, s.words, [[1, 0], [30, 1], [60, 2], [85, 3]]);
  if (s.copyRatio > 0.5) overall = Math.min(overall, 1);

  const notes = [];
  coverage.forEach((c, i) => notes.push({
    criterion: 'elaboration',
    tone: c.covered ? 'good' : 'fix',
    text: c.covered ? `Point ${i + 1} addressed: ${c.goal}` : `Point ${i + 1} looks missing: ${c.goal}`,
  }));
  if (!greeting) notes.push({ criterion: 'conventions', tone: 'fix', text: `Open with a greeting that fits the reader (${formal ? '“Dear Professor Chen,”' : '“Hi Sam,”'}).` });
  if (!closing) notes.push({ criterion: 'conventions', tone: 'fix', text: 'Close with a thank-you line and a sign-off (“Best regards, Alex”).' });
  if (formal && s.informal) notes.push({ criterion: 'conventions', tone: 'fix', text: 'Some words are too casual for this reader.' });
  if (s.polite >= 2) notes.push({ criterion: 'conventions', tone: 'good', text: 'Polite, reader-aware phrasing.' });
  if (s.words < 90) notes.push({ criterion: 'elaboration', tone: 'fix', text: `Only ${s.words} words — add one concrete detail to each point (aim for 120–180).` });
  addLanguageNotes(notes, s);

  return { overall: clamp(Math.round(overall)), criteria, stats: s, coverage, notes, method: 'local' };
}

export function scoreDiscussion(item, text) {
  const promptText = [item.professor?.text, ...(item.students || []).map((x) => x.text)].join(' ');
  const s = analyzeText(text, promptText);
  const names = (item.students || []).map((x) => x.name.toLowerCase());
  const lower = String(text).toLowerCase();
  const engages = names.some((n) => lower.includes(n)) || /\b(classmate|as .* (said|mentioned|pointed out)|i (agree|disagree) with)\b/i.test(text);
  const topicOverlap = new Set(contentWords(text).map(stem).filter((w) => new Set(contentWords(item.professor?.text || '').map(stem)).has(w))).size;

  let relevance = 1;
  if (s.stance) relevance += 1;
  if (s.examples) relevance += 1;
  if (s.reasons) relevance += 0.5;
  if (engages) relevance += 0.5;
  if (s.words >= 100) relevance += 1; else if (s.words >= 80) relevance += 0.5;
  if (topicOverlap < 2) relevance -= 1.5;
  relevance = clamp(r1(relevance));

  const criteria = { relevance, language: languageScore(s), accuracy: accuracyScore(s) };
  let overall = mean(Object.values(criteria));
  overall = capByLength(overall, s.words, [[1, 0], [40, 1], [70, 2], [90, 3]]);
  if (s.copyRatio > 0.5) overall = Math.min(overall, 1);

  const notes = [];
  notes.push(s.stance
    ? { criterion: 'relevance', tone: 'good', text: 'Your position is stated explicitly.' }
    : { criterion: 'relevance', tone: 'fix', text: 'State your position in the first sentence (“I believe… because…”).' });
  notes.push(s.examples
    ? { criterion: 'relevance', tone: 'good', text: 'You support the point with an example.' }
    : { criterion: 'relevance', tone: 'fix', text: 'Add one concrete example or scenario, then explain how it proves your point.' });
  if (!engages) notes.push({ criterion: 'relevance', tone: 'fix', text: `Refer to a classmate (${(item.students || []).map((x) => x.name).join(' or ')}) and add something new to their idea.` });
  if (topicOverlap < 2) notes.push({ criterion: 'relevance', tone: 'fix', text: 'The response may not address the professor’s actual question.' });
  if (s.words < 100) notes.push({ criterion: 'relevance', tone: 'fix', text: `${s.words} words — aim for 110–150 to show full elaboration.` });
  addLanguageNotes(notes, s);

  return { overall: clamp(Math.round(overall)), criteria, stats: s, engages, notes, method: 'local' };
}

function addLanguageNotes(notes, s) {
  const subPer = s.sentences ? s.subordinators / s.sentences : 0;
  if (subPer < 0.25) notes.push({ criterion: 'language', tone: 'fix', text: 'Mostly simple sentences. Combine ideas with although / which / if / because.' });
  else notes.push({ criterion: 'language', tone: 'good', text: 'Good use of complex sentences.' });
  if (s.sentenceSd < 3 && s.sentences >= 4) notes.push({ criterion: 'language', tone: 'fix', text: 'Sentences are all a similar length; vary short and long sentences.' });
  if (s.overused.length) notes.push({ criterion: 'language', tone: 'fix', text: `Repeated words: ${s.overused.map(([w, c]) => `${w} ×${c}`).join(', ')}. Use synonyms or pronouns.` });
  if (s.copyRatio > 0.2) notes.push({ criterion: 'language', tone: 'fix', text: 'Parts of the response copy the prompt word for word. Rephrase in your own words.' });
  const seen = new Set();
  s.issues.forEach((iss) => {
    const k = iss.type + iss.hint;
    if (seen.has(k)) return;
    seen.add(k);
    notes.push({ criterion: 'accuracy', tone: 'fix', text: `${iss.hint}${iss.sample ? ` (“${iss.sample.trim()}”)` : ''}` });
  });
}
