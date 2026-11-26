# NeuroSense Dashboard Home Screen — 100% Element & Logic Parity Matrix

This document provides a strict, exhaustive audit of every interactive element, text string, state variable, and callback on the Patient Home Dashboard and surrounding chrome.

---

## 1. Top Desktop Toolbar (`src/App.tsx`)

| Element | Current Handler / Behavior | State / Prop Dependency | Redesigned Treatment |
|---|---|---|---|
| **NeuroSense Logo** | Displays `/logo.jpeg` | Static asset | Preserved in floating white pill navbar |
| **Brand Title & Subtitle** | "NeuroSense" / "AI Seizure & Neurological Monitoring" | `F.display` / static | Preserved (noted wording inconsistency flagged) |
| **Home / About Button** | Calls `onOpenHomepage()` | `onOpenHomepage` prop | Preserved as clean pill button |
| **Demo Studio Button** | Toggles `demoMode` + URL param `?demo=1` | `demoMode` state | Preserved with active highlight indicator |
| **Start from Beginning Dropdown** | Opens dropdown with "Homepage / About" & "Login / Registration" | `showRestartMenu`, `onLogout`, `onOpenHomepage` | Preserved with frosted white dropdown menu |
| **Back Button (conditional)** | Calls `goBack()` when `screen !== "home"` | `screen`, `goBack()` | Preserved with icon + text |
| **Patient View Button** | Calls `navigate("home")` | Active when not doctor / games | Preserved as primary active pill |
| **Cognitive Games Button** | Calls `navigate("cognitiveGamesHub")` | Active when in games | Preserved as pill button |
| **Online / Offline Toggle** | Toggles `isOffline` boolean state | `isOffline` state (`Wifi` / `WifiOff`) | Preserved with amber warning when offline |
| **Doctor View Button** | Gated by `requireCaregiver()` to open `doctorDash` | `requireCaregiver()`, `navigate("doctorDash")` | Preserved with Stethoscope icon |
| **Sign Out Button** | Calls `onLogout()` | `onLogout` prop | Preserved with Lock icon |
| **Fullscreen Toggle Button** | Toggles `fullScreenMode` boolean | `fullScreenMode` state | Preserved (`Maximize2` / `Minimize2`) |
| **Phone Notch Collision** | **BUG:** In existing layout, phone top notch directly overlaps toolbar buttons | Fixed: Container uses `pt-24 sm:pt-28` and centered flex spacing so toolbar and phone never intersect |

---

## 2. Phone Frame Header (`AloisHomeDashboard.tsx`)

| Element | Current Handler / Behavior | State / Prop Dependency | Redesigned Treatment |
|---|---|---|---|
| **Avatar Initial** | Displays circular avatar with initial | `patientName` | Circular avatar with first letter in `#F0C048` mustard accent |
| **Greeting Text** | "Hello," + `patientName || "Jerrold Harrington"` | `patientName` | "Hi, " + `patientName` in bold modern sans (`text-[22px] font-bold text-[#1A1A1A]`) |
| **Role Badge** | `(Caretaker)` or `(Patient)` | Inferred from session | Styled as soft pill tag next to greeting |
| **Notifications Button** | Calls `onSelectTab("profile")` | `Bell` icon | Styled as circular white button (`w-9 h-9 rounded-full bg-white border border-black/[0.08]`) |
| **Settings Button** | Calls `onSelectTab("profile")` | `Settings` icon | Styled as circular white button (`w-9 h-9 rounded-full bg-white border border-black/[0.08]`) |

---

## 3. Hero Metric & Primary Screening (`AloisHomeDashboard.tsx`)

| Element | Current Handler / Behavior | State / Prop Dependency | Redesigned Treatment |
|---|---|---|---|
| **Hero Metric ("85% Latest Score")** | Displays latest score percentage when available | `latestSession.mlResult.confidenceScore` | Displayed prominently in Lisso style: extra-large `88%` typography with "Latest Score" caption and status pill |
| **Section Header** | "PRIMARY SCREENING" | Static uppercase | Styled with subtle uppercase tracking |
| **Family Life Memory Check Card** | Main card container click: `onStartLifeMemoryCheck \|\| onStartVoiceCheck` | `onStartLifeMemoryCheck`, `onStartVoiceCheck` | Crisp white card with rounded-[28px], lilac category tag, book icon |
| **Autobiographical Tag** | "AUTOBIOGRAPHICAL LIVED MEMORY" | Static badge | Soft lilac pill badge (`bg-[#F0EDF7] text-[#5B3E8C]`) |
| **Card Title & Subtitle** | "Family Life Memory Check" / "Zero-literacy screening based on family-verified life facts..." | Static copy | High-contrast dark typography |
| **View Trends Button** | Calls `onOpenTrends?.()` | `onOpenTrends` callback | Soft neutral pill button (`bg-[#F0EEEB] text-[#1A1A1A]`) |
| **Setup & Start Button** | Calls `onStartLifeMemoryCheck?.()` | `onStartLifeMemoryCheck` callback | Solid black primary pill button (`bg-[#1A1A1A] text-white hover:bg-black`) with chevron |
| **Neurological Biomarker Card** | Click & drag-and-drop audio file support | Drag events, file drop, `setShowUploadModal` | White card with rounded-[28px], sparkles icon, subtle waveform graphic |
| **Card Title & Subtitle** | "Neurological Biomarker Check" / "Clinical screening for neurological biomarkers..." | Static copy | High-contrast dark typography |
| **Upload Voice Button** | Opens `UploadVoiceModal` (`setShowUploadModal(true)`) | `showUploadModal` state | Neutral pill button (`bg-[#F0EEEB] text-[#1A1A1A]`) with Upload icon |
| **Start Check Button** | Calls `onStartVoiceCheck()` | `onStartVoiceCheck` callback | Solid black primary pill button (`bg-[#1A1A1A] text-white hover:bg-black`) with Mic icon & chevron |
| **Recent Summary Row** | Click: `onViewReport()` | Only rendered if `latestSession != null` | Clean divided row format with Activity icon, status ("Stable neurological pattern" / "Elevated biomarker indicator"), and chevron |

---

## 4. Daily Check-in & Habit Section (`AloisHomeDashboard.tsx`)

| Element | Current Handler / Behavior | State / Prop Dependency | Redesigned Treatment |
|---|---|---|---|
| **Section Header** | "EVERY DAY" + Streak counter | `trend?.streak` | Styled with subtle uppercase header + orange flame streak tag |
| **Daily Check-In Card** | Click: `onSelectTab("dailyCheckIn")` | `doneToday` state | Styled as the signature **Lisso Mustard Yellow Accent Card** (`bg-[#F5CE57] text-[#1A1A1A]`) |
| **Completion Status Icon** | Check icon if done today; MessageSquareQuote if pending | `doneToday` boolean | Circular container with white or dark check/chat icon |
| **Status Text** | "Done for today — thank you" vs "About a minute. Tell us about your day." | `doneToday` boolean | High-contrast dark charcoal text |
| **Done State Baseline Card** | Displays median comparison vs baseline | `trend.status`, `trend.recentMedian`, `trend.baselineMedian` | Clean white card with baseline statistics |
| **Pending 3 Task Rows** | Click: `onSelectTab("dailyCheckIn")` on each: "Two quick questions", "Tell me about your day", "One question for family" | Static task titles and subtext | Clean white cards with icon containers, subtle dividers, and chevrons ("Quick requests" style) |

---

## 5. Bottom Navigation Bar (`AloisBottomNav.tsx`)

| Tab | Current Icon | Redesigned Treatment | Accessible Touch Target |
|---|---|---|---|
| **Home** | `Home` | Raised dark charcoal pill when active (`bg-[#1A1A1A] text-white`) with visible "Home" text label | ≥ 48px height |
| **Progress** | `Activity` | Soft neutral icon + visible "Progress" text label | ≥ 48px height |
| **Games** | `Brain` | Soft neutral icon + visible "Games" text label | ≥ 48px height |
| **Profile** | `User` | Soft neutral icon + visible "Profile" text label | ≥ 48px height |

---

## 6. Logic & Modals Preservation Guarantee
- `UploadVoiceModal`: Preserved with all file drop and analysis listeners.
- No backend endpoints, ML scoring pipelines, TTS, or audio buffers modified.
- No changes to any other screens (`AloisAppointments`, `AloisDoctorInfo`, `AloisProgress`, `AloisProfile`, `AloisDailyCare`, `AloisDailyCheckIn`, etc.).
