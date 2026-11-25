import React from "react"
import {
  Clock,
  MapPin,
  BookOpen,
  MessageSquare,
  AlertCircle,
} from "lucide-react"
import type { HomepageTranslations } from "./translations"

interface ProblemSectionProps {
  t: HomepageTranslations
}

export default function ProblemSection({ t }: ProblemSectionProps) {
  const problemCards = [
    {
      icon: Clock,
      color:
        "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/20",
      title: t.problemCard1Title,
      description: t.problemCard1Desc,
    },
    {
      icon: MapPin,
      color: "from-rose-500/20 to-red-500/10 text-rose-400 border-rose-500/20",
      title: t.problemCard2Title,
      description: t.problemCard2Desc,
    },
    {
      icon: BookOpen,
      color: "from-blue-500/20 to-cyan-500/10 text-blue-400 border-blue-500/20",
      title: t.problemCard3Title,
      description: t.problemCard3Desc,
    },
    {
      icon: MessageSquare,
      color:
        "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/20",
      title: t.problemCard4Title,
      description: t.problemCard4Desc,
    },
  ]

  return (
    <section className="ns-hp-section bg-[#0F1422] border-t border-b border-white/[0.06]">
      <div className="ns-hp-container space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>The Screening Challenge</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "var(--hp-font-display)" }}
          >
            {t.problemTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.problemSub}
          </p>
        </div>

        {/* 4 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problemCards.map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 p-6 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} border flex items-center justify-center transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3
                  className="text-lg font-bold text-white tracking-tight"
                  style={{ fontFamily: "var(--hp-font-display)" }}
                >
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {card.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
