// Free official ETS practice tests in the January 2026 format (paper versions with
// audio and answer keys). Checked 31 Oct 2026. Only links live here: the tests and
// keys are ETS copyright, so the learner downloads them and pastes the key to check.

const BASE = 'https://www.ets.org/content/dam/ets-org/pdfs/toefl/';

export const OFFICIAL_TESTS = [
  { id: 'ets-s1', name: 'ETS Practice Test 1', pdf: 'toefl-ibt-full-length-practice-test-1.pdf', audio: 'student-practice-test-1-audio-files.zip' },
  { id: 'ets-s2', name: 'ETS Practice Test 2', pdf: 'toefl-ibt-full-length-practice-test-2.pdf', audio: 'student-practice-test-2-audio-files.zip' },
  { id: 'ets-t1', name: 'ETS Teacher Resources Test 1', pdf: 'toefl-ibt-teachers-resources-practice-test-1.pdf', audio: 'teacher-practice-test-1-audio-file.zip' },
  { id: 'ets-t2', name: 'ETS Teacher Resources Test 2', pdf: 'toefl-ibt-teachers-resources-practice-test-2.pdf', audio: 'teacher-practice-test-2-audio-file.zip' },
  { id: 'ets-t3', name: 'ETS Teacher Resources Test 3', pdf: 'toefl-ibt-teachers-resources-practice-test-3.pdf', audio: 'teacher-practice-test-3-audio.zip' },
  { id: 'ets-t4', name: 'ETS Teacher Resources Test 4', pdf: 'toefl-ibt-teachers-resources-practice-test-4.pdf', audio: 'teacher-practice-test-4-audio-files.zip' },
  { id: 'ets-t5', name: 'ETS Teacher Resources Test 5', pdf: 'toefl-ibt-teachers-resources-practice-test-5.pdf', audio: 'teacher-practice-test-5-audio-files.zip' },
].map((t) => ({ ...t, pdf: BASE + t.pdf, audio: BASE + t.audio }));

// rows = answer boxes shown; the pasted key decides how many count.
export const OFFICIAL_MODULES = [
  { id: 'r1', section: 'Reading', name: 'Reading · Module 1', rows: 20 },
  { id: 'r2', section: 'Reading', name: 'Reading · Module 2', rows: 20 },
  { id: 'l1', section: 'Listening', name: 'Listening · Module 1', rows: 18 },
  { id: 'l2', section: 'Listening', name: 'Listening · Module 2', rows: 16 },
  { id: 'w', section: 'Writing', name: 'Writing · Build a Sentence', rows: 10, sentences: true },
];
