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
      id: 'acad-octopus', title: 'Octopus intelligence',
      text: 'Octopuses are invertebrates, more closely related to snails than to mammals, yet they display problem-solving abilities that rival those of many vertebrates. In laboratory studies, octopuses have learned to open screw-top jars, navigate mazes and distinguish between shapes. Some have even been observed escaping from their tanks at night to raid neighboring ones before returning.\n\nWhat makes this intelligence remarkable is how differently it is organized. About two-thirds of an octopus’s neurons are located not in its brain but in its arms. Each arm can respond to touch and taste and even perform simple actions on its own, which may allow the animal to explore several places at once. Researchers think this intelligence evolved because octopuses lost the protective shells of their ancestors. Without armor, they had to rely on flexible behavior—camouflage, hiding and clever hunting—to survive. Their short lifespans, usually one or two years, make their abilities even more puzzling, since they have little time to learn from experience.',
      questions: [
        mc('What is the passage mainly about?', ['How octopuses escape from tanks', 'The unusual nature of octopus intelligence', 'Why snails are related to octopuses', 'How to train animals in laboratories'], 1, 'The passage describes the abilities and organization of octopus intelligence.'),
        mc('According to the passage, where are most of an octopus’s neurons?', ['In its brain', 'In its arms', 'In its eyes', 'Evenly distributed'], 1, 'Two-thirds are “in its arms”.'),
        mc('Why does the author mention the tank escapes?', ['To show that octopuses are dangerous', 'To give an example of octopus problem-solving', 'To explain how octopuses hunt', 'To argue that labs should be improved'], 1, 'It illustrates clever behavior.'),
        mc('The word “rival” in the passage is closest in meaning to', ['equal', 'destroy', 'imitate', 'avoid'], 0, 'Their abilities match those of vertebrates.'),
        mc('Why does the author find octopus intelligence “puzzling”?', ['Because octopuses have no brains', 'Because they live only a short time', 'Because they have shells', 'Because they are mammals'], 1, 'Short lifespans leave “little time to learn from experience”.'),
      ],
    },
    {
      id: 'acad-silk-road', title: 'The Silk Road',
      text: 'The Silk Road was not a single road but a vast network of trade routes that connected China with Central Asia, the Middle East and the Mediterranean for more than a thousand years. Although it is named after Chinese silk, which was highly valued in Rome, many other goods traveled along it, including spices, glass, horses and paper.\n\nFew merchants traveled the entire distance. Instead, goods passed from trader to trader through a chain of cities, each of which took a profit. Oasis towns in the deserts of Central Asia grew rich by providing water, food and markets. Perhaps more important than the goods, however, were the ideas that moved along the same routes. Buddhism spread from India into China, papermaking techniques traveled westward, and mathematical knowledge was exchanged between scholars. The routes also carried disease: historians believe the plague that devastated Europe in the fourteenth century spread partly along these trade networks.',
      questions: [
        mc('According to the passage, why was the Silk Road not really a “road”?', ['It was mostly by sea', 'It was a network of many routes', 'It was built only in China', 'It was used for a short time'], 1, 'It was “a vast network of trade routes”.'),
        mc('How did most goods travel along the routes?', ['Single merchants carried them the whole way', 'They passed through many traders and cities', 'They were sent by the Roman government', 'They traveled only by horse'], 1, 'Goods “passed from trader to trader”.'),
        mc('Why did oasis towns become wealthy?', ['They produced silk', 'They served travelers and traders', 'They collected taxes from Rome', 'They controlled the plague'], 1, 'They provided “water, food and markets”.'),
        mc('The word “devastated” in the passage is closest in meaning to', ['severely damaged', 'slightly affected', 'protected', 'described'], 0, 'The plague caused great destruction.'),
        mc('What does the author suggest was the most significant result of the Silk Road?', ['The popularity of silk in Rome', 'The exchange of ideas', 'The growth of horse breeding', 'The invention of glass'], 1, '“Perhaps more important than the goods… were the ideas.”'),
      ],
    },
    {
      id: 'acad-placebo', title: 'The placebo effect',
      text: 'A placebo is a treatment with no active ingredient, such as a sugar pill. Surprisingly, patients who receive placebos often report real improvements, particularly in symptoms such as pain, nausea and fatigue. This phenomenon, the placebo effect, is so reliable that new medicines must be tested against placebos: a drug is considered effective only if it performs better than a pill that contains nothing.\n\nThe effect appears to depend largely on expectation. Patients who believe a treatment will help may release natural pain-relieving chemicals in the brain. The context of treatment matters as well. In some studies, larger pills, more expensive-looking packaging and injections produced stronger effects than small, plain tablets. Most strikingly, a few studies have found benefits even when patients were told openly that they were taking a placebo. Researchers suggest that the ritual of treatment itself, along with attention from a caring professional, may trigger the body’s own healing responses.',
      questions: [
        mc('Why must new medicines be compared with placebos?', ['Placebos are cheaper', 'To show the drug works better than an inactive treatment', 'Because patients prefer placebos', 'To test the packaging'], 1, 'A drug is effective “only if it performs better than a pill that contains nothing”.'),
        mc('According to the passage, the placebo effect depends mainly on', ['the ingredients of the pill', 'patients’ expectations', 'the time of day', 'the patient’s age'], 1, '“The effect appears to depend largely on expectation.”'),
        mc('Why does the author mention expensive-looking packaging?', ['To criticize drug companies', 'To show that context can influence the effect', 'To explain how pills are made', 'To suggest that placebos are costly'], 1, '“The context of treatment matters as well.”'),
        mc('What is surprising about the “open-label” studies?', ['Patients refused the placebo', 'Placebos helped even when patients knew what they were', 'The placebos contained real medicine', 'Doctors did not attend'], 1, 'Benefits appeared even when patients were told.'),
        mc('The word “trigger” in the passage is closest in meaning to', ['prevent', 'start', 'measure', 'hide'], 1, 'The ritual may start healing responses.'),
      ],
    },
    {
      id: 'acad-urban-birds', title: 'Birds in noisy cities',
      text: 'Birds rely on song to attract mates and defend territory, but cities are full of low-frequency noise from traffic and machinery. Researchers have found that many urban birds have adjusted. Great tits in European cities, for example, sing at higher pitches than members of the same species in forests, which helps their songs rise above the rumble of engines. Some species also sing earlier in the morning or at night, when streets are quieter.\n\nThese changes are not always beneficial. Higher-pitched songs may be less attractive to potential mates, and birds that sing louder spend more energy. In addition, songs that are well suited to cities may not work as well if the birds move to quieter areas. Scientists are still debating whether the changes are learned by individual birds or whether urban populations are gradually evolving. The answer matters because it helps predict how wildlife will cope as cities continue to grow.',
      questions: [
        mc('What is the main idea of the first paragraph?', ['Birds avoid cities', 'Urban birds have changed how they sing', 'Traffic noise is increasing', 'Forest birds sing at higher pitches'], 1, 'Urban birds “have adjusted”.'),
        mc('Why do great tits in cities sing at higher pitches?', ['To save energy', 'To be heard over low-frequency noise', 'To imitate car alarms', 'Because they are smaller'], 1, 'It helps songs “rise above the rumble of engines”.'),
        mc('According to the passage, what is one possible cost of these changes?', ['Songs may be less attractive to mates', 'Birds stop singing at night', 'Cities become quieter', 'Birds migrate earlier'], 0, 'Higher songs “may be less attractive”.'),
        mc('What are scientists still debating?', ['Whether birds sing at all in cities', 'Whether the changes are learned or evolved', 'Whether noise affects humans', 'Whether forests are growing'], 1, 'Learned by individuals or evolving populations.'),
        mc('Why does the author say “the answer matters”?', ['It will help reduce traffic', 'It helps predict how wildlife will adapt to growing cities', 'It will make birdsong louder', 'It will decide which species are protected'], 1, 'It “helps predict how wildlife will cope”.'),
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
