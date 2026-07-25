# bank_to_js.py — конвертер bank/*.jsonl -> bank/bank.js (window.TP_BANK)
# для статического приложения (script tag, работает и с file://, и с localhost).
# Запуск из корня toeflprep: python tools/bank_to_js.py
import glob
import json
import os

os.makedirs("bank", exist_ok=True)
out = {}
for path in sorted(glob.glob(os.path.join("bank", "*.jsonl"))):
    key = os.path.splitext(os.path.basename(path))[0]
    with open(path, encoding="utf-8") as f:
        out[key] = [json.loads(line) for line in f if line.strip()]

js = "window.TP_BANK = " + json.dumps(out, ensure_ascii=False) + ";\n"
with open(os.path.join("bank", "bank.js"), "w", encoding="utf-8") as f:
    f.write(js)

counts = {k: len(v) for k, v in out.items()}
print(counts if counts else "пусто: сначала сгенерируй банк через tools/gen_bank.py")
