# NeuroSense Phone Frame, Sizing, Scroll Isolation & Expanded View Plan

**Branch:** `feature/phone-frame-expand-fix`  
**Date:** November 26, 2026  
**Stack:** React 19 + Vite 8 + Tailwind CSS v4 + Three.js + Framer Motion  

---

## 1. Audit Summary

### 1.1 Phone Frame & Container
- **Current Location:** `src/App.tsx` (lines 10363-10405).
- **Current Styling:**
  - Phone mode: `w-full max-w-[428px] h-[885px] max-h-[calc(100vh-5.5rem)] rounded-none sm:rounded-[52px] border-0 sm:border-[8px] border-[#2A091E]`
  - Expanded mode: `w-full max-w-2xl h-[90vh] rounded-3xl border border-white/10`
  - Dynamic Island: hardcoded absolute pill `w-28 h-7` hidden only in expanded mode.
  - Hardware buttons: currently absent.
  - Inner content: wrapped in `div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden"`.
- **Gaps Identified:**
  1. Plain rounded rectangle lacks realistic phone hardware: no volume buttons, action switch, or power button.
  2. Bezel and body lack metallic rail brushing, titanium specular edge, or glass reflection.
  3. Size at 428px is too small on 1080p and aspect ratio does not match modern flagship devices (~9:19.5).
  4. Expanded view only expands the shell to `max-w-2xl` while child screens still use hardcoded inner wrappers like `max-w-[400px] mx-auto` or `max-w-[375px] mx-auto`, leaving large empty gutters and stretched navigation.

### 1.2 Toolbar
- **Location:** `src/App.tsx` (lines 10137-10361).
- **Current Styling:** `sticky top-0 z-40 pt-3 sm:pt-4 pb-2 px-3 sm:px-4 shrink-0`.
- **Gaps Identified:**
  1. On screens with narrow viewports or in expanded view, toolbar elements can run off the right edge.
  2. Needs a compact flex layout with horizontal scroll resilience (`no-scrollbar`) so all 9 controls remain visible and clickable without clipping.

### 1.3 Inner Scroll Containers & Scroll Isolation
- **Containers:** Every screen (`AloisHomeDashboard`, `AloisProgress`, `AloisProfile`, `DoctorClinicalShowcase`, `CognitiveGamesHub`) has its own `overflow-y-auto` container.
- **Scroll Isolation:**
  - Need explicit `overscroll-behavior: contain` and `data-lenis-prevent` on all inner scroll containers.
  - Need backdrop layers set strictly to `pointer-events: none` to guarantee outer wheel scrolling is never intercepted.

---

## 2. Implementation Architecture

### 2.1 Realistic Phone Hardware Frame Component (`src/components/phone/RealPhoneFrame.tsx`)
Create a dedicated component encapsulating:
- **Left Hardware Edge:**
  - Action / Mute Switch: 32px height, metallic bevel, soft shadow.
  - Volume Up: 52px height, metallic bevel, soft shadow.
  - Volume Down: 52px height, metallic bevel, soft shadow.
- **Right Hardware Edge:**
  - Power / Siri Button: 80px height (taller), metallic bevel, soft shadow.
- **Titanium Metallic Rail:**
  - Brushed titanium gradient with fine specular edge highlights.
  - Outer corner radius ~54px; inner bezel padding 12px; matching inner screen radius 42px.
  - Fine speaker ear-piece slit (`w-14 h-1`).
- **Dynamic Island:**
  - Embedded camera lens with blue anti-reflective optical glint.
  - TrueDepth FaceID sensor reflection.
- **Glass Reflection Overlay:**
  - Subtle diagonal glass sheen (`pointer-events: none`), preserving full AA text contrast.
- **Tablet Mode (Expanded View):**
  - Smoothly transitions to a tablet bezel: hides side buttons and notch; shows tablet corner radius (28px), slim uniform bezel, and single front camera dot.

### 2.2 Responsive Size & Height Scaling
- Target dimension: **440px wide by ~900px tall** on 1080p.
- Dynamic constraint: `height: min(900px, calc(100vh - 5.5rem))` with `aspect-ratio: 9 / 19.5`.
- Real mobile devices (<500px): Frame automatically stripped (`border-0`, `rounded-none`, side buttons hidden).

### 2.3 Container Queries & Expanded Tablet Grid (`@container`)
- Provide `@container app-screen (min-width: 520px)` and `@container app-screen (min-width: 900px)` or CSS container context.
- Update `AloisHomeDashboard.tsx`, `AloisProgress.tsx`, `AloisProfile.tsx`, `DoctorClinicalShowcase.tsx`, and `CognitiveGamesHub.tsx`:
  - Replace fixed `max-w-[400px]` with responsive container widths (`w-full max-w-none @[520px]:max-w-2xl @[900px]:max-w-4xl mx-auto`).
  - Cards in Home reflow into balanced 2-column and 4-column grids.
  - Bottom navigation bar stays centered with `max-w-md mx-auto` and even icon distribution.

### 2.4 Toolbar Compact Overflow Protection
- Add smooth horizontal scrolling with subtle fade mask (`overflow-x-auto no-scrollbar`).
- Ensure safe top margin `calc(env(safe-area-inset-top, 0px) + 12px)`.

---

## 3. Shared File Edit Checklist
- `src/App.tsx`: Integrate `RealPhoneFrame`, update container query root, and apply toolbar scroll protection.
- `src/components/phone/RealPhoneFrame.tsx`: New file with realistic hardware buttons, brushed rail, and tablet expand transition.
- `src/components/alois/AloisHomeDashboard.tsx`: Add container query grid layout for expanded tablet view.
- `src/components/alois/AloisProgress.tsx`: Reflow trends & metric cards for tablet view.
- `src/components/alois/AloisProfile.tsx`: Reflow profile items for tablet view.
- `src/components/alois/AloisBottomNav.tsx`: Center and clamp bottom nav to `max-w-md` in wide viewports.
- `src/components/doctor/DoctorClinicalShowcase.tsx`: Reflow patient cohort & trajectory for tablet view.
- `src/components/cognitiveGames/CognitiveGamesHub.tsx`: Reflow game selection cards into 2 columns for tablet view.
