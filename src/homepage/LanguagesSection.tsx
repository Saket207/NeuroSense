import React from "react"
import { Globe, Mic, Volume2, Sparkles, CheckCircle2 } from "lucide-react"
import type { HomepageTranslations } from "./translations"

interface LanguagesSectionProps {
  t: HomepageTranslations
}

export default function LanguagesSection({ t }: LanguagesSectionProps) {
  const languageCards = [
    {
      code: "en",
      name: "English",
      nativeName: "Indian English",
      greeting: t.langGreetingEn,
      status: "Available Now",
      accent: "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
    },
    {
      code: "hi",
      name: "Hindi",
      nativeName: "हिन्दी",
      greeting: t.langGreetingHi,
      status: "Available Now",
      accent: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
    },
    {
      code: "kn",
      name: "Kannada",
      nativeName: "ಕನ್ನಡ",
      greeting: t.langGreetingKn,
      status: "Available Now",
      accent: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
    },
  ]

  return (
    <section id="languages" className="ns-hp-section bg-[#0B0F19] relative">
      <div className="ns-hp-container space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider bg-[#0EA5E9]/10 px-3 py-1 rounded-full border border-[#0EA5E9]/20 inline-block">
            Multilingual by Design
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "var(--hp-font-display)" }}
          >
            {t.langTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.langSub}
          </p>
        </div>

        {/* 3 Supported Languages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {languageCards.map((lang) => (
            <div
              key={lang.code}
              className={`rounded-2xl bg-gradient-to-b ${lang.accent} p-6 border space-y-4 shadow-xl backdrop-blur-md hover:-translate-y-1 transition-all`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {lang.nativeName}
                  </h3>
                  <div className="text-xs text-[#94A3B8]">{lang.name}</div>
                </div>
                <span className="text-[11px] font-bold text-[#10B981] bg-[#10B981]/15 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                  {lang.status}
                </span>
              </div>

              {/* Sample Voice Greeting Prompt */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] text-[#0EA5E9] font-bold uppercase">
                  <Volume2 className="w-3.5 h-3.5" />
                  Sample Voice Prompt
                </div>
                <p className="text-sm text-white font-medium italic">
                  &ldquo;{lang.greeting}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#94A3B8] pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Conversational voice recognition trained</span>
              </div>
            </div>
          ))}
        </div>

        {/* Voice-First Highlight Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#02738A]/20 via-[#0EA5E9]/15 to-transparent border border-[#0EA5E9]/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4
              className="text-lg font-bold text-white tracking-tight"
              style={{ fontFamily: "var(--hp-font-display)" }}
            >
              {t.langVoiceFirst}
            </h4>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl">
              {t.langVoiceFirstDesc}
            </p>
          </div>
          <div className="text-xs text-[#0EA5E9] bg-white/[0.05] border border-white/10 px-4 py-2 rounded-xl text-center font-medium">
            {t.langMore}
          </div>
        </div>
      </div>
    </section>
  )
}
