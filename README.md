# toeflprep

Подготовка к **новому TOEFL iBT (формат с 21 января 2026)** — адаптивный тест, шкала 1–6, новые типы заданий.

## Почему новый формат — это окно

ETS полностью поменял экзамен 21.01.2026: адаптивные Reading/Listening, новые задания (Complete the Words, Listen and Repeat, Take an Interview, Build a Sentence, Write an Email), шкала 1–6 вместо 0–120. Весь старый контент (книги, курсы 2023–2025) устарел — рынок подготовки строится заново.

## Что уже есть (MVP)

Speaking, задание **Take an Interview**: банк оригинальных вопросов по темам → записываешь ответ голосом (SpeechRecognition) → LLM оценивает по шкале 1–6 как ратер ETS (delivery / language use / topic development) + даёт band-6 образец → история прогресса локально.

## Запуск

Открыть `index.html` в Chrome (или `python -m http.server`). Нужен свой API-ключ Anthropic или OpenAI (BYOK, бэкенда нет).

## Дорожная карта

- [ ] Listen and Repeat (второй тип Speaking 2026)
- [ ] Build a Sentence + Write an Email (Writing 2026)
- [ ] Complete the Words (Reading 2026)
- [ ] Таймеры и лимиты как на экзамене (уточнить по официальной спецификации ETS)
