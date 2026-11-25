import React from "react"
import { LanguageCode, translations } from "./translations"
import CharacterReveal from "./CharacterReveal"
import styles from "./homepage.module.css"

interface ThreeCardsSectionProps {
  currentLang: LanguageCode
}

/**
 * Three Tall Cards Section (Directly matching Reference Frames f_01.jpg & f_02.jpg)
 * Layout:
 * - H2 left with character-by-character reveal
 * - Baseline-aligned paragraph on the right
 * - 3 tall cards with pill badge top-left, muted serif numeral top-right (01, 02, 03),
 *   and serif title + description at the bottom.
 */
export default function ThreeCardsSection({
  currentLang,
}: ThreeCardsSectionProps) {
  const t = translations[currentLang].threeCards

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  return (
    <section id="life-memory" className={styles.sectionSpacing}>
      <div className={styles.container}>
        {/* Top Header: H2 Left, Paragraph Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <CharacterReveal
              text={t.sectionHeading}
              as="h2"
              className={`text-[34px] sm:text-[44px] lg:text-[54px] font-bold text-[#200110] leading-[1.12] tracking-tight ${serifClass}`}
              staggerMs={30}
            />
          </div>
          <div className="lg:col-span-5 pb-2">
            <p className="text-[15px] sm:text-[16px] text-[#6E6268] leading-relaxed">
              {t.sectionSub}
            </p>
          </div>
        </div>

        {/* 3 Tall Soft Cards (01, 02, 03) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 01: Easy Access */}
          <div className="p-8 sm:p-9 rounded-[26px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] flex flex-col justify-between min-h-[380px] shadow-2xs hover:shadow-md transition-all group">
            {/* Top row: Pill badge left, big numeral right */}
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-white text-[#200110] text-[12px] font-semibold border border-[rgba(32,1,16,0.06)] shadow-2xs">
                {t.card1Badge}
              </span>
              <span
                className={`text-[44px] font-bold text-[#6E6268]/50 group-hover:text-[#200110] transition-colors ${serifClass}`}
              >
                {t.card1Num}
              </span>
            </div>

            {/* Bottom: Title & Description */}
            <div className="mt-16 space-y-3">
              <h3
                className={`text-[22px] sm:text-[24px] font-bold text-[#200110] leading-snug ${serifClass}`}
              >
                {t.card1Title}
              </h3>
              <p className="text-[14px] text-[#6E6268] leading-relaxed">
                {t.card1Desc}
              </p>
            </div>
          </div>

          {/* Card 02: Personal Care */}
          <div className="p-8 sm:p-9 rounded-[26px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] flex flex-col justify-between min-h-[380px] shadow-2xs hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-white text-[#200110] text-[12px] font-semibold border border-[rgba(32,1,16,0.06)] shadow-2xs">
                {t.card2Badge}
              </span>
              <span
                className={`text-[44px] font-bold text-[#6E6268]/50 group-hover:text-[#200110] transition-colors ${serifClass}`}
              >
                {t.card2Num}
              </span>
            </div>

            <div className="mt-16 space-y-3">
              <h3
                className={`text-[22px] sm:text-[24px] font-bold text-[#200110] leading-snug ${serifClass}`}
              >
                {t.card2Title}
              </h3>
              <p className="text-[14px] text-[#6E6268] leading-relaxed">
                {t.card2Desc}
              </p>
            </div>
          </div>

          {/* Card 03: Connected Support */}
          <div className="p-8 sm:p-9 rounded-[26px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] flex flex-col justify-between min-h-[380px] shadow-2xs hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-white text-[#200110] text-[12px] font-semibold border border-[rgba(32,1,16,0.06)] shadow-2xs">
                {t.card3Badge}
              </span>
              <span
                className={`text-[44px] font-bold text-[#6E6268]/50 group-hover:text-[#200110] transition-colors ${serifClass}`}
              >
                {t.card3Num}
              </span>
            </div>

            <div className="mt-16 space-y-3">
              <h3
                className={`text-[22px] sm:text-[24px] font-bold text-[#200110] leading-snug ${serifClass}`}
              >
                {t.card3Title}
              </h3>
              <p className="text-[14px] text-[#6E6268] leading-relaxed">
                {t.card3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
