// Additional original Reading and Listening practice sets.

const mc = (q, choices, answer, explanation) => ({ q, choices, answer, explanation });
const say = (speaker, text) => ({ speaker, text });
const resp = (speaker, prompt, choices, answer, explanation) => ({ speaker, prompt, choices, answer, explanation });

export default {
  reading_ctw: [
    { id: 'ctw-volcanoes', title: 'Volcanic soils', text: 'Volcanic eruptions are usually associated with destruction, but they also create some of the most fertile land on Earth. When volcanic ash settles, it slowly breaks down into soil that is rich in minerals such as potassium and phosphorus. These nutrients support dense vegetation and productive farms. This explains why many people choose to live near active volcanoes despite the danger. In regions like Indonesia and southern Italy, farmers have grown crops on volcanic slopes for centuries.' },
    { id: 'ctw-bilingual', title: 'Bilingual children', text: 'Children who grow up speaking two languages were once thought to be at a disadvantage. Parents were sometimes advised to use only one language at home to avoid confusion. Modern research has largely overturned this view. Bilingual children may mix languages when they are young, but they generally reach the same milestones as other children. Some studies even suggest they become better at switching attention between tasks, although researchers still debate how large this advantage is.' },
    { id: 'ctw-glass', title: 'The history of glass', text: 'Glass is one of the oldest materials made by humans. The earliest glass objects, small beads, were produced in Mesopotamia more than four thousand years ago. For centuries, glass remained a luxury because it was difficult to make in large pieces. The invention of glassblowing in the first century BCE changed this, allowing workers to shape containers quickly and cheaply. Later, clear window glass transformed buildings by letting in light while keeping out wind and rain.' },
    { id: 'ctw-migration-whales', title: 'Whale migration', text: 'Many whale species travel enormous distances every year. Humpback whales, for example, spend the summer feeding in cold polar waters, where food is abundant. In winter, they swim to warm tropical seas to give birth and raise their young. During this journey, which can exceed eight thousand kilometers, the whales eat very little and depend on stored fat. Scientists track them using satellite tags and photographs of the unique patterns on their tails.' },
    { id: 'ctw-coffee', title: 'Coffee and sleep', text: 'Caffeine is the most widely consumed stimulant in the world. It works by blocking a chemical in the brain called adenosine, which builds up during the day and makes us feel sleepy. Because caffeine remains in the body for several hours, a cup of coffee in the late afternoon can still affect sleep at night. Many people do not notice this effect directly, but studies show that their deep sleep is shorter and lighter.' },
    { id: 'ctw-maps', title: 'Why maps distort', text: 'Every flat map of the world contains some distortion. The Earth is a sphere, and it is impossible to flatten a curved surface without stretching or tearing it. Mapmakers must therefore choose which properties to preserve. The famous Mercator projection keeps directions accurate, which made it valuable for sailors. However, it greatly enlarges areas near the poles, so Greenland appears almost as large as Africa, even though Africa is about fourteen times bigger.' },
  ],

  reading_daily: [
    {
      id: 'daily-internship-email', format: 'email',
      meta: { from: 'Career Services', to: 'Engineering students', subject: 'Summer internship deadline extended' },
      text: 'Good news! The application deadline for summer internships with Northline Energy has been extended to February 28.\n\nApplicants must submit a résumé and a one-page cover letter through the career portal. Students who attended the Northline information session will receive an automatic interview for the first round.\n\nQuestions? Book a 15-minute appointment with an adviser.',
      questions: [
        mc('What is the main purpose of the email?', ['To announce a new internship program', 'To tell students they have more time to apply', 'To invite students to an information session', 'To explain how to write a cover letter'], 1, 'The deadline “has been extended”.'),
        mc('What advantage do students who attended the information session have?', ['They can apply after the deadline', 'They do not need a cover letter', 'They are guaranteed a first interview', 'They get a longer appointment'], 2, 'They “will receive an automatic interview for the first round”.'),
      ],
    },
    {
      id: 'daily-cafe-menu', format: 'menu', title: 'Library Café — Exam week hours & specials',
      text: 'Open 7 a.m. – 2 a.m. (Mon–Thu)\nOpen 7 a.m. – 10 p.m. (Fri–Sun)\n\nLarge coffee ........ $2.00 (refills $0.50)\nBagel + cream cheese ........ $3.25\nFruit cup ........ $2.75\n\nBring your own mug and get 25¢ off any drink.',
      questions: [
        mc('When does the café close on Saturday?', ['At 2 a.m.', 'At 10 p.m.', 'At 7 p.m.', 'It is closed on Saturday'], 1, 'Fri–Sun: 7 a.m. – 10 p.m.'),
        mc('How much would a large coffee cost with your own mug?', ['$1.50', '$1.75', '$2.00', '$2.25'], 1, '$2.00 − $0.25 = $1.75.'),
        mc('What can be inferred about the café during exam week?', ['It stays open late on weekdays', 'It is closed on weekends', 'It offers free food', 'It sells only drinks'], 0, 'It is open until 2 a.m. Monday to Thursday.'),
      ],
    },
    {
      id: 'daily-apartment-ad', format: 'poster', title: 'Room available',
      text: 'Room available in a 3-bedroom apartment, 10 minutes’ walk from campus.\n$650/month, utilities included. Shared kitchen and bathroom.\nAvailable from August 1 (12-month lease).\nNon-smokers only. No pets, sorry — one roommate is allergic.\nText Dana at 555-0147 to arrange a visit.',
      questions: [
        mc('Why are pets not allowed?', ['The landlord does not like them', 'The apartment is too small', 'A roommate has an allergy', 'Pets are not allowed near campus'], 2, '“One roommate is allergic.”'),
        mc('What is included in the rent?', ['Utilities', 'A private bathroom', 'A parking space', 'Furniture'], 0, '“Utilities included.”'),
        mc('How should an interested person contact Dana?', ['By email', 'By sending a text message', 'By visiting on August 1', 'Through the university housing office'], 1, '“Text Dana”.'),
      ],
    },
    {
      id: 'daily-course-notice', format: 'notice', title: 'BIO 240 — Room change',
      text: 'Starting next week, BIO 240 lectures will meet in Hall C, Room 12 instead of the Science Annex, which is closing for repairs.\n\nLab sections are NOT affected and remain in the Annex basement.\n\nThe first quiz is still on Thursday.',
      questions: [
        mc('Why are the lectures moving?', ['The class has more students', 'The Science Annex is being repaired', 'The quiz was moved', 'Hall C is closer to the labs'], 1, 'The Annex “is closing for repairs”.'),
        mc('What is true about the lab sections?', ['They move to Hall C', 'They are canceled', 'They stay in the same place', 'They meet on Thursday only'], 2, 'Labs “remain in the Annex basement”.'),
      ],
    },
  ],

  reading_academic: [
    {
      id: 'acad-octopus', title: 'The unusual intelligence of octopuses',
      text: 'Octopuses are invertebrates, more closely related to snails and clams than to any mammal. Yet they display problem-solving abilities that rival those of many vertebrates. In laboratory studies, octopuses have learned to unscrew the lids of jars to reach food, find their way through simple mazes and distinguish between different shapes. Aquarium staff have also reported individuals that slipped out of their tanks at night and squeezed through remarkably narrow gaps. What makes this intelligence remarkable, however, is how differently it is organized. Roughly two-thirds of an octopus’s neurons are located not in its central brain but in its eight arms. Each arm can respond to touch and taste and can carry out simple movements with little direction from the brain. This may allow the animal to search several crevices at once. Many researchers link this ingenuity to a pivotal event in the group’s evolutionary history: the loss of the protective outer shell that their ancestors possessed. Without armor, octopuses had to rely on flexible behavior to escape predators and catch prey. Rapid camouflage, careful hiding and inventive hunting all became essential. Their short lives make these abilities even more puzzling. Most species survive only one or two years, and the young receive no care from their parents. Each octopus therefore has little time to learn from experience and no chance to learn from older relatives.',
      questions: [
        { q: 'What is the passage mainly about?', choices: ['How octopuses use rapid camouflage and hiding to avoid their predators', 'Why octopuses are more closely related to snails and clams than to mammals', 'What octopuses can do and how their intelligence is organized and arose', 'The methods scientists use to measure intelligence in laboratory animals'], answer: 2, type: 'main', explanation: 'The passage describes what octopuses can do, how their neurons are distributed (“how differently it is organized”) and why this intelligence may have evolved (“the loss of the protective outer shell”).' },
        { q: 'According to the passage, all of the following are abilities that octopuses have shown in laboratory studies EXCEPT:', choices: ['opening jars to reach food', 'finding their way through mazes', 'telling different shapes apart', 'learning tasks from their parents'], answer: 3, type: 'except', explanation: 'The text lists “unscrew the lids of jars”, “find their way through simple mazes” and “distinguish between different shapes”. It says the young get “no care from their parents” and have “no chance to learn from older relatives”.' },
        { q: 'The word "pivotal" in the passage is closest in meaning to', choices: ['crucial', 'rotating', 'gradual', 'mysterious'], answer: 0, type: 'vocab', explanation: 'A “pivotal event” is a crucial, decisive one: the loss of the shell is presented as the turning point that shaped octopus behavior. “Rotating” is the literal meaning of pivot, which does not fit here.' },
        { q: 'Why does the author mention the loss of the protective outer shell?', choices: ['To show that octopuses are closely related to snails', 'To explain why octopuses may have developed flexible, intelligent behavior', 'To describe how octopuses squeeze through narrow gaps', 'To argue that octopuses are more vulnerable today than their ancestors were'], answer: 1, type: 'purpose', explanation: 'Researchers “link this ingenuity” to the loss of the shell: “Without armor, octopuses had to rely on flexible behavior”.' },
        { q: 'What can be inferred about the abilities of an individual octopus?', choices: ['They develop largely without guidance from older octopuses.', 'They are controlled mainly by the central brain.', 'They improve steadily over a long lifetime.', 'They are less impressive than those of most vertebrates.'], answer: 0, type: 'inference', explanation: 'The young receive “no care from their parents” and have “no chance to learn from older relatives”, so whatever an octopus can do develops without such guidance. The other options contradict “two-thirds … in its eight arms”, “one or two years” and “rival those of many vertebrates”.' },
      ],
    },
    {
      id: 'acad-silk-road', title: 'Trade and ideas on the Silk Road',
      text: 'The Silk Road was not a single road but a vast network of overland routes. For well over a thousand years, these routes linked China with Central Asia, the Middle East and the Mediterranean world. The name itself is modern; it was popularized by a German geographer in the nineteenth century, long after the routes had declined. [A] Although Chinese silk was highly prized in Rome, many other goods moved along the network, including spices, glass, horses, ceramics and paper. [B] Very few merchants traveled the entire distance. Instead, goods passed from trader to trader through a long chain of markets. [C] Because each intermediary took a profit, this relay system made distant goods expensive. However, it also created prosperity along the way. Oasis towns in the deserts of Central Asia, such as Dunhuang and Kashgar, grew wealthy by supplying caravans with water, food, pack animals and places to rest. [D] Perhaps more significant than any commodity, however, were the ideas that traveled the same paths. Buddhism spread from India into China, papermaking techniques gradually moved westward, and scholars exchanged knowledge of astronomy and medicine. The routes carried less welcome passengers as well. Many historians believe that the plague that devastated Europe in the fourteenth century spread partly along these trade networks.',
      questions: [
        { q: 'According to the passage, what is true about the name “Silk Road”?', choices: ['It was chosen by Roman merchants who bought Chinese silk.', 'It became widely used only after the routes had declined.', 'It shows that silk was the only important good on the routes.', 'It refers to a single road built across Central Asia.'], answer: 1, type: 'detail', explanation: 'The name “was popularized by a German geographer in the nineteenth century, long after the routes had declined.”' },
        { q: 'The word "prized" in the passage is closest in meaning to', choices: ['won', 'forced open', 'measured', 'valued'], answer: 3, type: 'vocab', explanation: 'Silk was “highly prized in Rome”, that is, highly valued. “Won” (as a prize) and “forced open” (to prize open) are real meanings that do not fit this context.' },
        { q: 'Why does the author mention Dunhuang and Kashgar?', choices: ['To give examples of towns that grew rich from the relay trade', 'To identify the places where silk was produced', 'To show where the plague first appeared', 'To explain why few merchants traveled the entire distance'], answer: 0, type: 'purpose', explanation: 'They are named as oasis towns that “grew wealthy by supplying caravans”, an example of the relay system creating “prosperity along the way”.' },
        { q: 'What can be inferred about the author’s view of the Silk Road?', choices: ['Its main importance lay in the trade of luxury goods such as silk.', 'It harmed Europe more than it benefited Asia.', 'The exchange of ideas along it mattered more than the trade in goods.', 'It declined because the relay system made goods too expensive.'], answer: 2, type: 'inference', explanation: 'The author writes, “Perhaps more significant than any commodity, however, were the ideas that traveled the same paths.”' },
        { q: 'There are four locations in the passage that indicate where the following sentence could be added. Where would the sentence best fit?', insert: 'In this way, a single bale of silk might change hands many times before it reached a buyer at the far end of the network.', choices: ['Location A', 'Location B', 'Location C', 'Location D'], answer: 2, fixed: true, type: 'insert', explanation: '“In this way” refers back to the sentence before [C]: “goods passed from trader to trader through a long chain of markets.” Changing hands many times is exactly what that relay means, and the next sentence goes on to “this relay system”.' },
      ],
    },
    {
      id: 'acad-placebo', title: 'The placebo effect',
      text: 'A placebo is a treatment that contains no active ingredient, such as a sugar pill or an injection of salt water. Surprisingly, patients who receive placebos often report genuine relief, particularly from symptoms such as pain, nausea and fatigue. This phenomenon, known as the placebo effect, is so consistent that new medicines are usually tested against placebos in carefully controlled trials. A drug is considered effective only if it performs meaningfully better than a treatment that contains nothing. The effect appears to depend largely on expectation. Patients who believe that a treatment will help may release natural pain-relieving chemicals in the brain. These chemicals can mitigate discomfort without any medicine at all. The context of treatment matters as well. In several studies, injections produced stronger effects than pills. Similarly, tablets described as expensive brought more relief than identical ones described as cheap. Expectation can also work in the opposite direction: patients warned about possible side effects sometimes experience them even after taking an inactive pill. Most strikingly, some studies have found benefits even when patients were told openly that they were taking a placebo. Researchers suggest that the ritual of treatment itself, along with the attention of a caring professional, may activate the body’s own healing responses. Nevertheless, placebos mainly change how people experience symptoms rather than the underlying disease.',
      questions: [
        { q: 'According to the passage, why are new medicines tested against placebos?', choices: ['Because placebos have no side effects', 'To find out which patients expect to get better from treatment', 'Because placebos are cheaper than active medicines', 'To show that a drug works better than an inactive treatment'], answer: 3, type: 'detail', explanation: '“A drug is considered effective only if it performs meaningfully better than a treatment that contains nothing.”' },
        { q: 'The word "mitigate" in the passage is closest in meaning to', choices: ['cause', 'ease', 'reveal', 'prolong'], answer: 1, type: 'vocab', explanation: 'Natural pain-relieving chemicals “mitigate discomfort”, that is, ease or lessen it.' },
        { q: 'According to the passage, all of the following can influence the strength of the placebo effect EXCEPT:', choices: ['whether the treatment is an injection or a pill', 'how expensive the treatment is said to be', 'the amount of active ingredient the pill contains', 'the patient’s expectations about the treatment'], answer: 2, type: 'except', explanation: 'Injections versus pills, tablets “described as expensive” and “expectation” are all named. A placebo by definition “contains no active ingredient”.' },
        { q: 'Why does the author mention patients who are warned about possible side effects?', choices: ['To show that expectation can produce unpleasant effects as well as relief', 'To argue that doctors should stop warning patients about the side effects of new drugs', 'To explain why new medicines are tested in controlled trials', 'To suggest that inactive pills contain harmful substances'], answer: 0, type: 'purpose', explanation: 'The example follows “Expectation can also work in the opposite direction”: warned patients feel side effects “even after taking an inactive pill”.' },
        { q: 'What can be concluded from the studies in which patients were told openly that they were taking a placebo?', choices: ['Placebos generally work better than most of the active medicines they are tested against.', 'Deceiving patients is not always necessary for a placebo to help.', 'Expectation plays no role in the placebo effect.', 'Placebos can cure the underlying disease.'], answer: 1, type: 'inference', explanation: 'These studies “found benefits even when patients were told openly” that the pill was a placebo, so the effect did not depend on deception. The last option contradicts “rather than the underlying disease”.' },
      ],
    },
    {
      id: 'acad-urban-birds', title: 'Birdsong in noisy cities',
      text: 'Birds rely on song to attract mates and defend territory, yet cities are filled with low-frequency noise from traffic, construction and machinery. Over the past few decades, researchers have documented a range of ways in which urban birds adjust their singing to this environment. Great tits in European cities, for example, tend to sing at higher pitches than members of the same species in nearby forests. These higher notes help their songs rise above the low rumble of engines. Other birds simply sing louder, a response also seen in people who raise their voices in a crowded room. Some European robins in noisy areas have even shifted part of their singing to the night, when streets are comparatively quiet. These adjustments, however, are not without cost. Singing loudly for prolonged periods demands extra energy. In addition, some studies found that female great tits responded more strongly to lower-pitched songs. A song that carries well in a city may therefore impress potential mates less. Scientists are still debating whether such changes are learned by individual birds or reflect gradual evolution in urban populations. A natural experiment offered one clue. When traffic fell sharply during the pandemic lockdowns of 2020, white-crowned sparrows in San Francisco began singing more softly within weeks. The answer matters because it helps predict how wildlife will cope as cities continue to expand.',
      questions: [
        { q: 'What is the passage mainly about?', choices: ['How urban birds change their songs in response to noise, and at what cost', 'Why many songbirds avoid building their nests in large, noisy cities', 'How traffic noise in cities affects the way that people speak', 'The differences between the songs of great tits and European robins'], answer: 0, type: 'main', explanation: 'The passage describes how “urban birds adjust their singing”, the costs of these adjustments and the debate about their cause.' },
        { q: 'According to the passage, why do great tits in cities sing at higher pitches?', choices: ['Higher songs require less energy.', 'Female birds living in cities have come to prefer higher-pitched songs.', 'Higher songs are easier to hear above low-frequency noise.', 'Higher songs imitate the sounds of machinery.'], answer: 2, type: 'detail', explanation: 'The higher notes “help their songs rise above the low rumble of engines”. The second option contradicts “female great tits responded more strongly to lower-pitched songs”.' },
        { q: 'Why does the author mention people who raise their voices in a crowded room?', choices: ['To show that urban noise also harms human health', 'To argue that birds learn their songs by listening to people', 'To explain why robins sing at night', 'To compare one bird response to a familiar human behavior'], answer: 3, type: 'purpose', explanation: 'Singing louder is “a response also seen in people who raise their voices in a crowded room” — a comparison with everyday human behavior.' },
        { q: 'The word "prolonged" in the passage is closest in meaning to', choices: ['delayed', 'extended', 'intense', 'repeated'], answer: 1, type: 'vocab', explanation: 'Singing loudly “for prolonged periods” means for extended, long periods of time.' },
        { q: 'What can be inferred from the observation of white-crowned sparrows in San Francisco?', choices: ['Sparrows are more sensitive to traffic noise than great tits are.', 'The lockdowns caused many sparrows to move to quieter parts of the city.', 'Some song changes happen too fast to be explained by evolution alone.', 'Urban birds stopped singing completely once the traffic had declined.'], answer: 2, type: 'inference', explanation: 'The sparrows changed “within weeks”, far faster than the “gradual evolution in urban populations” mentioned just before, which points toward flexible, learned behavior.' },
      ],
    },
  ],

  listening_response: [
    { id: 'resp-campus-2', title: 'Campus replies', items: [
      resp('A', 'I don’t suppose you’ve seen my keys anywhere?', ['I think they’re on the kitchen table.', 'I suppose I have keys.', 'Keys are easy to lose.', 'I saw a movie.'], 0, 'An indirect question asking for help locating something.'),
      resp('B', 'The professor said we could work in pairs.', ['Great — do you want to work together?', 'I have a pair of shoes.', 'The professor works hard.', 'We worked yesterday.'], 0, 'Acting on the news by proposing a partnership.'),
      resp('A', 'That lecture went on forever.', ['I know, I almost fell asleep.', 'It started at nine.', 'Forever is a long time.', 'The lecture hall is big.'], 0, 'Agreeing with an exaggerated complaint.'),
      resp('B', 'Should I bring anything to the potluck?', ['Maybe a salad or a dessert.', 'The potluck is on Friday.', 'I brought it yesterday.', 'Yes, it should.'], 0, 'Answering with a suggestion.'),
      resp('A', 'You’ve already finished the whole book?', ['I couldn’t put it down.', 'The book has 300 pages.', 'I finished my homework.', 'It’s a library book.'], 0, 'Explaining surprising speed.'),
      resp('B', 'Let me know if you need a ride to the airport.', ['That’s kind of you — I might take you up on that.', 'The airport is big.', 'I need a flight.', 'You rode a bike.'], 0, 'Politely accepting an offer.'),
    ] },
    { id: 'resp-work-2', title: 'Work and study', items: [
      resp('A', 'I was hoping to leave a bit early today.', ['That should be fine if the report is done.', 'Early is at eight.', 'Today is Monday.', 'I hope so too, thanks.'], 0, 'Responding to an indirect request for permission.'),
      resp('B', 'Our group still hasn’t picked a topic.', ['How about renewable energy?', 'The group has four people.', 'I picked apples.', 'Topics are important.'], 0, 'Offering a suggestion to solve the problem.'),
      resp('A', 'Do you mind if I record the meeting?', ['Not at all, go ahead.', 'Yes, I recorded it.', 'The meeting is long.', 'I mind my business.'], 0, '“Not at all” gives permission.'),
      resp('B', 'I’m afraid the printer is out of paper again.', ['There’s more in the supply closet.', 'I’m afraid of printers.', 'The printer is new.', 'Paper is white.'], 0, 'Solving the stated problem.'),
      resp('A', 'Weren’t we supposed to hear back about the grant by now?', ['Yes — maybe I should call the office.', 'We heard music.', 'The grant is large.', 'By now it’s three.'], 0, 'Agreeing and proposing action.'),
      resp('B', 'That’s the third time the bus has been late this week.', ['Maybe we should start leaving earlier.', 'Three is a small number.', 'The bus is red.', 'I took the train last year.'], 0, 'Responding to a complaint with a practical idea.'),
    ] },
    { id: 'resp-social-2', title: 'Social situations', items: [
      resp('A', 'I can’t make it to your party on Saturday, unfortunately.', ['That’s too bad — maybe next time.', 'The party starts at eight.', 'Saturday is a weekend.', 'I made a cake.'], 0, 'Accepting a refusal politely.'),
      resp('B', 'This soup could use a little more salt.', ['Here, try adding some of this.', 'Soup is a liquid.', 'I use salt every day.', 'It’s chicken soup.'], 0, 'The speaker implies the soup is bland.'),
      resp('A', 'How come you’re not at practice today?', ['I twisted my ankle yesterday.', 'Practice makes perfect.', 'I came by bus.', 'Today is sunny.'], 0, '“How come” asks why.'),
      resp('B', 'Congratulations on your new job!', ['Thanks! I start next month.', 'The job is new.', 'You too, congratulations.', 'I have a job interview.'], 0, 'Thanking and adding information.'),
      resp('A', 'Are you sure this is the right address?', ['Let me check the message again.', 'The address is on Main Street, I’m sure you know.', 'I’m sure it’s right, it was wrong.', 'Addresses have numbers.'], 0, 'Responding to doubt by verifying.'),
      resp('B', 'Wasn’t the museum free on Sundays?', ['It used to be, but not anymore.', 'The museum has paintings.', 'I was free on Sunday.', 'Sundays are relaxing.'], 0, 'Correcting outdated information.'),
    ] },
  ],

  listening_conversation: [
    {
      id: 'conv-lab-equipment', title: 'Broken lab equipment', context: 'Listen to a conversation between a student and a lab manager.',
      roles: { Student: 'A', Manager: 'B' },
      lines: [
        say('Student', 'Hi, the microscope at station seven isn’t focusing properly. I think the knob is stuck.'),
        say('Manager', 'Thanks for telling me. That one has been giving us trouble all week. I’ll put a sign on it.'),
        say('Student', 'The problem is, I need to finish my cell observations today. The report’s due tomorrow.'),
        say('Manager', 'Station twelve is free for the next two hours. It’s a newer model, so the controls are a bit different — the light switch is on the side.'),
        say('Student', 'Perfect. I’ll move my slides there.'),
      ],
      questions: [
        mc('Why does the student speak to the manager?', ['To report a problem with equipment', 'To ask for an extension', 'To reserve a station for next week', 'To return some slides'], 0, 'The microscope “isn’t focusing properly”.'),
        mc('What does the manager say about station twelve?', ['It is also broken', 'It has a different type of controls', 'It must be reserved online', 'It is available all day'], 1, 'It is a newer model, and “the controls are a bit different”.'),
      ],
    },
    {
      id: 'conv-study-abroad', title: 'Study abroad credits', context: 'Listen to a conversation between a student and an academic adviser.',
      roles: { Student: 'B', Adviser: 'A' },
      lines: [
        say('Student', 'I’m planning to study in Spain next spring, but I’m worried I’ll fall behind in my major.'),
        say('Adviser', 'That’s a common concern. Which courses are you taking there?'),
        say('Student', 'Two economics courses, a Spanish language course and an art history class.'),
        say('Adviser', 'The economics courses should transfer as major credits if they’re pre-approved. The art history class can count as an elective.'),
        say('Student', 'How do I get them pre-approved?'),
        say('Adviser', 'Send me the syllabi, and I’ll forward them to the economics department. Do it soon — it can take a few weeks.'),
      ],
      questions: [
        mc('What is the student worried about?', ['Paying for the program', 'Delaying progress in his major', 'Learning Spanish', 'Finding housing in Spain'], 1, 'He is “worried I’ll fall behind in my major”.'),
        mc('Why does the adviser tell the student to act soon?', ['Applications close next week', 'Approval may take several weeks', 'The courses may fill up', 'The adviser is leaving'], 1, '“It can take a few weeks.”'),
      ],
    },
    {
      id: 'conv-roommate', title: 'Choosing a roommate', context: 'Listen to a conversation between two friends.',
      roles: { Sara: 'A', Tom: 'B' },
      lines: [
        say('Sara', 'I have to choose a roommate for next year, and I have two options.'),
        say('Tom', 'Who are they?'),
        say('Sara', 'Kim, who’s one of my best friends, and Julia, who I don’t know well but who’s very organized and quiet.'),
        say('Tom', 'Living with a friend sounds fun, but it can also ruin the friendship if your habits don’t match.'),
        say('Sara', 'That’s what worries me. Kim stays up really late, and I have early classes.'),
        say('Tom', 'Then maybe Julia is the safer choice. You can still see Kim all the time.'),
      ],
      questions: [
        mc('What is Sara’s concern about living with Kim?', ['Kim is messy', 'Their sleep schedules are different', 'Kim is moving away', 'Kim wants a single room'], 1, 'Kim “stays up really late”; Sara has early classes.'),
        mc('What does Tom suggest?', ['Living alone', 'Choosing Julia', 'Asking Kim to change her habits', 'Finding a third option'], 1, '“Maybe Julia is the safer choice.”'),
      ],
    },
  ],

  listening_announcement: [
    {
      id: 'ann-fire-drill', title: 'Fire drill', context: 'Listen to an announcement in a residence hall.',
      roles: { Announcer: 'B' },
      lines: [say('Announcer', 'Good evening, residents. Tomorrow at ten a.m., we will hold a fire drill. When the alarm sounds, leave the building using the nearest stairway — do not use the elevators — and gather in the parking lot behind the dining hall. The drill should take about fifteen minutes. Residents who need assistance during an evacuation should contact the front desk tonight.')],
      questions: [
        mc('Where should residents go during the drill?', ['To the dining hall', 'To the parking lot behind the dining hall', 'To the front desk', 'To their rooms'], 1, '“Gather in the parking lot behind the dining hall.”'),
        mc('What should residents who need help do?', ['Use the elevators', 'Contact the front desk tonight', 'Stay in the building', 'Arrive at 10 a.m.'], 1, 'They “should contact the front desk tonight”.'),
      ],
    },
    {
      id: 'ann-guest-lecture', title: 'Guest lecture', context: 'Listen to an announcement at the end of a class.',
      roles: { Professor: 'A' },
      lines: [say('Professor', 'One last thing before you go. Next Wednesday, instead of our regular class, we’ll attend a guest lecture by Dr. Amina Diallo, who studies water policy in West Africa. It’s in the main auditorium at the usual time. Please read her short article on the course website beforehand — we’ll discuss it in our next class, and it will be on the final exam.')],
      questions: [
        mc('What will happen next Wednesday?', ['The class is canceled', 'Students will attend a guest lecture', 'There will be an exam', 'Class will start later'], 1, 'Students will attend a guest lecture instead of regular class.'),
        mc('What should students do before the lecture?', ['Write a summary', 'Read an article', 'Prepare questions for Dr. Diallo', 'Register online'], 1, '“Please read her short article.”'),
      ],
    },
  ],

  listening_academic: [
    {
      id: 'talk-sleep-animals', title: 'Sleep in animals', context: 'Listen to part of a lecture in a biology class.',
      roles: { Professor: 'B' },
      lines: [say('Professor', 'We tend to think of sleep as lying still with both eyes closed, but animals sleep in surprisingly different ways. Dolphins, for example, need to keep swimming and come up for air, so they sleep with one half of the brain at a time. One eye stays open, and the awake half controls breathing and watches for danger. Some birds do the same thing during long migrations. Then there are animals like giraffes, which sleep only about four or five hours a day, often in short naps while standing. Bats, on the other hand, may sleep up to twenty hours. Why such variation? One idea is that sleep patterns reflect trade-offs between the need for rest and the risk of being attacked. Animals that are easy targets for predators tend to sleep less and more lightly.')],
      questions: [
        mc('What is the lecture mainly about?', ['Why humans need eight hours of sleep', 'Different ways animals sleep', 'How dolphins breathe', 'Why bats are nocturnal'], 1, 'The lecture describes various sleep patterns.'),
        mc('How do dolphins sleep?', ['Only on land', 'With one half of the brain at a time', 'Upside down', 'For twenty hours a day'], 1, 'They sleep “with one half of the brain at a time”.'),
        mc('Why does the professor mention giraffes?', ['As an example of an animal that sleeps very little', 'To compare them with dolphins’ breathing', 'To show that large animals sleep most', 'To explain migration'], 0, 'Giraffes sleep “only about four or five hours a day”.'),
        mc('According to the professor, what may explain the variation in sleep?', ['The size of the brain', 'A balance between rest and danger from predators', 'The temperature of the environment', 'The amount of food available'], 1, 'Trade-offs “between the need for rest and the risk of being attacked”.'),
      ],
    },
    {
      id: 'talk-supply-demand-housing', title: 'Rent control', context: 'Listen to part of a lecture in an economics class.',
      roles: { Professor: 'A' },
      lines: [say('Professor', 'Rent control is a policy that limits how much landlords can raise rents. The goal is to protect tenants from sudden increases, and in the short term it often does exactly that. Families can stay in their neighborhoods, which keeps communities stable. But many economists warn about long-term effects. If rents are capped, building new apartments may become less profitable, so fewer are built. Some landlords may also spend less on maintenance or convert apartments into condos to sell. The result can be a smaller supply of rental housing, which pushes up rents for units that aren’t controlled. So the debate isn’t really about whether rent control helps current tenants — it usually does. It’s about whether it helps future renters, and how to design it to limit the downsides.')],
      questions: [
        mc('What is the main goal of rent control?', ['To increase landlords’ profits', 'To protect tenants from large rent increases', 'To encourage new construction', 'To convert apartments into condos'], 1, 'The goal is “to protect tenants from sudden increases”.'),
        mc('According to economists, what may happen in the long term?', ['More apartments are built', 'The supply of rental housing shrinks', 'All rents decrease', 'Maintenance improves'], 1, 'The result can be “a smaller supply of rental housing”.'),
        mc('What does the professor say about current tenants?', ['They are usually helped by rent control', 'They are usually harmed', 'They must move to new buildings', 'They pay higher rents'], 0, 'Rent control “usually does” help current tenants.'),
        mc('What does the professor imply about the debate?', ['It is mainly about future renters and policy design', 'It has been settled', 'Economists all support rent control', 'It concerns only condos'], 0, 'It is “about whether it helps future renters, and how to design it”.'),
      ],
    },
    {
      id: 'talk-color-perception', title: 'Color perception', context: 'Listen to part of a lecture in a psychology class.',
      roles: { Professor: 'B' },
      lines: [say('Professor', 'Here’s a question: is a banana yellow in the dark? Physically, color isn’t a property of objects themselves. Objects reflect certain wavelengths of light, and our brains interpret those wavelengths as colors. What’s remarkable is how much the brain adjusts. A white sheet of paper looks white both in bluish daylight and under yellowish indoor light, even though the light reaching your eyes is quite different. This is called color constancy. The brain estimates the color of the lighting and compensates for it. Usually this works perfectly, but occasionally it fails in interesting ways — remember that famous photo of a dress that some people saw as blue and black and others as white and gold? People were making different assumptions about the lighting in the photo.')],
      questions: [
        mc('What is the lecture mainly about?', ['How bananas ripen', 'How the brain interprets color', 'Why photos lose color', 'How paper is made white'], 1, 'The lecture explains color perception and constancy.'),
        mc('What is color constancy?', ['Colors fading over time', 'The brain adjusting for different lighting', 'Objects producing their own light', 'Seeing only one color'], 1, 'The brain “compensates” for lighting.'),
        mc('Why does the professor mention the photo of a dress?', ['To show that color constancy can sometimes lead to different perceptions', 'To discuss fashion trends', 'To prove that cameras are inaccurate', 'To show that everyone sees colors the same way'], 0, 'People made “different assumptions about the lighting”.'),
        mc('What does the professor imply about the banana in the dark?', ['It is still yellow in the same way', 'Color depends on light reaching our eyes', 'It becomes blue', 'It reflects more light'], 1, 'Color is an interpretation of reflected light, not a property of the object.'),
      ],
    },
  ],
};
