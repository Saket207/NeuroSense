import React, { useState } from "react"
import { LanguageCode, translations } from "./translations"
import CharacterReveal from "./CharacterReveal"
import styles from "./homepage.module.css"

interface DarkTimelineSectionProps {
  currentLang: LanguageCode
}

/**
 * Dark Timeline Section (Directly matching Reference Frames f_03.jpg, f_04.jpg, f_05.jpg)
 * Layout:
 * - Chapter 04 badge
 * - Full-width deep burgundy background (#200110) with curved transition edges
 * - White H2 on the left with character reveal
 * - Muted mauve-grey paragraph on the right
 * - Interactive tabbed timeline with rounded chips ("01", "02", "03", "04"),
 *   dedicated photographic/SVG visual per phase, huge pale-yellow numerals (#F4F08A),
 *   and thin 1px divider lines.
 * - Bridge line leading into Chapter 05.
 */
export default function DarkTimelineSection({
  currentLang,
}: DarkTimelineSectionProps) {
  const [activeTab, setActiveTab] = useState<number>(0)
  const t = translations[currentLang].timeline
  const story = translations[currentLang].story

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  const steps = [
    {
      chip: t.step1Chip,
      label: t.step1Label,
      title: t.step1Title,
      numeral: t.step1Year,
      numeralLabel: t.step1YearLabel,
      desc: t.step1Desc,
      image: "/homepage/step-01-family.jpg",
      iconEmoji: "👨‍👩‍👧",
    },
    {
      chip: t.step2Chip,
      label: t.step2Label,
      title: t.step2Title,
      numeral: t.step2Year,
      numeralLabel: t.step2YearLabel,
      desc: t.step2Desc,
      image: "/homepage/step-02-conversation.jpg",
      iconEmoji: "🎙️",
    },
    {
      chip: t.step3Chip,
      label: t.step3Label,
      title: t.step3Title,
      numeral: t.step3Year,
      numeralLabel: t.step3YearLabel,
      desc: t.step3Desc,
      image: "/homepage/step-03-matching.svg",
      iconEmoji: "🧠",
    },
    {
      chip: t.step4Chip,
      label: t.step4Label,
      title: t.step4Title,
      numeral: t.step4Year,
      numeralLabel: t.step4YearLabel,
      desc: t.step4Desc,
      image: "/homepage/step-04-doctor.jpg",
      iconEmoji: "📋",
    },
  ]

  const activeStep = steps[activeTab]

  return (
    <section
      id="how-it-works"
      className={`${styles.darkSection} ${styles.sectionSpacing} relative overflow-hidden`}
    >
      {/* Subtle background ambient radial gradient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#80103A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#F4A261]/10 rounded-full blur-3xl pointer-events-none" />

      <div className={styles.container}>
        {/* Chapter 04 Pill */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-[12px] font-bold border border-white/15 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4F08A] animate-pulse" />
            <span>{story.chap4}</span>
          </div>
        </div>

        {/* Top Header: White H2 Left, Muted Paragraph Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <CharacterReveal
              text={t.sectionHeading}
              as="h2"
              className={`text-[34px] sm:text-[44px] lg:text-[54px] font-bold text-white leading-[1.12] tracking-tight ${serifClass}`}
              staggerMs={30}
            />
          </div>
          <div className="lg:col-span-5 pb-2">
            <p className="text-[15px] sm:text-[16px] text-[#CAB8C1] leading-relaxed">
              {t.sectionSub}
            </p>
          </div>
        </div>

        {/* Timeline Interactive Layout */}
        <div className="space-y-6">
          {/* Active Step Panel (matching f_03 & f_04) */}
          <div className="p-8 sm:p-12 rounded-[28px] bg-[#2E0519] border border-[rgba(255,255,255,0.1)] transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Number Chip + Dedicated Visual Photo/SVG */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-[18px]">
                    {activeStep.chip}
                  </div>
                  <span className="text-[13px] font-semibold text-white/60 uppercase tracking-wider">
                    Active Step
                  </span>
                </div>

                {/* Rich Photographic/SVG Visual matching f_04 */}
                <div className="w-full h-[220px] sm:h-[260px] rounded-2xl bg-[#1C010E] border border-white/10 overflow-hidden relative shadow-sm group">
                  <img
                    src={activeStep.image}
                    alt={activeStep.title}
                    width={800}
                    height={597}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#200110]/90 via-[#200110]/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold text-white/90">
                      {activeStep.title}
                    </span>
                    <span className="text-[10px] bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs text-[#F4F08A]">
                      Phase {activeStep.chip}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Step Label, Title, Big Pale-Yellow Numeral, Description */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[13px] font-semibold text-[#CAB8C1] uppercase tracking-wider block">
                  {activeStep.label}
                </span>

                <h3
                  className={`text-[28px] sm:text-[34px] font-bold text-white leading-tight ${serifClass}`}
                >
                  {activeStep.title}
                </h3>

                {/* Huge Pale-Yellow Numeral matching #F4F08A in f_04 */}
                <div className="py-2 flex items-baseline gap-3">
                  <span
                    className={`text-[68px] sm:text-[84px] font-bold text-[#F4F08A] leading-none tracking-tight ${serifClass}`}
                  >
                    {activeStep.numeral}
                  </span>
                  <span className="text-[14px] font-medium text-white/60">
                    {activeStep.numeralLabel}
                  </span>
                </div>

                <p className="text-[15px] sm:text-[16px] text-[#CAB8C1] leading-relaxed max-w-[560px]">
                  {activeStep.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Step Selectors / Accordion Rows (matching f_05) */}
          <div className="divide-y divide-white/10 border-t border-b border-white/10 mt-8">
            {steps.map((step, idx) => (
              <button
                key={step.chip}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`w-full py-5 px-3 flex items-center justify-between text-left transition-all cursor-pointer group ${
                  activeTab === idx
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-90"
                }`}
              >
                <div className="flex items-center gap-5 sm:gap-8">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[15px] transition-all ${
                      activeTab === idx
                        ? "bg-[#F4F08A] text-[#200110]"
                        : "bg-white/10 text-white group-hover:bg-white/20"
                    }`}
                  >
                    {step.chip}
                  </div>
                  <div>
                    <span className="text-[12px] text-white/50 block font-medium">
                      {step.label}
                    </span>
                    <span
                      className={`text-[17px] sm:text-[20px] font-bold text-white ${serifClass}`}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline-block text-[13px] font-medium text-white/40">
                    {activeTab === idx ? "Viewing" : "Click to view"}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-transform ${
                      activeTab === idx
                        ? "bg-white/20 text-white rotate-90"
                        : "text-white/40 group-hover:text-white"
                    }`}
                  >
                    →
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Bridge Line 04 */}
          <div className="pt-12 text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/15 text-[13px] sm:text-[14px] text-white font-medium shadow-2xs hover:bg-white/15 transition-colors">
              <span>{story.bridge4}</span>
              <span className="text-[#F4F08A] font-bold">↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
