import json
from pathlib import Path
from audio_analyzer import decode_and_inspect_audio


def main():
    target_file = Path(__file__).resolve().parent / "test_audio" / "case1_normal_speech_12s.webm"
    if not target_file.exists():
        target_file = Path(__file__).resolve().parent / "uploads" / "case1_normal_speech_12s.webm"
    if not target_file.exists():
        print(f"Error: Target file not found: {target_file}")
        return

    result = decode_and_inspect_audio(target_file, silence_threshold=0.01)
    result["file"] = target_file.name
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
