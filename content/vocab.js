// Flashcard vocabulary: original definitions and examples for this project.
// 6 decks, ~20 words each, covering the vocabulary that shows up across the
// 12 TOEFL task families (academic reading/listening plus campus-life and
// connector vocabulary useful for Writing and Speaking).

export const DECKS = [
  { id: 'academic-verbs', name: 'Academic verbs', blurb: 'Verbs that show up constantly in academic reading, lectures and your own writing.' },
  { id: 'academic-nouns', name: 'Academic nouns', blurb: 'Concepts common in research papers, lectures and Academic Discussion prompts.' },
  { id: 'science-nature', name: 'Science & nature', blurb: 'Vocabulary from biology, earth science and environmental reading passages.' },
  { id: 'society-history', name: 'Society & history', blurb: 'Terms from history, politics and social-science reading passages.' },
  { id: 'campus-life', name: 'Campus life', blurb: 'Everyday words from Read in Daily Life and campus Conversation listening tasks.' },
  { id: 'linking', name: 'Linking words', blurb: 'Connectors that make Writing and Speaking responses read as one coherent argument.' },
];

function slug(word) {
  return word.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function deck(id, pos, rows) {
  return rows.map(([word, def, ex, ru]) => ({ id: `${id}-${slug(word)}`, deck: id, word, pos, def, ex, ru }));
}

const academicVerbs = deck('academic-verbs', 'v.', [
  ['analyze', 'to examine something in detail to understand it', 'Researchers analyzed the survey data to find a pattern.', 'анализировать'],
  ['assume', 'to accept something as true without proof', 'The study assumes that all participants answered honestly.', 'предполагать'],
  ['derive', 'to obtain something from a source', 'The formula is derived from basic physics principles.', 'выводить, получать'],
  ['demonstrate', 'to show something clearly by giving proof', 'The experiment demonstrates that heat speeds up the reaction.', 'демонстрировать'],
  ['contradict', 'to say the opposite of, or conflict with', 'The new findings contradict the earlier theory.', 'противоречить'],
  ['emphasize', 'to give special importance to something', 'The professor emphasized the importance of citing sources.', 'подчёркивать'],
  ['illustrate', 'to make something clear by using an example', 'The graph illustrates how prices rose over a decade.', 'иллюстрировать'],
  ['indicate', 'to point out or show something', 'A rising temperature indicates that the reaction is exothermic.', 'указывать'],
  ['infer', 'to reach a conclusion based on evidence', 'From the data, we can infer that the drug is effective.', 'делать вывод'],
  ['interpret', 'to explain the meaning of something', 'Different scholars interpret the poem in very different ways.', 'истолковывать'],
  ['justify', 'to show that something is reasonable', 'The team must justify their conclusion with clear evidence from the experiment.', 'обосновывать'],
  ['mitigate', 'to make something less severe', 'New regulations aim to mitigate the effects of pollution.', 'смягчать'],
  ['obtain', 'to get something, especially through effort', 'Researchers obtained permission before starting the interviews.', 'получать'],
  ['persist', 'to continue to exist despite difficulty', 'The symptoms persisted even after treatment.', 'сохраняться, упорствовать'],
  ['reinforce', 'to strengthen or support something further', 'The second experiment reinforced the results of the first.', 'подкреплять'],
  ['resolve', 'to find a solution to a problem', 'The committee resolved the dispute after a long debate.', 'разрешать'],
  ['undermine', 'to weaken something gradually', 'Constant interruptions undermined the speaker’s argument.', 'подрывать'],
  ['validate', 'to confirm that something is correct', 'A second test validated the original findings.', 'подтверждать'],
  ['differentiate', 'to recognize a difference between things', 'The course teaches students to differentiate fact from opinion.', 'различать'],
  ['correlate', 'to have a mutual relationship with something', 'Higher education levels correlate with higher income.', 'коррелировать'],
]);

const academicNouns = deck('academic-nouns', 'n.', [
  ['hypothesis', 'an idea proposed as a basis for testing', 'The scientist tested her hypothesis in the lab.', 'гипотеза'],
  ['methodology', 'a system of methods used in a study', 'The paper explains the methodology used to collect data.', 'методология'],
  ['phenomenon', 'a fact or event that can be observed', 'Global warming is a phenomenon studied by climatologists.', 'явление'],
  ['variable', 'a factor that can change in an experiment', 'Temperature was the only variable the team controlled.', 'переменная'],
  ['criterion', 'a standard used to judge or decide something', 'Punctuality is one criterion for the award.', 'критерий'],
  ['framework', 'a basic structure underlying a system or theory', 'The report uses a theoretical framework from sociology.', 'структура, каркас'],
  ['paradigm', 'a typical example or accepted pattern of thinking', 'This discovery created a new paradigm in biology.', 'парадигма'],
  ['correlation', 'a mutual relationship between two or more things', 'There is a strong correlation between exercise and sleep quality.', 'взаимосвязь'],
  ['implication', 'a likely consequence of something', 'The findings have important implications for public policy.', 'следствие, вывод'],
  ['bias', 'a tendency to favor one view unfairly', 'The survey questions showed a clear bias.', 'предвзятость'],
  ['consensus', 'general agreement among a group', 'Scientists reached a consensus on the cause of the outbreak.', 'консенсус'],
  ['discrepancy', 'a difference between things that should match', 'There was a discrepancy between the two reports.', 'расхождение'],
  ['synthesis', 'the combination of ideas or parts to form a whole', 'Her essay is a synthesis of three different theories.', 'синтез'],
  ['premise', 'a statement that forms the basis of an argument', 'The argument’s premise turned out to be false.', 'предпосылка'],
  ['inference', 'a conclusion reached on the basis of evidence', 'The inference was based on limited data.', 'умозаключение'],
  ['controversy', 'public disagreement about a topic', 'The policy sparked controversy among voters.', 'спор, полемика'],
  ['mechanism', 'a process by which something happens', 'Scientists studied the mechanism behind muscle fatigue.', 'механизм'],
  ['anomaly', 'something that deviates from what is normal', 'The satellite detected an anomaly in the data.', 'аномалия'],
  ['cohort', 'a group of people sharing a common characteristic', 'The study followed a cohort of 500 students.', 'когорта'],
  ['trajectory', 'the path something follows as it develops over time', 'The report predicts the economy’s trajectory for the decade.', 'траектория'],
]);

const scienceNature = deck('science-nature', 'n.', [
  ['ecosystem', 'a community of organisms and their environment', 'Coral reefs are one of the richest ecosystems on Earth.', 'экосистема'],
  ['biodiversity', 'the variety of life found in a particular area', 'Rainforests contain an enormous amount of biodiversity.', 'биоразнообразие'],
  ['habitat', 'the natural home of an organism', 'Deforestation destroys the habitat of many species.', 'среда обитания'],
  ['extinction', 'the dying out of a species', 'Overhunting led to the extinction of the passenger pigeon.', 'вымирание'],
  ['evolution', 'gradual change in species over generations', 'Darwin’s theory of evolution explains how species adapt.', 'эволюция'],
  ['mutation', 'a change in an organism’s genetic material', 'A random mutation can sometimes give an organism an advantage.', 'мутация'],
  ['photosynthesis', 'the process plants use to make food from light', 'Photosynthesis converts sunlight into chemical energy.', 'фотосинтез'],
  ['metabolism', 'the chemical processes that maintain life in an organism', 'A faster metabolism burns calories more quickly.', 'обмен веществ'],
  ['molecule', 'the smallest unit of a chemical compound', 'Water is made of hydrogen and oxygen molecules.', 'молекула'],
  ['catalyst', 'a substance that speeds up a chemical reaction', 'Enzymes act as catalysts in digestion.', 'катализатор'],
  ['sediment', 'solid material deposited by water, ice or wind', 'Layers of sediment reveal the region’s geological history.', 'осадок, отложение'],
  ['erosion', 'the gradual wearing away of land by wind or water', 'Coastal erosion has removed several meters of beach.', 'эрозия'],
  ['tectonic', 'relating to the structure of the Earth’s crust', 'Tectonic plates shift slowly over millions of years.', 'тектонический'],
  ['precipitation', 'rain, snow or other water falling from clouds', 'The region receives little precipitation each year.', 'осадки'],
  ['drought', 'a long period of unusually low rainfall', 'The drought severely reduced the wheat harvest.', 'засуха'],
  ['glacier', 'a large mass of slowly moving ice', 'The glacier has retreated significantly over the past decade.', 'ледник'],
  ['emission', 'a substance released into the air', 'Factories must reduce their carbon emissions.', 'выброс'],
  ['conservation', 'the protection of the natural environment', 'The park was created for wildlife conservation.', 'охрана природы'],
  ['predator', 'an animal that hunts other animals for food', 'Wolves are the main predator in this forest.', 'хищник'],
  ['adaptation', 'a change that helps an organism survive in its environment', 'Thick fur is an adaptation to cold climates.', 'адаптация'],
]);

const societyHistory = deck('society-history', 'n.', [
  ['civilization', 'an advanced, organized human society', 'The Nile supported one of the earliest civilizations.', 'цивилизация'],
  ['colonization', 'the act of settling and controlling another territory', 'European colonization changed the map of the Americas.', 'колонизация'],
  ['revolution', 'a sudden, major change, often political', 'The industrial revolution transformed how goods were made.', 'революция'],
  ['monarchy', 'a system of government ruled by a king or queen', 'Britain remains a constitutional monarchy today.', 'монархия'],
  ['democracy', 'a system of government by the people', 'Ancient Athens is often called the birthplace of democracy.', 'демократия'],
  ['dynasty', 'a series of rulers from the same family', 'The Ming dynasty ruled China for nearly 300 years.', 'династия'],
  ['diplomacy', 'the management of relations between countries', 'The crisis was resolved through diplomacy, not war.', 'дипломатия'],
  ['treaty', 'a formal agreement between two or more states', 'The two countries signed a peace treaty.', 'договор'],
  ['sovereignty', 'the authority of a state to govern itself', 'The colony finally gained full sovereignty in 1960.', 'суверенитет'],
  ['artifact', 'an object made by humans, often of historical interest', 'Archaeologists found pottery artifacts at the site.', 'артефакт'],
  ['archaeology', 'the study of human history through excavation', 'Archaeology reveals how ancient people actually lived.', 'археология'],
  ['heritage', 'traditions and achievements passed down from the past', 'The old town is protected as a cultural heritage site.', 'наследие'],
  ['ideology', 'a set of political or social beliefs', 'The party’s ideology shaped its economic policy.', 'идеология'],
  ['propaganda', 'biased information used to influence opinion', 'The regime used propaganda to control public opinion.', 'пропаганда'],
  ['inequality', 'an unfair difference between groups', 'Income inequality has grown in many countries.', 'неравенство'],
  ['urbanization', 'the growth of cities as people move there', 'Rapid urbanization strained the city’s infrastructure.', 'урбанизация'],
  ['immigrant', 'a person who moves to live permanently in another country', 'Many immigrants arrived seeking better opportunities.', 'иммигрант'],
  ['refugee', 'a person forced to flee their country', 'The war created millions of refugees.', 'беженец'],
  ['activism', 'action taken to bring about social or political change', 'Student activism played a key role in the movement.', 'активизм'],
  ['industrialization', 'the development of industry on a large scale', 'Industrialization brought both jobs and pollution to the region.', 'индустриализация'],
]);

const campusLife = deck('campus-life', 'n.', [
  ['registrar', 'the university office that manages student records', 'You need to contact the registrar to change your major.', 'деканат / отдел регистрации'],
  ['transcript', 'an official record of a student’s grades', 'Send your transcript to the admissions office.', 'зачётная книжка / выписка оценок'],
  ['tuition', 'the fee charged for instruction at a school', 'Tuition at the university rose again this year.', 'плата за обучение'],
  ['scholarship', 'money awarded to support a student’s studies', 'She received a full scholarship to study engineering.', 'стипендия'],
  ['prerequisite', 'a course that must be completed before taking another', 'Calculus I is a prerequisite for this class.', 'обязательное условие / предмет'],
  ['syllabus', 'a document outlining a course’s content and rules', 'Check the syllabus for the exam date.', 'учебный план курса'],
  ['elective', 'an optional course a student may choose to take', 'She picked photography as her elective this term.', 'элективный курс'],
  ['dormitory', 'a building where students live on campus', 'Most first-year students live in a dormitory.', 'общежитие'],
  ['orientation', 'an introductory program for new students', 'Orientation week helps students find their way around campus.', 'вводный курс / ориентация'],
  ['advisor', 'a staff member who guides a student’s studies', 'Meet your advisor before registering for classes.', 'научный руководитель / куратор'],
  ['thesis', 'a long piece of research written to earn a degree', 'He is writing his thesis on renewable energy.', 'дипломная работа'],
  ['dissertation', 'a lengthy piece of research for an advanced degree', 'Her dissertation took three years to complete.', 'диссертация'],
  ['internship', 'temporary work experience related to one’s studies', 'The internship gave her real experience in the field.', 'стажировка'],
  ['faculty', 'the teaching staff of a university', 'The faculty voted to change the course requirements.', 'профессорско-преподавательский состав'],
  ['tutorial', 'a small class focused on discussion or practice', 'The tutorial helped clarify the lecture material.', 'семинар / практическое занятие'],
  ['plagiarism', 'presenting someone else’s work as your own', 'Plagiarism can lead to serious academic penalties.', 'плагиат'],
  ['citation', 'a reference to a source used in academic writing', 'Every quote needs a proper citation.', 'цитирование / ссылка'],
  ['waitlist', 'a list of people waiting for a spot to open up', 'She was on the waitlist for the popular seminar.', 'список ожидания'],
  ['semester', 'one of the two main terms of an academic year', 'Grades are posted at the end of each semester.', 'семестр'],
  ['alumni', 'former students of a school or university', 'Many alumni return each year for homecoming.', 'выпускники'],
]);

const linking = deck('linking', 'connector', [
  ['however', 'introducing a contrast with what was just said', 'The plan was well designed; however, it failed in practice.', 'однако'],
  ['nevertheless', 'despite what was just said, still', 'The results were disappointing; nevertheless, the team kept working.', 'тем не менее'],
  ['moreover', 'used to add a further point', 'The policy is expensive; moreover, it has proven ineffective.', 'более того'],
  ['furthermore', 'used to add another, often stronger, point', 'The data is incomplete. Furthermore, it was collected inconsistently.', 'кроме того'],
  ['consequently', 'as a result of what was just said', 'Sales dropped sharply; consequently, the store closed.', 'следовательно'],
  ['therefore', 'for that reason', 'The evidence is weak; therefore, the theory needs revision.', 'поэтому'],
  ['whereas', 'used to compare two facts that are different', 'City rent is high, whereas rural rent is much lower.', 'тогда как'],
  ['although', 'despite the fact that', 'Although the test was hard, most students passed.', 'хотя'],
  ['nonetheless', 'even so, despite what was just said', 'It rained all day; nonetheless, the event continued.', 'тем не менее'],
  ['meanwhile', 'at the same time as something else', 'The team ran tests; meanwhile, the client waited for updates.', 'тем временем'],
  ['subsequently', 'afterward, at a later time', 'He failed the first attempt but subsequently passed the exam.', 'впоследствии'],
  ['accordingly', 'in a way that fits or follows from the situation', 'Prices rose, and consumers adjusted their spending accordingly.', 'соответственно'],
  ['likewise', 'in the same way, similarly', 'The first study found no effect; likewise, the second confirmed it.', 'аналогично'],
  ['conversely', 'showing the opposite point of view', 'Rich soil produces high yields; conversely, poor soil produces little.', 'наоборот'],
  ['specifically', 'referring to one particular thing in more detail', 'The report focuses specifically on rural education.', 'в частности'],
  ['essentially', 'in the most basic or fundamental sense', 'The two theories are essentially the same.', 'по сути'],
  ['ultimately', 'in the end, after everything is considered', 'The negotiations were long but ultimately successful.', 'в конечном счёте'],
  ['admittedly', 'used to accept that something is true before adding a point', 'Admittedly, the method has some flaws.', 'по общему признанию'],
  ['arguably', 'used to say something can be reasonably argued', 'This is arguably the most important finding in the study.', 'можно утверждать'],
  ['in contrast', 'showing a clear difference between two things', 'Northern regions are cold; in contrast, the south stays warm year-round.', 'в противоположность'],
]);

export const VOCAB = [
  ...academicVerbs,
  ...academicNouns,
  ...scienceNature,
  ...societyHistory,
  ...campusLife,
  ...linking,
];
