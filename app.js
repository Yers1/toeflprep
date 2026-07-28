'use strict';

// ================= OFFICIAL TOEFL iBT 2026 SCORING =================
// Source: ETS TOEFL iBT Test Blueprint and Specifications Document (2026)
// Speaking/Writing AI-scored items: 0-5 points -> 1-6 band scale
// Reading/Listening machine-scored items: 0-1 point -> 1-6 band scale

const SECTION_WEIGHTS = {
  reading: { items: 30, time: 18 * 60 + 21 },     // 18-21 min
  listening: { items: 47, time: 18 * 60 },         // 18 min
  writing: { items: 12, time: 23 * 60 },           // 23 min
  speaking: { items: 11, time: 8 * 60 },           // 8 min
};

const CEFR_LEVELS = {
  1: 'A1', 1.5: 'A1-A2', 2: 'A2', 2.5: 'B1', 3: 'B1',
  3.5: 'B2', 4: 'B2', 4.5: 'B2-C1', 5: 'C1', 5.5: 'C1-C2', 6: 'C2'
};

// Official 1-6 to 0-120 comparison table (overall total)
const BAND_TO_TOTAL_120 = {
  1: '0+', 1.5: '12+', 2: '24+', 2.5: '34+', 3: '44+', 3.5: '58+',
  4: '72+', 4.5: '86+', 5: '95+', 5.5: '107+', 6: '114+'
};

// Convert raw points (0..max) to 1-6 band
function pointsToBand(score, max) {
  const pct = max > 0 ? score / max : 0;
  // ETS-style mapping based on percentage of max points
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
    provider: localStorage.getItem('tp_provider') || 'github',
    key: localStorage.getItem('tp_key') || '',
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
      'You are a certified ETS rater for the NEW TOEFL iBT (January 2026) Speaking task "Take an Interview".',
      'Score the spoken response on the official 0-5 scale (whole numbers only).',
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
      'You are a certified ETS rater for the NEW TOEFL iBT (January 2026) Speaking task "Listen and Repeat".',
      'Score the repeated sentence on the official 0-5 scale (whole numbers only).',
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
      'You are a certified ETS rater for the NEW TOEFL iBT (January 2026) Writing task "Write an Email".',
      'Score the email on the official 0-5 scale (whole numbers only).',
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
  const legacy = BAND_TO_TOTAL_120[band] || '-';

  let breakdownHtml = '';
  if (result.breakdown && Object.keys(result.breakdown).length) {
    breakdownHtml = '<div class="score-breakdown">' +
      Object.entries(result.breakdown)
        .filter(([_, val]) => typeof val === 'number')
        .map(([dim, val]) =>
          `<div class="score-dim"><span class="score-dim-label">${dim}</span><span class="score-dim-value">${val}/5</span></div>`
        ).join('') +
      '</div>';
  }

  el.innerHTML = `
    <div class="score-ring"><div><div class="score-value">${formatBand(band)}</div><div class="score-label">of 6</div></div></div>
    ${breakdownHtml}
    <div class="score-text">
      <p><strong>CEFR:</strong> ${cefr} &nbsp;·&nbsp; <strong>Comparable TOEFL iBT:</strong> ${legacy}</p>
      <p><strong>Raw score:</strong> ${result.score} / ${rubric.maxPoints}</p>
      ${result.strengths ? `<p><strong>Strengths:</strong> ${result.strengths}</p>` : ''}
      ${result.issues ? `<p><strong>Areas to improve:</strong> ${result.issues}</p>` : ''}
      ${result.missing && result.missing.length ? `<p><strong>Missing words:</strong> ${result.missing.join(', ')}</p>` : ''}
    </div>
    ${result.sample ? `<div class="score-sample"><div class="score-sample-title">Band-${formatBand(band)} reference</div><p class="score-sample-text">${result.sample}</p></div>` : ''}
  `;
}

// ================= SPEECH =================
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null, recording = false, finalTranscript = '', timerId = null;

function startSpeechRec(onLive, onEnd) {
  if (!SR) {
    alert('Speech recognition requires Chrome. Use a Chromium-based browser.');
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
  writing_email: 600,
  writing_sentence: 120,
  reading_words: 60,
};

let activeTimer = null, timeLeft = 0;

function startTimer(modeKey) {
  stopTimer();
  const limit = TIMERS[modeKey] || 0;
  timeLeft = limit;
  const bar = $('timer-bar');
  const rubric = RUBRICS[modeKey];
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
  log.unshift({ ts: new Date().toISOString().slice(0, 16), ...entry });
  localStorage.setItem('tp_log', JSON.stringify(log.slice(0, 100)));
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
      <div class="history-meta"><strong>${e.mode}</strong> · ${e.ts}${e.detail ? ' · ' + e.detail : ''}</div>
      <div class="history-score">${e.score}</div>
    </div>
  `).join('');
}

// ================= UTILS =================
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

function getActiveMode() {
  return document.querySelector('.tab.active')?.dataset.mode || 'speaking_interview';
}

function showMode(modeKey) {
  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.mode === modeKey));
  document.querySelectorAll('.mode-panel').forEach((p) => p.classList.toggle('hidden', p.dataset.mode !== modeKey));
  stopTimer();
  $('timer-bar').classList.add('idle');
  $('timer-count').textContent = '—';
  $('timer-task').textContent = 'Select a task to begin';
}

// ================= MODE STATE =================
let interviewQ = null;
let repeatItem = null;
let emailItem = null;
let sentenceItem = null, sentencePicked = [];
let wordsItem = null;

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
      const raw = await callLLM(buildPrompt('speaking_interview', interviewQ, text), 900);
      const res = parseOfficialResult(raw);
      renderFeedback($('interview-feedback'), 'speaking_interview', res);
      const band = formatBand(pointsToBand(res.score, 5));
      saveHistory({ mode: 'Interview', score: band, detail: interviewQ.topic });
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
  saveHistory({ mode: 'Listen & Repeat', score: formatBand(pointsToBand(score, 5)), detail: pct + '%' });
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
    $('email-feedback').innerHTML = '<div class="feedback-empty">Your ETS-style score will appear here.</div>';
    startTimer('writing_email');
  };

  $('grade-email').onclick = async () => {
    if (!emailItem) return;
    const text = $('email-text').value.trim();
    if (text.split(/\s+/).length < 20) {
      $('email-feedback').innerHTML = '<div class="score-text"><p>Write at least ~20 words (target 80–120).</p></div>';
      return;
    }
    $('email-feedback').innerHTML = '<div class="feedback-empty">Rater is evaluating...</div>';
    stopTimer();
    try {
      const raw = await callLLM(buildPrompt('writing_email', emailItem, text), 1100);
      const res = parseOfficialResult(raw);
      renderFeedback($('email-feedback'), 'writing_email', res);
      const band = formatBand(pointsToBand(res.score, 5));
      saveHistory({ mode: 'Write an Email', score: band, detail: text.split(/\s+/).length + ' words' });
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
    saveHistory({ mode: 'Build a Sentence', score: ok ? '✓' : '✗', detail: '' });
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
    wordsItem = pick(BANK.reading_words);
    $('words-sentence').textContent = wordsItem.sentence;
    $('words-clue').textContent = `Clue: ${wordsItem.clue}`;
    $('words-input').value = '';
    $('words-feedback').innerHTML = '<div class="feedback-empty">Type the missing word.</div>';
    $('words-input').focus();
    startTimer('reading_words');
  };

  $('check-words').onclick = () => {
    if (!wordsItem) return;
    const val = $('words-input').value.trim().toLowerCase();
    const ok = val === wordsItem.word.toLowerCase();
    const score = ok ? 1 : 0;
    const result = { score, breakdown: { 'Vocabulary in Context': score }, issues: ok ? '' : `Correct answer: ${wordsItem.word}` };
    renderFeedback($('words-feedback'), 'reading_words', result);
    stopTimer();
    saveHistory({ mode: 'Complete the Words', score: ok ? '✓' : '✗', detail: wordsItem.word });
    renderHistory();
  };

  $('words-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('check-words').click(); });
}

// ================= APP INIT =================
function initApp() {
  $('provider').value = getSettings().provider;
  $('key').value = getSettings().key;
  $('save-key').onclick = () => {
    localStorage.setItem('tp_provider', $('provider').value);
    localStorage.setItem('tp_key', $('key').value.trim());
    $('key-msg').textContent = 'Saved';
    setTimeout(() => $('key-msg').textContent = '', 2000);
  };

  document.querySelectorAll('.tab').forEach((t) => {
    t.onclick = () => showMode(t.dataset.mode);
  });

  initInterview();
  initRepeat();
  initEmail();
  initSentence();
  initWords();
  renderHistory();
  showMode('speaking_interview');
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
