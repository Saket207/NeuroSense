"""
NeuroSense Demo Studio - Isolation Scanner Test
===============================================
Ensures that production modules have ZERO knowledge of demo scenarios,
scenario IDs, or persona names. Fails if any demo artifact or persona
leak is found in core screening, matching, scoring, or report generation.
"""

import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent

PRODUCTION_FILES_TO_CHECK = [
    REPO_ROOT / "backend" / "life_memory_matcher.py",
    REPO_ROOT / "backend" / "unified_scorer.py",
    REPO_ROOT / "backend" / "screening_engine.py",
    REPO_ROOT / "backend" / "audio_analyzer.py",
    REPO_ROOT / "backend" / "speech_features.py",
    REPO_ROOT / "src" / "services" / "report.ts",
]

FORBIDDEN_SCENARIO_IDS = [
    "lakshmi",
    "ramesh",
    "savitri",
    "abdul",
    "kamala",
    "narayan",
    "demo_lakshmi",
    "demo_ramesh",
    "demo_savitri",
    "demo_abdul",
    "demo_kamala",
    "demo_narayan",
]

FORBIDDEN_PERSONA_NAMES = [
    "Lakshmi",
    "Ramesh",
    "Savitri",
    "Abdul",
    "Kamala",
    "Narayan",
]


def test_production_modules_have_no_demo_knowledge():
    """Verify production modules contain no hardcoded persona names or scenario IDs."""
    violations = []

    for file_path in PRODUCTION_FILES_TO_CHECK:
        assert file_path.exists(), f"Production file not found: {file_path}"
        content = file_path.read_text(encoding="utf-8")

        for scenario_id in FORBIDDEN_SCENARIO_IDS:
            if scenario_id.lower() in content.lower():
                violations.append((file_path.name, scenario_id))

    if violations:
        print(f"[FAIL] Violations found: {violations}")
        raise AssertionError(f"Demo isolation violated! Found forbidden demo identifiers in production code: {violations}")
    
    print("[PASS] test_production_modules_have_no_demo_knowledge: Verified 0 demo identifiers in production codebase.")


if __name__ == "__main__":
    test_production_modules_have_no_demo_knowledge()
