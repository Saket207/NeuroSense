import React from "react"
import styles from "./homepage.module.css"

/**
 * Ambient Banner Section (Directly matching Reference Frame f_13.jpg)
 * Replaces the plain CSS gradient with a wide panoramic photograph of a three-generation
 * family in golden hour sunlight, layered with soft warm overlays and an animated chevron.
 */
export default function BannerSection() {
  const scrollToFooter = () => {
    const el = document.getElementById("footer")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-8">
      <div className={styles.container}>
        <div
          onClick={scrollToFooter}
          className="w-full h-[220px] sm:h-[280px] rounded-[32px] overflow-hidden relative cursor-pointer group shadow-sm flex items-center justify-center border border-[rgba(32,1,16,0.06)] bg-[#200110]"
        >
          {/* Panoramic Family Background Image */}
          <img
            src="/homepage/banner-hope.jpg"
            alt="Multi-generational Indian family walking together in golden hour sunlight"
            width={1280}
            height={714}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-75"
          />

          {/* Warm Vignette and Ambient Pastel Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#200110]/80 via-[#200110]/30 to-transparent pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-teal-200/20 blur-2xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-amber-200/20 blur-2xl pointer-events-none" />

          {/* Centered Editorial Banner Message */}
          <div className="relative z-10 flex flex-col items-center gap-3 text-center px-4 transition-transform group-hover:translate-y-0.5">
            <span className="text-[11px] sm:text-[12px] font-bold text-[#F4F08A] tracking-widest uppercase bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
              Every Family Deserves Peace of Mind
            </span>
            <h3 className="text-[20px] sm:text-[28px] font-bold text-white tracking-tight drop-shadow-xs font-serif">
              Dedicated to earlier, kinder memory care for India's elders
            </h3>
            <div className="mt-1 flex items-center gap-2 text-white/80 text-[12px] font-medium">
              <span>Scroll to Clinical Notice & Governance</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-bounce"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
