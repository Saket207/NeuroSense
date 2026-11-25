import React, { useState } from "react"
import {
  Mic,
  Volume2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Play,
  RotateCcw,
} from "lucide-react"
import type { HomepageTranslations } from "./translations"

interface HeroSectionProps {
  t: HomepageTranslations
  onStartScreening: () => void
  onScrollToHow: () => void
}

export default function HeroSection({
  t,
  onStartScreening,
  onScrollToHow,
}: HeroSectionProps) {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false)
  const [stageIndex, setStageIndex] = useState(1) // 0: query, 1: answered & recalled

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#0B0F19]">
      {/* Ambient background glow accents (inspired by Nexgo) */}
      <div
        className="ns-hp-ambient-glow w-[500px] h-[500px] -top-20 -left-20 bg-[#02738A]/20"
        aria-hidden="true"
      />
      <div
        className="ns-hp-ambient-glow w-[600px] h-[600px] top-40 right-[-100px] bg-[#0EA5E9]/15"
        aria-hidden="true"
      />

      <div className="ns-hp-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-semibold text-[#0EA5E9] tracking-wide uppercase">
                {t.heroBadge}
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]"
              style={{ fontFamily: "var(--hp-font-display)" }}
            >
              {t.heroTitle}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.heroSub}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onStartScreening}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#02738A] to-[#0EA5E9] text-white text-base font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#02738A]/30 hover:shadow-[#02738A]/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
                style={{ fontFamily: "var(--hp-font-display)" }}
              >
                <span>{t.heroCta1}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToHow}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] text-white text-base font-semibold border border-white/10 backdrop-blur-sm transition-all cursor-pointer hover:border-white/20"
              >
                {t.heroCta2}
              </button>
            </div>

            {/* Trust and Non-diagnostic disclaimer line */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-[#64748B]">
              <ShieldCheck className="w-4 h-4 text-[#10B981] flex-shrink-0" />
              <span>{t.heroDisclaimer}</span>
            </div>
          </div>

          {/* Right Column: Animated Voice Waveform & Life Memory Demonstration Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-1 border border-white/15 backdrop-blur-xl shadow-2xl shadow-black/60">
              {/* Inner Card Container */}
              <div className="rounded-[22px] bg-[#111827]/90 p-5 sm:p-6 space-y-5">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#02738A]/30 border border-[#0EA5E9]/40 flex items-center justify-center text-[#0EA5E9]">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        Live Memory Verification
                      </div>
                      <div className="text-[10px] text-[#94A3B8]">
                        Active Voice Session · Kannada/Hindi/English
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[11px] font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {t.heroRecalledBadge}
                  </span>
                </div>

                {/* Stored Family Fact Card */}
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-3 text-xs">
                  <div className="text-[10px] font-semibold text-[#0EA5E9] uppercase tracking-wider mb-0.5">
                    {t.heroFactLabel}
                  </div>
                  <div className="text-white font-medium flex items-center justify-between">
                    <span>{t.heroFactValue}</span>
                    <span className="text-[10px] text-[#64748B] bg-white/[0.05] px-2 py-0.5 rounded">
                      Verified by Daughter
                    </span>
                  </div>
                </div>

                {/* Voice Query from App */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#0EA5E9]/20 text-[#0EA5E9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/10 p-3 text-xs text-[#E2E8F0] leading-relaxed flex-1">
                    <span className="font-semibold text-[#0EA5E9] block text-[10px] mb-0.5">
                      NeuroSense Voice Prompt:
                    </span>
                    &ldquo;{t.heroVoiceQuery}&rdquo;
                  </div>
                </div>

                {/* Elder's Spoken Audio & Waveform Visualization */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3 justify-end">
                    <div className="rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#02738A]/30 to-[#0EA5E9]/20 border border-[#0EA5E9]/40 p-3 text-xs text-white leading-relaxed max-w-[85%] text-left">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold text-[#10B981] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Elder&apos;s Voice Response (Audio)
                        </span>
                        <span className="text-[9px] text-[#94A3B8]">
                          0:04s · SNR 26dB
                        </span>
                      </div>
                      &ldquo;{t.heroElderSpeech}&rdquo;
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <UserCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Dynamic Animated Soundwave Equalizer */}
                  <div className="rounded-xl bg-black/40 border border-white/10 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 h-7">
                      {[
                        18, 28, 44, 22, 58, 36, 48, 20, 38, 52, 24, 40, 60, 30,
                        20,
                      ].map((height, idx) => (
                        <div
                          key={idx}
                          className="w-1 bg-gradient-to-t from-[#02738A] to-[#0EA5E9] rounded-full ns-hp-bar"
                          style={{
                            height: `${height}%`,
                            animationDelay: `${idx * 0.08}s`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="text-[11px] font-semibold text-[#10B981] flex items-center gap-1">
                      <span>Exact Match</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#10B981]/20">
                        100%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Staged Retrieval Step Pills */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-[#94A3B8] border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-[#10B981] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span>Free Recall: Success</span>
                  </div>
                  <div className="text-[#64748B]">
                    Latency: 1.2s · Fluency: High
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
