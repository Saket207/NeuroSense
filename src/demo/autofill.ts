/**
 * NeuroSense Demo Studio - Animated Live Autofill Engine
 * ======================================================
 * Animates form field typing into FamilySetupWizard with human-like cadence,
 * dynamic field highlighting, step transitions, and pause/skip controls.
 */

import { AutofillSpeed } from "./types"
import { FamilySetupRecord } from "../types/familySetup"

export interface AutofillCallbacks {
  onStepChange?: (step: number) => void
  onFieldFocus?: (fieldId: string, label: string) => void
  onFieldType?: (fieldId: string, text: string) => void
  onFieldBlur?: (fieldId: string) => void
  onProgress?: (percent: number, statusText: string) => void
  onSetupUpdate?: (setup: FamilySetupRecord) => void
  onComplete?: (finalSetup: FamilySetupRecord) => void
  onError?: (error: any) => void
}

export class ScenarioAutofillRunner {
  private speed: AutofillSpeed = "natural"
  private isPaused: boolean = false
  private isAborted: boolean = false
  private isSkipping: boolean = false
  private pauseResolver: (() => void) | null = null

  constructor(speed: AutofillSpeed = "natural") {
    this.speed = speed
  }

  public setSpeed(speed: AutofillSpeed) {
    this.speed = speed
  }

  public pause() {
    this.isPaused = true
  }

  public resume() {
    if (this.isPaused) {
      this.isPaused = false
      if (this.pauseResolver) {
        this.pauseResolver()
        this.pauseResolver = null
      }
    }
  }

  public skipAnimation() {
    this.isSkipping = true
    this.resume()
  }

  public abort() {
    this.isAborted = true
    this.resume()
  }

  private async sleep(ms: number): Promise<void> {
    if (this.isSkipping || this.speed === "instant") return
    if (this.isAborted) throw new Error("Autofill aborted")

    if (this.isPaused) {
      await new Promise<void>((resolve) => {
        this.pauseResolver = resolve
      })
    }

    const factor = this.speed === "fast" ? 0.2 : 1.0
    const delay = Math.round(ms * factor)
    return new Promise((resolve) => setTimeout(resolve, delay))
  }

  private async typeString(
    fieldId: string,
    targetText: string,
    onType?: (fieldId: string, text: string) => void,
  ): Promise<void> {
    if (this.isSkipping || this.speed === "instant") {
      onType?.(fieldId, targetText)
      return
    }

    let current = ""
    for (let i = 0; i < targetText.length; i++) {
      if (this.isAborted) throw new Error("Autofill aborted")
      current += targetText[i]
      onType?.(fieldId, current)
      // Human-like character cadence (30-65ms)
      const charDelay = 30 + Math.random() * 35
      await this.sleep(charDelay)
    }
    // Pause briefly after finishing typing a field
    await this.sleep(200)
  }

  public async run(
    targetSetup: FamilySetupRecord,
    initialSetup: FamilySetupRecord,
    callbacks: AutofillCallbacks,
  ): Promise<void> {
    this.isAborted = false
    this.isPaused = false
    this.isSkipping = this.speed === "instant"

    const currentSetup: FamilySetupRecord = JSON.parse(
      JSON.stringify(initialSetup),
    )

    try {
      callbacks.onProgress?.(5, "Initializing Elder Profile...")

      // STEP 1: Elder Profile
      callbacks.onStepChange?.(1)
      await this.sleep(400)

      callbacks.onFieldFocus?.("elder_name", "Full Name")
      await this.typeString(
        "elder_name",
        targetSetup.elderProfile.fullName,
        callbacks.onFieldType,
      )
      currentSetup.elderProfile.fullName = targetSetup.elderProfile.fullName
      callbacks.onSetupUpdate?.({ ...currentSetup })
      callbacks.onFieldBlur?.("elder_name")

      callbacks.onFieldFocus?.("elder_age", "Age")
      await this.typeString(
        "elder_age",
        String(targetSetup.elderProfile.age),
        callbacks.onFieldType,
      )
      currentSetup.elderProfile.age = targetSetup.elderProfile.age
      callbacks.onSetupUpdate?.({ ...currentSetup })
      callbacks.onFieldBlur?.("elder_age")

      currentSetup.elderProfile.gender = targetSetup.elderProfile.gender
      currentSetup.elderProfile.schoolingYears =
        targetSetup.elderProfile.schoolingYears
      currentSetup.elderProfile.literacyStatus =
        targetSetup.elderProfile.literacyStatus
      currentSetup.elderProfile.preferredTestingLanguage =
        targetSetup.elderProfile.preferredTestingLanguage
      currentSetup.elderProfile.languagesSpoken = [
        ...targetSetup.elderProfile.languagesSpoken,
      ]
      currentSetup.elderProfile.informantName =
        targetSetup.elderProfile.informantName
      currentSetup.elderProfile.informantRelationship =
        targetSetup.elderProfile.informantRelationship
      currentSetup.elderProfile.informantMeetingFrequency =
        targetSetup.elderProfile.informantMeetingFrequency
      callbacks.onSetupUpdate?.({ ...currentSetup })

      callbacks.onProgress?.(
        25,
        "Elder Profile completed. Loading Life Facts...",
      )
      await this.sleep(500)

      // STEP 2: Life Facts
      callbacks.onStepChange?.(2)
      await this.sleep(400)

      currentSetup.lifeFacts = JSON.parse(JSON.stringify(targetSetup.lifeFacts))
      callbacks.onSetupUpdate?.({ ...currentSetup })

      // Animate filling verified answers into the first 3 key facts
      for (let i = 0; i < Math.min(3, currentSetup.lifeFacts.length); i++) {
        const fact = currentSetup.lifeFacts[i]
        callbacks.onFieldFocus?.(`fact_${fact.id}`, fact.questionText)
        await this.typeString(
          `fact_${fact.id}`,
          fact.verifiedAnswer,
          callbacks.onFieldType,
        )
        callbacks.onFieldBlur?.(`fact_${fact.id}`)
      }

      callbacks.onProgress?.(
        55,
        "Life Facts verified. Populating Daily-Life Questionnaire...",
      )
      await this.sleep(500)

      // STEP 3: Daily Life Questionnaire (16 items)
      callbacks.onStepChange?.(3)
      await this.sleep(400)

      currentSetup.dailyLifeQuestionnaire = JSON.parse(
        JSON.stringify(targetSetup.dailyLifeQuestionnaire),
      )
      callbacks.onSetupUpdate?.({ ...currentSetup })

      callbacks.onProgress?.(
        75,
        "Questionnaire recorded. Setting Health Checks...",
      )
      await this.sleep(500)

      // STEP 4: Confounders / Health Checks
      callbacks.onStepChange?.(4)
      await this.sleep(400)

      currentSetup.confounders = { ...targetSetup.confounders }
      callbacks.onSetupUpdate?.({ ...currentSetup })

      callbacks.onProgress?.(90, "Reviewing Consent & Finalizing...")
      await this.sleep(500)

      // STEP 5: Consent & Review
      callbacks.onStepChange?.(5)
      await this.sleep(300)

      currentSetup.consent = { ...targetSetup.consent }
      callbacks.onSetupUpdate?.({ ...currentSetup })

      callbacks.onProgress?.(100, "Scenario Ready!")
      await this.sleep(300)

      callbacks.onComplete?.(targetSetup)
    } catch (err: any) {
      if (err.message === "Autofill aborted") {
        console.log("[DemoStudio] Autofill cancelled by user.")
      } else {
        callbacks.onError?.(err)
      }
    }
  }
}
