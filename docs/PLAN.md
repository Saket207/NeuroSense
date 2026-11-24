# Implementation Plan: Family-Verified Life Memory Check & Unified Cognitive Screening Score (CSI)

**Document Version:** 1.0.0  
**Status:** Phase 0 Completed — Ready for Phased Implementation  
**Project:** NeuroSense (Quantum-Classical Acoustic & Cognitive Screening Aid)  
**Clinical Scope:** Non-diagnostic clinical decision-support and referral aid for early cognitive decline and mild cognitive impairment (MCI) in elderly populations.

---

## 1. Executive Summary & Clinical Rationale

Early detection of cognitive decline in India faces severe barriers:
1. **Late Presentation & Stigma:** Families often dismiss early memory loss as normal ageing ("bholepan").
2. **Shortage of Specialists:** Rural and semi-urban communities lack neurologists, psychometricians, and dedicated memory clinics.
3. **Education & Cultural Bias:** Standard screening tools (e.g., standard MMSE/MoCA questions such as "What year is it?", serial 7 subtractions) are heavily confounded by schooling, literacy levels, and Western cultural constructs.
4. **Language Barriers:** India's elderly speak diverse regional languages and dialects, rendering rigid questionnaires unreliable.

### The Solution: "Family-Verified Life Memory Check"
Generic questions test school-acquired knowledge; the **Family-Verified Life Memory Check** tests recall of the person's **own lived experience** (e.g., child's nickname, native village, landmark near their home, wedding year, recent Sunday family visitor).

**Core Clinical Advantages:**
- **Zero Literacy Bias:** Questions are grounded entirely in personal autobiographical and episodic memory.
- **Ecological Validity:** Early Alzheimer's disease preferentially impairs recent episodic memory while preserving remote personal memories.
- **Concrete Family Evidence:** The assessment generates objective, factual discrepancies ("Could not recall grandson's name without cue") rather than vague impressions, prompting timely medical checkups.
- **Personalized Longitudinal Baseline:** Re-testing tracks individual trajectories against their own baseline over time.
- **Informant Discrepancy Dual Signal:** Combines an objective 3-stage memory test with an informant daily-life change questionnaire, highlighting critical discordance flags (e.g., elder over-compensating or family under-reporting).

---

## 2. Comprehensive Repository Audit

### 2.1 Frontend Architecture (`src/`)
- **Technology Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4.
- **Navigation & Screen State:** State-based screen switching in `src/App.tsx` (`screen` state, `navigate(target)`).
- **Existing Picture-Naming Flow:**
  - `src/App.tsx` contains `case "pictureDesc":` invoking `PictureTaskCard` (Cookie Theft / scene description illustration).
  - Prompts are currently localized across multiple languages with `pictureDescSub` ("Tell us what you see in the picture").
  - Audio capture is managed via `src/services/audioRecorder.ts` (`MediaRecorder` API) and `src/services/noiseCheck.ts` (Web Audio API RMS signal-to-noise ratio check).
- **Existing Scoring & Battery:**
  - Standardized tasks in `src/App.tsx`: Animal Fluency (60s), Delayed 5-Word Recall, Sustained Vowel Phonation (`/a/`), Daily Check-in.
  - Scores are currently tracked as separate sub-task cards and individual battery flags.
- **Existing Report Generation:**
  - `src/services/report.ts` formats an HTML-printable document with base64 logo, SNR estimate, risk tier (`low`, `amber`, `elevated`), and battery pass/fail cards.
- **Storage & Identity:**
  - Local persistence: IndexedDB database `NeuroSense_DB` with object stores (`screenings`, `household`, `doctor_notes`) in `src/services/db.ts` and `src/services/household.ts`.
  - Cloud persistence: Supabase Auth metadata and Storage bucket `neurosense-recordings` for avatars and audio recordings in `src/services/supabase.ts`.

### 2.2 Backend Architecture (`backend/`)
- **Technology Stack:** Python 3.11 / 3.13 + FastAPI + Uvicorn + PyTorch + PennyLane + Faster-Whisper + Librosa + Scikit-Learn.
- **Virtual Environment:** Configured in `backend/.venv` with PennyLane, PyTorch 2.6.0+cpu, and audio/ASR packages.
- **Key API Routes:**
  - `POST /api/analyze-audio`: Synchronous multi-stage acoustic screening (audio decoding, Faster-Whisper transcription, spaCy linguistic extraction, 22-feature assembling, PennyLane quantum hybrid inference, Monte Carlo dropout).
  - `POST /api/screenings`: Asynchronous job creation handled by `backend/job_manager.py`.
  - `GET /api/screenings/{recording_id}`: Polling endpoint for screening progress.
  - `POST /api/auth/*`: Patient & Caretaker authentication, salted PIN verification, OTP generation.
- **Existing Task Scorers (`backend/task_scoring.py`):**
  - Canonical implementations for `fluency` (animal count / 60s), `recall` (5 words MoCA format), `phonation` (MPT >= 10s, jitter/shimmer/HNR), and `daily`.

### 2.3 Audit of Trained Python Models, Notebooks & Artifacts
A thorough audit of `final.ipynb`, `backend/models/`, and `docs/MODEL_PROVENANCE_AUDIT.md` reveals:

1. **Model Artifact (`backend/models/neurosense_quantum_hybrid_model.pt`):**
   - **Architecture:** PyTorch Classical Encoder (`22 -> 16`) -> PennyLane 8-Qubit Variational Quantum Circuit (`AngleEmbedding` rotation="Y" + `BasicEntanglerLayers` 3 layers × 8 qubits with RY rotation) -> Residual Skip Connection (`22 + 8 -> 8 -> 1`).
   - **Weight Tensor Shapes:** `encoder.0.weight`: `(16, 22)`, `quantum.weights`: `(3, 8)`, `skip.weight`: `(8, 30)`, `out.weight`: `(1, 8)`.
   - **Strict Loading:** Verified via strict state-dict loading without missing or unexpected keys.
2. **Preprocessor Artifacts:**
   - `neurosense_qh_scaler.pkl`: `StandardScaler` fitted on exactly 22 training features.
   - `neurosense_qh_imputer.pkl`: `SimpleImputer(strategy='median')` providing reference medians for all 22 features.
   - `neurosense_qh_selected_features.json`: Ordered list of 22 contract features (`CTP_F0 SD(st)`, `CTP_DPI(ms)`, ..., `CTP_unique_IU_efficiency`).
   - `neurosense_qh_evaluation.json`: Test metrics on upstream benchmark (N=94 test samples, Accuracy: 0.8830, Precision: 0.8913, Recall: 0.8723, Specificity: 0.8936, ROC-AUC: 0.9430, PR-AUC: 0.8931).
3. **Training Provenance & Cross-Linguistic Finding:**
   - As documented in `docs/MODEL_PROVENANCE_AUDIT.md`, `final.ipynb` trained on pre-computed feature tables from Xunfei, Tencent, and AliYun Chinese ASR outputs.
   - The upstream model features reflect Mandarin tokenization and acoustic moments.
   - To prevent domain saturation, `backend/screening_engine.py` implements calibration safeguards:
     - ±3σ calibration bounding (`_calibrate_to_training_support`).
     - Adaptive acoustic silence envelope.
     - Epistemic uncertainty quantification via 30 Monte Carlo Dropout stochastic passes.
     - Language calibration transfer layer (`backend/language_calibration.py`).
4. **Clinical Policy for Model Integration:**
   - In accordance with Section 12 of the build prompt, the 22-feature quantum-hybrid acoustic model will be exposed through a unified model interface.
   - Its probability will feed into the unified Cognitive Screening Index (CSI) under the Speech & Acoustic component (S) when audio meets quality criteria; if speech is uncalibrated or sample is insufficient, the unified engine cleanly renormalizes remaining cognitive weights without fabrication.

---

## 3. What Exists vs. What We Will Reuse vs. What We Will Add

| Component | Existing in Repo | Action | Plan & Enhancements |
|---|---|---|---|
| **Picture-Naming Test** | Implemented as `pictureDesc` task in `src/App.tsx` and `backend/screening_engine.py` | **REUSE & ADAPT** | Retain existing test flow; map output to unified Naming Score ($N \in [0, 100]$); apply retry-on-unclear and latency tracking. |
| **Acoustic ML Model** | PennyLane 8-qubit quantum-classical hybrid model (`neurosense_quantum_hybrid_model.pt`) | **REUSE & WRAP** | Wrap in a standardized Python model interface with load-time validation, sanity checks, and strict contract verification. |
| **Audio Capture & VAD** | `src/services/audioRecorder.ts` and `src/services/noiseCheck.ts` | **REUSE & EXTEND** | Add pre-session volume/hearing check, ambient noise gating, response latency tracking, and pause analysis. |
| **Family Setup Wizard** | Basic 1-step registration form | **NEW (ADD)** | Full 5-step detailed wizard: Elder profile, 10 required + 5 optional life facts + 2 expiring recent events, 16-item daily-life questionnaire, confounders, informed consent. |
| **Life Memory Match Engine** | None | **NEW (ADD)** | Deterministic 3-stage retrieval (Free $\rightarrow$ Cued $\rightarrow$ Recognition), credit system (1.0, 0.6, 0.5, 0.25), layered matching (Unicode NFC, aliases, phonetic transliteration, fuzzy edit distance, and strict LLM semantic judge fallback). |
| **Unified Scoring Engine** | Disjoint battery flags & binary ML risk | **NEW (ADD)** | Unified Cognitive Screening Index ($CSI \in [0, 100]$) combining Life Memory ($M$), Naming ($N$), Speech ($S$), and Informant ($I$). Config-driven weights, safety overrides, discordance flags, confidence calculation, education adjustment. |
| **Language Layer** | Hardcoded translation strings in `src/App.tsx` | **NEW (ADD)** | Data-driven language registry supporting English, Hindi, and Kannada, extensible to other Indic languages. Short, natural spoken phrasing. |
| **Bilingual Reports** | HTML report in `src/services/report.ts` | **EXTEND & UPGRADE** | Comprehensive PDF & HTML export in English, Hindi, and Kannada. Two-part structure: Clinician Summary + Family-Friendly Summary. |
| **Longitudinal Trends** | Single session history list | **NEW (ADD)** | Multi-session trend tracking of CSI and individual domains, question rotation, recent-event expiration enforcement, and significant-drop detection. |
| **Security & Privacy** | LocalStorage + partial Supabase | **EXTEND & HARDEN** | DPDP Act 2023 compliance, raw audio auto-deletion default, full consent tracking, complete data-wipe functionality. |

---

## 4. Phase-by-Phase Implementation Roadmap

### Phase 1: Architectural Foundations, Language Registry & Versioned Configuration
- Create `backend/scoring_config.json` containing versioned weights, thresholds, discordance rules, education adjustments, and credit multipliers.
- Implement `src/services/languageRegistry.ts` and `backend/language_registry.py` containing prompt text, UI strings, ASR codes (`en`, `hi`, `kn`), and transliteration maps for English, Hindi, and Kannada.
- Implement `backend/scoring_config.py` for type-safe config loading, validation, and version tracking.

### Phase 2: Feature 1 — Detailed Family Setup Wizard (Frontend & Storage)
- Implement `src/components/familySetup/FamilySetupWizard.tsx` with 5 clear steps:
  - **Step 1: Elder Profile** (Name, DOB/age, sex, languages spoken/preferred, schooling years/literacy, informant relationship, frequency of contact, living situation).
  - **Step 2: Life Facts Intake** (10 required + 5 optional facts, aliases, category, cues, 2 distractors, sensitive skip toggle, and at least 1 recent event with date validation).
  - **Step 3: Daily-Life Changes Questionnaire** (16 original items comparing to 5 years ago: frequency, onset timeline, concrete examples).
  - **Step 4: Confounders Checklist** (Hearing, vision, recent sleep, bereavement, acute illness, sedating drugs, today's tiredness/anxiety).
  - **Step 5: Informed Consent** (Caregiver consent and elder verbal assent recorder).
- Save setup drafts to IndexedDB store `family_setup` and Supabase cloud metadata so intake can be resumed seamlessly.

### Phase 3: Feature 4 — Life Memory Match Engine (Backend & Frontend)
- Create `backend/life_memory_matcher.py`:
  - **Layer 1:** Text normalisation (Unicode NFC, strip punctuation, lowercase, number word to digit conversion in English, Hindi, and Kannada).
  - **Layer 2:** Exact and alias matching against accepted family nicknames and variations.
  - **Layer 3:** Fuzzy string distance and phonetic/transliteration-aware matching (preventing false collisions like "Ravi" vs "Raju").
  - **Layer 4:** Numeric tolerance evaluation (e.g., marriage year within $\pm 2$ years = correct, within $\pm 5$ years = partial).
  - **Layer 5:** Strict LLM semantic judge fallback (temperature 0, structured JSON schema output: `label`, `confidence`, `matched_text`, `reason`).
- Implement 3-stage retrieval scoring: Free recall (1.0 / 0.6) $\rightarrow$ Cued recall (0.5) $\rightarrow$ Recognition (0.25).
- Output Life Memory Match Score ($M \in [0, 100]$) and remote vs. recent recall comparison.

### Phase 4: Feature 2 & Feature 3 — Voice Guide, Speech Capture & Latency Tracking
- Enhance `src/services/audioRecorder.ts` and `src/components/voiceGuide/`:
  - Ambient noise pre-flight check with actionable instructions.
  - Hearing & speaker volume confirmation prompt.
  - Practice question (neutral topic, unearned credit) to establish user familiarity.
  - Clear, patient voice guide (speech rate ~0.85x, 10s gentle repeat prompt, 25s patience timeout).
  - Response latency measurement via Voice Activity Detection (VAD timestamping).
  - Large Repeat button, live audio visualizer, captions, and helper rule banner ("Helper must not prompt answers").

### Phase 5: Feature 5 & Feature 6 — Unified Scoring Engine & Model Wrapper
- Create `backend/unified_scorer.py`:
  - Computes Informant Concern Score ($I \in [0, 100]$) with domain breakdowns, onset weighting, and informant frequency reliability adjustment.
  - Computes Cognitive Screening Index:
    $$CSI = w_M \cdot M + w_N \cdot N + w_S \cdot S + w_I \cdot (100 - I)$$
  - Dynamically renormalizes weights if any component is missing or unusable.
  - Evaluates clinical risk tiers: Green ($\ge 75$), Amber ($55 - 74$), Red ($< 55$).
  - Applies safety overrides (recent onset safety items elevate tier to at least Amber).
  - Evaluates Discordance Flags (Family high concern + Elder good performance; Family low concern + Elder poor performance).
  - Calculates confidence metric ($0 - 100\%$) based on ASR confidence, SNR, completeness, and confounders. Drops to "Inconclusive: please re-test in better conditions" if confidence is low.
  - Computes schooling/education band widening for elders with little or no formal schooling.
  - Generates top-3 explainable drivers in plain language.
- Wrap `backend/model_loader.py` into a standardized `BaseCognitiveModel` interface in `backend/model_interface.py`.

### Phase 6: Feature 7 — Clinician & Family Bilingual Reporting
- Upgrade `src/services/report.ts` and add backend PDF generator `backend/report_generator.py`:
  - **Clinician Summary:** Patient demographics, schooling, testing date/administrator, concern level, confidence, CSI domain breakdown radar/bar chart, item-by-item life facts table (question, target, transcript, stage, score, latency), picture-naming metrics, speech features, informant domain scores, confounders, discordance flags, longitudinal trend, mandatory clinical disclaimer.
  - **Family-Friendly Summary:** Simplified plain-language overview in test language (English, Hindi, Kannada), actionable guidance, reassurance that screening is not a diagnosis, and doctor discussion tips.

### Phase 7: Feature 8 — Longitudinal Trends & Re-Testing
- Create `src/services/trends.ts` and backend route `GET /api/trends/{patient_id}`:
  - Store complete multi-session evaluations in IndexedDB and Supabase.
  - Enforce recent-event expiration check (must be within 7-14 days; requires refresh if stale).
  - Rotate question phrasing and randomize order across sessions while using verified facts.
  - Render longitudinal trend visualization (CSI + domain breakdown).
  - Calculate significant decline alerts (configurable drop threshold with sufficient confidence).

### Phase 8: Feature 9 — Privacy, DPDP Act 2023 Compliance & Security
- Add opt-in audio retention toggle (default: audio immediately deleted after transcription & feature extraction).
- Implement cryptographically signed consent logs.
- Add "Wipe All Patient Data" feature executing a complete cascade delete across local IndexedDB and Supabase.
- Strip all PII from server logs.

### Phase 9: Verification & Comprehensive Test Suite
- Build gold test suite `tests/test_life_memory_matcher.py` with 100+ trilingual test cases (exact matches, nicknames, transliterations, near-miss name rejections, numeric tolerances, noise).
- Build `tests/test_unified_scorer.py` verifying monotonicity, determinism, weight renormalisation, threshold boundaries, and safety overrides.
- Build end-to-end integration tests verifying API flow from life facts setup $\rightarrow$ audio submission $\rightarrow$ matching $\rightarrow$ scoring $\rightarrow$ report.
- Execute full TypeScript, formatting, and linting checks (`npx tsc --noEmit`, `npx oxfmt src`, `npm run build`).
- Compile findings and live metrics into `docs/VERIFICATION.md`.

---

## 5. Explicit Assumptions & Methodological Guardrails

1. **Non-Diagnostic Nature:** NeuroSense is strictly a preliminary screening and clinical referral aid. It will never output diagnostic labels such as "Alzheimer's" or "Dementia".
2. **Provisional Thresholds:** All weights, scoring bands, and cutoffs are provisional until calibrated on clinical cohort data. This is documented explicitly in the UI and report footers.
3. **Indic Transliteration:** Spoken answers in Hindi or Kannada may be transcribed by Whisper in native Devanagari/Kannada script or Romanized Latin script. The matching pipeline normalizes both representations before matching.
4. **Recent Event Expiration:** Recent facts older than 14 days without an updated date are excluded from scoring, with clear notification to the family.
5. **No Synthetic Fallbacks:** If audio is corrupted or model inference fails, the system outputs "Not available" and appropriately lowers confidence rather than generating synthetic approximations.
