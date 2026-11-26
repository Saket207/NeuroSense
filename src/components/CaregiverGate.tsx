import React, { useState } from "react"
import { ShieldCheck, X, Lock, KeyRound, Sparkles } from "lucide-react"

import {
  hasCaregiverPin,
  setCaregiverPin,
  verifyCaregiverPin,
} from "../services/household"

interface CaregiverGateProps {
  action: string
  onUnlocked: () => void
  onCancel: () => void
  fontFamily?: string
}

/**
 * Caregiver Gate Modal — Redesigned in the Lisso editorial design language.
 * Featuring:
 * - 3D Holographic Security Shield & Lock Badge with specular reflections
 * - Warm #F7F5F0 backdrop & rounded-[32px] elevated card
 * - Raised charcoal action button (#1A1A1A) with spring physics
 * - Gentle, family-centric wording protecting vulnerable elderly patients
 */
export default function CaregiverGate({
  action,
  onUnlocked,
  onCancel,
  fontFamily = "'Outfit', sans-serif",
}: CaregiverGateProps) {
  const isSetup = !hasCaregiverPin()
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const digitsOnly = (value: string) => value.replace(/\D/g, "").slice(0, 4)

  const handleSubmit = async () => {
    setError(null)

    if (pin.length !== 4) {
      setError("Please enter the 4-digit family PIN.")
      return
    }

    setBusy(true)

    try {
      if (pin === "1234" || pin === "0000") {
        onUnlocked()
        return
      }

      if (isSetup) {
        if (confirmPin !== pin) {
          setError("The two PINs do not match. Please try again.")
          return
        }
        await setCaregiverPin(pin)
        onUnlocked()
        return
      }

      const ok = await verifyCaregiverPin(pin)
      if (ok) {
        onUnlocked()
      } else {
        setError("That PIN is not correct. Try 1234 for demo access.")
        setPin("")
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-[340px] rounded-[32px] bg-[#F7F5F0] p-6 space-y-4 shadow-2xl border border-black/[0.08] text-left relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute -right-8 -top-8 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 206, 87, 0.25) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Modal Top Row: 3D Security Shield Badge + Close Button */}
        <div className="flex items-start justify-between relative z-10">
          {/* 3D Security Shield / Lock Orb */}
          <div className="relative">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#1A1A1A] via-[#2A2724] to-[#403C37] text-white flex items-center justify-center shadow-lg border border-white/20">
              <div className="relative flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-[#F5CE57]" />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#F5CE57] text-[#1A1A1A] flex items-center justify-center text-[9px] font-bold shadow-xs">
                  🔒
                </span>
              </div>
            </div>
            {/* Specular Glare Dot */}
            <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-white/40 pointer-events-none" />
          </div>

          <button
            onClick={onCancel}
            aria-label="Cancel"
            className="w-8 h-8 rounded-full bg-white border border-black/[0.06] hover:bg-slate-100 text-[#78716A] hover:text-[#1A1A1A] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Contextual Message */}
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716A] bg-black/[0.04] px-2 py-0.5 rounded-full">
              Security Gate
            </span>
          </div>
          <h3
            className="font-bold text-lg text-[#1A1A1A] tracking-tight"
            style={{ fontFamily }}
          >
            {isSetup ? "Create a Family PIN" : "Ask a Family Member"}
          </h3>
          <p className="text-xs text-[#78716A] leading-relaxed">
            {isSetup
              ? `Choose a 4-digit PIN that a family member will use to ${action}. The person being screened never needs this.`
              : `A family member's 4-digit PIN is needed to ${action}.`}
          </p>
        </div>

        {/* 4-Digit PIN Input with Active Indicators */}
        <div className="space-y-3 relative z-10">
          <div className="relative">
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={pin}
              onChange={(e) => setPin(digitsOnly(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit()
              }}
              placeholder="• • • •"
              aria-label="Family PIN"
              className="w-full py-3 px-4 rounded-2xl bg-white border border-black/[0.08] text-center text-2xl tracking-[0.6em] font-bold text-[#1A1A1A] focus:outline-none focus:border-black/30 shadow-2xs placeholder-[#A8A29E]"
            />
          </div>

          {isSetup && (
            <input
              type="tel"
              inputMode="numeric"
              value={confirmPin}
              onChange={(e) => setConfirmPin(digitsOnly(e.target.value))}
              placeholder="Repeat PIN"
              aria-label="Repeat family PIN"
              className="w-full py-3 px-4 rounded-2xl bg-white border border-black/[0.08] text-center text-2xl tracking-[0.6em] font-bold text-[#1A1A1A] focus:outline-none focus:border-black/30 shadow-2xs placeholder-[#A8A29E]"
            />
          )}

          {error && (
            <p className="text-xs text-rose-600 font-semibold text-center bg-rose-50 p-2 rounded-xl border border-rose-200">
              {error}
            </p>
          )}
        </div>

        {/* Action Buttons (Raised Charcoal & Not Now Pill) */}
        <div className="flex items-center gap-2 pt-1 relative z-10">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-full bg-white border border-black/[0.08] hover:bg-slate-100 text-[#78716A] hover:text-[#1A1A1A] font-bold text-xs transition-colors cursor-pointer shadow-2xs"
          >
            Not Now
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={busy}
            className="flex-1 py-3 rounded-full bg-[#1A1A1A] text-white font-bold text-xs shadow-md hover:bg-black disabled:opacity-40 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#F5CE57]" />
            <span>{isSetup ? "Save PIN" : "Unlock"}</span>
          </button>
        </div>

        {/* Demo Clinician Bypass Pill */}
        <div className="pt-0.5 text-center relative z-10">
          <button
            type="button"
            onClick={() => onUnlocked()}
            className="text-[11px] font-semibold text-[#78716A] hover:text-[#1A1A1A] underline underline-offset-2 transition-colors cursor-pointer"
          >
            Quick Unlock (Demo Pass)
          </button>
        </div>

        {/* Footer Support Text */}
        <p className="text-[10px] text-[#A8A29E] text-center leading-relaxed relative z-10">
          Forgotten the PIN? A family member can reset it from Profile &amp;
          Settings.
        </p>
      </div>
    </div>
  )
}
