'use strict';

// ================= TOEFL iBT 2026 PRACTICE MODEL =================
// Source: ETS TOEFL iBT Test Blueprint and Specifications Document (2026).
// The real exam is adaptive and statistically equated. The band conversion in
// this independent trainer is a progress estimate, never an official score.

const SECTION_WEIGHTS = {
  reading: { items: 50, time: 30 * 60 },
  listening: { items: 47, time: 29 * 60 },
  writing: { items: 12, time: 23 * 60 },           // 23 min
  speaking: { items: 11, time: 8 * 60 },           // 8 min
};

const CEFR_LEVELS = {
  1: 'A1', 1.5: 'A1-A2', 2: 'A2', 2.5: 'B1', 3: 'B1',
  3.5: 'B2', 4: 'B2', 4.5: 'B2-C1', 5: 'C1', 5.5: 'C1-C2', 6: 'C2'
};

// Convert practice accuracy (0..max) to a broad progress band. ETS does not
// publish a simple percentage-to-band conversion for the adaptive live test.
function pointsToBand(score, max) {
  const pct = max > 0 ? score / max : 0;
  // Broad in-app progress mapping based on practice accuracy.
  if (pct >= 0.97) return 6;
  if (pct >= 0.90) return 5.5;
  if (pct >= 0.84) return 5;
  if (pct >= 0.76) return 4.5;
  if (pct >= 0.68) return 4;
  if (pct >= 0.58) return 3.5;
  if (pct >= 0.48) return 3;
  if (pct >= 0.36) return 2.5;
  if (pct >= 0.24) return 2;
  if (pct >= 0.12) return 1.5;
  return 1;
}

function formatBand(band) {
  return band.toFixed(1).replace('.0', '');
}

// Official-style rubrics used in LLM prompts and result display
const RUBRICS = {
  speaking_interview: {
    title: 'Take an Interview',
    section: 'speaking',
    maxPoints: 5,
    time: 45,
    dimensions: ['Delivery', 'Language Use', 'Topic Development'],
    bands: {
      5: 'Advanced: fluent, intelligible, well-developed with precise vocabulary and complex grammar.',
      4: 'Good: generally clear, with some minor lapses; good vocabulary and development.',
      3: 'Fair: intelligible but uneven; limited vocabulary or grammar range; basic development.',
      2: 'Limited: noticeable pauses and errors; ideas underdeveloped or unclear at times.',
      1: 'Weak: frequent problems with intelligibility, grammar, or relevance.',
      0: 'No response or response is unrelated.',
    },
  },
  speaking_repeat: {
    title: 'Listen and Repeat',
    section: 'speaking',
    maxPoints: 5,
    time: 15,
    dimensions: ['Content Accuracy', 'Pronunciation', 'Fluency'],
    bands: {
      5: 'All key content reproduced accurately with clear pronunciation and natural rhythm.',
      4: 'Most content reproduced with minor errors; generally intelligible.',
      3: 'Some content reproduced; pronunciation or fluency issues occasionally impede meaning.',
      2: 'Limited content reproduced; frequent errors affect intelligibility.',
      1: 'Very little accurate content; difficult to understand.',
      0: 'No recognizable reproduction.',
    },
  },
  writing_email: {
    title: 'Write an Email',
    section: 'writing',
    maxPoints: 5,
    time: 600,
    dimensions: ['Task Achievement', 'Organization', 'Grammar', 'Vocabulary'],
    bands: {
      5: 'All points covered clearly; well-organized; effective grammar and vocabulary; appropriate tone.',
      4: 'Most points covered; generally organized; minor language issues.',
      3: 'Some points addressed; organization or language limitations evident.',
      2: 'Limited coverage of points; weak organization; frequent errors.',
      1: 'Little relevant content; serious language problems.',
      0: 'No response or unrelated content.',
    },
  },
  writing_sentence: {
    title: 'Build a Sentence',
    section: 'writing',
    maxPoints: 1,
    time: 120,
    dimensions: ['Grammatical Accuracy'],
    bands: {
      1: 'Sentence is grammatically correct and matches the target.',
      0: 'Sentence is incorrect or incomplete.',
    },
  },
  reading_words: {
    title: 'Complete the Words',
    section: 'reading',
    maxPoints: 1,
    time: 60,
    dimensions: ['Vocabulary in Context'],
    bands: {
      1: 'Correct word form supplied.',
      0: 'Incorrect or missing word.',
    },
  },
  writing_discussion: {
    title: 'Write for an Academic Discussion',
    section: 'writing',
    maxPoints: 5,
    time: 600,
    dimensions: ['Task Fulfillment', 'Development', 'Organization', 'Language Use'],
    bands: {
      5: 'Advanced: clear, well-supported contribution with precise and varied language.',
      4: 'Good: relevant and developed with generally effective organization and language.',
      3: 'Fair: relevant but uneven in development, organization, or language control.',
      2: 'Limited: partially developed with frequent language problems or weak connections.',
      1: 'Weak: minimal relevant content and serious language limitations.',
      0: 'No response, copied response, or unrelated content.'
    }
  },
};

// ================= DATA =================
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
  reading_words: [
    { sentence: 'The professor asked for a b___f summary of the main arguments.', word: 'brief', clue: 'short' },
    { sentence: 'Students must _b_id_ by the university code of conduct.', word: 'abide', clue: 'follow' },
    { sentence: 'The lecture was so _b_or_ that half the class fell asleep.', word: 'boring', clue: 'not interesting' },
    { sentence: 'She needed to _r_vis_ her essay before the deadline.', word: 'revise', clue: 'edit' },
    { sentence: 'The library has a strict _si_en_e policy during exam week.', word: 'silence', clue: 'no noise' },
  ],
};

const BANK = {};
for (const k of Object.keys(FALLBACK)) {
  const extra = window.TP_BANK && window.TP_BANK[k];
  BANK[k] = extra && extra.length ? extra : FALLBACK[k];
}

// ================= LLM (BYOK) =================
const OPENAI_COMPAT = {
  openai:   { url: 'https://api.openai.com/v1/chat/completions', model: 'gpt-4o-mini' },
  deepseek: { url: 'https://api.deepseek.com/v1/chat/completions', model: 'deepseek-chat' },
  gemini:   { url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', model: 'gemini-2.5-flash' },
  github:   { url: 'https://models.github.ai/inference/chat/completions', model: 'openai/gpt-4o-mini' },
};

function getSettings() {
  return {
    provider: localStorage.getItem('tp_provider') || sessionStorage.getItem('tp_provider') || 'github',
    key: sessionStorage.getItem('tp_key') || localStorage.getItem('tp_key') || '',
  };
}

async function callLLM(prompt, maxTokens = 900) {
  const s = getSettings();
  if (!s.key) throw new Error('Enter your API key in settings above');
  const p = OPENAI_COMPAT[s.provider];
  if (p) {
    const r = await fetch(p.url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: 'Bearer ' + s.key },
      body: JSON.stringify({
        model: p.model,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        max_tokens: maxTokens,
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
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!r.ok) throw new Error('anthropic ' + r.status);
  const j = await r.json();
  return j.content.map((b) => b.text || '').join('');
}

function extractJson(raw) {
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('Model returned non-JSON');
  return JSON.parse(m[0]);
}

// ================= OFFICIAL SCORING PROMPTS =================
function buildPrompt(modeKey, item, response) {
  const rubric = RUBRICS[modeKey];
  const bandDesc = Object.entries(rubric.bands)
    .map(([score, desc]) => `${score}: ${desc}`).join('\n');

  if (modeKey === 'speaking_interview') {
    return [
      'You are a careful language evaluator applying the published criteria for the TOEFL iBT 2026 Speaking task "Take an Interview".',
      'Estimate the response on a 0-5 practice scale (whole numbers only). Do not claim this is an official ETS score.',
      `Dimensions: ${rubric.dimensions.join(', ')}.`,
      `Score descriptions:\n${bandDesc}`,
      `Question: "${item.q}"`,
      'Transcript:', '"""', response, '"""',
      'Return STRICT JSON with this exact structure:',
      '{"score":4,"breakdown":{"Delivery":4,"Language Use":4,"Topic Development":4},"strengths":"...","issues":"...","sample_answer":"A strong band-5 answer, 3-4 sentences."}',
      'Use whole numbers 1-5 for score and breakdown values.',
    ].join('\n\n');
  }

  if (modeKey === 'speaking_repeat') {
    return [
      'You are a careful language evaluator applying the published criteria for the TOEFL iBT 2026 Speaking task "Listen and Repeat".',
      'Estimate the response on a 0-5 practice scale (whole numbers only). Do not claim this is an official ETS score.',
      `Dimensions: ${rubric.dimensions.join(', ')}.`,
      `Score descriptions:\n${bandDesc}`,
      `Original sentence: "${item.sentence}"`,
      'Transcript:', '"""', response, '"""',
      'Return STRICT JSON:',
      '{"score":4,"breakdown":{"Content Accuracy":4,"Pronunciation":4,"Fluency":4},"strengths":"...","issues":"...","missing_words":["word1","word2"]}',
    ].join('\n\n');
  }

  if (modeKey === 'writing_email') {
    return [
      'You are a careful language evaluator applying the published criteria for the TOEFL iBT 2026 Writing task "Write an Email".',
      'Estimate the email on a 0-5 practice scale (whole numbers only). Do not claim this is an official ETS score.',
      `Dimensions: ${rubric.dimensions.join(', ')}.`,
      `Score descriptions:\n${bandDesc}`,
      `Scenario: ${item.scenario}`,
      `Recipient: ${item.recipient}`,
      `Required points: ${item.points.join('; ')}`,
      'Student email:', '"""', response, '"""',
      'Return STRICT JSON:',
      '{"score":4,"breakdown":{"Task Achievement":4,"Organization":4,"Grammar":4,"Vocabulary":4},"strengths":"...","issues":"...","sample_answer":"A strong band-5 email, 80-120 words."}',
    ].join('\n\n');
  }

  if (modeKey === 'writing_discussion') {
    return [
      'You are a careful language evaluator applying the published criteria for the TOEFL iBT 2026 Writing task "Write for an Academic Discussion".',
      'Estimate the response on a 0-5 practice scale (whole numbers only). Do not claim this is an official ETS score.',
      `Dimensions: ${rubric.dimensions.join(', ')}.`,
      `Score descriptions:\n${bandDesc}`,
      `Course: ${item.course}`,
      `Professor question: ${item.question}`,
      `Student response 1: ${item.studentA}`,
      `Student response 2: ${item.studentB}`,
      'Student contribution:', '"""', response, '"""',
      'Return STRICT JSON:',
      '{"score":4,"breakdown":{"Task Fulfillment":4,"Development":4,"Organization":4,"Language Use":4},"strengths":"...","issues":"...","sample_answer":"A strong original response of 110-140 words."}'
    ].join('\n\n');
  }

  return '';
}

function parseOfficialResult(raw) {
  const v = extractJson(raw);
  const score = Math.max(0, Math.min(5, Number(v.score) || 0));
  return {
    score,
    breakdown: v.breakdown || {},
    strengths: String(v.strengths || ''),
    issues: String(v.issues || ''),
    sample: String(v.sample_answer || v.sample || ''),
    missing: Array.isArray(v.missing_words) ? v.missing_words : [],
  };
}

function renderFeedback(el, modeKey, result) {
  const rubric = RUBRICS[modeKey];
  const band = pointsToBand(result.score, rubric.maxPoints);
  const cefr = CEFR_LEVELS[band] || '-';

  let breakdownHtml = '';
  if (result.breakdown && Object.keys(result.breakdown).length) {
    breakdownHtml = '<div class="score-breakdown">' +
      Object.entries(result.breakdown)
        .filter(([_, val]) => typeof val === 'number')
        .map(([dim, val]) =>
          `<div class="score-dim"><span class="score-dim-label">${escapeHtml(dim)}</span><span class="score-dim-value">${val}/5</span></div>`
        ).join('') +
      '</div>';
  }

  el.innerHTML = `
    <div class="score-ring"><div><div class="score-value">${formatBand(band)}</div><div class="score-label">of 6</div></div></div>
    ${breakdownHtml}
    <div class="score-text">
      <p><strong>Estimated practice band:</strong> ${formatBand(band)} &nbsp;·&nbsp; <strong>CEFR reference:</strong> ${cefr}</p>
      <p><strong>Task score:</strong> ${result.score} / ${rubric.maxPoints}</p>
      <p class="estimate-note">Practice estimate only. The live adaptive test is statistically equated by ETS.</p>
      ${result.strengths ? `<p><strong>Strengths:</strong> ${escapeHtml(result.strengths)}</p>` : ''}
      ${result.issues ? `<p><strong>Areas to improve:</strong> ${escapeHtml(result.issues)}</p>` : ''}
      ${result.missing && result.missing.length ? `<p><strong>Missing words:</strong> ${result.missing.map(escapeHtml).join(', ')}</p>` : ''}
    </div>
    ${result.sample ? `<div class="score-sample"><div class="score-sample-title">Stronger response example</div><p class="score-sample-text">${escapeHtml(result.sample)}</p></div>` : ''}
  `;
}

// ================= SPEECH =================
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null, recording = false, finalTranscript = '', timerId = null;

function startSpeechRec(onLive, onEnd) {
  if (!SR) {
    showInlineStatus('Speech recognition is unavailable. Use current Chrome or Edge on a laptop.');
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

function stopSpeechRec() {
  recording = false;
  if (rec) rec.stop();
}

function speak(text, onend) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.95;
  const voices = speechSynthesis.getVoices();
  const v = voices.find((x) => x.lang && x.lang.startsWith('en'));
  if (v) u.voice = v;
  if (onend) u.onend = onend;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// ================= TIMERS =================
const TIMERS = {
  speaking_interview: 45,
  speaking_repeat: 15,
  writing_email: 420,
  writing_discussion: 600,
  writing_sentence: 120,
  reading_words: 180,
  reading_daily: 240,
  reading_academic: 420,
  listening_response: 20,
  listening_conversation: 240,
  listening_announcement: 180,
  listening_academic: 300,
};

let activeTimer = null, timeLeft = 0;

function startTimer(modeKey) {
  stopTimer();
  const limit = TIMERS[modeKey] || 0;
  timeLeft = limit;
  const bar = $('timer-bar');
  const rubric = RUBRICS[modeKey] || MODE_META[modeKey] || { title: 'Practice' };
  bar.classList.remove('hidden', 'warn', 'danger', 'idle');
  $('timer-task').textContent = rubric.title;
  updateTimerDisplay();
  if (limit <= 0) return;
  activeTimer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) stopTimer();
  }, 1000);
}

function stopTimer() {
  if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }
}

function updateTimerDisplay() {
  const bar = $('timer-bar');
  const rubric = RUBRICS[getActiveMode()] || {};
  const limit = TIMERS[getActiveMode()] || 0;
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  const text = timeLeft ? (m ? `${m}:${String(s).padStart(2, '0')}` : `${s}s`) : 'Time up';
  $('timer-count').textContent = text;

  bar.classList.remove('warn', 'danger');
  if (timeLeft === 0 && limit > 0) bar.classList.add('danger');
  else if (timeLeft <= 10 && limit <= 60) bar.classList.add('warn');
}

// ================= HISTORY =================
function saveHistory(entry) {
  const log = JSON.parse(localStorage.getItem('tp_log') || '[]');
  log.unshift({ ts: new Date().toISOString(), ...entry });
  localStorage.setItem('tp_log', JSON.stringify(log.slice(0, 250)));
  renderDashboard();
}

async function evaluateResponse(modeKey, item, response, maxTokens = 1000) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return parseOfficialResult(await callLLM(buildPrompt(modeKey, item, response), maxTokens));
    } catch (error) {
      lastError = error;
      if (/401|403|Enter your API key/.test(String(error?.message || error))) break;
    }
  }
  throw lastError || new Error('Feedback provider did not return a valid result.');
}

function renderHistory() {
  const log = JSON.parse(localStorage.getItem('tp_log') || '[]');
  const el = $('history-list');
  if (!el) return;
  if (!log.length) {
    el.innerHTML = '<div class="feedback-empty">Your practice history will appear here.</div>';
    return;
  }
  el.innerHTML = log.map((e) => `
    <div class="history-item">
      <div class="history-meta"><strong>${escapeHtml(e.mode)}</strong><span>${formatHistoryDate(e.ts)}${e.detail ? ' · ' + escapeHtml(e.detail) : ''}</span></div>
      <div class="history-section-tag">${escapeHtml(capitalize(e.section || inferSection(e.mode)))}</div>
      <div class="history-score">${escapeHtml(e.score)}</div>
    </div>
  `).join('');
}

// ================= UTILS =================
const $ = (id) => document.getElementById(id);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const CONTENT = window.TP_2026_CONTENT || {};
const SECTION_LABELS = { reading: 'Reading', listening: 'Listening', speaking: 'Speaking', writing: 'Writing' };
const MODE_META = {
  reading_words: { title: 'Complete the Words', section: 'reading' },
  reading_daily: { title: 'Read in Daily Life', section: 'reading' },
  reading_academic: { title: 'Read an Academic Passage', section: 'reading' },
  listening_response: { title: 'Listen and Choose a Response', section: 'listening' },
  listening_conversation: { title: 'Listen to a Conversation', section: 'listening' },
  listening_announcement: { title: 'Listen to an Announcement', section: 'listening' },
  listening_academic: { title: 'Listen to an Academic Talk', section: 'listening' },
  speaking_repeat: { title: 'Listen and Repeat', section: 'speaking' },
  speaking_interview: { title: 'Take an Interview', section: 'speaking' },
  writing_sentence: { title: 'Build a Sentence', section: 'writing' },
  writing_email: { title: 'Write an Email', section: 'writing' },
  writing_discussion: { title: 'Academic Discussion', section: 'writing' }
};

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;'
  })[character]);
}

function capitalize(value) {
  const text = String(value || '');
  return text ? text[0].toUpperCase() + text.slice(1) : '';
}

function inferSection(mode = '') {
  const value = mode.toLowerCase();
  if (value.includes('read') || value.includes('word')) return 'reading';
  if (value.includes('listen') || value.includes('conversation') || value.includes('announcement')) return 'listening';
  if (value.includes('interview') || value.includes('repeat')) return 'speaking';
  return 'writing';
}

function formatHistoryDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return escapeHtml(String(value).slice(0, 16));
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
}

function wordCount(value) {
  return String(value || '').trim().split(/\s+/).filter(Boolean).length;
}

function showInlineStatus(message, tone = 'error') {
  const target = $('key-msg') || $('timer-task');
  if (!target) return;
  target.textContent = message;
  target.dataset.tone = tone;
}

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

function getActiveMode() {
  return document.querySelector('.tab.active')?.dataset.mode || 'speaking_interview';
}

function showMode(modeKey, shouldScroll = true) {
  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.mode === modeKey));
  document.querySelectorAll('.mode-panel').forEach((p) => p.classList.toggle('hidden', p.dataset.mode !== modeKey));
  stopTimer();
  $('timer-bar').classList.add('idle');
  $('timer-count').textContent = '--';
  $('timer-task').textContent = `${MODE_META[modeKey]?.title || 'Practice'} · ready`;
  if (shouldScroll) document.querySelector('#practice')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ================= MODE STATE =================
let interviewQ = null;
let repeatItem = null;
let emailItem = null;
let sentenceItem = null, sentencePicked = [];
let wordsItem = null;
let wordsGapAnswers = [];
let discussionItem = null;
const genericState = {};

// ================= INTERVIEW =================
function initInterview() {
  const topicSel = $('topic');
  BANK.speaking_interview.forEach((t, i) => {
    const o = document.createElement('option');
    o.value = i;
    o.textContent = t.topic;
    topicSel.appendChild(o);
  });

  $('new-interview').onclick = () => {
    const t = BANK.speaking_interview[Number(topicSel.value)];
    interviewQ = { topic: t.topic, q: pick(t.questions) };
    $('interview-question').textContent = interviewQ.q;
    $('interview-live').textContent = '';
    $('interview-live').classList.remove('has-text');
    $('interview-feedback').innerHTML = '<div class="feedback-empty">Your ETS-style score will appear here.</div>';
    $('grade-interview').disabled = true;
    $('rec-interview').textContent = '● Record answer';
    startTimer('speaking_interview');
  };

  $('rec-interview').onclick = () => {
    if (recording) { stopSpeechRec(); $('rec-interview').textContent = '● Record answer'; return; }
    const ok = startSpeechRec(
      (text) => { $('interview-live').textContent = text; $('interview-live').classList.toggle('has-text', !!text); },
      (text) => { $('rec-interview').textContent = '● Record answer'; $('grade-interview').disabled = !text; }
    );
    if (ok) $('rec-interview').textContent = '■ Stop';
  };

  $('grade-interview').onclick = async () => {
    if (!interviewQ) return;
    const text = $('interview-live').textContent.trim();
    if (!text) return;
    $('interview-feedback').innerHTML = '<div class="feedback-empty">Rater is evaluating...</div>';
    stopTimer();
    try {
      const res = await evaluateResponse('speaking_interview', interviewQ, text, 900);
      renderFeedback($('interview-feedback'), 'speaking_interview', res);
      const band = formatBand(pointsToBand(res.score, 5));
      saveHistory({ mode: 'Interview', modeKey: 'speaking_interview', section: 'speaking', score: band, percent: res.score / 5, detail: interviewQ.topic });
      renderHistory();
    } catch (e) {
      $('interview-feedback').textContent = 'Error: ' + (e.message || e);
    }
  };
}

// ================= REPEAT =================
function initRepeat() {
  $('new-repeat').onclick = () => {
    repeatItem = pick(BANK.speaking_repeat);
    $('play-repeat').disabled = false;
    $('rec-repeat').disabled = false;
    $('repeat-live').textContent = '';
    $('repeat-live').classList.remove('has-text');
    $('repeat-feedback').innerHTML = '<div class="feedback-empty">Listen, then repeat. Your score will appear here.</div>';
    $('rec-repeat').textContent = '● Repeat';
    $('play-repeat').click();
  };

  $('play-repeat').onclick = () => {
    if (repeatItem) speak(repeatItem.sentence);
  };

  $('rec-repeat').onclick = () => {
    if (!repeatItem) return;
    if (recording) { stopSpeechRec(); $('rec-repeat').textContent = '● Repeat'; return; }
    startTimer('speaking_repeat');
    const ok = startSpeechRec(
      (text) => { $('repeat-live').textContent = text; $('repeat-live').classList.toggle('has-text', !!text); },
      (text) => {
        stopTimer();
        $('rec-repeat').textContent = '● Repeat';
        scoreRepeat(repeatItem.sentence, text);
      }
    );
    if (ok) $('rec-repeat').textContent = '■ Stop';
  };
}

function scoreRepeat(target, said) {
  if (!said) {
    $('repeat-feedback').innerHTML = '<div class="score-text"><p class="bad">No speech detected. Try again.</p></div>';
    return;
  }
  const a = normWords(target), b = normWords(said);
  const match = (2 * lcsLen(a, b)) / (a.length + b.length);
  const pct = Math.round(match * 100);
  // Map LCS percentage to 0-5 using official-style bands
  let score = 0;
  if (pct >= 97) score = 5;
  else if (pct >= 90) score = 4;
  else if (pct >= 80) score = 3;
  else if (pct >= 60) score = 2;
  else if (pct >= 30) score = 1;
  const missed = a.filter((w) => !b.includes(w));
  const result = {
    score,
    breakdown: { 'Content Accuracy': score },
    strengths: score >= 4 ? 'High content accuracy.' : '',
    issues: score < 5 ? 'Work on reproducing all words clearly.' : '',
    missing: missed,
  };
  renderFeedback($('repeat-feedback'), 'speaking_repeat', result);
  saveHistory({ mode: 'Listen & Repeat', modeKey: 'speaking_repeat', section: 'speaking', score: formatBand(pointsToBand(score, 5)), percent: score / 5, detail: pct + '% words' });
  renderHistory();
}

// ================= EMAIL =================
function initEmail() {
  $('new-email').onclick = () => {
    emailItem = pick(BANK.writing_email);
    $('email-scenario').innerHTML = `<strong>Scenario:</strong> ${emailItem.scenario}`;
    $('email-recipient').textContent = `To: ${emailItem.recipient}`;
    $('email-points').innerHTML = emailItem.points.map((p) => `<li>${p}</li>`).join('');
    $('email-text').value = '';
    updateWordCounter('email-text', 'email-word-count');
    $('email-feedback').innerHTML = '<div class="feedback-empty">Your ETS-style score will appear here.</div>';
    startTimer('writing_email');
  };

  $('email-text').addEventListener('input', () => updateWordCounter('email-text', 'email-word-count'));

  $('grade-email').onclick = async () => {
    if (!emailItem) return;
    const text = $('email-text').value.trim();
    if (text.split(/\s+/).length < 20) {
      $('email-feedback').innerHTML = '<div class="score-text"><p>Write enough to cover all three points in complete sentences before requesting feedback.</p></div>';
      return;
    }
    $('email-feedback').innerHTML = '<div class="feedback-empty">Rater is evaluating...</div>';
    stopTimer();
    try {
      const res = await evaluateResponse('writing_email', emailItem, text, 1100);
      renderFeedback($('email-feedback'), 'writing_email', res);
      const band = formatBand(pointsToBand(res.score, 5));
      saveHistory({ mode: 'Write an Email', modeKey: 'writing_email', section: 'writing', score: band, percent: res.score / 5, detail: wordCount(text) + ' words' });
      renderHistory();
    } catch (e) {
      $('email-feedback').textContent = 'Error: ' + (e.message || e);
    }
  };
}

// ================= SENTENCE =================
function initSentence() {
  $('new-sentence').onclick = () => {
    sentenceItem = pick(BANK.writing_sentence);
    sentencePicked = [];
    startTimer('writing_sentence');
    $('sentence-context').textContent = sentenceItem.context || 'Arrange every word into one grammatical sentence.';
    const words = sentenceItem.sentence.replace(/[.!?]+$/, '').split(/\s+/);
    let shuffled = words.slice();
    do {
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
    } while (shuffled.join(' ') === words.join(' ') && words.length > 1);

    const box = $('sentence-chips');
    box.innerHTML = '';
    shuffled.forEach((w, idx) => {
      const b = document.createElement('button');
      b.className = 'word-chip';
      b.textContent = w;
      b.onclick = () => {
        sentencePicked.push({ w, idx });
        b.disabled = true;
        renderSentenceAnswer();
      };
      box.appendChild(b);
    });
    $('sentence-feedback').innerHTML = '<div class="feedback-empty">Build the sentence, then check.</div>';
    renderSentenceAnswer();
  };

  $('check-sentence').onclick = () => {
    if (!sentenceItem) return;
    const attempt = sentencePicked.map((x) => x.w).join(' ');
    const ok = normWords(attempt).join(' ') === normWords(sentenceItem.sentence).join(' ');
    const score = ok ? 1 : 0;
    const result = { score, breakdown: { 'Grammatical Accuracy': score }, issues: ok ? '' : 'Word order or word choice is incorrect.' };
    renderFeedback($('sentence-feedback'), 'writing_sentence', result);
    stopTimer();
    saveHistory({ mode: 'Build a Sentence', modeKey: 'writing_sentence', section: 'writing', score: ok ? 'Correct' : 'Review', percent: score, detail: '' });
    renderHistory();
  };
}

function renderSentenceAnswer() {
  const box = $('sentence-answer');
  box.innerHTML = '';
  sentencePicked.forEach((x, i) => {
    const b = document.createElement('button');
    b.className = 'word-chip';
    b.textContent = x.w;
    b.onclick = () => {
      sentencePicked.splice(i, 1);
      [...$('sentence-chips').children][x.idx].disabled = false;
      renderSentenceAnswer();
    };
    box.appendChild(b);
  });
}

// ================= WORDS =================
function initWords() {
  $('new-words').onclick = () => {
    wordsItem = pick(CONTENT.reading_words_passages || []);
    if (!wordsItem) return;
    $('words-title').textContent = wordsItem.title;
    renderClozePassage(wordsItem);
    $('words-feedback').innerHTML = '<div class="feedback-empty">Complete every missing letter group, then check.</div>';
    startTimer('reading_words');
  };

  $('check-words').onclick = () => {
    if (!wordsItem) return;
    const inputs = [...$('words-passage').querySelectorAll('input')];
    let correct = 0;
    const corrections = [];
    inputs.forEach((input, index) => {
      const expected = wordsGapAnswers[index];
      const ok = input.value.trim().toLowerCase() === expected.missing.toLowerCase();
      input.classList.toggle('correct', ok);
      input.classList.toggle('incorrect', !ok);
      if (ok) correct++;
      else corrections.push(expected.answer);
    });
    const percent = inputs.length ? correct / inputs.length : 0;
    renderObjectiveFeedback($('words-feedback'), correct, inputs.length, corrections.length ? `Review: ${corrections.join(', ')}.` : 'Every word is correct.');
    stopTimer();
    saveHistory({ mode: 'Complete the Words', modeKey: 'reading_words', section: 'reading', score: `${correct}/${inputs.length}`, percent, detail: wordsItem.title });
    renderHistory();
  };
}

function renderClozePassage(item) {
  const root = $('words-passage');
  root.innerHTML = '';
  wordsGapAnswers = [];
  const parts = item.text.split(/(\b[A-Za-z]*_{2,}[A-Za-z]*\b)/g);
  let gapIndex = 0;
  parts.forEach((part) => {
    if (!part.includes('__')) {
      root.append(document.createTextNode(part));
      return;
    }
    const answer = item.answers[gapIndex] || '';
    const first = part.indexOf('_');
    const last = part.lastIndexOf('_');
    const prefix = part.slice(0, first);
    const suffix = part.slice(last + 1);
    const missing = answer.slice(prefix.length, answer.length - suffix.length || undefined);
    const wrapper = document.createElement('span');
    wrapper.className = 'cloze-word';
    wrapper.append(document.createTextNode(prefix));
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = Math.max(1, missing.length);
    input.size = Math.max(2, missing.length);
    input.autocomplete = 'off';
    input.setAttribute('aria-label', `Missing letters in word ${gapIndex + 1}`);
    wrapper.append(input, document.createTextNode(suffix));
    root.append(wrapper);
    wordsGapAnswers.push({ answer, missing });
    gapIndex++;
  });
  root.querySelector('input')?.focus();
}

function renderObjectiveFeedback(el, correct, total, message) {
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const band = pointsToBand(correct, total || 1);
  el.innerHTML = `<div class="objective-result"><strong>${correct}/${total}</strong><span>${pct}% accuracy · practice band ${formatBand(band)}</span><p>${escapeHtml(message)}</p><small>This practice band is not an official TOEFL score.</small></div>`;
}

// ================= READING + LISTENING SETS =================
function initGenericModes() {
  ['reading_daily', 'reading_academic', 'listening_response', 'listening_conversation', 'listening_announcement', 'listening_academic']
    .forEach((modeKey) => renderGenericMode(modeKey));
}

function renderGenericMode(modeKey) {
  const root = document.querySelector(`[data-generic="${modeKey}"]`);
  if (!root) return;
  const meta = MODE_META[modeKey];
  const isListening = meta.section === 'listening';
  const items = CONTENT[modeKey] || [];
  const item = pick(items);
  genericState[modeKey] = { item, played: false };
  if (!item) {
    root.innerHTML = '<div class="feedback-empty">No practice items are available for this task yet.</div>';
    return;
  }
  const questions = modeKey === 'listening_response' ? [{ q: 'Choose the best response.', ...item }] : item.questions;
  const source = isListening
    ? `<div class="audio-stage"><span>Audio prompt</span><strong>${escapeHtml(item.title || meta.title)}</strong><button class="btn btn-primary play-generic" type="button">Play once</button><small>Questions appear after the audio ends.</small></div>`
    : `<article class="reading-passage"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`;
  root.innerHTML = `
    <div class="mode-header"><div><span class="task-type">${escapeHtml(meta.section)}</span><h2 class="mode-title">${escapeHtml(meta.title)}</h2><p class="mode-instructions">${isListening ? 'Listen carefully and take notes. The audio plays once in exam-style mode.' : 'Read for purpose, detail, vocabulary, and inference.'}</p></div><span class="task-time">Focused set</span></div>
    ${source}
    ${isListening && modeKey !== 'listening_response' ? '<label class="notes-field">Notes<textarea class="listening-notes" placeholder="Take brief notes while listening..."></textarea></label>' : ''}
    <form class="question-set${isListening ? ' questions-locked' : ''}">${renderQuestions(questions, modeKey)}</form>
    <div class="controls"><button class="btn btn-secondary new-generic" type="button">New set</button><button class="btn btn-primary check-generic" type="button">Check answers</button></div>
    <div class="feedback-panel generic-feedback"><div class="feedback-empty">Complete the set, then check your answers.</div></div>`;

  root.querySelector('.new-generic').onclick = () => renderGenericMode(modeKey);
  const playButton = root.querySelector('.play-generic');
  if (playButton) playButton.onclick = () => playGenericAudio(modeKey, root, questions);
  root.querySelector('.check-generic').onclick = () => checkGenericMode(modeKey, root, questions);
  if (!isListening) startTimer(modeKey);
}

function renderQuestions(questions, modeKey) {
  return questions.map((question, questionIndex) => `
    <fieldset class="question-block" data-question="${questionIndex}"><legend><span>${questionIndex + 1}</span>${escapeHtml(question.q)}</legend>
      ${question.prompt ? `<p class="prompt-text">${escapeHtml(question.prompt)}</p>` : ''}
      <div class="choice-list">${question.choices.map((choice, choiceIndex) => `<label><input type="radio" name="${modeKey}-${questionIndex}" value="${choiceIndex}"><span>${escapeHtml(choice)}</span></label>`).join('')}</div>
      <p class="answer-explanation hidden"></p>
    </fieldset>`).join('');
}

function playGenericAudio(modeKey, root) {
  const state = genericState[modeKey];
  if (!state || state.played) return;
  state.played = true;
  const button = root.querySelector('.play-generic');
  button.disabled = true;
  button.textContent = 'Playing';
  const script = modeKey === 'listening_response' ? state.item.prompt : state.item.script;
  speak(script, () => {
    button.textContent = 'Played once';
    root.querySelector('.question-set')?.classList.remove('questions-locked');
    startTimer(modeKey);
  });
}

function checkGenericMode(modeKey, root, questions) {
  if (MODE_META[modeKey].section === 'listening' && !genericState[modeKey]?.played) {
    root.querySelector('.generic-feedback').innerHTML = '<div class="feedback-empty error-state">Play the audio before checking answers.</div>';
    return;
  }
  let correct = 0;
  let answered = 0;
  questions.forEach((question, index) => {
    const block = root.querySelector(`[data-question="${index}"]`);
    const checked = block.querySelector('input:checked');
    if (checked) answered++;
    const selected = Number(checked?.value);
    const ok = checked && selected === question.answer;
    if (ok) correct++;
    block.classList.toggle('answer-correct', Boolean(ok));
    block.classList.toggle('answer-wrong', Boolean(checked && !ok));
    const explanation = block.querySelector('.answer-explanation');
    explanation.classList.remove('hidden');
    explanation.textContent = `${ok ? 'Correct.' : `Correct answer: ${question.choices[question.answer]}.`} ${question.explanation}`;
  });
  if (answered < questions.length) {
    root.querySelector('.generic-feedback').innerHTML = `<div class="feedback-empty error-state">Answer all ${questions.length} questions before finishing the set.</div>`;
    return;
  }
  stopTimer();
  const percent = correct / questions.length;
  renderObjectiveFeedback(root.querySelector('.generic-feedback'), correct, questions.length, correct === questions.length ? 'Strong set. Explain why every distractor is wrong before moving on.' : 'Review the explanations and identify whether the miss was purpose, detail, inference, or vocabulary.');
  const meta = MODE_META[modeKey];
  saveHistory({ mode: meta.title, modeKey, section: meta.section, score: `${correct}/${questions.length}`, percent, detail: genericState[modeKey].item.title || 'response set' });
  renderHistory();
}

// ================= ACADEMIC DISCUSSION =================
function initDiscussion() {
  $('new-discussion').onclick = () => {
    discussionItem = pick(CONTENT.writing_discussion || []);
    if (!discussionItem) return;
    $('discussion-prompt').innerHTML = `<div class="discussion-professor"><span>${escapeHtml(discussionItem.course)} · ${escapeHtml(discussionItem.professor)}</span><strong>${escapeHtml(discussionItem.question)}</strong></div><div class="student-posts"><p>${escapeHtml(discussionItem.studentA)}</p><p>${escapeHtml(discussionItem.studentB)}</p></div>`;
    $('discussion-text').value = '';
    updateWordCounter('discussion-text', 'discussion-word-count');
    $('discussion-feedback').innerHTML = '<div class="feedback-empty">Write at least 100 original words, then request feedback.</div>';
    startTimer('writing_discussion');
  };
  $('grade-discussion').onclick = async () => {
    if (!discussionItem) return;
    const text = $('discussion-text').value.trim();
    if (wordCount(text) < 100) {
      $('discussion-feedback').innerHTML = '<div class="feedback-empty error-state">The official practice direction recommends at least 100 words.</div>';
      return;
    }
    $('discussion-feedback').innerHTML = '<div class="feedback-empty loading-state">Evaluating your contribution...</div>';
    stopTimer();
    try {
      const res = await evaluateResponse('writing_discussion', discussionItem, text, 1200);
      renderFeedback($('discussion-feedback'), 'writing_discussion', res);
      const band = formatBand(pointsToBand(res.score, 5));
      saveHistory({ mode: 'Academic Discussion', modeKey: 'writing_discussion', section: 'writing', score: band, percent: res.score / 5, detail: `${wordCount(text)} words` });
      renderHistory();
    } catch (error) {
      $('discussion-feedback').innerHTML = `<div class="feedback-empty error-state">${escapeHtml(error.message || error)}</div>`;
    }
  };
  $('discussion-text').addEventListener('input', () => updateWordCounter('discussion-text', 'discussion-word-count'));
}

function updateWordCounter(inputId, outputId) {
  const count = wordCount($(inputId).value);
  $(outputId).textContent = `${count} word${count === 1 ? '' : 's'}`;
}

// ================= APP INIT =================
function getPracticeLog() {
  try { return JSON.parse(localStorage.getItem('tp_log') || '[]'); }
  catch { return []; }
}

function renderDashboard() {
  if (!$('metric-attempts')) return;
  const log = getPracticeLog();
  $('metric-attempts').textContent = log.length;
  const dayKeys = [...new Set(log.map((entry) => String(entry.ts).slice(0, 10)))].sort().reverse();
  $('metric-days').textContent = dayKeys.length;
  const streak = calculateStreak(dayKeys);
  $('metric-streak').textContent = streak ? `${streak}-day streak` : 'Complete one task today';
  const stats = calculateSectionStats(log);
  const focus = Object.entries(stats).sort((a, b) => {
    if (a[1].attempts === 0 && b[1].attempts > 0) return -1;
    if (b[1].attempts === 0 && a[1].attempts > 0) return 1;
    return a[1].average - b[1].average;
  })[0]?.[0] || 'reading';
  $('metric-focus').textContent = SECTION_LABELS[focus];
  $('metric-target').textContent = localStorage.getItem('tp_target_band') || '5.0';
  $('section-progress').innerHTML = Object.entries(stats).map(([section, value]) => {
    const pct = Math.round(value.average * 100);
    return `<article><div><strong>${SECTION_LABELS[section]}</strong><span>${value.attempts ? `${pct}% recent accuracy` : 'No evidence yet'}</span></div><progress max="100" value="${pct}" aria-label="${SECTION_LABELS[section]} ${pct} percent"></progress><small>${value.attempts} attempt${value.attempts === 1 ? '' : 's'}</small></article>`;
  }).join('');
  $('recommended-start').dataset.mode = recommendedMode(focus, log);
}

function calculateSectionStats(log) {
  const result = Object.fromEntries(Object.keys(SECTION_LABELS).map((section) => [section, { attempts: 0, average: 0 }]));
  Object.keys(result).forEach((section) => {
    const entries = log.filter((entry) => (entry.section || inferSection(entry.mode)) === section && Number.isFinite(Number(entry.percent))).slice(0, 12);
    result[section].attempts = entries.length;
    result[section].average = entries.length ? entries.reduce((sum, entry) => sum + Number(entry.percent), 0) / entries.length : 0;
  });
  return result;
}

function calculateStreak(dayKeys) {
  if (!dayKeys.length) return 0;
  const oneDay = 86400000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const latest = new Date(`${dayKeys[0]}T00:00:00`);
  if ((today - latest) / oneDay > 1) return 0;
  let streak = 1;
  for (let index = 1; index < dayKeys.length; index++) {
    const previous = new Date(`${dayKeys[index - 1]}T00:00:00`);
    const current = new Date(`${dayKeys[index]}T00:00:00`);
    if (Math.round((previous - current) / oneDay) !== 1) break;
    streak++;
  }
  return streak;
}

function recommendedMode(section, log) {
  const modes = Object.entries(MODE_META).filter(([, meta]) => meta.section === section).map(([key]) => key);
  return modes.sort((a, b) => log.filter((entry) => entry.modeKey === a).length - log.filter((entry) => entry.modeKey === b).length)[0] || modes[0];
}

function initDashboard() {
  renderDashboard();
  $('recommended-start').onclick = (event) => showMode(event.currentTarget.dataset.mode || 'reading_daily');
  $('diagnostic-start').onclick = () => {
    localStorage.setItem('tp_diagnostic_started', new Date().toISOString());
    showInlineStatus('Diagnostic started: complete one set in Reading, Listening, Speaking, and Writing.', 'success');
    showMode('reading_daily');
  };
  $('edit-goal').onclick = () => {
    $('target-band').value = localStorage.getItem('tp_target_band') || '5.0';
    $('goal-dialog').classList.remove('hidden');
  };
  $('close-goal').onclick = () => $('goal-dialog').classList.add('hidden');
  $('save-goal').onclick = () => {
    localStorage.setItem('tp_target_band', $('target-band').value);
    $('goal-dialog').classList.add('hidden');
    renderDashboard();
  };
}

function initSettings() {
  const settings = getSettings();
  $('provider').value = settings.provider;
  $('key').value = settings.key;
  $('remember-key').checked = Boolean(localStorage.getItem('tp_key'));
  $('settings-toggle').onclick = () => {
    const isHidden = $('settings-panel').classList.toggle('hidden');
    $('settings-toggle').setAttribute('aria-expanded', String(!isHidden));
  };
  $('toggle-key').onclick = () => {
    const show = $('key').type === 'password';
    $('key').type = show ? 'text' : 'password';
    $('toggle-key').textContent = show ? 'Hide' : 'Show';
  };
  $('save-key').onclick = () => {
    const storage = $('remember-key').checked ? localStorage : sessionStorage;
    const otherStorage = $('remember-key').checked ? sessionStorage : localStorage;
    storage.setItem('tp_provider', $('provider').value);
    storage.setItem('tp_key', $('key').value.trim());
    otherStorage.removeItem('tp_key');
    otherStorage.removeItem('tp_provider');
    $('key-msg').textContent = $('remember-key').checked ? 'Saved on this device. Do not use this option on a shared computer.' : 'Saved for this browser tab only.';
    $('key-msg').dataset.tone = 'success';
  };
}

function initHistoryTools() {
  $('export-history').onclick = () => {
    const payload = { exportedAt: new Date().toISOString(), targetBand: localStorage.getItem('tp_target_band') || '5.0', attempts: getPracticeLog() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `toefl-practice-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };
  let confirmTimer = null;
  $('clear-history').onclick = () => {
    if ($('clear-history').dataset.confirm !== 'true') {
      $('clear-history').dataset.confirm = 'true';
      $('clear-history').textContent = 'Click again to confirm';
      clearTimeout(confirmTimer);
      confirmTimer = setTimeout(() => {
        $('clear-history').dataset.confirm = 'false';
        $('clear-history').textContent = 'Clear history';
      }, 4000);
      return;
    }
    localStorage.removeItem('tp_log');
    $('clear-history').dataset.confirm = 'false';
    $('clear-history').textContent = 'Clear history';
    renderHistory();
    renderDashboard();
  };
}

function initApp() {
  initSettings();
  document.querySelectorAll('.tab').forEach((t) => {
    t.onclick = () => showMode(t.dataset.mode);
  });
  initInterview();
  initRepeat();
  initEmail();
  initSentence();
  initWords();
  initGenericModes();
  initDiscussion();
  initDashboard();
  initHistoryTools();
  renderHistory();
  showMode('speaking_repeat', false);
}

// ================= LANDING FAQ =================
function initLanding() {
  document.querySelectorAll('.faq-question').forEach((q) => {
    q.onclick = () => {
      const ans = q.nextElementSibling;
      const isOpen = ans.classList.contains('open');
      document.querySelectorAll('.faq-answer').forEach((a) => a.classList.remove('open'));
      if (!isOpen) ans.classList.add('open');
    };
  });
}

// ================= BOOT =================
if (document.getElementById('app')) {
  initApp();
} else {
  initLanding();
}
