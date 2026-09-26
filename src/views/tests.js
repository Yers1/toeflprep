import { html, mount, $, on, fmtDate, toast } from '../core/ui.js';
import { attempts, externalTests, addExternalTest, deleteExternalTest } from '../core/store.js';
import { SECTIONS } from '../tasks/index.js';
import { TESTS } from '../../content/index.js';
import { fmtBand, CEFR, roundHalf, BANDS } from '../core/scoring.js';

const SECS = ['reading', 'listening', 'writing', 'speaking'];

export default function tests(outlet) {
  function draw() {
    const done = attempts({ kind: 'test' });
    const ext = externalTests();
    mount(outlet, html`
      <section class="page">
        <header class="page-head">
          <p class="eyebrow">Exam simulation</p>
          <h1>Practice tests</h1>
          <p class="lead">Full tests follow the January 2026 format: Reading and Listening in two adaptive modules, timed Writing and Speaking, and a report on the 1–6 scale. All questions are original.</p>
        </header>

        <div class="test-grid">
          ${TESTS.map((t) => {
            const mine = done.filter((a) => a.setId === t.id);
            const best = mine.filter((a) => a.section === 'all').map((a) => a.score?.band).filter((b) => b != null);
            return html`
              <article class="test-card">
                <div class="test-card-head">
                  <h2>${t.title}</h2>
                  ${best.length ? html`<span class="chip chip-good">Best ${fmtBand(Math.max(...best))}</span>` : html`<span class="chip">New</span>`}
                </div>
                <p class="muted">${t.description}</p>
                <ul class="test-sections">${SECS.map((s) => html`<li><span class="sec-dot sec-${s}"></span>${SECTIONS[s].name} <span class="muted small">${SECTIONS[s].minutes} min</span>
                  <a class="small" href="#/test/${t.id}?section=${s}">section only</a></li>`)}</ul>
                <div class="row gap-s wrap">
                  <a class="btn btn-primary" href="#/test/${t.id}">Start full test (~90 min)</a>
                  ${mine[0] ? html`<a class="btn btn-ghost" href="#/report/${mine[0].id}">Last report</a>` : ''}
                </div>
              </article>`;
          })}
        </div>

        ${done.length ? html`
          <section class="section-block">
            <h2>Your test attempts</h2>
            <table class="table">
              <thead><tr><th>Date</th><th>Test</th>${SECS.map((s) => html`<th>${SECTIONS[s].name.slice(0, 1)}</th>`)}<th>Band</th><th></th></tr></thead>
              <tbody>${done.map((a) => html`<tr>
                <td>${fmtDate(a.ts)}</td><td>${a.title}</td>
                ${SECS.map((s) => html`<td>${fmtBand(a.score?.sections?.[s])}</td>`)}
                <td><strong>${fmtBand(a.score?.band)}</strong></td>
                <td><a href="#/report/${a.id}">Report</a></td></tr>`)}</tbody>
            </table>
          </section>` : ''}

        <section class="section-block">
          <h2>Tests taken elsewhere</h2>
          <p class="muted">Log a score from the free ETS test, TestReady, Magoosh or any other source so the dashboard tracks it alongside your practice here. See <a href="#/resources">Resources</a> for the full list of practice tests.</p>
          <form class="ext-form" autocomplete="off">
            <label class="field"><span>Source</span><input type="text" name="source" required placeholder="e.g. ETS free practice test" maxlength="80"></label>
            <label class="field"><span>Date</span><input name="date" type="date" required></label>
            ${SECS.map((s) => html`<label class="field field-s"><span>${SECTIONS[s].name}</span>
              <select name="${s}"><option value="">—</option>${BANDS.map((b) => html`<option value="${b}">${b.toFixed(1)}</option>`)}</select></label>`)}
            <button class="btn btn-primary" type="submit">Add</button>
          </form>
          ${ext.length ? html`
            <table class="table">
              <thead><tr><th>Date</th><th>Source</th>${SECS.map((s) => html`<th>${SECTIONS[s].name.slice(0, 1)}</th>`)}<th>Overall</th><th></th></tr></thead>
              <tbody>${ext.map((x) => html`<tr>
                <td>${x.date}</td><td>${x.source}</td>
                ${SECS.map((s) => html`<td>${fmtBand(x.bands?.[s])}</td>`)}
                <td><strong>${fmtBand(x.overall)}</strong> ${x.overall ? html`<span class="muted small">${CEFR[x.overall]}</span>` : ''}</td>
                <td><button class="link-btn js-del" data-id="${x.id}" type="button">Remove</button></td></tr>`)}</tbody>
            </table>` : ''}
        </section>
      </section>`);

    $('.ext-form', outlet).addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const bands = {};
      SECS.forEach((s) => { if (f.get(s)) bands[s] = Number(f.get(s)); });
      const vals = Object.values(bands);
      addExternalTest({
        source: String(f.get('source')).trim(),
        date: f.get('date'),
        bands,
        overall: vals.length === 4 ? roundHalf(vals.reduce((a, b) => a + b, 0) / 4) : null,
      });
      toast('Test added');
      draw();
    });
  }

  on(outlet, 'click', '.js-del', (e, btn) => { deleteExternalTest(btn.dataset.id); draw(); });
  draw();
}
