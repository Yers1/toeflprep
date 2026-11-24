// Build a Sentence sets built to the exact shape of the 70 items in the 7 free ETS 2026
// practice tests: 6–7 slots in most items, given words inside the sentence in about half,
// an extra tile in about 4 of 10, about 6 of 10 ending in “?”. Original sentences.
// Template: [tile] in answer order; any text outside brackets is given on screen.

function g(speaker, text, template, distractor, note, alt) {
  const parts = template.split(/\[([^\]]+)\]/);
  const tiles = [];
  const given = {};
  let prefix = '';
  for (let i = 0; i < parts.length; i++) {
    const t = parts[i].trim();
    if (i % 2) tiles.push(t);
    else if (i === 0) prefix = t;
    else if (i < parts.length - 1 && t) given[tiles.length] = t;
  }
  const suffix = parts[parts.length - 1].trim();
  return {
    context: { speaker, text }, reply: { speaker: 'You' }, prefix, tiles, suffix, distractor, note,
    ...(Object.keys(given).length ? { given } : {}), ...(alt ? { alt } : {}),
  };
}

export default [
  {
    id: 'bas-etsx-1',
    title: 'ETS exact 1',
    items: [
      g('Mia', 'I heard the campus gym is closing for repairs.', '[Do] [you] [know] [how long] it [will] [be closed] ?', 'is', 'Embedded question: how long + it + will be closed (statement order).'),
      g('Mia', 'Why are you asking about the train schedule?', 'My [parents] [want] [to know] [when] [the last train] [leaves] .', null, 'Want + to know + when + subject + verb.'),
      g('Mia', 'I just finished my final exam!', '[How] [do] [you] think [it] [went] ?', 'does', '“How do you think…” is followed by statement order: it went.'),
      g('Mia', 'I’m thinking about joining the photography club.', '[Have] [you] [already] [asked] [how much] the membership [costs] ?', null, 'Have you + already + V3; inside: how much the membership costs.'),
      g('Mia', 'The new library opens next week.', 'I [wonder] [if] [it] [will] [stay open] [later] than the old one.', null, 'I wonder if + statement order; a full stop because the sentence is a statement.'),
      g('Mia', 'Did you enjoy the guest lecture?', 'Not really. The speaker [talked] [so] [quickly] that [I] [could not] [follow] [most of it] .', 'such', 'so + adverb + that; “such” goes before a noun.'),
      g('Mia', 'I need to replace my phone charger.', '[Which] [store] [do] [you] [usually] [buy] [them] from?', null, 'Which store stays together; the preposition “from” goes to the end.'),
      g('Mia', 'Why is the professor’s office closed today?', 'She [is] [attending] [a conference] [that] [ends] on Friday.', 'end', '“that” = a conference, singular, so “ends”.'),
      g('Mia', 'Are you coming to the party on Saturday?', 'I [am] [not] [sure] [yet] because I might [have] [to work] .', null, 'might + have to + base verb.', [['am', 'not', 'yet', 'sure', 'have', 'to work']]),
      g('Mia', 'The bookstore near campus is having a big sale this week.', '[Do] [you] [know] [whether] it [sells] [used] textbooks?', 'does', 'Inside the question: whether it sells (no “does”).'),
    ],
  },
  {
    id: 'bas-etsx-2',
    title: 'ETS exact 2',
    items: [
      g('Leo', 'I’m going to the career fair tomorrow.', '[Do] [you] [know] [which] [companies] will [be] [there] ?', 'are', 'which companies + will be (statement order).'),
      g('Leo', 'Why are you asking about the printer?', 'I [need] [to find out] [whether] [it] [has been] [fixed] .', null, 'Present perfect passive: has been + V3.'),
      g('Leo', 'I just moved into a new apartment.', '[How long] [does] [it] take [you] [to get] to campus?', null, 'How long does it take + person + to + verb?'),
      g('Leo', 'What did the manager say about the schedule?', 'She [asked] [me] [if] [I] [could] [work] on Sunday.', 'told', 'Reported yes/no question: asked + me + if. “Told me if” is wrong.'),
      g('Leo', 'I can’t decide what to cook tonight.', '[Why] [don’t] [we] [order] [something] from [the new Thai place] ?', null, 'Suggestion: Why don’t we + base verb?'),
      g('Leo', 'The concert was canceled at the last minute.', '[Did] [they] [explain] [why] [it] [was] canceled?', 'does', 'Inside the question: why it was canceled (past, statement order).'),
      g('Leo', 'Have you started the history essay?', 'Not yet. I [have not] [decided] [which] [topic] [to write] about.', null, 'which + noun + to + verb; “about” stays at the end.'),
      g('Leo', 'My brother is visiting next week.', '[What] [are] [you] planning [to show] [him] ?', null, 'are you planning + to + verb.'),
      g('Leo', 'Why was the field trip moved to Friday?', 'The bus company [said] [that] [no drivers] [would] [be] [available] on Thursday.', null, 'Reported speech: will → would.'),
      g('Leo', 'I’m looking for a quiet place to study.', '[Have] [you] [tried] the [reading room] [on] [the top floor] ?', 'trying', 'Have you + V3 (tried).'),
    ],
  },
  {
    id: 'bas-etsx-3',
    title: 'ETS exact 3',
    items: [
      g('Ava', 'I’m thinking of taking a gap year.', '[What] [do] [your parents] think [about] [the idea] ?', 'does', '“your parents” is plural, so “do”.'),
      g('Ava', 'Why didn’t you answer my call?', 'I [was] [in] [a meeting] [that] [lasted] [two hours] .', null, 'Relative clause: a meeting that lasted two hours.'),
      g('Ava', 'The new café downtown is always crowded.', '[Can] [you] tell me [what] [makes] [it] [so popular] ?', null, '“what” is the subject of “makes”, so no do/does.'),
      g('Ava', 'I’m planning a trip to Japan in the spring.', '[Have] [you] [decided] [which] [cities] you [want] [to visit] ?', null, 'which cities + you want (statement order).'),
      g('Ava', 'Why are you so tired today?', 'I [stayed up] [late] [finishing] [the report] that [was] [due] this morning.', 'finished', 'stay up late + -ing.'),
      g('Ava', 'I lost my student ID card.', '[You] [should] [ask] [the front desk] [whether] [anyone] [has found] it.', null, 'ask + person + whether + statement order.'),
      g('Ava', 'Did you like the documentary?', 'Yes, it [was] [much] [more] [interesting] than [I] [expected] .', 'most', 'much + more + adjective + than.'),
      g('Ava', 'The professor posted our grades.', '[Do] [you] [know] [if] [everyone] [passed] [the exam] ?', 'pass', 'Inside the question: if everyone passed (statement order, past tense; “everyone” is singular, so not “pass”).'),
      g('Ava', 'Why were you late for class?', 'The bus [I] [usually] [take] [did not] [come] on time.', null, 'The bus (that) I usually take is the subject; then “did not come”.'),
      g('Ava', 'I need some advice about my presentation.', '[What] [part] of it [are] [you] [most] [worried] about?', null, 'What part … are you worried about? The preposition stays at the end.', [['What', 'part', 'are', 'you', 'worried', 'most']]),
    ],
  },
  {
    id: 'bas-etsx-4',
    title: 'ETS exact 4',
    items: [
      g('Ben', 'Our team meeting got moved again.', '[Did] [anyone] [tell] [you] [when] it [will] [take place] ?', 'is', 'Did anyone tell you + when + it will (statement order).'),
      g('Ben', 'I’m new to this neighborhood.', '[Could] [you] [recommend] [a place] where [I] [can] [buy] fresh bread?', null, 'a place where + I can (statement order).'),
      g('Ben', 'Why is Tom so happy today?', 'He [just] [found out] [that] [his application] [has been] [accepted] .', null, 'Present perfect passive: has been accepted.'),
      g('Ben', 'I’m going to the airport early tomorrow.', '[What] [time] [does] [your flight] [leave] ?', null, 'does + subject + base verb (leave).'),
      g('Ben', 'What did the librarian say?', 'She [told] [us] [that] [we] [were not] [allowed] to eat in the reading room.', 'allowing', 'be allowed to + verb (passive).'),
      g('Ben', 'I want to improve my English pronunciation.', '[Have] [you] [considered] [joining] [a conversation club] at [the language center] ?', 'to join', 'consider + -ing.'),
      g('Ben', 'The museum is free on Sundays.', 'I [wonder] [why] [I] [didn’t] [know] [about] that before.', null, 'I wonder why + statement order; full stop.'),
      g('Ben', 'Are you taking the bus home?', 'No, my sister [is] [picking] [me] [up] after [her] [shift] .', null, 'pick + me + up: the pronoun goes between the verb and “up”.'),
      g('Ben', 'I heard you changed your major.', 'Yes, I [realized] [that] [economics] [suited] [me] [better] .', 'suit', 'After “realized” the verb is past: suited. “suit” is wrong (wrong tense, and “economics” is singular).'),
      g('Ben', 'Why are you asking about the conference?', 'My [professor] [wants] [to know] [whether] [I] [am] [planning] to attend.', null, 'wants to know + whether + I am planning (statement order).'),
    ],
  },
];
