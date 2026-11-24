/**
 * NeuroSense Family Setup & Life Facts Type Definitions
 * =====================================================
 */

export type FactCategory = "people" | "place" | "history" | "preference" | "recent_event"

export interface LifeFactItem {
  id: string
  factKey: string // e.g. "child_name", "spouse_name", "wedding_year"
  defaultPrompt: Record<string, string> // Prompts per language
  questionText: string // The exact localized question
  verifiedAnswer: string // Canonical verified truth
  acceptedAliases: string[] // Nicknames, alternative spellings, phonetic variants
  category: FactCategory
  cue: string // Stage 2 retrieval hint
  distractors: [string, string] // Stage 3 recognition distractors (must be plausible but wrong)
  isSensitive: boolean // If sensitive, excluded from scoring
  isRecentEvent?: boolean // True for recent events (7-14 days)
  eventDate?: string // Required for recent events; used to check expiration
  isNumeric?: boolean // For marriage year / years married
}

export type FrequencyRating = "never" | "rarely" | "sometimes" | "often"
export type OnsetTimeline = "under_6_months" | "6_to_12_months" | "1_to_3_years" | "over_3_years" | "not_sure"

export type QuestionnaireDomain = "memory" | "orientation" | "daily_tasks_money" | "language" | "behaviour_mood" | "safety"

export interface DailyLifeQuestionItem {
  id: string
  domain: QuestionnaireDomain
  isSafetyItem: boolean
  questionText: string
  frequency: FrequencyRating
  onset: OnsetTimeline
  exampleNote?: string
}

export interface ConfoundersData {
  hearingDifficulty: boolean
  hasHearingAid: boolean
  visionDifficulty: boolean
  poorSleepRecently: boolean
  recentBereavement: boolean
  recentIllnessOrHospitalStay: boolean
  sedatingMedicines: boolean
  alcoholUse: boolean
  todayStateTired: boolean
  todayStateUnwellOrAnxious: boolean
  otherNotes?: string
}

export interface ElderProfileData {
  fullName: string
  nickname?: string
  age: number
  dateOfBirth?: string
  gender: "Male" | "Female" | "Other"
  languagesSpoken: string[]
  preferredTestingLanguage: "en" | "hi" | "kn" | string
  dialectOrRegion: string
  schoolingYears: number // e.g. 0 to 20
  literacyStatus: "can_read_write" | "can_read_only" | "cannot_read_write"
  informantName: string
  informantRelationship: "Child" | "Spouse" | "Grandchild" | "Sibling" | "ASHA Worker" | "Other"
  informantMeetingFrequency: "daily" | "weekly" | "rarely"
  livingArrangement: "with_family" | "alone" | "assisted_care"
}

export interface FamilySetupRecord {
  id: string
  patientId: string
  version: number
  createdAt: string
  updatedAt: string
  elderProfile: ElderProfileData
  lifeFacts: LifeFactItem[]
  dailyLifeQuestionnaire: DailyLifeQuestionItem[]
  confounders: ConfoundersData
  consent: {
    informantConsentGiven: boolean
    informantConsentTimestamp: string
    informantConsentSignatureOrName: string
    elderSpokenAssentGiven: boolean
    elderAssentTimestamp?: string
  }
}
