// App entry: hash router, shell navigation, theme.

import { settings } from './core/store.js';
import { stopSpeaking } from './core/audio.js';
import { html, mount, $, $$ } from './core/ui.js';

const routes = [
  { path: /^\/?$/, view: () => import('./views/home.js'), nav: 'home', title: 'Dashboard' },
  { path: /^\/practice\/?$/, view: () => import('./views/practice-hub.js'), nav: 'practice', title: 'Practice' },
  { path: /^\/practice\/([a-z_]+)\/?$/, view: () => import('./views/practice-task.js'), nav: 'practice', title: 'Practice', keys: ['task'] },
  { path: /^\/tests\/?$/, view: () => import('./views/tests.js'), nav: 'tests', title: 'Practice tests' },
  { path: /^\/test\/([\w-]+)\/?$/, view: () => import('./views/test-runner.js'), nav: 'tests', title: 'Test', keys: ['id'], focus: true },
  { path: /^\/report\/([\w-]+)\/?$/, view: () => import('./views/report.js'), nav: 'tests', title: 'Score report', keys: ['id'] },
  { path: /^\/criteria\/?$/, view: () => import('./views/criteria.js'), nav: 'criteria', title: 'Scoring criteria' },
  { path: /^\/plan\/?$/, view: () => import('./views/plan.js'), nav: 'plan', title: 'Study plan' },
  { path: /^\/resources\/?$/, view: () => import('./views/resources.js'), nav: 'resources', title: 'Resources' },
  { path: /^\/history\/?$/, view: () => import('./views/history.js'), nav: 'history', title: 'History' },
  { path: /^\/settings\/?$/, view: () => import('./views/settings.js'), nav: 'settings', title: 'Settings' },
];

let cleanup = null;
let navToken = 0;

function parseHash() {
  const h = location.hash.replace(/^#/, '') || '/';
  const [path, query = ''] = h.split('?');
  return { path, query: Object.fromEntries(new URLSearchParams(query)) };
}

export function go(path) {
  location.hash = path.startsWith('#') ? path : `#${path}`;
}

async function render() {
  const token = ++navToken;
  const { path, query } = parseHash();
  const route = routes.find((r) => r.path.test(path));
  const outlet = $('#main');
  if (typeof cleanup === 'function') { try { cleanup(); } catch { /* ignore */ } }
  cleanup = null;
  stopSpeaking();

  $$('.nav a').forEach((a) => a.setAttribute('aria-current', route && a.dataset.nav === route.nav ? 'page' : 'false'));
  document.body.classList.toggle('focus-mode', !!route?.focus);

  if (!route) {
    mount(outlet, html`<section class="page"><h1>Page not found</h1><p><a href="#/">Back to the dashboard</a></p></section>`);
    return;
  }
  const params = {};
  const m = path.match(route.path);
  (route.keys || []).forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]); });
  document.title = `${route.title} · TOEFL Prep 2026`;

  try {
    const mod = await route.view();
    if (token !== navToken) return;
    // Fresh container per navigation so delegated listeners die with the view.
    const view = document.createElement('div');
    view.className = 'view';
    outlet.replaceChildren(view);
    cleanup = await mod.default(view, params, query);
  } catch (err) {
    console.error(err);
    mount(outlet, html`<section class="page"><h1>Something went wrong</h1><p class="error">${err.message}</p><p><a href="#/">Back to the dashboard</a></p></section>`);
  }
  if (!query.keepScroll) window.scrollTo({ top: 0 });
  outlet.focus({ preventScroll: true });
}

function applyTheme() {
  const t = settings().theme;
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  else delete document.documentElement.dataset.theme;
}

window.addEventListener('hashchange', render);
window.addEventListener('tp:data', applyTheme);

$('.nav-toggle')?.addEventListener('click', (e) => {
  const open = document.body.classList.toggle('nav-open');
  e.currentTarget.setAttribute('aria-expanded', String(open));
});
$('.nav')?.addEventListener('click', (e) => {
  if (e.target.closest('a')) document.body.classList.remove('nav-open');
});

applyTheme();
render();
