// Optional server-side AI scoring for Vercel.
// Enabled only when ANTHROPIC_API_KEY is set in the project environment.
// GET  /api/evaluate  -> { enabled }
// POST /api/evaluate  -> normalized rubric result

import { buildPrompt } from '../src/shared/prompt.js';
import { RUBRICS } from '../src/data/rubrics.js';

const MODEL = process.env.TOEFL_AI_MODEL || 'claude-sonnet-5';
const LIMIT_PER_HOUR = Number(process.env.TOEFL_AI_HOURLY_LIMIT || 30);
const hits = new Map(); // best-effort per-instance rate limit

function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 3600_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > LIMIT_PER_HOUR;
}

export default async function handler(req, res) {
  const enabled = !!process.env.ANTHROPIC_API_KEY;
  res.setHeader('cache-control', 'no-store');

  if (req.method === 'GET') return res.status(200).json({ enabled });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!enabled) return res.status(503).json({ error: 'Server-side AI feedback is not configured.' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ error: 'Hourly limit reached. Try again later or add your own key in Settings.' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const { task, item, response, metrics } = body;
  if (!RUBRICS[task]) return res.status(400).json({ error: 'Unknown task.' });
  if (!item || typeof response !== 'string') return res.status(400).json({ error: 'Missing item or response.' });
  if (response.length > 8000) return res.status(413).json({ error: 'Response is too long.' });

  const prompt = buildPrompt({ task, item, response, metrics });
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2000,
        system: prompt.system,
        messages: [{ role: 'user', content: prompt.user }],
      }),
    });
    if (!r.ok) return res.status(502).json({ error: `AI provider error ${r.status}` });
    const j = await r.json();
    const text = j.content.map((b) => b.text || '').join('');
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return res.status(502).json({ error: 'Unreadable AI answer.' });
    // Raw rubric JSON; the client normalizes it with normalizeResult().
    return res.status(200).json(JSON.parse(match[0]));
  } catch {
    return res.status(500).json({ error: 'AI feedback failed.' });
  }
}
