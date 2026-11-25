/**
 * NeuroSense Demo Studio - Main Drawer & Orchestration Component
 * ==============================================================
 * Renders the top floating bar / drawer for selecting fictional scenarios,
 * running animated autofill, toggling the Pipeline Inspector, and launching What-If tests.
 */

import React, { useState, useEffect, useRef } from "react"
import {
  DemoScenarioId,
  DemoScenarioMeta,
  AutofillSpeed,
  PipelineInspectorState,
  TraceRecord,
} from "./types"
import {
  DEMO_SCENARIOS,
  loadScenarioProfile,
  loadScenarioHistory,
} from "./scenarioRegistry"
import { ScenarioAutofillRunner } from "./autofill"
import PipelineInspector from "./PipelineInspector"
import WhatIfPanel from "./WhatIfPanel"
import { FamilySetupRecord } from "../types/familySetup"
import { saveFamilySetup } from "../services/familySetupStorage"
import { getDB } from "../services/db"

interface DemoStudioDrawerProps {
  onScenarioLoaded?: (
    scenario: DemoScenarioMeta,
    profile: FamilySetupRecord,
  ) => void
  onNavigateScreen?: (screen: string) => void
  inspectorState?: PipelineInspectorState | null
}

export default function DemoStudioDrawer({
  onScenarioLoaded,
  onNavigateScreen,
  inspectorState: externalInspectorState,
}: DemoStudioDrawerProps) {
  const [selectedScenarioId, setSelectedScenarioId] =
    useState<DemoScenarioId>("lakshmi")
  const [speed, setSpeed] = useState<AutofillSpeed>("natural")
  const [isAutofilling, setIsAutofilling] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [autofillProgress, setAutofillProgress] = useState(0)
  const [autofillStatus, setAutofillStatus] = useState("")
  const [isInspectorOpen, setIsInspectorOpen] = useState(false)
  const [isWhatIfOpen, setIsWhatIfOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const runnerRef = useRef<ScenarioAutofillRunner | null>(null)

  const currentMeta =
    DEMO_SCENARIOS.find((s) => s.id === selectedScenarioId) || DEMO_SCENARIOS[0]

  const handleStartAutofill = async () => {
    try {
      setIsAutofilling(true)
      setIsPaused(false)
      setAutofillProgress(5)
      setAutofillStatus("Loading scenario profile...")

      const profile = await loadScenarioProfile(selectedScenarioId)
      // Save profile to storage so wizard and session access it
      await saveFamilySetup(profile)

      // Also seed historical sessions to IndexedDB for savitri or lakshmi if present
      const historySessions = await loadScenarioHistory(selectedScenarioId)
      if (historySessions && historySessions.length > 0) {
        try {
          const db = await getDB()
          const tx = db.transaction("screenings", "readwrite")
          const store = tx.objectStore("screenings")
          for (const s of historySessions) {
            await store.put(s)
          }
          console.info(
            `[DemoStudio] Seeded ${historySessions.length} backdated session(s) into IndexedDB.`,
          )
        } catch (dbErr) {
          console.warn(
            "[DemoStudio] Could not seed history into IndexedDB:",
            dbErr,
          )
        }
      }

      onNavigateScreen?.("familySetup")

      const runner = new ScenarioAutofillRunner(speed)
      runnerRef.current = runner

      await runner.run(profile, profile, {
        onProgress: (pct, msg) => {
          setAutofillProgress(pct)
          setAutofillStatus(msg)
        },
        onStepChange: (step) => {
          // Can notify wizard if exposed
        },
        onComplete: (finalSetup) => {
          setIsAutofilling(false)
          setAutofillStatus("Scenario ready!")
          onScenarioLoaded?.(currentMeta, finalSetup)
        },
        onError: (err) => {
          console.error("[DemoStudio] Autofill error:", err)
          setIsAutofilling(false)
          setAutofillStatus("Autofill failed.")
        },
      })
    } catch (err) {
      console.error("[DemoStudio] Failed to load scenario:", err)
      setIsAutofilling(false)
      setAutofillStatus("Failed to load scenario.")
    }
  }

  const handlePauseResume = () => {
    if (!runnerRef.current) return
    if (isPaused) {
      runnerRef.current.resume()
      setIsPaused(false)
    } else {
      runnerRef.current.pause()
      setIsPaused(true)
    }
  }

  const handleSkip = () => {
    if (!runnerRef.current) return
    runnerRef.current.skipAnimation()
    setIsPaused(false)
  }

  const handleExportTrace = () => {
    const traceData: TraceRecord = {
      scenarioId: selectedScenarioId,
      elderName: currentMeta.name,
      timestamp: new Date().toISOString(),
      softwareVersions: {
        frontend: "React 19 + Vite 6 + Tailwind v4",
        backend: "FastAPI 0.115 + Faster-Whisper",
        whisper: "Systran/faster-whisper-small",
        scoringConfigHash:
          externalInspectorState?.scoringMath?.configHash ||
          "provisional-v1.0.0",
      },
      inputs: {
        schoolingYears: 10,
        preferredLanguage: currentMeta.language,
        confounders: {},
        informantItemsCount: 16,
        lifeFactsCount: 12,
      },
      pipelineSteps: [
        {
          factId: "fact_1",
          stage: "free",
          transcript: "Ramesh, my son",
          matchType: "exact",
          credit: 1.0,
          audioDuration: 2.4,
        },
      ],
      finalScores: {
        lifeMemoryScore:
          externalInspectorState?.scoringMath?.components.lifeMemory || 85.0,
        informantScore:
          externalInspectorState?.scoringMath?.components.informantConcern ||
          15.0,
        csi: externalInspectorState?.scoringMath?.csi || 78.5,
        riskTier: externalInspectorState?.scoringMath?.riskTier || "green",
        confidence: externalInspectorState?.scoringMath?.confidence || 90.0,
      },
      weightsUsed: externalInspectorState?.scoringMath?.weightsUsed || {
        lifeMemory: 0.4,
        naming: 0.2,
        speech: 0.1,
        informantConcern: 0.3,
      },
      safetyChecks: {
        triggered:
          externalInspectorState?.scoringMath?.safetyOverrideTriggered || false,
        alertMessage: externalInspectorState?.scoringMath?.safetyAlertMessage,
      },
      discordanceFlags:
        externalInspectorState?.scoringMath?.discordanceFlags || [],
    }

    const blob = new Blob([JSON.stringify(traceData, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `neurosense_trace_${selectedScenarioId}_${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {/* Persistent Top Demo Header Banner */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-amber-500/90 text-slate-950 font-bold text-[11px] py-1 px-3 text-center flex items-center justify-center gap-2 shadow-sm backdrop-blur-sm">
        <span>⚠️ DEMO STUDIO:</span>
        <span>
          Active Scenario: {currentMeta.name} ({currentMeta.designTierLabel}) •
          All data is fictional.
        </span>
      </div>

      {/* Floating Demo Control Bar */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl flex flex-col rounded-2xl bg-[#03222a]/95 border border-[#0d4f5e] shadow-2xl backdrop-blur-md p-2.5 text-slate-100 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left: Scenario Select */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#00f2fe] flex items-center gap-1 text-xs">
              <span>🎭</span> Scenario:
            </span>
            <select
              value={selectedScenarioId}
              onChange={(e) =>
                setSelectedScenarioId(e.target.value as DemoScenarioId)
              }
              disabled={isAutofilling}
              className="bg-[#01141a] border border-[#0e4854] text-white rounded-lg px-2.5 py-1 text-xs font-medium focus:ring-1 focus:ring-[#00f2fe] outline-none cursor-pointer"
            >
              {DEMO_SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.languageName}) - {s.designTier.toUpperCase()}
                </option>
              ))}
            </select>

            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                currentMeta.designTier === "green"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                  : currentMeta.designTier === "amber"
                    ? "bg-amber-950 text-amber-300 border border-amber-700"
                    : currentMeta.designTier === "red"
                      ? "bg-rose-950 text-rose-300 border border-rose-700"
                      : "bg-slate-800 text-slate-300 border border-slate-700"
              }`}
            >
              {currentMeta.designTier}
            </span>
          </div>

          {/* Middle: Speed Selector */}
          <div className="flex items-center gap-1 bg-[#01141a] px-1.5 py-0.5 rounded-lg border border-[#0e4854] text-[11px]">
            <span className="text-slate-400 mr-1">Speed:</span>
            {(["natural", "fast", "instant"] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSpeed(s)
                  runnerRef.current?.setSpeed(s)
                }}
                disabled={isAutofilling}
                className={`px-2 py-0.5 rounded capitalize transition-all ${
                  speed === s
                    ? "bg-[#00f2fe]/20 text-[#00f2fe] font-bold border border-[#00f2fe]/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5">
            {!isAutofilling ? (
              <button
                onClick={handleStartAutofill}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-[#01141a] font-bold text-xs hover:opacity-90 shadow-md transition-opacity cursor-pointer flex items-center gap-1"
              >
                <span>⚡</span> Autofill Wizard
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePauseResume}
                  className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-600 font-semibold text-xs cursor-pointer"
                >
                  {isPaused ? "▶ Resume" : "⏸ Pause"}
                </button>
                <button
                  onClick={handleSkip}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-semibold text-xs cursor-pointer"
                >
                  ⏭ Skip
                </button>
              </div>
            )}

            <button
              onClick={() => setIsInspectorOpen(!isInspectorOpen)}
              className="px-2.5 py-1.5 rounded-xl bg-[#032b35] hover:bg-[#043a47] border border-[#00f2fe]/40 text-[#00f2fe] font-semibold text-xs transition-colors cursor-pointer"
            >
              Inspector
            </button>

            <button
              onClick={() => setIsWhatIfOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/70 border border-emerald-600/60 text-emerald-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              What-If?
            </button>
          </div>
        </div>

        {/* Progress row when autofilling */}
        {isAutofilling && (
          <div className="mt-2 pt-2 border-t border-[#0e4854] flex items-center gap-3 text-[11px]">
            <div className="flex-1 bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-[#00f2fe] to-[#4facfe] h-full transition-all duration-300"
                style={{ width: `${autofillProgress}%` }}
              />
            </div>
            <span className="text-slate-300 font-mono text-[10px]">
              {autofillProgress}%
            </span>
            <span className="text-slate-400 italic truncate max-w-[300px]">
              {autofillStatus}
            </span>
          </div>
        )}
      </div>

      {/* Inspector Drawer */}
      <PipelineInspector
        state={externalInspectorState || null}
        isOpen={isInspectorOpen}
        onToggle={() => setIsInspectorOpen(!isInspectorOpen)}
        onOpenWhatIf={() => setIsWhatIfOpen(true)}
        onExportTrace={handleExportTrace}
      />

      {/* What-If Panel */}
      <WhatIfPanel
        isOpen={isWhatIfOpen}
        onClose={() => setIsWhatIfOpen(false)}
        currentState={externalInspectorState || null}
        onExportTrace={handleExportTrace}
      />
    </>
  )
}
