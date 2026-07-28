# TOEFL iBT 2026 Prep

Independent practice app for the **new TOEFL iBT format (January 2026)** — adaptive test, 1–6 band scale, new task types.

## Why the new format matters

ETS changed the exam on 21 January 2026: adaptive Reading/Listening, new tasks (Complete the Words, Listen and Repeat, Take an Interview, Build a Sentence, Write an Email), and a 1–6 scale aligned to CEFR. Older prep content is built for the 0–120 scale and does not match the new tasks.

## Live app

https://toeflprep-omega.vercel.app

## What you can practice

| Task | Section | Official max points | Time limit |
|------|---------|---------------------|------------|
| Take an Interview | Speaking | 5 | 45 sec |
| Listen and Repeat | Speaking | 5 | 15 sec |
| Write an Email | Writing | 5 | 10 min |
| Build a Sentence | Writing | 1 | 2 min |
| Complete the Words | Reading | 1 | 1 min |

## How scoring works

1. **Raw points** are computed against official ETS max points per item.
2. **Band 1–6** is derived from the percentage of max points.
3. **CEFR level** and a **comparable 0–120 total score** are shown for context.
4. Speaking and writing responses are evaluated by an LLM acting as an ETS rater using official rubric dimensions.

This is not an official ETS score. Only ETS can issue official TOEFL scores.

## Run locally

```bash
python -m http.server 8000
# open http://localhost:8000
```

Speech recognition works best in Chrome at `localhost`.

## API key

Speaking and writing tasks need an LLM to evaluate free-form responses. Supported providers:

- GitHub Models (free with GitHub token)
- Google Gemini (free tier)
- DeepSeek
- OpenAI
- Anthropic (Claude)

Your key is stored only in the browser's `localStorage`.

## Generate more items

```bash
python tools/gen_bank.py --task speaking_interview --count 5 --key $YOUR_KEY
python tools/gen_bank.py --task reading_words --count 5 --key $YOUR_KEY
python tools/bank_to_js.py
```

The app falls back to a built-in bank if `bank/bank.js` is empty.

## Roadmap

- [x] Take an Interview (Speaking 2026) — ETS rater rubric
- [x] Listen and Repeat (Speaking 2026) — content + pronunciation dimensions
- [x] Write an Email (Writing 2026) — task achievement, organization, grammar, vocabulary
- [x] Build a Sentence (Writing 2026) — exact match
- [x] Complete the Words (Reading 2026) — exact match
- [x] Official 1–6 band scale with CEFR mapping
- [x] Section timers
- [x] Beautiful landing page and app UI
- [ ] Read in Daily Life / Academic Passage (Reading 2026)
- [ ] Listen and Choose a Response / Conversation / Announcement / Academic Talk (Listening 2026)
- [ ] Write for an Academic Discussion (Writing 2026)

## License

MIT
