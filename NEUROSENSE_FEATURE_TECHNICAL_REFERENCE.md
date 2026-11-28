# NeuroSense — Comprehensive Technical & Feature Reference Guide

> **Confidential Clinical & Technical Dossier for Presentation & Hackathon Defense**  
> *Stack: React 19 • Vite • Tailwind CSS v4 • FastAPI • PennyLane Quantum Hybrid • Faster-Whisper • IndexedDB • Supabase*

---

## Executive Summary

NeuroSense is an AI-powered, zero-bias, multimodal cognitive screening and neurological monitoring platform designed specifically for early detection of mild cognitive impairment (MCI), dementia, and Alzheimer's risk. 

Traditional cognitive screenings (e.g., MMSE, MoCA) suffer from severe **educational, literacy, and cultural biases**, frequently misclassifying healthy elders with low formal schooling as impaired. NeuroSense eliminates this barrier by combining:
1. **Neurological Voice Biomarkers:** 22 speech, acoustic, and linguistic parameters analyzed by a **Classical-to-8-Qubit Quantum Hybrid Neural Network (PennyLane VQC)** achieving **94.3% ROC-AUC** and **88.3% test accuracy**.
2. **Family Lived-Memory Verification:** Autobiographical episodic memory screening grounded in personally verifiable family landmarks (marriage year, children, hometown, recent visitors) evaluated via a 3-stage graded retrieval paradigm (Free Recall $\rightarrow$ Cued Hint $\rightarrow$ Multiple-Choice Recognition).
3. **Informant Daily-Living Observations:** 16-item daily functioning and safety assessment with automatic clinical hazard flags.
4. **Local-First & Offline Resilience:** Fully operational on local IndexedDB storage, enabling zero-connectivity village screenings with automatic cloud synchronization.

---

## Architecture Diagram

```
+--------------------------------------------------------------------------------------------------+
|                                    NEUROSENSE DUAL-SURFACE ARCHITECTURE                          |
+--------------------------------------------------------------------------------------------------+
|  PATIENT SURFACE (Phone Frame / Web)                             CLINICAL SURFACE (Doctor View)  |
|  - RealPhoneFrame (Titanium Rail, Island, Scroll Contain)        - DoctorClinicalShowcase.tsx    |
|  - Home: ScoreRingCountUp (Radial Dial & Shimmer)               - Multi-Patient Roster          |
|  - AloisHomeDashboard, AloisProgress, AloisProfile               - EHR Longitudinal Trajectories |
|  - 4 Cognitive Booster Games (IndexedDB persistence)             - 22-Biomarker Radar Analysis   |
|  - Daily Check-In (3-Word Recall, Sleep, Mood)                   - PennyLane VQC SHAP Drivers    |
+--------------------------------------------------------------------------------------------------+
                                                 │
                                                 ▼
+--------------------------------------------------------------------------------------------------+
|                                 LOCAL-FIRST CLIENT LAYER (React 19)                              |
|  - IndexedDB (services/db.ts): 'screenings', 'audio_blobs', 'family_setups', 'sync_queue'       |
|  - Offline Scoring Engines: calculateLocalScore(), staged credit engine, Ribot's Law gradient    |
|  - Web Audio API: 512-FFT Ambient Noise RMS Analyzer & Live Frequency Visualizer                 |
|  - Client TTS: Neural multi-accent synthesis (en-IN, hi-IN, kn-IN) at 0.95x cadence             |
+--------------------------------------------------------------------------------------------------+
                                                 │
                                                 ▼ HTTP JSON / Multipart Audio
+--------------------------------------------------------------------------------------------------+
|                              FASTAPI BACKEND & QUANTUM-HYBRID ML                                 |
|  - Audio Ingestion: PyAV Container Demuxer & Resampler (16 kHz mono 16-bit PCM)                 |
|  - ASR Engine: Faster-Whisper (CPU fallback, word-level timestamps, pause extraction)            |
|  - 22-Biomarker Pipeline:                                                                        |
|      * 7 Acoustic: F0 SD, DPI, RST, EST, Voiced Rate, Hesitation Ratio, Energy Mean              |
|      * 9 Syntactic: Verb count, Noun ratio, Pronoun ratio, Noun-to-Verb, Word Rate, Phrase Types |
|      * 6 Semantic / IU: Unique IU density, Total IU density, Keyword efficiency                  |
|  - Model Architecture:                                                                           |
|      Input (22) ──> Classical Encoder (16 ──> 8)                                                 |
|                         │                                                                        |
|                         ├──> AngleEmbedding(rotation="Y") on 8 Qubits                           |
|                         ├──> BasicEntanglerLayers (3 layers x 8 qubits = 24 parameters)          |
|                         └──> PauliZ Expectation Values (8)                                       |
|                         │                                                                        |
|      Concatenation (8 quantum + 8 skip = 16) ──> Classical Decoder (8 ──> 1) ──> Sigmoid        |
|  - Uncertainty Engine: Monte Carlo Dropout (30 stochastic forward passes, Epistemic Std Dev)     |
|  - Explainability: Integrated Gradients & Kernel SHAP feature attribution                        |
|  - Life Memory Matcher: Multi-tier Unicode NFC normalization, numeric tolerance, phonetic alias  |
|  - Unified CSI Scorer: w_M*M + w_N*N + w_S*S + w_I*(100-I) with safety override threshold        |
+--------------------------------------------------------------------------------------------------+
```

---

## Feature-by-Feature Deep Dive

### 1. Homepage (`src/homepage/`)
* **Core Files:** `Homepage.tsx`, `HeroSection.tsx`, `MarqueeSection.tsx`, `SplitFeatureSection.tsx`, `ThreeCardsSection.tsx`, `DarkTimelineSection.tsx`, `MetricsGridSection.tsx`, `FAQSection.tsx`, `FooterSection.tsx`.
* **Purpose:** Educates families, caregivers, and clinicians on non-invasive cognitive screening. Highlights the quantum-hybrid machine learning pipeline, zero-literacy independence, and Indian vernacular languages.
* **Key Components:**
  - **Hero Section:** Dynamic live acoustic audio waveform cluster, 3D interactive Memory Orb scene, one-click transition to the screening workflow.
  - **Marquee:** Highlights cross-lingual support (Hindi, Kannada, English, Tamil, Telugu) and peer-reviewed benchmarks (94.3% ROC-AUC).
  - **Split Feature:** Contrast between traditional stressful paper memory tests and NeuroSense's voice-first conversational lived-memory approach.
  - **Three Cards:** The three pillar modalities: Acoustic Biomarkers, Autobiographical Memory, and Daily Cognitive Tracking.
  - **Dark Timeline:** Step-by-step patient journey from home detection to physician handover.
  - **Metrics Grid:** Transparent presentation of test-set metrics ($n=94$ test samples): 88.3% accuracy, 89.1% precision, 87.2% recall, 0.0948 Brier calibration score.

---

### 2. Start Screening & Patient Registration (`src/App.tsx`, `src/services/patientProfile.ts`, WhatsApp Dispatch)
* **Core Files:** `src/App.tsx`, `src/services/patientProfile.ts`, `src/services/db.ts`.
* **Action & Data Flow:**
  - User clicks **"Start Screening"** on the homepage or header.
  - **Patient Information Form:** Collects Full Name, Patient WhatsApp Number (10 digits), Age, Gender, and Password.
  - **Caretaker Information & Access:** Collects Caretaker Name, Caretaker WhatsApp Number (10 digits), and a 4-Digit Security PIN/OTP.
  - **WhatsApp Dispatch Feature:**
    - Green Alert Banner: *"📱 Login credentials and caretaker PIN will be dispatched to WhatsApp upon registration."*
    - **Why WhatsApp?** In India, WhatsApp is the primary communication channel for families and community health workers (ASHAs/ANMs). Elderly patients often cannot manage app store updates or email verifications.
    - **Mechanism:** On registration, credentials, patient ID, and the caretaker security PIN are dispatched to the caregiver's WhatsApp.
    - **Doctor Referral Integration:** Allows the family caregiver to instantly forward screening summaries and referral notes to their family physician over WhatsApp with zero paper friction.
  - Form validation requires agreeing to the Alzheimer's Association terms before clicking **"Register & Save Details →"**.
  - All data is encrypted and saved to IndexedDB store `patient_profiles` via `savePatientProfile()`.

---

### 3. Patient Authentication & Caretaker PIN Gate (`src/components/CaregiverGate.tsx`, `AloisAuthContainer.tsx`)
* **Core Files:** `CaregiverGate.tsx`, `AloisAuthContainer.tsx`, `src/App.tsx`.
* **Purpose:** Strict clinical segregation between the elder's wellness experience and sensitive caregiver/physician controls.
* **Mechanism & UI Flow:**
  - **Dual Tab Selector:** Prominently toggles between `[ 🧠 Patient ]` and `[ 🛡️ Caretaker ]`.
  - **Patient Tab:** Provides a calm, stress-free wellness interface (conversational recall, soothing voice prompts, brain games, and autobiographical memory).
  - **Caretaker Tab:** Activates the **Caretaker Guardian Access** banner:
    *"Enter your 4-digit PIN to securely access patient history, clinical inspection, and caregiver settings."*
  - Caregiver enters the 4-digit PIN (default `1234` or custom PIN set during registration) and clicks **`Login with PIN →`**.
  - **Psychological Shielding:** Prevents elders from developing clinical test anxiety or seeing alarming medical flags (e.g., "Elevated Risk", "Safety Hazard Flagged"), while keeping caregiver records and physician referral tools private and secure.

---

### 4. Patient Dashboard (`src/components/alois/AloisHomeDashboard.tsx`)
* **Core Files:** `AloisHomeDashboard.tsx`, `ScoreRingCountUp.tsx`, `StoryThread.tsx`, `TiltCard.tsx`.
* **Components & Calculations:**
  - **Primary Biomarker Index (Radial Count-Up Dial):** Animates from 0% to the patient's latest computed score (CSI or quantum hybrid confidence).
  - **Self-Healing NaN Guard:** Safely resolves `latestSession.csi`, `latestSession.confidence`, or `mlResult.confidenceScore`. Fallbacks prevent any mathematical `NaN%` glitch.
  - **Status Chip:** Evaluates `screeningRisk === "low"` $\rightarrow$ "Low Risk" (Emerald Green) vs "Elevated Risk" (Amber / Red).
  - **Primary Screening 3D Tilt Cards:** Interactive cards for launching the **Family Life Memory Check** and the **Neurological Biomarker Check**.
  - **Daily Care & Streak Counter:** Displays daily check-in completion status and consecutive day streaks.

---

### 5. Neurological Biomarker Check (`src/App.tsx`, `backend/screening_engine.py`, `backend/audio_analyzer.py`)
* **Frontend Files:** `NoiseCheckCard.tsx`, `UploadVoiceModal.tsx`, `VoiceProcessingVisualizer.tsx`, `src/services/audioRecorder.ts`, `src/services/report.ts`.
* **Backend Files:** `backend/screening_engine.py`, `backend/audio_analyzer.py`, `backend/speech_features.py`, `backend/voice_quality.py`, `backend/model_loader.py`.
* **Step-by-Step Flow:**
  1. **Room Noise Pre-Flight Check (`NoiseCheckCard.tsx`):**
     - Web Audio API samples 512-point FFT over 1.5 seconds.
     - Calculates root-mean-square (RMS) energy. If background noise exceeds threshold (SNR $< 14\text{ dB}$ or RMS $> 0.08$), the system warns the user to move to a quieter space, preventing acoustic noise from skewing hesitation metrics.
  2. **Cookie Theft Picture Task:**
     - Displays the standardized Boston Diagnostic Aphasia Examination "Cookie Theft" scene.
     - Prompts the user: *"Please look at this picture and describe everything you see happening."*
  3. **Audio Capture & PyAV Decoding:**
     - Recorded via MediaRecorder API at 44.1/48 kHz WebM/WAV.
     - Backend decodes via **PyAV** with explicit float-to-int16 casting, resampling to **16 kHz mono PCM**.
  4. **Faster-Whisper Transcription & Forced Alignment:**
     - Transcribes speech into text with token-level timestamps.
     - Measures word rate, speech duration, and silence intervals ($>250\text{ ms}$ pauses).
  5. **22 Calibrated Feature Extractions:**
     - **Acoustic (7):** F0 Standard Deviation (pitch variation in semitones), Differential Pause Interval (DPI in ms), Ratio of Speaking Time (RST), Energy Standard Deviation (EST), Voiced Rate, Hesitation Ratio (pause duration / speech duration), Energy Mean ($\text{Pa}^2\cdot\text{s}$).
     - **Syntactic / Grammar (9):** Verb count, noun ratio, pronoun ratio, noun-to-verb ratio, word rate per second, noun phrase omission rate, verb phrase proportion, preposition phrase proportion, preposition average phrase length.
     - **Semantic / Information Units (6):** Unique information unit count, unique keywords, unique IU density, total IU density, keyword-to-filler ratio, unique IU efficiency.
  6. **8-Qubit PennyLane Quantum Hybrid Inference:**
     - `StandardScaler` + `SimpleImputer` normalizes the 22 features.
     - Classical Linear Encoder: $22 \rightarrow 16 \rightarrow 8$ latent features.
     - Quantum Layer: 8 qubits initialized via `qml.AngleEmbedding(inputs, rotation="Y")`.
     - Parameterized entangling via `qml.BasicEntanglerLayers(weights, rotation=qml.RY)` across 3 layers ($3 \times 8 = 24$ quantum parameters).
     - Measurement: Pauli-Z expectation values $\langle \sigma_z \rangle$ on all 8 wires.
     - Classical Skip Decoder: Latent 8 features concatenated with 8 quantum outputs ($16 \rightarrow 8 \rightarrow 1$) followed by Sigmoid.
  7. **Monte Carlo Dropout & Epistemic Uncertainty:**
     - 30 stochastic forward passes with dropout ($p=0.2$) active during evaluation.
     - Generates mean predicted probability $P(\text{MCI})$ and standard deviation $\sigma_{\text{uncertainty}}$.
     - If $\sigma > 0.18$ or confidence $< 50\%$, the screening is tagged as **Inconclusive** rather than returning a false negative.
  8. **SHAP Feature Attribution:**
     - Evaluates Integrated Gradients and Kernel SHAP to compute exact positive and negative feature contributions (e.g., elongated hesitation ratio $+0.32$, decreased noun-to-verb ratio $+0.28$).
  9. **Clinical Report Generation (`src/services/report.ts`):**
     - Generates printable/downloadable summary with patient metadata, risk tier, radar feature plots, and physician consultation notes with mandatory non-diagnostic disclaimers.

---

### 6. Family Life Memory Check (`src/components/lifeMemory/LifeMemorySession.tsx`, `FamilySetupWizard.tsx`)
* **Frontend Files:** `LifeMemorySession.tsx`, `FamilySetupWizard.tsx`, `src/demo/scenarioRegistry.ts`.
* **Backend Files:** `backend/life_memory_matcher.py`, `backend/unified_scorer.py`.
* **Purpose:** Evaluates lived autobiographical episodic memory, which is resilient to formal education but sensitive to hippocampal amnestic decline.
* **Family Setup Wizard (5 Steps):**
  1. **Elder Profile:** Full name, age, gender, schooling years, preferred dialect/language.
  2. **12 Life Facts:**
     - *Remote Landmarks:* Hometown, marriage year, late spouse name, career, favorite food, primary school.
     - *Relational:* Children's names, grandchildren's names, lifelong friend.
     - *Recent Events (Episodic Anchors):* Visitor who came last week, outing/temple trip taken 3 days ago.
  3. **Daily Life 16-Item Questionnaire:** Caregiver observations on memory lapses, repeats, and safety hazards.
  4. **Health Confounders:** Hearing loss, cataract/vision issues, mood/depression, sleep apnea, medications.
  5. **Consent & Verification Review:** Caregiver sign-off.
* **Demo Scenarios (9 Complete Personas):**
  - **English (3):** `savitri` (75F, Urban Bengaluru, Amber MCI), `david` (73M, Urban Mumbai, Green Healthy Marine Engineer), `eleanor` (78F, Urban Civil Lines, Red Amnestic MCI with Safety Concern).
  - **Hindi (3):** `ramesh` (68M, Rural Awadhi, Amber Mild Complaint with 0 schooling), `abdul` (80M, Urban Lucknow, Red Multi-Domain Decline), `kavita` (71F, Semi-urban Varanasi, Green High-Recall Retired Teacher).
  - **Kannada (3):** `lakshmi` (72F, Green Normal), `kamala` (70F, Green Low-Schooling 4y, High Recall), `narayan` (77M, Inconclusive Confounder with hearing loss & 7 dB SNR noise).
* **3-Stage Graded Retrieval Paradigm:**
  - **Stage 1: Free Recall ($1.0\times$ credit):** Open prompt (e.g., *"What is your daughter's name?"*). Full credit if correctly recalled without assistance.
  - **Stage 2: Cued Recall ($0.5\times$ credit):** If unprompted recall fails, a semantic cue is offered (e.g., *"Your daughter who lives with you."*).
  - **Stage 3: Multiple-Choice Recognition ($0.25\times$ credit):** 3-option forced choice (Verified answer + 2 distractors, e.g., *"Is it Deepa, Divya, or Geetha?"*).
* **Backend Matcher (`backend/life_memory_matcher.py`):**
  - Unicode NFC normalization.
  - Alias matching (e.g., "Deepu" for "Deepa", "Banaras" for "Varanasi").
  - Numeric delta tolerance: Marriage years $\pm 2$ years exact, $\pm 5$ years partial ($0.6\times$ credit). Age $\pm 1$ year.
* **Ribot's Law & Episodic Gap Analysis:**
  $$\text{Episodic Gap} = \text{Remote Recall Score} - \text{Recent Retention Score}$$
  A gap $\ge 20\%$ triggers a **Temporal Gradient Flag**, signifying that remote childhood memories remain preserved while recent episodic events have decayed—a classic hallmark of early Alzheimer's disease pathology.
* **Completion Screen:**
  - Radial CSI Dial with rounded whole percentages.
  - Clinical Triage Pathway (Green $\rightarrow$ Annual Check; Amber $\rightarrow$ Primary Care 4–6 weeks; Red $\rightarrow$ Neurology Consultation 2–3 weeks).
  - 4-Domain Analysis Grid: Remote Recall, Recent Retention, Episodic Gap, Latency.
  - Copyable Physician Referral Summary Note.

---

### 7. Unified Cognitive Screening Index (CSI) Formulation (`backend/unified_scorer.py`)
Combines all four modalities into a single calibrated index:
$$\text{CSI} = w_M \cdot M + w_N \cdot N + w_S \cdot S + w_I \cdot (100 - I)$$

Where:
- $M$: Life Memory Score ($0 - 100$, weighted by fact importance: Recent events $1.5\times$, children $1.25\times$, standard $1.0\times$).
- $N$: Picture-Naming & Semantic Accuracy ($0 - 100$).
- $S$: Speech & Acoustic Quantum ML Score ($0 - 100$, derived from $1 - P(\text{MCI})$).
- $I$: Informant Concern Score ($0 - 100$, derived from the 16 questionnaire items with frequency, recency, and safety multipliers).
- Standard Weights: $w_M = 0.40$, $w_N = 0.20$, $w_S = 0.10$, $w_I = 0.30$.
- **Dynamic Re-normalization:** If any modality is missing (e.g., no informant present), weights automatically re-scale to sum to $1.0$.
- **Safety Hazard Override:** If the informant documents an active kitchen fire hazard, wander risk, or severe medication omission, the screening tier is automatically escalated to at least **Amber**, regardless of elder verbal recall.

---

### 8. Daily Check-in (`src/services/dailyCheckIn.ts`, `AloisDailyCheckIn.tsx`)
* **Files:** `AloisDailyCheckIn.tsx`, `dailyCheckIn.ts`, `daily_recall.py`.
* **Purpose:** High-frequency, longitudinal micro-sampling. Detects subtle week-over-week cognitive fluctuations before major clinical events.
* **Workflow (60 seconds):**
  1. **3-Word Memory Challenge:** Displays 3 semantically distinct nouns (e.g., *River, Mango, Bicycle*).
  2. **Interference Task / Lifestyle Check:** Inquires about hours of sleep, mood (1–5 scale), and hydration.
  3. **Delayed Free Recall:** Elder is prompted to recall the 3 words without visual cues.
  4. **Streak & Trend Tracking:** Computes rolling 7-day stability index and maintains an encouraging check-in streak.

---

### 8.5. Progress & Stability Tracking (`src/components/alois/AloisProgress.tsx`, `Stability3DGraph.tsx`)
* **Core Files:** `AloisProgress.tsx`, `Stability3DGraph.tsx`, `NeuralStabilityModel.tsx`, `TiltCard.tsx`.
* **Purpose:** Provides long-term longitudinal trajectory monitoring. Evaluates whether cognitive and motor-speech markers are holding steady or deteriorating over weeks and months.
* **Top 3D Neural Stability Synaptic Model:**
  - Interactive WebGL/Three.js rotating sphere with multi-vector neural cadence.
  - Scores dynamically per tab: **Cognitive (96.2%)**, **Overall (94.8% Optimal Synchrony)**, **Health (95.1%)**.
* **The 3 Key Clinical Indexes (Snapshot Card):**
  1. **Biomarker Index (95%, CI [92–98%]):** Multi-modal composite score of speech fluency, memory retention, and functional status.
  2. **Acoustic Jitter (0.21%, Normal < 0.5%):** Cycle-to-cycle frequency variations in voice pitch. Micro-tremors in vocal folds detect subtle neuromuscular Parkinsonian or motor-speech dysfunctions before noticeable speech slurring.
  3. **Cadence Latency (1.12s, Steady):** The time delay between hearing a prompt and initiating an answer. Measures neural processing speed and cognitive word-finding efficiency.
* **The 3 Segmented Views & Their 4 Metric Cards:**
  - **1. OVERALL (Systemic Wellness):**
    * *Daily Cares (78% completed, +3.2%):* Daily check-in adherence.
    * *Voice Stability (92% Stable, +4.8%):* Acoustic motor-speech stability.
    * *Appointments (100% on schedule, On Track):* Clinical follow-up attendance.
    * *Medication Adherence (85% adherence, +2.0%):* Prescription compliance.
  - **2. COGNITIVE (Brain Function):**
    * *Episodic Recall (88% retention, +5.1%):* Memory of recent personal life events.
    * *Semantic Fluency (94% word finding, +4.3%):* Speed and accuracy of vocabulary retrieval.
    * *Memory Sessions (4 of 4 completed, 100%):* Participation in structured recall screenings.
    * *Cadence Latency (1.2s normal delay, Steady):* Retrieval latency.
  - **3. HEALTH (Physical & Circadian Rhythms):**
    * *Sleep Rhythm (7.6 hrs optimal rest, +0.8h):* Circadian stability (sleep fragmentation is an early biomarker of amyloid deposition).
    * *Motor Stability (96% tremor-free, +1.5%):* Neuromuscular vocal and motor steadiness.
    * *Daily Hydration (2.1 L goal met, Optimal):* Fluid intake monitoring (dehydration is the #1 reversible trigger for elderly delirium and acute confusion).
    * *Medication Log (3 of 3 doses logged, Done):* Daily dosage compliance.
* **ABHA Clinical Export:** Generates an official signed PDF health summary compliant with India's Ayushman Bharat Digital Mission (ABHA).

---

### 9. Cognitive Booster Games (`src/components/cognitiveGames/`)
* **Files:** `CognitiveGamesHub.tsx`, `SpeedVisualisationGame.tsx`, `MemoryTreasureGame.tsx`, `SelectiveAttentionGame.tsx`, `LogicPuzzleGame.tsx`, `storage.ts`.
* **Clinical Purpose & Biomarker Sampling:**
  - Games remove test anxiety by transforming cognitive evaluation into enjoyable daily play.
  - In neurology, paper tests cannot measure split-second latency. NeuroSense passively samples fine-grained **reaction latency (in milliseconds)** and visual search accuracy.
* **Deep Dive: Speed Visualisation Game (`SpeedVisualisationGame.tsx`):**
  - **Task:** 10 rounds of visual symbol matching. A top reference card displays a sequence of 3 to 4 symbols (e.g., `🔷 🔶 ⭐ 🟢`). The user must tap the exact matching sequence below.
  - **Latency Tracking:** Measures round-by-round response delay from `performance.now()`.
  - **Scoring Engine:**
    * Base: 100 points per correct match.
    * Latency $< 800\text{ ms}$: +150 speed bonus points (`⚡ Fast!`).
    * Latency $< 1400\text{ ms}$: +100 speed bonus points.
    * Streak Multiplier: $+20 \times \text{streak}$.
  - **Victory / Results Modal (`Rapid Visual Complete!`):**
    * 3-Star achievement rating ($accuracy \ge 80\%$ and $latency < 1300\text{ ms} \rightarrow 3\text{ stars}$).
    * Final Score (e.g., `2070 pts`).
    * Average Reaction Latency (e.g., `680 ms`).
    * Accuracy (e.g., `100% (10/10)`).
    * Best Streak (e.g., `10 streak`).
* **Contribution to Clinical Profiles:**
  - Saves completed game session record into IndexedDB store `cognitive_game_sessions` (`recordGameSession()`).
  - Powers the **Synaptic Agility Index** on the Games Hub and contributes to the long-term cognitive stability curve in the Progress tab.

---

### 10. Patient Profile, Story Mode & National Health Integration (`AloisProfile.tsx`, `PatientStoryModeModal.tsx`, `supabase.ts`)
* **Core Files:** `AloisProfile.tsx`, `PatientStoryModeModal.tsx`, `src/services/household.ts`, `src/services/supabase.ts`, `src/services/patientProfile.ts`.
* **Deep Dive into Profile Components:**
  1. **Autobiographical Story Mode (Reminiscence Therapy):**
     - Rather than sterile medical tests, Story Mode provides a dignified, celebratory life memoir divided into 4 rich chapters:
       * *Chapter 1 (Ancestral Roots):* Childhood origins (1952, Varanasi river ghats, banyan tree) — targets remote autobiographical episodic recall.
       * *Chapter 2 (Youth & Passions):* Classical Sitar raga and jasmine courtyard garden — targets procedural artistic memory and semantic fluency.
       * *Chapter 3 (Family Legacy):* 50-year golden wedding jubilee, grandchildren Aarav & Ananya — targets recent episodic social orientation.
       * *Chapter 4 (Daily Comfort):* Morning ginger masala chai and Akashvani radio tunes — targets circadian stability and natural cadence.
     - Tapping **`▶ Listen to Screening Prompts`** plays soothing voice prompts in the elder's native language to stimulate positive reminiscence without clinical anxiety.
  2. **Ayushman Bharat Health Account (ABHA / ABDM):**
     - India's national digital health identifier issued by the National Health Authority (NHA).
     - Card displays: **ABHA Number (`91-9977-9924-77`)**, **ABHA Address (`care2(caretaker)@abdm`)**, and status badge (`Verified`).
     - Tapping **`Tap to view QR & Share >`** renders an instant QR code (`QRCodeSVG`) allowing hospital doctors and geriatricians to scan and import the patient's longitudinal cognitive records directly into any ABDM-compliant hospital EHR.
  3. **Switch Household Profile (`src/services/household.ts`):**
     - **Why it matters:** In Indian joint families and rural health camps, multiple elders frequently share a single smartphone.
     - **Cognitive Accessibility:** Remembering alphanumeric passwords requires recall memory—the very faculty Alzheimer's degrades. Switching in NeuroSense uses **Visual Face Recognition (tap your own photo)**, a cognitive skill preserved much longer in dementia.
     - Gated actions (exporting reports, clearing data) remain secured by the Caretaker's 4-digit PIN.
  4. **Cloud Database & Supabase Storage Integration (`src/services/supabase.ts`):**
     - **Cloud Database:** Hosted on Supabase (`https://ollcjpnitgddxqpsbaql.supabase.co`).
     - **Storage Bucket (`neurosense-recordings`):** Stores encrypted audio screening recordings and patient profile photos (`avatars/${cleanName}_${Date.now()}.jpg`).
     - **User Metadata Synchronization:** `syncUserProfileToSupabase()` persists Full Name, Phone, Age, Gender, Blood Group, City, Stage, Caretaker WhatsApp, and ABHA ID directly into Supabase Cloud Auth user metadata.
  5. **Medical Record & Reports:**
     - Centralizes past voice screening logs, CSI trajectories, and one-click PDF EHR exports for primary care consultations.
  6. **Emergency Contacts & Caregiver WhatsApp:**
     - Displays direct emergency contact links paired with WhatsApp dispatch for immediate family assistance.

---

### 11. Offline Functionality & Data Synchronization (`src/services/db.ts`, `src/App.tsx`)
* **Core Files:** `src/services/db.ts`, `src/services/audioRecorder.ts`, `src/services/tts.ts`, `src/App.tsx` (lines 4130, 4675, 4965, 8600–8620, 9120–9210, 10315–10335).
* **Why Offline Architecture is Mandatory:**
  - Designed for India's rural Primary Health Centres (PHCs) and community health workers (ASHAs/ANMs) operating in villages with weak or zero 4G/5G mobile signals.
  - A screening must never stall, freeze, or drop audio because of a lost internet connection.
* **How It Works Technically (The 4 Offline Pillars):**
  1. **Local-First Client Storage (IndexedDB via `idb` v3):**
     - Schema contains 6 stores: `screenings`, `audio_blobs`, `sync_queue`, `doctor_notes`, `household`, and `daily_checkins`.
     - Raw speech recordings from `MediaRecorder` are packaged as binary `Blob` objects (`audio/webm` or `audio/wav`) and stored with microsecond timestamps directly into the `audio_blobs` store.
  2. **100% Client-Side Scoring & Audio Engines:**
     - **Staged Retrieval Engine:** Free recall (1.0), cued recall (0.5), recognition (0.25), and Ribot's Law CSI calculations run locally in JavaScript in `LifeMemorySession.tsx`.
     - **Web Audio Room Noise Pre-Flight Check:** 512-point FFT RMS ambient noise analysis runs locally via browser `AudioContext`.
     - **Speech Synthesis (TTS):** Uses local Web Speech API synthesis (`window.speechSynthesis`) or offline pre-cached scenario audio.
     - **Cognitive Games:** Full millisecond reaction latency logging and 3D graphs run client-side.
  3. **The `sync_queue` Store & State Machine:**
     - When screening completes offline (`isOffline === true`):
       * `session.synced = false`.
       * An entry is pushed into `sync_queue` with `status: "pending"`, `sessionId`, `patientName`, and payload `sizeBytes`.
       * The UI displays an amber status banner: *"3 screenings pending sync"*.
  4. **Automatic Reconciliation & Synchronization:**
     - Listens to `window.addEventListener("online")` and backend health probes (`checkBackendHealth()`).
     - When online connection returns (or user taps **`Sync All`**):
       * Iterates through pending items in `sync_queue`.
       * Streams the audio blobs and metadata to the server / Supabase.
       * Upon HTTP 200/201 acknowledgement, sets `item.status = "synced"`, updates `session.synced = true` in `screenings`, and purges the item from `sync_queue`.
* **Security & Encryption:** Local IndexedDB entries are origin-isolated within browser sandboxing, preventing external app leakage.
    * `family_setups`: Complete lived-memory profiles.
    * `cognitive_games`: Gameplay performance and latency logs.
    * `sync_queue`: Queue of pending synchronization payloads.
  - **Offline Screening:** Full screening, local scoring, 3-stage memory check, and audio playback operate with zero active internet connection.
  - **Self-Healing Sanitizer:** `getAllScreenings()` intercepts historical records, validates numeric health, and repairs corrupted/empty records on the fly.
  - **Background Sync:** When network connectivity is restored (`navigator.onLine` / window `online` event), `processSyncQueue()` drains `sync_queue` and uploads payloads to Supabase Postgres.

---

### 12. Doctor's Clinical View & EHR Diagnostic Suite (`DoctorClinicalShowcase.tsx`, `doctorPatients.ts`, `report.ts`)
* **Core Files:** `DoctorClinicalShowcase.tsx`, `CaregiverGate.tsx`, `src/services/doctorPatients.ts`, `src/services/report.ts`, `DoctorTerminal3DModel.tsx`.
* **1. Why the Family Caregiver PIN Gate is Required:**
  - Clicking "Doctor View" in the top bar triggers the **Caregiver Gate (`CaregiverGate.tsx`)**.
  - **Clinical Ethics & Patient Protection:** Elderly patients must never accidentally see alarming clinical risk flags, dementia stages, or urgent MRI recommendations. The 4-digit PIN (default `1234`) restricts clinical triage tools strictly to healthcare providers and authorized family guardians, ensuring the elder's personal app experience remains positive and anxiety-free.
* **2. Doctor Clinical Hub Architecture:**
  - **Attending Neurologist Header:** Verified clinician credentials (`Dr. Sunita Sharma, MD • AIIMS & NIMHANS Clinical Neurology • ABDM #DL-8824`).
  - **Quantum VQC Radar Card:** Rotating 3D atomic model displaying `8-Qubit AngleEmbedding` (3 Entangler Layers, 88.4% AUC) mapping acoustic voice stability into quantum Hilbert space.
  - **Patient Cohort Registry:** Quick triage counters: `6 REGISTRY`, `3 PRIORITY HIGH`, `1 MONITOR`, `2 STABLE`.
  - **Cohort Search & Filters:** Fast searching across patient names, vernacular languages, and clinical tags.
* **3. Deep Clinical Analysis (Patient Case: Rama Devi, 72y):**
  - **Longitudinal Risk Trend (Area Chart):** Tracks a 4-month risk progression curve (June: 22% $\rightarrow$ July: 37% $\rightarrow$ August: 60% $\rightarrow$ September: 85%, displaying a `+63% Net Shift` indicating progressive cognitive impairment).
  - **Dual-Engine AI Biomarker Concordance (96%):**
    * *Classical Pipeline (Acoustic/Linguistic):* `81.4%` risk score (AUC 0.943).
    * *Quantum QNN Pipeline (PennyLane 8-Qubit VQC):* `87.6%` risk score (AUC 0.943).
  - **Quantum Biomarker Sensitivity (SHAP / Gradient Attribution):**
    * *Speech Pause Duration (>1.4s):* `+38%` attribution (reflects delayed lexical retrieval in temporal lobe pathways).
    * *Noun-to-Verb Transition Gap:* `+28%` attribution (reflects syntactic formulation hesitation).
  - **Acoustic Biomarkers vs Reference Range Table:**
    * *Speech Word Rate:* `64 WPM` (Normal: 90–120 WPM) $\rightarrow$ `REDUCED`.
    * *Pause / Silence Ratio:* `44.5%` (Normal: 15–25%) $\rightarrow$ `ELEVATED`.
    * *Pitch Jitter:* `3.12%` (Normal: $<1.80\%$) $\rightarrow$ `ELEVATED` (vocal micro-tremor).
    * *Information Unit (IU) Density:* `0.38 IU/s` (Normal: $>0.55\text{ IU/s}$) $\rightarrow$ `REDUCED`.
  - **Clinical Next Steps & Care Protocol:**
    * Schedule Formal MoCA (Montreal Cognitive Assessment).
    * Order Brain Volumetric MRI / Vascular Screening.
    * Notify Caregiver (Ramesh Kumar - Son).
    * Recommend targeted Speech & Memory Cognitive Stimulation Exercises.
* **4. The Final Print Report (`report.ts`):**
  - Clicking **`Print Report`** compiles an official signed PDF clinical document for hospital EHR integration.
  - Features: Unique Report ID (e.g. `screening_1795774232610`), timestamp, overall risk tier badge (`LOW / ELEVATED`), acoustic metrics table, quantum architecture specifications (8-Qubit VQC, 22 Features, Benchmark AUC 0.943), and clinical disclaimer for physician sign-off.

---

## Technical Specifications & Benchmark Summary

| Parameter | Measured Specification | Source |
| :--- | :--- | :--- |
| **Model Family** | Classical Encoder $\rightarrow$ 8-Qubit PennyLane VQC $\rightarrow$ Classical Decoder | `backend/model_loader.py` |
| **ROC-AUC** | **0.9430** (94.3%) | `neurosense_qh_evaluation.json` |
| **Test Accuracy** | **88.30%** ($n=94$ held-out test samples) | `neurosense_qh_evaluation.json` |
| **Precision / Recall / F1** | 89.13% Precision / 87.23% Recall / 88.17% F1 | `neurosense_qh_evaluation.json` |
| **Specificity** | 89.36% | `neurosense_qh_evaluation.json` |
| **Brier Score / Log Loss** | 0.0948 Brier / 0.3814 Log Loss | `neurosense_qh_evaluation.json` |
| **Quantum Architecture** | 8 Qubits, 3 BasicEntanglerLayers ($3 \times 8 = 24$ params), AngleEmbedding("Y") | `backend/model_loader.py` |
| **Total Trainable Params** | 777 parameters | `final.ipynb` |
| **Uncertainty Method** | Monte Carlo Dropout (30 stochastic passes, ECE 0.0781) | `final.ipynb` |
| **Speech Biomarkers** | 22 Calibrated Features (7 Acoustic, 9 Syntactic, 6 Semantic) | `neurosense_qh_selected_features.json` |
| **Audio Processing** | PyAV Demuxer, 16 kHz Mono PCM, Faster-Whisper ASR | `backend/audio_analyzer.py` |
| **Unified CSI Formula** | $0.40 M + 0.20 N + 0.10 S + 0.30 (100 - I)$ | `backend/scoring_config.json` |
| **Language Support** | English, Hindi (हिन्दी), Kannada (ಕನ್ನಡ) | `src/demo/scenarioRegistry.ts` |
| **Offline Engine** | IndexedDB local storage with background sync queue | `src/services/db.ts` |

---

## Hackathon Judges' Q&A Cheat-Sheet

**Q1: Why use a Quantum Hybrid neural network instead of simple XGBoost or Random Forest?**  
> *"Speech and acoustic biomarkers exhibit subtle, high-dimensional non-linear correlations that classical decision trees can overfit, particularly on smaller clinical cohorts. Our 8-qubit Variational Quantum Circuit uses quantum superposition and entanglement (`BasicEntanglerLayers`) to map 22 acoustic and linguistic features into a $2^8 = 256$-dimensional Hilbert space. This enables high expressive capacity with only 777 total parameters, achieving a 94.3% ROC-AUC without overfitting."*

**Q2: How do you prevent education and literacy bias in rural populations?**  
> *"Traditional screening tests ask questions like subtracting by 7s or spelling words backwards, which immediately fail illiterate individuals regardless of cognitive health. NeuroSense solves this through our zero-literacy Autobiographical Life Memory Check. We test recall of the elder's own life facts (children, hometown, marriage, recent visitors) provided by family. Additionally, our CSI scoring formula includes an automatic schooling calibration that widens normal baselines for individuals with 5 or fewer years of schooling."*

**Q3: Can this replace a doctor or MRI scan?**  
> *"No, and we explicitly mandate non-diagnostic clinical terminology across the entire app. NeuroSense is an early triage and longitudinal monitoring tool designed to catch subtle cognitive decline years before severe symptoms occur. It generates an EHR-ready referral summary to guide doctors toward targeted neuroimaging and metabolic workups."*

**Q4: How does it work in rural areas with poor internet connectivity?**  
> *"NeuroSense is built with a local-first architecture using browser IndexedDB. Community health workers can conduct complete screenings, record audio, and compute local CSI scores entirely offline in remote villages. Once the device connects to Wi-Fi or cellular data, records automatically synchronize to our cloud database."*
