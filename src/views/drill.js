// Listening Drill: a daily recall-speed trainer, not one of the 12 official
// task types. Play a sentence once, type back everything you remember, see
// a word-by-word diff. Reuses the Listen and Repeat sentence bank and its
// word-alignment scorer — no new content, just a lower-pressure, typed
// (no microphone) way to drill listening recall and playback speed.

import { html, mount, $, pct } from '../core/ui.js';
import { drillState, setDrillSpeed, drillTouch, drillAddResult } from '../core/store.js';
import { speak, stopSpeaking, support, wait } from '../core/audio.js';
import { align, normalize } from '../analyzers/speaking.js';
import { transcriptDiff } from '../tasks/common.js';
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
        <p class="muted">Hear a sentence once, then type back everything you remember. Raising the speed over time trains the same skill the Listening and Listen and Repeat sections need: catching words the first time.</p>
      </header>

      <div class="card">
        <h2>Playback speed</h2>
        <label class="field"><span>Speed: <output class="js-speed-out">${st.speed.toFixed(2)}x</output></span>
          <input type="range" class="js-speed" min="0.7" max="1.4" step="0.05" value="${st.speed}"></label>
        <p class="small muted">Start near 1x. Once you're recalling most words correctly, nudge it up 0.05 at a time.</p>
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

function buildQueue(sceneId) {
  if (sceneId) {
    const sc = SCENES.find((s) => s.id === sceneId);
    if (!sc) return null;
    return { title: `${sc.icon || ''} ${sc.scene}`.trim(), items: POOL.filter((p) => p.sceneId === sceneId) };
  }
  const lastUsed = drillState().lastUsed;
  const items = [...POOL].sort((a, b) => (lastUsed[a.id] || 0) - (lastUsed[b.id] || 0)).slice(0, MIX_SIZE);
  return { title: 'Mixed drill', items };
}

function showSession(outlet, sceneId) {
  const queue = buildQueue(sceneId);
  if (!queue) return showHome(outlet);
  const { title, items } = queue;
  const speed = drillState().speed;
  let i = 0;
  const session = { correct: 0, total: 0 };

  function renderListening() {
    const it = items[i];
    mount(outlet, html`
      <section class="page narrow drill-session">
        <div class="row between small muted"><span>${title}</span><span>${i + 1} / ${items.length}</span></div>
        <div class="card drill-card">
          <p class="small muted">Listen, then type back everything you remember.</p>
          <button type="button" class="btn btn-primary js-play">▶ Play sentence</button>
          <form class="js-recall-form" autocomplete="off">
            <label class="field"><span>What did you hear?</span>
              <input type="text" class="js-recall" autocomplete="off" spellcheck="false"></label>
            <button class="btn btn-ghost" type="submit">Check</button>
          </form>
        </div>
      </section>`);
    const playBtn = $('.js-play', outlet);
    const input = $('.js-recall', outlet);
    async function play() {
      playBtn.disabled = true;
      if (support.tts) { try { await speak(it.text, { rate: speed }); } catch { /* ignore */ } }
      else { input.placeholder = it.text; await wait(Math.max(1200, it.text.split(' ').length * 450)); input.placeholder = ''; }
      playBtn.disabled = false;
    }
    playBtn.addEventListener('click', play);
    play();
    input.focus();
    $('.js-recall-form', outlet).addEventListener('submit', (e) => { e.preventDefault(); grade(input.value); });
  }

  function grade(said) {
    const it = items[i];
    const target = normalize(it.text);
    const ops = align(target, normalize(said));
    const correct = ops.filter((o) => o.op === 'ok').length;
    const total = target.length;
    session.correct += correct;
    session.total += total;
    drillAddResult(todayIso(), { correct, total });
    drillTouch([it.id]);

    mount(outlet, html`
      <section class="page narrow drill-session">
        <div class="row between small muted"><span>${title}</span><span>${i + 1} / ${items.length}</span></div>
        <div class="card drill-card">
          <div class="row gap-s center-y"><strong>${correct}/${total} words</strong></div>
          ${transcriptDiff(ops)}
          <p class="legend small"><span class="d-del">missed</span> <span class="d-sub">changed</span> <span class="d-ins">extra</span></p>
          <button class="btn btn-primary js-next" type="button">${i + 1 < items.length ? 'Next sentence' : 'See results'}</button>
        </div>
      </section>`);
    $('.js-next', outlet).addEventListener('click', () => { i++; if (i < items.length) renderListening(); else renderEnd(); });
  }

  function renderEnd() {
    mount(outlet, html`
      <section class="page narrow">
        <header class="page-head"><p class="eyebrow">Listening Drill</p><h1>Session done</h1></header>
        <p>${session.correct}/${session.total} words recalled this round (${pct(session.correct, session.total)}%).</p>
        <div class="row gap-s wrap">
          <a class="btn btn-primary" href="#/drill?${sceneId ? `scene=${sceneId}` : 'mode=mix'}">Practice again</a>
          <a class="btn btn-ghost" href="#/drill">Back to Listening Drill</a>
        </div>
      </section>`);
  }

  renderListening();
  return () => stopSpeaking();
}
