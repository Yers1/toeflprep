import { html, mount, $, toast, confirmDialog } from '../core/ui.js';
import { settings, updateSettings, getApiKey, setApiKey, resetAll } from '../core/store.js';
import { PROVIDERS, serverAvailable, aiMode, evaluate } from '../core/ai.js';
import { loadVoices, speak, support } from '../core/audio.js';

function statusLine(mode) {
  if (mode.mode === 'server') return { tone: 'good', text: 'Active: server-side AI — no key needed for this deployment.' };
  if (mode.mode === 'byok') return { tone: 'good', text: `Active: ${PROVIDERS[mode.provider].label} (detected from your key).` };
  return { tone: '', text: 'Off — only the local rubric estimate runs. Add a key below, or pick Gemini or GitHub Models for a free option.' };
}

export default async function settingsView(outlet) {
  const st = settings();
  const server = await serverAvailable();
  const mode = await aiMode();
  const status = statusLine(mode);
  const voices = await loadVoices();
  const key = getApiKey();

  mount(outlet, html`
    <section class="page narrow">
      <header class="page-head"><p class="eyebrow">Preferences</p><h1>Settings</h1></header>

      <form class="card js-ai-form" autocomplete="off">
        <h2>AI feedback for Writing and Speaking</h2>
        <p class="muted">Without AI, you still get the local rubric estimate. With AI, each response gets criterion scores, corrections and a level-5 rewrite.</p>
        <p class="notice ${status.tone}">${status.text}</p>
        <label class="field"><span>Provider</span>
          <select name="provider">
            <option value="auto" ${st.provider === 'auto' ? 'selected' : ''}>Automatic ${server ? '(server)' : '(detect from key)'}</option>
            ${Object.entries(PROVIDERS).map(([id, p]) => html`<option value="${id}" ${st.provider === id ? 'selected' : ''}>${p.label}</option>`)}
            <option value="off" ${st.provider === 'off' ? 'selected' : ''}>Off — local estimates only</option>
          </select></label>
        <label class="field"><span>API key</span>
          <input name="key" type="password" value="${key}" placeholder="${PROVIDERS[mode.provider]?.keyHint || 'Paste your key'}" spellcheck="false" autocomplete="off"></label>
        <label class="check"><input type="checkbox" name="remember" ${st.rememberKey ? 'checked' : ''}> Remember the key on this device (otherwise it is cleared when the tab closes). Do not use on shared computers.</label>
        <label class="field"><span>Model (optional)</span>
          <input type="text" name="model" value="${st.model}" placeholder="Default for the provider" spellcheck="false"></label>
        <p class="small muted">Where to get a key: ${Object.values(PROVIDERS).map((p, i) => html`${i ? ' · ' : ''}<a href="${p.docs}" target="_blank" rel="noopener">${p.label}</a>`)}. Gemini and GitHub Models have free tiers. Your key is sent only to the provider you choose.</p>
        <div class="row gap-s">
          <button class="btn btn-primary" type="submit">Save</button>
          <button class="btn btn-ghost js-test" type="button">Test AI</button>
        </div>
        <p class="js-ai-status small" role="status"></p>
      </form>

      <form class="card js-voice-form">
        <h2>Audio</h2>
        ${!support.tts ? html`<p class="notice">This browser has no speech synthesis. Listening prompts will be shown as text.</p>` : html`
          <div class="form-grid">
            <label class="field"><span>Voice A (usually female speakers)</span>
              <select name="voiceA"><option value="">Automatic</option>${voices.map((v) => html`<option ${v.name === st.voiceA ? 'selected' : ''}>${v.name}</option>`)}</select></label>
            <label class="field"><span>Voice B (usually male speakers)</span>
              <select name="voiceB"><option value="">Automatic</option>${voices.map((v) => html`<option ${v.name === st.voiceB ? 'selected' : ''}>${v.name}</option>`)}</select></label>
          </div>
          <label class="field"><span>Speaking rate: <output class="js-rate-out">${st.rate}</output></span>
            <input type="range" name="rate" min="0.75" max="1.15" step="0.05" value="${st.rate}"></label>
          <p class="small muted">The real test speaks at a natural pace; 0.95–1.0 is closest. Voices named “Natural” or “Online” sound most realistic (Edge offers many).</p>
          <div class="row gap-s"><button class="btn btn-ghost js-voice-test" type="button">Play sample</button><button class="btn btn-primary" type="submit">Save</button></div>`}
        <p class="small muted">Microphone: ${support.mic ? 'available' : 'not available'} · Transcription: ${support.asr ? 'available' : 'not available (use Chrome or Edge)'}</p>
      </form>

      <form class="card js-theme-form">
        <h2>Appearance</h2>
        <div class="row gap-s">${['system', 'light', 'dark'].map((t) => html`<label class="check"><input type="radio" name="theme" value="${t}" ${st.theme === t ? 'checked' : ''}> ${t[0].toUpperCase() + t.slice(1)}</label>`)}</div>
      </form>

      <section class="card">
        <h2>Data</h2>
        <p class="muted">Progress is saved only in this browser. Export it from <a href="#/history">History</a> to move it to another device.</p>
        <button class="btn btn-danger js-reset" type="button">Delete all progress</button>
      </section>
    </section>`);

  const aiForm = $('.js-ai-form', outlet);
  const testStatus = $('.js-ai-status', outlet);
  aiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(aiForm);
    const remember = f.get('remember') === 'on';
    updateSettings({ provider: f.get('provider'), model: String(f.get('model')).trim(), rememberKey: remember });
    setApiKey(String(f.get('key')).trim(), remember);
    toast('Saved');
    settingsView(outlet); // re-render so the "Active: ..." line reflects the new key/provider
  });
  $('select[name="provider"]', aiForm).addEventListener('change', (e) => {
    const p = PROVIDERS[e.target.value];
    $('input[name="key"]', aiForm).placeholder = p ? p.keyHint : 'Paste your key';
  });
  $('.js-test', outlet).addEventListener('click', async () => {
    aiForm.requestSubmit();
    testStatus.textContent = 'Testing…';
    try {
      const r = await evaluate({
        task: 'writing_email',
        item: { scenario: 'You need to reschedule a meeting with your professor.', to: 'Professor Kim', goals: [{ text: 'Apologize' }, { text: 'Explain why' }, { text: 'Suggest a new time' }], register: 'formal' },
        response: 'Dear Professor Kim, I am sorry but I cannot come on Tuesday because I have a doctor appointment. Could we meet on Thursday at 3 pm instead? Thank you, Alex',
        metrics: { words: 36 },
      });
      testStatus.textContent = `Working — test response scored ${r.overall}/5 (${r.provider}).`;
    } catch (err) {
      testStatus.textContent = err.message;
    }
  });

  const vForm = $('.js-voice-form', outlet);
  vForm.addEventListener('input', (e) => { if (e.target.name === 'rate') $('.js-rate-out', outlet).textContent = e.target.value; });
  vForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(vForm);
    updateSettings({ voiceA: f.get('voiceA') || '', voiceB: f.get('voiceB') || '', rate: Number(f.get('rate')) || 0.95 });
    toast('Saved');
  });
  $('.js-voice-test', outlet)?.addEventListener('click', async () => {
    const f = new FormData(vForm);
    updateSettings({ voiceA: f.get('voiceA') || '', voiceB: f.get('voiceB') || '', rate: Number(f.get('rate')) || 0.95 });
    await speak('Welcome to the listening section. You will hear a conversation between a student and a librarian.', { role: 'A' });
    await speak('Excuse me, could you tell me where the reserve books are kept?', { role: 'B' });
  });

  $('.js-theme-form', outlet).addEventListener('change', (e) => updateSettings({ theme: e.target.value }));
  $('.js-reset', outlet).addEventListener('click', async () => {
    if (await confirmDialog('Delete all attempts, tests, plan and settings on this device? This cannot be undone.', { okLabel: 'Delete everything', danger: true })) {
      resetAll();
      setApiKey('', false);
      toast('All progress deleted');
      location.hash = '#/';
    }
  });
}
