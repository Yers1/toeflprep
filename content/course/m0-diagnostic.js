// Module 0: diagnostic. 40 fresh items, 5 per module; `tag` = module id, so the
// result screen can show which modules are weakest. No theory, examples or words.

export default {
  id: 'diagnostic',
  title: 'Диагностика',
  blurb: 'Сначала 40 вопросов: курс покажет, какие темы у тебя слабые.',
  lessons: [
    {
      id: 'diag',
      title: 'Диагностический тест',
      why: '40 коротких вопросов, по 5 на каждый модуль курса. Не угадывай и не подглядывай в правила: честный результат покажет, с каких модулей начать, а какие можно пройти быстрее.',
      exercises: [
        // sentence
        { tag: 'sentence', type: 'choice', q: 'Choose the complete sentence.', choices: ['Because the library closes early on Fridays.', 'Which is a problem for many students.', 'The library closes early on Fridays, which is a problem for many students.', 'For example, the library on Fridays.'], answer: 2, why: 'Только здесь есть главное предложение (The library closes). Because…, Which… и For example + существительное — обрывки.' },
        { tag: 'sentence', type: 'choice', q: 'Choose the correctly punctuated sentence.', choices: ['The bus was late, I missed the first lecture.', 'The bus was late, so I missed the first lecture.', 'The bus was late I missed the first lecture.', 'The bus was late, therefore I missed the first lecture.'], answer: 1, why: 'Две полные части соединяются через , so. Одна запятая или «, therefore» без точки с запятой — comma splice.' },
        { tag: 'sentence', type: 'gap', q: 'The number of students who work part-time ___ growing every year. (is / are)', a: ['is'], why: 'Подлежащее — the number (одно число) → is.' },
        { tag: 'sentence', type: 'gap', q: '___ is important to sleep at least seven hours before an exam.', a: ['It'], why: 'В английском у предложения всегда есть подлежащее: «важно…» = It is important to…' },
        { tag: 'sentence', type: 'fix', q: 'Many students they prefer online classes.', a: ['Many students prefer online classes.'], why: 'Подлежащее уже есть (many students): второе подлежащее they не нужно.' },
        // articles
        { tag: 'articles', type: 'gap', q: 'It is ___ honor to receive this scholarship. (a / an)', a: ['an'], why: 'В honor буква h не читается → гласный звук → an.' },
        { tag: 'articles', type: 'gap', q: 'I need ___ information about the registration deadline. (a / some)', a: ['some', '—'], why: 'information неисчисляемое: a нельзя, some можно (или без артикля).' },
        { tag: 'articles', type: 'choice', q: 'Choose the correct sentence.', choices: ['The quality of food in the cafeteria has improved.', 'Quality of food in the cafeteria has improved.', 'A quality of food in the cafeteria has improved.', 'The qualities of food in the cafeteria has improved.'], answer: 0, why: 'of-фраза уточняет, о каком качестве речь → the quality of.' },
        { tag: 'articles', type: 'choice', q: 'Choose the correct sentence about people in general.', choices: ['The young people spend too much time online.', 'A young people spend too much time online.', 'Young peoples spend too much time online.', 'Young people spend too much time online.'], answer: 3, why: 'Люди вообще, множественное число → без артикля. people уже множественное: peoples здесь неверно.' },
        { tag: 'articles', type: 'fix', q: 'After university, I want to work in the Japan.', a: ['After university, I want to work in Japan.'], why: 'Названия стран — без артикля (исключения: the USA, the UK).' },
        // prepositions
        { tag: 'prepositions', type: 'choice', q: 'The essay is due ___ Friday.', choices: ['in', 'at', 'on', 'by the'], answer: 2, why: 'Дни недели — on: on Friday.' },
        { tag: 'prepositions', type: 'gap', q: 'I have lived in Astana ___ 2019.', a: ['since'], why: 'Точка начала с present perfect → since; for — с периодом (for five years).' },
        { tag: 'prepositions', type: 'gap', q: 'Success in this course depends ___ regular practice.', a: ['on', 'upon'], why: 'depend on — не «from», как в русском «зависит от».' },
        { tag: 'prepositions', type: 'choice', q: 'Choose the correct sentence.', choices: ['I am good in math, so I can help you.', 'I am good on math, so I can help you.', 'I am good for math, so I can help you.', 'I am good at math, so I can help you.'], answer: 3, why: 'good at + предмет или навык.' },
        { tag: 'prepositions', type: 'fix', q: 'I would like to discuss about the project with you.', a: ['I would like to discuss the project with you.'], why: 'discuss — без about: discuss something.' },
        // punctuation
        { tag: 'punctuation', type: 'choice', q: 'Choose the correct greeting.', choices: ['Dear, Professor Kim', 'Dear professor Kim:', 'Dear Professor Kim,', 'Dear, Professor, Kim'], answer: 2, why: 'После Dear запятой нет, Professor с заглавной, запятая после имени.' },
        { tag: 'punctuation', type: 'fix', q: 'However the deadline cannot be changed.', a: ['However, the deadline cannot be changed.'], why: 'После вводного However в начале предложения — запятая.' },
        { tag: 'punctuation', type: 'choice', q: 'Choose the correctly punctuated sentence.', choices: ['Astana which is the capital of Kazakhstan, has very cold winters.', 'Astana, which is the capital of Kazakhstan, has very cold winters.', 'Astana, that is the capital of Kazakhstan, has very cold winters.', 'Astana, which is the capital of Kazakhstan has very cold winters.'], answer: 1, why: 'Дополнительная информация с which выделяется запятыми с двух сторон; that после запятой не ставится.' },
        { tag: 'punctuation', type: 'fix', q: 'If it rains we will meet in the library.', a: ['If it rains, we will meet in the library.'], why: 'Если предложение начинается с if-части, после неё ставится запятая.' },
        { tag: 'punctuation', type: 'choice', q: 'Choose the correct sentence.', choices: ['I will see you on Monday in November.', 'I will see you on monday in november.', 'I will see you on Monday in november.', 'I Will See You On Monday In November.'], answer: 0, why: 'Дни недели и месяцы в английском — с заглавной, остальные слова — со строчной.' },
        // verbs
        { tag: 'verbs', type: 'choice', q: 'Choose the most polite request to a professor.', choices: ['I want you to check my draft.', 'Check my draft, please.', 'You will check my draft, right?', 'Could you check my draft?'], answer: 3, why: 'Вежливая просьба — вопрос с could. I want you to… и повелительное наклонение звучат как требование.' },
        { tag: 'verbs', type: 'choice', q: 'I ___ for the TOEFL since September.', choices: ['prepare', 'am preparing', 'have been preparing', 'prepared'], answer: 2, why: 'Действие началось в прошлом и продолжается (since September) → present perfect continuous.' },
        { tag: 'verbs', type: 'choice', q: 'Last week, the professor said that the exam ___ in Room 204 the next day.', choices: ['will be', 'would be', 'is', 'has been'], answer: 1, why: 'Согласование времён: said в прошлом, и «следующий день» уже прошёл → will становится would.' },
        { tag: 'verbs', type: 'gap', q: 'We decided ___ the meeting to Friday. (move)', a: ['to move'], why: 'decide + to + глагол.' },
        { tag: 'verbs', type: 'choice', q: 'The workshop ___ because the speaker was ill.', choices: ['cancelled', 'was cancelled', 'has cancelled', 'was cancel'], answer: 1, why: 'Воркшоп не отменял сам себя → пассив: was + V3 (cancelled).' },
        // bas
        { tag: 'bas', type: 'order', context: 'Ali: I just got back from the career fair.', tiles: ['Did', 'you', 'talk', 'to', 'any employers'], suffix: '?', distractor: 'talked', why: 'Прямой вопрос: Did + подлежащее + базовая форма (talk, не talked).' },
        { tag: 'bas', type: 'order', context: 'Professor: Do you have any questions about the assignment?', prefix: 'Yes. Could you tell me', tiles: ['when', 'the final', 'draft', 'is', 'due'], suffix: '?', distractor: 'does', why: 'Косвенный вопрос после Could you tell me — прямой порядок: when the final draft is due.' },
        { tag: 'bas', type: 'order', context: 'Mia: What did the coordinator want?', prefix: 'She', tiles: ['asked', 'us', 'whether', 'we', 'could', 'help', 'on Saturday'], alt: [['asked', 'us', 'on Saturday', 'whether', 'we', 'could', 'help']], suffix: '.', distractor: 'could we', why: 'Косвенная речь: asked us whether + подлежащее + глагол, без вопросительного порядка (could we).' },
        { tag: 'bas', type: 'order', context: 'Leo: Who is that woman by the door?', prefix: 'She is', tiles: ['the professor', 'who', 'taught', 'my', 'statistics class'], suffix: '.', distractor: 'she', why: 'В придаточном who уже заменяет подлежащее, второе she не нужно.' },
        { tag: 'bas', type: 'order', context: 'Sara: Are you going to the concert tonight?', prefix: 'I', tiles: ['would', 'go', 'if', 'I', 'did not have', 'an exam tomorrow'], suffix: '.', distractor: 'would not have', why: 'Нереальное условие: would — в главной части, в части с if — past simple (did not have).' },
        // linking
        { tag: 'linking', type: 'choice', q: 'The dorm is cheap. ___, it is far from campus.', choices: ['Although', 'However', 'Despite', 'Because'], answer: 1, why: 'Новое предложение с контрастом начинается с However + запятая. Although и despite не стоят отдельно с запятой.' },
        { tag: 'linking', type: 'gap', q: '___ the rain, the festival took place outside.', a: ['Despite', 'In spite of'], why: 'Перед существительным (the rain) — despite / in spite of; although требует подлежащего и глагола.' },
        { tag: 'linking', type: 'choice', q: 'Many students have part-time jobs. ___, my roommate works at a bookstore.', choices: ['Such as', 'Like', 'For example', 'As example'], answer: 2, why: 'Пример целым предложением → For example, …; such as и like ставятся перед существительным внутри предложения.' },
        { tag: 'linking', type: 'choice', q: 'The bus broke down; ___, I missed the lab.', choices: ['as a result', 'because', 'although', 'despite'], answer: 0, why: 'Следствие после точки с запятой → as a result, …' },
        { tag: 'linking', type: 'gap', q: '___ online classes are convenient, many students miss face-to-face discussions.', a: ['Although', 'Though', 'Even though', 'While'], why: 'Уступка с подлежащим и глаголом → although / though / even though / while.' },
        // style
        { tag: 'style', type: 'choice', q: 'Replace "very big" with one precise word: The new library is ___.', choices: ['very very big', 'enormous', 'very enormous', 'too big'], answer: 1, why: 'Точное слово вместо very + прилагательное: enormous. С enormous very не ставится; too big = «слишком большая».' },
        { tag: 'style', type: 'choice', q: 'Which sentence fits an academic discussion?', choices: ['Kids these days are glued to their phones, lol.', 'Teens are always on their phones and stuff.', 'Teenagers today spend a large part of their free time on their phones.', 'Phones are, like, super bad for teens.'], answer: 2, why: 'Нейтральный академический регистр без сленга (lol, and stuff, like, super).' },
        { tag: 'style', type: 'choice', q: 'Which claim is the most careful (hedged)?', choices: ["Homework always destroys children's interest in learning.", 'Homework never helps anyone.', 'Everybody knows that homework is useless.', "Too much homework may reduce some children's interest in learning."], answer: 3, why: 'Осторожная формулировка (may, some, too much) сильнее, чем always / never / everybody knows: её трудно опровергнуть.' },
        { tag: 'style', type: 'choice', q: 'Professor: Should universities require students to attend every class? Which first sentence states a position in your own words?', choices: ['I believe attendance should be optional for university students.', 'Should universities require students to attend every class? I think yes.', 'Universities should require students to attend every class or not.', 'This question is about attendance.'], answer: 0, why: 'Позиция своими словами (attendance, optional), а не копия вопроса профессора.' },
        { tag: 'style', type: 'choice', q: 'Combine into one natural sentence: "I have a part-time job. It is at a bookstore. It helps me pay my rent."', choices: ['I have a part-time job, it is at a bookstore, it helps me pay my rent.', 'My part-time job at a bookstore helps me pay my rent.', 'I have a part-time job and it is at a bookstore and it helps me pay my rent.', 'Part-time job at bookstore helps pay rent.'], answer: 1, why: 'Три коротких предложения сжаты в одно без повторов. Первый вариант — comma splice, третий — цепочка and, четвёртый — без артиклей.' },
      ],
    },
  ],
};
