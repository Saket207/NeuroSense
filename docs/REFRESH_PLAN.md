# NeuroSense Homepage Refresh Plan (Storytelling Flow + Images)

**Branch:** `feature/homepage-refresh`  
**Base:** `feature/homepage` (clean commit `05e486b`)  
**Design Reference:** NexGo Ground Truth (`design-reference/nexgo_reference_frames/`, `f_01.jpg` – `f_15.jpg`)  
**Ethics & Honesty Rule:** Real pipeline, no invented clinical claims, "A screening aid, not a diagnostic tool" stays permanently visible, illustrative labels on all generated photography.

---

## 1. Problems Identified in Current Homepage

1. **Empty Spaces in Feature Cards (`ThreeCardsSection.tsx`):**
   - In reference frames `f_01` & `f_02`, cards carry rounded photographs at the top with pill badges overlaid. In the current build, Cards 01, 02, and 03 only have text and numerals with empty top space.
2. **Text-Heavy Science Section (`MetricsGridSection.tsx`):**
   - The clinical triangulation explanation (acoustic speech fluency, episodic memory recall, informant observations) is presented as text checklists without visual diagrammatic support.
3. **Placeholder in Split Feature Section (`SplitFeatureSection.tsx`):**
   - In reference frames `f_08` & `f_09`, the split section features a large, cinematic photo accompanied by two floating white statistic cards overlapping its bottom. The current page has an empty beige box with an emoji.
4. **Plain Gradient in Banner (`BannerSection.tsx`):**
   - Currently uses a simple CSS pastel linear-gradient box with an animated chevron, missing the rich, warm, hopeful photography of family wellness seen in the reference.
5. **Dark Timeline Visual Balance (`DarkTimelineSection.tsx`):**
   - The 4-step interactive timeline ("01", "02", "03", "04") displays text and emoji icons, but would benefit from a dedicated visual per step illustrating setup, voice conversation, AI verification, and clinician care.
6. **Hero Visual Immersion (`HeroSection.tsx`):**
   - The interactive voice-check simulator card works well, but the surrounding space lacks warm family context.
7. **Footer Link Text Artifact Audit (`FooterSection.tsx`):**
   - An empty `lg:col-span-1 border-r border-[rgba(32,1,16,0.08)]` was placed between columns. On certain subpixel screens and flex wrapping, this empty divider could visually slice through text. We will replace it with clean border styling on the parent grid.
8. **Disconnected Story Flow:**
   - Sections read as standalone marketing blocks rather than a cohesive journey guiding an anxious family from recognition to action.

---

## 2. The Connected Story Arc (7 Chapters)

We structure the homepage as an emotional, respectful journey from family concern to dignified clinical action:

| Chapter | Title & Theme | Existing Section | Visual Anchor & Bridge Line |
|---|---|---|---|
| **01 · The Worry** | Small changes in everyday memory | `HeroSection.tsx` | Grandfather speaking to phone with family + live voice simulator. *Bridge: "When small changes start showing, why does conventional testing fall short?"* |
| **02 · Why It's Missed** | Conventional barriers in India | `StatsRowSection.tsx` | 2000+ words, 8 regional dialects, 0 specialist clinic visits needed. *Bridge: "So how do you check for cognitive change without asking someone to read or write?"* |
| **03 · A Different Way** | The Family-Verified Life Memory Check | `ThreeCardsSection.tsx` | 3 rounded cards: (01) Mother-tongue voice, (02) Life photo album recall, (03) Doctor-ready report. *Bridge: "Here is how a four-minute conversation turns personal memories into clinical clarity."* |
| **04 · How It Works** | 4-step guided screening | `DarkTimelineSection.tsx` | Interactive deep burgundy timeline with dedicated photo per step: Setup, Voice session, Staged verification, Clinician handoff. *Bridge: "Can a voice test really be as reliable as a formal clinical battery?"* |
| **05 · Why You Can Trust It** | Triangulated clinical signals | `MetricsGridSection.tsx` | 3 visual signal cards: Acoustic cadence, Semantic life memory, Family informant questionnaire + 88% clinical concordance. *Bridge: "Designed for real homes across every neighbourhood and village."* |
| **06 · Who It Helps** | Dignified community healthcare | `SplitFeatureSection.tsx` & `MarqueeSection.tsx` | Large portrait of ASHA worker consulting an elder + floating stat cards + dual dialect marquee. *Bridge: "Ready to check in on someone you love today?"* |
| **07 · The Next Step** | Clear guidance & closing action | `FAQSection.tsx`, `BannerSection.tsx`, `ClosingCTASection.tsx` | Warm family panoramic banner, comprehensive FAQ, and closing primary CTA ("Start a Family Screening"). |

### Narrative Connectors
1. **The Continuous Memory Thread:**
   - A delicate SVG scroll-drawn path (`#200110` with amber `#F4F08A` glow) that dynamically draws down the page along section anchors.
   - Passes through chapter nodes (`01` through `07`).
   - Hidden or simplified cleanly on mobile (<768px) to preserve viewport cleanliness.
   - Fully painted with zero transition when `prefers-reduced-motion` is active.
2. **Chapter Labels:**
   - Pill badge at the start of each section (`01 · The Worry`, `02 · Why It's Missed`, etc.) anchored to the memory thread.
3. **Bridge Lines:**
   - Warm, empathetic transition questions at the base of each section leading directly into the next heading.
4. **Smooth Transitions:**
   - Soft curved edge dividers and gentle gradient masks between the warm off-white (`#FBFAF8`) and deep burgundy (`#200110`) sections.
5. **Persistent Progress Cue in Navigation:**
   - Slim 2px progress bar at the bottom of the sticky `HomepageNav`, with active chapter indicator on scroll.
6. **Closing CTA Block:**
   - A dedicated warm closing summary before the footer with primary "Start a Screening" button.

---

## 3. Image Sourcing & Technical Specifications

| Slot | File Name | Subject & Composition | Dimensions | Target Size |
|---|---|---|---|---|
| **Hero Right / Background** | `hero-family.webp` | Indian grandfather speaking warmly into phone on table with daughter and granddaughter beside him, natural morning light. | 1200 x 800 | < 200 KB |
| **ThreeCards - 01** | `card-01-voice.webp` | Dignified elderly Indian man speaking naturally on phone on sunlit home veranda. | 800 x 600 | < 120 KB |
| **ThreeCards - 02** | `card-02-memory.webp` | Indian grandmother and granddaughter reminiscing over open family photo album. | 800 x 600 | < 120 KB |
| **ThreeCards - 03** | `card-03-report.webp` | Female Indian clinician explaining printed referral report to elder and daughter. | 800 x 600 | < 120 KB |
| **Science - 01 (Voice)** | `science-voice.svg` | Precise acoustic speech fluency waveform with cadence markers in burgundy/amber. | Vector | < 15 KB |
| **Science - 02 (Memory)** | `science-memory.svg` | Semantic memory recall knowledge graph linking life events to verified facts. | Vector | < 15 KB |
| **Science - 03 (Informant)** | `science-informant.svg` | Family observation matrix interface card with calm teal clinical indicators. | Vector | < 15 KB |
| **Timeline - Step 01** | `step-01-setup.webp` | Daughter typing family memories into smartphone app on couch. | 800 x 600 | < 120 KB |
| **Timeline - Step 02** | `step-02-session.webp` | Elderly woman speaking into voice screening on tablet on dining table. | 800 x 600 | < 120 KB |
| **Timeline - Step 03** | `step-03-matching.svg` | Visual schematic of multi-stage semantic matching (Direct -> Cues -> Distractors). | Vector | < 15 KB |
| **Timeline - Step 04** | `step-04-care.webp` | ASHA community health worker consulting warmly with elderly couple at home. | 800 x 600 | < 120 KB |
| **Split Feature Large** | `split-community.webp` | ASHA healthcare worker in blue sari with clipboard on sunny courtyard porch with elder. | 1100 x 750 | < 150 KB |
| **Banner Above Footer** | `banner-hope.webp` | Panoramic golden-hour outdoor shot of multi-generational Indian family walking in garden. | 1600 x 600 | < 180 KB |

### Technical Image Rules
- All raster images exported as WebP with proper fallback.
- Explicit `width`, `height`, and CSS `aspect-ratio` to ensure **Zero Cumulative Layout Shift (CLS = 0)**.
- `loading="lazy"` on all images below the fold; `loading="eager"` and `fetchpriority="high"` for hero only.
- Meaningful `alt` text translated into English, Hindi, and Kannada in `translations.ts`.
- Soft gradient placeholder background while images load.

---

## 4. Files to Touch

- `docs/REFRESH_PLAN.md` (this file)
- `docs/IMAGE_CREDITS.md` (source, licence, generation prompts)
- `src/homepage/translations.ts` (new chapter labels, bridge lines, image alt texts in EN, HI, KN)
- `src/homepage/Homepage.tsx` (memory thread state, chapter anchors, closing CTA)
- `src/homepage/HomepageNav.tsx` (scroll progress bar, active chapter indicator)
- `src/homepage/HeroSection.tsx` (chapter 01, hero family visual, bridge line)
- `src/homepage/StatsRowSection.tsx` (chapter 02, bridge line)
- `src/homepage/ThreeCardsSection.tsx` (chapter 03, rounded images in cards, bridge line)
- `src/homepage/DarkTimelineSection.tsx` (chapter 04, photos per step, smooth transition curves)
- `src/homepage/MetricsGridSection.tsx` (chapter 05, signal visuals, bridge line)
- `src/homepage/SplitFeatureSection.tsx` (chapter 06, large photo with floating stat cards)
- `src/homepage/BannerSection.tsx` (chapter 07, panoramic warm image)
- `src/homepage/ClosingCTASection.tsx` (new closing summary & action block)
- `src/homepage/FooterSection.tsx` (fix divider artifact, clean layout)
- `src/homepage/homepage.module.css` (thread line styles, transitions, image card styles)
- `public/homepage/*` (all optimized image assets)
