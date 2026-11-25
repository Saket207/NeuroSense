import React, { useState } from "react"
import { LanguageCode, translations } from "./translations"
import styles from "./homepage.module.css"

interface FooterSectionProps {
  currentLang: LanguageCode
  onSelectLang: (lang: LanguageCode) => void
  onEnterApp: () => void
}

/**
 * Editorial Two-Column Footer (Directly matching Reference Frames f_14.jpg & f_15.jpg)
 * Layout:
 * - Top-left: Circular crosshair logo mark + "NeuroSense" wordmark
 * - Thin vertical divider line between left info and right link columns
 * - Left: Mission tagline, Clinical Safety Notice, and social icons
 * - Right: 3 categorized link columns + newsletter field with underline and dark circular arrow button
 * - Bottom: Copyright + 3-line legal description paragraph
 */
export default function FooterSection({
  currentLang,
  onSelectLang,
  onEnterApp,
}: FooterSectionProps) {
  const [emailInput, setEmailInput] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const t = translations[currentLang].footer

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <footer
      id="footer"
      className="pt-20 pb-16 border-t border-[rgba(32,1,16,0.08)] bg-[#FBFAF8]"
    >
      <div className={styles.container}>
        {/* Main 2-Column Split matching f_14 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16">
          {/* Left Column: Brand, Mission & Clinical Safety Notice */}
          <div className="lg:col-span-5 space-y-6 lg:border-r lg:border-[rgba(32,1,16,0.08)] lg:pr-12">
            {/* Logo Mark + Wordmark */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#200110] flex items-center justify-center text-[#FBFAF8] flex-shrink-0">
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
                className={`text-[24px] font-bold text-[#200110] tracking-tight ${serifClass}`}
              >
                NeuroSense
              </span>
            </div>

            <p className="text-[15px] text-[#6E6268] leading-relaxed max-w-[420px]">
              {t.tagline}
            </p>

            {/* Clinical Safety Alert Box */}
            <div className="p-4 rounded-2xl bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] text-[12px] text-[#6E6268] leading-relaxed">
              <span className="font-bold text-[#200110] block mb-1">
                Clinical Safety Notice
              </span>
              {t.disclaimer}
            </div>

            {/* Illustrative Notice */}
            <div className="text-[11px] text-[#6E6268]/80 leading-normal">
              Note: All elder and healthcare photographs are illustrative
              demonstrations created to respect and protect family privacy.
            </div>

            {/* Quick Language Switcher in Footer */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6E6268] pt-2">
              <span>Language:</span>
              {(["en", "hi", "kn"] as LanguageCode[]).map((lang) => (
                <button
                  key={`foot-${lang}`}
                  type="button"
                  onClick={() => onSelectLang(lang)}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                    currentLang === lang
                      ? "bg-[#200110] text-white"
                      : "hover:text-[#200110]"
                  }`}
                >
                  {lang === "en" ? "English" : lang === "hi" ? "हिन्दी" : "ಕನ್ನಡ"}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Link Columns + Newsletter Field (matching f_14 right) */}
          <div className="lg:col-span-7 space-y-10">
            {/* 3 Link Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Col 1 */}
              <div className="space-y-3">
                <span
                  className={`text-[15px] font-bold text-[#200110] block ${serifClass}`}
                >
                  {t.col1Title}
                </span>
                <ul className="space-y-2 text-[13px] text-[#6E6268]">
                  {t.col1Links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        onClick={onEnterApp}
                        className="hover:text-[#200110] transition-colors cursor-pointer text-left"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 2 */}
              <div className="space-y-3">
                <span
                  className={`text-[15px] font-bold text-[#200110] block ${serifClass}`}
                >
                  {t.col2Title}
                </span>
                <ul className="space-y-2 text-[13px] text-[#6E6268]">
                  {t.col2Links.map((link) => (
                    <li key={link}>
                      <span className="text-[#6E6268]">{link}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3 */}
              <div className="space-y-3">
                <span
                  className={`text-[15px] font-bold text-[#200110] block ${serifClass}`}
                >
                  {t.col3Title}
                </span>
                <ul className="space-y-2 text-[13px] text-[#6E6268]">
                  {t.col3Links.map((link) => (
                    <li key={link}>
                      <span className="text-[#6E6268]">{link}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Field with Underline and Dark Circular Arrow Button (matching f_14 bottom right) */}
            <div className="pt-6 border-t border-[rgba(32,1,16,0.06)] space-y-3">
              <span className="text-[13px] font-bold text-[#200110] block">
                Stay Updated
              </span>
              <p className="text-[13px] text-[#6E6268]">
                Get notified when new regional Indian languages and pilot study
                updates launch.
              </p>

              {subscribed ? (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-[13px] font-medium border border-emerald-200">
                  ✓ Thank you. We will notify you of regional updates.
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex items-center gap-2 max-w-[380px]"
                >
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="flex-1 py-2 px-1 bg-transparent border-b border-[rgba(32,1,16,0.25)] focus:border-[#200110] text-[14px] text-[#200110] placeholder:text-[#6E6268]/50 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="w-8 h-8 rounded-full bg-[#200110] text-[#FBFAF8] flex items-center justify-center hover:bg-[#34081c] transition-all flex-shrink-0 cursor-pointer shadow-2xs"
                    aria-label="Submit newsletter subscription"
                  >
                    →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal Row matching f_15 */}
        <div className="pt-8 border-t border-[rgba(32,1,16,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[12px] text-[#6E6268]">
          <span>{t.copyright}</span>
          <span>A screening aid, not a diagnostic tool.</span>
        </div>
      </div>
    </footer>
  )
}
