// Shared pieces for task engines: seeded shuffling, multiple-choice questions,
// objective review, rubric result rendering.

import { html, raw, esc, $$ } from '../core/ui.js';
import { RUBRICS } from '../data/rubrics.js';

export function hashSeed(str) {
  let h = 1779033703 ^ String(str).length;
  for (let i = 0; i < String(str).length; i++) {
    h = Math.imul(h ^ String(str).charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

export function rng(seed) {
  let a = typeof seed === 'number' ? seed : hashSeed(seed);
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededOrder(n, seed) {
  const r = rng(seed);
  const idx = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

const LETTERS = 'ABCD';

// questions: [{ q, choices, answer, explanation }]
export function mcqTemplate(questions, name, seed, { startIndex = 0 } = {}) {
  return questions.map((q, qi) => {
    const order = seededOrder(q.choices.length, `${seed}:${qi}`);
    return html`
      <fieldset class="mcq" data-q="${qi}">
        <legend><span class="qnum">${startIndex + qi + 1}</span>${q.q}</legend>
        ${order.map((ci, k) => html`
          <label class="choice">
            <input type="radio" name="${name}-${qi}" value="${ci}">
            <span class="choice-letter">${LETTERS[k]}</span>
            <span class="choice-text">${q.choices[ci]}</span>
          </label>`)}
      </fieldset>`;
  });
}

export function collectMcq(root, questions, name) {
  return questions.map((_, qi) => {
    const checked = root.querySelector(`input[name="${name}-${qi}"]:checked`);
    return checked ? Number(checked.value) : null;
  });
}

export function lockInputs(root) {
  $$('input, textarea, button.tile', root).forEach((el) => { el.disabled = true; });
}

export function gradeMcq(questions, answers) {
  let correct = 0;
  const details = questions.map((q, i) => {
    const ok = answers?.[i] === q.answer;
    if (ok) correct++;
    return { ok, chosen: answers?.[i] ?? null, answer: q.answer };
  });
  return { correct, total: questions.length, details };
}

export function mcqReview(questions, answers, { startIndex = 0 } = {}) {
  return questions.map((q, i) => {
    const chosen = answers?.[i];
    const ok = chosen === q.answer;
    return html`
      <div class="review-q ${ok ? 'is-ok' : 'is-bad'}">
        <p class="review-q-title"><span class="mark" aria-label="${ok ? 'Correct' : 'Incorrect'}">${ok ? '✓' : '✗'}</span>
          <span class="qnum">${startIndex + i + 1}</span>${q.q}</p>
        <ul class="review-choices">
          ${q.choices.map((c, ci) => html`<li class="${ci === q.answer ? 'is-answer' : ''} ${ci === chosen && !ok ? 'is-chosen' : ''}">
            ${c}${ci === q.answer ? raw(' <em>correct answer</em>') : ''}${ci === chosen && !ok ? raw(' <em>your answer</em>') : ''}</li>`)}
        </ul>
        ${chosen == null ? html`<p class="muted small">Not answered.</p>` : ''}
        ${q.explanation ? html`<p class="explain">${q.explanation}</p>` : ''}
      </div>`;
  });
}

export function scoreChip(score, max = 5, label = '') {
  const r = max ? score / max : 0;
  const tone = r >= 0.8 ? 'good' : r >= 0.55 ? 'mid' : 'low';
  return html`<span class="chip chip-${tone}">${label}${Number.isInteger(score) ? score : score.toFixed(1)}/${max}</span>`;
}

// Renders a rubric result (local or AI) for a writing or speaking response.
export function rubricResult(task, result, { title = '' } = {}) {
  const rub = RUBRICS[task];
  if (!result) return '';
  const level = rub.levels[result.overall] || rub.levels[0];
  const isAi = result.method === 'ai';
  return html`
    <section class="rubric-result" aria-label="Score">
      <header class="rr-head">
        <div class="rr-score score-${result.overall >= 4 ? 'good' : result.overall >= 3 ? 'mid' : 'low'}">
          <span class="rr-num">${result.overall}</span><span class="rr-max">/5</span>
        </div>
        <div>
          ${title ? html`<p class="eyebrow">${title}</p>` : ''}
          <p class="rr-level">${level.label}</p>
          <p class="muted small">${result.summary || level.summary}</p>
          <p class="rr-method">${isAi ? `AI rater (${result.provider})` : 'Local estimate — automatic measures only'}</p>
        </div>
      </header>
      <div class="criteria-grid">
        ${rub.criteria.map((c) => {
          const v = result.criteria?.[c.id];
          return html`
            <div class="crit">
              <div class="crit-top"><span>${c.name}</span><strong>${v == null ? 'n/a' : v}</strong></div>
              <div class="meter"><span style="width:${v == null ? 0 : (v / 5) * 100}%"></span></div>
              ${result.comments?.[c.id] ? html`<p class="small">${result.comments[c.id]}</p>` : ''}
            </div>`;
        })}
      </div>
      ${result.nextLevel ? html`<p class="next-level"><strong>To reach ${Math.min(5, result.overall + 1)}:</strong> ${result.nextLevel}</p>` : ''}
      ${result.strengths?.length ? html`<div class="fb-block"><h4>Strengths</h4><ul class="list-good">${result.strengths.map((s) => html`<li>${s}</li>`)}</ul></div>` : ''}
      ${result.fixes?.length ? html`<div class="fb-block"><h4>Highest-impact fixes</h4><ol class="list-fix">${result.fixes.map((f) => html`<li><strong>${f.issue}</strong>${f.how ? html`<br><span class="muted">${f.how}</span>` : ''}</li>`)}</ol></div>` : ''}
      ${result.notes?.length ? html`<div class="fb-block"><h4>Checks</h4><ul class="notes">${result.notes.map((n) => html`<li class="note-${n.tone}"><span class="note-crit">${critName(task, n.criterion)}</span>${n.text}</li>`)}</ul></div>` : ''}
      ${result.corrections?.length ? html`<div class="fb-block"><h4>Corrections</h4><ul class="corrections">${result.corrections.map((c) => html`<li><del>${c.original}</del> → <ins>${c.corrected}</ins>${c.why ? html` <span class="muted small">(${c.why})</span>` : ''}</li>`)}</ul></div>` : ''}
      ${result.improved ? html`<details class="fb-block improved"><summary>Improved version</summary><div class="prose">${raw(esc(result.improved).replace(/\n/g, '<br>'))}</div></details>` : ''}
    </section>`;
}

function critName(task, id) {
  return RUBRICS[task].criteria.find((c) => c.id === id)?.name || id;
}

export function transcriptDiff(ops) {
  return html`<p class="diff">${ops.map((o) => {
    if (o.op === 'ok') return html`<span class="d-ok">${o.t}</span> `;
    if (o.op === 'del') return html`<span class="d-del" title="missing">${o.t}</span> `;
    if (o.op === 'ins') return html`<span class="d-ins" title="extra">${o.s}</span> `;
    return html`<span class="d-sub" title="you said “${o.s}”">${o.t}</span> `;
  })}</p>`;
}
