import React, { useState } from "react"
import { LanguageCode, translations } from "./translations"
import CharacterReveal from "./CharacterReveal"
import styles from "./homepage.module.css"

interface HeroSectionProps {
  currentLang: LanguageCode
  onEnterApp: () => void
}

/**
 * Editorial Hero Section (Pending Reference — Section 0.2)
 * Built strictly in NexGo design language:
 * High-contrast editorial serif, warm off-white background (#FBFAF8),
 * soft rounded card surface (#F6F5F1), burgundy accents (#200110),
 * and live voice memory demonstration.
 */
export default function HeroSection({
  currentLang,
  onEnterApp,
}: HeroSectionProps) {
  const t = translations[currentLang].hero
  const story = translations[currentLang].story
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  const scrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="the-worry"
      className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden relative"
    >
      <div className={styles.container}>
        {/* Top Centered Content */}
        <div className="max-w-[880px] mx-auto text-center space-y-6">
          {/* Chapter 01 Pill Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#200110] text-[#FBFAF8] text-[12px] font-bold shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4F08A] animate-pulse" />
              <span>{story.chap1}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6F5F1] border border-[rgba(32,1,16,0.08)] text-[12px] font-semibold text-[#6E6268] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.pill}</span>
            </div>
          </div>

          {/* Headline with Character Reveal */}
          <CharacterReveal
            text={t.headline}
            as="h1"
            className={`text-[36px] sm:text-[48px] lg:text-[62px] font-bold text-[#200110] leading-[1.08] tracking-tight ${serifClass}`}
            staggerMs={28}
          />

          {/* Editorial Subheadline */}
          <p className="text-[16px] sm:text-[18px] text-[#6E6268] max-w-[640px] mx-auto leading-relaxed font-normal">
            {t.subheadline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onEnterApp}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#200110] text-[#FBFAF8] text-[15px] font-semibold hover:bg-[#34081c] active:scale-95 transition-all shadow-md cursor-pointer group"
            >
              <span>{t.ctaPrimary}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <button
              type="button"
              onClick={scrollToHowItWorks}
              className="inline-flex items-center px-7 py-3.5 rounded-full bg-transparent border border-[rgba(32,1,16,0.2)] text-[#200110] text-[15px] font-semibold hover:bg-[#F6F5F1] active:scale-95 transition-all cursor-pointer"
            >
              {t.ctaSecondary}
            </button>
          </div>
        </div>

        {/* Hero Dual Composition: Warm Family Context + Voice Memory Verification Card */}
        <div className="mt-14 max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Warm Family Editorial Image */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-[28px] overflow-hidden border border-[rgba(32,1,16,0.08)] shadow-sm bg-[#F6F5F1] aspect-[3/2] sm:aspect-[4/3] lg:aspect-[3/2]">
              <img
                src="/homepage/hero-family.jpg"
                alt="Three generation Indian family conducting a gentle voice screening at home"
                width={1264}
                height={848}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#200110]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-[12px] font-medium flex items-center justify-between">
                <span>Spoken at home, in mother tongue</span>
                <span className="text-[10px] uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  Illustrative Scenario
                </span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Voice Memory Simulation Card */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-7 rounded-[28px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.08)] shadow-sm relative overflow-hidden">
              {/* Subtle top pill header */}
              <div className="flex items-center justify-between pb-5 border-b border-[rgba(32,1,16,0.06)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="text-[13px] font-medium text-[#6E6268]">
                    Live Voice Check Simulation
                  </span>
                </div>
                <span className="text-[12px] font-medium px-2.5 py-0.5 rounded-full bg-white/80 text-[#200110] border border-[rgba(32,1,16,0.06)]">
                  Staged Retrieval Engine
                </span>
              </div>

              {/* Conversation Grid */}
              <div className="py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                {/* Question bubble (Family Verified Fact) */}
                <div className="p-4 rounded-2xl bg-white border border-[rgba(32,1,16,0.06)] shadow-2xs space-y-2">
                  <span className="text-[11px] font-bold text-[#6E6268] uppercase tracking-wider block">
                    Family Verified Prompt
                  </span>
                  <p className="text-[14px] font-medium text-[#200110]">
                    {currentLang === "hi"
                      ? "क्या आपको याद है आपके पोते का क्या नाम है?"
                      : currentLang === "kn"
                        ? "ನಿಮ್ಮ ಮೊಮ್ಮಗನ ಮುದ್ದಿನ ಹೆಸರು ಏನು ನೆನಪಿದೆಯೇ?"
                        : "Can you tell me the name of your grandson who visits on Sundays?"}
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-[11px] text-[#6E6268]">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>{t.sampleFact}</span>
                  </div>
                </div>

                {/* Spoken Response (Elder's Voice) */}
                <div className="p-4 rounded-2xl bg-[#200110] text-[#FBFAF8] shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-200 uppercase tracking-wider block">
                      Elder's Spoken Answer
                    </span>
                    {/* Waveform indicator */}
                    <div className="flex items-center gap-0.5 h-3">
                      <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" />
                      <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                  <p className="text-[14px] font-medium text-white/95">
                    "{t.sampleAnswer}"
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-semibold">
                      {t.recalledStatus}
                    </span>
                    <span className="text-white/60">Confidence: 98%</span>
                  </div>
                </div>
              </div>

              {/* Bottom Disclaimer Banner */}
              <div className="pt-4 border-t border-[rgba(32,1,16,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <span className="text-[12px] text-[#6E6268]">
                  {t.disclaimer}
                </span>
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="text-[12px] font-bold text-[#200110] hover:underline cursor-pointer flex items-center gap-1.5"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>
                    {isPlayingAudio ? "Audio Playing..." : "Sample Voice Test"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bridge Line 01 */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#F6F5F1] border border-[rgba(32,1,16,0.08)] text-[13px] sm:text-[14px] text-[#200110] font-medium shadow-2xs hover:bg-white transition-colors">
            <span>{story.bridge1}</span>
            <span className="text-[#80103A] font-bold">↓</span>
          </div>
        </div>
      </div>
    </section>
  )
}
