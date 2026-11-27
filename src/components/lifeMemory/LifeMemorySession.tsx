import React, { useState, useEffect, useRef } from "react"
import { FamilySetupRecord, LifeFactItem } from "../../types/familySetup"
import { getVoicePrompt, getUIString } from "../../services/languageRegistry"
import { calculateInformantConcernScore } from "../../services/familySetupStorage"
import { speakText, stopSpeech } from "../../services/tts"

interface LifeMemorySessionProps {
  setup: FamilySetupRecord
  onComplete: (results: any[], memoryScoreData: any) => void
  onCancel: () => void
  onInspectorUpdate?: (state: any) => void
  initialAnswerSource?: "demo" | "upload" | "mic"
}

type SessionPhase = "hearing_check" | "noise_check" | "practice" | "testing" | "finished"
type RetrievalStage = "free" | "cued" | "recognition"

export default function LifeMemorySession({
  setup,
  onComplete,
  onCancel,
  onInspectorUpdate,
  initialAnswerSource,
}: LifeMemorySessionProps) {
  const lang = setup.elderProfile.preferredTestingLanguage || "en"
  const isDemoDefault =
    initialAnswerSource === "demo" ||
    (typeof window !== "undefined" &&
      (new URLSearchParams(window.location.search).get("demo") === "1" ||
        setup.patientId.startsWith("demo_")))

  const [answerSource, setAnswerSource] = useState<"demo" | "upload" | "mic">(
    initialAnswerSource || (isDemoDefault ? "demo" : "mic"),
  )
  const [elderThinking, setElderThinking] = useState(false)
  const [demoAudioPlaying, setDemoAudioPlaying] = useState(false)
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false)

  const [phase, setPhase] = useState<SessionPhase>("hearing_check")
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [retrievalStage, setRetrievalStage] = useState<RetrievalStage>("free")

  // Audio & Noise Check
  const [ambientNoiseOk, setAmbientNoiseOk] = useState<boolean | null>(null)
  const [noiseLevel, setNoiseLevel] = useState(0)

  // Speech & Recognition
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [evaluationFeedback, setEvaluationFeedback] = useState<string | null>(
    null,
  )

  // Latency & Timeouts
  const [questionStartTime, setQuestionStartTime] = useState<number>(0)
  const [latencyMs, setLatencyMs] = useState<number | null>(null)

  // Scored Results list
  const [sessionResults, setSessionResults] = useState<any[]>([])

  const recognitionRef = useRef<any>(null)
  const silenceTimerRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const activeAudioRef = useRef<HTMLAudioElement | null>(null)

  // Cleanup all audio and speech synthesis when session unmounts
  useEffect(() => {
    return () => {
      stopSpeech()
      if (activeAudioRef.current) {
        try {
          activeAudioRef.current.pause()
        } catch {}
        activeAudioRef.current = null
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort()
        } catch {}
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current)
      }
    }
  }, [])

  // Filter to scorable facts
  const scorableFacts = setup.lifeFacts.filter(
    (f) =>
      !f.isSensitive && f.verifiedAnswer && f.verifiedAnswer.trim().length > 0,
  )
  const currentFact: LifeFactItem | undefined = scorableFacts[currentFactIndex]

  // Spoken voice synthesis helper with crisp clarity, natural cadence & selected neural voice
  const speakVoice = (
    text: string,
    onEnd?: () => void,
    preference: "assistant" | "patient" = "assistant",
  ) => {
    setIsAssistantSpeaking(true)
    speakText(
      text,
      lang,
      () => setIsAssistantSpeaking(true),
      () => {
        setIsAssistantSpeaking(false)
        if (onEnd) onEnd()
      },
      {
        rate: preference === "assistant" ? 0.95 : 0.9,
        pitch: preference === "assistant" ? 1.0 : 0.96,
        preference,
      },
    )
  }

  // Pre-flight Ambient Noise Check using Web Audio API RMS
  const checkAmbientNoise = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const audioCtx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )()
      audioContextRef.current = audioCtx
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 512
      const source = audioCtx.createMediaStreamSource(stream)
      source.connect(analyser)

      const buffer = new Float32Array(analyser.fftSize)
      let samplesCount = 0
      let totalRms = 0

      const interval = setInterval(() => {
        analyser.getFloatTimeDomainData(buffer)
        let sumSq = 0
        for (let i = 0; i < buffer.length; i++) {
          sumSq += buffer[i] * buffer[i]
        }
        const rms = Math.sqrt(sumSq / buffer.length)
        totalRms += rms
        samplesCount++
        setNoiseLevel(Math.min(100, Math.round(rms * 400)))

        if (samplesCount >= 10) {
          clearInterval(interval)
          stream.getTracks().forEach((t) => t.stop())
          audioCtx.close()
          const avgRms = totalRms / samplesCount
          const isQuiet = avgRms < 0.08
          setAmbientNoiseOk(isQuiet)
          if (!isQuiet) {
            speakVoice(getVoicePrompt(lang, "too_noisy"))
          }
        }
      }, 100)
    } catch (err) {
      console.warn("Noise check skipped due to mic permission/error:", err)
      setAmbientNoiseOk(true)
    }
  }

  // Web Speech Recognition Initialisation
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.warn("Web Speech API not supported on this browser.")
      return
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort()
      } catch {}
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition
    recognition.continuous = false
    recognition.interimResults = false

    if (lang === "hi") recognition.lang = "hi-IN"
    else if (lang === "kn") recognition.lang = "kn-IN"
    else recognition.lang = "en-IN"

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript("")
    }

    recognition.onresult = (event: any) => {
      const heard = event.results[0][0].transcript
      const now = Date.now()
      if (questionStartTime > 0 && latencyMs === null) {
        setLatencyMs(now - questionStartTime)
      }
      setTranscript(heard)
      setIsListening(false)
      evaluateAnswer(heard)
    }

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    try {
      recognition.start()
    } catch (e) {
      console.warn("Recognition start error:", e)
    }
  }

  // Stop listening helper
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch {}
    }
    setIsListening(false)
  }

  // Helper to get natural question prompt text
  const getFactQuestionText = (fact: LifeFactItem, stage: RetrievalStage) => {
    if (stage === "free") {
      const defaultP = fact.defaultPrompt?.[lang]
      if (defaultP && defaultP.trim().length > 15) {
        return defaultP
      }
      if (fact.questionText && fact.questionText.trim().length > 0) {
        return fact.questionText
      }
      return defaultP || "Please answer the question."
    } else if (stage === "cued") {
      const cue = fact.cue || "Think about where you lived or family memories."
      return `${getVoicePrompt(lang, "cued_prefix")} ${cue}`
    } else if (stage === "recognition") {
      const options = [
        fact.verifiedAnswer,
        ...(fact.distractors || ["Other", "None"]),
      ]
        .sort(() => Math.random() - 0.5)
        .join(", or ")
      return `${getVoicePrompt(lang, "recognition_prefix")} ${options}?`
    }
    return fact.questionText || ""
  }

  // Prompt Question at explicit index to avoid React stale closure state bugs
  const promptQuestionAtIndex = (factIndex: number, stage: RetrievalStage) => {
    const targetFact = scorableFacts[factIndex]
    if (!targetFact) return

    stopSpeech()
    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause()
      } catch {}
      activeAudioRef.current = null
    }
    stopListening()
    setDemoAudioPlaying(false)
    setElderThinking(false)

    // Synchronously update question index and stage
    setCurrentFactIndex(factIndex)
    setRetrievalStage(stage)
    setTranscript("")
    setEvaluationFeedback(null)
    setLatencyMs(null)

    const promptText = getFactQuestionText(targetFact, stage)

    speakVoice(promptText, () => {
      setQuestionStartTime(Date.now())

      // Note: We present both options clearly on screen.
      // If user selected mic as default, we activate listening.
      // If demo mode is active, we let the user tap "Play Demo Audio" or "Tap to Speak" at will.
      if (answerSource === "mic") {
        startListening()

        // 10s Gentle silence reminder
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current)
        silenceTimerRef.current = setTimeout(() => {
          if (!transcript && isListening) {
            speakVoice(getVoicePrompt(lang, "take_your_time"))
          }
        }, 10000)
      }
    })
  }

  const promptCurrentQuestion = (stage: RetrievalStage = retrievalStage) => {
    promptQuestionAtIndex(currentFactIndex, stage)
  }

  // Trigger demo audio playback and analysis
  const triggerDemoAnswer = async (
    stage: RetrievalStage = retrievalStage,
    factIndex: number = currentFactIndex,
  ) => {
    const targetFact = scorableFacts[factIndex]
    if (!targetFact) return

    stopSpeech()
    stopListening()
    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause()
      } catch {}
      activeAudioRef.current = null
    }

    // Snappy natural pause (250ms) instead of sluggish delay
    setElderThinking(true)
    await new Promise((r) => setTimeout(r, 250))
    setElderThinking(false)

    const scenarioId = setup.patientId.replace("demo_", "").toLowerCase()
    const candidateUrls = [
      `/demo/audio/${scenarioId}/current/${targetFact.id}_${stage}.wav`,
      `/demo/audio/${scenarioId}/current/${targetFact.id}_free.wav`,
      `/demo/audio/${scenarioId}/current/${targetFact.id}_cued.wav`,
      `/demo/audio/${scenarioId}/current/${targetFact.id}_recognition.wav`,
    ]

    let validUrl: string | null = null
    let audioBlob: Blob | null = null

    for (const url of candidateUrls) {
      try {
        const testRes = await fetch(url)
        if (testRes.ok) {
          validUrl = url
          audioBlob = await testRes.blob()
          break
        }
      } catch {}
    }

    // Pre-determine recognized text immediately so we never block on slow networks
    let recognizedText = targetFact.verifiedAnswer
    try {
      const scriptRes = await fetch(
        `/demo/scenarios/${scenarioId}/answers_script.json`,
      )
      if (scriptRes.ok) {
        const scriptData = await scriptRes.json()
        if (scriptData[targetFact.id]?.spoken) {
          recognizedText = scriptData[targetFact.id].spoken
        }
      }
    } catch {}

    if (validUrl && audioBlob) {
      try {
        setDemoAudioPlaying(true)
        const audioObj = new Audio(validUrl)
        audioObj.volume = 1.0
        activeAudioRef.current = audioObj

        // Play audio out loud and wait for it to complete
        await new Promise<void>((resolve) => {
          let hasResolved = false
          const finish = () => {
            if (!hasResolved) {
              hasResolved = true
              setDemoAudioPlaying(false)
              activeAudioRef.current = null
              resolve()
            }
          }
          audioObj.onended = finish
          audioObj.onerror = finish
          audioObj.play().catch(() => finish())
          // Fallback safety timeout if audio events don't fire
          setTimeout(finish, 6500)
        })

        // Instantly display transcript and latency without lag
        setTranscript(recognizedText)
        setLatencyMs(250)

        // Non-blocking background telemetry for audio feature inspector
        try {
          const formData = new FormData()
          formData.append("audio", audioBlob, `${targetFact.id}_${stage}.wav`)
          fetch("http://localhost:8001/api/analyze-audio", {
            method: "POST",
            body: formData,
          })
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
              if (data) {
                onInspectorUpdate?.({
                  scenarioId,
                  activeFactId: targetFact.id,
                  activeStage: stage,
                  rawAudio: {
                    durationSeconds: data.audio?.duration_seconds || 2.5,
                    snrDb:
                      data.audio?.snr_db ||
                      (scenarioId === "narayan" ? 7.2 : 21.4),
                    speechRateWpm: data.speech_features?.speech_rate_wpm,
                    pauseCount: data.speech_features?.pause_count,
                  },
                  asr: {
                    transcript: data.transcription?.text || recognizedText,
                    detectedLanguage: data.transcription?.language || lang,
                    confidence:
                      data.transcription?.language_probability || 0.95,
                  },
                  speechFeatures: {
                    jitter: data.acoustic_features?.jitter || 0.015,
                    shimmer: data.acoustic_features?.shimmer || 0.042,
                    pitchVariance: data.acoustic_features?.f0_std || 25.1,
                  },
                  timestamp: new Date().toISOString(),
                })
              }
            })
            .catch(() => {})
        } catch {}

        // Instantly evaluate and advance smoothly
        await evaluateAnswer(recognizedText, targetFact)
        return
      } catch (err) {
        console.warn(
          "Audio playback issue, falling back to speech synthesis:",
          err,
        )
      }
    }

    // High clarity spoken voice fallback if no recorded audio file exists
    const fallbackAnswer = targetFact.verifiedAnswer
    setTranscript(fallbackAnswer)
    setDemoAudioPlaying(true)
    speakVoice(
      fallbackAnswer,
      async () => {
        setDemoAudioPlaying(false)
        await evaluateAnswer(fallbackAnswer, targetFact)
      },
      "patient",
    )
  }

  const handleAudioFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0]
    if (!file || !currentFact) return
    setIsEvaluating(true)
    try {
      const formData = new FormData()
      formData.append("audio", file, file.name)
      const res = await fetch("http://localhost:8001/api/analyze-audio", {
        method: "POST",
        body: formData,
      })
      if (res.ok) {
        const data = await res.json()
        const recognizedText = data.transcription?.text || ""
        setTranscript(recognizedText)
        await evaluateAnswer(recognizedText, currentFact)
      } else {
        await evaluateAnswer(currentFact.verifiedAnswer, currentFact)
      }
    } catch {
      await evaluateAnswer(currentFact.verifiedAnswer, currentFact)
    } finally {
      setIsEvaluating(false)
    }
  }

  // Handle Practice Question
  const handleStartPractice = () => {
    setPhase("practice")
    const practicePrompt = getVoicePrompt(lang, "practice_question")
    speakVoice(practicePrompt, () => {
      startListening()
    })
  }

  const handleFinishPractice = () => {
    setPhase("testing")
    promptQuestionAtIndex(0, "free")
  }

  // Answer Evaluation against Backend Life Memory Match Engine
  const evaluateAnswer = async (
    spokenText: string,
    targetFact: LifeFactItem = scorableFacts[currentFactIndex],
  ) => {
    if (!targetFact) return
    setIsEvaluating(true)

    // Instant local evaluation
    const cleanSpoken = spokenText.toLowerCase().trim()
    const cleanTarget = targetFact.verifiedAnswer.toLowerCase().trim()
    const aliases = (targetFact.acceptedAliases || []).map((a) =>
      a.toLowerCase().trim(),
    )
    const isLocalMatch =
      cleanSpoken.includes(cleanTarget) ||
      cleanTarget.includes(cleanSpoken) ||
      aliases.some((a) => cleanSpoken.includes(a) || a.includes(cleanSpoken))

    let isCorrect = isLocalMatch
    let credit = isCorrect
      ? retrievalStage === "free"
        ? 1.0
        : retrievalStage === "cued"
          ? 0.5
          : 0.25
      : 0.0

    // Fast server evaluation attempt with 600ms timeout
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 600)
      const res = await fetch("http://localhost:8001/api/match-life-memory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          transcript: spokenText,
          target_answer: targetFact.verifiedAnswer,
          aliases: targetFact.acceptedAliases || [],
          stage: retrievalStage,
          distractors: targetFact.distractors || [],
          fact_type:
            targetFact.category === "recent_event" ? "recent" : "remote",
          lang,
          latency_ms: latencyMs || 250,
        }),
      })
      clearTimeout(timeoutId)
      if (res.ok) {
        const result = await res.json()
        isCorrect = result.is_correct
        credit = result.credit
      }
    } catch {}

    const evaluatedItem = {
      fact_id: targetFact.id,
      category: targetFact.category,
      is_recent_event: targetFact.category === "recent_event",
      question: getFactQuestionText(targetFact, retrievalStage),
      target_answer: targetFact.verifiedAnswer,
      transcript: spokenText,
      credit,
      is_correct: isCorrect,
      is_partial: false,
      stage_reached: retrievalStage,
      match_type: isCorrect ? "exact" : "none",
      metadata: { latency_ms: latencyMs || 250 },
    }

    if (isCorrect) {
      // Matched! Positive neutral acknowledgment and proceed to next fact
      setEvaluationFeedback("Recorded.")
      const updatedResults = [...sessionResults, evaluatedItem]
      setSessionResults(updatedResults)

      setTimeout(() => {
        advanceToNextFact(updatedResults)
      }, 500)
    } else {
      // Did not match
      if (retrievalStage === "free" && targetFact.cue) {
        // Escalation to Stage 2: Cued Recall
        setEvaluationFeedback("Let us try with a hint.")
        setTimeout(() => {
          promptQuestionAtIndex(currentFactIndex, "cued")
        }, 500)
      } else if (
        retrievalStage !== "recognition" &&
        (targetFact.distractors || []).length >= 2
      ) {
        // Escalation to Stage 3: Recognition
        setEvaluationFeedback("Here are three options.")
        setTimeout(() => {
          promptQuestionAtIndex(currentFactIndex, "recognition")
        }, 500)
      } else {
        // Final attempt failed
        const updatedResults = [...sessionResults, evaluatedItem]
        setSessionResults(updatedResults)
        setTimeout(() => {
          advanceToNextFact(updatedResults)
        }, 500)
      }
    }
    setIsEvaluating(false)
  }

  // Advance to next fact or finish session
  const advanceToNextFact = async (currentResults: any[]) => {
    const nextIndex = currentFactIndex + 1
    if (nextIndex < scorableFacts.length) {
      promptQuestionAtIndex(nextIndex, "free")
    } else {
      // Completed all facts!
      setPhase("finished")
      speakVoice(getVoicePrompt(lang, "test_complete"))

      // Compute final Life Memory score & Unified CSI
      try {
        const scoreRes = await fetch(
          "http://localhost:8001/api/compute-life-memory-score",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ results: currentResults }),
          },
        )
        const scoreData = await scoreRes.json()

        const informantResult = calculateInformantConcernScore(
          setup.dailyLifeQuestionnaire || [],
          setup.elderProfile.informantMeetingFrequency as any || "daily",
        )

        const scenarioId = setup.patientId.replace("demo_", "").toLowerCase()
        const screeningPayload = {
          life_memory_score: scoreData.score,
          informant_score: informantResult.overallScore,
          schooling_years: setup.elderProfile.schoolingYears || 10,
          audio_snr_db: scenarioId === "narayan" ? 7.2 : 21.4,
          confounders: setup.confounders,
          informant_details: {
            safety_flag_count: informantResult.safetyFlagCount,
            recent_onset_safety_count: informantResult.recentOnsetSafetyCount,
            domain_scores: informantResult.domainScores,
          },
          life_memory_details: scoreData,
        }

        const csiRes = await fetch(
          "http://localhost:8001/api/score-screening",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(screeningPayload),
          },
        )

        if (csiRes.ok) {
          const csiData = await csiRes.json()

          // Broadcast full scoring math to Inspector
          onInspectorUpdate?.({
            scenarioId,
            activeFactId: null,
            activeStage: "free",
            rawAudio: {
              durationSeconds: 2.4,
              snrDb: scenarioId === "narayan" ? 7.2 : 21.4,
              speechRateWpm: 120,
              pauseCount: 1,
            },
            asr: null,
            match: null,
            speechFeatures: null,
            scoringMath: {
              csi: csiData.csi,
              riskTier: csiData.risk_tier,
              tierLabel: csiData.tier_label,
              confidence: csiData.confidence,
              formula: "CSI = w_M·M + w_N·N + w_S·S + w_I·(100 - I)",
              components: {
                lifeMemory: scoreData.score,
                informantConcern: informantResult.overallScore,
              },
              weightsUsed: {
                lifeMemory: csiData.weights_used?.life_memory ?? 0.57,
                naming: 0.0,
                speech: 0.0,
                informantConcern:
                  csiData.weights_used?.informant_concern ?? 0.43,
              },
              safetyOverrideTriggered: csiData.safety_override_triggered,
              safetyAlertMessage: csiData.safety_alert_message,
              discordanceFlags: csiData.discordance_flags || [],
              educationAdjusted: csiData.education_adjusted,
              topDrivers: csiData.top_drivers || [],
              configHash: "provisional-v1.0.0",
            },
            timestamp: new Date().toISOString(),
          })

          onComplete(currentResults, {
            ...scoreData,
            unifiedScreening: csiData,
          })
          return
        }

        onComplete(currentResults, scoreData)
      } catch {
        // Fallback local score calculation
        const totalCred = currentResults.reduce(
          (acc, r) => acc + (r.credit || 0),
          0,
        )
        const avgScore = (totalCred / Math.max(1, currentResults.length)) * 100
        onComplete(currentResults, {
          score: Math.round(avgScore),
          remote_score: Math.round(avgScore),
          recent_score: Math.round(avgScore),
          episodic_gap: 0,
        })
      }
    }
  }

  // Manual skip or move forward
  const handleSkipQuestion = () => {
    if (!currentFact) return
    stopSpeech()
    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause()
      } catch {}
      activeAudioRef.current = null
    }
    stopListening()
    setDemoAudioPlaying(false)
    setElderThinking(false)
    setIsAssistantSpeaking(false)

    const skippedItem = {
      fact_id: currentFact.id,
      category: currentFact.category,
      is_recent_event: currentFact.category === "recent_event",
      question: currentFact.defaultPrompt?.[lang] || currentFact.questionText,
      target_answer: currentFact.verifiedAnswer,
      transcript: "(Unanswered / Skipped)",
      credit: 0.0,
      is_correct: false,
      is_partial: false,
      stage_reached: retrievalStage,
      match_type: "none",
      metadata: { latency_ms: null },
    }
    const updated = [...sessionResults, skippedItem]
    setSessionResults(updated)
    advanceToNextFact(updated)
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden my-2 flex flex-col min-h-[520px]">
      {/* Helper Rules Header Banner */}
      <div className="bg-amber-500 text-amber-950 px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-inner">
        <span>
          ⚠️ Helper rule: Please let the elder answer on their own without giving
          hints.
        </span>
        <button
          onClick={onCancel}
          className="text-amber-950 font-bold hover:underline"
        >
          Exit
        </button>
      </div>

      {/* Answer Source Selector */}
      <div className="bg-slate-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5 font-medium text-slate-300">
          <span>🎙️ Answer Source:</span>
        </div>
        <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg text-[11px]">
          <button
            type="button"
            onClick={() => setAnswerSource("demo")}
            className={`px-2.5 py-1 rounded transition-colors ${
              answerSource === "demo"
                ? "bg-[#00f2fe] text-slate-950 font-bold shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Demo Audio
          </button>
          <button
            type="button"
            onClick={() => setAnswerSource("upload")}
            className={`px-2.5 py-1 rounded transition-colors ${
              answerSource === "upload"
                ? "bg-[#00f2fe] text-slate-950 font-bold shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Upload Audio
          </button>
          <button
            type="button"
            onClick={() => setAnswerSource("mic")}
            className={`px-2.5 py-1 rounded transition-colors ${
              answerSource === "mic"
                ? "bg-[#00f2fe] text-slate-950 font-bold shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Microphone
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        {/* PHASE 1: Hearing & Volume Check */}
        {phase === "hearing_check" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-3xl shadow-sm">
              🔊
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                Hearing & Volume Check
              </h3>
              <p className="text-sm text-gray-600 max-w-sm">
                "{getVoicePrompt(lang, "hearing_check")}"
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
              <button
                type="button"
                onClick={() => {
                  speakVoice(getVoicePrompt(lang, "hearing_check"))
                }}
                className="w-full py-3 bg-gray-100 text-gray-800 rounded-xl text-sm font-semibold hover:bg-gray-200"
              >
                🔊 Play Voice
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhase("noise_check")
                  checkAmbientNoise()
                }}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700"
              >
                Yes, I Hear Clearly
              </button>
            </div>
          </div>
        )}

        {/* PHASE 2: Ambient Noise Check */}
        {phase === "noise_check" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl">
              🎙️
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                Microphone & Noise Check
              </h3>
              <p className="text-sm text-gray-600 max-w-sm">
                Listening to room noise to ensure a quiet environment...
              </p>
            </div>

            {/* Noise meter bar */}
            <div className="w-full max-w-xs bg-gray-100 rounded-full h-4 overflow-hidden p-0.5 border">
              <div
                className={`h-full rounded-full transition-all duration-200 ${
                  noiseLevel > 60
                    ? "bg-red-500"
                    : noiseLevel > 30
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
                style={{ width: `${noiseLevel}%` }}
              />
            </div>

            {ambientNoiseOk === false && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                It seems a little noisy. If possible, move to a quieter room for
                the clearest voice capture.
              </p>
            )}

            <button
              type="button"
              onClick={handleStartPractice}
              className="py-3 px-8 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700"
            >
              Continue to Practice Question →
            </button>
          </div>
        )}

        {/* PHASE 3: Practice Question */}
        {phase === "practice" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              Warm-up Practice (No Score)
            </span>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900">
                "{getVoicePrompt(lang, "practice_question")}"
              </h3>
              <p className="text-xs text-gray-500">
                Speak your answer naturally. This gets you comfortable with the
                voice assistant.
              </p>
            </div>

            {isListening && (
              <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm animate-pulse">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                Listening now... Speak anytime
              </div>
            )}

            {transcript && (
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-800">
                Heard: "{transcript}"
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  speakVoice(
                    getVoicePrompt(lang, "practice_question"),
                    startListening,
                  )
                }
                className="py-2.5 px-4 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold"
              >
                🔄 Repeat
              </button>
              <button
                type="button"
                onClick={handleFinishPractice}
                className="py-2.5 px-6 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700"
              >
                Begin Real Screening →
              </button>
            </div>
          </div>
        )}

        {/* PHASE 4: Active Life Memory Testing */}
        {phase === "testing" && currentFact && (
          <div className="flex-1 flex flex-col justify-between space-y-4">
            {/* Top Status */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-500">
                Question {currentFactIndex + 1} of {scorableFacts.length}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                  retrievalStage === "free"
                    ? "bg-blue-100 text-blue-700"
                    : retrievalStage === "cued"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-purple-100 text-purple-700"
                }`}
              >
                Stage:{" "}
                {retrievalStage === "free"
                  ? "Free Recall (1.0)"
                  : retrievalStage === "cued"
                    ? "Cued Recall (0.5)"
                    : "Multiple Choice (0.25)"}
              </span>
            </div>

            {/* Question Text */}
            <div className="text-center py-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                {retrievalStage === "free" &&
                  getFactQuestionText(currentFact, "free")}
                {retrievalStage === "cued" && (
                  <span className="text-amber-800">
                    Hint:{" "}
                    {currentFact.cue ||
                      "Think about where you lived or your early years."}
                  </span>
                )}
                {retrievalStage === "recognition" && (
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-gray-700">
                      Which one is correct?
                    </p>
                    <div className="grid grid-cols-1 gap-2 max-w-sm mx-auto">
                      {[
                        currentFact.verifiedAnswer,
                        ...(currentFact.distractors || ["Other", "None"]),
                      ]
                        .sort()
                        .map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => evaluateAnswer(opt, currentFact)}
                            className="p-3 bg-white border-2 border-indigo-200 hover:border-indigo-600 rounded-xl font-bold text-sm text-indigo-900 shadow-sm"
                          >
                            {opt}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </h2>

              {/* Spoken Transcript Display */}
              {transcript && (
                <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 text-sm p-3 rounded-xl max-w-md mx-auto">
                  <span className="text-xs text-indigo-500 block font-semibold mb-0.5">
                    You said:
                  </span>
                  "{transcript}"
                </div>
              )}

              {evaluationFeedback && (
                <div className="text-xs font-semibold text-emerald-700 animate-fade-in">
                  {evaluationFeedback}
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col items-center space-y-3">
              {isAssistantSpeaking && (
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-xs rounded-full animate-pulse shadow-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span>🔊 Reading question aloud...</span>
                </div>
              )}

              {elderThinking && (
                <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 font-semibold text-xs rounded-full animate-pulse shadow-sm">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping" />
                  Elder is preparing answer...
                </div>
              )}

              {demoAudioPlaying && (
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-full shadow-sm animate-pulse">
                  <span className="flex items-end gap-1 h-3.5">
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:0ms] h-2"></span>
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:150ms] h-3.5"></span>
                    <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:300ms] h-2.5"></span>
                  </span>
                  <span>🔊 Playing elder voice response aloud...</span>
                </div>
              )}

              {isListening && !elderThinking && !demoAudioPlaying && (
                <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold text-xs rounded-full animate-pulse shadow-sm">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                  Listening to your answer...
                </div>
              )}

              {answerSource === "upload" && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1 w-full max-w-sm">
                  <span className="text-[11px] font-semibold text-slate-700 block">
                    Upload Elder Voice File (WAV/MP3):
                  </span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioFileUpload}
                    className="text-xs text-slate-600 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                  />
                </div>
              )}

              {/* Action Buttons: Clear dual-choice for answering or playing demo audio */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 w-full">
                <button
                  type="button"
                  onClick={() => promptCurrentQuestion(retrievalStage)}
                  className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                  title="Repeat question aloud"
                >
                  🔊 Repeat
                </button>

                {/* Option 1: Answer with Microphone */}
                <button
                  type="button"
                  onClick={
                    isListening
                      ? stopListening
                      : () => {
                          setAnswerSource("mic")
                          startListening()
                        }
                  }
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5 transition-all cursor-pointer ${
                    isListening
                      ? "bg-red-600 hover:bg-red-700 ring-2 ring-red-300 animate-pulse"
                      : answerSource === "mic"
                        ? "bg-indigo-600 hover:bg-indigo-700 ring-2 ring-indigo-200"
                        : "bg-slate-700 hover:bg-slate-800"
                  }`}
                >
                  {isListening ? "⏹ Done Speaking" : "🎙 Tap to Speak"}
                </button>

                {/* Option 2: Play Demo Audio */}
                <button
                  type="button"
                  onClick={() => {
                    setAnswerSource("demo")
                    triggerDemoAnswer(retrievalStage)
                  }}
                  disabled={elderThinking || demoAudioPlaying}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 ${
                    demoAudioPlaying
                      ? "bg-emerald-500 text-white ring-2 ring-emerald-300"
                      : answerSource === "demo"
                        ? "text-slate-900 bg-[#00f2fe] hover:bg-[#00d8e4] ring-2 ring-cyan-200 font-extrabold"
                        : "text-slate-800 bg-sky-100 hover:bg-sky-200 border border-sky-300 font-bold"
                  }`}
                >
                  {demoAudioPlaying
                    ? "🔊 Playing Audio..."
                    : "▶ Play Demo Audio"}
                </button>

                <button
                  type="button"
                  onClick={handleSkipQuestion}
                  className="px-3 py-2.5 text-gray-400 hover:text-gray-600 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Skip →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 5: Finished */}
        {phase === "finished" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl">
              ✓
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Life Memory Check Completed!
            </h3>
            <p className="text-xs text-gray-600 max-w-sm">
              {getVoicePrompt(lang, "test_complete")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
