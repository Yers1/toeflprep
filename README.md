# TOEFL Prep 2026

Independent browser-based practice for the TOEFL iBT format used from January 21, 2026.

Live app: https://toeflprep-omega.vercel.app

## Coverage

The app includes original practice material for all 12 task families described by ETS:

- Reading: Complete the Words, Read in Daily Life, Read an Academic Passage
- Listening: Listen and Choose a Response, Conversation, Announcement, Academic Talk
- Speaking: Listen and Repeat, Take an Interview
- Writing: Build a Sentence, Write an Email, Academic Discussion

It also includes:

- a local preparation dashboard and weakest-section recommendation
- objective answer explanations and task accuracy
- optional rubric-aligned AI feedback for free-form speaking and writing
- attempt history, streaks, target band, and JSON export
- an API-key option that defaults to the current browser tab instead of permanent storage
- responsive and keyboard-accessible layouts

## Scoring limits

This app does not issue or reproduce an official TOEFL score. The live test is adaptive and statistically equated. Objective sets report accuracy; free-form tasks use an approximate 0-5 rubric evaluation and a broad practice-band estimate. Only ETS can issue TOEFL scores.

## Run locally

```bash
npm start
# open http://localhost:8000
```

No installation step is required. The project uses vanilla HTML, CSS, and JavaScript.

## Validate

```bash
npm test
```

The validator checks JavaScript syntax, all 12 task panels, content answer keys, and DOM IDs referenced by the application.

## Optional AI feedback

Speaking and extended Writing can use one of these user-supplied providers:

- GitHub Models
- Google Gemini
- DeepSeek
- OpenAI
- Anthropic

Objective tasks work without any key. By default, a key is stored in `sessionStorage` and disappears when the browser tab closes. Permanent local storage is opt-in and should not be used on shared computers.

## Content policy

Practice questions in `content.js` are original. The project uses public ETS specifications to model task families, not copied ETS test questions.

TOEFL and TOEFL iBT are registered trademarks of ETS. This project is not affiliated with or endorsed by ETS.

## License

MIT
