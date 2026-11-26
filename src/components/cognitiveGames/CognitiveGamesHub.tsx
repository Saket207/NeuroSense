import React, { useState, useEffect } from "react"
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
  Award,
  Brain,
  Zap,
  Flame,
  Trophy,
  Play,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Star,
  Clock,
  Layers,
} from "lucide-react"

import { CognitiveGameId, COGNITIVE_GAMES_META, GameProgress } from "./types"
import { getAllGamesProgress, formatGameTime } from "./storage"
import TiltCard from "../../motion/TiltCard"

import LogicPuzzleGame from "./LogicPuzzleGame"
import MemoryTreasureGame from "./MemoryTreasureGame"
import SelectiveAttentionGame from "./SelectiveAttentionGame"
import SpeedVisualisationGame from "./SpeedVisualisationGame"

interface CognitiveGamesHubProps {
  onBack: () => void
  initialGame?: CognitiveGameId | null
  fontFamily?: string
}

type GameCategoryFilter = "all" | "memory" | "deduction" | "focus" | "speed"

/**
 * Cognitive Games Hub — Redesigned in the Lisso editorial design language.
 * Featuring:
 * - Daily Synaptic Booster & Agility Streak hero card
 * - Interactive category pill navigation
 * - 3D Tilt interactive game cards with rich gamified stats & vibrant icon orbs
 * - Catchy "Play Game" micro-actions and achievement progress
 * - 100% preservation of all underlying game screens & logic
 */
export default function CognitiveGamesHub({
  onBack,
  initialGame = null,
  fontFamily = "'Outfit', sans-serif",
}: CognitiveGamesHubProps) {
  const [activeGame, setActiveGame] = useState<CognitiveGameId | null>(
    initialGame,
  )
  const [selectedCategory, setSelectedCategory] =
    useState<GameCategoryFilter>("all")

  const [progressMap, setProgressMap] =
    useState<Record<CognitiveGameId, GameProgress>>(() => getAllGamesProgress())

  useEffect(() => {
    setProgressMap(getAllGamesProgress())
  }, [activeGame])

  // If a game is active, launch that game directly (preserving original gameplay untouched)
  if (activeGame === "logic_puzzle") {
    return (
      <LogicPuzzleGame
        onBack={() => setActiveGame(null)}
        fontFamily={fontFamily}
      />
    )
  }

  if (activeGame === "memory_treasure") {
    return (
      <MemoryTreasureGame
        onBack={() => setActiveGame(null)}
        fontFamily={fontFamily}
      />
    )
  }

  if (activeGame === "selective_attention") {
    return (
      <SelectiveAttentionGame
        onBack={() => setActiveGame(null)}
        fontFamily={fontFamily}
      />
    )
  }

  if (activeGame === "speed_visualisation") {
    return (
      <SpeedVisualisationGame
        onBack={() => setActiveGame(null)}
        fontFamily={fontFamily}
      />
    )
  }

  // Calculate overall engagement metrics for the hero stats
  const totalGamesPlayed = Object.values(progressMap).reduce(
    (acc, p) => acc + (p?.gamesPlayed || 0),
    0,
  )
  const totalScore = Object.values(progressMap).reduce(
    (acc, p) => acc + (p?.bestScore || 0),
    0,
  )
  const playedCount = Object.values(progressMap).filter(
    (p) => p && p.gamesPlayed > 0,
  ).length

  // Game Enhanced Visual Configuration (Catchy 3D gradients, benefits, difficulty)
  const GAME_DISPLAY_CONFIG: Record<CognitiveGameId, {
    category: GameCategoryFilter
    benefit: string
    duration: string
    difficulty: string
    gradientClass: string
    ringColor: string
    badgeClass: string
  }> = {
    logic_puzzle: {
      category: "deduction",
      benefit: "Strengthens executive planning & pattern deduction",
      duration: "3-4 min",
      difficulty: "Intermediate",
      gradientClass: "from-[#6366F1] via-[#818CF8] to-[#4F46E5]",
      ringColor: "rgba(99, 102, 241, 0.25)",
      badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    memory_treasure: {
      category: "memory",
      benefit: "Sharpens active working memory & spatial recall",
      duration: "2-3 min",
      difficulty: "Casual",
      gradientClass: "from-[#0EA5E9] via-[#38BDF8] to-[#0284C7]",
      ringColor: "rgba(14, 165, 233, 0.25)",
      badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
    },
    selective_attention: {
      category: "focus",
      benefit: "Enhances inhibitory control & visual target vigilance",
      duration: "2-3 min",
      difficulty: "Fast-Paced",
      gradientClass: "from-[#F43F5E] via-[#FB7185] to-[#E11D48]",
      ringColor: "rgba(244, 63, 94, 0.25)",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
    },
    speed_visualisation: {
      category: "speed",
      benefit: "Boosts perceptual processing speed & sequence cadence",
      duration: "2-3 min",
      difficulty: "Dynamic",
      gradientClass: "from-[#9333EA] via-[#A855F7] to-[#7E22CE]",
      ringColor: "rgba(147, 51, 234, 0.25)",
      badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
    },
  }

  // Filtered games based on active category pill
  const filteredGames = COGNITIVE_GAMES_META.filter((meta) => {
    if (selectedCategory === "all") return true
    const cfg = GAME_DISPLAY_CONFIG[meta.id]
    return cfg?.category === selectedCategory
  })

  return (
    <div
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehaviorY: "contain",
      }}
      className="flex-1 overflow-y-auto bg-[#F7F5F0] text-[#1A1A1A] select-none pb-8 relative"
    >
      {/* ─── 1. Top Header (Lisso Editorial Style) ─── */}
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
            <div className="w-10 h-10 rounded-full bg-[#F5CE57] text-[#1A1A1A] flex items-center justify-center shadow-2xs border border-black/[0.06] shrink-0 font-bold">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716A] bg-black/[0.05] px-2 py-0.5 rounded-full">
                  Synaptic Training
                </span>
              </div>
              <h1
                style={{ fontFamily }}
                className="text-[20px] font-bold text-[#1A1A1A] tracking-tight leading-tight mt-0.5"
              >
                Cognitive Games
              </h1>
            </div>
          </div>

          {/* Gamified XP / Streak Pill Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-2xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="text-[12px] font-bold text-[#1A1A1A] font-serif">
              {totalScore > 0 ? `${totalScore} pts` : "Daily Streak"}
            </span>
          </div>
        </div>
      </header>

      <div className="px-4 @[520px]:px-8 @[900px]:px-12 pt-4 space-y-5 w-full max-w-none @[520px]:max-w-3xl @[900px]:max-w-5xl mx-auto">
        {/* ─── 2. Hero Feature Card: Lisso Amber "Daily Booster" ─── */}
        <div className="rounded-[28px] bg-gradient-to-br from-[#F5CE57] via-[#FAD978] to-[#E5BE45] text-[#1A1A1A] p-5 shadow-[0_12px_32px_rgba(245,206,87,0.22)] relative overflow-hidden border border-black/[0.06]">
          {/* Subtle Ambient Ray Background */}
          <div
            className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/20 pointer-events-none blur-xl"
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Top Tag & Status */}
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-black/10 text-[#1A1A1A] text-[10px] font-bold tracking-wide uppercase">
                ⚡ Synaptic Booster
              </span>
              <span className="text-[11px] font-semibold text-[#1A1A1A]/80 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]" /> 100%
                Offline
              </span>
            </div>

            <h2
              style={{ fontFamily }}
              className="text-2xl font-bold text-[#1A1A1A] tracking-tight leading-tight mt-1"
            >
              Daily Brain Sprint
            </h2>
            <p className="text-xs text-[#1A1A1A]/80 mt-1 leading-relaxed">
              Play micro-challenges designed to maintain cognitive cadence and
              active working memory.
            </p>

            {/* Quick Action Button & Milestone Progress */}
            <div className="mt-4 pt-3.5 border-t border-black/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {COGNITIVE_GAMES_META.map((g) => {
                    const isDone = progressMap[g.id]?.gamesPlayed > 0
                    return (
                      <span
                        key={g.id}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border border-white shadow-2xs ${
                          isDone
                            ? "bg-[#1A1A1A] text-white"
                            : "bg-white/60 text-[#1A1A1A]"
                        }`}
                        title={g.title}
                      >
                        {g.icon}
                      </span>
                    )
                  })}
                </div>
                <span className="text-[11px] font-bold text-[#1A1A1A]">
                  {playedCount} of 4 Ready
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveGame("logic_puzzle")}
                className="px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-[12px] font-bold flex items-center gap-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:bg-black active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Quick Play
              </button>
            </div>
          </div>
        </div>

        {/* ─── 3. Category Filter Pill Switcher ─── */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: "all", label: "All Games" },
            { id: "deduction", label: "🧩 Logic" },
            { id: "memory", label: "🃏 Memory" },
            { id: "focus", label: "🎯 Focus" },
            { id: "speed", label: "⚡ Speed" },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  setSelectedCategory(cat.id as GameCategoryFilter)
                }
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#1A1A1A] text-white shadow-2xs"
                    : "bg-white text-[#78716A] border border-black/[0.05] hover:text-[#1A1A1A] hover:border-black/15 shadow-2xs"
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* ─── 4. Catchy Interactive Game Cards (with 3D Tilt) ─── */}
        <div className="grid grid-cols-1 @[520px]:grid-cols-2 gap-3.5">
          {filteredGames.map((meta) => {
            const prog = progressMap[meta.id]
            const cfg = GAME_DISPLAY_CONFIG[meta.id]
            const hasPlayed = prog && prog.gamesPlayed > 0

            // Contextual best score / performance badge
            let scoreHighlight = "Unplayed • Ready"
            if (hasPlayed) {
              if (meta.id === "logic_puzzle") {
                scoreHighlight = `High: ${prog.bestScore} pts (Level ${prog.highestLevel})`
              } else if (meta.id === "memory_treasure") {
                scoreHighlight = `Best: ${prog.bestScore} pts (${formatGameTime(prog.bestTimeSeconds)})`
              } else if (meta.id === "selective_attention") {
                scoreHighlight = `Best: ${prog.bestScore} pts (Streak: ${prog.bestStreak})`
              } else if (meta.id === "speed_visualisation") {
                scoreHighlight = `Best: ${prog.bestScore} pts (${prog.gamesPlayed} sessions)`
              }
            }

            return (
              <TiltCard
                key={meta.id}
                maxTilt={4}
                scale={1.015}
                onClick={() => setActiveGame(meta.id)}
                className="rounded-[28px] bg-white border border-black/[0.05] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-black/15 transition-all group cursor-pointer text-left relative overflow-hidden"
              >
                {/* Subtle Card Ambient Glow */}
                <div
                  className="absolute -right-12 -top-12 w-32 h-32 rounded-full pointer-events-none opacity-20"
                  style={{ background: cfg.ringColor }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  {/* Top Row: 3D Gradient Icon Orb + Tag Chips + High Score Trophy */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {/* Vibrant 3D Squircle Icon Orb */}
                      <div
                        className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${cfg.gradientClass} text-white flex items-center justify-center text-2xl shadow-md border border-white/20 group-hover:scale-108 transition-transform shrink-0`}
                      >
                        {meta.icon}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cfg.badgeClass}`}
                          >
                            {meta.tag}
                          </span>
                          <span className="text-[10px] font-semibold text-[#78716A] bg-black/[0.04] px-2 py-0.5 rounded-full">
                            {cfg.duration}
                          </span>
                        </div>

                        <h3
                          style={{ fontFamily }}
                          className="text-lg font-bold text-[#1A1A1A] group-hover:text-black transition-colors leading-tight mt-1"
                        >
                          {meta.title}
                        </h3>
                      </div>
                    </div>

                    {/* Trophy Badge */}
                    {hasPlayed && (
                      <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shadow-2xs shrink-0">
                        <Trophy className="w-4 h-4 fill-amber-500" />
                      </div>
                    )}
                  </div>

                  {/* Benefit description */}
                  <p className="text-[12px] text-[#78716A] leading-relaxed line-clamp-2 mb-3.5">
                    {cfg.benefit}
                  </p>

                  {/* Bottom Row: Score / Status Telemetry + Catchy "Play" Action */}
                  <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          hasPlayed ? "bg-emerald-500" : "bg-amber-400"
                        } animate-pulse`}
                      />
                      <span className="text-[11px] font-bold text-[#1A1A1A] tabular-nums font-serif">
                        {scoreHighlight}
                      </span>
                    </div>

                    {/* Raised Charcoal Pill Play Button */}
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white text-[11px] font-bold shadow-sm group-hover:bg-black group-hover:shadow-md active:scale-95 transition-all">
                      <span>Play</span>
                      <ChevronRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            )
          })}
        </div>

        {/* ─── 5. Daily Milestone & Brain Plasticity Indicator ─── */}
        <div className="rounded-[24px] bg-white border border-black/[0.05] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[13px] font-bold text-[#1A1A1A] block">
                Synaptic Agility Index
              </span>
              <span className="text-[11px] font-medium text-[#78716A]">
                {totalGamesPlayed > 0
                  ? `${totalGamesPlayed} sessions logged this week`
                  : "Complete 1 game today to start streak"}
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {totalGamesPlayed > 0 ? "Active" : "Ready"}
          </span>
        </div>

        {/* ─── 6. Medical Disclaimer ─── */}
        <div className="rounded-2xl bg-black/[0.02] border border-black/[0.04] p-3 text-[11px] text-[#78716A] flex items-center gap-2.5">
          <Info className="w-4 h-4 text-[#A8A29E] shrink-0" />
          <p className="leading-relaxed">
            These interactive activities provide recreational cognitive
            engagement and are not a medical diagnosis.
          </p>
        </div>
      </div>
    </div>
  )
}
