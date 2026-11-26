# NeuroSense Dashboard Motion & 3D Depth Plan

**Branch:** `feature/dashboard-motion-3d`  
**Target:** Patient Home Dashboard (`AloisHomeDashboard.tsx`), Bottom Navigation (`AloisBottomNav.tsx`), Floating Desktop Toolbar, and Stage Backdrop (`src/App.tsx`).

---

## 1. Stack & Architecture

| Library | Version | Purpose & Justification |
|---|---|---|
| **Framer Motion** | `^13.1.1` (already installed) | Physics-based springs, layout animations, pill slide transitions, and micro-interactions. |
| **Three.js** | `^0.187.0` (installed via pnpm) | Procedural 3D background scene (glassy memory orb with luminous orbiting thread, floating ambient toroids and spheres). **Lazy-loaded via dynamic import** so zero impact on initial paint. |
| **CSS 3D Transforms & Custom Directives** | Native CSS / Tailwind v4 | High-performance 3D card tilt with specular glare (`perspective`, `rotateX/Y`, `translateZ`), zero JS animation overhead during scrolls. |
| **IntersectionObserver / Scroll Listener** | Native Web API | Scroll-linked text reveal and story thread drawing scoped strictly to the **phone frame's internal scroll container**. |

---

## 2. Motion Design System (Tokens)

- **Easings:**
  - Entrance: Smooth expo-out `cubic-bezier(0.22, 1, 0.36, 1)`
  - Loops & Orbs: Gentle sine `cubic-bezier(0.445, 0.05, 0.55, 0.95)`
  - Press / Spring: Damped spring (`stiffness: 400, damping: 28`)
- **Durations:**
  - Micro-interactions: `150ms - 250ms`
  - Element entrances: `500ms - 800ms`
  - Hero score count-up & progress ring: `1100ms - 1300ms`
  - Ambient loops & aurora blobs: `12s - 24s` (ultra-slow and calming)
- **Stagger:**
  - `70ms` between sequential cards and rows.
- **Distances:**
  - Entrances translate `16px - 24px`, never jarring.
- **Calm by Default:**
  - Designed for elderly patients and clinical caregivers. No rapid flashing (>3 Hz forbidden), no disorienting rotations, zero motion under fingers when scrolling.
  - High contrast maintained throughout (WCAG AA).

---

## 3. Element-by-Element Motion Matrix

### 3.1 Stage Backdrop & Desktop Chrome
- **Theme Choice:** **"Deep Aubergine"** (Default) — matches the homepage dark section (`#1F0314` / `#16010D`), deep purple-burgundy with warm lemon yellow (`#F5CE57`) and soft mauve/lilac glowing orbs, film grain, and subtle vignette. (Theme B "Warm Dusk" supported via CSS variable / prop).
- **Toolbar Layout Bug Fix:**
  - Replace absolute/fixed collisions with a dedicated sticky/flex layout having guaranteed clearance (`pt-20 sm:pt-24`) so the floating toolbar **never overlaps the phone notch or greeting** across any viewport (1920x1080 down to 390x844).
- **Floating Toolbar Effects:**
  - Frosted glass pill with sliding pill highlight when switching views.
  - Pulsing online dot (`w-2 h-2 rounded-full bg-emerald-400 animate-pulse`).
  - Dropdown menu spring entrance with scale (`0.95 -> 1.0`).
- **3D Backdrop Scene (`src/scene3d/MemoryOrbScene.tsx`):**
  - Translucent procedural sphere with soft Fresnel glow and an orbiting luminous golden thread (symbolizing autobiographical lived memory).
  - Ambient floating soft toroids and spheres at varying depth planes.
  - Subtle mouse/pointer parallax (shifts 4-8px).
  - Pauses rendering when document is hidden or offscreen.
  - **Fallback:** Renders pure CSS animated aurora mesh gradient if WebGL is unavailable or reduced motion is enabled.

### 3.2 Inside the Phone Frame (`AloisHomeDashboard.tsx`)
- **Page-Load Choreography:**
  - Staggered cascade: Header -> Hero Metric Card -> Section Labels -> Primary Screening Cards -> Daily Check-in Card.
- **Hero Score Metric Card:**
  - **Count-up animation:** Animates the real computed `confidencePct` (e.g. 0% -> 88%) over 1.2s using tabular numerals.
  - **SVG Progress Ring:** Radial arc draws in sync with the count-up using `stroke-dashoffset`.
  - **Gradient Shimmer:** Subtle diagonal shine across the number on settlement.
  - **Risk Chip:** Pops in with soft spring after the score lands.
- **Scroll-Linked Text Reveal (`src/motion/ScrollTextReveal.tsx`):**
  - Section headings and descriptive paragraphs start in soft grey (~38% opacity) and reveal word-by-word to full contrast as scrolled into view.
  - Uses the **phone frame's scroll container** as the root observer.
  - Strictly excluded from buttons, interactive controls, and scores (always 100% visible).
- **Chapter Thread Drawing (`src/motion/StoryThread.tsx`):**
  - Vertical connection line that draws downward as user scrolls through the screening journey, with node pulses at key milestones.
- **3D Tilt Cards with Glare (`src/motion/TiltCard.tsx`):**
  - Pure CSS perspective tilt (max 6deg) on mouse move with dynamic glare highlight overlay.
  - Automatically disabled during touch scroll to prevent jitter.
- **Pill Buttons & Micro-Interactions:**
  - Primary black pills: Subtle shine sweep every 4s, spring scale `0.97` on press, chevron nudge on hover.
  - Biomarker card: Animated sinusoidal wave line.
  - Microphone pulse: Concentric expanding pulse ring on voice check CTA.
- **Daily Check-In Yellow Card:**
  - Warm subtle gradient shift (`#F5CE57` to `#F3C542`).
  - Flame streak badge with micro-glow.
- **Bottom Navigation (`AloisBottomNav.tsx`):**
  - Spring-animated sliding active pill indicator.
  - Icon bounce on tab switch.
  - Visible text labels under all 4 icons.

---

## 4. Performance & Accessibility Gates

1. **Performance Budget:**
   - 60 FPS target on mid-range hardware.
   - Three.js scene lazy-loaded via `React.lazy()` / `dynamic import()`.
   - DPR capped at 1.5; low-power detection fallback.
   - Only `transform` and `opacity` animated during active scrolling.
2. **`prefers-reduced-motion`:**
   - When active, all loops, 3D scene, tilt, and text reveals are instantly resolved to their final static states.
3. **Strict Feature Parity:**
   - Zero modifications to data models, handlers, scoring, or backend routes.
