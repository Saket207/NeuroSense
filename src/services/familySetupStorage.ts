/**
 * NeuroSense Family Setup Storage & Validation Service
 * ====================================================
 * Manages local IndexedDB caching and Supabase Cloud persistence for
 * Family-Verified Life Facts, Informant Questionnaire, and Confounders.
 */

import { getDB } from "./db"
import {
  FamilySetupRecord,
  LifeFactItem,
  DailyLifeQuestionItem,
  ElderProfileData,
  ConfoundersData,
} from "../types/familySetup"
import {
  DEFAULT_REQUIRED_LIFE_FACTS,
  DEFAULT_RECENT_EVENT_FACTS,
  DEFAULT_DAILY_LIFE_ITEMS,
} from "./familySetupDefaults"
import { supabase } from "./supabase"

const FAMILY_SETUP_STORAGE_KEY_PREFIX = "neurosense_family_setup_"

export function generateInitialSetup(
  patientId: string,
  elderName = "Rama Devi",
): FamilySetupRecord {
  const now = new Date().toISOString()

  const lifeFacts: LifeFactItem[] = [
    ...DEFAULT_REQUIRED_LIFE_FACTS.map((f, i) => ({
      ...f,
      id: `fact_req_${i + 1}`,
    })),
    ...DEFAULT_RECENT_EVENT_FACTS.map((f, i) => ({
      ...f,
      id: `fact_recent_${i + 1}`,
      eventDate: new Date(Date.now() - (3 + i * 2) * 86400000)
        .toISOString()
        .slice(0, 10),
    })),
  ]

  const dailyLifeQuestionnaire: DailyLifeQuestionItem[] =
    DEFAULT_DAILY_LIFE_ITEMS.map((q, i) => ({
      ...q,
      id: `item_${i + 1}`,
    }))

  const elderProfile: ElderProfileData = {
    fullName: elderName,
    age: 72,
    gender: "Female",
    languagesSpoken: ["Hindi", "English"],
    preferredTestingLanguage: "en",
    dialectOrRegion: "North India",
    schoolingYears: 8,
    literacyStatus: "can_read_write",
    informantName: "Caregiver",
    informantRelationship: "Child",
    informantMeetingFrequency: "daily",
    livingArrangement: "with_family",
  }

  const confounders: ConfoundersData = {
    hearingDifficulty: false,
    hasHearingAid: false,
    visionDifficulty: false,
    poorSleepRecently: false,
    recentBereavement: false,
    recentIllnessOrHospitalStay: false,
    sedatingMedicines: false,
    alcoholUse: false,
    todayStateTired: false,
    todayStateUnwellOrAnxious: false,
  }

  return {
    id: `setup_${patientId}_${Date.now()}`,
    patientId,
    version: 1,
    createdAt: now,
    updatedAt: now,
    elderProfile,
    lifeFacts,
    dailyLifeQuestionnaire,
    confounders,
    consent: {
      informantConsentGiven: true,
      informantConsentTimestamp: now,
      informantConsentSignatureOrName: "Verified Family Member",
      elderSpokenAssentGiven: true,
      elderAssentTimestamp: now,
    },
  }
}

export function isRecentEventExpired(eventDate?: string): boolean {
  if (!eventDate) return true
  const eventTime = new Date(eventDate).getTime()
  const ageDays = (Date.now() - eventTime) / (1000 * 3600 * 24)
  return ageDays < 0 || ageDays > 14
}

/**
 * Validates life facts before screening session can begin:
 * - Minimum 8 scorable facts
 * - At least 1 recent event fact that has not expired (< 14 days)
 * - Warns if all facts are of one category
 */
export function validateLifeFactsForScreening(
  facts: LifeFactItem[],
): {
  isValid: boolean
  scorableCount: number
  hasRecentEvent: boolean
  recentEventExpired: boolean
  warningCategoryDiversity?: string
  error?: string
} {
  const scorable = facts.filter(
    (f) => !f.isSensitive && f.verifiedAnswer.trim().length > 0,
  )
  const scorableCount = scorable.length

  const recentEvents = scorable.filter((f) => f.isRecentEvent)
  const now = Date.now()

  let hasValidRecentEvent = false
  let recentEventExpired = false

  for (const re of recentEvents) {
    if (!re.eventDate) {
      recentEventExpired = true
      continue
    }
    const eventTime = new Date(re.eventDate).getTime()
    const ageDays = (now - eventTime) / (1000 * 3600 * 24)
    if (ageDays >= 0 && ageDays <= 14) {
      hasValidRecentEvent = true
    } else {
      recentEventExpired = true
    }
  }

  if (scorableCount < 8) {
    return {
      isValid: false,
      scorableCount,
      hasRecentEvent: hasValidRecentEvent,
      recentEventExpired,
      error: `At least 8 verified life facts required before screening (currently ${scorableCount} completed).`,
    }
  }

  if (!hasValidRecentEvent) {
    return {
      isValid: false,
      scorableCount,
      hasRecentEvent: false,
      recentEventExpired,
      error:
        "At least one recent-event fact from the last 7 to 14 days is required. Please update the date.",
    }
  }

  // Check category diversity
  const categories = new Set(scorable.map((f) => f.category))
  let warningCategoryDiversity: string | undefined
  if (categories.size === 1) {
    warningCategoryDiversity =
      "All facts belong to the same category. Diversifying across people, places, and history is recommended."
  }

  return {
    isValid: true,
    scorableCount,
    hasRecentEvent: true,
    recentEventExpired: false,
    warningCategoryDiversity,
  }
}

/**
 * Calculates Informant Concern Score (0 to 100, higher = more concern)
 * with domain breakdown, recent-onset weighting, safety weighting, and reliability weighting.
 */
export function calculateInformantConcernScore(
  items: DailyLifeQuestionItem[],
  informantFrequency: "daily" | "weekly" | "rarely" = "daily",
): {
  overallScore: number
  domainScores: Record<string, number>
  safetyFlagCount: number
  recentOnsetSafetyCount: number
} {
  const freqWeights: Record<string, number> = {
    never: 0.0,
    rarely: 1.0,
    sometimes: 2.0,
    often: 3.0,
  }

  const onsetMultipliers: Record<string, number> = {
    under_6_months: 1.35,
    "6_to_12_months": 1.2,
    "1_to_3_years": 1.05,
    over_3_years: 1.0,
    not_sure: 1.0,
  }

  const reliabilityMultiplier =
    informantFrequency === "daily"
      ? 1.0
      : informantFrequency === "weekly"
        ? 0.85
        : 0.65

  let totalWeightedScore = 0.0
  let maxPossibleScore = 0.0
  let safetyFlagCount = 0
  let recentOnsetSafetyCount = 0

  const domainTotals: Record<string, {
    current: number
    max: number
  }> = {
    memory: { current: 0, max: 0 },
    orientation: { current: 0, max: 0 },
    daily_tasks_money: { current: 0, max: 0 },
    language: { current: 0, max: 0 },
    behaviour_mood: { current: 0, max: 0 },
    safety: { current: 0, max: 0 },
  }

  for (const item of items) {
    const rawFreq = freqWeights[item.frequency] || 0.0
    const onsetMult = onsetMultipliers[item.onset] || 1.0
    const safetyMult = item.isSafetyItem ? 1.6 : 1.0

    const itemScore = rawFreq * onsetMult * safetyMult
    const itemMax = 3.0 * 1.35 * safetyMult

    totalWeightedScore += itemScore
    maxPossibleScore += itemMax

    const d = item.domain || "memory"
    if (domainTotals[d]) {
      domainTotals[d].current += itemScore
      domainTotals[d].max += itemMax
    }

    if (
      item.isSafetyItem &&
      (item.frequency === "sometimes" || item.frequency === "often")
    ) {
      safetyFlagCount++
      if (item.onset === "under_6_months" || item.onset === "6_to_12_months") {
        recentOnsetSafetyCount++
      }
    }
  }

  const rawPercentage =
    maxPossibleScore > 0 ? (totalWeightedScore / maxPossibleScore) * 100 : 0
  const adjustedScore = Math.round(
    Math.min(100, Math.max(0, rawPercentage * reliabilityMultiplier)),
  )

  const domainScores: Record<string, number> = {}
  for (const [key, val] of Object.entries(domainTotals)) {
    domainScores[key] =
      val.max > 0 ? Math.round((val.current / val.max) * 100) : 0
  }

  return {
    overallScore: adjustedScore,
    domainScores,
    safetyFlagCount,
    recentOnsetSafetyCount,
  }
}

/**
 * Persist Family Setup to IndexedDB and sync to cloud
 */
export async function saveFamilySetup(
  record: FamilySetupRecord,
): Promise<void> {
  record.updatedAt = new Date().toISOString()
  record.version = (record.version || 1) + 1

  try {
    localStorage.setItem(
      `${FAMILY_SETUP_STORAGE_KEY_PREFIX}${record.patientId}`,
      JSON.stringify(record),
    )
  } catch {}

  // Sync to Supabase user metadata
  try {
    if (supabase) {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user?.id) {
        await supabase.auth.updateUser({
          data: {
            family_setup_version: record.version,
            family_setup_updated: record.updatedAt,
            elder_profile: record.elderProfile,
            life_facts_summary: {
              total_facts: record.lifeFacts.length,
              scorable_facts: record.lifeFacts.filter((f) => !f.isSensitive)
                .length,
            },
          },
        })
      }
    }
  } catch {}
}

export function loadFamilySetup(
  patientId: string,
  elderName = "Rama Devi",
): FamilySetupRecord {
  try {
    const raw = localStorage.getItem(
      `${FAMILY_SETUP_STORAGE_KEY_PREFIX}${patientId}`,
    )
    if (raw) {
      return JSON.parse(raw) as FamilySetupRecord
    }
  } catch {}

  return generateInitialSetup(patientId, elderName)
}
