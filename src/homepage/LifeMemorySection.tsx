import React, { useState } from "react"
import {
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  ChevronRight,
} from "lucide-react"
import type { HomepageTranslations } from "./translations"

interface LifeMemorySectionProps {
  t: HomepageTranslations
}

export default function LifeMemorySection({ t }: LifeMemorySectionProps) {
  const [activeFactIdx, setActiveFactIdx] = useState(0)

  const demoFacts = [
    {
      id: "grandchild",
      label: t.lifeFact1,
      target: "Aarav",
      relation: "Grandson living in Bengaluru",
      freePrompt: "Who is your grandson who visited you recently?",
      freeAnswer: "Aarav! He brought me my favourite sweets.",
      freeStatus: "Free Recall: Recalled (1.0 credit)",
      isFreeSuccess: true,
      cuePrompt: "He came on train from Bengaluru last Sunday...",
      recognitionOptions: ["Aarav", "Vikram", "Suresh"],
    },
    {
      id: "village",
      label: t.lifeFact2,
      target: "Dharwad",
      relation: "Ancestral home & childhood place",
      freePrompt: "Which native village did you grow up in?",
      freeAnswer: "It's near Hubballi... Dharwad!",
      freeStatus: "Free Recall: Recalled (1.0 credit)",
      isFreeSuccess: true,
      cuePrompt: "The place famous for the pedha sweets near Hubballi...",
      recognitionOptions: ["Dharwad", "Belagavi", "Gadag"],
    },
    {
      id: "recent",
      label: t.lifeFact3,
      target: "Daughter Pooja",
      relation: "Recent Episodic Event (4 days ago)",
      freePrompt: "Who came over to visit you last Sunday afternoon?",
      freeAnswer: "Someone came... I know her well...",
      freeStatus: "Needs gentle cue (0.5 credit)",
      isFreeSuccess: false,
      cuePrompt: "Your daughter who lives in Mysore came with fruits...",
      elderAfterCue: "Ah, yes, Pooja! My elder daughter Pooja.",
      recognitionOptions: ["Pooja", "Rekha", "Sunita"],
    },
  ]

  const activeFact = demoFacts[activeFactIdx]

  const pillars = [
    {
      title: t.lifeWhy1Title,
      desc: t.lifeWhy1Desc,
    },
    {
      title: t.lifeWhy2Title,
      desc: t.lifeWhy2Desc,
    },
    {
      title: t.lifeWhy3Title,
      desc: t.lifeWhy3Desc,
    },
  ]

  return (
    <section
      id="why-different"
      className="ns-hp-section bg-[#0F1422] border-t border-b border-white/[0.08]"
    >
      <div className="ns-hp-container space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#02738A]/20 border border-[#0EA5E9]/30 text-[#0EA5E9] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            {t.lifeBadge}
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "var(--hp-font-display)" }}
          >
            {t.lifeTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.lifeSub}
          </p>
        </div>

        {/* Interactive Staged Retrieval Visualizer Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {/* Fact Selector Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pb-6 border-b border-white/10">
            {demoFacts.map((fact, idx) => (
              <button
                key={fact.id}
                onClick={() => setActiveFactIdx(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFactIdx === idx
                    ? "bg-gradient-to-r from-[#02738A] to-[#0EA5E9] text-white shadow-lg shadow-[#02738A]/30 scale-[1.02]"
                    : "bg-white/[0.05] text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {fact.label}
              </button>
            ))}
          </div>

          {/* Staged Retrieval Simulation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            {/* Stage 1: Free Recall */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0EA5E9] uppercase tracking-wider">
                  Stage 1: Free Recall
                </span>
                <span className="text-[10px] text-[#64748B]">Unassisted</span>
              </div>
              <p className="text-xs text-white/90 font-medium">
                &ldquo;{activeFact.freePrompt}&rdquo;
              </p>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/[0.06] text-xs text-[#94A3B8]">
                <div className="text-[10px] text-[#0EA5E9] font-bold mb-0.5">
                  Spoken Answer:
                </div>
                <div className="text-white">
                  &ldquo;{activeFact.freeAnswer}&rdquo;
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                {activeFact.isFreeSuccess ? (
                  <span className="text-[#10B981] flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Full Recall
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" /> Hesitation Delay
                  </span>
                )}
              </div>
            </div>

            {/* Stage 2: Gentle Cue */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400 uppercase tracking-wider">
                  Stage 2: Gentle Cue
                </span>
                <span className="text-[10px] text-[#64748B]">Context Hint</span>
              </div>
              <p className="text-xs text-white/90 font-medium">
                &ldquo;{activeFact.cuePrompt}&rdquo;
              </p>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/[0.06] text-xs text-[#94A3B8]">
                <div className="text-[10px] text-amber-400 font-bold mb-0.5">
                  Response with Cue:
                </div>
                <div className="text-white">
                  {activeFact.isFreeSuccess
                    ? "Free recall was successful; cue skipped."
                    : activeFact.elderAfterCue}
                </div>
              </div>
              <div className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5" /> Context-Triggered
                Retrieval
              </div>
            </div>

            {/* Stage 3: Recognition Choice */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-400 uppercase tracking-wider">
                  Stage 3: Recognition
                </span>
                <span className="text-[10px] text-[#64748B]">3 Options</span>
              </div>
              <p className="text-xs text-white/90 font-medium">
                Multiple-choice confirmation:
              </p>
              <div className="space-y-1.5 pt-1">
                {activeFact.recognitionOptions.map((opt, i) => (
                  <div
                    key={i}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between ${
                      opt === activeFact.target
                        ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30"
                        : "bg-white/[0.03] text-[#64748B] border border-white/[0.05]"
                    }`}
                  >
                    <span>{opt}</span>
                    {opt === activeFact.target && (
                      <Check className="w-3.5 h-3.5" />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-xs font-semibold text-purple-300">
                Tests Semantic Integrity
              </div>
            </div>
          </div>
        </div>

        {/* 3 Why Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 space-y-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-[#02738A]/30 text-[#0EA5E9] font-bold flex items-center justify-center text-sm">
                0{idx + 1}
              </div>
              <h3
                className="text-base font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--hp-font-display)" }}
              >
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
