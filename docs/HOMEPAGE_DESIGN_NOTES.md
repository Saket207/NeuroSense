# NeuroSense Homepage — Design Notes (Ground Truth from Reference Frames)

> **Ground Truth Reference:** 15 extracted video frames from `design-reference/nexgo_reference_frames/` (`f_01.jpg` – `f_15.jpg`) capturing the "NexGo" Webflow template in motion.
> **Date:** 2026-11-26  
> **Status:** Ground truth verified against physical video captures.

---

## 1. Frame-by-Frame Visual Audit

| Frame | Key Elements Captured | Typography & Layout Details | Observed Motion / Animation |
|---|---|---|---|
| **f_01.jpg** | • Avatar stack (3 round patient portraits + 1 dark burgundy circular badge with "2K+" white text)<br>• 3 large stat cards (`2000+`, `95%`, `24/7`) in warm grey-beige surfaces<br>• Section: **"Smarter Healthcare For Every Stage"**<br>• 3 tall feature cards below | • Headlines: High-contrast editorial serif (`Newsreader`/`Lora`), ~56px.<br>• Body: Clean sans-serif (`Inter`/`Plus Jakarta Sans`), ~16px.<br>• Stat numerals: High-contrast serif numbers ~64px.<br>• Card surfaces: Warm grey-beige `#f6f5f1`, 24px border radius. | • **Character-by-character reveal:** H2 characters fade in sequentially from left to right (~30–40ms stagger).<br>• Stat numbers count up on scroll into viewport. |
| **f_02.jpg** | • Close-up of the 3 tall cards:<br>  - Card 1: Pill badge "Easy Access", large numeral "01", title "See Doctors Without Delays", subtitle.<br>  - Card 2: Pill badge "Personal Care", numeral "02", title "Care Built Around You", subtitle.<br>  - Card 3: Pill badge "Connected Support", numeral "03", title "Everything In One Place", subtitle.<br>• Dark section entering viewport | • Pill badges: rounded-full, 12px font, subtle border.<br>• Top-right numerals: huge muted serif numbers "01", "02", "03" (~48px).<br>• Card padding: ~32px, generous white-space. | • H2 character reveal entering bottom: `"Our Path To wa..."` letters actively transitioning opacity from 0 to 1. |
| **f_03.jpg** | • Transition to deep dark burgundy/aubergine section `#200110`<br>• H2 left (white serif): **"Our Path Toward Better Care"**<br>• Paragraph right: "Explore how connected care, trusted expertise, and digital access have reshaped the patient journey."<br>• Tabbed timeline item 01 active | • Dark background: `#200110` (deep burgundy/aubergine).<br>• H2: pure white editorial serif, left-aligned.<br>• Subtitle: muted grey-mauve right-aligned to H2 baseline.<br>• Timeline left: rounded-square chip "01" + photo. | • Smooth color boundary (crisp dark edge, not gradient).<br>• Active timeline step highlighted. |
| **f_04.jpg** | • Timeline step 01 active detail:<br>  - Rounded-square chip "01"<br>  - Rounded photo (elderly couple with laptop)<br>  - Label: "The Beginning"<br>  - Title: "Where Our Journey Began"<br>  - **Huge pale-yellow year numeral: `2016`** (`#F4F08A`)<br>  - Body text<br>  - Thin 1px horizontal divider line | • Year numeral: serif, ~72px, pale lemon yellow `#F4F08A`.<br>• Divider line: `rgba(255, 255, 255, 0.12)`.<br>• Photo: 16px radius. | • Crossfade between active tab photos and content. |
| **f_05.jpg** | • Timeline collapsed rows:<br>  - Row 02: "Expanding Access" / "Expanding Access"<br>  - Row 03: "Going Digital" / "Bringing Healthcare Into Digital"<br>  - Row 04: "Connected Care" / "Connecting Patients With Expertise"<br>  - Row 05: "Future Forward" / "Shaping The Future Together" | • Inactive rows show chip, small uppercase label, and serif title with low opacity.<br>• Clean 1px divider lines between rows. | • Clicking or scrolling into each step expands it and updates the preview photo and large yellow numeral. |
| **f_06.jpg** | • Return to warm off-white background `#fbfaf8`<br>• Centered section heading: **"The Numbers Behind Better Health"** (character reveal actively animating: `"The Numbers Behind Better Hea..."`)<br>• Centered subtitle below | • Centered H2 serif ~52px.<br>• Max width of subtitle: ~600px.<br>• Clean vertical breathing room: ~120px top padding. | • Letter-by-letter fade-in typing effect. |
| **f_07.jpg** | • Metrics grid layout:<br>  - Large portrait image on left (doctor with baby/toddler, 24px radius)<br>  - Right card 1: "Trusted By Growing Communities", small avatar stack, description<br>  - Right card 2: `37K+`, description<br>  - Right card 3: `38%`, description | • Metric numerals: serif ~56px.<br>• Asymmetric layout: 1 tall photo left (col-span-6), 3 floating stat cards right. | • Count-up animation on numerals.<br>• Subtle fade-rise entrance. |
| **f_08.jpg** | • Split feature section: **"Personal Care, Without..."**<br>• H2 left, short paragraph below<br>• Right side: Large rounded image of doctor with stethoscope examining patient | • Left col: ~40% width, large serif H2 ~56px with character reveal.<br>• Right col: ~60% width, large photo fading in. | • Scroll-triggered fade and rise of the doctor photo. |
| **f_09.jpg** | • Overlapping stat cards at bottom of doctor image:<br>  - Left overlay card: "Care Confidence", big serif `42%`, description<br>  - Right overlay card: "Care Access", big serif `42/7`, description<br>• Left side testimonial-style card: rounded photo of nurse, quote title "Building Trust Through Every Patient Interaction", label "Patient Trust" | • Overlay cards: pure white `#ffffff`, 20px radius, floating over bottom edge of photo.<br>• Testimonial card: soft `#f6f5f1` card, subtle warm border. | • Count-up on `42%` and `42/7`.<br>• Floating cards rise up over photo. |
| **f_10.jpg** | • Section heading: **"Expert Care from Our Medical Team"** (letters revealing: `"Expert Care from Our Medical Te..."`)<br>• Subtitle: "Access trusted medical professionals, virtual consultations..." | • Centered H2 serif.<br>• Background `#fbfaf8`. | • Letter-by-letter reveal. |
| **f_11.jpg** | • **Two offset marquee rows of "pill" cards:**<br>  - Row 1: Doctor pills scrolling horizontally<br>  - Row 2: Offset doctor pills scrolling in opposite direction<br>  - Circular crosshair/target icon chips between pills<br>• Bottom heading entering: `"Commonly As..."` | • Pill shape: 9999px border-radius, background `#f6f5f1`.<br>• Pill interior: circular avatar (40px) + name (serif, 15px) + role (sans, muted grey, 13px).<br>• Icon chips: dark circular badges with white target/crosshair glyph. | • Continuous infinite horizontal marquee scrolling.<br>• Opposite direction parallax feel. |
| **f_12.jpg** | • FAQ Section: **"Commonly Asked Questions"**<br>• Left card: "Still have a questions?", body paragraph, dark button "Connect Now"<br>• Right side: Accordion list with "+" icon on the left of each question | • Left card: soft grey-beige `#f6f5f1`, 24px radius, dark burgundy button `#200110`.<br>• Right accordion: soft horizontal cards with "+" glyph, smooth height expand. | • Accordion items expand/collapse with animated height.<br>• Character reveal on H2. |
| **f_13.jpg** | • Pastel banner image: blurred soft blue-green/mint gradient with an animated down-chevron in the center.<br>• Top of footer visible with "NexGo" logo | • Banner: 24px radius, soft ambient gradient. | • Gentle floating bounce on chevron. |
| **f_14.jpg** | • Full footer:<br>  - Top-left: Circular crosshair logo mark + serif wordmark "NexGo"<br>  - Thin vertical divider line between left info and right link columns<br>  - Left: Headquarter address block, Email `hello@NexGo.com`, social icons (FB, LI, IG, BE)<br>  - Right: 3 link columns (Pages, Single, Utility) + Newsletter field with underline and circular dark arrow button | • Clean 2-column footer split by vertical 1px line.<br>• Typography: sans-serif for address/links, serif for section headers.<br>• Newsletter input: borderless with bottom border + dark circular submit button. | • Subtle hover states on links and buttons. |
| **f_15.jpg** | • Bottom of footer:<br>  - Copyright row: `© 2026 NexGo, All rights reserved | Powered by Webflow` & `Backed By - flomio-studio`<br>  - Small grey 3-line legal description paragraph | • Font size: 12px muted grey text.<br>• Clean bottom padding ~48px. | • Static legal block. |

---

## 2. Color Palette & Typography Specifications (Sampled from Real Pixels)

### Exact Colors
- **Page Light Background:** `#FBFAF8` (warm ivory / off-white)
- **Card Surface (Light):** `#F6F5F1` (warm grey-beige / soft stone)
- **Floating Accent Cards (Over Photo):** `#FFFFFF` with soft drop shadow (`0 8px 30px rgba(32, 1, 16, 0.06)`)
- **Dark Section Background:** `#200110` (deep royal burgundy / aubergine)
- **Dark Section Accent Numeral:** `#F4F08A` (pale lemon yellow)
- **Primary Text (Light Theme):** `#200110` (deep burgundy/near-black)
- **Primary Text (Dark Theme):** `#FFFFFF` (pure white)
- **Secondary / Muted Text:** `#6E6268` (muted mauve-grey)
- **Borders (Light):** `rgba(32, 1, 16, 0.08)`
- **Borders (Dark):** `rgba(255, 255, 255, 0.12)`

### Typography
- **Headlines & Big Numerals:** High-contrast editorial serif — **Newsreader** (Google Fonts) paired with **Lora**.
- **Body & Labels:** **Inter** / **Plus Jakarta Sans** (clean neutral geometric sans).
- **Indic Script Support:** **Noto Serif Devanagari** + **Noto Sans Devanagari** (Hindi) and **Noto Serif Kannada** + **Noto Sans Kannada** (Kannada) for authentic regional language presentation.

---

## 3. Motion Signature Rules

1. **Character-by-Character Headline Reveal:**
   - Every major H2 headline animates letter by letter on viewport enter.
   - Text is split into `<span>` elements with a staggered opacity transition from `0.05` to `1` (30ms per character).
   - Screen-reader accessible: full text preserved in `aria-label`, animated spans marked `aria-hidden="true"`.
   - `prefers-reduced-motion` immediately disables stagger and renders full opacity.
2. **Count-up Stats:**
   - Numbers count up smoothly from 0 over 1.2s with `easeOutExpo` when entering viewport.
   - Preserves suffixes (`+`, `%`, `/7`).
3. **Tabbed Timeline in Dark Section:**
   - 4-step progressive timeline for screening stages.
   - Interactive tab selection with animated crossfade between active preview cards and large yellow numerals.
4. **Infinite Marquee Rows:**
   - Dual-row marquee scrolling horizontally in opposite directions.
   - Pauses on hover; disabled under `prefers-reduced-motion`.
5. **FAQ Accordion:**
   - Smooth height transition with rotating `+` to `×` icon.
