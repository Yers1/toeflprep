// Scoring criteria: rubric levels, checklists, annotated samples, the 1–6 scale.

import { html, mount, $, $$, on } from '../core/ui.js';
import { RUBRICS, OFFICIAL_PDFS } from '../data/rubrics.js';
import { SAMPLES } from '../data/samples.js';
import { BANDS, CEFR, CONCORDANCE, TOTAL_120, IELTS_FOR_TOTAL, CEFR_DESCRIPTORS } from '../core/scoring.js';

const TABS = [
  ['writing_email', 'Write an Email'],
  ['writing_discussion', 'Academic Discussion'],
  ['speaking_repeat', 'Listen and Repeat'],
  ['speaking_interview', 'Take an Interview'],
  ['scale', 'Score scale'],
  ['method', 'How this app scores'],
];

function rubricTab(task) {
  const r = RUBRICS[task];
  const samples = SAMPLES[task];
  return html`
    <article class="rubric">
      <p class="lead">${r.focus}</p>
      <h2>What raters look at</h2>
      <div class="crit-cards">${r.criteria.map((c) => html`<div class="crit-card"><h3>${c.name}</h3><p>${c.desc}</p></div>`)}</div>

      <h2>Score levels</h2>
      <div class="levels">
        ${[5, 4, 3, 2, 1, 0].map((n) => {
          const l = r.levels[n];
          return html`
            <div class="level-row lv-${n}">
              <div class="level-num">${n}</div>
              <div>
                <p class="level-label">${l.label}</p>
                <p>${l.summary}</p>
                ${l.points.length ? html`<ul>${l.points.map((p) => html`<li>${p}</li>`)}</ul>` : ''}
              </div>
            </div>`;
        })}
      </div>
      <p class="small muted">Summarized from the ETS ${r.section === 'writing' ? 'Writing' : 'Speaking'} Scoring Guide (2025). Read the original: <a href="${r.pdf}" target="_blank" rel="noopener">official PDF</a>.</p>

      <div class="two-col">
        <section class="card"><h2>Checklist for a 5</h2><ul class="checklist-list">${r.checklist.map((c) => html`<li>${c}</li>`)}</ul></section>
        <section class="card"><h2>Score killers</h2><ul class="killers">${r.killers.map((c) => html`<li>${c}</li>`)}</ul></section>
      </div>

      ${samples ? html`
        <h2>Annotated samples</h2>
        <div class="sample-prompt card">
          ${samples.prompt.scenario ? html`<p>${samples.prompt.scenario}</p><ul>${samples.prompt.goals.map((g) => html`<li>${g}</li>`)}</ul>` : ''}
          ${samples.prompt.professor ? html`<p><strong>Professor:</strong> ${samples.prompt.professor}</p>${samples.prompt.students.map((s) => html`<p><strong>${s.name}:</strong> ${s.text}</p>`)}` : ''}
          ${samples.prompt.question ? html`<p><strong>Interviewer:</strong> ${samples.prompt.question}</p>` : ''}
        </div>
        ${samples.responses.map((s) => html`
          <details class="sample" ${s.score === 5 ? 'open' : ''}>
            <summary><span class="chip chip-${s.score >= 5 ? 'good' : s.score >= 4 ? 'mid' : 'low'}">Score ${s.score}</span> ${r.levels[s.score].label}</summary>
            <div class="sample-body">
              <div class="prose sample-text">${s.text.split('\n').map((p) => html`<p>${p}</p>`)}</div>
              <dl class="sample-notes">${Object.entries(s.notes).map(([k, v]) => html`<dt>${r.criteria.find((c) => c.id === k)?.name || k}</dt><dd>${v}</dd>`)}</dl>
            </div>
          </details>`)}` : ''}

      <p class="row gap-s wrap"><a class="btn btn-primary" href="#/practice/${task}">Practice ${r.task}</a></p>
    </article>`;
}

function scaleTab() {
  return html`
    <article>
      <p class="lead">Since January 21, 2026 every section is reported on a 1–6 scale in half bands. The overall score is the average of the four sections, rounded to the nearest half band (for example, an average of 5.25 becomes 5.5). For two years, score reports also show a comparable 0–120 score.</p>
      <div class="table-wrap">
        <table class="table scale-table">
          <thead><tr><th>Band</th><th>CEFR</th><th>Reading</th><th>Listening</th><th>Speaking</th><th>Writing</th><th>Total 0–120</th><th>IELTS ≈</th></tr></thead>
          <tbody>${BANDS.map((b) => html`<tr>
            <td><strong>${b.toFixed(1)}</strong></td><td>${CEFR[b]}</td>
            ${['reading', 'listening', 'speaking', 'writing'].map((s) => html`<td>${CONCORDANCE[s][b][0] === CONCORDANCE[s][b][1] ? CONCORDANCE[s][b][0] : `${CONCORDANCE[s][b][0]}–${CONCORDANCE[s][b][1]}`}</td>`)}
            <td>${TOTAL_120[b][0]}+</td><td>${IELTS_FOR_TOTAL[b]}</td></tr>`)}</tbody>
        </table>
      </div>
      <p class="small muted">Section columns show the matching range on the previous 0–30 section scale. Source: <a href="https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html" target="_blank" rel="noopener">ETS score scale</a>, <a href="https://www.ets.org/toefl/institutions/ibt/score-scale-update.html" target="_blank" rel="noopener">ETS CEFR and IELTS comparison</a>.</p>
      <h2>What the levels mean</h2>
      <dl class="cefr-list">${Object.entries(CEFR_DESCRIPTORS).map(([k, v]) => html`<dt>${k}</dt><dd>${v}</dd>`)}</dl>
      <h2>Typical requirements</h2>
      <ul>
        <li>Highly selective universities: usually 5.0–5.5 overall (≈ 100–110 on the old scale), often with minimums per section.</li>
        <li>Most universities: 4.0–4.5 overall (≈ 80–90).</li>
        <li>Always check each program’s published requirement — some now list 1–6 minimums per section.</li>
      </ul>
    </article>`;
}

function methodTab() {
  return html`
    <article class="prose-block">
      <p class="lead">This app gives practice estimates. It cannot reproduce ETS scoring, which uses adaptive item statistics and a trained AI engine checked by certified raters. Here is exactly how each number is produced.</p>
      <h2>Reading and Listening</h2>
      <p>Tests have two modules. If you answer at least 60% of module 1 correctly, you get the harder module 2; otherwise the easier one. The share of correct answers across both modules is placed on the old 0–30 scale (the easier route is capped at 21) and converted to a band with the ETS concordance table.</p>
      <h2>Writing</h2>
      <p>Build a Sentence is right or wrong per item. Email and Academic Discussion get a 0–5 rubric score. The section estimate weights them 30% / 30% / 40% and converts the 0–5 average to a band (band ≈ 1 + average).</p>
      <p><strong>Local estimate (no key needed):</strong> checks the required points, length, greeting and closing, register, sentence variety, repeated words, copying from the prompt and basic mechanics. It cannot judge grammar fully, so its accuracy criterion never exceeds 4.</p>
      <p><strong>AI rater (with a key or server):</strong> receives the rubric summary, the prompt and your response, and returns a score per criterion, corrections and a level-5 rewrite.</p>
      <h2>Speaking</h2>
      <p><strong>Listen and Repeat:</strong> your speech is transcribed by the browser and aligned word by word with the sentence. Missing or changed function words, endings and content words map onto the official 0–5 descriptions. Recognition mistakes can lower the score — listen to your recording and edit if needed.</p>
      <p><strong>Take an Interview:</strong> the app measures your speaking time, words per minute, pauses (from the microphone signal), start delay, fillers and connectors. Pronunciation is not measured directly; the recognizer’s confidence is used as a rough proxy for intelligibility and labeled as such.</p>
      <p>The Speaking estimate is the average of all 11 item scores converted to a band.</p>
      <h2>Privacy</h2>
      <p>Everything is stored in this browser. Recordings stay in memory and disappear when you close the tab. Only the text you send for AI feedback leaves your device.</p>
    </article>`;
}

export default function criteria(outlet, _p, query) {
  const initial = TABS.some(([k]) => k === query.task) ? query.task : 'writing_email';
  mount(outlet, html`
    <section class="page">
      <header class="page-head">
        <p class="eyebrow">Official criteria, explained</p>
        <h1>How Writing and Speaking are scored</h1>
        <p class="lead">ETS scores each email, discussion post and spoken response from 0 to 5 using published scoring guides. Knowing exactly what separates a 4 from a 5 is the fastest way to raise your band.</p>
        <p class="small"><a href="${OFFICIAL_PDFS.writing}" target="_blank" rel="noopener">ETS Writing Scoring Guide (PDF)</a> · <a href="${OFFICIAL_PDFS.speaking}" target="_blank" rel="noopener">ETS Speaking Scoring Guide (PDF)</a></p>
      </header>
      <div class="tabs" role="tablist">
        ${TABS.map(([k, label]) => html`<button role="tab" type="button" class="tab" data-tab="${k}" aria-selected="${k === initial}">${label}</button>`)}
      </div>
      <div class="tab-panel" role="tabpanel"></div>
    </section>`);

  const panel = $('.tab-panel', outlet);
  const show = (k) => {
    $$('.tab', outlet).forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === k)));
    mount(panel, k === 'scale' ? scaleTab() : k === 'method' ? methodTab() : rubricTab(k));
  };
  on(outlet, 'click', '.tab', (e, t) => show(t.dataset.tab));
  show(initial);
}
