// Extra Complete the Words and Read in Daily Life items (Nov 2026 batch).

const mc = (q, choices, answer, explanation) => ({ q, choices, answer, explanation });

export default {
  reading_ctw: [
    { id: 'ctw-x-acid-oceans', title: 'Ocean acidification', text: 'The oceans absorb roughly a quarter of the carbon dioxide that humans release into the atmosphere. This absorption partially reduces global warming, but it also alters the chemical composition of seawater. As dissolved carbon accumulates, the water grows increasingly acidic, which diminishes the supply of carbonate. Many marine organisms, including corals and shellfish, depend on carbonate to construct their protective shells. Experiments suggest that young organisms are especially vulnerable, since their developing structures dissolve more easily in acidic conditions.' },
    { id: 'ctw-x-antibiotics', title: 'Antibiotic resistance', text: 'Antibiotics transformed medicine in the twentieth century by making common infections easily treatable. Their widespread and careless application, however, has produced an alarming consequence. Whenever treatment begins, the susceptible bacteria die quickly, while a few naturally resistant individuals survive and reproduce. Gradually, these resistant populations replace the vulnerable ones. The situation worsens when patients stop treatment early or when antibiotics are routinely added to animal feed. Consequently, researchers are urgently searching for alternative therapies.' },
    { id: 'ctw-x-roman-concrete', title: 'Self-healing Roman concrete', text: 'Many Roman harbors and buildings have survived for nearly two thousand years. Modern concrete, by comparison, typically deteriorates considerably within decades. Researchers investigating the contrast discovered that ancient engineers deliberately combined volcanic ash, lime, and seawater. Over time, the seawater reacted with the ash and produced rare minerals that gradually filled tiny cracks. In effect, the material repaired itself continuously. Engineers are now examining whether similar mixtures could reduce the environmental costs of replacing deteriorating modern structures.' },
    { id: 'ctw-x-cognitive-load', title: 'Cognitive load and instruction', text: 'Working memory can hold only a small amount of information at one time. Educational researchers consequently argue that instruction becomes ineffective when it overwhelms this limited capacity. For example, a diagram accompanied by lengthy written explanations forces learners to divide their attention between two sources. Students who receive the same diagram with a brief spoken explanation usually perform better on later tests. Designers are therefore encouraged to remove unnecessary decoration and to present related information simultaneously rather than separately.' },
    { id: 'ctw-x-permafrost', title: 'Thawing permafrost', text: 'Permafrost is ground that remains frozen for at least two consecutive years. Across northern regions, it contains enormous quantities of organic material that accumulated over millennia. When temperatures rise and the frozen ground thaws, microbes rapidly decompose this material and release carbon dioxide and methane. These gases intensify warming, which causes further thawing. Scientists describe this relationship as a feedback loop. Thawing also damages roads, pipelines, and buildings that were constructed on what engineers assumed was permanently solid ground.' },
    { id: 'ctw-x-mangroves', title: 'Mangrove forests', text: 'Mangroves are trees that grow in salty coastal water where most plants could not survive. Their specialized roots exclude salt effectively and securely anchor the trees in unstable mud. These tangled root systems also shelter juvenile species, which explains why mangrove forests are such productive nurseries. In addition, they protect coastlines by absorbing the energy of storm waves. Despite these benefits, mangroves have been cleared extensively for shrimp farms and tourism. Replanted forests rarely recover their original diversity.' },
    { id: 'ctw-x-confirmation-bias', title: 'Confirmation bias', text: 'People tend to search for information that supports what they already believe. This tendency is called confirmation bias. In one classic experiment, participants who strongly supported or opposed a controversial policy examined identical evidence, yet both groups became increasingly confident in their original positions. The bias operates largely unconsciously, which makes it difficult to correct. Scientists reduce its influence by deliberately testing predictions that could prove their hypotheses wrong and by requiring independent replication of important findings.' },
    { id: 'ctw-x-just-in-time', title: 'Just-in-time manufacturing', text: 'Just-in-time manufacturing is a strategy in which companies receive materials only when they are needed. Instead of storing large inventories, factories depend on suppliers delivering components shortly before assembly. This approach reduces storage costs and quickly exposes inefficiencies. However, it also makes production extremely sensitive to disruptions. When a single supplier fails to deliver, an entire assembly line may stop. Recent shortages have encouraged many firms to reconsider this dependence and to maintain larger reserves of critical parts.' },
    { id: 'ctw-x-bioluminescence', title: 'Bioluminescence', text: 'Bioluminescence is the production of light by living organisms. Although it occurs in fireflies and certain fungi, the phenomenon is especially widespread in marine environments, particularly at depths that sunlight never reaches. The light results from a chemical reaction in which an enzyme causes a molecule to release energy. Animals use this ability for varied purposes. Some attract prey with glowing lures, while others confuse predators with sudden flashes. Certain species even glow on their undersides, which hides their silhouettes from predators watching below.' },
    { id: 'ctw-x-creoles', title: 'Pidgins and creoles', text: 'When groups without a shared language must communicate regularly, they sometimes develop a simplified language called a pidgin. Historically, pidgins emerged in trading ports and colonial plantations, combining vocabulary borrowed from different languages. Grammatical structures remained minimal, and speakers typically learned them as adults. However, when children grew up hearing a pidgin, something remarkable happened. They systematically expanded its grammar, creating a fully developed language known as a creole. Linguists study this transformation because it may reveal how human languages originally formed.' },
    { id: 'ctw-x-commons', title: 'The tragedy of the commons', text: 'Economists use the phrase tragedy of the commons to describe the overuse of shared resources. Consider a pasture shared equally by several farmers. Each farmer benefits individually from grazing additional livestock, whereas the resulting damage is distributed among everyone. Consequently, rational decisions by individuals can collectively destroy the pasture. The political scientist Elinor Ostrom later demonstrated that communities frequently avoid this outcome. They establish their own rules, monitor behavior, and impose gradual penalties on members who violate agreements.' },
    { id: 'ctw-x-continental-drift', title: 'From continental drift to plate tectonics', text: 'In 1912, Alfred Wegener proposed that the continents had once been joined together. Wegener observed that coastlines on opposite sides of the Atlantic matched remarkably closely, and identical fossils appeared on widely separated landmasses. Nevertheless, geologists largely rejected his theory because he could not explain what force moved such enormous masses of rock. Decades later, studies of the ocean floor revealed that new crust is continuously created at underwater ridges. This discovery supplied the missing mechanism, and continental drift became part of the broader theory of plate tectonics.' },
  ],

  reading_daily: [
    // ---- short texts, 2 questions ----
    {
      id: 'daily-x-print-credit', format: 'notice', title: 'Print credit reset — all campus labs',
      text: 'Printing balances for the fall term will reset to $0 on December 20. Unused credit does NOT carry over to the spring term.\n\nEvery student account receives $15 of free credit at the start of each term. Extra credit can be bought at the library help desk (cash or card) or online through the student portal.\n\nColor printing is available only in the Arts Building lab.',
      questions: [
        mc('What should a student with credit left over most likely do before December 20?', ['Ask for a refund at the help desk', 'Use the credit before it is lost', 'Move the credit to the spring term', 'Buy extra credit through the portal'], 1, 'Balances “will reset to $0 on December 20” and unused credit “does NOT carry over”, so it should be used before then.'),
        mc('Where can a student print a poster in color?', ['At the library help desk', 'In any campus computer lab', 'In the Arts Building lab', 'Through the student portal'], 2, '“Color printing is available only in the Arts Building lab.”'),
      ],
    },
    {
      id: 'daily-x-bake-sale', format: 'social media post', title: 'Chemistry Club',
      text: 'BAKE SALE UPDATE: Rain is forecast for Friday, so our bake sale is moving from the Main Lawn to the Student Union lobby (same time, 11 a.m.–3 p.m.).\n\nEverything is still $1–$3, and all money goes to our science outreach program for local high schools.\n\nWant to bake? Drop off your items at the Union by 10:30 a.m. — and please label anything that contains nuts!',
      questions: [
        mc('Why has the location of the bake sale changed?', ['The weather is expected to be bad', 'Too few people visited the Main Lawn last time', 'The Student Union offered a free table', 'The sale was extended by several hours'], 0, '“Rain is forecast for Friday, so our bake sale is moving … to the Student Union lobby.”'),
        mc('What can be inferred about students who bake items for the sale?', ['They cannot use nuts in any recipe', 'They should pay a small fee to take part', 'They receive part of the money raised', 'They must arrive before the sale starts'], 3, 'Bakers drop off items “by 10:30 a.m.”, and the sale starts at 11 a.m. Nuts are allowed if labeled, and “all money goes to our science outreach program”.'),
      ],
    },
    {
      id: 'daily-x-airport-ride', format: 'text messages', title: 'Ride to the airport',
      text: 'Aisha: Still on for the airport Thursday? My flight is at 6:40 p.m.\nTom: Yes, but my last class ends at 3, not 2 like I said. Can we leave at 3:30?\nAisha: That’s cutting it close with rush-hour traffic. What if I just take the 2:15 train?\nTom: OK, no problem. Jen is flying out that night too, so I’ll drive with her and we’ll split the parking.',
      questions: [
        mc('Why does Aisha suggest taking the train?', ['Tom’s car is being repaired this week', 'She is worried she may be late', 'The train costs less than parking', 'Jen invited her to travel together'], 1, 'Leaving at 3:30 is “cutting it close with rush-hour traffic” for her 6:40 flight.'),
        mc('What can be inferred about Tom?', ['He will go to the airport with Jen', 'He has changed his flight to a later time', 'He will take the train with Aisha', 'He does not have a class on Thursday'], 0, '“I’ll drive with her and we’ll split the parking.” He has a class until 3, and nothing says his flight changed.'),
      ],
    },
    {
      id: 'daily-x-food-truck', format: 'menu', title: 'Rolling Bowl food truck — Engineering Quad, weekdays 11–2',
      text: 'Build your bowl:\n1. Base: rice or greens ........ $6.50\n2. Protein: chicken +$2.00 | tofu +$1.50 | extra vegetables (free)\n3. Sauce: peanut, chili-lime, or garlic yogurt\n\nShow your student ID: free drink with any bowl\nCard and mobile payment only — no cash',
      questions: [
        mc('How much does a rice bowl with tofu cost?', ['$6.50', '$7.50', '$8.00', '$8.50'], 2, 'Base $6.50 + tofu $1.50 = $8.00.'),
        mc('Which statement about the food truck is true?', ['Cash is not accepted', 'Students get a discount on bowls', 'Drinks are free with any order', 'Only cards can be used to pay'], 0, '“Card and mobile payment only — no cash.” Mobile payment also works, and the free drink requires a student ID.'),
      ],
    },
    {
      id: 'daily-x-open-mic', format: 'poster', title: 'Open Mic Night — Hartley Hall basement',
      text: 'Poets, singers, comedians — the stage is yours!\nWednesday, 8–10 p.m. | Free entry, snacks provided\n\nPerformers: sign up at the door from 7:30. Each act gets 5 minutes.\nAcoustic instruments only — no amplifiers, please.\n\nNot ready to perform? Come and cheer!',
      questions: [
        mc('What is a rule for performers?', ['They must sign up online in advance', 'They cannot use amplified sound', 'They must bring their own snacks', 'They may perform for up to ten minutes'], 1, '“Acoustic instruments only — no amplifiers, please.”'),
        mc('What is the main purpose of the poster?', ['To recruit judges for a talent contest', 'To advertise a music course in Hartley Hall', 'To sell tickets for a comedy show', 'To invite people to a student event'], 3, 'It invites performers (“the stage is yours”) and audience members (“Come and cheer!”). Entry is free, so no tickets are sold.'),
      ],
    },
    {
      id: 'daily-x-office-hours', format: 'email',
      meta: { from: 'Prof. Lena Ortiz', to: 'HIST 115 students', subject: 'Office hours this week' },
      text: 'Hi all,\n\nBecause I will be at a conference Tuesday through Thursday, my office hours this week will be held by video call instead of in Room 208. The time stays the same (Wednesday, 1–3 p.m.); the link is on the course page.\n\nIf you would like feedback on your essay outline, please send it to me by Monday evening so I have time to read it before we meet.\n\nBest,\nL. Ortiz',
      questions: [
        mc('What is changing about office hours this week?', ['They will be held on a different day', 'They will start one hour later', 'They will take place online', 'They will move to Room 208'], 2, 'They “will be held by video call instead of in Room 208”; “The time stays the same”.'),
        mc('Why should students send their outlines by Monday evening?', ['So the professor can review them first', 'Because the outline is graded on Monday', 'So they can be discussed at the conference', 'Because the course page closes on Tuesday'], 0, '“So I have time to read it before we meet.”'),
      ],
    },

    // ---- longer texts, 3 questions ----
    {
      id: 'daily-x-break-housing', format: 'email',
      meta: { from: 'Residential Life', to: 'All residents', subject: 'Staying on campus over winter break' },
      text: 'Dear residents,\n\nResidence halls close for winter break at noon on December 21 and reopen on January 12. Students who need to remain on campus during this period (for example, international students, athletes, or students with campus jobs) must submit a Break Housing Request by December 5.\n\nTo reduce heating costs, all approved students will be moved temporarily to Maple Hall. You do not need to move all your belongings — just what you will need for three weeks.\n\nA fee of $20 per night applies. Students with on-campus jobs may have the fee waived if their supervisor confirms their work schedule.\n\nLate requests will be accepted only if space remains.\n\nResidential Life',
      questions: [
        mc('What is the main purpose of the email?', ['To announce that Maple Hall will close for repairs', 'To remind residents to move out by December 5', 'To advertise campus jobs available during break', 'To explain how to request housing over the break'], 3, 'It explains who “must submit a Break Housing Request by December 5” and what happens to approved students.'),
        mc('Why will approved students stay in Maple Hall?', ['Their own rooms will be cleaned', 'It is closer to campus jobs', 'It will save money on heating', 'Athletes train near Maple Hall'], 2, '“To reduce heating costs, all approved students will be moved temporarily to Maple Hall.”'),
        mc('What can be inferred about a student with a campus job who stays over the break?', ['They may not have to pay for housing', 'They can stay in their usual room', 'They must submit the request by January 12', 'They need to move all of their belongings'], 0, 'Such students “may have the fee waived if their supervisor confirms their work schedule.”'),
      ],
    },
    {
      id: 'daily-x-laundry', format: 'notice', title: 'Laundry rooms — new payment system',
      text: 'Starting March 3, laundry machines in all residence halls will no longer accept coins. You can pay through the WashPoint app or with your student ID card.\n\nPrices: washer $1.75 | dryer $1.25 (45 minutes)\nStudents who download the app before March 3 will receive a $5 credit.\n\nThe coin-to-card machine in each laundry room will be removed on March 10. Any money already loaded on your ID card will remain available.\n\nThe app also sends an alert when your cycle is finished, so please collect your clothes promptly — others are waiting!',
      questions: [
        mc('How much will it cost to wash and dry one load?', ['$1.25', '$1.75', '$2.50', '$3.00'], 3, 'Washer $1.75 + dryer $1.25 = $3.00.'),
        mc('What can be inferred about the coin-to-card machines after March 3?', ['They will stop accepting coins at once', 'They stay for about one more week', 'They will move to the student center', 'They will be updated to work with the app'], 1, 'Coins stop working in the laundry machines on March 3, but the coin-to-card machines “will be removed on March 10”.'),
        mc('Why does the notice mention the app’s alert feature?', ['To explain how students can get the $5 credit', 'To warn that some machines might stop mid-cycle', 'To show students how to report a broken machine', 'To get students to collect laundry quickly'], 3, 'The app “sends an alert when your cycle is finished, so please collect your clothes promptly”.'),
      ],
    },
    {
      id: 'daily-x-late-night', format: 'menu', title: 'North Commons — Late Night (9 p.m.–1 a.m., Sun–Thu)',
      text: 'Meal plan holders: one late-night swipe per evening covers ONE entrée + ONE side + a drink.\n\nEntrées\nGrilled cheese ........ $5.00\nVeggie quesadilla ........ $5.50\nChicken wrap ........ $6.25\n\nSides\nFries ........ $2.25\nSide salad ........ $2.75\n\nDrinks (coffee, tea, juice) ........ $1.75\n\nItems beyond the swipe are charged to Dining Dollars or card.\nHot food stops at 12:30 a.m.; drinks and packaged snacks are sold until closing.',
      questions: [
        mc('What does one late-night swipe include?', ['Two entrées and one drink', 'Any food items up to a value of $8', 'One entrée, one side, and a drink', 'One entrée and two sides only'], 2, 'One swipe “covers ONE entrée + ONE side + a drink.”'),
        mc('A student uses a swipe for a chicken wrap, fries, and coffee and also buys a side salad. How much extra is charged?', ['$2.75', '$4.50', '$5.50', '$13.00'], 0, 'The swipe covers the wrap, fries, and coffee; “Items beyond the swipe are charged”, so only the salad ($2.75) is paid.'),
        mc('What can be inferred about a student who arrives at 12:45 a.m. on a Tuesday?', ['They will find North Commons closed', 'They must pay by card, not by swipe', 'They can still order a hot entrée', 'They can no longer order fries'], 3, '“Hot food stops at 12:30 a.m.” The Commons is open until 1 a.m., but only drinks and packaged snacks are sold then.'),
      ],
    },
    {
      id: 'daily-x-buildathon', format: 'poster', title: 'Campus Build-a-thon — 24 hours to make something useful',
      text: 'Saturday 10 a.m. → Sunday 10 a.m. | Innovation Lab, 3rd floor\n\nTeams of 2–4. No team? Come to the matching session on Friday at 6 p.m.\nAll majors welcome — last year’s winning team included a music student and a nursing student.\n\nThe theme is announced at the opening. All projects must be started at the event: you may bring ideas, but not finished code.\n\nPrizes: $500 (1st), $250 (2nd), and a Community Choice award voted on by visitors.\nMeals and a sleeping area provided.\n\nRegister by Wednesday — one form per team.',
      questions: [
        mc('What should a student who does not have a team do?', ['Register individually by Wednesday', 'Attend the Friday session', 'Ask to be placed on a team at the opening', 'Contact one of last year’s winning teams'], 1, '“No team? Come to the matching session on Friday at 6 p.m.” Registration is “one form per team”.'),
        mc('Why does the poster mention a music student and a nursing student?', ['To introduce this year’s competition judges', 'To explain why the theme is kept secret', 'To show that any major can take part', 'To suggest that teams need four members'], 2, 'The example follows “All majors welcome”.'),
        mc('Which of the following would most likely break the rules?', ['Bringing written notes about an app idea', 'Competing in a team of three students', 'Sleeping in the area provided at the lab', 'Submitting code written the week before'], 3, '“All projects must be started at the event: you may bring ideas, but not finished code.”'),
      ],
    },
    {
      id: 'daily-x-hiking-club', format: 'social media post', title: 'Trailheads Hiking Club',
      text: 'TRIP UPDATE: Saturday’s hike to Eagle Ridge is ON, but we’re switching to the lower trail. The upper trail is still closed after last week’s rockslide, so the walk will be shorter (about 8 km instead of 12) and much less steep.\n\nWe leave from the gym parking lot at 7:30 sharp. We have 3 cars, so 12 seats in total — 9 are already taken. Reply below to claim one.\n\nNo boots? The Outdoor Center rents them for $5 a day, but it closes Friday at 5 p.m.\n\nBeginners: this is a great first trip!',
      questions: [
        mc('Why is the club changing the route?', ['The weather forecast is poor', 'A section of the trail is closed', 'Too few members signed up', 'Beginners asked for an easier trip'], 1, '“The upper trail is still closed after last week’s rockslide.”'),
        mc('What can be inferred about transportation for the trip?', ['Only three more people can get a ride', 'Members must drive their own cars', 'The cars will leave at different times', 'A bus will take members to Eagle Ridge'], 0, '“12 seats in total — 9 are already taken,” so 3 seats are left.'),
        mc('What should a member who needs boots most likely do?', ['Borrow a pair from the club leader', 'Rent them on Saturday morning', 'Rent them before Friday evening', 'Hike without boots on the lower trail'], 2, 'The Outdoor Center “closes Friday at 5 p.m.”, and the group leaves Saturday “at 7:30 sharp”.'),
      ],
    },
    {
      id: 'daily-x-group-chat', format: 'text messages', title: 'Group chat — ECON 210 project',
      text: 'Priya: Prof. Kim just emailed — our presentation is now on Monday, not Thursday.\nMarcus: Seriously? I haven’t finished the data slides.\nPriya: She said groups can swap with Team 4 if both agree. I asked them. They said no.\nLeo: OK, so we need a rehearsal. Sunday at 4 at the library? I can book a study room.\nMarcus: Sunday works, but can we start at 5? I work until 4:30.\nLeo: Sure. Marcus, send me your slides by Saturday night and I’ll combine everything.\nPriya: Great. I’ll write the notes for the introduction and conclusion.',
      questions: [
        mc('Why did Priya send the first message?', ['To ask Marcus to finish his slides', 'To report a change of date', 'To propose a swap with another group', 'To book a room for the rehearsal'], 1, '“Our presentation is now on Monday, not Thursday.”'),
        mc('What can be inferred about the presentation date?', ['It will move back to Thursday', 'Team 4 will present on Monday instead', 'It will remain on Monday', 'Professor Kim may change it again'], 2, 'A swap was possible only “if both agree”, and Team 4 “said no”.'),
        mc('What will Leo do?', ['Write notes for the introduction', 'Combine the group’s slides', 'Ask Team 4 to switch dates', 'Finish the data slides'], 1, '“Send me your slides by Saturday night and I’ll combine everything.”'),
      ],
    },
  ],
};
