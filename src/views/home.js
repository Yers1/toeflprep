import { html, mount, fmtDateTime } from '../core/ui.js';
import { attempts, plan as getPlan, settings } from '../core/store.js';
import { fmtBand, CEFR, roundHalf, attemptBand } from '../core/scoring.js';
import { itemDone, planItemHref, todayIso, daysBetween } from '../core/planner.js';
import { SECTIONS, TASKS } from '../tasks/index.js';
import { RUBRICS } from '../data/rubrics.js';
import { TESTS } from '../../content/index.js';
import { estimateSections } from './estimates.js';

const SECS = ['reading', 'listening', 'writing', 'speaking'];

function criteriaInsights() {
  const out = [];
  for (const task of ['writing_email', 'writing_discussion', 'speaking_interview']) {
    const list = attempts({ kind: 'task', task }).slice(0, 10);
    const sums = {}, counts = {};
    list.forEach((a) => {
      const sets = task === 'speaking_interview' ? (a.detail?.items || []).map((x) => x.criteria) : [a.detail?.result?.criteria];
      sets.filter(Boolean).forEach((c) => Object.entries(c).forEach(([k, v]) => {
        if (v == null) return;
        sums[k] = (sums[k] || 0) + v;
        counts[k] = (counts[k] || 0) + 1;
      }));
    });
    const avgs = Object.keys(sums).map((k) => ({ id: k, avg: sums[k] / counts[k] }));
    if (!avgs.length) continue;
    avgs.sort((a, b) => a.avg - b.avg);
    const weakest = avgs[0];
    const crit = RUBRICS[task].criteria.find((c) => c.id === weakest.id);
    out.push({ task, attempts: list.length, avgs, weakest: { ...weakest, name: crit?.name || weakest.id, desc: crit?.desc || '' } });
  }
  return out;
}

function welcome() {
  return html`
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">New TOEFL iBT · since January 21, 2026</p>
        <h1>Prepare for the test you will actually take.</h1>
        <p class="lead">Adaptive mock tests, all 12 new task types, and Writing and Speaking feedback organized by the official ETS scoring criteria.</p>
        <div class="row gap-s wrap">
          <a class="btn btn-primary btn-lg" href="#/test/${TESTS[0]?.id}">Take the diagnostic test</a>
          <a class="btn btn-ghost btn-lg" href="#/plan">Build my study plan</a>
        </div>
      </div>
      <div class="hero-card" aria-label="Test at a glance">
        <p class="eyebrow">The test at a glance</p>
        <ul class="glance">
          ${SECS.map((s) => html`<li><span class="sec-dot sec-${s}"></span><strong>${SECTIONS[s].name}</strong><span>${SECTIONS[s].minutes} min</span><span class="muted">${SECTIONS[s].blurb}</span></li>`)}
        </ul>
        <p class="small muted">Scores: 1–6 per section in half bands; overall = average of the four. Aligned with CEFR A1–C2.</p>
      </div>
    </section>
    <section class="feature-grid">
      <a class="feature" href="#/practice/writing_email"><h3>Write an Email</h3><p>7-minute timer, three required points, feedback on elaboration, tone, variety and accuracy.</p></a>
      <a class="feature" href="#/practice/writing_discussion"><h3>Academic Discussion</h3><p>Professor + two classmates. Get a rubric score, corrections and a level-5 rewrite.</p></a>
      <a class="feature" href="#/practice/speaking_interview"><h3>Take an Interview</h3><p>Four questions, 45 seconds each. Measures pace, pauses and development; plays back your recording.</p></a>
      <a class="feature" href="#/practice/speaking_repeat"><h3>Listen and Repeat</h3><p>Seven sentences per scene, word-by-word comparison mapped to the official 0–5 levels.</p></a>
    </section>`;
}

export default function home(outlet) {
  const all = attempts();
  const p = getPlan();
  const st = settings();
  if (!all.length && !p) {
    mount(outlet, html`<section class="page">${welcome()}</section>`);
    return;
  }

  const est = estimateSections();
  const known = SECS.filter((s) => est[s].band != null);
  const overall = known.length === 4 ? roundHalf(known.reduce((a, s) => a + est[s].band, 0) / 4) : null;
  const target = p?.input?.target || st.targetBand || 5;
  const testDate = p?.input?.testDate || st.testDate;
  const left = testDate ? daysBetween(todayIso(), testDate) : null;
  const today = p?.days?.find((d) => d.date === todayIso());
  const insights = criteriaInsights();
  const recent = all.slice(0, 6);

  mount(outlet, html`
    <section class="page dash">
      <header class="dash-head">
        <div class="dash-overall">
          <p class="eyebrow">Estimated overall</p>
          <p class="big-band">${fmtBand(overall)}</p>
          <p class="muted small">${overall ? `CEFR ${CEFR[overall]} · target ${Number(target).toFixed(1)}` : 'Practice all four sections or take a test to see an overall estimate.'}</p>
        </div>
        <div class="dash-meta">
          ${left != null ? html`<div><strong>${Math.max(0, left)}</strong><span>days to test</span></div>` : html`<div><a href="#/plan">Set test date</a></div>`}
          <div><strong>${all.filter((a) => a.kind === 'task').length}</strong><span>practice sets</span></div>
          <div><strong>${all.filter((a) => a.kind === 'test').length}</strong><span>tests</span></div>
        </div>
      </header>

      <div class="section-cards">
        ${SECS.map((s) => {
          const b = est[s].band;
          const pctToTarget = b ? Math.min(100, ((b - 1) / Math.max(0.5, target - 1)) * 100) : 0;
          return html`
            <a class="sec-card" href="#/practice">
              <div class="row between"><span><span class="sec-dot sec-${s}"></span>${SECTIONS[s].name}</span><strong>${fmtBand(b)}</strong></div>
              <div class="meter"><span style="width:${pctToTarget}%"></span><i style="left:${((target - 1) / 5) * 100}%" title="Target"></i></div>
              <p class="small muted">${b == null ? 'No data yet' : b >= target ? 'At or above target' : `${(target - b).toFixed(1)} below target`}</p>
            </a>`;
        })}
      </div>

      <div class="dash-grid">
        <section class="card">
          <div class="row between"><h2>Today</h2><a class="small" href="#/plan">Full plan</a></div>
          ${today ? (today.rest ? html`<p>Rest day. A short Listen and Repeat set keeps your ear warm if you want it.</p>` : html`
            <ul class="today-list">${today.items.map((it, i) => {
              const done = itemDone(p, today, i);
              const href = planItemHref(it);
              return html`<li class="${done ? 'done' : ''}"><span class="tick-static">${done ? '✓' : ''}</span>
                ${href ? html`<a href="${href}">${it.label}</a>` : html`<span>${it.label}</span>`}<span class="muted small">${it.minutes ? `${it.minutes} min` : ''}</span></li>`;
            })}</ul>`) : html`
            <p class="muted">No plan for today.</p>
            <a class="btn btn-primary" href="#/plan">${p ? 'Rebuild plan' : 'Create a study plan'}</a>`}
        </section>

        <section class="card">
          <h2>Writing & Speaking focus</h2>
          ${insights.length ? html`<ul class="insights">${insights.map((x) => html`
            <li>
              <p><strong>${TASKS[x.task].name}</strong> <span class="muted small">last ${x.attempts} attempt${x.attempts === 1 ? '' : 's'}</span></p>
              <div class="mini-crit">${x.avgs.map((c) => html`<span class="${c.id === x.weakest.id ? 'weak' : ''}" title="${c.id}">${RUBRICS[x.task].criteria.find((k) => k.id === c.id)?.name || c.id} <b>${c.avg.toFixed(1)}</b></span>`)}</div>
              <p class="small">Weakest: <strong>${x.weakest.name}</strong> — ${x.weakest.desc}</p>
              <a class="small" href="#/criteria?task=${x.task}">How raters judge this</a>
            </li>`)}</ul>`
            : html`<p class="muted">After your first email, discussion post or interview, this panel shows which rubric criterion is holding your score back.</p>
              <div class="row gap-s wrap"><a class="btn btn-ghost" href="#/practice/writing_email">Write an email</a><a class="btn btn-ghost" href="#/practice/speaking_interview">Do an interview</a></div>`}
        </section>
      </div>

      <section class="card">
        <div class="row between"><h2>Recent activity</h2><a class="small" href="#/history">All history</a></div>
        <table class="table">
          <tbody>${recent.map((a) => {
            const b = attemptBand(a);
            const scoreText = a.score?.total ? `${a.score.correct}/${a.score.total}` : a.score?.rubric != null ? `${a.score.rubric}/5` : '';
            return html`<tr>
              <td class="muted small">${fmtDateTime(a.ts)}</td>
              <td>${a.kind === 'test' ? html`<a href="#/report/${a.id}">${a.title}</a>` : html`<a href="#/practice/${a.task}?set=${encodeURIComponent(a.setId || '')}">${TASKS[a.task]?.name || a.task}</a>`}</td>
              <td class="muted small">${a.kind === 'task' ? a.title : ''}</td>
              <td>${scoreText}</td>
              <td><strong>${b != null ? fmtBand(b) : ''}</strong></td>
            </tr>`;
          })}</tbody>
        </table>
      </section>
    </section>`);
}
