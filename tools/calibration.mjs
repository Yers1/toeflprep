// Scoring calibration: real learner responses must not be over-scored, model
// answers must not be under-scored, and every grammar rule must fire on its
// error and stay quiet on the correct form. Imported by validate.mjs.

import { grammarIssues } from '../src/analyzers/grammar.js';
import { scoreRepeat, scoreInterview } from '../src/analyzers/speaking.js';
import { scoreDiscussion, scoreEmail } from '../src/analyzers/writing.js';

export function runCalibration(check) {
  // ---- grammar rules: [must flag, must not flag] ----
  const pairs = [
    ['I moved to the Kazakhstan last year.', 'The Moscow office is closed.'],
    ['It was a interesting class.', 'It was a useful class and a one-time event.'],
    ['I waited for a hour.', 'I waited for an hour.'],
    ['She studies at an university.', 'It was an unusual and an unimportant detail.'],
    ['He gave me many advices.', 'He gave me some advice.'],
    ['I need an advice about my essay.', 'I joined a research project and an information session.'],
    ['I have a long experience in marketing.', 'Volunteering was a great experience.'],
    ['The government should invest into hospitals.', 'The government should invest in hospitals.'],
    ['We discussed about the plan.', 'We discussed the plan.'],
    ['Can you explain me the rule?', 'Can you explain them to me?'],
    ['I suggest to add more activities.', 'I suggest adding more activities.'],
    ['I consider myself as a professional.', 'I consider myself experienced.'],
    ['I look forward to hear from you.', 'I look forward to hearing from you.'],
    ['Could you share us the reasons?', 'You can share them with your friends.'],
    ['Students that lack of time should wait.', 'Their lack of time is a problem.'],
    ['I studied in Harvard for a year.', 'I studied at Harvard for a year.'],
    ['I applied for Princeton.', 'I applied for an exchange program.'],
    ['The workshop is in Monday.', 'The workshop is on Monday.'],
    ['We met at the morning.', 'We met in the morning.'],
    ['I will call you on next week.', 'Please submit it by next week.'],
    ['People is very busy.', 'People are very busy.'],
    ['Everyone have a phone.', 'Teachers let everyone have a say.'],
    ['This is more better.', 'This is much better.'],
    ['It was a very tremendous event.', 'It was a tremendous event.'],
    ['Engagement increased twice after my work.', 'Engagement doubled after my work.'],
    ['We sold food, drinks and etc.', 'We sold food, drinks, etc.'],
    ['AI is useful, however it can make students lazy.', 'The plan, however, failed.'],
    ['If students will cheat, projects fail.', 'If you would like more information, please write to me.'],
    ['Dear, Professor Lee', 'Dear Professor Lee,'],
    ['I found the post on instagram.', 'I found the post on Instagram.'],
    ['Because communication is key to success.', 'Because of the rain, we stayed home.'],
    ['Although it is cheap, but it is bad.', 'Although it is cheap, it is bad.'],
    ['Secondly, projects are practical.', 'First, exams are stressful. Secondly, projects are practical.'],
  ];
  pairs.forEach(([bad, good]) => {
    check(grammarIssues(bad).length > 0, `grammar: should flag “${bad}”`);
    check(grammarIssues(good).length === 0, `grammar: false positive on “${good}”: ${JSON.stringify(grammarIssues(good).map((i) => i.hint))}`);
  });

  // ---- Listen and Repeat ----
  const target = 'Students who miss a lab session need to contact the teaching assistant within two days.';
  check(scoreRepeat(target, target).score === 5, 'repeat: exact should be 5');
  check(scoreRepeat(target, 'Students who miss lab session need to contact teaching assistant within two days.').score === 4, 'repeat: two dropped articles should be 4');
  check(scoreRepeat(target, 'Students who miss a lab session need to contact the assistant within two days.').score <= 3, 'repeat: a missing content word should be at most 3');
  check(scoreRepeat(target, 'within two days').score <= 2, 'repeat: only the last words should be at most 2');

  // ---- Interview: slow, choppy, short (a real practice answer) vs a model answer ----
  const q = 'What can people learn from living in another country for a year?';
  const weak = 'I think people can learn a lot of things. They can learn the language and the culture. Also they become more independent because they live alone. It is very helpful for the future. People can make new friends and understand other people better. So living in another country is very useful.';
  const weakCap = { duration: 45, confidence: 0.93, timing: { span: 42.4, onset: 1.4, speech: 33, pauses: 6, longPauses: 2, longestPause: 2.7, pauseRatio: 0.22 } };
  const weakScore = scoreInterview(q, weak, weakCap);
  check(weakScore.overall <= 3, `interview: slow choppy answer without an example scored ${weakScore.overall}, expected ≤3`);
  const strong = 'I’d say the biggest thing people learn from living abroad is independence. The main reason is that you have to solve every problem yourself, often in another language, like renting an apartment or seeing a doctor. For example, my cousin spent a year in Korea, and at first she couldn’t even order food. By the end of the year, she was handling her visa and a part-time job on her own, which made her much more confident. So overall, living abroad shows you that you can manage far more than you expect.';
  const strongCap = { duration: 45, confidence: 0.94, timing: { span: 43, onset: 0.8, speech: 39, pauses: 5, longPauses: 0, longestPause: 0.9, pauseRatio: 0.1 } };
  const strongScore = scoreInterview(q, strong, strongCap);
  check(strongScore.overall >= 4, `interview: model answer scored ${strongScore.overall}, expected ≥4`);

  // ---- Discussion: a real 2–3 level response vs a model answer ----
  const arts = {
    professor: { name: 'Dr. Ruiz', text: 'Should governments use public money to support artists, theaters, musicians, and other cultural organizations?' },
    students: [
      { name: 'Ella', text: 'Yes. Art contributes to society and culture, but many valuable artistic projects would struggle to survive without public funding.' },
      { name: 'James', text: 'Tax money should primarily support essential services such as healthcare, education, and transportation. Art organizations should find private funding.' },
    ],
  };
  const learner = 'From my perspective, while funding the government should firstly concern vital areas like medicine and education. I agree with James, and I would add that healthcare, education, and transportation are more important than art that only makes infrastructure look better. Because tax money is limited, the government should spend it accurately and if some money is left, the government could invest it into art and other cultural organizations. Ella is right that artistic projects are struggling to survive without public funding, but people’s lives are more important than just the city\'s beauty. For instance, every person would save people’s lives instead of making a better look at infrastructure. Because medicine, education, and transportation services are most essential, the most developed countries such as Singapore or China are primarily funded by them. Therefore, the government should use public money first in the most valuable directions.';
  const learnerScore = scoreDiscussion(arts, learner);
  check(learnerScore.overall <= 3, `discussion: learner response scored ${learnerScore.overall}, expected ≤3`);
  const model = 'In my opinion, governments should fund essential services first and support the arts only with whatever remains, so I largely agree with James. I would add that public money for the arts often benefits a small audience, whereas a new clinic or bus route serves everyone in a city, including people who will never visit a theater. Ella is right that art contributes to culture, but culture does not disappear when the state stops paying for it: musicians and theaters can sell tickets, find sponsors, or crowdfund, while a hospital cannot. For example, Singapore spends heavily on public housing, healthcare, and transport and funds the arts through a relatively small national council, yet the city has both excellent public services and a lively cultural scene. Therefore, governments should treat the arts as a secondary priority, not as a competitor with essential services.';
  const modelScore = scoreDiscussion(arts, model);
  check(modelScore.overall >= 4, `discussion: model answer scored ${modelScore.overall}, expected ≥4`);

  // ---- Email: missing a required point caps the score ----
  const dorm = {
    scenario: 'Your dormitory will be closed for two days for maintenance, but you have an important exam during that period.',
    to: 'the dormitory manager', register: 'formal',
    goals: [
      { text: 'Explain your situation', keywords: ['exam'] },
      { text: 'Ask whether you can stay', keywords: ['stay'] },
      { text: 'Suggest another solution', keywords: ['another', 'alternatively', 'instead', 'temporarily'] },
    ],
  };
  const partial = 'Dear Ms. Johnson,\n\nI am writing about the closure of my dormitory next week. Unfortunately, I have my final mathematics exam on those days, and I need a quiet place to prepare for it. Moving all my books and notes would make it very difficult to study properly, and this exam is required for my summer internship.\n\nThank you for your time and understanding.\n\nBest regards,\nYersultan';
  check(scoreEmail(dorm, partial).overall <= 3, 'email: two missing points should cap the score at 3 or lower');
  return { weak: weakScore.overall, strong: strongScore.overall, learner: learnerScore.overall, model: modelScore.overall };
}
