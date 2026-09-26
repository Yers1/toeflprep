// Directory of practice tests and materials for the January 2026 format.
// Links checked September 2026. Content from these sites is not copied into
// this app; they are listed so learners can use them alongside it.

export const RESOURCE_GROUPS = [
  {
    id: 'official-free',
    title: 'Official ETS — free',
    note: 'Start here: these use real ETS items and the official interface.',
    items: [
      { name: 'TOEFL TestReady: free full practice test', url: 'https://www.ets.org/toefl/test-takers/ibt/prepare/toefl-testready.html', what: 'Full-length test in the 2026 format with AI-scored Writing and Speaking. Also free: Activity of the Day, section samplers, tailored study plan.', format2026: true, full: true, free: true },
      { name: 'TOEFL Sample Test (January 2026)', url: 'https://www.ets.org/toefl/test-takers/ibt/prepare/sample-test-jan-2026-1.html', what: 'Complete sample test that shows the new question types and screens. Opens after a short form.', format2026: true, full: true, free: true },
      { name: 'TOEFL iBT Test Prep Planner', url: 'https://www.ets.org/toefl/test-takers/ibt/prepare.html', what: 'Free 8-week plan (PDF) with skill-building activities and sample questions.', format2026: true, free: true },
      { name: 'Writing Scoring Guide (PDF)', url: 'https://www.ets.org/content/dam/ets-org/pdfs/toefl/writing-rubrics.pdf', what: 'Official 0–5 rubrics for Write an Email and Academic Discussion.', format2026: true, free: true },
      { name: 'Speaking Scoring Guide (PDF)', url: 'https://www.ets.org/content/dam/ets-org/pdfs/toefl/speaking-rubrics.pdf', what: 'Official 0–5 rubrics for Listen and Repeat and Take an Interview.', format2026: true, free: true },
      { name: 'Test content and structure', url: 'https://www.ets.org/toefl/test-takers/ibt/about/content.html', what: 'ETS description of every section and task type.', format2026: true, free: true },
    ],
  },
  {
    id: 'official-paid',
    title: 'Official ETS — paid',
    note: 'Worth it in the last 2–3 weeks for realistic full-length practice.',
    items: [
      { name: 'TestReady Mock Tests, Section Tests and Focused Practice', url: 'https://www.ets.org/toefl/test-takers/ibt/prepare/toefl-testready.html', what: 'Scored full tests and section tests with Speaking and Writing feedback; practice by question type.', format2026: true, full: true },
      { name: 'Official TOEFL iBT Prep Course (Standard / PLUS)', url: 'https://www.ets.org/toefl/test-takers/ibt/prepare/toefl-testready.html', what: 'Self-paced course with a 6-month subscription.', format2026: true },
      { name: 'The Official Guide to the TOEFL iBT Test, 8th edition', url: 'https://www.mheducation.com/highered/mhp/product/official-guide-toefl-ibt-test-eighth-edition.html', what: 'Book (McGraw Hill, 2026): 2 full practice tests in the new format, practice sets for each section, answer keys.', format2026: true, full: true },
      { name: 'Official TOEFL iBT Tests, Volumes 1–2', url: 'https://www.mheducation.com/highered/mhp/product/official-guide-toefl-ibt-test-eighth-edition.html', what: 'Five past tests per volume — older format. Useful only for extra academic reading and listening practice.', format2026: false, full: true },
      { name: 'ETS course on edX: The Insider’s Guide', url: 'https://www.edx.org/learn/test-prep/educational-testing-service-toefl-r-test-preparation-the-insiders-guide', what: 'Free to audit. Built for the previous format; general strategies still apply.', format2026: false, free: true },
    ],
  },
  {
    id: 'third-free',
    title: 'Other free practice tests',
    note: 'Independent sites. Quality varies; scores are estimates.',
    items: [
      { name: 'Magoosh free TOEFL practice test', url: 'https://toefl.magoosh.com/practice_tests/free', what: 'Full adaptive test in the 2026 format (Magoosh states the questions are licensed ETS items). Sections can be taken separately.', format2026: true, full: true, free: true },
      { name: 'TST Prep free practice test (PDF + online)', url: 'https://tstprep.com/articles/toefl/complete-practice-test-for-the-toefl-test/', what: 'Complete test with answers for all four sections; interactive version with a free account.', format2026: true, full: true, free: true },
      { name: 'TOEFL Resources: new-format practice questions', url: 'https://www.toeflresources.com/practice-questions-for-the-new-toefl-january-2026-and-beyond/', what: '8 Build a Sentence sets, 16 email prompts, 24 discussion prompts, 19 Listen and Repeat sets, 15 interview sets.', format2026: true, free: true },
      { name: 'TOEFLMockTests', url: 'https://www.toeflmocktests.com/practice-tests/full-test/', what: 'First full-length mock free; further tests paid. Band-scale scoring.', format2026: true, full: true, free: true },
      { name: 'BestMyTest practice test', url: 'https://www.bestmytest.com/toefl/practice-test', what: 'Sample questions with answers for each section.', format2026: true, free: true },
      { name: 'Magoosh speaking practice', url: 'https://magoosh.com/toefl/toefl-speaking-practice/', what: 'Sample Listen and Repeat and interview items with explanations.', format2026: true, free: true },
      { name: 'PrepEx: Listen and Repeat', url: 'https://prepex.ai/free-listen-and-repeat-toefl-2026', what: 'Single-sentence practice with automatic feedback.', format2026: true, free: true },
      { name: 'PrepEx: Build a Sentence', url: 'https://prepex.ai/free-build-a-sentence-toefl-2026', what: 'Word-order practice items.', format2026: true, free: true },
      { name: 'Arno: 50 Listen and Repeat sentences', url: 'https://goarno.io/blog/listen-and-repeat-practice-questions-with-answers-toefl-new-format/', what: 'Sentences grouped by scene, with answers.', format2026: true, free: true },
      { name: 'TestSucceed writing samples', url: 'https://testsucceed.com/materials/tests/toefl_new/en/samples/toefl-2026-new-writing-samples.html', what: 'Sample prompts for the three writing tasks.', format2026: true, free: true },
    ],
  },
  {
    id: 'skills',
    title: 'Everyday skill builders',
    note: 'Not test-shaped, but they build the listening and speaking the test measures.',
    items: [
      { name: 'BBC Learning English — 6 Minute English', url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english', what: 'Short discussions with transcripts: good for shadowing (repeat after the speaker) to train Listen and Repeat.', free: true },
    ],
  },
];
