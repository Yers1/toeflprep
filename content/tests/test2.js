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
        text: 'Before the middle of the fifteenth century, every book in Europe had to be copied by hand. This work was usually done by monks or professional scribes, who might spend months on a single volume. As a result, books were scarce and expensive, and literacy was largely confined to the clergy and the wealthy. Around 1450, Johannes Gutenberg, a metalworker from the German city of Mainz, found a solution. His printing system combined several existing technologies with new ones. He adapted the screw press, which had long been used to crush grapes and olives, and paired it with movable metal type and an oil-based ink that adhered well to metal. Individual letters could be arranged into a page, printed many times, and then rearranged for the next page. The consequences proved pivotal. Printing workshops soon spread to cities across the continent, and the cost of books fell sharply. Because every copy of an edition was identical, scholars in distant cities could cite the same page and compare their findings with far greater accuracy. Printers also tended to favor consistent spellings, which gradually helped to standardize several European languages. However, the new technology also alarmed those in power. Religious and political authorities recognized that cheap pamphlets could circulate criticism faster than they could suppress it. Many responded by requiring printers to obtain official approval before publishing.',
        questions: [
          { ...mc('What is the passage mainly about?', ['The career of Johannes Gutenberg before he became a printer', 'How farmers in Europe crushed grapes and olives', 'The invention of printing and its effects on European society', 'Why monks and scribes refused to adopt the printing press'], 2, 'The passage describes how Gutenberg’s system worked and then its “consequences”: cheaper books, accurate scholarship, standard spelling and censorship.'), type: 'main' },
          { ...mc('According to the passage, why were books scarce before the middle of the fifteenth century?', ['Paper was not yet available in Europe', 'Authorities limited the number of books that could be made', 'Only members of the clergy were permitted to own books', 'Each copy had to be produced slowly by hand'], 3, 'Every book “had to be copied by hand” by scribes who “might spend months on a single volume. As a result, books were scarce.”'), type: 'detail' },
          { ...mc('The word "pivotal" in the passage is closest in meaning to', ['temporary', 'crucial', 'unexpected', 'harmful'], 1, '“The consequences proved pivotal” = they were crucial, of central importance, as the following sentences show.'), type: 'vocab' },
          { ...mc('What can be inferred about European spelling before the spread of printing?', ['It was less consistent than it later became', 'It was controlled by religious authorities', 'It was the same in every European language', 'It was invented by the first printers'], 0, 'Printers “tended to favor consistent spellings, which gradually helped to standardize” languages, so spelling had been less uniform before.'), type: 'inference' },
          { ...mc('Why does the author mention "cheap pamphlets"?', ['To explain why the cost of books fell sharply', 'To show why some authorities saw printing as a threat', 'To give an example of how spellings became consistent', 'To argue that printed texts were less accurate than manuscripts'], 1, 'Authorities feared pamphlets “could circulate criticism faster than they could suppress it” – the press “alarmed those in power”.'), type: 'purpose' },
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
        text: 'Deserts receive so little rainfall that most plants would perish within weeks, yet a remarkable variety of species flourishes there. Botanists generally group their adaptations into three broad strategies. The first, used by succulents such as cacti, is to store water. A cactus stem is pleated like an accordion, allowing it to swell after a storm and contract slowly during prolonged dry spells. Its leaves have been reduced to spines, so the green stem takes over the work of photosynthesis. A waxy coating on the stem further limits evaporation. The second strategy is not to resist drought at all but to evade it. Many desert annuals spend most of their existence as dormant seeds. Some of these seeds contain chemicals that block germination until enough rain has fallen to wash them away. This mechanism prevents the seeds from sprouting after a brief shower that could not sustain a mature plant. Once a heavy rain finally arrives, the plants complete their entire life cycle within a few weeks. The third strategy is to reach water that other plants cannot. The roots of the mesquite tree have been found tens of meters below the surface, where groundwater remains available throughout the year. In addition, many succulents rely on a specialized form of photosynthesis. They open their pores only at night, when cooler air reduces water loss, and store carbon dioxide for use during the day.',
        questions: [
          { ...mc('According to the passage, what allows a cactus stem to hold more water after a storm?', ['Its spines collect rainwater and carry it to the roots', 'Its pleated structure lets it expand', 'Its waxy coating absorbs moisture from the air', 'Its pores stay open throughout the day'], 1, 'The stem “is pleated like an accordion, allowing it to swell after a storm”.'), type: 'detail' },
          { ...mc('The word "prolonged" in the passage is closest in meaning to', ['extended', 'severe', 'seasonal', 'unpredictable'], 0, '“Prolonged dry spells” are long, extended periods without rain.'), type: 'vocab' },
          { ...mc('What can be inferred about the chemicals found in some desert seeds?', ['They make the seeds poisonous to the animals that eat them', 'They allow the seeds to sprout after even a brief shower', 'They keep seedlings from appearing when rain is too scarce to sustain them', 'They are produced by the parent plant only in unusually wet years with long rainy seasons'], 2, 'They “block germination until enough rain has fallen”, which “prevents the seeds from sprouting after a brief shower that could not sustain a mature plant”.'), type: 'inference' },
          { ...mc('According to the passage, all of the following are ways desert plants cope with dry conditions EXCEPT:', ['storing water in stems that can expand', 'completing their life cycle quickly after heavy rain', 'opening their pores at night', 'shedding their roots during the driest months'], 3, 'Water storage, a life cycle “within a few weeks” and opening pores “only at night” are all described; shedding roots is never mentioned.'), type: 'except' },
          { ...mc('What is indicated about the mesquite tree?', ['It stores large amounts of water in its swollen stem', 'It draws on water that lasts through the dry seasons', 'It completes its whole life cycle within a few weeks', 'It opens its pores only at night to save water'], 1, 'Its roots reach depths “where groundwater remains available throughout the year”.'), type: 'inference' },
        ],
      } },
      { task: 'reading_academic', item: {
        id: 'pt2-r-a3', title: 'The spacing effect',
        text: 'Many students prepare for examinations by studying intensively the night before, a habit commonly known as cramming. [A] Research in cognitive psychology, however, suggests that this is among the least efficient ways to learn. As early as the 1880s, the German psychologist Hermann Ebbinghaus observed that material is retained far longer when practice is distributed across several sessions rather than concentrated in one. This phenomenon is now called the spacing effect. It has since been replicated with learners of every age and with subjects ranging from vocabulary to surgical skills. [B] Two students who each study for three hours may perform equally well on a test the following morning. After a week, by contrast, the one who studied in separate sessions typically remembers considerably more. Researchers have proposed several explanations for this pattern. [C] One holds that a modest amount of forgetting is actually beneficial. When a memory has begun to fade, the effort required to retrieve it strengthens it more than effortless repetition does. Psychologists sometimes describe such obstacles as "desirable difficulties." [D] Another account emphasizes context. Sessions held at different times link the material to a wider range of cues, which can later trigger recall. Despite this evidence, spacing remains underused, partly because cramming produces a sense of fluency that learners mistake for durable knowledge.',
        questions: [
          { ...mc('What is the passage mainly about?', ['The life and research of Hermann Ebbinghaus', 'The differences between learning vocabulary and surgical skills', 'Techniques teachers use to stop students from cramming', 'A well-established learning effect and the explanations offered for it'], 3, 'The passage defines the spacing effect, gives evidence for it, presents two explanations and notes why it is underused.'), type: 'main' },
          { q: 'There are four locations in the passage that indicate where the following sentence could be added. Where would the sentence best fit?', insert: 'The difference, however, rarely shows up on a test taken immediately after studying.', choices: ['Location A', 'Location B', 'Location C', 'Location D'], answer: 1, fixed: true, type: 'insert', explanation: '“The difference” refers to the advantage of spaced practice just described, and the next sentence illustrates it: both students “perform equally well … the following morning”, and only “after a week” does the spaced learner remember more. At A no difference has been mentioned yet; at C it would separate “several explanations” from “One holds”; at D it would interrupt the list of explanations.' },
          { ...mc('The word "replicated" in the passage is closest in meaning to', ['reproduced', 'challenged', 'simplified', 'publicized'], 0, 'The effect “has since been replicated” with many learners = the result has been reproduced in later studies.'), type: 'vocab' },
          { ...mc('Why does the author mention "desirable difficulties"?', ['To argue that difficult subjects are learned more quickly', 'To show that psychologists disagree about whether the spacing effect exists', 'To name the kind of obstacle that, according to one explanation, strengthens memory', 'To explain why students prefer cramming to spaced study'], 2, 'The term labels “such obstacles” – the effort of retrieving a fading memory, which “strengthens it”.'), type: 'purpose' },
          { ...mc('What can be inferred about learners who cram?', ['They usually study for fewer total hours than other students', 'They tend to overestimate how well they will remember the material later', 'They do worse than spaced learners on a test the following morning', 'They depend mainly on contextual cues when they try to recall information'], 1, 'Cramming gives “a sense of fluency that learners mistake for durable knowledge”, so they believe they will remember more than they do. C is contradicted: both students “perform equally well … the following morning”.'), type: 'inference' },
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
        text: 'In temperate regions, the leaves of many trees turn brilliant shades of red, orange and yellow each autumn. These colors are produced by pigments, natural chemicals that absorb some kinds of light and reflect others. Throughout spring and summer, leaves contain large amounts of chlorophyll, the green pigment that allows plants to capture sunlight and convert it into food. Chlorophyll is so abundant during these months that it masks every other color in the leaf. As the days grow shorter and temperatures fall, trees gradually stop producing chlorophyll and begin to break down what remains. At the same time, a thin layer of cells forms where each leaf joins its branch, slowly cutting off the leaf’s supply of water. Once the green fades, yellow and orange pigments called carotenoids become visible. These pigments are not new; they were present in the leaf all summer but were hidden by the chlorophyll. Red and purple shades develop differently. Some species actively produce new red pigments in autumn. Scientists think these may shield the leaf from strong sunlight while the tree recovers valuable nutrients before the leaf drops. Weather also plays an important role. A series of sunny days followed by cool nights tends to produce the most vivid reds. In contrast, a warm, cloudy autumn usually results in duller colors.',
        questions: [
          { ...mc('What is the passage mainly about?', ['How trees grow new leaves in spring', 'Why the leaves of some trees change color in autumn', 'How plants use sunlight to make food', 'Why some trees keep their green leaves throughout the whole year'], 1, 'The whole passage explains where autumn leaf colors come from and what affects them.'), type: 'main' },
          { ...mc('The word "masks" in the passage is closest in meaning to', ['hides', 'damages', 'protects', 'replaces'], 0, 'Chlorophyll “masks every other color” = it hides them; later the carotenoids “were hidden by the chlorophyll”.'), type: 'vocab' },
          { ...mc('According to the passage, why do yellow and orange colors appear in autumn?', ['Trees begin to produce them when the nights become cool', 'Strong sunlight turns the remaining chlorophyll into new pigments', 'They were present all along and show once the chlorophyll is gone', 'Water collects in the leaf and gradually changes its color'], 2, '“Once the green fades,” carotenoids “become visible. These pigments are not new; they were present in the leaf all summer.”'), type: 'detail' },
          { ...mc('According to the passage, all of the following happen to leaves in autumn EXCEPT:', ['Trees stop producing chlorophyll.', 'A layer of cells cuts off the leaf’s water supply.', 'Some species produce new red pigments.', 'Large amounts of new carotenoids are produced.'], 3, 'The first three are stated. Carotenoids “are not new; they were present in the leaf all summer”.'), type: 'except' },
          { ...mc('According to the passage, what kind of weather usually produces the brightest red leaves?', ['A warm, cloudy autumn', 'Heavy rain followed by strong wind', 'Sunny days followed by cool nights', 'Cool, cloudy days with warm nights'], 2, '“Sunny days followed by cool nights tends to produce the most vivid reds.”'), type: 'detail' },
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
      bas('Nina', 'Did you get the job at the museum?', 'Paul', 'I don’t know yet. They', ['said', 'they', 'would', 'call me', 'by'], 'Friday.', 'calls', 'Reported speech usually backshifts will → would.'),
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
