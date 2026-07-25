'use strict';

// ---------- Банк вопросов: оригинальные, под тип "Take an Interview" (TOEFL 2026) ----------
// ponytail: вопросы наши, не из книг — ноль проблем с авторскими правами.
const BANK = [
  { topic: 'Technology in education', questions: [
    'Do you think technology has made learning easier? Why or why not?',
    'Describe an app or tool that genuinely helped you study.',
    'Some students use AI to write their essays. Do you see a problem with that?',
    'How do you think classrooms will look in ten years?',
  ]},
  { topic: 'Hometown and community', questions: [
    'What do you like most about the place where you grew up?',
    'Describe a place in your city that young people enjoy visiting.',
    'If you could improve one thing in your community, what would it be?',
    'Do you prefer living in a big city or a small town? Why?',
  ]},
  { topic: 'Reading and learning habits', questions: [
    'Do you enjoy reading in your free time? Why or why not?',
    'Describe a book or article that influenced the way you think.',
    'Is it better to learn from books or from experience? Why?',
    'How do you usually prepare for an important exam?',
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
];

// ---------- LLM (BYOK, бэкенда нет) ----------
function getSettings() {
  return {
    provider: localStorage.getItem('tp_provider') || 'anthropic',
    key: localStorage.getItem('tp_key') || '',
  };
}

async function callLLM(prompt) {
  const s = getSettings();
  if (!s.key) throw new Error('нет API-ключа — введите в настройках выше');
  if (s.provider === 'openai' || s.provider === 'deepseek') {
    const url = s.provider === 'deepseek'
      ? 'https://api.deepseek.com/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: 'Bearer ' + s.key },
      body: JSON.stringify({
        model: s.provider === 'deepseek' ? 'deepseek-chat' : 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
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
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!r.ok) throw new Error('Anthropic ' + r.status);
  const j = await r.json();
  return j.content.map((b) => b.text || '').join('');
}

function gradePrompt(question, transcript) {
  return [
    'You are a certified rater for the NEW TOEFL iBT (January 2026 format), Speaking section, task "Take an Interview".',
    'Score the spoken answer on the 1-6 band scale (half bands allowed, CEFR-aligned), like ETS raters:',
    'delivery (fluency, intelligibility), language use (grammar range and accuracy, vocabulary), topic development (relevance, detail, coherence).',
    'Answers under ~15 words cap at band 3.',
    'Question: "' + question + '"',
    'Transcript of the spoken answer:',
    '"""',
    transcript,
    '"""',
    'Return STRICT JSON only:',
    '{"band":4.5,"strengths":"one short paragraph","issues":"one short paragraph","sample_answer":"a band-6 version, 3-4 sentences"}',
  ].join('\n');
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

// ---------- Запись речи (Chrome SpeechRecognition) ----------
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null;
let recording = false;
let finalTranscript = '';

function startRec(onLive, onEnd) {
  if (!SR) {
    alert('Нужен Chrome: распознавание речи не поддерживается в этом браузере');
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
      onEnd(finalTranscript.trim());
    }
  };
  rec.start();
  recording = true;
  return true;
}

function stopRec() {
  recording = false;
  if (rec) rec.stop();
}

// ---------- UI ----------
const $ = (id) => document.getElementById(id);
let currentQ = null;

function init() {
  $('provider').value = getSettings().provider;
  $('key').value = getSettings().key;
  $('saveKey').onclick = () => {
    localStorage.setItem('tp_provider', $('provider').value);
    localStorage.setItem('tp_key', $('key').value.trim());
    $('keyMsg').textContent = 'Сохранено.';
  };

  BANK.forEach((t, i) => {
    const o = document.createElement('option');
    o.value = i;
    o.textContent = t.topic;
    $('topic').appendChild(o);
  });

  $('newQ').onclick = nextQuestion;
  $('recBtn').onclick = toggleRec;
  $('gradeBtn').onclick = gradeNow;
  renderHistory();
}

function nextQuestion() {
  const t = BANK[Number($('topic').value)];
  const q = t.questions[Math.floor(Math.random() * t.questions.length)];
  currentQ = { topic: t.topic, q };
  $('question').textContent = q;
  $('live').textContent = '';
  $('feedback').innerHTML = '';
  $('gradeBtn').disabled = true;
}

function toggleRec() {
  if (recording) {
    stopRec();
    return;
  }
  const ok = startRec(
    (text) => { $('live').textContent = text; },
    (text) => {
      $('recBtn').textContent = '● Записать ответ';
      $('live').textContent = text;
      $('gradeBtn').disabled = !text;
    }
  );
  if (ok) $('recBtn').textContent = '■ Стоп';
}

async function gradeNow() {
  if (!currentQ) return;
  const text = $('live').textContent.trim();
  if (!text) return;
  $('feedback').textContent = 'Оцениваю…';
  try {
    const v = parseGrade(await callLLM(gradePrompt(currentQ.q, text)));
    $('feedback').innerHTML =
      '<div class="band">' + v.band.toFixed(1) + ' / 6</div>' +
      '<p><b>Сильное:</b> ' + v.strengths + '</p>' +
      '<p><b>Что чинить:</b> ' + v.issues + '</p>' +
      '<p><b>Band-6 вариант:</b> ' + v.sample + '</p>';
    saveHistory(currentQ, v.band, text);
    renderHistory();
  } catch (e) {
    $('feedback').textContent = 'Ошибка: ' + ((e && e.message) || e);
  }
}

function saveHistory(q, band, text) {
  const log = JSON.parse(localStorage.getItem('tp_log') || '[]');
  log.unshift({
    ts: new Date().toISOString().slice(0, 16),
    topic: q.topic,
    q: q.q,
    band,
    words: text.split(/\s+/).length,
  });
  localStorage.setItem('tp_log', JSON.stringify(log.slice(0, 100)));
}

function renderHistory() {
  const log = JSON.parse(localStorage.getItem('tp_log') || '[]');
  $('history').innerHTML = log.length
    ? '<h2>История</h2>' + log.map((e) =>
        '<div class="row"><b>' + e.band.toFixed(1) + '</b> · ' + e.ts + ' · ' +
        e.topic + ' · ' + e.words + ' слов</div>'
      ).join('')
    : '';
}

init();
