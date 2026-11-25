# NeuroSense Homepage — Implementation Plan

> **Branch:** `feature/homepage`  
> **Reference Model:** NexGo healthcare editorial design (grounded in `design-reference/nexgo_reference_frames/`)  
> **Date:** 2026-11-26  
> **Status:** Pending Reference for Top Nav & Hero (per section 0.2 instructions)

---

## 1. Ground Truth & Reference Status

The video recording in `design-reference/nexgo_reference_frames/` (`f_01.jpg` – `f_15.jpg`) starts mid-page at the stats row and covers:
1. Stats row (`2000+`, `95%`, `24/7`, avatar stack)
2. 3 Tall Feature Cards ("Smarter Healthcare For Every Stage")
3. Dark Aubergine/Burgundy Timeline ("Our Path Toward Better Care", with yellow year numerals)
4. Split Metrics Grid ("The Numbers Behind Better Health")
5. Split Feature with Floating Stat Overlays ("Personal Care, Without...")
6. Testimonial-Style Design Principle Card ("Building Trust Through Every Patient Interaction")
7. Dual Infinite Marquee Rows of Pill Cards with Target Glyphs
8. FAQ Accordion with Left "Still Have Questions" Card
9. Pastel Ambient Banner Card
10. Two-Column Editorial Footer with Newsletter Field & Disclaimer

### Pending Reference: Navigation & Hero
As specified in section 0.2 of the prompt:
> *"The recording starts mid-page (at the stats row) and does not show the top navigation or hero section, hover states, or the mobile layout... build the hero and nav in the same design language as the rest of the page (same fonts, colours, radii, spacing, motion), mark them clearly as 'pending reference' in `docs/HOMEPAGE_PLAN.md`, and ask me for screenshots of the top of the page."*

- **Status:** **Pending Reference**. Built strictly within the verified NexGo design system (Newsreader editorial serif, `#FBFAF8` ivory background, `#200110` burgundy accents, rounded pill badges, language switcher EN/HI/KN, and "Start screening" primary CTA).
- **User Request:** If reference screenshots of the top navigation and hero exist, provide them to refine the hero section layout.

---

## 2. Content & Section Mapping (Real NeuroSense Product Facts)

Every piece of template text is replaced with authentic, culturally respectful, clinical-safety compliant NeuroSense product content:

| Reference Section | NexGo Template Text | NeuroSense Product Mapping | Real Facts / Data Source |
|---|---|---|---|
| **0. Nav (Pending Ref)** | *(Not in recording)* | Logo: "NeuroSense" + links: How it Works, Life Memory Check, Languages, FAQ + Language Switcher (EN / हिन्दी / ಕನ್ನಡ) + Primary CTA: "Start screening" | Navigates to screening flow |
| **0. Hero (Pending Ref)** | *(Not in recording)* | Headline: *"Spot memory changes early and kindly, in your own language."*<br>Pill: *"A screening aid, not a diagnosis."*<br>Interactive Visual: Animated voice waveform + life fact dialogue preview ("Grandson's name: Aarav" ✓ Recalled). | Genuine product feature |
| **1. Stats Row** | `2000+`, `95%`, `24/7`, Avatar stack | Language chips (EN, हिन्दी, ಕನ್ನಡ) + Real product facts:<br>• **`3`** Languages at launch<br>• **`10`** Verified life facts<br>• **`0`** Reading or writing needed | Real codebase counts (no invented statistics) |
| **2. Tall Cards (01–03)** | "Smarter Healthcare For Every Stage" (01 Easy Access, 02 Personal Care, 03 Connected Support) | **"Smarter screening for every family"**:<br>• **01 Voice-First Access**: 100% spoken, zero literacy barrier, speaks the elder's mother tongue.<br>• **02 Personal Life Facts**: Memory check based on their own life (family names, native town, daily routine).<br>• **03 Connected Doctor Report**: Structured clinical referral summary ready for ABDM EHR integration. | Core product architecture |
| **3. Dark Timeline** | "Our Path Toward Better Care" (2016, 2018, 2021, etc.) | **"How a screening works"** (`#200110` deep burgundy):<br>• **01 Family Setup**: Family member records 10 life facts & observations.<br>• **02 Voice Conversation**: Friendly spoken conversation with the elder.<br>• **03 Staged Retrieval**: Evaluated across Free Recall, Cued Prompt, and Recognition.<br>• **04 Unified Score**: Cognitive stability index with confidence & referral advice.<br>• Yellow numerals: **`10`** Facts, **`3`** Stages, **`16`** Daily cues, **`1`** Clear report. | Real screening workflow |
| **4. Split Metrics Grid** | "The Numbers Behind Better Health" (`37K+`, `38%`) | **"What the screening looks for"**:<br>• Acoustic voice stability & cadence latency.<br>• Episodic recall retention rate.<br>• Family informant observation agreement.<br>Cards: **`3`** Retrieval stages, **`16`** Informant items, **`100%`** Explainable. | Real ML & algorithmic pipeline |
| **5. Split Feature + Floating Cards** | "Personal Care, Without..." (`42%`, `42/7`) | **"Screening that knows your family"**:<br>Elder interaction illustration with two floating white stat cards:<br>• **`3`** Indian regional languages<br>• **`0`** Literacy needed | Real accessibility guarantees |
| **6. Principle Card** | Nurse photo + "Building Trust Through Every Patient Interaction" | **"Built for families and ASHA workers, not for diagnosis."**<br>Emphasizes dignity, non-stigmatizing screening, and community empowerment. | Core mission |
| **7. Dual Marquee Rows** | Doctor names & specialties | **Capabilities & Languages Pill Rows**:<br>• Row 1: `Voice-First Screening`, `ಕನ್ನಡ (Kannada)`, `Zero Literacy Required`, `Episodic Memory Check`, `हिन्दी (Hindi)`, `ABDM Doctor Report`<br>• Row 2: `Doctor Referral Aid`, `Family-Verified Facts`, `English`, `Acoustic Fluency Analysis`, `Privacy Protected`<br>Separated by circular dark target/crosshair glyphs. | Real feature tags (no fake personas) |
| **8. FAQ Accordion** | "Commonly Asked Questions" + "Still have a questions?" | Real FAQ answering:<br>1. *Is this a medical diagnosis?* (No, screening aid only)<br>2. *Who is this designed for?* (Elders with family/ASHA support)<br>3. *Which languages are supported?* (Hindi, Kannada, English)<br>4. *How are personal family facts kept private?* (Encrypted in Supabase / local device)<br>5. *What should we do after getting a result?* (Consult a doctor with the PDF report).<br>Left Card: "Need assistance?" + "Start screening" button. | Truthful clinical documentation |
| **9. Pastel Banner** | Blurred mint gradient + chevron | Soft pastel ambient card with down chevron leading to footer disclaimer. | Visual rhythm |
| **10. Editorial Footer** | NexGo wordmark, London address, template links | **NeuroSense Footer**:<br>• Logo: Crosshair glyph + "NeuroSense"<br>• Left: Mission summary & clinical safety disclaimer.<br>• Right columns: Product, Clinical Principles, Languages, Legal.<br>• Disclaimer: *"NeuroSense is a screening aid, not a diagnostic tool. Only a qualified medical professional can diagnose cognitive conditions."* | Clean compliant footer |

---

## 3. Architecture & File Structure

All new code is isolated in a modular `src/homepage/` directory:

```
src/homepage/
  ├── Homepage.tsx                # Main container orchestrating all sections
  ├── HomepageNav.tsx             # Sticky navbar with blur backdrop & language switcher
  ├── HeroSection.tsx             # Editorial hero with character reveal & audio demo
  ├── StatsRowSection.tsx         # Real counts, avatar/language chips, count-up animation
  ├── ThreeCardsSection.tsx       # 3 tall soft cards (01, 02, 03)
  ├── DarkTimelineSection.tsx     # Full-width #200110 burgundy timeline with yellow numbers
  ├── MetricsGridSection.tsx      # Split metrics layout
  ├── SplitFeatureSection.tsx     # Feature with floating white cards
  ├── PrincipleSection.tsx        # Ethical clinical safety principle card
  ├── MarqueeSection.tsx          # Dual-row infinite horizontal ticker
  ├── FAQSection.tsx              # Accordion with left CTA card
  ├── BannerSection.tsx           # Pastel gradient banner
  ├── FooterSection.tsx           # 2-column editorial footer
  ├── CharacterReveal.tsx         # Accessible letter-by-letter reveal component
  ├── CountUpNumber.tsx           # Smooth counter animation
  ├── translations.ts             # English, Hindi, and Kannada translations
  └── homepage.module.css         # Scoped styles (no CSS pollution)
```

### Routing & Backward Compatibility:
- Default route (`/`): Shows the new editorial Homepage.
- Clicking **"Start screening"** or navigating to `/#app` / `/legacy-home`: Enters the existing in-app authenticated dashboard and screening wizard.
- Existing patient phone frame and doctor dashboard remain completely intact.

---

## 4. Fonts and Styling

1. **Google Fonts loaded in `index.html`:**
   - **Newsreader** (400, 500, 600, 700, italic) — exact match for the reference's editorial serif headlines.
   - **Plus Jakarta Sans** & **Inter** — clean modern sans for body, buttons, and badges.
   - **Noto Serif Devanagari** & **Noto Serif Kannada** — beautiful regional language serif headlines.
2. **Colors:**
   - Background: `#FBFAF8`
   - Cards: `#F6F5F1`
   - Dark section: `#200110`
   - Accent numeral: `#F4F08A`
   - Text primary: `#200110` / `#FFFFFF`
   - Text muted: `#6E6268` / `rgba(255, 255, 255, 0.7)`

---

## 5. Verification Steps

1. `npx tsc --noEmit` exits with 0.
2. `npx oxfmt src` formats all files cleanly.
3. `npm run build` succeeds with zero errors.
4. Interactive testing:
   - Character reveals trigger on scroll.
   - Numbers count up on scroll into view.
   - Dark timeline tabs switch smoothly.
   - Marquee loops smoothly in opposite directions and pauses on hover.
   - Language switcher switches all text across EN, HI, KN without breaking layout.
   - Screen readers read full headings via `aria-label`.
   - Start Screening button opens the application flow.
