import React, { useState, useEffect } from "react"
import { Globe, ArrowRight, Menu, X, ShieldCheck } from "lucide-react"
import type { HomepageTranslations, HomepageLang } from "./translations"

interface HomepageNavProps {
  t: HomepageTranslations
  currentLang: HomepageLang
  onLangChange: (lang: HomepageLang) => void
  onStartScreening: () => void
}

export default function HomepageNav({
  t,
  currentLang,
  onLangChange,
  onStartScreening,
}: HomepageNavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("hero")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)

      const sections = [
        "how-it-works",
        "why-different",
        "languages",
        "for-workers",
        "faq",
      ]
      const scrollPos = window.scrollY + 120

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
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

  const navLinks = [
    { id: "how-it-works", label: t.navHow },
    { id: "why-different", label: t.navWhy },
    { id: "languages", label: t.navLanguages },
    { id: "for-workers", label: t.navWorkers },
    { id: "faq", label: t.navFaq },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B0F19]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-xl shadow-black/30"
          : "bg-transparent py-5"
      }`}
    >
      <div className="ns-hp-container flex items-center justify-between">
        {/* Brand Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group text-left cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#02738A] to-[#0EA5E9] flex items-center justify-center p-0.5 shadow-md shadow-[#02738A]/30">
            <img
              src="/logo.jpeg"
              alt="NeuroSense logo"
              className="w-full h-full object-cover rounded-[10px]"
              onError={(e) => {
                // Fallback to stylized N
                ;(e.currentTarget as HTMLElement).style.display = "none"
              }}
            />
          </div>
          <div>
            <span
              className="text-lg font-extrabold tracking-tight text-white block leading-none"
              style={{ fontFamily: "var(--hp-font-display)" }}
            >
              NeuroSense
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#0EA5E9] block mt-0.5">
              Cognitive Care
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1.5 backdrop-blur-md"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeSection === link.id
                  ? "bg-white/15 text-white font-semibold shadow-xs"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA & Language Switcher */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher Pill */}
          <div className="flex items-center bg-white/[0.05] border border-white/[0.1] rounded-full p-1 text-xs">
            <span className="px-2 text-[#64748B] flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
            </span>
            {(["en", "hi", "kn"] as HomepageLang[]).map((code) => (
              <button
                key={code}
                onClick={() => onLangChange(code)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  currentLang === code
                    ? "bg-[#02738A] text-white shadow-xs font-semibold"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                {code === "en" ? "EN" : code === "hi" ? "हिन्दी" : "ಕನ್ನಡ"}
              </button>
            ))}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onStartScreening}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#02738A] to-[#0EA5E9] text-white text-xs font-bold shadow-md shadow-[#02738A]/30 hover:shadow-lg hover:shadow-[#02738A]/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            style={{ fontFamily: "var(--hp-font-display)" }}
          >
            <span>{t.navCta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Quick Language Toggle on Mobile */}
          <button
            onClick={() => {
              const next: HomepageLang =
                currentLang === "en" ? "hi" : currentLang === "hi" ? "kn" : "en"
              onLangChange(next)
            }}
            className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-medium flex items-center gap-1 border border-white/10 cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-3 h-3 text-[#0EA5E9]" />
            <span>
              {currentLang === "en"
                ? "EN"
                : currentLang === "hi"
                  ? "हिन्दी"
                  : "ಕನ್ನಡ"}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-white/15"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F19]/98 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-2xl animate-fade-in">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left py-2.5 px-3 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#94A3B8]">
              <span>Choose Language:</span>
              <div className="flex gap-1.5">
                {(["en", "hi", "kn"] as HomepageLang[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => onLangChange(code)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                      currentLang === code
                        ? "bg-[#02738A] text-white"
                        : "bg-white/5 text-[#94A3B8]"
                    }`}
                  >
                    {code === "en"
                      ? "English"
                      : code === "hi"
                        ? "हिन्दी"
                        : "ಕನ್ನಡ"}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onStartScreening()
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#02738A] to-[#0EA5E9] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#02738A]/30"
            >
              <span>{t.navCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
