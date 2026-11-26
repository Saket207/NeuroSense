import React, { useState } from "react"
import {
  ChevronLeft,
  Bell,
  Settings,
  FileText,
  ChevronRight,
  Activity,
  Award,
  Sparkles,
  TrendingUp,
} from "lucide-react"

import TiltCard from "../../motion/TiltCard"
import NeuralStabilityModel from "../../scene3d/NeuralStabilityModel"
import Stability3DGraph from "./Stability3DGraph"

interface AloisProgressProps {
  onBack: () => void
  onViewReport: () => void
  onOpenSettings: () => void
  fontFamily?: string
}

/**
 * Alois Progress & Stability Screen — Redesigned in the Lisso editorial design language.
 * Featuring:
 * - Interactive 3D Synaptic Stability Model (WebGL Three.js)
 * - 3D Volumetric Extruded Graph with clinical day telemetry
 * - 3D Tilt interactive metric cards with progress bars
 * - Warm #F7F5F0 backdrop and clean typography
 */
export default function AloisProgress({
  onBack,
  onViewReport,
  onOpenSettings,
  fontFamily = "'Outfit', sans-serif",
}: AloisProgressProps) {
  const [activeSegment, setActiveSegment] =
    useState<"cognitive" | "overall" | "health">("overall")

  // Segment-specific 2x2 cards with clinical biomarkers
  const SEGMENT_CARDS = {
    cognitive: [
      {
        label: "Episodic Recall",
        value: "88%",
        unit: "retention",
        indicatorColor: "bg-[#6366F1]",
        barColor: "bg-[#6366F1]",
        barWidth: "88%",
        trend: "+5.1%",
        isSparkle: false,
      },
      {
        label: "Semantic Fluency",
        value: "94%",
        unit: "word finding",
        indicatorColor: "bg-[#0EA5E9]",
        barColor: "bg-[#0EA5E9]",
        barWidth: "94%",
        trend: "+4.3%",
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
        trend: "100%",
        isSparkle: false,
      },
      {
        label: "Cadence Latency",
        value: "1.2s",
        unit: "normal delay",
        indicatorColor: "bg-[#F59E0B]",
        barColor: "bg-[#F59E0B]",
        barWidth: "82%",
        trend: "Steady",
        isSparkle: false,
      },
    ],
    overall: [
      {
        label: "Daily Cares",
        value: "78%",
        unit: "completed",
        indicatorColor: "bg-[#42BE65]",
        barColor: "bg-[#42BE65]",
        barWidth: "78%",
        trend: "+3.2%",
        isSparkle: false,
      },
      {
        label: "Voice Stability",
        value: "92%",
        unit: "Stable",
        indicatorColor: "bg-[#0F62FE]",
        barColor: "bg-[#0F62FE]",
        barWidth: "92%",
        trend: "+4.8%",
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
        trend: "On Track",
        isSparkle: false,
      },
      {
        label: "Medication Adherence",
        value: "85%",
        unit: "adherence",
        indicatorColor: "bg-[#FA4D56]",
        barColor: "bg-[#FA4D56]",
        barWidth: "85%",
        trend: "+2.0%",
        isSparkle: false,
      },
    ],
    health: [
      {
        label: "Sleep Rhythm",
        value: "7.6 hrs",
        unit: "optimal rest",
        indicatorColor: "bg-[#8B5CF6]",
        barColor: "bg-[#8B5CF6]",
        barWidth: "90%",
        trend: "+0.8h",
        isSparkle: false,
      },
      {
        label: "Motor Stability",
        value: "96%",
        unit: "tremor-free",
        indicatorColor: "bg-[#059669]",
        barColor: "bg-[#059669]",
        barWidth: "96%",
        trend: "+1.5%",
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
        trend: "Optimal",
        isSparkle: false,
      },
      {
        label: "Medication Log",
        value: "3 of 3",
        unit: "doses logged",
        indicatorColor: "bg-[#E11D48]",
        barColor: "bg-[#E11D48]",
        barWidth: "100%",
        trend: "Done",
        isSparkle: false,
      },
    ],
  }

  const currentCards = SEGMENT_CARDS[activeSegment]

  return (
    <div
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehaviorY: "contain",
      }}
      className="flex-1 overflow-y-auto bg-[#F7F5F0] text-[#1A1A1A] select-none pb-8 relative"
    >
      {/* ─── 1. Header (Lisso Editorial Style) ─── */}
      <header className="h-[76px] px-4 @[520px]:px-8 flex items-center justify-between bg-[#F7F5F0]/95 border-b border-black/[0.05] sticky top-0 z-20">
        <div className="w-full max-w-none @[520px]:max-w-3xl @[900px]:max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back"
              className="w-9 h-9 rounded-full bg-white border border-black/[0.06] text-[#544F49] flex items-center justify-center hover:text-[#1A1A1A] hover:border-black/20 shadow-2xs active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1
              style={{ fontFamily }}
              className="text-[20px] font-bold text-[#1A1A1A] tracking-tight leading-tight"
            >
              Progress & Stability
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Notifications"
              className="w-9 h-9 rounded-full bg-white border border-black/[0.06] text-[#544F49] flex items-center justify-center hover:text-[#1A1A1A] hover:border-black/20 shadow-2xs active:scale-95 transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onOpenSettings}
              aria-label="Settings"
              className="w-9 h-9 rounded-full bg-white border border-black/[0.06] text-[#544F49] flex items-center justify-center hover:text-[#1A1A1A] hover:border-black/20 shadow-2xs active:scale-95 transition-all cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 @[520px]:px-8 @[900px]:px-12 pt-4 space-y-5 w-full max-w-none @[520px]:max-w-3xl @[900px]:max-w-5xl mx-auto">
        {/* ─── 2. Segmented Pill Switcher (Cognitive | Overall | Health) ─── */}
        <div className="flex rounded-full bg-black/[0.04] p-1 border border-black/[0.03]">
          <button
            type="button"
            onClick={() => setActiveSegment("cognitive")}
            className={`flex-1 py-1.5 text-[12px] font-bold rounded-full transition-all cursor-pointer ${
              activeSegment === "cognitive"
                ? "bg-[#1A1A1A] text-white shadow-2xs"
                : "text-[#78716A] hover:text-[#1A1A1A]"
            }`}
          >
            Cognitive
          </button>
          <button
            type="button"
            onClick={() => setActiveSegment("overall")}
            className={`flex-1 py-1.5 text-[12px] font-bold rounded-full transition-all cursor-pointer ${
              activeSegment === "overall"
                ? "bg-[#1A1A1A] text-white shadow-2xs"
                : "text-[#78716A] hover:text-[#1A1A1A]"
            }`}
          >
            Overall
          </button>
          <button
            type="button"
            onClick={() => setActiveSegment("health")}
            className={`flex-1 py-1.5 text-[12px] font-bold rounded-full transition-all cursor-pointer ${
              activeSegment === "health"
                ? "bg-[#1A1A1A] text-white shadow-2xs"
                : "text-[#78716A] hover:text-[#1A1A1A]"
            }`}
          >
            Health
          </button>
        </div>

        {/* ─── 3. Interactive 3D Neural Stability Synaptic Model ─── */}
        <NeuralStabilityModel
          score={
            activeSegment === "cognitive"
              ? 96.2
              : activeSegment === "overall"
                ? 94.8
                : 95.1
          }
          segment={activeSegment}
        />

        {/* ─── 4. 3D Informative Volumetric Spline Graph ─── */}
        <Stability3DGraph segment={activeSegment} fontFamily={fontFamily} />

        {/* ─── 5. 2x2 Metric Cards (with 3D Tilt interaction) ─── */}
        <div className="grid grid-cols-2 @[520px]:grid-cols-4 gap-3">
          {currentCards.map((card) => (
            <TiltCard
              key={card.label}
              maxTilt={4}
              scale={1.015}
              className="rounded-[24px] bg-white border border-black/[0.05] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all cursor-default"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold text-[#78716A]">
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
              <div className="flex items-baseline justify-between gap-1">
                <div className="flex items-baseline gap-1">
                  <span
                    style={{ fontFamily }}
                    className="text-[24px] font-bold text-[#1A1A1A] tracking-tight font-serif"
                  >
                    {card.value}
                  </span>
                  <span className="text-[10px] text-[#78716A] font-medium">
                    {card.unit}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  {card.trend}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-black/[0.04] mt-2.5 overflow-hidden">
                <div
                  className={`h-full ${card.barColor} rounded-full transition-all duration-300`}
                  style={{ width: card.barWidth }}
                />
              </div>
            </TiltCard>
          ))}
        </div>

        {/* ─── 6. List Action Rows (ABHA Clinical Report & Insights) ─── */}
        <div className="space-y-2.5 pt-1">
          {/* Monthly Report Button -> Triggers ABHA Clinical PDF */}
          <button
            type="button"
            onClick={onViewReport}
            className="w-full p-4 rounded-[24px] bg-white border border-black/[0.05] hover:border-black/15 flex items-center justify-between transition-all shadow-[0_4px_16px_rgba(0,0,0,0.02)] group cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span
                    style={{ fontFamily }}
                    className="text-[14px] font-bold text-[#1A1A1A] block group-hover:text-blue-600 transition-colors"
                  >
                    Monthly Clinical Report
                  </span>
                  <span className="text-[9px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded-full border border-blue-200">
                    ABHA
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#78716A]">
                  Download signed EHR summary PDF
                </span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-black/[0.03] flex items-center justify-center text-[#78716A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>

          {/* Communication and Support */}
          <button
            type="button"
            className="w-full p-4 rounded-[24px] bg-white border border-black/[0.05] hover:border-black/15 flex items-center justify-between transition-all shadow-[0_4px_16px_rgba(0,0,0,0.02)] group cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs">
                <Activity className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span
                  style={{ fontFamily }}
                  className="text-[14px] font-bold text-[#1A1A1A] block group-hover:text-emerald-600 transition-colors"
                >
                  Clinical Communication & Support
                </span>
                <span className="text-[11px] font-medium text-[#78716A]">
                  Message assigned care specialist
                </span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-black/[0.03] flex items-center justify-center text-[#78716A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>

          {/* Tips and Recommendations */}
          <button
            type="button"
            className="w-full p-4 rounded-[24px] bg-white border border-black/[0.05] hover:border-black/15 flex items-center justify-between transition-all shadow-[0_4px_16px_rgba(0,0,0,0.02)] group cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shadow-2xs">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span
                  style={{ fontFamily }}
                  className="text-[14px] font-bold text-[#1A1A1A] block group-hover:text-purple-600 transition-colors"
                >
                  Tips & Cognitive Exercises
                </span>
                <span className="text-[11px] font-medium text-[#78716A]">
                  Personalized daily guidance
                </span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-black/[0.03] flex items-center justify-center text-[#78716A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
