# gen_bank.py — фабрика библиотеки заданий TOEFL 2026: генерация LLM + валидация + дедуп.
# Почему генерация, а не скрапинг: чужие вопросы (книги, сайты) = авторские права,
# сгенерированные = свои, можно продавать. Источник формата: официальная спецификация ETS 2026.
# ponytail: stdlib only, BYOK. Запуск: python tools/gen_bank.py --task speaking_interview --count 5
import argparse
import hashlib
import json
import os
import re
import sys
import time
import urllib.request

# ponytail: формулировки типов заданий сверить с официальным PDF toefl-ibt-test-specifications-2026.pdf
TASKS = {
    "speaking_interview": {
        "prompt": (
            "Create {n} original practice sets for the NEW TOEFL iBT (2026 format) Speaking task "
            "'Take an Interview'. Each set: one everyday or campus topic + 4 interview questions "
            "escalating from general to personal opinion, CEFR B1-C1. Return STRICT JSON: "
            '{"items":[{"topic":"...","questions":["...","...","...","..."]}]}'
        ),
    },
    "speaking_repeat": {
        "prompt": (
            "Create {n} original sentences for the NEW TOEFL iBT (2026 format) Speaking task "
            "'Listen and Repeat' (student hears a sentence, repeats it verbatim). Natural campus/"
            "daily-life sentences, 8-16 words, varied grammar (conditionals, passives, phrasal "
            "verbs, embedded clauses). Return STRICT JSON: "
            '{"items":[{"sentence":"..."}]}'
        ),
    },
    "writing_email": {
        "prompt": (
            "Create {n} original prompts for the NEW TOEFL iBT (2026 format) Writing task "
            "'Write an Email'. Each: a realistic campus/academic scenario, a recipient "
            "(professor, administrator, club), and 3 points the email must cover. "
            "Return STRICT JSON: "
            '{"items":[{"scenario":"...","recipient":"...","points":["...","...","..."]}]}'
        ),
    },
    "writing_sentence": {
        "prompt": (
            "Create {n} original sentences for the NEW TOEFL iBT (2026 format) Writing task "
            "'Build a Sentence' (student assembles a grammatical sentence from given words). "
            "Sentences 8-14 words, B1-C1 grammar variety, everyday academic-adjacent topics. "
            "Return STRICT JSON: "
            '{"items":[{"sentence":"..."}]}'
        ),
    },
}


def norm(s):
    return re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()


def item_key(item):
    # ponytail: дедуп по нормализованному тексту; нечёткое сходство (эмбеддинги) — если понадобится
    text = json.dumps(item, ensure_ascii=False, sort_keys=True)
    return hashlib.sha256(norm(text).encode()).hexdigest()[:16]


def extract_json(raw):
    m = re.search(r"\{[\s\S]*\}", raw)
    if not m:
        raise ValueError("модель вернула не-JSON")
    return json.loads(m.group(0))


def call_llm(key, provider, prompt, max_tokens=3000):
    if provider == "openai":
        req = urllib.request.Request(
            "https://api.openai.com/v1/chat/completions",
            data=json.dumps({
                "model": os.environ.get("TP_MODEL", "gpt-4o-mini"),  # дешевле: gpt-4.1-nano
                "messages": [{"role": "user", "content": prompt}],
                "response_format": {"type": "json_object"},
            }).encode(),
            headers={"content-type": "application/json", "authorization": "Bearer " + key},
        )
    else:
        req = urllib.request.Request(
            "https://api.anthropic.com/v1/messages",
            data=json.dumps({
                "model": "claude-haiku-4-5-20251001",
                "max_tokens": max_tokens,
                "messages": [{"role": "user", "content": prompt}],
            }).encode(),
            headers={
                "content-type": "application/json",
                "x-api-key": key,
                "anthropic-version": "2023-06-01",
            },
        )
    with urllib.request.urlopen(req, timeout=90) as r:
        j = json.load(r)
    if provider == "openai":
        return j["choices"][0]["message"]["content"]
    return "".join(b.get("text", "") for b in j["content"])


def validate_prompt(task, item):
    return (
        "You are validating a practice item for the NEW TOEFL iBT (2026 format), task type: "
        + task + ".\nItem JSON:\n" + json.dumps(item, ensure_ascii=False) + "\n"
        "Rate 1-10: is it answerable, unambiguous, level-appropriate (B1-C1), and original "
        "(safe for a paid product, no trademarked test content)? "
        'Return STRICT JSON: {"score":8,"issue":"short reason if score<8"}'
    )


def demo():
    """Самопроверка без API: python tools/gen_bank.py --demo"""
    sample = extract_json('some text {"items":[{"sentence":"Hello world."}]} tail')
    assert sample["items"][0]["sentence"] == "Hello world."
    a = {"sentence": "The library closes at nine."}
    b = {"sentence": "the  library   closes, at nine!"}
    assert item_key(a) == item_key(b), "дедуп должен нормализовать регистр/пунктуацию"
    assert item_key(a) != item_key({"sentence": "The library opens at nine."})
    print("demo OK: json-extract + нормализация дедупа работают")


def main():
    ap = argparse.ArgumentParser(description="Фабрика банка заданий TOEFL 2026")
    ap.add_argument("--task", choices=sorted(TASKS))
    ap.add_argument("--count", type=int, default=5)
    ap.add_argument("--provider", default=os.environ.get("TP_PROVIDER", "anthropic"))
    ap.add_argument("--key", default=os.environ.get("TP_KEY") or os.environ.get("ANTHROPIC_API_KEY") or os.environ.get("OPENAI_API_KEY"))
    ap.add_argument("--out", default=None)
    ap.add_argument("--min-score", type=int, default=8)
    ap.add_argument("--demo", action="store_true")
    a = ap.parse_args()

    if a.demo:
        demo()
        return
    if not a.task:
        ap.error("нужен --task (или --demo)")
    if not a.key:
        ap.error("нужен --key или env TP_KEY / ANTHROPIC_API_KEY / OPENAI_API_KEY")

    out = a.out or os.path.join("bank", a.task + ".jsonl")
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)

    seen = set()
    if os.path.exists(out):
        with open(out, encoding="utf-8") as f:
            for line in f:
                if line.strip():
                    seen.add(item_key(json.loads(line)))

    items = extract_json(call_llm(a.key, a.provider, TASKS[a.task]["prompt"].format(n=a.count)))["items"]
    kept, dropped = [], 0
    for it in items:
        k = item_key(it)
        if k in seen:
            dropped += 1
            continue
        v = extract_json(call_llm(a.key, a.provider, validate_prompt(a.task, it), max_tokens=200))
        if int(v.get("score", 0)) >= a.min_score:
            kept.append(it)
            seen.add(k)
        else:
            dropped += 1
        time.sleep(0.3)

    with open(out, "a", encoding="utf-8") as f:
        for it in kept:
            f.write(json.dumps(it, ensure_ascii=False) + "\n")
    print(f"сгенерировано {len(items)} | принято {len(kept)} | отброшено {dropped} | -> {out}")


if __name__ == "__main__":
    sys.exit(main())
