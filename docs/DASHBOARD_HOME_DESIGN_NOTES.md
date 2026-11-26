# NeuroSense Dashboard Home Screen Redesign — Design Notes

**Reference Source:** Dribbble Shot "Task Management Dashboard UI Design - Lisso" by Halo Lab  
**Local Artifact:** `media_1795684883364_24849f3e.jpg` / `design-reference/lisso-dashboard.png`  
**Target:** Patient View Home Tab (`/#app` / `AloisHomeDashboard.tsx`) inside the mobile mockup & surrounding desktop chrome in `src/App.tsx`.

---

## 1. Ground Truth Visual Analysis of the Reference

### 1.1 Atmosphere & Backdrop
- **Stage Background:** Warm, organic sand/cream tone (`#EBE6DD` / `#E5E0D8`) evoking natural calm and clarity. Features faint, elegant curved dune contours in the background that break the sterile clinical darkness of traditional tech dashboards.
- **Surface Elevation:** Clean, pure white cards (`#FFFFFF`) floating with ultra-soft ambient drop-shadows (`box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)`).
- **Corner Radii:** Generously rounded pill cards (`rounded-[28px]` to `rounded-[32px]`) with micro-borders (`border border-black/[0.04]`).

### 1.2 Top Navigation Pill
- **Structure:** Floating, single-row pill navbar centered at the top of the viewport.
- **Geometry:** `rounded-full` with comfortable horizontal padding (`px-5 py-2.5`).
- **Color Palette:** Pure white (`#FFFFFF`) or frosted glass (`bg-white/90 backdrop-blur-md`) with subtle border (`border border-black/[0.06]`), dark charcoal text (`#1A1A1A`), and subtle hover states (`hover:bg-[#F2EFE9]`).
- **Separation from Content:** Placed with adequate top clearance so it never intersects or overlaps with the content canvas or phone frame notch below it.

### 1.3 Greeting & Hero Typography
- **Avatar:** Circular profile indicator (`w-11 h-11 rounded-full`) with patient initial or portrait.
- **Greeting:** Friendly, high-contrast headline: `"Hi, <Name>!"` in refined modern sans (`Outfit` / `Inter`), weighted boldly (`font-bold text-[22px] text-[#1A1A1A]`).
- **Role Badge:** Soft grey pill badge (`(Caretaker)` or `(Patient)`) next to the greeting for clarity.

### 1.4 Hero Metric Display ("85% Today's Productivity" → "Latest Score")
- **Scale:** High-impact metric number in light/medium display typography (`text-5xl font-light text-[#1A1A1A] tracking-tight`).
- **Labeling:** Clear subtitle below the metric: `"Latest Score"` or `"Today's Neurological Score"`.
- **Status Indicator:** Pill badge displaying clinical risk tier (e.g. `Low Risk` / `Stable neurological pattern`) with soft green/neutral tints.

### 1.5 Highlight Card (Lisso "Project Activity" Mustard Accent)
- **Background:** Rich warm mustard-yellow surface (`#F5CE57` / `#F0C048`), establishing visual hierarchy and warmth.
- **Content:** Used for the **Daily Check-In** ("Every day" section) to turn routine daily engagement into an inviting habit.
- **Contrast & Text:** Deep charcoal/black text (`#1A1A1A`) ensuring strict WCAG AA legibility against the mustard background.

### 1.6 Card System & Micro-Interactions
- **Primary Action Cards:**
  - White card containers with generous internal padding (`p-5` to `p-6`).
  - Distinctive icon container (soft indigo/blue or warm purple rounded squares).
  - Pill CTA buttons:
    - Primary CTA: Solid black pill button (`bg-[#1A1A1A] text-white hover:bg-black active:scale-95`).
    - Secondary CTA: Soft cream/neutral pill button (`bg-[#F0EEEB] text-[#1A1A1A] hover:bg-[#E7E4DF] border border-black/[0.04]`).
- **Divided List Rows ("Quick requests" style):**
  - Crisp horizontal cards with icon + title + detail + subtle chevron indicator.
  - Divided by clean hairline borders (`border-b border-black/[0.04]`).

### 1.7 Bottom Navigation Bar
- **Surface:** Pure white background (`#FFFFFF`) with top border (`border-t border-black/[0.05]`) and rounded top edges (`rounded-t-[28px]`).
- **Touch Target:** Minimum 48px height per target.
- **Visual Feedback:** Raised active pill or dark pill indicator with clear, visible text labels under every tab (`Home`, `Progress`, `Games`, `Profile`).

---

## 2. Adaptation to NeuroSense Health Guidelines

1. **Patient-Facing Tone:** Maintain a supportive, non-alarmist, zero-stress clinical environment.
2. **Honesty:** All scores, streaks, and risk assessments stay directly bound to real runtime state (`ScreeningSession`, `dailyCheckIn`, `trend`). No invented statistics or mock indicators.
3. **Accessibility:**
   - Body text size minimum 13-14px.
   - Text contrast ratios exceed 4.5:1 on all light surfaces.
   - Full keyboard accessibility and visible focus rings.
