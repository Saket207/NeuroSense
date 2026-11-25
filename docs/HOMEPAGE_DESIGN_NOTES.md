# NeuroSense Homepage — Design Notes (from Nexgo Reference)

> **Reference:** Nexgo by Flomio Studio — a healthcare/telemedicine Webflow template  
> **URLs studied:** `https://nexgo.webflow.io/` (live), Webflow Marketplace listing  
> **Method:** Web research synthesis + Webflow Marketplace analysis (browser DevTools blocked due to Chrome remote-debugging config; design derived from multiple review sources and marketplace description)

---

## 1. Section Inventory (top → bottom)

| # | Section | Purpose |
|---|---------|---------|
| 1 | **Sticky Nav** | Logo left, links centre, CTA button right. Becomes compact/blurred on scroll with active-section highlight. |
| 2 | **Hero** | Bold headline + sub-headline, two CTA buttons, trust badge pill above headline, right-side interactive visual (dashboard mockup / floating cards). Dark background with ambient gradient glow. |
| 3 | **Logo Ticker / Marquee** | Horizontal scroll of trusted-by logos. Continuous loop, pauses on hover. |
| 4 | **Features / Services Grid** | 2–3 column card grid showing core offerings. Each card has icon, title, description. Scroll-reveal with stagger. |
| 5 | **How It Works (Stepper)** | Numbered steps with connecting line. Scroll-triggered progressive reveal. Visual illustration beside each step. |
| 6 | **Differentiator / Highlight** | A larger feature-spotlight section. Split layout: text left, interactive visual right. Deeper explanation of the key value prop. |
| 7 | **Stats / Social Proof** | Animated counters or key metrics in a row. Numbers count up on scroll-enter. |
| 8 | **Benefits / Two-Column** | Two audience segments side by side, each with 3–4 bullet benefits. Icon + text pairs. |
| 9 | **Testimonials** | Card carousel or grid of patient/user quotes with avatars. |
| 10 | **Sample / Preview Card** | Visual preview of a report or dashboard. Labelled as sample/demo. |
| 11 | **FAQ Accordion** | Expandable question-answer pairs. Smooth height animation. Plus/minus or chevron toggle. |
| 12 | **Final CTA** | Full-width banner with headline and primary action button. Gradient or dark background. |
| 13 | **Footer** | Logo, link columns, disclaimer, copyright. Dark background. |

---

## 2. Layout System

- **Container max-width:** ~1200px (with `margin: 0 auto`)
- **Section padding:** 80–120px vertical (desktop), 48–64px (mobile)
- **Grid:** CSS Grid or Flexbox, 12-column implicit grid
- **Column gaps:** 32–48px (desktop), 16–24px (mobile)
- **Content max-width for text:** Headings ~700–800px, body ~560–640px
- **Alignment:** Centre-aligned hero text, left-aligned feature sections
- **Spacing scale:** 4px base → 8, 12, 16, 24, 32, 48, 64, 80, 96, 120

---

## 3. Typography

| Role | Font | Weight | Size (desktop) | Line Height | Letter Spacing |
|------|------|--------|-----------------|-------------|----------------|
| Display / H1 | **Satoshi** (or Plus Jakarta Sans) | 700–800 | 48–64px | 1.1–1.15 | -0.02em |
| H2 | Same | 700 | 36–44px | 1.15–1.2 | -0.015em |
| H3 | Same | 600–700 | 24–28px | 1.25 | -0.01em |
| Body | **Inter** | 400 | 16–18px | 1.6–1.7 | 0 |
| Small / Caption | Inter | 400–500 | 13–14px | 1.5 | 0.01em |
| Button | Inter or Satoshi | 600 | 15–16px | 1 | 0.01em |
| Badge / Pill | Inter | 500 | 12–13px | 1 | 0.03em |

**Free alternatives chosen for our project:**
- **Headings:** `Plus Jakarta Sans` (Google Fonts, OFL) — geometric grotesque similar to Satoshi
- **Body:** `Inter` (Google Fonts, OFL) — already industry standard
- **Indic scripts:** Keep existing `Noto Sans Devanagari` / `Noto Sans Kannada` — these are already in the project

---

## 4. Colour Palette

### Dark Theme (hero + nav + CTA + footer)
| Token | Hex | Usage |
|-------|-----|-------|
| `--hp-bg-deep` | `#0B0F19` | Page background, hero |
| `--hp-bg-card` | `#111827` | Card backgrounds on dark sections |
| `--hp-bg-card-hover` | `#1F2937` | Card hover state |
| `--hp-text-primary` | `#FFFFFF` | Headings on dark |
| `--hp-text-secondary` | `#9CA3AF` | Body text on dark |
| `--hp-text-muted` | `#6B7280` | Captions on dark |
| `--hp-border` | `rgba(255,255,255,0.08)` | Card borders on dark |
| `--hp-border-hover` | `rgba(255,255,255,0.15)` | Card border hover |

### Accent Colours (adapted for NeuroSense healthcare)
| Token | Hex | Usage |
|-------|-----|-------|
| `--hp-accent` | `#02738A` | Primary CTA, links (our existing brand teal) |
| `--hp-accent-light` | `#0EA5E9` | Lighter accent for glows/gradients |
| `--hp-accent-glow` | `rgba(2, 115, 138, 0.15)` | Background glow behind hero visual |
| `--hp-success` | `#10B981` | "Recalled" / positive indicators |
| `--hp-warning` | `#F59E0B` | "Cued recall" indicator |
| `--hp-rose` | `#F43F5E` | "Not recalled" indicator |

### Light Sections (features, benefits, FAQ)
| Token | Hex | Usage |
|-------|-----|-------|
| `--hp-bg-light` | `#F8FAFC` | Light section background |
| `--hp-bg-white` | `#FFFFFF` | Card background on light |
| `--hp-text-dark` | `#0F172A` | Headings on light |
| `--hp-text-body` | `#475569` | Body on light |

### Gradients
- Hero ambient: `radial-gradient(ellipse at 30% 50%, rgba(2,115,138,0.12) 0%, transparent 60%)`
- CTA section: `linear-gradient(135deg, #02738A 0%, #015364 100%)`

### Shadows
- Card: `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)`
- Card hover: `0 10px 25px rgba(0,0,0,0.12)`
- CTA button: `0 4px 14px rgba(2,115,138,0.3)`

### Border Radius
- Cards: 16px
- Buttons: 12px
- Pills/Badges: 999px
- Inputs: 12px

---

## 5. Components

### Buttons
- **Primary:** Filled `--hp-accent`, white text, 12px radius, 14px 28px padding, hover lifts with shadow
- **Secondary / Ghost:** Transparent with 1px border `rgba(255,255,255,0.15)`, white text, hover fills slightly
- **Arrow on hover:** Right arrow icon slides 4px right on hover

### Cards
- Rounded-2xl, border `1px solid var(--hp-border)`, padding 24–32px
- On dark: `--hp-bg-card` background, hover → `--hp-bg-card-hover` + brighter border
- On light: white background, subtle shadow, hover → larger shadow + slight translateY(-2px)

### Badge / Pill
- Small rounded-full element above hero headline
- Dot indicator + text, `border 1px solid rgba(255,255,255,0.1)`
- Background: `rgba(255,255,255,0.05)`

### Nav
- Fixed top, full-width, `backdrop-filter: blur(12px)`, `background: rgba(11,15,25,0.8)`
- Shrinks padding on scroll (72px → 56px height)
- Active link highlight with accent underline

### FAQ Accordion
- Border-bottom separator between items
- Chevron rotates 180° on expand
- Content slides in with height animation (200ms ease-out)

---

## 6. Animations & Interactions

### Page Load Sequence
1. Nav slides down from top (opacity 0→1, translateY -20→0, 400ms, ease-out)
2. Hero badge fades in (200ms delay)
3. Hero headline fades in + slides up (400ms delay, stagger 100ms per line)
4. Hero subtitle + buttons fade in (600ms delay)
5. Hero visual fades in + scales slightly (800ms delay)

### Scroll Reveals
- **IntersectionObserver-based** (threshold ~0.15)
- Default: `opacity: 0, translateY: 30px` → `opacity: 1, translateY: 0`
- Duration: 600ms, easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Staggered children: 80–100ms delay between siblings

### Parallax
- Hero background gradient shifts slightly with scroll (translateY at 0.3x speed)
- Floating elements in hero move at different speeds

### Hover Effects
- Buttons: `translateY(-1px)`, increased shadow, 200ms transition
- Cards: `translateY(-4px)`, border brightens, shadow grows, 300ms transition
- Links: colour transition + underline slide-in from left

### Stepper Animation
- Steps reveal one-by-one as user scrolls through the section
- Connecting line "draws" progressively (stroke-dasharray animation)
- Numbers scale up with a bounce effect

### Marquee / Ticker
- CSS `@keyframes` horizontal scroll, constant speed
- Duplicated content for seamless loop
- Pauses on `:hover`

### Counter Animation
- Numbers count up from 0 to target over 1.5s
- Triggered once on scroll-enter (IntersectionObserver)

### FAQ Accordion
- Height transition: `max-height: 0` → measured height, 200ms ease-out
- Chevron: `rotate(0)` → `rotate(180deg)`, 200ms

### Reduced Motion
- All animations wrapped in `@media (prefers-reduced-motion: no-preference)` 
- Reduced-motion: instant transitions, no parallax, no auto-scrolling marquee

---

## 7. Responsive Behaviour

| Breakpoint | Changes |
|------------|---------|
| **≥1280px** (desktop) | Full layout, 2–3 column grids, hero split layout, large type |
| **768–1279px** (tablet) | 2-column → 1-column in some sections, reduced padding, hero stacks vertically, nav may collapse to hamburger |
| **<768px** (mobile) | Single column, hamburger menu, stacked hero, smaller type scale (~0.85x), full-width cards, touch-friendly 48px targets |
| **360px** (small mobile) | Tighter padding (16–20px), type floor at 14–15px body |
