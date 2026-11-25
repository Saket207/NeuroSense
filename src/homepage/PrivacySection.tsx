import React from "react"
import { Shield, Lock, Trash2, Stethoscope } from "lucide-react"
import type { HomepageTranslations } from "./translations"

interface PrivacySectionProps {
  t: HomepageTranslations
}

export default function PrivacySection({ t }: PrivacySectionProps) {
  const privacyPillars = [
    {
      icon: Shield,
      title: t.privConsentTitle,
      desc: t.privConsentDesc,
    },
    {
      icon: Lock,
      title: t.privMinimalTitle,
      desc: t.privMinimalDesc,
    },
    {
      icon: Trash2,
      title: t.privDeleteTitle,
      desc: t.privDeleteDesc,
    },
    {
      icon: Stethoscope,
      title: t.privNoDiagnosisTitle,
      desc: t.privNoDiagnosisDesc,
    },
  ]

  return (
    <section className="ns-hp-section bg-[#0F1422] border-t border-b border-white/[0.08]">
      <div className="ns-hp-container space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#10B981] uppercase tracking-wider bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20 inline-block">
            Responsible Health Tech
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "var(--hp-font-display)" }}
          >
            {t.privTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.privSub}
          </p>
        </div>

        {/* 4 Privacy Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {privacyPillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 space-y-3 hover:border-white/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3
                  className="text-base font-bold text-white tracking-tight"
                  style={{ fontFamily: "var(--hp-font-display)" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
