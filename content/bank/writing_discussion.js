// Write for an Academic Discussion — original prompts with level-5 models.

export default [
  {
    id: 'ad-four-day-week',
    course: 'business management',
    professor: { name: 'Dr. Nguyen', text: 'Several companies have experimented with a four-day work week, keeping salaries the same while reducing hours. Supporters say productivity stays the same or even improves; critics say it only works in certain industries. Would a four-day week be a good policy for most companies? Why or why not?' },
    students: [
      { name: 'Hannah', text: 'I think it would work for most office jobs. People waste a lot of time in unnecessary meetings, and a shorter week forces teams to focus on what matters.' },
      { name: 'Rafael', text: 'It sounds nice, but hospitals, shops and factories need people every day. For them, a four-day week just means hiring more workers, which is expensive.' },
    ],
    model: {
      text: `I believe a four-day week could work for most companies, but only if they redesign how work is organized rather than simply squeezing five days into four. Rafael is right that hospitals and shops cannot close an extra day, yet the policy does not require everyone to be off on the same day; staff could rotate, so the business stays open while each employee works fewer days. The bigger risk, in my view, is burnout. My aunt’s design firm tried four ten-hour days, and within months people were exhausted and making more mistakes. When they switched to four eight-hour days and cut weekly meetings in half, output actually recovered. So the real lesson is that the shorter week succeeds when companies remove wasted time, which supports Hannah’s point about meetings.`,
      notes: 'Takes a nuanced position, answers Rafael with a concrete mechanism (rotation), and uses a specific example with an explanation of why it proves the point.',
    },
  },
  {
    id: 'ad-ai-homework',
    course: 'education',
    professor: { name: 'Professor Adeyemi', text: 'AI writing tools can now produce essays in seconds. Some instructors have banned them; others require students to use them and reflect on the output. What is the best policy for university courses: banning AI tools, allowing them freely, or something in between? Explain your view.' },
    students: [
      { name: 'Claire', text: 'Banning them is unrealistic because students will use them anyway and nobody can reliably detect it. It is better to teach students how to use them responsibly.' },
      { name: 'Tomás', text: 'If AI writes the essay, students never practice thinking through an argument. I would ban them for writing assignments and allow them only for things like checking grammar.' },
    ],
    model: {
      text: `In my opinion, the best policy is a middle path that depends on the purpose of each assignment. Tomás makes a strong point that writing is a way of thinking, so an essay produced by AI teaches almost nothing. However, as Claire notes, a complete ban is impossible to enforce. A better approach is to change the assignments themselves. For example, in my history seminar, our professor asks us to generate an AI draft on a topic and then write a critique identifying its factual errors and weak arguments. This task is impossible to outsource, because the AI cannot evaluate its own mistakes, and it made me read the sources far more carefully than a normal essay would. In short, universities should allow AI tools but design tasks where the student’s own judgment is the main product.`,
      notes: 'Engages both classmates, proposes a specific alternative, and the example is followed by an explanation of why it works.',
    },
  },
  {
    id: 'ad-space-funding',
    course: 'public policy',
    professor: { name: 'Dr. Stein', text: 'Governments spend billions on space exploration each year. Some argue this money should be redirected to urgent problems on Earth, such as poverty and climate change. Others believe space research produces benefits that help solve those problems. Should governments reduce spending on space exploration? Why or why not?' },
    students: [
      { name: 'Amara', text: 'With so many people lacking clean water and healthcare, spending money on sending people to Mars seems hard to justify.' },
      { name: 'Kevin', text: 'Space programs have created technologies we use every day, like satellite weather forecasts and GPS. Cutting them would slow down innovation.' },
    ],
    model: {
      text: `I do not think governments should reduce space funding, although I understand Amara’s concern. The key point is that space budgets are much smaller than people assume; in most countries they are well under one percent of public spending, so cutting them would barely change funding for healthcare or water. Moreover, a large share of space research directly supports the problems Amara mentions. Satellites, for instance, measure ice loss, ocean temperatures and deforestation, and without that data it would be almost impossible to design effective climate policies. Kevin mentions GPS and weather forecasts, but I would add that farmers in dry regions now use satellite soil-moisture maps to decide when to irrigate, which saves water and protects harvests. Rather than choosing between space and Earth, governments should prioritize space projects that clearly serve people on the ground.`,
      notes: 'Responds to the opposing view with a factual counterpoint, adds a new example beyond the classmates, and ends with a refined recommendation.',
    },
  },
  {
    id: 'ad-historic-buildings',
    course: 'urban studies',
    professor: { name: 'Professor Laurent', text: 'Many cities face a choice between preserving old buildings and replacing them with modern, energy-efficient housing. Housing shortages are growing, but historic districts attract tourists and give neighborhoods character. When an old building is in poor condition, should cities preserve it or replace it? Explain your reasoning.' },
    students: [
      { name: 'Sofia', text: 'Historic buildings are part of a city’s identity. Once they are destroyed, they are gone forever, so cities should protect them whenever possible.' },
      { name: 'Jamal', text: 'People need homes more than they need pretty facades. If an old building can be replaced with apartments for fifty families, that should come first.' },
    ],
    model: {
      text: `I think the decision should depend on whether the building can be adapted, rather than treating preservation and housing as opposites. Jamal is right that housing must be the priority during a shortage, but demolition is not the only way to create homes. In my hometown, an abandoned nineteenth-century textile factory was converted into eighty apartments while keeping its brick walls and large windows. The project took longer than new construction, yet the apartments sold quickly precisely because of their character, and the renovation produced far less waste than demolishing and rebuilding. That said, Sofia’s argument has limits: if a building is structurally unsafe and has little historical value, preserving it only delays homes that families need now. Cities should therefore evaluate each building case by case, with adaptive reuse as the first option.`,
      notes: 'Offers a third option, supports it with a vivid, relevant example, and acknowledges the limits of the opposing view.',
    },
  },
  {
    id: 'ad-social-media-age',
    course: 'psychology',
    professor: { name: 'Dr. Castillo', text: 'Some countries are considering laws that would ban social media accounts for anyone under sixteen. Supporters point to research linking heavy use with anxiety in teenagers. Opponents argue that bans are hard to enforce and that teenagers need to learn to use these platforms safely. Do you support an age limit of sixteen for social media? Why or why not?' },
    students: [
      { name: 'Ingrid', text: 'I support it. Teenagers are especially sensitive to comparison and online bullying, and the platforms are designed to be addictive.' },
      { name: 'Malik', text: 'A ban would just push teens to lie about their age. Schools should teach digital literacy instead.' },
    ],
    model: {
      text: `I support a legal age limit, but mainly because of what it changes socially rather than because it will be perfectly enforced. Malik is correct that some teenagers will lie about their age, yet laws work even when they are imperfect. The real pressure on a thirteen-year-old is that all their friends are online; if most of the class is not allowed an account, that pressure largely disappears. I noticed this with my younger brother: his school introduced a phone-free policy, and although a few students broke the rule, he told me that lunch breaks became far more social because almost everyone followed it. Digital literacy lessons, as Malik suggests, are still valuable, but they would be more effective at sixteen, when students are mature enough to reflect on how these platforms are designed.`,
      notes: 'Clear stance with a subtle argument (social norms), a relevant personal example and integration of the opposing proposal.',
    },
  },
  {
    id: 'ad-automation-jobs',
    course: 'economics',
    professor: { name: 'Professor Ibrahim', text: 'Automation and robotics are replacing many routine jobs, from warehouse work to customer service. Some economists propose that governments should tax companies that replace workers with machines and use the money to retrain those workers. Is a “robot tax” a good idea? Why or why not?' },
    students: [
      { name: 'Olivia', text: 'Yes. Companies save a lot of money from automation, so it is fair that they help the workers who lose their jobs.' },
      { name: 'Deng', text: 'A robot tax would discourage innovation. Companies might move their factories to countries without such a tax.' },
    ],
    model: {
      text: `Although Olivia’s argument about fairness is appealing, I agree with Deng that a special robot tax is the wrong tool. One practical problem is definition: it is almost impossible to decide what counts as a “robot.” Is accounting software that replaces three clerks a robot? What about a self-checkout machine? Companies would spend enormous effort reclassifying their technology to avoid the tax. A better solution is to fund retraining through the regular corporate tax system, which already captures the higher profits that automation creates. Denmark, for example, finances generous job-transition programs through general taxation, and displaced workers there often find new jobs quickly. This approach supports workers, as Olivia wants, without punishing the specific investments that make companies more productive.`,
      notes: 'Develops one strong reason in depth (the definition problem), gives a real-world policy example and ties back to both classmates.',
    },
  },
  {
    id: 'ad-grades-pass-fail',
    course: 'education',
    professor: { name: 'Dr. Weiss', text: 'Some universities let first-year students take courses on a pass/fail basis instead of receiving letter grades. The goal is to reduce stress and encourage students to take challenging subjects outside their major. Critics say that without grades, students put in less effort. Should first-year courses be pass/fail? Explain your view.' },
    students: [
      { name: 'Yuki', text: 'Pass/fail would let students explore. I avoided a philosophy course I was curious about because I worried it would lower my GPA.' },
      { name: 'Ahmed', text: 'Grades give feedback. Without them, students do the minimum and do not know how well they actually understand the material.' },
    ],
    model: {
      text: `I believe pass/fail should be an option for first-year courses outside a student’s major, but not for core courses. Yuki’s experience shows exactly why: the fear of a low grade stops curious students from exploring, which is supposedly the purpose of the first year. At the same time, Ahmed raises a fair concern, although I think he confuses grades with feedback. A letter grade is only a summary; the useful feedback comes from comments on assignments, and pass/fail courses can still provide that. However, in core courses for their major, students need a clear signal of whether they are ready for advanced material. For instance, a “pass” in introductory calculus says little about whether an engineering student can handle differential equations. A mixed system gives students freedom where it matters and precision where it is necessary.`,
      notes: 'A qualified position with a clear distinction, a direct answer to Ahmed and a precise example.',
    },
  },
  {
    id: 'ad-tourism-limits',
    course: 'environmental studies',
    professor: { name: 'Professor Moreau', text: 'Popular destinations such as Venice and some national parks are limiting the number of daily visitors or charging entry fees to reduce crowding and environmental damage. Is limiting tourism a fair way to protect these places? Why or why not?' },
    students: [
      { name: 'Lucas', text: 'Limits are necessary. Some places are being destroyed by too many visitors, and future generations deserve to see them too.' },
      { name: 'Ana', text: 'Entry fees make travel a privilege for the rich. Everyone should have the right to see these famous places.' },
    ],
    model: {
      text: `I think visitor limits are fair, but Ana is right that fees alone are the wrong way to apply them. Charging a high price simply means that wealthy tourists can still crowd the site while students and local families are excluded. A reservation system with a fixed daily quota is much fairer, because access depends on planning rather than money. Several national parks in the United States use timed-entry permits: visitors book a free or inexpensive slot online, and a portion of the permits is released the day before for people who cannot plan far ahead. This protects trails and wildlife, as Lucas wants, while keeping the places open to everyone. If fees are used at all, the revenue should go directly to conservation and to discounted tickets for residents.`,
      notes: 'Synthesizes both classmates, proposes a fairer mechanism and gives a concrete, well-explained example.',
    },
  },
  {
    id: 'ad-online-vs-campus',
    course: 'sociology',
    professor: { name: 'Dr. Patel', text: 'Online degree programs have become much more common and are often cheaper than attending a traditional campus. Some argue that the campus experience—face-to-face discussion, clubs, networking—is an essential part of higher education. Is the traditional campus experience still worth the extra cost? Explain your opinion.' },
    students: [
      { name: 'Grace', text: 'Absolutely. Most of what I learned at university came from conversations with classmates and professors, not from lectures.' },
      { name: 'Victor', text: 'For many people, the extra cost means years of debt. If you can learn the same material online, the campus is a luxury.' },
    ],
    model: {
      text: `In my view, the campus experience is worth the cost for some students but not for everyone, and the deciding factor is what a student needs beyond the content. Victor is correct that the material itself is often identical online, so for an experienced professional who wants a specific qualification, paying for campus life makes little sense. However, for younger students, the campus provides something that is hard to replicate: unplanned interactions. During my first year, a conversation in a dining hall with a graduate student led to a part-time research job, which later became the basis of my scholarship application. That opportunity would never have appeared on an online forum. So instead of asking whether campuses are still worth it in general, students should ask which kind of learning their stage of life requires.`,
      notes: 'Reframes the question thoughtfully, uses an example of the “unplanned interactions” idea and connects to Victor’s point.',
    },
  },
  {
    id: 'ad-plastic-ban',
    course: 'environmental science',
    professor: { name: 'Professor Kaur', text: 'Many cities have banned single-use plastic bags and straws. Some researchers argue these bans have only a small effect on overall plastic pollution and mainly make people feel good. Are bans on single-use plastic items an effective environmental policy? Why or why not?' },
    students: [
      { name: 'Ethan', text: 'Even if the direct effect is small, bans change people’s habits and make them think about waste in general.' },
      { name: 'Zara', text: 'Most ocean plastic comes from fishing gear and industrial waste. Banning straws distracts from the real sources.' },
    ],
    model: {
      text: `I agree with Zara that plastic bag bans are not an effective policy if they are the main strategy, although they are not useless. The data she mentions matters: abandoned fishing nets and industrial packaging make up a far larger share of ocean plastic than straws, so a city that bans straws and then declares victory is misleading its citizens. On the other hand, Ethan’s point about habits deserves attention, but only if the habit spreads to bigger decisions. For example, after my city introduced a bag fee, several supermarkets also started selling refills of cleaning products, which reduces much more plastic than a bag does. In my opinion, bans work best as the first step in a broader plan that also targets industrial and commercial waste, with clear goals that are measured every year.`,
      notes: 'Weighs both views, uses evidence and a local example, and ends with a specific condition for the policy to work.',
    },
  },
];
