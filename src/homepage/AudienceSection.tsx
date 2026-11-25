import React from "react"
import { Users, HeartHandshake, CheckCircle2 } from "lucide-react"
import type { HomepageTranslations } from "./translations"

interface AudienceSectionProps {
  t: HomepageTranslations
}

export default function AudienceSection({ t }: AudienceSectionProps) {
  const ashaBenefits = [t.audWorker1, t.audWorker2, t.audWorker3]
  const familyBenefits = [t.audFamily1, t.audFamily2, t.audFamily3]

  return (
    <section
      id="for-workers"
      className="ns-hp-section bg-[#0F1422] border-t border-b border-white/[0.08]"
    >
      <div className="ns-hp-container space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider bg-[#0EA5E9]/10 px-3 py-1 rounded-full border border-[#0EA5E9]/20 inline-block">
            Built for Real-World Care
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "var(--hp-font-display)" }}
          >
            {t.audTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.audSub}
          </p>
        </div>

        {/* 2-Column Audience Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: For ASHA Workers */}
          <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-7 sm:p-8 space-y-6 hover:border-[#0EA5E9]/40 transition-all shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#02738A] to-[#0EA5E9] text-white flex items-center justify-center shadow-lg shadow-[#02738A]/30">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3
                  className="text-lg font-bold text-white tracking-tight"
                  style={{ fontFamily: "var(--hp-font-display)" }}
                >
                  {t.audWorkersTitle}
                </h3>
                <span className="text-xs text-[#0EA5E9] font-medium">
                  Primary Healthcare & Field Screenings
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {ashaBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: For Family Caregivers */}
          <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-7 sm:p-8 space-y-6 hover:border-[#10B981]/40 transition-all shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#10B981] to-[#059669] text-white flex items-center justify-center shadow-lg shadow-[#10B981]/30">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3
                  className="text-lg font-bold text-white tracking-tight"
                  style={{ fontFamily: "var(--hp-font-display)" }}
                >
                  {t.audFamiliesTitle}
                </h3>
                <span className="text-xs text-[#10B981] font-medium">
                  At-Home Baseline & Caring Support
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {familyBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0EA5E9]/20 text-[#0EA5E9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
