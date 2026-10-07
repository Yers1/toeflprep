// Writing lesson: the learner's recurring mistakes from 14 practice texts
// (6 emails, 8 academic discussions), with rules, rewrites and a final checklist.

import { html, mount, on } from '../core/ui.js';

const fix = ([bad, good, why]) => html`<li><del>${bad}</del><br><ins>${good}</ins>${why ? html`<br><span class="small muted">${why}</span>` : ''}</li>`;
const fixes = (rows) => html`<ul class="fixes">${rows.map(fix)}</ul>`;
const tagged = (rows) => html`<div class="card prose">${rows.map(([tag, text]) => html`<p>${tag ? html`<span class="tag">${tag}</span> ` : ''}${text}</p>`)}</div>`;

const TOC = [
  ['scoring', '1. Как оценивают'],
  ['email', '2. Email'],
  ['discussion', '3. Academic Discussion'],
  ['articles', '4. Артикли'],
  ['calques', '5. Кальки с русского'],
  ['grammar', '6. Грамматика'],
  ['check', '7. Проверка за 2 минуты'],
  ['homework', '8. Домашка'],
];

const EMAILS = [
  ['Dormitory closed', '3 / 3', 'Все пункты есть, но решение размыто: «run over to some free dormitory» (run over = переехать машиной).'],
  ['Cultural festival', '3 / 4', '✕ Нет вопроса про обязанности волонтёра. Опыт описан одной фразой.'],
  ['Recommendation letter', '4 / 4', 'Курс упомянут только в конце; причина подачи утонула в деталях (3–5%, 5 of 6 stages).'],
  ['Technical problem', '4 / 4', '≈230 слов, много лишнего; противоречие «morning, around 9pm».'],
  ['Cancelled workshop', '3 / 4', '✕ Не спросил про другие возможности. Вместо этого спросил причины отмены, которые никто не просил.'],
  ['Volunteering', '4 / 4', 'Пункты есть, но Guinness и YouTube-канал съели время и добавили ошибок.'],
];

const EMAIL_MODEL = [
  ['', 'Dear Ms. Carter,'],
  ['', 'I hope this email finds you well. I am writing about the career development workshop that was planned for next Friday.'],
  ['Пункт 1', 'I registered for the workshop because I hope to become a professional chef, and I was especially excited to meet the chefs from Japan. My friends and I had even prepared questions about the techniques they use in their restaurants.'],
  ['Пункт 2', 'That is why I was very disappointed to hear that the event had been cancelled. For students like us, it was a rare chance to talk to experts from the industry.'],
  ['Пункт 3', 'Could you let me know whether the workshop will be rescheduled? If so, I would be happy to help with the organization.'],
  ['Пункт 4', 'In the meantime, I would be grateful if you could tell me about any other opportunities to meet professionals, such as guest lectures or internship fairs.'],
  ['', 'Thank you for your time.'],
  ['', 'Best regards,'],
  ['', 'Yersultan'],
];

const DISCUSSION_MODEL = [
  ['Позиция', 'I believe governments should spend more resources on protecting traditional languages and cultural practices.'],
  ['Ответ студенту', 'I see why Student B thinks education and healthcare should come first, but communities usually cannot save a language on their own.'],
  ['Причина', 'The main reason is that a language can disappear within two or three generations once schools and the media stop using it.'],
  ['Пример', 'For example, in Kazakhstan many young people in big cities grew up speaking mostly Russian. In recent years, the government has funded Kazakh-language schools, TV shows and free online courses, and more young people now use Kazakh in everyday life.'],
  ['Объяснение', 'Individual families could never organize support on that scale. This shows that cultural preservation needs resources that only a government has.'],
  ['Вывод', 'Therefore, governments should treat traditional languages as a long-term investment, not a luxury.'],
];

const ARTICLE_ERRORS = [
  ['Some factories pollute the nature.', 'Some factories pollute nature. / …pollute the environment.', 'nature как понятие — без артикля. the environment — всегда с the.'],
  ['Companies require employees to have a long experience.', 'Companies require employees to have many years of experience.', 'experience = опыт — неисчисляемое: без a. an experience = случай, впечатление.'],
  ['someone who has a tremendous experience in that area', 'someone who has extensive experience in that area', 'То же: опыт без a. И tremendous тут не подходит.'],
  ['I faced a post that university is planning…', 'I came across a post saying that the university is planning…', 'Конкретный университет, твой → the.'],
  ['I am an undergraduate student from the Rice University.', 'I am an undergraduate student at Rice University.', 'Названия вида «X University» — без артикля. Но: the University of Toronto.'],
  ['people from the Kazakhstan', 'people from Kazakhstan', 'Страны без артикля. Исключения: the USA, the UK, the Netherlands.'],
  ['someone who studied in Harvard', 'someone who studied at Harvard', 'Учиться at; название — без артикля.'],
  ['university should not require students to attend every class', 'universities should not require students to attend every class', 'Исчисляемое в единственном числе не может стоять «голым»: a / the / my — или множественное число.'],
  ['when I was submitting my lab work on a second module of «Java Essentials» lesson', 'when I was submitting my lab work for the second module of the Java Essentials course', 'Порядковые числа (second, third) → the. Конкретный курс → the.'],
  ['Most of the people around the world are too dependent on AI.', 'Most people around the world are too dependent on AI.', 'most + существительное = «большинство вообще». most of the… — только про конкретную группу.'],
  ['to be number one in customer\'s choices', 'to become customers\' first choice', 'Покупатели вообще → customers (мн. ч.), апостроф после s.'],
];

const CALQUES = [
  ['I faced a post', 'I came across a post', 'face = столкнуться с проблемой'],
  ['applied the request to be a volunteer', 'applied to be a volunteer', 'apply to do / apply for something'],
  ['I am very curious to spend', 'I am eager to spend', 'curious = любопытно узнать'],
  ['this exam is too important', 'this exam is extremely important', 'too = «слишком», это минус'],
  ['run over to a dormitory', 'move to another dormitory', 'run over = переехать машиной'],
  ['increased twice', 'doubled', 'increased twice = выросло два раза подряд'],
  ['Nowadays, I am preparing', 'Currently, I am preparing', 'nowadays = «в наше время», про общество'],
  ['update the website', 'refresh the page', 'update = выпустить новую версию'],
  ['change the laptop', 'use a different laptop', 'change = переделать / поменять навсегда'],
  ['witnessed by Guinness Record', 'recognized by Guinness World Records', 'witness = быть свидетелем'],
  ['suggested great points of view', 'made valid points', 'make a point — устойчиво'],
  ['negative effect outwards the benefits', 'negative effects outweigh the benefits', 'outweigh = перевешивать'],
  ['by that they are killing animals', 'as a result, they are killing animals', '«тем самым» ≠ by that. Ты пишешь это в 4 текстах.'],
  ['very tremendous event', 'a major event', 'tremendous уже значит «огромный»; very не ставится. У тебя 4 раза за неделю.'],
  ['I am professional at it', 'I would consider myself experienced at it', 'professional = это твоя оплачиваемая работа'],
  ['people\'s brains are in low activity', 'people\'s brains are less active', 'Проще и естественнее'],
  ['share us the reasons', 'share the reasons with us', 'share something with someone'],
  ['From one side', 'On the one hand', 'Пара: On the one hand… On the other hand…'],
];

const GRAMMAR = [
  ['6.1 Условные предложения', 'В части с if никогда нет would.', [
    ['This situation would be okay if I wouldn\'t have an exam.', 'This situation would be fine if I didn\'t have an exam.', 'if + past simple, would + глагол (Unit 11).'],
    ['I will be so glad if you could accept my suggestion.', 'I would be very grateful if you could accept my suggestion.', 'Вежливая просьба: would…if you could.'],
  ]],
  ['6.2 Will → would после прошедшего', 'Если глагол-«рамка» в прошедшем (received, heard, said), будущее внутри становится would.', [
    ['I received an email that tomorrow my dormitory will be closed.', 'I received an email saying that my dormitory would be closed.', 'Unit 25 · Reporting.'],
    ['while hearing the news that the event will be canceled', 'when we heard that the event would be cancelled', 'И while → when: это один момент, а не процесс.'],
  ]],
  ['6.3 Времена', 'Событие закончилось → past simple. Длится до сих пор → present perfect.', [
    ['It is even witnessed by Guinness Record.', 'It was even recognized by Guinness World Records.', 'Хакатон уже прошёл → was.'],
    ['This is my third attempt, so this year I was preparing very seriously.', 'This is my third attempt, so this year I have been preparing very seriously.', 'Готовишься до сих пор → have been preparing.'],
    ['I was trying to update the website… I was even trying to change the laptop.', 'I tried refreshing the page… I even tried using a different laptop.', 'Законченные попытки → past simple, не continuous.'],
    ['how other chefs are cooking regular', 'how other chefs usually cook', 'Привычка → present simple + usually.'],
  ]],
  ['6.4 Согласование подлежащего и глагола', 'Найди подлежащее и проверь: одно или много?', [
    ['Higher taxes is the only way.', 'Higher taxes are the only way.', ''],
    ['It doesn\'t mean that this person does complete the tasks effectively.', 'It doesn\'t mean that this person completes tasks effectively.', 'does в утверждении — только для эмфазы.'],
    ['people\'s willings to leave the job', 'people\'s willingness to leave their jobs', 'willingness — существительное, без -s.'],
  ]],
  ['6.5 Модели глаголов', 'Глагол тянет за собой конкретную форму. Это Unit 23 — учи их парами.', [
    ['I suggest to your team to add some activities.', 'I suggest that your team add some activities. / I suggest adding some activities.', 'suggest + -ing / suggest that…; НИКОГДА suggest sb to do.'],
    ['I can help you out to organize these activities.', 'I can help you organize these activities.', 'help + somebody + глагол.'],
    ['I want to spend my summer holidays by helping with something valuable.', 'I want to spend my summer holidays helping with something valuable.', 'spend time + -ing, без by.'],
  ]],
  ['6.6 Заглавные и пунктуация', 'Твоё правило «месяцы с большой буквы» — расширяем.', [
    ['Dear, Dormitory Manager', 'Dear Dormitory Manager,', 'После Dear запятой нет; запятая после обращения.'],
    ['professor Ms.Sarah', 'Professor Johnson', 'Professor + фамилия, с заглавной; Professor и Ms. не сочетаются.'],
    ['instagram, youtube, Wifi, students B', 'Instagram, YouTube, Wi-Fi, Student B', 'Названия и «Student A/B» — с заглавной.'],
    ['In my opinion it\'s not necessary', 'In my opinion, it is not necessary', 'Запятая после вводных: In my opinion, / For example, / However,'],
  ]],
];

export default function lesson(outlet) {
  mount(outlet, html`
    <section class="page narrow lesson">
      <header class="page-head">
        <p class="eyebrow">Writing lesson</p>
        <h1>Твои ошибки во Writing и как их исправить</h1>
        <p class="lead">Разбор 14 твоих текстов (6 писем и 8 Academic Discussion). Твои фразы показаны <del>зачёркнутыми</del>, исправления — <ins>зелёным</ins>. Каждый раздел заканчивается правилом, которое надо применять на экзамене.</p>
      </header>

      <nav class="card" aria-label="Contents">
        <div class="row gap-s wrap">${TOC.map(([id, label]) => html`<a class="btn btn-ghost" href="#/lesson" data-jump="${id}">${label}</a>`)}</div>
      </nav>

      <section id="scoring" class="section-block">
        <h2>1. Как оценивают и где ты сейчас</h2>
        <div class="two-col">
          <div class="card"><h3>Write an Email · 7 минут</h3><p>0–5 баллов. Смотрят: все ли пункты закрыты и раскрыты деталями; точность и разнообразие слов; вежливость и тон; ошибки. 120–170 слов — достаточно.</p></div>
          <div class="card"><h3>Academic Discussion · 10 минут</h3><p>0–5 баллов. Смотрят: чёткая позиция, своя новая мысль, пример и объяснение; разнообразие языка; ошибки. 120–150 слов.</p></div>
        </div>
        <p>Моя оценка твоих текстов сейчас — <span class="chip chip-mid">≈ 3 / 5</span> в обоих заданиях. Это «partially successful»: задача в целом выполнена, но ошибки заметны и местами мешают. До 4 тебя отделяют не сложные слова, а <strong>пять привычек</strong>, которые повторяются почти в каждом тексте. Подробные критерии — на странице <a href="#/criteria">Scoring criteria</a>.</p>
      </section>

      <section id="email" class="section-block">
        <h2>2. Email</h2>
        <h3>Правило №1: закрой каждый пункт задания</h3>
        <p>Пропущенный пункт — самый быстрый способ потерять целый балл, даже если английский хороший. Вот что было в твоих письмах:</p>
        <div class="table-wrap"><table class="table">
          <thead><tr><th>Письмо</th><th>Пункты</th><th>Что не так</th></tr></thead>
          <tbody>${EMAILS.map(([t, n, note]) => html`<tr><td>${t}</td><td><span class="chip ${n[0] === n.at(-1) ? 'chip-good' : 'chip-low'}">${n}</span></td><td>${note}</td></tr>`)}</tbody>
        </table></div>
        <p class="notice"><strong>Как не пропускать:</strong> первые 30 секунд выпиши пункты задания в черновик строчками. Каждый пункт = свой абзац, в том же порядке, со словом из задания (responsibilities, alternative opportunities). Перед сдачей отметь каждый пункт галочкой.</p>

        <h3>Правило №2: каждое предложение должно работать на пункт</h3>
        <p>В твоих письмах много деталей, которые никто не спрашивал. Они съедают время, и именно в них больше всего ошибок:</p>
        <ul>
          <li>«The acceptance rate is very low, about 3-5%. Last week, I completed 5 out of 6 stages of the form.»</li>
          <li>«It is even witnessed by Guiness Record as one of the biggest AI agentic hackathons.»</li>
          <li>«If you have time, you can review my works on my youtube channel…»</li>
          <li>«Before this news, we even watched all the podcasts from these chefs on youtube… we bought some ingredients from different types of shops in the city…»</li>
        </ul>
        <p>Тест: закрой предложение пальцем. Если ни один пункт задания не пострадал — удаляй. Меньше текста = меньше ошибок.</p>

        <h3>Правило №3: скелет письма</h3>
        <div class="card prose">
          <p><strong>Dear Professor Lee,</strong> <span class="small muted">— без запятой после Dear; имя, если известно</span></p>
          <p><strong>I hope this email finds you well. I am writing to / about …</strong> <span class="small muted">— цель одним предложением</span></p>
          <p><span class="tag">Пункт 1</span> 2–3 предложения + одна конкретная деталь (дата, причина, пример)</p>
          <p><span class="tag">Пункт 2</span> 2–3 предложения + деталь</p>
          <p><span class="tag">Пункт 3</span> 2–3 предложения + деталь</p>
          <p><span class="tag">Просьба</span> Could you let me know whether…? / I would be grateful if you could…</p>
          <p><strong>Thank you for your time. I look forward to hearing from you.</strong></p>
          <p><strong>Best regards,<br>Yersultan</strong></p>
        </div>
        <p>Про «I apologize for disturbing you» в начале каждого письма: это не ошибка, но работа IT-поддержки и координатора — отвечать на письма. Извиняться не за что. «I hope this email finds you well» звучит естественнее.</p>

        <h3>Разбор: Cancelled University Event</h3>
        <p>Пункты задания: (1) почему тебе был интересен воркшоп; (2) разочарование; (3) перенесут ли; (4) другие возможности. У тебя пункт 4 пропущен, а ошибки сидят в лишних деталях:</p>
        ${fixes([
          ['how other chefs are cooking regular, for example the kind of techniques they usually use and etc.', 'how other chefs usually cook, for example, what techniques they use', 'Привычка → present simple. «and etc.» — двойное «и» (etc. уже значит «и так далее»).'],
          ['But, while hearing the news on our campus that the event will be canceled, we were all disappointed.', 'However, when we heard that the event had been cancelled, we were all very disappointed.', 'when — один момент; после прошедшего — had been / would.'],
          ['it took us all out of time and effort', 'it took us a lot of time and effort', ''],
          ['could you share us the reasons for canceling the event?', '(удалить: этого не спрашивали) → Could you tell me about other opportunities to meet professionals?', 'Вместо лишнего вопроса — недостающий пункт 4.'],
          ['let\'s do some surveys among the students', 'we could conduct a short survey among students', 'let\'s — слишком разговорно для организатора.'],
        ])}
        <p>Так это письмо выглядит на 5 (≈140 слов):</p>
        ${tagged(EMAIL_MODEL)}
      </section>

      <section id="discussion" class="section-block">
        <h2>3. Academic Discussion</h2>
        <p>Рейтер ждёт от тебя четыре вещи: <strong>позицию в первом предложении</strong>, <strong>точную ссылку на одного из студентов</strong>, <strong>свою новую мысль</strong> (не пересказ студента) и <strong>конкретный пример с объяснением</strong>. Вот где ты теряешь баллы.</p>

        <h3>Ошибка 1: начинаешь с «Nowadays» и пересказа темы</h3>
        <p>5 из 8 твоих ответов начинаются так. Рейтер уже знает тему, ему нужна твоя позиция.</p>
        ${fixes([
          ['Nowadays, because of globalization more countries are forgetting about cultural identity.', 'I believe governments should spend more resources on protecting traditional languages.', ''],
          ['Nowadays, some of the universities require students to attend every class. And this could affect the students academic performance.', 'I agree with Leo that university students should decide for themselves whether to attend class.', ''],
          ['The university cafeterias face problems with changing the food options, one part of students suggested offering cheaper meals…', 'In my opinion, the university should prioritize healthy food.', ''],
        ])}

        <h3>Ошибка 2: путаешь студентов</h3>
        <p>Cultural Preservation: ты написал «As student B shared, a country's identity is a country's freedom». Про идентичность говорил <strong>Student A</strong>, а Student B был за образование и медицину. Рейтер видит, что ты невнимательно прочитал задание.</p>
        <p class="notice"><strong>Как не путать:</strong> до начала письма выпиши в черновик: «A = культура важна, B = сначала медицина». По три слова на студента.</p>

        <h3>Ошибка 3: уходишь от темы</h3>
        <p>В том же ответе: «Other countries may attack their opponents by affecting the country's traditions…» и «we could track Korea's influence on technology and try to use it in our homeland». Вопрос был о том, тратить ли деньги на языки и традиции, а не о технологиях Кореи. За нерелевантную часть балл снижают.</p>
        <p>Environmental Protection: последнее предложение «Over time, even some companies are trying to be eco-friendly…» <strong>ослабляет</strong> твою позицию: если компании сами становятся экологичными, зачем налоги? Последнее предложение должно усиливать позицию, а не спорить с ней.</p>

        <h3>Ошибка 4: позиция плывёт</h3>
        <p>Career Choices: ты выбрал Student B (удовольствие от работы), потом написал «people generally work because of the salary, so they would work no matter how much they love it», а в выводе — «people should choose the job with a high salary and by their preferences». Это три разные позиции в одном тексте.</p>
        ${fixes([
          ['Overall, I think that people should choose the job with a high salary and by their preferences.', 'Although salary matters, I still believe personal satisfaction should come first.', 'Хочешь показать обе стороны — используй although: уступка + твоя позиция в одном предложении.'],
        ])}

        <h3>Ошибка 5: повторяешь студента вместо своей мысли</h3>
        <p>Cafeteria: твой главный довод («students need proper nutrition to stay energized») — это почти дословно Emma. Зато в середине у тебя есть <strong>своя</strong> мысль: если экономить на еде сейчас, потом потратишь больше на лечение. Это лучшее предложение текста, но оно спрятано и без примера. Сделай его главным и добавь пример.</p>

        <h3>Ошибка 6: слабый пример</h3>
        <p>Employee Promotions: «someone who studied in Harvard could complete the work in 8 hours, while someone who has a tremendous experience in that area completed it in 16 hours». Пример про образование, а спор про результаты; цифры выглядят выдуманными. Хороший пример отвечает на вопросы <strong>кто, где, что сделал, какой результат</strong>. Его можно придумать, но он должен быть правдоподобным:</p>
        ${fixes([
          ['For example, someone who studied in Harvard could complete the work in 8 hours…', 'For example, at my cousin\'s IT company, a junior developer automated the weekly reporting process and saved the team about ten hours a week. She was promoted ahead of colleagues with many more years of experience, and nobody complained because her results were obvious.', ''],
        ])}

        <h3>Шаблон: твой, но с ролями</h3>
        <p>Твой список «I believe → The main reason → For example → Moreover → Therefore» хороший. Добавь в него ответ студенту и объяснение примера: именно объяснение отличает 4 от 5.</p>
        <div class="table-wrap"><table class="table">
          <thead><tr><th>Шаг</th><th>Фраза</th><th>Предложений</th></tr></thead>
          <tbody>
            <tr><td>Позиция</td><td>I believe that… / In my opinion, …</td><td>1</td></tr>
            <tr><td>Ответ студенту</td><td>I see why Liam…, but… / Although Emma makes a fair point that…, …</td><td>1</td></tr>
            <tr><td>Причина</td><td>The main reason is that…</td><td>1–2</td></tr>
            <tr><td>Пример</td><td>For example, … (кто, где, что, результат)</td><td>2–3</td></tr>
            <tr><td>Объяснение</td><td>This shows that… / As a result, …</td><td>1</td></tr>
            <tr><td>Вывод</td><td>Therefore, … / For these reasons, …</td><td>1</td></tr>
          </tbody>
        </table></div>
        <p>Так Cultural Preservation выглядит на 5 (≈135 слов):</p>
        ${tagged(DISCUSSION_MODEL)}
      </section>

      <section id="articles" class="section-block">
        <h2>4. Артикли: алгоритм за 4 шага</h2>
        <p>В русском нет артиклей, поэтому угадывать бесполезно. Задай себе по порядку четыре вопроса про каждое существительное:</p>
        <div class="card prose">
          <p><span class="tag">1</span> <strong>Можно ли сказать «два …»?</strong> Нет (advice, information, experience-опыт, nature, research) → <em>никогда</em> a/an и никогда -s.</p>
          <p><span class="tag">2</span> <strong>Исчисляемое в единственном числе?</strong> → голым быть не может: нужен a/an, the, my, this или множественное число.</p>
          <p><span class="tag">3</span> <strong>Понятно, какой именно?</strong> Уже упоминали, единственный в своём роде, превосходная степень, порядковое число, уточнение через of / which → <strong>the</strong>.</p>
          <p><span class="tag">4</span> <strong>Говоришь вообще?</strong> Множественное число или неисчисляемое → <strong>ничего</strong>: Students need sleep. Technology changes fast.</p>
        </div>
        <p><strong>a или an</strong> — по звуку, а не по букве: an hour, an honest man, an IT department, но a university, a unique chance.</p>
        <p><strong>Названия:</strong> страны без артикля (Kazakhstan, Japan), но the USA, the UK. Harvard, Rice University — без, но the University of Toronto. Instagram, YouTube — без. Устойчивые: on the one hand, in the future, the environment, the internet, go to work, by bus.</p>
        <p><strong>Ловушки — неисчисляемые:</strong> advice, information, news, experience (опыт), research, knowledge, evidence, feedback, homework, equipment, furniture, progress, software, traffic.</p>
        <h3>Твои ошибки</h3>
        ${fixes(ARTICLE_ERRORS)}
        <p>У тебя есть и верные примеры: «Healthy food is one of the most significant sources of vitamins», «the deadline is the 9th of October». Значит правила ты чувствуешь, не хватает последнего прохода по тексту.</p>
        <p class="notice"><strong>Последняя минута:</strong> пройди текст, останавливаясь на каждом существительном, и задай 4 вопроса. Тренировка: колода <a href="#/flashcards?deck=articles">Articles</a>, теория — Destination Unit 21.</p>
      </section>

      <section id="calques" class="section-block">
        <h2>5. Кальки с русского</h2>
        <p>Ты думаешь по-русски и переводишь слово в слово. Грамматически похоже на правду, но носитель так не скажет. Рубрика за это снижает «precise, idiomatic word choice».</p>
        <div class="table-wrap"><table class="table">
          <thead><tr><th>Ты написал</th><th>Как правильно</th><th>Почему</th></tr></thead>
          <tbody>${CALQUES.map(([a, b, c]) => html`<tr><td><del>${a}</del></td><td><ins>${b}</ins></td><td class="small">${c}</td></tr>`)}</tbody>
        </table></div>
        <p class="notice"><strong>Правило:</strong> если не уверен в сочетании — используй простое слово, которое точно знаешь. «A major event» лучше, чем «a very tremendous event». Тренировка: колода <a href="#/flashcards?deck=phrases">Phrases RU → EN</a>.</p>
      </section>

      <section id="grammar" class="section-block">
        <h2>6. Грамматика, которая повторяется</h2>
        ${GRAMMAR.map(([title, rule, rows]) => html`<h3>${title}</h3><p>${rule}</p>${fixes(rows)}`)}
        <p class="notice">Все эти ошибки есть в колоде <a href="#/flashcards?deck=mistakes">Fix the mistake</a>: печатай исправленное предложение, пока не перестанешь ошибаться.</p>
      </section>

      <section id="check" class="section-block">
        <h2>7. Проверка за 2 минуты до конца</h2>
        <div class="two-col">
          <section class="card"><h3>Email</h3><ul class="checklist-list">
            <li>Каждый пункт задания = свой абзац</li>
            <li>Dear Professor Lee, … Best regards, Имя</li>
            <li>В просьбах would / could, а не will</li>
            <li>Нет предложений, которые не работают на пункт</li>
            <li>Проход по артиклям: каждое существительное</li>
            <li>Заглавные: месяцы, Instagram, Wi-Fi, Professor</li>
          </ul></section>
          <section class="card"><h3>Academic Discussion</h3><ul class="checklist-list">
            <li>Первое предложение = твоя позиция</li>
            <li>Правильный студент и его мысль</li>
            <li>Есть своя мысль, а не пересказ</li>
            <li>Пример: кто, где, что, результат + This shows that…</li>
            <li>Вывод = та же позиция</li>
            <li>Нет Nowadays, by that, tremendous, like</li>
          </ul></section>
        </div>
      </section>

      <section id="homework" class="section-block">
        <h2>8. Домашка</h2>
        <ol>
          <li>Перепиши письмо <strong>Organizing a Cultural Event</strong> по скелету: все 4 пункта, включая вопрос про обязанности волонтёра. Не больше 170 слов.</li>
          <li>Перепиши <strong>Employee Promotions</strong> по шаблону из раздела 3: позиция, ответ студенту, причина, новый пример, объяснение, вывод.</li>
          <li>Каждый день: колоды <a href="#/flashcards?deck=mistakes">Fix the mistake</a> и <a href="#/flashcards?deck=articles">Articles</a>.</li>
          <li>Каждый день на таймере: одно <a href="#/practice/writing_email">Email</a> и одно <a href="#/practice/writing_discussion">Academic Discussion</a>, затем проверка по чек-листу из раздела 7.</li>
        </ol>
      </section>
    </section>`);

  on(outlet, 'click', '[data-jump]', (e, a) => {
    e.preventDefault();
    outlet.querySelector(`#${a.dataset.jump}`)?.scrollIntoView();
  });
}
