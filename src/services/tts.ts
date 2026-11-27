// ─── Multilingual Text-To-Speech (Web Speech API) with High-Clarity Natural Voices ───

import { LanguageCode } from "../types"

const LANG_BCP47: Record<LanguageCode, string> = {
  en: "en-IN",
  hi: "hi-IN",
  bn: "bn-IN",
  mr: "mr-IN",
  ta: "ta-IN",
  te: "te-IN",
  gu: "gu-IN",
  kn: "kn-IN",
  ml: "ml-IN",
}

let activeUtterance: SpeechSynthesisUtterance | null = null
let cachedVoices: SpeechSynthesisVoice[] = []

// Initialize and keep voice cache updated
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  cachedVoices = window.speechSynthesis.getVoices()
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices()
  }
}

export function stopSpeech(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel()
    activeUtterance = null
  }
}

export function isSpeaking(): boolean {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    return window.speechSynthesis.speaking
  }
  return false
}

export interface TTSOptions {
  rate?: number
  pitch?: number
  volume?: number
  preference?: "assistant" | "patient"
  onStart?: () => void
  onEnd?: () => void
  onError?: (err: any) => void
}

/**
 * Find the most natural, human-sounding voice available for the given language.
 * Prioritizes modern neural/natural voices (Google, Microsoft Natural/Online, Apple Siri/Samantha/Alex).
 */
export function getHighQualityVoice(
  lang: string = "en",
  preference: "assistant" | "patient" = "assistant",
): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window))
    return null

  const voices =
    cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices()

  if (!voices || voices.length === 0) return null

  const bcp =
    LANG_BCP47[(lang as LanguageCode)] ||
    (lang.includes("-") ? lang : `${lang}-IN`)
  const baseLang = lang.split("-")[0].toLowerCase()

  // High quality keywords in order of priority
  const naturalKeywords = [
    "natural",
    "neural",
    "online",
    "google",
    "jenny",
    "aria",
    "guy",
    "sonia",
    "neerja",
    "swara",
    "madhur",
    "samantha",
    "karen",
    "alex",
    "moira",
    "serena",
  ]

  // Filter voices that match this language
  const matchingVoices = voices.filter(
    (v) =>
      v.lang.toLowerCase() === bcp.toLowerCase() ||
      v.lang.toLowerCase().startsWith(baseLang) ||
      (baseLang === "en" && v.lang.toLowerCase().startsWith("en")),
  )

  if (matchingVoices.length === 0) {
    // Fall back to any english voice if regional Indian dialect voice is missing in OS
    const fallbackEn = voices.filter((v) =>
      v.lang.toLowerCase().startsWith("en"),
    )
    if (fallbackEn.length > 0) {
      const topNatural = fallbackEn.find((v) =>
        naturalKeywords.some((kw) => v.name.toLowerCase().includes(kw)),
      )
      return topNatural || fallbackEn[0]
    }
    return voices[0] || null
  }

  // Score candidate voices
  const scored = matchingVoices.map((voice) => {
    let score = 0
    const nameLower = voice.name.toLowerCase()
    const langLower = voice.lang.toLowerCase()

    // Prefer exact regional match
    if (langLower === bcp.toLowerCase()) score += 15

    // High quality brand/neural tags
    naturalKeywords.forEach((kw, idx) => {
      if (nameLower.includes(kw)) {
        score += 30 - idx
      }
    })

    // If assistant: prefer crisp professional tones (Jenny, Aria, Google US/UK, Samantha)
    if (preference === "assistant") {
      if (
        nameLower.includes("jenny") ||
        nameLower.includes("aria") ||
        nameLower.includes("samantha") ||
        nameLower.includes("google us")
      ) {
        score += 10
      }
    } else {
      // If patient: prefer gentle warm tones (Guy, Madhur, Neerja, Swara, Daniel)
      if (
        nameLower.includes("guy") ||
        nameLower.includes("madhur") ||
        nameLower.includes("neerja") ||
        nameLower.includes("swara") ||
        nameLower.includes("daniel")
      ) {
        score += 10
      }
    }

    return { voice, score }
  })

  scored.sort((a, b) => b.score - a.score)
  return scored[0]?.voice || matchingVoices[0] || null
}

/**
 * Synthesizes speech with calibrated natural cadence and volume.
 * Supports both legacy signature: speakText(text, lang, onStart, onEnd)
 * and rich options: speakText(text, lang, onStart, onEnd, options)
 */
export function speakText(
  text: string,
  lang: string = "en",
  onStart?: () => void,
  onEnd?: () => void,
  options?: TTSOptions,
): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis not supported in this browser.")
    onEnd?.()
    return
  }

  stopSpeech()

  const bcp =
    LANG_BCP47[(lang as LanguageCode)] ||
    (lang.includes("-") ? lang : `${lang}-IN`)
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = bcp

  // Calibrated natural speech rate: 0.95 gives articulate clarity without slurring or robotic drag
  utterance.rate = options?.rate ?? 0.95
  utterance.pitch = options?.pitch ?? 1.0
  utterance.volume = options?.volume ?? 1.0

  const bestVoice = getHighQualityVoice(
    lang,
    options?.preference ?? "assistant",
  )
  if (bestVoice) {
    utterance.voice = bestVoice
  }

  utterance.onstart = () => {
    onStart?.()
    options?.onStart?.()
  }

  utterance.onend = () => {
    activeUtterance = null
    onEnd?.()
    options?.onEnd?.()
  }

  utterance.onerror = (e) => {
    console.warn("TTS playback issue:", e)
    activeUtterance = null
    onEnd?.()
    options?.onError?.(e)
  }

  activeUtterance = utterance
  window.speechSynthesis.speak(utterance)
}
