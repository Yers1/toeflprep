// Listening tasks. Audio is produced with the browser's speech synthesis,
// with a distinct voice per speaker.

import { html, mount, $ } from '../core/ui.js';
import { speak, speakScript, stopSpeaking, support, wait } from '../core/audio.js';
import { mcqTemplate, collectMcq, gradeMcq, mcqReview, lockInputs } from './common.js';

const KIND_LABEL = {
  conversation: 'Conversation',
  announcement: 'Announcement',
  academic: 'Academic talk',
};

function playerTemplate(item, kind, mode) {
  return html`
    <div class="player" data-state="ready">
      <div class="player-top">
        <span class="player-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 3a9 9 0 0 0-9 9v5a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H5a7 7 0 0 1 14 0h-2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1a3 3 0 0 0 3-3v-5a9 9 0 0 0-9-9Z"/></svg>
        </span>
        <div>
          <p class="eyebrow">${KIND_LABEL[kind] || 'Listening'}</p>
          <p class="player-context">${item.context || item.title || ''}</p>
        </div>
      </div>
      <div class="wave" aria-hidden="true">${Array.from({ length: 28 }, (_, i) => html`<span style="--i:${i}"></span>`)}</div>
      <p class="player-status" aria-live="polite">${mode === 'test' ? 'The audio will start automatically. You will hear it once.' : 'Press play. Questions appear when the audio ends.'}</p>
      <div class="row gap-s">
        <button class="btn btn-primary js-play" type="button">${mode === 'test' ? 'Start audio' : 'Play audio'}</button>
        ${mode === 'practice' ? html`<button class="btn btn-ghost js-transcript" type="button" hidden>Show transcript</button>` : ''}
      </div>
      <div class="transcript" hidden>${(item.lines || []).map((l) => html`<p><strong>${l.speaker}:</strong> ${l.text}</p>`)}</div>
    </div>`;
}

export function talkTask(kind) {
  return {
    render(root, item, ctx) {
      const name = `${kind}-${item.id}`;
      const ctl = new AbortController();
      mount(root, html`
        <div class="listen">
          ${playerTemplate(item, kind, ctx.mode)}
          <div class="listen-questions" hidden>${mcqTemplate(item.questions, name, `${ctx.seed}:${item.id}`, { startIndex: ctx.startIndex || 0 })}</div>
        </div>`);
      const player = $('.player', root);
      const status = $('.player-status', root);
      const playBtn = $('.js-play', root);
      const questions = $('.listen-questions', root);
      let plays = 0;
      ctx.setCanAdvance?.(false);

      const reveal = () => {
        questions.hidden = false;
        ctx.setCanAdvance?.(true);
        const tBtn = $('.js-transcript', root);
        if (tBtn) tBtn.hidden = false;
      };

      async function play() {
        if (!support.tts) {
          status.textContent = 'Speech playback is not available in this browser, so the transcript is shown instead.';
          $('.transcript', root).hidden = false;
          reveal();
          return;
        }
        plays++;
        playBtn.disabled = true;
        player.dataset.state = 'playing';
        status.textContent = 'Playing…';
        await speakScript(item.lines, item.roles || {}, {
          signal: ctl.signal,
          onLine: (i, line) => { if (line) status.textContent = `${line.speaker} is speaking…`; },
        });
        if (ctl.signal.aborted) return;
        player.dataset.state = 'done';
        status.textContent = ctx.mode === 'test' ? 'Audio finished. Answer the questions.' : 'Audio finished.';
        if (ctx.mode === 'practice') { playBtn.disabled = false; playBtn.textContent = 'Replay'; }
        reveal();
      }

      playBtn.addEventListener('click', play);
      $('.js-transcript', root)?.addEventListener('click', (e) => {
        const t = $('.transcript', root);
        t.hidden = !t.hidden;
        e.target.textContent = t.hidden ? 'Show transcript' : 'Hide transcript';
      });
      if (ctx.mode === 'test') wait(700, ctl.signal).then(() => { if (!ctl.signal.aborted) play(); });

      return {
        collect: () => collectMcq(root, item.questions, name),
        lock: () => lockInputs(root),
        destroy: () => { ctl.abort(); stopSpeaking(); },
        plays: () => plays,
      };
    },
    grade: (item, response) => gradeMcq(item.questions, response),
    review: (item, response, _r, opts = {}) => html`
      <div class="listen-review">
        <details class="transcript-box"><summary>Transcript</summary>
          ${(item.lines || []).map((l) => html`<p><strong>${l.speaker}:</strong> ${l.text}</p>`)}
        </details>
        ${mcqReview(item.questions, response, opts)}
      </div>`,
    count: (item) => item.questions.length,
  };
}

// Listen and Choose a Response: one spoken line, four written replies.
export const response = {
  render(root, item, ctx) {
    const ctl = new AbortController();
    const prompts = item.items;
    let idx = 0;
    const answers = new Array(prompts.length).fill(null);
    const name = `resp-${item.id}`;

    function view() {
      const p = prompts[idx];
      const questions = [{ q: 'Choose the best response.', choices: p.choices, answer: p.answer }];
      mount(root, html`
        <div class="resp">
          <p class="eyebrow">${prompts.length > 1 ? `Item ${idx + 1} of ${prompts.length}` : 'Listen and choose a response'}</p>
          <div class="player player-compact" data-state="ready">
            <div class="wave" aria-hidden="true">${Array.from({ length: 16 }, (_, i) => html`<span style="--i:${i}"></span>`)}</div>
            <button class="btn btn-primary js-play" type="button">${ctx.mode === 'test' ? 'Listening…' : 'Play'}</button>
            <p class="player-status small muted" aria-live="polite"></p>
          </div>
          <div class="resp-choices" hidden>${mcqTemplate(questions, `${name}-${idx}`, `${ctx.seed}:${item.id}:${idx}`, { startIndex: (ctx.startIndex || 0) + idx })}</div>
          ${prompts.length > 1 ? html`<div class="row end"><button class="btn js-next" type="button" disabled>${idx + 1 < prompts.length ? 'Next item' : 'Done'}</button></div>` : ''}
        </div>`);
      const player = $('.player', root);
      const btn = $('.js-play', root);
      const choices = $('.resp-choices', root);
      const next = $('.js-next', root);
      const statusEl = $('.player-status', root);
      ctx.setCanAdvance?.(false);

      const reveal = () => {
        choices.hidden = false;
        if (prompts.length === 1 || idx === prompts.length - 1) ctx.setCanAdvance?.(true);
      };
      const play = async () => {
        if (!support.tts) {
          statusEl.textContent = `“${p.prompt}”`;
          reveal();
          return;
        }
        btn.disabled = true;
        player.dataset.state = 'playing';
        await speak(p.prompt, { role: p.speaker || 'A', signal: ctl.signal });
        if (ctl.signal.aborted) return;
        player.dataset.state = 'done';
        if (ctx.mode === 'practice') { btn.disabled = false; btn.textContent = 'Replay'; }
        else btn.textContent = 'Played';
        reveal();
      };
      btn.addEventListener('click', play);
      choices.addEventListener('change', () => {
        answers[idx] = collectMcq(root, questions, `${name}-${idx}`)[0];
        if (next) next.disabled = answers[idx] == null;
      });
      next?.addEventListener('click', () => {
        if (idx + 1 < prompts.length) { idx++; view(); }
        else { next.disabled = true; next.textContent = 'All items answered'; ctx.onInternalDone?.(); }
      });
      if (ctx.mode === 'test') wait(500, ctl.signal).then(() => { if (!ctl.signal.aborted) play(); });
    }
    view();

    return {
      collect: () => {
        const p = prompts[idx];
        const cur = collectMcq(root, [{ choices: p.choices }], `${name}-${idx}`)[0];
        if (cur != null) answers[idx] = cur;
        return answers.slice();
      },
      lock: () => lockInputs(root),
      destroy: () => { ctl.abort(); stopSpeaking(); },
    };
  },
  grade: (item, response) => gradeMcq(item.items.map((p) => ({ choices: p.choices, answer: p.answer })), response),
  review: (item, response, _r, opts = {}) => html`${mcqReview(
    item.items.map((p) => ({ q: `You heard: “${p.prompt}”`, choices: p.choices, answer: p.answer, explanation: p.explanation })),
    response, opts)}`,
  count: (item) => item.items.length,
};

export const conversation = talkTask('conversation');
export const announcement = talkTask('announcement');
export const lecture = talkTask('academic');
