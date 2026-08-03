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
    }
  ],

  listening_response: [
    { prompt: 'Did you manage to submit the lab report?', choices: ['Yes, just before the deadline.', 'The laboratory is on the second floor.', 'No, the professor submitted it.', 'It was a very scientific report.'], answer: 0, explanation: 'The response directly answers whether the report was submitted.' },
    { prompt: 'Why don\'t we meet after the economics lecture?', choices: ['The lecture explained inflation.', 'That works; I should be free by four.', 'I met the lecturer last semester.', 'Because economics is my major.'], answer: 1, explanation: 'The speaker is suggesting a meeting time.' },
    { prompt: 'I thought the advising office closed at five.', choices: ['It usually does, but today it closes at four.', 'The adviser gave me useful advice.', 'Five students work in that office.', 'I will close the document.'], answer: 0, explanation: 'The response naturally corrects or qualifies the assumption.' },
    { prompt: 'Would you mind watching my bag for a minute?', choices: ['I bought the bag yesterday.', 'Not at all. I\'ll stay here.', 'The watch is in my bag.', 'It only takes a minute to walk there.'], answer: 1, explanation: '"Not at all" accepts the request.' },
    { prompt: 'The statistics workshop has been moved online.', choices: ['Then I\'ll look for the meeting link.', 'Statistics has several branches.', 'The workshop room is very large.', 'I moved here last year.'], answer: 0, explanation: 'Looking for the link is the relevant next action.' },
    { prompt: 'How did your presentation go?', choices: ['It is going to the auditorium.', 'About twelve minutes.', 'Better than I expected, actually.', 'I used three presentation slides tomorrow.'], answer: 2, explanation: 'The question asks for an evaluation of the presentation.' }
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
    }
  ]
};
