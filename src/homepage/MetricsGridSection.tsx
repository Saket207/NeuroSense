import React from "react"
import { LanguageCode, translations } from "./translations"
import CharacterReveal from "./CharacterReveal"
import CountUpNumber from "./CountUpNumber"
import styles from "./homepage.module.css"

interface MetricsGridSectionProps {
  currentLang: LanguageCode
}

/**
 * Metrics Grid Section (Directly matching Reference Frames f_06.jpg & f_07.jpg)
 * Layout:
 * - Centered H2 with character-by-character reveal
 * - Centered descriptive subtitle
 * - Asymmetric split layout:
 *   - Left: Large card representing the 3 screening pillars
 *   - Right: 3 floating cards with large serif numbers and community badges
 */
export default function MetricsGridSection({
  currentLang,
}: MetricsGridSectionProps) {
  const t = translations[currentLang].metrics

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  return (
    <section id="science" className={styles.sectionSpacing}>
      <div className={styles.container}>
        {/* Centered Top Heading with Character Reveal */}
        <div className="max-w-[800px] mx-auto text-center space-y-4 mb-16">
          <CharacterReveal
            text={t.sectionHeading}
            as="h2"
            className={`text-[34px] sm:text-[44px] lg:text-[52px] font-bold text-[#200110] leading-[1.12] tracking-tight ${serifClass}`}
            staggerMs={28}
          />
          <p className="text-[15px] sm:text-[17px] text-[#6E6268] max-w-[620px] mx-auto leading-relaxed">
            {t.sectionSub}
          </p>
        </div>

        {/* Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: 3 Clinical Pillars Diagram (matching large doctor photo in f_07) */}
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-[28px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] flex flex-col justify-between shadow-2xs">
            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-white text-[#200110] text-[12px] font-semibold border border-[rgba(32,1,16,0.06)] shadow-2xs inline-block">
                Clinical Triangulation
              </span>
              <h3
                className={`text-[26px] sm:text-[30px] font-bold text-[#200110] leading-snug ${serifClass}`}
              >
                {t.pillarTitle}
              </h3>
              <p className="text-[14px] text-[#6E6268] leading-relaxed">
                {t.pillarDesc}
              </p>
            </div>

            {/* 3 Visual Pillars Checklist */}
            <div className="mt-8 space-y-3 pt-6 border-t border-[rgba(32,1,16,0.08)]">
              <div className="p-3.5 rounded-xl bg-white border border-[rgba(32,1,16,0.05)] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs">
                  01
                </div>
                <div className="text-left">
                  <span className="text-[14px] font-bold text-[#200110] block">
                    Episodic Life Memory Check
                  </span>
                  <span className="text-[12px] text-[#6E6268]">
                    10 family-verified personal life facts
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[rgba(32,1,16,0.05)] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  02
                </div>
                <div className="text-left">
                  <span className="text-[14px] font-bold text-[#200110] block">
                    Acoustic Speech Fluency
                  </span>
                  <span className="text-[12px] text-[#6E6268]">
                    Speech rate, hesitation pauses & response latency
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[rgba(32,1,16,0.05)] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 font-bold flex items-center justify-center text-xs">
                  03
                </div>
                <div className="text-left">
                  <span className="text-[14px] font-bold text-[#200110] block">
                    Informant Daily Observations
                  </span>
                  <span className="text-[12px] text-[#6E6268]">
                    16 everyday change observations reported by family
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Floating Stat Cards (matching f_07 right) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Top Wide Subcard: Community Health */}
            <div className="sm:col-span-2 p-8 rounded-[26px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-[#200110] uppercase tracking-wider">
                  Community Focused
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-white text-[11px] font-bold text-[#200110] border border-[rgba(32,1,16,0.06)]">
                    EN
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white text-[11px] font-bold text-[#200110] border border-[rgba(32,1,16,0.06)]">
                    हिन्दी
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white text-[11px] font-bold text-[#200110] border border-[rgba(32,1,16,0.06)]">
                    ಕನ್ನಡ
                  </span>
                </div>
              </div>
              <p className="text-[14px] text-[#6E6268] leading-relaxed">
                Designed for ASHA workers, ANMs, and family members to spot
                signs early in non-clinical rural and urban settings.
              </p>
            </div>

            {/* Bottom Left Card: 100% Explainable */}
            <div className="p-8 rounded-[26px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] shadow-2xs flex flex-col justify-between min-h-[200px]">
              <div
                className={`text-[52px] font-bold text-[#200110] leading-none mb-2 ${serifClass}`}
              >
                <CountUpNumber value={t.stat3Val} />
              </div>
              <span className="text-[13px] text-[#6E6268] font-medium leading-snug">
                {t.stat3Desc}
              </span>
            </div>

            {/* Bottom Right Card: 3 Retrieval Stages */}
            <div className="p-8 rounded-[26px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] shadow-2xs flex flex-col justify-between min-h-[200px]">
              <div
                className={`text-[52px] font-bold text-[#200110] leading-none mb-2 ${serifClass}`}
              >
                <CountUpNumber value={t.stat1Val} />
              </div>
              <span className="text-[13px] text-[#6E6268] font-medium leading-snug">
                {t.stat1Desc}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
