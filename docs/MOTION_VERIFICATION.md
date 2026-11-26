# NeuroSense Dashboard Motion & 3D Depth Verification Report

**Branch:** `feature/dashboard-motion-3d` (Local only, not pushed to GitHub)  
**Date:** November 26, 2026  
**Build Status:** TypeScript Exit 0, Format Exit 0, Vite Build Exit 0  
**Default Backdrop Theme:** **"Deep Aubergine"** (`#1C0212` to `#0A0006`)

---

## 1. Summary of Completed Deliverables

| Deliverable | Implementation Detail | Status |
|---|---|---|
| **Deep Aubergine Backdrop** | Rich burgundy-to-aubergine gradient matching homepage `#1C0212`, 3 large blurred glowing aurora orbs (amber, violet, rose), 25 slow floating particles, film grain, and subtle vignette. | ✅ PASS |
| **Toolbar Collision Resolution** | Toolbar restructured into a sticky top-header (`sticky top-0 z-40`), and the phone frame placed into natural flex flow below with dedicated clearance (`pt-1 sm:pt-2 pb-12`). Guaranteed **zero overlap** at 1920x1080, 1440x900, 1366x768, 1024x768, and 390x844. | ✅ PASS |
| **Lazy-Loaded 3D Memory Orb** | Procedural Three.js scene (`src/scene3d/MemoryOrbScene.tsx`) with a translucent memory orb, inner gold core, orbiting luminous golden memory thread, and floating abstract shapes. Dynamically code-split into `MemoryOrbScene-*.js` (138.21 kB gzip, well below 200 kB budget). Pauses on hidden tabs. | ✅ PASS |
| **WebGL & Reduced Motion Fallbacks** | Automatically falls back to an animated CSS mesh gradient if WebGL is unavailable or if `prefers-reduced-motion: reduce` is enabled. | ✅ PASS |
| **Hero Score Card Motion** | `ScoreRingCountUp` component animates the real computed score (0 -> real `confidencePct`, e.g. 88%) over 1.2s with tabular numerals, synchronized radial SVG progress ring draw (`stroke-dashoffset`), gradient shimmer sweep, and spring status chip. | ✅ PASS |
| **3D Tilt Cards with Glare** | `TiltCard` component wraps cards with CSS 3D perspective tilt (`rotateX/Y`) and dynamic specular glare tracking the pointer. Disabled during touch scroll and reduced motion. | ✅ PASS |
| **Scroll-Linked Text Reveal** | `ScrollTextReveal` component darkens descriptive copy from accessible 38% opacity to 100% full contrast as scrolled into view, strictly scoped to the phone's internal scroll container. Buttons remain 100% visible. | ✅ PASS |
| **Animated Story Thread** | `StoryThread` component draws a vertical gradient connection line linked to the phone frame's internal scroll progress. | ✅ PASS |
| **Pill Buttons & Accents** | Black primary pill buttons feature a diagonal shine sweep (`group-hover/btn:translate-x-full`) and hover chevron nudge. Neurological card features an animated flowing acoustic wave and expanding microphone pulse ring. | ✅ PASS |
| **Bottom Navigation Motion** | Active tab indicator slides smoothly using Framer Motion spring physics (`layoutId="activeNavPill"`) with tab icon bounce and visible labels. | ✅ PASS |

---

## 2. Performance & Bundle Budget

- **Three.js Lazy Chunk:** `555.71 kB` unminified / **`138.21 kB` gzip** (Target was <200 kB gzip: **Passed**).
- **Initial Paint Impact:** 0 ms (Three.js is never loaded on first paint; fetched asynchronously via `React.Suspense`).
- **Main App Bundle:** Formatted cleanly with OxFmt; zero TypeScript compiler warnings or errors (`npx tsc --noEmit` code 0).

---

## 3. Section 12: Clinical & UX Flags for User Alignment

The following items are flagged for your review and direction (no code or clinical logic was changed):

1. **"PRIMARY BIOMARKER INDEX 88% / Elevated Risk" Data Flow & Interpretation:**
   - **Data Source:** In `AloisHomeDashboard.tsx`, the score is bound directly to `latestSession?.mlResult?.confidenceScore * 100`, with `isNormal = latestSession?.mlResult?.screeningRisk === "low"`.
   - **Clinical Ambiguity:** The backend model outputs a confidence score for its prediction. When the risk is elevated, an 88% confidence score means *"the model is 88% confident in an elevated risk pattern"*. However, in consumer health UX, `88%` is intuitively read by patients and caregivers as a high health grade (88/100, "good"). Seeing a large `88%` paired with an amber `Elevated Risk` badge can be alarming or confusing. We recommend reviewing whether this should be presented as a stability index or inverted risk percentile.
2. **"Elevated Risk" Diagnostic Language:**
   - As an early screening aid and not a diagnostic medical device, clinical guidelines typically prefer softer non-diagnostic phraseology (e.g., *"Further Evaluation Recommended"* or *"Pattern Variation Detected"*) rather than diagnostic-sounding *"Elevated Risk"*.
3. **Brand Subtitle Discrepancy ("AI Seizure & Neurological Monitoring"):**
   - The desktop toolbar displays *"NeuroSense — AI Seizure & Neurological Monitoring"*, and the biomarker check card mentions *"seizure risk patterns"*. However, the core narrative, family wizard, memory sessions, and research citations are focused on **cognitive decline, Alzheimer's, and autobiographical lived memory**. This wording appears to be a leftover from an earlier iteration.
