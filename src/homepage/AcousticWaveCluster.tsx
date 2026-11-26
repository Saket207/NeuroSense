import React from "react"

interface AcousticWaveClusterProps {
  variant: "gold" | "slate" | "coral"
  className?: string
}

/**
 * Acoustic Waveform Cluster
 * Directly reproducing the refined vertical-bar soundwave dispersion motif
 * observed in the reference video ("Why It's Trusted" 001, 002, 003 cards).
 */
export default function AcousticWaveCluster({
  variant,
  className = "",
}: AcousticWaveClusterProps) {
  // 37 vertical bars forming an elliptical soundwave envelope
  const barCount = 37
  const baseHeights = [
    8, 12, 16, 22, 30, 40, 52, 64, 76, 88, 96, 104, 110, 115, 118, 120, 122,
    124, 122, 120, 118, 115, 110, 104, 96, 88, 76, 64, 52, 40, 30, 22, 16, 12,
    8, 6, 4,
  ]

  const colorMap = {
    gold: {
      gradientId: "waveGold",
      stops: [
        { offset: "0%", color: "#D48806", opacity: 0.15 },
        { offset: "50%", color: "#E5A93C", opacity: 0.85 },
        { offset: "100%", color: "#F4D068", opacity: 0.2 },
      ],
      hoverClass: "group-hover:scale-y-110",
    },
    slate: {
      gradientId: "waveSlate",
      stops: [
        { offset: "0%", color: "#200110", opacity: 0.2 },
        { offset: "50%", color: "#52434A", opacity: 0.8 },
        { offset: "100%", color: "#A89FA3", opacity: 0.2 },
      ],
      hoverClass: "group-hover:scale-y-110",
    },
    coral: {
      gradientId: "waveCoral",
      stops: [
        { offset: "0%", color: "#9E2A2B", opacity: 0.15 },
        { offset: "50%", color: "#E06D53", opacity: 0.85 },
        { offset: "100%", color: "#F4A261", opacity: 0.2 },
      ],
      hoverClass: "group-hover:scale-y-110",
    },
  }

  const { gradientId, stops, hoverClass } = colorMap[variant]

  return (
    <div
      className={`w-full h-[150px] flex items-center justify-center select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        width="280"
        height="140"
        viewBox="0 0 280 140"
        fill="none"
        className={`w-full max-w-[260px] h-auto transition-transform duration-500 ease-out ${hoverClass}`}
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="0"
            y2="140"
            gradientUnits="userSpaceOnUse"
          >
            {stops.map((s, idx) => (
              <stop
                key={idx}
                offset={s.offset}
                stopColor={s.color}
                stopOpacity={s.opacity}
              />
            ))}
          </linearGradient>
        </defs>

        {baseHeights.map((h, i) => {
          // spacing 7px between bars
          const x = 14 + i * 7
          const y = 70 - h / 2
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="2.5"
              height={h}
              rx="1.25"
              fill={`url(#${gradientId})`}
              className="transition-all duration-300"
            />
          )
        })}
      </svg>
    </div>
  )
}
