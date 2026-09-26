// Reading tasks: Complete the Words (C-test), Read in Daily Life, Read an
// Academic Passage.

import { html, mount, $$ } from '../core/ui.js';
import { mcqTemplate, collectMcq, gradeMcq, mcqReview, lockInputs } from './common.js';

// ---------------------------------------------------------- C-test --------
// Keep the first sentence intact; from the second sentence on, remove the
// second half of every second word until `n` blanks exist.

export function makeCTest(text, n = 10) {
  const sentenceEnd = text.search(/[.!?]\s/);
  const head = sentenceEnd > 0 ? text.slice(0, sentenceEnd + 2) : '';
  const rest = sentenceEnd > 0 ? text.slice(sentenceEnd + 2) : text;
  const parts = [];
  if (head) parts.push({ t: head });
  let counter = 0, blanks = 0;
  const tokens = rest.split(/(\s+)/);
  for (const tok of tokens) {
    const m = tok.match(/^([("“]*)([A-Za-z]+)([^A-Za-z]*)$/);
    if (blanks < n && m && m[2].length >= 4 && !/^[A-Z]{2,}$/.test(m[2])) {
      counter++;
      if (counter % 2 === 0) {
        const word = m[2];
        const keep = Math.floor(word.length / 2);
        parts.push({ t: m[1] });
        parts.push({ blank: blanks++, prefix: word.slice(0, keep), missing: word.slice(keep), word });
        parts.push({ t: m[3] });
        continue;
      }
    }
    parts.push({ t: tok });
  }
  return { parts, blanks: parts.filter((p) => p.blank != null) };
}

export const ctw = {
  render(root, item, ctx) {
    const ct = makeCTest(item.text, item.blanks || 10);
    mount(root, html`
      <article class="passage passage-ctw">
        ${item.title ? html`<h3 class="passage-title">${item.title}</h3>` : ''}
        <p class="instruction">Fill in the missing letters to complete the text.</p>
        <p class="ctw-text">${ct.parts.map((p) => p.blank == null
          ? p.t
          : html`<span class="ctw-word">${p.prefix}<input type="text" class="ctw-input" data-b="${p.blank}" maxlength="${p.missing.length}" size="${p.missing.length}"
              style="--n:${p.missing.length}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Missing letters (${p.missing.length}) after ${p.prefix}"></span>`)}</p>
      </article>`);
    const inputs = $$('.ctw-input', root);
    inputs.forEach((inp, i) => {
      inp.addEventListener('input', () => {
        inp.value = inp.value.replace(/[^A-Za-z]/g, '');
        if (inp.value.length >= Number(inp.maxLength) && inputs[i + 1]) inputs[i + 1].focus();
      });
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !inp.value && inputs[i - 1]) { e.preventDefault(); inputs[i - 1].focus(); }
      });
    });
    return {
      collect: () => inputs.map((inp) => inp.value.trim().toLowerCase()),
      lock: () => lockInputs(root),
    };
  },
  grade(item, response) {
    const ct = makeCTest(item.text, item.blanks || 10);
    let correct = 0;
    const details = ct.blanks.map((b, i) => {
      const ok = (response?.[i] || '') === b.missing.toLowerCase();
      if (ok) correct++;
      return { ok, given: response?.[i] || '', answer: b.missing };
    });
    return { correct, total: ct.blanks.length, details };
  },
  review(item, response) {
    const ct = makeCTest(item.text, item.blanks || 10);
    return html`
      <div class="review-ctw">
        <p class="ctw-text">${ct.parts.map((p) => {
          if (p.blank == null) return p.t;
          const given = response?.[p.blank] || '';
          const ok = given === p.missing.toLowerCase();
          return ok
            ? html`<span class="ctw-ok">${p.word}</span>`
            : html`<span class="ctw-bad" title="You wrote: ${p.prefix}${given}">${p.prefix}<u>${p.missing}</u>${given ? html`<s>${given}</s>` : ''}</span>`;
        })}</p>
        <p class="muted small">Underlined letters are the answer; struck-through letters are what you typed.</p>
      </div>`;
  },
  count: (item) => makeCTest(item.text, item.blanks || 10).blanks.length,
};

// ---------------------------------------------------- Passage + MCQ -------

function docHeader(item) {
  const m = item.meta || {};
  const rows = [['From', m.from], ['To', m.to], ['Subject', m.subject], ['Date', m.date]].filter(([, v]) => v);
  if (!rows.length) return '';
  return html`<dl class="doc-meta">${rows.map(([k, v]) => html`<dt>${k}</dt><dd>${v}</dd>`)}</dl>`;
}

function passageBody(item) {
  return String(item.text).split(/\n{2,}/).map((p) => html`<p>${p.split('\n').map((line, i) => (i ? [html`<br>`, line] : line))}</p>`);
}

function passageTemplate(item, kind) {
  return html`
    <article class="passage passage-${kind} doc-${item.format || 'text'}">
      ${item.format && item.format !== 'text' ? html`<p class="doc-kind">${item.format}</p>` : ''}
      ${item.title ? html`<h3 class="passage-title">${item.title}</h3>` : ''}
      ${docHeader(item)}
      <div class="passage-body">${passageBody(item)}</div>
    </article>`;
}

function passageTask(kind) {
  return {
    render(root, item, ctx) {
      const name = `${kind}-${item.id}`;
      mount(root, html`
        <div class="split">
          <div class="split-left">${passageTemplate(item, kind)}</div>
          <div class="split-right">${mcqTemplate(item.questions, name, `${ctx.seed}:${item.id}`, { startIndex: ctx.startIndex || 0 })}</div>
        </div>`);
      return {
        collect: () => collectMcq(root, item.questions, name),
        lock: () => lockInputs(root),
      };
    },
    grade: (item, response) => gradeMcq(item.questions, response),
    review: (item, response, _r, opts = {}) => html`
      <div class="split">
        <div class="split-left">${passageTemplate(item, kind)}</div>
        <div class="split-right">${mcqReview(item.questions, response, opts)}</div>
      </div>`,
    count: (item) => item.questions.length,
  };
}

export const daily = passageTask('daily');
export const academic = passageTask('academic');
