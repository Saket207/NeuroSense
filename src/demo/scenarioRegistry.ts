/**
 * NeuroSense Demo Studio - Scenario Registry & Dynamic Loader
 * ============================================================
 * Provides scenario metadata for the 6 fictional demo personas,
 * dynamically loads scenario profiles and spoken scripts,
 * and rebases stale recent event dates so tests stay fresh.
 */

import { DemoScenarioId, DemoScenarioMeta, ScenarioScriptData } from "./types"
import { FamilySetupRecord } from "../types/familySetup"

export const DEMO_SCENARIOS: DemoScenarioMeta[] = [
  {
    id: "lakshmi",
    name: "Lakshmi Sundaram",
    demographics: "72F • Kannada • Rural/Semi-urban",
    language: "kn",
    languageName: "Kannada (ಕನ್ನಡ)",
    designTier: "green",
    designTierLabel: "Normal / Low Concern (Green)",
    summary:
      "Normal age-appropriate recall with preserved recent memory and zero daily-life concerns reported by daughter.",
    keyFactsPreview: [
      "Son Ramesh",
      "Granddaughter Ananya",
      "Born in Mysuru",
      "Teacher",
      "Recent: Grandson Rohan visit",
    ],
    audioFileCount: 12,
  },
  {
    id: "ramesh",
    name: "Ramesh Verma",
    demographics: "68M • Hindi • Rural",
    language: "hi",
    languageName: "Hindi (हिन्दी)",
    designTier: "amber",
    designTierLabel: "Mild Memory Complaint (Amber/Green)",
    summary:
      "Mild memory complaint with low formal schooling (3 years). Preserved episodic memories with education-adjusted threshold.",
    keyFactsPreview: [
      "Daughter Sunita",
      "Grandson Amit",
      "Sitapur village",
      "Farming",
      "Recent: Ghat walk",
    ],
    audioFileCount: 12,
  },
  {
    id: "savitri",
    name: "Savitri Nair",
    demographics: "75F • English • Urban",
    language: "en",
    languageName: "English",
    designTier: "amber",
    designTierLabel: "Progressive Mild Impairment (Amber)",
    summary:
      "Documented progressive MCI across 3 longitudinal sessions (6m ago CSI=90.6 Green, 3m ago CSI=63.9 Amber). Shows episodic recall gap.",
    keyFactsPreview: [
      "Daughter Deepa",
      "Born Kottayam",
      "Nurse",
      "St Jude Church",
      "Recent: Sunil visit (cued)",
    ],
    audioFileCount: 12,
  },
  {
    id: "abdul",
    name: "Abdul Kareem",
    demographics: "80M • Hindi • Urban",
    language: "hi",
    languageName: "Hindi (हिन्दी)",
    designTier: "red",
    designTierLabel: "Multi-Domain Moderate Decline (Red)",
    summary:
      "Multi-domain moderate cognitive decline with recent stove safety hazard and episodic gap.",
    keyFactsPreview: [
      "Son Tariq",
      "Granddaughter Zoya",
      "Lucknow",
      "Shopkeeper",
      "Stove left unattended hazard",
    ],
    audioFileCount: 12,
  },
  {
    id: "kamala",
    name: "Kamala Rao",
    demographics: "70F • Kannada • Semi-urban",
    language: "kn",
    languageName: "Kannada (ಕನ್ನಡ)",
    designTier: "green",
    designTierLabel: "Low Schooling, High Recall (Green)",
    summary:
      "Low schooling (4 years), high episodic recall. Proves education independence without literacy bias.",
    keyFactsPreview: [
      "Son Prasad",
      "Grandson Varun",
      "Shivamogga",
      "Homemaker",
      "Recent: ISKCON temple",
    ],
    audioFileCount: 12,
  },
  {
    id: "narayan",
    name: "Narayan Hegde",
    demographics: "77M • Kannada • Rural",
    language: "kn",
    languageName: "Kannada (ಕನ್ನಡ)",
    designTier: "inconclusive",
    designTierLabel: "Confounders & Noise Check (Inconclusive)",
    summary:
      "Hearing loss and high acoustic background noise (SNR 7dB). Confidence drops below 50% yielding Inconclusive referral tier.",
    keyFactsPreview: [
      "Son Shashi",
      "Dharwad",
      "Clerk",
      "Hearing difficulty flagged",
      "High ambient noise",
    ],
    audioFileCount: 12,
  },
]

/**
 * Dynamically rebases stale recent-event dates so tests stay fresh.
 * If older than 14 days, adjusts eventDate to (today - 3 days) and (today - 6 days).
 */
export function rebaseRecentEventDates(
  profile: FamilySetupRecord,
): FamilySetupRecord {
  const now = new Date()
  const todayMs = now.getTime()
  let adjustedCount = 0

  const rebasedFacts = profile.lifeFacts.map((fact) => {
    if (fact.category === "recent_event" || fact.isRecentEvent) {
      let isStale = true
      if (fact.eventDate) {
        const eventMs = new Date(fact.eventDate).getTime()
        const ageDays = (todayMs - eventMs) / (1000 * 3600 * 24)
        if (ageDays >= 0 && ageDays <= 14) {
          isStale = false
        }
      }

      if (isStale) {
        adjustedCount++
        const offsetDays = adjustedCount === 1 ? 3 : 6
        const newDate = new Date(todayMs - offsetDays * 86400000)
          .toISOString()
          .slice(0, 10)
        return {
          ...fact,
          eventDate: newDate,
        }
      }
    }
    return fact
  })

  if (adjustedCount > 0) {
    console.info(
      `[DemoStudio] Rebased ${adjustedCount} recent event date(s) for scenario ${profile.patientId} to stay fresh relative to today (${now.toISOString().slice(0, 10)}).`,
    )
  }

  return {
    ...profile,
    lifeFacts: rebasedFacts,
  }
}

/**
 * Loads the complete scenario profile from static files or API.
 */
export async function loadScenarioProfile(
  scenarioId: DemoScenarioId,
): Promise<FamilySetupRecord> {
  const url = `/demo/scenarios/${scenarioId}/profile.json`
  try {
    const res = await fetch(url)
    if (res.ok) {
      const data = await res.json()
      return rebaseRecentEventDates(data)
    }
  } catch (err) {
    console.warn(
      `[DemoStudio] Could not fetch profile from ${url}, attempting direct API...`,
      err,
    )
  }

  // Fallback to localhost backend mount if running with Vite proxy
  const apiUrl = `http://localhost:8001/demo/scenarios/${scenarioId}/profile.json`
  const fallbackRes = await fetch(apiUrl)
  if (!fallbackRes.ok) {
    throw new Error(
      `Failed to load scenario profile for ${scenarioId} from both local static and backend.`,
    )
  }
  const fallbackData = await fallbackRes.json()
  return rebaseRecentEventDates(fallbackData)
}

/**
 * Loads scenario spoken script
 */
export async function loadScenarioScript(
  scenarioId: DemoScenarioId,
): Promise<ScenarioScriptData> {
  const url = `/demo/scenarios/${scenarioId}/answers_script.json`
  try {
    const res = await fetch(url)
    if (res.ok) {
      return await res.json()
    }
  } catch {}

  const apiUrl = `http://localhost:8001/demo/scenarios/${scenarioId}/answers_script.json`
  const fallbackRes = await fetch(apiUrl)
  return await fallbackRes.json()
}

/**
 * Loads backdated historical sessions if available
 */
export async function loadScenarioHistory(
  scenarioId: DemoScenarioId,
): Promise<any[]> {
  const url = `/demo/scenarios/${scenarioId}/history/sessions.json`
  try {
    const res = await fetch(url)
    if (res.ok) {
      return await res.json()
    }
  } catch {}

  try {
    const apiUrl = `http://localhost:8001/demo/scenarios/${scenarioId}/history/sessions.json`
    const fallbackRes = await fetch(apiUrl)
    if (fallbackRes.ok) {
      return await fallbackRes.json()
    }
  } catch {}

  return []
}
