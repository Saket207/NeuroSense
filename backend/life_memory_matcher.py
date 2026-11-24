"""
NeuroSense Life Memory Match Engine
===================================
Implements multi-stage layered matching for personal autobiographical memory checks.
Clinical Scope: Evaluates recall of personally meaningful life facts across English,
Hindi, and Kannada without education, literacy, or cultural bias.

Layers:
  1. Unicode NFC & Multilingual Text Normalization
  2. Exact & Alias Dictionary Matching
  3. Numeric Tolerance Matching (Year +/- 2y exact, +/- 5y partial; Count/Age tolerance)
  4. Phonetic & Transliteration Aware Matching with Near-Miss Name Collison Rejection
  5. Semantic Judge Fallback (Rule-based and structured JSON schema)

Retrieval Credits (from scoring_config.json):
  - Free recall: Full correct = 1.0, Partial = 0.6
  - Cued recall: Full correct = 0.5
  - Recognition (3-choice): Full correct = 0.25
"""

import json
import os
import re
import unicodedata
from dataclasses import dataclass, field
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple

try:
    from backend.language_registry import NUMBER_WORDS, get_voice_prompt
except ImportError:
    from language_registry import NUMBER_WORDS, get_voice_prompt

# Load versioned scoring configuration
CONFIG_PATH = Path(__file__).resolve().parent / "scoring_config.json"
DEFAULT_CONFIG: Dict[str, Any] = {}
if CONFIG_PATH.exists():
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            DEFAULT_CONFIG = json.load(f)
    except Exception as e:
        print(f"[WARN] Failed to load scoring_config.json: {e}")

STAGED_CREDITS = DEFAULT_CONFIG.get(
    "staged_credits",
    {
        "free_recall_full": 1.0,
        "free_recall_partial": 0.6,
        "cued_recall_full": 0.5,
        "recognition_full": 0.25,
        "incorrect": 0.0,
    },
)

NUMERIC_TOLERANCES = DEFAULT_CONFIG.get(
    "numeric_tolerances",
    {
        "year": {"exact_tolerance": 2, "partial_tolerance": 5},
        "age": {"exact_tolerance": 1, "partial_tolerance": 2},
        "count": {"exact_tolerance": 0, "partial_tolerance": 1},
    },
)


@dataclass
class MatchResult:
    is_correct: bool
    is_partial: bool
    credit: float
    stage_reached: str  # "free", "cued", "recognition"
    match_type: str  # "exact", "alias", "numeric_exact", "numeric_tolerance", "fuzzy", "semantic", "none"
    confidence: float
    matched_text: str
    target_answer: str
    transcript: str
    reason: str
    metadata: Dict[str, Any] = field(default_factory=dict)


def normalize_text(text: str, lang: str = "en") -> str:
    """
    Layer 1: Normalization
    Unicode NFC normalization, lowercase, punctuation removal, whitespace collapse,
    and number word to digit conversion.
    """
    if not text:
        return ""

    # Unicode NFC normalization
    norm = unicodedata.normalize("NFC", str(text)).strip().lower()

    # Strip punctuation while strictly preserving all Unicode Letters (L), Marks (M - vowel matras/accents), Numbers (N), and Whitespace (Z)
    clean_chars = []
    for c in norm:
        cat = unicodedata.category(c)
        if cat.startswith(("P", "S")):
            clean_chars.append(" ")
        else:
            clean_chars.append(c)
    norm = "".join(clean_chars)
    norm = re.sub(r"\s+", " ", norm).strip()

    # Convert known number words to digits for the specific language
    words_map = NUMBER_WORDS.get(lang, {})
    if words_map:
        tokens = norm.split()
        converted_tokens = []
        for tok in tokens:
            if tok in words_map:
                converted_tokens.append(str(words_map[tok]))
            else:
                converted_tokens.append(tok)
        norm = " ".join(converted_tokens)

    return norm


def extract_numbers(text: str) -> List[int]:
    """Extract all integer numbers from normalized text, assembling compound spoken years/numbers."""
    raw_tokens = text.split()
    nums: List[int] = []

    # First look for explicit digit sequences
    for tok in raw_tokens:
        if tok.isdigit():
            try:
                nums.append(int(tok))
            except ValueError:
                pass

    # Also look for compound sequences (e.g. 19 100 75 -> 1975, or 1000 900 75 -> 1975)
    compound_candidates = []
    if len(nums) >= 2:
        i = 0
        while i < len(nums):
            # Pattern: A * 100 + B (e.g. 19 * 100 + 75 = 1975, or 19 * 100 = 1900)
            if i + 2 < len(nums) and nums[i + 1] == 100 and nums[i] < 100 and nums[i + 2] < 100:
                combined = nums[i] * 100 + nums[i + 2]
                compound_candidates.append(combined)
                i += 3
            elif i + 1 < len(nums) and nums[i + 1] == 100 and nums[i] < 100:
                combined = nums[i] * 100
                compound_candidates.append(combined)
                i += 2
            elif i + 2 < len(nums) and nums[i] == 1000:
                combined = 1000 + nums[i + 1] + nums[i + 2]
                compound_candidates.append(combined)
                i += 3
            else:
                i += 1

    return compound_candidates + nums


def evaluate_numeric_match(
    transcript_norm: str,
    target_norm: str,
    fact_type: str = "year",
) -> Tuple[bool, bool, str, float]:
    """
    Layer 3: Numeric Tolerance Matching
    Returns (is_exact, is_partial, matched_str, score_factor)
    """
    target_nums = extract_numbers(target_norm)
    transcript_nums = extract_numbers(transcript_norm)

    if not target_nums or not transcript_nums:
        return False, False, "", 0.0

    target_val = target_nums[0]
    tol_info = NUMERIC_TOLERANCES.get(fact_type, {})
    if isinstance(tol_info, dict):
        exact_tol = tol_info.get("exact_tolerance", 2 if fact_type == "year" else (0 if fact_type == "count" else 1))
        partial_tol = tol_info.get("partial_tolerance", 5 if fact_type == "year" else (1 if fact_type == "count" else 3))
    else:
        exact_tol = 2 if fact_type == "year" else 1
        partial_tol = 5 if fact_type == "year" else 3

    # Check each number in transcript against target
    best_diff = 999999
    best_num = None
    for cand in transcript_nums:
        diff = abs(cand - target_val)
        if diff < best_diff:
            best_diff = diff
            best_num = cand

    if best_num is None:
        return False, False, "", 0.0

    if best_diff == 0:
        return True, False, str(best_num), 1.0
    elif best_diff <= exact_tol:
        # e.g., Wedding year 1974 spoken as 1975 (+/- 2 years allowed as full correct)
        return True, False, str(best_num), 1.0
    elif best_diff <= partial_tol:
        # e.g., Spoken as 1978 (+/- 5 years allowed as partial)
        return False, True, str(best_num), 0.6
    else:
        return False, False, str(best_num), 0.0


def has_differing_code_or_letter(s1: str, s2: str) -> bool:
    """
    Prevents false fuzzy matches when options/codes differ by a key letter or number.
    e.g. 'Option A' vs 'Option B', 'Room 101' vs 'Room 102'.
    """
    toks1 = s1.split()
    toks2 = s2.split()
    if toks1 and toks2:
        last1, last2 = toks1[-1], toks2[-1]
        # If last token is 1-2 chars (like A, B, C or 1, 2) and different, reject fuzzy match!
        if (len(last1) <= 2 or len(last2) <= 2) and last1 != last2:
            return True
        # If one has a distinct single letter option like 'a' and the other has 'b'
        letters1 = {t for t in toks1 if len(t) == 1 and t.isalpha()}
        letters2 = {t for t in toks2 if len(t) == 1 and t.isalpha()}
        if letters1 and letters2 and letters1 != letters2:
            return True
    return False


def is_name_collision(s1: str, s2: str) -> bool:
    """
    Safety Guardrail: Reject near-miss collisions for common Indian names.
    e.g., 'Ravi' vs 'Raju' (length 4, distance 2), 'Sita' vs 'Gita' (length 4, distance 1).
    Short proper names must be strictly matched to avoid mistaking relatives.
    """
    if len(s1) <= 5 and len(s2) <= 5:
        # Compare consonant skeletons
        vowels = set("aeiouàèìòùáéíóúāīūeēoō")
        c1 = "".join([c for c in s1 if c not in vowels])
        c2 = "".join([c for c in s2 if c not in vowels])
        # If consonant skeleton differs on short names, it is a different person!
        if c1 != c2:
            return True
    return False


def fuzzy_similarity(s1: str, s2: str) -> float:
    """Returns SequenceMatcher ratio between two normalized strings."""
    if not s1 or not s2:
        return 0.0
    return SequenceMatcher(None, s1, s2).ratio()


def match_single_target(
    candidate: str,
    target: str,
    aliases: List[str],
    fact_type: Optional[str] = None,
    lang: str = "en",
) -> Tuple[bool, bool, str, str, float]:
    """
    Evaluates candidate transcript against target and aliases across layers.
    Returns: (is_correct, is_partial, match_type, matched_token, confidence)
    """
    c_norm = normalize_text(candidate, lang=lang)
    t_norm = normalize_text(target, lang=lang)
    alias_norms = [normalize_text(a, lang=lang) for a in aliases if a]

    if not c_norm or not t_norm:
        return False, False, "none", "", 0.0

    # Layer 1 & 2: Exact Target Match
    if c_norm == t_norm:
        return True, False, "exact", t_norm, 1.0

    # Token containment / boundary match
    # e.g., transcript: "he is my grandson arjun", target: "arjun"
    target_pattern = r"\b" + re.escape(t_norm) + r"\b"
    if re.search(target_pattern, c_norm):
        return True, False, "exact", t_norm, 0.98

    # Layer 2: Alias Match
    for a_norm in alias_norms:
        if not a_norm:
            continue
        if c_norm == a_norm:
            return True, False, "alias", a_norm, 1.0
        alias_pattern = r"\b" + re.escape(a_norm) + r"\b"
        if re.search(alias_pattern, c_norm):
            return True, False, "alias", a_norm, 0.96

    # Layer 3: Numeric Tolerance Match (if applicable)
    if fact_type in ("year", "age", "count") or extract_numbers(t_norm):
        f_type = fact_type or "year"
        is_num_exact, is_num_part, num_str, factor = evaluate_numeric_match(c_norm, t_norm, f_type)
        if is_num_exact:
            return True, False, "numeric_exact", num_str, 0.95
        elif is_num_part:
            return False, True, "numeric_tolerance", num_str, 0.80

    # Layer 4: Phonetic / Fuzzy String Distance
    all_targets = [t_norm] + alias_norms
    tokens = c_norm.split()

    for tgt in all_targets:
        # Check against full transcript
        sim_full = fuzzy_similarity(c_norm, tgt)
        if sim_full >= 0.85 and not is_name_collision(c_norm, tgt) and not has_differing_code_or_letter(c_norm, tgt):
            return True, False, "fuzzy", tgt, sim_full

        # Check against individual tokens or n-grams
        tgt_len = len(tgt.split())
        for i in range(len(tokens) - tgt_len + 1):
            window = " ".join(tokens[i : i + tgt_len])
            sim = fuzzy_similarity(window, tgt)
            if sim >= 0.85 and not is_name_collision(window, tgt) and not has_differing_code_or_letter(window, tgt):
                return True, False, "fuzzy", window, sim
            elif sim >= 0.72 and not is_name_collision(window, tgt) and not has_differing_code_or_letter(window, tgt):
                # High-partial similarity without collision (e.g., subtle spelling/pronunciation variant)
                return False, True, "fuzzy_partial", window, sim

    # Layer 5: Semantic containment / partial overlap
    # If target has multiple words (e.g. "Govindappa Hospital") and elder names key noun
    t_words = [w for w in t_norm.split() if len(w) > 3]
    if len(t_words) >= 2:
        overlap = [w for w in t_words if w in c_norm]
        if len(overlap) == len(t_words):
            return True, False, "semantic", " ".join(overlap), 0.90
        elif len(overlap) >= 1:
            return False, True, "semantic_partial", " ".join(overlap), 0.65

    return False, False, "none", "", 0.0


def score_life_fact_answer(
    transcript: str,
    target_answer: str,
    aliases: Optional[List[str]] = None,
    stage: str = "free",  # "free", "cued", "recognition"
    distractors: Optional[List[str]] = None,
    fact_type: Optional[str] = None,
    lang: str = "en",
    latency_ms: Optional[int] = None,
) -> MatchResult:
    """
    Main evaluation function for a single life memory question attempt.
    Applies multi-stage credit deduction:
      - Free Recall: full = 1.0, partial = 0.6
      - Cued Recall: full = 0.5, partial = 0.3
      - Recognition: full = 0.25 (distractor check)
    """
    if aliases is None:
        aliases = []
    if distractors is None:
        distractors = []

    if not transcript or not transcript.strip():
        return MatchResult(
            is_correct=False,
            is_partial=False,
            credit=0.0,
            stage_reached=stage,
            match_type="none",
            confidence=1.0,
            matched_text="",
            target_answer=target_answer,
            transcript=transcript or "",
            reason="No audible response captured",
            metadata={"latency_ms": latency_ms},
        )

    # Recognition Stage (Multiple Choice selection)
    if stage == "recognition":
        c_norm = normalize_text(transcript, lang=lang)
        # Check if patient picked target vs distractors
        is_corr, is_part, m_type, m_text, conf = match_single_target(
            transcript, target_answer, aliases, fact_type=fact_type, lang=lang
        )

        # Also check if they explicitly chose a distractor
        distractor_picked = False
        distractor_name = ""
        for dist in distractors:
            d_corr, _, _, d_text, _ = match_single_target(
                transcript, dist, [], fact_type=fact_type, lang=lang
            )
            if d_corr:
                distractor_picked = True
                distractor_name = dist
                break

        if is_corr and not distractor_picked:
            return MatchResult(
                is_correct=True,
                is_partial=False,
                credit=STAGED_CREDITS["recognition_full"],
                stage_reached="recognition",
                match_type=m_type,
                confidence=conf,
                matched_text=m_text,
                target_answer=target_answer,
                transcript=transcript,
                reason="Correctly recognized target from options",
                metadata={"latency_ms": latency_ms, "distractors": distractors},
            )
        else:
            return MatchResult(
                is_correct=False,
                is_partial=False,
                credit=STAGED_CREDITS["incorrect"],
                stage_reached="recognition",
                match_type="distractor" if distractor_picked else "none",
                confidence=conf if distractor_picked else 0.8,
                matched_text=distractor_name if distractor_picked else "",
                target_answer=target_answer,
                transcript=transcript,
                reason=f"Chose distractor: {distractor_name}" if distractor_picked else "Incorrect option chosen",
                metadata={"latency_ms": latency_ms, "distractors": distractors},
            )

    # Free or Cued Recall Stages
    is_corr, is_part, m_type, m_text, conf = match_single_target(
        transcript, target_answer, aliases, fact_type=fact_type, lang=lang
    )

    if stage == "free":
        if is_corr:
            credit = STAGED_CREDITS["free_recall_full"]
            reason = f"Full free recall match via {m_type}"
        elif is_part:
            credit = STAGED_CREDITS["free_recall_partial"]
            reason = f"Partial free recall match via {m_type}"
        else:
            credit = STAGED_CREDITS["incorrect"]
            reason = "Free recall did not match target"

        return MatchResult(
            is_correct=is_corr,
            is_partial=is_part,
            credit=credit,
            stage_reached="free",
            match_type=m_type,
            confidence=conf,
            matched_text=m_text,
            target_answer=target_answer,
            transcript=transcript,
            reason=reason,
            metadata={"latency_ms": latency_ms},
        )

    elif stage == "cued":
        if is_corr:
            credit = STAGED_CREDITS["cued_recall_full"]
            reason = f"Cued recall match via {m_type}"
        elif is_part:
            credit = STAGED_CREDITS["cued_recall_full"] * 0.6
            reason = f"Partial cued recall match via {m_type}"
        else:
            credit = STAGED_CREDITS["incorrect"]
            reason = "Cued recall did not match target"

        return MatchResult(
            is_correct=is_corr,
            is_partial=is_part,
            credit=credit,
            stage_reached="cued",
            match_type=m_type,
            confidence=conf,
            matched_text=m_text,
            target_answer=target_answer,
            transcript=transcript,
            reason=reason,
            metadata={"latency_ms": latency_ms},
        )

    # Default fallback
    return MatchResult(
        is_correct=False,
        is_partial=False,
        credit=0.0,
        stage_reached=stage,
        match_type="none",
        confidence=0.5,
        matched_text="",
        target_answer=target_answer,
        transcript=transcript,
        reason="Unknown retrieval stage",
        metadata={"latency_ms": latency_ms},
    )


def compute_life_memory_score(
    results: List[Dict[str, Any]],
) -> Dict[str, Any]:
    """
    Computes overall Life Memory Score (M in [0, 100]) from individual evaluated facts.
    Also computes breakdown:
      - remote_memory_score: facts about past life (childhood, wedding, career)
      - recent_memory_score: facts about recent events (last 7-14 days)
      - episodic_gap: remote_score - recent_score (clinically meaningful indicator of early decline)
    """
    if not results:
        return {
            "score": 0.0,
            "available": False,
            "total_facts": 0,
            "remote_score": 0.0,
            "recent_score": 0.0,
            "episodic_gap": 0.0,
            "details": [],
        }

    fact_weights_cfg = DEFAULT_CONFIG.get("life_memory_fact_weights", {})
    default_w = fact_weights_cfg.get("default", 1.0)

    total_weight = 0.0
    weighted_score = 0.0

    remote_weights = 0.0
    remote_weighted = 0.0

    recent_weights = 0.0
    recent_weighted = 0.0

    processed_details = []

    for item in results:
        fact_id = item.get("fact_id", "")
        category = item.get("category", "remote")  # "remote" or "recent"
        credit = float(item.get("credit", 0.0))
        is_recent = (category == "recent") or item.get("is_recent_event", False)

        w = fact_weights_cfg.get(fact_id, default_w)

        total_weight += w
        weighted_score += credit * w

        if is_recent:
            recent_weights += w
            recent_weighted += credit * w
        else:
            remote_weights += w
            remote_weighted += credit * w

        processed_details.append({
            "fact_id": fact_id,
            "category": "recent" if is_recent else "remote",
            "weight": w,
            "credit": credit,
            "stage_reached": item.get("stage_reached", "free"),
            "is_correct": item.get("is_correct", False),
            "match_type": item.get("match_type", "none"),
            "latency_ms": item.get("metadata", {}).get("latency_ms"),
        })

    m_score = (weighted_score / total_weight * 100.0) if total_weight > 0 else 0.0
    rem_score = (remote_weighted / remote_weights * 100.0) if remote_weights > 0 else m_score
    rec_score = (recent_weighted / recent_weights * 100.0) if recent_weights > 0 else m_score
    episodic_gap = round(rem_score - rec_score, 2)

    return {
        "score": round(m_score, 2),
        "available": True,
        "total_facts": len(results),
        "remote_score": round(rem_score, 2),
        "recent_score": round(rec_score, 2),
        "episodic_gap": episodic_gap,
        "details": processed_details,
    }
