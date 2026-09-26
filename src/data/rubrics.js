// Scoring criteria for the four rubric-scored tasks, paraphrased from the ETS
// Writing and Speaking Scoring Guides (2025). These are summaries written for
// this app, not the official wording; the originals are linked below.

export const OFFICIAL_PDFS = {
  writing: 'https://www.ets.org/content/dam/ets-org/pdfs/toefl/writing-rubrics.pdf',
  speaking: 'https://www.ets.org/content/dam/ets-org/pdfs/toefl/speaking-rubrics.pdf',
};

export const RUBRICS = {
  writing_email: {
    task: 'Write an Email',
    section: 'writing',
    pdf: OFFICIAL_PDFS.writing,
    focus: 'Does the email achieve its purpose for this reader, in the right tone, with clear and accurate language?',
    criteria: [
      { id: 'elaboration', name: 'Task & elaboration', desc: 'Every required point is addressed and developed with details that serve the purpose of the email (a request is explained, a problem is described precisely, a suggestion is justified).' },
      { id: 'language', name: 'Sentence variety & word choice', desc: 'A range of sentence structures and precise, natural (idiomatic) vocabulary rather than simple, repeated patterns.' },
      { id: 'conventions', name: 'Social conventions', desc: 'Register and politeness fit the reader; information is ordered logically; requests, refusals, apologies or complaints are phrased appropriately; clear greeting and closing.' },
      { id: 'accuracy', name: 'Accuracy', desc: 'Grammar, word forms and spelling. Occasional slips typical of timed writing are acceptable at the top level.' },
    ],
    levels: {
      5: { label: 'Fully successful', summary: 'Effective and clearly expressed with consistent control of language.', points: ['Details clearly support the purpose of the email', 'Varied syntax; precise, idiomatic word choice', 'Tone, politeness and organization consistently appropriate', 'Almost no errors beyond typical timed-writing slips'] },
      4: { label: 'Generally successful', summary: 'Mostly effective and easy to understand; language is adequate for the task.', points: ['Adequate elaboration of the points', 'Some sentence variety; appropriate vocabulary', 'Tone mostly appropriate', 'Few errors'] },
      3: { label: 'Partially successful', summary: 'The task is generally accomplished, but language limits make parts of the message unclear or less effective.', points: ['Elaboration only partly supports the purpose', 'Moderate range of syntax and vocabulary', 'Noticeable errors in structure, word forms, idioms or tone'] },
      2: { label: 'Mostly unsuccessful', summary: 'An attempt at the task that is mostly ineffective; the message is limited or hard to interpret.', points: ['Limited or irrelevant elaboration', 'Some connected sentences but a narrow range', 'Errors accumulate'] },
      1: { label: 'Unsuccessful', summary: 'An ineffective attempt; the message may be close to unintelligible.', points: ['Little or no elaboration', 'Telegraphic, disconnected language', 'Serious, frequent errors', 'Language mostly copied from the prompt'] },
      0: { label: 'No score', summary: 'Blank, off topic, not in English, copied entirely from the prompt, or random keystrokes.', points: [] },
    },
    checklist: [
      'Greeting that fits the reader (Dear Professor Lee, / Hi Sam,)',
      'First sentence states why you are writing',
      'Each of the three required points has its own 2–3 sentences',
      'At least one specific detail per point (a date, a reason, an example, a consequence)',
      'Polite phrasing for requests: “Would it be possible to…”, “I would appreciate it if…”',
      'Closing line + sign-off (Thank you for your time. / Best regards, Name)',
      '120–180 words is a comfortable range in 7 minutes',
      'Last 60 seconds: reread for verb tenses, articles and plurals',
    ],
    killers: [
      'Skipping one of the required points — the easiest way to lose a full band',
      'Wrong register: slang to a professor, or stiff legal language to a friend',
      'Copying sentences from the prompt instead of rephrasing',
      'One long paragraph with no clear order',
    ],
  },

  writing_discussion: {
    task: 'Academic Discussion',
    section: 'writing',
    pdf: OFFICIAL_PDFS.writing,
    focus: 'Is this a relevant, well-developed contribution to the class discussion, expressed with varied and accurate language?',
    criteria: [
      { id: 'relevance', name: 'Relevance & elaboration', desc: 'Takes a clear position on the professor’s question and develops it with explanations, examples and details; adds something beyond what the classmates already said.' },
      { id: 'language', name: 'Sentence variety & word choice', desc: 'A variety of syntactic structures and precise, idiomatic vocabulary.' },
      { id: 'accuracy', name: 'Accuracy', desc: 'Few lexical or grammatical errors; occasional timed-writing slips are acceptable at the top level.' },
    ],
    levels: {
      5: { label: 'Fully successful', summary: 'A relevant and very clearly expressed contribution with consistent control of language.', points: ['Relevant, well-elaborated explanations, examples or details', 'Effective variety of structures; precise, idiomatic word choice', 'Almost no errors beyond typical timed-writing slips'] },
      4: { label: 'Generally successful', summary: 'A relevant contribution; ideas are easy to understand.', points: ['Relevant and adequately elaborated support', 'Variety of structures; appropriate word choice', 'Few errors'] },
      3: { label: 'Partially successful', summary: 'Mostly relevant and understandable, with some control of language.', points: ['Part of an explanation or example is missing, unclear or irrelevant', 'Some variety in structures and vocabulary', 'Noticeable errors in structure, word form or idioms'] },
      2: { label: 'Mostly unsuccessful', summary: 'An attempt to contribute, but language limits make ideas hard to follow.', points: ['Poorly elaborated or only partly relevant ideas', 'Limited range of structures and vocabulary', 'Errors accumulate'] },
      1: { label: 'Unsuccessful', summary: 'An ineffective attempt; language limits prevent the expression of ideas.', points: ['Words and phrases without coherent ideas', 'Severely limited range', 'Serious, frequent errors', 'Language mostly borrowed from the prompt'] },
      0: { label: 'No score', summary: 'Blank, off topic, not in English, copied entirely from the prompt, or random keystrokes.', points: [] },
    },
    checklist: [
      'Sentence 1: your position in your own words (not the professor’s wording)',
      'Engage a classmate: “Kenji makes a fair point about cost, but…”',
      'One main reason + a concrete example or scenario (not a list of three thin reasons)',
      'Explain why the example proves the point — that sentence is what separates 4 from 5',
      'Mix sentence types: a conditional, a relative clause, a concession (although/while)',
      '110–150 words in 10 minutes; quality beats length after ~120',
      'Last minute: reread for agreement, articles and word forms',
    ],
    killers: [
      'Repeating a classmate’s idea without adding anything new',
      'Generic claims with no example (“technology is very important in our life”)',
      'Memorized template sentences that do not fit the topic',
      'Stopping at 60–70 words: too little to show elaboration',
    ],
  },

  speaking_repeat: {
    task: 'Listen and Repeat',
    section: 'speaking',
    pdf: OFFICIAL_PDFS.speaking,
    focus: 'How exactly and intelligibly do you reproduce the sentence you heard?',
    criteria: [
      { id: 'accuracy', name: 'Reproduction accuracy', desc: 'Every word, in order, with correct endings (tense, plural). Meaning-preserving slips cost less than missing or changed content words.' },
      { id: 'intelligibility', name: 'Intelligibility', desc: 'Words are pronounced clearly enough that a listener who has not seen the sentence understands it.' },
    ],
    levels: {
      5: { label: 'Exact', summary: 'Fully intelligible and an exact repetition.', points: [] },
      4: { label: 'Meaning kept', summary: 'Meaning captured with minor changes.', points: ['One or two function words missing or changed', 'A content word replaced by a related word (or missing in a long sentence)', 'A tense, aspect or number marker missing', 'Two words swapped', 'One or two words unclear; self-correction is fine'] },
      3: { label: 'Essentially full', summary: 'A complete sentence with most content words, but the original meaning is not accurately captured.', points: ['Several function words changed or missing', 'One or more content words missing or substantially changed', 'Occasional intelligibility problems'] },
      2: { label: 'Major gaps', summary: 'A significant part is missing or inaccurate; the response is a fragment.', points: ['Beginning repeated, then stops or fills in inaccurately', 'Low intelligibility'] },
      1: { label: 'Minimal', summary: 'A few words only, or mostly unintelligible.', points: [] },
      0: { label: 'No score', summary: 'No response, not English, or unrelated (e.g., “I don’t know”).', points: [] },
    },
    checklist: [
      'Listen for meaning, not for individual words — you remember ideas, then rebuild the grammar',
      'Mentally chunk the sentence into 3–4 phrases while it plays',
      'Start speaking right after the beep; the window is short (8–12 s)',
      'Keep endings: -s, -ed, -ing, articles a/the',
      'If you slip, correct yourself quickly and finish the sentence',
    ],
    killers: [
      'Waiting too long and running out of time',
      'Dropping the second half of long sentences',
      'Paraphrasing (“the library closes late”) instead of repeating',
    ],
  },

  speaking_interview: {
    task: 'Take an Interview',
    section: 'speaking',
    pdf: OFFICIAL_PDFS.speaking,
    focus: 'Do you answer the question fully, at a natural pace, intelligibly, with accurate and varied language?',
    criteria: [
      { id: 'development', name: 'Topic development', desc: 'Stays on the question and elaborates with reasons, examples or personal experience; ideas linked with connectors.' },
      { id: 'fluency', name: 'Fluency & pace', desc: 'Natural conversational pace; pauses are short and at natural boundaries; few fillers (uh, um).' },
      { id: 'intelligibility', name: 'Intelligibility', desc: 'Pronunciation, word stress, rhythm and intonation make the meaning easy to follow.' },
      { id: 'language', name: 'Grammar & vocabulary', desc: 'Range and accuracy of grammar and vocabulary allow precise meaning.' },
    ],
    levels: {
      5: { label: 'Fully successful', summary: 'Fully addresses the question; clear and fluent.', points: ['On topic and well elaborated', 'Natural conversational pace', 'Easily intelligible; rhythm and intonation support meaning', 'Accurate, varied grammar and vocabulary'] },
      4: { label: 'Generally successful', summary: 'Addresses the question; reasonably clear.', points: ['Elaborated, though connectors may be weak', 'Generally good pace; some pauses', 'Occasional words need minor listener effort', 'Language adequate for general meaning'] },
      3: { label: 'Partially successful', summary: 'Addresses the question with limited elaboration or clarity.', points: ['Relatively limited elaboration', 'Choppy pace; frequent fillers', 'Pronunciation sometimes affects intelligibility', 'Limited range noticeably restricts precision'] },
      2: { label: 'Mostly unsuccessful', summary: 'An attempt without meaningful or intelligible support.', points: ['Minimally connected to the question or mostly repeats it', 'Meaning often difficult to discern', 'Very limited range'] },
      1: { label: 'Unsuccessful', summary: 'Minimally addresses the question.', points: ['Only vaguely connected to the question', 'Mostly unintelligible', 'Isolated words or phrases'] },
      0: { label: 'No score', summary: 'No response, not English, or unrelated (e.g., “I don’t know”).', points: [] },
    },
    checklist: [
      'Answer in the first sentence, then support it (answer → reason → example → wrap-up)',
      'Use the full 45 seconds: aim for roughly 90–120 words',
      'Keep a steady pace of about 120–160 words per minute',
      'Pause at the end of ideas, not in the middle of phrases',
      'Link ideas: “The main reason is…”, “For example…”, “That’s why…”',
      'Later questions are more abstract — give a view and one reason, even if you have never thought about it',
    ],
    killers: [
      'Stopping after 15–20 seconds',
      'Long silent pauses searching for the “perfect” word',
      'Repeating the interviewer’s question as your answer',
      'Memorized speeches that do not answer the specific question',
    ],
  },
};

export const RUBRIC_TASKS = Object.keys(RUBRICS);
