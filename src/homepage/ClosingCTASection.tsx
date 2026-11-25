import React from "react"
import { LanguageCode, translations } from "./translations"
import CharacterReveal from "./CharacterReveal"
import styles from "./homepage.module.css"

interface ClosingCTASectionProps {
  currentLang: LanguageCode
  onEnterApp: () => void
}

/**
 * Chapter 07 · The Next Step — Closing Call To Action
 * Connects the narrative journey and invites families to take the 4-minute check.
 */
export default function ClosingCTASection({
  currentLang,
  onEnterApp,
}: ClosingCTASectionProps) {
  const t = translations[currentLang].story

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  return (
    <section className="py-20 lg:py-28 bg-[#FBFAF8] border-t border-[rgba(32,1,16,0.06)] relative overflow-hidden">
      <div className={styles.container}>
        <div className="max-w-[920px] mx-auto text-center space-y-8">
          {/* Chapter Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F6F5F1] border border-[rgba(32,1,16,0.08)] text-xs font-bold text-[#200110] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#80103A] animate-pulse" />
            <span>{t.chap7}</span>
          </div>

          {/* Heading */}
          <CharacterReveal
            text={t.ctaTitle}
            as="h2"
            className={`text-[36px] sm:text-[48px] lg:text-[58px] font-bold text-[#200110] leading-[1.1] tracking-tight ${serifClass}`}
            staggerMs={28}
          />

          {/* Subtitle */}
          <p className="text-[16px] sm:text-[18px] text-[#6E6268] max-w-[680px] mx-auto leading-relaxed">
            {t.ctaSub}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={onEnterApp}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#200110] text-[#FBFAF8] font-bold text-[15px] hover:bg-[#34081c] transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>{t.ctaButton}</span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={onEnterApp}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white border border-[rgba(32,1,16,0.12)] text-[#200110] font-semibold text-[15px] hover:bg-[#F6F5F1] transition-all cursor-pointer"
            >
              {t.ctaSecondary}
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[13px] font-medium text-[#6E6268]">
            <span className="flex items-center gap-2">
              <span className="text-[#0F766E] font-bold">✓</span> No reading or
              writing
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#0F766E] font-bold">✓</span> 8 regional
              languages
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#0F766E] font-bold">✓</span> 100% private &
              consent-gated
            </span>
          </div>

          {/* Illustrative Notice */}
          <p className="text-[11px] text-[#6E6268]/70 pt-4">
            {t.imageIllustrativeNotice}
          </p>
        </div>
      </div>
    </section>
  )
}
