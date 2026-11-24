"""
Test Suite: Unified Scorer Engine & Cognitive Screening Index (CSI)
==================================================================
Tests:
  1. Monotonicity: Higher cognitive performance strictly yields equal or higher CSI.
  2. Determinism: Identical inputs produce bit-for-bit identical results.
  3. Weight Renormalisation: Sum of active weights always equals 1.0 when components are missing.
  4. Clinical Safety Override: Recent safety items strictly force at least Amber tier.
  5. Discordance Detection: High informant + high elder, and low informant + low elder flags.
  6. Education Adjustment: Widens green threshold for <= 5 years schooling.
  7. Confidence & Inconclusive Gating: Confidence < 50% forces Inconclusive tier.
"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from unified_scorer import compute_unified_screening_score, compute_informant_concern_score, MANDATORY_DISCLAIMER


def test_monotonicity():
    """Higher cognitive component scores must never decrease the CSI."""
    base = compute_unified_screening_score(life_memory_score=60.0, naming_score=60.0, speech_score=60.0, informant_score=40.0)

    # Increasing life memory
    higher_m = compute_unified_screening_score(life_memory_score=80.0, naming_score=60.0, speech_score=60.0, informant_score=40.0)
    assert higher_m.csi > base.csi, f"Monotonicity failed on life memory: {higher_m.csi} vs {base.csi}"

    # Increasing naming
    higher_n = compute_unified_screening_score(life_memory_score=60.0, naming_score=80.0, speech_score=60.0, informant_score=40.0)
    assert higher_n.csi > base.csi, f"Monotonicity failed on naming: {higher_n.csi} vs {base.csi}"

    # Increasing speech
    higher_s = compute_unified_screening_score(life_memory_score=60.0, naming_score=60.0, speech_score=80.0, informant_score=40.0)
    assert higher_s.csi > base.csi, f"Monotonicity failed on speech: {higher_s.csi} vs {base.csi}"

    # Decreasing informant concern (healthier)
    lower_i = compute_unified_screening_score(life_memory_score=60.0, naming_score=60.0, speech_score=60.0, informant_score=20.0)
    assert lower_i.csi > base.csi, f"Monotonicity failed on informant: {lower_i.csi} vs {base.csi}"

    print("[PASS] test_monotonicity")


def test_determinism():
    """Identical inputs must yield bit-for-bit identical outputs."""
    r1 = compute_unified_screening_score(life_memory_score=72.5, naming_score=68.0, speech_score=74.0, informant_score=35.0)
    r2 = compute_unified_screening_score(life_memory_score=72.5, naming_score=68.0, speech_score=74.0, informant_score=35.0)

    assert r1.csi == r2.csi
    assert r1.risk_tier == r2.risk_tier
    assert r1.confidence == r2.confidence
    assert r1.weights_used == r2.weights_used
    assert r1.top_drivers == r2.top_drivers
    print("[PASS] test_determinism")


def test_weight_renormalisation():
    """When components are missing, sum of active weights must equal 1.0 without fabricating scores."""
    # Life memory + informant only
    r_two = compute_unified_screening_score(life_memory_score=80.0, informant_score=20.0)
    assert "speech_acoustic" not in r_two.weights_used
    assert "naming" not in r_two.weights_used
    assert round(sum(r_two.weights_used.values()), 4) == 1.0

    # Only life memory available
    r_one = compute_unified_screening_score(life_memory_score=85.0)
    assert r_one.weights_used == {"life_memory": 1.0}
    assert r_one.csi == 85.0
    print("[PASS] test_weight_renormalisation")


def test_safety_override():
    """Recent safety hazards must elevate Green to at least Amber."""
    inf_details = {
        "recent_safety_hazards": [{"item_id": "stove", "text": "Stove left unattended"}]
    }
    res = compute_unified_screening_score(
        life_memory_score=90.0,
        naming_score=90.0,
        speech_score=90.0,
        informant_score=10.0,
        informant_details=inf_details,
    )
    assert res.safety_override_triggered == True
    assert res.risk_tier == "amber"
    assert "Safety Alert" in res.tier_label
    print("[PASS] test_safety_override")


def test_discordance_detection():
    """Flags significant discrepancies between elder performance and informant observations."""
    # Elder tests very high, family reports severe daily struggle
    d1 = compute_unified_screening_score(life_memory_score=88.0, informant_score=70.0)
    codes1 = [f["code"] for f in d1.discordance_flags]
    assert "HIGH_INFORMANT_HIGH_ELDER" in codes1

    # Family reports no concern, elder struggles on personal memory
    d2 = compute_unified_screening_score(life_memory_score=40.0, informant_score=15.0)
    codes2 = [f["code"] for f in d2.discordance_flags]
    assert "LOW_INFORMANT_LOW_ELDER" in codes2
    print("[PASS] test_discordance_detection")


def test_education_adjustment():
    """Widening thresholds for <= 5 years schooling."""
    # CSI 72 with 10 years schooling -> Amber (cut-off 75)
    normal_ed = compute_unified_screening_score(life_memory_score=72.0, naming_score=72.0, schooling_years=10)
    assert normal_ed.risk_tier == "amber"
    assert normal_ed.education_adjusted == False

    # CSI 72 with 2 years schooling -> Green (cut-off adjusted to 70)
    low_ed = compute_unified_screening_score(life_memory_score=72.0, naming_score=72.0, schooling_years=2)
    assert low_ed.risk_tier == "green"
    assert low_ed.education_adjusted == True
    print("[PASS] test_education_adjustment")


def test_confidence_and_inconclusive():
    """Low SNR or severe confounders dropping confidence < 50% must trigger Inconclusive."""
    # Low SNR (5 dB) + acute illness + sedating meds
    res = compute_unified_screening_score(
        life_memory_score=65.0,
        audio_snr_db=6.0,
        confounders={"acute_illness": True, "sedating_medication": True, "severe_tiredness": True},
    )
    assert res.confidence < 50.0
    assert res.risk_tier == "inconclusive"
    assert res.is_inconclusive == True
    assert "Inconclusive" in res.tier_label
    print("[PASS] test_confidence_and_inconclusive")


def test_disclaimer_presence():
    """All results must contain the mandatory non-diagnostic disclaimer."""
    res = compute_unified_screening_score(life_memory_score=80.0)
    assert MANDATORY_DISCLAIMER in res.disclaimer
    print("[PASS] test_disclaimer_presence")


if __name__ == "__main__":
    test_monotonicity()
    test_determinism()
    test_weight_renormalisation()
    test_safety_override()
    test_discordance_detection()
    test_education_adjustment()
    test_confidence_and_inconclusive()
    test_disclaimer_presence()
    print("\nALL UNIFIED SCORER VERIFICATION TESTS PASSED SUCCESSFULLY!")
