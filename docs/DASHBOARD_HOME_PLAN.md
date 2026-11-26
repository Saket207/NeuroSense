# NeuroSense Dashboard Home Screen Redesign — Implementation Plan

## Overview
Redesign the Patient View Home Tab (`/#app` / `AloisHomeDashboard.tsx`) and surrounding stage backdrop & desktop toolbar in `src/App.tsx` to match the visual language of the reference image (`media_1795684883364_24849f3e.jpg` - "Lisso" by Halo Lab).

**Core Principle:** Visual and layout redesign only — 100% element, logic, and callback parity. Zero features lost or altered.

---

## Implementation Steps

### 1. Stage & Backdrop + Toolbar Overlap Fix (`src/App.tsx`)
1. **Backdrop**:
   - Change desktop stage wrapper from cold dark gradient to the reference's warm organic sand/cream atmosphere (`bg-[#EBE6DD]` or subtle dune gradient `from-[#EFEBE4] via-[#E8E2D8] to-[#DFD8CC]`).
   - Add faint ambient organic blur ellipses in the background matching the dunes aesthetic in Lisso.
2. **Top Desktop Toolbar**:
   - Restyle toolbar into a single-row floating white pill (`bg-white/95 border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-full px-5 py-2.5`).
   - Dark charcoal text and crisp buttons with subtle hover highlights.
3. **Notch Collision Fix**:
   - **Crucial:** In `src/App.tsx`, ensure the outer stage flex layout has `pt-24 sm:pt-28 pb-8` so the desktop toolbar and the phone frame mockup **never collide or overlap** on any viewport height!

### 2. Dashboard Home Screen Redesign (`src/components/alois/AloisHomeDashboard.tsx`)
1. **Color System & Surfaces**:
   - Canvas background: Light warm tint (`bg-[#F8F7F4]`).
   - Cards: Crisp white (`bg-white rounded-[28px] border border-black/[0.04] shadow-[0_8px_24px_rgba(0,0,0,0.04)]`).
   - Accent Card: Mustard yellow (`bg-[#F5CE57] text-[#1A1A1A] rounded-[28px]`).
   - Buttons: Solid charcoal pill (`bg-[#1A1A1A] hover:bg-black text-white rounded-full`) and light neutral pill (`bg-[#F0EEEB] hover:bg-[#E7E4DF] text-[#1A1A1A] rounded-full`).
2. **Header & Greeting**:
   - Circular initial avatar with mustard accent border/background.
   - Large, friendly greeting `"Hi, <patientName>!"` with role badge pill.
   - Circular bell and settings icon buttons.
3. **Hero Metric ("Latest Score")**:
   - When `confidencePct !== null` or `latestSession` exists, render large typography `88%` with caption "Latest Score" and risk status pill.
4. **Primary Screening Cards**:
   - "Family Life Memory Check": White rounded card with lilac tag, book icon, high contrast copy, and pill buttons (`View Trends` + `Setup & Start`).
   - "Neurological Biomarker Check": White rounded card with sparkles icon, acoustic wave line, drag-and-drop audio file support, and pill buttons (`Upload Voice` + `Start Check`).
   - "Recent Neurological Summary": Crisp divided row with status pill, activity icon, and report link.
5. **Daily Check-In & Habit Section**:
   - "Every day" section with mustard yellow highlight card (`bg-[#F5CE57] text-[#1A1A1A]`), flame streak badge, and check-in prompt.
   - Quick request task list (Day and month, Tell me about your day, One question for family) styled as divided white cards with chevrons.

### 3. Bottom Navigation Bar (`src/components/alois/AloisBottomNav.tsx`)
- Pure white bottom bar (`bg-white border-t border-black/[0.06] rounded-t-[28px] shadow-[0_-8px_24px_rgba(0,0,0,0.04)]`).
- Visible text labels under ALL 4 tabs (`Home`, `Progress`, `Games`, `Profile`).
- Touch target minimum 48px height.
- Active tab indicated by clean dark charcoal pill with smooth transition.

### 4. Verification & Commit Hygiene
- Run `npx tsc --noEmit` to verify type safety.
- Run `npm run build` to confirm production bundle builds cleanly.
- Verify no git pushes are executed (strictly local commits).
