// Writing course: modules of lessons (theory in Russian, exercises in English).
// Exercise types: gap (one ___), choice (4 options), fix (rewrite the sentence),
// order (Build-a-Sentence tiles, checked with isCorrect from src/tasks/writing.js).
// A lesson's exercise id is `${lesson.id}-${index}`, so append, don't reorder.

import diagnostic from './m0-diagnostic.js';
import sentence from './m1-sentence.js';
import articles from './m2-articles.js';
import prepositions from './m3-prepositions.js';
import punctuation from './m4-punctuation.js';
import verbs from './m5-verbs.js';
import bas from './m6-build-sentence.js';
import linking from './m7-linking.js';
import style from './m8-style.js';
import assembly from './m9-assembly.js';

export const COURSE = [diagnostic, sentence, articles, prepositions, punctuation, verbs, bas, linking, style, assembly];
export const PASS = 85;

export const LESSONS = COURSE.flatMap((m) => m.lessons.map((l) => ({ ...l, module: m.id })));
export const lessonById = (id) => LESSONS.find((l) => l.id === id);
export const exercises = (l) => l.exercises.map((ex, i) => ({ ...ex, id: `${l.id}-${i}`, lesson: l.id }));
export const ALL_EXERCISES = LESSONS.flatMap(exercises);
