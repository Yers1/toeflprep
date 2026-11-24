// Write an Email and Academic Discussion prompts modeled on the 7 free ETS TOEFL iBT 2026
// practice tests: same situation, recipient, three goals and professor question, retold in
// our own words with our own model answers (the ETS wording stays in the ETS PDFs).

const E = (id, title, scenario, to, subject, register, goals, model, notes) =>
  ({ id, title, scenario, to, subject, register, goals: goals.map(([text, keywords]) => ({ text, keywords })), model: { text: model, notes } });

const D = (id, title, course, profName, profText, students, model, notes) =>
  ({ id, title, course, professor: { name: profName, text: profText }, students: students.map(([name, text]) => ({ name, text })), model: { text: model, notes } });

const writing_email = [
  E('em-ets-1-poetry', 'ETS Test 1 style: poetry submission problem',
    'A new poetry magazine invited readers to send in their poems, and you sent two of yours. While you were using the magazine’s online submission form, something went wrong, and now you do not know whether your poems arrived.',
    'the editor of the magazine', 'Problem with the submission form', 'formal',
    [['Say which things you enjoy about the magazine', ['enjoy', 'enjoyed', 'favorite', 'impressed', 'admire', 'appreciate', 'love', 'design', 'variety']],
     ['Describe the problem you had', ['form', 'error', 'upload', 'button', 'froze', 'freeze', 'crash', 'attach', 'loading', 'not working', 'technical', 'trouble', 'glitch']],
     ['Ask whether your poems were received', ['status', 'received', 'receive', 'confirm', 'confirmation', 'arrived', 'arrive', 'whether', 'let me know', 'successfully', 'resend', 'went through', 'submitted']]],
    `Dear Editor,

I am writing to express my appreciation for your new magazine and to ask about a problem with my submissions. I have read the first two issues, and I especially enjoy the way you mix established poets with completely new voices. The short notes in which poets explain how a poem began are my favorite part.

Unfortunately, I had trouble with the online submission form. After I attached my two poems and clicked “Submit,” the page froze for several minutes and then showed an error message. I did not receive a confirmation email, so I am not sure whether the files were uploaded.

Would it be possible to check whether my submissions, “Winter Bus” and “My Grandmother’s Kitchen,” were received? If they did not arrive, I would be happy to send them again by email.

I look forward to hearing from you.
Sincerely,
Jordan Lee`,
    'Each goal gets its own paragraph. The praise is specific (the poets’ notes), the problem has exact details (froze, error message, no confirmation), and the request names the poems.'),

  E('em-ets-2-lunch', 'ETS Test 2 style: disappointing team lunch',
    'Your coworker Kevin suggested a new restaurant for your team, so you took everyone there for lunch. The visit went badly: the food was worse than expected and the service was very slow. You need to tell Kevin what happened and talk about where the team should eat in the future.',
    'Kevin', 'Our team lunch', 'informal',
    [['Explain the problems with the restaurant', ['slow', 'cold', 'lukewarm', 'wait', 'waited', 'tasted', 'quality', 'fresh', 'rude', 'overpriced', 'expensive', 'portion', 'late']],
     ['Describe how the team reacted', ['disappointed', 'disappointing', 'upset', 'unhappy', 'frustrated', 'annoyed', 'complained', 'not impressed', 'colleagues', 'coworkers', 'everyone']],
     ['Suggest other lunch options', ['suggest', 'instead', 'next time', 'how about', 'what about', "why don't we", 'alternative', 'another', 'delivered', 'delivery', 'cafeteria', 'different']]],
    `Hi Kevin,

Thanks again for recommending the new restaurant on Park Street. I wanted to tell you how our team lunch went on Friday, because it didn’t go as well as we’d hoped.

Unfortunately, the food wasn’t very good. My pasta was lukewarm, and two people said their salads weren’t fresh. The service was also really slow: we waited almost forty minutes for our main dishes, so several of us were late for the afternoon meeting.

To be honest, the team was quite disappointed. Nobody was angry with you, of course, but a few people said they wouldn’t go back.

For our next lunch, how about trying the Korean place near the office? It’s quick, and most of us already like it. Another option is to have food delivered to the office so we don’t lose time. Let me know what you think!

Best,
Sam`,
    'Informal but polite: the writer thanks Kevin first and makes it clear nobody blames him. Contractions (didn’t, we’d, it’s) suit a coworker. Specific details (lukewarm pasta, forty minutes) and two concrete alternatives.'),

  E('em-ets-t1-trip', 'ETS Teacher Test 1 style: business trip advice',
    'You have a business trip coming up to a city that your colleague Maria visited for work not long ago. You would like her advice on where to eat and what to do in your free time there.',
    'Maria', 'Tips for my business trip', 'informal',
    [['Explain why you are going to the city', ['conference', 'meeting', 'meet', 'client', 'supplier', 'company', 'training', 'attend', 'project', 'business', 'work']],
     ['Ask for her recommendations on restaurants and activities', ['recommend', 'recommendation', 'recommendations', 'restaurant', 'restaurants', 'eat', 'activity', 'activities', 'place', 'places', 'advice', 'tips', 'things to do', 'sightseeing']],
     ['Say what you would most like to do and what you want to avoid', ['would like', "i'd like", 'prefer', 'avoid', 'interested', "don't want", 'rather not', 'would rather', 'skip', 'stay away', 'touristy', 'crowded', 'hope to', 'really want']]],
    `Hi Maria,

I hope you’re doing well. Next month I’m going to Istanbul for three days to meet our new suppliers and visit their factory. Since you were there for work in the spring, I thought you’d be the perfect person to ask for advice.

Could you recommend a few restaurants near the city center? I’ll have two free evenings, and I’d love to try real local food rather than international chains. I’d also be grateful for any ideas for things to do in my free time.

Personally, I’d most like to see the old part of the city and maybe take a boat trip on the Bosphorus. On the other hand, I’d prefer to avoid big shopping malls and very crowded tourist spots, because after long meetings I usually want something quiet.

Thanks so much in advance!
Best,
Sam`,
    'Gives a real reason for the trip, asks clearly for both restaurants and activities, and covers both parts of goal 3 (would like / avoid) with reasons.'),

  E('em-ets-t2-groupwork', 'ETS Teacher Test 2 style: classmate not participating',
    'You are doing a group project for a course with several classmates. One member, Alex, has not been taking an active part and has missed several assignments. You want to deal with the problem and find a solution together.',
    'Alex', 'Our group project', 'informal',
    [['Describe how far the project has progressed', ['progress', 'finished', 'done', 'completed', 'complete', 'draft', 'so far', 'research', 'started', 'currently', 'working on', 'almost', 'halfway', 'report', 'slides', 'presentation']],
     ['Explain how his lack of participation affects the group', ['affect', 'extra', 'behind', 'deadline', 'pressure', 'workload', 'had to', 'your part', 'missed', 'unfair', 'stress', 'harder', 'others']],
     ['Suggest how he can contribute from now on', ['suggest', 'responsible', 'responsibility', 'from now on', 'could you', 'would you', 'responsible for', 'handle', 'work on', 'join', 'help with', 'maybe you']]],
    `Hi Alex,

I hope everything’s okay. I wanted to update you on our marketing project and talk about how we can finish it together.

So far, we’ve finished the market research and the first draft of the report. Dana is designing the slides, and I’m editing the introduction. The final presentation is on December 10, so we still have about two weeks.

However, since you’ve missed the last three tasks, the rest of us have had to do your parts as well. This has put a lot of pressure on the group, and we’re now a little behind schedule.

I think the best way for you to contribute from now on would be to take responsibility for the budget section, since you’re good with numbers. It would also help a lot if you could join our Thursday meeting at 5 p.m. If something is going on that makes it hard to participate, just let me know, and we can find a solution.

Thanks,
Sam`,
    'Firm but friendly: facts about progress, a clear effect on the group (no insults), and a specific task, time and offer of help.'),

  E('em-ets-t3-park', 'ETS Teacher Test 3 style: park maintenance',
    'You belong to your neighborhood association and have seen that the park in your area needs repairs. You decide to write to the president of the association, Mr. Williams, to describe the problem and offer an idea.',
    'Mr. Williams', 'The condition of the park', 'formal',
    [['Describe the maintenance problem you noticed', ['broken', 'bench', 'light', 'lights', 'path', 'playground', 'swing', 'trash', 'damaged', 'damage', 'grass', 'repair', 'maintenance', 'litter', 'overgrown', 'graffiti', 'cracked', 'not working', 'dirty', 'fence']],
     ['Explain why it is important to fix it', ['dangerous', 'safety', 'safe', 'unsafe', 'children', 'injure', 'injured', 'important', 'residents', 'risk', 'accident', 'hurt', 'elderly', 'families']],
     ['Suggest a way to deal with it', ['suggest', 'propose', 'recommend', 'volunteer', 'clean', 'city', 'fund', 'organize', 'fix', 'hire', 'budget', 'donation', 'we should']]],
    `Dear Mr. Williams,

I am writing to express my concern regarding the condition of Riverside Park. Over the past month, I have noticed that two of the swings on the playground are broken, and several lights along the main path no longer work.

This is significant because the park is used every day by families with young children. A broken swing could easily injure a child, and the dark path makes many residents, especially older people, feel unsafe when they walk home in the evening.

I would like to suggest that the association organize a volunteer repair day on a Saturday morning. Several neighbors have told me that they would be happy to help, and we could ask the city to replace the lights at the same time. I would be glad to help plan the event.

Thank you for your time. I look forward to hearing from you.
Sincerely,
Jordan Lee`,
    'Concrete problems (two swings, path lights), a clear reason (child safety, residents walking at night) and a realistic suggestion with an offer to help. Note “suggest that the association organize”: after suggest that, the base verb.'),

  E('em-ets-t4-studygroup', 'ETS Teacher Test 4 style: inviting classmates to a study group',
    'You are setting up a study group before an important exam. You want to invite your classmates and explain how you think the group should work.',
    'your classmates', 'Join our study group', 'informal',
    [['Say why you are starting the group', ['exam', 'final', 'midterm', 'test', 'prepare', 'review', 'purpose', 'help each other', 'study', 'together', 'pass', 'goal', 'understand']],
     ['Describe the topics and other ideas for the sessions', ['topic', 'topics', 'chapter', 'practice', 'questions', 'quiz', 'session', 'cover', 'plan', 'discuss', 'flashcards', 'notes', 'go over', 'focus on']],
     ['Suggest a time and place for the first meeting', ['meet', 'meeting', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'tomorrow', 'next week', 'library', 'room', 'cafe', 'classroom', 'campus', 'online']]],
    `Hi everyone,

I’m organizing a study group for our biology final on December 15, and I’d love for you to join. The idea is simple: we can review the material together, explain difficult topics to each other, and avoid last-minute stress.

I suggest that we cover one big topic per session, starting with cell structure, then genetics, and finally ecology. Before each meeting, everyone could prepare three practice questions, and at the end we could do a short quiz to see what we still need to review. If someone has good notes on a chapter, it would be great if they could share them.

How about meeting for the first time on Wednesday at 4 p.m. in Room 210 of the library? The room has a whiteboard and is usually quiet. If that time doesn’t work for you, just reply and we can find another one.

Looking forward to studying with you!
Best,
Sam`,
    'Purpose, plan and logistics are each in their own paragraph. The plan has concrete topics and an activity (three questions, quiz), and the meeting has an exact day, time and room.'),

  E('em-ets-t5-workshop', 'ETS Teacher Test 5 style: thanking a workshop presenter',
    'You would like to send a thank-you note to Ms. Clark, who ran a digital marketing workshop you recently attended and found very useful, and request further materials so you can keep learning about the topic.',
    'Ms. Clark', 'Thank you for the workshop', 'formal',
    [['Thank her for the workshop', ['thank', 'grateful', 'gratitude', 'appreciate', 'enjoyed']],
     ['Explain in detail why you found it informative', ['learned', 'learnt', 'example', 'examples', 'especially', 'useful', 'informative', 'helpful', 'interesting', 'practical', 'clear', 'realized', 'insight', 'never']],
     ['Ask for more resources or recommendations', ['resource', 'resources', 'recommend', 'books', 'course', 'courses', 'materials', 'slides', 'additional', 'further', 'articles', 'reading', 'websites', 'share', 'send', 'where can i']]],
    `Dear Ms. Clark,

I am writing to express my gratitude for the digital marketing workshop you led last Saturday. It was one of the most useful events I have attended this year.

I found the workshop especially informative because you explained every idea with real examples. For instance, your comparison of two small cafés, one that posted every day and one that answered every customer comment, completely changed how I think about social media. I had always believed that posting more was the key, but your data showed that engagement matters much more. The part on measuring results with free tools was also very practical.

Since I would like to apply these ideas to my own small project, I would be grateful if you could recommend some books or online courses for further study. If possible, I would also appreciate a copy of your slides.

Thank you again for your time and expertise.
Sincerely,
Jordan Lee`,
    'Goal 2 asks for a detailed explanation, so the middle paragraph is the longest: a specific example from the workshop and what the writer learned from it.'),
];

const writing_discussion = [
  D('ad-ets-1-volunteer', 'ETS Test 1 style: required volunteering', 'social studies', 'Dr. Reyes',
    'Volunteering means giving your time and effort to help a community or organization without being paid. Most people volunteer by choice, but some institutions make it a requirement. For example, some high schools only let students graduate after they complete a set number of volunteer hours. What is your view? Should high schools require students to volunteer? Why or why not?',
    [['Sofia', 'Yes, it should be required. A lot of teenagers never think about helping others, and a requirement shows them that their time can really change someone’s life. It builds a sense of responsibility.'],
     ['Andrew', 'I don’t think it should be required. Many students already have very little free time because they work part-time or look after younger brothers and sisters. A volunteering requirement would just add stress.']],
    `While I understand Andrew’s point regarding limited free time, I believe high schools should require volunteering, as long as the program is flexible. Sofia is right that many teenagers would never try it on their own, but I would add another benefit: volunteering helps students discover what they want to do in the future. A clear example of this is my cousin, who had to complete forty hours in high school and chose to volunteer at a children’s hospital. He enjoyed it so much that he is now studying to become a nurse. To answer Andrew’s concern, schools could let students spread the hours over three years or count work they already do in their own neighborhood, such as a local clean-up. For these reasons, a flexible requirement gives students experience they might never get otherwise.`,
    'Responds to both classmates by name, adds a new idea (career discovery), supports it with a specific example, and solves the opposing concern instead of ignoring it.'),

  D('ad-ets-2-exercise', 'ETS Test 2 style: exercise and mental health', 'psychology', 'Dr. Patel',
    'Today’s topic is how physical exercise affects mental health. Regular activity clearly improves mood and lowers stress. However, some people argue that mental health depends mainly on other things, such as genetics and a person’s environment. In your opinion, which has the bigger influence on mental health? Why?',
    [['Liam', 'Exercise has a huge effect. It reduces stress, improves your mood and makes you healthier overall because your body releases endorphins.'],
     ['Grace', 'Exercise matters, but genetics and environment matter more. A supportive environment and good daily routines for the mind, like rest and talking about problems, are what really protect mental health.']],
    `From my perspective, a person’s environment plays a larger role than exercise, although the two are closely connected. Liam is right that exercise releases endorphins, but the mood boost from a single workout usually lasts only a few hours, and it cannot fix a stressful home or a toxic workplace. One point worth considering is that the environment often decides whether people exercise at all. A student who lives in a safe neighborhood with a free sports center will find it much easier to stay active than a student who works two jobs and lives in an unsafe area. When I prepared for my exams last year, I stopped going to the gym because I was overwhelmed, not because I was lazy. Overall, I agree with Grace that improving people’s environment is the most powerful way to support mental health.`,
    'Takes a clear side, limits the classmate’s point instead of just disagreeing (a single workout’s effect is short), adds a new angle (environment controls exercise) and uses a personal example.'),

  D('ad-ets-t1-nomads', 'ETS Teacher Test 1 style: digital nomads', 'labor studies', 'Dr. Larsen',
    'More and more people can do their jobs on laptops and phones instead of in an office. Because they can choose when and where to work, some of them travel constantly and work from different places, at home and abroad. They are often called “digital nomads.” Do you think the number of digital nomads will keep growing? Why or why not?',
    [['Claire', 'Being a digital nomad gives amazing freedom, but it depends completely on a fast internet connection. This limits where people can go, so I don’t think it will grow as much as people expect.'],
     ['Marcus', 'Claire has a point, but internet technology keeps getting faster and cheaper. Why stay in a boring office all year just to afford one short holiday, when you could work from a beautiful place all the time? I think the trend will continue.']],
    `I think digital nomadism will keep growing, but more slowly than Marcus expects. He is right that internet access is improving quickly; satellite internet already works in many remote areas, so Claire’s concern will matter less every year. However, the bigger limit is not technology but the type of job. Mostly people in fields like programming, design or translation can work completely online, while surgeons, builders and factory workers have to be on site. Beyond that, it is worth noting that many companies now prefer hybrid work, because managers want teams to meet regularly. For example, my uncle’s software company allowed full remote work in 2021, but this year it asked everyone to come to the office twice a week. In short, I expect the number of digital nomads to rise, but they will remain a small group of workers.`,
    'A “yes, but” position. It answers Claire with a fact (satellite internet), adds a new angle (type of job, hybrid work) and supports it with a specific example.'),

  D('ad-ets-t2-artmedia', 'ETS Teacher Test 2 style: art, media and the environment', 'environmental science', 'Dr. Moreno',
    'Art and media can shape how people think and act about the environment. Films and social media, for example, can draw attention to climate change and motivate people through strong words, images and stories. On the other hand, some people worry that art and media make complicated environmental problems seem too simple, or focus on the negative side to create drama. In your view, can art and media help the public understand complicated environmental problems? Explain why or why not.',
    [['Nadia', 'Media companies have commercial interests, so they often present climate change in a way that fits their own agenda. This bias can mislead people and hide what scientists actually say.'],
     ['Tomas', 'Creative campaigns and interactive art connect with people personally. They make the problem feel urgent in a way that dry facts never can, and they show people practical ways to help.']],
    `I believe art and media can help, but only as a starting point, not as the main source of information. Tomas makes a strong point that emotions move people more than statistics. A clear example of this is a documentary about plastic in the ocean that our whole class watched in ninth grade; afterwards, many of my classmates stopped buying bottled water. That said, Nadia’s concern about bias is also valid, because the companies that pay for films and campaigns may want viewers to see the issue in a certain way. In my view, the solution is to connect creative work with reliable data. For instance, a film or a social media campaign could end with links to scientific reports or local projects where people can actually volunteer. Ultimately, art should open the door to environmental issues, and science should explain what is behind them.`,
    'A balanced position that still has a clear opinion. It agrees with Tomas using a real example, accepts Nadia’s concern with “That said,” and offers a concrete solution as its own contribution.'),

  D('ad-ets-t3-cities', 'ETS Teacher Test 3 style: cities and community', 'sociology', 'Dr. Diaz',
    'Next week we will look at how urbanization affects community life. As cities grow, they bring together large and very diverse populations. Some people believe that big cities create a strong sense of community and cultural exchange. Others think city life isolates people and destroys the close relationships that are common in small towns and villages. What do you think, and why?',
    [['Emma', 'Cities bring people from different backgrounds together, which creates chances for cultural exchange and understanding. There are always events and places where people can meet and build communities.'],
     ['Daniel', 'City life is fast, and people don’t have time to build real relationships. The close connections you find in small towns become weaker when people move to cities.']],
    `In my opinion, big cities do not destroy community, but they change how it works. Daniel is right that people in cities rarely know their neighbors the way people in small villages do. However, city residents build communities around shared interests instead of shared streets. When my family moved from a small town to Astana, we did not know anyone in our building, but within a year my parents had close friends from a hiking club and my sister had joined a volunteer group. One point worth considering is that these communities can be even stronger, because people choose them. This supports Emma’s idea about cultural exchange, since such groups often include people from very different backgrounds. All things considered, urbanization replaces traditional neighborhood ties with new kinds of connection rather than simply causing isolation.`,
    'Moves beyond “good or bad” to a more precise position (community changes form). Uses a personal example from moving to Astana and links it back to both classmates.'),

  D('ad-ets-t4-digital', 'ETS Teacher Test 4 style: digital media and relationships', 'digital media', 'Dr. Achebe',
    'Next week’s topic is how digital media has affected traditional communication. Some people say its overall effect has been positive, since it has made global communication and connection much easier. Others argue that it has mostly been harmful, reducing face-to-face contact and lowering the quality of relationships. What is your opinion?',
    [['Olivia', 'Digital media has mainly been positive. It lets people keep in touch with friends and family who live far away, people they might otherwise lose contact with. It is fast and convenient.'],
     ['Kenji', 'It looks good on the surface, but people now spend more time online than talking in real life, and this weakens relationships. We should mix online contact with real, face-to-face conversations.']],
    `From my perspective, digital media has had a mostly positive effect, but how people use it makes all the difference. I agree with Olivia that it keeps long-distance relationships alive; my brother studies in Korea, and our weekly video calls are the only reason we still feel close. However, Kenji is right that the same tools can damage relationships with people who are physically close to us. Beyond that, it is worth noting that the problem is usually passive use, such as scrolling through social media during dinner, rather than active communication like messaging or calling a friend. Therefore, digital media is a benefit when it adds to real conversations, and a problem only when it replaces them.`,
    'States a position, then sharpens it with a useful distinction (active vs passive use) that neither classmate made. The personal example (brother in Korea) supports the main claim.'),

  D('ad-ets-t5-environment', 'ETS Teacher Test 5 style: stop or reduce environmental harm', 'environmental science', 'Dr. Gupta',
    'Activities such as pollution and cutting down forests damage the environment. Some people say we need to reduce these activities or stop them completely. Others prefer technologies and projects that reduce the damage while the activities continue, for example cleaning up pollution or replanting forests. This second approach deals with the results instead of preventing the cause. Which approach do you think is more effective for solving environmental problems: stopping harmful activities or reducing their impact? Why?',
    [['Priya', 'We have to end damaging practices such as polluting rivers and clearing forests; otherwise the harm only grows. It is wiser to prevent damage than to repair it afterwards.'],
     ['Jacob', 'Human development has gone so far that stopping everything in time is almost impossible. Smarter technology, like carbon capture, can limit the damage and still allow progress.']],
    `Although Jacob makes a fair point about the difficulty of stopping everything at once, I believe that eliminating the most harmful activities is more effective in the long run. Cleanup technologies are useful, but they are usually expensive and only treat the result. For example, replanting a forest takes decades, and a young forest cannot support the same animals as the old one that was cut down. One point worth considering is that prevention does not have to mean stopping all development. Governments can ban the most damaging practices, such as burning coal near cities, and support cleaner alternatives at the same time. Some cities, for instance, have switched power plants from coal to gas to reduce winter smog. For this reason, Priya’s approach should come first, while the technologies Jacob mentions can deal with the damage that has already been done.`,
    'Answers the stronger opposing argument first, explains why cleanup is limited with a concrete example, and offers a middle path that still supports a clear opinion.'),
];

export default { writing_email, writing_discussion };
