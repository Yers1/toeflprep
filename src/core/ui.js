// Small rendering helpers. Templates are strings; every interpolated value is
// escaped unless it was produced by html`` or wrapped with raw().

const RAW = Symbol('raw');

export function raw(value) {
  return { [RAW]: String(value ?? '') };
}

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toHtml(value) {
  if (value == null || value === false) return '';
  if (Array.isArray(value)) return value.map(toHtml).join('');
  if (typeof value === 'object' && RAW in value) return value[RAW];
  return esc(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((value, i) => { out += toHtml(value) + strings[i + 1]; });
  return raw(out);
}

export function mount(el, template) {
  el.innerHTML = toHtml(template);
  return el;
}

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function on(root, event, selector, handler) {
  root.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target && root.contains(target)) handler(e, target);
  });
}

export function fmtClock(seconds) {
  const s = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function fmtDate(ts) {
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function fmtDateTime(ts) {
  return new Date(ts).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function wordCount(text) {
  return (String(text).match(/[A-Za-z0-9’']+/g) || []).length;
}

export function shuffle(arr, rand = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

let toastTimer = null;
export function toast(message, tone = 'info') {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.className = `toast toast-${tone} is-visible`;
  el.textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-visible'), 3200);
}

export function confirmDialog(message, { okLabel = 'Continue', cancelLabel = 'Cancel', danger = false } = {}) {
  return new Promise((resolve) => {
    const dlg = document.createElement('dialog');
    dlg.className = 'dialog';
    mount(dlg, html`
      <form method="dialog">
        <p>${message}</p>
        <div class="row end gap-s">
          <button class="btn btn-ghost" value="cancel">${cancelLabel}</button>
          <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" value="ok">${okLabel}</button>
        </div>
      </form>`);
    document.body.appendChild(dlg);
    dlg.addEventListener('close', () => { resolve(dlg.returnValue === 'ok'); dlg.remove(); });
    dlg.showModal();
  });
}

export function scoreTone(score, max = 5) {
  const r = score / max;
  if (r >= 0.8) return 'good';
  if (r >= 0.55) return 'mid';
  return 'low';
}

export function pct(n, d) {
  return d ? Math.round((n / d) * 100) : 0;
}
