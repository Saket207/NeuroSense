import React, { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import type { HomepageTranslations } from "./translations"

interface FAQSectionProps {
  t: HomepageTranslations
}

export default function FAQSection({ t }: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A },
    { q: t.faq6Q, a: t.faq6A },
  ]

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section id="faq" className="ns-hp-section bg-[#0B0F19] relative">
      <div className="ns-hp-container space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider bg-[#0EA5E9]/10 px-3 py-1 rounded-full border border-[#0EA5E9]/20 inline-block">
            Clear Answers
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "var(--hp-font-display)" }}
          >
            {t.faqTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.faqSub}
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug"
                    style={{ fontFamily: "var(--hp-font-display)" }}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center text-[#94A3B8] transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 bg-[#02738A]/30 text-[#0EA5E9]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-white/[0.06] pt-4 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
