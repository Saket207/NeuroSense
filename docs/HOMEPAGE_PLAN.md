# NeuroSense Homepage — Implementation Plan

> **Branch:** `feature/homepage`  
> **Date:** 2026-11-26

---

## 1. What Exists Today

- **Framework:** React 19 + Vite + Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Styling:** Tailwind utility classes; global theme in `src/index.css` with CSS custom properties (`--nv-*`)
- **Fonts loaded:** Noto Sans (+ Devanagari, Kannada, etc.), Outfit (display)
- **Animation library:** `framer-motion@13.1.1` (already installed)
- **Icons:** `lucide-react`
- **Router:** No React Router — single-component state machine in `App.tsx` using `Screen` type and `navigate()` function. The app starts at `"home"` screen inside `NeuroSenseApp` after authentication.
- **Entry point:** `main.tsx` renders `<App />`. `App.tsx` default export is a wrapper (`AppShell`) that shows `AloisAuthContainer` or `NeuroSenseApp`.
- **Current "home":** The existing home is an in-app patient dashboard (Alois) — a phone-frame wellness view. There is no public marketing homepage.

## 2. Architecture Decision

The current app is an authenticated SPA with no URL routing — it's a single-page state machine. The homepage should be a **public landing page** that sits before authentication, accessible to anyone.

### Approach: Conditional Rendering in App.tsx

1. Add a `showLanding` state (default `true` on fresh page load)
2. When `showLanding` is true, render the new `<Homepage />` component
3. When user clicks "Start screening" or any in-app CTA, set `showLanding = false` → renders the existing auth/app flow
4. Store the old "home" screen logic untouched — it becomes the in-app dashboard after auth
5. Add URL hash support: `#app` skips to the app directly, allowing `/legacy-home` equivalent via `#app`

### Files to Create (all new)
```
src/homepage/
  Homepage.tsx           — main page component
  HomepageNav.tsx        — sticky navigation bar
  HeroSection.tsx        — hero with animated visual
  ProblemSection.tsx     — why early signs are missed
  HowItWorksSection.tsx  — 4-step animated stepper
  LifeMemorySection.tsx  — interactive differentiator demo
  LanguagesSection.tsx   — built for every voice
  AudienceSection.tsx    — ASHA workers + families benefits
  SampleReportSection.tsx — illustrative report card
  PrivacySection.tsx     — privacy & responsible use
  FAQSection.tsx         — accordion
  CTASection.tsx         — final call to action
  FooterSection.tsx      — footer
  homepage.css           — scoped CSS module for homepage
  translations.ts        — EN, HI, KN copy
  useScrollReveal.ts     — IntersectionObserver hook for scroll animations
  useCountUp.ts          — animated counter hook
```

### Files to Touch (minimal edits)
| File | Change | Why |
|------|--------|-----|
| `src/App.tsx` | Add `showLanding` state + conditional render of `<Homepage />` before auth check (~10 lines) | Entry point |
| `index.html` | Add Google Fonts link for Plus Jakarta Sans + Inter | Typography |

No other files touched. Homepage CSS is scoped with `.ns-hp` prefix.

## 3. Section Plan with Copy

### Section 1: Navigation
- Logo: "NeuroSense" wordmark (text, no image dependency)
- Links: How it works, Why it's different, Languages, For health workers, FAQ
- Language switcher: EN / हिन्दी / ಕನ್ನಡ
- CTA: "Start screening" → triggers `showLanding = false`
- Behaviour: sticky, blur backdrop, shrinks on scroll

### Section 2: Hero
- **Badge:** "🔬 A screening aid, not a diagnosis"
- **Headline EN:** "Spot memory changes early, kindly, in your own language"
- **Headline HI:** "याद से जुड़ी चिंताओं को जल्दी पहचानें, अपनी भाषा में"
- **Headline KN:** "ನೆನಪಿನ ಬದಲಾವಣೆಗಳನ್ನು ಬೇಗನೆ ಗುರುತಿಸಿ, ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ"
- **Sub:** "A simple, voice-first cognitive screening tool. No reading or writing needed. Family members record facts, the elder speaks naturally, and together you get a clear, explainable result."
- **Buttons:** "Start a screening" (primary) + "See how it works" (secondary, scrolls to stepper)
- **Visual:** Animated voice waveform + chat bubble showing elder's answer with a ✓ "Recalled" tick

### Section 3: The Problem (why early signs are missed)
4 cards with icons:
1. **Dismissed as ageing** — "Memory problems are often seen as a normal part of growing older."
2. **Specialists are far away** — "In many parts of India, neurologists and memory clinics are hard to reach."
3. **Standard tools need literacy** — "Most screening tools require reading, writing, and trained professionals."
4. **Language barriers** — "Common tests are in English and poorly adapted to India's many languages."

> **No statistics used** — all qualitative statements. No numbers to source.

### Section 4: How It Works (4-step animated stepper)
1. "Family records facts" — A family member enters verified facts about the elder's life
2. "Elder speaks naturally" — A friendly voice conversation in their own language
3. "Answers are matched" — Each answer is checked against the facts, with cues if needed
4. "Clear, explainable result" — A report with confidence level and next steps

### Section 5: Family-Verified Life Memory Check (interactive)
- Interactive demo card: hovering/tapping a fact category shows the question flow
- Example facts: "Grandchild's name", "Native village", "Last Sunday's visitor"
- Shows staged retrieval: Free recall → Cue → Recognition
- Explains why personal questions reduce bias

### Section 6: Built for Every Voice
- Three language cards: English, Hindi (हिन्दी), Kannada (ಕನ್ನಡ)
- Each shows a greeting in that language
- Note: "More languages are being designed"
- Emphasis: voice-first, no reading or writing needed

### Section 7: For ASHA Workers & Families
Two columns:
- **For ASHA / Health Workers:** Fast setup, repeatable screening, referral report with confidence
- **For Families:** Peace of mind, concrete evidence to show a doctor, track changes over time

### Section 8: Results You Can Trust
- Sample report card (clearly labelled "Sample report — fictional person")
- Shows: traffic-light risk level, confidence indicator, "why this result" explanation
- Mentions "inconclusive, please re-test" possibility
- Disclaimer: "This screening does not replace a medical diagnosis."

### Section 9: Privacy & Responsible Use
- Consent before every session
- Minimal data collection
- Deletion on request
- Never claims to diagnose
- Voice data processed locally where possible

### Section 10: FAQ (6 questions)
1. Is this a diagnosis? → No. It's a preliminary screening aid...
2. Who is it for? → Elderly family members, with help from family or ASHA workers...
3. What languages does it support? → English, Hindi, and Kannada at launch...
4. Does it need internet? → Yes, for voice processing (check code: uses Faster-Whisper backend)
5. How is my data used? → Voice recordings are processed for screening only...
6. What happens after a result? → You receive a report you can share with a doctor...

### Section 11: Final CTA
- Headline: "Ready to check on someone you love?"
- Button: "Start a screening"

### Section 12: Footer
- NeuroSense wordmark
- Links: How it works, FAQ, Privacy
- Disclaimer: "NeuroSense is a screening aid, not a diagnostic tool. Only a qualified medical professional can diagnose cognitive conditions."

## 4. Animation Library

Using **framer-motion** (already installed at v13.1.1). No new dependency needed.
- `motion.div` with `initial`/`whileInView` for scroll reveals
- `AnimatePresence` for FAQ accordion
- `useScroll` + `useTransform` for parallax
- `useMotionValueEvent` for nav shrink

## 5. Fonts

Add to `index.html` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
```

## 6. Translations Flagged for Human Review

| Language | Text | Concern |
|----------|------|---------|
| HI | Hero headline | Should be reviewed by native Hindi speaker for natural phrasing |
| KN | Hero headline | Should be reviewed by native Kannada speaker for natural phrasing |
| HI | All FAQ answers | Translated by AI — needs human review |
| KN | All FAQ answers | Translated by AI — needs human review |

## 7. Assumptions

1. The homepage is a public page shown before authentication, not inside the phone-frame app.
2. "Start screening" navigates into the existing app flow (auth → home → screening).
3. No backend changes needed — the homepage is entirely frontend.
4. The homepage does not need to work offline (it's a marketing page).
5. We use our existing brand colour `#02738A` as the primary accent.
