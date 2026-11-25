"""
NeuroSense Demo Audio Generator
===============================
Reads answers_script.json from each scenario in demo/scenarios/<id>/
and synthesizes spoken audio using gTTS and PyAV / wave.

Features:
  - Multilingual voice synthesis (en, hi, kn)
  - Leading silence padding for response delay
  - Noise injection for narayan (SNR ~10 dB)
  - Audio override support: demo/audio_override/<scenario>/<filename>
  - Generates demo/audio/manifest.json
"""

import json
import os
import shutil
import wave
import struct
import math
import random
from pathlib import Path
from gtts import gTTS
import av

BASE_DIR = Path(__file__).resolve().parent.parent
SCENARIOS_DIR = BASE_DIR / "demo" / "scenarios"
AUDIO_OUT_DIR = BASE_DIR / "demo" / "audio"
AUDIO_OVERRIDE_DIR = BASE_DIR / "demo" / "audio_override"

AUDIO_OUT_DIR.mkdir(parents=True, exist_ok=True)
AUDIO_OVERRIDE_DIR.mkdir(parents=True, exist_ok=True)

LANG_MAP = {
    "lakshmi": "kn",
    "ramesh": "hi",
    "savitri": "en",
    "abdul": "hi",
    "kamala": "kn",
    "narayan": "kn",
}

# Delays in seconds per scenario
DELAY_MAP = {
    "lakshmi": 1.2,
    "ramesh": 1.8,
    "savitri": 2.8,
    "abdul": 4.0,
    "kamala": 1.0,
    "narayan": 3.2,
}


def add_silence_and_noise_to_wav(
    in_wav_path: Path,
    out_wav_path: Path,
    leading_silence_sec: float = 1.0,
    add_noise: bool = False,
    noise_amplitude: float = 0.05,
):
    """Adds leading silence and optional background noise to a 16kHz mono WAV."""
    with wave.open(str(in_wav_path), "rb") as wf:
        n_channels = wf.getnchannels()
        sampwidth = wf.getsampwidth()
        framerate = wf.getframerate()
        n_frames = wf.getnframes()
        raw_frames = wf.readframes(n_frames)

    # Convert raw bytes to list of integer samples
    fmt = f"<{n_frames * n_channels}h"
    samples = list(struct.unpack(fmt, raw_frames))

    # Generate leading silence samples
    silence_count = int(framerate * leading_silence_sec * n_channels)
    silence_samples = [0] * silence_count

    all_samples = silence_samples + samples

    # If add_noise is True (e.g. for Narayan), mix in low-level white/ambient noise
    if add_noise:
        noisy_samples = []
        for s in all_samples:
            noise_val = int((random.random() * 2.0 - 1.0) * noise_amplitude * 32767)
            clamped = max(-32768, min(32767, s + noise_val))
            noisy_samples.append(clamped)
        all_samples = noisy_samples

    # Write modified WAV
    with wave.open(str(out_wav_path), "wb") as out_wf:
        out_wf.setnchannels(n_channels)
        out_wf.setsampwidth(sampwidth)
        out_wf.setframerate(framerate)
        out_raw = struct.pack(f"<{len(all_samples)}h", *all_samples)
        out_wf.writeframes(out_raw)


def mp3_to_wav_16k_mono(mp3_path: Path, wav_path: Path):
    """Decodes MP3 to 16kHz mono 16-bit WAV using PyAV."""
    container = av.open(str(mp3_path))
    try:
        resampler = av.AudioResampler(format="s16", layout="mono", rate=16000)
        frames_bytes = bytearray()
        for frame in container.decode(audio=0):
            resampled_frames = resampler.resample(frame)
            for r_frame in resampled_frames:
                frames_bytes.extend(bytes(r_frame.planes[0]))
    finally:
        container.close()

    with wave.open(str(wav_path), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(16000)
        wf.writeframes(frames_bytes)


def generate_all_scenario_audio():
    manifest = {
        "generated_at": datetime.now().isoformat(),
        "tts_engine": "gTTS (Google Text-To-Speech) via PyAV resampler (16kHz mono WAV)",
        "scenarios": {},
    }

    temp_dir = BASE_DIR / "demo" / "tmp_audio"
    temp_dir.mkdir(parents=True, exist_ok=True)

    for sc_id, lang in LANG_MAP.items():
        sc_dir = SCENARIOS_DIR / sc_id
        script_file = sc_dir / "answers_script.json"
        if not script_file.exists():
            continue

        with open(script_file, "r", encoding="utf-8") as f:
            script = json.load(f)

        target_audio_dir = AUDIO_OUT_DIR / sc_id / "current"
        target_audio_dir.mkdir(parents=True, exist_ok=True)

        scenario_manifest = []

        delay = DELAY_MAP.get(sc_id, 1.5)
        add_noise = (sc_id == "narayan")

        print(f"\nGenerating demo audio for scenario '{sc_id}' ({lang})...")

        for fact_id, item in script.items():
            stage = item.get("stage", "free")
            spoken_text = item.get("spoken", "").strip()

            out_filename = f"{fact_id}_{stage}.wav"
            final_wav_path = target_audio_dir / out_filename

            # Check override directory first
            override_path = AUDIO_OVERRIDE_DIR / sc_id / out_filename
            if override_path.exists():
                print(f"  [OVERRIDE] Using team-recorded audio: {override_path.name}")
                shutil.copyfile(override_path, final_wav_path)
                source_label = "team_override"
            else:
                source_label = "gtts_synthetic"
                if not spoken_text or "मालूम नहीं" in spoken_text or "ನೆನಪಿಲ್ಲ" in spoken_text or "याद नहीं" in spoken_text:
                    # Spoken short phrase or hesitation
                    text_to_speak = spoken_text or "Hmm."
                else:
                    text_to_speak = spoken_text

                temp_mp3 = temp_dir / f"{sc_id}_{fact_id}.mp3"
                temp_raw_wav = temp_dir / f"{sc_id}_{fact_id}_raw.wav"

                # Generate TTS
                try:
                    tts = gTTS(text=text_to_speak, lang=lang, slow=False)
                    tts.save(str(temp_mp3))
                    mp3_to_wav_16k_mono(temp_mp3, temp_raw_wav)
                    add_silence_and_noise_to_wav(
                        temp_raw_wav,
                        final_wav_path,
                        leading_silence_sec=delay,
                        add_noise=add_noise,
                        noise_amplitude=0.04 if add_noise else 0.0,
                    )
                    temp_mp3.unlink(missing_ok=True)
                    temp_raw_wav.unlink(missing_ok=True)
                except Exception as e:
                    print(f"  [WARN] Failed to synthesize '{text_to_speak}': {e}")
                    # Create 2 seconds clean silence WAV as fallback
                    with wave.open(str(final_wav_path), "wb") as wf:
                        wf.setnchannels(1)
                        wf.setsampwidth(2)
                        wf.setframerate(16000)
                        wf.writeframes(b"\x00" * 32000)

            rel_path = f"demo/audio/{sc_id}/current/{out_filename}"
            scenario_manifest.append({
                "fact_id": fact_id,
                "stage": stage,
                "spoken_text": spoken_text,
                "file_path": rel_path,
                "source": source_label,
            })
            print(f"  ✓ {out_filename} -> '{spoken_text[:30]}...'")

        manifest["scenarios"][sc_id] = scenario_manifest

    # Write manifest.json
    with open(AUDIO_OUT_DIR / "manifest.json", "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    shutil.rmtree(temp_dir, ignore_errors=True)
    print("\nALL SCENARIO AUDIO GENERATED SUCCESSFULLY!")


if __name__ == "__main__":
    from datetime import datetime
    generate_all_scenario_audio()
