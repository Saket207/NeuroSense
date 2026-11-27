import React, { useState, useEffect } from "react"
import {
  FamilySetupRecord,
  LifeFactItem,
  DailyLifeQuestionItem,
  ElderProfileData,
  ConfoundersData,
} from "../../types/familySetup"
import {
  generateInitialSetup,
  loadFamilySetup,
  saveFamilySetup,
  validateLifeFactsForScreening,
} from "../../services/familySetupStorage"
import { getUIString } from "../../services/languageRegistry"
import { DEMO_SCENARIOS } from "../../demo/scenarioRegistry"

interface FamilySetupWizardProps {
  patientId: string
  elderName?: string
  onComplete: (setup: FamilySetupRecord) => void
  onCancel: () => void
}

const STEPS = [
  { id: 1, label: "Elder Profile", icon: "👤" },
  { id: 2, label: "Life Facts", icon: "📖" },
  { id: 3, label: "Daily Life (5 yrs)", icon: "📋" },
  { id: 4, label: "Health Checks", icon: "🩺" },
  { id: 5, label: "Consent & Review", icon: "✍️" },
]

export default function FamilySetupWizard({
  patientId,
  elderName = "Elder",
  onComplete,
  onCancel,
}: FamilySetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [setup, setSetup] = useState<FamilySetupRecord>(() =>
    generateInitialSetup(patientId, elderName),
  )
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState("")

  // Quick Demo Autofill State
  const [demoScenarioChoice, setDemoScenarioChoice] = useState("lakshmi")
  const [isAutofillingDemo, setIsAutofillingDemo] = useState(false)

  const handleQuickAutofill = async () => {
    setIsAutofillingDemo(true)
    try {
      let data: any
      try {
        const res = await fetch(
          `/demo/scenarios/${demoScenarioChoice}/profile.json`,
        )
        if (res.ok) data = await res.json()
      } catch {}

      if (!data) {
        const fallbackRes = await fetch(
          `http://localhost:8001/demo/scenarios/${demoScenarioChoice}/profile.json`,
        )
        data = await fallbackRes.json()
      }

      // Rebase recent events
      const now = new Date()
      data.lifeFacts = data.lifeFacts.map((fact: any) => {
        if (fact.category === "recent_event" || fact.isRecentEvent) {
          return {
            ...fact,
            eventDate: new Date(now.getTime() - 3 * 86400000)
              .toISOString()
              .slice(0, 10),
          }
        }
        return fact
      })

      setSetup(data)
      await saveFamilySetup(data)
      setStatusMsg(
        `Loaded ${data.elderProfile.fullName} scenario. All 5 steps filled!`,
      )
    } catch (e) {
      console.warn("Could not autofill scenario:", e)
      setStatusMsg("Failed to load demo scenario.")
    } finally {
      setIsAutofillingDemo(false)
    }
  }

  // Edit Fact Modal State
  const [editingFact, setEditingFact] = useState<LifeFactItem | null>(null)
  const [aliasInput, setAliasInput] = useState("")

  useEffect(() => {
    let isMounted = true
    async function load() {
      try {
        const existing = await loadFamilySetup(patientId)
        if (existing && isMounted) {
          setSetup(existing)
        }
      } catch (err) {
        console.warn(
          "Could not load existing family setup, using defaults",
          err,
        )
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [patientId])

  const handleSaveDraft = async () => {
    setSaving(true)
    try {
      await saveFamilySetup(setup)
      setStatusMsg("Draft saved successfully")
      setTimeout(() => setStatusMsg(""), 2500)
    } catch {
      setStatusMsg("Failed to save draft")
    } finally {
      setSaving(false)
    }
  }

  const handleProfileChange = (field: keyof ElderProfileData, value: any) => {
    setSetup((prev) => ({
      ...prev,
      elderProfile: {
        ...prev.elderProfile,
        [field]: value,
      },
    }))
  }

  const handleConfounderToggle = (field: keyof ConfoundersData) => {
    setSetup((prev) => ({
      ...prev,
      confounders: {
        ...prev.confounders,
        [field]: !prev.confounders[field],
      },
    }))
  }

  const handleQuestionnaireChange = (
    itemId: string,
    field: "frequency" | "onset",
    val: any,
  ) => {
    setSetup((prev) => ({
      ...prev,
      dailyLifeQuestionnaire: prev.dailyLifeQuestionnaire.map((q) =>
        q.id === itemId ? { ...q, [field]: val } : q,
      ),
    }))
  }

  const handleSaveEditedFact = () => {
    if (!editingFact) return
    const aliasesArray = aliasInput
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a.length > 0)

    const updatedFact: LifeFactItem = {
      ...editingFact,
      acceptedAliases: aliasesArray,
    }

    setSetup((prev) => ({
      ...prev,
      lifeFacts: prev.lifeFacts.map((f) =>
        f.id === updatedFact.id ? updatedFact : f,
      ),
    }))
    setEditingFact(null)
    setAliasInput("")
  }

  const validation = validateLifeFactsForScreening(setup.lifeFacts)

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600 font-medium">
          Loading Family Memory Setup...
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col my-2">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 p-5 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
              Personalized Screening Setup
            </span>
            <h2 className="text-xl font-bold">
              Family-Verified Life Memory Check
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-white/80 hover:text-white text-sm bg-white/10 px-3 py-1.5 rounded-lg border border-white/20"
          >
            Exit
          </button>
        </div>

        {/* Steps Progress */}
        <div className="grid grid-cols-5 gap-1.5 pt-2">
          {STEPS.map((s) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(s.id)}
              className={`flex flex-col items-center py-1.5 px-1 rounded-lg text-xs transition-all ${
                currentStep === s.id
                  ? "bg-white text-indigo-900 font-bold shadow-md"
                  : currentStep > s.id
                    ? "bg-white/25 text-white"
                    : "bg-white/10 text-white/60"
              }`}
            >
              <span className="text-sm">{s.icon}</span>
              <span className="truncate w-full text-center hidden sm:inline">
                {s.label}
              </span>
              <span className="text-[10px] sm:hidden font-mono">
                Step {s.id}
              </span>
            </button>
          ))}
        </div>
      </div>

      {statusMsg && (
        <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs px-4 py-2 font-medium flex items-center justify-between">
          <span>{statusMsg}</span>
          <button
            onClick={() => setStatusMsg("")}
            className="text-emerald-600 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="p-5 flex-1 overflow-y-auto max-h-[65vh]">
        {/* Quick Demo Autofill Bar */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3 mb-4 flex flex-wrap items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <div>
              <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <span>Demo Studio Autofill</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 text-[10px]">
                  Fills all 5 steps
                </span>
              </div>
              <div className="text-[10px] text-amber-800">
                Instantly fills Elder Profile, 12 Life Facts, 16 Questions, and
                Health Checks.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={demoScenarioChoice}
              onChange={(e) => setDemoScenarioChoice(e.target.value)}
              className="bg-white border border-amber-300 text-amber-950 text-xs rounded-lg px-2.5 py-1 font-medium cursor-pointer shadow-inner"
            >
              <optgroup label="English Profiles (3)">
                {DEMO_SCENARIOS.filter((s) => s.language === "en").map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.languageName} • {s.designTier.toUpperCase()})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Hindi Profiles (3)">
                {DEMO_SCENARIOS.filter((s) => s.language === "hi").map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.languageName} • {s.designTier.toUpperCase()})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Kannada Profiles (3)">
                {DEMO_SCENARIOS.filter((s) => s.language === "kn").map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.languageName} • {s.designTier.toUpperCase()})
                  </option>
                ))}
              </optgroup>
            </select>
            <button
              type="button"
              onClick={handleQuickAutofill}
              disabled={isAutofillingDemo}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1"
            >
              <span>
                {isAutofillingDemo ? "Filling..." : "⚡ Autofill Everything"}
              </span>
            </button>
          </div>
        </div>

        {/* STEP 1: Elder Profile */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">
                Elder Profile & Background
              </h3>
              <p className="text-xs text-gray-500">
                Helps adapt questions to their lived background and ensures fair
                evaluation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Elder Full Name
                </label>
                <input
                  type="text"
                  value={setup.elderProfile.fullName}
                  onChange={(e) =>
                    handleProfileChange("fullName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Rama Devi"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Approximate Age
                </label>
                <input
                  type="number"
                  value={setup.elderProfile.age}
                  onChange={(e) =>
                    handleProfileChange("age", parseInt(e.target.value) || 70)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  min="40"
                  max="120"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Testing Voice Language
                </label>
                <select
                  value={setup.elderProfile.preferredTestingLanguage}
                  onChange={(e) =>
                    handleProfileChange(
                      "preferredTestingLanguage",
                      e.target.value,
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi (हिन्दी)</option>
                  <option value="kn">Kannada (ಕನ್ನಡ)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Years of Schooling / Education
                </label>
                <input
                  type="number"
                  value={setup.elderProfile.schoolingYears}
                  onChange={(e) =>
                    handleProfileChange(
                      "schoolingYears",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  min="0"
                  max="25"
                />
                <span className="text-[11px] text-gray-500 mt-1 block">
                  Zero schooling is completely fine; lived memory tests require
                  no literacy.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Family Member Completing This
                </label>
                <input
                  type="text"
                  value={setup.elderProfile.informantName}
                  onChange={(e) =>
                    handleProfileChange("informantName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  How Often Do You Interact?
                </label>
                <select
                  value={setup.elderProfile.informantMeetingFrequency}
                  onChange={(e) =>
                    handleProfileChange(
                      "informantMeetingFrequency",
                      e.target.value,
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="daily">
                    Live together / Daily (Most reliable)
                  </option>
                  <option value="several_per_week">Several times a week</option>
                  <option value="weekly">Weekly visits</option>
                  <option value="rarely">Monthly or occasional calls</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Life Facts */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Life Facts & Recent Events
                </h3>
                <p className="text-xs text-gray-500">
                  Record verified facts from their life. The elder will be asked
                  these directly.
                </p>
              </div>
              <div
                className={`text-xs px-3 py-1.5 rounded-full font-bold self-start ${
                  validation.isValid
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {validation.scorableCount} / 8 Facts Ready
              </div>
            </div>

            {!validation.isValid && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3 rounded-lg">
                ⚠️ Need at least 8 scorable facts and 1 recent event from the
                last 14 days to start screening.
              </div>
            )}

            <div className="space-y-3">
              {setup.lifeFacts.map((fact) => {
                const isRecent = fact.category === "recent_event"
                return (
                  <div
                    key={fact.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      fact.isSensitive
                        ? "bg-gray-50 border-gray-200 opacity-60"
                        : "bg-white border-gray-200 hover:border-indigo-300 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              isRecent
                                ? "bg-purple-100 text-purple-700 font-semibold"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {isRecent
                              ? "Recent Event (Last 14d)"
                              : fact.category}
                          </span>
                          {fact.isSensitive && (
                            <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md">
                              Skipped
                            </span>
                          )}
                        </div>

                        <p className="text-xs font-semibold text-gray-900 mb-1">
                          Q:{" "}
                          {fact.defaultPrompt?.[
                            setup.elderProfile.preferredTestingLanguage
                          ] || fact.questionText}
                        </p>

                        <div className="text-xs text-gray-700 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>
                            <strong>Answer:</strong>{" "}
                            <span className="text-indigo-700 font-semibold">
                              {fact.verifiedAnswer || "(Click edit to enter)"}
                            </span>
                          </span>
                          {fact.acceptedAliases.length > 0 && (
                            <span className="text-gray-500">
                              Aliases: {fact.acceptedAliases.join(", ")}
                            </span>
                          )}
                          {isRecent && fact.eventDate && (
                            <span className="text-purple-600 font-medium">
                              📅 Date: {fact.eventDate}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 items-end">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingFact(fact)
                            setAliasInput(fact.acceptedAliases.join(", "))
                          }}
                          className="px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-md"
                        >
                          Edit Fact
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Daily-Life Changes Questionnaire */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">
                Daily-Life Changes (Compared to 5 Years Ago)
              </h3>
              <p className="text-xs text-gray-500">
                Informant report: Compare how the elder manages tasks now vs 5
                years ago.
              </p>
            </div>

            <div className="space-y-3">
              {setup.dailyLifeQuestionnaire.map((item, idx) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border ${
                    item.isSafetyItem
                      ? "border-red-200 bg-red-50/30"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-gray-900">
                      {idx + 1}. {item.questionText}
                    </span>
                    {item.isSafetyItem && (
                      <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-md shrink-0">
                        Safety Critical
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">
                        Frequency:
                      </label>
                      <select
                        value={item.frequency}
                        onChange={(e) =>
                          handleQuestionnaireChange(
                            item.id,
                            "frequency",
                            e.target.value,
                          )
                        }
                        className="w-full text-xs p-1.5 border border-gray-300 rounded-md bg-white"
                      >
                        <option value="never">Never / No change</option>
                        <option value="rarely">Rarely</option>
                        <option value="sometimes">Sometimes</option>
                        <option value="often">
                          Often / Frequent difficulty
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">
                        First Noticed:
                      </label>
                      <select
                        value={item.onset}
                        onChange={(e) =>
                          handleQuestionnaireChange(
                            item.id,
                            "onset",
                            e.target.value,
                          )
                        }
                        className="w-full text-xs p-1.5 border border-gray-300 rounded-md bg-white"
                      >
                        <option value="under_6_months">
                          Under 6 months ago (Recent)
                        </option>
                        <option value="6_to_12_months">
                          6 to 12 months ago
                        </option>
                        <option value="1_to_3_years">1 to 3 years ago</option>
                        <option value="over_3_years">Over 3 years ago</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Confounders Checklist */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">
                Clinical Confounders & State
              </h3>
              <p className="text-xs text-gray-500">
                Check any temporary or sensory factors. These do not mean
                dementia, but help doctors interpret results.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  key: "hearingDifficulty",
                  label: "Hearing difficulty or uncorrected hearing loss",
                },
                {
                  key: "hasHearingAid",
                  label: "Uses a hearing aid (ensure it is worn and turned on)",
                },
                {
                  key: "visionDifficulty",
                  label: "Significant vision difficulty",
                },
                {
                  key: "poorSleepRecently",
                  label: "Poor sleep or insomnia in the last 48 hours",
                },
                {
                  key: "recentBereavement",
                  label: "Recent bereavement or severe emotional grief",
                },
                {
                  key: "recentIllnessOrHospitalStay",
                  label: "Acute illness, fever, or recent hospital discharge",
                },
                {
                  key: "sedatingMedicines",
                  label:
                    "Taking sedating medications (sleeping pills, antihistamines)",
                },
                {
                  key: "todayStateTired",
                  label: "Elder feels very tired or fatigued today",
                },
                {
                  key: "todayStateUnwellOrAnxious",
                  label:
                    "Elder feels anxious, uneasy, or reluctant to be tested",
                },
              ].map(({ key, label }) => {
                const checked = Boolean(
                  setup.confounders[(key as keyof ConfoundersData)],
                )
                return (
                  <label
                    key={key}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      checked
                        ? "bg-amber-50 border-amber-300 text-amber-900"
                        : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        handleConfounderToggle(key as keyof ConfoundersData)
                      }
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-medium">{label}</span>
                  </label>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Consent & Review */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">
                Review & Informed Consent
              </h3>
              <p className="text-xs text-gray-500">
                Please verify details and confirm family and participant consent
                before testing.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl space-y-3 text-xs text-gray-700 border border-gray-200">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Elder:</span>
                <span className="font-bold text-gray-900">
                  {setup.elderProfile.fullName} ({setup.elderProfile.age} yrs,{" "}
                  {setup.elderProfile.gender})
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Testing Language:</span>
                <span className="font-bold text-indigo-700 uppercase">
                  {setup.elderProfile.preferredTestingLanguage}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Verified Life Facts Ready:</span>
                <span className="font-bold text-emerald-700">
                  {validation.scorableCount} facts (
                  {setup.lifeFacts.filter((f) => f.isRecentEvent).length}{" "}
                  recent)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Informant Contact:</span>
                <span className="font-bold text-gray-900">
                  {setup.elderProfile.informantName} (
                  {setup.elderProfile.informantRelationship})
                </span>
              </div>
            </div>

            {/* Mandatory Non-Diagnostic Disclaimer Box */}
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs leading-relaxed">
              <strong>Mandatory Notice:</strong> This is a preliminary screening
              aid and clinical referral support tool, NOT a diagnostic
              evaluation. Only a registered physician or neurologist can
              diagnose cognitive conditions. Results are sensitive to fatigue,
              hearing, and mood.
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-800">
                <input
                  type="checkbox"
                  checked={setup.consent.informantConsentGiven}
                  onChange={(e) =>
                    setSetup((prev) => ({
                      ...prev,
                      consent: {
                        ...prev.consent,
                        informantConsentGiven: e.target.checked,
                      },
                    }))
                  }
                  className="mt-0.5 w-4 h-4 text-indigo-600 rounded border-gray-300"
                />
                <span>
                  I confirm that the recorded life facts are accurate to the
                  best of my knowledge and give consent for this screening
                  session.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-800">
                <input
                  type="checkbox"
                  checked={setup.consent.elderSpokenAssentGiven}
                  onChange={(e) =>
                    setSetup((prev) => ({
                      ...prev,
                      consent: {
                        ...prev.consent,
                        elderSpokenAssentGiven: e.target.checked,
                      },
                    }))
                  }
                  className="mt-0.5 w-4 h-4 text-indigo-600 rounded border-gray-300"
                />
                <span>
                  The elder has been informed and given spoken assent to
                  participate comfortably without pressure.
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <div>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-white"
            >
              Back
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={saving}
            className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              Next Step →
            </button>
          ) : (
            <button
              type="button"
              onClick={async () => {
                await saveFamilySetup(setup)
                onComplete(setup)
              }}
              disabled={
                !setup.consent.informantConsentGiven || !validation.isValid
              }
              className={`px-5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${
                setup.consent.informantConsentGiven && validation.isValid
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save & Start Screening 🚀
            </button>
          )}
        </div>
      </div>

      {/* Edit Fact Modal */}
      {editingFact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-2">
              <h4 className="font-bold text-gray-900 text-sm">
                Edit Life Fact Target & Hints
              </h4>
              <button
                onClick={() => setEditingFact(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Question (Prompt for{" "}
                  {setup.elderProfile.preferredTestingLanguage}):
                </label>
                <input
                  type="text"
                  value={
                    editingFact.defaultPrompt?.[
                      setup.elderProfile.preferredTestingLanguage
                    ] || editingFact.questionText
                  }
                  onChange={(e) =>
                    setEditingFact({
                      ...editingFact,
                      questionText: e.target.value,
                      defaultPrompt: {
                        ...editingFact.defaultPrompt,
                        [setup.elderProfile.preferredTestingLanguage]:
                          e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Verified Target Answer:
                </label>
                <input
                  type="text"
                  value={editingFact.verifiedAnswer}
                  onChange={(e) =>
                    setEditingFact({
                      ...editingFact,
                      verifiedAnswer: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md font-semibold text-indigo-700"
                  placeholder="e.g. Bangalore, 1974, Teacher"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Accepted Nicknames / Aliases (comma-separated):
                </label>
                <input
                  type="text"
                  value={aliasInput}
                  onChange={(e) => setAliasInput(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. Bengaluru, Bangalore city, garden city"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Hint / Cue for Level 2:
                </label>
                <input
                  type="text"
                  value={editingFact.cue || ""}
                  onChange={(e) =>
                    setEditingFact({ ...editingFact, cue: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. It is in southern Karnataka"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Distractor 1 (Level 3 option):
                  </label>
                  <input
                    type="text"
                    value={editingFact.distractors?.[0] || ""}
                    onChange={(e) => {
                      const d0 = e.target.value
                      const d1 = editingFact.distractors?.[1] || ""
                      setEditingFact({ ...editingFact, distractors: [d0, d1] })
                    }}
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g. Mysore"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Distractor 2 (Level 3 option):
                  </label>
                  <input
                    type="text"
                    value={editingFact.distractors?.[1] || ""}
                    onChange={(e) => {
                      const d0 = editingFact.distractors?.[0] || ""
                      const d1 = e.target.value
                      setEditingFact({ ...editingFact, distractors: [d0, d1] })
                    }}
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g. Hubli"
                  />
                </div>
              </div>

              {editingFact.category === "recent_event" && (
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Event Date (Must be within 14 days):
                  </label>
                  <input
                    type="date"
                    value={editingFact.eventDate || ""}
                    onChange={(e) =>
                      setEditingFact({
                        ...editingFact,
                        eventDate: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              )}

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingFact.isSensitive || false}
                    onChange={(e) =>
                      setEditingFact({
                        ...editingFact,
                        isSensitive: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span className="text-gray-700">
                    Skip this question (topic is sensitive or cause for grief)
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t pt-3">
              <button
                type="button"
                onClick={() => setEditingFact(null)}
                className="px-3 py-1.5 border rounded-lg text-xs font-semibold text-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEditedFact}
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold"
              >
                Save Fact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
