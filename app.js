'use strict';

// ================= ДАННЫЕ =================
// bank/bank.js (window.TP_BANK) генерируется tools/bank_to_js.py из bank/*.jsonl.
// Здесь — запасной минимум на случай отсутствия банка. Все вопросы оригинальные.
const FALLBACK = {
  speaking_interview: [
    { topic: 'Technology in education', questions: [
      'Do you think technology has made learning easier? Why or why not?',
      'Describe an app or tool that genuinely helped you study.',
      'Some students use AI to write their essays. Do you see a problem with that?',
      'How do you think classrooms will look in ten years?',
    ]},
    { topic: 'Teamwork and leadership', questions: [
      'Do you prefer working alone or in a team? Why?',
      'Describe a successful team project you were part of.',
      'What qualities make a good team leader?',
      'Tell me about a time you helped resolve a disagreement in a group.',
    ]},
    { topic: 'Travel and culture', questions: [
      'Do you like traveling? Why or why not?',
      'Describe a place you visited that surprised you.',
      'Is it better to travel with friends or with family? Why?',
      'What can travelers learn from visiting another culture?',
    ]},
  ],
  speaking_repeat: [
    { sentence: 'The library on campus stays open until midnight during finals.' },
    { sentence: 'I registered for the biology seminar because it fits my schedule.' },
    { sentence: 'Could you pick up my mail while I am away this weekend?' },
    { sentence: 'The professor postponed the lecture because of the conference.' },
    { sentence: 'If the bus does not come soon, we will miss the first class.' },
  ],
  writing_email: [
    { scenario: 'You cannot attend next week\'s study group because of a family event.',
      recipient: 'your study group leader, Mark',
      points: ['apologize for missing the meeting', 'explain the reason', 'ask for the notes or a summary'] },
    { scenario: 'The air conditioning in your dorm room has been broken for three days.',
      recipient: 'the dormitory manager',
      points: ['describe the problem', 'say how it affects your studies', 'request a repair date'] },
  ],
  writing_sentence: [
    { sentence: 'The students submitted their research papers before the deadline on Friday.' },
    { sentence: 'She has been studying at the library every evening this semester.' },
    { sentence: 'Our professor asked us to revise the first chapter of the report.' },
    { sentence: 'The new cafeteria offers cheaper meals than the one near the dormitory.' },
    { sentence: 'If it rains tomorrow, the football match will be moved indoors.' },
  ],
};

const BANK = {};
for (const k of Object.keys(FALLBACK)) {
  const extra = window.TP_BANK && window.TP_BANK[k];
  BANK[k] = extra && extra.length ? extra : FALLBACK[k];
}

// ================= LLM (BYOK, бэкенда нет) =================
const OPENAI_COMPAT = {
  openai:   { url: 'https://api.openai.com/v1/chat/completions', model: 'gpt-4o-mini' },
  deepseek: { url: 'https://api.deepseek.com/v1/chat/completions', model: 'deepseek-chat' },
  gemini:   { url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', model: 'gemini-2.5-flash' },
  github:   { url: 'https://models.github.ai/inference/chat/completions', model: 'openai/gpt-4o-mini' },
};

function getSettings() {
  return {
    provider: localStorage.getItem('tp_provider') || 'github',
    key: localStorage.getItem('tp_key') || '',
  };
}

async function callLLM(prompt, maxTokens) {
  const s = getSettings();
  if (!s.key) throw new Error('нет API-ключа — введите в настройках выше');
  const p = OPENAI_COMPAT[s.provider];
  if (p) {
    const r = await fetch(p.url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: 'Bearer ' + s.key },
      body: JSON.stringify({
        model: p.model,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        max_tokens: maxTokens || 600,
      }),
    });
    if (!r.ok) throw new Error(s.provider + ' ' + r.status);
    const j = await r.json();
    return j.choices[0].message.content;
  }
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': s.key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens || 600,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!r.ok) throw new Error('anthropic ' + r.status);
  const j = await r.json();
  return j.content.map((b) => b.text || '').join('');
}

function parseGrade(raw) {
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('модель вернула не-JSON');
  const v = JSON.parse(m[0]);
  return {
    band: Math.max(1, Math.min(6, Number(v.band) || 1)),
    strengths: String(v.strengths || ''),
    issues: String(v.issues || ''),
    sample: String(v.sample_answer || ''),
  };
}

function renderGrade(el, v) {
  el.innerHTML =
    '<div class="band">' + v.band.toFixed(1) + ' / 6</div>' +
    '<p><b>Сильное:</b> ' + v.strengths + '</p>' +
    '<p><b>Что чинить:</b> ' + v.issues + '</p>' +
    '<p><b>Band-6 вариант:</b> ' + v.sample + '</p>';
}

// ================= Речь (запись + TTS) =================
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null, recording = false, finalTranscript = '', timerInt = null;

function startRec(onLive, onEnd, timerEl) {
  if (!SR) {
    alert('Нужен Chrome: распознавание речи не поддерживается');
    return false;
  }
  rec = new SR();
  rec.lang = 'en-US';
  rec.continuous = true;
  rec.interimResults = true;
  finalTranscript = '';
  rec.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i];
      if (r.isFinal) finalTranscript += r[0].transcript + ' ';
      else interim += r[0].transcript;
    }
    onLive((finalTranscript + interim).trim());
  };
  rec.onend = () => {
    if (recording) {
      recording = false;
      clearInterval(timerInt);
      onEnd(finalTranscript.trim());
    }
  };
  rec.start();
  recording = true;
  const t0 = Date.now();
  timerInt = setInterval(() => {
    if (timerEl) timerEl.textContent = Math.round((Date.now() - t0) / 1000) + ' сек';
  }, 500);
  return true;
}

function stopRec() {
  recording = false;
  if (rec) rec.stop();
}

function speak(text, onend) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.95;
  const v = speechSynthesis.getVoices().find((x) => x.lang && x.lang.startsWith('en'));
  if (v) u.voice = v;
  if (onend) u.onend = onend;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// ================= История =================
function saveHistory(entry) {
  const log = JSON.parse(localStorage.getItem('tp_log') || '[]');
  log.unshift({ ts: new Date().toISOString().slice(0, 16), ...entry });
  localStorage.setItem('tp_log', JSON.stringify(log.slice(0, 200)));
}

function renderHistory() {
  const log = JSON.parse(localStorage.getItem('tp_log') || '[]');
  $('history').innerHTML = log.length
    ? '<h2>История</h2>' + log.map((e) =>
        '<div class="row"><b>' + e.score + '</b> · ' + e.mode + ' · ' + e.ts +
        (e.detail ? ' · ' + e.detail : '') + '</div>'
      ).join('')
    : '';
}

// ================= Утилиты =================
const $ = (id) => document.getElementById(id);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function normWords(s) {
  return s.toLowerCase().replace(/[^a-z0-9'\s]/g, ' ').split(/\s+/).filter(Boolean);
}

function lcsLen(a, b) {
  const m = a.length, n = b.length;
  let prev = new Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    const cur = new Array(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]);
    }
    prev = cur;
  }
  return prev[n];
}

// ================= Режим 1: Interview =================
let currentQ = null;

function initInterview() {
  BANK.speaking_interview.forEach((t, i) => {
    const o = document.createElement('option');
    o.value = i;
    o.textContent = t.topic;
    $('topic').appendChild(o);
  });
  $('newQ').onclick = () => {
    const t = BANK.speaking_interview[Number($('topic').value)];
    currentQ = { topic: t.topic, q: pick(t.questions) };
    $('question').textContent = currentQ.q;
    $('live').textContent = '';
    $('feedback').innerHTML = '';
    $('gradeBtn').disabled = true;
  };
  $('recBtn').onclick = () => {
    if (recording) { stopRec(); return; }
    const ok = startRec(
      (text) => { $('live').textContent = text; },
      (text) => {
        $('recBtn').textContent = '● Записать ответ';
        $('recTimer').textContent = '';
        $('live').textContent = text;
        $('gradeBtn').disabled = !text;
      },
      $('recTimer')
    );
    if (ok) $('recBtn').textContent = '■ Стоп';
  };
  $('gradeBtn').onclick = async () => {
    if (!currentQ) return;
    const text = $('live').textContent.trim();
    if (!text) return;
    $('feedback').textContent = 'Оцениваю…';
    const prompt = [
      'You are a certified rater for the NEW TOEFL iBT (January 2026 format), Speaking section, task "Take an Interview".',
      'Score the spoken answer on the 1-6 band scale (half bands allowed, CEFR-aligned), like ETS raters:',
      'delivery (fluency, intelligibility), language use (grammar range and accuracy, vocabulary), topic development (relevance, detail, coherence).',
      'Answers under ~15 words cap at band 3.',
      'Question: "' + currentQ.q + '"',
      'Transcript of the spoken answer:', '"""', text, '"""',
      'Return STRICT JSON only:',
      '{"band":4.5,"strengths":"one short paragraph","issues":"one short paragraph","sample_answer":"a band-6 version, 3-4 sentences"}',
    ].join('\n');
    try {
      const v = parseGrade(await callLLM(prompt));
      renderGrade($('feedback'), v);
      saveHistory({ mode: 'interview', score: v.band.toFixed(1), detail: currentQ.topic });
      renderHistory();
    } catch (e) {
      $('feedback').textContent = 'Ошибка: ' + ((e && e.message) || e);
    }
  };
}

// ================= Режим 2: Listen & Repeat =================
let repItem = null;

function initRepeat() {
  $('repNew').onclick = () => {
    repItem = pick(BANK.speaking_repeat);
    $('repPlay').disabled = false;
    $('repRec').disabled = false;
    $('repLive').textContent = '';
    $('repResult').innerHTML = '<span class="hint">Предложение загружено. Слушай.</span>';
  };
  $('repPlay').onclick = () => {
    if (repItem) speak(repItem.sentence);
  };
  $('repRec').onclick = () => {
    if (!repItem) return;
    if (recording) { stopRec(); return; }
    const ok = startRec(
      (text) => { $('repLive').textContent = text; },
      (text) => {
        $('repRec').textContent = '● Повторить';
        $('repTimer').textContent = '';
        scoreRepeat(repItem.sentence, text);
      },
      $('repTimer')
    );
    if (ok) $('repRec').textContent = '■ Стоп';
  };
}

function scoreRepeat(target, said) {
  // ponytail: сходство по LCS слов, без LLM — повтор дословный, метрика объективная.
  // Калибровка бэндов приблизительная, сверить со спецификацией ETS.
  if (!said) {
    $('repResult').innerHTML = '<span class="bad">Ничего не распознано. Попробуй ещё раз.</span>';
    return;
  }
  const a = normWords(target), b = normWords(said);
  const match = (2 * lcsLen(a, b)) / (a.length + b.length);
  const pct = Math.round(match * 100);
  const band = pct >= 95 ? 6 : pct >= 90 ? 5.5 : pct >= 85 ? 5 : pct >= 75 ? 4.5
    : pct >= 65 ? 4 : pct >= 50 ? 3.5 : pct >= 35 ? 3 : 2;
  const missed = a.filter((w) => !b.includes(w));
  $('repResult').innerHTML =
    '<div class="band">' + pct + '% · ~' + band.toFixed(1) + ' / 6</div>' +
    '<p><b>Оригинал:</b> ' + target + '</p>' +
    (missed.length ? '<p><b>Потерянные слова:</b> ' + missed.join(', ') + '</p>' : '<p class="ok">Все слова на месте.</p>');
  saveHistory({ mode: 'repeat', score: pct + '%', detail: '~' + band.toFixed(1) });
  renderHistory();
}

// ================= Режим 3: Write an Email =================
let emItem = null;

function initEmail() {
  $('emNew').onclick = () => {
    emItem = pick(BANK.writing_email);
    $('emScenario').innerHTML =
      '<b>Ситуация:</b> ' + emItem.scenario + '<br><b>Кому:</b> ' + emItem.recipient +
      '<br><b>Нужно покрыть:</b> ' + emItem.points.join(' · ');
    $('emFb').innerHTML = '';
  };
  $('emGrade').onclick = async () => {
    if (!emItem) return;
    const text = $('emText').value.trim();
    if (text.split(/\s+/).length < 20) {
      $('emFb').textContent = 'Напиши письмо (минимум ~20 слов, цель 80–120).';
      return;
    }
    $('emFb').textContent = 'Оцениваю…';
    const prompt = [
      'You are a certified rater for the NEW TOEFL iBT (January 2026 format), Writing task "Write an Email".',
      'Scenario: ' + emItem.scenario,
      'Recipient: ' + emItem.recipient,
      'Required points: ' + emItem.points.join('; '),
      'Student email:', '"""', text, '"""',
      'Score 1-6 (half bands): task achievement (all required points covered, appropriate tone and format),',
      'organization, grammar range/accuracy, vocabulary.',
      'Return STRICT JSON only:',
      '{"band":5,"strengths":"one short paragraph","issues":"one short paragraph","sample_answer":"a band-6 email, 80-120 words"}',
    ].join('\n');
    try {
      const v = parseGrade(await callLLM(prompt, 900));
      renderGrade($('emFb'), v);
      saveHistory({ mode: 'email', score: v.band.toFixed(1), detail: text.split(/\s+/).length + ' слов' });
      renderHistory();
    } catch (e) {
      $('emFb').textContent = 'Ошибка: ' + ((e && e.message) || e);
    }
  };
}

// ================= Режим 4: Build a Sentence =================
let bsItem = null, bsPicked = [];

function initSentence() {
  $('bsNew').onclick = () => {
    bsItem = pick(BANK.writing_sentence);
    bsPicked = [];
    const words = bsItem.sentence.replace(/[.!?]+$/, '').split(/\s+/);
    let shuffled = words.slice();
    do {
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
    } while (shuffled.join(' ') === words.join(' ') && words.length > 1);
    const chips = $('bsChips');
    chips.innerHTML = '';
    shuffled.forEach((w, idx) => {
      const b = document.createElement('button');
      b.className = 'chip';
      b.textContent = w;
      b.onclick = () => {
        bsPicked.push({ w, idx });
        b.disabled = true;
        renderBsAnswer();
      };
      chips.appendChild(b);
    });
    $('bsResult').innerHTML = '';
    renderBsAnswer();
  };
  $('bsCheck').onclick = () => {
    if (!bsItem) return;
    const attempt = bsPicked.map((x) => x.w).join(' ');
    const ok = normWords(attempt).join(' ') === normWords(bsItem.sentence).join(' ');
    $('bsResult').innerHTML = ok
      ? '<p class="ok">Верно! ' + bsItem.sentence + '</p>'
      : '<p class="bad">Пока нет.</p><p><b>Оригинал:</b> ' + bsItem.sentence + '</p>';
    saveHistory({ mode: 'sentence', score: ok ? '✓' : '✗', detail: '' });
    renderHistory();
  };
}

function renderBsAnswer() {
  const box = $('bsAnswer');
  box.innerHTML = '';
  bsPicked.forEach((x, i) => {
    const b = document.createElement('button');
    b.className = 'chip';
    b.textContent = x.w;
    b.onclick = () => {
      bsPicked.splice(i, 1);
      [...$('bsChips').children][x.idx].disabled = false;
      renderBsAnswer();
    };
    box.appendChild(b);
  });
}

// ================= Запуск =================
function init() {
  $('provider').value = getSettings().provider;
  $('key').value = getSettings().key;
  $('saveKey').onclick = () => {
    localStorage.setItem('tp_provider', $('provider').value);
    localStorage.setItem('tp_key', $('key').value.trim());
    $('keyMsg').textContent = 'Сохранено.';
  };

  document.querySelectorAll('#tabs button').forEach((b) => {
    b.onclick = () => {
      document.querySelectorAll('#tabs button').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      document.querySelectorAll('main > section').forEach((s) => { s.style.display = 'none'; });
      $('mode-' + b.dataset.mode).style.display = 'block';
    };
  });

  initInterview();
  initRepeat();
  initEmail();
  initSentence();
  renderHistory();
}

init();
