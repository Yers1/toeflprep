// Rubric-based AI feedback. Order of preference:
//   1. /api/evaluate (key kept on the server, if the deployment enables it)
//   2. the learner's own API key (sessionStorage by default)
// The prompt builder is shared with the server function.

import { settings, getApiKey } from './store.js';
import { buildPrompt, normalizeResult } from '../shared/prompt.js';

export const PROVIDERS = {
  anthropic: { label: 'Anthropic (Claude)', model: 'claude-sonnet-5', keyHint: 'sk-ant-…', docs: 'https://console.anthropic.com/settings/keys' },
  openai: { label: 'OpenAI', model: 'gpt-4.1-mini', url: 'https://api.openai.com/v1/chat/completions', keyHint: 'sk-…', docs: 'https://platform.openai.com/api-keys' },
  gemini: { label: 'Google Gemini', model: 'gemini-2.5-flash', url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', keyHint: 'AIza…', docs: 'https://aistudio.google.com/app/apikey' },
  deepseek: { label: 'DeepSeek', model: 'deepseek-chat', url: 'https://api.deepseek.com/v1/chat/completions', keyHint: 'sk-…', docs: 'https://platform.deepseek.com/api_keys' },
  github: { label: 'GitHub Models (free tier)', model: 'openai/gpt-4.1-mini', url: 'https://models.github.ai/inference/chat/completions', keyHint: 'github_pat_…', docs: 'https://github.com/settings/personal-access-tokens' },
};

let serverStatus = null;

export async function serverAvailable() {
  if (serverStatus !== null) return serverStatus;
  if (location.protocol === 'file:') return (serverStatus = false);
  try {
    const r = await fetch('/api/evaluate', { method: 'GET', headers: { accept: 'application/json' } });
    const j = r.ok ? await r.json() : null;
    serverStatus = !!(j && j.enabled);
  } catch {
    serverStatus = false;
  }
  return serverStatus;
}

// Returns { mode: 'server' | 'byok' | 'off', provider }
export async function aiMode() {
  const st = settings();
  if (st.provider === 'off') return { mode: 'off' };
  if ((st.provider === 'auto' || st.provider === 'server') && await serverAvailable()) return { mode: 'server' };
  const key = getApiKey();
  const provider = st.provider === 'auto' || st.provider === 'server' ? guessProvider(key) : st.provider;
  if (key && PROVIDERS[provider]) return { mode: 'byok', provider };
  return { mode: 'off' };
}

function guessProvider(key) {
  if (!key) return null;
  if (key.startsWith('sk-ant-')) return 'anthropic';
  if (key.startsWith('AIza')) return 'gemini';
  if (key.startsWith('github_pat_') || key.startsWith('ghp_')) return 'github';
  // DeepSeek keys are also "sk-" + 32 hex chars, with no separate prefix of
  // their own — check that shape before falling back to OpenAI.
  if (/^sk-[a-f0-9]{32}$/.test(key)) return 'deepseek';
  if (key.startsWith('sk-')) return 'openai';
  return null;
}

async function callProvider(provider, prompt) {
  const cfg = PROVIDERS[provider];
  const key = getApiKey();
  const model = settings().model || cfg.model;
  if (provider === 'anthropic') {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model,
        max_tokens: 2000,
        system: prompt.system,
        messages: [{ role: 'user', content: prompt.user }],
      }),
    });
    if (!r.ok) throw new Error(await errorText(r, cfg.label));
    const j = await r.json();
    return j.content.map((b) => b.text || '').join('');
  }
  const r = await fetch(cfg.url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
      messages: [{ role: 'system', content: prompt.system }, { role: 'user', content: prompt.user }],
    }),
  });
  if (!r.ok) throw new Error(await errorText(r, cfg.label));
  const j = await r.json();
  return j.choices?.[0]?.message?.content || '';
}

async function errorText(r, label) {
  let detail = '';
  try { detail = (await r.json())?.error?.message || ''; } catch { /* ignore */ }
  if (r.status === 401 || r.status === 403) return `${label}: the API key was rejected.`;
  if (r.status === 429) return `${label}: rate limit or quota reached. Try again later.`;
  return `${label} error ${r.status}${detail ? `: ${detail}` : ''}`;
}

function parseJson(raw) {
  const m = String(raw).match(/\{[\s\S]*\}/);
  if (!m) throw new Error('The AI returned an unreadable answer. Try again.');
  return JSON.parse(m[0]);
}

// payload: { task, item, response, metrics, local }
export async function evaluate(payload) {
  const mode = await aiMode();
  if (mode.mode === 'off') throw new Error('AI feedback is not set up. Add a key in Settings.');
  if (mode.mode === 'server') {
    const r = await fetch('/api/evaluate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || `Server error ${r.status}`);
    return { ...normalizeResult(j, payload.task), method: 'ai', provider: 'server' };
  }
  const prompt = buildPrompt(payload);
  const raw = await callProvider(mode.provider, prompt);
  return { ...normalizeResult(parseJson(raw), payload.task), method: 'ai', provider: mode.provider };
}
