import React, { useState, useEffect } from "react"
import { LanguageCode, translations } from "./translations"
import styles from "./homepage.module.css"

interface HomepageNavProps {
  currentLang: LanguageCode
  onSelectLang: (lang: LanguageCode) => void
  onEnterApp: () => void
}

export default function HomepageNav({
  currentLang,
  onSelectLang,
  onEnterApp,
}: HomepageNavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = translations[currentLang].nav

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FBFAF8]/90 backdrop-blur-md shadow-xs py-3 border-b border-[rgba(32,1,16,0.06)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className={styles.container}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          >
            {/* NexGo Crosshair / Target style mark */}
            <div className="w-8 h-8 rounded-full bg-[#200110] flex items-center justify-center text-[#FBFAF8] flex-shrink-0 transition-transform group-hover:scale-105">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="8" />
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>
            <span
              className={`text-[22px] font-bold text-[#200110] tracking-tight ${serifClass}`}
            >
              NeuroSense
            </span>
          </button>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#6E6268]">
            <button
              type="button"
              onClick={() => scrollTo("how-it-works")}
              className="hover:text-[#200110] transition-colors cursor-pointer"
            >
              {t.howItWorks}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("life-memory")}
              className="hover:text-[#200110] transition-colors cursor-pointer"
            >
              {t.lifeMemory}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("science")}
              className="hover:text-[#200110] transition-colors cursor-pointer"
            >
              {t.science}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("languages")}
              className="hover:text-[#200110] transition-colors cursor-pointer"
            >
              {t.languages}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("faq")}
              className="hover:text-[#200110] transition-colors cursor-pointer"
            >
              {t.faq}
            </button>
          </nav>

          {/* Right Controls: Language Selector + Primary CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-[#F6F5F1] p-1 rounded-full border border-[rgba(32,1,16,0.08)] text-[12px] font-semibold text-[#6E6268]">
              {(["en", "hi", "kn"] as LanguageCode[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onSelectLang(lang)}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    currentLang === lang
                      ? "bg-[#200110] text-[#FBFAF8] shadow-xs"
                      : "hover:text-[#200110]"
                  }`}
                  aria-label={`Switch to ${
                    lang === "en"
                      ? "English"
                      : lang === "hi"
                        ? "Hindi"
                        : "Kannada"
                  }`}
                >
                  {lang === "en" ? "EN" : lang === "hi" ? "हिन्दी" : "ಕನ್ನಡ"}
                </button>
              ))}
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onEnterApp}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#200110] text-[#FBFAF8] text-[13px] font-semibold hover:bg-[#34081c] active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              {t.startScreening}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#200110] hover:bg-[#F6F5F1] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#F6F5F1] border border-[rgba(32,1,16,0.08)] shadow-lg space-y-3">
            <button
              type="button"
              onClick={() => scrollTo("how-it-works")}
              className="block w-full text-left py-2 text-[14px] font-medium text-[#200110]"
            >
              {t.howItWorks}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("life-memory")}
              className="block w-full text-left py-2 text-[14px] font-medium text-[#200110]"
            >
              {t.lifeMemory}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("science")}
              className="block w-full text-left py-2 text-[14px] font-medium text-[#200110]"
            >
              {t.science}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("languages")}
              className="block w-full text-left py-2 text-[14px] font-medium text-[#200110]"
            >
              {t.languages}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("faq")}
              className="block w-full text-left py-2 text-[14px] font-medium text-[#200110]"
            >
              {t.faq}
            </button>
            <button
              type="button"
              onClick={onEnterApp}
              className="w-full mt-2 py-3 rounded-full bg-[#200110] text-[#FBFAF8] text-[14px] font-semibold text-center cursor-pointer"
            >
              {t.startScreening}
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
