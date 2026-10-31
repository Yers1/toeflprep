// Official ETS paper tests: links to the PDF and audio, an answer sheet with a
// section timer, and checking against the key the learner pastes from the PDF.

import { html, mount, $, $$, on, pct, toast } from '../core/ui.js';
import { Countdown, timerPill } from '../core/timer.js';
import { officialState, officialSave } from '../core/store.js';
import { OFFICIAL_TESTS, OFFICIAL_MODULES } from '../data/official.js';

// Reading ≈ 30 min for both modules (ETS 2026 spec); Build a Sentence 5:50.
// Listening has no clock here: the audio sets the pace.
const TIMES = { Reading: 30 * 60, Writing: 350 };
const SECTIONS = ['Reading', 'Listening', 'Writing'];

export default function official(outlet, { id }) {
  if (!id) return list(outlet);
  const test = OFFICIAL_TESTS.find((t) => t.id === id);
  if (!test) {
    mount(outlet, html`<section class="page"><h1>Test not found</h1><p><a href="#/official">All ETS tests</a></p></section>`);
    return;
  }
  return sheet(outlet, test);
}

// Key pasted from the PDF: drop headings, page headers and question numbers,
// keep the answers in order. Build a Sentence answers are whole sentences.
export function parseKey(text, sentences) {
  const t = String(text || '')
    .replace(/TOEFL\s*iBT\S*|Teacher Resources|Practice Test\s*\d+|Question Number|Answer Key|Answer|(Reading|Listening|Writing) Section|Module\s*\d|[–—•�]/gi, ' ');
  if (sentences) return t.split(/(?<=[.?!])\s+/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length > 2);
  return t.split(/\s+/).filter((x) => /[a-z]/i.test(x));
}

const norm = (s, sentences) => (sentences
  ? String(s).toLowerCase().replace(/[^a-z' ]/g, ' ').replace(/\s+/g, ' ').trim()
  : String(s).toLowerCase().replace(/[^a-z]/g, ''));

function result(mod, saved = {}) {
  const key = parseKey(saved.key, mod.sentences);
  if (!key.length) return null;
  const answers = saved.answers || [];
  const marks = key.map((k, i) => !!answers[i] && norm(answers[i], mod.sentences) === norm(k, mod.sentences));
  return { key, marks, ok: marks.filter(Boolean).length, n: key.length };
}

function summary(testId) {
  const saved = officialState()[testId] || {};
  const parts = SECTIONS.map((sec) => {
    const rs = OFFICIAL_MODULES.filter((m) => m.section === sec).map((m) => result(m, saved[m.id])).filter(Boolean);
    if (!rs.length) return '';
    const ok = rs.reduce((a, r) => a + r.ok, 0);
    const n = rs.reduce((a, r) => a + r.n, 0);
    return `${sec} ${ok}/${n}`;
  }).filter(Boolean);
  return parts.length ? parts.join(' · ') : 'Не начат';
}

function list(outlet) {
  mount(outlet, html`
    <section class="page">
      <header class="page-head">
        <p class="eyebrow">Official · free · 2026 format</p>
        <h1>ETS practice tests</h1>
        <p class="lead">Семь официальных тестов ETS в формате 21 января 2026 года: PDF с заданиями, аудио и ключи к Reading, Listening и Build a Sentence. Отвечаешь здесь, в бланке, потом вставляешь ключ из PDF, и сайт показывает ошибки.</p>
      </header>
      <div class="off-list">
        ${OFFICIAL_TESTS.map((t) => html`
          <a class="card off-card" href="#/official/${t.id}">
            <h3>${t.name}</h3>
            <p class="small muted">${summary(t.id)}</p>
          </a>`)}
      </div>
      <p class="small muted">Тесты и ключи принадлежат ETS, поэтому здесь только ссылки на ets.org. Твои ответы и вставленные ключи хранятся только в этом браузере.</p>
    </section>`);
}

function sheet(outlet, test) {
  const saved = () => officialState()[test.id] || {};
  const timers = {};

  mount(outlet, html`
    <section class="page">
      <header class="page-head">
        <p class="eyebrow"><a href="#/official">ETS practice tests</a></p>
        <h1>${test.name}</h1>
        <div class="row gap-s wrap">
          <a class="btn btn-primary" href="${test.pdf}" target="_blank" rel="noopener">Открыть PDF ↗</a>
          <a class="btn btn-ghost" href="${test.audio}" target="_blank" rel="noopener">Скачать аудио (zip) ↗</a>
        </div>
      </header>
      <details class="card">
        <summary><strong>Как проходить</strong></summary>
        <ol class="off-howto">
          <li>Открой PDF и распакуй аудио. Ключи в PDF не смотри до конца секции.</li>
          <li>Reading: нажми «Старт» у таймера, отвечай в бланке. В Complete the Words пиши только недостающие буквы, как в ключе (например <em>ght</em>). В остальных вопросах пиши букву: A, B, C или D.</li>
          <li>Listening: включай аудио по порядку, каждую запись один раз, без пауз. Отвечай сразу.</li>
          <li>Build a Sentence: пиши предложение целиком.</li>
          <li>После модуля найди в PDF таблицу «… Module 1 Answer Key», скопируй её и вставь в поле «Проверить по ключу».</li>
          <li>Email и Academic Discussion из PDF напиши на время (7 и 10 минут) и пришли Claude на разбор.</li>
        </ol>
      </details>
      ${SECTIONS.map((sec) => html`
        <section class="section-block">
          <div class="section-title">
            <h2>${sec}</h2>
            ${TIMES[sec] ? html`<span class="row gap-s"><span class="timer-pill js-pill" data-sec="${sec}"></span><button class="btn btn-ghost btn-sm js-timer" type="button" data-sec="${sec}">Старт</button></span>` : html`<span class="muted small">темп задаёт аудио</span>`}
          </div>
          ${OFFICIAL_MODULES.filter((m) => m.section === sec).map((m) => html`
            <div class="card off-mod" data-mod="${m.id}">
              <h3>${m.name}</h3>
              <div class="off-grid ${m.sentences ? 'wide' : ''}">
                ${Array.from({ length: m.rows }, (_, i) => html`
                  <label class="off-row"><span>${i + 1}</span><input class="js-ans" data-i="${i}" value="${saved()[m.id]?.answers?.[i] || ''}" autocomplete="off" autocapitalize="off" spellcheck="false"></label>`)}
              </div>
              <details class="off-key" ${saved()[m.id]?.key ? 'open' : ''}>
                <summary>Проверить по ключу</summary>
                <textarea class="js-key" rows="3" placeholder="Вставь сюда таблицу ключа этого модуля из PDF">${saved()[m.id]?.key || ''}</textarea>
                <button class="btn btn-primary btn-sm js-check" type="button">Проверить</button>
              </details>
              <div class="js-res"></div>
            </div>`)}
        </section>`)}
    </section>`);

  const root = $('.page', outlet); // listeners go on the page, which is replaced on navigation
  const modOf = (el) => OFFICIAL_MODULES.find((m) => m.id === el.closest('[data-mod]').dataset.mod);

  function paint(mod) {
    const box = $(`[data-mod="${mod.id}"]`, outlet);
    const r = result(mod, saved()[mod.id]);
    $$('.off-row', box).forEach((row, i) => {
      row.classList.toggle('ok', !!r && i < r.n && r.marks[i]);
      row.classList.toggle('bad', !!r && i < r.n && !r.marks[i]);
      row.classList.toggle('extra', !!r && i >= r.n);
      $('.off-fix', row)?.remove();
      if (r && i < r.n && !r.marks[i]) row.insertAdjacentHTML('beforeend', '<small class="off-fix"></small>');
      if (r && i < r.n && !r.marks[i]) $('.off-fix', row).textContent = r.key[i];
    });
    const p = r && pct(r.ok, r.n);
    mount($('.js-res', box), r ? html`<div class="result-banner ${p >= 85 ? 'good' : p >= 60 ? 'mid' : 'low'}"><strong>${r.ok} / ${r.n}</strong><span>${p}%</span></div>
      <p class="small muted">Ключ распознан: ${r.n} ответов. Если число не совпадает с вопросами модуля, проверь, что вставил таблицу целиком.</p>` : '');
  }

  OFFICIAL_MODULES.forEach(paint);

  on(root, 'input', '.js-ans', (e) => {
    const mod = modOf(e.target);
    const answers = $$('.js-ans', e.target.closest('[data-mod]')).map((i) => i.value.trim());
    officialSave(test.id, mod.id, { answers });
  });
  on(root, 'click', '.js-check', (e) => {
    const mod = modOf(e.target);
    const key = $('.js-key', e.target.closest('[data-mod]')).value;
    if (!parseKey(key, mod.sentences).length) { toast('Ключ не распознан: вставь таблицу Answer Key из PDF.', 'error'); return; }
    officialSave(test.id, mod.id, { key });
    paint(mod);
  });
  on(root, 'click', '.js-timer', (e) => {
    const sec = e.target.dataset.sec;
    const pill = $(`.js-pill[data-sec="${sec}"]`, outlet);
    const t = timers[sec] ||= new Countdown(TIMES[sec], {
      onTick: (left, total) => timerPill(pill, left, total),
      onEnd: () => { toast(`${sec}: время вышло.`); e.target.disabled = true; },
    });
    if (t.running) { t.pause(); e.target.textContent = 'Продолжить'; } else { t.start(); e.target.textContent = 'Пауза'; }
  });
  $$('.js-pill', outlet).forEach((p) => timerPill(p, TIMES[p.dataset.sec], TIMES[p.dataset.sec]));

  return () => Object.values(timers).forEach((t) => t.stop());
}
