// Exam-mode runner: adaptive Reading and Listening modules, timed Writing and
// Speaking tasks, then a score report.

import { html, mount, $, confirmDialog } from '../core/ui.js';
import { addAttempt } from '../core/store.js';
import { getMic, micErrorMessage, support, stopSpeaking } from '../core/audio.js';
import { Countdown, timerPill } from '../core/timer.js';
import { TASKS, SECTIONS } from '../tasks/index.js';
import { TESTS } from '../../content/index.js';
import {
  SECTION_ORDER, MODULE_TIME, ROUTE_THRESHOLD, moduleBlocks, productiveBlocks,
  questionCount, gradeObjective, scoreTest,
} from '../core/testmodel.js';
import { sessionAudio } from './session-audio.js';

const DIRECTIONS = {
  reading: 'In this section you will read texts from academic and daily-life contexts and answer questions. The section has two modules. The second module is chosen based on your performance in the first.',
  listening: 'In this section you will hear conversations, announcements and short talks, and choose the best response to spoken sentences. Each recording plays once. The clock only runs while you answer.',
  writing: 'In this section you will complete three tasks: Build a Sentence (10 items), Write an Email (7 minutes) and Write for an Academic Discussion (10 minutes).',
  speaking: 'In this section you will complete two tasks: Listen and Repeat (7 sentences) and Take an Interview (4 questions). There is no preparation time. Speak after the beep.',
  writing_sentence: 'Put the words in the correct order to complete the response. You have 5 minutes 50 seconds for 10 items.',
  writing_email: 'Read the situation and write an email. You have 7 minutes. Address all three points.',
  writing_discussion: 'Read the professor’s question and your classmates’ posts, then write your contribution. You have 10 minutes.',
  speaking_repeat: 'You will hear 7 sentences. Repeat each sentence exactly as you heard it after the beep.',
  speaking_interview: 'An interviewer will ask you 4 questions. You have 45 seconds to answer each. There is no preparation time.',
};

export default function testRunner(outlet, { id }, query) {
  const test = TESTS.find((t) => t.id === id);
  if (!test) {
    mount(outlet, html`<section class="page"><h1>Test not found</h1><p><a href="#/tests">All tests</a></p></section>`);
    return;
  }
  const sections = query.section && SECTION_ORDER.includes(query.section) ? [query.section] : SECTION_ORDER;
  const detail = { testId: test.id, sections, responses: {}, routes: {}, assess: {}, startedAt: Date.now() };
  const audio = {};
  let controller = null;
  let moduleTimer = null;
  let aborted = false;

  mount(outlet, html`
    <section class="exam">
      <header class="exam-bar">
        <div class="exam-title"><strong>${test.title}</strong><span class="js-where muted"></span></div>
        <div class="exam-tools">
          <span class="js-count muted small"></span>
          <span class="timer-pill js-timer" hidden></span>
          <button class="btn btn-ghost btn-sm js-exit" type="button">Exit</button>
        </div>
      </header>
      <div class="exam-stage"></div>
      <footer class="exam-foot" hidden>
        <span class="muted small js-hint"></span>
        <button class="btn btn-primary js-next" type="button">Next</button>
      </footer>
    </section>`);

  const stage = $('.exam-stage', outlet);
  const foot = $('.exam-foot', outlet);
  const nextBtn = $('.js-next', outlet);
  const timerEl = $('.js-timer', outlet);
  const where = $('.js-where', outlet);
  const countEl = $('.js-count', outlet);
  const hint = $('.js-hint', outlet);

  $('.js-exit', outlet).addEventListener('click', async () => {
    if (await confirmDialog('Exit the test? Your answers in this attempt will not be saved.', { okLabel: 'Exit test', danger: true })) {
      teardown();
      location.hash = '#/tests';
    }
  });

  function teardown() {
    aborted = true;
    controller?.destroy?.();
    moduleTimer?.stop();
    stopSpeaking();
  }

  function screen(template, { button = 'Continue', hideTimer = true } = {}) {
    return new Promise((resolve) => {
      if (hideTimer) timerEl.hidden = true;
      countEl.textContent = '';
      foot.hidden = true;
      mount(stage, html`<div class="exam-card">${template}<div class="row end"><button class="btn btn-primary js-go" type="button">${button}</button></div></div>`);
      $('.js-go', stage).addEventListener('click', resolve, { once: true });
      $('.js-go', stage).focus();
    });
  }

  // ------------------------------------------------------------ intro ---
  async function intro() {
    const minutes = sections.reduce((s, sec) => s + SECTIONS[sec].minutes, 0);
    const needsMic = sections.includes('speaking');
    await screen(html`
      <p class="eyebrow">${sections.length === 4 ? 'Full practice test' : `${SECTIONS[sections[0]].name} section test`}</p>
      <h1>${test.title}</h1>
      <p class="lead">${test.description || ''}</p>
      <ul class="exam-sections">
        ${sections.map((s) => html`<li><strong>${SECTIONS[s].name}</strong><span>${SECTIONS[s].minutes} min · ${SECTIONS[s].blurb}</span></li>`)}
      </ul>
      <div class="checklist">
        <p class="strong">Before you start (about ${minutes} minutes)</p>
        <ul>
          <li>Use headphones and a quiet room.</li>
          ${needsMic ? html`<li>Allow microphone access — Speaking starts automatically after each beep.</li>` : ''}
          <li>Once you move to the next question you cannot go back, as on the real test.</li>
          ${!support.tts ? html`<li class="error">This browser cannot play synthesized audio; Listening will show transcripts instead.</li>` : ''}
          ${needsMic && !support.asr ? html`<li class="warn">Automatic transcription needs Chrome or Edge. You can type what you said on the report page.</li>` : ''}
        </ul>
      </div>
      ${needsMic ? html`<p class="js-mic small muted"></p>` : ''}`, { button: 'Begin test' });
    if (needsMic) {
      try { await getMic(); } catch (err) {
        await screen(html`<h2>Microphone unavailable</h2><p class="error">${micErrorMessage(err)}</p><p>You can continue; Speaking responses will be empty.</p>`);
      }
    }
  }

  // ---------------------------------------------------------- modules ---
  function runModule(section, key, moduleNo) {
    return new Promise((resolve) => {
      const blocks = moduleBlocks(test, section, key);
      const totalQ = blocks.reduce((s, b) => s + questionCount(b.task, b.item), 0);
      let i = 0;
      let qStart = 0;
      let ended = false;
      where.textContent = ` · ${SECTIONS[section].name} · Module ${moduleNo}`;
      foot.hidden = false;
      timerEl.hidden = false;
      hint.textContent = section === 'listening' ? 'The clock pauses while audio plays.' : '';

      const end = () => {
        if (ended) return;
        ended = true;
        moduleTimer.stop();
        if (i < blocks.length) {
          detail.responses[blocks[i].ref] = controller?.collect?.() ?? null;
          for (let k = i + 1; k < blocks.length; k++) detail.responses[blocks[k].ref] = null;
        }
        controller?.destroy?.();
        controller = null;
        resolve(blocks.map((b) => b.ref));
      };

      moduleTimer = new Countdown(MODULE_TIME[section][key], {
        onTick: (left, total) => timerPill(timerEl, left, total),
        onEnd: end,
      }).start();

      const show = () => {
        if (aborted) return;
        const b = blocks[i];
        const n = questionCount(b.task, b.item);
        countEl.textContent = `Questions ${qStart + 1}${n > 1 ? `–${qStart + n}` : ''} of ${totalQ}`;
        nextBtn.disabled = false;
        nextBtn.textContent = i + 1 < blocks.length ? 'Next' : 'Finish module';
        mount(stage, html`<div class="exam-block"><p class="eyebrow">${TASKS[b.task].name}</p><div class="js-block"></div></div>`);
        controller = TASKS[b.task].engine.render($('.js-block', stage), b.item, {
          mode: 'test',
          seed: `${detail.startedAt}:${b.ref}`,
          startIndex: qStart,
          setCanAdvance: (ok) => {
            nextBtn.disabled = !ok;
            if (section === 'listening') { if (ok) moduleTimer.start(); else moduleTimer.pause(); }
          },
        });
      };

      nextBtn.onclick = () => {
        if (ended) return;
        const b = blocks[i];
        detail.responses[b.ref] = controller?.collect?.() ?? null;
        controller?.destroy?.();
        qStart += questionCount(b.task, b.item);
        i++;
        if (i >= blocks.length) end();
        else show();
      };
      show();
    });
  }

  async function runAdaptive(section) {
    await screen(html`<p class="eyebrow">Section</p><h2>${SECTIONS[section].name}</h2><p>${DIRECTIONS[section]}</p>`, { button: 'Start module 1' });
    const refs1 = await runModule(section, 'm1', 1);
    if (aborted) return;
    const g = gradeObjective(test, refs1, detail.responses);
    const route = g.total && g.correct / g.total >= ROUTE_THRESHOLD ? 'hard' : 'easy';
    detail.routes[section] = route;
    await screen(html`<p class="eyebrow">${SECTIONS[section].name}</p><h2>Module 2</h2><p>Module 1 is complete. The next module has been selected for you.</p>`, { button: 'Start module 2' });
    await runModule(section, route, 2);
  }

  // ------------------------------------------------------ productive ----
  function runProductive(block) {
    return new Promise((resolve) => {
      const task = TASKS[block.task];
      where.textContent = ` · ${SECTIONS[task.section].name} · ${task.name}`;
      countEl.textContent = '';
      timerEl.hidden = true;
      const speaking = task.section === 'speaking';
      foot.hidden = speaking || block.task === 'writing_sentence';
      hint.textContent = speaking ? '' : 'You can submit early. The task ends automatically when time runs out.';
      nextBtn.disabled = false;
      nextBtn.textContent = 'Submit and continue';
      let done = false;
      const finish = (response) => {
        if (done) return;
        done = true;
        controller?.destroy?.();
        controller = null;
        detail.responses[block.ref] = response;
        resolve();
      };
      mount(stage, html`<div class="exam-block js-block"></div>`);
      controller = task.engine.render($('.js-block', stage), block.item, {
        mode: 'test',
        seed: `${detail.startedAt}:${block.ref}`,
        onDone: finish,
      });
      nextBtn.onclick = async () => {
        if (await confirmDialog('Submit this task now? You cannot return to it.', { okLabel: 'Submit' })) finish(controller?.collect?.());
      };
    });
  }

  async function runLinear(section) {
    await screen(html`<p class="eyebrow">Section</p><h2>${SECTIONS[section].name}</h2><p>${DIRECTIONS[section]}</p>`, { button: 'Continue' });
    for (const block of productiveBlocks(test, section)) {
      if (aborted) return;
      await screen(html`<p class="eyebrow">${SECTIONS[section].name}</p><h2>${TASKS[block.task].name}</h2><p>${DIRECTIONS[block.task]}</p>`, { button: 'Start task' });
      await runProductive(block);
    }
  }

  // ---------------------------------------------------------- scoring ---
  function assessAll() {
    for (const section of ['writing', 'speaking']) {
      if (!sections.includes(section)) continue;
      productiveBlocks(test, section).forEach(({ task, item, ref }) => {
        if (task === 'writing_sentence') return;
        const response = detail.responses[ref];
        if (section === 'speaking') {
          audio[ref] = (response || []).map((r) => r?.url || null);
          detail.responses[ref] = (response || []).map((r) => r && { transcript: r.transcript || '', timing: r.timing, confidence: r.confidence, duration: r.duration, asr: r.asr });
        }
        const a = TASKS[task].engine.assess(item, detail.responses[ref] || (section === 'writing' ? '' : []));
        detail.assess[ref] = task === 'speaking_repeat'
          ? { overall: a.overall, items: a.items.map((r) => ({ score: r.score })), method: 'local' }
          : task === 'speaking_interview'
            ? { overall: a.overall, items: a.items.map((r) => ({ overall: r.overall, criteria: r.criteria, metrics: r.metrics, notes: r.notes, method: 'local' })), method: 'local' }
            : { overall: a.overall, criteria: a.criteria, notes: a.notes, method: 'local' };
      });
    }
  }

  async function run() {
    await intro();
    for (const section of sections) {
      if (aborted) return;
      if (section === 'reading' || section === 'listening') await runAdaptive(section);
      else await runLinear(section);
    }
    if (aborted) return;
    timerEl.hidden = true;
    foot.hidden = true;
    where.textContent = '';
    mount(stage, html`<div class="exam-card"><h2>Scoring your test…</h2></div>`);
    assessAll();
    detail.finishedAt = Date.now();
    const result = scoreTest(test, detail);
    const attempt = addAttempt({
      kind: 'test',
      task: null,
      section: sections.length === 4 ? 'all' : sections[0],
      setId: test.id,
      title: sections.length === 4 ? test.title : `${test.title} — ${SECTIONS[sections[0]].name}`,
      score: { band: result.overall ?? result.bands[sections[0]], sections: result.bands },
      detail,
    });
    sessionAudio.set(attempt.id, audio);
    location.hash = `#/report/${attempt.id}`;
  }

  run();
  return teardown;
}

