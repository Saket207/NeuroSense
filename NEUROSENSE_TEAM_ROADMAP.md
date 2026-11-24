# NeuroSense — Master Engineering & Development Roadmap
**Project Technical Lead & Coordination Guide for 4-Member Team**

---

## 1. Executive Summary & Architecture Overview

**NeuroSense** is an AI-powered neurological health monitoring and clinical decision-support platform designed for elderly individuals, patients with memory impairments or motor-speech dysregulation, and their family caregivers.

### System Architecture Summary
- **Frontend**: React 19 + Vite + Tailwind CSS v4 web application with an offline-first **[IndexedDB]** layer.
- **Backend**: Python 3.11 + FastAPI microservice powering Faster-Whisper ASR, acoustic feature extraction, and PennyLane quantum-classical hybrid machine learning.
- **Database & Cloud Storage**: Dual architecture — local encrypted SQLite (**[Auth Store]**) for guaranteed 100% uptime, mirrored to **[Supabase]** (PostgreSQL & Audio Storage Bucket).
- **Mobile**: Android APK wrapper using **[Capacitor]** (`android/`) and a standalone cross-platform app in Flutter (`mobile/`).

### Golden Architecture Rules (Must Follow)
1. **Patient vs. Doctor Separation**:
   - The phone mockup frame is strictly for the **patient wellness experience** (Home, History, Daily Care, Check-in, Appointments, Profile).
   - **Never** put doctor dashboards, EHR patient rosters, or clinical data tables inside the patient's phone frame view.
   - The Doctor View is accessible only from the top desktop toolbar button (`doctorDash`).
2. **Package Hygiene**: Always install dependencies with `pnpm add <pkg>` and commit `pnpm-lock.yaml`. Never commit `package-lock.json` or `yarn.lock`.
3. **Commit Hygiene**: Never include AI co-authorship tags or tool signatures in git commits.
4. **Verification Gate**: Before declaring any task complete:
   - `npx tsc --noEmit` exits with code 0.
   - `npx oxfmt src` formats all modified files.
   - `npm run build` succeeds cleanly.

---

## 2. Team Division & Ownership Matrix

The team is structured into two complementary squads: **Team A (Biotech Students)** focusing on user empathy, accessibility, and visual presentation, and **Team B (CS Students)** focusing on logic, security, machine learning, and data integrity.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             NEUROSENSE SQUAD                                │
├──────────────────────────────────────┬──────────────────────────────────────┤
│     TEAM A: Frontend & UI/UX         │     TEAM B: Core Development         │
│         (Biotech Students)           │           (CS Students)              │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ Member 1 (Biotech): Patient Wellness,│ Member 3 (CS): Full-Stack            │
│ Daily Care & Cognitive Games         │ Integration, Auth & Data Sync        │
│                                      │                                      │
│ Member 2 (Biotech): Assessment Flow, │ Member 4 (CS): Backend API,          │
│ Multilingual & Clinician Hub UI      │ Quantum ML Pipeline & Database       │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

### Team A — Frontend & UI/UX (Biotech Students)
*Strengths: Clinical empathy, cognitive interaction design, healthcare accessibility, user research.*
*Tooling: Antigravity IDE, Laptap Ninja design tools, Tailwind CSS v4, Lucide icons.*

- **Member 1 (Biotech — Wellness & Games Lead)**:
  - Owns the patient's everyday experience: Home dashboard, daily check-in routines, medication tracking, and cognitive games.
  - Ensures interface elements follow dementia-friendly cognitive guidelines (large hit targets, high contrast, non-threatening feedback).
- **Member 2 (Biotech — Assessment & Accessibility Lead)**:
  - Owns the voice assessment introduction, recording screens, noise checking visualizer, multilingual translations, and desktop clinician view layout.
  - Ensures instructions are easily understandable across 9 Indian languages.

### Team B — Core Development (CS Students)
*Strengths: Systems programming, algorithms, database schema design, asynchronous queues, security.*
*Tooling: FastAPI, Python 3.11, PyTorch, PennyLane, Faster-Whisper, SQLite, Supabase, TypeScript.*

- **Member 3 (CS — Full-Stack & Integration Lead)**:
  - Owns end-to-end authentication, caretaker access, OTP generation & verification, client-side IndexedDB caching, and frontend-to-backend API wiring.
  - Ensures the user interface never freezes during network lag or audio uploads.
- **Member 4 (CS — Backend, Cloud & ML Systems Lead)**:
  - Owns FastAPI backend routes, audio normalization (PyAV), 22-biomarker acoustic extraction, 8-qubit Quantum Hybrid neural network inference, and Supabase cloud persistence.
  - Optimizes background job queue execution to run within low-memory cloud instances (512 MB RAM limit).

---

## 3. Phase-by-Phase Development Roadmap

We follow a strict implementation order: **Fix Critical Bugs First → Implement Core Caretaker & Patient Integration → Expand Multilingual & Cognitive Features → Perform End-to-End Verification & Deployment**.

```mermaid
flowchart TD
    subgraph Phase 1: Stabilization & Critical Fixes
        P1A["Member 3 & 4: Fix Auth & Caretaker OTP"]
        P1B["Member 1 & 2: Audit UI Contrast & Touch Targets"]
        P1C["Team B: Fix Supabase Table Permissions"]
    end

    subgraph Phase 2: Core Patient & Caretaker Experience
        P2A["Member 1: Redesign Patient Daily Care & Check-in"]
        P2B["Member 2: Overhaul Voice Recording & Noise Visualizer"]
        P2C["Member 3: Wire Offline-to-Cloud Sync Queue"]
        P2D["Member 4: Faster-Whisper & Task Scoring Validation"]
    end

    subgraph Phase 3: Advanced Multilingual & Cognitive Hub
        P3A["Member 1: Cognitive Games Polish & Scoring"]
        P3B["Member 2: 9-Language Translation Dictionary"]
        P3C["Member 3: Doctor Clinical Hub & PDF Export"]
        P3D["Member 4: Quantum Gradient Explainability Output"]
    end

    subgraph Phase 4: Polish, Testing & Deployment
        P4A["Team A: Elderly Accessibility Audit"]
        P4B["Team B: Live Cloud Deployment & APK Build"]
        P4C["All Members: Rehearsal & Documentation Freeze"]
    end

    Phase 1 --> Phase 2
    Phase 2 --> Phase 3
    Phase 3 --> Phase 4
```

---

## 4. Detailed Task Assignments (Member by Member)

### Member 1 (Biotech) — Patient Wellness & Cognitive Games UI

#### Task 1.1: Polish the Patient Daily Care & Medication Tracker
- **Target Files**:
  - `src/components/alois/AloisDailyCare.tsx`
  - `src/components/alois/AloisMedicationTracker.tsx`
- **Description**: Redesign medication reminders and daily hydration/sleep trackers using large, accessible cards with distinct iconography (sun for morning, moon for night).
- **Purpose**: Elderly patients with memory loss struggle to read dense scheduling tables. High-visibility cards with checkmark toggles give them instant cognitive clarity.
- **Expected Output**: A clean, single-column daily schedule where checking off a pill shows immediate visual celebration (soft green highlight and checkmark animation).
- **Coordination**: Coordinate with Member 3 so that checked-off medications persist in IndexedDB.

#### Task 1.2: Improve the Interactive Daily Orientation Check-In
- **Target Files**:
  - `src/components/alois/AloisDailyCheckIn.tsx`
- **Description**: Enhance the orientation test (asking for today's day, date, and season) with large multiple-choice buttons and friendly audio feedback prompts.
- **Purpose**: Standard clinical tests (e.g., MMSE) begin with orientation to time and place. Making this interactive rather than punitive prevents patient anxiety.
- **Expected Output**: A 3-step cheerful check-in that calculates a daily orientation score without ever displaying a "Failure" badge.

#### Task 1.3: Enhance Cognitive Engagement Games UI
- **Target Files**:
  - `src/components/cognitiveGames/CognitiveGamesHub.tsx`
  - `src/components/cognitiveGames/MemoryTreasureGame.tsx`
  - `src/components/cognitiveGames/LogicPuzzleGame.tsx`
  - `src/components/cognitiveGames/SelectiveAttentionGame.tsx`
  - `src/components/cognitiveGames/SpeedVisualisationGame.tsx`
- **Description**: Add generous touch padding (minimum 48x48px), high-contrast outlines, and clear visual hints for the 4 cognitive games.
- **Purpose**: Tremors and reduced visual acuity are common in neurological patients. Small buttons frustrate users and reduce game engagement.
- **Expected Output**: Polished, playful games that run smoothly inside the phone frame without visual jitter or overflow bugs.

---

### Member 2 (Biotech) — Assessment Flow & Multilingual Accessibility

#### Task 2.1: Voice Assessment Intro & Real-time Noise Check UI
- **Target Files**:
  - `src/components/NoiseCheckCard.tsx`
  - `src/components/VoiceProcessingVisualizer.tsx`
  - `src/App.tsx` (Screening intro & recording views, lines ~4800–5600)
- **Description**: Create an elderly-friendly pre-recording screen that tests ambient room noise before the patient speaks, showing a clear "Green = Quiet (Good)" or "Red = Too Noisy" meter.
- **Purpose**: Background fan noise or television chatter severely impairs acoustic jitter and shimmer calculations in the ML model. Pre-screening ambient noise prevents corrupted assessments.
- **Expected Output**: An intuitive card that guides the patient to a quiet spot before unlocking the microphone recording button.

#### Task 2.2: Expand and Verify 9-Language Translations
- **Target Files**:
  - `src/App.tsx` (Translation dictionaries, lines ~300–2100)
- **Description**: Audit and expand translations for all 9 supported languages: English (`en`), Hindi (`hi`), Bengali (`bn`), Marathi (`mr`), Tamil (`ta`), Telugu (`te`), Gujarati (`gu`), Kannada (`kn`), and Malayalam (`ml`).
- **Purpose**: Non-English-speaking rural patients must understand instructions for sustained phonation ("Say Ahhh") and cookie theft scene description.
- **Expected Output**: Complete localized strings for all recording instructions, buttons, and error messages without untranslated English fallbacks.

#### Task 2.3: Doctor Clinical Hub & Radar Chart Presentation
- **Target Files**:
  - `src/App.tsx` (Doctor view rendering, lines ~7000–8500)
  - `src/services/report.ts`
- **Description**: Polish the desktop Doctor Clinical Hub (`doctorDash`), improving the layout of the 22-biomarker radar chart, uncertainty distribution curve, and PDF printable report styling.
- **Purpose**: Clinicians require dense, objective data with clear clinical disclaimers, separated cleanly from the patient's simplified mobile view.
- **Expected Output**: An executive medical dashboard displaying patient longitudinal trajectories, audio playback waveforms, and instant one-click PDF clinical report generation.

---

### Member 3 (CS) — Full-Stack Integration, Auth & Data Sync

#### Task 3.1: Caretaker Portal & OTP Verification Wiring
- **Target Files**:
  - `src/components/alois/auth/AloisAuthContainer.tsx`
  - `src/App.tsx` (Authentication state and profile hydration, lines ~4200, ~10600)
- **Description**: Connect the Caretaker login and OTP verification UI with the backend `/api/auth/caretaker/*` REST endpoints. Ensure invalid codes show descriptive error toasts and correct codes load the linked patient record.
- **Purpose**: Caretakers must securely monitor their family members while having their 4-digit PIN synchronized with the on-device clinical actions gate.
- **Expected Output**: Seamless login flow where a caretaker enters their WhatsApp number and PIN/OTP and immediately accesses their patient's profile.

#### Task 3.2: Robust Offline-to-Cloud Sync Engine
- **Target Files**:
  - `src/services/db.ts`
  - `src/services/supabase.ts`
  - `src/services/screeningJob.ts`
- **Description**: Implement a background sync queue in IndexedDB. When internet connectivity drops, recordings and screening sessions must save locally and automatically sync to Supabase once back online.
- **Purpose**: Rural clinic screenings often experience unstable Wi-Fi. No patient audio or assessment data should ever be lost due to network dropouts.
- **Expected Output**: An automatic queue listener that detects `navigator.onLine` and uploads pending screenings with a subtle status pill (`"Synced 2 offline screenings"`).

#### Task 3.3: Doctor Portal Multi-Patient Roster Integration
- **Target Files**:
  - `src/services/doctorPatients.ts`
  - `src/App.tsx` (Doctor patient selection logic)
- **Description**: Connect the doctor view to real patient records stored in the database rather than static placeholder arrays.
- **Purpose**: Neurologists reviewing multiple patients need to switch between individual patient histories and compare biomarker trajectories over time.
- **Expected Output**: A responsive patient selector sidebar in the Doctor View that dynamically pulls screening histories from backend storage.

---

### Member 4 (CS) — Backend API, Quantum ML Pipeline & Database

#### Task 4.1: Cloud Supabase PostgreSQL RLS & Schema Migration
- **Target Files**:
  - `backend/database/supabase_schema.sql`
  - `backend/supabase_service.py`
  - `backend/.env`
- **Description**: Resolve the `42501 permission denied for table screenings` error by reviewing table grants and Row Level Security (RLS) policies for the `service_role` and `anon` keys in Supabase.
- **Purpose**: The backend must have full permission to insert screening rows, upload audio blobs to storage buckets, and fetch patient records without permission blocks.
- **Expected Output**: Supabase health check returning all green: bucket accessible, table inserts authorized, and zero database connection errors.

#### Task 4.2: Faster-Whisper ASR & Memory Optimization
- **Target Files**:
  - `backend/screening_engine.py`
  - `backend/screening_jobs.py`
  - `backend/audio_analyzer.py`
- **Description**: Optimize Faster-Whisper model loading (`tiny` model with `int8` quantization on CPU) and configure PyAV container decoding with explicit casting.
- **Purpose**: Prevent Out-Of-Memory (OOM) crashes on 512 MB RAM cloud tiers (such as Render free tier) while transcribing patient recordings in under 3 seconds.
- **Expected Output**: Audio files in WebM, M4A, or WAV format are decoded, transcribed to text, and scored with zero process termination crashes.

#### Task 4.3: Quantum-Classical Hybrid ML Pipeline & Explainability Output
- **Target Files**:
  - `backend/model_loader.py`
  - `backend/speech_features.py`
  - `backend/explainability.py`
- **Description**: Ensure the 8-qubit PennyLane Variational Quantum Circuit (`AngleEmbedding` rotation="Y", `BasicEntanglerLayers` with shape `(3, 8)`) runs 30 Monte Carlo Dropout passes to return prediction probability, uncertainty standard deviation, and quantum gradient feature attributions.
- **Purpose**: Medical safety requires knowing *how confident* the AI is. If uncertainty is high ($\sigma > 0.15$), the system must advise the doctor that the acoustic sample was inconclusive.
- **Expected Output**: Complete JSON response payload containing risk tier, confidence percent, uncertainty standard deviation, and top 5 influential biomarkers.

---

## 5. Frontend ↔ Backend Integration Contract

To prevent Team A and Team B from blocking each other, all API contracts are standardized below:

| Endpoint | Method | Payload / Parameters | Expected Response | Owner |
|---|---|---|---|---|
| `/api/auth/register` | `POST` | `{ full_name, phone, password, age, gender, caregiver_name, caregiver_phone, caregiver_pin }` | `{ status: "success", user_id, patient_id }` | Team B |
| `/api/auth/login` | `POST` | `{ identifier, password }` | `{ status: "success", user: { ... } }` | Team B |
| `/api/auth/caretaker/request-otp` | `POST` | `{ phone }` | `{ status: "success", otp, expires_in: 300, patient_name }` | Team B |
| `/api/auth/caretaker/verify-otp` | `POST` | `{ phone, otp }` | `{ status: "success", is_caregiver: true, linked_patient: { ... } }` | Team B |
| `/api/auth/caretaker/login` | `POST` | `{ phone, pin }` | `{ status: "success", is_caregiver: true, linked_patient: { ... } }` | Team B |
| `/api/screening/submit` | `POST` | `multipart/form-data`: `audio` (file), `task_type` (str), `patient_id` (str) | `{ status: "queued", job_id: "uuid" }` | Team B |
| `/api/screening/jobs/{id}` | `GET` | `job_id` (path) | `{ status: "completed", result: { probability, risk_tier, uncertainty_std, features } }` | Team B |

> **Development Rule for Team A**: While Team B refines backend endpoints, Team A can test frontend interactions using local storage or mock responses. When connecting to the live backend, use `getApiBaseUrl()` from `src/services/apiConfig.ts`.

---

## 6. Git Workflow, Branching & Merge Strategy

To ensure zero code overwrites across 4 developers working simultaneously, strictly adhere to this git workflow:

### Branch Naming Conventions
- `main`: Production-ready branch. Protected; no direct commits allowed without verification.
- `team-a/ui-wellness`: Member 1 branch (Daily Care, Check-in, Games).
- `team-a/ui-assessment`: Member 2 branch (Voice check screens, translations, doctor view).
- `team-b/core-auth-sync`: Member 3 branch (Caretaker portal, IndexedDB sync).
- `team-b/core-ml-backend`: Member 4 branch (FastAPI, Whisper, PennyLane, Supabase).

### Step-by-Step Developer Workflow

```bash
# 1. Start from latest main
git checkout main
git pull origin main

# 2. Create your feature branch
git checkout -b team-a/ui-wellness

# 3. Work on your specific files and format before staging
npx oxfmt src
npx tsc --noEmit

# 4. Commit with clear, human-authored commit message (NO AI tags)
git add src/components/alois/AloisDailyCare.tsx
git commit -m "feat(ui): improve medication tracker cards with large touch targets"

# 5. Push branch and create a Pull Request
git push -u origin team-a/ui-wellness
```

### Pre-Merge Verification Checklist (Mandatory)
Before merging any pull request into `main`:
1. [ ] `npx tsc --noEmit` exits with 0 (no TypeScript errors).
2. [ ] `npx oxfmt src` has been executed on all changed files.
3. [ ] `npm run build` generates production bundle in `dist/` without errors.
4. [ ] No merge conflicts with `origin/main`.
5. [ ] Commit history contains clean messages without synthetic co-authorship metadata.

---

## 7. Milestones & Testing Checkpoints

```
[Milestone 1] ──► [Milestone 2] ──► [Milestone 3] ──► [Milestone 4]
Stabilization     Core Experience   Multilingual Hub  Release & Demo
(Day 1-2)         (Day 3-5)         (Day 6-7)         (Day 8)
```

### Milestone 1: Stabilization & Bug Cleanliness (Days 1–2)
- **Goal**: Zero crashes on launch, zero TypeScript warnings, and stable local servers.
- **Checkpoint**:
  - Web server runs on `http://localhost:8443` without console errors.
  - Backend answers `/api/health` with `status: "ok"` and initialized model weights.
  - Registration form validates all 8 fields and saves credentials securely.

### Milestone 2: Core Patient & Caretaker Experience (Days 3–5)
- **Goal**: Full patient and caretaker journey operational end-to-end.
- **Checkpoint**:
  - Patient registers with full details and caretaker PIN.
  - Caretaker receives unique time-limited OTP (not hardcoded 7429) and verifies successfully.
  - Audio recording captures 16 kHz mono sound and submits to backend ML job queue.
  - Offline mode allows screening to be saved locally in IndexedDB when network is simulated offline.

### Milestone 3: Multilingual & Clinical Battery Readiness (Days 6–7)
- **Goal**: All 9 languages functional; cognitive games and clinician hub ready.
- **Checkpoint**:
  - Switching languages dynamically updates all buttons, instructions, and headers.
  - All 4 cognitive games record engagement scores smoothly inside the phone frame.
  - Doctor View displays 22-biomarker radar chart and generates printable clinical summary report.

### Milestone 4: Production Polish & Hackathon Demo Freeze (Day 8)
- **Goal**: Full system deployed, Android APK verified, demo script rehearsed.
- **Checkpoint**:
  - Production build deployed to Vercel/Render with reverse proxy active.
  - Android APK builds cleanly via GitHub Actions workflow (`.github/workflows/build-apk.yml`).
  - 3-minute hackathon pitch flow rehearsed with working live audio demonstration.

---

## 8. Open Discussion Topics & Clarifications Needed

Before finalizing the sprint backlog, the team leads must align on these 4 architectural topics:

1. **Automated WhatsApp/SMS Gateway Integration**:
   - *Current state*: The app formats a `https://wa.me/...` URL that opens the WhatsApp app/web client with pre-filled credentials.
   - *Decision needed*: Do we want to keep this lightweight intent-based method (zero server cost), or register a Twilio/Gupshup webhook for automated background SMS delivery?
2. **Supabase Cloud PostgreSQL Permissions**:
   - *Current state*: Supabase Storage bucket works, but PostgreSQL tables returned `42501 permission denied` until the SQL script in `backend/database/supabase_schema.sql` is run in the Supabase Dashboard SQL Editor.
   - *Action required*: The database administrator must run the schema file in the dashboard to grant `SELECT`, `INSERT`, `UPDATE` to the `service_role`.
3. **Audio Quality Guidelines for Presentation**:
   - *Clinical consideration*: What microphone distance should be recommended during the live presentation? (Standard recommendation: 10–15 cm from mouth, angled slightly away from direct breath flow).
4. **Android APK Target**:
   - *Current state*: The project includes both a Capacitor web wrapper (`android/`) and a native Flutter app (`mobile/`).
   - *Decision needed*: For the primary demo, we recommend showcasing the Capacitor web wrapper since it matches the React 19 codebase 1:1 with zero code divergence.

---

*Roadmap approved by Technical Lead for NeuroSense Engineering Team.*
