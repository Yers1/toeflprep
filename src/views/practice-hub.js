import { html, mount } from '../core/ui.js';
import { attempts } from '../core/store.js';
import { SECTIONS, TASKS, tasksIn } from '../tasks/index.js';
import { BANK } from '../../content/index.js';
import { fmtBand, attemptBand } from '../core/scoring.js';

function taskStats(task) {
  const list = attempts({ kind: 'task', task });
  const bands = list.slice(0, 5).map(attemptBand).filter((b) => b != null);
  return {
    count: list.length,
    band: bands.length ? bands.reduce((a, b) => a + b, 0) / bands.length : null,
  };
}

export default function practiceHub(outlet) {
  const order = ['writing', 'speaking', 'reading', 'listening'];
  mount(outlet, html`
    <section class="page">
      <header class="page-head">
        <p class="eyebrow">Practice by task</p>
        <h1>All 12 task types of the 2026 test</h1>
        <p class="lead">Writing and Speaking come first: they are scored by rubric, and each attempt is broken down by the official criteria.</p>
      </header>
      ${order.map((sec) => html`
        <section class="section-block" aria-labelledby="sec-${sec}">
          <div class="section-title">
            <h2 id="sec-${sec}">${SECTIONS[sec].name}</h2>
            <span class="muted small">${SECTIONS[sec].minutes} min · ${SECTIONS[sec].items} items · ${SECTIONS[sec].blurb}</span>
          </div>
          <div class="card-grid">
            ${tasksIn(sec).map((id) => {
              const t = TASKS[id];
              const s = taskStats(id);
              const sets = (BANK[id] || []).length;
              return html`
                <a class="task-card ${t.priority ? 'is-priority' : ''}" href="#/practice/${id}">
                  <div class="task-card-top">
                    <span class="sec-dot sec-${sec}" aria-hidden="true"></span>
                    ${t.priority ? html`<span class="tag">Rubric-scored</span>` : html`<span class="tag tag-quiet">Auto-scored</span>`}
                  </div>
                  <h3>${t.name}</h3>
                  <p class="small muted">${t.spec}</p>
                  <p class="small">${t.skill}</p>
                  <div class="task-card-foot">
                    <span>${sets} set${sets === 1 ? '' : 's'}</span>
                    <span>${s.count ? `${s.count} attempt${s.count === 1 ? '' : 's'}${s.band != null ? ` · ~${fmtBand(Math.round(s.band * 2) / 2)}` : ''}` : 'Not started'}</span>
                  </div>
                </a>`;
            })}
          </div>
        </section>`)}
    </section>`);
}
