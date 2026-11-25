import React, { useState, useEffect } from "react"
import { LanguageCode } from "./translations"
import HomepageNav from "./HomepageNav"
import MemoryThread from "./MemoryThread"
import HeroSection from "./HeroSection"
import StatsRowSection from "./StatsRowSection"
import ThreeCardsSection from "./ThreeCardsSection"
import DarkTimelineSection from "./DarkTimelineSection"
import MetricsGridSection from "./MetricsGridSection"
import SplitFeatureSection from "./SplitFeatureSection"
import MarqueeSection from "./MarqueeSection"
import FAQSection from "./FAQSection"
import BannerSection from "./BannerSection"
import ClosingCTASection from "./ClosingCTASection"
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
 * - Connected 7-chapter storytelling flow with continuous Memory Thread
 * - Rich culturally respectful photography and SVG clinical diagrams
 * - Multilingual support (English, Hindi, Kannada).
 */
export default function Homepage({ onEnterApp }: HomepageProps) {
  const [currentLang, setCurrentLang] = useState<LanguageCode>("en")
  const [activeChapter, setActiveChapter] = useState<number>(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 350
      const sectionIds = [
        "the-worry",
        "why-missed",
        "life-memory",
        "how-it-works",
        "science",
        "community",
        "faq",
      ]

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveChapter(i + 1)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={styles.pageRoot}>
      {/* Continuous Storytelling Memory Thread (Desktop) */}
      <MemoryThread activeChapter={activeChapter} />

      {/* 1. Sticky Navigation Bar with Progress Cue */}
      <HomepageNav
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onEnterApp={onEnterApp}
      />

      <main>
        {/* 2. Chapter 01: The Worry · Hero with Warm Family Photography & Simulator */}
        <HeroSection currentLang={currentLang} onEnterApp={onEnterApp} />

        {/* 3. Chapter 02: Why It's Missed · Stats Row Section */}
        <StatsRowSection currentLang={currentLang} />

        {/* 4. Chapter 03: A Different Way · Three Tall Feature Cards with Photos */}
        <ThreeCardsSection currentLang={currentLang} />

        {/* 5. Chapter 04: How It Works · Deep Burgundy Interactive Timeline with Visuals */}
        <DarkTimelineSection currentLang={currentLang} />

        {/* 6. Chapter 05: Why You Can Trust It · Metrics Grid with 3 Signal Diagrams */}
        <MetricsGridSection currentLang={currentLang} />

        {/* 7. Chapter 06: Who It Helps · Community Split Feature with Floating Cards */}
        <SplitFeatureSection currentLang={currentLang} />

        {/* 8. Multilingual Marquee Rows */}
        <MarqueeSection currentLang={currentLang} />

        {/* 9. Chapter 07: The Next Step · FAQ Accordion Section */}
        <FAQSection currentLang={currentLang} onEnterApp={onEnterApp} />

        {/* 10. Warm Panoramic Pre-Footer Banner */}
        <BannerSection />

        {/* 11. Closing Call To Action Summary */}
        <ClosingCTASection currentLang={currentLang} onEnterApp={onEnterApp} />
      </main>

      {/* 12. Editorial Two-Column Footer */}
      <FooterSection
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onEnterApp={onEnterApp}
      />
    </div>
  )
}
