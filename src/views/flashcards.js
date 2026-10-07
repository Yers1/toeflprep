// Spaced-repetition flashcards (Leitner system) for TOEFL vocabulary.

import { html, mount, $, $$, shuffle } from '../core/ui.js';
import { cardState, gradeCard, customCards, addCustomCard } from '../core/store.js';
import { speak, support } from '../core/audio.js';
import { VOCAB, DECKS } from '../../content/vocab.js';

const NEW_PER_SESSION = 10;
const SESSION_MAX = 20;
const BOX_LABELS = ['<1 day', '1 day', '3 days', '1 week', '16 days', '5 weeks'];

function poolFor(deckId) {
  const all = [...VOCAB, ...customCards()];
  return deckId && deckId !== 'all' ? all.filter((c) => c.deck === deckId) : all;
}

const modeOf = (card) => DECKS.find((d) => d.id === card.deck)?.mode || '';
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9']+/g, ' ').trim();

function split(deckId) {
  const now = Date.now();
  const due = [], fresh = [];
  for (const c of poolFor(deckId)) {
    const st = cardState(c.id);
    if (!st) fresh.push(c);
    else if (st.due <= now) due.push(c);
  }
  return { due, fresh };
}

function deckStats(deckId) {
  const now = Date.now();
  let due = 0, neu = 0, learned = 0;
  const pool = poolFor(deckId);
  for (const c of pool) {
    const st = cardState(c.id);
    if (!st) neu++;
    else if (st.box >= 4) learned++;
    else if (st.due <= now) due++;
  }
  return { total: pool.length, due, neu, learned };
}

export default function flashcards(outlet, params, query) {
  const deckId = query.deck || '';
  if (!deckId) return showDecks(outlet);
  return showSession(outlet, deckId);
}

function showDecks(outlet) {
  const totalDue = DECKS.reduce((s, d) => s + deckStats(d.id).due, 0);
  mount(outlet, html`
    <section class="page narrow">
      <header class="page-head">
        <p class="eyebrow">Vocabulary</p>
        <h1>Flashcards</h1>
        <p class="muted">Spaced-repetition practice for words that show up in TOEFL reading, listening, writing and speaking passages.</p>
      </header>
      ${totalDue ? html`<a class="btn btn-primary btn-lg" href="#/flashcards?deck=all">Review ${totalDue} due card${totalDue === 1 ? '' : 's'}</a>` : ''}
      <div class="deck-grid section-block">
        ${DECKS.map((d) => {
          const s = deckStats(d.id);
          return html`<a class="feature deck-card" href="#/flashcards?deck=${d.id}">
            <h3>${d.name}</h3>
            <p>${d.blurb}</p>
            <p class="deck-counts small"><span>${s.due} due</span><span>${s.neu} new</span><span>${s.learned} learned</span></p>
          </a>`;
        })}
      </div>
      <form class="section-block add-card">
        <h2>Add a word from the books</h2>
        <p class="muted small">It goes into “My words”: you will see the meaning and have to produce the English.</p>
        <div class="row gap-s wrap">
          <input name="word" required placeholder="English word or phrase" aria-label="English word or phrase">
          <input name="ru" required placeholder="Meaning (RU)" aria-label="Meaning">
          <input name="ex" placeholder="Example sentence (optional)" aria-label="Example sentence">
          <button class="btn btn-primary">Add</button>
        </div>
      </form>
    </section>`);
  $('.add-card', outlet).addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    addCustomCard({ word: f.get('word').trim(), ru: f.get('ru').trim(), ex: f.get('ex').trim() });
    showDecks(outlet);
    $('.add-card input', outlet).focus();
  });
}

function showSession(outlet, deckId) {
  const deck = DECKS.find((d) => d.id === deckId);
  if (deckId !== 'all' && !deck) { showDecks(outlet); return; }
  const { due, fresh } = split(deckId);
  const queue = shuffle(due).slice(0, SESSION_MAX);
  if (queue.length < SESSION_MAX) queue.push(...shuffle(fresh).slice(0, Math.min(NEW_PER_SESSION, SESSION_MAX - queue.length)));

  const title = deck ? deck.name : 'All decks';
  if (!queue.length) {
    mount(outlet, html`
      <section class="page narrow">
        <header class="page-head"><p class="eyebrow">Flashcards</p><h1>${title}</h1></header>
        <p class="muted">Nothing due right now. Come back later, or pick another deck.</p>
        <a class="btn btn-ghost" href="#/flashcards">Back to decks</a>
      </section>`);
    return;
  }

  let i = 0;
  let flipped = false;
  let typed = '';
  const stats = { reviewed: 0, promoted: 0 };

  function flip() {
    if (!queue[i]) return;
    if (!flipped) typed = $('.fc-answer', outlet)?.value.trim() ?? typed;
    flipped = !flipped;
    render();
  }

  function grade(g) {
    const card = queue[i];
    if (!card) return;
    const before = cardState(card.id)?.box ?? -1;
    const after = gradeCard(card.id, g);
    if (after.box > before) stats.promoted++;
    stats.reviewed++;
    i++;
    flipped = false;
    typed = '';
    render();
  }

  function onKey(e) {
    if (e.target.closest('input, textarea, select')) return;
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
    else if (flipped && ['1', '2', '3', '4'].includes(e.key)) grade(['again', 'hard', 'good', 'easy'][Number(e.key) - 1]);
  }
  document.addEventListener('keydown', onKey);

  function nextLabel(delta) {
    const cur = i < queue.length ? (cardState(queue[i].id)?.box ?? -1) : -1;
    return BOX_LABELS[Math.max(0, Math.min(BOX_LABELS.length - 1, cur + delta))];
  }

  function render() {
    if (i >= queue.length) return renderEnd();
    const card = queue[i];
    const mode = modeOf(card);
    const answer = mode === 'fix' ? card.def : card.word;
    const ok = typed && norm(typed) === norm(answer);
    const speakBtn = support.tts ? html`<button type="button" class="btn btn-ghost btn-icon js-speak" aria-label="Play pronunciation">🔊</button>` : '';
    const you = typed ? html`<p class="fc-you small ${ok ? 'ok' : 'muted'}">${ok ? '✓ ' : 'You: '}${typed}</p>` : '';
    mount(outlet, html`
      <section class="page narrow flash-session">
        <div class="row between small muted"><span>${title}</span><span>${i + 1} / ${queue.length}</span></div>
        <div class="flashcard ${flipped ? 'is-flipped' : ''}" role="button" tabindex="0" aria-label="${flipped ? 'Card back' : 'Card front, tap to flip'}">
          ${mode && !flipped ? html`
            <p class="fc-pos small muted">${card.pos}</p>
            <p class="fc-sent">${mode === 'fix' ? card.word : card.ru}</p>
            ${mode === 'produce' && card.def ? html`<p class="muted">${card.def}</p>` : ''}
            <p class="small muted">${mode === 'fix' ? 'Type the correct sentence below, then press Enter' : 'Type it in English below, then press Enter'}</p>
          ` : mode === 'fix' ? html`
            <p class="fc-pos small muted">${card.pos}</p>
            ${you}
            <p class="fc-sent">${card.def}</p>
            ${speakBtn}
            <p class="fc-example">${card.ex}</p>
            <p class="fc-ru muted small">${card.ru}</p>
          ` : mode === 'produce' ? html`
            ${you}
            <p class="fc-word fc-word-s">${card.word}</p>
            ${speakBtn}
            ${card.ex ? html`<p class="fc-example muted">${card.ex}</p>` : ''}
            <p class="fc-ru muted small">${card.ru}</p>
          ` : !flipped ? html`
            <p class="fc-pos small muted">${card.pos}</p>
            <p class="fc-word">${card.word}</p>
            ${speakBtn}
            <p class="small muted">Tap the card, or press space, to flip</p>
          ` : html`
            <p class="fc-word fc-word-s">${card.word}</p>
            <p>${card.def}</p>
            <p class="fc-example muted">${card.ex}</p>
            <button type="button" class="btn btn-ghost js-translate">Show translation</button>
            <p class="fc-ru muted small" hidden>${card.ru}</p>
          `}
        </div>
        ${mode && !flipped ? html`<textarea class="fc-answer" rows="2" aria-label="Your answer" placeholder="Your answer…">${typed}</textarea>` : ''}
        ${flipped ? html`
          <div class="row gap-s wrap grade-row">
            <button type="button" class="btn btn-ghost js-grade" data-grade="again">Again <span class="small muted">${BOX_LABELS[0]}</span></button>
            <button type="button" class="btn btn-ghost js-grade" data-grade="hard">Hard <span class="small muted">${nextLabel(0)}</span></button>
            <button type="button" class="btn btn-ghost js-grade" data-grade="good">Good <span class="small muted">${nextLabel(1)}</span></button>
            <button type="button" class="btn btn-primary js-grade" data-grade="easy">Easy <span class="small muted">${nextLabel(2)}</span></button>
          </div>` : ''}
      </section>`);

    $('.flashcard', outlet).addEventListener('click', (e) => { if (!e.target.closest('button')) flip(); });
    $('.js-speak', outlet)?.addEventListener('click', (e) => { e.stopPropagation(); speak(answer).catch(() => {}); });
    const box = $('.fc-answer', outlet);
    box?.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); flip(); } });
    box?.focus();
    $('.js-translate', outlet)?.addEventListener('click', (e) => { e.stopPropagation(); $('.fc-ru', outlet).hidden = false; e.currentTarget.remove(); });
    $$('.js-grade', outlet).forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); grade(b.dataset.grade); }));
  }

  function renderEnd() {
    mount(outlet, html`
      <section class="page narrow">
        <header class="page-head"><p class="eyebrow">Flashcards</p><h1>Session done</h1></header>
        <p>${stats.reviewed} card${stats.reviewed === 1 ? '' : 's'} reviewed, ${stats.promoted} moved up a box.</p>
        <div class="row gap-s wrap">
          <a class="btn btn-primary" href="#/flashcards?deck=${deckId}">Another round</a>
          <a class="btn btn-ghost" href="#/flashcards">Back to decks</a>
        </div>
      </section>`);
  }

  render();
  return () => document.removeEventListener('keydown', onKey);
}
