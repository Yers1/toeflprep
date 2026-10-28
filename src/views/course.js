// Writing course: module map, lessons (theory -> examples -> words -> exercises),
// a review queue of missed exercises and a 20-question test per module.

import { html, mount, raw, $, $$, on, shuffle, pct } from '../core/ui.js';
import { courseState, courseSaveLesson, courseMark, courseUnmark } from '../core/store.js';
import { speak, support } from '../core/audio.js';
import { todayIso } from '../core/planner.js';
import { isCorrect, sentenceText } from '../tasks/writing.js';
import { COURSE, PASS, LESSONS, lessonById, exercises, ALL_EXERCISES } from '../../content/course/index.js';

const EXAM_SIZE = 20;
const ZERO = new Set(['', '-', '—', '–', '0', 'x', 'nothing', 'no article', 'ничего']);

const low = (s) => String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim().replace(/[.!?]$/, '');
const tidy = (s) => String(s).replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();
const loose = (s) => String(s).toLowerCase().replace(/[^a-z0-9']+/g, ' ').trim();
const gapKey = (s) => (ZERO.has(low(s)) ? '—' : low(s));

// -> 'ok' | 'almost' (right words, wrong commas or capitals) | 'bad'
function check(ex, answer) {
  if (ex.type === 'choice') return answer === ex.answer ? 'ok' : 'bad';
  if (ex.type === 'order') return isCorrect(ex, answer) ? 'ok' : 'bad';
  if (ex.type === 'gap') return ex.a.map(gapKey).includes(gapKey(answer)) ? 'ok' : 'bad';
  if (ex.a.some((a) => tidy(a) === tidy(answer))) return 'ok';
  return ex.a.some((a) => loose(a) === loose(answer)) ? 'almost' : 'bad';
}

function solution(ex) {
  if (ex.type === 'choice') return ex.choices[ex.answer];
  if (ex.type === 'order') return sentenceText(ex, ex.tiles.map((_, k) => k));
  if (ex.type === 'gap') return ex.q.replace('___', ex.a[0] === '—' ? '(ничего)' : ex.a[0]);
  return ex.a[0];
}

function marked(text, word) {
  const i = text.toLowerCase().indexOf(word.toLowerCase());
  if (i < 0) return text;
  return html`${text.slice(0, i)}<mark>${text.slice(i, i + word.length)}</mark>${text.slice(i + word.length)}`;
}

const moduleOf = (id) => COURSE.find((m) => m.id === id);
const deckId = (m) => `course-${m.id}`;
const examId = (m) => `exam-${m.id}`;
const hasExam = (m) => m.id !== 'diagnostic' && m.lessons.reduce((s, l) => s + l.exercises.length, 0) >= EXAM_SIZE;

function dueReview() {
  const today = todayIso();
  const wrong = courseState().wrong;
  return ALL_EXERCISES.filter((ex) => wrong[ex.id] && wrong[ex.id].day < today);
}

function chip(id) {
  const st = courseState().lessons[id];
  if (!st) return html`<span class="chip">—</span>`;
  return html`<span class="chip ${st.done ? 'chip-good' : st.best >= 60 ? 'chip-mid' : 'chip-low'}">${st.done ? '✓ ' : ''}${st.best}%</span>`;
}

export default function course(outlet, params) {
  const id = params.lesson;
  if (!id) return showMap(outlet);
  if (id === 'review') return showRun(outlet, { title: 'Повторение ошибок', list: shuffle(dueReview()).slice(0, EXAM_SIZE) });
  if (id.startsWith('exam-')) {
    const m = moduleOf(id.slice(5));
    if (!m) return showMap(outlet);
    const pool = m.lessons.flatMap(exercises);
    return showRun(outlet, { title: `Контрольная: ${m.title}`, module: m, saveAs: id, list: shuffle(pool).slice(0, EXAM_SIZE) });
  }
  const lesson = lessonById(id);
  return lesson ? showLesson(outlet, lesson) : showMap(outlet);
}

// --------------------------------------------------------------- map --
function showMap(outlet) {
  const st = courseState().lessons;
  const done = LESSONS.filter((l) => st[l.id]?.done).length;
  const next = LESSONS.find((l) => !st[l.id]?.done);
  const due = dueReview().length;
  const waiting = Object.keys(courseState().wrong).length - due;

  mount(outlet, html`
    <section class="page narrow">
      <header class="page-head">
        <p class="eyebrow">Курс</p>
        <h1>Writing на 6</h1>
        <p class="lead">Грамматика, пунктуация, связки и стиль для Writing и Build a Sentence. В каждом уроке: правило, примеры, слова с примерами в настоящем ответе и упражнения с проверкой. Урок засчитан при ${PASS}%.</p>
      </header>
      <div class="card">
        <p><strong>${done} / ${LESSONS.length}</strong> уроков освоено</p>
        <span class="meter"><span style="width:${pct(done, LESSONS.length)}%"></span></span>
        <div class="row gap-s wrap course-cta">
          ${next ? html`<a class="btn btn-primary btn-lg" href="#/course/${next.id}">${done ? 'Продолжить' : 'Начать'}: ${next.title}</a>` : ''}
          ${due ? html`<a class="btn btn-ghost" href="#/course/review">Повторить ошибки (${due})</a>` : ''}
        </div>
        ${!due && waiting > 0 ? html`<p class="small muted">${waiting} ошибок ждут повторения с завтрашнего дня.</p>` : ''}
      </div>
      ${COURSE.map((m, n) => html`
        <section class="section-block">
          <div class="section-title"><h2>${n}. ${m.title}</h2></div>
          ${m.blurb ? html`<p class="muted">${m.blurb}</p>` : ''}
          ${m.lessons.length ? html`<ol class="lesson-list">${m.lessons.map((l) => html`
            <li><a href="#/course/${l.id}">${l.title}</a>${chip(l.id)}</li>`)}
          </ol>` : html`<p class="small muted">Скоро.</p>`}
          <div class="row gap-s wrap">
            ${m.lessons.some((l) => l.words?.length) ? html`<a class="btn btn-ghost" href="#/flashcards?deck=${deckId(m)}">Слова модуля</a>` : ''}
            ${hasExam(m) ? html`<a class="btn btn-ghost" href="#/course/${examId(m)}">Контрольная ${chip(examId(m))}</a>` : ''}
          </div>
        </section>`)}
    </section>`);
}

// ------------------------------------------------------------ lesson --
function showLesson(outlet, lesson) {
  const m = moduleOf(lesson.module);
  mount(outlet, html`
    <section class="page narrow lesson">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/course">Курс</a> <span>/</span> ${m.title}</nav>
      <header class="page-head">
        <h1>${lesson.title}</h1>
        ${lesson.why ? html`<p class="lead">${lesson.why}</p>` : ''}
      </header>
      ${lesson.theory?.length ? html`<section class="section-block"><h2>Правило</h2>
        <div class="card theory">${lesson.theory.map(theoryBlock)}</div></section>` : ''}
      ${lesson.examples?.length ? html`<section class="section-block"><h2>Ошибка → как правильно</h2>
        <ul class="fixes">${lesson.examples.map(([bad, good, why]) => html`<li><del>${bad}</del><br><ins>${good}</ins>${why ? html`<br><span class="small muted">${why}</span>` : ''}</li>`)}</ul></section>` : ''}
      ${lesson.words?.length ? html`<section class="section-block"><h2>Слова урока</h2>
        <div class="word-grid">${lesson.words.map(([w, ru, ex, use]) => html`
          <div class="card word-card">
            <p class="row between"><strong>${w}</strong>${support.tts ? html`<button type="button" class="btn btn-ghost btn-icon js-say" data-say="${w}" aria-label="Произнести">🔊</button>` : ''}</p>
            <p class="small muted">${ru}</p>
            <p>${marked(ex, w)}</p>
            <p class="word-use small">${marked(use, w)}</p>
          </div>`)}</div>
        <a class="btn btn-ghost" href="#/flashcards?deck=${deckId(m)}">Учить слова на карточках</a></section>` : ''}
      <section class="section-block"><h2>Упражнения</h2><div class="js-run"></div></section>
    </section>`);
  on(outlet, 'click', '.js-say', (e, b) => speak(b.dataset.say).catch(() => {}));
  return run($('.js-run', outlet), exercises(lesson), (results) => finishLesson(outlet, lesson, results));
}

function finishLesson(outlet, lesson, results) {
  const score = pct(results.filter((r) => r.ok).length, results.length);
  // The diagnostic counts as done after one attempt: it only points to weak modules.
  const diag = lesson.module === 'diagnostic';
  courseSaveLesson(lesson.id, score, diag ? 0 : PASS);
  const i = LESSONS.findIndex((l) => l.id === lesson.id);
  let next = LESSONS[i + 1];
  if (diag) {
    // Point the diagnostic's "Next" at the weakest module, not the next one in order.
    const rate = (tag) => { const r = results.filter((x) => x.tag === tag); return r.filter((x) => x.ok).length / r.length; };
    const weakest = [...new Set(results.map((r) => r.tag))].filter(moduleOf).sort((a, b) => rate(a) - rate(b))[0];
    if (weakest) next = moduleOf(weakest).lessons[0];
  }
  const box = $('.js-run', outlet);
  mount(box, html`
    ${banner(results)}
    ${tagReport(results)}
    <p>${diag ? 'Начни с самых слабых тем сверху или иди по курсу по порядку.' : score >= PASS ? 'Урок освоен.' : `Для зачёта нужно ${PASS}%. Перечитай правило и пройди ещё раз.`}</p>
    <div class="row gap-s wrap">
      ${(diag || score >= PASS) && next ? html`<a class="btn btn-primary" href="#/course/${next.id}">Дальше: ${next.title}</a>` : ''}
      ${diag ? '' : html`<a class="btn ${score >= PASS ? 'btn-ghost' : 'btn-primary'}" href="#/course/${lesson.id}?r=${Date.now()}">Ещё раз</a>`}
      <a class="btn btn-ghost" href="#/course">Курс</a>
    </div>`);
  box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --------------------------------------------------- review and exam --
function showRun(outlet, { title, list, module, saveAs }) {
  mount(outlet, html`
    <section class="page narrow">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/course">Курс</a> <span>/</span> ${title}</nav>
      <header class="page-head"><h1>${title}</h1></header>
      <div class="js-run"></div>
    </section>`);
  const box = $('.js-run', outlet);
  if (!list.length) {
    mount(box, html`<p class="muted">Сейчас повторять нечего. Ошибки появляются здесь на следующий день после урока.</p><a class="btn btn-ghost" href="#/course">Курс</a>`);
    return;
  }
  return run(box, list, (results) => {
    if (saveAs) courseSaveLesson(saveAs, pct(results.filter((r) => r.ok).length, results.length), PASS);
    mount(box, html`${banner(results)}${tagReport(results)}
      <div class="row gap-s wrap">
        ${module ? html`<a class="btn btn-primary" href="#/course/${saveAs}?r=${Date.now()}">Ещё раз</a>` : ''}
        <a class="btn ${module ? 'btn-ghost' : 'btn-primary'}" href="#/course">Курс</a>
      </div>`);
  });
}

// Theory strings are plain HTML; give the long ones structure: a leading bold title
// becomes a heading, <br> lines and inline (1) (2) … become lists, and a model text
// after <br><br> gets its own block.
function theoryBlock(p) {
  const m = p.match(/^<strong>([^<]*[.:])<\/strong>\s*/);
  const [body, model] = (m ? p.slice(m[0].length) : p).split('<br><br>');
  let main;
  if (body.includes('<br>')) {
    const lines = body.split('<br>').filter((x) => x.trim());
    const intro = /:\s*$/.test(lines[0]) ? lines.shift() : '';
    main = html`${intro ? html`<p>${raw(intro)}</p>` : ''}<ul class="theory-lines">${lines.map((x) => html`<li>${raw(x)}</li>`)}</ul>`;
  } else if (!model && body.includes('(1)')) {
    const [intro, ...items] = body.split(/\s*\(\d\)\s*/);
    let tail = '';
    const cut = items.at(-1).indexOf('. ');
    if (cut > 0) { tail = items.at(-1).slice(cut + 2); items[items.length - 1] = items.at(-1).slice(0, cut + 1); }
    main = html`${intro ? html`<p>${raw(intro)}</p>` : ''}<ol>${items.map((x) => html`<li>${raw(x.replace(/;\s*$/, ''))}</li>`)}</ol>${tail ? html`<p>${raw(tail)}</p>` : ''}`;
  } else if (m?.[1].endsWith(':') && body.includes('; ')) {
    main = html`<ul>${body.split(/;\s+/).map((x) => html`<li>${raw(x)}</li>`)}</ul>`;
  } else main = html`<p>${raw(body)}</p>`;
  return html`<div class="theory-item">${m ? html`<h3>${m[1].replace(/[.:]$/, '')}</h3>` : ''}${main}${model ? html`<div class="theory-model">${raw(model)}</div>` : ''}</div>`;
}

function banner(results) {
  const ok = results.filter((r) => r.ok).length;
  const p = pct(ok, results.length);
  return html`<div class="result-banner ${p >= PASS ? 'good' : p >= 60 ? 'mid' : 'low'}"><strong>${ok} / ${results.length}</strong><span>${p}%</span></div>`;
}

// Diagnostic exercises carry a module tag: show which modules are weakest.
function tagReport(results) {
  const by = {};
  results.filter((r) => r.tag).forEach((r) => { (by[r.tag] ||= []).push(r.ok); });
  const rows = Object.entries(by).map(([tag, oks]) => ({ m: moduleOf(tag), ok: oks.filter(Boolean).length, n: oks.length }))
    .filter((r) => r.m).sort((a, b) => a.ok / a.n - b.ok / b.n);
  if (!rows.length) return '';
  return html`<h3>По темам, слабые сверху</h3><ol class="lesson-list">${rows.map((r) => html`
    <li><a href="#/course/${r.m.lessons[0]?.id || ''}">${r.m.title}</a><span class="chip ${r.ok / r.n >= 0.85 ? 'chip-good' : r.ok / r.n >= 0.6 ? 'chip-mid' : 'chip-low'}">${r.ok} / ${r.n}</span></li>`)}</ol>`;
}

// ------------------------------------------------------------ runner --
function run(root, list, onFinish) {
  const today = todayIso();
  const results = [];
  let i = 0, checked = false, order = [], bank = [];

  function view() {
    const ex = list[i];
    checked = false;
    order = [];
    if (ex.type === 'order') bank = shuffle([...ex.tiles, ...(ex.distractor ? [ex.distractor] : [])].map((_, k) => k));
    mount(root, html`
      <div class="card ex-card">
        <p class="row between small muted"><span>${i + 1} / ${list.length}</span><span>${{ gap: 'Вставь', choice: 'Выбери', fix: 'Исправь ошибку', order: 'Собери предложение' }[ex.type]}</span></p>
        <div class="js-body">${body(ex)}</div>
        <div class="js-fb"></div>
        <div class="row end"><button type="button" class="btn btn-primary js-go">Проверить</button></div>
      </div>`);
    $('.ex-gap, .ex-fix', root)?.focus();
  }

  function body(ex) {
    if (ex.type === 'gap') {
      const [a, b] = ex.q.split('___');
      return html`<p class="ex-q">${a}<input class="ex-gap" aria-label="Пропуск" autocomplete="off" autocapitalize="off" spellcheck="false">${b}</p><p class="small muted">Если слово не нужно, оставь пустым или поставь «-».</p>`;
    }
    if (ex.type === 'choice') {
      return html`<p class="ex-q">${ex.q}</p><div class="ex-choices">${ex.choices.map((c, k) => html`<button type="button" class="ex-choice" data-k="${k}"><span class="muted">${k + 1}</span> ${c}</button>`)}</div>`;
    }
    if (ex.type === 'fix') {
      return html`<p class="ex-q"><del>${ex.q}</del></p><textarea class="ex-fix" rows="3" aria-label="Исправленное предложение" spellcheck="false">${ex.q}</textarea>`;
    }
    return orderView(ex);
  }

  function orderView(ex) {
    const list2 = [...ex.tiles, ...(ex.distractor ? [ex.distractor] : [])];
    return html`
      ${ex.context ? html`<p class="ex-q">${ex.context}</p>` : ''}
      <p class="build-line">
        ${ex.prefix ? html`<span class="given">${ex.prefix}</span>` : ''}
        ${ex.tiles.map((_, s) => (order[s] == null
          ? html`<span class="slot"></span>`
          : html`<button type="button" class="slot filled" data-slot="${s}">${list2[order[s]]}</button>`))}
        ${ex.suffix ? html`<span class="given">${ex.suffix}</span>` : ''}
      </p>
      <div class="tile-bank">${bank.map((t) => html`<button type="button" class="tile" data-tile="${t}" ${order.includes(t) ? 'disabled' : ''}>${list2[t]}</button>`)}</div>
      ${ex.distractor ? html`<p class="small muted">Одна плитка лишняя.</p>` : ''}`;
  }

  function answerOf(ex) {
    if (ex.type === 'gap') return $('.ex-gap', root).value;
    if (ex.type === 'fix') return $('.ex-fix', root).value;
    if (ex.type === 'order') return order.slice();
    return null;
  }

  function grade(answer) {
    const ex = list[i];
    const verdict = check(ex, answer);
    const ok = verdict === 'ok';
    checked = true;
    results.push({ id: ex.id, ok, tag: ex.tag });
    courseMark(ex.id, ok, today);
    $$('input, textarea, .ex-choice, .tile, .slot', root).forEach((el) => { el.disabled = true; });
    if (ex.type === 'choice') {
      $(`.ex-choice[data-k="${ex.answer}"]`, root).classList.add('is-right');
      if (!ok) $(`.ex-choice[data-k="${answer}"]`, root)?.classList.add('is-wrong');
    }
    mount($('.js-fb', root), html`
      <p class="ex-verdict ${ok ? 'ok' : 'bad'}">${ok ? '✓ Верно' : verdict === 'almost' ? '✗ Почти: слова верные, проверь запятые, точки и заглавные' : '✗ Неверно'}</p>
      ${ok && ex.type !== 'fix' ? '' : html`<p class="answer-line">Правильно: <strong>${solution(ex)}</strong></p>`}
      ${ex.why ? html`<p class="explain">${ex.why}</p>` : ''}
      ${!ok && ex.type === 'fix' ? html`<button type="button" class="btn btn-ghost js-mine">Мой вариант тоже верный</button>` : ''}`);
    const go = $('.js-go', root);
    go.textContent = i + 1 < list.length ? 'Дальше' : 'Результат';
    go.focus();
  }

  function advance() {
    if (!checked) {
      const ex = list[i];
      if (ex.type === 'choice') return;
      if (ex.type === 'order' && order.length < ex.tiles.length) return;
      return grade(answerOf(ex));
    }
    if (++i < list.length) view();
    else onFinish(results);
  }

  root.addEventListener('click', (e) => {
    if (e.target.closest('.js-go')) return advance();
    if (e.target.closest('.js-mine')) {
      results.at(-1).ok = true;
      courseUnmark(results.at(-1).id);
      mount($('.ex-verdict', root), '✓ Засчитано как верное');
      $('.ex-verdict', root).className = 'ex-verdict ok';
      return e.target.closest('.js-mine').remove();
    }
    const ex = list[i];
    if (checked) return;
    const choice = e.target.closest('.ex-choice');
    if (choice) return grade(Number(choice.dataset.k));
    const tile = e.target.closest('.tile');
    const slot = e.target.closest('.slot.filled');
    if (tile && !tile.disabled && order.length < ex.tiles.length) order.push(Number(tile.dataset.tile));
    else if (slot) order.splice(Number(slot.dataset.slot), 1);
    else return;
    mount($('.js-body', root), orderView(ex));
  });

  function onKey(e) {
    if (!root.isConnected) return;
    const ex = list[i];
    if (!checked && ex?.type === 'choice' && ['1', '2', '3', '4'].includes(e.key)) return grade(Number(e.key) - 1);
    // A focused button already turns Enter into a click.
    if (e.key === 'Enter' && !e.shiftKey && !e.target.closest('button') && (checked || e.target.closest('.ex-gap, .ex-fix'))) {
      e.preventDefault();
      advance();
    }
  }
  document.addEventListener('keydown', onKey);
  view();
  return () => document.removeEventListener('keydown', onKey);
}
