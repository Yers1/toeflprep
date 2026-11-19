// Extra Write an Email and Academic Discussion prompts (Nov 2026 batch).

const writing_email = [
  {
    id: 'em-x-exam-work-conflict',
    title: 'Midterm moved to a work night',
    scenario: 'Your statistics professor has moved the midterm exam from Tuesday morning to Thursday evening. You work part-time at a hospital pharmacy, and on Thursday evening you must attend a required safety training that was scheduled two months ago. Employees who miss it cannot keep working.',
    to: 'Professor Ortiz',
    subject: 'Conflict with the new midterm time',
    register: 'formal',
    goals: [
      { text: 'Explain the conflict with the new exam time', keywords: ['work', 'job', 'training', 'shift', 'pharmacy', 'hospital', 'conflict', 'thursday'] },
      { text: 'Ask whether you can take the exam at another time', keywords: ['another time', 'different time', 'earlier', 'later', 'take the exam', 'alternative', 'reschedule', 'rescheduling', 'possible'] },
      { text: 'Offer proof and suggest times when you are free', keywords: ['letter', 'proof', 'document', 'confirm', 'manager', 'available', 'free', 'morning', 'afternoon'] },
    ],
    model: {
      text: `Dear Professor Ortiz,

I am writing about the new time for our statistics midterm. I work part-time at the City Hospital pharmacy, and on Thursday evening all staff must attend a safety training that was scheduled two months ago. Employees who miss it are not allowed to continue working, so unfortunately I cannot change it.

Would it be possible for me to take the exam at a different time? I would be happy to sit it earlier in the week, before the rest of the class, so that there is no risk of my seeing the questions in advance.

My manager has offered to write a short letter confirming the training date. I am free on Wednesday afternoon after 1 p.m. and all day Friday, and I can take the exam in the testing center if that is easier for you.

Thank you very much for your understanding.
Best regards,
Daniel Kim`,
      notes: 'The conflict is concrete (who, when, why it cannot move), the request is indirect, and offering to sit the exam early answers the professor’s likely worry about fairness.',
    },
  },
  {
    id: 'em-x-broken-tent',
    title: 'Damaged borrowed tent',
    scenario: 'Last weekend you borrowed a tent from your friend Marco for a camping trip. During a storm, one of the tent poles snapped and the rain cover tore. Marco does not know yet, and he mentioned that he needs the tent for his own trip at the end of the month.',
    to: 'Marco',
    subject: 'About your tent',
    register: 'informal',
    goals: [
      { text: 'Explain what happened to the tent', keywords: ['storm', 'wind', 'pole', 'snapped', 'broke', 'broken', 'tore', 'torn', 'rain', 'damage', 'damaged'] },
      { text: 'Apologize and offer to fix or replace it', keywords: ['sorry', 'apologize', 'replace', 'repair', 'fix', 'pay', 'buy', 'cover'] },
      { text: 'Ask what he would prefer before his trip', keywords: ['prefer', 'would you', 'let me know', 'which', 'rather', 'trip', 'before'] },
    ],
    model: {
      text: `Hi Marco,

Thanks again for lending me your tent last weekend. Unfortunately, I have some bad news. On Saturday night a storm hit the campsite, and the wind was so strong that one of the poles snapped. A falling branch also tore a hole about the size of my hand in the rain cover.

I’m really sorry — I know how much you love that tent. Of course I’ll pay for everything. The outdoor shop on Main Street says they can replace the pole and patch the cover in about a week for around $40, or I could buy you a brand-new rain cover if you’d feel better about that.

Since you need it for your trip at the end of the month, which option would you prefer? Let me know, and I’ll take it to the shop tomorrow.

Sorry again, and I owe you a coffee!
Cheers,
Alex`,
      notes: 'Casual but responsible tone for a friend: what happened, a clear apology with a priced plan, and a question that leaves the choice to the owner.',
    },
  },
  {
    id: 'em-x-paper-extension',
    title: 'Extension for a research paper',
    scenario: 'Your research paper for a history seminar is due on Friday. Most of your sources are old newspapers held in the city archive, which unexpectedly closed for two weeks because of a water leak. You have finished about half of the paper.',
    to: 'Dr. Lindqvist',
    subject: 'Request for a short extension on my seminar paper',
    register: 'formal',
    goals: [
      { text: 'Explain why you cannot finish on time', keywords: ['archive', 'closed', 'leak', 'sources', 'newspapers', 'access'] },
      { text: 'Describe the progress you have made', keywords: ['finished', 'completed', 'half', 'draft', 'written', 'progress', 'pages', 'section'] },
      { text: 'Ask for a specific new deadline', keywords: ['extension', 'extend', 'new deadline', 'more time', 'until', 'submit', 'next week'] },
    ],
    model: {
      text: `Dear Dr. Lindqvist,

I am writing to ask for a short extension on my seminar paper about the 1918 dock workers’ strike, which is due this Friday. Most of my evidence comes from local newspapers that are only available in the city archive. Unfortunately, the archive closed unexpectedly last Monday because of a water leak, and it will not reopen until the 24th.

So far, I have completed about half of the paper. The introduction and the two background sections are written, and I have already collected the union records I need from the university library.

Would it be possible to submit the paper on the 28th instead? That would give me four days in the archive to finish the newspaper analysis. I would be glad to send you my current draft now so that you can see my progress.

Thank you for considering my request.
Sincerely,
Aigerim Bekova`,
      notes: 'The reason is outside the student’s control, the progress is specific (which sections are done), and the request names an exact date with a reason for it.',
    },
  },
  {
    id: 'em-x-bike-repair',
    title: 'Late and overcharged bike repair',
    scenario: 'Two weeks ago you left your bicycle at a repair shop. The shop promised it would be ready in three days and quoted $60. When you finally picked it up yesterday, the bill was $95, and no one had called you about the extra cost. You depend on the bike to get to campus.',
    to: 'Manager, Greenway Cycles',
    subject: 'Delayed repair and unexpected charge',
    register: 'formal',
    goals: [
      { text: 'Describe what was promised and what actually happened', keywords: ['promised', 'three days', 'two weeks', 'delay', 'quote', 'quoted', 'ready', 'charged'] },
      { text: 'Explain how the problem affected you', keywords: ['campus', 'bus', 'taxi', 'taxis', 'class', 'classes', 'walk', 'expensive', 'transport'] },
      { text: 'Ask for a specific solution', keywords: ['refund', 'difference', 'discount', 'reimburse', 'credit', 'compensation', 'return'] },
    ],
    model: {
      text: `Dear Manager,

I am writing about the repair of my blue city bike, which I left at Greenway Cycles on October 3. When I dropped it off, your mechanic promised that it would be ready in three days and quoted me $60 to replace the chain and brakes. However, the repair took two weeks, and yesterday I was charged $95. No one called me to explain the extra cost before the work was done.

The delay was a real problem for me, because I use the bike to get to my classes every day. While I waited, I had to take taxis on four mornings to reach campus on time, which cost me more than $30.

I would be grateful if you could refund the $35 difference between the quote and the final bill. Could you please let me know how you would like to process it?

Thank you for your attention to this matter.
Kind regards,
Sara Lopez`,
      notes: 'A firm complaint that stays polite: dates and amounts make each point checkable, and the request is one exact figure rather than a vague “do something”.',
    },
  },
  {
    id: 'em-x-kitchen-dishes',
    title: 'Shared kitchen problem',
    scenario: 'You share an apartment with a roommate, Priya. For the past few weeks, dirty dishes have been left in the sink for days, and last night you found that some of your food in the fridge had been eaten. You get along well with Priya and want to keep it that way.',
    to: 'Priya',
    subject: 'Kitchen stuff',
    register: 'informal',
    goals: [
      { text: 'Describe the problem in a friendly way', keywords: ['dishes', 'sink', 'kitchen', 'food', 'fridge', 'mess', 'messy'] },
      { text: 'Explain why it bothers you', keywords: ['cook', 'cooking', 'clean', 'groceries', 'grocery', 'budget', 'money', 'bother', 'frustrated'] },
      { text: 'Suggest a plan that works for both of you', keywords: ['how about', 'suggest', 'maybe', 'plan', 'shelf', 'shelves', 'take turns', 'split', 'schedule'] },
    ],
    model: {
      text: `Hi Priya,

Hope your week is going okay! I wanted to bring up something small before it turns into a big deal. Lately the dishes have been piling up in the sink for a few days at a time, and last night I noticed that the pasta sauce and yogurt I bought for my lunches were gone.

It’s not a disaster, but I usually cook right after my evening class, and it’s hard when there are no clean pans. My grocery budget is pretty tight this semester too, so I plan my meals for the whole week.

How about we each wash our own dishes on the same day and keep separate shelves in the fridge? And if you ever want to share food, I’m totally happy to cook together on weekends — just ask!

Thanks for understanding, and see you tonight!
Mia`,
      notes: 'Friendly register for a roommate: the problem is described without blame, the reasons are personal and concrete, and the solution includes something positive (cooking together).',
    },
  },
  {
    id: 'em-x-speaker-thanks',
    title: 'Thanking a guest speaker',
    scenario: 'Last week, Ms. Rivera, an engineer at a solar energy company, gave a talk at your university’s career night. You found her talk inspiring, especially her description of testing solar panels in desert conditions. You are interested in a summer internship at her company but are not sure how to apply.',
    to: 'Ms. Rivera',
    subject: 'Thank you for your talk at career night',
    register: 'formal',
    goals: [
      { text: 'Thank her and mention what you found useful', keywords: ['thank', 'talk', 'presentation', 'inspiring', 'enjoyed', 'useful', 'interesting', 'desert'] },
      { text: 'Explain your own interest or background', keywords: ['study', 'major', 'engineering', 'course', 'project', 'interested', 'student'] },
      { text: 'Ask a follow-up question about the internship', keywords: ['internship', 'interns', 'apply', 'application', 'advice', 'position', 'positions'] },
    ],
    model: {
      text: `Dear Ms. Rivera,

Thank you for your talk at our career night last Thursday. I especially enjoyed your story about testing solar panels in the desert, where dust storms reduced their output by almost a third. It was the first time I realized how much engineering happens after a product leaves the lab.

I am a second-year electrical engineering student, and this semester I am working on a class project that measures how temperature affects the efficiency of small panels on our dormitory roof. Your talk made me want to learn how this kind of testing is done professionally.

I understand that your company sometimes hosts summer interns. Could you please tell me whether these positions are advertised publicly, or whether students usually apply directly to a team? Any advice on how to prepare a strong application would also be very welcome.

Thank you again for your time.
Best regards,
Omar Haidari`,
      notes: 'The thanks is specific (one detail from the talk), the background connects the writer to the speaker’s work, and the follow-up question is easy to answer.',
    },
  },
  {
    id: 'em-x-workshop-date',
    title: 'Club workshop moved to a new date',
    scenario: 'You are the president of your university’s photography club. A professional wildlife photographer, Mr. Novak, agreed to give a workshop for club members on March 12. Yesterday the university told you that the room is no longer available that day because it is needed for an exam. You need to tell Mr. Novak and find a solution.',
    to: 'Mr. Novak',
    subject: 'Change to the workshop date',
    register: 'formal',
    goals: [
      { text: 'Explain what has changed and why', keywords: ['room', 'exam', 'booked', 'booking', 'cancelled', 'canceled', 'changed', 'change', 'university'] },
      { text: 'Apologize for the inconvenience', keywords: ['sorry', 'apologize', 'apologies', 'inconvenience', 'regret'] },
      { text: 'Propose new options and ask which works for him', keywords: ['instead', 'new date', 'alternative', 'alternatives', 'option', 'options', 'convenient', 'work for you', 'suit'] },
    ],
    model: {
      text: `Dear Mr. Novak,

I am writing with an unexpected change to your wildlife photography workshop. Yesterday the university informed us that our room in the Arts Building is needed for a make-up exam on March 12, and all other rooms of that size are already booked that day.

Please accept my sincere apologies for the inconvenience. I know you had arranged your schedule around this date, and the problem was entirely outside the club’s control.

We have found two alternatives. The same room is free on the evening of March 19, or we could hold the workshop on Saturday, March 14, in the larger lecture hall, which also has a better projector. Would either of these dates be convenient for you? If neither works, I would be happy to suggest more options.

Our members are still very excited about your visit, and we are grateful for your flexibility.
Kind regards,
Hana Sato`,
      notes: 'Bad news is delivered early and clearly, the apology is separate and sincere, and two concrete alternatives make it easy for the guest to say yes.',
    },
  },
  {
    id: 'em-x-sick-teammate',
    title: 'Teammate sick before a presentation',
    scenario: 'You and two classmates have a group presentation in your marketing class on Thursday. This morning, one teammate, Leo, told you he has the flu and will not be able to present. He has already sent his notes for his section on social media advertising. You need to reorganize with your other teammate, Fatima.',
    to: 'Fatima',
    subject: 'Change of plan for Thursday',
    register: 'informal',
    goals: [
      { text: 'Tell Fatima what has happened', keywords: ['leo', 'sick', 'flu', 'ill', 'stay home', 'can’t present', "can't present", 'cannot present'] },
      { text: 'Suggest how to divide Leo’s part', keywords: ['split', 'divide', 'take', 'half', 'section', 'slides', 'part'] },
      { text: 'Propose a time to practice together', keywords: ['practice', 'rehearse', 'meet', 'tomorrow', 'library', 'run through', 'call'] },
    ],
    model: {
      text: `Hi Fatima,

Bad news, I’m afraid: Leo just messaged me that he has the flu, and his doctor told him to stay home for the rest of the week. He feels terrible about it, but he has already sent me his notes on social media advertising, so at least the content is ready.

I think the easiest solution is to split his section in half. You already know the case study on Instagram ads really well, so would you be okay presenting those three slides? I can take the part about advertising costs, since it connects to my budget section anyway.

As the order of speakers will change, could we meet tomorrow evening to run through the whole thing? I’ve booked a study room in the library from 6 to 8, but if that’s too late for you, a video call works too.

Thanks, and let me know what you think!
Talia`,
      notes: 'A practical message between classmates: the news, a fair division with a reason for each part, and a specific rehearsal plan with a backup option.',
    },
  },
  {
    id: 'em-x-museum-volunteer',
    title: 'Volunteering at a science museum',
    scenario: 'The city science museum is looking for weekend volunteer guides for its new exhibition on ocean life. You are a biology student and would like to apply, but the announcement does not say how many hours volunteers must commit, whether training is provided, or whether international students are eligible.',
    to: 'Volunteer Coordinator',
    subject: 'Question about the weekend volunteer guide program',
    register: 'formal',
    goals: [
      { text: 'Introduce yourself and explain your interest', keywords: ['biology', 'student', 'interested', 'ocean', 'marine', 'exhibition', 'experience'] },
      { text: 'Ask about the time commitment and training', keywords: ['hours', 'commit', 'commitment', 'how many', 'training', 'schedule'] },
      { text: 'Ask whether international students can apply', keywords: ['international', 'visa', 'eligible', 'eligibility', 'permit'] },
    ],
    model: {
      text: `Dear Volunteer Coordinator,

My name is Lucas Ferreira, and I am a third-year biology student at Northfield University. I saw your announcement for weekend guides at the new ocean life exhibition, and I would love to apply. Last summer I helped run a children’s workshop on coral reefs at a local aquarium, so I have some experience explaining science to visitors.

Before I submit an application, I would be grateful if you could answer a few questions. How many hours per month are volunteers expected to commit, and is there a minimum period, such as one semester? I would also like to know whether the museum provides training on the exhibition content.

Finally, I am an international student on a study visa. Could you please let me know whether I am eligible for the program, or whether I would need any additional documents?

Thank you for your time, and I look forward to hearing from you.
Best regards,
Lucas Ferreira`,
      notes: 'An inquiry that shows real interest first, then asks short, separate questions that the reader can answer one by one.',
    },
  },
  {
    id: 'em-x-missed-birthday',
    title: 'Missing a friend’s birthday dinner',
    scenario: 'Your close friend Jamal invited you to his birthday dinner at a restaurant last Saturday. You had promised to come, but you completely forgot because you were finishing a lab report, and you did not answer his messages that evening. He has not contacted you since.',
    to: 'Jamal',
    subject: 'I’m so sorry about Saturday',
    register: 'informal',
    goals: [
      { text: 'Apologize for missing the dinner', keywords: ['sorry', 'apologize', 'apology', 'missed', 'feel bad', 'terrible'] },
      { text: 'Explain what happened without making excuses', keywords: ['lab report', 'report', 'deadline', 'phone', 'studying', 'forgot', 'due'] },
      { text: 'Suggest a way to make it up to him', keywords: ['make it up', 'treat', 'take you', 'celebrate', 'how about', 'this weekend', 'friday'] },
    ],
    model: {
      text: `Hi Jamal,

I’m really sorry I missed your birthday dinner on Saturday. You invited me weeks ago, I promised I’d be there, and then I didn’t even answer your messages. I can only imagine how that felt, and I completely understand if you’re upset with me.

I’m not trying to make excuses, but I want you to know what happened. I was finishing my chemistry lab report, which was due at midnight, and I put my phone on silent so I could concentrate. By the time I looked at it, it was almost 11 and the dinner was over.

I’d love to make it up to you. How about I take you this Friday to that Korean barbecue place you keep talking about? It’s my treat, and I’ll even let you choose the dessert.

Happy belated birthday, and I hope you can forgive me!
See you soon,
Ben`,
      notes: 'A sincere apology to a friend: it takes responsibility first, explains without excusing, and offers a specific, personal way to make up for it.',
    },
  },
];

const writing_discussion = [
  {
    id: 'ad-x-phones-school',
    course: 'education',
    professor: { name: 'Dr. Okonkwo', text: 'Several countries have banned smartphones in secondary schools for the entire school day, including breaks. Supporters say the bans improve concentration and reduce bullying. Critics argue that teenagers need to learn to manage technology themselves rather than have it taken away. Should secondary schools ban phones for the whole school day? Why or why not?' },
    students: [
      { name: 'Mei', text: 'I support a full ban. Even during breaks, students just sit and scroll instead of talking to each other, and the notifications follow them back into class.' },
      { name: 'Jonas', text: 'A ban treats teenagers like children. In a few years they will be at university with no rules, so school is exactly where they should practice using phones responsibly.' },
    ],
    model: {
      text: `I believe secondary schools should ban phones during lessons but allow them at lunch, because the goal is to protect learning time, not to control teenagers completely. Mei is right that notifications follow students into class, yet banning phones during breaks does not solve that problem; keeping them in lockers during lessons does. Jonas makes a fair point about self-control, but students cannot practice a skill when the temptation is in their pocket every minute. For example, my school in Almaty introduced phone lockers in 2023 for class time only. Within a semester, teachers reported far fewer interruptions, and students could still message their parents at lunch. This shows that a partial rule removes the main distraction while leaving room for responsible use. In short, schools should draw the line at the classroom door rather than at the school gate.`,
      notes: 'A middle position stated in the first sentence, a direct answer to each classmate, and one dated example followed by what it proves.',
    },
  },
  {
    id: 'ad-x-free-transit',
    course: 'urban planning',
    professor: { name: 'Professor Lindgren', text: 'A few cities have made buses and trams completely free, paying for them through local taxes. The aim is to reduce traffic and help low-income residents. Opponents say the money would be better spent on making public transport faster and more frequent. Should cities make public transport free? Why or why not?' },
    students: [
      { name: 'Diego', text: 'Free transport is the most direct way to get people out of their cars. Even a small fare makes many people choose to drive instead.' },
      { name: 'Sofia', text: 'People drive because buses are slow and unreliable, not because tickets cost too much. A free bus that comes every forty minutes is still useless.' },
    ],
    model: {
      text: `In my view, cities should improve service before making transport free, because speed and reliability matter more to most commuters than price. Diego is right that fares discourage some riders, especially low-income families, but those families can be helped with discounted passes at a much lower cost. Sofia’s argument matches my own experience. For example, last year my cousin moved to a suburb where the bus was cheap but came only twice an hour, so she bought a used car within two months. When the city later added a bus lane and raised the frequency to every ten minutes, she started taking the bus again, even though the fare had not changed. This shows that people respond to convenience first and price second. Therefore, free transport can be a good final step, but only after the system is fast enough to compete with driving.`,
      notes: 'Agrees with one classmate without ignoring the other, and the example has a clear before-and-after that isolates the real cause.',
    },
  },
  {
    id: 'ad-x-right-to-repair',
    course: 'environmental science',
    professor: { name: 'Dr. Mbeki', text: 'Electronic waste is one of the fastest-growing types of waste. Some governments are considering laws that would require manufacturers to sell spare parts and publish repair manuals so that phones and laptops can be fixed instead of thrown away. Would such laws significantly reduce electronic waste? Explain your view.' },
    students: [
      { name: 'Anya', text: 'Yes. Many devices are thrown away because of a single broken battery or screen. If repairs were cheap and easy, people would keep their phones for years longer.' },
      { name: 'Marcus', text: 'I doubt it. People replace phones because they want the newest model, not because the old one is broken. Repair laws will not change that habit.' },
    ],
    model: {
      text: `I think repair laws would reduce electronic waste significantly, even though they will not change everyone’s habits. Marcus is correct that some people upgrade simply to own the latest model, but many others replace devices only because a repair seems too expensive or impossible. Anya’s point about batteries describes exactly this group. For instance, my father’s laptop stopped holding a charge in 2022, and the manufacturer’s service center quoted almost half the price of a new computer. A small independent shop then found a compatible battery online and fixed it for about thirty dollars, and he still uses the laptop today. If spare parts were officially available, this kind of repair would be normal rather than lucky. Overall, laws cannot stop people who love new gadgets, but they can save millions of devices that are thrown away for no good reason.`,
      notes: 'Concedes part of Marcus’s point, then narrows the argument to the group the law would actually affect; the example explains why access to parts is the key factor.',
    },
  },
  {
    id: 'ad-x-job-loyalty',
    course: 'business',
    professor: { name: 'Professor Haas', text: 'In the past, many workers stayed with one employer for most of their careers. Today, young professionals often change jobs every two or three years. Which approach is better for building a successful career: staying with one company for a long time or changing employers regularly? Explain why.' },
    students: [
      { name: 'Ingrid', text: 'Changing jobs is the fastest way to raise your salary and learn new skills. Companies rarely reward loyalty as much as a new employer will pay to hire you.' },
      { name: 'Ethan', text: 'Staying longer lets you build trust and take on bigger responsibilities. People who leave after two years never see the results of their own projects.' },
    ],
    model: {
      text: `I believe that staying with one company for at least four or five years builds a stronger career, although changing jobs occasionally can be useful. Ingrid is right that a new employer often offers a higher salary, but that advantage is short-term. Ethan’s point about seeing projects through is more important, because employers promote people who have proven results. For example, my aunt joined a small logistics firm in Shymkent as an assistant in 2015. She stayed for eight years, and because she understood every part of the business, she was chosen to lead its expansion into two new cities. A person who had left after two years would never have gained the knowledge or the trust needed for that role. Therefore, young professionals should change employers only when they stop learning, not simply because another company offers slightly more money.`,
      notes: 'A clear position with a reasonable limit, a response to the salary argument, and one career story that shows why long-term knowledge leads to promotion.',
    },
  },
  {
    id: 'ad-x-community-service',
    course: 'education policy',
    professor: { name: 'Dr. Romero', text: 'Some school systems require students to complete a certain number of hours of community service, such as volunteering at food banks or tutoring younger children, before they can graduate from high school. Is this a good requirement? Why or why not?' },
    students: [
      { name: 'Grace', text: 'It is a great idea. Many teenagers would never volunteer on their own, but once they try it, they discover causes they care about.' },
      { name: 'Samir', text: 'Forced volunteering is not really volunteering. Students just collect signatures for hours and learn nothing, and it takes time away from their studies or part-time jobs.' },
    ],
    model: {
      text: `In my opinion, required community service is a good idea, as long as schools let students choose meaningful projects instead of simply counting hours. Samir has a point that some students treat it like a checklist, and that usually happens when the hours are spent sorting papers in an office. Grace’s argument, however, matches what I have seen. For example, my school in Astana required forty hours of service, and my classmate chose to tutor children at a local orphanage. He started only because he needed the hours, but he continued for two more years and now plans to study education. His experience proves that a requirement can introduce teenagers to work they would never have discovered on their own. Overall, the rule is worthwhile, but its success depends on giving students real choices.`,
      notes: 'Accepts the weakness Samir names and explains when it happens; the classmate’s story shows the requirement leading to genuine interest.',
    },
  },
  {
    id: 'ad-x-sugar-tax',
    course: 'public health',
    professor: { name: 'Professor Yilmaz', text: 'Several countries now tax sugary drinks, and the money is often used for health programs. Supporters say the tax reduces obesity and tooth decay. Critics say it unfairly affects low-income families and that education works better than taxes. Should governments tax sugary drinks? Why or why not?' },
    students: [
      { name: 'Chloe', text: 'Yes. Prices clearly change behavior, just as tobacco taxes did. If soda costs more, people buy less, especially children.' },
      { name: 'Arjun', text: 'Poorer families already spend a larger share of their income on food. Instead of punishing them, governments should teach healthy eating in schools.' },
    ],
    model: {
      text: `I believe governments should tax sugary drinks, provided that the money goes back into the communities that pay the most. Chloe is right that price affects behavior, but the strongest effect may be on manufacturers rather than shoppers. For example, when the United Kingdom announced its tax in 2016, several major brands reduced the sugar in their drinks before the law even took effect, so customers consumed less sugar without paying more. This shows that the tax works not only through prices but also by changing what is sold. Arjun’s worry about low-income families is serious, but it can be addressed by spending the revenue on clinics and school meals in exactly those neighborhoods. Education is helpful, yet it is slow, while a tax produces results within a few years. Therefore, a well-designed tax is fairer and more effective than its critics assume.`,
      notes: 'Adds a new angle to Chloe’s point (companies, not just shoppers), answers Arjun with a concrete fix, and uses one real, checkable case.',
    },
  },
  {
    id: 'ad-x-news-paywalls',
    course: 'media studies',
    professor: { name: 'Dr. Osei', text: 'Many newspapers now put most of their articles behind paywalls, so only subscribers can read them. Others keep their websites free and rely on advertising. Which model is better for society: news that readers pay for, or news that is free and supported by ads? Explain your reasoning.' },
    students: [
      { name: 'Hiro', text: 'Free news is better for democracy. If quality journalism is only for people who can pay, poorer citizens will rely on rumors and social media.' },
      { name: 'Elena', text: 'Advertising pushes newspapers to chase clicks with sensational headlines. When readers pay, the newspaper works for them instead of for advertisers.' },
    ],
    model: {
      text: `In my view, reader-funded news is better for society, but newspapers should offer free access to students and low-income readers. Elena is right that advertising changes what gets published. For example, last year our local news website, which depends entirely on ads, ran a series of shocking crime headlines that got thousands of shares. Meanwhile, a careful report about the city budget received almost no attention and was never followed up. Because the site earns money from clicks, it had no reason to invest in the slower, more important story. This shows that the funding model shapes the journalism itself. Hiro raises a fair concern about people who cannot pay, yet that problem has a simple solution: many subscription papers already give free accounts to libraries and schools. Overall, readers should pay for news when they can, because that keeps journalists working for the public rather than for advertisers.`,
      notes: 'Takes Elena’s side, proves it with one local example and its cause, then answers Hiro’s fairness concern instead of ignoring it.',
    },
  },
  {
    id: 'ad-x-hosting-games',
    course: 'economics',
    professor: { name: 'Professor Dubois', text: 'Hosting major sporting events such as the Olympics or the World Cup often costs governments billions of dollars for stadiums, transport and security. Supporters say these events bring tourism, international attention and lasting infrastructure. Should governments spend public money to host major international sporting events? Why or why not?' },
    students: [
      { name: 'Kwame', text: 'These events put a city on the world map. The new metro lines and airports remain long after the games are over, so the investment pays off.' },
      { name: 'Lucia', text: 'Most host cities lose money. Stadiums are left empty after a few weeks, and the money could have built schools and hospitals instead.' },
    ],
    model: {
      text: `I believe governments should host such events only when they can use existing facilities, because new stadiums rarely justify their cost. Kwame is right that transport projects can last for decades, but a city does not need the Olympics as an excuse to build a metro line. Lucia’s concern about empty stadiums is supported by real cases. For example, Athens built several new venues for the 2004 Olympics, and many of them were abandoned within a few years while Greece struggled with public debt. The tourism boost lasted only a short time, but the maintenance costs continued. This case proves that the most expensive part of hosting is often the part with the least lasting value. Governments that want international attention should therefore bid only when most of the venues already exist. In short, hosting can be worthwhile, but only when it does not leave a country with long-term debt.`,
      notes: 'Separates the useful part of hosting (transport) from the wasteful part (venues), and the Athens example shows exactly which costs outlast the event.',
    },
  },
  {
    id: 'ad-x-local-content',
    course: 'cultural studies',
    professor: { name: 'Dr. Takahashi', text: 'Some countries require radio stations and streaming services to make a certain percentage of their music or films locally produced. The goal is to protect national culture from being overwhelmed by global entertainment. Are such quotas a good way to protect local culture? Why or why not?' },
    students: [
      { name: 'Amir', text: 'Without quotas, local artists cannot compete with the huge marketing budgets of global studios. Quotas give them a fair chance to be heard.' },
      { name: 'Julia', text: 'People should be free to choose what they watch and listen to. If local music is good, audiences will find it without the government forcing it on them.' },
    ],
    model: {
      text: `I think local content quotas are useful, but only as a temporary boost rather than a permanent rule. Julia is right that audiences should be free to choose, yet they can only choose artists they have actually heard of. Amir’s point about marketing budgets explains why that rarely happens without support. For example, my friend Daniyar records songs in Kazakh, and for two years his music received almost no attention online. After the radio stations in his city were required to play more local music, one of his songs was played regularly, and his monthly streams grew from a few hundred to over fifty thousand. This proves that exposure, not quality, was the barrier he faced, because listeners kept choosing his music once they knew it existed. Therefore, quotas work best when they open the door for new artists and are gradually reduced as local industries grow stronger.`,
      notes: 'Answers Julia on her own terms (free choice needs exposure), and the friend’s story is followed by a sentence that explains what it proves.',
    },
  },
  {
    id: 'ad-x-basic-research',
    course: 'science policy',
    professor: { name: 'Professor Varga', text: 'Government research budgets are limited. Some policymakers want to focus funding on applied research with clear practical goals, such as new medicines or cleaner energy. Others argue that basic research, which explores fundamental questions without an immediate use, leads to the biggest breakthroughs in the long run. Which type of research should governments prioritize? Why?' },
    students: [
      { name: 'Noah', text: 'Taxpayers deserve to see results. With problems like climate change and disease, governments should fund research that solves them directly.' },
      { name: 'Zara', text: 'Many important inventions came from research that seemed useless at first. If we only fund what is obviously practical, we will miss the discoveries nobody can predict.' },
    ],
    model: {
      text: `I believe governments should keep a large share of their budgets for basic research, even though applied projects deliver faster results. Noah is right that taxpayers want visible benefits, but many of those benefits depend on earlier discoveries that had no obvious purpose. Zara’s argument is supported by one of the most important medical advances of recent years. For example, researchers studied messenger RNA throughout the 1990s and 2000s, and their grant applications were often rejected because the work seemed to have little practical value. When COVID-19 spread in 2020, that knowledge allowed companies to design effective vaccines within months. This shows that applied success is often built on basic research that looked useless at the time. Therefore, cutting basic science to fund only practical goals would actually slow down the very solutions Noah wants.`,
      notes: 'Uses Noah’s own goal (practical results) as the reason to fund basic research, with one well-known real case and an explanation of the link.',
    },
  },
];

export default { writing_email, writing_discussion };
