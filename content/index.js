// Content registry: practice bank per task + full practice tests.

import legacy from './bank/legacy.js';
import emails from './bank/writing_email.js';
import discussions from './bank/writing_discussion.js';
import sentences from './bank/writing_sentence.js';
import { repeat, interview } from './bank/speaking.js';
import rl from './bank/reading_listening.js';
import xcd from './bank/extra_ctw_daily.js';
import xets from './bank/extra_ctw_ets.js';
import xacad from './bank/extra_academic.js';
import xwr from './bank/extra_writing.js';
import xbas from './bank/extra_sentence.js';
import ets from './bank/ets_writing.js';
import etsBas from './bank/ets_sentence.js';
import pt1 from './tests/test1.js';
import pt2 from './tests/test2.js';

const merge = (...lists) => lists.flat().filter(Boolean);

export const BANK = {
  reading_ctw: merge(xets, rl.reading_ctw, legacy.reading_ctw, xcd.reading_ctw),
  reading_daily: merge(rl.reading_daily, legacy.reading_daily, xcd.reading_daily),
  reading_academic: merge(rl.reading_academic, legacy.reading_academic, xacad),
  listening_response: merge(rl.listening_response, legacy.listening_response),
  listening_conversation: merge(rl.listening_conversation, legacy.listening_conversation),
  listening_announcement: merge(rl.listening_announcement, legacy.listening_announcement),
  listening_academic: merge(rl.listening_academic, legacy.listening_academic),
  writing_sentence: merge(etsBas, sentences, xbas),
  writing_email: merge(ets.writing_email, emails, xwr.writing_email),
  writing_discussion: merge(ets.writing_discussion, discussions, legacy.writing_discussion, xwr.writing_discussion),
  speaking_repeat: repeat,
  speaking_interview: interview,
};

export const TESTS = [pt1, pt2];
