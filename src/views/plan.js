import { html, mount, $, on, toast, confirmDialog } from '../core/ui.js';
import { plan as getPlan, savePlan, settings, updateSettings } from '../core/store.js';
import { generatePlan, itemDone, planItemHref, todayIso, daysBetween, isoDate } from '../core/planner.js';
import { BANDS } from '../core/scoring.js';
import { SECTIONS, TASKS } from '../tasks/index.js';
import { TESTS } from '../../content/index.js';
import { estimateSections } from './estimates.js';

const SECS = ['reading', 'listening', 'writing', 'speaking'];

function formTemplate(p) {
  const st = settings();
  const est = estimateSections();
  const inp = p?.input || {};
  const defDate = inp.testDate || st.testDate || isoPlus(42);
  return html`
    <form class="plan-form card" autocomplete="off">
      <h2>${p ? 'Rebuild your plan' : 'Create your plan'}</h2>
      <div class="form-grid">
        <label class="field"><span>Test date</span><input type="date" name="testDate" required min="${isoPlus(1)}" value="${defDate}"></label>
        <label class="field"><span>Target overall band</span>
          <select name="target">${BANDS.filter((b) => b >= 3).map((b) => html`<option value="${b}" ${b === (inp.target || st.targetBand) ? 'selected' : ''}>${b.toFixed(1)}</option>`)}</select></label>
        <label class="field"><span>Study hours per week</span><input type="number" name="hours" min="2" max="40" step="1" value="${inp.hoursPerWeek || 7}"></label>
        <label class="field"><span>Rest day</span>
          <select name="rest"><option value="">No rest day</option>${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d, i) => html`<option value="${i}" ${inp.restDay === i || (inp.restDay === undefined && i === 0) ? 'selected' : ''}>${d}</option>`)}</select></label>
      </div>
      <fieldset class="current">
        <legend>Current level by section <span class="muted small">(leave “Unknown” — the plan starts with a diagnostic test)</span></legend>
        <div class="form-grid">
          ${SECS.map((s) => {
            const v = inp.current?.[s] ?? est[s]?.band ?? '';
            return html`<label class="field"><span>${SECTIONS[s].name}${est[s]?.band ? html` <em class="muted small">est. ${est[s].band.toFixed(1)}</em>` : ''}</span>
              <select name="cur-${s}"><option value="">Unknown</option>${BANDS.map((b) => html`<option value="${b}" ${b === v ? 'selected' : ''}>${b.toFixed(1)}</option>`)}</select></label>`;
          })}
        </div>
      </fieldset>
      <div class="row end"><button class="btn btn-primary" type="submit">${p ? 'Rebuild plan' : 'Generate plan'}</button></div>
    </form>`;
}

function isoPlus(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return isoDate(d);
}

function dayCell(p, day, today) {
  const isToday = day.date === today;
  const past = day.date < today;
  const d = new Date(`${day.date}T12:00:00`);
  const label = d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  if (day.rest) return html`<div class="day rest ${isToday ? 'today' : ''}"><p class="day-label">${label}</p><p class="muted small">Rest</p></div>`;
  const doneCount = day.items.filter((_, i) => itemDone(p, day, i)).length;
  const mins = day.items.reduce((s, x) => s + (x.minutes || 0), 0);
  return html`
    <div class="day ${isToday ? 'today' : ''} ${past ? 'past' : ''} ${doneCount === day.items.length && day.items.length ? 'complete' : ''}">
      <p class="day-label">${label}${isToday ? html` <span class="chip chip-good">Today</span>` : ''}</p>
      <ul class="day-items">
        ${day.items.map((it, i) => {
          const done = itemDone(p, day, i);
          const href = planItemHref(it);
          return html`<li class="${done ? 'done' : ''} kind-${it.kind}">
            <button type="button" class="tick js-tick" data-key="${day.date}:${i}" aria-pressed="${done}" aria-label="Mark done">${done ? '✓' : ''}</button>
            ${href ? html`<a href="${href}">${it.label}</a>` : html`<span>${it.label}</span>`}
            ${it.minutes ? html`<span class="muted small">${it.minutes}m</span>` : ''}
          </li>`;
        })}
      </ul>
      <p class="muted small">${mins} min</p>
    </div>`;
}

export default function planView(outlet) {
  function draw() {
    const p = getPlan();
    const today = todayIso();
    if (!p) {
      mount(outlet, html`
        <section class="page">
          <header class="page-head">
            <p class="eyebrow">Study plan</p>
            <h1>A day-by-day plan to your test date</h1>
            <p class="lead">The plan starts with a diagnostic test, gives Writing and Speaking practice every day, puts more time on your weakest sections and ends with a full mock test a week before the exam.</p>
          </header>
          ${formTemplate(null)}
        </section>`);
    } else {
      const left = daysBetween(today, p.input.testDate);
      const weeks = [];
      p.days.forEach((d, i) => { const w = Math.floor(i / 7); (weeks[w] = weeks[w] || []).push(d); });
      const all = p.days.flatMap((d) => d.items.map((_, i) => itemDone(p, d, i)));
      const pastItems = p.days.filter((d) => d.date <= today).flatMap((d) => d.items.map((_, i) => itemDone(p, d, i)));
      const byTask = {};
      p.days.forEach((d) => d.items.forEach((it) => { if (it.task) byTask[TASKS[it.task].section] = (byTask[TASKS[it.task].section] || 0) + it.minutes; }));
      const totalMin = Object.values(byTask).reduce((a, b) => a + b, 0) || 1;
      mount(outlet, html`
        <section class="page">
          <header class="page-head row between wrap">
            <div>
              <p class="eyebrow">Study plan</p>
              <h1>${left > 0 ? `${left} day${left === 1 ? '' : 's'} to your test` : left === 0 ? 'Test day — good luck!' : 'Your test date has passed'}</h1>
              <p class="lead">Target ${Number(p.input.target).toFixed(1)} · ${p.input.hoursPerWeek} h/week (~${p.perDay} min per study day)</p>
            </div>
            <div class="plan-stats">
              <div><strong>${all.filter(Boolean).length}/${all.length}</strong><span>tasks done</span></div>
              <div><strong>${pastItems.length ? Math.round((pastItems.filter(Boolean).length / pastItems.length) * 100) : 0}%</strong><span>on track</span></div>
            </div>
          </header>
          <div class="mix">
            ${SECS.map((s) => html`<span class="mix-seg sec-${s}" style="flex:${byTask[s] || 0}" title="${SECTIONS[s].name}: ${Math.round(((byTask[s] || 0) / totalMin) * 100)}%"></span>`)}
          </div>
          <p class="small muted mix-legend">${SECS.map((s) => html`<span><i class="sec-dot sec-${s}"></i>${SECTIONS[s].name} ${Math.round(((byTask[s] || 0) / totalMin) * 100)}%</span> `)}</p>
          ${p.truncated ? html`<p class="notice">Your test is more than 12 weeks away; this plan covers the first 12 weeks. Rebuild it later for the remaining time.</p>` : ''}
          ${weeks.map((wk, wi) => html`
            <section class="week">
              <h2>Week ${wi + 1} <span class="muted small">${wk[0].phase}</span></h2>
              <div class="week-grid">${wk.map((d) => dayCell(p, d, today))}</div>
            </section>`)}
          <details class="card"><summary>Change plan settings</summary>${formTemplate(p)}</details>
          <p><button class="link-btn js-delete" type="button">Delete plan</button></p>
        </section>`);
    }
    bindForm();
  }

  function bindForm() {
    $('.plan-form', outlet)?.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const current = {};
      let any = false;
      SECS.forEach((s) => { const v = f.get(`cur-${s}`); if (v) { current[s] = Number(v); any = true; } });
      const input = {
        testDate: f.get('testDate'),
        target: Number(f.get('target')),
        hoursPerWeek: Number(f.get('hours')) || 7,
        restDay: f.get('rest') === '' ? null : Number(f.get('rest')),
        current: any ? current : null,
        testId1: any ? null : TESTS[0]?.id,
        testId2: TESTS[TESTS.length - 1]?.id,
      };
      if (daysBetween(todayIso(), input.testDate) < 1) { toast('Choose a date in the future.', 'error'); return; }
      updateSettings({ testDate: input.testDate, targetBand: input.target });
      savePlan(generatePlan(input));
      toast('Plan created');
      draw();
    });
  }

  on(outlet, 'click', '.js-tick', (e, btn) => {
    const p = getPlan();
    p.done = p.done || {};
    const key = btn.dataset.key;
    p.done[key] = !p.done[key];
    savePlan(p);
    draw();
  });
  on(outlet, 'click', '.js-delete', async () => {
    if (await confirmDialog('Delete your study plan?', { okLabel: 'Delete', danger: true })) { savePlan(null); draw(); }
  });
  draw();
}
