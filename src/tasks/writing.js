// Writing tasks: Build a Sentence, Write an Email, Academic Discussion.

import { html, mount, $, wordCount, fmtClock } from '../core/ui.js';
import { Countdown, timerPill } from '../core/timer.js';
import { scoreEmail, scoreDiscussion } from '../analyzers/writing.js';
import { seededOrder, rubricResult } from './common.js';

export const TIME = { sentence: 350, email: 420, discussion: 600 };

function initials(name) {
  return String(name).split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

// ------------------------------------------------------ Build a Sentence --

function tileList(q) {
  return [...q.tiles, ...(q.distractor ? [q.distractor] : [])];
}

export function isCorrect(q, order) {
  const list = tileList(q);
  const built = (order || []).map((i) => list[i]).join(' ').toLowerCase();
  const answers = [q.tiles, ...(q.alt || [])].map((t) => t.join(' ').toLowerCase());
  return answers.includes(built);
}

export function sentenceText(q, order) {
  const list = tileList(q);
  return [q.prefix, ...(order || []).map((i) => list[i]), q.suffix].filter(Boolean).join(' ').replace(/\s+([.?!,])/g, '$1');
}

export const sentence = {
  render(root, item, ctx) {
    const qs = item.items;
    const orders = qs.map(() => []);
    let idx = 0;
    let timer = null;

    mount(root, html`
      <div class="bas">
        <div class="task-bar">
          <span class="eyebrow">Build a Sentence</span>
          <span class="bas-count"></span>
          <span class="timer-pill js-timer" role="timer" aria-label="Time left">${fmtClock(TIME.sentence)}</span>
        </div>
        <div class="bas-stage"></div>
        <div class="row between">
          <button class="btn btn-ghost js-prev" type="button">Back</button>
          <div class="row gap-s">
            <button class="btn btn-ghost js-reset" type="button">Reset</button>
            <button class="btn btn-primary js-next" type="button">Next</button>
          </div>
        </div>
      </div>`);

    const stage = $('.bas-stage', root);
    const timerEl = $('.js-timer', root);

    function view() {
      const q = qs[idx];
      const list = tileList(q);
      const order = orders[idx];
      const bank = seededOrder(list.length, `${ctx.seed}:${item.id}:${idx}`);
      mount(stage, html`
        <div class="dialog-line">
          <span class="avatar a1" aria-hidden="true">${initials(q.context.speaker)}</span>
          <div class="bubble"><strong>${q.context.speaker}</strong><p>${q.context.text}</p></div>
        </div>
        <div class="dialog-line me">
          <span class="avatar a2" aria-hidden="true">${initials(q.reply?.speaker || 'You')}</span>
          <div class="bubble bubble-build"><strong>${q.reply?.speaker || 'You'}</strong>
            <p class="build-line">
              ${q.prefix ? html`<span class="given">${q.prefix}</span>` : ''}
              ${q.tiles.map((_, s) => {
                const tIdx = order[s];
                return tIdx == null
                  ? html`<span class="slot" aria-label="Empty slot ${s + 1}"></span>`
                  : html`<button type="button" class="slot filled" data-slot="${s}" aria-label="Remove ${list[tIdx]}">${list[tIdx]}</button>`;
              })}
              ${q.suffix ? html`<span class="given">${q.suffix}</span>` : ''}
            </p>
          </div>
        </div>
        <div class="tile-bank" role="group" aria-label="Word tiles">
          ${bank.map((t) => html`<button type="button" class="tile" data-tile="${t}" ${order.includes(t) ? 'disabled' : ''}>${list[t]}</button>`)}
        </div>
        ${q.distractor ? html`<p class="muted small">One tile is not needed.</p>` : ''}`);
      $('.bas-count', root).textContent = `${idx + 1} / ${qs.length}`;
      $('.js-prev', root).disabled = idx === 0 || ctx.mode === 'test';
      $('.js-prev', root).hidden = ctx.mode === 'test';
      $('.js-next', root).textContent = idx + 1 < qs.length ? 'Next' : (ctx.mode === 'test' ? 'Finish task' : 'Check answers');
    }

    stage.addEventListener('click', (e) => {
      const tile = e.target.closest('.tile');
      const slot = e.target.closest('.slot.filled');
      const order = orders[idx];
      if (tile && !tile.disabled && order.length < qs[idx].tiles.length) {
        order.push(Number(tile.dataset.tile));
        view();
      } else if (slot) {
        order.splice(Number(slot.dataset.slot), 1);
        view();
      }
    });
    $('.js-reset', root).addEventListener('click', () => { orders[idx] = []; view(); });
    $('.js-prev', root).addEventListener('click', () => { if (idx > 0) { idx--; view(); } });
    $('.js-next', root).addEventListener('click', () => {
      if (idx + 1 < qs.length) { idx++; view(); }
      else finish();
    });

    let finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      timer?.stop();
      ctx.onDone?.(orders.map((o) => o.slice()));
    }

    timer = new Countdown(item.time || TIME.sentence, {
      onTick: (left, total) => timerPill(timerEl, left, total),
      onEnd: () => { if (ctx.mode === 'test') finish(); else timerEl.dataset.state = 'over'; },
    }).start();
    view();

    return {
      collect: () => orders.map((o) => o.slice()),
      destroy: () => timer?.stop(),
      elapsed: () => timer?.elapsed(),
    };
  },
  grade(item, response) {
    let correct = 0;
    const details = item.items.map((q, i) => {
      const ok = isCorrect(q, response?.[i]);
      if (ok) correct++;
      return { ok };
    });
    return { correct, total: item.items.length, details };
  },
  review(item, response) {
    return html`<ol class="bas-review">${item.items.map((q, i) => {
      const ok = isCorrect(q, response?.[i]);
      return html`<li class="${ok ? 'is-ok' : 'is-bad'}">
        <p class="small muted">${q.context.speaker}: “${q.context.text}”</p>
        <p><span class="mark">${ok ? '✓' : '✗'}</span> ${response?.[i]?.length ? sentenceText(q, response[i]) : html`<em>not answered</em>`}</p>
        ${ok ? '' : html`<p class="answer-line">Answer: <strong>${sentenceText(q, q.tiles.map((_, k) => k))}</strong></p>`}
        ${q.note ? html`<p class="explain">${q.note}</p>` : ''}
      </li>`;
    })}</ol>`;
  },
  count: (item) => item.items.length,
};

// ------------------------------------------------- Free-response writing --

function composer(ctx, { placeholder, minWords }) {
  return html`
    <div class="composer">
      <textarea class="js-text" rows="14" spellcheck="false" autocorrect="off" autocapitalize="sentences"
        placeholder="${placeholder}" aria-label="Your response"></textarea>
      <div class="composer-foot">
        <span class="js-wc">0 words</span>
        <span class="muted small">Spell-check is off, as on the real test. Suggested: ${minWords}+ words.</span>
      </div>
    </div>`;
}

function freeTask({ kind, time, template, assess, placeholder, minWords }) {
  return {
    render(root, item, ctx) {
      mount(root, html`
        <div class="free free-${kind}">
          <div class="task-bar">
            <span class="eyebrow">${kind === 'email' ? 'Write an Email' : 'Academic Discussion'}</span>
            <span class="timer-pill js-timer" role="timer" aria-label="Time left">${fmtClock(time)}</span>
          </div>
          <div class="split">
            <div class="split-left">${template(item)}</div>
            <div class="split-right">
              ${kind === 'email' ? html`
                <div class="email-head">
                  <div><span>To:</span> ${item.to}</div>
                  <div><span>Subject:</span> ${item.subject || ''}</div>
                </div>` : ''}
              ${composer(ctx, { placeholder, minWords })}
              ${ctx.mode === 'practice' ? html`<div class="row end gap-s"><button class="btn btn-primary js-submit" type="button">Submit for feedback</button></div>` : ''}
            </div>
          </div>
        </div>`);
      const ta = $('.js-text', root);
      const wc = $('.js-wc', root);
      const timerEl = $('.js-timer', root);
      if (ctx.draft) ta.value = ctx.draft;
      const update = () => {
        const n = wordCount(ta.value);
        wc.textContent = `${n} word${n === 1 ? '' : 's'}`;
        wc.dataset.state = n >= minWords ? 'ok' : 'low';
      };
      ta.addEventListener('input', update);
      update();
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        timer.stop();
        ctx.onDone?.(ta.value);
      };
      const timer = new Countdown(time, {
        onTick: (left, total) => timerPill(timerEl, left, total),
        onEnd: () => {
          if (ctx.mode === 'test') { ta.readOnly = true; finish(); }
          else { timerEl.dataset.state = 'over'; timerEl.textContent = 'Time'; }
        },
      }).start();
      $('.js-submit', root)?.addEventListener('click', () => {
        if (!ta.value.trim()) { ta.focus(); return; }
        ta.readOnly = true;
        finish();
      });
      setTimeout(() => ta.focus(), 50);
      return {
        collect: () => ta.value,
        destroy: () => timer.stop(),
        elapsed: () => timer.elapsed(),
        overtime: () => timer.finished && !done,
      };
    },
    assess,
    review(item, response, result) {
      return html`
        <div class="split">
          <div class="split-left">${template(item)}
            <details class="model"><summary>Model response (score 5)</summary>
              <div class="prose">${String(item.model?.text || '').split('\n').map((p) => html`<p>${p}</p>`)}</div>
              ${item.model?.notes ? html`<p class="explain">${item.model.notes}</p>` : ''}
            </details>
          </div>
          <div class="split-right">
            <div class="your-response"><p class="eyebrow">Your response · ${wordCount(response)} words</p><div class="prose">${String(response || '').split('\n').map((p) => html`<p>${p}</p>`)}</div></div>
            ${rubricResult(`writing_${kind}`, result)}
          </div>
        </div>`;
    },
  };
}

export function emailPrompt(item) {
  return html`
    <article class="prompt-card">
      <p class="instruction">Read the situation and write an email. You have 7 minutes.</p>
      <p>${item.scenario}</p>
      <p class="strong">In your email, do the following:</p>
      <ul class="goals">${item.goals.map((g) => html`<li>${g.text}</li>`)}</ul>
      <p class="muted small">Write as much as you can and in complete sentences.</p>
    </article>`;
}

export function discussionPrompt(item) {
  return html`
    <article class="prompt-card discussion">
      <p class="instruction">Your professor is teaching a class on ${item.course}. Write a post responding to the professor’s question. You have 10 minutes.</p>
      <p class="muted small">In your response, express and support your opinion and make a contribution to the discussion. An effective response will contain at least 100 words.</p>
      <div class="post post-prof">
        <span class="avatar a3" aria-hidden="true">${initials(item.professor.name)}</span>
        <div><strong>${item.professor.name}</strong><p>${item.professor.text}</p></div>
      </div>
      ${item.students.map((s, i) => html`
        <div class="post">
          <span class="avatar a${i + 1}" aria-hidden="true">${initials(s.name)}</span>
          <div><strong>${s.name}</strong><p>${s.text}</p></div>
        </div>`)}
    </article>`;
}

export const email = freeTask({
  kind: 'email',
  time: TIME.email,
  template: emailPrompt,
  assess: scoreEmail,
  placeholder: 'Dear …,',
  minWords: 120,
});

export const discussion = freeTask({
  kind: 'discussion',
  time: TIME.discussion,
  template: discussionPrompt,
  assess: scoreDiscussion,
  placeholder: 'Write your post here…',
  minWords: 100,
});

