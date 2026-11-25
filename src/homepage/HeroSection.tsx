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
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden relative">
      <div className={styles.container}>
        {/* Top Centered Content */}
        <div className="max-w-[880px] mx-auto text-center space-y-6">
          {/* Clinical Safety Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F6F5F1] border border-[rgba(32,1,16,0.08)] text-[12px] font-semibold text-[#6E6268] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t.pill}</span>
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

        {/* Hero Interactive Visual: Voice Memory Verification Card */}
        <div className="mt-14 max-w-[920px] mx-auto">
          <div className="p-6 sm:p-8 rounded-[28px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.08)] shadow-sm relative overflow-hidden">
            {/* Subtle top pill header */}
            <div className="flex items-center justify-between pb-6 border-b border-[rgba(32,1,16,0.06)]">
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
            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Question bubble (Family Verified Fact) */}
              <div className="p-5 rounded-2xl bg-white border border-[rgba(32,1,16,0.06)] shadow-2xs space-y-2">
                <span className="text-[11px] font-bold text-[#6E6268] uppercase tracking-wider block">
                  Family Verified Prompt
                </span>
                <p className="text-[15px] font-medium text-[#200110]">
                  {currentLang === "hi"
                    ? "क्या आपको याद है आपके पोते का क्या नाम है?"
                    : currentLang === "kn"
                      ? "ನಿಮ್ಮ ಮೊಮ್ಮಗನ ಮುದ್ದಿನ ಹೆಸರು ಏನು ನೆನಪಿದೆಯೇ?"
                      : "Can you tell me the name of your grandson who visits on Sundays?"}
                </p>
                <div className="pt-1 flex items-center gap-2 text-[12px] text-[#6E6268]">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>{t.sampleFact}</span>
                </div>
              </div>

              {/* Spoken Response (Elder's Voice) */}
              <div className="p-5 rounded-2xl bg-[#200110] text-[#FBFAF8] shadow-2xs space-y-2">
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
                <p className="text-[15px] font-medium text-white/95">
                  "{t.sampleAnswer}"
                </p>
                <div className="pt-1 flex items-center justify-between text-[12px]">
                  <span className="text-emerald-400 font-semibold">
                    {t.recalledStatus}
                  </span>
                  <span className="text-white/60">Confidence: 98%</span>
                </div>
              </div>
            </div>

            {/* Bottom Disclaimer Banner */}
            <div className="pt-4 border-t border-[rgba(32,1,16,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <span className="text-[12px] text-[#6E6268]">{t.disclaimer}</span>
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
    </section>
  )
}
