import React, { useState } from "react"
import { LanguageCode, translations } from "./translations"
import CharacterReveal from "./CharacterReveal"
import styles from "./homepage.module.css"

interface FAQSectionProps {
  currentLang: LanguageCode
  onEnterApp: () => void
}

/**
 * FAQ Accordion Section (Directly matching Reference Frames f_12.jpg & f_13.jpg)
 * Layout:
 * - Left: Soft card with "Have questions?" title + description + dark button
 * - Right: Accordion items with "+" icons on the left, smooth height transition.
 */
export default function FAQSection({
  currentLang,
  onEnterApp,
}: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const t = translations[currentLang].faq

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  const toggleItem = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section id="faq" className={styles.sectionSpacing}>
      <div className={styles.container}>
        {/* Top Centered H2 with Character Reveal */}
        <div className="mb-14 text-center max-w-[700px] mx-auto">
          <CharacterReveal
            text={t.sectionHeading}
            as="h2"
            className={`text-[34px] sm:text-[44px] lg:text-[50px] font-bold text-[#200110] leading-[1.12] tracking-tight ${serifClass}`}
            staggerMs={30}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: CTA Card (matching f_12 left) */}
          <div className="lg:col-span-5 p-8 rounded-[28px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] shadow-2xs space-y-6">
            <div className="space-y-3">
              <h3
                className={`text-[24px] sm:text-[28px] font-bold text-[#200110] leading-snug ${serifClass}`}
              >
                {t.leftCardTitle}
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#6E6268] leading-relaxed">
                {t.leftCardDesc}
              </p>
            </div>

            <button
              type="button"
              onClick={onEnterApp}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#200110] text-[#FBFAF8] text-[14px] font-semibold hover:bg-[#34081c] active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              {t.leftCardButton}
            </button>
          </div>

          {/* Right Column: Accordion with "+" icons (matching f_12 right) */}
          <div className="lg:col-span-7 space-y-3">
            {t.items.map((item, idx) => {
              const isOpen = openIdx === idx
              return (
                <div
                  key={`faq-${idx}`}
                  className="rounded-[22px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] overflow-hidden transition-all shadow-2xs hover:border-[rgba(32,1,16,0.12)]"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(idx)}
                    className="w-full p-5 sm:p-6 flex items-start sm:items-center gap-4 text-left cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    {/* "+" Toggle Glyph on Left (matching reference) */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[18px] font-medium flex-shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-[#200110] text-white rotate-45"
                          : "bg-white text-[#200110] group-hover:bg-[#200110] group-hover:text-white"
                      }`}
                    >
                      +
                    </div>
                    <span
                      className={`text-[16px] sm:text-[18px] font-bold text-[#200110] leading-snug flex-1 ${serifClass}`}
                    >
                      {item.q}
                    </span>
                  </button>

                  {/* Expandable Answer */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-[14px] sm:text-[15px] text-[#6E6268] leading-relaxed border-t border-[rgba(32,1,16,0.04)] pl-16">
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
