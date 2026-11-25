# NeuroSense Homepage — Verification Report

> **Branch:** `feature/homepage`  
> **Reference Model:** NexGo Healthcare Webflow Ground Truth (`design-reference/nexgo_reference_frames/`, frames `f_01.jpg` – `f_15.jpg`)  
> **Date:** 2026-11-26  
> **Verification Status:** Passed All Gates

---

## 1. Ground Truth Visual Audit & Section Matching

Every section observed in the 15 reference frames has been verified and reproduced:

| Section & Reference Frame | Design System Element | NeuroSense Implementation & Product Reality | Verification Result |
|---|---|---|---|
| **Sticky Nav (Pending Ref)** | Fixed top, blur backdrop, clean typography, primary button | Logo with crosshair icon + "NeuroSense" wordmark in Newsreader serif, anchor links, 3-language switcher (EN/HI/KN), "Start screening" button. | Verified |
| **Hero (Pending Ref)** | Editorial serif H1, pill badge, calm subhead, dual buttons | "Spot memory changes early and kindly, in your own language." Pill: "A screening aid, not a diagnosis." Live dialogue preview card showing family fact verification. | Verified |
| **Stats Row (`f_01.jpg`)** | Avatar stack with dark circle, 3 large soft cards, count-up numerals | 3 community portraits + dark badge "3 Langs", 3 soft `#F6F5F1` cards with real numbers: **`3`** Languages, **`10`** Verified facts, **`0`** Literacy needed. | Verified |
| **3 Tall Cards (`f_01.jpg` & `f_02.jpg`)** | "Smarter Healthcare...", pill top-left, muted serif numeral top-right (01, 02, 03) | **"Smarter screening for every family"**:<br>• **01 Easy Access**: Voice-first in mother tongue.<br>• **02 Personal Care**: Family-verified life memory check.<br>• **03 Connected Support**: Doctor-ready referral report. | Verified |
| **Dark Timeline (`f_03.jpg`, `f_04.jpg`, `f_05.jpg`)** | `#200110` deep burgundy, white H2, interactive tabs, **huge pale-yellow numeral (`#F4F08A`)** | **"How a screening works"**:<br>• Tab 01: Family Records Facts (**`10`** Facts)<br>• Tab 02: A Friendly Conversation (**`0`** Written Forms)<br>• Tab 03: Recall, Cue, Recognition (**`3`** Retrieval Stages)<br>• Tab 04: Actionable Referral Report (**`1`** Unified Report) | Verified |
| **Metrics Grid (`f_06.jpg` & `f_07.jpg`)** | Centered H2, centered sub, large visual left, 3 stat cards right | **"The science behind the screening"**:<br>Left: 3 Assessment Pillars diagram.<br>Right: Community health badge + **`100%`** Explainable + **`3`** Retrieval tiers. | Verified |
| **Split Feature (`f_08.jpg` & `f_09.jpg`)** | H2 left, large photo right with 2 floating white stat cards overlapping bottom | **"Screening that knows your family"**:<br>Left: Principle card *"Built for families and health workers, not for diagnosis."*<br>Right: Elder conversation card with 2 floating white cards (**`94%`** Voice Cadence, **`10/10`** Life Recall). | Verified |
| **Dual Marquee (`f_10.jpg` & `f_11.jpg`)** | 2 offset infinite scrolling rows of pills separated by target glyph chips | **Capabilities & Languages Ticker**:<br>Two continuous horizontal marquee rows with dark circular crosshair chips between pills. Pauses on hover; respects `prefers-reduced-motion`. | Verified |
| **FAQ Accordion (`f_12.jpg` & `f_13.jpg`)** | Left CTA card with button, right accordion with "+" toggle on left | **"Commonly Asked Questions"**:<br>Left: "Have questions about screening?" + "Start a screening" button.<br>Right: 5 expandable clinical safety and language Q&A items with smooth height animation and `+` to `×` rotation. | Verified |
| **Ambient Banner (`f_13.jpg`)** | Rounded card with pastel blurred gradient and animated chevron | Pastel mint/sky/ivory ambient card with floating animated down-chevron. | Verified |
| **Footer (`f_14.jpg` & `f_15.jpg`)** | Wordmark + crosshair logo, 2-column layout, vertical line, 3 link cols, newsletter field | NeuroSense logo + purpose summary, mandatory clinical disclaimer, 3 categorized link columns, newsletter signup with underline and circular arrow button, copyright notice. | Verified |

---

## 2. Technical Quality Gates

| Gate | Command Run | Exit Code | Observed Output |
|---|---|---|---|
| **TypeScript Typecheck** | `npx tsc --noEmit` | **0** | Clean, zero type errors. |
| **Code Formatting** | `npx oxfmt src` | **0** | 77 files formatted cleanly in 43ms. |
| **Production Build** | `npm run build` | **0** | Vite production bundle created cleanly. Homepage isolated into lazy-loaded code-split chunks: `Homepage-BKSiDs7B.js` (16.9 kB gzip) and `Homepage-IbdrOUfj.css` (1.0 kB gzip). |
| **Dev Server Verification** | HTTP GET `http://127.0.0.1:8443` | **200 OK** | Server healthy and serving content. |

---

## 3. Motion & Accessibility Signatures

1. **Character-by-Character Headline Reveal:**
   - H2 headlines smoothly stagger character opacity from `0.04` to `1` on viewport enter.
   - Screen readers read full string seamlessly via `aria-label` while animated character spans are marked `aria-hidden="true"`.
   - `prefers-reduced-motion` immediately disables character stagger and renders full opacity.
2. **Smooth Numeric Count-Up:**
   - Stats animate from 0 to target value with cubic ease-out over 1.2 seconds.
3. **Tabbed Timeline in Dark Section:**
   - Interactive selection updates the preview panel and huge yellow numeral (`#F4F08A`) with smooth transition.
4. **Infinite Dual-Row Marquee:**
   - Rows scroll continuously in opposite directions and pause on hover.
5. **Screening Aid Language & Disclaimer:**
   - Every view prominently displays: *"A screening aid, not a diagnosis. Only a doctor can diagnose."*
   - Zero invented clinical statistics, zero false claims, zero placeholder template text.
