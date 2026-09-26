// Speaking tasks: Listen and Repeat (7 sentences) and Take an Interview
// (4 questions × 45 s). Both run hands-free once started, like the real test.

import { html, mount, $, esc } from '../core/ui.js';
import { speak, stopSpeaking, support, beep, Capture, getMic, micErrorMessage, wait } from '../core/audio.js';
import { Countdown } from '../core/timer.js';
import { scoreRepeat, repeatWindow, scoreInterview } from '../analyzers/speaking.js';
import { transcriptDiff, rubricResult, scoreChip } from './common.js';

export const INTERVIEW_SECONDS = 45;

function supportNotice() {
  const notes = [];
  if (!support.mic || !support.recorder) notes.push('This browser cannot record audio. Use a recent Chrome, Edge, Safari or Firefox.');
  if (!support.asr) notes.push('Automatic transcription needs Chrome or Edge. Here you can still record, listen back and type what you said for scoring.');
  if (!support.tts) notes.push('Speech playback is unavailable; prompts will be shown as text.');
  return notes.length ? html`<div class="notice">${notes.map((n) => html`<p>${n}</p>`)}</div>` : '';
}

function levelMeter() {
  return html`<div class="level" aria-hidden="true"><span></span></div>`;
}

function setLevel(root, rms) {
  const bar = $('.level span', root);
  if (bar) bar.style.transform = `scaleX(${Math.min(1, rms * 9)})`;
}

function ring(seconds) {
  return html`
    <div class="ring" style="--total:${seconds}s" aria-hidden="true">
      <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19"/><circle class="ring-progress" cx="22" cy="22" r="19"/></svg>
      <span class="ring-label">${seconds}</span>
    </div>`;
}

async function runResponseWindow(stage, seconds, { signal, onLive, allowStop }) {
  const cap = new Capture({
    onLevel: (v) => setLevel(stage, v),
    onTranscript: (t) => onLive?.(t),
  });
  await cap.start();
  beep(880, 150);
  const label = $('.ring-label', stage);
  const ringEl = $('.ring', stage);
  ringEl?.classList.add('is-running');
  await new Promise((resolve) => {
    const t = new Countdown(seconds, {
      onTick: (left) => { if (label) label.textContent = Math.ceil(left); },
      onEnd: resolve,
    }).start();
    signal?.addEventListener('abort', () => { t.stop(); resolve(); }, { once: true });
    if (allowStop) {
      const btn = $('.js-stop', stage);
      btn?.addEventListener('click', () => { t.stop(); resolve(); }, { once: true });
    }
  });
  ringEl?.classList.remove('is-running');
  beep(520, 120);
  return cap.stop();
}

// ------------------------------------------------------ Listen and Repeat --

export const repeat = {
  render(root, item, ctx) {
    const ctl = new AbortController();
    const captures = new Array(item.sentences.length).fill(null);
    const practice = ctx.mode === 'practice';

    mount(root, html`
      <div class="speak speak-repeat">
        <div class="task-bar"><span class="eyebrow">Listen and Repeat</span><span class="js-progress"></span></div>
        <div class="scene">
          <div class="scene-art" aria-hidden="true">${item.icon || '🏛️'}</div>
          <div>
            <p class="scene-title">${item.scene}</p>
            <p class="muted">${item.intro}</p>
          </div>
        </div>
        ${supportNotice()}
        <div class="speak-stage"></div>
      </div>`);
    const stage = $('.speak-stage', root);
    const progress = $('.js-progress', root);

    function intro() {
      mount(stage, html`
        <div class="stage-card">
          <p>You will hear ${item.sentences.length} sentences. After each one, you will hear a beep. Repeat the sentence exactly as you heard it. You will not see the sentences.</p>
          ${levelMeter()}
          <button class="btn btn-primary js-begin" type="button">${practice ? 'Check microphone & start' : 'Start'}</button>
          <p class="js-err error" role="alert"></p>
        </div>`);
      $('.js-begin', stage).addEventListener('click', async () => {
        try {
          await getMic();
          run(0);
        } catch (err) {
          $('.js-err', stage).textContent = micErrorMessage(err);
        }
      });
    }

    async function run(i) {
      if (ctl.signal.aborted) return;
      if (i >= item.sentences.length) return finish();
      const sentence = item.sentences[i];
      const secs = repeatWindow(sentence);
      progress.textContent = `Sentence ${i + 1} of ${item.sentences.length}`;
      mount(stage, html`
        <div class="stage-card">
          <p class="stage-state">Listen…</p>
          ${ring(secs)}
          ${levelMeter()}
          <p class="live muted small" aria-live="polite"></p>
        </div>`);
      if (support.tts) await speak(sentence, { role: i % 2 ? 'B' : 'A', signal: ctl.signal });
      else { $('.stage-state', stage).textContent = `Read, then repeat from memory: “${sentence}”`; await wait(3500, ctl.signal); }
      if (ctl.signal.aborted) return;
      $('.stage-state', stage).textContent = 'Speak now';
      stage.querySelector('.stage-card').classList.add('is-recording');
      let cap;
      try {
        cap = await runResponseWindow(stage, secs, {
          signal: ctl.signal,
          onLive: (t) => { const el = $('.live', stage); if (el) el.textContent = t; },
        });
      } catch (err) {
        mount(stage, html`<p class="error" role="alert">${micErrorMessage(err)}</p>`);
        return;
      }
      captures[i] = cap;
      if (ctl.signal.aborted) return;
      if (practice) showInstant(i);
      else { await wait(600, ctl.signal); run(i + 1); }
    }

    function showInstant(i) {
      const cap = captures[i];
      const needsTyping = !cap.asr || !cap.transcript;
      mount(stage, html`
        <div class="stage-card instant">
          ${needsTyping ? html`
            <label class="field"><span>Type exactly what you said (no transcript was captured)</span>
              <input class="js-typed" type="text" autocomplete="off"></label>
            <button class="btn js-score" type="button">Score it</button>` : ''}
          <div class="js-instant"></div>
          ${cap.url ? html`<audio controls src="${cap.url}"></audio>` : ''}
          <div class="row gap-s">
            <button class="btn btn-ghost js-retry" type="button">Try this sentence again</button>
            <button class="btn btn-primary js-next" type="button">${i + 1 < item.sentences.length ? 'Next sentence' : 'See results'}</button>
          </div>
        </div>`);
      const show = (said) => {
        const r = scoreRepeat(item.sentences[i], said);
        mount($('.js-instant', stage), html`
          <div class="row gap-s center-y">${scoreChip(r.score, 5)}<span>${r.reason}</span></div>
          ${transcriptDiff(r.ops)}
          <p class="small muted">Heard: “${said || '—'}”</p>`);
      };
      if (!needsTyping) show(cap.transcript);
      $('.js-score', stage)?.addEventListener('click', () => { cap.transcript = $('.js-typed', stage).value; show(cap.transcript); });
      $('.js-retry', stage).addEventListener('click', () => run(i));
      $('.js-next', stage).addEventListener('click', () => run(i + 1));
    }

    function finish() {
      progress.textContent = 'Done';
      mount(stage, html`<div class="stage-card"><p>All sentences recorded.</p></div>`);
      ctx.onDone?.(collect());
    }

    function collect() {
      return captures.map((c) => c && { transcript: c.transcript, url: c.url, asr: c.asr, duration: c.duration });
    }

    intro();
    return {
      collect,
      destroy: () => { ctl.abort(); stopSpeaking(); },
    };
  },

  assess(item, response) {
    const items = item.sentences.map((s, i) => scoreRepeat(s, response?.[i]?.transcript || ''));
    const avg = items.reduce((a, r) => a + r.score, 0) / items.length;
    return { overall: Math.round(avg * 10) / 10, items, method: 'local' };
  },

  review(item, response, result) {
    const res = result || repeat.assess(item, response);
    return html`
      <div class="repeat-review">
        <p class="lead">Average: <strong>${res.overall}</strong> / 5 across ${item.sentences.length} sentences</p>
        <ol class="repeat-list">
          ${item.sentences.map((s, i) => {
            const r = res.items[i];
            const cap = response?.[i];
            return html`<li>
              <div class="row between center-y"><span class="muted small">Sentence ${i + 1}</span>${scoreChip(r.score, 5)}</div>
              <p class="target">${s}</p>
              ${transcriptDiff(r.ops)}
              <p class="small muted">${r.reason}</p>
              ${cap?.url ? html`<audio controls src="${cap.url}"></audio>` : ''}
            </li>`;
          })}
        </ol>
        <p class="legend small"><span class="d-del">missing</span> <span class="d-sub">changed</span> <span class="d-ins">extra</span></p>
      </div>`;
  },
};

// ------------------------------------------------------ Take an Interview --

export const interview = {
  render(root, item, ctx) {
    const ctl = new AbortController();
    const practice = ctx.mode === 'practice';
    const captures = new Array(item.questions.length).fill(null);
    let showText = practice;

    mount(root, html`
      <div class="speak speak-interview">
        <div class="task-bar"><span class="eyebrow">Take an Interview</span><span class="js-progress"></span></div>
        <div class="scene">
          <div class="scene-art interviewer" aria-hidden="true">🎙️</div>
          <div>
            <p class="scene-title">Topic: ${item.topic}</p>
            <p class="muted">${item.intro || 'An interviewer will ask you four questions. There is no preparation time. You have 45 seconds to answer each question.'}</p>
          </div>
        </div>
        ${supportNotice()}
        <div class="speak-stage"></div>
      </div>`);
    const stage = $('.speak-stage', root);
    const progress = $('.js-progress', root);

    function intro() {
      mount(stage, html`
        <div class="stage-card">
          <p>Answer each question as you would in a real conversation. Start speaking after the beep.</p>
          ${practice ? html`<label class="check"><input type="checkbox" class="js-show" checked> Show the question text (turn off for exam realism)</label>` : ''}
          ${levelMeter()}
          <button class="btn btn-primary js-begin" type="button">Start interview</button>
          <p class="js-err error" role="alert"></p>
        </div>`);
      $('.js-show', stage)?.addEventListener('change', (e) => { showText = e.target.checked; });
      $('.js-begin', stage).addEventListener('click', async () => {
        try { await getMic(); run(0); } catch (err) { $('.js-err', stage).textContent = micErrorMessage(err); }
      });
    }

    async function run(i) {
      if (ctl.signal.aborted) return;
      if (i >= item.questions.length) return finish();
      const q = item.questions[i];
      progress.textContent = `Question ${i + 1} of ${item.questions.length}`;
      mount(stage, html`
        <div class="stage-card">
          <p class="stage-state">The interviewer is asking…</p>
          <p class="question-text" ${showText || !support.tts ? '' : 'hidden'}>${q}</p>
          ${ring(INTERVIEW_SECONDS)}
          ${levelMeter()}
          <p class="live muted small" aria-live="polite"></p>
          <button class="btn btn-ghost js-stop" type="button" hidden>I’m finished</button>
        </div>`);
      if (support.tts) await speak(q, { role: 'B', signal: ctl.signal });
      else await wait(2500, ctl.signal);
      if (ctl.signal.aborted) return;
      $('.stage-state', stage).textContent = 'Answer now';
      stage.querySelector('.stage-card').classList.add('is-recording');
      $('.js-stop', stage).hidden = false;
      try {
        captures[i] = await runResponseWindow(stage, INTERVIEW_SECONDS, {
          signal: ctl.signal,
          allowStop: true,
          onLive: (t) => { const el = $('.live', stage); if (el) el.textContent = t; },
        });
      } catch (err) {
        mount(stage, html`<p class="error" role="alert">${micErrorMessage(err)}</p>`);
        return;
      }
      if (ctl.signal.aborted) return;
      await wait(500, ctl.signal);
      run(i + 1);
    }

    function finish() {
      progress.textContent = 'Done';
      mount(stage, html`<div class="stage-card"><p>Interview complete.</p></div>`);
      ctx.onDone?.(collect());
    }

    function collect() {
      return captures.map((c) => c && {
        transcript: c.transcript, url: c.url, asr: c.asr, duration: c.duration, timing: c.timing, confidence: c.confidence,
      });
    }

    intro();
    return { collect, destroy: () => { ctl.abort(); stopSpeaking(); } };
  },

  assessOne(question, cap) {
    return scoreInterview(question, cap?.transcript || '', cap || {});
  },

  assess(item, response) {
    const items = item.questions.map((q, i) => interview.assessOne(q, response?.[i]));
    const avg = items.reduce((a, r) => a + r.overall, 0) / items.length;
    return { overall: Math.round(avg * 10) / 10, items, method: 'local' };
  },

  review(item, response, result) {
    const res = result || interview.assess(item, response);
    return html`
      <div class="interview-review">
        <p class="lead">Average: <strong>${res.overall}</strong> / 5 across ${item.questions.length} questions</p>
        ${item.questions.map((q, i) => {
          const cap = response?.[i];
          const r = res.items[i];
          const m = r.metrics || {};
          return html`
            <section class="iv-item" data-i="${i}">
              <p class="eyebrow">Question ${i + 1}</p>
              <p class="question-text">${q}</p>
              ${cap?.url ? html`<audio controls src="${cap.url}"></audio>` : ''}
              <label class="field"><span>Transcript ${cap?.asr ? '(automatic — fix recognition mistakes before AI scoring)' : '(type what you said)'}</span>
                <textarea class="js-transcript" rows="3" data-i="${i}">${cap?.transcript || ''}</textarea></label>
              ${m.words != null ? html`
                <dl class="metrics">
                  <div><dt>Words</dt><dd>${m.words}</dd></div>
                  <div><dt>Pace</dt><dd>${m.wpm || '—'} wpm</dd></div>
                  <div><dt>Long pauses</dt><dd>${m.longPauses ?? '—'}</dd></div>
                  <div><dt>Start delay</dt><dd>${m.latency != null ? `${m.latency.toFixed(1)}s` : '—'}</dd></div>
                  <div><dt>Connectors</dt><dd>${m.connectors}</dd></div>
                </dl>` : ''}
              <div class="js-result">${rubricResult('speaking_interview', r)}</div>
              <div class="row gap-s"><button class="btn btn-ghost js-rescore" type="button" data-i="${i}">Re-score with edited transcript</button>
                <button class="btn btn-primary js-ai" type="button" data-i="${i}">AI feedback</button></div>
            </section>`;
        })}
      </div>`;
  },
};

// Wires the interview review controls: transcript edits, re-scoring, AI.
export function bindInterviewReview(root, item, response, result, onChange = () => {}) {
  const recompute = () => {
    result.overall = Math.round((result.items.reduce((a, r) => a + r.overall, 0) / result.items.length) * 10) / 10;
    onChange(result);
  };
  root.addEventListener('click', async (e) => {
    const btn = e.target.closest('.js-rescore, .js-ai');
    if (!btn) return;
    const i = Number(btn.dataset.i);
    const section = root.querySelector(`.iv-item[data-i="${i}"]`);
    const text = section.querySelector('.js-transcript').value.trim();
    response[i] = { ...(response[i] || {}), transcript: text };
    const local = interview.assessOne(item.questions[i], response[i]);
    if (btn.classList.contains('js-rescore')) {
      result.items[i] = local;
    } else {
      btn.disabled = true;
      btn.textContent = 'Scoring…';
      try {
        const { evaluate } = await import('../core/ai.js');
        const ai = await evaluate({
          task: 'speaking_interview',
          item: { topic: item.topic, question: item.questions[i] },
          response: text,
          metrics: local.metrics,
        });
        result.items[i] = { ...ai, metrics: local.metrics, notes: local.notes };
        result.method = 'ai';
      } catch (err) {
        section.querySelector('.js-result').insertAdjacentHTML('afterbegin', `<p class="error" role="alert">${esc(err.message)}</p>`);
        btn.disabled = false;
        btn.textContent = 'AI feedback';
        return;
      }
      btn.textContent = 'AI scored';
    }
    mount(section.querySelector('.js-result'), rubricResult('speaking_interview', result.items[i]));
    recompute();
  });
}
