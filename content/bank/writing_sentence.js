// Build a Sentence — original items. `tiles` are in the correct order; the
// app shuffles them. `alt` lists other fully grammatical orders.

const q = (speaker, text, reply, prefix, tiles, suffix, distractor, note, alt) =>
  ({ context: { speaker, text }, reply: { speaker: reply }, prefix, tiles, suffix, distractor, note, ...(alt ? { alt } : {}) });

export default [
  {
    id: 'bas-campus-1',
    title: 'Campus life',
    items: [
      q('Maya', 'Did you find a source for your history paper?', 'Leo', 'Yes,', ['the librarian', 'showed me', 'where', 'the old newspapers', 'are kept'], '.', 'does', 'Embedded question: after “where”, use statement order (subject + verb).'),
      q('Maya', 'Why weren’t you at the study group yesterday?', 'Leo', 'I', ['had to', 'finish', 'a lab report', 'that was', 'due'], 'at midnight.', 'finishing', '“Had to” is followed by the base verb.'),
      q('Maya', 'How was the guest lecture on climate policy?', 'Leo', 'It was', ['much more', 'interesting', 'than', 'I', 'had expected'], '.', 'most', 'Comparative: more + adjective + than.'),
      q('Maya', 'Can you tell me when the registration deadline is?', 'Leo', 'I’m not sure, but', ['you', 'could ask', 'the advisor', 'who', 'manages'], 'our program.', 'whom', '“Who” is the subject of “manages”, so “whom” is wrong here.'),
      q('Maya', 'Have you decided which elective to take?', 'Leo', 'Not yet. I', ['am trying', 'to choose', 'between', 'art history', 'and'], 'marine biology.', 'among', '“Between” is used for two options.'),
      q('Maya', 'Where should we meet to rehearse the presentation?', 'Leo', '', ['Why', 'don’t we', 'book', 'one of the', 'study rooms'], 'on the third floor?', 'doesn’t', 'Suggestion: “Why don’t we + base verb?”'),
      q('Maya', 'Is the campus gym open during the holidays?', 'Leo', 'Yes, but', ['it', 'closes', 'two hours', 'earlier', 'than usual'], '.', 'early', 'Measure phrase comes before the comparative: two hours earlier.'),
      q('Maya', 'Did the professor say anything about the final exam?', 'Leo', 'She said', ['that', 'it', 'would', 'cover', 'only'], 'the last four chapters.', 'covers', 'Reported speech: will → would; the verb after “would” stays in base form.', [['that', 'it', 'would', 'only', 'cover']]),
      q('Maya', 'How long have you been learning Korean?', 'Leo', 'I', ['have been', 'taking', 'classes', 'since', 'I started'], 'university.', 'for', '“Since” + a starting point; “for” + a length of time.'),
      q('Maya', 'Could you send me the notes from Monday’s seminar?', 'Leo', 'Of course.', ['I’ll', 'email', 'them', 'to you', 'as soon as'], 'I get home.', 'will', 'Time clauses (as soon as) use the present tense for the future.'),
    ],
  },
  {
    id: 'bas-daily-1',
    title: 'Services and daily life',
    items: [
      q('Clerk', 'How can I help you today?', 'Customer', 'I’d like to', ['know', 'whether', 'this jacket', 'can be', 'returned'], 'without a receipt.', 'is', 'Embedded yes/no question with “whether” + statement order.'),
      q('Nora', 'What did the mechanic say about your car?', 'Sam', 'He told me', ['that', 'the brakes', 'needed', 'to be', 'replaced'], 'immediately.', 'replacing', 'Passive infinitive: need + to be + past participle.'),
      q('Nora', 'Are you coming to the picnic on Saturday?', 'Sam', 'I will', ['if', 'I', 'can find', 'someone', 'to cover'], 'my shift.', 'could', 'First conditional: if + present, will + verb.'),
      q('Nora', 'Why is the café so crowded today?', 'Sam', 'They', ['are offering', 'free coffee', 'to anyone', 'who brings', 'a reusable cup'], '.', 'bring', '“Anyone” is singular, so the verb is “brings”.'),
      q('Nora', 'Do you know what time the pharmacy opens?', 'Sam', 'I think', ['it', 'opens', 'at nine', 'on', 'weekdays'], '.', 'open', 'Third-person singular present: it opens.', [['it', 'opens', 'on', 'weekdays', 'at nine']]),
      q('Nora', 'Have you paid the electricity bill yet?', 'Sam', 'No, I', ['haven’t', 'had', 'a chance', 'to do', 'it'], 'yet.', 'having', 'Present perfect negative with “yet”.'),
      q('Nora', 'What’s the best way to get to the stadium?', 'Sam', '', ['The fastest', 'option', 'is', 'to take', 'the subway'], 'to Central Station.', 'took', 'Superlative + noun + “is to + verb”.'),
      q('Nora', 'Did you enjoy the cooking class?', 'Sam', 'Yes! I', ['learned', 'how', 'to make', 'fresh pasta', 'without'], 'a machine.', 'making', '“How to + verb” after learn/know/explain.'),
      q('Nora', 'Why did you move to a new apartment?', 'Sam', 'The old one', ['was', 'too far', 'from', 'the office', 'where'], 'I work.', 'which', '“Where” introduces a relative clause about a place when the clause is complete (I work there).'),
      q('Nora', 'Can I borrow your bike this afternoon?', 'Sam', 'Sure, just', ['make sure', 'you', 'lock it', 'when', 'you leave it'], 'outside.', 'locking', '“Make sure (that) + clause”.'),
    ],
  },
  {
    id: 'bas-academic-1',
    title: 'Academic conversations',
    items: [
      q('Professor', 'What did your group conclude from the survey?', 'Student', 'We found', ['that', 'students', 'who sleep', 'more', 'tend to'], 'perform better on exams.', 'tends', 'The subject is “students” (plural), so “tend”.'),
      q('Professor', 'Why was the experiment repeated?', 'Student', 'The first results', ['were', 'affected', 'by', 'a problem', 'with'], 'the temperature sensor.', 'affecting', 'Passive voice: were + past participle + by.'),
      q('Professor', 'Which reading did you find most useful?', 'Student', 'The article', ['that', 'Professor Lin', 'recommended', 'was', 'the clearest'], 'by far.', 'recommending', 'The relative clause (that Professor Lin recommended) sits between the subject and the verb.'),
      q('Student', 'Should I include the interview data in my report?', 'Professor', 'Yes, as long as', ['you', 'explain', 'how', 'the participants', 'were selected'], '.', 'did', 'Embedded question with passive voice.'),
      q('Professor', 'Have you started the literature review?', 'Student', 'I have, but', ['I’m', 'not sure', 'which studies', 'I should', 'focus on'], '.', 'should I', 'Embedded question: “which studies I should…”, not “should I”.'),
      q('Professor', 'What would you change about the course?', 'Student', 'I', ['would', 'have', 'added', 'more', 'practical'], 'exercises.', 'adding', 'Past conditional: would have + past participle.'),
      q('Student', 'Is the new statistics software easy to use?', 'Tutor', 'It is, once', ['you', 'get', 'used', 'to', 'the'], 'menu layout.', 'using', '“Get used to + noun” means become familiar with.'),
      q('Student', 'Why did the professor extend the deadline?', 'Classmate', 'Because', ['many', 'of us', 'had', 'not received', 'the dataset'], 'on time.', 'receive', 'Past perfect for an action before another past event.'),
      q('Professor', 'What is the main argument of the chapter?', 'Student', 'The author', ['claims', 'that', 'cities', 'should be designed', 'around'], 'pedestrians rather than cars.', 'designing', 'Modal passive: should be + past participle.'),
      q('Student', 'Would you recommend this lab to other students?', 'Researcher', 'Definitely, especially', ['if', 'they', 'are', 'interested in', 'working'], 'with real patient data.', 'interesting', '“Interested in + -ing” describes a person’s feeling.'),
    ],
  },
  {
    id: 'bas-questions-1',
    title: 'Asking questions',
    items: [
      q('Ivy', 'I’m organizing a trip to the science museum next week.', 'Omar', '', ['Do you', 'know', 'how much', 'the tickets', 'cost'], '?', 'does', 'Indirect question inside a question: “how much the tickets cost”.'),
      q('Ivy', 'I just got back from my internship interview.', 'Omar', '', ['How', 'did', 'you', 'think', 'it went'], '?', 'does', 'Past-tense question: did + subject + base verb.'),
      q('Ivy', 'The seminar has been moved to Thursday.', 'Omar', '', ['Has', 'anyone', 'told', 'the guest speaker', 'about'], 'the change?', 'tell', 'Present perfect question: Has + subject + past participle.'),
      q('Ivy', 'I can’t decide which laptop to buy.', 'Omar', '', ['Have you', 'asked', 'the tech center', 'which one', 'they'], 'recommend?', 'do', 'Embedded question: “which one they recommend”.'),
      q('Ivy', 'My flight home was cancelled.', 'Omar', '', ['Were', 'you', 'able', 'to book', 'another one'], '?', 'booking', '“Be able to + base verb”.'),
      q('Ivy', 'We’re holding a fundraiser for the animal shelter.', 'Omar', '', ['What kind of', 'help', 'do you', 'need', 'from volunteers'], '?', 'does', '“What kind of + noun” + question word order.'),
      q('Ivy', 'I finally finished my thesis draft.', 'Omar', '', ['When', 'are you', 'planning', 'to send', 'it'], 'to your advisor?', 'sending', '“Plan to + verb”.'),
      q('Ivy', 'The new bus route starts on Monday.', 'Omar', '', ['Does', 'it', 'stop', 'anywhere', 'near'], 'the north dormitories?', 'stops', 'After “does”, the main verb is in base form.'),
      q('Ivy', 'I’m thinking of joining the debate team.', 'Omar', '', ['How', 'often', 'does', 'the team', 'practice'], '?', 'practices', 'After “does”, use the base form: practice.'),
      q('Ivy', 'The professor posted the exam results.', 'Omar', '', ['Could', 'you', 'tell me', 'where', 'I can find'], 'them?', 'can I', 'Indirect question: “where I can find”, not “where can I find”.'),
    ],
  },
];
