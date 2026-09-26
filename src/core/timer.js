// Drift-free countdown. Uses wall-clock time so background tabs stay accurate.

export class Countdown {
  constructor(seconds, { onTick = () => {}, onEnd = () => {} } = {}) {
    this.total = seconds;
    this.remainingAtPause = seconds;
    this.onTick = onTick;
    this.onEnd = onEnd;
    this.endAt = 0;
    this.handle = null;
    this.running = false;
    this.finished = false;
  }

  start() {
    if (this.running || this.finished) return this;
    this.running = true;
    this.endAt = performance.now() + this.remainingAtPause * 1000;
    this.tick();
    this.handle = setInterval(() => this.tick(), 200);
    return this;
  }

  tick() {
    const left = this.remaining();
    this.onTick(left, this.total);
    if (left <= 0) this.finish();
  }

  remaining() {
    if (!this.running) return this.remainingAtPause;
    return Math.max(0, (this.endAt - performance.now()) / 1000);
  }

  elapsed() {
    return this.total - this.remaining();
  }

  pause() {
    if (!this.running) return;
    this.remainingAtPause = this.remaining();
    this.running = false;
    clearInterval(this.handle);
  }

  finish() {
    if (this.finished) return;
    this.pause();
    this.remainingAtPause = 0;
    this.finished = true;
    this.onEnd();
  }

  stop() {
    this.pause();
    this.finished = true;
  }
}

// Renders a timer pill that turns amber in the last 20% and red in the last 10%.
export function timerPill(el, left, total) {
  const s = Math.max(0, Math.ceil(left));
  el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const r = total ? left / total : 1;
  el.dataset.state = r <= 0.1 ? 'critical' : r <= 0.2 ? 'warn' : 'ok';
}
