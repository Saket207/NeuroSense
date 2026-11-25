import React from "react"
import { ShieldCheck, Heart } from "lucide-react"
import type { HomepageTranslations } from "./translations"

interface FooterSectionProps {
  t: HomepageTranslations
  onStartScreening: () => void
}

export default function FooterSection({
  t,
  onStartScreening,
}: FooterSectionProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-[#070A10] border-t border-white/10 text-white pt-16 pb-12">
      <div className="ns-hp-container space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#02738A] to-[#0EA5E9] flex items-center justify-center p-0.5">
                <img
                  src="/logo.jpeg"
                  alt="NeuroSense"
                  className="w-full h-full object-cover rounded-[10px]"
                  onError={(e) => {
                    ;(e.currentTarget as HTMLElement).style.display = "none"
                  }}
                />
              </div>
              <span
                className="text-xl font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--hp-font-display)" }}
              >
                NeuroSense
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm leading-relaxed">
              {t.footerTagline}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Explore
            </div>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <button
                  onClick={() => scrollTo("how-it-works")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navHow}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("why-different")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navWhy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("languages")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navLanguages}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("for-workers")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navWorkers}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("faq")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navFaq}
                </button>
              </li>
            </ul>
          </div>

          {/* Screening Access */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Application
            </div>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <button
                  onClick={onStartScreening}
                  className="hover:text-white text-[#0EA5E9] font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  Launch App Portal →
                </button>
              </li>
              <li>
                <a
                  href="#app"
                  onClick={(e) => {
                    e.preventDefault()
                    onStartScreening()
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Family Setup &amp; Screening
                </a>
              </li>
              <li>
                <a
                  href="#app"
                  onClick={(e) => {
                    e.preventDefault()
                    onStartScreening()
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Doctor Clinical View
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Clinical Disclaimer Notice */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs text-[#94A3B8] leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
          <p>{t.footerDisclaimer}</p>
        </div>

        {/* Copyright and Signoff */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B] pt-4 border-t border-white/10">
          <div>{t.footerRights}</div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Dedicated to compassionate elderly care</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  )
}
