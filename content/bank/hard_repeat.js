// Hard Repeat: overload training for Listen and Repeat. Every sentence is
// longer and more complex than the hardest (7th) sentence of a real set, so
// that the exam's sentences feel short afterwards. Original content.
// tools/validate.mjs checks that each sentence beats the longest 7th sentence.

export const HARD = [
  {
    id: 'hr-research-lab', scene: 'Graduate research lab', icon: '🔬',
    intro: 'A lab manager is explaining the rules to new research assistants.',
    sentences: [
      'Before you touch any of the equipment in this room, you need to complete the online safety training and show me your printed certificate.',
      'Samples stored in the large freezer must be labeled with your name, the date and the project number, or they will be thrown away.',
      'If an experiment has to run overnight, leave a note on the door explaining what is running and how someone can reach you in an emergency.',
      'The microscope on the left is booked almost every afternoon, so it is usually easier to reserve it early in the morning or late in the evening.',
      'Anyone who notices a strange smell, a leaking container or a broken piece of glass should report it immediately instead of trying to deal with it alone.',
      'Because our funding depends on accurate records, every measurement you take must be entered into the shared database before you leave the lab at the end of the day.',
      'At the end of each month, the whole team meets to compare results, discuss any problems with the equipment and decide which experiments should be repeated or stopped.',
    ],
  },
  {
    id: 'hr-registration', scene: 'Course registration rules', icon: '📝',
    intro: 'An academic adviser is explaining registration rules during orientation.',
    sentences: [
      'First-year students may register for no more than five courses, and at least one of them must be a writing course offered by the English department.',
      'Courses that are marked with a star in the online catalog require permission from the instructor, which you should request at least a week before registration opens.',
      'If a course you need is already full, add yourself to the waiting list, because places usually open up during the first two weeks of the semester.',
      'Students who drop a course after the third week will still see it on their transcript, although it will not affect their overall grade point average.',
      'Anyone planning to study abroad next year should meet with an adviser this semester to make sure that the courses they take overseas will count toward their degree.',
      'Please remember that the system closes at midnight on Friday, and it is extremely difficult to make changes after that, even if you have a very good reason.',
      'Students who receive financial aid must stay enrolled in at least four courses each semester, so dropping a class without checking with the financial aid office could reduce the support you receive.',
    ],
  },
  {
    id: 'hr-library-research', scene: 'Library research services', icon: '📚',
    intro: 'A research librarian is introducing the library’s services to graduate students.',
    sentences: [
      'Graduate students can borrow up to fifty books at a time, and the loan period is extended to a full semester instead of the usual three weeks.',
      'If a book or article you need is not in our collection, you can request it through interlibrary loan, and it usually arrives within five working days.',
      'Our librarians offer one-hour consultations for students who are starting a literature review and are not sure which databases are most relevant to their topic.',
      'The quiet reading room on the fourth floor is reserved for graduate students during exam periods, but you will need to scan your card at the entrance.',
      'Rare books and historical documents cannot leave the special collections room, although you are welcome to photograph most pages as long as you do not use a flash.',
      'We strongly recommend using a reference management program from the very beginning of your research, because organizing hundreds of sources at the last minute is extremely stressful.',
      'Every spring, the library runs a series of workshops on academic writing, research ethics and data visualization, and graduate students who attend at least three of them receive a certificate.',
    ],
  },
  {
    id: 'hr-field-trip', scene: 'Three-day field trip', icon: '🏞️',
    intro: 'A geography professor is explaining the plans for a three-day field trip.',
    sentences: [
      'The bus will leave from the parking lot behind the science building at exactly seven o’clock on Friday morning, so please arrive at least fifteen minutes early.',
      'Each student should bring a waterproof jacket, comfortable walking shoes and enough water for the whole day, because there are no shops near the research site.',
      'We will spend most of Saturday collecting soil samples along the river, and in the evening each group will present its first observations to the rest of the class.',
      'If the forecast predicts heavy rain, we will move the river work to Sunday and visit the regional museum instead, which has an excellent exhibition on local geology.',
      'Rooms at the field station are shared by four students, and you will need to bring your own sheets and towels, since the station does not provide them.',
      'Anyone with a medical condition or a food allergy should tell me before Wednesday, so that we can inform the staff at the field station and plan the meals accordingly.',
      'Your final report, which should combine your field notes, the laboratory results and at least five academic sources, will be due two weeks after we return to campus.',
    ],
  },
  {
    id: 'hr-scholarship', scene: 'Scholarship committee', icon: '🏅',
    intro: 'A committee member is explaining how scholarship applications are evaluated.',
    sentences: [
      'Every application is read by at least two members of the committee, who score it independently before meeting to discuss any major differences in their evaluations.',
      'Although grades are important, the committee also looks closely at leadership, community service and the personal statement, which should explain your goals in specific detail.',
      'Letters of recommendation are most helpful when they come from professors who have taught you recently and can describe concrete examples of your work.',
      'Applicants who are invited to an interview will receive an email about two weeks after the deadline, and interviews will take place either on campus or online.',
      'If your family’s financial situation changed significantly during the past year, you may include a short explanation, and the committee will take it into account when making its decision.',
      'Scholarship recipients are expected to maintain a minimum grade point average of three point zero and to take part in at least two university events each semester.',
      'Students who are not selected this year are strongly encouraged to apply again, because many of our current recipients were successful only on their second or even third attempt.',
    ],
  },
  {
    id: 'hr-conference', scene: 'Conference volunteer briefing', icon: '🎤',
    intro: 'An organizer is briefing student volunteers before an international conference.',
    sentences: [
      'More than four hundred researchers from thirty countries are expected to attend, so the registration desk will be extremely busy during the first two hours of the morning.',
      'Volunteers at the registration desk should check each participant’s name on the list, hand out a badge and a printed program, and point them toward the main hall.',
      'If a speaker cannot connect a laptop to the projector, call the technical team immediately using the radio, rather than trying to fix the problem yourself.',
      'Coffee breaks are scheduled between every two sessions, and volunteers are responsible for making sure that the tables are cleaned and refilled before the next break begins.',
      'Please do not enter a room once a presentation has started, unless the session chair asks for help or there is a problem with the equipment or the lighting.',
      'At the end of each day, all volunteers should meet briefly in the main office to report any problems, return their radios and receive their schedules for the following day.',
      'As a thank-you for your help, every volunteer will receive a certificate of participation, free access to all sessions and an invitation to the closing dinner on Saturday evening.',
    ],
  },
];
