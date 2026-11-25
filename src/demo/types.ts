/**
 * NeuroSense Demo Studio - Types and Data Contracts
 * =================================================
 * Defines data structures for fictional demo scenarios, pipeline inspection,
 * counterfactual what-if analysis, and determinism check tracing.
 */

import { FamilySetupRecord } from "../types/familySetup"

export type DemoScenarioId = "lakshmi" | "ramesh" | "savitri" | "abdul" | "kamala" | "narayan"

export type AutofillSpeed = "natural" | "fast" | "instant"

export interface DemoScenarioMeta {
  id: DemoScenarioId
  name: string
  demographics: string
  language: "kn" | "hi" | "en"
  languageName: string
  designTier: "green" | "amber" | "red" | "inconclusive"
  designTierLabel: string
  summary: string
  keyFactsPreview: string[]
  audioFileCount: number
}

export interface ScenarioScriptItem {
  fact_id: string
  stage: "free" | "cued" | "recognition"
  spoken_words: string
  notes?: string
}

export interface ScenarioScriptData {
  scenario_id: DemoScenarioId
  elder_name: string
  language: string
  instructions: string
  answers: ScenarioScriptItem[]
}

export interface PipelineAudioMetrics {
  durationSeconds?: number
  sampleRate?: number
  channels?: number
  rmsEnergy?: number
  snrDb?: number
  speechRateWpm?: number
  pauseCount?: number
  pauseDurationSec?: number
}

export interface PipelineAsrMetrics {
  transcript: string
  detectedLanguage?: string
  confidence?: number
}

export interface PipelineMatchMetrics {
  isCorrect: boolean
  isPartial: boolean
  credit: number
  stageReached: "free" | "cued" | "recognition"
  matchType: "exact" | "alias" | "numeric_exact" | "numeric_tolerance" | "fuzzy" | "semantic" | "none"
  confidence: number
  matchedText: string
  targetAnswer: string
  transcript: string
  reason: string
  aliasesCompared?: string[]
  distractorsTested?: string[]
}

export interface PipelineSpeechFeatures {
  jitter?: number
  shimmer?: number
  pitchVariance?: number
  spectralCentroid?: number
  hnrDb?: number
}

export interface PipelineScoringMath {
  csi: number
  riskTier: "green" | "amber" | "red" | "inconclusive"
  tierLabel: string
  confidence: number
  formula: string
  components: {
    lifeMemory: number
    naming?: number
    speech?: number
    informantConcern: number
  }
  weightsUsed: {
    lifeMemory: number
    naming: number
    speech: number
    informantConcern: number
  }
  safetyOverrideTriggered: boolean
  safetyAlertMessage?: string | null
  discordanceFlags: Array<{
    type: string
    message: string
    severity?: string
  }>
  educationAdjusted: boolean
  topDrivers: string[]
  configHash: string
}

export interface PipelineInspectorState {
  scenarioId: DemoScenarioId | null
  activeFactId: string | null
  activeStage: "free" | "cued" | "recognition"
  rawAudio: PipelineAudioMetrics | null
  asr: PipelineAsrMetrics | null
  match: PipelineMatchMetrics | null
  speechFeatures: PipelineSpeechFeatures | null
  scoringMath: PipelineScoringMath | null
  timestamp: string
}

export interface TraceRecord {
  scenarioId: DemoScenarioId
  elderName: string
  timestamp: string
  softwareVersions: {
    frontend: string
    backend: string
    whisper: string
    scoringConfigHash: string
  }
  inputs: {
    schoolingYears: number
    preferredLanguage: string
    confounders: Record<string, boolean>
    informantItemsCount: number
    lifeFactsCount: number
  }
  pipelineSteps: Array<{
    factId: string
    stage: string
    transcript: string
    matchType: string
    credit: number
    audioDuration?: number
  }>
  finalScores: {
    lifeMemoryScore: number
    informantScore: number
    csi: number
    riskTier: string
    confidence: number
  }
  weightsUsed: Record<string, number>
  safetyChecks: {
    triggered: boolean
    alertMessage?: string | null
  }
  discordanceFlags: any[]
}
