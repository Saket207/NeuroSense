import React, { useState } from "react"

import {
  ChevronLeft,
  Bell,
  Settings,
  FileText,
  ChevronRight,
  TrendingUp,
  Activity,
  Award,
  Sparkles,
} from "lucide-react"

interface AloisProgressProps {
  onBack: () => void

  onViewReport: () => void

  onOpenSettings: () => void

  fontFamily?: string
}

/**
 * Alois Progress Screen — matching Figma node 512:19216 & app/(main)/progress.tsx.
 * Displays activity curve with Tuesday peak, 2x2 metrics grid, and Monthly Report ABHA export.
 */

export default function AloisProgress({
  onBack,

  onViewReport,

  onOpenSettings,

  fontFamily = "'Outfit', sans-serif",
}: AloisProgressProps) {
  const [activeSegment, setActiveSegment] =
    useState<"cognitive" | "overall" | "health">("overall")

  // Segment-specific trend data, SVG curves, and clinical biomarker cards
  const SEGMENT_CONFIG = {
    cognitive: {
      title: "Cognitive & Memory Trajectory",
      subtitle: "Episodic Recall & Semantic Fluency",
      trendBadge: "+6.2%",
      badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
      strokeColor: "#6366F1",
      gradStart: "#6366F1",
      gradientId: "chartGradCognitive",
      points: [
        { x: 10, y: 60, day: "M" },
        { x: 55, y: 45, day: "T" },
        { x: 105, y: 38, day: "W" },
        { x: 155, y: 22, day: "T" },
        { x: 205, y: 30, day: "F" },
        { x: 255, y: 14, day: "S" }, // Peak Saturday 96%
        { x: 305, y: 20, day: "S" },
      ],
      pathD:
        "M 10 60 Q 35 45 55 45 T 105 38 T 155 22 T 205 30 T 255 14 T 305 20",
      peak: { x: 255, y: 14, text: "96%" },
      cards: [
        {
          label: "Episodic Recall",
          value: "88%",
          unit: "retention",
          indicatorColor: "bg-[#6366F1]",
          barColor: "bg-[#6366F1]",
          barWidth: "88%",
          isSparkle: false,
        },
        {
          label: "Semantic Fluency",
          value: "94%",
          unit: "word finding",
          indicatorColor: "bg-[#0EA5E9]",
          barColor: "bg-[#0EA5E9]",
          barWidth: "94%",
          isSparkle: true,
          sparkleColor: "text-[#6366F1]",
        },
        {
          label: "Memory Sessions",
          value: "4 of 4",
          unit: "completed",
          indicatorColor: "bg-[#10B981]",
          barColor: "bg-[#10B981]",
          barWidth: "100%",
          isSparkle: false,
        },
        {
          label: "Cadence Latency",
          value: "1.2s",
          unit: "normal delay",
          indicatorColor: "bg-[#F59E0B]",
          barColor: "bg-[#F59E0B]",
          barWidth: "82%",
          isSparkle: false,
        },
      ],
    },
    overall: {
      title: "Weekly Stability Trend",
      subtitle: "Acoustic Fluency & Cognitive Cadence",
      trendBadge: "+4.8%",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      strokeColor: "#0F62FE",
      gradStart: "#0F62FE",
      gradientId: "chartGradOverall",
      points: [
        { x: 10, y: 55, day: "M" },
        { x: 55, y: 15, day: "T" }, // Tuesday Peak 95%
        { x: 105, y: 48, day: "W" },
        { x: 155, y: 35, day: "T" },
        { x: 205, y: 62, day: "F" },
        { x: 255, y: 28, day: "S" },
        { x: 305, y: 40, day: "S" },
      ],
      pathD:
        "M 10 55 Q 35 15 55 15 T 105 48 T 155 35 T 205 62 T 255 28 T 305 40",
      peak: { x: 55, y: 15, text: "95%" },
      cards: [
        {
          label: "Daily Cares",
          value: "78%",
          unit: "completed",
          indicatorColor: "bg-[#42BE65]",
          barColor: "bg-[#42BE65]",
          barWidth: "78%",
          isSparkle: false,
        },
        {
          label: "Voice Stability",
          value: "92%",
          unit: "Stable",
          indicatorColor: "bg-[#0F62FE]",
          barColor: "bg-[#0F62FE]",
          barWidth: "92%",
          isSparkle: true,
          sparkleColor: "text-[#0F62FE]",
        },
        {
          label: "Appointments",
          value: "100%",
          unit: "on schedule",
          indicatorColor: "bg-[#F1C21B]",
          barColor: "bg-[#F1C21B]",
          barWidth: "100%",
          isSparkle: false,
        },
        {
          label: "Medication Adherence",
          value: "85%",
          unit: "adherence",
          indicatorColor: "bg-[#FA4D56]",
          barColor: "bg-[#FA4D56]",
          barWidth: "85%",
          isSparkle: false,
        },
      ],
    },
    health: {
      title: "Neurological & Physical Vitals",
      subtitle: "Motor Tremor, Sleep Rhythm & Hydration",
      trendBadge: "+3.1%",
      badgeClass: "bg-teal-50 text-teal-700 border-teal-200",
      strokeColor: "#059669",
      gradStart: "#059669",
      gradientId: "chartGradHealth",
      points: [
        { x: 10, y: 50, day: "M" },
        { x: 55, y: 42, day: "T" },
        { x: 105, y: 18, day: "W" }, // Wednesday Peak 94%
        { x: 155, y: 24, day: "T" },
        { x: 205, y: 35, day: "F" },
        { x: 255, y: 40, day: "S" },
        { x: 305, y: 28, day: "S" },
      ],
      pathD:
        "M 10 50 Q 35 42 55 42 T 105 18 T 155 24 T 205 35 T 255 40 T 305 28",
      peak: { x: 105, y: 18, text: "94%" },
      cards: [
        {
          label: "Sleep Rhythm",
          value: "7.6 hrs",
          unit: "optimal rest",
          indicatorColor: "bg-[#8B5CF6]",
          barColor: "bg-[#8B5CF6]",
          barWidth: "90%",
          isSparkle: false,
        },
        {
          label: "Motor Stability",
          value: "96%",
          unit: "tremor-free",
          indicatorColor: "bg-[#059669]",
          barColor: "bg-[#059669]",
          barWidth: "96%",
          isSparkle: true,
          sparkleColor: "text-[#059669]",
        },
        {
          label: "Daily Hydration",
          value: "2.1 L",
          unit: "goal met",
          indicatorColor: "bg-[#06B6D4]",
          barColor: "bg-[#06B6D4]",
          barWidth: "85%",
          isSparkle: false,
        },
        {
          label: "Medication Log",
          value: "3 of 3",
          unit: "doses logged",
          indicatorColor: "bg-[#E11D48]",
          barColor: "bg-[#E11D48]",
          barWidth: "100%",
          isSparkle: false,
        },
      ],
    },
  }

  const currentSegment = SEGMENT_CONFIG[activeSegment]
  const areaD = `${currentSegment.pathD} L 305 85 L 10 85 Z`

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F4F4] text-[#161616] select-none">
      {/* ─── Nav Bar ─────────────────────────────────────────────────── */}
      <header className="h-[72px] px-4 flex items-center justify-between bg-[#F4F4F4] border-b border-[#E0E0E0] sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="w-9 h-9 rounded-full bg-white border border-[#E0E0E0] text-[#525252] flex items-center justify-center hover:text-[#161616] active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1
            style={{ fontFamily }}
            className="text-[20px] font-bold text-[#161616] tracking-tight"
          >
            Progress & Stability
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            className="w-9 h-9 rounded-full bg-white border border-[#E0E0E0] text-[#525252] flex items-center justify-center hover:text-[#161616] active:scale-95 transition-all"
          >
            <Bell className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Settings"
            className="w-9 h-9 rounded-full bg-white border border-[#E0E0E0] text-[#525252] flex items-center justify-center hover:text-[#161616] active:scale-95 transition-all"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4 max-w-[375px] mx-auto">
        {/* ─── Segmented Control: Cognitive | Overall | Health ─────────── */}
        <div className="flex rounded-xl bg-slate-200/70 p-1">
          <button
            type="button"
            onClick={() => setActiveSegment("cognitive")}
            className={`flex-1 py-1.5 text-[12px] font-semibold rounded-lg transition-all ${
              activeSegment === "cognitive"
                ? "bg-white text-[#161616] shadow-xs"
                : "text-[#525252] hover:text-[#161616]"
            }`}
          >
            Cognitive
          </button>
          <button
            type="button"
            onClick={() => setActiveSegment("overall")}
            className={`flex-1 py-1.5 text-[12px] font-semibold rounded-lg transition-all ${
              activeSegment === "overall"
                ? "bg-white text-[#161616] shadow-xs"
                : "text-[#525252] hover:text-[#161616]"
            }`}
          >
            Overall
          </button>
          <button
            type="button"
            onClick={() => setActiveSegment("health")}
            className={`flex-1 py-1.5 text-[12px] font-semibold rounded-lg transition-all ${
              activeSegment === "health"
                ? "bg-white text-[#161616] shadow-xs"
                : "text-[#525252] hover:text-[#161616]"
            }`}
          >
            Health
          </button>
        </div>

        {/* ─── Activity Line Chart (Dynamically adapts per Cognitive / Overall / Health) ──── */}
        <div className="rounded-2xl bg-white border border-[#E0E0E0] p-4 shadow-2xs transition-all">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span
                style={{ fontFamily }}
                className="text-[14px] font-bold text-[#161616] block"
              >
                {currentSegment.title}
              </span>
              <span className="text-[11px] text-[#525252]">
                {currentSegment.subtitle}
              </span>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 border ${currentSegment.badgeClass}`}
            >
              <TrendingUp className="w-3 h-3" /> {currentSegment.trendBadge}
            </span>
          </div>

          {/* SVG Smooth Curve Graph */}
          <div className="relative h-[110px] w-full mt-2">
            <svg
              viewBox="0 0 315 90"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient
                  id={currentSegment.gradientId}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor={currentSegment.gradStart}
                    stopOpacity="0.25"
                  />
                  <stop
                    offset="100%"
                    stopColor={currentSegment.gradStart}
                    stopOpacity="0.0"
                  />
                </linearGradient>
              </defs>

              {/* Grid guide lines */}
              <line
                x1="0"
                y1="25"
                x2="315"
                y2="25"
                stroke="#E0E0E0"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="55"
                x2="315"
                y2="55"
                stroke="#E0E0E0"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="85"
                x2="315"
                y2="85"
                stroke="#E0E0E0"
                strokeWidth="1"
              />

              {/* Shaded area */}
              <path
                d={areaD}
                fill={`url(#${currentSegment.gradientId})`}
                className="transition-all duration-300"
              />

              {/* Spline curve */}
              <path
                d={currentSegment.pathD}
                fill="none"
                stroke={currentSegment.strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-300"
              />

              {/* Peak Marker */}
              <circle
                cx={currentSegment.peak.x}
                cy={currentSegment.peak.y}
                r="5"
                fill={currentSegment.strokeColor}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <text
                x={currentSegment.peak.x}
                y={currentSegment.peak.y - 7}
                textAnchor="middle"
                fontSize="9"
                fontWeight="bold"
                fill={currentSegment.strokeColor}
              >
                {currentSegment.peak.text}
              </text>

              {/* Day Labels */}
              {currentSegment.points.map((p) => (
                <text
                  key={p.day + p.x}
                  x={p.x}
                  y="102"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6F6F6F"
                  fontWeight="500"
                >
                  {p.day}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* ─── 2x2 Metric Grid (Tailored to active segment) ── */}
        <div className="grid grid-cols-2 gap-3">
          {currentSegment.cards.map((card) => (
            <div
              key={card.label}
              className="rounded-xl bg-white border border-[#E0E0E0] p-3.5 shadow-2xs transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold text-[#525252]">
                  {card.label}
                </span>
                {card.isSparkle ? (
                  <Sparkles
                    className={`w-3.5 h-3.5 ${card.sparkleColor || "text-[#0F62FE]"}`}
                  />
                ) : (
                  <span
                    className={`w-2 h-2 rounded-full ${card.indicatorColor}`}
                  />
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  style={{ fontFamily }}
                  className="text-[22px] font-bold text-[#161616]"
                >
                  {card.value}
                </span>
                <span className="text-[10px] text-[#525252]">{card.unit}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 mt-2 overflow-hidden">
                <div
                  className={`h-full ${card.barColor} rounded-full transition-all duration-300`}
                  style={{ width: card.barWidth }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ─── List Rows (Figma Monthly Report, Support, Tips) ────────── */}
        <div className="space-y-2 pt-1">
          {/* Monthly Report Button -> Triggers ABHA Clinical PDF */}
          <button
            type="button"
            onClick={onViewReport}
            className="w-full p-3.5 rounded-xl bg-white border border-[#E0E0E0] hover:bg-slate-50 flex items-center justify-between transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span
                  style={{ fontFamily }}
                  className="text-[13px] font-semibold text-[#161616] block group-hover:text-blue-600 transition-colors"
                >
                  Monthly Clinical Report (ABDM)
                </span>
                <span className="text-[11px] text-[#6F6F6F]">
                  Download signed EHR summary PDF
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#525252] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Communication and Support */}
          <button
            type="button"
            className="w-full p-3.5 rounded-xl bg-white border border-[#E0E0E0] hover:bg-slate-50 flex items-center justify-between transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <span
                style={{ fontFamily }}
                className="text-[13px] font-semibold text-[#161616] group-hover:text-emerald-600 transition-colors"
              >
                Communication and Support
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#525252] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Tips and Recommendations */}
          <button
            type="button"
            className="w-full p-3.5 rounded-xl bg-white border border-[#E0E0E0] hover:bg-slate-50 flex items-center justify-between transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <span
                style={{ fontFamily }}
                className="text-[13px] font-semibold text-[#161616] group-hover:text-purple-600 transition-colors"
              >
                Tips and Recommendations
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#525252] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}
