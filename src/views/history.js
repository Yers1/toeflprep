import { html, mount, $, on, fmtDateTime, toast, confirmDialog } from '../core/ui.js';
import { attempts, deleteAttempt, exportData, importData } from '../core/store.js';
import { fmtBand, attemptBand } from '../core/scoring.js';
import { TASKS, SECTIONS } from '../tasks/index.js';

function trendSvg(points) {
  if (points.length < 2) return '';
  const w = 640, h = 140, pad = 24;
  const xs = (i) => pad + (i * (w - pad * 2)) / (points.length - 1);
  const ys = (b) => h - pad - ((b - 1) / 5) * (h - pad * 2);
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${xs(i).toFixed(1)},${ys(p.band).toFixed(1)}`).join(' ');
  return html`
    <svg class="trend" viewBox="0 0 ${w} ${h}" role="img" aria-label="Band trend across tests">
      ${[1, 2, 3, 4, 5, 6].map((b) => html`<line x1="${pad}" x2="${w - pad}" y1="${ys(b)}" y2="${ys(b)}" class="grid"/><text x="4" y="${ys(b) + 4}" class="axis">${b}</text>`)}
      <path d="${d}" class="line"/>
      ${points.map((p, i) => html`<circle cx="${xs(i)}" cy="${ys(p.band)}" r="4" class="dot"><title>${p.label}: ${p.band}</title></circle>`)}
    </svg>`;
}

export default function history(outlet) {
  let filter = 'all';

  function draw() {
    const list = attempts().filter((a) => filter === 'all' || (filter === 'tests' ? a.kind === 'test' : a.section === filter));
    const testPoints = attempts({ kind: 'test' }).filter((a) => a.score?.band != null).reverse().map((a) => ({ band: a.score.band, label: a.title }));
    mount(outlet, html`
      <section class="page">
        <header class="page-head row between wrap">
          <div><p class="eyebrow">Progress</p><h1>History</h1></div>
          <div class="row gap-s wrap">
            <button class="btn btn-ghost js-export" type="button">Export JSON</button>
            <label class="btn btn-ghost">Import JSON<input class="sr-only js-import" type="file" accept="application/json,.json"></label>
          </div>
        </header>
        ${testPoints.length >= 2 ? html`<section class="card"><h2>Test band trend</h2>${trendSvg(testPoints)}</section>` : ''}
        <div class="tabs" role="tablist">
          ${[['all', 'All'], ['tests', 'Tests'], ...Object.entries(SECTIONS).map(([k, v]) => [k, v.name])].map(([k, l]) => html`<button class="tab js-filter" type="button" data-f="${k}" aria-selected="${k === filter}">${l}</button>`)}
        </div>
        ${list.length ? html`
          <div class="table-wrap"><table class="table">
            <thead><tr><th>When</th><th>Task</th><th>Set</th><th>Score</th><th>Band est.</th><th></th></tr></thead>
            <tbody>${list.map((a) => {
              const b = attemptBand(a);
              const score = a.score?.total ? `${a.score.correct}/${a.score.total}` : a.score?.rubric != null ? `${a.score.rubric}/5` : '';
              return html`<tr>
                <td class="small">${fmtDateTime(a.ts)}</td>
                <td>${a.kind === 'test' ? html`<a href="#/report/${a.id}">${a.title}</a>` : TASKS[a.task]?.name || a.task}</td>
                <td class="small muted">${a.kind === 'task' ? html`<a href="#/practice/${a.task}?set=${encodeURIComponent(a.setId || '')}">${a.title}</a>` : ''}</td>
                <td>${score}${a.detail?.result?.method === 'ai' || a.detail?.items?.some?.((x) => x.method === 'ai') ? html` <span class="tag tag-quiet">AI</span>` : ''}</td>
                <td><strong>${b != null ? fmtBand(b) : ''}</strong></td>
                <td><button class="link-btn js-del" type="button" data-id="${a.id}" aria-label="Delete attempt">Delete</button></td>
              </tr>`;
            })}</tbody>
          </table></div>` : html`<p class="muted">Nothing here yet.</p>`}
      </section>`);

    $('.js-import', outlet).addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const n = importData(await file.text());
        toast(`Imported ${n} attempt${n === 1 ? '' : 's'}.`);
        draw();
      } catch (err) {
        toast(err.message || 'Import failed.', 'error');
      }
    });
  }

  on(outlet, 'click', '.js-filter', (e, b) => { filter = b.dataset.f; draw(); });
  on(outlet, 'click', '.js-del', async (e, b) => {
    if (await confirmDialog('Delete this attempt?', { okLabel: 'Delete', danger: true })) { deleteAttempt(b.dataset.id); draw(); }
  });
  on(outlet, 'click', '.js-export', () => {
    const blob = new Blob([exportData()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `toefl-prep-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  draw();
}
