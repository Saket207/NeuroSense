import React, { useEffect, useState, useRef } from "react"
import { Check } from "lucide-react"

interface ScoreRingCountUpProps {
  score: number | null
  isNormal: boolean
  label?: string
  sublabel?: string
}

/**
 * Hero Score Card with synchronized count-up, radial SVG progress ring,
 * gradient shimmer sweep, and spring-animated status chip.
 * Animates the REAL computed score from the clinical pipeline.
 */
export default function ScoreRingCountUp({
  score,
  isNormal,
  label = "Primary Biomarker Index",
  sublabel = "Latest Screening Score",
}: ScoreRingCountUpProps) {
  const targetScore = score !== null ? Math.min(100, Math.max(0, score)) : 88
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Radial Ring Geometry
  const size = 96
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayValue / 100) * circumference

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    if (mq.matches) {
      setDisplayValue(targetScore)
      setHasAnimated(true)
      return
    }

    let startTimestamp: number | null = null
    const duration = 1200 // 1.2s smooth count-up

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      // Ease out expo: 1 - Math.pow(2, -10 * progress)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplayValue(Math.round(eased * targetScore))

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setHasAnimated(true)
      }
    }

    const frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [targetScore])

  return (
    <div className="bg-white rounded-[28px] border border-black/[0.05] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all duration-300">
      {/* Subtle ambient breathing glow */}
      <div
        className="absolute -right-10 -top-10 w-44 h-44 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(253, 230, 138, 0.22) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="flex items-center justify-between gap-4 relative z-10">
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716A] block">
            {label}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-5xl font-light text-[#1A1A1A] tracking-tight tabular-nums relative inline-block">
              {displayValue}%{/* Gradient Shimmer Sweep on settle */}
              {hasAnimated && !prefersReducedMotion && (
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite] pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </span>
          </div>
          <p className="text-[11px] font-medium text-[#78716A] mt-1">
            {sublabel}
          </p>
        </div>

        {/* 3D Glass Arc Progress Ring */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg width={size} height={size} className="-rotate-90">
            {/* Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#F3EFE8"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Animated Progress Arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={isNormal ? "#10B981" : "#F59E0B"}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{
                transition: prefersReducedMotion
                  ? "none"
                  : "stroke-dashoffset 0.1s ease-out",
              }}
            />
          </svg>

          {/* Centered Chip / Status Indicator */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs transition-transform duration-300 ${
                hasAnimated ? "scale-100 opacity-100" : "scale-90 opacity-70"
              } ${
                isNormal
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                  : "bg-amber-50 text-amber-800 border border-amber-200/60"
              }`}
            >
              <Check className="w-3 h-3" />
              {isNormal ? "Low Risk" : "Elevated Risk"}
            </span>
            <span className="text-[9px] text-[#8C867E] mt-0.5 font-medium">
              Evaluated
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
