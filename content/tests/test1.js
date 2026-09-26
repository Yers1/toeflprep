// Practice Test 1 — original content in the January 2026 format.

const mc = (q, choices, answer, explanation) => ({ q, choices, answer, explanation });
const say = (speaker, text) => ({ speaker, text });
const resp = (speaker, prompt, choices, answer, explanation) => ({ speaker, prompt, choices, answer, explanation });
const bas = (speaker, text, reply, prefix, tiles, suffix, distractor, note, alt) =>
  ({ context: { speaker, text }, reply: { speaker: reply }, prefix, tiles, suffix, distractor, note, ...(alt ? { alt } : {}) });

export default {
  id: 'pt1',
  title: 'Practice Test 1',
  description: 'Recommended as your diagnostic. Topics: coral reefs, early writing systems, urban heat, bird migration and campus life.',

  // ------------------------------------------------------------ READING --
  reading: {
    m1: [
      { task: 'reading_ctw', item: { id: 'pt1-r-ctw1', title: 'Coral reefs', text: 'Coral reefs cover less than one percent of the ocean floor, yet they support about a quarter of all marine species. The reefs are built by tiny animals called polyps, which live in colonies and produce hard skeletons of calcium carbonate. Over thousands of years, these skeletons accumulate and form large structures. Many polyps also depend on algae that live inside their tissues and supply them with food.' } },
      { task: 'reading_daily', item: {
        id: 'pt1-r-d1', format: 'notice', title: 'Recycling update — North Residence Hall',
        text: 'Starting March 3, blue bins will accept all clean plastic containers, not only bottles.\n\nPizza boxes with grease stains must go in the regular trash.\n\nBatteries and old phones can be dropped off at the front desk on weekdays from 9 a.m. to 5 p.m.',
        questions: [
          mc('What is new starting March 3?', ['Blue bins will accept more types of plastic', 'Pizza boxes can be recycled', 'The front desk will open on weekends', 'Bottles can no longer be recycled'], 0, 'Blue bins will accept all clean plastic containers, “not only bottles”.'),
          mc('Where should a resident put a greasy pizza box?', ['In the blue bin', 'At the front desk', 'In the regular trash', 'In a battery container'], 2, 'Boxes with grease stains “must go in the regular trash”.'),
        ],
      } },
      { task: 'reading_daily', item: {
        id: 'pt1-r-d2', format: 'email',
        meta: { from: 'Priya Shah', to: 'Study group', subject: 'Change of plans for Thursday' },
        text: 'Hi everyone,\n\nThe room we booked in the library for Thursday is closed for painting, so I reserved Room 204 in the Science Building instead. It has a large screen, which will make it easier to practice our slides. We still start at 4:00, but please arrive ten minutes early because the building locks its side door after 4.\n\nIf anyone can’t make it, let me know by Wednesday night so I can divide the sections again.\n\nPriya',
        questions: [
          mc('Why is the group meeting in a different room?', ['The library room is too small', 'The library room is being painted', 'The Science Building is closer', 'The group needs a projector'], 1, 'The library room “is closed for painting”.'),
          mc('Why does Priya ask members to arrive early?', ['To set up the large screen', 'To choose new sections', 'Because a door will be locked', 'Because the meeting starts earlier'], 2, 'The building “locks its side door after 4”.'),
          mc('What should members who cannot attend do?', ['Tell Priya by Wednesday night', 'Reserve another room', 'Practice their slides alone', 'Send their sections by Thursday'], 0, 'She asks them to “let me know by Wednesday night”.'),
        ],
      } },
      { task: 'reading_academic', item: {
        id: 'pt1-r-a1', title: 'The origins of writing',
        text: 'Writing appears to have been invented independently in at least three places: Mesopotamia, China and Mesoamerica. In Mesopotamia, the earliest known system developed around 3200 BCE, and it did not begin as a way to record language. Instead, it grew out of accounting. Farmers and temple officials used small clay tokens to represent quantities of goods such as grain or sheep, and eventually they simply drew the symbols on clay tablets.\n\nThese early signs were largely pictures of objects, but pictures have clear limits. It is easy to draw a sheep, yet difficult to draw an idea such as “owe” or a personal name. Scribes solved this problem by using some signs for their sound rather than their meaning, much as a picture of a bee and a leaf might spell “belief” in English. This shift toward sound allowed writing to record complete sentences, and within a few centuries it was used for letters, laws and literature. What began as a tool for counting had become a way to preserve thought itself.',
        questions: [
          mc('What is the passage mainly about?', ['How writing spread from Mesopotamia to China', 'How a system for recording goods became a full writing system', 'Why clay was the best material for early writing', 'How scribes were trained in ancient temples'], 1, 'The passage traces writing from accounting to a system that could record complete sentences.'),
          mc('According to the passage, the earliest Mesopotamian writing was first used to', ['record stories about the gods', 'keep track of goods', 'teach children to read', 'send letters between cities'], 1, 'It “grew out of accounting” and represented quantities of goods.'),
          mc('The word “preserve” in the passage is closest in meaning to', ['keep', 'change', 'share', 'explain'], 0, 'To preserve thought is to keep it.'),
          mc('Why does the author mention “a picture of a bee and a leaf”?', ['To show that early writing used English words', 'To illustrate how signs could represent sounds', 'To give an example of a symbol for an animal', 'To explain why pictures were easy to draw'], 1, 'The example shows combining signs for their sound to spell a word.'),
          mc('What can be inferred about a writing system made only of pictures?', ['It could express abstract ideas easily', 'It was invented after sound-based signs', 'It could not easily record complete sentences', 'It was used only in China'], 2, 'Pictures “have clear limits”; the shift to sound “allowed writing to record complete sentences”.'),
        ],
      } },
    ],

    hard: [
      { task: 'reading_ctw', item: { id: 'pt1-r-ctw2', title: 'Sleep and memory consolidation', text: 'Researchers have long suspected that sleep plays a central role in learning. During the deepest stages of sleep, the brain appears to replay patterns of activity that were recorded during the day, strengthening the connections that represent new memories. Experiments show that participants who sleep after studying a list of words recall significantly more of them than participants who remain awake for the same period. Interestingly, the benefit is greatest for information that people expect to need later.' } },
      { task: 'reading_daily', item: {
        id: 'pt1-r-d3', format: 'notice', title: 'Research participants wanted',
        text: 'The Department of Psychology is looking for right-handed volunteers aged 18–30 for a 45-minute study on decision-making.\n\nParticipants will play a simple computer game while their eye movements are recorded. No personal data will be shared outside the research team.\n\nCompensation: $15 gift card or one course credit (Psychology 101 students only).\n\nSign up online by October 20. Sessions take place in Room B12, Hart Hall.',
        questions: [
          mc('Who is eligible to take part?', ['Any student enrolled in Psychology 101', 'Right-handed people between 18 and 30', 'Students who have played the game before', 'Volunteers of any age who can use a computer'], 1, 'The notice asks for “right-handed volunteers aged 18–30”.'),
          mc('What will be measured during the study?', ['Participants’ reaction time only', 'Participants’ eye movements', 'Participants’ personal data', 'Participants’ course grades'], 1, 'Eye movements “are recorded”.'),
          mc('What is true about the course credit?', ['It is offered to every participant', 'It replaces the gift card for all students', 'Only students in one course can choose it', 'It requires a second session'], 2, 'Course credit is for “Psychology 101 students only”.'),
        ],
      } },
      { task: 'reading_academic', item: {
        id: 'pt1-r-a2', title: 'Urban heat islands',
        text: 'On a summer afternoon, the center of a large city can be several degrees warmer than the surrounding countryside. This phenomenon, known as the urban heat island effect, results from the way cities alter the landscape. Dark surfaces such as asphalt roads and rooftops absorb most of the sunlight that strikes them and release the stored heat slowly, especially after sunset. Meanwhile, the vegetation that would cool the air through evaporation has largely been removed. Tall buildings compound the problem by trapping warm air and blocking breezes.\n\nThe consequences are more than a matter of comfort. Higher temperatures increase the demand for air conditioning, which in turn raises energy consumption and emissions. During heat waves, the effect can be dangerous, particularly for elderly residents in poorly ventilated apartments. Cities have responded with a range of strategies. Some require new buildings to have “cool roofs” painted in reflective colors, while others plant trees along streets or convert parking lots into parks. Although no single measure eliminates the effect, studies suggest that combining several strategies can lower peak neighborhood temperatures noticeably.',
        questions: [
          mc('According to the passage, why do dark surfaces contribute to urban heat?', ['They reflect sunlight into buildings', 'They absorb sunlight and release heat slowly', 'They prevent rain from reaching the soil', 'They are cooler at night than grass'], 1, 'They “absorb most of the sunlight” and “release the stored heat slowly”.'),
          mc('The word “compound” in the passage is closest in meaning to', ['explain', 'worsen', 'measure', 'reduce'], 1, 'Buildings make the problem worse by trapping warm air.'),
          mc('Why does the author mention elderly residents?', ['To show who benefits most from cool roofs', 'To illustrate that the effect can threaten health', 'To explain why cities build parks', 'To argue that air conditioning should be banned'], 1, 'The effect “can be dangerous, particularly for elderly residents”.'),
          mc('Which of the following is NOT mentioned as a strategy against urban heat?', ['Painting roofs in reflective colors', 'Planting trees along streets', 'Turning parking lots into parks', 'Limiting the height of new buildings'], 3, 'Height limits are not mentioned as a strategy.'),
          mc('What does the author conclude about the strategies?', ['One strategy is enough in most cities', 'They work only during heat waves', 'Using several together can make a noticeable difference', 'They cost more than air conditioning'], 2, 'Combining strategies “can lower peak neighborhood temperatures noticeably”.'),
        ],
      } },
      { task: 'reading_academic', item: {
        id: 'pt1-r-a3', title: 'How birds find their way',
        text: 'Every autumn, billions of birds migrate thousands of kilometers, often returning to the exact same nesting site the following spring. How they navigate with such precision has puzzled scientists for centuries. It is now clear that birds rely on several different cues rather than a single sense. Many species use the position of the sun during the day and the rotation of the stars at night to maintain a direction. Young birds raised in planetariums, for example, learned to orient themselves around whatever point the artificial sky rotated around.\n\nBirds also appear to sense the Earth’s magnetic field. In laboratory experiments, when researchers altered the magnetic field around caged birds, the birds changed the direction in which they tried to fly. The exact mechanism is still debated: one hypothesis points to magnetic particles in the beak, while another proposes chemical reactions in the eye that are sensitive to magnetism. Finally, as birds approach their destination, familiar landmarks and even smells may guide the final stage of the journey. This combination of cues provides a backup system: when clouds hide the sky, for instance, the magnetic sense remains available.',
        questions: [
          mc('What is the main idea of the passage?', ['Birds navigate mainly by following coastlines', 'Birds combine several types of information to navigate', 'Scientists have fully explained the magnetic sense of birds', 'Young birds cannot migrate without their parents'], 1, 'Birds “rely on several different cues rather than a single sense”.'),
          mc('What did the planetarium experiment show?', ['Birds ignore the stars when the sun is visible', 'Birds learn direction from the rotation of the night sky', 'Birds can see magnetic fields at night', 'Birds prefer to migrate during the day'], 1, 'Birds oriented around the point “the artificial sky rotated around”.'),
          mc('The word “altered” in the passage is closest in meaning to', ['removed', 'changed', 'measured', 'strengthened'], 1, 'Researchers changed the magnetic field.'),
          mc('According to the passage, what is still uncertain?', ['Whether birds use the sun', 'Whether birds return to the same site', 'How exactly birds detect magnetism', 'Whether smell plays any role'], 2, '“The exact mechanism is still debated.”'),
          mc('Why does the author mention clouds in the last sentence?', ['To show why birds avoid flying in bad weather', 'To give an example of how one cue can replace another', 'To explain how birds detect smells', 'To argue that the magnetic sense is the most important cue'], 1, 'When the sky is hidden, “the magnetic sense remains available”, showing a backup system.'),
        ],
      } },
    ],

    easy: [
      { task: 'reading_ctw', item: { id: 'pt1-r-ctw3', title: 'Community gardens', text: 'Community gardens are shared spaces where neighbors grow vegetables, fruit and flowers together. In many cities, they are built on empty lots that were once used for parking or storage. Members usually pay a small yearly fee and receive their own section of land to take care of. Besides providing fresh food, the gardens give people a place to meet and learn from each other. Some schools also use them to teach children where food comes from.' } },
      { task: 'reading_daily', item: {
        id: 'pt1-r-d4', format: 'menu', title: 'Riverside Café — Lunch specials (11:30–2:30)',
        text: 'Soup of the day + bread ........ $6\nGrilled vegetable wrap ........ $8\nChicken rice bowl ........ $9\nAdd a drink to any meal ........ +$1.50\n\nStudents with ID: 10% off before noon',
        questions: [
          mc('How much does a vegetable wrap with a drink cost without a discount?', ['$8.00', '$9.00', '$9.50', '$10.50'], 2, '$8 + $1.50 = $9.50.'),
          mc('When can students get a discount?', ['Any time with an ID', 'Before noon with an ID', 'After 2:30', 'Only on the soup of the day'], 1, '“Students with ID: 10% off before noon.”'),
        ],
      } },
      { task: 'reading_daily', item: {
        id: 'pt1-r-d5', format: 'text', title: 'Text message',
        text: 'Hey! The bus to the lake leaves from the stadium, not the library — sorry, I got it wrong yesterday. Still 8:15. Bring a jacket, it gets windy on the boat. I’ll bring sandwiches for everyone. — Marco',
        questions: [
          mc('Why did Marco send the message?', ['To cancel the trip', 'To correct a meeting place', 'To change the departure time', 'To ask for sandwiches'], 1, 'He corrects the location: “from the stadium, not the library”.'),
          mc('What does Marco suggest bringing?', ['Sandwiches', 'A bus ticket', 'A jacket', 'A map of the lake'], 2, '“Bring a jacket, it gets windy on the boat.”'),
          mc('What will Marco do?', ['Drive everyone to the lake', 'Provide food', 'Meet people at the library', 'Rent a boat'], 1, '“I’ll bring sandwiches for everyone.”'),
        ],
      } },
      { task: 'reading_daily', item: {
        id: 'pt1-r-d6', format: 'notice', title: 'Bike repair workshop',
        text: 'Free bike repair workshop!\nSaturday, 10 a.m.–1 p.m., Student Center courtyard\n\nLearn to fix a flat tire and adjust your brakes. Tools provided. Bring your own bike.\nNo registration needed. In case of rain, the workshop moves to the parking garage, level 1.',
        questions: [
          mc('What do participants need to bring?', ['Their own tools', 'Their own bike', 'A registration form', 'A new tire'], 1, '“Tools provided. Bring your own bike.”'),
          mc('What happens if it rains?', ['The workshop is canceled', 'It moves to another location', 'It starts later', 'It moves to Sunday'], 1, 'It “moves to the parking garage”.'),
          mc('What is NOT true about the workshop?', ['It is free', 'Participants must register', 'It lasts three hours', 'It teaches how to adjust brakes'], 1, '“No registration needed.”'),
        ],
      } },
      { task: 'reading_academic', item: {
        id: 'pt1-r-a4', title: 'Why we yawn',
        text: 'Almost all vertebrates yawn, from fish to humans, yet scientists still disagree about why. For many years, the most popular explanation was that yawning brings more oxygen into the body when we are tired. However, experiments in which people breathed air with extra oxygen found that they yawned just as often, which weakened this idea.\n\nA newer theory suggests that yawning helps cool the brain. When we yawn, we take a deep breath and stretch the jaw, which increases blood flow to the head. Supporting this idea, one study found that people yawned less when they held a cold pack to their forehead. Yawning is also famously contagious: seeing or even reading about someone yawning can make us yawn. Researchers have found that people tend to catch yawns more easily from friends and family than from strangers, suggesting that contagious yawning may be linked to empathy.',
        questions: [
          mc('What is the passage mainly about?', ['Different explanations for why we yawn', 'How animals breathe underwater', 'Why tired people need more oxygen', 'How to stop yawning in public'], 0, 'The passage presents theories about yawning.'),
          mc('What happened when people breathed air with extra oxygen?', ['They stopped yawning', 'They yawned just as often', 'They felt more tired', 'They yawned more often'], 1, 'They “yawned just as often”.'),
          mc('The word “contagious” in the passage is closest in meaning to', ['dangerous', 'easily spread', 'rare', 'loud'], 1, 'A contagious yawn spreads from one person to another.'),
          mc('Which finding supports the brain-cooling theory?', ['Fish yawn as often as humans', 'People yawn more after reading', 'People with a cold pack on the forehead yawned less', 'People yawn more in the morning'], 2, 'The cold-pack study is given as support.'),
          mc('What does the author suggest about contagious yawning?', ['It happens only between strangers', 'It may be connected to empathy', 'It proves the oxygen theory', 'It is found only in humans'], 1, 'It “may be linked to empathy”.'),
        ],
      } },
    ],
  },

  // ---------------------------------------------------------- LISTENING --
  listening: {
    m1: [
      { task: 'listening_response', item: { id: 'pt1-l-r1', items: [
        resp('A', 'Do you know if the library is open on Sunday?', ['Yes, but only in the afternoon.', 'I read that book last Sunday.', 'It’s on the second floor.', 'The library has many books.'], 0, 'A direct answer about opening days.'),
        resp('B', 'I can’t believe I left my calculator at home again.', ['You can borrow mine if you want.', 'The exam is in Room 12.', 'I live close to campus.', 'Calculators are expensive.'], 0, 'Offering help is the natural reply to a small problem.'),
        resp('A', 'Would you mind closing the window?', ['Not at all.', 'Yes, it’s a nice window.', 'I mind the weather.', 'It was closed yesterday.'], 0, '“Would you mind…?” is answered with “Not at all” when agreeing.'),
        resp('B', 'How did your presentation go this morning?', ['Better than I expected, actually.', 'It’s at ten o’clock.', 'I’m going there tomorrow.', 'We presented them in class.'], 0, 'The question asks for an evaluation of a past event.'),
        resp('A', 'Aren’t you taking the bus to the conference?', ['No, my roommate is driving me.', 'The conference is about economics.', 'Yes, the bus is blue.', 'I took a lot of notes.'], 0, 'A negative question expects confirmation or correction of a plan.'),
        resp('B', 'This printer never works when I need it.', ['There’s another one in the lobby.', 'I need it too, thanks.', 'It prints in color.', 'I work there on Mondays.'], 0, 'The reply offers a practical solution to the complaint.'),
        resp('A', 'Shouldn’t we start the meeting?', ['Let’s wait five more minutes for Anna.', 'The meeting was great.', 'I started a new job.', 'We should meet the professor.'], 0, 'A suggestion to begin is answered with a reason to wait.'),
        resp('B', 'Is it okay if I submit the essay a day late?', ['Only if you have a good reason.', 'The essay is about history.', 'I submitted mine yesterday, too.', 'It’s late in the day.'], 0, 'A permission question is answered with a condition.'),
      ] } },
      { task: 'listening_conversation', item: {
        id: 'pt1-l-c1', title: 'Office hours', context: 'Listen to a conversation between a student and a professor.',
        roles: { Student: 'A', Professor: 'B' },
        lines: [
          say('Student', 'Hi Professor Grant, do you have a minute? It’s about the research paper.'),
          say('Professor', 'Of course. Come in. What’s on your mind?'),
          say('Student', 'I chose to write about urban farming, but I’m finding way too many sources. I don’t know where to focus.'),
          say('Professor', 'That’s a good problem to have. Instead of covering urban farming in general, why not pick one city and one question — for instance, whether rooftop farms in Chicago actually reduce food costs?'),
          say('Student', 'That sounds much more manageable. But will I find enough data for one city?'),
          say('Professor', 'Check the city’s agricultural reports. And the librarian for environmental studies can help you search local news archives.'),
          say('Student', 'Great. I’ll make an appointment with her this week.'),
        ],
        questions: [
          mc('What is the student’s problem?', ['She cannot find any sources on her topic', 'Her topic is too broad', 'She missed the paper deadline', 'She does not like her topic'], 1, 'She finds “way too many sources” and does not know where to focus.'),
          mc('What will the student probably do next?', ['Change her topic to food costs in general', 'Visit Chicago', 'Contact a librarian', 'Ask for an extension'], 2, 'She will “make an appointment with her” — the librarian.'),
        ],
      } },
      { task: 'listening_announcement', item: {
        id: 'pt1-l-an1', title: 'Library announcement', context: 'Listen to an announcement in a university library.',
        roles: { Announcer: 'A' },
        lines: [say('Announcer', 'Attention, library users. Because of a scheduled power test, the elevators and the second-floor computer lab will be unavailable tomorrow from eight to eleven a.m. Printing will still be possible on the first floor. Students who need step-free access to the upper floors during this time should speak to staff at the main desk, who will arrange assistance. We apologize for the inconvenience.')],
        questions: [
          mc('What will be unavailable tomorrow morning?', ['All printers in the library', 'The elevators and a computer lab', 'The main desk', 'The entire library'], 1, 'The elevators and the second-floor lab will be unavailable.'),
          mc('What should students who cannot use stairs do?', ['Wait until eleven o’clock', 'Use the first-floor computers', 'Ask for help at the main desk', 'Go to another library'], 2, 'Staff at the main desk “will arrange assistance”.'),
        ],
      } },
      { task: 'listening_academic', item: {
        id: 'pt1-l-t1', title: 'Biology lecture', context: 'Listen to part of a lecture in a biology class.',
        roles: { Professor: 'B' },
        lines: [say('Professor', 'Today I want to talk about a strange animal: the naked mole-rat. It lives in underground colonies in East Africa, and its social structure resembles that of bees more than other mammals. Each colony has a single breeding female, the queen, and all other members work — digging tunnels, gathering roots or defending the colony. But what really interests researchers is its lifespan. A mouse of similar size lives about three years. Naked mole-rats can live for more than thirty. And unlike most animals, their risk of dying doesn’t seem to increase as they get older. They also rarely develop cancer. Scientists think part of the explanation is a substance in their tissues that makes cells stop dividing when they become crowded. So studying this odd-looking rodent might eventually help us understand aging in humans.')],
        questions: [
          mc('What is the lecture mainly about?', ['How mole-rats dig tunnels', 'Features of the naked mole-rat that interest scientists', 'The social life of bees', 'Why mice live short lives'], 1, 'The lecture covers the mole-rat’s social structure, lifespan and cancer resistance.'),
          mc('Why does the professor mention bees?', ['To compare the mole-rat’s social structure', 'To explain what mole-rats eat', 'To describe where mole-rats live', 'To show that bees live longer than mice'], 0, 'The colony “resembles that of bees”.'),
          mc('According to the professor, what is unusual about mole-rats as they age?', ['They stop working', 'Their risk of dying does not seem to increase', 'They leave the colony', 'They become queens'], 1, 'Their risk of dying “doesn’t seem to increase as they get older”.'),
          mc('What does the professor imply about research on mole-rats?', ['It has already cured cancer', 'It might teach us about human aging', 'It is too expensive to continue', 'It proves mice are poor research animals'], 1, 'Studying them “might eventually help us understand aging in humans”.'),
        ],
      } },
    ],

    hard: [
      { task: 'listening_response', item: { id: 'pt1-l-r2', items: [
        resp('A', 'I thought the review session was canceled.', ['It was, but they rescheduled it for Friday.', 'I reviewed chapter three.', 'The session is in the library.', 'Yes, I thought so too, it was great.'], 0, 'The reply clarifies that the event is happening after all.'),
        resp('B', 'You’ve been working on that report all weekend, haven’t you?', ['Almost — I took Saturday evening off.', 'The report is due on Monday.', 'I work at the café on weekends.', 'Yes, the weekend is long.'], 0, 'A tag question is answered with confirmation plus a nuance.'),
        resp('A', 'I wouldn’t count on the shuttle being on time today.', ['Then I’ll leave a bit earlier.', 'I counted three shuttles.', 'The shuttle is free for students.', 'Today is Wednesday.'], 0, 'The speaker warns indirectly; the natural reply adapts the plan.'),
        resp('B', 'Didn’t Professor Diaz say the quiz would be open-book?', ['Only for the second part, I think.', 'She teaches biology.', 'I opened the book yesterday.', 'The quiz was difficult.'], 0, 'The reply partially corrects the assumption.'),
        resp('A', 'If I were you, I’d talk to the adviser before dropping the course.', ['That’s a good idea — I’ll email her today.', 'I dropped my phone.', 'The course is very popular.', 'I am you.'], 0, 'Advice is answered with acceptance and a plan.'),
      ] } },
      { task: 'listening_conversation', item: {
        id: 'pt1-l-c2', title: 'Housing office', context: 'Listen to a conversation between a student and a housing officer.',
        roles: { Student: 'A', Officer: 'B' },
        lines: [
          say('Student', 'Hi, I’m on the waiting list for a single room next semester. I wanted to check where I am on the list.'),
          say('Officer', 'Let me look… You’re number fourteen. Last year, about twenty students on the list got single rooms, so your chances are decent.'),
          say('Student', 'That’s good to hear. Is there anything I can do to improve them?'),
          say('Officer', 'Well, if you’re flexible about the building, that helps. Most people only want the new residence on Park Street. If you’re willing to live in Morrison Hall, you’d probably get a room right away.'),
          say('Student', 'Morrison is pretty far from the science buildings, though. How old is it?'),
          say('Officer', 'It was renovated two years ago — new kitchens and heating. And there’s a shuttle stop right outside.'),
          say('Student', 'Hmm. In that case, could you add Morrison to my preferences?'),
        ],
        questions: [
          mc('Why does the officer mention Morrison Hall?', ['It is the newest residence on campus', 'The student could get a single room there sooner', 'It is closest to the science buildings', 'Students on the waiting list must live there'], 1, 'If the student accepts Morrison, “you’d probably get a room right away”.'),
          mc('What makes the student change her mind about Morrison Hall?', ['Its low price', 'Its renovation and nearby shuttle', 'Its location near Park Street', 'Her friends live there'], 1, 'After hearing about the renovation and shuttle stop, she asks to add it.'),
        ],
      } },
      { task: 'listening_academic', item: {
        id: 'pt1-l-t2', title: 'Economics lecture', context: 'Listen to part of a lecture in an economics class.',
        roles: { Professor: 'A' },
        lines: [say('Professor', 'Let’s look at something called the decoy effect. Imagine a café sells a small coffee for three dollars and a large one for five. Many customers choose the small one. Now the café adds a medium size for four dollars and eighty cents. Suddenly, a lot more people buy the large coffee. Why? Nobody really wants the medium — it’s there to make the large look like a bargain, since for only twenty cents more you get much more coffee. The medium is the decoy. What’s interesting is that this breaks a basic assumption of classical economics: that adding an option you don’t choose shouldn’t change your preference between the other two. Marketers use decoys everywhere, from magazine subscriptions to phone plans. So next time you see an option that seems oddly priced, ask yourself whose choice it’s really designed to influence.')],
        questions: [
          mc('What is the main purpose of the lecture?', ['To explain how cafés set coffee prices', 'To describe a way that options can influence choices', 'To show that customers prefer small sizes', 'To criticize magazine subscriptions'], 1, 'The lecture explains the decoy effect.'),
          mc('Why does the café add a medium coffee?', ['Because customers asked for it', 'To make the large coffee seem like a good deal', 'To sell more medium coffees', 'To reduce the cost of coffee beans'], 1, 'The medium makes the large “look like a bargain”.'),
          mc('According to the professor, what assumption does the decoy effect challenge?', ['That people prefer cheaper products', 'That unchosen options should not change preferences between other options', 'That marketers understand economics', 'That prices always rise over time'], 1, 'Adding an unchosen option “shouldn’t change your preference” according to classical economics.'),
          mc('What does the professor advise students to do?', ['Always choose the largest option', 'Avoid buying subscriptions', 'Think about why an option is priced strangely', 'Complain about decoy pricing'], 2, 'The professor asks students to question “whose choice it’s really designed to influence”.'),
        ],
      } },
      { task: 'listening_academic', item: {
        id: 'pt1-l-t3', title: 'Geology lecture', context: 'Listen to part of a lecture in a geology class.',
        roles: { Professor: 'B' },
        lines: [say('Professor', 'Most people think of glaciers as frozen and still, but they actually move — sometimes a few centimeters a day, sometimes several meters. They flow for two main reasons. First, ice under enormous pressure behaves a bit like very thick honey; it slowly deforms and spreads. Second, meltwater at the base can act as a lubricant, allowing the whole glacier to slide over the rock. This second process is why some glaciers suddenly speed up in summer. As they move, glaciers carry rocks that scrape the ground beneath them, carving deep U-shaped valleys. That shape is actually one of the clues geologists use to identify places that were covered by ice thousands of years ago — even where no ice remains today. A river valley, by contrast, usually has a narrower V shape.')],
        questions: [
          mc('What is the lecture mainly about?', ['How glaciers form in winter', 'How glaciers move and shape the landscape', 'Why rivers create V-shaped valleys', 'How to measure ice thickness'], 1, 'The lecture explains glacial movement and U-shaped valleys.'),
          mc('Why does the professor compare ice to honey?', ['To describe its color', 'To explain how it can slowly deform', 'To show that glaciers contain sugar', 'To explain why ice melts'], 1, 'Ice under pressure “slowly deforms and spreads”.'),
          mc('According to the professor, why do some glaciers speed up in summer?', ['Meltwater helps them slide', 'The ice becomes harder', 'Rocks stop scraping the ground', 'Snow adds more weight'], 0, 'Meltwater at the base “can act as a lubricant”.'),
          mc('How can geologists identify places once covered by glaciers?', ['By finding honey-like ice', 'By the U shape of the valleys', 'By measuring meltwater', 'By the V shape of river valleys'], 1, 'U-shaped valleys are “one of the clues”.'),
        ],
      } },
    ],

    easy: [
      { task: 'listening_response', item: { id: 'pt1-l-r3', items: [
        resp('A', 'Where did you buy that backpack?', ['At the store across from the bank.', 'Last weekend.', 'It was forty dollars.', 'I use it every day.'], 0, '“Where” asks for a place.'),
        resp('B', 'Can you help me carry these boxes?', ['Sure, where do they go?', 'They are brown boxes.', 'I carried them yesterday.', 'Boxes are useful.'], 0, 'Agreeing and asking a follow-up question.'),
        resp('A', 'What time does the movie start?', ['At seven thirty.', 'It’s a comedy.', 'In the city center.', 'About two hours.'], 0, '“What time” asks for a clock time.'),
        resp('B', 'I’m so tired today.', ['Didn’t you sleep well?', 'Today is Tuesday.', 'I’m tired of pizza.', 'Yes, it is today.'], 0, 'Showing concern with a follow-up question.'),
        resp('A', 'Thanks for lending me your notes.', ['No problem — they were easy to share.', 'I’ll lend you a pen.', 'Notes are important.', 'You’re taking notes.'], 0, 'A thank-you is answered with “No problem”.'),
        resp('B', 'Let’s get lunch after class.', ['Good idea. How about the new café?', 'I had class yesterday.', 'Lunch is a meal.', 'After the class was long.'], 0, 'Accepting a suggestion and adding a detail.'),
        resp('A', 'How long is the flight to Toronto?', ['About three hours.', 'It leaves from Gate 5.', 'Toronto is in Canada.', 'By plane.'], 0, '“How long” asks about duration.'),
      ] } },
      { task: 'listening_conversation', item: {
        id: 'pt1-l-c3', title: 'At the bookstore', context: 'Listen to a conversation in the campus bookstore.',
        roles: { Student: 'A', Clerk: 'B' },
        lines: [
          say('Student', 'Hi, I’m looking for the textbook for Biology 110.'),
          say('Clerk', 'That one sold out this morning, I’m afraid. We’re getting more copies on Thursday.'),
          say('Student', 'Oh no. My first reading assignment is due Wednesday.'),
          say('Clerk', 'You could use the digital version until then. If you buy the e-book, we give you a discount on the printed copy later.'),
          say('Student', 'Perfect, I’ll do that.'),
        ],
        questions: [
          mc('What is the student’s problem?', ['The book is too expensive', 'The book is not available now', 'The student lost the book', 'The student bought the wrong book'], 1, 'The textbook “sold out this morning”.'),
          mc('What will the student probably do?', ['Wait until Thursday', 'Buy the e-book', 'Borrow a friend’s book', 'Ask the professor for more time'], 1, 'The student agrees to use the digital version.'),
        ],
      } },
      { task: 'listening_conversation', item: {
        id: 'pt1-l-c4', title: 'Planning a weekend', context: 'Listen to a conversation between two friends.',
        roles: { Emma: 'A', Leo: 'B' },
        lines: [
          say('Emma', 'Are you still going hiking on Saturday?'),
          say('Leo', 'I wanted to, but the weather forecast says heavy rain all day.'),
          say('Emma', 'What about Sunday?'),
          say('Leo', 'Sunday looks sunny, but I have to work until noon.'),
          say('Emma', 'We could go in the afternoon. The short trail by the lake only takes two hours.'),
          say('Leo', 'Great, let’s do that. I’ll pick you up at one.'),
        ],
        questions: [
          mc('Why won’t Leo go hiking on Saturday?', ['He has to work', 'It will rain', 'His car is broken', 'The trail is closed'], 1, 'The forecast says “heavy rain all day”.'),
          mc('What do Emma and Leo decide?', ['To hike on Saturday morning', 'To hike a short trail on Sunday afternoon', 'To stay at home', 'To go to the lake by bus'], 1, 'They will take the short trail on Sunday afternoon.'),
        ],
      } },
      { task: 'listening_announcement', item: {
        id: 'pt1-l-an2', title: 'Cafeteria announcement', context: 'Listen to an announcement in a student cafeteria.',
        roles: { Announcer: 'B' },
        lines: [say('Announcer', 'Good afternoon, everyone. Starting next Monday, the cafeteria will stay open until nine p.m. instead of seven. We are also adding a salad bar at lunch and dinner. To celebrate, all drinks will be half price this Friday. Thank you for eating with us.')],
        questions: [
          mc('What change begins next Monday?', ['The cafeteria will close earlier', 'The cafeteria will stay open later', 'Drinks will be free', 'Breakfast will be canceled'], 1, 'It will stay open “until nine p.m. instead of seven”.'),
          mc('What will happen this Friday?', ['A new salad bar opens', 'Drinks will cost less', 'The cafeteria will be closed', 'Dinner will be free'], 1, '“All drinks will be half price this Friday.”'),
        ],
      } },
    ],
  },

  // ------------------------------------------------------------ WRITING --
  writing: [
    { task: 'writing_sentence', item: { id: 'pt1-w-bas', items: [
      bas('Rosa', 'Did you manage to finish the reading?', 'Ken', 'Almost. I', ['only', 'have', 'the last', 'chapter', 'left'], 'to read.', 'had', '“Have + noun + left” means something remains.', [['have', 'only', 'the last', 'chapter', 'left']]),
      bas('Rosa', 'Why are you taking the bus today?', 'Ken', 'My bike', ['is', 'being', 'repaired', 'at the shop', 'near'], 'the station.', 'repairing', 'Present continuous passive: is being + past participle.'),
      bas('Rosa', 'What did the advisor recommend?', 'Ken', 'She', ['suggested', 'that', 'I', 'take', 'a statistics course'], 'next term.', 'taking', 'After “suggest that”, use the base verb (subjunctive).'),
      bas('Rosa', 'Have you seen the new art exhibit?', 'Ken', 'Not yet, but', ['I’ve', 'heard', 'it’s', 'worth', 'visiting'], '.', 'visit', '“Worth + -ing”.'),
      bas('Rosa', 'Why is the lab closed today?', 'Ken', '', ['The staff', 'are', 'installing', 'new equipment', 'that'], 'arrived last week.', 'who', '“That” refers to a thing (equipment).'),
      bas('Rosa', 'I’m nervous about my interview tomorrow.', 'Ken', '', ['Do you', 'want', 'me', 'to help', 'you'], 'practice tonight?', 'helping', '“Want + object + to + verb”.'),
      bas('Rosa', 'Is the chemistry exam difficult?', 'Ken', 'It is', ['if', 'you', 'haven’t', 'done', 'the practice problems'], '.', 'didn’t', 'Present perfect for experience up to now.'),
      bas('Rosa', 'Could you remind me what the assignment is?', 'Ken', 'We', ['have to', 'write', 'a summary', 'of', 'the article'], 'we discussed on Monday.', 'writing', '“Have to + base verb”.'),
      bas('Rosa', 'Why did you choose this university?', 'Ken', 'Mainly', ['because', 'its', 'engineering program', 'is', 'known'], 'for its research labs.', 'knowing', 'Passive: is known for.'),
      bas('Rosa', 'The concert tickets sold out in an hour.', 'Ken', '', ['I', 'wish', 'I', 'had', 'bought'], 'them earlier.', 'buy', '“Wish + past perfect” for regrets about the past.'),
    ] } },
    { task: 'writing_email', item: {
      id: 'pt1-w-email', title: 'Borrowed laptop not working',
      scenario: 'Last week you borrowed a laptop from the university media center for your film project. Yesterday it stopped charging, and your project is due in four days. You need a working computer to edit your video.',
      to: 'Media Center staff', subject: 'Borrowed laptop has stopped charging', register: 'formal',
      goals: [
        { text: 'Describe the problem with the laptop', keywords: ['charge', 'charging', 'battery', 'stopped', 'power', 'problem'] },
        { text: 'Explain why you need a computer soon', keywords: ['project', 'film', 'video', 'edit', 'due', 'deadline', 'four days'] },
        { text: 'Ask what you should do', keywords: ['should', 'replace', 'exchange', 'bring', 'another', 'what can', 'could you'] },
      ],
      model: { text: 'Dear Media Center staff,\n\nI am writing about the laptop I borrowed from you last Tuesday (tag MC-107). Yesterday evening, it suddenly stopped charging. I tried two different outlets and the charger that came with it, but the battery indicator stays at zero, and the laptop shuts down as soon as I unplug it.\n\nUnfortunately, I need a working computer urgently. I am editing a short documentary for my film studies course, and the final version is due on Friday. The editing software is installed only on your laptops.\n\nCould you tell me whether I should bring the laptop in today, and whether a replacement might be available while it is repaired? I can come to the center any time after 1 p.m.\n\nThank you for your help.\nBest regards,\nChris Lee', notes: 'Precise description, clear urgency, polite request with availability.' },
    } },
    { task: 'writing_discussion', item: {
      id: 'pt1-w-disc', course: 'sociology',
      professor: { name: 'Dr. Morales', text: 'Many cities are building more bike lanes, sometimes by removing lanes for cars. Supporters say this makes cities healthier and less polluted. Critics say it causes more traffic and hurts people who must drive. Should cities replace car lanes with bike lanes? Why or why not?' },
      students: [
        { name: 'Aiden', text: 'Yes. When cycling is safe, more people choose it, which reduces traffic in the long run. Cities that built bike lanes, like Copenhagen, now have fewer cars.' },
        { name: 'Mei', text: 'I disagree. Not everyone can bike — older people, parents with small children, or workers who carry tools. Taking away car lanes makes their lives harder.' },
      ],
      model: { text: 'I think cities should replace some car lanes with bike lanes, but only on routes where it makes a real difference. Mei is right that many people cannot switch to cycling, so the goal should not be to punish drivers. However, every commuter who switches to a bike frees space on the road for those who really need to drive, such as plumbers carrying tools. In my city, a protected bike lane was built on a busy avenue near the university. Traffic was terrible for a few months, but once students realized they could cycle safely, the number of cars on that street dropped, and the buses became faster too. So instead of choosing between bikes and cars, cities should add bike lanes on corridors used by many short trips, like routes to campuses and business districts.', notes: 'Balanced position, answers Mei directly, and uses a concrete local example.' },
    } },
  ],

  // ----------------------------------------------------------- SPEAKING --
  speaking: [
    { task: 'speaking_repeat', item: {
      id: 'pt1-s-lr', scene: 'Campus orientation day', icon: '🎓',
      intro: 'A student guide is showing new students around campus.',
      sentences: [
        'Welcome to your first day on campus.',
        'The student center is straight ahead.',
        'You can pick up your ID card at the main office.',
        'Free shuttles run between the dormitories every fifteen minutes.',
        'The dining hall on the left serves breakfast until ten thirty.',
        'If you get lost, you can use the campus map on the university app.',
        'Tomorrow afternoon, each department will hold an information session for students who have not chosen a major.',
      ],
    } },
    { task: 'speaking_interview', item: {
      id: 'pt1-s-iv', topic: 'Learning and free time',
      intro: 'A researcher is interviewing students about how they spend their free time.',
      questions: [
        'What do you usually do when you have a free afternoon?',
        'Tell me about a new skill or hobby you have learned recently. How did you learn it?',
        'Some people think students should use their free time to prepare for their careers. Do you agree? Why or why not?',
        'Do you think people today have more free time or less free time than in the past? Explain your view.',
      ],
    } },
  ],
};
