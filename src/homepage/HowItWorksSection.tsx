import React from "react"
import { ClipboardList, Mic, Layers, FileCheck, ArrowDown } from "lucide-react"
import type { HomepageTranslations } from "./translations"

interface HowItWorksSectionProps {
  t: HomepageTranslations
}

export default function HowItWorksSection({ t }: HowItWorksSectionProps) {
  const steps = [
    {
      num: "01",
      icon: ClipboardList,
      title: t.howStep1Title,
      desc: t.howStep1Desc,
      tag: "1 Min Setup",
    },
    {
      num: "02",
      icon: Mic,
      title: t.howStep2Title,
      desc: t.howStep2Desc,
      tag: "Natural Voice",
    },
    {
      num: "03",
      icon: Layers,
      title: t.howStep3Title,
      desc: t.howStep3Desc,
      tag: "Cognitive Hierarchy",
    },
    {
      num: "04",
      icon: FileCheck,
      title: t.howStep4Title,
      desc: t.howStep4Desc,
      tag: "ABDM EHR PDF",
    },
  ]

  return (
    <section id="how-it-works" className="ns-hp-section bg-[#0B0F19] relative">
      <div className="ns-hp-container space-y-14">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider bg-[#0EA5E9]/10 px-3 py-1 rounded-full border border-[#0EA5E9]/20 inline-block">
            Step-by-Step Flow
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "var(--hp-font-display)" }}
          >
            {t.howTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.howSub}
          </p>
        </div>

        {/* 4 Steps Visual Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div
                key={step.num}
                className="relative rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#0EA5E9]/40 p-6 space-y-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#02738A]/20 flex flex-col justify-between group"
              >
                {/* Step Number & Tag */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-3xl font-black text-white/20 group-hover:text-[#0EA5E9]/40 transition-colors"
                    style={{ fontFamily: "var(--hp-font-display)" }}
                  >
                    {step.num}
                  </span>
                  <span className="text-[10px] font-semibold text-[#0EA5E9] bg-[#02738A]/20 px-2 py-0.5 rounded border border-[#02738A]/30">
                    {step.tag}
                  </span>
                </div>

                {/* Step Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#02738A] to-[#0EA5E9] flex items-center justify-center text-white shadow-md shadow-[#02738A]/30 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Step Text */}
                <div className="space-y-2 flex-1">
                  <h3
                    className="text-base font-bold text-white tracking-tight leading-snug"
                    style={{ fontFamily: "var(--hp-font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Progress Indicator Dots */}
                <div className="pt-2 flex items-center gap-1.5 border-t border-white/[0.06]">
                  {[0, 1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`h-1 rounded-full flex-1 transition-all ${
                        dot <= idx ? "bg-[#0EA5E9]" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
