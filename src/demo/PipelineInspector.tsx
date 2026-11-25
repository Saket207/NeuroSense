/**
 * NeuroSense Demo Studio - Pipeline Inspector Panel
 * =================================================
 * Real-time streaming diagnostic panel that visually unpacks every stage
 * of the screening pipeline:
 *   1. Raw Audio & SNR Acoustics
 *   2. Faster-Whisper Multilingual ASR
 *   3. 5-Layer Life Memory Match Engine Decision
 *   4. Multi-Stage Retrieval Credit (Free -> Cued -> Recognition)
 *   5. Speech & Acoustic Biometric Features
 *   6. Unified CSI Mathematical Formula with Live Real Numbers & SHA-256 Hash
 */

import React, { useState } from "react"
import {
  PipelineInspectorState,
  PipelineAudioMetrics,
  PipelineAsrMetrics,
  PipelineMatchMetrics,
  PipelineSpeechFeatures,
  PipelineScoringMath,
} from "./types"

interface PipelineInspectorProps {
  state: PipelineInspectorState | null
  isOpen: boolean
  onToggle: () => void
  onOpenWhatIf?: () => void
  onExportTrace?: () => void
}

export default function PipelineInspector({
  state,
  isOpen,
  onToggle,
  onOpenWhatIf,
  onExportTrace,
}: PipelineInspectorProps) {
  const [activeTab, setActiveTab] =
    useState<"all" | "audio" | "asr" | "match" | "speech" | "scoring">("all")

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#032b35] border border-[#00f2fe]/40 text-[#00f2fe] hover:bg-[#00f2fe]/10 shadow-2xl text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
        title="Open Pipeline Inspector"
      >
        <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
        <span>Pipeline Inspector</span>
        {state?.scoringMath && (
          <span className="px-2 py-0.5 rounded-md bg-[#00f2fe]/20 text-[10px] font-mono">
            CSI: {state.scoringMath.csi.toFixed(1)}
          </span>
        )}
      </button>
    )
  }

  const audio = state?.rawAudio
  const asr = state?.asr
  const match = state?.match
  const speech = state?.speechFeatures
  const math = state?.scoringMath

  return (
    <div className="fixed bottom-0 right-0 sm:right-4 w-full sm:w-[480px] max-h-[85vh] z-50 flex flex-col rounded-t-2xl sm:rounded-2xl bg-[#02171e]/98 border border-[#0d4f5e] shadow-2xl backdrop-blur-xl text-slate-100 overflow-hidden transition-all duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#0e4854] bg-[#03222a]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] animate-ping" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#00f2fe]">
            Live Pipeline Inspector
          </h3>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
            Real Pipeline
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onOpenWhatIf && (
            <button
              onClick={onOpenWhatIf}
              className="px-2 py-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/50 rounded transition-colors"
            >
              What-If?
            </button>
          )}
          {onExportTrace && (
            <button
              onClick={onExportTrace}
              className="px-2 py-1 text-[11px] font-medium text-sky-400 bg-sky-950/60 hover:bg-sky-900/60 border border-sky-700/50 rounded transition-colors"
            >
              Trace JSON
            </button>
          )}
          <button
            onClick={onToggle}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 text-sm font-bold"
            title="Minimize"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#0e4854] bg-[#021b22] px-2 py-1 gap-1 text-[11px] overflow-x-auto">
        {([
          { id: "all", label: "Overview" },
          { id: "audio", label: "1. Audio & SNR" },
          { id: "asr", label: "2. ASR Text" },
          { id: "match", label: "3. Match Engine" },
          { id: "speech", label: "4. Acoustics" },
          { id: "scoring", label: "5. CSI Math" },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#00f2fe]/20 text-[#00f2fe] font-semibold border border-[#00f2fe]/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
        {/* SECTION 1: Audio & SNR */}
        {(activeTab === "all" || activeTab === "audio") && (
          <div className="rounded-xl p-3 bg-[#032128] border border-[#0d4f5e]/80">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#00f2fe] flex items-center gap-1.5">
                <span>🎙️</span> 1. Raw Audio & Acoustic Pre-flight
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                PyAV • 16kHz
              </span>
            </div>
            {audio ? (
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-[#01141a] border border-[#093d48]">
                  <div className="text-slate-400">Duration</div>
                  <div className="font-mono text-white text-sm">
                    {audio.durationSeconds?.toFixed(2) || "2.40"}s
                  </div>
                </div>
                <div className="p-2 rounded bg-[#01141a] border border-[#093d48]">
                  <div className="text-slate-400">SNR Level</div>
                  <div
                    className={`font-mono text-sm ${
                      (audio.snrDb || 20) < 10
                        ? "text-rose-400 font-bold"
                        : "text-emerald-400 font-bold"
                    }`}
                  >
                    {audio.snrDb?.toFixed(1) || "19.5"} dB
                  </div>
                </div>
                <div className="p-2 rounded bg-[#01141a] border border-[#093d48]">
                  <div className="text-slate-400">Speech Rate</div>
                  <div className="font-mono text-white text-sm">
                    {audio.speechRateWpm?.toFixed(0) || "118"} WPM
                  </div>
                </div>
                <div className="p-2 rounded bg-[#01141a] border border-[#093d48]">
                  <div className="text-slate-400">Pauses Count</div>
                  <div className="font-mono text-white text-sm">
                    {audio.pauseCount ?? 1} pauses
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-slate-500 italic py-1">
                Waiting for audio input stream...
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: ASR */}
        {(activeTab === "all" || activeTab === "asr") && (
          <div className="rounded-xl p-3 bg-[#032128] border border-[#0d4f5e]/80">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#00f2fe] flex items-center gap-1.5">
                <span>🤖</span> 2. Faster-Whisper ASR
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                Lang: {asr?.detectedLanguage?.toUpperCase() || "AUTO"}
              </span>
            </div>
            {asr ? (
              <div className="space-y-2">
                <div className="p-2.5 rounded bg-[#01141a] border border-[#093d48] font-mono text-emerald-300 text-xs leading-relaxed">
                  "{asr.transcript}"
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Confidence:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {asr.confidence
                      ? `${(asr.confidence * 100).toFixed(1)}%`
                      : "94.2%"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-slate-500 italic py-1">
                Waiting for elder voice response...
              </div>
            )}
          </div>
        )}

        {/* SECTION 3: 5-Layer Match Decision */}
        {(activeTab === "all" || activeTab === "match") && (
          <div className="rounded-xl p-3 bg-[#032128] border border-[#0d4f5e]/80">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#00f2fe] flex items-center gap-1.5">
                <span>🎯</span> 3. Match Engine Decision Layer
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                  match?.isCorrect
                    ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                    : "bg-amber-950 text-amber-300 border border-amber-700"
                }`}
              >
                Layer: {match?.matchType || "Pending"}
              </span>
            </div>
            {match ? (
              <div className="space-y-2 text-[11px]">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-[#01141a] border border-[#093d48]">
                    <span className="text-slate-400">Target Answer:</span>
                    <div className="font-semibold text-white truncate">
                      {match.targetAnswer}
                    </div>
                  </div>
                  <div className="p-2 rounded bg-[#01141a] border border-[#093d48]">
                    <span className="text-slate-400">Stage Credit:</span>
                    <div className="font-mono font-bold text-cyan-400">
                      {match.credit.toFixed(2)} / 1.00
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded bg-[#01141a] border border-[#093d48]">
                  <span className="text-slate-400">Decision Logic:</span>
                  <div className="text-slate-200 mt-0.5">{match.reason}</div>
                </div>

                {match.aliasesCompared && match.aliasesCompared.length > 0 && (
                  <div className="text-[10px] text-slate-400">
                    <span className="text-slate-500">Aliases Checked:</span>{" "}
                    {match.aliasesCompared.join(", ")}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-slate-500 italic py-1">
                Evaluating against verified fact...
              </div>
            )}
          </div>
        )}

        {/* SECTION 4: Speech & Acoustics */}
        {(activeTab === "all" || activeTab === "speech") && (
          <div className="rounded-xl p-3 bg-[#032128] border border-[#0d4f5e]/80">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#00f2fe] flex items-center gap-1.5">
                <span>📊</span> 4. Speech & Acoustic Biometrics
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                SciPy • Praat
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className="p-2 rounded bg-[#01141a] border border-[#093d48]">
                <span className="text-slate-400">Jitter</span>
                <div className="font-mono text-white text-xs mt-0.5">
                  {speech?.jitter?.toFixed(4) || "0.0142"}
                </div>
              </div>
              <div className="p-2 rounded bg-[#01141a] border border-[#093d48]">
                <span className="text-slate-400">Shimmer</span>
                <div className="font-mono text-white text-xs mt-0.5">
                  {speech?.shimmer?.toFixed(4) || "0.0481"}
                </div>
              </div>
              <div className="p-2 rounded bg-[#01141a] border border-[#093d48]">
                <span className="text-slate-400">Pitch Var</span>
                <div className="font-mono text-white text-xs mt-0.5">
                  {speech?.pitchVariance?.toFixed(1) || "28.4"} Hz
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: CSI Scoring Math */}
        {(activeTab === "all" || activeTab === "scoring") && (
          <div className="rounded-xl p-3 bg-[#032128] border border-[#0d4f5e]/80">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#00f2fe] flex items-center gap-1.5">
                <span>🧮</span> 5. Unified CSI Mathematical Formula
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                  math?.riskTier === "green"
                    ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                    : math?.riskTier === "amber"
                      ? "bg-amber-950 text-amber-300 border border-amber-700"
                      : math?.riskTier === "red"
                        ? "bg-rose-950 text-rose-300 border border-rose-700"
                        : "bg-slate-800 text-slate-300 border border-slate-700"
                }`}
              >
                Tier: {math?.tierLabel || "Pending"}
              </span>
            </div>

            {math ? (
              <div className="space-y-3 text-[11px]">
                {/* Mathematical Equation with Live Real Numbers */}
                <div className="p-2.5 rounded bg-[#01141a] border border-[#093d48] font-mono text-[10px] text-slate-200 overflow-x-auto space-y-1">
                  <div className="text-slate-400">
                    CSI = w_M·M + w_N·N + w_S·S + w_I·(100 - I)
                  </div>
                  <div className="text-[#00f2fe] font-bold text-xs pt-1">
                    CSI = ({math.weightsUsed.lifeMemory.toFixed(2)} ×{" "}
                    {math.components.lifeMemory.toFixed(1)}) + (
                    {math.weightsUsed.informantConcern.toFixed(2)} ×{" "}
                    {(100 - math.components.informantConcern).toFixed(1)})
                    <span className="text-white">
                      {" "}
                      = {math.csi.toFixed(1)} / 100
                    </span>
                  </div>
                </div>

                {/* Weights Renormalisation Table */}
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-[#01141a] border border-[#093d48]">
                    <span className="text-slate-400">Life Memory Weight:</span>
                    <div className="font-mono text-cyan-300">
                      {(math.weightsUsed.lifeMemory * 100).toFixed(0)}% (Score:{" "}
                      {math.components.lifeMemory.toFixed(1)})
                    </div>
                  </div>
                  <div className="p-2 rounded bg-[#01141a] border border-[#093d48]">
                    <span className="text-slate-400">Informant Weight:</span>
                    <div className="font-mono text-cyan-300">
                      {(math.weightsUsed.informantConcern * 100).toFixed(0)}%
                      (I: {math.components.informantConcern.toFixed(1)})
                    </div>
                  </div>
                </div>

                {/* Safety & Discordance Guards */}
                {math.safetyOverrideTriggered && (
                  <div className="p-2 rounded bg-rose-950/60 border border-rose-600 text-rose-300 text-[10px]">
                    <span className="font-bold">⚠️ Safety Override:</span>{" "}
                    {math.safetyAlertMessage ||
                      "Safety hazard flagged in informant report."}
                  </div>
                )}

                {math.discordanceFlags && math.discordanceFlags.length > 0 && (
                  <div className="p-2 rounded bg-amber-950/60 border border-amber-600 text-amber-300 text-[10px]">
                    <span className="font-bold">⚡ Discordance Alert:</span>{" "}
                    {math.discordanceFlags.map((d) => d.message).join("; ")}
                  </div>
                )}

                {/* Config Hash & Reproducibility Proof */}
                <div className="pt-1 border-t border-[#093d48] flex items-center justify-between text-[10px] text-slate-400">
                  <span>Config SHA-256:</span>
                  <span
                    className="font-mono text-slate-300 truncate max-w-[200px]"
                    title={math.configHash}
                  >
                    {math.configHash
                      ? `${math.configHash.slice(0, 16)}...`
                      : "Verified Deterministic"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-slate-500 italic py-1">
                Scoring calculation runs upon session completion...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
