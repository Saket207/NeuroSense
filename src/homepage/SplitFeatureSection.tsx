import React from "react"
import { LanguageCode, translations } from "./translations"
import CharacterReveal from "./CharacterReveal"
import CountUpNumber from "./CountUpNumber"
import styles from "./homepage.module.css"

interface SplitFeatureSectionProps {
  currentLang: LanguageCode
}

/**
 * Split Feature Section (Directly matching Reference Frames f_08.jpg & f_09.jpg)
 * Layout:
 * - Left: H2 + paragraph + soft principle card ("Built for families and health workers, not for diagnosis")
 * - Right: Large rounded visual + 2 floating white stat cards overlapping the bottom with count-up numbers.
 */
export default function SplitFeatureSection({
  currentLang,
}: SplitFeatureSectionProps) {
  const t = translations[currentLang].splitFeature

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  return (
    <section className={styles.sectionSpacing}>
      <div className={styles.container}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading + Paragraph + Principle Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <CharacterReveal
                text={t.sectionHeading}
                as="h2"
                className={`text-[34px] sm:text-[44px] lg:text-[50px] font-bold text-[#200110] leading-[1.12] tracking-tight ${serifClass}`}
                staggerMs={30}
              />
              <p className="text-[15px] sm:text-[16px] text-[#6E6268] leading-relaxed">
                {t.sectionSub}
              </p>
            </div>

            {/* Testimonial-Style Principle Card (matching f_09 left) */}
            <div className="p-6 sm:p-7 rounded-[24px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#200110] text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                  ⚖️
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#6E6268] uppercase tracking-wider block">
                    {t.principleLabel}
                  </span>
                  <span
                    className={`text-[17px] sm:text-[18px] font-bold text-[#200110] block leading-snug ${serifClass}`}
                  >
                    "{t.principleTitle}"
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual with Overlapping White Stat Cards (matching f_08 & f_09 right) */}
          <div className="lg:col-span-7 relative">
            {/* Base Rounded Visual Card */}
            <div className="w-full h-[380px] sm:h-[440px] rounded-[32px] bg-[#EDE9E3] border border-[rgba(32,1,16,0.08)] overflow-hidden relative shadow-sm flex flex-col justify-between p-8">
              {/* Background graphic simulation */}
              <div className="flex items-center justify-between text-xs font-semibold text-[#6E6268]">
                <span className="px-3 py-1 rounded-full bg-white/80 border border-black/5">
                  Natural Spoken Conversation
                </span>
                <span>ASR + Staged Evaluation</span>
              </div>

              {/* Decorative wave and elder voice check illustration */}
              <div className="my-auto text-center space-y-3 max-w-[320px] mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-[#200110] text-white mx-auto flex items-center justify-center text-2xl shadow-md">
                  👵
                </div>
                <div className="space-y-1">
                  <span
                    className={`text-[20px] font-bold text-[#200110] block ${serifClass}`}
                  >
                    Personalized Baseline
                  </span>
                  <span className="text-[13px] text-[#6E6268] block">
                    Comparing the elder against their own history, not
                    population averages.
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-[#6E6268]/70 text-right">
                Multilingual Speech Recognition Engine
              </div>
            </div>

            {/* Overlapping White Stat Cards (matching f_09 right bottom) */}
            <div className="grid grid-cols-2 gap-4 -mt-16 sm:-mt-20 px-4 sm:px-8 relative z-10">
              {/* Card 1: Voice Cadence */}
              <div className="p-5 sm:p-6 rounded-[22px] bg-white border border-[rgba(32,1,16,0.06)] shadow-lg space-y-1 hover:-translate-y-1 transition-transform">
                <span className="text-[11px] sm:text-[12px] font-semibold text-[#6E6268] block">
                  {t.overlay1Title}
                </span>
                <div
                  className={`text-[32px] sm:text-[42px] font-bold text-[#200110] leading-none ${serifClass}`}
                >
                  <CountUpNumber value={t.overlay1Val} />
                </div>
                <span className="text-[11px] text-[#6E6268] block pt-1">
                  {t.overlay1Desc}
                </span>
              </div>

              {/* Card 2: Life Recall */}
              <div className="p-5 sm:p-6 rounded-[22px] bg-white border border-[rgba(32,1,16,0.06)] shadow-lg space-y-1 hover:-translate-y-1 transition-transform">
                <span className="text-[11px] sm:text-[12px] font-semibold text-[#6E6268] block">
                  {t.overlay2Title}
                </span>
                <div
                  className={`text-[32px] sm:text-[42px] font-bold text-[#200110] leading-none ${serifClass}`}
                >
                  <CountUpNumber value={t.overlay2Val} />
                </div>
                <span className="text-[11px] text-[#6E6268] block pt-1">
                  {t.overlay2Desc}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
