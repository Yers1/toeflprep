// Structure and scoring of full practice tests.
// A test = reading/listening {m1, hard, easy} + writing [blocks] + speaking [blocks].
// Blocks are addressed by refs like "reading.m1.2" or "listening.hard.0.3"
// (the last number selects one prompt inside a Listen-and-Choose set).

import { TASKS } from '../tasks/index.js';
import { objectiveSectionBand, writingBand, rubricToBand, overallBand, roundHalf } from './scoring.js';

export const SECTION_ORDER = ['reading', 'listening', 'writing', 'speaking'];
export const ROUTE_THRESHOLD = 0.6;

// Seconds per module. Listening time counts answering time only (the clock
// pauses while audio plays).
export const MODULE_TIME = {
  reading: { m1: 15 * 60, hard: 15 * 60, easy: 15 * 60 },
  listening: { m1: 6 * 60, hard: 6 * 60, easy: 6 * 60 },
};

export function moduleBlocks(test, section, key) {
  const blocks = test[section]?.[key] || [];
  const out = [];
  blocks.forEach((b, i) => {
    if (b.task === 'listening_response' && b.item.items.length > 1) {
      b.item.items.forEach((p, k) => out.push({ task: b.task, item: { id: `${b.item.id}-${k}`, items: [p] }, ref: `${section}.${key}.${i}.${k}` }));
    } else {
      out.push({ task: b.task, item: b.item, ref: `${section}.${key}.${i}` });
    }
  });
  return out;
}

export function productiveBlocks(test, section) {
  return (test[section] || []).map((b, i) => ({ task: b.task, item: b.item, ref: `${section}.${i}` }));
}

export function resolve(test, ref) {
  const [section, a, b, c] = ref.split('.');
  if (section === 'writing' || section === 'speaking') {
    const block = test[section][Number(a)];
    return { task: block.task, item: block.item };
  }
  const block = test[section][a][Number(b)];
  if (c != null) return { task: block.task, item: { id: `${block.item.id}-${c}`, items: [block.item.items[Number(c)]] } };
  return { task: block.task, item: block.item };
}

export function questionCount(task, item) {
  const e = TASKS[task].engine;
  return e.count ? e.count(item) : 1;
}

export function gradeObjective(test, refs, responses) {
  let correct = 0, total = 0;
  refs.forEach((ref) => {
    const { task, item } = resolve(test, ref);
    const g = TASKS[task].engine.grade(item, responses[ref]);
    correct += g.correct;
    total += g.total;
  });
  return { correct, total };
}

// Computes section and overall bands from a stored test attempt detail.
export function scoreTest(test, detail) {
  const out = { sections: {}, overall: null };
  const refsOf = (section) => Object.keys(detail.responses).filter((r) => r.startsWith(`${section}.`));

  for (const section of ['reading', 'listening']) {
    if (!detail.sections.includes(section)) continue;
    const refs = refsOf(section);
    const g = gradeObjective(test, refs, detail.responses);
    const route = detail.routes?.[section] || 'hard';
    out.sections[section] = { ...g, route, band: objectiveSectionBand(section, g.correct, g.total, route) };
  }

  if (detail.sections.includes('writing')) {
    const w = { sentence: null, email: null, discussion: null };
    productiveBlocks(test, 'writing').forEach(({ task, item, ref }) => {
      if (task === 'writing_sentence') {
        const g = TASKS[task].engine.grade(item, detail.responses[ref]);
        w.sentence = g;
      } else {
        const a = detail.assess?.[ref];
        w[task === 'writing_email' ? 'email' : 'discussion'] = a ? a.overall : 0;
      }
    });
    const wb = writingBand({ sentenceCorrect: w.sentence?.correct || 0, sentenceTotal: w.sentence?.total || 10, email: w.email, discussion: w.discussion });
    out.sections.writing = { ...w, avg: wb?.avg, band: wb?.band };
  }

  if (detail.sections.includes('speaking')) {
    const scores = [];
    productiveBlocks(test, 'speaking').forEach(({ ref }) => {
      const a = detail.assess?.[ref];
      (a?.items || []).forEach((r) => scores.push(r.score ?? r.overall ?? 0));
    });
    const avg = scores.length ? scores.reduce((x, y) => x + y, 0) / scores.length : 0;
    out.sections.speaking = { items: scores.length, avg: Math.round(avg * 100) / 100, band: rubricToBand(avg) };
  }

  const bands = Object.fromEntries(Object.entries(out.sections).map(([k, v]) => [k, v.band]));
  out.overall = overallBand(bands);
  out.bands = bands;
  return out;
}

export function testSummaryBand(result) {
  if (result.overall != null) return result.overall;
  const vals = Object.values(result.bands || {}).filter((v) => v != null);
  return vals.length ? roundHalf(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
}
