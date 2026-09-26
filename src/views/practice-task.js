// Single-task practice: pick a set, work through it, get feedback, save.

import { html, mount, $, uid, toast, wordCount } from '../core/ui.js';
import { addAttempt, updateAttempt, seenCount } from '../core/store.js';
import { aiMode, evaluate } from '../core/ai.js';
import { TASKS } from '../tasks/index.js';
import { bindInterviewReview } from '../tasks/speaking.js';
import { BANK } from '../../content/index.js';
import { RUBRICS } from '../data/rubrics.js';

function pickSet(task, requested) {
  const sets = BANK[task] || [];
  if (requested) {
    const found = sets.find((s) => s.id === requested);
    if (found) return found;
  }
  // Least practiced first, then bank order.
  return [...sets].sort((a, b) => seenCount(task, a.id) - seenCount(task, b.id))[0];
}

function setTitle(task, item) {
  return item.title || item.topic || item.scene || item.course || TASKS[task].name;
}

export default function practiceTask(outlet, { task }, query) {
  const meta = TASKS[task];
  if (!meta) {
    mount(outlet, html`<section class="page"><h1>Unknown task</h1><p><a href="#/practice">All tasks</a></p></section>`);
    return;
  }
  const sets = BANK[task] || [];
  const item = pickSet(task, query.set);
  let controller = null;

  mount(outlet, html`
    <section class="page page-task">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/practice">Practice</a> <span>/</span> ${meta.name}</nav>
      <header class="task-head">
        <div>
          <p class="eyebrow">${meta.section} · ${meta.spec}</p>
          <h1>${meta.name}</h1>
        </div>
        <div class="task-head-tools">
          <label class="select-wrap"><span class="sr-only">Choose a set</span>
            <select class="js-set">
              ${sets.map((s, i) => html`<option value="${s.id}" ${s.id === item?.id ? 'selected' : ''}>${i + 1}. ${setTitle(task, s)}${seenCount(task, s.id) ? ' ✓' : ''}</option>`)}
            </select>
          </label>
          ${RUBRICS[task] ? html`<a class="btn btn-ghost" href="#/criteria?task=${task}">Criteria</a>` : ''}
        </div>
      </header>
      <div class="task-body"></div>
      <div class="task-actions"></div>
      <div class="task-feedback" aria-live="polite"></div>
    </section>`);

  $('.js-set', outlet).addEventListener('change', (e) => {
    location.hash = `#/practice/${task}?set=${encodeURIComponent(e.target.value)}`;
  });

  if (!item) {
    mount($('.task-body', outlet), html`<p class="notice">No practice sets for this task yet.</p>`);
    return;
  }

  const body = $('.task-body', outlet);
  const actions = $('.task-actions', outlet);
  const feedback = $('.task-feedback', outlet);
  const seed = uid();
  const engine = meta.engine;

  function nextSetLink() {
    const idx = sets.findIndex((s) => s.id === item.id);
    const next = sets[(idx + 1) % sets.length];
    return html`<div class="row gap-s wrap">
      <a class="btn btn-primary" href="#/practice/${task}?set=${encodeURIComponent(next.id)}">Next set</a>
      <a class="btn btn-ghost" href="#/practice/${task}?set=${encodeURIComponent(item.id)}&r=${Date.now()}">Try this set again</a>
      <a class="btn btn-ghost" href="#/practice">All tasks</a>
    </div>`;
  }

  // ---------------------------------------------------- objective tasks --
  function finishObjective(response) {
    const g = engine.grade(item, response);
    controller?.destroy?.();
    addAttempt({
      kind: 'task', task, section: meta.section, setId: item.id, title: setTitle(task, item),
      score: { correct: g.correct, total: g.total }, detail: { response },
    });
    actions.innerHTML = '';
    mount(body, html`
      <div class="result-banner ${g.correct / g.total >= 0.8 ? 'good' : g.correct / g.total >= 0.55 ? 'mid' : 'low'}">
        <strong>${g.correct} / ${g.total} correct</strong>
        <span>${Math.round((g.correct / g.total) * 100)}%</span>
      </div>
      ${engine.review(item, response, g)}`);
    mount(feedback, nextSetLink());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ------------------------------------------------------ writing tasks --
  async function finishWriting(text) {
    controller?.destroy?.();
    actions.innerHTML = '';
    const local = engine.assess(item, text);
    const attempt = addAttempt({
      kind: 'task', task, section: 'writing', setId: item.id, title: setTitle(task, item),
      score: { rubric: local.overall }, detail: { response: text, words: wordCount(text), result: slim(local) },
    });
    let result = local;
    const draw = () => {
      mount(body, engine.review(item, text, result));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    draw();
    const mode = await aiMode();
    mount(feedback, html`
      <div class="ai-bar">
        ${mode.mode === 'off'
          ? html`<p class="small">For a full rubric evaluation with corrections and an improved version, <a href="#/settings">add an AI key in Settings</a>.</p>`
          : html`<button class="btn btn-primary js-ai" type="button">Get AI rater feedback</button><span class="muted small">Scores all criteria, lists corrections and writes a level-5 version.</span>`}
      </div>
      ${nextSetLink()}`);
    $('.js-ai', feedback)?.addEventListener('click', async (e) => {
      const btn = e.currentTarget;
      btn.disabled = true;
      btn.textContent = 'Scoring…';
      try {
        const ai = await evaluate({ task, item, response: text, metrics: { words: local.stats.words } });
        result = { ...ai, notes: local.notes };
        updateAttempt(attempt.id, { score: { rubric: ai.overall }, detail: { response: text, words: local.stats.words, result: slim(result) } });
        draw();
        btn.textContent = 'AI feedback added';
      } catch (err) {
        toast(err.message, 'error');
        btn.disabled = false;
        btn.textContent = 'Get AI rater feedback';
      }
    });
  }

  // ----------------------------------------------------- speaking tasks --
  function finishRepeat(response) {
    const result = engine.assess(item, response);
    addAttempt({
      kind: 'task', task, section: 'speaking', setId: item.id, title: setTitle(task, item),
      score: { rubric: result.overall }, detail: { transcripts: response.map((r) => r?.transcript || ''), scores: result.items.map((r) => r.score) },
    });
    mount(body, engine.review(item, response, result));
    mount(feedback, nextSetLink());
  }

  function finishInterview(response) {
    const result = engine.assess(item, response);
    const attempt = addAttempt({
      kind: 'task', task, section: 'speaking', setId: item.id, title: setTitle(task, item),
      score: { rubric: result.overall }, detail: interviewDetail(response, result),
    });
    mount(body, html`
      <div class="result-banner ${result.overall >= 4 ? 'good' : result.overall >= 3 ? 'mid' : 'low'}">
        <strong>Interview average: <span class="js-avg">${result.overall}</span> / 5</strong>
        <span class="small">Recordings stay in this tab only.</span>
      </div>
      ${engine.review(item, response, result)}`);
    bindInterviewReview(body, item, response, result, (r) => {
      $('.js-avg', body).textContent = r.overall;
      updateAttempt(attempt.id, { score: { rubric: r.overall }, detail: interviewDetail(response, r) });
    });
    mount(feedback, nextSetLink());
  }

  const ctx = {
    mode: 'practice',
    seed,
    setCanAdvance: () => {},
    onDone: (response) => {
      if (task === 'writing_sentence') finishObjective(response);
      else if (task === 'writing_email' || task === 'writing_discussion') finishWriting(response);
      else if (task === 'speaking_repeat') finishRepeat(response);
      else if (task === 'speaking_interview') finishInterview(response);
    },
  };

  controller = engine.render(body, item, ctx);

  if (meta.kind === 'objective' && task !== 'writing_sentence') {
    mount(actions, html`<div class="row end"><button class="btn btn-primary js-check" type="button">Check answers</button></div>`);
    $('.js-check', actions).addEventListener('click', () => finishObjective(controller.collect()));
  }

  return () => controller?.destroy?.();
}

function slim(result) {
  return {
    overall: result.overall,
    criteria: result.criteria,
    method: result.method,
    summary: result.summary || '',
    fixes: result.fixes || [],
    corrections: result.corrections || [],
    improved: result.improved || '',
    comments: result.comments || {},
    strengths: result.strengths || [],
    nextLevel: result.nextLevel || '',
    notes: result.notes || [],
  };
}

function interviewDetail(response, result) {
  return {
    transcripts: response.map((r) => r?.transcript || ''),
    items: result.items.map((r) => ({ overall: r.overall, criteria: r.criteria, metrics: r.metrics, method: r.method || 'local' })),
  };
}

