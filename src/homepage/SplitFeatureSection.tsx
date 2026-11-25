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
 * - Chapter 06 badge ("06 · Who It Helps")
 * - Left: H2 + paragraph + soft principle card ("Built for families and health workers, not for diagnosis")
 * - Right: Large rounded photograph with 2 floating white stat cards overlapping the bottom with count-up numbers.
 * - Bridge line leading into Chapter 07.
 */
export default function SplitFeatureSection({
  currentLang,
}: SplitFeatureSectionProps) {
  const t = translations[currentLang].splitFeature
  const story = translations[currentLang].story

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  return (
    <section id="community" className={styles.sectionSpacing}>
      <div className={styles.container}>
        {/* Chapter 06 Pill */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#200110] text-[#FBFAF8] text-[12px] font-bold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4F08A] animate-pulse" />
            <span>{story.chap6}</span>
          </div>
        </div>

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
            {/* Rich Photographic Visual matching f_08 */}
            <div className="w-full h-[360px] sm:h-[440px] rounded-[32px] overflow-hidden border border-[rgba(32,1,16,0.08)] relative shadow-sm group bg-[#EDE9E3]">
              <img
                src="/homepage/split-community.jpg"
                alt="ASHA healthcare worker consulting with an elderly grandmother on a shaded porch in an Indian village"
                width={1200}
                height={805}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#200110]/70 via-transparent to-transparent pointer-events-none" />

              {/* Top pill badge */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-semibold text-white">
                <span className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-xs border border-white/10 shadow-xs">
                  Community Healthcare · ASHA & ANM
                </span>
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs text-[11px]">
                  ASR + Staged Evaluation
                </span>
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

        {/* Bridge Line 06 */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#F6F5F1] border border-[rgba(32,1,16,0.08)] text-[13px] sm:text-[14px] text-[#200110] font-medium shadow-2xs hover:bg-white transition-colors">
            <span>{story.bridge6}</span>
            <span className="text-[#80103A] font-bold">↓</span>
          </div>
        </div>
      </div>
    </section>
  )
}
