import React, { useEffect, useRef, useState } from "react"

import {
  Bell,
  Settings,
  Sparkles,
  ChevronRight,
  Mic,
  Activity,
  Check,
  CalendarClock,
  MessageSquareQuote,
  Users,
  Flame,
  Upload,
} from "lucide-react"

import {
  computeTrend,
  listCheckIns,
  localDateKey,
  type DailyCheckIn,
  type DailyTrend,
} from "../../services/dailyCheckIn"

import { ScreeningSession } from "../../types"

import { AloisTab } from "./types"

import UploadVoiceModal from "../UploadVoiceModal"

interface AloisHomeDashboardProps {
  patientName: string

  latestSession?: ScreeningSession | null

  onStartVoiceCheck: () => void

  onStartLifeMemoryCheck?: () => void

  onOpenTrends?: () => void

  onUploadVoiceFile?: (file: File, task?: string, duration?: number) => void

  onSelectTab: (tab: AloisTab) => void

  onOpenDoctorModal?: () => void

  onOpenCognitiveModal?: () => void

  onViewReport?: () => void

  fontFamily?: string
}

/**
 * Alois Home Screen — Simple, focused UI.
 * Main: Cognitive Booster (Voice Screening).
 * Secondary: the daily check-in.
 * All extraneous sections (upcoming appointment, medications, appointments, events, news) removed.
 */

export default function AloisHomeDashboard({
  patientName,

  latestSession,

  onStartVoiceCheck,

  onStartLifeMemoryCheck,

  onOpenTrends,

  onUploadVoiceFile,

  onSelectTab,

  onViewReport,

  fontFamily = "'Outfit', sans-serif",
}: AloisHomeDashboardProps) {
  const [trend, setTrend] = useState<DailyTrend | null>(null)

  const [today, setToday] = useState<DailyCheckIn | null>(null)

  const [showUploadModal, setShowUploadModal] = useState(false)

  const [droppedFile, setDroppedFile] = useState<File | null>(null)

  const [isDraggingOverCard, setIsDraggingOverCard] = useState(false)

  // Loaded here rather than passed down: the card is the only consumer, and it

  // has to re-read after a check-in without the whole shell re-rendering.

  useEffect(() => {
    let cancelled = false

    const todayKey = localDateKey()

    listCheckIns()

      .then((all) => {
        if (cancelled) return

        setTrend(computeTrend(all, todayKey))

        setToday(all.find((c) => c.id === todayKey) ?? null)
      })

      .catch(() => undefined)

    return () => {
      cancelled = true
    }
  }, [])

  const doneToday = today != null && today.recall.status !== "skipped"

  const isNormal = latestSession?.mlResult?.screeningRisk === "low"

  const confidencePct = latestSession?.mlResult
    ? Math.round(latestSession.mlResult.confidenceScore * 100)
    : null

  return (
    <div className="flex-1 overflow-y-auto bg-[#F7F5F0] text-[#1A1A1A] select-none pb-8">
      {/* ─── 1. Home Nav Bar (Lisso Editorial Style) ───────────── */}
      <header className="h-[76px] px-4 flex items-center justify-between bg-[#F7F5F0]/90 border-b border-black/[0.05] sticky top-0 z-20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {/* User circular avatar with initial */}
          <div className="w-10 h-10 rounded-full bg-[#F5CE57] text-[#1A1A1A] font-bold text-base flex items-center justify-center shadow-2xs border border-black/[0.06] shrink-0">
            {(patientName || "J").charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span
                style={{ fontFamily }}
                className="text-[12px] font-medium text-[#78716A] leading-none"
              >
                Hi,
              </span>
              <span className="text-[10px] font-bold text-[#78716A] bg-black/[0.05] px-2 py-0.5 rounded-full">
                Caretaker
              </span>
            </div>
            <h1
              style={{ fontFamily }}
              className="text-[20px] font-bold text-[#1A1A1A] tracking-tight leading-tight mt-0.5"
            >
              {patientName || "Jerrold Harrington"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            type="button"
            onClick={() => onSelectTab("profile")}
            aria-label="Notifications"
            className="w-9 h-9 rounded-full bg-white border border-black/[0.06] text-[#544F49] flex items-center justify-center hover:text-[#1A1A1A] hover:border-black/20 shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Settings / Profile */}
          <button
            type="button"
            onClick={() => onSelectTab("profile")}
            aria-label="Settings"
            className="w-9 h-9 rounded-full bg-white border border-black/[0.06] text-[#544F49] flex items-center justify-center hover:text-[#1A1A1A] hover:border-black/20 shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="px-4 pt-5 space-y-5 max-w-[375px] mx-auto">
        {/* ─── Hero Metric Display (Lisso "85%" Design Element) ──────────── */}
        <section className="bg-white rounded-[28px] border border-black/[0.04] p-5 shadow-[0_6px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716A] block">
                Primary Biomarker Index
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-5xl font-light text-[#1A1A1A] tracking-tight">
                  {confidencePct !== null ? `${confidencePct}%` : "88%"}
                </span>
              </div>
              <p className="text-[11px] font-medium text-[#78716A] mt-0.5">
                Latest Screening Score
              </p>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs ${
                  isNormal
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                    : "bg-amber-50 text-amber-800 border border-amber-200/60"
                }`}
              >
                <Check className="w-3 h-3" />
                {isNormal ? "Low Risk" : "Elevated Risk"}
              </span>
              <span className="text-[10px] text-[#8C867E]">
                Model evaluated
              </span>
            </div>
          </div>
        </section>

        {/* ─── 2. MAIN: Screening Cards ────────────────────── */}
        <section className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h2
              style={{ fontFamily }}
              className="text-[11px] font-bold text-[#78716A] uppercase tracking-wider"
            >
              Primary Screening
            </h2>
            <span className="text-[11px] font-medium text-[#8C867E]">
              Zero-bias voice
            </span>
          </div>

          {/* Family-Verified Life Memory Check (Zero Literacy Bias) */}
          <div
            onClick={onStartLifeMemoryCheck || onStartVoiceCheck}
            className="w-full rounded-[28px] bg-white border border-black/[0.05] text-[#1A1A1A] p-5 relative overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.03)] cursor-pointer active:scale-[0.99] transition-all group hover:border-black/20"
          >
            <div className="relative z-10 flex items-start gap-3.5">
              <div className="w-[50px] h-[50px] rounded-2xl bg-[#F0EDF7] text-[#583D7A] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <span className="text-2xl">📖</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#583D7A] bg-[#F0EDF7] px-2.5 py-0.5 rounded-full border border-[#DED6EB]">
                  Autobiographical Lived Memory
                </span>
                <h3
                  style={{ fontFamily }}
                  className="text-[17px] font-bold text-[#1A1A1A] tracking-tight leading-tight mt-1.5"
                >
                  Family Life Memory Check
                </h3>
                <p className="text-[12px] text-[#78716A] mt-1 leading-snug">
                  Zero-literacy screening based on family-verified life facts
                  and daily habits.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-black/[0.05] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenTrends?.()
                }}
                className="px-3 py-1.5 rounded-full bg-[#F3EFE8] hover:bg-[#EAE4D9] active:scale-95 text-[#2C2925] text-[11px] font-semibold flex items-center gap-1 border border-black/[0.04] transition-all cursor-pointer"
              >
                <span>📈 View Trends</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onStartLifeMemoryCheck?.()
                }}
                className="px-4 py-1.5 rounded-full bg-[#1A1A1A] hover:bg-black text-white text-[12px] font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <span>Setup & Start</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Neurological Biomarker Check Card */}
          <div
            onClick={onStartVoiceCheck}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDraggingOverCard(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDraggingOverCard(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDraggingOverCard(false)
              const file = e.dataTransfer.files?.[0]
              if (file) {
                setDroppedFile(file)
                setShowUploadModal(true)
              }
            }}
            className={`w-full rounded-[28px] bg-white border text-[#1A1A1A] p-5 relative overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.03)] cursor-pointer active:scale-[0.99] transition-all group ${
              isDraggingOverCard
                ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20"
                : "border-black/[0.05] hover:border-black/20"
            }`}
          >
            {/* Ambient subtle acoustic waveform decoration */}
            <div className="absolute right-0 top-0 bottom-0 w-36 opacity-[0.06] pointer-events-none">
              <svg
                viewBox="0 0 200 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M0 60 C40 20, 80 100, 120 60 C160 20, 200 100, 240 60"
                  stroke="#1A1A1A"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </div>

            <div className="relative z-10 flex items-start gap-3.5">
              <div className="w-[50px] h-[50px] rounded-2xl bg-[#EBF3FE] text-[#1D58A7] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-[#1D58A7]" />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D58A7] bg-[#EBF3FE] px-2.5 py-0.5 rounded-full border border-[#D0E2FB]">
                  Acoustic & Speech Analysis
                </span>
                <h3
                  style={{ fontFamily }}
                  className="text-[17px] font-bold text-[#1A1A1A] tracking-tight leading-tight mt-1.5"
                >
                  Neurological Biomarker Check
                </h3>
                <p className="text-[12px] text-[#78716A] mt-1 leading-snug">
                  Clinical screening for neurological biomarkers, motor speech
                  stability, and seizure risk patterns.
                </p>
              </div>
            </div>

            {/* Action CTA Row */}
            <div className="mt-4 pt-3.5 border-t border-black/[0.05] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowUploadModal(true)
                }}
                className="px-3 py-1.5 rounded-full bg-[#F3EFE8] hover:bg-[#EAE4D9] active:scale-95 text-[#2C2925] text-[11px] font-semibold flex items-center gap-1.5 border border-black/[0.04] transition-all cursor-pointer"
                title="Upload patient voice recording (.wav, .mp3, .m4a)"
              >
                <Upload className="w-3.5 h-3.5 text-[#544F49]" />
                <span>Upload Voice</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onStartVoiceCheck()
                }}
                className="px-4 py-1.5 rounded-full bg-[#1A1A1A] hover:bg-black text-white text-[12px] font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Start Check</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick status banner if previous session exists (Lisso Divided Row) */}
          {latestSession && (
            <div
              onClick={onViewReport}
              className="w-full rounded-2xl bg-white border border-black/[0.05] p-3.5 flex items-center justify-between shadow-2xs cursor-pointer hover:border-black/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F3EFE8] text-[#1A1A1A] flex items-center justify-center">
                  <Activity className="w-4 h-4 text-[#1A1A1A]" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-[#1A1A1A]">
                    Recent Neurological Summary
                  </div>
                  <div className="text-[11px] text-[#78716A]">
                    {isNormal
                      ? "Stable neurological pattern"
                      : "Elevated biomarker indicator"}{" "}
                    • Tap to view report
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8C867E]" />
            </div>
          )}
        </section>

        {/* ─── 3. SECONDARY: Daily Check-in (Lisso Mustard Highlight Card) ── */}
        <section className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <h2
              style={{ fontFamily }}
              className="text-[11px] font-bold text-[#78716A] uppercase tracking-wider"
            >
              Every day
            </h2>

            {trend && trend.streak > 0 && (
              <span className="text-[11px] font-bold text-[#1A1A1A] bg-[#F5CE57]/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#F5CE57]">
                <Flame className="w-3.5 h-3.5 text-orange-600" />
                {trend.streak} day{trend.streak === 1 ? "" : "s"} streak
              </span>
            )}
          </div>

          {/* Mustard-Yellow Highlight Card */}
          <div
            onClick={() => onSelectTab("dailyCheckIn")}
            className="w-full rounded-[28px] bg-[#F5CE57] text-[#1A1A1A] p-5 relative overflow-hidden shadow-[0_8px_24px_rgba(245,206,87,0.22)] cursor-pointer hover:bg-[#EFC54E] active:scale-[0.99] transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-[48px] h-[48px] rounded-2xl flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform ${
                  doneToday
                    ? "bg-emerald-600 text-white"
                    : "bg-[#1A1A1A] text-white"
                }`}
              >
                {doneToday ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <MessageSquareQuote className="w-6 h-6 text-white" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1A1A1A]/70">
                  Daily Habit Check
                </span>
                <h3
                  style={{ fontFamily }}
                  className="text-[17px] font-bold text-[#1A1A1A] tracking-tight leading-tight"
                >
                  Daily check-in
                </h3>

                <p className="text-[12px] text-[#423C35] mt-0.5 font-medium leading-snug">
                  {doneToday
                    ? "Done for today — thank you"
                    : "About a minute. Tell us about your day."}
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* What the check-in asks, or what it found once it is done. */}
          {doneToday ? (
            <div className="rounded-[22px] bg-white border border-black/[0.05] px-4 py-3.5 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] font-semibold text-[#1A1A1A]">
                  {trend?.status === "building"
                    ? `Building your baseline · ${trend.needed} more day${
                        trend.needed === 1 ? "" : "s"
                      }`
                    : trend?.status === "typical"
                      ? "Usual amount of detail for you"
                      : trend?.status === "below"
                        ? "Less detail than your usual"
                        : "Recorded"}
                </span>

                {trend && trend.status !== "building" && (
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      trend.status === "typical"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {trend.recentMedian} vs {trend.baselineMedian}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-[#78716A] leading-snug">
                Compared with your own earlier check-ins, never with other
                people.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {[
                {
                  icon: CalendarClock,
                  title: "Two quick questions",
                  sub: "Day and month",
                },
                {
                  icon: Mic,
                  title: "Tell me about your day",
                  sub: "About 40 seconds",
                },
                {
                  icon: Users,
                  title: "One question for family",
                  sub: "Optional",
                },
              ].map((row) => (
                <div
                  key={row.title}
                  onClick={() => onSelectTab("dailyCheckIn")}
                  className="w-full rounded-2xl bg-white border border-black/[0.05] px-3.5 py-3 flex items-center justify-between shadow-2xs cursor-pointer hover:border-black/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#F3EFE8] text-[#1A1A1A] flex items-center justify-center shrink-0">
                      <row.icon className="w-3.5 h-3.5" />
                    </span>

                    <span className="text-[12px] font-semibold text-[#1A1A1A]">
                      {row.title}
                    </span>
                  </div>

                  <span className="text-[11px] text-[#78716A] shrink-0 font-medium">
                    {row.sub}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <UploadVoiceModal
        isOpen={showUploadModal}
        onClose={() => {
          setShowUploadModal(false)

          setDroppedFile(null)
        }}
        initialFile={droppedFile}
        patientName={patientName}
        fontFamily={fontFamily}
        onStartAnalysis={(file, task, duration) => {
          if (onUploadVoiceFile) {
            onUploadVoiceFile(file, task, duration)
          }
        }}
      />
    </div>
  )
}
