import { html, mount, fmtDateTime } from '../core/ui.js';
import { attempts, plan as getPlan, settings, cards as cardStates, customCards, courseState, officialState } from '../core/store.js';
import { fmtBand, CEFR, roundHalf, attemptBand } from '../core/scoring.js';
import { itemDone, planItemHref, todayIso, daysBetween } from '../core/planner.js';
import { SECTIONS, TASKS } from '../tasks/index.js';
import { RUBRICS } from '../data/rubrics.js';
import { TESTS } from '../../content/index.js';
import { VOCAB } from '../../content/vocab.js';
import { LESSONS, lessonById, exercises, COURSE } from '../../content/course/index.js';
import { OFFICIAL_TESTS } from '../data/official.js';
import { estimateSections } from './estimates.js';

const SECS = ['reading', 'listening', 'writing', 'speaking'];

function flashcardsDue() {
  const states = cardStates();
  const now = Date.now();
  let due = 0, started = false;
  for (const c of [...VOCAB, ...customCards()]) {
    const st = states[c.id];
    if (st) { started = true; if (st.due <= now) due++; }
  }
  return { due, started };
}

// Without a study plan, Today falls back to the next useful steps.
function nextSteps(weak) {
  const out = [];
  const open = (l) => !courseState().lessons[l.id]?.done;
  // Start with the weakest diagnostic module, not simply the next lesson in order.
  const lesson = (weak || []).map((w) => LESSONS.find((l) => l.module === w.tag && open(l))).find(Boolean) || LESSONS.find(open);
  if (lesson) out.push({ label: `Course: ${lesson.title}`, meta: 'Writing course · about 25 min', href: `#/course/${lesson.id}` });
  const fc = flashcardsDue();
  out.push(fc.due > 0
    ? { label: `${fc.due} flashcard${fc.due === 1 ? '' : 's'} due`, meta: 'Flashcards · 10 min', href: '#/flashcards' }
    : { label: fc.started ? 'Review flashcards' : 'Start TOEFL vocabulary flashcards', meta: 'Flashcards · 10 min', href: '#/flashcards' });
  const ets = OFFICIAL_TESTS.find((t) => !officialState()[t.id]?.r1?.key) || OFFICIAL_TESTS[0];
  out.push({ label: `${ets.name} · Reading`, meta: 'Official ETS test · 30 min', href: `#/official/${ets.id}` });
  return out;
}

// Weakest course modules from the writing diagnostic: a diagnostic item still in
// the review queue counts as missed.
function weakSpots() {
  const diag = lessonById('diag');
  const cs = courseState();
  if (!diag || !cs.lessons.diag) return null;
  const by = {};
  exercises(diag).forEach((ex) => {
    const r = (by[ex.tag] ||= { ok: 0, n: 0 });
    r.n++;
    if (!cs.wrong[ex.id]) r.ok++;
  });
  return Object.entries(by)
    .map(([tag, r]) => ({ tag, name: COURSE.find((m) => m.id === tag)?.title || tag, ...r }))
    .sort((a, b) => a.ok / a.n - b.ok / b.n)
    .slice(0, 3);
}

function greeting() {
  const h = new Date().getHours();
  return h < 5 ? 'Good night' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

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
      <a class="feature" href="#/flashcards"><h3>Flashcards</h3><p>Spaced-repetition practice for academic vocabulary that shows up across all four sections.</p></a>
      <a class="feature" href="#/drill"><h3>Listening Drill</h3><p>Hear a sentence once, repeat it out loud — the Listen and Repeat mechanic with far more sentences and a speed you control.</p></a>
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

  const fmtDay = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const weak = weakSpots();
  const lessonsDone = LESSONS.filter((l) => courseState().lessons[l.id]?.done).length;
  const steps = today && !today.rest
    ? today.items.map((it, i) => ({ label: it.label, meta: it.minutes ? `${it.minutes} min` : '', href: planItemHref(it), done: itemDone(p, today, i) }))
    : nextSteps(weak);

  mount(outlet, html`
    <section class="page dash">
      <header class="dash-top">
        <div>
          <p class="eyebrow eyebrow-accent">TOEFL iBT · 2026 format</p>
          <h1>${greeting()}</h1>
          <p class="muted small">${overall ? `Estimated overall ${fmtBand(overall)} · CEFR ${CEFR[overall]} · target ${Number(target).toFixed(1)}` : 'Your overall estimate appears once all four sections have a score.'}</p>
        </div>
        <a class="countdown" href="#/plan">
          ${left != null ? html`<strong>${Math.max(0, left)}</strong><span>day${left === 1 ? '' : 's'} to your test<br><em>${fmtDay(testDate)}</em></span>`
            : html`<strong>?</strong><span>Set your test date<br><em>to start the countdown</em></span>`}
        </a>
      </header>

      <div class="score-cards">
        ${SECS.map((s) => {
          const b = est[s].band;
          return html`
            <a class="score-card" href="#/practice">
              <p class="muted small"><span class="sec-dot sec-${s}"></span>${SECTIONS[s].name}</p>
              <p class="score-num">${fmtBand(b)}<span> / 6</span></p>
              <div class="score-bar"><span class="${b != null && b < 3 ? 'low' : ''}" style="width:${b ? (b / 6) * 100 : 0}%"></span></div>
              <p class="small muted">${b == null ? 'No data yet' : b >= target ? 'At or above target' : `${(target - b).toFixed(1)} below target`}</p>
            </a>`;
        })}
      </div>

      <div class="dash-pair">
        <section class="card">
          <div class="row between"><h2>${today && !today.rest ? 'Today’s plan' : 'Next steps'}</h2><a class="small" href="#/plan">${p ? 'Full plan' : 'Create a study plan'}</a></div>
          ${today?.rest ? html`<p>Rest day. A short Listen and Repeat set keeps your ear warm if you want it.</p>` : html`
            <ol class="steps">${steps.map((it, i) => html`
              <li class="${it.done ? 'done' : ''}">
                <span class="step-n">${it.done ? '✓' : i + 1}</span>
                <span class="step-text"><strong>${it.label}</strong><span class="muted small">${it.meta}</span></span>
                ${it.href ? html`<a class="btn btn-primary btn-sm" href="${it.href}">${it.done ? 'Again' : 'Start'}</a>` : ''}
              </li>`)}</ol>`}
        </section>
        <section class="card">
          <h2>Weak spots</h2>
          ${weak ? html`
            <p class="muted small">From your writing diagnostic</p>
            <ul class="weak-list">${weak.map((w) => html`<li><a href="#/course">${w.name}</a><b>${w.ok} / ${w.n}</b></li>`)}</ul>`
            : html`<p class="muted small">Take the 40-question writing diagnostic to see which grammar topics cost you points.</p>
              <a class="btn btn-ghost" href="#/course/diag">Start the diagnostic</a>`}
          <div class="course-progress">
            <p class="small muted">Writing course · ${lessonsDone} of ${LESSONS.length} lessons</p>
            <div class="score-bar"><span style="width:${(lessonsDone / LESSONS.length) * 100}%"></span></div>
          </div>
        </section>
      </div>

      <div class="dash-grid one">
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
