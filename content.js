'use strict';

// Original practice content inspired by the task families described in the
// public TOEFL iBT 2026 specifications. No ETS questions are reproduced here.
window.TP_2026_CONTENT = {
  reading_words_passages: [
    {
      title: 'Urban trees and temperature',
      text: 'Cities are often warmer than nearby rural areas because roads and buildings absorb heat. Trees can r__uce this effect in several ways. Their leaves provide sh__e, while water released through transpiration cools the surr__nding air. The benefit is not evenly distr__uted, however. Neighborhoods with fewer trees may remain much h__ter during summer. For this reason, some city planners use satellite data to id__tify areas where new planting would have the greatest impact.',
      answers: ['reduce', 'shade', 'surrounding', 'distributed', 'hotter', 'identify']
    },
    {
      title: 'How sleep supports learning',
      text: 'Sleep does more than restore energy. During sleep, the brain appears to org__ize information gathered during the day. Researchers have f__nd that people often remember material better after sleeping than after remaining awake for the same l__gth of time. Deep sleep may help stabilize facts, wh__e rapid-eye-movement sleep may support creative connections. Consistent sleep is therefore an imp__tant part of effective study, not time lost from it.',
      answers: ['organize', 'found', 'length', 'while', 'important']
    },
    {
      title: 'Citizen science',
      text: 'Large research projects sometimes depend on volunteers to collect observations. In citizen-science programs, members of the p__lic may count birds, measure rainfall, or classify images online. A single observation can be unre__able, but thousands of reports can reveal broad patt__ns. Scientists still need to check data quality and account for uneven participation. When carefully des__ned, however, these projects expand both scientific kn__ledge and public involvement in research.',
      answers: ['public', 'unreliable', 'patterns', 'designed', 'knowledge']
    },
    {
      title: 'Why we misremember details',
      text: "Memory is not a perfect recording of events. Every time we recall something, the brain may reconstruct the scene, and new information can quietly change the original story. Researchers have found that witnesses who discuss an event before giving a statement sometimes adopt details suggested by other people. This is why interviewers try to ask open questions and avoid leading ph__es. A single suggested detail, such as a wrong color or object, can become part of a person's memory without their awaren__s. Understanding this process matters far beyond the courtroom, because the same reconstructive effect shapes how we remember conversations, news, and even our own decisions.",
      answers: ['phrases', 'awareness']
    },
    {
      title: 'The benefits of spaced repetition',
      text: 'Cramming the night before an exam may feel productive, but research suggests that spreading study sessions over time is more eff__tive. When you review material after a delay, the brain has to work harder to rec__l it, and that effort strengthens the memory. Short sessions repeated across several days also reduce fatigue and keep motivation h__h. The key is to schedule reviews before you forget, rather than waiting until the material is completely g__e. Many students find that a simple calendar reminder is enough to build this habit.',
      answers: ['effective', 'recall', 'high', 'gone']
    },
    {
      title: 'How cities reduce noise',
      text: 'Traffic, construction, and crowded streets make cities noisy, and constant noise can raise stress and disturb sl__p. Cities use several methods to reduce the problem. Barriers such as walls and dense vegetation can bl__k sound before it reaches homes. Building materials that absorb sound, rather than reflect it, help inside buildings. Planners also separate noisy roads from quiet areas such as parks and schools. Even small changes, like using quieter pavement or limiting truck routes at night, can make a measurable diff___nce. Because noise travels in many directions, the most eff__tive plans combine several of these approaches.',
      answers: ['sleep', 'block', 'difference', 'effective']
    }
  ],

  reading_daily: [
    {
      title: 'Library equipment notice',
      text: 'Beginning Monday, students may borrow podcast microphones from the Media Desk. Reservations must be made at least 24 hours in advance. Each kit may be kept for two days. Late returns will prevent the borrower from making another equipment reservation for one week. The recording rooms remain available without a microphone reservation.',
      questions: [
        { q: 'What is the main purpose of the notice?', choices: ['To advertise a podcast course', 'To explain a new borrowing service', 'To announce that recording rooms are closing', 'To recruit Media Desk workers'], answer: 1, explanation: 'The notice introduces microphones and explains how borrowing works.' },
        { q: 'What happens after a late return?', choices: ['The student pays for a new kit', 'The kit must be returned the same day', 'The student temporarily loses reservation access', 'The recording rooms become unavailable'], answer: 2, explanation: 'The notice says another reservation cannot be made for one week.' },
        { q: 'What can students do without reserving a microphone?', choices: ['Use a recording room', 'Keep a kit for a week', 'Borrow from a professor', 'Extend a two-day loan'], answer: 0, explanation: 'Recording rooms remain available independently of microphone reservations.' }
      ]
    },
    {
      title: 'Message from a project partner',
      text: 'Hi Lena, I reviewed the slides for tomorrow. The evidence on slide six is strong, but I think we should move the graph before the quotation so the trend is clear first. I can make that change tonight. Could you check the final two slides for repeated points? I will be on the train after 8:00, so please send any other edits before then. - Amir',
      questions: [
        { q: 'Why does Amir want to move the graph?', choices: ['The quotation is inaccurate', 'The graph needs a new source', 'The audience should see the pattern earlier', 'Slide six contains repeated points'], answer: 2, explanation: 'He wants the trend to be clear before the quotation appears.' },
        { q: 'What does Amir ask Lena to do?', choices: ['Replace the evidence', 'Review the ending for repetition', 'Call him after 8:00', 'Present slide six'], answer: 1, explanation: 'He asks her to check the final two slides for repeated points.' }
      ]
    },
    {
      title: 'Workshop registration page',
      text: 'Designing Clear Research Posters - Friday, 3:00-4:30 p.m., Science Center 204. Bring a laptop and one paragraph describing your research topic. The first 30 students to register will receive feedback on a draft poster during the session. Others may attend, but feedback appointments will be scheduled for the following week. Registration closes Thursday at noon.',
      questions: [
        { q: 'Who will receive feedback during the workshop?', choices: ['Everyone who attends', 'Students with completed posters', 'The first 30 registered students', 'Only Science Center students'], answer: 2, explanation: 'The first 30 registrants receive feedback during the session.' },
        { q: 'What should every participant bring?', choices: ['A printed poster', 'A laptop and research description', 'A registration receipt', 'A list of appointments'], answer: 1, explanation: 'The page explicitly requests a laptop and one paragraph about the topic.' }
      ]
    },
    {
      title: 'Campus shuttle schedule change',
      text: 'Starting next week, the campus shuttle will run every 15 minutes during peak hours instead of every 10 minutes. Service between the library and the athletic center will end at 9:00 p.m. instead of 10:00 p.m. Evening service to the residence halls is unchanged. Students who use the shuttle after dark should review the updated schedule posted at each stop.',
      questions: [
        { q: 'What is the main change to the shuttle?', choices: ['The route will be longer', 'Buses will run less often during peak hours', 'The shuttle will stop at the athletic center', 'Fares will increase'], answer: 1, explanation: 'The interval changes from every 10 minutes to every 15 minutes.' },
        { q: 'Which service is unchanged?', choices: ['The library to athletic center route', 'Peak-hour frequency', 'Evening service to residence halls', 'The 10:00 p.m. departure'], answer: 2, explanation: 'The notice says evening service to the residence halls is unchanged.' },
        { q: 'Where can students find the updated schedule?', choices: ['At each stop', 'On the athletic center desk', 'In the library only', 'From their instructor'], answer: 0, explanation: 'The revised schedule is posted at each stop.' }
      ]
    },
    {
      title: 'Apartment sublet notice',
      text: 'Sublet available: one bedroom in a two-bedroom apartment near the north campus gate, from June 1 to August 15. Rent is 450 per month, including water and internet. Electricity is billed separately. The apartment is furnished, and the current tenant will store personal items in the closet. Interested students should contact the tenant by email and include their move-in date. A short viewing can be arranged on weekday evenings.',
      questions: [
        { q: 'What is included in the rent?', choices: ['Electricity', 'Water and internet', 'Furniture rental', 'Parking'], answer: 1, explanation: 'The notice says water and internet are included; electricity is separate.' },
        { q: 'When can the apartment be viewed?', choices: ['Any weekend morning', 'On weekday evenings', 'Only on June 1', 'During business hours'], answer: 1, explanation: 'Viewings can be arranged on weekday evenings.' },
        { q: 'What should interested students include in their email?', choices: ['A reference letter', 'Their move-in date', 'A copy of their lease', 'Their class schedule'], answer: 1, explanation: 'The notice asks for the move-in date.' }
      ]
    },
    {
      title: 'Grocery delivery schedule',
      text: 'The campus grocery service delivers orders to the residence halls every Tuesday and Friday. Orders must be placed by 8:00 p.m. the evening before delivery. A minimum order of 15 is required, and a 2 delivery fee is added to orders below 25. Students can pay by card at checkout or in cash when the order arrives. Items that are out of stock are refunded automatically and do not appear on the receipt.',
      questions: [
        { q: 'On which days does the service deliver?', choices: ['Monday and Thursday', 'Tuesday and Friday', 'Wednesday and Saturday', 'Every day'], answer: 1, explanation: 'Deliveries occur on Tuesdays and Fridays.' },
        { q: 'When must an order be placed?', choices: ['The morning of delivery', 'By 8:00 p.m. the night before', 'At least a week in advance', 'Any time on delivery day'], answer: 1, explanation: 'Orders close at 8:00 p.m. the evening before delivery.' },
        { q: 'What happens to out-of-stock items?', choices: ['They are replaced with similar items', 'They are refunded automatically', 'They are added to the next order', 'The customer is called'], answer: 1, explanation: 'Out-of-stock items are refunded automatically.' }
      ]
    },
    {
      title: 'Course waitlist email',
      text: 'Dear Ms. Rivera, You are third on the waitlist for Psychology 210, which begins next Monday. Two students have already been admitted from the waitlist, and one more seat may open after the first class. If you are offered a place, you will receive an email with a registration link that expires in 24 hours. Please check your inbox regularly. If you no longer wish to remain on the waitlist, reply to this message with the subject line "Remove me." - Office of the Registrar',
      questions: [
        { q: 'What is the student\'s current position on the waitlist?', choices: ['First', 'Second', 'Third', 'Fourth'], answer: 2, explanation: 'The email states the student is third on the waitlist.' },
        { q: 'How long does the registration link remain valid?', choices: ['One hour', '12 hours', '24 hours', 'One week'], answer: 2, explanation: 'The link expires in 24 hours.' },
        { q: 'What should the student do to leave the waitlist?', choices: ['Call the registrar', 'Reply with a specific subject line', 'Attend the first class', 'Wait for the link to expire'], answer: 1, explanation: 'The email asks for a reply with the subject line "Remove me."' }
      ]
    },
    {
      title: 'Gym class cancellation',
      text: 'The 6:00 p.m. spin class on Thursday will be cancelled because the instructor is attending a conference. Members with a reservation for that class may use the open gym instead, or they may book the 7:00 p.m. class, which still has space. Reservations for the cancelled class will be released automatically at noon on Thursday. The regular schedule resumes on Friday.',
      questions: [
        { q: 'Why is the spin class cancelled?', choices: ['The room is being repaired', 'The instructor is away at a conference', 'Not enough members registered', 'The gym closes early'], answer: 1, explanation: 'The instructor is attending a conference.' },
        { q: 'What happens to reservations for the cancelled class?', choices: ['They are moved to Friday', 'They are released automatically', 'They are refunded', 'They are kept for next week'], answer: 1, explanation: 'Reservations are released automatically at noon on Thursday.' },
        { q: 'What option is available to affected members?', choices: ['A private session', 'The 7:00 p.m. class', 'A free month', 'The open gym only'], answer: 1, explanation: 'Members may use the open gym or book the 7:00 p.m. class.' }
      ]
    }
  ],

  reading_academic: [
    {
      title: 'The ecology of biological soil crusts',
      text: 'In many dry environments, the apparently bare ground between plants is covered by a thin living community known as biological soil crust. These crusts contain organisms such as cyanobacteria, lichens, and mosses. Although they may be only a few millimeters thick, they influence the entire ecosystem. Filaments produced by cyanobacteria bind loose soil particles together, reducing erosion caused by wind and water. Some crust organisms also convert atmospheric nitrogen into forms that plants can use. Biological soil crusts recover slowly after disturbance. A single vehicle track can remain visible for decades because growth is limited by scarce moisture. Recovery time also depends on the organisms present: mobile cyanobacteria may recolonize before more complex lichens. Land managers therefore face a difficult balance. Restricting travel protects crusts, but some desert areas must remain accessible for research, recreation, or local livelihoods. Recent management plans often concentrate traffic on established routes rather than attempting to prevent all human activity.',
      questions: [
        { q: 'What is the passage mainly about?', choices: ['Why desert plants require constant rain', 'How soil crusts function and why they need protection', 'Why lichens grow faster than cyanobacteria', 'How vehicle tracks help desert research'], answer: 1, explanation: 'The passage explains ecosystem functions, vulnerability, and management.' },
        { q: 'How do cyanobacterial filaments affect soil?', choices: ['They increase moisture loss', 'They make nitrogen unavailable', 'They hold particles together', 'They replace desert plants'], answer: 2, explanation: 'The filaments bind loose soil and reduce erosion.' },
        { q: 'Why can vehicle tracks remain visible for decades?', choices: ['Crust growth is slow in dry conditions', 'Vehicles remove all nitrogen from soil', 'Managers refuse to repair the routes', 'Lichens grow only under vehicles'], answer: 0, explanation: 'Scarce moisture makes recovery slow.' },
        { q: 'The word "concentrate" in the final sentence is closest in meaning to', choices: ['study', 'direct', 'increase', 'hide'], answer: 1, explanation: 'Plans direct traffic onto established routes.' }
      ]
    },
    {
      title: 'Why some materials remember their shape',
      text: 'Shape-memory alloys can return to a previously defined form after being bent. Their behavior results from a reversible change in crystal structure. At a lower temperature, the material enters a phase in which its internal structure can be rearranged relatively easily, so the object may be deformed. Heating causes the atoms to shift back into a more rigid arrangement, restoring the original shape. Nickel-titanium is a widely used shape-memory alloy because it combines this effect with resistance to corrosion. Medical devices provide one important application. A compact stent made from the alloy can be inserted into a blood vessel and then expand at body temperature. Engineers must nevertheless control the transformation temperature precisely. If the material changes phase too early, a device may be difficult to position; if it changes too late, it may not function inside the body. The same principle is used in pipe connectors, temperature-sensitive switches, and small robotic mechanisms.',
      questions: [
        { q: 'What causes a shape-memory alloy to recover its original form?', choices: ['A chemical coating dissolves', 'Its crystal structure changes with temperature', 'Corrosion makes the material expand', 'Pressure removes nickel from the alloy'], answer: 1, explanation: 'Heating reverses the crystal phase and restores the defined shape.' },
        { q: 'Why is nickel-titanium useful for medical devices?', choices: ['It is soft at every temperature', 'It never changes its internal structure', 'It remembers shape and resists corrosion', 'It can be positioned without temperature control'], answer: 2, explanation: 'The passage identifies both properties.' },
        { q: 'What difficulty must engineers address?', choices: ['Selecting an exact transformation temperature', 'Preventing every type of deformation', 'Making the alloy dissolve in blood', 'Replacing all rigid materials'], answer: 0, explanation: 'The transformation must happen neither too early nor too late.' },
        { q: 'Which application is mentioned in the passage?', choices: ['Solar panels', 'Aircraft fuel', 'Robotic mechanisms', 'Concrete foundations'], answer: 2, explanation: 'Small robotic mechanisms appear in the final sentence.' }
      ]
    },
    {
      title: 'Why rivers meander',
      text: 'Most rivers do not flow in straight lines. Even on gentle slopes, a river often develops a series of curves called meanders. The process begins with a small irregularity, such as a fallen tree or a patch of harder rock, that deflects the current toward one bank. Water moving faster on the outside of the curve erodes that bank, while slower water on the inside deposits sediment. Over time the curve grows wider and the river shifts sideways across its floodplain. A meander can eventually become so curved that the river cuts across the narrow neck of land between two bends, abandoning the old loop. The abandoned channel, called an oxbow lake, gradually fills with sediment and vegetation. Meandering therefore does not simply move water; it reshapes the surrounding landscape over decades and centuries.',
      questions: [
        { q: 'What starts the formation of a meander?', choices: ['A change in rainfall', 'A small irregularity that deflects the current', 'The river reaching the ocean', 'A rise in water temperature'], answer: 1, explanation: 'The passage says a small irregularity deflects the current toward one bank.' },
        { q: 'What happens on the inside of a curve?', choices: ['Erosion increases', 'Sediment is deposited', 'The water speeds up', 'The bank collapses'], answer: 1, explanation: 'Slower water on the inside deposits sediment.' },
        { q: 'What is an oxbow lake?', choices: ['A lake formed by a glacier', 'An abandoned river loop that fills with sediment', 'A reservoir built for irrigation', 'A pond created by beavers'], answer: 1, explanation: 'An oxbow lake is an abandoned channel that gradually fills.' },
        { q: 'The word "abandoning" in the passage is closest in meaning to', choices: ['repairing', 'leaving', 'widening', 'measuring'], answer: 1, explanation: 'The river leaves the old loop behind.' }
      ]
    },
    {
      title: 'How plants defend themselves',
      text: 'Plants cannot run away from danger, but they are far from defenseless. Many species produce chemical compounds that make their leaves taste unpleasant or even toxic to herbivores. Some of these defenses are always present, while others are activated only after an attack. When a leaf is damaged, the plant may release volatile chemicals that warn neighboring plants, which then begin producing their own protective compounds. Other plants use physical defenses, such as thorns, tough fibers, or tiny hairs that irritate the mouths of grazing animals. A few species even recruit helpers: certain trees emit signals that attract predatory insects, which feed on the herbivores damaging the tree. These strategies are not mutually exclusive. A single plant may combine chemical, physical, and indirect defenses, adjusting the mix as conditions change.',
      questions: [
        { q: 'What is the main idea of the passage?', choices: ['Plants compete with each other for light', 'Plants use several kinds of defenses against herbivores', 'Herbivores have no effect on plant growth', 'Chemical defenses are always toxic to humans'], answer: 1, explanation: 'The passage surveys chemical, physical, and indirect defenses.' },
        { q: 'What do volatile chemicals released by a damaged leaf do?', choices: ['They attract herbivores', 'They warn neighboring plants', 'They harden the soil', 'They slow down photosynthesis'], answer: 1, explanation: 'The chemicals warn nearby plants to produce defenses.' },
        { q: 'How do some trees recruit helpers?', choices: ['By growing taller', 'By attracting predatory insects', 'By producing sweet fruit', 'By dropping their leaves'], answer: 1, explanation: 'Signals attract predatory insects that feed on the herbivores.' },
        { q: 'The phrase "mutually exclusive" in the passage is closest in meaning to', choices: ['unable to occur together', 'difficult to observe', 'equally important', 'widely studied'], answer: 0, explanation: 'The strategies can be combined, so they are not mutually exclusive.' }
      ]
    }
  ],

  listening_response: [
    { prompt: 'Did you manage to submit the lab report?', choices: ['Yes, just before the deadline.', 'The laboratory is on the second floor.', 'No, the professor submitted it.', 'It was a very scientific report.'], answer: 0, explanation: 'The response directly answers whether the report was submitted.' },
    { prompt: 'Why don\'t we meet after the economics lecture?', choices: ['The lecture explained inflation.', 'That works; I should be free by four.', 'I met the lecturer last semester.', 'Because economics is my major.'], answer: 1, explanation: 'The speaker is suggesting a meeting time.' },
    { prompt: 'I thought the advising office closed at five.', choices: ['It usually does, but today it closes at four.', 'The adviser gave me useful advice.', 'Five students work in that office.', 'I will close the document.'], answer: 0, explanation: 'The response naturally corrects or qualifies the assumption.' },
    { prompt: 'Would you mind watching my bag for a minute?', choices: ['I bought the bag yesterday.', 'Not at all. I\'ll stay here.', 'The watch is in my bag.', 'It only takes a minute to walk there.'], answer: 1, explanation: '"Not at all" accepts the request.' },
    { prompt: 'The statistics workshop has been moved online.', choices: ['Then I\'ll look for the meeting link.', 'Statistics has several branches.', 'The workshop room is very large.', 'I moved here last year.'], answer: 0, explanation: 'Looking for the link is the relevant next action.' },
    { prompt: 'How did your presentation go?', choices: ['It is going to the auditorium.', 'About twelve minutes.', 'Better than I expected, actually.', 'I used three presentation slides tomorrow.'], answer: 2, explanation: 'The question asks for an evaluation of the presentation.' },
    { prompt: 'The printer in the computer lab is out of paper again.', choices: ['I will let the lab attendant know.', 'The printer paper is very thin.', 'The computer lab closes at midnight.', 'I printed two copies yesterday.'], answer: 0, explanation: 'Reporting the issue is the relevant next action.' },
    { prompt: 'Do you want to join the running club?', choices: ['I ran to class this morning.', 'The club meets on Saturdays.', 'Thanks, but I already train with a team.', 'Running is good exercise.'], answer: 2, explanation: 'The response politely declines the invitation.' },
    { prompt: 'Could you send me the notes from Tuesday\'s lecture?', choices: ['The lecture was about climate policy.', 'Sure, I\'ll email them to you tonight.', 'Tuesday is my busiest day.', 'I took the notes in pencil.'], answer: 1, explanation: 'The response agrees to share the notes.' },
    { prompt: 'The cafeteria is serving pasta for lunch.', choices: ['Then I\'ll head over before it gets busy.', 'Pasta is made from wheat.', 'The cafeteria opened last year.', 'I had lunch at home.'], answer: 0, explanation: 'The response reacts to the news with a relevant plan.' },
    { prompt: 'Have you finished the reading for tomorrow?', choices: ['The reading room is on the third floor.', 'Almost, just the last section.', 'I read a book last summer.', 'Tomorrow is a holiday.'], answer: 1, explanation: 'The response directly reports progress.' },
    { prompt: 'I can\'t find my student ID anywhere.', choices: ['The ID office issues replacements.', 'I found the answer to the problem.', 'My ID has my photo on it.', 'The library is open late.'], answer: 0, explanation: 'The response offers a relevant solution.' },
    { prompt: 'Do you think the exam will be difficult?', choices: ['The exam room is on the second floor.', 'I studied the review slides twice.', 'Difficult is a long word.', 'The exam was last week.'], answer: 1, explanation: 'The response answers the question about preparation.' },
    { prompt: 'The bus to the airport leaves at six.', choices: ['Then we should leave the dorm by five.', 'The airport is far from campus.', 'I took the bus yesterday.', 'Six is my lucky number.'], answer: 0, explanation: 'The response draws the practical conclusion.' }
  ],

  listening_conversation: [
    {
      title: 'Changing a volunteer shift',
      script: 'Student: Hi, I volunteer at the campus food pantry on Thursday afternoons, but my chemistry lab was just moved to the same time. Coordinator: We still need help on Friday morning and Saturday afternoon. Student: Friday conflicts with class, but Saturday could work. Would I need another orientation? Coordinator: No. The tasks are the same, although Saturdays are usually busier because we prepare delivery boxes. Student: That is fine. I would actually like to learn how the deliveries are organized.',
      questions: [
        { q: 'Why does the student speak with the coordinator?', choices: ['To cancel all volunteer work', 'To change a volunteer time', 'To register for chemistry', 'To request another orientation'], answer: 1, explanation: 'A moved lab conflicts with the current Thursday shift.' },
        { q: 'What does the student imply about Saturday?', choices: ['The workload is unacceptable', 'The shift conflicts with class', 'The delivery work interests the student', 'A new orientation is required'], answer: 2, explanation: 'The student says learning the delivery process would be welcome.' },
        { q: 'Why are Saturdays usually busier?', choices: ['More classes meet', 'Delivery boxes are prepared', 'The pantry closes early', 'New volunteers are trained'], answer: 1, explanation: 'The coordinator explicitly mentions preparation of delivery boxes.' }
      ]
    },
    {
      title: 'A missing course prerequisite',
      script: 'Student: I tried to register for Environmental Modeling, but the system says I am missing a prerequisite. Adviser: The listed prerequisite is Applied Statistics. Did you take an equivalent course elsewhere? Student: Yes, during a summer program, but the credit appears as general mathematics on my record. Adviser: Bring the syllabus to Professor Imani. If she approves the content, I can enter an override. Student: Registration closes tomorrow. Adviser: Email the syllabus today and copy me. We can hold a place while she reviews it.',
      questions: [
        { q: 'What problem does the student have?', choices: ['A course appears full', 'A credit is categorized too generally', 'The summer syllabus was lost', 'The adviser rejected an override'], answer: 1, explanation: 'The statistics course appears only as general mathematics.' },
        { q: 'What should the student do first?', choices: ['Retake Applied Statistics', 'Wait until registration closes', 'Email the syllabus', 'Change the summer record alone'], answer: 2, explanation: 'The adviser asks for the syllabus by email today.' },
        { q: 'What will happen while the professor reviews the material?', choices: ['A place can be held', 'The student must leave the course', 'The summer program will respond', 'Registration will be extended for everyone'], answer: 0, explanation: 'The adviser says they can hold a place.' }
      ]
    },
    {
      title: 'Borrowing a camera for a project',
      script: 'Student: I need to film interviews for my sociology project, but the equipment office said the checkout requires a deposit. Adviser: The deposit is refundable and can be paid by card. Reservations go quickly before midterms, so book at least a week ahead. Student: Is training required to use the camera? Adviser: The basic camera only needs a short online safety tutorial. If you also want the external microphone, you must complete a longer training session.',
      questions: [
        { q: 'What problem does the student mention?', choices: ['The camera is broken', 'A deposit is required to borrow equipment', 'The project was rejected', 'The office is closed'], answer: 1, explanation: 'The student says a checkout deposit is required.' },
        { q: 'What does the adviser recommend about timing?', choices: ['Return equipment the same day', 'Reserve about a week ahead', 'Film before 9:00 a.m.', 'Use a personal camera'], answer: 1, explanation: 'Reservations fill quickly before midterms, so advance booking is advised.' },
        { q: 'When must the student complete the longer training session?', choices: ['To use the basic camera', 'To borrow the external microphone', 'To pay the deposit', 'To reserve equipment'], answer: 1, explanation: 'The longer session is required only when the microphone is borrowed as well.' }
      ]
    },
    {
      title: 'Requesting a transcript',
      script: 'Student: I need an official transcript for a scholarship application, but the deadline is in ten days. Office worker: Standard processing takes two weeks, but we can rush it for a fee. Student: How much is the rush fee? Office worker: Twenty dollars, and the transcript is ready in three business days. Student: That works. Do I need to fill out a form? Office worker: Yes, the request form is online. You can pay by card when you submit it.',
      questions: [
        { q: 'Why does the student need the transcript?', choices: ['For a job interview', 'For a scholarship application', 'To register for a course', 'To change majors'], answer: 1, explanation: 'The student mentions a scholarship application.' },
        { q: 'How long does rush processing take?', choices: ['One day', 'Three business days', 'One week', 'Two weeks'], answer: 1, explanation: 'The rush service takes three business days.' },
        { q: 'What must the student do to request the transcript?', choices: ['Visit the office in person', 'Fill out an online form', 'Call the registrar', 'Bring a photo'], answer: 1, explanation: 'The request form is online.' }
      ]
    },
    {
      title: 'Changing a meal plan',
      script: 'Student: I want to switch from the 14-meal plan to the 10-meal plan. Dining office: The change is allowed before the end of the second week of the semester. Student: I\'m still within that window. How does the refund work? Dining office: The difference is credited to your student account, not returned in cash. Student: When will the new plan start? Dining office: It takes effect at the beginning of next week. Your current card will keep working until then.',
      questions: [
        { q: 'What does the student want to do?', choices: ['Cancel the meal plan entirely', 'Move to a smaller meal plan', 'Add more meals to the plan', 'Transfer the plan to a friend'], answer: 1, explanation: 'The student wants to switch from 14 to 10 meals.' },
        { q: 'How is the refund issued?', choices: ['In cash', 'As a credit to the student account', 'As a dining card bonus', 'It is not refundable'], answer: 1, explanation: 'The difference is credited to the student account.' },
        { q: 'When does the new plan take effect?', choices: ['Immediately', 'At the start of next week', 'At the end of the semester', 'After the second week'], answer: 1, explanation: 'The new plan begins at the start of next week.' }
      ]
    }
  ],

  listening_announcement: [
    {
      title: 'Museum entrance change',
      script: 'Attention visitors. Because maintenance work is taking place near the east doors, the museum entrance has temporarily moved to the courtyard on King Street. The ticket desk and coat check are now located inside that entrance. Visitors who require step-free access should continue to use the west entrance and press the intercom for assistance. The east doors are expected to reopen next Tuesday.',
      questions: [
        { q: 'Why was the main entrance moved?', choices: ['A private event is occurring', 'Maintenance is being done', 'The ticket desk is closed', 'The courtyard is being renovated'], answer: 1, explanation: 'Maintenance near the east doors caused the change.' },
        { q: 'Who should use the west entrance?', choices: ['Visitors needing step-free access', 'People without tickets', 'Museum employees only', 'Visitors arriving next Tuesday'], answer: 0, explanation: 'The announcement specifically directs those visitors west.' },
        { q: 'What is expected next Tuesday?', choices: ['The coat check will close', 'Ticket prices will change', 'The east doors will reopen', 'The museum will move'], answer: 2, explanation: 'The closure is expected to end then.' }
      ]
    },
    {
      title: 'Severe weather class update',
      script: 'Due to the forecast for freezing rain, all classes beginning before ten tomorrow morning will be held online. Classes starting at ten or later are expected to meet normally, but students should check the university alert page before traveling. The north parking lot will remain closed throughout the day so crews can treat the surface. Campus buses will use the library stop instead.',
      questions: [
        { q: 'Which classes will definitely move online?', choices: ['All classes tomorrow', 'Classes before 10:00 a.m.', 'Classes after 10:00 a.m.', 'Only classes near the library'], answer: 1, explanation: 'The announcement explicitly moves early classes online.' },
        { q: 'What should students do before traveling?', choices: ['Call a bus driver', 'Check the alert page', 'Park in the north lot', 'Contact every professor'], answer: 1, explanation: 'Students are asked to check for updates.' },
        { q: 'Why will buses use a different stop?', choices: ['The library is closed', 'The north parking lot is closed', 'Classes end earlier', 'Freezing rain has ended'], answer: 1, explanation: 'The lot closure changes the bus stop.' }
      ]
    },
    {
      title: 'Gym locker renewal',
      script: 'Attention members. Locker assignments in the fitness center expire on the last day of the month. Renewal can be completed at the front desk or through the member portal. Members who do not renew by the deadline should remove their belongings, because unassigned lockers will be opened and emptied during the first week of the following month. Contact the front desk if you need a temporary locker for a single session.',
      questions: [
        { q: 'When do locker assignments expire?', choices: ['At the end of each week', 'On the last day of the month', 'After one year', 'When the member renews'], answer: 1, explanation: 'Assignments expire at the end of the month.' },
        { q: 'What happens to unassigned lockers?', choices: ['They are locked permanently', 'They are opened and emptied', 'They become temporary lockers', 'They are sold to new members'], answer: 1, explanation: 'Unassigned lockers are opened and emptied in the first week.' },
        { q: 'How can members renew?', choices: ['By phone only', 'At the front desk or online', 'Through their employer', 'At the main office downtown'], answer: 1, explanation: 'Renewal is available at the front desk or through the member portal.' }
      ]
    },
    {
      title: 'Library extended hours',
      script: 'Attention students. Beginning this Sunday, the main library will extend its hours during the final examination period. The building will remain open until 2:00 a.m. on weekdays and until midnight on weekends. The 24-hour study room on the ground floor is unaffected. Please note that the coffee shop closes at 10:00 p.m., and only the ground and first floors will be staffed after midnight. Regular hours resume after the last exam.',
      questions: [
        { q: 'What is the announcement about?', choices: ['A new library building', 'Extended hours during exams', 'A coffee shop opening', 'A change in library fees'], answer: 1, explanation: 'The library stays open later during the exam period.' },
        { q: 'Until what time is the library open on weekdays?', choices: ['10:00 p.m.', 'Midnight', '2:00 a.m.', '6:00 a.m.'], answer: 2, explanation: 'Weekday hours extend to 2:00 a.m.' },
        { q: 'What is true about the 24-hour study room?', choices: ['It closes at midnight', 'It is unaffected by the change', 'It is only for graduate students', 'It moves to the first floor'], answer: 1, explanation: 'The study room is unaffected.' }
      ]
    },
    {
      title: 'Campus shuttle detour',
      script: 'Attention riders. Due to road work on College Avenue, the campus shuttle will follow a detour from Monday through Friday. During the detour, the shuttle will not stop at the bookstore. Passengers for the bookstore should use the stop outside the student center, which is a five-minute walk away. The detour adds about ten minutes to the full loop, so please allow extra time. Regular service resumes on Saturday morning.',
      questions: [
        { q: 'Why is the shuttle using a detour?', choices: ['A shuttle broke down', 'Road work on College Avenue', 'The bookstore is closed', 'A new stop was added'], answer: 1, explanation: 'Road work on College Avenue causes the detour.' },
        { q: 'Where should passengers for the bookstore go?', choices: ['The student center stop', 'The library stop', 'The athletic center', 'The main gate'], answer: 0, explanation: 'The student center stop is a five-minute walk from the bookstore.' },
        { q: 'How much time does the detour add?', choices: ['Five minutes', 'Ten minutes', 'Fifteen minutes', 'Twenty minutes'], answer: 1, explanation: 'The detour adds about ten minutes to the loop.' }
      ]
    }
  ],

  listening_academic: [
    {
      title: 'How ants navigate',
      script: 'Some desert ants travel hundreds of meters from their nests while searching for food, yet they return by a remarkably direct route. They cannot rely on scent trails because intense heat causes chemicals to evaporate quickly. Instead, the ants appear to combine two sources of information. First, they monitor the direction of sunlight, including patterns of polarized light that remain visible when the sun is partly hidden. Second, they keep an internal estimate of distance based on their own movement. Researchers demonstrated this distance system by changing the apparent length of the ants\' legs. Ants fitted with tiny extensions walked past their nests, while ants whose legs had been shortened stopped too soon. The ants were not counting steps in a simple way; rather, information from leg movement helped update an internal measure of travel. This process is called path integration.',
      questions: [
        { q: 'Why are scent trails unreliable for desert ants?', choices: ['Other insects remove them', 'Heat causes rapid evaporation', 'The ants travel only at night', 'Sand contains no chemicals'], answer: 1, explanation: 'High temperatures make chemical trails disappear.' },
        { q: 'What two kinds of information do the ants combine?', choices: ['Wind speed and nest odor', 'Sun direction and movement distance', 'Food size and trail color', 'Temperature and sound'], answer: 1, explanation: 'The talk describes a solar compass and an internal distance estimate.' },
        { q: 'What happened to ants with leg extensions?', choices: ['They stopped before the nest', 'They could no longer see sunlight', 'They traveled beyond the nest', 'They followed scent trails'], answer: 2, explanation: 'Longer apparent strides caused them to overshoot.' },
        { q: 'Why does the speaker mention the experiment?', choices: ['To show that ants can be trained', 'To provide evidence for internal distance measurement', 'To compare ants with other insects', 'To explain why ants search for food'], answer: 1, explanation: 'Manipulating leg length tests the distance mechanism.' }
      ]
    },
    {
      title: 'The economics of congestion pricing',
      script: 'Road space in a city is limited, but drivers often pay the same amount to use it whether traffic is light or severe. Congestion pricing changes that arrangement by charging vehicles more during the busiest periods or in the most crowded areas. The goal is not simply to collect revenue. Even a modest reduction in the number of cars can increase traffic speed because congestion does not rise in a straight line. Once a road approaches capacity, each additional vehicle creates a disproportionately large delay. Critics argue that fees may burden lower-income commuters. Cities have addressed this concern in different ways, including discounts, exemptions, and investment of the revenue in public transportation. Evaluating a program therefore requires more than measuring traffic. Researchers also examine travel times, air quality, access to jobs, and how costs are distributed among residents.',
      questions: [
        { q: 'What is the primary purpose of congestion pricing?', choices: ['To build wider roads immediately', 'To reduce demand during crowded periods', 'To make every driver pay the same fee', 'To eliminate public transportation'], answer: 1, explanation: 'Variable fees are intended to change when or whether people drive.' },
        { q: 'Why can a small reduction in cars noticeably improve traffic?', choices: ['Roads become longer', 'Congestion increases nonlinearly near capacity', 'Drivers receive discounts', 'Public transport becomes free'], answer: 1, explanation: 'Near capacity, each extra vehicle produces a large delay.' },
        { q: 'What concern do critics raise?', choices: ['Fees may affect lower-income commuters unfairly', 'Traffic will become too fast', 'Air quality cannot be measured', 'Road capacity will disappear'], answer: 0, explanation: 'Distributional fairness is the stated criticism.' },
        { q: 'What does the speaker suggest about evaluation?', choices: ['Revenue is the only useful measure', 'Traffic speed should be ignored', 'Several social and environmental outcomes matter', 'Programs cannot be compared'], answer: 2, explanation: 'The final sentence lists multiple outcomes.' }
      ]
    },
    {
      title: 'Why flamingos stand on one leg',
      script: 'Flamingos frequently rest while standing on a single leg, and researchers have debated why. One early explanation suggested that the posture reduces heat loss, because a tucked leg exposes less body surface to cool water. A second proposal linked the behavior to balance, since flamingos can even sleep in this position. Recent work measuring sway in captive birds found that the one-legged posture actually requires less muscular effort, because the body weight aligns over the supporting leg in a stable way. The researchers do not claim the behavior has a single cause. Different conditions may favor one-legged standing for different reasons, and the habit probably combines several advantages.',
      questions: [
        { q: 'What does the first explanation suggest about one-legged standing?', choices: ['It helps flamingos fly faster', 'It reduces heat loss', 'It improves eyesight', 'It attracts mates'], answer: 1, explanation: 'The tucked leg exposes less body surface to cool water.' },
        { q: 'What did the recent study measure?', choices: ['Body sway in captive birds', 'Feather thickness', 'Nest construction time', 'Food intake'], answer: 0, explanation: 'The researchers measured how much the birds swayed.' },
        { q: 'What did the study conclude about the posture?', choices: ['It requires more energy than standing on two legs', 'It is impossible to maintain while sleeping', 'It uses less muscular effort', 'It is unique to flamingos'], answer: 2, explanation: 'The one-legged posture requires less muscular effort.' },
        { q: 'What does the speaker say about the explanations?', choices: ['Only the heat-loss theory is correct', 'The behavior probably combines several advantages', 'Researchers have abandoned the debate', 'The evidence supports no explanation'], answer: 1, explanation: 'The speaker says different conditions may favor it for different reasons.' }
      ]
    },
    {
      title: 'The psychology of habit formation',
      script: 'Psychologists describe a habit as a behavior that has become automatic through repetition. When a behavior is repeated in a stable context, the brain begins to associate the situation with the action, so the action can be triggered with little conscious effort. This is why habits are easier to form when the cue is consistent, such as always studying at the same desk. Researchers have found that the strength of a habit depends more on the number of repetitions than on the time that passes. Missing a single day does not usually destroy a habit, but long gaps can weaken it. Changing a habit is often harder than forming one, because the old cue-action link must be replaced rather than simply removed. One common strategy is to keep the cue but attach a new action to it.',
      questions: [
        { q: 'What makes a behavior become a habit?', choices: ['A single strong experience', 'Repetition in a stable context', 'A conscious decision each time', 'A change in environment'], answer: 1, explanation: 'Repetition in a stable context builds automatic associations.' },
        { q: 'What matters most for habit strength?', choices: ['The time between repetitions', 'The number of repetitions', 'The difficulty of the action', 'The time of day'], answer: 1, explanation: 'Strength depends more on repetition count than elapsed time.' },
        { q: 'Why is changing a habit often harder than forming one?', choices: ['New habits require more energy', 'The old cue-action link must be replaced', 'People forget their cues', 'Habits are genetic'], answer: 1, explanation: 'The old link must be replaced, not simply removed.' },
        { q: 'What strategy does the speaker suggest for changing a habit?', choices: ['Remove the cue entirely', 'Keep the cue but attach a new action', 'Wait for the habit to fade', 'Repeat the old action more often'], answer: 1, explanation: 'Keeping the cue and changing the action is a common strategy.' }
      ]
    },
    {
      title: 'Why some lakes are salty',
      script: 'Most lakes contain fresh water, but a few are noticeably salty. The salt usually comes from the rocks and soil in the surrounding watershed. Rainwater, which is slightly acidic, slowly dissolves minerals and carries them into the lake through streams and groundwater. In a lake with an outlet, the dissolved minerals are carried away, so the water stays fresh. A lake without an outlet, however, loses water mainly by evaporation. When water evaporates, the minerals remain behind, and over thousands of years their concentration rises. The Great Salt Lake and the Dead Sea are extreme examples of this process. Their salinity is so high that few organisms can survive, and swimmers float easily because the dense water provides strong buoyancy.',
      questions: [
        { q: 'Where does the salt in salty lakes come from?', choices: ['From ocean tides', 'From minerals dissolved in the watershed', 'From fish waste', 'From rainfall alone'], answer: 1, explanation: 'Minerals dissolve from surrounding rocks and soil.' },
        { q: 'Why do lakes with outlets stay fresh?', choices: ['They receive less rain', 'Dissolved minerals are carried away', 'Their water evaporates quickly', 'They are very deep'], answer: 1, explanation: 'An outlet carries dissolved minerals out of the lake.' },
        { q: 'What happens when lake water evaporates?', choices: ['The lake becomes deeper', 'Minerals remain behind', 'The water becomes colder', 'The outlet closes'], answer: 1, explanation: 'Evaporation removes water but leaves minerals.' },
        { q: 'Why do swimmers float easily in the Dead Sea?', choices: ['The water is very warm', 'The dense water provides strong buoyancy', 'The lake is shallow', 'The water contains no minerals'], answer: 1, explanation: 'High salinity makes the water dense and buoyant.' }
      ]
    }
  ],

  writing_discussion: [
    {
      course: 'Urban planning',
      professor: 'Professor Mensah',
      question: 'Should cities convert more street parking into public spaces such as bicycle lanes, trees, or outdoor seating? Explain which factors should guide the decision.',
      studentA: 'Nora: Cities should prioritize uses that benefit more people. A row of parking spaces serves relatively few drivers, while a protected bicycle lane can move many commuters safely.',
      studentB: 'Mateo: Removing parking can hurt small businesses and residents with limited mobility. Cities should first study who depends on each street.'
    },
    {
      course: 'Education',
      professor: 'Professor Okafor',
      question: 'Should universities require every undergraduate to complete a course in data literacy, regardless of major? Why or why not?',
      studentA: 'Elena: Data shapes news, policy, and everyday decisions, so all students should learn how to question graphs and statistical claims.',
      studentB: 'Ravi: A universal requirement may displace courses that are more relevant to a student\'s field. Departments should decide how much data training their majors need.'
    },
    {
      course: 'Environmental economics',
      professor: 'Professor Chen',
      question: 'Is giving consumers detailed environmental information an effective way to reduce pollution, or are government rules more important?',
      studentA: 'Samira: Clear labels let people reward cleaner companies, and businesses respond when demand changes.',
      studentB: 'Jon: Many consumers cannot research every purchase. Regulations create a minimum standard that applies even when buyers lack time or money.'
    },
    {
      course: 'Public health',
      professor: 'Professor Adeyemi',
      question: 'Should employers be allowed to offer financial rewards to workers who meet health goals such as daily step counts or regular checkups? Why or why not?',
      studentA: 'Lina: Incentives can motivate people who would otherwise skip checkups, and small rewards are a low-cost way to improve population health.',
      studentB: 'Omar: Rewards can pressure employees to share private health data and may punish workers with conditions they cannot control.'
    },
    {
      course: 'Business management',
      professor: 'Professor Alvarez',
      question: 'Should companies allow employees to work from home on a regular basis, or is being in the office important for teamwork and productivity?',
      studentA: 'Priya: Remote work saves commuting time and lets people focus, and many teams already coordinate well online.',
      studentB: 'Tom: Spontaneous conversations in the office build trust and solve problems faster than scheduled video calls.'
    },
    {
      course: 'Public policy',
      professor: 'Professor Nguyen',
      question: 'Should governments spend more public money on the arts, such as theaters, museums, and music programs, even when budgets are tight?',
      studentA: 'Aisha: The arts strengthen communities and attract visitors, so public funding pays back in cultural and economic value.',
      studentB: 'Daniel: When budgets are tight, governments should prioritize health, housing, and education over programs that mainly benefit a small audience.'
    },
    {
      course: 'Media studies',
      professor: 'Professor Silva',
      question: 'Is social media a reliable source of news for young people, or should they rely mainly on traditional news organizations?',
      studentA: 'Mei: Social media reaches people quickly and lets them see many perspectives, including local voices that traditional outlets ignore.',
      studentB: 'Omar: Algorithms reward outrage and repetition, so young people often see misleading or unverified stories before the facts are checked.'
    }
  ]
};
