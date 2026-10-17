"""Pre-records every spoken prompt with Kokoro (Apache-2.0 neural TTS).

Usage:  npm run audio
Needs:  pip install kokoro-onnx soundfile, ffmpeg on PATH, and the model files
        kokoro-v1.0.onnx + voices-v1.0.bin from
        https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
        in ~/tts-models (or set KOKORO_DIR).

Only missing clips are generated; clips whose text left the content bank are
deleted, and audio/manifest.json lists what exists so the app knows which
texts have a recording (everything else falls back to browser TTS).
"""
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "audio"
VOICES = {"A": "af_heart", "B": "am_michael"}  # A = usually female, B = usually male
MODEL_DIR = Path(os.environ.get("KOKORO_DIR", Path.home() / "tts-models"))


def main(jobs_path):
    jobs = json.loads(Path(jobs_path).read_text(encoding="utf-8"))
    OUT.mkdir(exist_ok=True)
    todo = [j for j in jobs if not (OUT / f"{j['key']}.mp3").exists()]
    print(f"{len(jobs)} clips in content, {len(todo)} to generate", flush=True)

    if todo:
        import soundfile as sf
        from kokoro_onnx import Kokoro

        kokoro = Kokoro(str(MODEL_DIR / "kokoro-v1.0.onnx"), str(MODEL_DIR / "voices-v1.0.bin"))
        with tempfile.TemporaryDirectory() as tmp:
            wav = Path(tmp) / "clip.wav"
            for n, job in enumerate(todo, 1):
                samples, rate = kokoro.create(job["text"], voice=VOICES[job["role"]], speed=1.0, lang="en-us")
                sf.write(wav, samples, rate)
                subprocess.run(
                    ["ffmpeg", "-loglevel", "error", "-y", "-i", str(wav), "-ac", "1",
                     "-codec:a", "libmp3lame", "-b:a", "48k", str(OUT / f"{job['key']}.mp3")],
                    check=True,
                )
                if n % 25 == 0 or n == len(todo):
                    print(f"  {n}/{len(todo)}", flush=True)

    keys = {j["key"] for j in jobs}
    for f in OUT.glob("*.mp3"):
        if f.stem not in keys:
            f.unlink()
    clips = sorted(f.stem for f in OUT.glob("*.mp3"))
    (OUT / "manifest.json").write_text(json.dumps({"voices": VOICES, "clips": clips}), encoding="utf-8")
    print(f"manifest: {len(clips)} clips")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else str(ROOT / "tools" / "tts-jobs.json"))
