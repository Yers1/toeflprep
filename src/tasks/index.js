// Registry of the 12 task families in the January 2026 TOEFL iBT.

import { ctw, daily, academic } from './reading.js';
import { response, conversation, announcement, lecture } from './listening.js';
import { sentence, email, discussion } from './writing.js';
import { repeat, interview } from './speaking.js';

export const SECTIONS = {
  reading: { name: 'Reading', minutes: 30, items: 50, blurb: 'Adaptive · 2 modules' },
  listening: { name: 'Listening', minutes: 29, items: 47, blurb: 'Adaptive · 2 modules' },
  writing: { name: 'Writing', minutes: 23, items: 12, blurb: '3 task types' },
  speaking: { name: 'Speaking', minutes: 8, items: 11, blurb: '2 task types' },
};

export const TASKS = {
  reading_ctw: {
    section: 'reading', name: 'Complete the Words', engine: ctw, kind: 'objective',
    spec: '70–100 word academic paragraph · 10 words with missing letters',
    skill: 'Vocabulary, spelling and grammar in context',
  },
  reading_daily: {
    section: 'reading', name: 'Read in Daily Life', engine: daily, kind: 'objective',
    spec: 'Emails, notices, menus, schedules (15–150 words) · 2–3 questions',
    skill: 'Finding details and purpose in everyday texts',
  },
  reading_academic: {
    section: 'reading', name: 'Read an Academic Passage', engine: academic, kind: 'objective',
    spec: '~200-word academic passage · 5 questions',
    skill: 'Main idea, detail, inference, vocabulary, purpose',
  },
  listening_response: {
    section: 'listening', name: 'Listen and Choose a Response', engine: response, kind: 'objective',
    spec: 'Hear one line · choose the most natural reply',
    skill: 'Pragmatics: indirect answers, tone, intent',
  },
  listening_conversation: {
    section: 'listening', name: 'Listen to a Conversation', engine: conversation, kind: 'objective',
    spec: 'Campus or daily-life conversation (~10 turns) · 2 questions',
    skill: 'Purpose, details, speaker attitude',
  },
  listening_announcement: {
    section: 'listening', name: 'Listen to an Announcement', engine: announcement, kind: 'objective',
    spec: 'Campus or classroom announcement · 2 questions',
    skill: 'Key information, changes, instructions',
  },
  listening_academic: {
    section: 'listening', name: 'Listen to an Academic Talk', engine: lecture, kind: 'objective',
    spec: 'Short lecture (100–250 words) · 4 questions',
    skill: 'Main idea, examples, organization, inference',
  },
  writing_sentence: {
    section: 'writing', name: 'Build a Sentence', engine: sentence, kind: 'objective',
    spec: '10 items · 5 min 50 s · put word tiles in order',
    skill: 'Word order, question forms, grammar',
  },
  writing_email: {
    section: 'writing', name: 'Write an Email', engine: email, kind: 'rubric', priority: true,
    spec: '1 email · 7 minutes · 3 required points',
    skill: 'Purpose, tone and social conventions',
  },
  writing_discussion: {
    section: 'writing', name: 'Academic Discussion', engine: discussion, kind: 'rubric', priority: true,
    spec: '1 post · 10 minutes · 100+ words',
    skill: 'Opinion, elaboration, sentence variety',
  },
  speaking_repeat: {
    section: 'speaking', name: 'Listen and Repeat', engine: repeat, kind: 'rubric', priority: true,
    spec: '7 sentences · no preparation · 8–12 s each',
    skill: 'Listening memory, accuracy, pronunciation',
  },
  speaking_interview: {
    section: 'speaking', name: 'Take an Interview', engine: interview, kind: 'rubric', priority: true,
    spec: '4 questions · no preparation · 45 s each',
    skill: 'Fluency, development, intelligibility',
  },
};

export const TASK_ORDER = Object.keys(TASKS);

export function tasksIn(section) {
  return TASK_ORDER.filter((id) => TASKS[id].section === section);
}
