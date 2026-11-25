import React from "react"
import {
  FileText,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react"
import type { HomepageTranslations } from "./translations"

interface SampleReportSectionProps {
  t: HomepageTranslations
}

export default function SampleReportSection({ t }: SampleReportSectionProps) {
  return (
    <section className="ns-hp-section bg-[#0B0F19] relative">
      <div className="ns-hp-container space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider bg-[#0EA5E9]/10 px-3 py-1 rounded-full border border-[#0EA5E9]/20 inline-block">
            Clinical Transparency
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "var(--hp-font-display)" }}
          >
            {t.reportTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.reportSub}
          </p>
        </div>

        {/* Mock Report Preview Document */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 p-1 backdrop-blur-xl shadow-2xl">
          <div className="rounded-[22px] bg-[#111827] p-6 sm:p-8 space-y-6">
            {/* Header Badge: Prominently labelled Sample Report */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#02738A]/30 text-[#0EA5E9] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#F59E0B] tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    {t.reportLabel}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {t.reportPatientName}
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#94A3B8] sm:text-right">
                {t.reportPatientMeta}
              </div>
            </div>

            {/* Traffic Light Assessment Banner */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-amber-300 font-semibold uppercase">
                    Screening Flag
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    {t.reportOverallStatus}
                  </div>
                </div>
              </div>

              {/* Confidence Badge */}
              <div className="text-right flex-shrink-0">
                <div className="text-[10px] text-[#94A3B8] uppercase">
                  {t.reportConfidence}
                </div>
                <div className="text-xs font-bold text-[#10B981]">
                  {t.reportConfidenceHigh}
                </div>
              </div>
            </div>

            {/* 3 Metric Breakdown Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3 space-y-1">
                <div className="text-[10px] text-[#94A3B8]">
                  Personal Recall
                </div>
                <div className="text-sm font-bold text-white">7 / 10 Facts</div>
                <div className="text-[11px] text-amber-400 font-medium">
                  2 Cued Recall
                </div>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3 space-y-1">
                <div className="text-[10px] text-[#94A3B8]">Speech Cadence</div>
                <div className="text-sm font-bold text-white">88 WPM</div>
                <div className="text-[11px] text-[#10B981] font-medium">
                  Normal Fluency
                </div>
              </div>

              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3 space-y-1">
                <div className="text-[10px] text-[#94A3B8]">
                  Pause Hesitation
                </div>
                <div className="text-sm font-bold text-white">1.8s Latency</div>
                <div className="text-[11px] text-amber-400 font-medium">
                  Mild Delay (Recent)
                </div>
              </div>
            </div>

            {/* Clinical Explanation Text */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-[#CBD5E1] leading-relaxed space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5 text-xs">
                <Info className="w-3.5 h-3.5 text-[#0EA5E9]" />
                Why this result (Explainability Summary):
              </div>
              <p>{t.reportSummaryText}</p>
            </div>

            {/* Honest Inconclusive Notice */}
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-[#94A3B8] leading-relaxed flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-[#0EA5E9] flex-shrink-0 mt-0.5" />
              <span>{t.reportInconclusiveNote}</span>
            </div>

            {/* Clinical Safety Disclaimer */}
            <div className="text-center pt-2 text-[11px] text-[#64748B] border-t border-white/10">
              {t.reportDisclaimer}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
