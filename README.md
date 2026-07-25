# toeflprep

Подготовка к **новому TOEFL iBT (формат с 21 января 2026)** — адаптивный тест, шкала 1–6, новые типы заданий.

## Почему новый формат — это окно

ETS полностью поменял экзамен 21.01.2026: адаптивные Reading/Listening, новые задания (Complete the Words, Listen and Repeat, Take an Interview, Build a Sentence, Write an Email), шкала 1–6 вместо 0–120. Весь старый контент (книги, курсы 2023–2025) устарел — рынок подготовки строится заново.

## Что уже есть

Четыре режима под новый формат:

- **Take an Interview** (Speaking): банк вопросов → запись ответа голосом → LLM оценивает 1–6 как ратер ETS + band-6 образец
- **Listen and Repeat** (Speaking): TTS озвучивает предложение → повторяешь дословно → объективный скоринг (LCS слов, без LLM)
- **Write an Email** (Writing): сценарий + получатель + 3 пункта → LLM оценивает 1–6 + band-6 образец
- **Build a Sentence** (Writing): собираешь предложение из перемешанных слов → точная проверка

Банк заданий: фабрика `tools/gen_bank.py` (генерация → LLM-валидация → дедуп) + конвертер `tools/bank_to_js.py` в приложение. Провайдеры: GitHub Models и Gemini (бесплатно), DeepSeek, OpenAI, Anthropic.

## Запуск

```
python -m http.server 8000   # из корня репо
# открыть http://localhost:8000 в Chrome (микрофон требует localhost)
```

## Дорожная карта

- [x] Listen and Repeat (Speaking 2026)
- [x] Build a Sentence + Write an Email (Writing 2026)
- [ ] Complete the Words (Reading 2026) — сначала сверить механику задания со спецификацией ETS
- [ ] Read in Daily Life / Academic Passage (Reading 2026)
- [ ] Таймеры по официальным лимитам ETS (сверить со спецификацией)
