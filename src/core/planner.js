// Study-plan generator. Allocates daily minutes across the 12 tasks, weighted
// toward the sections furthest from the target, with Writing and Speaking
// always present. Mock tests open and close the plan.

import { TASKS, tasksIn } from '../tasks/index.js';
import { attempts } from './store.js';

export const TASK_MINUTES = {
  writing_email: 12, writing_discussion: 15, writing_sentence: 8,
  speaking_interview: 10, speaking_repeat: 6,
  reading_ctw: 6, reading_daily: 6, reading_academic: 10,
  listening_response: 6, listening_conversation: 6, listening_announcement: 5, listening_academic: 8,
};

const SECTION_BOOST = { writing: 1.3, speaking: 1.3, reading: 1, listening: 1 };
const MAX_DAYS = 84;

export function isoDate(d) {
  const x = new Date(d);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
}

export function todayIso() {
  return isoDate(new Date());
}

function addDays(iso, n) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + n);
  return isoDate(d);
}

export function daysBetween(a, b) {
  return Math.round((new Date(`${b}T12:00:00`) - new Date(`${a}T12:00:00`)) / 86400000);
}

function weights(current, target) {
  const w = {};
  for (const s of ['reading', 'listening', 'writing', 'speaking']) {
    const gap = current?.[s] != null ? Math.max(0, target - current[s]) : 1;
    w[s] = (0.5 + gap) * SECTION_BOOST[s];
  }
  return w;
}

// input: { testDate, target, hoursPerWeek, current: {reading,...}|null, restDay: 0-6|null, testId1, testId2 }
export function generatePlan(input) {
  const start = todayIso();
  const total = Math.min(MAX_DAYS, Math.max(1, daysBetween(start, input.testDate)));
  const perDay = Math.max(20, Math.round((input.hoursPerWeek * 60) / (input.restDay == null ? 7 : 6)));
  const w = weights(input.current, input.target);
  const credit = { reading: 0, listening: 0, writing: 0, speaking: 0 };
  const rotation = Object.fromEntries(['reading', 'listening', 'writing', 'speaking'].map((s) => [s, 0]));
  const days = [];

  const pickSection = () => {
    // Weighted deficit round-robin.
    const tot = Object.values(w).reduce((a, b) => a + b, 0);
    Object.keys(credit).forEach((s) => { credit[s] += w[s] / tot; });
    const s = Object.entries(credit).sort((a, b) => b[1] - a[1])[0][0];
    credit[s] -= 1;
    return s;
  };
  const nextTask = (section) => {
    const list = tasksIn(section);
    const t = list[rotation[section] % list.length];
    rotation[section]++;
    return t;
  };
  const taskItem = (task) => ({ kind: 'task', task, minutes: TASK_MINUTES[task], label: TASKS[task].name });

  const diagnostic = input.testId1 && total >= 5;
  const finalMock = input.testId2 && total >= 8;
  const finalMockDay = finalMock ? total - 6 : -1;

  for (let i = 0; i < total; i++) {
    const date = addDays(start, i);
    const weekday = new Date(`${date}T12:00:00`).getDay();
    const daysLeft = total - i;
    const phase = i < Math.min(7, Math.ceil(total * 0.2)) ? 'Foundation' : daysLeft <= 7 ? 'Final week' : 'Build';
    const items = [];

    if (input.restDay != null && weekday === input.restDay && daysLeft > 1 && !(diagnostic && i === 0) && i !== finalMockDay) {
      days.push({ date, phase, rest: true, items: [] });
      continue;
    }

    if (diagnostic && i === 0) {
      if (perDay >= 90) items.push({ kind: 'test', testId: input.testId1, minutes: 95, label: 'Diagnostic: full practice test' });
      else items.push({ kind: 'test', testId: input.testId1, section: 'reading', minutes: 30, label: 'Diagnostic: Reading' }, { kind: 'test', testId: input.testId1, section: 'listening', minutes: 30, label: 'Diagnostic: Listening' });
    } else if (diagnostic && i === 1 && perDay < 90) {
      items.push({ kind: 'test', testId: input.testId1, section: 'writing', minutes: 25, label: 'Diagnostic: Writing' }, { kind: 'test', testId: input.testId1, section: 'speaking', minutes: 10, label: 'Diagnostic: Speaking' });
    } else if (i === finalMockDay) {
      items.push({ kind: 'test', testId: input.testId2, minutes: 95, label: 'Final mock: full practice test' });
    } else if (daysLeft === 1) {
      items.push(taskItem('speaking_repeat'), taskItem('writing_email'), { kind: 'note', minutes: 0, label: 'Light day: check ID, test time, equipment. Sleep early.' });
    } else {
      let used = 0;
      // Every regular day: one rubric writing task and one speaking task.
      const w1 = (i % 2 === 0) ? 'writing_discussion' : 'writing_email';
      const s1 = (i % 3 === 0) ? 'speaking_repeat' : 'speaking_interview';
      [w1, s1].forEach((t) => { items.push(taskItem(t)); used += TASK_MINUTES[t]; });
      let guard = 0;
      while (used < perDay - 4 && guard++ < 20) {
        const t = nextTask(pickSection());
        if (items.some((x) => x.task === t)) continue;
        if (used + TASK_MINUTES[t] > perDay + 4) break;
        items.push(taskItem(t));
        used += TASK_MINUTES[t];
      }
      if (i % 7 === 6) items.push({ kind: 'review', minutes: 10, label: 'Review week: reread feedback, rewrite your weakest email or post' });
    }
    days.push({ date, phase, items });
  }

  return {
    created: Date.now(),
    input,
    perDay,
    truncated: daysBetween(start, input.testDate) > MAX_DAYS,
    days,
    done: {},
  };
}

// Automatically marks items as done when a matching attempt exists that day.
export function itemDone(plan, day, idx) {
  const key = `${day.date}:${idx}`;
  if (plan.done?.[key]) return true;
  const item = day.items[idx];
  const sameDay = (a) => isoDate(a.ts) === day.date;
  if (item.kind === 'task') return attempts({ task: item.task }).some(sameDay);
  if (item.kind === 'test') return attempts({ kind: 'test' }).some((a) => a.setId === item.testId && sameDay(a) && (!item.section || a.section === item.section || a.section === 'all'));
  return false;
}

export function planItemHref(item) {
  if (item.kind === 'task') return `#/practice/${item.task}`;
  if (item.kind === 'test') return `#/test/${item.testId}${item.section ? `?section=${item.section}` : ''}`;
  if (item.kind === 'review') return '#/history';
  return null;
}
