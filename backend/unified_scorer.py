"""
NeuroSense Unified Scoring Engine (CSI)
=======================================
Combines Life Memory Check (M), Picture-Naming (N), Speech & Acoustic Model (S),
and Informant Daily-Life Report (I) into a Unified Cognitive Screening Index.

Formula:
    CSI = w_M * M + w_N * N + w_S * S + w_I * (100 - I)
Where weights dynamically re-normalize when any component is missing or unusable.

Safety & Calibration:
  - Safety override: Recent safety hazards elevate tier to at least Amber
  - Discordance flags: High family concern vs high elder score, or vice versa
  - Education adjustment: Widens Green threshold for <=5 years schooling
  - Confidence calculation: Drops to Inconclusive if < 50%
  - Non-diagnostic clinical safety terminology with mandatory disclaimer
"""

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

CONFIG_PATH = Path(__file__).resolve().parent / "scoring_config.json"
DEFAULT_CONFIG: Dict[str, Any] = {}
if CONFIG_PATH.exists():
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            DEFAULT_CONFIG = json.load(f)
    except Exception as e:
        print(f"[WARN] Failed to load scoring_config.json in unified_scorer: {e}")

MANDATORY_DISCLAIMER = (
    "This is a screening aid, not a diagnosis. Only a doctor can diagnose. "
    "Many factors such as tiredness, hearing loss, low mood, or medication can affect results."
)


@dataclass
class ScoredScreening:
    csi: float  # 0 - 100
    risk_tier: str  # "green", "amber", "red", "inconclusive"
    tier_label: str
    confidence: float  # 0 - 100%
    is_inconclusive: bool
    components: Dict[str, Any]
    weights_used: Dict[str, float]
    safety_override_triggered: bool
    safety_alert_message: Optional[str]
    discordance_flags: List[Dict[str, str]]
    education_adjusted: bool
    top_drivers: List[str]
    disclaimer: str
    metadata: Dict[str, Any] = field(default_factory=dict)


def compute_informant_concern_score(
    items: List[Dict[str, Any]],
    contact_frequency: str = "daily",
) -> Dict[str, Any]:
    """
    Computes Informant Concern Score (I in [0, 100]) from 16 questionnaire items.
    Frequency: never (0), rarely (1), sometimes (2), often (3).
    Onset: under 6m (1.35x), 6-12m (1.20x), over 1 year (1.00x).
    Safety domain multiplier: 1.6x.
    Contact frequency reliability: daily (1.0), weekly (0.85), etc.
    """
    if not items:
        return {
            "score": 0.0,
            "available": False,
            "domain_breakdown": {},
            "safety_hazards_count": 0,
            "recent_safety_hazards": [],
        }

    freq_vals = {"never": 0.0, "rarely": 1.0, "sometimes": 2.0, "often": 3.0}
    onset_mults = {"under_6m": 1.35, "6_to_12m": 1.20, "over_1y": 1.00}
    contact_mults = {
        "daily": 1.00,
        "several_per_week": 0.95,
        "weekly": 0.85,
        "rarely": 0.65,
    }

    rel_mult = contact_mults.get(contact_frequency, 1.00)

    total_weighted_points = 0.0
    max_possible_points = 0.0

    domain_points: Dict[str, float] = {}
    domain_max: Dict[str, float] = {}
    recent_safety_hazards = []

    for item in items:
        dom = item.get("domain", "general")
        freq = item.get("frequency", "never")
        onset = item.get("onset", "over_1y")
        is_safety = (dom == "safety") or item.get("is_safety_critical", False)

        freq_pt = freq_vals.get(freq, 0.0)
        on_mult = onset_mults.get(onset, 1.00)
        dom_mult = 1.6 if is_safety else 1.0

        # Safety hazard detection (frequency >= sometimes AND onset <= 6 months)
        if is_safety and freq_pt >= 2.0 and onset == "under_6m":
            recent_safety_hazards.append({
                "item_id": item.get("id"),
                "text": item.get("text", "Safety-critical concern reported"),
                "frequency": freq,
                "onset": onset,
            })

        item_pt = freq_pt * on_mult * dom_mult
        item_max = 3.0 * 1.35 * dom_mult  # max possible for this item

        total_weighted_points += item_pt
        max_possible_points += item_max

        domain_points[dom] = domain_points.get(dom, 0.0) + item_pt
        domain_max[dom] = domain_max.get(dom, 0.0) + item_max

    base_pct = (total_weighted_points / max_possible_points * 100.0) if max_possible_points > 0 else 0.0
    adjusted_score = round(min(100.0, base_pct * rel_mult), 2)

    # Domain percentages
    domain_pcts = {}
    for d, pts in domain_points.items():
        m = domain_max.get(d, 1.0)
        domain_pcts[d] = round((pts / m * 100.0) if m > 0 else 0.0, 1)

    return {
        "score": adjusted_score,
        "available": True,
        "items_evaluated": len(items),
        "domain_breakdown": domain_pcts,
        "safety_hazards_count": len(recent_safety_hazards),
        "recent_safety_hazards": recent_safety_hazards,
    }


def compute_unified_screening_score(
    life_memory_score: Optional[float] = None,
    naming_score: Optional[float] = None,
    speech_score: Optional[float] = None,
    informant_score: Optional[float] = None,
    schooling_years: Optional[int] = 10,
    audio_snr_db: Optional[float] = 20.0,
    retry_rate: Optional[float] = 0.0,
    confounders: Optional[Dict[str, bool]] = None,
    informant_details: Optional[Dict[str, Any]] = None,
    life_memory_details: Optional[Dict[str, Any]] = None,
) -> ScoredScreening:
    """
    Computes unified Cognitive Screening Index (CSI).
    Implements weight renormalisation, safety overrides, discordance detection,
    confidence penalties, education band adjustments, and explainable drivers.
    """
    if confounders is None:
        confounders = {}
    if informant_details is None:
        informant_details = {}
    if life_memory_details is None:
        life_memory_details = {}

    weights_cfg = DEFAULT_CONFIG.get(
        "unified_weights",
        {
            "life_memory": 0.40,
            "naming": 0.20,
            "speech_acoustic": 0.10,
            "informant_daily_report": 0.30,
        },
    )

    # Determine availability of components
    available: Dict[str, Tuple[float, float]] = {}  # key -> (nominal_weight, value)

    if life_memory_score is not None and life_memory_score >= 0:
        available["life_memory"] = (weights_cfg.get("life_memory", 0.40), max(0.0, min(100.0, float(life_memory_score))))

    if naming_score is not None and naming_score >= 0:
        available["naming"] = (weights_cfg.get("naming", 0.20), max(0.0, min(100.0, float(naming_score))))

    if speech_score is not None and speech_score >= 0:
        available["speech_acoustic"] = (weights_cfg.get("speech_acoustic", 0.10), max(0.0, min(100.0, float(speech_score))))

    if informant_score is not None and informant_score >= 0:
        # Informant contribution to cognitive health index is (100 - InformantConcern)
        healthy_val = max(0.0, min(100.0, 100.0 - float(informant_score)))
        available["informant_daily_report"] = (weights_cfg.get("informant_daily_report", 0.30), healthy_val)

    # Renormalize weights
    w_sum = sum(w for w, _ in available.values())
    if w_sum <= 0:
        return ScoredScreening(
            csi=0.0,
            risk_tier="inconclusive",
            tier_label="Inconclusive (No data)",
            confidence=0.0,
            is_inconclusive=True,
            components={},
            weights_used={},
            safety_override_triggered=False,
            safety_alert_message=None,
            discordance_flags=[],
            education_adjusted=False,
            top_drivers=["No screening assessments completed."],
            disclaimer=MANDATORY_DISCLAIMER,
        )

    normalized_weights: Dict[str, float] = {}
    csi_raw = 0.0
    for k, (nom_w, val) in available.items():
        norm_w = nom_w / w_sum
        normalized_weights[k] = round(norm_w, 4)
        csi_raw += norm_w * val

    csi = round(csi_raw, 2)

    # Confidence calculation
    conf = 100.0
    # Missing component deductions
    if "life_memory" not in available:
        conf -= 40.0
    if "informant_daily_report" not in available:
        conf -= 25.0
    if "naming" not in available:
        conf -= 15.0
    if "speech_acoustic" not in available:
        conf -= 10.0

    # Audio quality & retry deductions
    if audio_snr_db is not None and audio_snr_db < 12.0:
        conf -= 15.0
    if retry_rate is not None and retry_rate > 0.30:
        conf -= 10.0

    # Confounder deductions
    if confounders.get("acute_illness", False):
        conf -= 20.0
    if confounders.get("acute_bereavement", False):
        conf -= 15.0
    if confounders.get("sedating_medication", False):
        conf -= 15.0
    if confounders.get("severe_tiredness", False):
        conf -= 10.0
    if confounders.get("uncorrected_hearing_loss", False):
        conf -= 15.0

    confidence = round(max(0.0, min(100.0, conf)), 1)
    is_inconclusive = confidence < 50.0

    # Education Adjustment
    is_low_schooling = (schooling_years is not None and schooling_years < 5)
    green_cutoff = 70.0 if is_low_schooling else 75.0
    amber_cutoff = 50.0 if is_low_schooling else 55.0

    # Risk Tier assignment
    if csi >= green_cutoff:
        risk_tier = "green"
        tier_label = "No concerning signs found in this screening"
    elif csi >= amber_cutoff:
        risk_tier = "amber"
        tier_label = "Signs worth a clinical check"
    else:
        risk_tier = "red"
        tier_label = "Clear signs needing clinical evaluation"

    # Safety Overrides
    safety_override = False
    safety_alert_msg = None
    recent_hazards = informant_details.get("recent_safety_hazards", [])
    if recent_hazards:
        safety_override = True
        safety_alert_msg = f"Family reported {len(recent_hazards)} recent safety-critical change(s) (e.g. wandering or appliances left unmonitored)."
        if risk_tier == "green":
            risk_tier = "amber"
            tier_label = "Signs worth a clinical check (Safety Alert Override)"

    # Discordance Detection
    discordance_flags = []
    if life_memory_score is not None and informant_score is not None:
        if informant_score >= 60.0 and life_memory_score >= 75.0:
            discordance_flags.append({
                "code": "HIGH_INFORMANT_HIGH_ELDER",
                "summary": "Caregiver reports significant daily decline, but elder scored well on memory check.",
                "clinical_note": "Elder may retain structured autobiographical memory while experiencing executive or functional decline in daily life. Further clinical review recommended.",
            })
        elif informant_score <= 30.0 and life_memory_score <= 50.0:
            discordance_flags.append({
                "code": "LOW_INFORMANT_LOW_ELDER",
                "summary": "Caregiver reports minimal concern, but elder experienced difficulty recalling life facts.",
                "clinical_note": "Family may be normalizing early forgetfulness as typical ageing, or contact frequency may limit observation of subtle changes.",
            })

    # Episodic gap check
    episodic_gap = life_memory_details.get("episodic_gap", 0.0)
    if episodic_gap >= 25.0:
        discordance_flags.append({
            "code": "EPISODIC_MEMORY_GAP",
            "summary": f"Notable gap between remote memory and recent memory recall ({episodic_gap} pts lower on recent events).",
            "clinical_note": "Selective loss of recent episodic memories while preserving remote facts is a hallmark indicator of early amnestic decline.",
        })

    # Top Plain-Language Drivers
    drivers: List[str] = []
    if life_memory_score is not None:
        if life_memory_score >= 75:
            drivers.append("Strong personal memory recall for family and life history.")
        elif life_memory_score < 55:
            drivers.append("Significant difficulty recalling personal life facts even with cues.")
        else:
            drivers.append("Recalled some personal facts but required hints or option choices.")

    if informant_score is not None:
        if informant_score >= 60:
            drivers.append("Family noted frequent daily difficulties compared to 5 years ago.")
        elif informant_score <= 25:
            drivers.append("Family observed steady day-to-day independence.")

    if naming_score is not None:
        if naming_score < 60:
            drivers.append("Hesitation or difficulty in rapid object naming.")

    if speech_score is not None:
        if speech_score < 50:
            drivers.append("Acoustic pauses and pitch variability differences noted in voice.")

    if not drivers:
        drivers.append("Assessment based on completed screening battery components.")

    if is_inconclusive:
        risk_tier = "inconclusive"
        tier_label = "Inconclusive: Please re-test in better conditions"

    return ScoredScreening(
        csi=csi,
        risk_tier=risk_tier,
        tier_label=tier_label,
        confidence=confidence,
        is_inconclusive=is_inconclusive,
        components={
            "life_memory": life_memory_score,
            "naming": naming_score,
            "speech_acoustic": speech_score,
            "informant_concern": informant_score,
        },
        weights_used=normalized_weights,
        safety_override_triggered=safety_override,
        safety_alert_message=safety_alert_msg,
        discordance_flags=discordance_flags,
        education_adjusted=is_low_schooling,
        top_drivers=drivers[:3],
        disclaimer=MANDATORY_DISCLAIMER,
        metadata={
            "schooling_years": schooling_years,
            "audio_snr_db": audio_snr_db,
            "retry_rate": retry_rate,
            "confounders": confounders,
        },
    )
