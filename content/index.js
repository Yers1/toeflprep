// Content registry: practice bank per task + full practice tests.

import legacy from './bank/legacy.js';
import emails from './bank/writing_email.js';
import discussions from './bank/writing_discussion.js';
import sentences from './bank/writing_sentence.js';
import { repeat, interview } from './bank/speaking.js';
import rl from './bank/reading_listening.js';
import pt1 from './tests/test1.js';
import pt2 from './tests/test2.js';

const merge = (...lists) => lists.flat().filter(Boolean);

export const BANK = {
  reading_ctw: merge(rl.reading_ctw, legacy.reading_ctw),
  reading_daily: merge(rl.reading_daily, legacy.reading_daily),
  reading_academic: merge(rl.reading_academic, legacy.reading_academic),
  listening_response: merge(rl.listening_response, legacy.listening_response),
  listening_conversation: merge(rl.listening_conversation, legacy.listening_conversation),
  listening_announcement: merge(rl.listening_announcement, legacy.listening_announcement),
  listening_academic: merge(rl.listening_academic, legacy.listening_academic),
  writing_sentence: sentences,
  writing_email: emails,
  writing_discussion: merge(discussions, legacy.writing_discussion),
  speaking_repeat: repeat,
  speaking_interview: interview,
};

export const TESTS = [pt1, pt2];
