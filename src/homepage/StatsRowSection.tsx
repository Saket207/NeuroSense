import React from "react"
import { LanguageCode, translations } from "./translations"
import CountUpNumber from "./CountUpNumber"
import styles from "./homepage.module.css"

interface StatsRowSectionProps {
  currentLang: LanguageCode
}

/**
 * Stats Row Section (Directly matching Reference Frame f_01.jpg)
 * Layout:
 * - Avatar stack on the left with dark circular badge ("3 Langs")
 * - 3 large soft cards with huge serif numerals (3, 10, 0) counting up
 * - Pure product truths: 3 languages, 10 verified facts, 0 reading needed.
 */
export default function StatsRowSection({ currentLang }: StatsRowSectionProps) {
  const t = translations[currentLang].stats

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  return (
    <section className="py-12 border-y border-[rgba(32,1,16,0.06)] bg-[#FBFAF8]">
      <div className={styles.container}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Avatar stack with dark circular pill (matching f_01.jpg left) */}
          <div className="md:col-span-3 flex items-center gap-3">
            <div className="flex -space-x-3 items-center">
              {/* Avatar 1: Elder photo representation */}
              <div className="w-12 h-12 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-amber-900 font-bold text-sm shadow-xs overflow-hidden">
                <span className="text-[13px]">👵</span>
              </div>
              {/* Avatar 2: Caregiver photo */}
              <div className="w-12 h-12 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-emerald-900 font-bold text-sm shadow-xs overflow-hidden">
                <span className="text-[13px]">👨‍⚕️</span>
              </div>
              {/* Avatar 3: ASHA health worker photo */}
              <div className="w-12 h-12 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-blue-900 font-bold text-sm shadow-xs overflow-hidden">
                <span className="text-[13px]">👩‍⚕️</span>
              </div>
              {/* Dark circle matching "2K+" in reference f_01 */}
              <div className="w-12 h-12 rounded-full border-2 border-white bg-[#200110] flex items-center justify-center text-[#FBFAF8] font-bold text-[11px] shadow-xs">
                {t.avatarText}
              </div>
            </div>
            <span className="text-[12px] font-medium text-[#6E6268] max-w-[120px] leading-tight">
              Community Health Validated
            </span>
          </div>

          {/* 3 Large Stat Cards (matching f_01.jpg right) */}
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Stat Card 1: 3 Languages */}
            <div className="p-6 rounded-[22px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] shadow-2xs hover:border-[rgba(32,1,16,0.15)] transition-all">
              <div
                className={`text-[46px] sm:text-[54px] font-bold text-[#200110] leading-none mb-2 ${serifClass}`}
              >
                <CountUpNumber value={t.stat1Number} />
              </div>
              <span className="text-[13px] font-medium text-[#6E6268] block">
                {t.stat1Label}
              </span>
            </div>

            {/* Stat Card 2: 10 Personal Facts */}
            <div className="p-6 rounded-[22px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] shadow-2xs hover:border-[rgba(32,1,16,0.15)] transition-all">
              <div
                className={`text-[46px] sm:text-[54px] font-bold text-[#200110] leading-none mb-2 ${serifClass}`}
              >
                <CountUpNumber value={t.stat2Number} />
              </div>
              <span className="text-[13px] font-medium text-[#6E6268] block">
                {t.stat2Label}
              </span>
            </div>

            {/* Stat Card 3: 0 Literacy Needed */}
            <div className="p-6 rounded-[22px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] shadow-2xs hover:border-[rgba(32,1,16,0.15)] transition-all">
              <div
                className={`text-[46px] sm:text-[54px] font-bold text-[#200110] leading-none mb-2 ${serifClass}`}
              >
                <CountUpNumber value={t.stat3Number} />
              </div>
              <span className="text-[13px] font-medium text-[#6E6268] block">
                {t.stat3Label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
