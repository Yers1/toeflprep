// Stages 6–8: Listen and Repeat with only the long sentences. Stage 6 and 7
// are the last two sentences of every real scene; stage 8 is the shortest
// Hard Repeat sentences (24–26 words), one step above stage 7. All prompts
// already have recorded voices, so nothing new needs generating.

import { html, mount } from '../core/ui.js';
import { drillState } from '../core/store.js';
import { repeat } from '../tasks/speaking.js';
import { BANK } from '../../content/index.js';
import { HARD } from '../../content/bank/hard_repeat.js';
import { words } from '../analyzers/writing.js';

const SIZE = 7;
const POOLS = {
  6: BANK.speaking_repeat.map((s) => s.sentences[5]),
  7: BANK.speaking_repeat.map((s) => s.sentences[6]),
  8: HARD.flatMap((s) => s.sentences).filter((t) => words(t).length <= 26),
};
const MODES = {
  6: { label: 'Stage 6', note: 'The 6th sentence of every scene, 11–18 words.' },
  7: { label: 'Stage 7', note: 'The 7th and hardest sentence of every scene, 16–23 words.' },
  8: { label: 'Stage 8', note: 'One step above the exam: 24–26 words.' },
  mix: { label: 'Mix 6 → 7 → 8', note: 'Two of stage 6, three of stage 7, two of stage 8, in rising order.' },
};

const pick = (list, n) => [...list].sort(() => Math.random() - 0.5).slice(0, n);
const sortByLength = (list) => [...list].sort((a, b) => words(a).length - words(b).length);

function buildSentences(mode) {
  if (mode === 'mix') return [...sortByLength(pick(POOLS[6], 2)), ...sortByLength(pick(POOLS[7], 3)), ...sortByLength(pick(POOLS[8], 2))];
  return sortByLength(pick(POOLS[mode], SIZE));
}

export default function stagesView(outlet, params, query) {
  return MODES[query.mode] ? showSession(outlet, query.mode) : showHome(outlet);
}

function showHome(outlet) {
  mount(outlet, html`
    <section class="page narrow">
      <header class="page-head">
        <p class="eyebrow">Listen and Repeat</p>
        <h1>Stages 6–8</h1>
        <p class="muted">Only the long sentences, where most points are lost. Each session picks ${SIZE} new random sentences.</p>
      </header>
      <div class="deck-grid">
        ${Object.entries(MODES).map(([k, m]) => html`<a class="feature deck-card" href="#/stages?mode=${k}">
          <h3>${m.label}</h3>
          <p>${m.note}</p>
          <p class="deck-counts small"><span>${SIZE} sentences</span><span>${k === 'mix' ? 'rising' : `${POOLS[k].length} in pool`}</span></p>
        </a>`)}
      </div>
      <div class="card">
        <h2>Tip</h2>
        <p class="small">Split each sentence into 3–4 meaning chunks while you listen, start speaking right after the beep, and copy the speaker’s melody. Below 4? Rebuild the sentence from the end, then press “Try this sentence again”.</p>
      </div>
    </section>`);
}

function showSession(outlet, mode) {
  const item = {
    id: `stages-${mode}`,
    scene: `Stages 6–8 · ${MODES[mode].label}`,
    icon: '🎯',
    intro: MODES[mode].note,
    sentences: buildSentences(mode),
    maxWindow: mode === '8' || mode === 'mix' ? 14 : 12,
  };

  function finish(response) {
    const result = repeat.assess(item, response);
    mount(outlet, html`
      <section class="page narrow">
        <header class="page-head"><p class="eyebrow">Stages 6–8</p><h1>Session done</h1></header>
        <p>Average score: <strong>${result.overall}</strong> / 5 across ${item.sentences.length} long sentences.</p>
        ${repeat.review(item, response, result)}
        <div class="row gap-s wrap">
          <a class="btn btn-primary" href="#/stages?mode=${mode}&r=${Date.now()}">New ${MODES[mode].label} session</a>
          <a class="btn btn-ghost" href="#/stages">All stages</a>
        </div>
      </section>`);
  }

  const controller = repeat.render(outlet, item, { mode: 'practice', rate: drillState().speed, onDone: finish });
  return () => controller?.destroy?.();
}
