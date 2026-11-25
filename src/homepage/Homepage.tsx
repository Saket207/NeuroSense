import React, { useState } from "react"
import { homepageI18n, type HomepageLang } from "./translations"
import HomepageNav from "./HomepageNav"
import HeroSection from "./HeroSection"
import ProblemSection from "./ProblemSection"
import HowItWorksSection from "./HowItWorksSection"
import LifeMemorySection from "./LifeMemorySection"
import LanguagesSection from "./LanguagesSection"
import AudienceSection from "./AudienceSection"
import SampleReportSection from "./SampleReportSection"
import PrivacySection from "./PrivacySection"
import FAQSection from "./FAQSection"
import CTASection from "./CTASection"
import FooterSection from "./FooterSection"
import "./homepage.css"

interface HomepageProps {
  onEnterApp: () => void
}

export default function Homepage({ onEnterApp }: HomepageProps) {
  const [lang, setLang] = useState<HomepageLang>("en")
  const t = homepageI18n[lang] || homepageI18n.en

  const scrollToHow = () => {
    const el = document.getElementById("how-it-works")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="ns-hp antialiased selection:bg-[#0EA5E9]/30 selection:text-white">
      {/* Sticky Navigation */}
      <HomepageNav
        t={t}
        currentLang={lang}
        onLangChange={setLang}
        onStartScreening={onEnterApp}
      />

      {/* Main Content Flow */}
      <main>
        {/* Hero Section */}
        <HeroSection
          t={t}
          onStartScreening={onEnterApp}
          onScrollToHow={scrollToHow}
        />

        {/* The Problem Section */}
        <ProblemSection t={t} />

        {/* How It Works (4-Step Animated Stepper) */}
        <HowItWorksSection t={t} />

        {/* Hero Feature: Family-Verified Life Memory Check */}
        <LifeMemorySection t={t} />

        {/* Built for Every Voice (Languages) */}
        <LanguagesSection t={t} />

        {/* For ASHA Health Workers and Families */}
        <AudienceSection t={t} />

        {/* Sample Explainable Clinical Report */}
        <SampleReportSection t={t} />

        {/* Privacy, Consent & Clinical Boundaries */}
        <PrivacySection t={t} />

        {/* Frequently Asked Questions Accordion */}
        <FAQSection t={t} />

        {/* Final Call to Action */}
        <CTASection t={t} onStartScreening={onEnterApp} />
      </main>

      {/* Footer */}
      <FooterSection t={t} onStartScreening={onEnterApp} />
    </div>
  )
}
