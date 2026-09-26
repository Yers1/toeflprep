// Audio layer: text-to-speech for prompts, microphone capture with recording,
// loudness-based pause analysis, and browser speech recognition.

import { settings } from './store.js';

// Guarded so this module can also be imported by the Node-based content
// validator (tools/validate.mjs), which has no browser globals.
const hasWindow = typeof window !== 'undefined';
const SR = hasWindow && (window.SpeechRecognition || window.webkitSpeechRecognition);

export const support = {
  tts: hasWindow && 'speechSynthesis' in window,
  mic: hasWindow && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
  recorder: hasWindow && 'MediaRecorder' in window,
  asr: !!SR,
};

// ---------------------------------------------------------------- TTS ------

const FEMALE = /(female|samantha|zira|aria|jenny|susan|karen|moira|tessa|victoria|allison|ava|serena|fiona|emma|michelle|joanna|salli|kimberly|libby|sonia|natasha|clara|google us english$)/i;
const MALE = /(male|david|mark|guy|daniel|alex|fred|tom|ryan|christopher|eric|george|arthur|william|brian|matthew|james|oliver|google uk english male)/i;

let voiceCache = null;

export function loadVoices() {
  if (!support.tts) return Promise.resolve([]);
  if (voiceCache?.length) return Promise.resolve(voiceCache);
  return new Promise((resolve) => {
    const done = () => {
      voiceCache = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
      resolve(voiceCache);
    };
    const now = speechSynthesis.getVoices();
    if (now.length) return done();
    speechSynthesis.addEventListener('voiceschanged', done, { once: true });
    setTimeout(done, 1500);
  });
}

const NATURAL_RE = /natural|neural|online|premium|enhanced/i;
const GOOGLE_RE = /google/i;

function rankVoice(v) {
  let s = 0;
  if (/en[-_]US/i.test(v.lang)) s += 3;
  else if (/en[-_](GB|CA|AU)/i.test(v.lang)) s += 2;
  if (NATURAL_RE.test(v.name)) s += 3;
  if (GOOGLE_RE.test(v.name)) s += 1;
  return s;
}

// Legacy desktop voices (Microsoft David/Zira, etc.) are the only ones some
// browsers expose and they sound robotic; true "Natural"/"Online"/neural or
// Google voices sound much more human. Settings uses this to nudge users
// toward a browser that offers them, instead of pretending ranking alone
// can fix a voice list that has no good options at all.
export function hasNaturalVoice(list) {
  return list.some((v) => NATURAL_RE.test(v.name) || GOOGLE_RE.test(v.name));
}

export async function pickVoices() {
  const list = await loadVoices();
  const st = settings();
  const byName = (n) => list.find((v) => v.name === n);
  const sorted = [...list].sort((a, b) => rankVoice(b) - rankVoice(a));
  const female = sorted.find((v) => FEMALE.test(v.name) && !/male/i.test(v.name.replace(/female/i, '')));
  const male = sorted.find((v) => MALE.test(v.name) && !FEMALE.test(v.name));
  const A = byName(st.voiceA) || female || sorted[0] || null;
  const B = byName(st.voiceB) || male || sorted.find((v) => v !== A) || A;
  return { A, B };
}

export function stopSpeaking() {
  if (support.tts) speechSynthesis.cancel();
}

function splitForTts(text) {
  // Chrome truncates long utterances; speak sentence by sentence.
  return String(text).match(/[^.!?]+[.!?]+["’”)]*|[^.!?]+$/g)?.map((s) => s.trim()).filter(Boolean) || [];
}

function speakOne(text, voice, rate) {
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(text);
    if (voice) { u.voice = voice; u.lang = voice.lang; } else { u.lang = 'en-US'; }
    u.rate = rate;
    let settled = false;
    const finish = () => { if (!settled) { settled = true; clearTimeout(guard); resolve(); } };
    u.onend = finish;
    u.onerror = finish;
    // Guard against engines that never fire onend.
    const guard = setTimeout(finish, 1500 + text.length * 110 / rate);
    speechSynthesis.speak(u);
  });
}

// role: 'A' (usually female) or 'B' (usually male)
export async function speak(text, { role = 'A', rate, signal } = {}) {
  if (!support.tts) throw new Error('Text-to-speech is not available in this browser.');
  const voices = await pickVoices();
  const r = rate || settings().rate || 0.95;
  speechSynthesis.cancel();
  for (const part of splitForTts(text)) {
    if (signal?.aborted) return;
    await speakOne(part, voices[role], r);
  }
}

// lines: [{ speaker, text }], roles: { speakerName: 'A' | 'B' }
export async function speakScript(lines, roles = {}, { onLine = () => {}, signal } = {}) {
  let i = 0;
  for (const line of lines) {
    if (signal?.aborted) return;
    onLine(i, line);
    await speak(line.text, { role: roles[line.speaker] || 'A', signal });
    await wait(280, signal);
    i += 1;
  }
  onLine(-1, null);
}

export function wait(ms, signal) {
  return new Promise((resolve) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => { clearTimeout(t); resolve(); }, { once: true });
  });
}

// ------------------------------------------------------------ Beeps -------

let audioCtx = null;
function ctx() {
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

export function beep(freq = 880, ms = 160) {
  try {
    const c = ctx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.18, c.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + ms / 1000);
    o.connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + ms / 1000 + 0.02);
  } catch { /* audio blocked; the visual cue is enough */ }
}

// ------------------------------------------------------- Microphone -------

let streamPromise = null;

export function getMic() {
  if (!support.mic) return Promise.reject(new Error('Microphone access is not available in this browser.'));
  if (!streamPromise) {
    streamPromise = navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    }).catch((err) => { streamPromise = null; throw err; });
  }
  return streamPromise;
}

export function micErrorMessage(err) {
  if (!err) return '';
  if (err.name === 'NotAllowedError') return 'Microphone permission was blocked. Allow it in the address bar and try again.';
  if (err.name === 'NotFoundError') return 'No microphone was found.';
  return err.message || 'The microphone could not be started.';
}

const FRAME_MS = 50;

// One recording session: audio file, loudness frames, and (optionally) a transcript.
export class Capture {
  constructor({ asr = true, onLevel = () => {}, onTranscript = () => {} } = {}) {
    this.useAsr = asr && support.asr;
    this.onLevel = onLevel;
    this.onTranscript = onTranscript;
    this.frames = [];
    this.chunks = [];
    this.finals = [];
    this.confidences = [];
    this.interim = '';
    this.active = false;
  }

  async start() {
    const stream = await getMic();
    const c = ctx();
    this.source = c.createMediaStreamSource(stream);
    this.analyser = c.createAnalyser();
    this.analyser.fftSize = 1024;
    this.source.connect(this.analyser);
    const buf = new Float32Array(this.analyser.fftSize);
    this.startedAt = performance.now();
    this.sampler = setInterval(() => {
      this.analyser.getFloatTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
      const rms = Math.sqrt(sum / buf.length);
      this.frames.push(rms);
      this.onLevel(rms);
    }, FRAME_MS);

    if (support.recorder) {
      try {
        this.recorder = new MediaRecorder(stream);
        this.recorder.ondataavailable = (e) => { if (e.data.size) this.chunks.push(e.data); };
        this.recorder.start();
      } catch { this.recorder = null; }
    }

    this.active = true;
    if (this.useAsr) this.startAsr();
    return this;
  }

  startAsr() {
    const rec = new SR();
    rec.lang = 'en-US';
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) {
          this.finals.push(r[0].transcript.trim());
          if (r[0].confidence > 0) this.confidences.push(r[0].confidence);
        } else {
          interim += r[0].transcript;
        }
      }
      this.interim = interim.trim();
      this.onTranscript(this.transcript());
    };
    rec.onerror = (e) => { if (e.error === 'not-allowed') this.asrBlocked = true; };
    rec.onend = () => {
      // Chrome stops recognition after silence; restart while still recording.
      if (this.active && !this.asrBlocked) {
        try { rec.start(); } catch { /* already started */ }
      } else if (this.asrEnded) {
        this.asrEnded();
      }
    };
    this.rec = rec;
    try { rec.start(); } catch { /* ignore */ }
  }

  transcript() {
    return [...this.finals, this.interim].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  }

  async stop() {
    if (!this.active) return this.result;
    this.active = false;
    clearInterval(this.sampler);
    const duration = (performance.now() - this.startedAt) / 1000;
    try { this.source.disconnect(); } catch { /* ignore */ }

    const recorded = new Promise((resolve) => {
      if (!this.recorder || this.recorder.state === 'inactive') return resolve(null);
      this.recorder.onstop = () => resolve(new Blob(this.chunks, { type: this.recorder.mimeType || 'audio/webm' }));
      this.recorder.stop();
    });
    const asrDone = new Promise((resolve) => {
      if (!this.rec) return resolve();
      this.asrEnded = resolve;
      try { this.rec.stop(); } catch { resolve(); }
      setTimeout(resolve, 1800);
    });

    const [blob] = await Promise.all([recorded, asrDone]);
    const conf = this.confidences.length
      ? this.confidences.reduce((a, b) => a + b, 0) / this.confidences.length
      : null;
    this.result = {
      blob,
      url: blob ? URL.createObjectURL(blob) : null,
      duration,
      transcript: this.transcript(),
      asr: this.useAsr && !this.asrBlocked,
      confidence: conf,
      timing: analyzeFrames(this.frames),
    };
    return this.result;
  }
}

function percentile(sorted, p) {
  if (!sorted.length) return 0;
  const i = Math.min(sorted.length - 1, Math.max(0, Math.round((sorted.length - 1) * p)));
  return sorted[i];
}

// Voice-activity analysis over RMS frames. Returns timing measures used by the
// fluency criterion: response latency, speaking time, pauses.
export function analyzeFrames(frames) {
  const n = frames.length;
  const sec = (k) => (k * FRAME_MS) / 1000;
  if (n < 4) return { total: sec(n), speech: 0, onset: null, pauses: 0, longPauses: 0, longestPause: 0, pauseRatio: 0, runs: 0 };
  const sorted = [...frames].sort((a, b) => a - b);
  const floor = percentile(sorted, 0.1);
  const loud = percentile(sorted, 0.9);
  const threshold = Math.max(0.01, Math.min(floor * 3, loud * 0.3));

  // Raw voice flags, then bridge gaps shorter than 200 ms (stops, short breaths).
  const voiced = frames.map((v) => v > threshold);
  const bridge = Math.round(200 / FRAME_MS);
  for (let i = 0; i < n; i++) {
    if (voiced[i]) continue;
    let j = i;
    while (j < n && !voiced[j]) j++;
    if (i > 0 && j < n && j - i <= bridge) for (let k = i; k < j; k++) voiced[k] = true;
    i = j;
  }

  const first = voiced.indexOf(true);
  const last = voiced.lastIndexOf(true);
  if (first < 0) return { total: sec(n), speech: 0, onset: null, pauses: 0, longPauses: 0, longestPause: 0, pauseRatio: 0, runs: 0, silent: true };

  let speechFrames = 0, pauses = 0, longPauses = 0, longest = 0, runs = 1, silentInSpan = 0;
  for (let i = first; i <= last; i++) {
    if (voiced[i]) { speechFrames++; continue; }
    let j = i;
    while (j <= last && !voiced[j]) j++;
    const len = sec(j - i);
    silentInSpan += j - i;
    if (len >= 0.4) { pauses++; runs++; }
    if (len >= 1.2) longPauses++;
    longest = Math.max(longest, len);
    i = j - 1;
  }
  const span = sec(last - first + 1);
  return {
    total: sec(n),
    onset: sec(first),
    span,
    speech: sec(speechFrames),
    pauses,
    longPauses,
    longestPause: Math.round(longest * 10) / 10,
    pauseRatio: span ? sec(silentInSpan) / span : 0,
    runs,
    meanRun: runs ? sec(speechFrames) / runs : 0,
  };
}
