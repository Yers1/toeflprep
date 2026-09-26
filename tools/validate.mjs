// Validates the v3 content bank and mock tests before every deploy.
// Run: npm test

import assert from 'node:assert/strict';
import { BANK, TESTS } from '../content/index.js';
import { VOCAB, DECKS } from '../content/vocab.js';
import { TASKS } from '../src/tasks/index.js';
import { makeCTest } from '../src/tasks/reading.js';
import { isCorrect } from '../src/tasks/writing.js';
import { moduleBlocks, productiveBlocks } from '../src/core/testmodel.js';

let checks = 0;
const check = (cond, msg) => { checks++; assert.ok(cond, msg); };

// ---- practice bank ----------------------------------------------------
for (const task of Object.keys(TASKS)) {
  const list = BANK[task] || [];
  check(list.length > 0, `${task}: no practice sets`);
  const ids = new Set();
  for (const item of list) {
    check(item.id && !ids.has(item.id), `${task}: duplicate or missing id (${item.id})`);
    ids.add(item.id);
    validateItem(task, item);
  }
}

// ---- flashcard vocabulary ----------------------------------------------
{
  const deckIds = new Set(DECKS.map((d) => d.id));
  const vocabIds = new Set();
  check(VOCAB.length > 0, 'vocab: no flashcards');
  for (const c of VOCAB) {
    check(c.id && !vocabIds.has(c.id), `vocab: duplicate or missing id (${c.id})`);
    vocabIds.add(c.id);
    check(deckIds.has(c.deck), `vocab ${c.id}: unknown deck "${c.deck}"`);
    check(c.word && c.pos && c.def && c.ex && c.ru, `vocab ${c.id}: missing field`);
    check(c.ex.toLowerCase().includes(c.word.toLowerCase()), `vocab ${c.id}: example does not contain the word`);
  }
}

function validateItem(task, item) {
  if (task === 'reading_ctw') {
    const ct = makeCTest(item.text, item.blanks || 10);
    check(ct.blanks.length >= 5, `${item.id}: too few C-test blanks (${ct.blanks.length})`);
    ct.blanks.forEach((b) => check(/^[a-z]+$/.test(b.missing) && b.missing.length >= 2, `${item.id}: bad blank "${b.missing}"`));
  } else if (task === 'reading_daily' || task === 'reading_academic') {
    check(item.questions?.length > 0, `${item.id}: no questions`);
    item.questions.forEach((q, i) => validateMcq(item.id, i, q));
  } else if (task === 'listening_response') {
    check(item.items?.length > 0, `${item.id}: no response items`);
    item.items.forEach((p, i) => {
      check(p.prompt, `${item.id}[${i}]: missing prompt`);
      check(p.choices?.length === 4, `${item.id}[${i}]: needs 4 choices`);
      check(p.answer >= 0 && p.answer < 4, `${item.id}[${i}]: bad answer index`);
    });
  } else if (task === 'listening_conversation' || task === 'listening_announcement' || task === 'listening_academic') {
    check(item.lines?.length > 0, `${item.id}: no script lines`);
    item.lines.forEach((l) => check(l.speaker && l.text, `${item.id}: line missing speaker/text`));
    const speakers = new Set(item.lines.map((l) => l.speaker));
    speakers.forEach((s) => check(item.roles?.[s], `${item.id}: no voice role for speaker "${s}"`));
    check(item.questions?.length > 0, `${item.id}: no questions`);
    item.questions.forEach((q, i) => validateMcq(item.id, i, q));
  } else if (task === 'writing_sentence') {
    check(item.items?.length === 10, `${item.id}: expected 10 Build-a-Sentence items, got ${item.items?.length}`);
    item.items.forEach((q, i) => {
      check(q.context?.text, `${item.id}[${i}]: missing context line`);
      check(q.tiles?.length >= 4, `${item.id}[${i}]: too few tiles`);
      check(isCorrect(q, q.tiles.map((_, k) => k)), `${item.id}[${i}]: correct order does not self-validate`);
    });
  } else if (task === 'writing_email') {
    check(item.scenario && item.to && item.goals?.length === 3, `${item.id}: incomplete email prompt`);
    check(item.model?.text?.length > 150, `${item.id}: missing/short model response`);
  } else if (task === 'writing_discussion') {
    check(item.professor?.text && item.students?.length === 2, `${item.id}: incomplete discussion prompt`);
  } else if (task === 'speaking_repeat') {
    check(item.sentences?.length === 7, `${item.id}: expected 7 sentences, got ${item.sentences?.length}`);
  } else if (task === 'speaking_interview') {
    check(item.questions?.length === 4, `${item.id}: expected 4 questions, got ${item.questions?.length}`);
  }
}

function validateMcq(id, i, q) {
  check(q.q && q.choices?.length === 4, `${id} q${i}: needs a question and 4 choices`);
  check(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, `${id} q${i}: bad answer index`);
  check(new Set(q.choices).size === 4, `${id} q${i}: duplicate choices`);
}

// ---- mock tests ---------------------------------------------------------
check(TESTS.length >= 2, 'need at least 2 full mock tests');
const testIds = new Set();
for (const t of TESTS) {
  check(t.id && !testIds.has(t.id), `duplicate test id ${t.id}`);
  testIds.add(t.id);
  check(t.title && t.description, `${t.id}: missing title/description`);

  for (const key of ['m1', 'hard', 'easy']) {
    const blocks = moduleBlocks(t, 'reading', key);
    const q = blocks.reduce((s, b) => s + TASKS[b.task].engine.count(b.item), 0);
    check(q >= 8, `${t.id} reading.${key}: only ${q} questions`);
    blocks.forEach((b) => validateItem(b.task, b.item));
  }
  for (const key of ['m1', 'hard', 'easy']) {
    const blocks = moduleBlocks(t, 'listening', key);
    const q = blocks.reduce((s, b) => s + TASKS[b.task].engine.count(b.item), 0);
    check(q >= 8, `${t.id} listening.${key}: only ${q} questions`);
    blocks.forEach((b) => validateItem(b.task, b.item));
  }
  const wr = productiveBlocks(t, 'writing');
  check(wr.length === 3 && wr.map((b) => b.task).join(',') === 'writing_sentence,writing_email,writing_discussion', `${t.id}: writing block order/count wrong`);
  wr.forEach((b) => validateItem(b.task, b.item));
  const sp = productiveBlocks(t, 'speaking');
  check(sp.length === 2 && sp.map((b) => b.task).join(',') === 'speaking_repeat,speaking_interview', `${t.id}: speaking block order/count wrong`);
  sp.forEach((b) => validateItem(b.task, b.item));
}

console.log(`OK — ${checks} checks passed across ${Object.keys(TASKS).length} task types and ${TESTS.length} mock tests.`);
