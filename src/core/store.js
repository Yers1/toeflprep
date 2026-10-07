// Local persistence. Everything lives in this browser; nothing is sent anywhere
// except the text sent for optional AI feedback.

import { uid } from './ui.js';

const KEY = 'tp3:data';
const KEY_SECRET = 'tp3:apikey';

const DEFAULT_SETTINGS = {
  provider: 'auto',       // auto | server | anthropic | openai | gemini | deepseek | github | off
  model: '',              // empty = provider default
  rememberKey: false,
  voiceA: '',             // preferred TTS voices (names); empty = auto
  voiceB: '',
  rate: 0.95,
  theme: 'system',        // system | light | dark
  targetBand: 5,
  testDate: '',
};

function blank() {
  return { version: 3, attempts: [], external: [], plan: null, settings: { ...DEFAULT_SETTINGS }, seen: {}, cards: {}, custom: [], drill: { speed: 1, lastUsed: {}, log: {} } };
}

let cache = null;

function safeGet(storage, key) {
  try { return storage.getItem(key); } catch { return null; }
}
function safeSet(storage, key, value) {
  try { storage.setItem(key, value); return true; } catch { return false; }
}
function safeRemove(storage, key) {
  try { storage.removeItem(key); } catch { /* ignore */ }
}

export function load() {
  if (cache) return cache;
  const rawValue = safeGet(localStorage, KEY);
  let data = blank();
  if (rawValue) {
    try {
      const parsed = JSON.parse(rawValue);
      data = { ...blank(), ...parsed, settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) } };
    } catch { /* corrupted: start fresh */ }
  }
  cache = data;
  return cache;
}

function persist() {
  if (!safeSet(localStorage, KEY, JSON.stringify(cache))) {
    console.warn('Could not save progress (storage full or blocked).');
  }
  window.dispatchEvent(new CustomEvent('tp:data'));
}

export function settings() {
  return load().settings;
}

export function updateSettings(patch) {
  Object.assign(load().settings, patch);
  persist();
}

// ---- attempts --------------------------------------------------------------
// attempt = { id, ts, kind: 'task'|'test', task, section, setId, title,
//             score: { correct?, total?, rubric?, band? }, detail }

export function addAttempt(attempt) {
  const entry = { id: uid(), ts: Date.now(), ...attempt };
  load().attempts.unshift(entry);
  if (cache.attempts.length > 800) cache.attempts.length = 800;
  markSeen(entry.task, entry.setId);
  persist();
  return entry;
}

export function updateAttempt(id, patch) {
  const a = load().attempts.find((x) => x.id === id);
  if (a) { Object.assign(a, patch); persist(); }
  return a;
}

export function attempts(filter = {}) {
  return load().attempts.filter((a) =>
    (!filter.kind || a.kind === filter.kind) &&
    (!filter.task || a.task === filter.task) &&
    (!filter.section || a.section === filter.section));
}

export function getAttempt(id) {
  return load().attempts.find((a) => a.id === id);
}

export function deleteAttempt(id) {
  const d = load();
  d.attempts = d.attempts.filter((a) => a.id !== id);
  persist();
}

function markSeen(task, setId) {
  if (!task || !setId) return;
  const seen = load().seen;
  seen[task] = seen[task] || {};
  seen[task][setId] = (seen[task][setId] || 0) + 1;
}

export function seenCount(task, setId) {
  return load().seen?.[task]?.[setId] || 0;
}

// ---- external tests (taken on ETS, Magoosh, etc.) ---------------------------

export function externalTests() {
  return load().external;
}

export function addExternalTest(entry) {
  load().external.unshift({ id: uid(), ts: Date.now(), ...entry });
  persist();
}

export function deleteExternalTest(id) {
  const d = load();
  d.external = d.external.filter((x) => x.id !== id);
  persist();
}

// ---- study plan ------------------------------------------------------------

export function plan() {
  return load().plan;
}

export function savePlan(p) {
  load().plan = p;
  persist();
}

// ---- API key: session by default, local only when the user opts in ---------

export function getApiKey() {
  return safeGet(sessionStorage, KEY_SECRET) || safeGet(localStorage, KEY_SECRET) || '';
}

export function setApiKey(key, remember) {
  safeRemove(sessionStorage, KEY_SECRET);
  safeRemove(localStorage, KEY_SECRET);
  if (!key) return;
  safeSet(remember ? localStorage : sessionStorage, KEY_SECRET, key);
}

// ---- import / export -------------------------------------------------------

export function exportData() {
  const d = load();
  return JSON.stringify({ ...d, exportedAt: new Date().toISOString() }, null, 2);
}

export function importData(text) {
  const parsed = JSON.parse(text);
  if (!parsed || !Array.isArray(parsed.attempts)) throw new Error('This file is not a TOEFL Prep export.');
  const d = load();
  const known = new Set(d.attempts.map((a) => a.id));
  const incoming = parsed.attempts.filter((a) => a && a.id && !known.has(a.id));
  d.attempts = [...incoming, ...d.attempts].sort((a, b) => b.ts - a.ts);
  if (Array.isArray(parsed.external)) {
    const ext = new Set(d.external.map((x) => x.id));
    d.external = [...parsed.external.filter((x) => x && !ext.has(x.id)), ...d.external];
  }
  if (!d.plan && parsed.plan) d.plan = parsed.plan;
  if (parsed.cards) for (const [id, st] of Object.entries(parsed.cards)) if (!d.cards[id]) d.cards[id] = st;
  if (Array.isArray(parsed.custom)) { const ids = new Set(d.custom.map((c) => c.id)); d.custom.push(...parsed.custom.filter((c) => c?.id && !ids.has(c.id))); }
  if (parsed.drill?.log) for (const [day, st] of Object.entries(parsed.drill.log)) if (!d.drill.log[day]) d.drill.log[day] = st;
  persist();
  return incoming.length;
}

export function resetAll() {
  cache = blank();
  persist();
}

// ---- flashcards (Leitner spaced repetition) --------------------------------
// box 0..5: interval in days before the card is due again.

const BOX_DAYS = [0, 1, 3, 7, 16, 35];

export function cards() {
  return load().cards;
}

export function cardState(id) {
  return load().cards[id];
}

export function gradeCard(id, grade) {
  const d = load();
  const cur = d.cards[id]?.box ?? -1;
  const box =
    grade === 'again' ? 0 :
    grade === 'hard' ? Math.max(0, cur) :
    grade === 'easy' ? Math.min(BOX_DAYS.length - 1, cur + 2) :
    Math.min(BOX_DAYS.length - 1, cur + 1); // good
  d.cards[id] = { box, due: Date.now() + BOX_DAYS[box] * 86_400_000 };
  persist();
  return d.cards[id];
}

// Cards the learner adds (words from the books). Same shape as content/vocab.js.
export function customCards() {
  return load().custom;
}

export function addCustomCard({ word, ru, ex }) {
  load().custom.push({ id: `mine-${uid()}`, deck: 'mine', word, pos: 'my word', def: '', ex, ru });
  persist();
}

// ---- listening drill --------------------------------------------------
// speed: current playback rate. lastUsed: sentence id -> timestamp, so a
// session can prefer sentences that haven't been practiced recently.
// log: dateIso -> cumulative words recalled that day.

export function drillState() {
  return load().drill;
}

export function setDrillSpeed(speed) {
  load().drill.speed = speed;
  persist();
}

export function drillTouch(ids) {
  const d = load();
  const now = Date.now();
  for (const id of ids) d.drill.lastUsed[id] = now;
  persist();
}

export function drillAddResult(dateIso, { correct, total }) {
  const d = load();
  const day = d.drill.log[dateIso] || { correct: 0, total: 0, sentences: 0 };
  day.correct += correct;
  day.total += total;
  day.sentences += 1;
  d.drill.log[dateIso] = day;
  persist();
  return day;
}
