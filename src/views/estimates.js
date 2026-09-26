// Current level per section, combining the latest test result (strongest
// evidence), logged external tests, and recent task practice.

import { attempts, externalTests } from '../core/store.js';
import { attemptBand, roundHalf } from '../core/scoring.js';

const SECS = ['reading', 'listening', 'writing', 'speaking'];
const RECENT_DAYS = 45;

export function estimateSections() {
  const cutoff = Date.now() - RECENT_DAYS * 86400000;
  const tests = attempts({ kind: 'test' }).filter((a) => a.ts >= cutoff);
  const ext = externalTests().filter((x) => new Date(x.date).getTime() >= cutoff);
  const tasks = attempts({ kind: 'task' }).filter((a) => a.ts >= cutoff);
  const out = {};
  for (const s of SECS) {
    const fromTest = tests.find((a) => a.score?.sections?.[s] != null);
    const fromExt = ext.find((x) => x.bands?.[s] != null);
    const practice = tasks.filter((a) => a.section === s).slice(0, 8).map(attemptBand).filter((b) => b != null);
    const practiceAvg = practice.length ? practice.reduce((a, b) => a + b, 0) / practice.length : null;
    const parts = [];
    if (fromTest) parts.push([fromTest.score.sections[s], 2]);
    if (fromExt) parts.push([fromExt.bands[s], 2]);
    if (practiceAvg != null) parts.push([practiceAvg, practice.length >= 3 ? 1 : 0.5]);
    if (!parts.length) { out[s] = { band: null, sources: 0 }; continue; }
    const w = parts.reduce((a, [, x]) => a + x, 0);
    out[s] = {
      band: roundHalf(parts.reduce((a, [v, x]) => a + v * x, 0) / w),
      sources: parts.length,
      practiceCount: practice.length,
    };
  }
  return out;
}
