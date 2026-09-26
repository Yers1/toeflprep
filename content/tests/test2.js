// Practice Test 2 — original content in the January 2026 format.

const mc = (q, choices, answer, explanation) => ({ q, choices, answer, explanation });
const say = (speaker, text) => ({ speaker, text });
const resp = (speaker, prompt, choices, answer, explanation) => ({ speaker, prompt, choices, answer, explanation });
const bas = (speaker, text, reply, prefix, tiles, suffix, distractor, note, alt) =>
  ({ context: { speaker, text }, reply: { speaker: reply }, prefix, tiles, suffix, distractor, note, ...(alt ? { alt } : {}) });

export default {
  id: 'pt2',
  title: 'Practice Test 2',
  description: 'Take this one about a week before your exam. Topics: honeybees, the printing press, desert plants, memory and campus services.',

  // ------------------------------------------------------------ READING --
  reading: {
    m1: [
      { task: 'reading_ctw', item: { id: 'pt2-r-ctw1', title: 'Honeybee communication', text: 'Honeybees share information about food through a remarkable behavior known as the waggle dance. When a forager returns to the hive after finding flowers, it moves in a figure-eight pattern on the vertical surface of the honeycomb. The angle of the dance tells other bees the direction of the food relative to the sun, and the length of the waggling portion indicates the distance. Other workers follow the dancer closely to learn the route.' } },
      { task: 'reading_daily', item: {
        id: 'pt2-r-d1', format: 'schedule', title: 'Writing Center — drop-in hours this week',
        text: 'Monday      10:00–1:00   Main library, Room 110\nTuesday     2:00–6:00    Online only\nWednesday   10:00–1:00   Main library, Room 110\nThursday    CLOSED (staff training)\nFriday      12:00–4:00   Student Center, 2nd floor\n\nSessions last 25 minutes. Bring a printed copy of your draft or share it on screen.',
        questions: [
          mc('When can a student meet a tutor in person on Friday?', ['From 10 to 1 in the library', 'From 12 to 4 in the Student Center', 'From 2 to 6 online', 'The center is closed on Friday'], 1, 'Friday: 12:00–4:00, Student Center.'),
          mc('Why is the center closed on Thursday?', ['It is a holiday', 'Staff are being trained', 'The library is closed', 'Sessions are online only'], 1, '“CLOSED (staff training)”.'),
        ],
      } },
      { task: 'reading_daily', item: {
        id: 'pt2-r-d2', format: 'email',
        meta: { from: 'Campus Parking Office', to: 'All permit holders', subject: 'Lot C closure' },
        text: 'Dear permit holders,\n\nLot C will be closed from April 8 to April 19 while the surface is repaired. During this period, holders of Lot C permits may park in Lot F at no extra cost. A free shuttle will run from Lot F to the main quad every 10 minutes between 7 a.m. and 7 p.m.\n\nVehicles left in Lot C after 6 a.m. on April 8 will be towed at the owner’s expense.\n\nThank you for your patience.',
        questions: [
          mc('What is the main purpose of the email?', ['To announce new parking fees', 'To inform permit holders about a temporary change', 'To advertise a shuttle service', 'To explain towing rules for all lots'], 1, 'It announces the temporary closure of Lot C and alternatives.'),
          mc('What will Lot C permit holders be allowed to do?', ['Park anywhere on campus', 'Park in Lot F without paying more', 'Get a refund for April', 'Leave cars in Lot C overnight'], 1, 'They “may park in Lot F at no extra cost”.'),
          mc('What will happen to a car left in Lot C on the morning of April 8?', ['It will be moved at the owner’s cost', 'The owner will receive a warning', 'It will be parked in Lot F for free', 'Nothing, if the owner has a permit'], 0, 'It “will be towed at the owner’s expense”.'),
        ],
      } },
      { task: 'reading_academic', item: {
        id: 'pt2-r-a1', title: 'The printing press and the spread of ideas',
        text: 'Before the fifteenth century, books in Europe were copied by hand, usually by monks or professional scribes. A single copy of a long book could take months to produce, which made books rare and expensive. Around 1450, Johannes Gutenberg developed a printing press that used movable metal type. Individual letters could be arranged into pages, inked and pressed onto paper, and then rearranged for the next page.\n\nThe effects were dramatic. Within fifty years, printers had produced millions of books across Europe. Because printed copies were identical, scholars in different cities could refer to the same page and line, which made it easier to compare and correct ideas. Prices fell, and reading gradually spread beyond the clergy and the nobility to merchants and craftsmen. Some historians argue that the scientific revolution of the following centuries would have been impossible without print, because discoveries could now circulate quickly and accurately. Not everyone welcomed the change, however: authorities worried that pamphlets could spread criticism faster than they could control it.',
        questions: [
          mc('What is the passage mainly about?', ['The life of Johannes Gutenberg', 'How printing changed the production and spread of books', 'Why monks copied books by hand', 'How paper was invented in Europe'], 1, 'The passage explains the press and its effects.'),
          mc('According to the passage, why were handwritten books expensive?', ['They were made of metal', 'They took a long time to copy', 'Only the nobility could read', 'Scribes were forbidden to sell them'], 1, 'A copy “could take months to produce”.'),
          mc('Why was it important that printed copies were identical?', ['It made books more beautiful', 'Scholars could refer to exactly the same text', 'It reduced the number of printers needed', 'It prevented books from being criticized'], 1, 'Scholars “could refer to the same page and line”.'),
          mc('The word “circulate” in the passage is closest in meaning to', ['be hidden', 'spread', 'be forgotten', 'be tested'], 1, 'Discoveries could spread quickly.'),
          mc('Why does the author mention authorities in the last sentence?', ['To show that the press had opponents', 'To explain how books became cheaper', 'To argue that pamphlets were inaccurate', 'To describe how printers were trained'], 0, 'Authorities “worried” about criticism spreading.'),
        ],
      } },
    ],

    hard: [
      { task: 'reading_ctw', item: { id: 'pt2-r-ctw2', title: 'Language and thought', text: 'Linguists have long debated whether the language we speak shapes the way we think. The strongest version of this idea, which claims that language determines thought, has been largely rejected. However, experiments suggest a weaker influence. Speakers of languages that describe locations using compass directions rather than words like left and right tend to keep track of orientation remarkably well, even indoors. Such findings indicate that habitual language use can train particular kinds of attention.' } },
      { task: 'reading_daily', item: {
        id: 'pt2-r-d3', format: 'notice', title: 'Study abroad information session',
        text: 'Thinking about spending a semester overseas?\n\nJoin us Thursday at 5 p.m. in the International Center to learn about partner universities in 14 countries, scholarship deadlines, and credit transfer.\n\nStudents who attend will receive an application fee waiver (value: $50). Returning students will share their experiences, followed by a Q&A.\n\nCan’t attend? A recording will be posted on the International Center website the next day, but the fee waiver is available only to those present.',
        questions: [
          mc('What benefit is available only to students who attend in person?', ['Access to the recording', 'Information about scholarships', 'Not paying the application fee', 'A list of partner universities'], 2, 'The fee waiver is “available only to those present”.'),
          mc('What will happen the day after the session?', ['Applications will close', 'A recording will become available online', 'Returning students will give another talk', 'Scholarship results will be announced'], 1, 'A recording will be posted “the next day”.'),
          mc('Which topic is NOT mentioned as part of the session?', ['Credit transfer', 'Housing abroad', 'Scholarship deadlines', 'Partner universities'], 1, 'Housing is not mentioned.'),
        ],
      } },
      { task: 'reading_academic', item: {
        id: 'pt2-r-a2', title: 'How desert plants survive',
        text: 'Deserts receive so little rain that most plants would die within weeks, yet many species thrive there. Their success depends on strategies that fall into three broad groups. The first group, known as succulents, stores water. Cacti, for example, have thick stems that swell after rainfall and slowly shrink during dry months. Their leaves have been reduced to spines, which lose almost no water and protect the plant from thirsty animals.\n\nA second group avoids drought instead of resisting it. Many desert wildflowers spend most of their lives as seeds. When heavy rain finally arrives, the seeds germinate, the plants flower and produce new seeds within a few weeks, and the adults die before the soil dries out again. A third group relies on reaching water others cannot. The mesquite tree, for instance, sends roots more than fifty meters down to reach groundwater.\n\nMany desert plants also use a special form of photosynthesis. Instead of opening their pores during the hot day, they open them at night, when cooler air means far less water evaporates, and store carbon dioxide for use the next day.',
        questions: [
          mc('How is the passage organized?', ['By describing one plant in great detail', 'By presenting different survival strategies with examples', 'By comparing deserts on different continents', 'By listing plants in order of size'], 1, 'Three strategies are described with examples, plus photosynthesis.'),
          mc('According to the passage, what is one function of cactus spines?', ['Collecting rainwater', 'Reducing water loss', 'Attracting insects', 'Storing carbon dioxide'], 1, 'Spines “lose almost no water”.'),
          mc('What can be inferred about desert wildflowers?', ['They grow deep roots', 'Their seeds can survive long dry periods', 'They live longer than cacti', 'They flower only at night'], 1, 'They “spend most of their lives as seeds” until rain comes.'),
          mc('The word “germinate” in the passage is closest in meaning to', ['begin to grow', 'fall to the ground', 'dry out', 'change color'], 0, 'Seeds germinate when they start to grow.'),
          mc('Why do some desert plants open their pores at night?', ['To absorb moonlight', 'To lose less water', 'To release seeds', 'To avoid animals'], 1, 'Cooler air means “far less water evaporates”.'),
        ],
      } },
      { task: 'reading_academic', item: {
        id: 'pt2-r-a3', title: 'The spacing effect',
        text: 'Students often prepare for exams by studying intensively the night before, a strategy known as cramming. Research in cognitive psychology suggests that this is one of the least efficient ways to learn. In a classic finding called the spacing effect, people remember information much longer when their study time is distributed across several sessions rather than concentrated in one. Two students who each study for three hours may perform similarly on a test the next morning, but a week later, the student who studied in three separate one-hour sessions typically remembers far more.\n\nWhy does spacing work? One explanation is that forgetting is actually useful. When some time has passed and a memory has started to fade, the effort of retrieving it strengthens it more than easy repetition does. Another explanation emphasizes context: studying in different sessions links the material to a variety of situations, which provides more cues for recall later. Despite strong evidence, spacing remains underused, partly because cramming produces a feeling of fluency that learners mistake for lasting knowledge.',
        questions: [
          mc('What is the passage mainly about?', ['Why exams should be replaced', 'The benefits of spreading study over time', 'How to avoid forgetting completely', 'Why students should study at night'], 1, 'The passage explains the spacing effect.'),
          mc('According to the passage, how do two students with equal study time differ a week later?', ['The one who crammed remembers more', 'The one who spaced study remembers more', 'Both remember equally', 'Neither remembers anything'], 1, 'The spaced learner “typically remembers far more”.'),
          mc('Why does the author say “forgetting is actually useful”?', ['Because it frees space in the brain', 'Because effortful retrieval strengthens memory', 'Because it reduces stress', 'Because it makes studying faster'], 1, 'Retrieving a fading memory “strengthens it more than easy repetition”.'),
          mc('The word “distributed” in the passage is closest in meaning to', ['spread out', 'repeated', 'shortened', 'organized'], 0, 'Study time spread across sessions.'),
          mc('According to the passage, why do many learners still cram?', ['They lack time to study earlier', 'Cramming creates a misleading sense of mastery', 'Teachers recommend it', 'Spacing is harder to schedule than exams'], 1, 'Cramming “produces a feeling of fluency that learners mistake for lasting knowledge”.'),
        ],
      } },
    ],

    easy: [
      { task: 'reading_ctw', item: { id: 'pt2-r-ctw3', title: 'Public libraries today', text: 'Public libraries have changed a great deal in recent years. In addition to lending books, many libraries now offer free internet access, language classes and help with job applications. Some even lend unusual items such as tools, musical instruments and cameras. Because these services are free, libraries play an important role for people who cannot afford them. They are also quiet, safe places where students can study after school.' } },
      { task: 'reading_daily', item: {
        id: 'pt2-r-d4', format: 'poster', title: 'Lost and found',
        text: 'FOUND: Black umbrella with a wooden handle\nLeft in Lecture Hall B on Monday afternoon.\nTo claim it, describe the umbrella at the Security Office (open 24 hours).',
        questions: [
          mc('Where was the umbrella found?', ['In the Security Office', 'In Lecture Hall B', 'In the library', 'At the bus stop'], 1, '“Left in Lecture Hall B”.'),
          mc('What must the owner do to get the umbrella back?', ['Pay a small fee', 'Describe it at the Security Office', 'Call the lecture hall', 'Wait until Monday'], 1, '“Describe the umbrella at the Security Office.”'),
        ],
      } },
      { task: 'reading_daily', item: {
        id: 'pt2-r-d5', format: 'text', title: 'Text message',
        text: 'Hi Sara, it’s Ms. Lopez from the dentist’s office. Your appointment tomorrow has been moved from 3:00 to 4:30 because Dr. Kim has an emergency. Please reply YES to confirm or call us to choose another day.',
        questions: [
          mc('Why was the appointment changed?', ['Sara asked to change it', 'The dentist has an emergency', 'The office is closed', 'Sara was late last time'], 1, '“Because Dr. Kim has an emergency.”'),
          mc('What time is the new appointment?', ['3:00', '4:00', '4:30', 'It has not been decided'], 2, 'Moved “from 3:00 to 4:30”.'),
          mc('What should Sara do if the new time is fine?', ['Call the office', 'Reply YES', 'Come at 3:00', 'Choose another day'], 1, '“Please reply YES to confirm.”'),
        ],
      } },
      { task: 'reading_daily', item: {
        id: 'pt2-r-d6', format: 'receipt', title: 'Green Market — receipt',
        text: 'Apples (1 kg) ........ $3.20\nBread ........ $2.50\nMilk ........ $1.80\nReusable bag ........ $1.00\n-----------------------------\nTotal ........ $8.50\nMember discount (5%) applied at checkout next visit.',
        questions: [
          mc('What was the most expensive item?', ['Bread', 'Apples', 'Milk', 'The reusable bag'], 1, 'Apples cost $3.20.'),
          mc('What is true about the member discount?', ['It was applied to this purchase', 'It will be applied on the next visit', 'It is 10 percent', 'It is only for bread'], 1, '“Applied at checkout next visit.”'),
          mc('How much did the customer pay in total?', ['$7.50', '$8.50', '$9.50', '$8.00'], 1, 'Total: $8.50.'),
        ],
      } },
      { task: 'reading_academic', item: {
        id: 'pt2-r-a4', title: 'Why leaves change color',
        text: 'In many parts of the world, trees turn red, orange and yellow in autumn. The colors come from chemicals inside the leaves. During spring and summer, leaves are full of chlorophyll, a green pigment that helps plants use sunlight to make food. Chlorophyll is so plentiful that it hides other colors.\n\nAs the days become shorter and colder, trees stop producing chlorophyll and begin to break it down. When the green disappears, yellow and orange pigments that were there all along become visible. Red colors are different: some trees actually produce new red pigments in autumn, possibly to protect the leaves from strong light while the tree takes back useful nutrients. Weather affects the colors too. Sunny days and cool nights usually produce the brightest reds, while a warm, cloudy autumn often leads to duller colors.',
        questions: [
          mc('What is the passage mainly about?', ['How trees grow new leaves', 'Why leaves change color in autumn', 'How sunlight is used by animals', 'Why some trees stay green'], 1, 'The passage explains autumn colors.'),
          mc('Why are yellow colors not visible in summer?', ['They do not exist yet', 'Chlorophyll hides them', 'The sun destroys them', 'They are only in the roots'], 1, 'Chlorophyll “hides other colors”.'),
          mc('The word “plentiful” in the passage is closest in meaning to', ['rare', 'abundant', 'dark', 'weak'], 1, 'Plentiful means existing in large amounts.'),
          mc('How are red colors different from yellow ones?', ['Red pigments are newly produced in autumn', 'Red pigments are present all summer', 'Red colors come from chlorophyll', 'Red colors appear only in spring'], 0, 'Some trees “produce new red pigments in autumn”.'),
          mc('What weather produces the brightest red leaves?', ['Warm and cloudy days', 'Rainy nights', 'Sunny days and cool nights', 'Strong winds'], 2, '“Sunny days and cool nights usually produce the brightest reds.”'),
        ],
      } },
    ],
  },

  // ---------------------------------------------------------- LISTENING --
  listening: {
    m1: [
      { task: 'listening_response', item: { id: 'pt2-l-r1', items: [
        resp('A', 'Have you registered for next semester yet?', ['Not yet, the system opens tomorrow.', 'I registered my bike.', 'Next semester starts in January, I think it was.', 'Yes, it was a good semester.'], 0, 'A direct answer with a reason.'),
        resp('B', 'I heard the chemistry exam was moved.', ['Yes, to next Tuesday.', 'I moved to a new apartment.', 'Chemistry is my favorite subject.', 'The exam was on paper.'], 0, 'Confirming the news with a detail.'),
        resp('A', 'Could you keep an eye on my bag for a minute?', ['Sure, go ahead.', 'My eyes are tired.', 'It’s a nice bag.', 'I have a minute bag.'], 0, '“Keep an eye on” means watch; agreeing is natural.'),
        resp('B', 'Why don’t we try the new Thai restaurant tonight?', ['I’d love to, but I have a lab report due.', 'Because it’s Thai.', 'They opened last month, didn’t they?', 'I tried it on the menu.'], 0, 'Politely declining a suggestion with a reason.'),
        resp('A', 'I can never find a seat in this library.', ['Try the fourth floor — it’s usually quieter.', 'The library has a lot of books.', 'I found my keys.', 'Seats are comfortable.'], 0, 'Offering a helpful suggestion.'),
        resp('B', 'Did you end up going to the career fair?', ['I did, and I got two interviews.', 'The fair is in the gym.', 'My career is in science.', 'I went to the end.'], 0, '“End up” asks what finally happened.'),
        resp('A', 'Is this seat taken?', ['No, please sit down.', 'I took it yesterday.', 'It’s a blue seat.', 'Taken by the bus.'], 0, 'The standard reply to a request for a seat.'),
        resp('B', 'You look like you could use a coffee.', ['Is it that obvious? I barely slept.', 'Coffee is a drink.', 'I look at my coffee.', 'The café closes at five.'], 0, 'The speaker implies tiredness; the reply acknowledges it.'),
      ] } },
      { task: 'listening_conversation', item: {
        id: 'pt2-l-c1', title: 'Tutoring center', context: 'Listen to a conversation between a student and a tutoring center employee.',
        roles: { Student: 'B', Employee: 'A' },
        lines: [
          say('Student', 'Hi. I’d like to sign up for math tutoring. I’m really struggling with calculus.'),
          say('Employee', 'Sure. We have two options: weekly one-on-one sessions, or small-group sessions twice a week.'),
          say('Student', 'What’s the difference, besides the number of students?'),
          say('Employee', 'One-on-one is better if you have specific gaps. Groups follow the course schedule, so they’re good for keeping up with each week’s material.'),
          say('Student', 'My problem is that I missed the first two weeks because I joined the class late.'),
          say('Employee', 'Then I’d start with a few one-on-one sessions to catch up, and switch to the group afterward.'),
          say('Student', 'That makes sense. Can I book the first one for tomorrow?'),
        ],
        questions: [
          mc('Why is the student having difficulty in calculus?', ['The group sessions are too large', 'He started the course late', 'He does not like the professor', 'The textbook is too difficult'], 1, 'He “missed the first two weeks”.'),
          mc('What does the employee recommend?', ['Joining the group immediately', 'Dropping the course', 'Beginning with individual sessions', 'Studying alone for two weeks'], 2, 'Start with one-on-one to catch up, then switch to the group.'),
        ],
      } },
      { task: 'listening_announcement', item: {
        id: 'pt2-l-an1', title: 'Class announcement', context: 'Listen to an announcement at the beginning of a class.',
        roles: { Professor: 'B' },
        lines: [say('Professor', 'Before we start, a quick reminder. Your project proposals are due next Friday, not this Friday as the syllabus says — I made a mistake there. Please submit them through the course website, not by email. Also, the guest speaker I mentioned will visit on the twentieth, so attendance that day will count toward your participation grade.')],
        questions: [
          mc('What is the professor correcting?', ['The topic of the project', 'The due date of the proposals', 'The name of the guest speaker', 'The way participation is graded'], 1, 'The proposals are due “next Friday, not this Friday”.'),
          mc('How should students submit their proposals?', ['By email', 'In person', 'Through the course website', 'To the guest speaker'], 2, '“Through the course website, not by email.”'),
        ],
      } },
      { task: 'listening_academic', item: {
        id: 'pt2-l-t1', title: 'Psychology lecture', context: 'Listen to part of a lecture in a psychology class.',
        roles: { Professor: 'A' },
        lines: [say('Professor', 'Have you ever walked into a room and completely forgotten why you went there? Psychologists call this the doorway effect. In one set of experiments, participants carried objects through a virtual environment. Some walked through a doorway into a new room; others walked the same distance within one room. Those who passed through a doorway forgot more about the objects they were carrying. The explanation is that our memory organizes experience into episodes, and a doorway signals the end of one episode and the start of another. Information tied to the old episode becomes harder to access. Interestingly, when participants returned to the original room, their memory improved. So if you forget why you entered the kitchen, going back to where you had the thought really can help.')],
        questions: [
          mc('What is the lecture mainly about?', ['Why people get lost in buildings', 'How passing through doorways can affect memory', 'How to design virtual environments', 'Why kitchens are hard to remember'], 1, 'The lecture explains the doorway effect.'),
          mc('In the experiment, which participants forgot more?', ['Those who stayed in one room', 'Those who walked through a doorway', 'Those who carried heavy objects', 'Those who walked more slowly'], 1, 'Participants who passed through a doorway forgot more.'),
          mc('According to the professor, why does the doorway effect happen?', ['Doorways are distracting', 'Memory divides experience into episodes', 'People walk faster through doors', 'New rooms have more objects'], 1, 'A doorway “signals the end of one episode”.'),
          mc('What does the professor suggest doing when you forget why you entered a room?', ['Write a list', 'Go back to the original place', 'Close the door', 'Keep walking'], 1, 'Returning to the original room improved memory.'),
        ],
      } },
    ],

    hard: [
      { task: 'listening_response', item: { id: 'pt2-l-r2', items: [
        resp('A', 'I’m surprised you didn’t apply for the scholarship.', ['I did — I just didn’t mention it to anyone.', 'The scholarship is for engineering.', 'I was surprised too, it was a party.', 'Apply it to your essay.'], 0, 'Correcting a false assumption.'),
        resp('B', 'The seminar room is freezing again.', ['I’ll ask maintenance to check the heating.', 'It freezes at zero degrees.', 'The seminar is about climate.', 'Room 3 is again.'], 0, 'Responding to an implied complaint with action.'),
        resp('A', 'You wouldn’t happen to have a spare charger, would you?', ['Actually, I do — here you go.', 'I happened to be there.', 'Chargers are expensive.', 'I would, thank you.'], 0, 'A polite indirect request answered with an offer.'),
        resp('B', 'I’m not sure the data supports your conclusion.', ['Which part seems weak to you?', 'I concluded yesterday.', 'The data is on my laptop.', 'Yes, I’m sure about that too.'], 0, 'Asking for clarification of a criticism.'),
        resp('A', 'Weren’t you supposed to present today?', ['It got pushed to Thursday.', 'I supposed so.', 'The presentation was long.', 'Today is a present.'], 0, 'Explaining a change of plan.'),
      ] } },
      { task: 'listening_conversation', item: {
        id: 'pt2-l-c2', title: 'Research assistant position', context: 'Listen to a conversation between a student and a professor.',
        roles: { Student: 'A', Professor: 'B' },
        lines: [
          say('Student', 'Professor Hill, I saw that your lab is looking for a research assistant. I’m very interested.'),
          say('Professor', 'Great. The project studies how noise in cities affects birdsong. The assistant would mostly process audio recordings.'),
          say('Student', 'I haven’t worked with audio before, but I’ve used statistical software in my ecology courses.'),
          say('Professor', 'That’s actually more important. We can train you on the audio tools in a week, but the statistics take much longer to learn.'),
          say('Student', 'How many hours a week would it be?'),
          say('Professor', 'About ten. The schedule is flexible, except for one field trip each month, which is usually on a Saturday morning.'),
          say('Student', 'That works for me. Should I send you my CV?'),
          say('Professor', 'Yes, and include a short note about the statistics projects you mentioned.'),
        ],
        questions: [
          mc('Why is the professor not concerned about the student’s lack of audio experience?', ['The project will not use audio', 'Audio skills can be taught quickly', 'Another assistant handles audio', 'The student can learn it later in the year'], 1, 'They “can train you on the audio tools in a week”.'),
          mc('What does the professor ask the student to include with the CV?', ['A recording of birdsong', 'Information about statistics projects', 'A list of available Saturdays', 'A reference letter'], 1, '“Include a short note about the statistics projects.”'),
        ],
      } },
      { task: 'listening_academic', item: {
        id: 'pt2-l-t2', title: 'Art history lecture', context: 'Listen to part of a lecture in an art history class.',
        roles: { Professor: 'B' },
        lines: [say('Professor', 'When photography was invented in the 1830s, many painters feared it would make their work obsolete. After all, why pay for a portrait when a camera could capture a face exactly? And for a while, portrait painters did lose business. But in the long run, photography pushed painting in new directions. Freed from the need to record reality precisely, artists began to explore what a camera couldn’t do: color, emotion, the changing effects of light. The Impressionists, for instance, painted quick, visible brushstrokes to capture a fleeting moment rather than every detail. Interestingly, some painters also borrowed from photography — the unusual, cut-off compositions of certain Impressionist works resemble snapshots. So photography didn’t replace painting; it changed the question painters were trying to answer.')],
        questions: [
          mc('What is the main idea of the lecture?', ['Photography ended the careers of most painters', 'Photography led painters to explore new approaches', 'Impressionists refused to use cameras', 'Portrait painting became more popular after 1830'], 1, 'Photography “pushed painting in new directions”.'),
          mc('According to the professor, what did artists begin to focus on?', ['Exact portraits of wealthy clients', 'Things a camera could not capture well', 'Black-and-white images', 'Copying photographs precisely'], 1, 'They explored “what a camera couldn’t do”.'),
          mc('Why does the professor mention “snapshots”?', ['To show that painters also learned from photography', 'To explain how cameras worked', 'To criticize Impressionist compositions', 'To describe how photos were printed'], 0, 'Some compositions “resemble snapshots” — painters borrowed from photography.'),
          mc('What does the professor mean by saying photography “changed the question painters were trying to answer”?', ['Painters stopped asking clients questions', 'The purpose of painting shifted', 'Painting became a scientific field', 'Painters began to write about photography'], 1, 'Painting’s goal shifted from recording reality to other aims.'),
        ],
      } },
      { task: 'listening_academic', item: {
        id: 'pt2-l-t3', title: 'Environmental science lecture', context: 'Listen to part of a lecture in an environmental science class.',
        roles: { Professor: 'A' },
        lines: [say('Professor', 'Let’s talk about wolves in Yellowstone National Park. Wolves disappeared from the park in the 1920s, and for seventy years elk populations grew with few predators. The elk ate young willow and aspen trees along the rivers, so those trees declined. In 1995, wolves were reintroduced. Many scientists expected the wolves to reduce elk numbers, and they did. But researchers also reported changes further down the food chain: willows recovered in some areas, which provided habitat for birds and material for beavers, whose dams then changed how the streams flowed. This chain of effects is called a trophic cascade. Now, I should add that the story is debated. Some recent studies argue that the recovery of trees has been patchier than early reports suggested, and that other factors, like drought and human hunting of elk, also mattered.')],
        questions: [
          mc('What is the lecture mainly about?', ['How beavers build dams', 'Effects of reintroducing wolves to Yellowstone', 'Why elk populations declined in the 1920s', 'How to measure drought in national parks'], 1, 'The lecture describes the effects of the wolves’ return.'),
          mc('What happened to trees along the rivers while wolves were absent?', ['They grew faster', 'They declined because elk ate them', 'Beavers cut them down', 'Drought killed them all'], 1, 'Elk “ate young willow and aspen trees”.'),
          mc('What is a “trophic cascade”?', ['A series of effects moving through a food chain', 'A type of waterfall in the park', 'A method of counting wolves', 'A disease affecting elk'], 0, 'The professor defines it as this chain of effects.'),
          mc('What is the professor’s attitude toward the Yellowstone story?', ['She thinks it is completely proven', 'She believes it is mostly false', 'She presents it as partly uncertain', 'She thinks wolves should be removed again'], 2, 'She says “the story is debated”.'),
        ],
      } },
    ],

    easy: [
      { task: 'listening_response', item: { id: 'pt2-l-r3', items: [
        resp('A', 'Which bus goes to the airport?', ['Number 12, from the main station.', 'At six in the morning.', 'It costs three dollars.', 'I like flying.'], 0, '“Which bus” asks for a specific bus.'),
        resp('B', 'Do you want to study together tonight?', ['Sure, what time works for you?', 'I studied last night.', 'Tonight is cold.', 'Together is better.'], 0, 'Accepting and asking for a time.'),
        resp('A', 'I lost my student card.', ['You can get a new one at the main office.', 'Cards are small.', 'I have a card.', 'It was lost in class.'], 0, 'Giving practical advice.'),
        resp('B', 'How was your weekend?', ['Relaxing — I mostly read.', 'Next weekend.', 'It’s Saturday and Sunday.', 'I’m going on the weekend.'], 0, 'Describing a past weekend.'),
        resp('A', 'Could you turn the music down a little?', ['Oh, sorry — of course.', 'The music is jazz.', 'I turned left.', 'A little music.'], 0, 'Apologizing and agreeing to a request.'),
        resp('B', 'Is there a pharmacy near here?', ['Yes, next to the post office.', 'I need medicine.', 'It opens at nine.', 'Near is good.'], 0, 'Giving a location.'),
        resp('A', 'When is your flight?', ['On Thursday evening.', 'To Madrid.', 'About ten hours.', 'By plane.'], 0, '“When” asks for a time.'),
      ] } },
      { task: 'listening_conversation', item: {
        id: 'pt2-l-c3', title: 'Gym membership', context: 'Listen to a conversation at the campus gym.',
        roles: { Student: 'A', Staff: 'B' },
        lines: [
          say('Student', 'Hi, how much is a membership for the semester?'),
          say('Staff', 'For students, it’s sixty dollars. That includes the pool and all fitness classes.'),
          say('Student', 'Do I need to sign up for the classes in advance?'),
          say('Staff', 'Only for yoga, because it’s very popular. You can book online the day before.'),
          say('Student', 'Great. Can I pay by card?'),
          say('Staff', 'Yes, card or cash is fine.'),
        ],
        questions: [
          mc('What does the student want to do?', ['Cancel a membership', 'Buy a membership', 'Teach a yoga class', 'Find the pool'], 1, 'The student asks about the price of a membership.'),
          mc('Which classes must be booked in advance?', ['All classes', 'Swimming classes', 'Yoga classes', 'None of the classes'], 2, '“Only for yoga.”'),
        ],
      } },
      { task: 'listening_conversation', item: {
        id: 'pt2-l-c4', title: 'Borrowing notes', context: 'Listen to a conversation between two classmates.',
        roles: { Jin: 'B', Ella: 'A' },
        lines: [
          say('Jin', 'Ella, were you in history class on Tuesday? I was sick.'),
          say('Ella', 'Yes. We talked about the Industrial Revolution. I can send you my notes.'),
          say('Jin', 'That would be great. Did the professor give any homework?'),
          say('Ella', 'Just a short reading — chapter six. And there’s a quiz next Monday.'),
          say('Jin', 'Thanks, I’ll read it this weekend.'),
        ],
        questions: [
          mc('Why did Jin miss class?', ['He was sick', 'He was traveling', 'He forgot', 'He had a job interview'], 0, '“I was sick.”'),
          mc('What will happen next Monday?', ['A trip to a museum', 'A quiz', 'A presentation', 'No class'], 1, '“There’s a quiz next Monday.”'),
        ],
      } },
      { task: 'listening_announcement', item: {
        id: 'pt2-l-an2', title: 'Train station announcement', context: 'Listen to an announcement at a train station.',
        roles: { Announcer: 'A' },
        lines: [say('Announcer', 'Attention, passengers. The 5:15 train to Riverside will depart from platform 4 instead of platform 2. The train is running about ten minutes late. Passengers for Riverside, please move to platform 4 now. We are sorry for the delay.')],
        questions: [
          mc('What has changed about the Riverside train?', ['Its destination', 'Its platform', 'Its price', 'It has been canceled'], 1, 'It departs “from platform 4 instead of platform 2”.'),
          mc('How late is the train?', ['About five minutes', 'About ten minutes', 'About fifteen minutes', 'It is on time'], 1, '“About ten minutes late.”'),
        ],
      } },
    ],
  },

  // ------------------------------------------------------------ WRITING --
  writing: [
    { task: 'writing_sentence', item: { id: 'pt2-w-bas', items: [
      bas('Nina', 'Did you get the job at the museum?', 'Paul', 'I don’t know yet. They', ['said', 'they', 'would', 'call me', 'by'], 'Friday.', 'will', 'Reported speech: will → would.'),
      bas('Nina', 'Why is the road closed?', 'Paul', 'A new bridge', ['is', 'being', 'built', 'over', 'the river'], '.', 'building', 'Present continuous passive.'),
      bas('Nina', 'What should I bring to the picnic?', 'Paul', '', ['It', 'would be', 'great', 'if', 'you'], 'could bring some fruit.', 'will', 'Polite suggestion: It would be great if you could…'),
      bas('Nina', 'How did you learn to speak Spanish so well?', 'Paul', 'I', ['lived', 'with', 'a family', 'in Mexico', 'for'], 'a whole year.', 'since', '“For” + a period of time.', [['lived', 'in Mexico', 'with', 'a family', 'for']]),
      bas('Nina', 'Have you finished your application?', 'Paul', 'Almost. I', ['just', 'need', 'to', 'ask', 'my professor'], 'for a reference.', 'asking', '“Need to + base verb”.'),
      bas('Nina', 'Can you explain why the experiment failed?', 'Paul', '', ['We', 'think', 'the samples', 'were', 'contaminated'], 'during transport.', 'contaminating', 'Passive past: were + past participle.'),
      bas('Nina', 'Where did you find this old map?', 'Paul', 'In a shop', ['that', 'sells', 'antique', 'books', 'and'], 'prints.', 'sell', '“A shop that sells” — singular verb.'),
      bas('Nina', 'I’m thinking about changing my major.', 'Paul', '', ['What', 'made', 'you', 'decide', 'to'], 'change it?', 'deciding', '“Make + object + base verb”.'),
      bas('Nina', 'Is it going to rain tomorrow?', 'Paul', 'According to the forecast,', ['it', 'will', 'probably', 'rain', 'all'], 'afternoon.', 'rains', 'Future prediction with will + probably.', [['it', 'probably', 'will', 'rain', 'all']]),
      bas('Nina', 'Did anyone call while I was out?', 'Paul', 'Yes, your advisor', ['wanted', 'to know', 'if', 'you', 'had'], 'submitted the form.', 'did', 'Indirect question with “if” and past perfect.'),
    ] } },
    { task: 'writing_email', item: {
      id: 'pt2-w-email', title: 'Volunteer schedule conflict',
      scenario: 'You volunteer every Saturday at a local animal shelter. Next month, you have been chosen to represent your university at a weekend debate tournament that takes place on two Saturdays. You want to keep volunteering at the shelter.',
      to: 'Ms. Barnes, volunteer coordinator', subject: 'Saturday shifts next month', register: 'formal',
      goals: [
        { text: 'Explain why you cannot volunteer on two Saturdays', keywords: ['debate', 'tournament', 'represent', 'competition', 'university'] },
        { text: 'Express your commitment to the shelter', keywords: ['enjoy', 'love', 'commit', 'continue', 'important', 'keep volunteering', 'want to keep'] },
        { text: 'Suggest a way to make up the missed shifts', keywords: ['instead', 'weekday', 'sunday', 'extra', 'make up', 'another day', 'evening', 'swap'] },
      ],
      model: { text: 'Dear Ms. Barnes,\n\nI am writing to let you know about a schedule conflict next month. I have been selected to represent my university at a regional debate tournament, which takes place on the weekends of May 10 and May 24. As a result, I will not be able to come to my Saturday shifts on those two days.\n\nI want to stress that volunteering at the shelter is very important to me. Working with the dogs has become the highlight of my week, and I do not want to leave the team short-staffed.\n\nWould it be possible for me to make up the missed hours on Sunday mornings or on Wednesday evenings instead? I could also help with the adoption event in June if you still need volunteers.\n\nThank you for your understanding.\nBest regards,\nAmir Hassan', notes: 'Specific dates, a sincere commitment, and two concrete alternatives.' },
    } },
    { task: 'writing_discussion', item: {
      id: 'pt2-w-disc', course: 'media studies',
      professor: { name: 'Professor Klein', text: 'News organizations increasingly use algorithms to decide which stories each reader sees. This personalizes the news, but critics say it can trap people in “filter bubbles” where they only encounter views they already agree with. Should news websites personalize content for each reader? Why or why not?' },
      students: [
        { name: 'Lena', text: 'Personalization is useful. There is too much news, and I only have time to read about topics that matter to me, like science and my city.' },
        { name: 'Omar', text: 'The danger is that people stop seeing different perspectives. A democracy needs citizens who understand opposing opinions.' },
      ],
      model: { text: 'I think news websites should personalize content, but only for topics, not for opinions. Lena makes a practical point: nobody can read everything, and it is reasonable to see more stories about science if that is what you care about. The problem Omar describes appears when algorithms also learn which political views you prefer and hide the others. For example, my father reads a news app that slowly started showing him only articles criticizing one political party, simply because he clicked on a few of them. He did not realize how one-sided his feed had become until we compared it with mine. A better design would let readers choose their topics while always including a section of important stories that everyone sees, with a range of viewpoints. That way, personalization saves time without narrowing people’s understanding.', notes: 'Clear distinction, engages both classmates, and a personal example that illustrates the risk.' },
    } },
  ],

  // ----------------------------------------------------------- SPEAKING --
  speaking: [
    { task: 'speaking_repeat', item: {
      id: 'pt2-s-lr', scene: 'Science building tour', icon: '🔬',
      intro: 'A graduate student is showing visitors around the science building.',
      sentences: [
        'This is the main science building.',
        'The labs on this floor study plants.',
        'Visitors must wear a badge at all times.',
        'The greenhouse on the roof is open on Friday afternoons.',
        'Most of the equipment in this room was purchased last year.',
        'Undergraduate students can apply to work on research projects during the summer.',
        'Please do not touch any of the samples, because some of them are being used in long-term experiments.',
      ],
    } },
    { task: 'speaking_interview', item: {
      id: 'pt2-s-iv', topic: 'Cities and transportation',
      intro: 'A city researcher is interviewing students about how they travel.',
      questions: [
        'How do you usually get to school or work?',
        'Describe a time when public transportation made your day difficult or easier.',
        'Should public transportation be free for students? Why or why not?',
        'Some people think self-driving cars will solve traffic problems in cities. Do you agree? Explain your view.',
      ],
    } },
  ],
};
