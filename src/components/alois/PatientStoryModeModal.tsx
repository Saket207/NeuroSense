import React, { useState } from "react"
import {
  X,
  Volume2,
  Sparkles,
  BookOpen,
  Heart,
  Music,
  MapPin,
  Calendar,
  CheckCircle2,
  Radio,
  Play,
  Pause,
} from "lucide-react"

interface PatientStoryModeModalProps {
  isOpen: boolean
  onClose: () => void
  patientName: string
  fontFamily?: string
}

export default function PatientStoryModeModal({
  isOpen,
  onClose,
  patientName,
  fontFamily = "'Outfit', sans-serif",
}: PatientStoryModeModalProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [activeChapter, setActiveChapter] = useState<number>(0)

  if (!isOpen) return null

  const CHAPTERS = [
    {
      id: "childhood",
      title: "Chapter 1: Ancestral Roots",
      badge: "Childhood 1952",
      icon: <MapPin className="w-4 h-4 text-amber-600" />,
      bgGradient: "from-amber-50 to-orange-50",
      borderColor: "border-amber-200",
      memoryFact:
        "Grew up near the sacred river ghats in Varanasi under the grand ancestral banyan tree.",
      audioPrompt: `Namaste ${patientName}! Tell me about the banyan tree near the river ghats where you used to walk in the morning.`,
      cognitiveTarget: "Episodic remote autobiographical memory retrieval.",
    },
    {
      id: "youth",
      title: "Chapter 2: Youth & Passions",
      badge: "Art & Music",
      icon: <Music className="w-4 h-4 text-purple-600" />,
      bgGradient: "from-purple-50 to-indigo-50",
      borderColor: "border-purple-200",
      memoryFact:
        "Practiced Indian Classical Sitar and tended a beloved courtyard garden of fresh white jasmine.",
      audioPrompt: `Do you remember which raga you used to play on your sitar while sitting on the veranda?`,
      cognitiveTarget: "Procedural artistic recall & semantic fluency.",
    },
    {
      id: "family",
      title: "Chapter 3: Family Legacy",
      badge: "Golden Jubilee",
      icon: <Heart className="w-4 h-4 text-rose-500" />,
      bgGradient: "from-rose-50 to-pink-50",
      borderColor: "border-rose-200",
      memoryFact:
        "Married in 1974; celebrates a 50-year golden bond with children and grandchildren Aarav & Ananya.",
      audioPrompt: `Who visited you last Sunday? Was it young Aarav who showed you his drawing?`,
      cognitiveTarget: "Recent episodic social memory & orientation.",
    },
    {
      id: "comfort",
      title: "Chapter 4: Daily Comfort",
      badge: "Morning Ritual",
      icon: <Radio className="w-4 h-4 text-teal-600" />,
      bgGradient: "from-teal-50 to-emerald-50",
      borderColor: "border-teal-200",
      memoryFact:
        "Starts every morning with fresh ginger masala chai while listening to classic Akashvani radio tunes.",
      audioPrompt: `How was your morning chai today? Did you listen to your favorite radio station?`,
      cognitiveTarget: "Circadian cadence & spontaneous speech stability.",
    },
  ]

  const currentCh = CHAPTERS[activeChapter]

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio)
  }

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-[360px] bg-[#F7F5F0] rounded-[32px] p-5 shadow-2xl border border-black/[0.08] text-left space-y-4 max-h-[85vh] overflow-y-auto">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#F5CE57] text-[#1A1A1A] flex items-center justify-center font-bold shadow-2xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3
                style={{ fontFamily }}
                className="text-base font-bold text-[#1A1A1A] leading-tight"
              >
                Autobiographical Story Mode
              </h3>
              <p className="text-[10px] text-[#78716A]">
                Reminiscence screening for {patientName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-black/[0.06] text-[#78716A] flex items-center justify-center hover:text-[#1A1A1A] hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Story Chapter Selector Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setActiveChapter(idx)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeChapter === idx
                  ? "bg-[#1A1A1A] text-white shadow-2xs"
                  : "bg-white text-[#78716A] border border-black/[0.06] hover:text-[#1A1A1A]"
              }`}
            >
              {ch.title.split(":")[0]}
            </button>
          ))}
        </div>

        {/* Active Chapter Card */}
        <div
          className={`rounded-2xl p-4 bg-gradient-to-br ${currentCh.bgGradient} border ${currentCh.borderColor} shadow-2xs space-y-3`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center shadow-2xs">
                {currentCh.icon}
              </div>
              <span className="text-[13px] font-bold text-[#1A1A1A]">
                {currentCh.title}
              </span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded-full text-[#1A1A1A] border border-black/[0.06]">
              {currentCh.badge}
            </span>
          </div>

          <p className="text-xs text-[#1A1A1A]/90 leading-relaxed font-medium">
            &ldquo;{currentCh.memoryFact}&rdquo;
          </p>

          <div className="pt-2 border-t border-black/[0.06] text-[10px] text-[#78716A] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Target: {currentCh.cognitiveTarget}</span>
          </div>
        </div>

        {/* Simulated Conversational Audio Screening Bar */}
        <div className="rounded-2xl bg-white border border-black/[0.06] p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716A] flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-amber-600" />
              <span>Voice Screening Question</span>
            </span>
            <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
              Zero-Literacy Audio
            </span>
          </div>

          <p className="text-xs text-[#1A1A1A] italic leading-relaxed bg-[#F7F5F0] p-3 rounded-xl border border-black/[0.04]">
            &ldquo;{currentCh.audioPrompt}&rdquo;
          </p>

          {/* Sound Wave Animation & Play/Pause */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1 h-6">
              {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 60, 90, 40].map(
                (h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlayingAudio
                        ? "bg-amber-500 animate-pulse"
                        : "bg-black/[0.15]"
                    }`}
                    style={{
                      height: isPlayingAudio
                        ? `${Math.max(20, (h * Math.sin(i + 1)) % 100)}%`
                        : "25%",
                    }}
                  />
                ),
              )}
            </div>

            <button
              type="button"
              onClick={toggleAudio}
              className="px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-sm hover:bg-black active:scale-95 transition-all cursor-pointer"
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-3 h-3 fill-white" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-white" /> Listen
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-[10px] text-center text-[#78716A] leading-relaxed">
          Autobiographical questions prompt spontaneous speech, allowing
          PennyLane VQC to screen phonation cadence without inducing test
          anxiety.
        </p>
      </div>
    </div>
  )
}
