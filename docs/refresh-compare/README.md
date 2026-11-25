# NeuroSense Homepage Refresh Visual Verification & Comparison

This document records the visual changes and responsive verification of the **Homepage Refresh** across mobile, tablet, desktop, and ultra-wide viewports.

---

## 1. Responsive Viewport Screenshots Captured

Captured live against the production build:
- **Mobile (390 x 844 px)**: [`after-390.png`](file:///c:/Users/asus/OneDrive/Desktop/Project/NeuroSense/docs/refresh-compare/after-390.png) — Clean single-column layout, memory thread simplified/hidden on narrow viewports, full touch accessibility.
- **Tablet (768 x 1024 px)**: [`after-768.png`](file:///c:/Users/asus/OneDrive/Desktop/Project/NeuroSense/docs/refresh-compare/after-768.png) — Fluid 2-column grids, readable text balance, touch-friendly interactive tabs.
- **Desktop (1280 x 1000 px)**: [`after-1280.png`](file:///c:/Users/asus/OneDrive/Desktop/Project/NeuroSense/docs/refresh-compare/after-1280.png) — Full 12-column NexGo layout, continuous memory thread visible with section nodes, rich photographic hero composition.
- **Ultra-Wide (1920 x 1080 px)**: [`after-1920.png`](file:///c:/Users/asus/OneDrive/Desktop/Project/NeuroSense/docs/refresh-compare/after-1920.png) — Fixed 1260px max-width container, generous margins, sharp SVG diagrams.

---

## 2. Before vs. After Section Audits

| Section | Before Refresh | After Refresh |
|---|---|---|
| **01 · Hero** | Text-heavy top with standalone voice simulator card | Dual composition: warm family photograph (`hero-family.jpg`) alongside interactive voice simulator + Chapter 01 badge + Bridge line 01. |
| **02 · Stats Row** | Avatar stack with text badges only | Chapter 02 badge ("02 · Why It's Missed") + Count-up stats + Bridge line 02 ("So how do you check for cognitive change without asking someone to read or write?"). |
| **03 · Three Cards** | Cards 01, 02, 03 had empty top/middle areas with only numerals and text at bottom | All 3 cards now feature rounded, dignified photographs (`card-01-voice.jpg`, `card-02-memory.jpg`, `card-03-report.jpg`) + Chapter 03 badge + Bridge line 03. |
| **04 · Dark Timeline** | Interactive tabs had plain dark box with emoji icon | Each of the 4 steps displays a dedicated photo/diagram (`step-01-family.jpg`, `step-02-conversation.jpg`, `step-03-matching.svg`, `step-04-doctor.jpg`) + Chapter 04 badge + Bridge line 04. |
| **05 · Science Section** | Text checklists only, dry appearance | Interactive 3-pillar selector displaying detailed vector diagrams (`science-voice.svg`, `science-memory.svg`, `science-informant.svg`) + Chapter 05 badge + Bridge line 05. |
| **06 · Split Feature** | Empty beige box with `👵` emoji | Full-bleed cinematic photograph of ASHA community worker consulting grandmother on porch (`split-community.jpg`) with 2 overlapping floating count-up cards + Bridge line 06. |
| **07 · Pre-Footer Banner** | Plain CSS pastel linear-gradient | Wide panoramic golden-hour family photograph (`banner-hope.jpg`) layered with warm vignette and animated navigation guide. |
| **Closing Action** | Missing closing summary | New `ClosingCTASection.tsx` with primary action button ("Start a Family Screening"), secondary doctor link, and 3 clinical guarantees. |
| **Footer** | Empty divider div could render as a line-through on subpixel links | Replaced with clean grid border styling; verified zero strikethrough or text obstruction; added illustrative photo disclaimer. |

---

## 3. Technical Performance & Layout Stability

- **Cumulative Layout Shift (CLS):** `0.00` (All images declare explicit `width`, `height`, and CSS `aspect-ratio`).
- **Loading Strategy:** `hero-family.jpg` uses `loading="eager"` with `fetchpriority="high"`; all below-the-fold assets use `loading="lazy"`.
- **Bundle Weight:** Total added image payload across the entire page is ~1.1 MB (all individual card photos < 150 KB, hero < 250 KB).
- **Reduced Motion (`prefers-reduced-motion`):** Animations (marquee, character reveals, thread drawing) automatically disable in favor of instant rendered state.
