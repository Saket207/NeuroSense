import React, { useEffect, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Delete,
  Eye,
  EyeOff,
  KeyRound,
  MessageSquare,
  ShieldCheck,
  User,
  Users,
} from "lucide-react"

import RealPhoneFrame from "../../phone/RealPhoneFrame"
import { getApiBaseUrl } from "../../../services/apiConfig"
import { setCaregiverPin } from "../../../services/household"
import {
  getMyPatientProfile,
  upsertMyPatientProfile,
} from "../../../services/patientProfile"
import {
  isSupabaseConfigured,
  lookupVerifiedSupabaseUser,
  registerVerifiedSupabaseUser,
  supabase,
} from "../../../services/supabase"

export interface AloisAuthUser {
  patientId: string
  username: string
  fullName: string
  gender: string
  age: string
  dob: string
  email: string
  phone: string
  city: string
  diagnosis: string
  stage: string
  caregiverName: string
  caregiverEmail: string
  caregiverPhone: string
  caregiverPin?: string
  isCaregiver?: boolean
  linkedPatientId?: string
  linkedPatientName?: string
}

interface AloisAuthContainerProps {
  onAuthenticated: (user: AloisAuthUser) => void
  fontFamily?: string
  onBackToHome?: () => void
}

type AuthScreen = "you" | "caregiver" | "caregiverVerify" | "register"

export const NEUROSENSE_USER_STORAGE_KEY = "neurosense-user-profile"
export const NEUROSENSE_AUTH_SESSION_KEY = "neurosense-auth-session"
export const ALOIS_USER_STORAGE_KEY = NEUROSENSE_USER_STORAGE_KEY
export const ALOIS_AUTH_SESSION_KEY = NEUROSENSE_AUTH_SESSION_KEY

function createPatientId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `00000000-0000-4000-8000-${Date.now().toString().slice(-12).padStart(12, "0")}`
}

function getStoredPatientId(): string {
  try {
    const stored =
      localStorage.getItem(NEUROSENSE_USER_STORAGE_KEY) ||
      localStorage.getItem("alois-user-profile")
    const user = stored ? JSON.parse(stored) as Partial<AloisAuthUser> : null
    return user?.patientId || createPatientId()
  } catch {
    return createPatientId()
  }
}

function NeuroSenseAvatarLogo({
  role = "you",
}: {
  role?: "you" | "caregiver" | "caregiverVerify" | "register"
}) {
  const isCaretaker = role === "caregiver" || role === "caregiverVerify"
  const isRegister = role === "register"

  return (
    <div className="flex flex-col items-center justify-center mx-auto mb-4 select-none">
      {/* 3D Circular Avatar Emblem with Floating Glow Halo */}
      <div className="relative group">
        {/* Ambient Warm Golden Halo Glow */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#F5CE57]/50 via-[#E5BE45]/30 to-[#F5CE57]/60 blur-lg opacity-85 group-hover:opacity-100 transition-opacity" />

        {/* Outer Metallic Ring */}
        <div className="relative w-20 h-20 rounded-full p-[3px] bg-gradient-to-tr from-[#2A2724] via-[#F5CE57] to-[#1A1A1A] shadow-xl flex items-center justify-center">
          {/* Inner Badge Background */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#1C1A17] to-[#0D0C0B] flex items-center justify-center p-2 relative overflow-hidden border border-white/10">
            {/* Specular Highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-transparent pointer-events-none" />

            {/* Logo Image / Avatar Glyph */}
            <img
              src="/logo.jpeg"
              alt="NeuroSense Logo"
              className="w-12 h-12 rounded-full object-contain filter drop-shadow-[0_2px_10px_rgba(245,206,87,0.45)]"
            />
          </div>
        </div>

        {/* Interactive Role Badge in Corner */}
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#1A1A1A] border-2 border-white text-white flex items-center justify-center shadow-md text-xs font-bold">
          {isRegister ? (
            <span title="New Registration">✨</span>
          ) : isCaretaker ? (
            <span title="Caretaker Mode">🛡️</span>
          ) : (
            <span title="Patient Mode">🧠</span>
          )}
        </div>
      </div>

      <div className="mt-2.5 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5CE57]/20 border border-[#F5CE57]/40 text-[#8C6D0F] text-[11px] font-extrabold tracking-wider uppercase shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5BE45] animate-pulse" />
          <span>NeuroSense AI</span>
        </div>
      </div>
    </div>
  )
}

const AloisLogo = NeuroSenseAvatarLogo

const inputClass =
  "w-full px-4 py-3 rounded-2xl bg-white border border-black/[0.08] text-[14px] text-[#1A1A1A] placeholder:text-[#9E988F] focus:outline-hidden focus:ring-2 focus:ring-[#F5CE57] focus:border-[#E5BE45] shadow-xs transition-all"

export default function AloisAuthContainer({
  onAuthenticated,
  fontFamily = "'Outfit', sans-serif",
  onBackToHome,
}: AloisAuthContainerProps) {
  const [screen, setScreen] = useState<AuthScreen>("you")
  const [loginIdentifier, setLoginIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showRegPassword, setShowRegPassword] = useState(false)
  const [regAgreeTerms, setRegAgreeTerms] = useState(false)

  // Caregiver access state
  const [caregiverPhoneInput, setCaregiverPhoneInput] = useState("")
  const [caregiverPinInput, setCaregiverPinInput] = useState("")
  const [showCaregiverPin, setShowCaregiverPin] = useState(false)
  const [activeGeneratedOtp, setActiveGeneratedOtp] = useState<string | null>(
    null,
  )
  const [linkedPatientName, setLinkedPatientName] = useState<string | null>(
    null,
  )

  const [otpDigits, setOtpDigits] = useState(["", "", "", ""])
  const [resendCountdown, setResendCountdown] = useState(300)
  const [authError, setAuthError] = useState<string | null>(null)
  const [authSuccess, setAuthSuccess] = useState<string | null>(null)
  const [isBusy, setIsBusy] = useState(false)

  // WhatsApp confirmation dialog state
  const [whatsAppData, setWhatsAppModal] = useState<{
    open: boolean
    phone: string
    password: string
    fullName: string
    caregiverName: string
    caregiverPhone: string
    caregiverPin: string
    waUrl: string
    userToAuthenticate?: AloisAuthUser
  } | null>(null)

  const [formData, setFormData] = useState<AloisAuthUser>({
    patientId: getStoredPatientId(),
    username: "",
    fullName: "",
    gender: "",
    age: "",
    dob: "",
    email: "",
    phone: "",
    city: "",
    diagnosis: "Select",
    stage: "Select",
    caregiverName: "",
    caregiverEmail: "",
    caregiverPhone: "",
    caregiverPin: "",
  })

  useEffect(() => {
    if (screen !== "caregiverVerify" || resendCountdown <= 0) return
    const timer = window.setInterval(() => {
      setResendCountdown((countdown) => countdown - 1)
    }, 1000)
    return () => window.clearInterval(timer)
  }, [screen, resendCountdown])

  const completeAuthentication = (user: AloisAuthUser) => {
    const authenticatedUser = {
      ...user,
      patientId: user.patientId || createPatientId(),
    }
    try {
      localStorage.setItem(
        ALOIS_USER_STORAGE_KEY,
        JSON.stringify(authenticatedUser),
      )
      localStorage.setItem(ALOIS_AUTH_SESSION_KEY, "active")
    } catch {
      // Ignore storage errors and continue into the app.
    }
    onAuthenticated(authenticatedUser)
  }

  const updateForm = (field: keyof AloisAuthUser, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  // Caretaker Direct PIN Login
  // Caretaker Direct PIN Login (PIN Only - No WhatsApp number required)
  const handleCaretakerPinLogin = async () => {
    setAuthError(null)
    setAuthSuccess(null)

    const cleanPin = caregiverPinInput.replace(/\D/g, "")
    if (cleanPin.length !== 4) {
      setAuthError("Please enter your 4-digit Caretaker PIN.")
      return
    }

    setIsBusy(true)
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)

      let response: Response
      try {
        response = await fetch(`${getApiBaseUrl()}/api/auth/caretaker/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            pin: cleanPin,
          }),
        })
      } finally {
        clearTimeout(timeoutId)
      }

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(
          errData.detail ||
            "Invalid 4-digit Caretaker PIN. Please check your PIN and try again.",
        )
      }

      const res = await response.json()
      await setCaregiverPin(cleanPin)

      const authUser: AloisAuthUser = {
        patientId: res.linked_patient.patient_id,
        fullName: `${res.caregiver_name} (Caretaker)`,
        username: res.caregiver_name,
        phone: res.caregiver_phone,
        gender: res.linked_patient.gender || "",
        age: String(res.linked_patient.age || ""),
        dob: "",
        email: `${res.clean_caregiver_phone || cleanPin}@neurosense.app`,
        city: "",
        diagnosis: "Monitored",
        stage: "Caregiver Assisted",
        caregiverName: res.caregiver_name,
        caregiverPhone: res.caregiver_phone,
        caregiverEmail: "",
        caregiverPin: cleanPin,
        isCaregiver: true,
        linkedPatientId: res.linked_patient.patient_id,
        linkedPatientName: res.linked_patient.full_name,
      }

      completeAuthentication(authUser)
    } catch (err: unknown) {
      let msg = "Caretaker authentication failed."
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          msg =
            "Connection timed out. Please verify the backend server is running on port 8001."
        } else {
          msg = err.message
        }
      }
      setAuthError(msg)
    } finally {
      setIsBusy(false)
    }
  }

  // Caretaker OTP Generation (Unique, Random, Time-Limited)
  const handleGenerateCaretakerOtp = async () => {
    setAuthError(null)
    setAuthSuccess(null)

    const cleanPhone = caregiverPhoneInput.replace(/\D/g, "")
    if (cleanPhone.length < 10) {
      setAuthError("Please enter a valid 10-digit Caretaker WhatsApp number.")
      return
    }

    setIsBusy(true)
    try {
      const response = await fetch(
        `${getApiBaseUrl()}/api/auth/caretaker/request-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: cleanPhone }),
        },
      )

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(
          errData.detail ||
            "This Caretaker WhatsApp number is not registered. Please register first.",
        )
      }

      const res = await response.json()
      setActiveGeneratedOtp(res.otp)
      setLinkedPatientName(res.patient_name)
      setOtpDigits(["", "", "", ""])
      setResendCountdown(res.expires_in || 300)
      setScreen("caregiverVerify")
      setAuthSuccess(
        `Generated unique security code: ${res.otp} (Valid for 5 minutes for patient ${res.patient_name}).`,
      )
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to generate verification code."
      setAuthError(msg)
    } finally {
      setIsBusy(false)
    }
  }

  // Caretaker OTP Verification
  const handleVerifyCaretakerOtp = async () => {
    setAuthError(null)
    setAuthSuccess(null)

    const cleanPhone = caregiverPhoneInput.replace(/\D/g, "")
    const enteredOtp = otpDigits.join("")

    if (enteredOtp.length !== 4) {
      setAuthError("Please enter all 4 digits of the verification code.")
      return
    }

    setIsBusy(true)
    try {
      const response = await fetch(
        `${getApiBaseUrl()}/api/auth/caretaker/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: cleanPhone,
            otp: enteredOtp,
          }),
        },
      )

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(
          errData.detail ||
            "Invalid verification code. Please check and try again.",
        )
      }

      const res = await response.json()
      const authUser: AloisAuthUser = {
        patientId: res.linked_patient.patient_id,
        fullName: `${res.caregiver_name} (Caretaker)`,
        username: res.caregiver_name,
        phone: res.caregiver_phone,
        gender: res.linked_patient.gender || "",
        age: String(res.linked_patient.age || ""),
        dob: "",
        email: `${cleanPhone}@neurosense.app`,
        city: "",
        diagnosis: "Monitored",
        stage: "Caregiver Assisted",
        caregiverName: res.caregiver_name,
        caregiverPhone: res.caregiver_phone,
        caregiverEmail: "",
        isCaregiver: true,
        linkedPatientId: res.linked_patient.patient_id,
        linkedPatientName: res.linked_patient.full_name,
      }

      completeAuthentication(authUser)
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Verification failed. Please check the code."
      setAuthError(msg)
      setOtpDigits(["", "", "", ""])
    } finally {
      setIsBusy(false)
    }
  }

  // Patient Registration & Login handler
  const handleFinishLogin = async (registration = false) => {
    setAuthError(null)
    setAuthSuccess(null)

    if (registration) {
      // 1. Full Name validation
      if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
        setAuthError("Please enter patient's full name.")
        return
      }

      // 2. Patient WhatsApp Number validation
      const pDigits = formData.phone.replace(/\D/g, "")
      if (pDigits.length < 10) {
        setAuthError(
          "Please enter a valid 10-digit patient WhatsApp phone number.",
        )
        return
      }

      // 3. Password validation
      if (!password.trim() || password.length < 6) {
        setAuthError("Password must be at least 6 characters.")
        return
      }

      // 4. Age validation
      if (
        !formData.age ||
        Number(formData.age) < 1 ||
        Number(formData.age) > 120
      ) {
        setAuthError("Please enter a valid age (1-120).")
        return
      }

      // 5. Gender validation
      if (!formData.gender) {
        setAuthError("Please select patient's gender.")
        return
      }

      // 6. Caretaker Name validation
      if (
        !formData.caregiverName.trim() ||
        formData.caregiverName.trim().length < 2
      ) {
        setAuthError("Please enter caretaker/family member's full name.")
        return
      }

      // 7. Caretaker WhatsApp Number validation
      const cDigits = formData.caregiverPhone.replace(/\D/g, "")
      if (cDigits.length < 10) {
        setAuthError(
          "Please enter a valid 10-digit caretaker WhatsApp phone number.",
        )
        return
      }

      // 8. Caretaker PIN validation (exactly 4 digits)
      const pinDigits = (formData.caregiverPin || "").replace(/\D/g, "")
      if (pinDigits.length !== 4) {
        setAuthError("Please set a 4-digit numeric Caretaker PIN.")
        return
      }

      // 9. Terms agreement validation
      if (!regAgreeTerms) {
        setAuthError("Please accept the terms of service.")
        return
      }

      setIsBusy(true)

      const patientPhoneKey = pDigits.slice(-10)
      const patientPhoneWithCode =
        pDigits.length === 10 ? `91${pDigits}` : pDigits
      const virtualEmail = `${patientPhoneKey}@neurosense.app`

      const waText = `*NeuroSense Healthcare Account Created* 🩺\n\n👤 *Patient:* ${formData.fullName.trim()}\n📱 *Patient WhatsApp:* +${patientPhoneWithCode}\n🔑 *Password:* ${password}\n\n🛡️ *Caretaker:* ${formData.caregiverName.trim()}\n📱 *Caretaker WhatsApp:* +${cDigits}\n🔢 *Caretaker PIN:* ${pinDigits}\n\nBoth the patient and caretaker can now access NeuroSense anytime!`
      const waUrl = `https://wa.me/${patientPhoneWithCode}?text=${encodeURIComponent(waText)}`

      try {
        window.open(waUrl, "_blank")
      } catch {
        // Fallback for pop-up blockers
      }

      try {
        // Step A: Register in Backend Database (AuthStore SQLite + Supabase Mirror)
        const response = await fetch(`${getApiBaseUrl()}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: formData.fullName.trim(),
            phone: formData.phone.trim(),
            password: password.trim(),
            age: Number(formData.age),
            gender: formData.gender,
            caregiver_name: formData.caregiverName.trim(),
            caregiver_phone: formData.caregiverPhone.trim(),
            caregiver_pin: pinDigits,
            patient_id: formData.patientId,
          }),
        })

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}))
          throw new Error(errData.detail || "Registration failed on backend.")
        }

        const regData = await response.json()

        // Step B: Set local caregiver gate PIN on device
        await setCaregiverPin(pinDigits)

        // Step C: Background sync with Supabase Auth
        registerVerifiedSupabaseUser({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          password: password.trim(),
          age: Number(formData.age),
          gender: formData.gender,
        }).catch(() => {})

        upsertMyPatientProfile({
          patientId: regData.patient_id || formData.patientId,
          username: formData.fullName.trim(),
          fullName: formData.fullName.trim(),
          age: Number(formData.age),
          gender: formData.gender,
          phone: formData.phone.trim(),
          caregiverName: formData.caregiverName.trim(),
          caregiverPhone: formData.caregiverPhone.trim(),
        }).catch(() => {})

        const authenticatedUser: AloisAuthUser = {
          ...formData,
          patientId: regData.patient_id || formData.patientId,
          username: formData.fullName.trim(),
          fullName: formData.fullName.trim(),
          email: virtualEmail,
          phone: formData.phone.trim(),
          caregiverName: formData.caregiverName.trim(),
          caregiverPhone: formData.caregiverPhone.trim(),
          caregiverPin: pinDigits,
          isCaregiver: false,
        }

        // Show confirmation modal with full credentials
        setWhatsAppModal({
          open: true,
          phone: patientPhoneWithCode,
          password,
          fullName: formData.fullName.trim(),
          caregiverName: formData.caregiverName.trim(),
          caregiverPhone: cDigits,
          caregiverPin: pinDigits,
          waUrl,
          userToAuthenticate: authenticatedUser,
        })
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Registration failed. Please try again."
        setAuthError(message)
      } finally {
        setIsBusy(false)
      }
    } else {
      // PATIENT LOGIN FLOW: Name or WhatsApp Number + Password
      const raw = loginIdentifier.trim()
      if (!raw) {
        setAuthError("Please enter your name or WhatsApp number.")
        return
      }

      if (!password.trim()) {
        setAuthError("Please enter your password.")
        return
      }

      setIsBusy(true)

      try {
        // Attempt backend login first
        const res = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: raw,
            password: password.trim(),
          }),
        })

        if (res.ok) {
          const data = await res.json()
          const u = data.user
          const authenticatedUser: AloisAuthUser = {
            ...formData,
            patientId: u.patient_id || formData.patientId,
            fullName: u.full_name,
            username: u.full_name,
            phone: u.phone,
            email: `${u.clean_phone || u.phone}@neurosense.app`,
            age: u.age ? String(u.age) : formData.age,
            gender: u.gender || formData.gender,
            caregiverName: u.caregiver_name || formData.caregiverName,
            caregiverPhone: u.caregiver_phone || formData.caregiverPhone,
            isCaregiver: false,
          }
          completeAuthentication(authenticatedUser)
          return
        }

        // Fallback: Supabase login
        let emailToUse = raw.includes("@") ? raw.toLowerCase() : ""
        let resolvedName = raw

        if (!emailToUse) {
          const digits = raw.replace(/\D/g, "")
          if (digits.length >= 10) {
            emailToUse = `${digits.slice(-10)}@neurosense.app`
          } else {
            const lookup = await lookupVerifiedSupabaseUser(raw).catch(
              () => null,
            )
            if (lookup && lookup.found && lookup.email) {
              emailToUse = lookup.email
              if (lookup.fullName) resolvedName = lookup.fullName
            }
          }
        }

        if (!emailToUse) {
          throw new Error("Invalid name/WhatsApp number or password.")
        }

        const authResult = await supabase.auth.signInWithPassword({
          email: emailToUse,
          password: password.trim(),
        })

        if (authResult.error) {
          throw new Error("Invalid name/WhatsApp number or password.")
        }

        const authenticatedUser: AloisAuthUser = {
          ...formData,
          fullName: resolvedName,
          username: resolvedName,
          email: emailToUse,
          isCaregiver: false,
        }

        completeAuthentication(authenticatedUser)
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Invalid name/WhatsApp number or password."
        setAuthError(message)
      } finally {
        setIsBusy(false)
      }
    }
  }

  const handleKeypadPress = (value: string) => {
    if (value === "backspace") {
      for (let index = otpDigits.length - 1; index >= 0; index -= 1) {
        if (otpDigits[index]) {
          const next = [...otpDigits]
          next[index] = ""
          setOtpDigits(next)
          break
        }
      }
      return
    }

    const index = otpDigits.findIndex((digit) => digit === "")
    if (index >= 0) {
      const next = [...otpDigits]
      next[index] = value
      setOtpDigits(next)
    }
  }

  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center bg-[#0C0B0A] p-2 sm:p-4 select-none">
      <RealPhoneFrame isExpanded={false} lang="en">
        <div className="w-full flex-1 flex flex-col h-full min-h-0 overflow-y-auto bg-[#F7F5F0] text-[#1A1A1A] relative">
          {/* Top Status Bar */}
          <div className="h-10 px-6 pt-2 flex items-center justify-between text-[#1A1A1A] text-[13px] font-semibold shrink-0 z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-xs text-[#544F49]">
              <span className="text-[10px] font-bold">5G</span>
              <div className="w-4 h-2.5 rounded-xs border border-current p-0.5 flex items-center">
                <div className="w-full h-full bg-current rounded-2xs" />
              </div>
            </div>
          </div>

          {/* WhatsApp Credential Dispatch Modal */}
          {whatsAppData?.open && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
              <div className="w-full max-h-[720px] overflow-y-auto bg-white rounded-3xl p-5 shadow-2xl text-center space-y-3.5 border border-emerald-100">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#161616]">
                    Account & Caretaker Registered!
                  </h3>
                  <p className="text-[11px] text-[#525252] mt-0.5">
                    Credentials prepared for WhatsApp delivery:
                  </p>
                  <div className="mt-1.5 py-1 px-3 rounded-lg bg-emerald-50 text-emerald-800 text-[12px] font-semibold border border-emerald-200 inline-block">
                    +{whatsAppData.phone}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-left text-[11px] space-y-1.5 text-slate-700 border border-slate-200">
                  <div className="font-semibold text-slate-900 border-b pb-1 text-[12px] flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Patient Credentials:</span>
                  </div>
                  <div>
                    <span className="font-semibold">Name:</span>{" "}
                    {whatsAppData.fullName}
                  </div>
                  <div>
                    <span className="font-semibold">Password:</span>{" "}
                    <span className="font-mono font-bold text-blue-600">
                      {whatsAppData.password}
                    </span>
                  </div>

                  <div className="font-semibold text-slate-900 border-b pt-1.5 pb-1 text-[12px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Caretaker Access:</span>
                  </div>
                  <div>
                    <span className="font-semibold">Caretaker:</span>{" "}
                    {whatsAppData.caregiverName}
                  </div>
                  <div>
                    <span className="font-semibold">WhatsApp:</span> +
                    {whatsAppData.caregiverPhone}
                  </div>
                  <div>
                    <span className="font-semibold">Caretaker PIN:</span>{" "}
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-100/60 px-1 rounded">
                      {whatsAppData.caregiverPin}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <a
                    href={whatsAppData.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Open WhatsApp Message
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      if (whatsAppData.userToAuthenticate) {
                        completeAuthentication(whatsAppData.userToAuthenticate)
                      }
                      setWhatsAppModal(null)
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <span>Continue to App</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LOGIN SCREENS: You (Patient) & Caregiver (Caretaker) */}
          {(screen === "you" ||
            screen === "caregiver" ||
            screen === "caregiverVerify") && (
            <div className="flex-1 overflow-y-auto px-5 pt-1 pb-6 flex flex-col justify-between">
              <div>
                {onBackToHome && (
                  <div className="flex items-center justify-between mb-3 px-1">
                    <button
                      type="button"
                      onClick={onBackToHome}
                      className="px-3 py-1.5 rounded-full bg-white border border-black/[0.06] hover:bg-[#FAF8F5] text-xs font-bold text-[#544F49] hover:text-[#1A1A1A] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Homepage / About</span>
                    </button>
                    <span className="text-[11px] font-bold text-[#78716A] uppercase tracking-wider bg-black/[0.04] px-2.5 py-1 rounded-full">
                      {screen === "caregiver" || screen === "caregiverVerify"
                        ? "Caretaker Portal"
                        : "Patient Portal"}
                    </span>
                  </div>
                )}

                {/* 3D Avatar Logo with Golden Halo */}
                <AloisLogo role={screen} />

                <div className="text-center mb-4">
                  <h1
                    style={{ fontFamily }}
                    className="text-[22px] font-bold text-[#1A1A1A] tracking-tight leading-tight"
                  >
                    Welcome Back!
                  </h1>
                  <p className="text-[13px] text-[#78716A] mt-1">
                    {screen === "caregiver" || screen === "caregiverVerify"
                      ? "Caretaker & family guardian sign in"
                      : "Choose who is signing in to continue"}
                  </p>
                  {authError && (
                    <p className="text-[12px] text-rose-700 mt-2.5 bg-rose-50 p-2.5 rounded-xl border border-rose-200 font-medium">
                      {authError}
                    </p>
                  )}
                  {authSuccess && (
                    <p className="text-[12px] text-emerald-800 mt-2.5 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-medium">
                      {authSuccess}
                    </p>
                  )}
                </div>

                {/* Tab Selector: Patient vs Caregiver (Lisso Editorial Style) */}
                <div className="flex p-1 bg-[#EAE6DF] rounded-2xl mb-5 border border-black/[0.04]">
                  {([
                    ["you", "Patient", "🧠"],
                    ["caregiver", "Caretaker", "🛡️"],
                  ] as const).map(([tab, label, emoji]) => {
                    const isActive =
                      screen === tab ||
                      (tab === "caregiver" && screen === "caregiverVerify")
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => {
                          setAuthError(null)
                          setAuthSuccess(null)
                          setScreen(tab)
                        }}
                        className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isActive
                            ? "bg-[#1A1A1A] text-white shadow-sm"
                            : "text-[#78716A] hover:text-[#1A1A1A] hover:bg-black/[0.03]"
                        }`}
                      >
                        <span>{emoji}</span>
                        <span>{label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Patient Login View */}
                {screen === "you" && (
                  <div className="space-y-4">
                    <label className="text-[12px] font-bold text-[#544F49] block">
                      Name or WhatsApp Number
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(event) =>
                          setLoginIdentifier(event.target.value)
                        }
                        placeholder="Enter patient name or WhatsApp"
                        className={`${inputClass} mt-1.5`}
                      />
                    </label>

                    <label className="text-[12px] font-bold text-[#544F49] block">
                      Password
                      <span className="relative block mt-1.5">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Enter your password"
                          className={`${inputClass} pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((visible) => !visible)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#78716A] hover:text-[#1A1A1A]"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => void handleFinishLogin(false)}
                      disabled={isBusy}
                      className="w-full py-3.5 rounded-2xl bg-[#1A1A1A] hover:bg-black text-white text-[15px] font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 group"
                    >
                      <span>{isBusy ? "Logging in..." : "Login"}</span>
                      <ArrowRight className="w-4 h-4 text-[#F5CE57] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}

                {/* Caregiver/Caretaker Access View (PIN Only) */}
                {screen === "caregiver" && (
                  <div className="space-y-4 pt-1">
                    <div className="p-3.5 bg-[#F0EDF7] rounded-2xl border border-[#DED6EB] text-[12px] text-[#583D7A] leading-relaxed shadow-2xs">
                      <div className="font-bold flex items-center gap-1.5 mb-1 text-[13px]">
                        <ShieldCheck className="w-4 h-4 text-[#583D7A]" />
                        <span>Caretaker Guardian Access</span>
                      </div>
                      Enter your 4-digit PIN to securely access patient history,
                      clinical inspection, and caregiver settings.
                    </div>

                    {/* 4-Digit PIN Input */}
                    <label className="text-[12px] font-bold text-[#544F49] block">
                      4-Digit Caretaker PIN
                      <span className="relative block mt-1.5">
                        <input
                          type={showCaregiverPin ? "text" : "password"}
                          maxLength={4}
                          value={caregiverPinInput}
                          onChange={(event) => {
                            const val = event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 4)
                            setCaregiverPinInput(val)
                            if (val.length === 4) {
                              setAuthError(null)
                            }
                          }}
                          onKeyDown={(e) => {
                            if (
                              e.key === "Enter" &&
                              caregiverPinInput.length === 4
                            ) {
                              void handleCaretakerPinLogin()
                            }
                          }}
                          placeholder="••••"
                          className={`${inputClass} tracking-widest font-mono text-center text-[24px] font-bold h-13`}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowCaregiverPin((visible) => !visible)
                          }
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#78716A] hover:text-[#1A1A1A]"
                          aria-label={
                            showCaregiverPin ? "Hide PIN" : "Show PIN"
                          }
                        >
                          {showCaregiverPin ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => void handleCaretakerPinLogin()}
                      disabled={isBusy || caregiverPinInput.length !== 4}
                      className="w-full py-3.5 rounded-2xl bg-[#1A1A1A] hover:bg-black text-white text-[15px] font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#F5CE57]" />
                      <span>{isBusy ? "Logging in..." : "Login with PIN"}</span>
                      <ArrowRight className="w-4 h-4 text-[#F5CE57] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}

                {/* Caregiver Verification View */}
                {screen === "caregiverVerify" && (
                  <div className="space-y-3 pt-1">
                    <div className="text-center space-y-1">
                      <div className="text-[13px] font-bold text-slate-800">
                        Enter 4-Digit Security Code
                      </div>
                      <p className="text-[11px] text-[#525252]">
                        Verification code for caretaker:{" "}
                        <span className="font-semibold text-slate-900">
                          +{caregiverPhoneInput}
                        </span>
                      </p>
                      {linkedPatientName && (
                        <p className="text-[11px] text-blue-700 font-medium bg-blue-50 py-0.5 px-2 rounded-md inline-block">
                          Patient: {linkedPatientName}
                        </p>
                      )}
                    </div>

                    {activeGeneratedOtp && (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1">
                        <div className="text-[11px] font-semibold text-emerald-800">
                          Active Time-Limited Code
                        </div>
                        <div className="text-[20px] font-mono font-bold tracking-widest text-emerald-900">
                          {activeGeneratedOtp}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setOtpDigits(activeGeneratedOtp.split(""))
                          }
                          className="text-[11px] text-emerald-700 underline font-medium hover:text-emerald-900"
                        >
                          Auto-fill code
                        </button>
                      </div>
                    )}

                    <div className="flex justify-center gap-3 py-1">
                      {otpDigits.map((digit, index) => (
                        <div
                          key={index}
                          className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-[22px] font-bold text-[#161616] ${
                            digit
                              ? "border-[#1A1A1A] bg-[#EAE6DF]/30"
                              : "border-black/[0.1] bg-white"
                          }`}
                        >
                          {digit}
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => void handleVerifyCaretakerOtp()}
                      disabled={isBusy}
                      className="w-full py-3.5 rounded-2xl bg-[#1A1A1A] hover:bg-black text-white text-[15px] font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>
                        {isBusy ? "Verifying..." : "Verify & Access Patient"}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#F5CE57] group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <div className="flex items-center justify-between text-[11px] text-[#525252] pt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setOtpDigits(["", "", "", ""])
                          setScreen("caregiver")
                        }}
                        className="text-[#525252] hover:text-[#161616] underline"
                      >
                        ← Back
                      </button>

                      <div>
                        {resendCountdown > 0 ? (
                          <span>
                            Expires in {Math.floor(resendCountdown / 60)}:
                            {(resendCountdown % 60).toString().padStart(2, "0")}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => void handleGenerateCaretakerOtp()}
                            className="text-[#1A1A1A] font-bold hover:underline"
                          >
                            Resend Code
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1 pt-1">
                      {[
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "",
                        "0",
                        "backspace",
                      ].map((key, index) =>
                        key ? (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleKeypadPress(key)}
                            className="h-10 rounded-lg bg-[#F4F4F4] hover:bg-slate-200 flex items-center justify-center text-[#161616]"
                          >
                            {key === "backspace" ? (
                              <Delete className="w-5 h-5 text-[#525252]" />
                            ) : (
                              key
                            )}
                          </button>
                        ) : (
                          <div key={index} className="h-10" />
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center pt-3 border-t border-black/[0.06] mt-4">
                <span className="text-[13px] text-[#78716A]">
                  New to NeuroSense?{" "}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthError(null)
                    setAuthSuccess(null)
                    setScreen("register")
                  }}
                  className="text-[13px] font-bold text-[#1A1A1A] hover:underline cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}

          {/* REGISTER SCREEN: Patient & Caretaker Complete Form */}
          {screen === "register" && (
            <div className="flex-1 overflow-y-auto px-5 pt-1 pb-6 flex flex-col justify-between">
              <div>
                <AloisLogo role="register" />
                <div className="text-center mb-3">
                  <h1
                    style={{ fontFamily }}
                    className="text-[20px] font-bold text-[#1A1A1A]"
                  >
                    Create Account
                  </h1>
                  <p className="text-[12px] text-[#78716A] mt-0.5">
                    Patient & Caretaker Profile Setup
                  </p>
                  {authError && (
                    <p className="text-[12px] text-rose-700 mt-2 bg-rose-50 p-2 rounded-xl border border-rose-200">
                      {authError}
                    </p>
                  )}
                  {authSuccess && (
                    <p className="text-[12px] text-emerald-800 mt-2 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                      {authSuccess}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {/* Section 1: Patient Information */}
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#78716A] pt-1 border-b border-black/[0.06] pb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#1A1A1A]" />
                    <span>Patient Information</span>
                  </div>

                  {/* Full Name */}
                  <label className="text-[12px] font-bold text-[#544F49] block">
                    Full Name
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(event) =>
                        updateForm("fullName", event.target.value)
                      }
                      placeholder="Enter patient full name"
                      className={`${inputClass} mt-1`}
                    />
                  </label>

                  {/* Patient WhatsApp Phone Number */}
                  <label className="text-[12px] font-bold text-[#544F49] block">
                    WhatsApp Number
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(event) =>
                        updateForm("phone", event.target.value)
                      }
                      placeholder="Patient WhatsApp number (10 digits)"
                      className={`${inputClass} mt-1`}
                    />
                  </label>

                  {/* Age and Gender */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <label className="text-[12px] font-bold text-[#544F49] block">
                      Age
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={formData.age}
                        onChange={(event) =>
                          updateForm("age", event.target.value)
                        }
                        placeholder="Age"
                        className={`${inputClass} mt-1`}
                      />
                    </label>
                    <label className="text-[12px] font-bold text-[#544F49] block">
                      Gender
                      <select
                        value={formData.gender}
                        onChange={(event) =>
                          updateForm("gender", event.target.value)
                        }
                        className={`${inputClass} mt-1`}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </label>
                  </div>

                  {/* Password */}
                  <label className="text-[12px] font-bold text-[#544F49] block">
                    Password
                    <span className="relative block mt-1">
                      <input
                        type={showRegPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Create login password (min 6 chars)"
                        className={`${inputClass} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowRegPassword((visible) => !visible)
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#78716A]"
                        aria-label={
                          showRegPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showRegPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </span>
                  </label>

                  {/* Section 2: Caretaker Details */}
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#78716A] pt-2 border-b border-black/[0.06] pb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Caretaker Information & Access</span>
                  </div>

                  {/* Caretaker Name */}
                  <label className="text-[12px] font-bold text-[#544F49] block">
                    Caretaker Name
                    <input
                      type="text"
                      value={formData.caregiverName}
                      onChange={(event) =>
                        updateForm("caregiverName", event.target.value)
                      }
                      placeholder="Enter caretaker/family member name"
                      className={`${inputClass} mt-1`}
                    />
                  </label>

                  {/* Caretaker WhatsApp Number */}
                  <label className="text-[12px] font-bold text-[#544F49] block">
                    Caretaker WhatsApp Number
                    <input
                      type="tel"
                      value={formData.caregiverPhone}
                      onChange={(event) =>
                        updateForm("caregiverPhone", event.target.value)
                      }
                      placeholder="Caretaker WhatsApp (10 digits)"
                      className={`${inputClass} mt-1`}
                    />
                  </label>

                  {/* Caretaker 4-digit PIN */}
                  <label className="text-[12px] font-bold text-[#544F49] block">
                    Caretaker PIN/OTP (4 digits)
                    <span className="relative block mt-1">
                      <input
                        type={showCaregiverPin ? "text" : "password"}
                        maxLength={4}
                        value={formData.caregiverPin || ""}
                        onChange={(event) =>
                          updateForm(
                            "caregiverPin",
                            event.target.value.replace(/\D/g, "").slice(0, 4),
                          )
                        }
                        placeholder="Set 4-digit security PIN"
                        className={`${inputClass} pr-10 font-mono tracking-widest text-[15px]`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCaregiverPin((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#78716A]"
                        aria-label={showCaregiverPin ? "Hide PIN" : "Show PIN"}
                      >
                        {showCaregiverPin ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </span>
                    <span className="text-[11px] text-[#78716A] mt-0.5 block">
                      Used by caretaker for direct access and emergency
                      clinician view.
                    </span>
                  </label>

                  {/* WhatsApp Dispatch Notice */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] leading-tight">
                    <span className="text-[14px]">📱</span>
                    <span>
                      Login credentials and caretaker PIN will be dispatched to
                      WhatsApp upon registration.
                    </span>
                  </div>

                  {/* Terms Agreement */}
                  <label className="flex items-start gap-2 pt-1 text-[11px] text-[#78716A] leading-snug cursor-pointer">
                    <input
                      type="checkbox"
                      checked={regAgreeTerms}
                      onChange={(event) =>
                        setRegAgreeTerms(event.target.checked)
                      }
                      className="w-4 h-4 mt-0.5 rounded border-black/20 text-[#1A1A1A] focus:ring-0"
                    />
                    <span>
                      I agree to the terms of the Alzheimer&apos;s Association.
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => void handleFinishLogin(true)}
                    disabled={isBusy}
                    className="w-full py-3.5 rounded-2xl bg-[#1A1A1A] hover:bg-black text-white text-[15px] font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>
                      {isBusy
                        ? "Creating accounts..."
                        : "Register & Save Details"}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#F5CE57] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="text-center pt-3 border-t border-black/[0.06] mt-4">
                <span className="text-[13px] text-[#78716A]">
                  Already have an account?{" "}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthError(null)
                    setAuthSuccess(null)
                    setScreen("you")
                  }}
                  className="text-[13px] font-bold text-[#1A1A1A] hover:underline cursor-pointer"
                >
                  Login
                </button>
              </div>
            </div>
          )}

          {/* Bottom Home Indicator */}
          <div className="h-6 flex items-center justify-center shrink-0">
            <div className="w-32 h-1 bg-[#1A1A1A]/30 rounded-full" />
          </div>
        </div>
      </RealPhoneFrame>
    </div>
  )
}
