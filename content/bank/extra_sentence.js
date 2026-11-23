// Build a Sentence — 60 more original items, aimed at the constructions that cost
// the most points: gerund/infinitive, passive, indirect and direct questions.
// `tiles` are in the correct order; the app shuffles them. `alt` lists other valid orders.

const q = (speaker, text, reply, prefix, tiles, suffix, distractor, note, alt) =>
  ({ context: { speaker, text }, reply: { speaker: reply }, prefix, tiles, suffix, distractor, note, ...(alt ? { alt } : {}) });

export default [
  {
    id: 'bas-gi-1',
    title: 'Gerund or infinitive',
    items: [
      q('Lena', 'Are you still going to the gym every morning?', 'Tom', 'No, I', ['stopped', 'going', 'after', 'I', 'hurt'], 'my knee.', 'go', 'Stop + -ing = no longer do something.'),
      q('Lena', 'Did you call the landlord about the heater?', 'Tom', 'Oh no, I', ['forgot', 'to call', 'him', 'about', 'it'], 'this morning.', 'call', 'Forget + to = forget a task you had to do.'),
      q('Lena', 'Is the new café near campus any good?', 'Tom', 'Yes, it’s definitely', ['worth', 'trying', 'their', 'homemade', 'soup'], '.', 'to try', '“Worth” is followed by -ing.'),
      q('Lena', 'Why are you leaving so early?', 'Tom', 'I', ['want', 'to avoid', 'getting', 'stuck', 'in'], 'traffic.', 'to get', 'Want + to; avoid + -ing.'),
      q('Lena', 'Do you need help with your suitcase?', 'Tom', 'Thanks, but', ['I', 'don’t mind', 'carrying', 'it', 'myself'], '.', 'to carry', '“Mind” is followed by -ing.'),
      q('Lena', 'How did you get your manager to change your schedule?', 'Tom', 'I', ['asked', 'her', 'to let', 'me', 'work'], 'mornings only.', 'working', 'Ask + person + to; let + person + base verb.'),
      q('Lena', 'Are you excited about the trip to Japan?', 'Tom', 'Very! I’m', ['looking forward', 'to', 'visiting', 'the old temples', 'in'], 'Kyoto.', 'visit', 'In “look forward to”, “to” is a preposition, so -ing follows.'),
      q('Lena', 'Your presentation was really clear.', 'Tom', 'Thanks. I', ['spent', 'the whole weekend', 'practicing', 'it', 'in front of'], 'a mirror.', 'to practice', 'Spend + time + -ing.'),
      q('Lena', 'Why did you leave the meeting for a moment?', 'Tom', 'I', ['stopped', 'to answer', 'an urgent', 'call', 'from'], 'my sister.', 'answering', 'Stop + to = stop in order to do something else.'),
      q('Lena', 'Did the teacher explain the new rules?', 'Tom', 'Yes. She', ['made', 'us', 'read', 'them', 'twice'], 'before the quiz.', 'to read', 'Make + person + base verb (no “to”).'),
    ],
  },
  {
    id: 'bas-passive-1',
    title: 'Passive voice',
    items: [
      q('Dana', 'Why is Main Street closed?', 'Ben', 'The road', ['is', 'being', 'repaired', 'after', 'the'], 'storm.', 'repairing', 'Present continuous passive: is being + past participle. A road cannot repair itself.'),
      q('Dana', 'Where are the exam results?', 'Ben', 'They', ['have', 'been', 'posted', 'on', 'the'], 'department website.', 'posting', 'Present perfect passive: have been + past participle.'),
      q('Dana', 'Who painted this mural?', 'Ben', 'It', ['was', 'painted', 'by', 'a local', 'artist'], 'in 1995.', 'paint', 'Past passive: was + past participle + by.'),
      q('Dana', 'When will we get our certificates?', 'Ben', 'They', ['will', 'be', 'sent', 'to', 'everyone'], 'by email next week.', 'sending', 'Future passive: will be + past participle.'),
      q('Dana', 'Can I use this room for a meeting?', 'Ben', 'Sorry, it', ['has', 'been', 'reserved', 'by', 'another'], 'group.', 'reserving', 'Present perfect passive: has been + past participle.'),
      q('Dana', 'Is your laptop working now?', 'Ben', 'Yes, I', ['had', 'it', 'repaired', 'at', 'the shop'], 'near my house.', 'repair', 'Have + thing + past participle: someone else did it for you.'),
      q('Dana', 'Why wasn’t the concert held outside?', 'Ben', 'It', ['had', 'to be', 'moved', 'indoors', 'because of'], 'the rain.', 'moving', 'Passive infinitive: had to be + past participle.'),
      q('Dana', 'Is English used much at your company?', 'Ben', 'Yes, it', ['is', 'spoken', 'in', 'all', 'our offices'], 'abroad.', 'speaks', 'Present simple passive: is + past participle.'),
      q('Dana', 'What happened to the old factory?', 'Ben', 'It', ['is', 'going', 'to be', 'turned', 'into'], 'apartments.', 'turning', 'Going to + be + past participle.'),
      q('Dana', 'Can I bring my own snacks into the stadium?', 'Ben', 'No, outside food', ['cannot', 'be', 'brought', 'into', 'the'], 'stadium.', 'bring', 'Modal passive: cannot be + past participle.'),
    ],
  },
  {
    id: 'bas-indirect-2',
    title: 'Indirect questions 2',
    items: [
      q('Mia', 'The library is closed today.', 'Jon', '', ['Do you', 'know', 'when', 'it', 'will', 'open'], 'again?', 'does', 'Inside the question: when + it + will open (statement order).'),
      q('Mia', 'I’m looking for the history department.', 'Jon', '', ['Could you', 'tell me', 'where', 'the office', 'is'], '?', 'does', 'Statement order inside: where the office is, not where is the office.'),
      q('Mia', 'My brother just got back from Toronto.', 'Jon', 'I wonder', ['how long', 'he', 'stayed', 'in', 'Canada'], 'this time.', 'did', 'After “I wonder”: no did/does; the verb itself carries the tense (stayed).'),
      q('Mia', 'The professor canceled class today.', 'Jon', 'Did she', ['say', 'why', 'she', 'had', 'to cancel'], 'it?', 'did', 'The question is “Did she say”; inside it: why she had to cancel it.'),
      q('Mia', 'I’m thinking about joining the chess club.', 'Jon', '', ['Do you', 'know', 'if', 'new members', 'need', 'to pay'], 'a fee?', 'do', 'Yes/no question inside: if + subject + verb.'),
      q('Mia', 'The new phone comes out next week.', 'Jon', '', ['I', 'have', 'no idea', 'how much', 'it', 'will cost'], '.', 'does', 'Statement, so a full stop; inside: how much it will cost.'),
      q('Mia', 'Someone left a bag in the classroom.', 'Jon', '', ['Does', 'anyone', 'know', 'whose', 'bag', 'this', 'is'], '?', 'are', '“Whose bag” stays together; then statement order: this is.'),
      q('Mia', 'Our flight was delayed for three hours.', 'Jon', 'The pilot', ['didn’t', 'explain', 'what', 'had', 'caused'], 'the delay.', 'did', '“What” is the subject of “caused”, so no did: what had caused the delay.'),
      q('Mia', 'The manager called you this morning.', 'Jon', 'Did she', ['tell', 'you', 'what', 'the problem', 'was'], '?', 'did', 'Inside: what the problem was (subject before verb).'),
      q('Mia', 'What did Lisa want?', 'Jon', 'She', ['asked', 'me', 'where', 'I', 'was planning', 'to stay'], 'in Almaty.', 'am', 'Reported question in the past: am planning → was planning; statement order.'),
    ],
  },
  {
    id: 'bas-direct-1',
    title: 'Direct questions',
    items: [
      q('Sara', 'I just got back from my trip.', 'Dan', '', ['Where', 'did', 'you', 'go', 'this time'], '?', 'went', 'Did carries the past tense, so the main verb stays base: go.'),
      q('Sara', 'I’ve started a new job.', 'Dan', '', ['How', 'do', 'you', 'like', 'it'], 'so far?', 'does', 'With “you”: do, not does.'),
      q('Sara', 'The meeting ended badly.', 'Dan', '', ['What', 'happened', 'after', 'I', 'left'], '?', 'did', '“What” is the subject, so no did: What happened?'),
      q('Sara', 'Someone finally fixed the printer.', 'Dan', '', ['Who', 'fixed', 'it', 'so', 'quickly'], '?', 'did', '“Who” is the subject, so no did: Who fixed it?'),
      q('Sara', 'My sister moved to Seoul.', 'Dan', '', ['How long', 'has', 'she', 'been', 'living'], 'there?', 'did', 'Present perfect continuous question: has + subject + been + -ing.'),
      q('Sara', 'I’m making dinner tonight.', 'Dan', '', ['What', 'are', 'you', 'going', 'to cook'], '?', 'do', 'Are + subject + going to + verb.'),
      q('Sara', 'The bus is late again.', 'Dan', '', ['How often', 'does', 'this', 'bus', 'come'], '?', 'comes', 'Does carries the -s, so the main verb stays base: come.'),
      q('Sara', 'I passed my driving test!', 'Dan', '', ['How many', 'times', 'did', 'you', 'take'], 'it?', 'took', '“How many times” stays together; did + subject + base verb.'),
      q('Sara', 'I’m reading a great book.', 'Dan', '', ['Who', 'is', 'it', 'written', 'by'], '?', 'wrote', 'Passive question: is + it + past participle + by.'),
      q('Sara', 'I missed the bus again.', 'Dan', '', ['Why', 'didn’t', 'you', 'leave', 'earlier'], '?', 'left', 'Negative question: didn’t + subject + base verb.'),
    ],
  },
  {
    id: 'bas-ets-5',
    title: 'ETS mix 5',
    items: [
      q('Amir', 'I heard you’re taking a photography class.', 'Kim', '', ['Do you', 'know', 'what kind of', 'camera', 'I', 'should buy'], '?', 'should I', 'Inside the question: what kind of camera I should buy (statement order).'),
      q('Amir', 'The workshop was really helpful.', 'Kim', 'Yes, I', ['wish', 'it', 'had', 'lasted', 'longer'], '.', 'has', 'Wish about the past: wish + past perfect.'),
      q('Amir', 'Are you coming to the party?', 'Kim', 'I’d love to, but I', ['have', 'to finish', 'writing', 'my', 'essay'], 'first.', 'to write', 'Have + to; finish + -ing.'),
      q('Amir', 'Did you get the job?', 'Kim', 'Not yet. They', ['said', 'they', 'would', 'let', 'me know'], 'by Friday.', 'will', 'Reported speech: will → would.'),
      q('Amir', 'Who is that woman over there?', 'Kim', 'She’s', ['the professor', 'who', 'taught', 'my', 'statistics class'], 'last year.', 'whom', '“Who” is the subject of “taught”.'),
      q('Amir', 'Can you help me move on Saturday?', 'Kim', 'Sure.', ['What', 'time', 'do you', 'want', 'me', 'to come'], '?', 'coming', 'Want + person + to + verb.'),
      q('Amir', 'I can’t decide between two universities.', 'Kim', '', ['Have you', 'asked', 'your', 'advisor', 'which one', 'is better'], '?', 'does', 'Inside the question: which one is better (which one is the subject).'),
      q('Amir', 'This soup tastes amazing.', 'Kim', 'Thanks! The recipe', ['was', 'given', 'to me', 'by', 'my grandmother'], '.', 'gave', 'Past passive: was given + by.'),
      q('Amir', 'Why didn’t you join us for lunch?', 'Kim', 'I', ['had', 'eaten', 'by the time', 'you', 'called'], '.', 'have', 'Past perfect: one past action before another.'),
      q('Amir', 'I’m worried about the exam tomorrow.', 'Kim', '', ['Do you', 'want', 'me', 'to help', 'you', 'review'], '?', 'reviewing', 'Want + person + to; help + person + base verb.'),
    ],
  },
  {
    id: 'bas-ets-6',
    title: 'ETS mix 6',
    items: [
      q('Nina', 'The gym is closed for renovation.', 'Paul', '', ['Does', 'anyone', 'know', 'how long', 'the renovation', 'will take'], '?', 'did', 'Inside the question: how long the renovation will take.'),
      q('Nina', 'I’ve been invited to give a talk.', 'Paul', '', ['What', 'are', 'you', 'planning', 'to talk', 'about'], '?', 'talking', 'Plan + to; the preposition “about” goes to the end.'),
      q('Nina', 'My laptop keeps freezing.', 'Paul', '', ['Have you', 'tried', 'restarting', 'it', 'in'], 'safe mode?', 'to restart', 'Try + -ing = test a possible solution.'),
      q('Nina', 'Can you recommend a good dentist?', 'Paul', 'Sure.', ['The one', 'I', 'go to', 'is', 'very gentle'], '.', 'who', '“The one (that) I go to” is the subject; then “is”.'),
      q('Nina', 'Did the store refund your money?', 'Paul', 'No. The manager', ['refused', 'to give', 'me', 'my money', 'back'], '.', 'giving', 'Refuse + to + verb.', [['refused', 'to give', 'me', 'back', 'my money']]),
      q('Nina', 'Why is everyone talking about the new film?', 'Paul', 'It', ['is', 'based', 'on', 'a true', 'story'], 'from the 1960s.', 'basing', 'Passive: is based on.'),
      q('Nina', 'I’d like to apply for the scholarship.', 'Paul', '', ['Do you', 'know', 'whether', 'international students', 'are', 'eligible'], '?', 'is', 'Whether + subject + verb; “students” is plural, so “are”.'),
      q('Nina', 'Did you enjoy living in the dorm?', 'Paul', 'Not really. I', ['wasn’t', 'used to', 'sharing', 'a room', 'with'], 'anyone.', 'share', 'Be used to + -ing = be familiar with.'),
      q('Nina', 'The café was full when I arrived.', 'Paul', '', ['Did', 'you', 'find', 'somewhere', 'else', 'to eat'], '?', 'eating', 'Somewhere + to + verb.'),
      q('Nina', 'Why was the field trip canceled?', 'Paul', 'The teacher', ['told', 'us', 'that', 'the trip', 'had been', 'canceled'], 'because of the snow.', 'has', 'Past passive in reported speech: had been + past participle.'),
    ],
  },
];
