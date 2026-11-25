"""
NeuroSense Demo Studio - Historical Earlier Session Seeder
==========================================================
Runs realistic earlier answer sets through the actual scoring engine
(life_memory_matcher and unified_scorer) to produce authentic, verified
historical sessions for Savitri and Lakshmi.
"""

import json
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

# Add backend directory to sys.path so we can import production scoring modules
REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT / "backend"))

from life_memory_matcher import compute_life_memory_score, score_life_fact_answer
from unified_scorer import (
    compute_informant_concern_score,
    compute_unified_screening_score,
)


def seed_savitri_history():
    savitri_dir = REPO_ROOT / "demo" / "scenarios" / "savitri"
    profile_path = savitri_dir / "profile.json"
    with open(profile_path, "r", encoding="utf-8") as f:
        profile = json.load(f)

    facts = profile["lifeFacts"]
    informant_items = profile.get("dailyLifeQuestionnaire", [])

    # Session 1: ~6 months ago (approx 180 days ago) - High baseline performance
    now = datetime.now(timezone.utc)
    t_minus_6m = (now - timedelta(days=180)).isoformat()
    answers_6m = [
        {"fact_id": "fact_1", "stage": "free", "answer": "Deepa, my daughter"},
        {"fact_id": "fact_2", "stage": "free", "answer": "Karan, my grandson"},
        {"fact_id": "fact_3", "stage": "free", "answer": "Madhavan, my late husband"},
        {"fact_id": "fact_4", "stage": "free", "answer": "Kottayam in Kerala"},
        {"fact_id": "fact_5", "stage": "free", "answer": "1972"},
        {"fact_id": "fact_6", "stage": "free", "answer": "Nurse at General Hospital"},
        {"fact_id": "fact_7", "stage": "free", "answer": "Appam and vegetable stew"},
        {"fact_id": "fact_8", "stage": "free", "answer": "Onam festival"},
        {"fact_id": "fact_9", "stage": "cued", "answer": "Mary, my neighbor"},
        {"fact_id": "fact_10", "stage": "free", "answer": "St Jude Church"},
        {"fact_id": "fact_recent_1", "stage": "free", "answer": "Sunil visited us"},
        {"fact_id": "fact_recent_2", "stage": "free", "answer": "Lalbagh botanical garden"},
    ]

    scored_evals_6m = []
    fact_map = {f["id"]: f for f in facts}
    for a in answers_6m:
        fact = fact_map[a["fact_id"]]
        eval_res = score_life_fact_answer(
            transcript=a["answer"],
            target_answer=fact.get("verifiedAnswer") or fact.get("primaryFact", ""),
            aliases=fact.get("acceptedAliases") or fact.get("acceptableAliases", []),
            stage=a["stage"],
            distractors=fact.get("distractors", []),
            fact_type="year" if fact.get("factKey") == "wedding_year" else None,
            lang="en",
            latency_ms=1800,
        )
        scored_evals_6m.append({
            "fact_id": fact["id"],
            "category": "recent" if fact.get("isRecentEvent") else "remote",
            "is_recent_event": bool(fact.get("isRecentEvent")),
            "credit": eval_res.credit,
            "match_layer": eval_res.match_type,
            "retrieval_stage": a["stage"],
            "latency_ms": 1800,
        })

    lm_6m = compute_life_memory_score(scored_evals_6m)

    # Mild informant items 6m ago
    inf_items_6m = [
        {"domain": item["domain"], "frequency": "never" if i % 2 == 0 else "rarely", "onset": "under_6m"}
        for i, item in enumerate(informant_items)
    ]
    inf_6m = compute_informant_concern_score(inf_items_6m, contact_frequency="several_per_week")

    csi_6m = compute_unified_screening_score(
        life_memory_score=lm_6m["score"],
        informant_score=inf_6m["score"],
        schooling_years=profile["elderProfile"].get("schoolingYears", 12),
        confounders=profile.get("confounders"),
        informant_details=inf_6m,
        life_memory_details=lm_6m,
    )

    session_6m = {
        "id": "session_savitri_6m_ago",
        "patientId": profile["patientId"],
        "patientName": profile["elderProfile"]["fullName"],
        "createdAt": t_minus_6m,
        "isDemo": True,
        "tag": "Earlier session (demo, backdated)",
        "csi": csi_6m.csi,
        "riskTier": csi_6m.risk_tier,
        "tierLabel": csi_6m.tier_label,
        "confidence": csi_6m.confidence,
        "lifeMemoryScore": lm_6m["score"],
        "informantScore": inf_6m["score"],
        "components": csi_6m.components,
        "weightsUsed": csi_6m.weights_used,
        "topDrivers": csi_6m.top_drivers,
        "answers": answers_6m,
    }

    # Session 2: ~3 months ago (approx 90 days ago) - Mild decline beginning
    t_minus_3m = (now - timedelta(days=90)).isoformat()
    answers_3m = [
        {"fact_id": "fact_1", "stage": "free", "answer": "Deepa"},
        {"fact_id": "fact_2", "stage": "free", "answer": "Karan"},
        {"fact_id": "fact_3", "stage": "free", "answer": "Madhavan"},
        {"fact_id": "fact_4", "stage": "free", "answer": "Kottayam"},
        {"fact_id": "fact_5", "stage": "cued", "answer": "1972"},
        {"fact_id": "fact_6", "stage": "cued", "answer": "Nurse"},
        {"fact_id": "fact_7", "stage": "free", "answer": "Appam"},
        {"fact_id": "fact_8", "stage": "cued", "answer": "Onam"},
        {"fact_id": "fact_9", "stage": "cued", "answer": "Mary"},
        {"fact_id": "fact_10", "stage": "free", "answer": "St Jude Church"},
        {"fact_id": "fact_recent_1", "stage": "cued", "answer": "Sunil"},
        {"fact_id": "fact_recent_2", "stage": "recognition", "answer": "Lalbagh"},
    ]

    scored_evals_3m = []
    for a in answers_3m:
        fact = fact_map[a["fact_id"]]
        eval_res = score_life_fact_answer(
            transcript=a["answer"],
            target_answer=fact.get("verifiedAnswer") or fact.get("primaryFact", ""),
            aliases=fact.get("acceptedAliases") or fact.get("acceptableAliases", []),
            stage=a["stage"],
            distractors=fact.get("distractors", []),
            fact_type="year" if fact.get("factKey") == "wedding_year" else None,
            lang="en",
            latency_ms=2600,
        )
        scored_evals_3m.append({
            "fact_id": fact["id"],
            "category": "recent" if fact.get("isRecentEvent") else "remote",
            "is_recent_event": bool(fact.get("isRecentEvent")),
            "credit": eval_res.credit,
            "match_layer": eval_res.match_type,
            "retrieval_stage": a["stage"],
            "latency_ms": 2600,
        })

    lm_3m = compute_life_memory_score(scored_evals_3m)

    inf_items_3m = [
        {
            "domain": item["domain"],
            "frequency": "rarely" if i % 2 == 0 else "sometimes",
            "onset": "under_6m",
        }
        for i, item in enumerate(informant_items)
    ]
    inf_3m = compute_informant_concern_score(inf_items_3m, contact_frequency="several_per_week")

    csi_3m = compute_unified_screening_score(
        life_memory_score=lm_3m["score"],
        informant_score=inf_3m["score"],
        schooling_years=profile["elderProfile"].get("schoolingYears", 12),
        confounders=profile.get("confounders"),
        informant_details=inf_3m,
        life_memory_details=lm_3m,
    )

    session_3m = {
        "id": "session_savitri_3m_ago",
        "patientId": profile["patientId"],
        "patientName": profile["elderProfile"]["fullName"],
        "createdAt": t_minus_3m,
        "isDemo": True,
        "tag": "Earlier session (demo, backdated)",
        "csi": csi_3m.csi,
        "riskTier": csi_3m.risk_tier,
        "tierLabel": csi_3m.tier_label,
        "confidence": csi_3m.confidence,
        "lifeMemoryScore": lm_3m["score"],
        "informantScore": inf_3m["score"],
        "components": csi_3m.components,
        "weightsUsed": csi_3m.weights_used,
        "topDrivers": csi_3m.top_drivers,
        "answers": answers_3m,
    }

    history_dir = savitri_dir / "history"
    history_dir.mkdir(parents=True, exist_ok=True)
    with open(history_dir / "sessions.json", "w", encoding="utf-8") as f:
        json.dump([session_6m, session_3m], f, indent=2)

    print(f"Savitri history generated: 6m ago CSI={csi_6m.csi:.1f} ({csi_6m.risk_tier}), 3m ago CSI={csi_3m.csi:.1f} ({csi_3m.risk_tier})")


def seed_lakshmi_history():
    lakshmi_dir = REPO_ROOT / "demo" / "scenarios" / "lakshmi"
    profile_path = lakshmi_dir / "profile.json"
    with open(profile_path, "r", encoding="utf-8") as f:
        profile = json.load(f)

    facts = profile["lifeFacts"]
    informant_items = profile.get("dailyLifeQuestionnaire", [])

    # Session 1: ~4 months ago (approx 120 days ago) - Stable normal baseline
    now = datetime.now(timezone.utc)
    t_minus_4m = (now - timedelta(days=120)).isoformat()

    answers_4m = [
        {"fact_id": "fact_1", "stage": "free", "answer": "ರಮೇಶ"},
        {"fact_id": "fact_2", "stage": "free", "answer": "ಅನನ್ಯ"},
        {"fact_id": "fact_3", "stage": "free", "answer": "ಶ್ರೀನಿವಾಸನ್"},
        {"fact_id": "fact_4", "stage": "free", "answer": "ಮೈಸೂರು"},
        {"fact_id": "fact_5", "stage": "free", "answer": "1974"},
        {"fact_id": "fact_6", "stage": "free", "answer": "ಶಿಕ್ಷಕಿ"},
        {"fact_id": "fact_7", "stage": "free", "answer": "ಮೈಸೂರ್ ಪಾಕ್"},
        {"fact_id": "fact_8", "stage": "free", "answer": "ಯುಗಾದಿ"},
        {"fact_id": "fact_9", "stage": "free", "answer": "ಶಾಂತಮ್ಮ"},
        {"fact_id": "fact_10", "stage": "free", "answer": "ಚಾಮುಂಡಿ ಸರ್ಕಲ್"},
        {"fact_id": "fact_recent_1", "stage": "free", "answer": "ರೋಹನ್"},
        {"fact_id": "fact_recent_2", "stage": "free", "answer": "ಕೆ ಆರ್ ಎಸ್ ಡ್ಯಾಮ್"},
    ]

    fact_map = {f["id"]: f for f in facts}
    scored_evals_4m = []
    for a in answers_4m:
        fact = fact_map[a["fact_id"]]
        eval_res = score_life_fact_answer(
            transcript=a["answer"],
            target_answer=fact.get("verifiedAnswer") or fact.get("primaryFact", ""),
            aliases=fact.get("acceptedAliases") or fact.get("acceptableAliases", []),
            stage=a["stage"],
            distractors=fact.get("distractors", []),
            fact_type="year" if fact.get("factKey") == "wedding_year" else None,
            lang="kn",
            latency_ms=1500,
        )
        scored_evals_4m.append({
            "fact_id": fact["id"],
            "category": "recent" if fact.get("isRecentEvent") else "remote",
            "is_recent_event": bool(fact.get("isRecentEvent")),
            "credit": eval_res.credit,
            "match_layer": eval_res.match_type,
            "retrieval_stage": a["stage"],
            "latency_ms": 1500,
        })

    lm_4m = compute_life_memory_score(scored_evals_4m)

    inf_items_4m = [
        {"domain": item["domain"], "frequency": "never", "onset": "not_sure"}
        for item in informant_items
    ]
    inf_4m = compute_informant_concern_score(inf_items_4m, contact_frequency="daily")

    csi_4m = compute_unified_screening_score(
        life_memory_score=lm_4m["score"],
        informant_score=inf_4m["score"],
        schooling_years=profile["elderProfile"].get("schoolingYears", 10),
        confounders=profile.get("confounders"),
        informant_details=inf_4m,
        life_memory_details=lm_4m,
    )

    session_4m = {
        "id": "session_lakshmi_4m_ago",
        "patientId": profile["patientId"],
        "patientName": profile["elderProfile"]["fullName"],
        "createdAt": t_minus_4m,
        "isDemo": True,
        "tag": "Earlier session (demo, backdated)",
        "csi": csi_4m.csi,
        "riskTier": csi_4m.risk_tier,
        "tierLabel": csi_4m.tier_label,
        "confidence": csi_4m.confidence,
        "lifeMemoryScore": lm_4m["score"],
        "informantScore": inf_4m["score"],
        "components": csi_4m.components,
        "weightsUsed": csi_4m.weights_used,
        "topDrivers": csi_4m.top_drivers,
        "answers": answers_4m,
    }

    history_dir = lakshmi_dir / "history"
    history_dir.mkdir(parents=True, exist_ok=True)
    with open(history_dir / "sessions.json", "w", encoding="utf-8") as f:
        json.dump([session_4m], f, indent=2)

    print(f"Lakshmi history generated: 4m ago CSI={csi_4m.csi:.1f} ({csi_4m.risk_tier})")


if __name__ == "__main__":
    print("Seeding demo history through production scoring pipeline...")
    seed_savitri_history()
    seed_lakshmi_history()
    print("Done seeding demo history!")
