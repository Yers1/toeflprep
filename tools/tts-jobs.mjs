// Lists every text the app speaks aloud, with the voice role it is spoken in,
// so tools/gen-audio.py can pre-record it with a natural neural voice.
// Run: npm run audio   (prints JSON jobs to stdout)

import { BANK, TESTS } from '../content/index.js';
import { VOCAB } from '../content/vocab.js';
import { clipKey } from '../src/core/audio.js';

const jobs = new Map();
const add = (role, text) => {
  if (!text) return;
  const key = clipKey(role, text);
  jobs.set(key, { key, role, text: String(text).replace(/\s+/g, ' ').trim() });
};

// Mirrors the speak() call sites in src/tasks/listening.js and src/tasks/speaking.js.
function walk(o) {
  if (Array.isArray(o)) return o.forEach(walk);
  if (!o || typeof o !== 'object') return;
  if (Array.isArray(o.lines) && o.roles) o.lines.forEach((l) => add(o.roles[l.speaker] || 'A', l.text));
  if (Array.isArray(o.sentences) && typeof o.sentences[0] === 'string') o.sentences.forEach((s, i) => add(i % 2 ? 'B' : 'A', s));
  if (Array.isArray(o.questions) && typeof o.questions[0] === 'string') o.questions.forEach((q) => add('B', q));
  if (o.prompt && o.speaker && Array.isArray(o.choices)) add(o.speaker, o.prompt);
  Object.values(o).forEach(walk);
}

walk(BANK);
walk(TESTS);
VOCAB.forEach((c) => add('A', c.word));
// Settings → Audio → Play sample
add('A', 'Welcome to the listening section. You will hear a conversation between a student and a librarian.');
add('B', 'Excuse me, could you tell me where the reserve books are kept?');

process.stdout.write(JSON.stringify([...jobs.values()], null, 1));
