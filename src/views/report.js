// Score report for a practice test attempt.

import { html, mount, $, $$, fmtDateTime, toast } from '../core/ui.js';
import { getAttempt, updateAttempt } from '../core/store.js';
import { aiMode, evaluate } from '../core/ai.js';
import { CEFR, IELTS_FOR_TOTAL, fmtBand, total120 } from '../core/scoring.js';
import { TASKS, SECTIONS } from '../tasks/index.js';
import { TESTS } from '../../content/index.js';
import { scoreTest, resolve, productiveBlocks, SECTION_ORDER } from '../core/testmodel.js';
import { bindInterviewReview } from '../tasks/speaking.js';
import { sessionAudio } from './session-audio.js';

const PRACTICE_FOR = {
  reading: ['reading_ctw', 'reading_academic'],
  listening: ['listening_response', 'listening_academic'],
  writing: ['writing_discussion', 'writing_email'],
  speaking: ['speaking_interview', 'speaking_repeat'],
};

function bandCard(section, s) {
  const b = s.band;
  const detail = s.total != null
    ? `${s.correct}/${s.total} correct · ${s.route === 'hard' ? 'upper' : 'lower'} module 2`
    : section === 'writing'
      ? `Sentences ${s.sentence?.correct ?? 0}/${s.sentence?.total ?? 10} · Email ${s.email ?? '—'}/5 · Discussion ${s.discussion ?? '—'}/5`
      : `Average ${s.avg ?? '—'}/5 over ${s.items} responses`;
  return html`
    <div class="band-card sec-${section}">
      <p class="band-sec">${SECTIONS[section].name}</p>
      <p class="band-num">${fmtBand(b)}</p>
      <p class="band-cefr">${CEFR[b] || ''}</p>
      <div class="meter"><span style="width:${b ? ((b - 1) / 5) * 100 : 0}%"></span></div>
      <p class="small muted">${detail}</p>
    </div>`;
}

export default async function report(outlet, { id }) {
  const attempt = getAttempt(id);
  const test = attempt && TESTS.find((t) => t.id === attempt.detail?.testId);
  if (!attempt || !test) {
    mount(outlet, html`<section class="page"><h1>Report not found</h1><p><a href="#/tests">Practice tests</a></p></section>`);
    return;
  }
  const detail = attempt.detail;
  const audio = sessionAudio.get(id) || {};
  const ai = await aiMode();

  function save() {
    const r = scoreTest(test, detail);
    updateAttempt(id, { detail, score: { band: r.overall ?? r.bands[detail.sections[0]], sections: r.bands } });
    return r;
  }

  function draw() {
    const result = scoreTest(test, detail);
    const full = detail.sections.length === 4;
    const headline = full ? result.overall : result.bands[detail.sections[0]];
    const weakest = Object.entries(result.bands).sort((a, b) => a[1] - b[1])[0]?.[0];
    const minutes = detail.finishedAt ? Math.round((detail.finishedAt - detail.startedAt) / 60000) : null;

    mount(outlet, html`
      <section class="page report">
        <nav class="crumbs"><a href="#/tests">Tests</a> <span>/</span> Report</nav>
        <header class="report-hero">
          <div class="hero-band">
            <p class="eyebrow">${full ? 'Overall practice estimate' : `${SECTIONS[detail.sections[0]].name} estimate`}</p>
            <p class="hero-num">${fmtBand(headline)}</p>
            <p class="hero-cefr">CEFR ${CEFR[headline] || '—'}${full ? html` · ≈ ${total120(headline)} on the 0–120 scale · IELTS ≈ ${IELTS_FOR_TOTAL[headline] || '—'}` : ''}</p>
          </div>
          <div>
            <h1>${attempt.title}</h1>
            <p class="muted">${fmtDateTime(attempt.ts)}${minutes ? ` · ${minutes} min` : ''}</p>
            <p class="small">Reading and Listening are estimated from the share of correct answers and the module-2 route. Writing and Speaking come from rubric scores${ai.mode === 'off' ? ' (local estimates — add an AI key in Settings for rubric-level scoring)' : ''}. Only ETS issues official scores.</p>
            ${ai.mode !== 'off' && hasUnscored() ? html`<button class="btn btn-primary js-ai-all" type="button">Score Writing & Speaking with AI</button>` : ''}
          </div>
        </header>

        <div class="band-grid">${SECTION_ORDER.filter((s) => result.sections[s]).map((s) => bandCard(s, result.sections[s]))}</div>

        ${weakest ? html`
          <aside class="next-steps">
            <h2>What to practice next</h2>
            <p>Your lowest section is <strong>${SECTIONS[weakest].name}</strong>. Start with:</p>
            <div class="row gap-s wrap">${PRACTICE_FOR[weakest].map((t) => html`<a class="btn btn-ghost" href="#/practice/${t}">${TASKS[t].name}</a>`)}</div>
          </aside>` : ''}

        ${detail.sections.map((sec) => html`
          <details class="report-section" ${sec === 'writing' || sec === 'speaking' ? 'open' : ''}>
            <summary><h2>${SECTIONS[sec].name} review</h2></summary>
            <div class="report-body" data-sec="${sec}"></div>
          </details>`)}
      </section>`);

    detail.sections.forEach((sec) => {
      const el = $(`.report-body[data-sec="${sec}"]`, outlet);
      if (sec === 'reading' || sec === 'listening') drawObjective(el, sec);
      else drawProductive(el, sec);
    });
    $('.js-ai-all', outlet)?.addEventListener('click', scoreAllWithAi);
  }

  function hasUnscored() {
    const rubricTasks = ['writing_email', 'writing_discussion', 'speaking_interview'];
    return ['writing', 'speaking'].some((sec) => detail.sections.includes(sec)
      && productiveBlocks(test, sec).some(({ task, ref }) => rubricTasks.includes(task) && detail.assess[ref]?.method !== 'ai'));
  }

  function drawObjective(el, sec) {
    const refs = Object.keys(detail.responses).filter((r) => r.startsWith(`${sec}.`));
    let q = 0;
    mount(el, refs.map((ref) => {
      const { task, item } = resolve(test, ref);
      const engine = TASKS[task].engine;
      const g = engine.grade(item, detail.responses[ref]);
      const start = q;
      q += g.total;
      const module = ref.split('.')[1];
      return html`
        <section class="review-block">
          <p class="eyebrow">${module === 'm1' ? 'Module 1' : 'Module 2'} · ${TASKS[task].name} · ${g.correct}/${g.total}</p>
          ${engine.review(item, detail.responses[ref], g, { startIndex: start })}
        </section>`;
    }));
  }

  function drawProductive(el, sec) {
    mount(el, productiveBlocks(test, sec).map(({ task, ref }) => html`<section class="review-block" data-ref="${ref}"><p class="eyebrow">${TASKS[task].name}</p><div class="js-rb"></div></section>`));
    productiveBlocks(test, sec).forEach(({ task, item, ref }) => {
      const box = $(`[data-ref="${ref}"] .js-rb`, el);
      const engine = TASKS[task].engine;
      const response = detail.responses[ref];
      if (task === 'writing_sentence') {
        const g = engine.grade(item, response);
        mount(box, html`<p class="lead">${g.correct}/${g.total} correct</p>${engine.review(item, response)}`);
      } else if (task === 'writing_email' || task === 'writing_discussion') {
        mount(box, html`${engine.review(item, response || '', detail.assess[ref])}
          ${ai.mode !== 'off' && detail.assess[ref]?.method !== 'ai' ? html`<button class="btn btn-primary js-ai" data-ref="${ref}" type="button">Get AI rater feedback</button>` : ''}`);
        $('.js-ai', box)?.addEventListener('click', (e) => scoreWriting(ref, e.currentTarget));
      } else if (task === 'speaking_repeat') {
        const withAudio = (response || []).map((r, i) => r && { ...r, url: audio[ref]?.[i] || null });
        mount(box, engine.review(item, withAudio));
      } else if (task === 'speaking_interview') {
        const withAudio = (response || []).map((r, i) => ({ ...(r || { transcript: '' }), url: audio[ref]?.[i] || null }));
        const result = detail.assess[ref];
        mount(box, engine.review(item, withAudio, result));
        bindInterviewReview(box, item, withAudio, result, (r) => {
          detail.responses[ref] = withAudio.map(({ url, ...rest }) => rest);
          detail.assess[ref] = { ...r, items: r.items.map((x) => ({ ...x })) };
          const res = save();
          updateHero(res);
        });
      }
    });
  }

  function updateHero() {
    // Re-render keeps everything consistent after a score changes.
    const open = $$('.report-section', outlet).map((d) => d.open);
    draw();
    $$('.report-section', outlet).forEach((d, i) => { d.open = open[i]; });
  }

  async function scoreWriting(ref, btn) {
    const { task, item } = resolve(test, ref);
    if (btn) { btn.disabled = true; btn.textContent = 'Scoring…'; }
    try {
      const text = detail.responses[ref] || '';
      const local = detail.assess[ref];
      const r = await evaluate({ task, item, response: text, metrics: { words: text.split(/\s+/).filter(Boolean).length } });
      detail.assess[ref] = { ...r, notes: local?.notes || [] };
      save();
      return true;
    } catch (err) {
      toast(err.message, 'error');
      if (btn) { btn.disabled = false; btn.textContent = 'Get AI rater feedback'; }
      return false;
    } finally {
      if (btn) updateHero();
    }
  }

  async function scoreAllWithAi(e) {
    const btn = e.currentTarget;
    btn.disabled = true;
    btn.textContent = 'Scoring…';
    for (const sec of ['writing', 'speaking']) {
      if (!detail.sections.includes(sec)) continue;
      for (const { task, item, ref } of productiveBlocks(test, sec)) {
        if (task === 'writing_email' || task === 'writing_discussion') {
          if (detail.assess[ref]?.method !== 'ai') await scoreWriting(ref);
        } else if (task === 'speaking_interview') {
          const res = detail.assess[ref];
          for (let i = 0; i < item.questions.length; i++) {
            const cur = res.items[i];
            if (cur.method === 'ai') continue;
            try {
              const r = await evaluate({ task, item: { topic: item.topic, question: item.questions[i] }, response: detail.responses[ref]?.[i]?.transcript || '', metrics: cur.metrics });
              res.items[i] = { ...r, metrics: cur.metrics, notes: cur.notes };
            } catch (err) { toast(err.message, 'error'); break; }
          }
          res.overall = Math.round((res.items.reduce((a, x) => a + x.overall, 0) / res.items.length) * 10) / 10;
          res.method = 'ai';
          save();
        }
      }
    }
    updateHero();
  }

  draw();
}
