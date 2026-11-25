import React, { useEffect, useState } from "react"
import styles from "./homepage.module.css"

interface MemoryThreadProps {
  activeChapter: number
}

/**
 * Continuous "Memory Thread"
 * A delicate line in the accent/burgundy tone that draws itself as the user scrolls,
 * passing through subtle nodes at each section to visibly connect the story arc.
 * Respects `prefers-reduced-motion`.
 */
export default function MemoryThread({ activeChapter }: MemoryThreadProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleMediaChange)

    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight))
        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const progressPercent = reducedMotion ? 100 : Math.round(scrollProgress * 100)

  return (
    <div
      className="hidden lg:block fixed left-6 top-0 bottom-0 w-8 z-30 pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Background Track */}
      <div className="absolute left-1/2 top-24 bottom-24 w-[1.5px] -translate-x-1/2 bg-[rgba(32,1,16,0.06)]" />

      {/* Dynamic Drawn Thread */}
      <div
        className="absolute left-1/2 top-24 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#80103A] via-[#200110] to-[#F4A261] transition-all duration-150 ease-out"
        style={{
          height: `${progressPercent}%`,
          maxHeight: "calc(100vh - 192px)",
        }}
      >
        {/* Glowing Head Node */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#200110] border-2 border-[#F4F08A] shadow-xs" />
      </div>

      {/* Section Node Indicator Markers */}
      <div className="absolute left-1/2 top-28 bottom-28 -translate-x-1/2 flex flex-col justify-between items-center">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => {
          const isPassed = activeChapter >= num
          return (
            <div
              key={`node-${num}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isPassed
                  ? "bg-[#200110] scale-125 ring-2 ring-[#F4F08A]"
                  : "bg-[rgba(32,1,16,0.18)]"
              }`}
              title={`Chapter 0${num}`}
            />
          )
        })}
      </div>
    </div>
  )
}
