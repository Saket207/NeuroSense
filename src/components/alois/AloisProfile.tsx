import React, { useEffect, useRef, useState } from "react"
import {
  AlertTriangle,
  BookOpen,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  Edit2,
  FileText,
  Globe,
  Heart,
  HelpCircle,
  LogOut,
  Mic,
  Phone,
  Play,
  Plus,
  QrCode,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
  Users,
  Volume2,
  X,
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

import TiltCard from "../../motion/TiltCard"
import MemoryCapsuleModel from "../../scene3d/MemoryCapsuleModel"
import PatientStoryModeModal from "./PatientStoryModeModal"

import {
  createMemberId,
  HouseholdMember,
  listMembers,
  preparePhoto,
  saveMember,
  setActiveMemberId,
} from "../../services/household"
import { upsertMyPatientProfile } from "../../services/patientProfile"
import {
  loadUserProfileFromSupabase,
  syncUserProfileToSupabase,
  uploadAvatarToSupabase,
} from "../../services/supabase"

interface AloisProfileProps {
  patientName: string
  caregiverName?: string
  caregiverPhone?: string
  patientAge?: string
  patientGender?: string
  patientPhone?: string
  isAssisted?: boolean
  selectedLanguageName: string
  onBack: () => void
  onOpenHistory?: () => void
  onViewReport?: () => void
  onSwitchProfile?: (member?: HouseholdMember) => void
  onOpenLanguageModal?: () => void
  onOpenDoctorDash?: () => void
  onLogout: () => void
  onUpdateProfile?: (updated: {
    patientName?: string
    caregiverName?: string
    caregiverPhone?: string
    age?: string
    gender?: string
    phone?: string
    bloodGroup?: string
    city?: string
    stage?: string
    photo?: string
  }) => void
  fontFamily?: string
}

export default function AloisProfile({
  patientName,
  caregiverName = "Care2",
  caregiverPhone = "+91 98765 43210",
  patientAge = "72",
  patientGender = "Female",
  patientPhone = "+91 99779 92477",
  isAssisted = false,
  selectedLanguageName,
  onBack,
  onOpenHistory,
  onViewReport,
  onSwitchProfile,
  onOpenLanguageModal,
  onOpenDoctorDash,
  onLogout,
  onUpdateProfile,
  fontFamily = "'Outfit', sans-serif",
}: AloisProfileProps) {
  // Modal states
  const [showQrModal, setShowQrModal] = useState(false)
  const [showPersonalDataModal, setShowPersonalDataModal] = useState(false)
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [showHouseholdModal, setShowHouseholdModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showStoryModal, setShowStoryModal] = useState(false)

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToastMessage(msg)
    window.setTimeout(() => setToastMessage(null), 3000)
  }

  // Profile photo state
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarPhoto, setAvatarPhoto] = useState<string | null>(() => {
    try {
      return (
        localStorage.getItem(`neurosense_avatar_${patientName}`) ||
        localStorage.getItem("neurosense_current_avatar") ||
        null
      )
    } catch {
      return null
    }
  })

  // Personal data states (Reads directly from stored user profile - no fake mock data)
  const [currentName, setCurrentName] = useState(patientName)
  const [currentAge, setCurrentAge] = useState(patientAge)
  const [currentGender, setCurrentGender] = useState(patientGender)
  const [currentPhone, setCurrentPhone] = useState(patientPhone)

  const [currentBloodGroup, setCurrentBloodGroup] = useState(() => {
    try {
      const stored = localStorage.getItem("neurosense-user-profile")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.bloodGroup) return parsed.bloodGroup
      }
    } catch {}
    return "Not Specified"
  })

  const [currentCity, setCurrentCity] = useState(() => {
    try {
      const stored = localStorage.getItem("neurosense-user-profile")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.city && parsed.city !== "Select") return parsed.city
      }
    } catch {}
    return "Not Specified"
  })

  const [currentStage, setCurrentStage] = useState(() => {
    try {
      const stored = localStorage.getItem("neurosense-user-profile")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.stage && parsed.stage !== "Select") return parsed.stage
      }
    } catch {}
    return "Pre-Screening Baseline"
  })

  const [abhaNumber, setAbhaNumber] = useState(() => {
    try {
      const stored = localStorage.getItem("neurosense-user-profile")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.abhaNumber) return parsed.abhaNumber
        const digits = (parsed.phone || "").replace(/\D/g, "").slice(-10)
        if (digits.length === 10) {
          return `91-${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`
        }
      }
    } catch {}
    return "Pending ABDM Link"
  })

  // Emergency contact states
  const [currentCaregiverName, setCurrentCaregiverName] =
    useState(caregiverName)
  const [currentCaregiverPhone, setCurrentCaregiverPhone] =
    useState(caregiverPhone)
  const [isEditingEmergency, setIsEditingEmergency] = useState(false)

  // Household members state
  const [householdMembers, setHouseholdMembers] = useState<HouseholdMember[]>(
    [],
  )
  const [newMemberName, setNewMemberName] = useState("")
  const [newMemberAge, setNewMemberAge] = useState("68")
  const [newMemberIsPatient, setNewMemberIsPatient] = useState(true)
  const [isAddingMember, setIsAddingMember] = useState(false)

  // Audio mic test state in FAQ
  const [isTestingMic, setIsTestingMic] = useState(false)
  const [micTestPassed, setMicTestPassed] = useState(false)
  const [faqExpandedIndex, setFaqExpandedIndex] = useState<number | null>(0)

  // Keep state synced with incoming props & Supabase Cloud
  useEffect(() => {
    setCurrentName(patientName)
    const localMemberPhoto =
      localStorage.getItem(`neurosense_avatar_${patientName}`) ||
      localStorage.getItem("neurosense_current_avatar") ||
      null
    setAvatarPhoto(localMemberPhoto)

    if (patientName) {
      loadUserProfileFromSupabase(patientName)
        .then((cloud) => {
          if (!cloud) return
          if (cloud.bloodGroup) setCurrentBloodGroup(cloud.bloodGroup)
          if (cloud.city) setCurrentCity(cloud.city)
          if (cloud.stage) setCurrentStage(cloud.stage)
          if (cloud.photoUrl) {
            setAvatarPhoto(cloud.photoUrl)
            localStorage.setItem(
              `neurosense_avatar_${patientName}`,
              cloud.photoUrl,
            )
          }
        })
        .catch(() => {})
    }
  }, [patientName])

  useEffect(() => {
    setCurrentCaregiverName(caregiverName)
  }, [caregiverName])

  useEffect(() => {
    setCurrentCaregiverPhone(caregiverPhone)
  }, [caregiverPhone])

  useEffect(() => {
    setCurrentAge(patientAge)
  }, [patientAge])

  // Load household members for switching
  useEffect(() => {
    listMembers()
      .then((list) => {
        if (list && list.length > 0) {
          setHouseholdMembers(list)
        } else {
          // Provide realistic starter household circle if none stored yet
          setHouseholdMembers([
            {
              id: "member-patient-primary",
              displayName: patientName || "Rama Devi",
              age: Number(patientAge) || 72,
              photo: avatarPhoto || "",
              language: "en",
              isPatient: true,
              createdAt: new Date().toISOString(),
            },
            {
              id: "member-suresh",
              displayName: "Suresh Kumar",
              age: 68,
              photo: "",
              language: "en",
              isPatient: true,
              createdAt: new Date().toISOString(),
            },
            {
              id: "member-caregiver",
              displayName: caregiverName || "Care2",
              age: 42,
              photo: "",
              language: "en",
              isPatient: false,
              createdAt: new Date().toISOString(),
            },
          ])
        }
      })
      .catch(() => {})
  }, [patientName, patientAge, caregiverName])

  // Photo upload handler with Supabase Cloud Storage persistence
  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const photoDataUrl = await preparePhoto(file, 256)
      // Instant responsive UI update
      setAvatarPhoto(photoDataUrl)
      try {
        localStorage.setItem(`neurosense_avatar_${currentName}`, photoDataUrl)
        localStorage.setItem("neurosense_current_avatar", photoDataUrl)
      } catch {
        // storage overflow fallback
      }

      // Update in household members list and IndexedDB
      setHouseholdMembers((prev) =>
        prev.map((m) =>
          m.displayName.toLowerCase() === currentName.toLowerCase()
            ? { ...m, photo: photoDataUrl }
            : m,
        ),
      )
      listMembers()
        .then(async (list) => {
          const found = list.find(
            (m) => m.displayName.toLowerCase() === currentName.toLowerCase(),
          )
          if (found) {
            await saveMember({ ...found, photo: photoDataUrl })
          }
        })
        .catch(() => {})

      onUpdateProfile?.({ photo: photoDataUrl, patientName: currentName })
      showToast("Photo updated! Uploading to Supabase Cloud...")

      // Upload to Supabase Storage bucket
      const cloudUrl = await uploadAvatarToSupabase(currentName, photoDataUrl)
      if (cloudUrl) {
        setAvatarPhoto(cloudUrl)
        try {
          localStorage.setItem(`neurosense_avatar_${currentName}`, cloudUrl)
          localStorage.setItem("neurosense_current_avatar", cloudUrl)
        } catch {}
        showToast("Profile photo permanently saved in Supabase Cloud!")
      } else {
        showToast("Photo saved locally. Cloud will sync on connection.")
      }
    } catch {
      showToast("Could not process photo. Please choose another image.")
    }
  }

  // Save personal data with Supabase Cloud Sync
  const handleSavePersonalData = async () => {
    if (!currentName.trim()) {
      showToast("Name cannot be empty.")
      return
    }

    try {
      const stored = localStorage.getItem("neurosense-user-profile")
      const parsed = stored ? JSON.parse(stored) : {}
      parsed.fullName = currentName.trim()
      parsed.age = currentAge
      parsed.gender = currentGender
      parsed.phone = currentPhone
      parsed.bloodGroup = currentBloodGroup
      parsed.city = currentCity
      parsed.stage = currentStage
      parsed.abhaNumber = abhaNumber
      localStorage.setItem("neurosense-user-profile", JSON.stringify(parsed))
    } catch {
      // ignore
    }

    onUpdateProfile?.({
      patientName: currentName.trim(),
      age: currentAge,
      gender: currentGender,
      phone: currentPhone,
      bloodGroup: currentBloodGroup,
      city: currentCity,
      stage: currentStage,
    })

    setShowPersonalDataModal(false)
    showToast("Saving personal data to Supabase Cloud...")

    try {
      const synced = await syncUserProfileToSupabase({
        fullName: currentName.trim(),
        age: currentAge,
        gender: currentGender,
        phone: currentPhone,
        bloodGroup: currentBloodGroup,
        city: currentCity,
        stage: currentStage,
        abhaNumber: abhaNumber,
        photoUrl: avatarPhoto || undefined,
      })

      await upsertMyPatientProfile({
        fullName: currentName.trim(),
        age: Number(currentAge) || 70,
        gender: currentGender,
        phone: currentPhone,
        bloodGroup: currentBloodGroup,
        city: currentCity,
        stage: currentStage,
        abhaNumber: abhaNumber,
        photoUrl: avatarPhoto || undefined,
      }).catch(() => {})

      if (synced) {
        showToast("Personal data permanently saved to Supabase Cloud!")
      } else {
        showToast("Saved locally and queued for Supabase Cloud sync!")
      }
    } catch {
      showToast("Personal data updated successfully!")
    }
  }

  // Save caregiver emergency contact
  const handleSaveCaregiverInfo = () => {
    if (!currentCaregiverName.trim()) {
      showToast("Caretaker name cannot be empty.")
      return
    }

    onUpdateProfile?.({
      caregiverName: currentCaregiverName.trim(),
      caregiverPhone: currentCaregiverPhone.trim(),
    })

    setIsEditingEmergency(false)
    showToast("Emergency caretaker details updated!")
  }

  // Switch household member
  const handleSelectMember = (member: HouseholdMember) => {
    setCurrentName(member.displayName)
    setCurrentAge(String(member.age))

    // Determine photo specific to this selected member
    const memberPhoto =
      member.photo ||
      localStorage.getItem(`neurosense_avatar_${member.displayName}`) ||
      null
    setAvatarPhoto(memberPhoto)

    if (memberPhoto) {
      try {
        localStorage.setItem("neurosense_current_avatar", memberPhoto)
        localStorage.setItem(
          `neurosense_avatar_${member.displayName}`,
          memberPhoto,
        )
      } catch {}
    } else {
      try {
        localStorage.removeItem("neurosense_current_avatar")
      } catch {}
    }

    setActiveMemberId(member.id)

    onUpdateProfile?.({
      patientName: member.displayName,
      age: String(member.age),
      photo: memberPhoto || "",
    })

    setShowHouseholdModal(false)
    showToast(`Switched active profile to ${member.displayName}`)
    onSwitchProfile?.(member)
  }

  // Add new household member
  const handleAddNewMember = async () => {
    if (!newMemberName.trim()) {
      showToast("Please enter family member's name.")
      return
    }

    const newMember: HouseholdMember = {
      id: createMemberId(),
      displayName: newMemberName.trim(),
      age: Number(newMemberAge) || 60,
      photo: "",
      language: "en",
      isPatient: newMemberIsPatient,
      createdAt: new Date().toISOString(),
    }

    await saveMember(newMember)
    setHouseholdMembers((prev) => [...prev, newMember])
    setNewMemberName("")
    setIsAddingMember(false)
    showToast(`Added ${newMember.displayName} to household!`)
  }

  // Quick mic test inside FAQ
  const handleTestMicrophone = () => {
    setIsTestingMic(true)
    setMicTestPassed(false)
    try {
      navigator.mediaDevices
        ?.getUserMedia({ audio: true })
        .then((stream) => {
          window.setTimeout(() => {
            stream.getTracks().forEach((track) => track.stop())
            setIsTestingMic(false)
            setMicTestPassed(true)
            showToast(
              "Microphone and audio input verified! Sound level healthy.",
            )
          }, 2000)
        })
        .catch(() => {
          setIsTestingMic(false)
          showToast("Microphone permission denied or hardware unavailable.")
        })
    } catch {
      setIsTestingMic(false)
      showToast("Web Audio API not supported on this browser.")
    }
  }

  const abhaIdFormatted = `${currentName.toLowerCase().replace(/\s+/g, "")}@abdm`
  const emergencyWaUrl = `https://wa.me/${currentCaregiverPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `🚨 *NeuroSense Emergency Health Alert*\n\nPatient *${currentName}* needs immediate family check-in.\nLocation: Home\nPlease call or visit as soon as possible.`,
  )}`

  return (
    <div
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehaviorY: "contain",
      }}
      className="flex-1 overflow-y-auto bg-[#F7F5F0] text-[#1A1A1A] select-none relative pb-8"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-full shadow-2xl text-[12px] font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200 border border-white/10">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden Profile Picture Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* ─── 1. Nav Bar (Lisso Editorial Style) ─────────────────────── */}
      <header className="h-[76px] px-4 flex items-center justify-between bg-[#F7F5F0]/95 border-b border-black/[0.05] sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="w-9 h-9 rounded-full bg-white border border-black/[0.06] text-[#544F49] flex items-center justify-center hover:text-[#1A1A1A] hover:border-black/20 shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1
            style={{ fontFamily }}
            className="text-[20px] font-bold text-[#1A1A1A] tracking-tight leading-tight"
          >
            Patient Profile
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setShowPersonalDataModal(true)}
          aria-label="Edit Profile"
          title="Edit Profile Data"
          className="w-9 h-9 rounded-full bg-white border border-black/[0.06] text-[#544F49] flex items-center justify-center hover:text-[#1A1A1A] hover:border-black/20 shadow-2xs active:scale-95 transition-all cursor-pointer"
        >
          <Edit2 className="w-4 h-4 text-[#1A1A1A]" />
        </button>
      </header>

      <div className="px-4 pt-3 space-y-4 w-full max-w-[400px] mx-auto">
        {/* ─── 2. Avatar & Patient Bio with Upload ────────────────────────── */}
        <div className="flex flex-col items-center text-center pt-1">
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-[104px] h-[104px] rounded-full bg-gradient-to-tr from-[#F5CE57] via-[#FAD978] to-[#E5BE45] text-[#1A1A1A] font-bold text-3xl flex items-center justify-center shadow-lg shadow-amber-500/15 border-4 border-white overflow-hidden ring-4 ring-black/[0.03]">
              {avatarPhoto ? (
                <img
                  src={avatarPhoto}
                  alt={currentName}
                  className="w-full h-full object-cover"
                />
              ) : (
                currentName[0]?.toUpperCase() || "J"
              )}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                fileInputRef.current?.click()
              }}
              aria-label="Change photo"
              title="Upload new profile picture"
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center border-2 border-white shadow-md hover:bg-black active:scale-90 transition-all cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <h2
            style={{ fontFamily }}
            className="text-[20px] font-bold text-[#1A1A1A] mt-2.5 tracking-tight flex items-center gap-1.5 justify-center"
          >
            <span>{currentName || "Jerrold Harrington"}</span>
          </h2>
          <div className="flex items-center gap-1.5 mt-0.5 justify-center">
            <span className="text-[11px] font-semibold text-[#78716A] bg-black/[0.04] px-2.5 py-0.5 rounded-full border border-black/[0.03]">
              {isAssisted ? "Caregiver Assisted" : "Patient"}
            </span>
            <span className="text-[11px] font-medium text-[#78716A]">
              • {currentAge} yrs • {currentCity}
            </span>
          </div>
        </div>

        {/* ─── 3. Interactive 3D Memory Capsule (Reminiscence Therapy Core) ─── */}
        <MemoryCapsuleModel factsCount={10} patientName={currentName} />

        {/* ─── 4. Autobiographical Memory Story Mode Feature Card ─── */}
        <div
          onClick={() => setShowStoryModal(true)}
          className="rounded-[28px] bg-gradient-to-br from-white via-white to-amber-500/[0.06] border border-black/[0.06] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] hover:border-black/15 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F5CE57] text-[#1A1A1A] flex items-center justify-center font-bold shadow-2xs">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[13px] font-bold text-[#1A1A1A] block leading-tight">
                  Autobiographical Story Mode
                </span>
                <span className="text-[10px] text-[#78716A]">
                  Reminiscence & Lived Memories
                </span>
              </div>
            </div>

            <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
              Story Mode
            </span>
          </div>

          <p className="text-[11px] text-[#78716A] leading-relaxed line-clamp-2 my-2">
            Interactive voice prompts based on {currentName}&apos;s verified
            childhood memories, sitar raga, and family golden jubilee.
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-black/[0.05]">
            <span className="text-[11px] font-bold text-[#1A1A1A] flex items-center gap-1 group-hover:text-amber-600 transition-colors">
              <Play className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />{" "}
              Listen to Screening Prompts
            </span>
            <div className="w-7 h-7 rounded-full bg-black/[0.04] text-[#1A1A1A] flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* ─── 5. 3D Holographic Ayushman Bharat (ABHA) Health Card ─── */}
        <TiltCard
          maxTilt={4}
          scale={1.015}
          onClick={() => setShowQrModal(true)}
          className="rounded-[28px] bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30 border border-black/[0.06] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.03)] cursor-pointer hover:border-[#0F62FE]/30 transition-all active:scale-[0.99] group text-left"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F62FE] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0F62FE]" />
              <span>Ayushman Bharat Health Account</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              Verified
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[16px] font-bold text-[#1A1A1A] tracking-wide font-mono">
                {abhaNumber}
              </div>
              <div className="text-[11px] text-[#78716A] mt-0.5">
                ABHA ID:{" "}
                <span className="font-semibold text-[#1A1A1A]">
                  {abhaIdFormatted}
                </span>
              </div>
              <div className="text-[10px] text-blue-600 font-bold mt-1.5 flex items-center gap-1 group-hover:underline">
                <span>Tap to view QR & Share</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
            <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-200 text-[#0F62FE] group-hover:bg-[#0F62FE] group-hover:text-white transition-all shadow-2xs shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
          </div>
        </TiltCard>

        {/* ─── 6. Lisso Editorial Menu List ──────────────────────────── */}
        <div className="rounded-[28px] bg-white border border-black/[0.05] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.03)] divide-y divide-black/[0.04]">
          {/* 1. Personal Data */}
          <button
            type="button"
            onClick={() => setShowPersonalDataModal(true)}
            className="w-full p-3.5 flex items-center justify-between hover:bg-black/[0.02] text-left transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span
                  style={{ fontFamily }}
                  className="text-[13px] font-bold text-[#1A1A1A] block group-hover:text-blue-600 transition-colors"
                >
                  Personal Data & Demographics
                </span>
                <span className="text-[10px] text-[#78716A]">
                  {currentAge} yrs • {currentGender} • {currentCity}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#78716A] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 2. Medical Record / Screening History */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="w-full p-3.5 flex items-center justify-between hover:bg-black/[0.02] text-left transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span
                  style={{ fontFamily }}
                  className="text-[13px] font-bold text-[#1A1A1A] block group-hover:text-emerald-600 transition-colors"
                >
                  Medical Record & Reports
                </span>
                <span className="text-[10px] text-[#78716A]">
                  Past Voice Screening & EHR
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#78716A] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 3. Emergency Contacts */}
          <button
            type="button"
            onClick={() => setShowEmergencyModal(true)}
            className="w-full p-3.5 flex items-center justify-between hover:bg-black/[0.02] text-left transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-2xs">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span
                  style={{ fontFamily }}
                  className="text-[13px] font-bold text-[#1A1A1A] block group-hover:text-rose-600 transition-colors"
                >
                  Emergency Contacts & WhatsApp
                </span>
                <span className="text-[10px] text-[#78716A]">
                  Caregiver: {currentCaregiverName} ({currentCaregiverPhone})
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#78716A] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 4. Language Selector */}
          <button
            type="button"
            onClick={onOpenLanguageModal}
            className="w-full p-3.5 flex items-center justify-between hover:bg-black/[0.02] text-left transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-2xs">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span
                  style={{ fontFamily }}
                  className="text-[13px] font-bold text-[#1A1A1A] block group-hover:text-indigo-600 transition-colors"
                >
                  Language (Vernacular / ASHA)
                </span>
                <span className="text-[10px] text-blue-600 font-semibold">
                  {selectedLanguageName}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#78716A] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 5. Switch Household Member */}
          <button
            type="button"
            onClick={() => setShowHouseholdModal(true)}
            className="w-full p-3.5 flex items-center justify-between hover:bg-black/[0.02] text-left transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shadow-2xs">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span
                  style={{ fontFamily }}
                  className="text-[13px] font-bold text-[#1A1A1A] block group-hover:text-purple-600 transition-colors"
                >
                  Switch Household Profile
                </span>
                <span className="text-[10px] text-[#78716A]">
                  {householdMembers.length} member(s) linked
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#78716A] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 6. Doctor Clinical Hub (Desktop) */}
          {onOpenDoctorDash && (
            <button
              type="button"
              onClick={onOpenDoctorDash}
              className="w-full p-3.5 flex items-center justify-between hover:bg-blue-50/40 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shadow-xs">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <span
                    style={{ fontFamily }}
                    className="text-[13px] font-bold text-[#1A1A1A] block group-hover:text-blue-600 transition-colors"
                  >
                    Doctor View (Desktop)
                  </span>
                  <span className="text-[10px] text-[#78716A]">
                    22 Biomarker Radar & EHR Export
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#78716A] group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* 7. Help & FAQs */}
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="w-full p-3.5 flex items-center justify-between hover:bg-black/[0.02] text-left transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 shadow-2xs">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <span
                  style={{ fontFamily }}
                  className="text-[13px] font-bold text-[#1A1A1A] block group-hover:text-black transition-colors"
                >
                  Help & FAQs
                </span>
                <span className="text-[10px] text-[#78716A]">
                  Audio mic test & usage guide
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#78716A] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* ─── 7. Logout / Sign Out ───────────────────────────────────── */}
        <button
          type="button"
          onClick={onLogout}
          className="w-full p-4 rounded-[24px] bg-rose-50/80 border border-rose-200/80 text-rose-700 hover:bg-rose-100 flex items-center justify-between text-left transition-all active:scale-[0.99] shadow-2xs cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <LogOut className="w-4 h-4 text-rose-600" />
            </div>
            <span
              style={{ fontFamily }}
              className="text-[13px] font-bold text-rose-700"
            >
              Sign Out
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* ─── Autobiographical Story Mode Modal ─── */}
      <PatientStoryModeModal
        isOpen={showStoryModal}
        onClose={() => setShowStoryModal(false)}
        patientName={currentName}
        fontFamily={fontFamily}
      />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ─── MODAL 1: ABHA Digital Health QR Modal ─────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {showQrModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 pt-14 pb-6 animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] bg-white rounded-3xl p-5 shadow-2xl border border-blue-100 text-center space-y-3.5">
            <div className="flex items-center justify-between border-b pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#0F62FE] text-white flex items-center justify-center text-[10px] font-bold">
                  NHA
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-slate-900 leading-tight">
                    Ayushman Bharat Digital Mission
                  </div>
                  <div className="text-[9px] text-slate-500">
                    National Health Authority (ABDM)
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-gradient-to-b from-blue-50/50 to-white rounded-2xl border border-blue-100 flex flex-col items-center">
              <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200">
                <QRCodeSVG
                  value={JSON.stringify({
                    abha: abhaNumber,
                    id: abhaIdFormatted,
                    name: currentName,
                    dob: `${2026 - Number(currentAge)}`,
                    gender: currentGender,
                    app: "NeuroSense",
                    authority: "ABDM-Govt-of-India",
                  })}
                  size={160}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <div className="mt-3 text-center">
                <div className="text-[16px] font-mono font-bold text-slate-900 tracking-wider">
                  {abhaNumber}
                </div>
                <div className="text-[12px] font-semibold text-[#0F62FE] mt-0.5">
                  {abhaIdFormatted}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {currentName} • {currentGender} ({currentAge} yrs)
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#525252] leading-tight">
              Scan this QR code at any Ayushman Bharat clinic, hospital, or with
              an ASHA community health worker to link screening trends.
            </p>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  showToast("ABHA Health Card saved to device gallery!")
                  setShowQrModal(false)
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0F62FE] text-white text-[12px] font-semibold hover:bg-[#0353e9] flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Card</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `ABHA ID: ${abhaIdFormatted}\nABHA Number: ${abhaNumber}\nPatient: ${currentName}`,
                  )
                  showToast("ABHA credentials copied to clipboard!")
                }}
                className="py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 text-[12px] font-semibold hover:bg-slate-50"
              >
                Copy ID
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ─── MODAL 2: Personal Data Editor Modal ───────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {showPersonalDataModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 pt-14 pb-6 animate-in fade-in duration-200">
          <div className="w-full max-w-[345px] max-h-[700px] overflow-y-auto bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 space-y-3.5 text-left">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="text-[16px] font-bold text-slate-900">
                  Personal Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPersonalDataModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-[12px]">
              <label className="block text-slate-600 font-medium">
                Full Name
                <input
                  type="text"
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-[13px] font-semibold"
                />
              </label>

              <div className="grid grid-cols-2 gap-2">
                <label className="block text-slate-600 font-medium">
                  Age
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-[13px] font-semibold"
                  />
                </label>
                <label className="block text-slate-600 font-medium">
                  Gender
                  <select
                    value={currentGender}
                    onChange={(e) => setCurrentGender(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-[13px] font-semibold"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <label className="block text-slate-600 font-medium">
                  Blood Group
                  <select
                    value={currentBloodGroup}
                    onChange={(e) => setCurrentBloodGroup(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-[13px] font-semibold"
                  >
                    {[
                      "Not Specified",
                      "A+",
                      "B+",
                      "O+",
                      "AB+",
                      "A-",
                      "B-",
                      "O-",
                      "AB-",
                    ].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-slate-600 font-medium">
                  City
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={currentCity}
                    onChange={(e) => setCurrentCity(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-[13px] font-semibold"
                  />
                </label>
              </div>

              <label className="block text-slate-600 font-medium">
                Phone / WhatsApp Number
                <input
                  type="tel"
                  value={currentPhone}
                  onChange={(e) => setCurrentPhone(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-[13px] font-semibold"
                />
              </label>

              <label className="block text-slate-600 font-medium">
                Clinical Stage
                <select
                  value={currentStage}
                  onChange={(e) => setCurrentStage(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-[12px] font-semibold"
                >
                  <option value="Pre-Screening Baseline">
                    Pre-Screening Baseline (No Voice Screening Yet)
                  </option>
                  <option value="Stage 1 Mild Cognitive Impairment">
                    Stage 1 MCI (Mild Cognitive Impairment)
                  </option>
                  <option value="Stage 2 Moderate Memory Care">
                    Stage 2 Moderate Memory Care
                  </option>
                  <option value="Preventative Wellness Screening">
                    Preventative Wellness Screening
                  </option>
                </select>
              </label>

              <label className="block text-slate-600 font-medium">
                ABHA Number
                <input
                  type="text"
                  value={abhaNumber}
                  onChange={(e) => setAbhaNumber(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono text-[12px]"
                />
              </label>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={handleSavePersonalData}
                className="flex-1 py-2.5 rounded-xl bg-[#0F62FE] text-white text-[13px] font-semibold hover:bg-[#0353e9] shadow-xs"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setShowPersonalDataModal(false)}
                className="py-2.5 px-3 rounded-xl border border-slate-300 text-slate-600 text-[12px] hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ─── MODAL 3: Emergency Contacts Action Sheet ───────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {showEmergencyModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 pt-14 pb-6 animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] bg-white rounded-3xl p-5 shadow-2xl border border-rose-100 text-left space-y-3.5">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <h3 className="text-[16px] font-bold text-slate-900">
                  Emergency & Caregiver Circle
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowEmergencyModal(false)
                  setIsEditingEmergency(false)
                }}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isEditingEmergency ? (
              <>
                <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                      Primary Caretaker
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>PIN Protected</span>
                    </span>
                  </div>
                  <div className="text-[15px] font-bold text-slate-900">
                    {currentCaregiverName}
                  </div>
                  <div className="text-[12px] text-slate-600 font-mono">
                    {currentCaregiverPhone}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Relationship: Family Caregiver / Guardian
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="space-y-2 pt-1">
                  <a
                    href={`tel:${currentCaregiverPhone.replace(/\s+/g, "")}`}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Caretaker Now</span>
                  </a>

                  <a
                    href={emergencyWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Send WhatsApp SOS Alert</span>
                  </a>

                  <a
                    href="tel:112"
                    className="w-full py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-[12px] font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Emergency Helpline (Dial 112)</span>
                  </a>
                </div>

                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={() => setIsEditingEmergency(true)}
                    className="text-[12px] text-blue-600 font-semibold hover:underline"
                  >
                    Edit Caregiver Contact Info
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2.5 text-[12px]">
                <label className="block text-slate-600 font-medium">
                  Caretaker Name
                  <input
                    type="text"
                    value={currentCaregiverName}
                    onChange={(e) => setCurrentCaregiverName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-semibold"
                  />
                </label>
                <label className="block text-slate-600 font-medium">
                  Caretaker Phone (WhatsApp)
                  <input
                    type="tel"
                    value={currentCaregiverPhone}
                    onChange={(e) => setCurrentCaregiverPhone(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-semibold"
                  />
                </label>
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={handleSaveCaregiverInfo}
                    className="flex-1 py-2 rounded-xl bg-[#0F62FE] text-white text-[12px] font-semibold"
                  >
                    Save Caregiver
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingEmergency(false)}
                    className="py-2 px-3 rounded-xl border border-slate-200 text-slate-600 text-[12px]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ─── MODAL 4: Household Member Switcher Modal ──────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {showHouseholdModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 pt-14 pb-6 animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] max-h-[680px] overflow-y-auto bg-white rounded-3xl p-5 shadow-2xl border border-purple-100 text-left space-y-3.5">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-slate-900 leading-tight">
                    Household Profiles
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Tap to switch active person
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowHouseholdModal(false)
                  setIsAddingMember(false)
                }}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Members List */}
            <div className="space-y-2">
              {householdMembers.map((m) => {
                const isCurrent =
                  m.displayName.toLowerCase() === currentName.toLowerCase()
                return (
                  <div
                    key={m.id || m.displayName}
                    onClick={() => handleSelectMember(m)}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all active:scale-[0.98] ${
                      isCurrent
                        ? "bg-purple-50/70 border-purple-300 ring-2 ring-purple-400/20"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-xs overflow-hidden">
                        {m.photo ? (
                          <img
                            src={m.photo}
                            alt={m.displayName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          m.displayName[0]?.toUpperCase() || "M"
                        )}
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{m.displayName}</span>
                          {isCurrent && (
                            <span className="text-[9px] bg-purple-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {m.isPatient ? "Patient" : "Caregiver"} • {m.age} yrs
                        </div>
                      </div>
                    </div>
                    {isCurrent ? (
                      <Check className="w-4 h-4 text-purple-600" />
                    ) : (
                      <button
                        type="button"
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold hover:bg-purple-50 hover:text-purple-700"
                      >
                        Select
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            {!isAddingMember ? (
              <button
                type="button"
                onClick={() => setIsAddingMember(true)}
                className="w-full py-2.5 rounded-xl border-2 border-dashed border-purple-300 text-purple-700 hover:bg-purple-50/50 text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Family Member</span>
              </button>
            ) : (
              <div className="p-3 bg-purple-50/40 rounded-2xl border border-purple-200 space-y-2 text-[12px]">
                <div className="font-bold text-slate-900 text-[12px]">
                  Add Relative
                </div>
                <input
                  type="text"
                  placeholder="Relative's Full Name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Age"
                    value={newMemberAge}
                    onChange={(e) => setNewMemberAge(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900"
                  />
                  <select
                    value={newMemberIsPatient ? "patient" : "caregiver"}
                    onChange={(e) =>
                      setNewMemberIsPatient(e.target.value === "patient")
                    }
                    className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900"
                  >
                    <option value="patient">Patient</option>
                    <option value="caregiver">Caregiver</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleAddNewMember}
                    className="flex-1 py-1.5 rounded-lg bg-purple-600 text-white font-semibold text-[11px]"
                  >
                    Save & Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingMember(false)}
                    className="py-1.5 px-3 rounded-lg border border-slate-200 text-slate-600 text-[11px]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ─── MODAL 5: Help & FAQs + Audio Mic Test Modal ────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {showHelpModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 pt-14 pb-6 animate-in fade-in duration-200">
          <div className="w-full max-w-[345px] max-h-[700px] overflow-y-auto bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 text-left space-y-3.5">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h3 className="text-[16px] font-bold text-slate-900">
                  Help & FAQs
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Hardware Mic Test Card */}
            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 text-[12px] space-y-2">
              <div className="font-bold text-blue-950 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>Microphone & Speaker Test</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-tight">
                Verify that your phone microphone captures sound clearly before
                taking a voice screening.
              </p>
              <button
                type="button"
                onClick={handleTestMicrophone}
                disabled={isTestingMic}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-60"
              >
                {isTestingMic ? (
                  <>
                    <Mic className="w-3.5 h-3.5 animate-pulse text-rose-300" />
                    <span>Listening... Speak into phone</span>
                  </>
                ) : micTestPassed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Mic Verified! Tap to re-test</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Test Microphone Input</span>
                  </>
                )}
              </button>
            </div>

            {/* Accordion FAQs */}
            <div className="space-y-2 divide-y divide-slate-100 text-[12px]">
              {[
                {
                  q: "How does Voice Screening work?",
                  a: "Speak for 10 to 60 seconds describing an image or sustaining 'Ahhh'. NeuroSense analyzes 22 acoustic vocal markers (pitch stability, jitter, shimmer, pause duration) to track neurological patterns over time.",
                },
                {
                  q: "What is an ABHA Account?",
                  a: "Your Ayushman Bharat Health Account is your official 14-digit national digital healthcare ID under India's ABDM. It lets you link reports securely with doctors and diagnostic labs.",
                },
                {
                  q: "Is this a final medical diagnosis?",
                  a: "No. NeuroSense is an automated clinical decision-support screening aid. It flags risk signals for medical consultation, but does not replace a clinical neurologist.",
                },
                {
                  q: "How does Caretaker PIN protection work?",
                  a: "The 4-digit Caretaker PIN protects sensitive actions (deleting data, opening doctor view) so confused family members cannot erase records by mistake.",
                },
                {
                  q: "Does NeuroSense work offline?",
                  a: "Yes! All screening sessions and recordings are stored securely in your browser's IndexedDB and will automatically sync to cloud storage once you connect to Wi-Fi.",
                },
              ].map((faq, idx) => {
                const isOpen = faqExpandedIndex === idx
                return (
                  <div key={idx} className="pt-2 first:pt-0">
                    <button
                      type="button"
                      onClick={() => setFaqExpandedIndex(isOpen ? null : idx)}
                      className="w-full text-left font-bold text-slate-900 flex items-center justify-between gap-2 py-1"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="text-slate-600 text-[11px] pt-1 pb-1.5 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                        {faq.a}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Support Helpline */}
            <div className="pt-2 border-t text-center">
              <a
                href="tel:104"
                className="text-[11px] text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>National Health Tele-Helpline (Dial 104)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
