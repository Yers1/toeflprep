import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const appHtml = fs.readFileSync(new URL('../app.html', import.meta.url), 'utf8');
const appJs = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const contentSource = fs.readFileSync(new URL('../content.js', import.meta.url), 'utf8');

const sandbox = { window: {} };
vm.runInNewContext(contentSource, sandbox, { filename: 'content.js' });
const content = sandbox.window.TP_2026_CONTENT;

const expectedModes = [
  'reading_words', 'reading_daily', 'reading_academic',
  'listening_response', 'listening_conversation', 'listening_announcement', 'listening_academic',
  'speaking_repeat', 'speaking_interview',
  'writing_sentence', 'writing_email', 'writing_discussion'
];

for (const mode of expectedModes) {
  assert.match(appHtml, new RegExp(`data-mode=["']${mode}["']`), `Missing panel or tab for ${mode}`);
}

for (const key of ['reading_daily', 'reading_academic', 'listening_response', 'listening_conversation', 'listening_announcement', 'listening_academic', 'writing_discussion']) {
  assert.ok(Array.isArray(content[key]) && content[key].length > 0, `${key} needs practice content`);
}

for (const key of ['reading_daily', 'reading_academic', 'listening_conversation', 'listening_announcement', 'listening_academic']) {
  for (const item of content[key]) {
    assert.ok(item.title, `${key} item needs a title`);
    assert.ok(Array.isArray(item.questions) && item.questions.length > 0, `${key} item needs questions`);
    for (const question of item.questions) validateQuestion(question, key);
  }
}

for (const item of content.listening_response) validateQuestion(item, 'listening_response');

for (const item of content.reading_words_passages) {
  const gaps = item.text.match(/\b[A-Za-z]*_{2,}[A-Za-z]*\b/g) || [];
  assert.equal(gaps.length, item.answers.length, `Cloze gap count mismatch in ${item.title}`);
}

const htmlIds = new Set([...appHtml.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]));
const referencedIds = new Set([...appJs.matchAll(/\$\(['"]([^'"]+)['"]\)/g)].map((match) => match[1]));
for (const id of referencedIds) assert.ok(htmlIds.has(id), `app.js references missing #${id}`);

assert.doesNotMatch(appHtml, /bank\/bank\.js/, 'Missing generated bank should not be loaded');
assert.match(appJs, /writing_email:\s*420/, 'Write an Email timer must be 7 minutes');

function validateQuestion(question, key) {
  assert.ok(question.q || question.prompt, `${key} question needs text`);
  assert.ok(Array.isArray(question.choices) && question.choices.length >= 3, `${key} question needs choices`);
  assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.choices.length, `${key} answer index is invalid`);
  assert.ok(question.explanation, `${key} question needs an explanation`);
}

console.log(`Validated ${expectedModes.length} task families and all authored answer keys.`);
