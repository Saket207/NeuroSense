import React, { useState } from "react"
import { LanguageCode } from "./translations"
import HomepageNav from "./HomepageNav"
import HeroSection from "./HeroSection"
import StatsRowSection from "./StatsRowSection"
import ThreeCardsSection from "./ThreeCardsSection"
import DarkTimelineSection from "./DarkTimelineSection"
import MetricsGridSection from "./MetricsGridSection"
import SplitFeatureSection from "./SplitFeatureSection"
import MarqueeSection from "./MarqueeSection"
import FAQSection from "./FAQSection"
import BannerSection from "./BannerSection"
import FooterSection from "./FooterSection"
import styles from "./homepage.module.css"

interface HomepageProps {
  onEnterApp: () => void
}

/**
 * NeuroSense Homepage Container
 * Faithfully reproducing the NexGo editorial healthcare design system observed in reference frames f_01.jpg - f_15.jpg:
 * - High-contrast editorial serif typography (Newsreader / Lora / Noto Serif)
 * - Warm off-white page background (#FBFAF8)
 * - Soft warm grey-beige card surfaces (#F6F5F1)
 * - Deep royal burgundy accent and timeline background (#200110)
 * - Signature motion: character-by-character reveals, count-up numbers, interactive timeline, dual marquee.
 * - Multilingual support (English, Hindi, Kannada).
 */
export default function Homepage({ onEnterApp }: HomepageProps) {
  const [currentLang, setCurrentLang] = useState<LanguageCode>("en")

  return (
    <div className={styles.pageRoot}>
      {/* 1. Sticky Navigation Bar */}
      <HomepageNav
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onEnterApp={onEnterApp}
      />

      <main>
        {/* 2. Editorial Hero (Pending Reference — Section 0.2) */}
        <HeroSection currentLang={currentLang} onEnterApp={onEnterApp} />

        {/* 3. Stats Row Section (Reference Frame f_01) */}
        <StatsRowSection currentLang={currentLang} />

        {/* 4. Three Tall Feature Cards (Reference Frames f_01 & f_02) */}
        <ThreeCardsSection currentLang={currentLang} />

        {/* 5. Deep Burgundy Interactive Timeline (Reference Frames f_03, f_04, f_05) */}
        <DarkTimelineSection currentLang={currentLang} />

        {/* 6. Metrics Grid Section (Reference Frames f_06 & f_07) */}
        <MetricsGridSection currentLang={currentLang} />

        {/* 7. Split Feature with Floating Stat Cards (Reference Frames f_08 & f_09) */}
        <SplitFeatureSection currentLang={currentLang} />

        {/* 8. Dual Infinite Marquee Rows (Reference Frames f_10 & f_11) */}
        <MarqueeSection currentLang={currentLang} />

        {/* 9. FAQ Accordion Section (Reference Frames f_12 & f_13) */}
        <FAQSection currentLang={currentLang} onEnterApp={onEnterApp} />

        {/* 10. Ambient Pastel Banner (Reference Frame f_13) */}
        <BannerSection />
      </main>

      {/* 11. Editorial Two-Column Footer (Reference Frames f_14 & f_15) */}
      <FooterSection
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onEnterApp={onEnterApp}
      />
    </div>
  )
}
