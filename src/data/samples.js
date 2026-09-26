// Original annotated sample responses at different score levels. Written for
// this app to show how the rubric criteria separate adjacent scores.

export const SAMPLES = {
  writing_email: {
    prompt: {
      scenario: 'You borrowed a laptop from the university media center for a week. On the third day, the screen started flickering and now it does not turn on. You need a working computer to finish a group presentation due on Friday.',
      to: 'Media Center staff',
      goals: ['Explain what happened to the laptop', 'Say why you need a computer this week', 'Ask what you should do next'],
    },
    responses: [
      {
        score: 5,
        text: `Dear Media Center staff,

I am writing about the laptop I borrowed on Monday (tag ML-214). On Wednesday evening the screen began to flicker while I was editing slides, and yesterday it would not turn on at all, even after charging it overnight. I did not drop it or spill anything on it, so I suspect a hardware fault.

Unfortunately, the timing is difficult. My group is presenting in our marketing seminar on Friday morning, and I am responsible for the final version of the slides, which requires software that my own tablet cannot run.

Could you let me know whether I should bring the laptop in today for inspection, and whether a replacement might be available until Friday? I would also be grateful to know if I need to fill out a damage report.

Thank you for your help.
Best regards,
Daniel Ortiz`,
        notes: {
          elaboration: 'Every point is developed with specifics: dates, symptoms, what was tried, why a tablet will not work.',
          language: 'Varied structures (while-clause, “so I suspect”, embedded questions) and precise phrases such as “hardware fault”.',
          conventions: 'Clear purpose in line one, polite indirect requests, logical order, proper closing.',
          accuracy: 'No noticeable errors.',
        },
      },
      {
        score: 4,
        text: `Dear Media Center,

I borrowed a laptop from you this week. After three days the screen started flickering and now it does not turn on. I don't know why this happened because I used it carefully.

I really need a computer this week because I have a group presentation on Friday and I have to prepare the slides.

Can you tell me what I should do? Maybe you can give me another laptop. Please let me know soon.

Thank you,
Daniel`,
        notes: {
          elaboration: 'All three points are addressed, but with fewer supporting details (no dates, no reason the slides need this computer).',
          language: 'Clear but simpler sentences; a narrower range of vocabulary.',
          conventions: 'Appropriate and polite, though “Please let me know soon” is slightly abrupt for staff.',
          accuracy: 'Accurate.',
        },
      },
      {
        score: 3,
        text: `Hello,

The laptop i borrow is broken, the screen is flicker and now not turn on. I need computer because presentation is on friday. What I have to do? Please give me new one.

Thanks`,
        notes: {
          elaboration: 'The points are touched on but barely developed.',
          language: 'Limited range; mostly short, simple clauses.',
          conventions: 'The request is too direct for staff (“Please give me new one”).',
          accuracy: 'Noticeable errors in verb forms, articles and capitalization, though the message remains understandable.',
        },
      },
    ],
  },

  writing_discussion: {
    prompt: {
      course: 'education',
      professor: 'Many universities now record every lecture and post the videos online. Some people say this helps students learn, while others worry that attendance and engagement drop. Should universities record all lectures? Why or why not?',
      students: [
        { name: 'Priya', text: 'Yes. Recordings help students who get sick or have jobs, and anyone can rewatch a difficult explanation before an exam.' },
        { name: 'Marcus', text: 'I disagree. If everything is online, many students will stop coming, and class discussions will become empty.' },
      ],
    },
    responses: [
      {
        score: 5,
        text: `I think universities should record lectures, but only as a supplement rather than a replacement for attending class. Marcus is right that attendance may drop, yet I think the solution is to make class time more valuable instead of hiding the recordings. In my statistics course last year, the professor posted every lecture video but used the actual class for solving problems in small groups, which counted toward our grade. Almost nobody skipped, because the in-person sessions offered something the videos could not. At the same time, I used the recordings constantly to review the parts I had not understood, which is exactly the benefit Priya describes. So the real question is not whether to record lectures, but how to design classes so that recordings and attendance support each other.`,
        notes: {
          relevance: 'Clear, nuanced position; engages both classmates; a specific personal example with an explanation of why it works.',
          language: 'Concession (yet), relative clauses, contrast (rather than, not whether… but how); precise phrasing.',
          accuracy: 'No errors.',
        },
      },
      {
        score: 4,
        text: `I agree with Priya that universities should record lectures. Many students have part-time jobs or family responsibilities, so they cannot always come to class. For example, my cousin works in a restaurant in the evenings, and she often missed her 6 pm class. With recordings, she could still follow the course and pass her exams. Marcus says attendance will drop, but I think students who really want to learn will still come because they can ask questions in person. Therefore, recording lectures is more helpful than harmful.`,
        notes: {
          relevance: 'Relevant and supported with an example, but the example restates Priya’s idea rather than adding a new angle.',
          language: 'Some variety (so, because, but) with appropriate vocabulary; less precise than a 5.',
          accuracy: 'Few or no errors.',
        },
      },
      {
        score: 3,
        text: `In my opinion universities should record all lecture. Because it is very useful for students. Students can watch again and understand better. Also if student is sick he can watch video at home. Some people think attendance will drop but I think it is not big problem. So recording is good idea.`,
        notes: {
          relevance: 'Mostly relevant, but the reasons are general and repeat the classmates without a developed example.',
          language: 'Limited variety; many short, similar sentences; a fragment (“Because it is very useful…”).',
          accuracy: 'Noticeable errors with plurals and articles.',
        },
      },
    ],
  },

  speaking_interview: {
    prompt: { topic: 'Study habits', question: 'Some people prefer to study in a library, while others prefer to study at home. Which do you prefer, and why?' },
    responses: [
      {
        score: 5,
        text: 'I definitely prefer the library, mainly because it helps me separate studying from the rest of my life. At home there are always small distractions — my phone, my roommate, the kitchen — and I end up taking breaks every ten minutes. In the library, everyone around me is working, so I feel a kind of positive pressure to focus. For example, last semester I prepared for my chemistry final almost entirely in the library, and I finished the review two days earlier than I expected. That said, I still read lighter material at home in the evenings, when I just want to relax a bit.',
        notes: {
          development: 'Clear answer, reason, contrast, specific example and a nuance at the end.',
          fluency: 'A delivery like this at 140–150 words per minute with short pauses between ideas.',
          intelligibility: 'Stress falls naturally on key words (definitely, separate, focus).',
          language: 'Wide range: “end up”, “positive pressure”, “that said”.',
        },
      },
      {
        score: 3,
        text: 'I prefer, um, the library. Because in home I have many… many distraction. Like phone and, uh, my family. In library it is quiet and I can concentrate. Um… yes, I think library is better for study.',
        notes: {
          development: 'Answers the question with a reason, but elaboration is limited and there is no example.',
          fluency: 'Frequent fillers and hesitations make the pace choppy.',
          intelligibility: 'Understandable with some effort.',
          language: 'Limited range and errors (in home, many distraction).',
        },
      },
    ],
  },
};
