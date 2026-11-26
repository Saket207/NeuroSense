import React, { useState } from "react"
import { TrendingUp, Activity, Sparkles, Info, ShieldCheck } from "lucide-react"

export interface DayDataPoint {
  day: string
  dateLabel: string
  score: number
  jitterPct: number
  latencySec: number
  coherencePct: number
  confidenceRange: [number, number]
  status: "Optimal" | "Good" | "Stable" | "Review"
  x: number
  y: number
}

interface Stability3DGraphProps {
  segment: "cognitive" | "overall" | "health"
  fontFamily?: string
}

export default function Stability3DGraph({
  segment,
  fontFamily = "'Outfit', sans-serif",
}: Stability3DGraphProps) {
  // Layer selection: "stability" | "acoustic" | "latency"
  const [activeLayer, setActiveLayer] =
    useState<"stability" | "acoustic" | "latency">("stability")
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(1) // Default Tuesday (peak)

  // Segment Configurations with 7-day clinical informative data
  const DATA_BY_SEGMENT: Record<"cognitive" | "overall" | "health", {
    title: string
    subtitle: string
    badge: string
    badgeColor: string
    themeColor: string
    secondaryColor: string
    gradientId: string
    days: DayDataPoint[]
    pathFront: string
    pathBack: string
    areaPath: string
  }> = {
    cognitive: {
      title: "Cognitive Trajectory",
      subtitle: "Episodic Recall & Semantic Fluency",
      badge: "+6.2%",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      themeColor: "#6366F1",
      secondaryColor: "#818CF8",
      gradientId: "chart3dGradCog",
      days: [
        {
          day: "M",
          dateLabel: "Mon, Nov 20",
          score: 78,
          jitterPct: 0.38,
          latencySec: 1.45,
          coherencePct: 82,
          confidenceRange: [75, 81],
          status: "Stable",
          x: 18,
          y: 64,
        },
        {
          day: "T",
          dateLabel: "Tue, Nov 21",
          score: 86,
          jitterPct: 0.31,
          latencySec: 1.3,
          coherencePct: 88,
          confidenceRange: [83, 89],
          status: "Good",
          x: 68,
          y: 48,
        },
        {
          day: "W",
          dateLabel: "Wed, Nov 22",
          score: 89,
          jitterPct: 0.28,
          latencySec: 1.25,
          coherencePct: 91,
          confidenceRange: [86, 92],
          status: "Good",
          x: 118,
          y: 40,
        },
        {
          day: "T",
          dateLabel: "Thu, Nov 23",
          score: 92,
          jitterPct: 0.24,
          latencySec: 1.18,
          coherencePct: 93,
          confidenceRange: [89, 95],
          status: "Optimal",
          x: 168,
          y: 26,
        },
        {
          day: "F",
          dateLabel: "Fri, Nov 24",
          score: 88,
          jitterPct: 0.29,
          latencySec: 1.28,
          coherencePct: 89,
          confidenceRange: [85, 91],
          status: "Good",
          x: 218,
          y: 34,
        },
        {
          day: "S",
          dateLabel: "Sat, Nov 25",
          score: 96,
          jitterPct: 0.18,
          latencySec: 1.05,
          coherencePct: 97,
          confidenceRange: [93, 98],
          status: "Optimal",
          x: 268,
          y: 16,
        },
        {
          day: "S",
          dateLabel: "Sun, Nov 26",
          score: 93,
          jitterPct: 0.22,
          latencySec: 1.12,
          coherencePct: 94,
          confidenceRange: [90, 96],
          status: "Optimal",
          x: 318,
          y: 22,
        },
      ],
      pathFront:
        "M 18 64 Q 43 48 68 48 T 118 40 T 168 26 T 218 34 T 268 16 T 318 22",
      pathBack:
        "M 18 70 Q 43 54 68 54 T 118 46 T 168 32 T 218 40 T 268 22 T 318 28",
      areaPath:
        "M 18 64 Q 43 48 68 48 T 118 40 T 168 26 T 218 34 T 268 16 T 318 22 L 318 92 L 18 92 Z",
    },
    overall: {
      title: "Weekly Stability Trend",
      subtitle: "Acoustic Fluency & Cognitive Cadence",
      badge: "+4.8%",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      themeColor: "#0F62FE",
      secondaryColor: "#38BDF8",
      gradientId: "chart3dGradOverall",
      days: [
        {
          day: "M",
          dateLabel: "Mon, Nov 20",
          score: 80,
          jitterPct: 0.36,
          latencySec: 1.42,
          coherencePct: 84,
          confidenceRange: [77, 83],
          status: "Stable",
          x: 18,
          y: 58,
        },
        {
          day: "T",
          dateLabel: "Tue, Nov 21",
          score: 95,
          jitterPct: 0.21,
          latencySec: 1.12,
          coherencePct: 96,
          confidenceRange: [92, 98],
          status: "Optimal",
          x: 68,
          y: 18,
        },
        {
          day: "W",
          dateLabel: "Wed, Nov 22",
          score: 85,
          jitterPct: 0.32,
          latencySec: 1.34,
          coherencePct: 88,
          confidenceRange: [81, 88],
          status: "Good",
          x: 118,
          y: 52,
        },
        {
          day: "T",
          dateLabel: "Thu, Nov 23",
          score: 89,
          jitterPct: 0.27,
          latencySec: 1.24,
          coherencePct: 91,
          confidenceRange: [86, 92],
          status: "Good",
          x: 168,
          y: 38,
        },
        {
          day: "F",
          dateLabel: "Fri, Nov 24",
          score: 76,
          jitterPct: 0.42,
          latencySec: 1.55,
          coherencePct: 80,
          confidenceRange: [72, 80],
          status: "Review",
          x: 218,
          y: 66,
        },
        {
          day: "S",
          dateLabel: "Sat, Nov 25",
          score: 92,
          jitterPct: 0.24,
          latencySec: 1.19,
          coherencePct: 93,
          confidenceRange: [89, 95],
          status: "Optimal",
          x: 268,
          y: 32,
        },
        {
          day: "S",
          dateLabel: "Sun, Nov 26",
          score: 88,
          jitterPct: 0.29,
          latencySec: 1.26,
          coherencePct: 90,
          confidenceRange: [85, 91],
          status: "Good",
          x: 318,
          y: 42,
        },
      ],
      pathFront:
        "M 18 58 Q 43 18 68 18 T 118 52 T 168 38 T 218 66 T 268 32 T 318 42",
      pathBack:
        "M 18 64 Q 43 24 68 24 T 118 58 T 168 44 T 218 72 T 268 38 T 318 48",
      areaPath:
        "M 18 58 Q 43 18 68 18 T 118 52 T 168 38 T 218 66 T 268 32 T 318 42 L 318 92 L 18 92 Z",
    },
    health: {
      title: "Neurological & Motor Vitals",
      subtitle: "Tremor Stability, Sleep & Hydration",
      badge: "+3.1%",
      badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
      themeColor: "#059669",
      secondaryColor: "#34D399",
      gradientId: "chart3dGradHealth",
      days: [
        {
          day: "M",
          dateLabel: "Mon, Nov 20",
          score: 82,
          jitterPct: 0.35,
          latencySec: 1.38,
          coherencePct: 85,
          confidenceRange: [79, 85],
          status: "Good",
          x: 18,
          y: 52,
        },
        {
          day: "T",
          dateLabel: "Tue, Nov 21",
          score: 87,
          jitterPct: 0.3,
          latencySec: 1.28,
          coherencePct: 89,
          confidenceRange: [84, 90],
          status: "Good",
          x: 68,
          y: 44,
        },
        {
          day: "W",
          dateLabel: "Wed, Nov 22",
          score: 94,
          jitterPct: 0.19,
          latencySec: 1.1,
          coherencePct: 95,
          confidenceRange: [91, 97],
          status: "Optimal",
          x: 118,
          y: 20,
        },
        {
          day: "T",
          dateLabel: "Thu, Nov 23",
          score: 91,
          jitterPct: 0.23,
          latencySec: 1.16,
          coherencePct: 92,
          confidenceRange: [88, 94],
          status: "Optimal",
          x: 168,
          y: 28,
        },
        {
          day: "F",
          dateLabel: "Fri, Nov 24",
          score: 84,
          jitterPct: 0.33,
          latencySec: 1.35,
          coherencePct: 86,
          confidenceRange: [80, 88],
          status: "Good",
          x: 218,
          y: 40,
        },
        {
          day: "S",
          dateLabel: "Sat, Nov 25",
          score: 80,
          jitterPct: 0.39,
          latencySec: 1.48,
          coherencePct: 82,
          confidenceRange: [76, 84],
          status: "Stable",
          x: 268,
          y: 46,
        },
        {
          day: "S",
          dateLabel: "Sun, Nov 26",
          score: 90,
          jitterPct: 0.26,
          latencySec: 1.22,
          coherencePct: 91,
          confidenceRange: [87, 93],
          status: "Optimal",
          x: 318,
          y: 30,
        },
      ],
      pathFront:
        "M 18 52 Q 43 44 68 44 T 118 20 T 168 28 T 218 40 T 268 46 T 318 30",
      pathBack:
        "M 18 58 Q 43 50 68 50 T 118 26 T 168 34 T 218 46 T 268 52 T 318 36",
      areaPath:
        "M 18 52 Q 43 44 68 44 T 118 20 T 168 28 T 218 40 T 268 46 T 318 30 L 318 92 L 18 92 Z",
    },
  }

  const currentCfg = DATA_BY_SEGMENT[segment] || DATA_BY_SEGMENT.overall
  const selectedDay = currentCfg.days[selectedDayIndex] || currentCfg.days[1]

  return (
    <div className="rounded-[28px] bg-white border border-black/[0.05] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.03)] transition-all">
      {/* ─── Card Header ─── */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span
              style={{ fontFamily }}
              className="text-[15px] font-bold text-[#1A1A1A] tracking-tight"
            >
              {currentCfg.title}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-[#1A1A1A] px-1.5 py-0.5 rounded-full">
              3D
            </span>
          </div>
          <span className="text-[11px] font-medium text-[#78716A]">
            {currentCfg.subtitle}
          </span>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 border shadow-2xs ${currentCfg.badgeColor}`}
        >
          <TrendingUp className="w-3 h-3" /> {currentCfg.badge}
        </span>
      </div>

      {/* ─── Layer Selector Pills ─── */}
      <div className="flex items-center gap-1.5 p-1 bg-black/[0.03] rounded-full mb-3 text-[11px] font-semibold">
        <button
          type="button"
          onClick={() => setActiveLayer("stability")}
          className={`flex-1 py-1 rounded-full transition-all cursor-pointer ${
            activeLayer === "stability"
              ? "bg-white text-[#1A1A1A] shadow-2xs font-bold"
              : "text-[#78716A] hover:text-[#1A1A1A]"
          }`}
        >
          Stability Curve
        </button>
        <button
          type="button"
          onClick={() => setActiveLayer("acoustic")}
          className={`flex-1 py-1 rounded-full transition-all cursor-pointer ${
            activeLayer === "acoustic"
              ? "bg-white text-[#1A1A1A] shadow-2xs font-bold"
              : "text-[#78716A] hover:text-[#1A1A1A]"
          }`}
        >
          Acoustic Jitter
        </button>
        <button
          type="button"
          onClick={() => setActiveLayer("latency")}
          className={`flex-1 py-1 rounded-full transition-all cursor-pointer ${
            activeLayer === "latency"
              ? "bg-white text-[#1A1A1A] shadow-2xs font-bold"
              : "text-[#78716A] hover:text-[#1A1A1A]"
          }`}
        >
          Response Cadence
        </button>
      </div>

      {/* ─── 3D Volumetric Extruded Spline Graph ─── */}
      <div className="relative h-[135px] w-full pt-2 select-none">
        <svg viewBox="0 0 336 105" className="w-full h-full overflow-visible">
          <defs>
            {/* 3D Depth Volume Gradient */}
            <linearGradient
              id={currentCfg.gradientId}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={currentCfg.themeColor}
                stopOpacity="0.28"
              />
              <stop
                offset="60%"
                stopColor={currentCfg.secondaryColor}
                stopOpacity="0.08"
              />
              <stop
                offset="100%"
                stopColor={currentCfg.secondaryColor}
                stopOpacity="0.0"
              />
            </linearGradient>

            {/* Extrusion Ribbon Gradient */}
            <linearGradient
              id={`${currentCfg.gradientId}-extrusion`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={currentCfg.themeColor}
                stopOpacity="0.35"
              />
              <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0.05" />
            </linearGradient>

            {/* Drop Shadow Filter */}
            <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="3"
                floodColor="#000000"
                floodOpacity="0.12"
              />
            </filter>
          </defs>

          {/* Isometric horizontal depth grid lines */}
          <line
            x1="10"
            y1="25"
            x2="326"
            y2="25"
            stroke="rgba(0,0,0,0.05)"
            strokeDasharray="3 3"
          />
          <line
            x1="10"
            y1="55"
            x2="326"
            y2="55"
            stroke="rgba(0,0,0,0.05)"
            strokeDasharray="3 3"
          />
          <line
            x1="10"
            y1="92"
            x2="326"
            y2="92"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />

          {/* 3D Extrusion Depth Floor (Volumetric Underlay) */}
          <path
            d={currentCfg.areaPath}
            fill={`url(#${currentCfg.gradientId})`}
            className="transition-all duration-300"
          />

          {/* 3D Secondary Extrusion Ribbon Layer (Simulates physical 3D thickness) */}
          <path
            d={currentCfg.pathBack}
            fill="none"
            stroke={currentCfg.secondaryColor}
            strokeWidth="3.5"
            strokeOpacity="0.4"
            strokeLinecap="round"
            className="transition-all duration-300"
          />

          {/* Vertical 3D Extrusion Connector Ribbons */}
          {currentCfg.days.map((p, idx) => (
            <line
              key={`vert-${idx}`}
              x1={p.x}
              y1={p.y}
              x2={p.x}
              y2={p.y + 6}
              stroke={currentCfg.themeColor}
              strokeWidth="2.5"
              strokeOpacity="0.45"
            />
          ))}

          {/* Primary Spline Curve with 3D Drop Shadow */}
          <path
            d={currentCfg.pathFront}
            fill="none"
            stroke={currentCfg.themeColor}
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#shadow3d)"
            className="transition-all duration-300"
          />

          {/* Interactive Day Node Pins with 3D Elevation */}
          {currentCfg.days.map((p, idx) => {
            const isSelected = selectedDayIndex === idx
            return (
              <g
                key={`pin-${idx}`}
                onClick={() => setSelectedDayIndex(idx)}
                className="cursor-pointer group"
              >
                {/* 3D Ground Shadow under Pin */}
                <ellipse
                  cx={p.x}
                  cy={p.y + 7}
                  rx={isSelected ? "5" : "3.5"}
                  ry="2"
                  fill="rgba(0,0,0,0.18)"
                />

                {/* Animated Pulsing Ring on Selected Day */}
                {isSelected && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="8.5"
                    fill={currentCfg.themeColor}
                    fillOpacity="0.22"
                    className="animate-ping"
                  />
                )}

                {/* Pin Outer Ring */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected ? "6" : "4.5"}
                  fill="#FFFFFF"
                  stroke={isSelected ? currentCfg.themeColor : "#A8A29E"}
                  strokeWidth={isSelected ? "2.5" : "1.8"}
                  className="transition-all duration-200 group-hover:scale-125"
                />

                {/* Pin Inner Core */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected ? "3" : "2"}
                  fill={isSelected ? currentCfg.themeColor : "#78716A"}
                />

                {/* Day Letter Label */}
                <text
                  x={p.x}
                  y="104"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight={isSelected ? "700" : "500"}
                  fill={isSelected ? "#1A1A1A" : "#A8A29E"}
                  className="transition-colors"
                >
                  {p.day}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* ─── Informative Clinical Floating Telemetry Card ─── */}
      <div className="mt-3 p-3.5 bg-gradient-to-br from-[#F7F5F0] to-[#EFECE6] rounded-2xl border border-black/[0.06] shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs shadow-2xs border border-black/[0.05]">
              📅
            </div>
            <div>
              <span className="text-[12px] font-bold text-[#1A1A1A] block leading-tight">
                {selectedDay.dateLabel}
              </span>
              <span className="text-[10px] text-[#78716A]">
                Clinical Screening Snapshot
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {selectedDay.status}
            </span>
          </div>
        </div>

        {/* 3 Telemetry Columns: Stability Score, Jitter, Cadence */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-black/[0.05]">
          <div className="text-left">
            <span className="text-[10px] font-semibold text-[#78716A] block">
              Biomarker Index
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-bold text-[#1A1A1A] tabular-nums font-serif">
                {selectedDay.score}%
              </span>
            </div>
            <span className="text-[9px] text-[#A8A29E]">
              CI [{selectedDay.confidenceRange[0]}–
              {selectedDay.confidenceRange[1]}%]
            </span>
          </div>

          <div className="text-left border-l border-black/[0.06] pl-2">
            <span className="text-[10px] font-semibold text-[#78716A] block">
              Acoustic Jitter
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-bold text-[#1A1A1A] tabular-nums font-serif">
                {selectedDay.jitterPct}%
              </span>
            </div>
            <span className="text-[9px] text-emerald-600 font-medium">
              &lt; 0.5% Normal
            </span>
          </div>

          <div className="text-left border-l border-black/[0.06] pl-2">
            <span className="text-[10px] font-semibold text-[#78716A] block">
              Cadence Latency
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-bold text-[#1A1A1A] tabular-nums font-serif">
                {selectedDay.latencySec}s
              </span>
            </div>
            <span className="text-[9px] text-emerald-600 font-medium">
              Steady
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
