import React from "react"
import styles from "./homepage.module.css"

/**
 * Ambient Pastel Banner Section (Directly matching Reference Frame f_13.jpg)
 * A soft rounded banner with blurred pastel gradients and an animated down-chevron.
 */
export default function BannerSection() {
  const scrollToFooter = () => {
    const el = document.getElementById("footer")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-6">
      <div className={styles.container}>
        <div
          onClick={scrollToFooter}
          className="w-full h-[180px] sm:h-[220px] rounded-[32px] overflow-hidden relative cursor-pointer group shadow-2xs flex items-center justify-center border border-[rgba(32,1,16,0.06)]"
          style={{
            background:
              "linear-gradient(135deg, #E6F3F2 0%, #F5F7EC 50%, #ECE8F5 100%)",
          }}
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-teal-200/40 blur-2xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-amber-200/40 blur-2xl pointer-events-none" />

          {/* Centered Animated Chevron */}
          <div className="flex flex-col items-center gap-2 text-[#200110] transition-transform group-hover:translate-y-1">
            <span className="text-[12px] font-semibold text-[#6E6268] tracking-wider uppercase">
              NeuroSense Care Framework
            </span>
            <div className="w-9 h-9 rounded-full bg-white/80 border border-black/5 flex items-center justify-center shadow-xs">
              <svg
                width="16"
                height="16"
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
    </section>
  )
}
