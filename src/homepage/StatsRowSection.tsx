import React from "react"
import { LanguageCode, translations } from "./translations"
import CharacterReveal from "./CharacterReveal"
import AcousticWaveCluster from "./AcousticWaveCluster"
import styles from "./homepage.module.css"

interface StatsRowSectionProps {
  currentLang: LanguageCode
}

/**
 * Why It's Trusted (Redesigned matching reference video frame_02)
 * Features:
 * - Large serif headline "Why It's Trusted" with descriptive subtitle
 * - Community trust badge with genuine photographic avatars
 * - 3 high-impact cards with 001, 002, 003, central acoustic waveform dispersion clusters,
 *   serif titles, and warm explanatory descriptions.
 * - Connected bottom bridge line.
 */
export default function StatsRowSection({ currentLang }: StatsRowSectionProps) {
  const t = translations[currentLang].stats
  const story = translations[currentLang].story

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  return (
    <section
      id="why-missed"
      className="py-16 sm:py-20 border-y border-[rgba(32,1,16,0.06)] bg-[#FBFAF8]"
    >
      <div className={styles.container}>
        {/* Section Header: Chapter Pill + Big Serif Headline + Description */}
        <div className="mb-12">
          {/* Chapter Pill */}
          <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#200110] text-[#FBFAF8] text-[12px] font-bold shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4F08A] animate-pulse" />
              <span>{story.chap2}</span>
            </div>

            {/* Photographic Community Trust Badge */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5 items-center">
                <img
                  src="/homepage/card-01-voice.jpg"
                  alt="Elder participant"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <img
                  src="/homepage/hero-family.jpg"
                  alt="Family caregiver"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <img
                  src="/homepage/step-04-doctor.jpg"
                  alt="ASHA health worker"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#200110] flex items-center justify-center text-[#FBFAF8] font-bold text-[10px] shadow-xs">
                  8+
                </div>
              </div>
              <span className="text-[12px] font-semibold text-[#6E6268]">
                {t.communityBadge}
              </span>
            </div>
          </div>

          {/* Heading + Baseline Subtitle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7">
              <CharacterReveal
                text={t.sectionHeading}
                as="h2"
                className={`text-[36px] sm:text-[46px] lg:text-[54px] font-bold text-[#200110] leading-[1.1] tracking-tight ${serifClass}`}
                staggerMs={28}
              />
            </div>
            <div className="lg:col-span-5 pb-1">
              <p className="text-[15px] sm:text-[16px] text-[#6E6268] leading-relaxed">
                {t.sectionSub}
              </p>
            </div>
          </div>
        </div>

        {/* 3 High-Impact Cards (Directly matching frame_02 in video) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {/* Card 001: Mother Tongue Comfort */}
          <div className="p-8 sm:p-9 rounded-[30px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] flex flex-col justify-between min-h-[380px] shadow-2xs hover:shadow-md transition-all group">
            {/* Top Row: 001 + Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold tracking-wider text-[#6E6268]/70 font-mono">
                {t.card1Num}
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-[#200110] text-[11px] font-bold border border-[rgba(32,1,16,0.06)] shadow-2xs">
                {t.card1Badge}
              </span>
            </div>

            {/* Central Acoustic Waveform Dispersion Visual */}
            <div className="my-6 py-2">
              <AcousticWaveCluster variant="gold" />
            </div>

            {/* Bottom Content */}
            <div className="space-y-3">
              <h3
                className={`text-[22px] sm:text-[24px] font-bold text-[#200110] leading-snug ${serifClass}`}
              >
                {t.card1Title}
              </h3>
              <p className="text-[14px] text-[#6E6268] leading-relaxed">
                {t.card1Desc}
              </p>
              <div className="pt-2">
                <span className="inline-block text-[11px] font-semibold text-[#80103A] bg-[#80103A]/8 px-2.5 py-1 rounded-md">
                  {t.card1Pill}
                </span>
              </div>
            </div>
          </div>

          {/* Card 002: Family-Verified Recall */}
          <div className="p-8 sm:p-9 rounded-[30px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] flex flex-col justify-between min-h-[380px] shadow-2xs hover:shadow-md transition-all group">
            {/* Top Row: 002 + Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold tracking-wider text-[#6E6268]/70 font-mono">
                {t.card2Num}
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-[#200110] text-[11px] font-bold border border-[rgba(32,1,16,0.06)] shadow-2xs">
                {t.card2Badge}
              </span>
            </div>

            {/* Central Acoustic Waveform Dispersion Visual */}
            <div className="my-6 py-2">
              <AcousticWaveCluster variant="slate" />
            </div>

            {/* Bottom Content */}
            <div className="space-y-3">
              <h3
                className={`text-[22px] sm:text-[24px] font-bold text-[#200110] leading-snug ${serifClass}`}
              >
                {t.card2Title}
              </h3>
              <p className="text-[14px] text-[#6E6268] leading-relaxed">
                {t.card2Desc}
              </p>
              <div className="pt-2">
                <span className="inline-block text-[11px] font-semibold text-[#200110] bg-[#200110]/8 px-2.5 py-1 rounded-md">
                  {t.card2Pill}
                </span>
              </div>
            </div>
          </div>

          {/* Card 003: Doctor-Ready Referral */}
          <div className="p-8 sm:p-9 rounded-[30px] bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] flex flex-col justify-between min-h-[380px] shadow-2xs hover:shadow-md transition-all group">
            {/* Top Row: 003 + Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold tracking-wider text-[#6E6268]/70 font-mono">
                {t.card3Num}
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-[#200110] text-[11px] font-bold border border-[rgba(32,1,16,0.06)] shadow-2xs">
                {t.card3Badge}
              </span>
            </div>

            {/* Central Acoustic Waveform Dispersion Visual */}
            <div className="my-6 py-2">
              <AcousticWaveCluster variant="coral" />
            </div>

            {/* Bottom Content */}
            <div className="space-y-3">
              <h3
                className={`text-[22px] sm:text-[24px] font-bold text-[#200110] leading-snug ${serifClass}`}
              >
                {t.card3Title}
              </h3>
              <p className="text-[14px] text-[#6E6268] leading-relaxed">
                {t.card3Desc}
              </p>
              <div className="pt-2">
                <span className="inline-block text-[11px] font-semibold text-[#B23B2A] bg-[#B23B2A]/8 px-2.5 py-1 rounded-md">
                  {t.card3Pill}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bridge Line 02 */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#F6F5F1] border border-[rgba(32,1,16,0.08)] text-[13px] sm:text-[14px] text-[#200110] font-medium shadow-2xs hover:bg-white transition-colors">
            <span>{story.bridge2}</span>
            <span className="text-[#80103A] font-bold">↓</span>
          </div>
        </div>
      </div>
    </section>
  )
}
