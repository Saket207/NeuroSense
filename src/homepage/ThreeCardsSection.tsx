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
 * - Chapter 03 badge
 * - H2 left with character-by-character reveal
 * - Baseline-aligned paragraph on the right
 * - 3 tall cards with pill badge top-left, muted serif numeral top-right (01, 02, 03),
 *   rounded photograph in the middle, and serif title + description at the bottom.
 * - Bridge line leading into Chapter 04.
 */
export default function ThreeCardsSection({
  currentLang,
}: ThreeCardsSectionProps) {
  const t = translations[currentLang].threeCards
  const story = translations[currentLang].story

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  return (
    <section id="life-memory" className={styles.sectionSpacing}>
      <div className={styles.container}>
        {/* Chapter 03 Pill */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#200110] text-[#FBFAF8] text-[12px] font-bold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4F08A] animate-pulse" />
            <span>{story.chap3}</span>
          </div>
        </div>

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
          <div className="p-7 sm:p-8 rounded-[28px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group">
            <div>
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

              {/* Card Photo matching f_01 */}
              <div className="mt-5 mb-6 rounded-[20px] overflow-hidden aspect-[4/3] bg-[#E8E4DD] border border-[rgba(32,1,16,0.06)] relative group-hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/homepage/card-01-voice.jpg"
                  alt="Dignified elderly Indian man speaking naturally on phone"
                  width={800}
                  height={597}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom: Title & Description */}
            <div className="space-y-3">
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
          <div className="p-7 sm:p-8 rounded-[28px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group">
            <div>
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

              {/* Card Photo matching f_02 */}
              <div className="mt-5 mb-6 rounded-[20px] overflow-hidden aspect-[4/3] bg-[#E8E4DD] border border-[rgba(32,1,16,0.06)] relative group-hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/homepage/card-02-memory.jpg"
                  alt="Indian grandmother and granddaughter reminiscing over family photo album"
                  width={800}
                  height={597}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-3">
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
          <div className="p-7 sm:p-8 rounded-[28px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group">
            <div>
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

              {/* Card Photo matching f_02 right */}
              <div className="mt-5 mb-6 rounded-[20px] overflow-hidden aspect-[4/3] bg-[#E8E4DD] border border-[rgba(32,1,16,0.06)] relative group-hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/homepage/card-03-report.jpg"
                  alt="Female Indian doctor discussing printed referral report with elder and daughter"
                  width={800}
                  height={597}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-3">
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

        {/* Bridge Line 03 */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#F6F5F1] border border-[rgba(32,1,16,0.08)] text-[13px] sm:text-[14px] text-[#200110] font-medium shadow-2xs hover:bg-white transition-colors">
            <span>{story.bridge3}</span>
            <span className="text-[#80103A] font-bold">↓</span>
          </div>
        </div>
      </div>
    </section>
  )
}
