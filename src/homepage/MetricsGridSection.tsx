import React, { useState } from "react"
import { LanguageCode, translations } from "./translations"
import CharacterReveal from "./CharacterReveal"
import CountUpNumber from "./CountUpNumber"
import styles from "./homepage.module.css"

interface MetricsGridSectionProps {
  currentLang: LanguageCode
}

/**
 * Metrics Grid Section (Directly matching Reference Frames f_06.jpg & f_07.jpg)
 * Layout:
 * - Chapter 05 badge ("05 · Why You Can Trust It")
 * - Centered H2 with character-by-character reveal
 * - Centered descriptive subtitle
 * - Asymmetric split layout:
 *   - Left: 3 Clinical Pillars with interactive visual SVG diagrams
 *   - Right: 3 floating cards with large serif numbers and community badges
 * - Bridge line leading into Chapter 06.
 */
export default function MetricsGridSection({
  currentLang,
}: MetricsGridSectionProps) {
  const [selectedPillar, setSelectedPillar] = useState<number>(0)
  const t = translations[currentLang].metrics
  const story = translations[currentLang].story

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  const pillars = [
    {
      id: "voice",
      title: "Acoustic Speech Fluency",
      subtitle:
        "Pitch F0, pause duration, formant stability & response latency",
      image: "/homepage/science-voice.svg",
      tag: "Speech Biomarkers",
      color: "border-rose-400/40 text-rose-800",
    },
    {
      id: "memory",
      title: "Episodic Life Memory Check",
      subtitle: "Direct recall, cued recognition & distractor differentiation",
      image: "/homepage/science-memory.svg",
      tag: "Semantic Triangulation",
      color: "border-indigo-400/40 text-indigo-800",
    },
    {
      id: "informant",
      title: "Family Informant Observations",
      subtitle: "16-item weighted IQCODE observations of everyday function",
      image: "/homepage/science-informant.svg",
      tag: "Everyday Functional Context",
      color: "border-amber-400/40 text-amber-800",
    },
  ]

  return (
    <section id="science" className={styles.sectionSpacing}>
      <div className={styles.container}>
        {/* Chapter 05 Pill */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#200110] text-[#FBFAF8] text-[12px] font-bold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4F08A] animate-pulse" />
            <span>{story.chap5}</span>
          </div>
        </div>

        {/* Centered Top Heading with Character Reveal */}
        <div className="max-w-[800px] mx-auto text-center space-y-4 mb-16">
          <CharacterReveal
            text={t.sectionHeading}
            as="h2"
            className={`text-[34px] sm:text-[44px] lg:text-[52px] font-bold text-[#200110] leading-[1.12] tracking-tight ${serifClass}`}
            staggerMs={28}
          />
          <p className="text-[15px] sm:text-[17px] text-[#6E6268] max-w-[620px] mx-auto leading-relaxed">
            {t.sectionSub}
          </p>
        </div>

        {/* Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 3 Clinical Pillars Diagram with Interactive Visual Schematics */}
          <div className="lg:col-span-7 p-7 sm:p-9 rounded-[28px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] flex flex-col justify-between shadow-2xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-white text-[#200110] text-[12px] font-semibold border border-[rgba(32,1,16,0.06)] shadow-2xs inline-block">
                  Clinical Triangulation
                </span>
                <span className="text-[12px] text-[#6E6268]">
                  Select signal to inspect
                </span>
              </div>
              <h3
                className={`text-[26px] sm:text-[30px] font-bold text-[#200110] leading-snug ${serifClass}`}
              >
                {t.pillarTitle}
              </h3>
              <p className="text-[14px] text-[#6E6268] leading-relaxed">
                {t.pillarDesc}
              </p>
            </div>

            {/* Signal Visual Diagram Card */}
            <div className="my-6 rounded-2xl overflow-hidden bg-white border border-[rgba(32,1,16,0.08)] shadow-2xs p-3">
              <img
                src={pillars[selectedPillar].image}
                alt={pillars[selectedPillar].title}
                width={400}
                height={240}
                loading="lazy"
                className="w-full h-auto max-h-[220px] object-contain rounded-xl"
              />
            </div>

            {/* 3 Clickable Signal Selectors */}
            <div className="space-y-2.5 pt-4 border-t border-[rgba(32,1,16,0.08)]">
              {pillars.map((pillar, idx) => (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setSelectedPillar(idx)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    selectedPillar === idx
                      ? "bg-white border-[#200110] shadow-2xs"
                      : "bg-white/60 border-transparent hover:bg-white/90"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        selectedPillar === idx
                          ? "bg-[#200110] text-[#F4F08A]"
                          : "bg-[#EDE9E3] text-[#200110]"
                      }`}
                    >
                      0{idx + 1}
                    </div>
                    <div>
                      <span className="text-[13px] font-bold text-[#200110] block">
                        {pillar.title}
                      </span>
                      <span className="text-[11px] text-[#6E6268]">
                        {pillar.subtitle}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${pillar.color}`}
                  >
                    {pillar.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: 3 Floating Stat Cards (matching f_07 right) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Top Wide Subcard: Community Health */}
            <div className="sm:col-span-2 p-7 rounded-[26px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-[#200110] uppercase tracking-wider">
                  Community Focused
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-white text-[11px] font-bold text-[#200110] border border-[rgba(32,1,16,0.06)]">
                    EN
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white text-[11px] font-bold text-[#200110] border border-[rgba(32,1,16,0.06)]">
                    हिन्दी
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white text-[11px] font-bold text-[#200110] border border-[rgba(32,1,16,0.06)]">
                    ಕನ್ನಡ
                  </span>
                </div>
              </div>
              <p className="text-[14px] text-[#6E6268] leading-relaxed">
                Designed for ASHA workers, ANMs, and family members to spot
                signs early in non-clinical rural and urban settings.
              </p>
            </div>

            {/* Bottom Left Card: 100% Explainable */}
            <div className="p-7 rounded-[26px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] shadow-2xs flex flex-col justify-between min-h-[190px]">
              <div
                className={`text-[48px] font-bold text-[#200110] leading-none mb-2 ${serifClass}`}
              >
                <CountUpNumber value={t.stat3Val} />
              </div>
              <span className="text-[13px] text-[#6E6268] font-medium leading-snug">
                {t.stat3Desc}
              </span>
            </div>

            {/* Bottom Right Card: 3 Retrieval Stages */}
            <div className="p-7 rounded-[26px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] shadow-2xs flex flex-col justify-between min-h-[190px]">
              <div
                className={`text-[48px] font-bold text-[#200110] leading-none mb-2 ${serifClass}`}
              >
                <CountUpNumber value={t.stat1Val} />
              </div>
              <span className="text-[13px] text-[#6E6268] font-medium leading-snug">
                {t.stat1Desc}
              </span>
            </div>
          </div>
        </div>

        {/* Bridge Line 05 */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#F6F5F1] border border-[rgba(32,1,16,0.08)] text-[13px] sm:text-[14px] text-[#200110] font-medium shadow-2xs hover:bg-white transition-colors">
            <span>{story.bridge5}</span>
            <span className="text-[#80103A] font-bold">↓</span>
          </div>
        </div>
      </div>
    </section>
  )
}
