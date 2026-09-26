// Write an Email — original prompts. Each goal lists keywords used by the
// offline checker to see whether the point was addressed.

export default [
  {
    id: 'em-missed-lab',
    title: 'Missed lab session',
    scenario: 'You missed yesterday’s required chemistry lab because your bus broke down on the highway. The lab counts toward your final grade, and the syllabus says make-up sessions are possible only with the instructor’s approval.',
    to: 'Dr. Alvarez',
    subject: 'Missed lab on Tuesday',
    register: 'formal',
    goals: [
      { text: 'Explain why you missed the lab', keywords: ['bus', 'broke', 'highway', 'transport', 'delay'] },
      { text: 'Ask whether you can make it up', keywords: ['make up', 'make-up', 'makeup', 'another session', 'retake', 'complete'] },
      { text: 'Offer times when you are available', keywords: ['available', 'free', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'morning', 'afternoon', 'pm', 'am'] },
    ],
    model: {
      text: `Dear Dr. Alvarez,

I am writing to explain my absence from Tuesday’s chemistry lab. On my way to campus, the bus I was on broke down on the highway, and we waited more than an hour for a replacement. By the time I arrived, the session had already finished. I have kept the transit company’s delay notice in case you need it.

Since the lab counts toward the final grade, I would be very grateful for the chance to make it up. I have already reviewed the procedure in the lab manual so that I could complete it efficiently.

I am free on Wednesday and Friday afternoons after 2 p.m., and on Thursday morning before 11. If none of these times work, I am happy to adjust my schedule.

Thank you for considering my request.
Best regards,
Mina Park`,
      notes: 'Each point has its own paragraph with a concrete detail (the delay notice, having read the manual, exact times). The request is polite and indirect.',
    },
  },
  {
    id: 'em-roommate-noise',
    title: 'Noise from a neighbor',
    scenario: 'For the past two weeks, the student in the room next to yours has played loud music late at night. You have exams next week and have trouble sleeping. You have never spoken to this person before.',
    to: 'Your neighbor, Jordan',
    subject: 'Quick request about evening noise',
    register: 'informal',
    goals: [
      { text: 'Introduce yourself and describe the problem', keywords: ['music', 'loud', 'noise', 'night', 'late'] },
      { text: 'Explain how it affects you', keywords: ['sleep', 'exam', 'study', 'tired', 'focus', 'concentrate'] },
      { text: 'Suggest a solution that works for both of you', keywords: ['headphones', 'after', 'before', 'quiet', 'suggest', 'maybe', 'could', 'volume', 'lower'] },
    ],
    model: {
      text: `Hi Jordan,

I’m Sam, your neighbor in room 214 — sorry we haven’t properly met yet! I wanted to mention something before it turns into a bigger issue. For the last couple of weeks, I’ve been able to hear music from your room quite clearly after midnight, sometimes until two or three.

Normally I wouldn’t mind, but I have four exams next week, and I’ve been waking up exhausted and struggling to focus in the morning.

Would it be possible to use headphones or turn the volume down after 11 on weeknights? On weekends I honestly don’t mind at all. And if my alarm or anything else from my side ever bothers you, just knock and tell me.

Thanks so much, and good luck with your own exams!
Sam`,
      notes: 'Friendly register suited to a peer, a specific description of the problem, a reasonable compromise and an offer in return.',
    },
  },
  {
    id: 'em-reference-letter',
    title: 'Asking for a reference letter',
    scenario: 'You are applying for a summer research internship at a marine biology institute. You need a reference letter from a professor. Professor Grant taught your ecology course last year, and you received one of the highest marks in the class.',
    to: 'Professor Grant',
    subject: 'Reference letter request — marine biology internship',
    register: 'formal',
    goals: [
      { text: 'Remind the professor who you are', keywords: ['ecology', 'course', 'class', 'last year', 'semester', 'student'] },
      { text: 'Describe the internship', keywords: ['internship', 'marine', 'research', 'institute', 'summer'] },
      { text: 'Ask for the letter and give the deadline', keywords: ['letter', 'reference', 'recommendation', 'deadline', 'by'] },
    ],
    model: {
      text: `Dear Professor Grant,

I hope your semester is going well. My name is Leila Haddad, and I was a student in your Introduction to Ecology course last spring. I especially enjoyed the field project on tidal pools, for which our group analyzed changes in invertebrate populations.

I am now applying for a ten-week summer research internship at the Coastal Marine Institute, where interns assist with monitoring coral health. Your course is the main reason I became interested in this area.

Would you be willing to write a reference letter for my application? The deadline is March 15, and the letter can be uploaded directly through the institute’s portal. I would be happy to send you my CV, the program description and my project report to make the process easier.

Thank you very much for considering this.
Sincerely,
Leila Haddad`,
      notes: 'The reminder is specific (course, semester, a project), the internship is described in one clear sentence, and the request includes a deadline and an offer to help.',
    },
  },
  {
    id: 'em-wrong-textbook',
    title: 'Wrong textbook delivered',
    scenario: 'You ordered a used textbook for your economics class from the campus bookstore’s website. The package arrived today, but it contains an older edition with different page numbers. Your first reading assignment is due on Monday.',
    to: 'Campus Bookstore customer service',
    subject: 'Incorrect edition received — order #48213',
    register: 'formal',
    goals: [
      { text: 'Explain what you ordered and what you received', keywords: ['edition', 'ordered', 'received', 'older', 'wrong', 'different'] },
      { text: 'Explain why this is urgent', keywords: ['monday', 'assignment', 'reading', 'due', 'class', 'urgent'] },
      { text: 'Ask how the problem will be solved', keywords: ['exchange', 'replace', 'refund', 'return', 'solve', 'what should'] },
    ],
    model: {
      text: `Dear Customer Service Team,

I am writing about order #48213, which I placed on your website last week. I ordered a used copy of Principles of Economics, 9th edition, but the book I received today is the 7th edition. The chapters and page numbers are quite different from those on my syllabus.

This is somewhat urgent because my first reading assignment is due on Monday, and my professor has told us that we will be quizzed on specific sections.

Could you let me know whether I can exchange the book in person at the store this week? If the correct edition is not in stock, I would prefer a refund so that I can buy it elsewhere before the weekend.

Thank you for your help.
Kind regards,
Omar Siddiqui`,
      notes: 'Precise facts (order number, both editions), a clear reason for urgency, and a request with a backup option.',
    },
  },
  {
    id: 'em-club-event',
    title: 'Planning a club event',
    scenario: 'You are the treasurer of the university photography club. The club president, Aisha, wants to rent a professional studio for the next workshop, but you know the club has only a small budget left for the semester.',
    to: 'Aisha, club president',
    subject: 'Studio idea for the next workshop',
    register: 'informal',
    goals: [
      { text: 'Respond to Aisha’s idea', keywords: ['studio', 'idea', 'great', 'like', 'workshop'] },
      { text: 'Explain the budget situation', keywords: ['budget', 'money', 'dollars', 'left', 'afford', 'cost', 'funds'] },
      { text: 'Propose an alternative', keywords: ['instead', 'alternative', 'could', 'borrow', 'free', 'room', 'suggest', 'sponsor'] },
    ],
    model: {
      text: `Hi Aisha,

Thanks for sharing the studio idea — I agree that proper lighting would make the portrait workshop much more useful, and members would love it.

The problem is the budget. After the exhibition printing costs, we have about $180 left for the rest of the semester, and the studio you mentioned charges $150 for three hours. That would leave almost nothing for the end-of-term trip.

What if we booked one of the media rooms in the library instead? They are free for student groups, and the art department lends out two lighting kits if we reserve them a week ahead. Alternatively, we could ask the camera shop downtown to sponsor a studio session in exchange for promoting them on our page.

Let me know what you think, and I can make the reservation tomorrow.
Talia`,
      notes: 'Acknowledges the idea before disagreeing, supports the concern with numbers and offers two practical alternatives.',
    },
  },
  {
    id: 'em-group-member',
    title: 'Group member not contributing',
    scenario: 'You are working on a group presentation for your business class. One member, Chris, has not replied to messages or completed his section, and the presentation is in five days. You decide to email your instructor.',
    to: 'Ms. Okafor',
    subject: 'Question about our group presentation',
    register: 'formal',
    goals: [
      { text: 'Describe the situation in the group', keywords: ['chris', 'member', 'group', 'replied', 'section', 'contribute', 'respond'] },
      { text: 'Explain what the group has already done', keywords: ['already', 'tried', 'messages', 'contacted', 'meeting', 'reminded', 'finished'] },
      { text: 'Ask for advice', keywords: ['advice', 'should', 'recommend', 'suggest', 'what would', 'guidance'] },
    ],
    model: {
      text: `Dear Ms. Okafor,

I am writing on behalf of my group for the market-analysis presentation due next Monday. One of our members, Chris, has not responded to our messages for about ten days, and his section on competitor pricing has not been started.

Before contacting you, we tried several things. We sent reminders in our group chat and by email, invited him to two meetings, and offered to help divide his section into smaller parts. The other three of us have finished our sections and a first draft of the slides.

Would you advise us to redistribute his part among ourselves, or should we wait until you have had a chance to contact him? We want to be fair to Chris while also making sure the presentation is complete.

Thank you for your guidance.
Best regards,
Elena Rossi`,
      notes: 'Factual and fair in tone, shows the group acted responsibly first, and asks a clear either-or question.',
    },
  },
  {
    id: 'em-library-fine',
    title: 'Library fine dispute',
    scenario: 'You received a notice that you owe a $25 fine for a library book returned late. However, you returned it on time using the after-hours drop box, and you have a photo of the book in the box with the date visible on your phone.',
    to: 'Library circulation desk',
    subject: 'Late fine for “Urban Sociology” — returned on time',
    register: 'formal',
    goals: [
      { text: 'Explain the notice you received', keywords: ['fine', 'notice', '25', 'late', 'charge'] },
      { text: 'Explain why you think it is a mistake', keywords: ['drop box', 'returned', 'on time', 'photo', 'date', 'mistake', 'error'] },
      { text: 'Ask what you should do', keywords: ['remove', 'cancel', 'waive', 'should i', 'what should', 'please', 'could you'] },
    ],
    model: {
      text: `Dear Circulation Staff,

This morning I received a notice saying that I owe a $25 fine because “Urban Sociology” by M. Chen was returned four days late.

I believe this is an error. I returned the book on the evening of its due date, October 3, using the after-hours drop box by the main entrance. Because the library was closed, I took a photo of the book inside the box, and the time stamp on my phone shows 8:47 p.m. that day. It is possible the book was checked in only when the box was emptied a few days later.

Could you please review the record and remove the fine? I am happy to forward the photo or bring my phone to the desk if that would help.

Thank you for your time.
Sincerely,
Jonas Weber`,
      notes: 'Calm, evidence-based complaint with a plausible explanation and a specific request.',
    },
  },
  {
    id: 'em-job-shift',
    title: 'Changing a work shift',
    scenario: 'You work part-time at the campus café. Your manager scheduled you for Saturday morning, but you have just learned that your university is holding a required orientation for your new study-abroad program at the same time.',
    to: 'Your manager, Mr. Doyle',
    subject: 'Saturday shift',
    register: 'formal',
    goals: [
      { text: 'Explain the conflict', keywords: ['orientation', 'saturday', 'study abroad', 'required', 'conflict', 'same time'] },
      { text: 'Apologize for the short notice', keywords: ['sorry', 'apologize', 'apologies', 'short notice', 'late notice'] },
      { text: 'Suggest how the shift could be covered', keywords: ['cover', 'swap', 'switch', 'another shift', 'colleague', 'instead', 'extra'] },
    ],
    model: {
      text: `Dear Mr. Doyle,

I just found out that my university is holding a required orientation for my study-abroad program this Saturday from 9 a.m. to 1 p.m., which is exactly when I am scheduled to work at the café. Students who miss it cannot take part in the program.

I am sorry for the short notice; the date was announced only yesterday, and I wanted to let you know as soon as possible.

I have already asked Priya whether she could take my Saturday shift, and she said she can if I cover her Tuesday evening shift in return. If that arrangement is acceptable to you, we will switch. Otherwise, I would be glad to work an extra shift at any other time this week.

Thank you for understanding.
Kind regards,
Ben Carter`,
      notes: 'Explains why the conflict cannot be avoided, apologizes once, and arrives with a solution already arranged.',
    },
  },
  {
    id: 'em-friend-visit',
    title: 'A friend’s visit',
    scenario: 'An old friend, Nadia, is visiting your city for three days next month and has asked for your advice. You will be busy with classes during the day but free in the evenings.',
    to: 'Nadia',
    subject: 'Your visit!',
    register: 'informal',
    goals: [
      { text: 'Say how you feel about the visit', keywords: ['excited', 'happy', 'glad', 'can’t wait', "can't wait", 'great', 'looking forward'] },
      { text: 'Recommend things to do during the day', keywords: ['museum', 'park', 'market', 'visit', 'recommend', 'should', 'tour', 'walk'] },
      { text: 'Suggest plans for the evenings', keywords: ['evening', 'dinner', 'night', 'after class', 'together', 'restaurant', 'concert'] },
    ],
    model: {
      text: `Hi Nadia,

I’m so excited you’re coming — it’s been almost two years! Of course you can stay with me; my roommate is away that week, so you’ll even have a real bed.

Unfortunately I have classes until four every day, so you’ll need to explore on your own during the day. I’d definitely start with the old harbor: the fish market is lively in the morning, and you can take a cheap ferry to the island for a great view of the city. If it rains, the science museum is fantastic and not too crowded on weekdays.

In the evenings, I’ll be all yours. On the first night, let’s have dinner at the little Lebanese place near my apartment, and on Friday there’s a free jazz concert in the park that I think you’d love.

Send me your flight details when you have them!
Hugs,
Lina`,
      notes: 'Warm, natural register with idiomatic phrases, specific recommendations and reasons.',
    },
  },
  {
    id: 'em-course-feedback',
    title: 'Feedback on an online course',
    scenario: 'Your university’s teaching center has asked students to give feedback on the new online platform used for your statistics course. You found the video lectures helpful, but the quizzes often failed to load on your phone.',
    to: 'Teaching Center',
    subject: 'Feedback on the statistics course platform',
    register: 'formal',
    goals: [
      { text: 'Describe what worked well', keywords: ['video', 'lecture', 'helpful', 'useful', 'clear', 'liked', 'worked well'] },
      { text: 'Describe the problem you had', keywords: ['quiz', 'load', 'phone', 'mobile', 'problem', 'error', 'failed'] },
      { text: 'Suggest an improvement', keywords: ['suggest', 'improve', 'could', 'would be', 'recommend', 'option', 'should'] },
    ],
    model: {
      text: `Dear Teaching Center team,

Thank you for asking for our opinions on the new platform used in Statistics 101.

Overall, the video lectures were the most valuable part of the course for me. Each video focused on a single concept and was short enough to rewatch before assignments, and the option to speed up playback was very convenient.

However, I had repeated problems with the weekly quizzes on my phone. About half the time, the page froze after the second question, and on two occasions my answers were lost when I tried to reload it. Since I often study on the bus, this was quite frustrating.

It would help a lot if the quizzes saved answers automatically after each question, or if there were a simpler mobile version. A short notice explaining which browsers are supported would also be useful.

Best regards,
Aiko Tanaka`,
      notes: 'Balanced feedback with concrete detail on both sides and specific, actionable suggestions.',
    },
  },
  {
    id: 'em-scholarship-thanks',
    title: 'Thanking a scholarship donor',
    scenario: 'You have received a scholarship funded by a former student of your university, Mrs. Linden. The scholarship office has asked recipients to write a short email to the donor.',
    to: 'Mrs. Linden',
    subject: 'Thank you for the Linden Scholarship',
    register: 'formal',
    goals: [
      { text: 'Thank the donor', keywords: ['thank', 'grateful', 'appreciate', 'gratitude'] },
      { text: 'Explain what the scholarship will allow you to do', keywords: ['allow', 'able', 'tuition', 'job', 'focus', 'afford', 'study', 'lab'] },
      { text: 'Share your plans for the future', keywords: ['plan', 'future', 'hope', 'career', 'after graduation', 'goal', 'want to'] },
    ],
    model: {
      text: `Dear Mrs. Linden,

I am writing to thank you sincerely for the Linden Scholarship, which I received this semester. I was genuinely moved to learn that it was created by a former student who wanted to support others in the same program.

Until now, I have worked twenty hours a week at a grocery store to pay part of my tuition. Thanks to your generosity, I have been able to reduce my hours and join a research lab in the chemistry department, where I am studying low-cost water filters.

After graduation, I hope to continue this work as an engineer and help bring clean water to rural communities like the one where I grew up. I would be very happy to keep you informed about the project as it develops.

With gratitude,
Daniel Mensah`,
      notes: 'Sincere and specific: shows exactly what changed thanks to the scholarship, which makes the thanks meaningful.',
    },
  },
  {
    id: 'em-apartment-repair',
    title: 'Apartment repair',
    scenario: 'The heating in your rented apartment stopped working three days ago. The weather has become very cold, and you called the building office twice but nobody has come to fix it.',
    to: 'Property manager, Ms. Reyes',
    subject: 'Urgent: heating not working in unit 5C',
    register: 'formal',
    goals: [
      { text: 'Describe the problem and how long it has lasted', keywords: ['heating', 'heat', 'three days', 'cold', 'stopped', 'not working', 'radiator'] },
      { text: 'Mention what you have already done', keywords: ['called', 'twice', 'office', 'message', 'contacted', 'already'] },
      { text: 'Request a specific action', keywords: ['repair', 'technician', 'send', 'fix', 'today', 'tomorrow', 'as soon as', 'heater'] },
    ],
    model: {
      text: `Dear Ms. Reyes,

I am writing because the heating in my apartment, unit 5C, has not worked since Monday evening. The radiators are completely cold, and with nighttime temperatures now below freezing, the indoor temperature has dropped to around 13 degrees.

I called the building office on Tuesday morning and again on Wednesday afternoon. Both times I was told that a technician would contact me, but so far no one has called or visited.

Could you please arrange for a technician to come today or tomorrow? I can be at home after 3 p.m., or I can leave a key with the front desk if an earlier visit is possible. In the meantime, I would appreciate it if the office could provide a portable heater.

Thank you for your prompt attention to this matter.
Sincerely,
Farah Qureshi`,
      notes: 'Urgent but polite; the facts are specific, earlier attempts are documented and the request is concrete.',
    },
  },
];
