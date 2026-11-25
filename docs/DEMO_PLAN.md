# NeuroSense Demo Studio: Architecture, Implementation Plan & Pipeline Audit

**Document Version:** 1.0.0  
**Status:** Audit Completed — Implementation Plan Approved  
**Project:** NeuroSense — Cognitive & Neurological Screening Aid  
**Core Purpose:** Transparent, provable live demo environment enabling rapid persona loading, synthetic audio playback, live pipeline inspection, and what-if counterfactual re-scoring without touching production scoring logic.

---

## 1. System Audit: Existing Implementation & Integration Contracts

### 1.1 Data Schemas (`src/types/familySetup.ts`)
The Family-Verified Life Memory Check wizard operates on `FamilySetupRecord`:
- **`elderProfile` (`ElderProfileData`):** `fullName`, `age`, `gender`, `languagesSpoken`, `preferredTestingLanguage` (`en` | `hi` | `kn`), `dialectOrRegion`, `schoolingYears`, `literacyStatus`, `informantName`, `informantRelationship`, `informantMeetingFrequency`, `livingArrangement`.
- **`lifeFacts` (`LifeFactItem[]`):**
  - `id`: Unique identifier (e.g., `fact_1`).
  - `factKey`: Semantic key (e.g., `child_name`, `birth_place`, `wedding_year`).
  - `questionText`: Localized question prompt.
  - `defaultPrompt`: Map of prompts per language (`en`, `hi`, `kn`).
  - `verifiedAnswer`: Canonical ground-truth answer.
  - `acceptedAliases`: Array of valid nicknames/variants.
  - `category`: `"people"` | `"place"` | `"history"` | `"preference"` | `"recent_event"`.
  - `cue`: Stage 2 hint prompt.
  - `distractors`: Tuple of 2 plausible incorrect choices (`[string, string]`).
  - `isSensitive`: Boolean skip toggle.
  - `isRecentEvent`: Boolean flag for episodic events.
  - `eventDate`: ISO date string (validated against 14-day expiration window).
  - `isNumeric`: Boolean flag for year/count tolerance handling.
- **`dailyLifeQuestionnaire` (`DailyLifeQuestionItem[]`):**
  - 16 standardized items across 6 domains: `memory`, `orientation`, `daily_tasks_money`, `language`, `behaviour_mood`, `safety`.
  - `frequency`: `"never"` | `"rarely"` | `"sometimes"` | `"often"`.
  - `onset`: `"under_6_months"` | `"6_to_12_months"` | `"1_to_3_years"` | `"over_3_years"` | `"not_sure"`.
  - `isSafetyItem`: Triggers safety override if frequency $\ge$ "sometimes" and onset $<6$ months.
- **`confounders` (`ConfoundersData`):** `hearingDifficulty`, `hasHearingAid`, `visionDifficulty`, `poorSleepRecently`, `recentBereavement`, `recentIllnessOrHospitalStay`, `sedatingMedicines`, `alcoholUse`, `todayStateTired`, `todayStateUnwellOrAnxious`.
- **`consent` (`ConsentData`):** Caregiver consent and elder verbal assent timestamps.

### 1.2 Storage & Persistence
- **Local:** IndexedDB store `screenings` in `NeuroSense_DB` and `localStorage.getItem("neurosense_family_setup_<patientId>")`.
- **Cloud:** Supabase user metadata and storage bucket `neurosense-recordings`.
- **Validation Contract (`src/services/familySetupStorage.ts`):**
  - Minimum 8 scorable facts (`!isSensitive` and `verifiedAnswer.trim().length > 0`).
  - At least 1 valid recent event fact within 14 days (`isRecentEventExpired(eventDate) === false`).

### 1.3 Backend API Endpoints (`backend/main.py`)
- `POST /api/match-life-memory`: Evaluates spoken transcript against ground truth across 5 layers (normalization, exact/alias, numeric tolerance, phonetic transliteration with collision rejection, semantic). Returns stage-credited score, match type, and reason.
- `POST /api/compute-life-memory-score`: Weighted Life Memory Score ($M \in [0, 100]$), remote vs. recent memory breakdown, and episodic gap.
- `POST /api/compute-informant-score`: Weighted Informant Concern Score ($I \in [0, 100]$) from 16 items.
- `POST /api/score-screening`: Unified Cognitive Screening Index ($CSI = 0.40 M + 0.20 N + 0.10 S + 0.30 (100 - I)$), missing-component renormalisation, confidence deduction, education adjustment, safety override, and discordance flags.
- `POST /api/analyze-audio`: Synchronous Faster-Whisper ASR + 22-feature quantum hybrid model evaluation.

---

## 2. The 6 Fictional Demo Scenarios

All scenarios are strictly **INPUT DATA ONLY**. Transcripts, match credits, CSI scores, risk tiers, and confidence levels are never pre-written; they are computed live by the backend engine.

| Scenario ID | Person | Language | Design Purpose | Elder Answer Profile | Informant Report Profile |
|---|---|---|---|---|---|
| `lakshmi` | Lakshmi, 72, retired teacher, 12y schooling | Kannada | Typical healthy-looking baseline | 9 free recall (1 via nickname alias), 1 cued; prompt responses | Mostly "never"; "misplaces things" sometimes (>3y onset) |
| `ramesh` | Ramesh, 68, farmer, 0y schooling, non-literate | Hindi | Demonstrates zero-schooling validity | 8 free recall, 1 partial (year off by 2), 1 cued; natural pauses | Mostly "never"; steady daily tasks |
| `savitri` | Savitri, 75, retired nurse, 15y schooling | English | Mild concerns + visible longitudinal decline | 4 free, 2 partial, 3 cued, 1 recognition; longer delays | Moderate: repeats questions "sometimes", forgets recent events "often" (6-12m onset); no safety items "often" |
| `abdul` | Abdul, 79, retired shopkeeper, 5y schooling | Hindi | Clearly concerning pattern with safety hazard | 1 free, 1 cued, 3 recognition, 4 no answer; long response delays | High: repeats "often", gets lost "sometimes", gas left on "often" (<6m onset) |
| `kamala` | Kamala, 70, homemaker, 8y schooling | Kannada | Discordance flag: family worried, elder performs well | 9 free, 1 cued; prompt, fluent recall | High concern on daily items with vague notes; informant meets rarely |
| `narayan` | Narayan, 77, retired clerk, 10y schooling | Kannada + English loanwords | Suboptimal conditions $\rightarrow$ Low-confidence / Inconclusive path | Hearing aid not worn; noisy background; unclear/hesitant answers | Low concern; mild forgetfulness |

### 2.1 Multi-Session Longitudinal Profiles
- **`savitri`:** Contains 2 backdated earlier sessions (Session 1: ~6 months ago, CSI ~78; Session 2: ~3 months ago, CSI ~68; Current Session: CSI ~58). Shows clear downward trajectory.
- **`lakshmi`:** Contains 1 backdated earlier session (~4 months ago, CSI ~85; Current Session: CSI ~84). Shows stable personal baseline.

---

## 3. Demo Studio Architecture & Component Design

### 3.1 Strict Isolation Principle
1. **Zero Production Coupling:** Production modules (`backend/life_memory_matcher.py`, `backend/unified_scorer.py`, `src/services/report.ts`, etc.) contain zero references to scenario IDs or persona names.
2. **Lazy Loading:** Frontend Demo Studio UI is wrapped in `React.lazy()` and only imported when `?demo=1` is in the URL or `VITE_DEMO_MODE === "true"`. A production build without this flag leaves the chunk unbundled.
3. **Automated Scanning Test:** `tests/test_demo_isolation.py` scans all engine code and fails if any scenario keyword (`lakshmi`, `ramesh`, `savitri`, `abdul`, `kamala`, `narayan`) appears in production logic.

### 3.2 Visible Live Autofill Engine (`demo/autofill.ts`)
- Features a human-like typing animation with field highlighting, step transitions (Step 1 $\rightarrow$ 5), speed selection (`Natural` ~40ms/char, `Fast` ~10ms/char, `Instant`), Pause/Resume, and a `Skip Animation` button.
- **Dynamic Date Rebasing:** Checks scenario recent-event dates and rebases them to `today - 3 days` and `today - 6 days` if stale, ensuring valid test execution while logging the rebase clearly.
- **Full Interactivity:** After autofill finishes, every field remains fully editable.

### 3.3 Audio Source Selector (`demo/audioManager.ts`)
Three seamless audio injection paths feeding into the identical processing pipeline:
1. **Demo Audio (Default):** Streams pre-generated synthetic WAV files for that scenario and question with natural pauses and delays.
2. **User Uploaded Audio:** Accepts drag-and-dropped `.wav` or `.mp3` audio files.
3. **Live Microphone:** Uses real-time Web Audio API / MediaRecorder capture.
- Displays an honest badge: `"Source: demo audio (synthetic)"` / `"Source: uploaded file"` / `"Source: live microphone"`.

### 3.4 Pipeline Inspector Panel
Streams real-time execution metrics during testing:
- **Audio Stage:** Duration, SNR estimate (dB), RMS level, source.
- **ASR Stage:** Transcribed text, detected language code, confidence, latency (ms).
- **Match Decision Layer:** Layer that matched (exact, alias, numeric tolerance, fuzzy, phonetic, semantic), match confidence, matched string, credit awarded ($1.0, 0.6, 0.5, 0.25, 0.0$).
- **Scoring Stage:** Step-by-step formula evaluation ($CSI = \sum w_k V_k$), active/renormalized weights, safety overrides triggered, discordance codes, confidence deductions, config version & SHA-256 hash.
- **Proof Features:**
  - **What-If Re-Run:** Edit any input (e.g., toggle hearing aid, change an answer, modify an informant item) and recalculate live to see the before/after delta and drivers.
  - **Determinism Check:** Re-runs identical inputs and asserts identical output bit-for-bit.
  - **Trace Export:** Download complete JSON audit trace.

---

## 4. Audio Generation Pipeline (`scripts/generate_demo_audio.py`)

- **Synthesis Engine:** Uses `gTTS` / PyAV for high-quality spoken audio in English, Hindi, and Kannada.
- **Acoustic Nuance Injection:**
  - Leading silence padding matching realistic elder response latency ($1.2\text{s} - 4.5\text{s}$).
  - Filler syllables ("umm", "uh", "yaad nahi aa raha", "nenapilla").
  - Background noise mixing for `narayan` (ambient background noise at SNR ~10 dB).
- **Override Support:** Checks `demo/audio_override/<scenario_id>/<file>.wav` first; if present, uses user-provided audio instead of synthetic TTS.

---

## 5. Verification Plan

1. **Isolation Test:** `python backend/tests/test_demo_isolation.py` (0 scenario references in production engine).
2. **Schema & Validation Test:** All 6 scenario `profile.json` pass `validateLifeFactsForScreening`.
3. **Audio Generation:** Generate and verify all WAV files for all 6 scenarios.
4. **Historical Seeding:** Seed earlier sessions for `savitri` and `lakshmi` through the real pipeline.
5. **End-to-End Execution:** Run all 6 scenarios through live ASR/matching/scoring and record real metrics in `docs/DEMO_VERIFICATION.md`.
6. **Production Build Gate:** `npx tsc --noEmit` and `npm run build` verify 0 errors and zero deadweight demo code.
