import React from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import type { HomepageTranslations } from "./translations"

interface CTASectionProps {
  t: HomepageTranslations
  onStartScreening: () => void
}

export default function CTASection({ t, onStartScreening }: CTASectionProps) {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-[#02738A] via-[#015364] to-[#013540] text-white">
      {/* Decorative ambient background rings */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/[0.04] pointer-events-none blur-2xl"
        aria-hidden="true"
      />

      <div className="ns-hp-container relative z-10 text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Compassionate & Confidential</span>
        </div>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          style={{ fontFamily: "var(--hp-font-display)" }}
        >
          {t.ctaTitle}
        </h2>

        <p className="text-sm sm:text-base text-cyan-100/90 leading-relaxed max-w-xl mx-auto">
          {t.ctaSub}
        </p>

        <div className="pt-4">
          <button
            onClick={onStartScreening}
            className="px-8 py-4 rounded-2xl bg-white text-[#015364] font-bold text-base sm:text-lg shadow-2xl shadow-black/30 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            style={{ fontFamily: "var(--hp-font-display)" }}
          >
            <span>{t.ctaButton}</span>
            <ArrowRight className="w-5 h-5 text-[#02738A]" />
          </button>
        </div>
      </div>
    </section>
  )
}
