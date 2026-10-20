// Pattern checks for frequent learner errors (articles, prepositions, verb
// patterns, agreement, fragments, calques). The offline estimate cannot parse
// grammar, so these rules are tuned for precision over recall: each one
// targets a form that is almost always wrong in a TOEFL response.
// Every rule has a must-flag and a must-not-flag example in tools/validate.mjs.

const PLACES = 'kazakhstan|russia|china|japan|korea|germany|france|italy|spain|canada|mexico|brazil|india|turkey|egypt|australia|singapore|uzbekistan|kyrgyzstan|almaty|astana|moscow|london|paris|tokyo|seoul|beijing|berlin';
const PLATFORMS = 'instagram|youtube|facebook|tiktok|whatsapp';
const SCHOOLS = 'harvard|princeton|stanford|yale|oxford|cambridge|mit|columbia|berkeley';
const DAYS = 'monday|tuesday|wednesday|thursday|friday|saturday|sunday';
const MONTHS = 'january|february|april|june|july|august|september|october|november|december';
const EXTREME = 'tremendous|huge|enormous|essential|crucial|vital|unique|excellent|amazing|perfect|terrible|awful|fantastic|massive|gigantic';
const UNCOUNT = 'advice|information|knowledge|homework|equipment|feedback|research|progress';
// "a research project", "an information session": the noun is used as a modifier.
const COMPOUND = 'project|paper|assistant|question|center|centre|program|programme|report|form|session|desk|base|assignment|team|group|lab|area|method|methods|study|grant|position|loop|system|technology|sheet|meeting|survey|proposal|topic|tool|bar|page|class|course|interview';
// Not when the name modifies a noun ("the Moscow office", "the YouTube channel").
const NAME_END = '(?! (?:office|team|metro|subway|campus|branch|government|embassy|economy|market|airport|marathon|national|app|account|page|channel|post|feed|algorithm|story|stories|video|videos|profile|university|times|river|sea|region)\\b)';

const RULES = [
  // Articles
  [new RegExp(`\\bthe (${PLACES}|${PLATFORMS})\\b${NAME_END}`, 'gi'), 'No article before most country, city and platform names.'],
  [/\ba (?!one\b|once\b|one-|eu)[aeio][a-z]+/gi, 'Use “an” before a vowel sound.'],
  [/\ba (hour|hours|honest|honou?r)\b/gi, 'Use “an” before a silent h (an hour).'],
  [/\ban (universit\w*|unique|uniform|union|unit|universal|use|user|useful|usual|euro\w*|one)\b/gi, 'Use “a” before a “yu” or “w” sound (a university, a useful idea).'],
  [/\ban (?![A-Z]{2})(?!hour|honest|hono|heir|herb)[bcdfgjklmnpqrstvwxyz][a-z]+/g, 'Use “a” before a consonant sound.'],
  [/\b(informations|advices|knowledges|feedbacks|equipments|homeworks|furnitures)\b/gi, 'This noun is uncountable: no plural -s.'],
  [new RegExp(`\\ban? (${UNCOUNT})\\b(?! (${COMPOUND})\\b)`, 'gi'), 'Uncountable noun: no “a”. Use “some” or “a piece of”.'],
  [/\ba (long|big|great|huge|rich|tremendous) experience (in|of|as)\b/gi, 'Experience in a field is uncountable: “long experience”, “years of experience”.'],
  [/\bare most (important|essential|common|popular|effective|valuable|difficult)\b/gi, 'Superlatives need “the”: “are the most important”.'],
  // Prepositions and verb patterns
  [/\binvest(s|ed|ing)?( (it|them|money|time|this))? into\b/gi, 'invest in'],
  [/\bspen(d|ds|t|ding)( (it|them|money|the money|tax money))? accurately\b/gi, '“spend wisely” (“accurately” means “precisely”).'],
  [/\bdiscuss(es|ed|ing)? about\b/gi, '“discuss” takes no preposition.'],
  [/\bexplain(s|ed|ing)? (me|us)\b/gi, 'explain something to someone'],
  [/\bsuggest(s|ed)? (to (add|do|make|go|use|take|change|organize|create|buy|try|have|be|hold|start)|(you|him|her|them|us|me|your team) to)\b/gi, 'suggest + -ing, or suggest that someone do'],
  [/\bconsider(s|ed)? (myself|yourself|himself|herself|themselves|ourselves) as\b/gi, 'consider myself experienced (no “as”).'],
  [/\blook(s|ing)? forward to (hear|see|meet|work|receive|talk|get)\b/gi, 'look forward to + -ing (hearing).'],
  [/\bshare (us|me)\b/gi, 'share something with someone'],
  [/\b(I|we|they|you|students|people|who|(students|people) that) lack of\b/gi, '“lack” as a verb takes no “of”.'],
  [/\bdespite of\b/gi, 'despite (no “of”) or in spite of'],
  [new RegExp(`\\b(stud(y|ied|ying|ies)|work(s|ed|ing)?|teach(es|ing)?|taught) in (${SCHOOLS})\\b`, 'gi'), 'Study or work at a university.'],
  [new RegExp(`\\bappl(y|ied|ying|ies) for (${SCHOOLS})\\b`, 'gi'), 'apply to a university; apply for a job or program.'],
  [/\bappl(y|ied|ying|ies) for [A-Z]\w+ University\b/g, 'apply to a university; apply for a job or program.'],
  [new RegExp(`\\bin (${DAYS})\\b(?!['’])`, 'gi'), 'on Monday (days take “on”).'],
  [new RegExp(`\\bon (${MONTHS})\\b(?! \\d)`, 'gi'), 'in October (months take “in”; dates take “on”).'],
  [/\bat (the )?(morning|afternoon|evening)\b/gi, 'in the morning / afternoon / evening'],
  [/\b(on|in|at) (next|last) (week|month|year|semester|summer|winter|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b(?!['’])/gi, 'No preposition before next / last.'],
  [/\bin (the )?internet\b/gi, 'on the internet'],
  // Agreement and comparison
  [/\bpeople (is|was|has)\b/gi, '“people” is plural: people are / were / have.'],
  [/(?<!\b(let|lets|make|makes|made|help|helps|helped|have|has|had) )\b(everyone|everybody|somebody|someone|nobody|each student|every student) (have|are|were)\b/gi, 'everyone / each student takes a singular verb.'],
  [/\b(more|most) (better|worse|easier|faster|bigger|smaller|cheaper|harder|best|easiest|worst)\b/gi, 'Double comparative: “better”, not “more better”.'],
  [new RegExp(`\\bvery (${EXTREME})\\b`, 'gi'), 'Strong adjectives do not take “very”.'],
  // Calques and fixed phrases
  [/\b(increased|grew|rose) (twice|two times)\b/gi, 'If you mean ×2, say “doubled”.'],
  [/\band etc\b/gi, '“etc.” already means “and so on”.'],
  [/\b(for example|such as),? like\b/gi, '“for example” and “like” mean the same; use one.'],
  [/(^|[.!?]\s+)From (one|the other) side,/g, 'On the one hand / On the other hand'],
  [/\baccording to me\b/gi, 'In my opinion'],
  [/\bmost of people\b/gi, '“most people”'],
  [/\b(although|though)\b[^.!?]*,\s*but\b/gi, '“although” and “but” do not go together.'],
  // Sentence structure
  [/\w, (however|therefore|moreover|consequently|furthermore) (?!,)\w/gi, 'Two sentences joined by a comma: start a new sentence before “however” / “therefore”.'],
  [/(^|[.!?]\s+)If\b[^,.!?]{0,60}\b(will|won't|would|wouldn't)\b(?! like| be (possible|willing|able|kind|grateful))[^,.!?]{0,40},/g, 'No will / would in the if-clause: “If students do not cheat, …”.'],
  [/(^|[.!?]\s+)Me and my\b/g, '“My friends and I” as the subject.'],
  [/^\s*Dear,/gm, 'No comma after “Dear”: “Dear Professor Lee,”.'],
  [new RegExp(`\\b(${DAYS}|${MONTHS}|${PLATFORMS})\\b`, 'g'), 'Days, months and brand names start with a capital letter.'],
];

// Fragments: a sentence that is only a subordinate clause (Because…, Which…).
function fragments(text) {
  const out = [];
  const sents = String(text).replace(/\s+/g, ' ').match(/[^.!?]+[.!?]/g) || [];
  for (const s of sents) {
    const t = s.trim();
    if (/^Which\b/.test(t) && !/\?$/.test(t)) out.push(t);
    else if (/^(Because(?! of)|Although|Though|Even though|Whereas)\b/.test(t) && !t.includes(',')) out.push(t);
  }
  return out;
}

export function grammarIssues(text) {
  const t = String(text || '');
  const issues = [];
  for (const [re, hint] of RULES) {
    for (const m of t.matchAll(re)) issues.push({ type: 'grammar', sample: m[0].replace(/^[.!?]?\s+/, '').trim(), hint });
  }
  for (const f of fragments(t)) issues.push({ type: 'grammar', sample: f.slice(0, 50), hint: 'Sentence fragment: a “because / which / although” clause needs a main clause.' });
  if (/\bsecondly\b/i.test(t) && !/\b(first|firstly|first of all)\b/i.test(t)) issues.push({ type: 'grammar', sample: 'Secondly', hint: '“Secondly” without a “First”: use “Another reason is that…”.' });
  return issues;
}
