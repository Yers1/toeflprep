// Hard Repeat: overload training for Listen and Repeat. Same engine as the
// task (src/tasks/speaking.js: repeat), but every sentence is longer than the
// hardest sentence of a real set, with up to 16 s to answer instead of 12.

import { html, mount } from '../core/ui.js';
import { drillState } from '../core/store.js';
import { repeat } from '../tasks/speaking.js';
import { HARD } from '../../content/bank/hard_repeat.js';
import { words } from '../analyzers/writing.js';

const MAX_WINDOW = 16;

export default function hardView(outlet, params, query) {
  const set = HARD.find((s) => s.id === query.set);
  return set ? showSession(outlet, set) : showHome(outlet);
}

function showHome(outlet) {
  mount(outlet, html`
    <section class="page narrow">
      <header class="page-head">
        <p class="eyebrow">Overload practice</p>
        <h1>Hard Repeat</h1>
        <p class="muted">Every sentence here is longer and more complex than sentence 7, the hardest one in a real Listen and Repeat set: 24–32 words with clauses, lists and numbers. Train here, and the exam sentences will feel short.</p>
      </header>

      <div class="card">
        <h2>How to use it</h2>
        <ol class="small">
          <li>Listen once and split the sentence into 3–4 meaning chunks: who, what, when or where, why.</li>
          <li>Start speaking right after the beep and copy the speaker’s melody.</li>
          <li>Below 4? Read the sentence, rebuild it from the end (last chunk first, then add one chunk in front at a time), then press “Try this sentence again”.</li>
        </ol>
        <p class="small muted">You get up to ${MAX_WINDOW} seconds per answer here; the real test gives 8–12. Playback uses your Listening Drill speed (${drillState().speed.toFixed(2)}x).</p>
      </div>

      <div class="deck-grid">
        ${HARD.map((s) => {
          const lens = s.sentences.map((t) => words(t).length);
          return html`<a class="feature deck-card" href="#/hard?set=${s.id}">
            <h3>${s.icon || ''} ${s.scene}</h3>
            <p>${s.intro}</p>
            <p class="deck-counts small"><span>${s.sentences.length} sentences</span><span>${Math.min(...lens)}–${Math.max(...lens)} words</span></p>
          </a>`;
        })}
      </div>
    </section>`);
}

function showSession(outlet, set) {
  const item = { ...set, maxWindow: MAX_WINDOW };

  function finish(response) {
    const result = repeat.assess(item, response);
    mount(outlet, html`
      <section class="page narrow">
        <header class="page-head"><p class="eyebrow">Hard Repeat</p><h1>Set done</h1></header>
        <p>Average score: <strong>${result.overall}</strong> / 5 across ${item.sentences.length} long sentences. A 3 here is roughly a 4–5 on real exam sentences.</p>
        ${repeat.review(item, response, result)}
        <div class="row gap-s wrap">
          <a class="btn btn-primary" href="#/hard?set=${set.id}">Try this set again</a>
          <a class="btn btn-ghost" href="#/hard">All hard sets</a>
        </div>
      </section>`);
  }

  const controller = repeat.render(outlet, item, { mode: 'practice', rate: drillState().speed, onDone: finish });
  return () => controller?.destroy?.();
}
