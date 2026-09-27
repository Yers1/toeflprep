// Listening Drill: a daily recall-speed trainer, not one of the 12 official
// task types. Same mechanic as Listen and Repeat — hear a sentence once
// (at an adjustable speed), then repeat it out loud — reusing that task's
// own recording/scoring engine (src/tasks/speaking.js: repeat), just wired
// to a bigger, rotating pool of sentences and a daily words-recalled log
// instead of one fixed 7-sentence scene.

import { html, mount, $, pct } from '../core/ui.js';
import { drillState, setDrillSpeed, drillTouch, drillAddResult } from '../core/store.js';
import { repeat } from '../tasks/speaking.js';
import { isoDate, todayIso } from '../core/planner.js';
import { BANK } from '../../content/index.js';

const SCENES = BANK.speaking_repeat;
const POOL = SCENES.flatMap((sc) => sc.sentences.map((text, i) => ({ id: `${sc.id}-${i}`, text, sceneId: sc.id })));
const MIX_SIZE = 12;

function sceneStats(sceneId) {
  const lastUsed = drillState().lastUsed;
  const items = POOL.filter((p) => p.sceneId === sceneId);
  return { total: items.length, done: items.filter((p) => lastUsed[p.id]).length };
}

function last14Days() {
  const log = drillState().log;
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const iso = isoDate(new Date(Date.now() - i * 86_400_000));
    days.push({ iso, ...(log[iso] || { correct: 0, total: 0, sentences: 0 }) });
  }
  return days;
}

function fmtDay(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function drillView(outlet, params, query) {
  if (query.mode === 'mix' || query.scene) return showSession(outlet, query.scene || null);
  return showHome(outlet);
}

function showHome(outlet) {
  const st = drillState();
  const today = st.log[todayIso()];
  const days = last14Days().filter((d) => d.total > 0 || d.iso === todayIso());

  mount(outlet, html`
    <section class="page narrow">
      <header class="page-head">
        <p class="eyebrow">Daily practice</p>
        <h1>Listening Drill</h1>
        <p class="muted">Same as Listen and Repeat — hear a sentence once, then repeat it out loud — but with far more sentences and a speed you control. Raise it over time to train catching words the first time.</p>
      </header>

      <div class="card">
        <h2>Playback speed</h2>
        <label class="field"><span>Speed: <output class="js-speed-out">${st.speed.toFixed(2)}x</output></span>
          <input type="range" class="js-speed" min="0.7" max="1.4" step="0.05" value="${st.speed}"></label>
        <p class="small muted">Start near 1x. Once you're repeating most sentences accurately, nudge it up 0.05 at a time.</p>
      </div>

      <div class="card">
        <h2>Today</h2>
        ${today
          ? html`<p>${today.sentences} sentence${today.sentences === 1 ? '' : 's'} · <strong>${today.correct}/${today.total}</strong> words recalled (${pct(today.correct, today.total)}%)</p>`
          : html`<p class="muted">Nothing practiced yet today.</p>`}
        <a class="btn btn-primary btn-lg" href="#/drill?mode=mix">Start a mixed drill (${MIX_SIZE} sentences)</a>
      </div>

      <div class="section-block">
        <div class="section-title"><h2>Practice by section</h2></div>
        <div class="deck-grid">
          ${SCENES.map((sc) => {
            const s = sceneStats(sc.id);
            return html`<a class="feature deck-card" href="#/drill?scene=${sc.id}">
              <h3>${sc.icon || ''} ${sc.scene}</h3>
              <p>${sc.intro}</p>
              <p class="deck-counts small"><span>${sc.sentences.length} sentences</span><span>${s.done}/${s.total} practiced</span></p>
            </a>`;
          })}
        </div>
      </div>

      ${days.length ? html`
        <div class="section-block">
          <div class="section-title"><h2>Your progress</h2></div>
          <ul class="drill-log">
            ${days.map((d) => html`<li class="${d.iso === todayIso() ? 'is-today' : ''}">
              <span class="drill-log-date small muted">${fmtDay(d.iso)}</span>
              <span class="meter"><span style="width:${pct(d.correct, d.total)}%"></span></span>
              <span class="drill-log-words small">${d.total ? `${d.correct}/${d.total}` : '—'}</span>
            </li>`)}
          </ul>
        </div>` : ''}
    </section>`);

  const speedInput = $('.js-speed', outlet);
  speedInput.addEventListener('input', () => { $('.js-speed-out', outlet).textContent = `${Number(speedInput.value).toFixed(2)}x`; });
  speedInput.addEventListener('change', () => setDrillSpeed(Number(speedInput.value)));
}

function buildItem(sceneId) {
  if (sceneId) {
    const sc = SCENES.find((s) => s.id === sceneId);
    if (!sc) return null;
    return { ...sc, ids: sc.sentences.map((_, i) => `${sc.id}-${i}`) };
  }
  const lastUsed = drillState().lastUsed;
  const chosen = [...POOL].sort((a, b) => (lastUsed[a.id] || 0) - (lastUsed[b.id] || 0)).slice(0, MIX_SIZE);
  return {
    scene: 'Mixed drill',
    icon: '🎧',
    intro: 'A mix of sentences from every section, starting with the ones you have practiced least recently.',
    sentences: chosen.map((c) => c.text),
    ids: chosen.map((c) => c.id),
  };
}

function showSession(outlet, sceneId) {
  const item = buildItem(sceneId);
  if (!item) return showHome(outlet);
  const speed = drillState().speed;

  function finish(response) {
    const result = repeat.assess(item, response);
    let correct = 0, total = 0;
    result.items.forEach((r) => {
      correct += r.ops.filter((o) => o.op === 'ok').length;
      total += r.ops.filter((o) => o.op !== 'ins').length;
    });
    drillAddResult(todayIso(), { correct, total });
    drillTouch(item.ids);
    mount(outlet, html`
      <section class="page narrow">
        <header class="page-head"><p class="eyebrow">Listening Drill</p><h1>Session done</h1></header>
        <p>Average score: <strong>${result.overall}</strong> / 5 · <strong>${correct}/${total}</strong> words recalled (${pct(correct, total)}%) across ${item.sentences.length} sentence${item.sentences.length === 1 ? '' : 's'}.</p>
        <div class="row gap-s wrap">
          <a class="btn btn-primary" href="#/drill?${sceneId ? `scene=${sceneId}` : 'mode=mix'}">Practice again</a>
          <a class="btn btn-ghost" href="#/drill">Back to Listening Drill</a>
        </div>
      </section>`);
  }

  const controller = repeat.render(outlet, item, { mode: 'practice', rate: speed, onDone: finish });
  return () => controller?.destroy?.();
}
