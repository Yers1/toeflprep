// Listen and Repeat scenes (7 sentences, increasing length) and interview
// sets (4 questions from personal to abstract). Original content.

export const repeat = [
  {
    id: 'lr-library', scene: 'Campus library orientation', icon: '📚',
    intro: 'A librarian is giving new students a tour of the main library.',
    sentences: [
      'Welcome to the main library.',
      'The quiet study area is upstairs.',
      'You can borrow up to twenty books at a time.',
      'Group study rooms must be reserved online in advance.',
      'Printers are located next to the stairs on every floor.',
      'If you need help finding a source, please ask at the research desk.',
      'Books that are returned late will result in a small fine for each day they are overdue.',
    ],
  },
  {
    id: 'lr-lab', scene: 'Chemistry lab safety briefing', icon: '🧪',
    intro: 'A lab instructor is explaining the rules before the first experiment.',
    sentences: [
      'Please put on your safety glasses.',
      'Food and drinks are not allowed in the lab.',
      'Always read the instructions before you begin.',
      'Tie back long hair and wear closed shoes at all times.',
      'The emergency shower is located beside the main entrance.',
      'Report any broken glass to me immediately instead of cleaning it up yourself.',
      'At the end of each session, you must wash your equipment and return it to the correct shelf.',
    ],
  },
  {
    id: 'lr-health', scene: 'Student health center', icon: '🩺',
    intro: 'A receptionist is helping a student at the campus health center.',
    sentences: [
      'Please fill out this form.',
      'Do you have your student card with you?',
      'The doctor will see you in about ten minutes.',
      'Walk-in appointments are available every morning until noon.',
      'Your insurance covers most basic visits and some medications.',
      'If your symptoms get worse over the weekend, you should call the nurse hotline.',
      'We recommend booking a follow-up appointment before you leave so you can get a convenient time.',
    ],
  },
  {
    id: 'lr-dorm', scene: 'Moving into the residence hall', icon: '🏠',
    intro: 'A resident assistant is welcoming students on move-in day.',
    sentences: [
      'Here is your room key.',
      'Laundry machines are in the basement.',
      'Quiet hours begin at ten on weeknights.',
      'Guests must sign in at the front desk when they arrive.',
      'Each floor has a shared kitchen that residents are expected to keep clean.',
      'If something in your room is broken, submit a repair request through the housing website.',
      'There will be a floor meeting on Thursday evening to discuss safety procedures and plan social events.',
    ],
  },
  {
    id: 'lr-museum', scene: 'Natural history museum tour', icon: '🦕',
    intro: 'A guide is leading a group of students through a museum.',
    sentences: [
      'Please stay with the group.',
      'This skeleton is over sixty million years old.',
      'Photography is allowed without a flash.',
      'The next room contains fossils that were discovered in the region.',
      'Scientists used these teeth to determine what the animal ate.',
      'The museum offers free guided tours for students on the first Friday of every month.',
      'Before you leave, visit the new exhibition on climate change, which opened on the second floor last week.',
    ],
  },
  {
    id: 'lr-career', scene: 'Career services office', icon: '💼',
    intro: 'An adviser is explaining the services of the career center.',
    sentences: [
      'Come in and have a seat.',
      'We can review your résumé this afternoon.',
      'The career fair takes place next month.',
      'Many companies recruit interns directly at the fair.',
      'You should prepare a short introduction about your skills and goals.',
      'Our office also organizes practice interviews with volunteers from local businesses.',
      'Students who attend at least two workshops receive a certificate that they can list on their applications.',
    ],
  },
  {
    id: 'lr-sports', scene: 'Recreation center', icon: '🏋️',
    intro: 'A staff member is showing a new member around the recreation center.',
    sentences: [
      'The pool opens at six.',
      'Lockers are available on a first-come basis.',
      'Fitness classes are included in your membership.',
      'You need to bring a towel if you plan to swim.',
      'The climbing wall can only be used after a short safety course.',
      'Equipment can be borrowed at the front desk as long as you show your card.',
      'During exam weeks, the center stays open until midnight so that students can exercise after studying.',
    ],
  },
  {
    id: 'lr-bookstore', scene: 'Campus bookstore', icon: '🛒',
    intro: 'A bookstore employee is helping students at the start of the semester.',
    sentences: [
      'Can I help you find something?',
      'Textbooks are sorted by department.',
      'Used copies are cheaper but sell out quickly.',
      'You can rent some books for the semester instead of buying them.',
      'Please keep your receipt in case you need to return an item.',
      'Online orders can be picked up at the counter near the main entrance.',
      'If your course changes during the first two weeks, you can return unused textbooks for a full refund.',
    ],
  },
];

export const interview = [
  {
    id: 'iv-technology-learning', topic: 'Technology and learning',
    intro: 'A researcher is interviewing students about how they use technology to learn.',
    questions: [
      'What kind of technology do you use most often for studying?',
      'Tell me about an app or website that has helped you learn something new.',
      'Some teachers ban phones in class. Do you think that is a good idea? Why or why not?',
      'In the future, do you think students will still need teachers in classrooms, or will technology replace them? Explain your view.',
    ],
  },
  {
    id: 'iv-work-life', topic: 'Work and part-time jobs',
    intro: 'A career counselor wants to learn about students’ experience with work.',
    questions: [
      'Have you ever had a part-time job or volunteered? What did you do?',
      'What skills do you think students can learn from working while they study?',
      'Some people say students should focus only on their studies. Do you agree? Why or why not?',
      'How do you think the way people work will change over the next twenty years?',
    ],
  },
  {
    id: 'iv-travel-culture', topic: 'Travel and culture',
    intro: 'A travel magazine is interviewing young people about travel.',
    questions: [
      'Describe a place you have visited that you would like to go back to.',
      'Do you prefer traveling with a detailed plan or deciding things as you go? Why?',
      'What can people learn from living in another country for a year?',
      'Some cities are limiting the number of tourists. Is this fair to travelers? Explain.',
    ],
  },
  {
    id: 'iv-environment', topic: 'The environment in daily life',
    intro: 'A student journalist is writing a story about environmental habits.',
    questions: [
      'What is one thing you do regularly to reduce waste or save energy?',
      'Is it easy or difficult to live in an environmentally friendly way where you live? Why?',
      'Who should be more responsible for protecting the environment: individuals or governments?',
      'Do you think new technology will solve climate change, or do people need to change their lifestyles? Explain.',
    ],
  },
  {
    id: 'iv-health', topic: 'Health and well-being',
    intro: 'A health center is surveying students about their well-being.',
    questions: [
      'How do you usually relax after a stressful day?',
      'Tell me about a habit that has made you healthier.',
      'Should universities require all students to take a physical education class? Why or why not?',
      'Many people now track their sleep and exercise with apps. Is this helpful or does it create more stress?',
    ],
  },
  {
    id: 'iv-city-life', topic: 'City and community',
    intro: 'A city planner is collecting opinions from young residents.',
    questions: [
      'What do you like most about the neighborhood where you live?',
      'If you could add one new public space to your town, what would it be and why?',
      'Some people prefer living in big cities, while others prefer small towns. Which do you prefer?',
      'Should cities reduce the number of cars in the center, even if it makes driving less convenient? Explain your view.',
    ],
  },
  {
    id: 'iv-money', topic: 'Personal finances',
    intro: 'A bank is interviewing students for a report on financial habits.',
    questions: [
      'Do you usually plan how you will spend your money each month?',
      'Tell me about something you saved money to buy. Was it worth it?',
      'Should schools teach students how to manage money? What should they teach?',
      'Many people now pay for everything with their phones. What are the advantages and disadvantages of a cashless society?',
    ],
  },
  {
    id: 'iv-reading-media', topic: 'Reading and media',
    intro: 'A librarian is researching students’ reading and media habits.',
    questions: [
      'What was the last book, article or podcast that you really enjoyed?',
      'Do you prefer reading on paper or on a screen? Why?',
      'How do you decide whether news you see online is reliable?',
      'Some people believe short videos are reducing our ability to concentrate. Do you agree? Explain.',
    ],
  },
  {
    id: 'iv-teamwork', topic: 'Teamwork and leadership',
    intro: 'A professor is interviewing students about group projects.',
    questions: [
      'Do you prefer working alone or in a team? Why?',
      'Describe a group project that went well. What made it successful?',
      'What should a team do when one member does not contribute?',
      'Are good leaders born with their skills, or can leadership be learned? Explain your opinion.',
    ],
  },
  {
    id: 'iv-food', topic: 'Food and cooking',
    intro: 'A campus dining service wants student feedback about food.',
    questions: [
      'What is a dish from your hometown that you would recommend to visitors?',
      'Do you cook for yourself? Why or why not?',
      'Should the university offer only healthy food in its cafeterias? Explain.',
      'Some experts say people should eat much less meat to protect the environment. What do you think?',
    ],
  },
];
