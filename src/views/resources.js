import { html, mount } from '../core/ui.js';
import { RESOURCE_GROUPS } from '../data/resources.js';
import { TESTS, BANK } from '../../content/index.js';

export default function resources(outlet) {
  const bankSets = Object.values(BANK).reduce((a, list) => a + list.length, 0);
  mount(outlet, html`
    <section class="page">
      <header class="page-head">
        <p class="eyebrow">Every practice test we could find</p>
        <h1>Resources</h1>
        <p class="lead">Use this platform for daily task practice and feedback, and take official full tests at key points. Recommended sequence: a diagnostic here, the free ETS tests at the midpoint, a paid official mock 1–2 weeks before the exam.</p>
      </header>

      <section class="card built-in">
        <h2>Built into this platform</h2>
        <p>${TESTS.length} full practice tests (adaptive Reading and Listening, Writing, Speaking) and ${bankSets} practice sets across all 12 task types — original content in the 2026 format.</p>
        <div class="row gap-s wrap"><a class="btn btn-primary" href="#/tests">Practice tests</a><a class="btn btn-ghost" href="#/practice">Task practice</a></div>
        <p class="small muted">Scores from tests you take elsewhere can be logged on the <a href="#/tests">Tests</a> page.</p>
      </section>

      ${RESOURCE_GROUPS.map((g) => html`
        <section class="section-block">
          <div class="section-title"><h2>${g.title}</h2><span class="muted small">${g.note}</span></div>
          <div class="res-list">
            ${g.items.map((r) => html`
              <a class="res" href="${r.url}" target="_blank" rel="noopener">
                <div class="res-top">
                  <h3>${r.name}</h3>
                  <span class="res-tags">
                    ${r.free ? html`<span class="tag">Free</span>` : html`<span class="tag tag-quiet">Paid</span>`}
                    ${r.full ? html`<span class="tag tag-quiet">Full test</span>` : ''}
                    ${r.format2026 === false ? html`<span class="tag tag-warn">Old format</span>` : r.format2026 ? html`<span class="tag tag-quiet">2026 format</span>` : ''}
                  </span>
                </div>
                <p class="small">${r.what}</p>
                <p class="res-url">${new URL(r.url).hostname.replace(/^www\./, '')} ↗</p>
              </a>`)}
          </div>
        </section>`)}
      <p class="small muted">Questions from ETS and other publishers are copyrighted, so they are linked rather than copied here.</p>
    </section>`);
}
