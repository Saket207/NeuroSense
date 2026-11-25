import React from "react"
import { LanguageCode, translations } from "./translations"
import CharacterReveal from "./CharacterReveal"
import styles from "./homepage.module.css"

interface MarqueeSectionProps {
  currentLang: LanguageCode
}

/**
 * Marquee Section (Directly matching Reference Frames f_10.jpg & f_11.jpg)
 * Layout:
 * - Centered H2 + subtitle
 * - Two offset infinite marquee rows scrolling horizontally in opposite directions
 * - Pills with name + description, separated by round dark target/crosshair glyph chips
 * - Pauses on hover; respects prefers-reduced-motion
 */
export default function MarqueeSection({ currentLang }: MarqueeSectionProps) {
  const t = translations[currentLang].marquee

  const serifClass =
    currentLang === "hi"
      ? styles.fontSerifHi
      : currentLang === "kn"
        ? styles.fontSerifKn
        : styles.fontSerif

  // Dark crosshair glyph chip matching NexGo reference
  const TargetChip = () => (
    <div className="w-8 h-8 rounded-full bg-[#200110] text-[#FBFAF8] flex items-center justify-center flex-shrink-0 mx-2 shadow-2xs">
      <svg
        width="14"
        height="14"
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
  )

  const PillCard = ({ title, index }: { title: string; index: number }) => (
    <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#F6F5F1] border border-[rgba(32,1,16,0.06)] shadow-2xs flex-shrink-0 hover:bg-white transition-colors cursor-default">
      {/* Mini icon badge */}
      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-xs font-bold text-[#200110] border border-[rgba(32,1,16,0.08)]">
        {index % 3 === 0 ? "✨" : index % 3 === 1 ? "🎙️" : "🩺"}
      </div>
      <span
        className={`text-[15px] sm:text-[16px] font-bold text-[#200110] whitespace-nowrap ${serifClass}`}
      >
        {title}
      </span>
    </div>
  )

  // Duplicate arrays to create continuous infinite marquee loop
  const row1Items = [...t.pillsRow1, ...t.pillsRow1, ...t.pillsRow1]
  const row2Items = [...t.pillsRow2, ...t.pillsRow2, ...t.pillsRow2]

  return (
    <section
      id="languages"
      className={`${styles.sectionSpacing} overflow-hidden`}
    >
      {/* Top Centered Heading */}
      <div className={`${styles.container} mb-14`}>
        <div className="max-w-[760px] mx-auto text-center space-y-4">
          <CharacterReveal
            text={t.sectionHeading}
            as="h2"
            className={`text-[34px] sm:text-[44px] lg:text-[50px] font-bold text-[#200110] leading-[1.12] tracking-tight ${serifClass}`}
            staggerMs={28}
          />
          <p className="text-[15px] sm:text-[16px] text-[#6E6268] max-w-[580px] mx-auto leading-relaxed">
            {t.sectionSub}
          </p>
        </div>
      </div>

      {/* Marquee Rows Container */}
      <div className="space-y-4">
        {/* Row 1: Scrolling Left */}
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeRowLeft}>
            {row1Items.map((item, idx) => (
              <React.Fragment key={`r1-${idx}`}>
                <PillCard title={item} index={idx} />
                <TargetChip />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right (Offset) */}
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeRowRight}>
            {row2Items.map((item, idx) => (
              <React.Fragment key={`r2-${idx}`}>
                <PillCard title={item} index={idx} />
                <TargetChip />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
