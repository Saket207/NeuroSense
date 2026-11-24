import { createClient, SupabaseClient } from "@supabase/supabase-js"

const DEFAULT_SUPABASE_URL = "https://ollcjpnitgddxqpsbaql.supabase.co"

const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sbGNqcG5pdGdkZHhxcHNiYXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0NTI5NzQsImV4cCI6MjExMTAyODk3NH0.u2Lste93F3-t4D3QUxt9P5s5DZQ-EU6Bb6QhG5MMqtE"

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL as string | undefined ||
  DEFAULT_SUPABASE_URL

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined ||
  DEFAULT_SUPABASE_ANON_KEY

export const DEFAULT_SUPABASE_SERVICE_ROLE_KEY =
  (import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string | undefined) || ""

const supabaseServiceKey =
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string | undefined ||
  DEFAULT_SUPABASE_SERVICE_ROLE_KEY

export const supabase: SupabaseClient = createClient(
  supabaseUrl,

  supabaseAnonKey,

  {
    auth: {
      persistSession: true,

      autoRefreshToken: true,

      detectSessionInUrl: true,
    },
  },
)

export function isSupabaseConfigured(): boolean {
  return true
}

export async function getSupabaseAccessToken(): Promise<string | null> {
  if (!supabase) return null

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session?.access_token ?? null
}

export interface RegisteredUserResult {
  email: string

  userId: string
}

export async function registerVerifiedSupabaseUser(params: {
  fullName: string

  phone: string

  password: string

  age?: number

  gender?: string

  caregiverName?: string

  caregiverPhone?: string
}): Promise<RegisteredUserResult> {
  const digits = params.phone.replace(/\D/g, "")

  const phoneKey = digits.slice(-10) || digits

  const phoneWithCode = digits.length === 10 ? `91${digits}` : digits

  const virtualEmail = `${phoneKey}@neurosense.app`

  const payload = {
    phone: phoneWithCode,

    phone_confirm: true,

    email: virtualEmail,

    email_confirm: true,

    password: params.password,

    user_metadata: {
      full_name: params.fullName,

      username: params.fullName,

      phone: params.phone,

      clean_phone: phoneKey,

      age: params.age,

      gender: params.gender,

      caregiver_name: params.caregiverName,

      caregiver_phone: params.caregiverPhone,
    },
  }

  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      method: "POST",

      headers: {
        apikey: supabaseServiceKey,

        Authorization: `Bearer ${supabaseServiceKey}`,

        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    })

    if (response.ok) {
      const data = await response.json()

      return { email: virtualEmail, userId: data.id || "" }
    }

    // If already registered, update credentials so the chosen password works

    const listRes = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      headers: {
        apikey: supabaseServiceKey,

        Authorization: `Bearer ${supabaseServiceKey}`,
      },
    })

    if (listRes.ok) {
      const usersData = await listRes.json()

      const existingUser = (usersData.users || []).find(
        (u: { email?: string }) => u.email === virtualEmail,
      )

      if (existingUser) {
        await fetch(`${supabaseUrl}/auth/v1/admin/users/${existingUser.id}`, {
          method: "PUT",

          headers: {
            apikey: supabaseServiceKey,

            Authorization: `Bearer ${supabaseServiceKey}`,

            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            phone: phoneWithCode,

            phone_confirm: true,

            password: params.password,

            user_metadata: payload.user_metadata,
          }),
        })

        return { email: virtualEmail, userId: existingUser.id }
      }
    }
  } catch (err) {
    console.warn("Direct admin registration fallback:", err)
  }

  return { email: virtualEmail, userId: "" }
}

export async function lookupVerifiedSupabaseUser(
  identifier: string,
): Promise<{
  found: boolean

  email?: string

  fullName?: string

  phone?: string
}> {
  const raw = identifier.trim()

  if (!raw) return { found: false }

  if (raw.includes("@")) return { found: true, email: raw.toLowerCase() }

  const digits = raw.replace(/\D/g, "")

  if (digits.length >= 10) {
    return {
      found: true,

      email: `${digits.slice(-10)}@neurosense.app`,

      phone: digits,
    }
  }

  try {
    const listRes = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      headers: {
        apikey: supabaseServiceKey,

        Authorization: `Bearer ${supabaseServiceKey}`,
      },
    })

    if (listRes.ok) {
      const usersData = await listRes.json()

      for (const u of usersData.users || []) {
        const meta = u.user_metadata || {}

        const fn = String(meta.full_name || "")

          .trim()

          .toLowerCase()

        const ph = String(meta.phone || "")

          .trim()

          .toLowerCase()

        const cleanP = String(meta.clean_phone || "")

          .trim()

          .toLowerCase()

        const target = raw.toLowerCase()

        if (
          target === fn ||
          target === ph ||
          target === cleanP ||
          (target.length >= 3 && fn.includes(target))
        ) {
          return {
            found: true,

            email: u.email,

            fullName: meta.full_name,

            phone: meta.phone,
          }
        }
      }
    }
  } catch {
    // fallback
  }

  if (digits) {
    return { found: true, email: `${digits}@neurosense.app` }
  }

  return { found: false }
}

export interface SupabaseUserProfile {
  fullName?: string
  phone?: string
  age?: number | string
  gender?: string
  bloodGroup?: string
  city?: string
  location?: string
  stage?: string
  abhaNumber?: string
  caregiverName?: string
  caregiverPhone?: string
  photoUrl?: string
}

/**
 * Uploads an avatar image to Supabase Cloud Storage (bucket: neurosense-recordings)
 * and attaches its permanent public URL to the Supabase User metadata.
 */
export async function uploadAvatarToSupabase(
  patientName: string,
  photoDataUrlOrFile: string | File | Blob,
): Promise<string | null> {
  try {
    const cleanName = (patientName || "patient")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
    const filePath = `avatars/${cleanName}_${Date.now()}.jpg`

    let blob: Blob
    if (typeof photoDataUrlOrFile === "string") {
      const parts = photoDataUrlOrFile.split(",")
      const byteString = atob(parts[1] || parts[0])
      const mimeMatch = parts[0].match(/:(.*?);/)
      const mime = mimeMatch ? mimeMatch[1] : "image/jpeg"
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      blob = new Blob([ab], { type: mime })
    } else {
      blob = photoDataUrlOrFile
    }

    // Upload to Supabase Storage via REST with service key authorization
    const uploadUrl = `${supabaseUrl}/storage/v1/object/neurosense-recordings/${filePath}`
    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        apikey: supabaseServiceKey,
        Authorization: `Bearer ${supabaseServiceKey}`,
        "Content-Type": blob.type || "image/jpeg",
        "x-upsert": "true",
      },
      body: blob,
    })

    if (!uploadRes.ok) {
      console.warn("Supabase storage upload error:", uploadRes.status)
      return null
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/neurosense-recordings/${filePath}`

    // Automatically update the user profile in Supabase Cloud
    await syncUserProfileToSupabase({
      fullName: patientName,
      photoUrl: publicUrl,
    })

    return publicUrl
  } catch (err) {
    console.warn("Failed to upload avatar to Supabase Cloud:", err)
    return null
  }
}

/**
 * Saves all user profile fields (Name, Phone, Age, Gender, Blood Group, City, Stage, ABHA, Caretaker, Photo)
 * directly into Supabase Cloud Auth user metadata.
 */
export async function syncUserProfileToSupabase(
  profile: SupabaseUserProfile,
): Promise<boolean> {
  try {
    const digits = (profile.phone || "").replace(/\D/g, "")
    const phoneKey = digits.slice(-10) || digits
    const virtualEmail = phoneKey ? `${phoneKey}@neurosense.app` : null

    let targetUserId: string | null = null

    // 1. Check existing session first
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session?.user?.id) {
      targetUserId = session.user.id
    }

    // 2. If no active session, search via Supabase Admin API
    if (!targetUserId) {
      const listRes = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
        },
      })

      if (listRes.ok) {
        const usersData = await listRes.json()
        const users = usersData.users || []
        const found = users.find(
          (u: { email?: string user_metadata?: Record<string, any> }) => {
            const m = u.user_metadata || {}
            return (
              (virtualEmail && u.email === virtualEmail) ||
              (profile.fullName &&
                String(m.full_name || "").toLowerCase() ===
                  profile.fullName.toLowerCase()) ||
              (phoneKey && m.clean_phone === phoneKey)
            )
          },
        )
        if (found) targetUserId = found.id
      }
    }

    if (!targetUserId) return false

    // Build metadata payload
    const metadataUpdate: Record<string, any> = {}
    if (profile.fullName) metadataUpdate.full_name = profile.fullName
    if (profile.phone) metadataUpdate.phone = profile.phone
    if (profile.age !== undefined)
      metadataUpdate.age = Number(profile.age) || profile.age
    if (profile.gender) metadataUpdate.gender = profile.gender
    if (profile.bloodGroup) metadataUpdate.blood_group = profile.bloodGroup
    if (profile.city) {
      metadataUpdate.city = profile.city
      metadataUpdate.location = profile.city
    }
    if (profile.stage) metadataUpdate.stage = profile.stage
    if (profile.abhaNumber) metadataUpdate.abha_number = profile.abhaNumber
    if (profile.caregiverName)
      metadataUpdate.caregiver_name = profile.caregiverName
    if (profile.caregiverPhone)
      metadataUpdate.caregiver_phone = profile.caregiverPhone
    if (profile.photoUrl) {
      metadataUpdate.photo_url = profile.photoUrl
      metadataUpdate.avatar_url = profile.photoUrl
    }

    const updateRes = await fetch(
      `${supabaseUrl}/auth/v1/admin/users/${targetUserId}`,
      {
        method: "PUT",
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_metadata: metadataUpdate,
        }),
      },
    )

    return updateRes.ok
  } catch (err) {
    console.warn("Failed to sync profile to Supabase:", err)
    return false
  }
}

/**
 * Loads cloud-stored profile from Supabase (including blood group, city, stage, photo_url)
 */
export async function loadUserProfileFromSupabase(
  identifier: string,
): Promise<SupabaseUserProfile | null> {
  try {
    const raw = identifier.trim()
    const digits = raw.replace(/\D/g, "")
    const phoneKey = digits.slice(-10) || digits

    const listRes = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      headers: {
        apikey: supabaseServiceKey,
        Authorization: `Bearer ${supabaseServiceKey}`,
      },
    })
    if (!listRes.ok) return null

    const usersData = await listRes.json()
    const users = usersData.users || []
    const match = users.find(
      (u: { email?: string user_metadata?: Record<string, any> }) => {
        const m = u.user_metadata || {}
        return (
          (phoneKey && m.clean_phone === phoneKey) ||
          (raw &&
            String(m.full_name || "").toLowerCase() === raw.toLowerCase()) ||
          (u.email && u.email.toLowerCase() === raw.toLowerCase())
        )
      },
    )
    if (!match) return null

    const meta = match.user_metadata || {}
    return {
      fullName: meta.full_name || meta.username,
      phone: meta.phone,
      age: meta.age,
      gender: meta.gender,
      bloodGroup: meta.blood_group,
      city: meta.city || meta.location,
      location: meta.location || meta.city,
      stage: meta.stage,
      abhaNumber: meta.abha_number,
      caregiverName: meta.caregiver_name,
      caregiverPhone: meta.caregiver_phone,
      photoUrl: meta.photo_url || meta.avatar_url,
    }
  } catch {
    return null
  }
}
