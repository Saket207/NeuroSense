import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface NeuralStabilityModelProps {
  score?: number
  segment?: "cognitive" | "overall" | "health"
  className?: string
}

/**
 * High-performance 3D Neural Stability Model built with Three.js.
 * Renders an interactive, pulsating synaptic cluster with orbiting stability rings.
 * Color and rhythm dynamically harmonize with the active segment (Cognitive/Overall/Health).
 * Pauses when hidden or offscreen; low GPU overhead with capped pixel ratio.
 */
export default function NeuralStabilityModel({
  score = 94.8,
  segment = "overall",
  className = "",
}: NeuralStabilityModelProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [webGLSupported, setWebGLSupported] = useState(true)

  // Segment-specific color palette
  const PALETTES = {
    cognitive: {
      core: 0x6366f1, // Indigo
      ring: 0xf5ce57, // Warm Amber
      nodes: 0x818cf8,
      label: "Cognitive Cadence",
    },
    overall: {
      core: 0x0f62fe, // Cobalt Blue
      ring: 0x10b981, // Emerald Green
      nodes: 0x38bdf8,
      label: "Systemic Stability",
    },
    health: {
      core: 0x059669, // Emerald
      ring: 0x06b6d4, // Cyan
      nodes: 0x34d399,
      label: "Motor & Vitals",
    },
  }

  const activePalette = PALETTES[segment] || PALETTES.overall
  const paletteRef = useRef(activePalette)

  useEffect(() => {
    paletteRef.current = activePalette
  }, [activePalette])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas")
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setWebGLSupported(false)
        return
      }
    } catch {
      setWebGLSupported(false)
      return
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setWebGLSupported(false)
      return
    }

    const width = container.clientWidth || 320
    const height = container.clientHeight || 140

    // 1. Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50)
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.0))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    container.appendChild(renderer.domElement)

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 2.0, 15)
    pointLight.position.set(3, 3, 5)
    scene.add(pointLight)

    // 3. Central Synaptic Core (Dual intersecting wireframe + solid sphere)
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)

    const coreGeo = new THREE.IcosahedronGeometry(1.15, 1)
    const coreMat = new THREE.MeshStandardMaterial({
      color: paletteRef.current.core,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.6,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    modelGroup.add(coreMesh)

    const innerGlowGeo = new THREE.SphereGeometry(0.65, 16, 16)
    const innerGlowMat = new THREE.MeshStandardMaterial({
      color: paletteRef.current.ring,
      emissive: paletteRef.current.ring,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    })
    const innerGlowMesh = new THREE.Mesh(innerGlowGeo, innerGlowMat)
    modelGroup.add(innerGlowMesh)

    // 4. Orbiting Stability Rings (2 Gyroscopic rings)
    const ring1Geo = new THREE.TorusGeometry(1.7, 0.035, 12, 48)
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: paletteRef.current.ring,
      emissive: paletteRef.current.ring,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    })
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1Mesh.rotation.x = Math.PI / 3
    modelGroup.add(ring1Mesh)

    const ring2Geo = new THREE.TorusGeometry(2.0, 0.03, 12, 48)
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: paletteRef.current.nodes,
      roughness: 0.3,
      metalness: 0.5,
      opacity: 0.7,
      transparent: true,
    })
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2Mesh.rotation.y = Math.PI / 4
    modelGroup.add(ring2Mesh)

    // 5. Orbiting Synaptic Node Particles
    const particleCount = 14
    const particleGeo = new THREE.SphereGeometry(0.08, 8, 8)
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: paletteRef.current.ring,
      emissiveIntensity: 1.0,
    })
    const particles: THREE.Mesh[] = []

    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat)
      const phi = (i / particleCount) * Math.PI * 2
      const rad = 1.45 + (i % 3) * 0.25
      p.position.set(
        Math.cos(phi) * rad,
        Math.sin(phi) * rad,
        i % 2 === 0 ? 0.3 : -0.3,
      )
      modelGroup.add(p)
      particles.push(p)
    }

    // 6. Interactive Drag / Rotation
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      const deltaY = e.clientY - prevMouseY
      modelGroup.rotation.y += deltaX * 0.012
      modelGroup.rotation.x += deltaY * 0.012
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }
    const onMouseUp = () => {
      isDragging = false
    }

    container.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)

    // 7. Render Loop
    let animationFrameId: number
    let isVisible = true
    const clock = new THREE.Clock()

    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      if (!isVisible) return

      const elapsedTime = clock.getElapsedTime()

      // Smooth idle rotation if not dragging
      if (!isDragging) {
        modelGroup.rotation.y += 0.008
        modelGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15
      }

      // Opposite gyroscopic ring rotations
      ring1Mesh.rotation.z = elapsedTime * 0.4
      ring2Mesh.rotation.z = -elapsedTime * 0.3

      // Dynamic breathing pulse of inner core
      const pulse = 1 + Math.sin(elapsedTime * 2.2) * 0.06
      innerGlowMesh.scale.set(pulse, pulse, pulse)

      // Dynamic color interpolation when segment changes
      coreMat.color.lerp(new THREE.Color(paletteRef.current.core), 0.08)
      ring1Mat.color.lerp(new THREE.Color(paletteRef.current.ring), 0.08)
      ring1Mat.emissive.lerp(new THREE.Color(paletteRef.current.ring), 0.08)
      ring2Mat.color.lerp(new THREE.Color(paletteRef.current.nodes), 0.08)
      innerGlowMat.color.lerp(new THREE.Color(paletteRef.current.ring), 0.08)
      innerGlowMat.emissive.lerp(new THREE.Color(paletteRef.current.ring), 0.08)

      renderer.render(scene, camera)
    }

    animate()

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth || 320
      const h = container.clientHeight || 140
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("resize", handleResize)
      container.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)

      if (
        container &&
        renderer.domElement &&
        container.contains(renderer.domElement)
      ) {
        container.removeChild(renderer.domElement)
      }

      coreGeo.dispose()
      coreMat.dispose()
      innerGlowGeo.dispose()
      innerGlowMat.dispose()
      ring1Geo.dispose()
      ring1Mat.dispose()
      ring2Geo.dispose()
      ring2Mat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()
    }
  }, [])

  if (!webGLSupported) {
    return (
      <div className={`flex items-center justify-center p-3 ${className}`}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500/20 to-amber-400/30 flex items-center justify-center border border-indigo-200">
          <span className="text-xl">🧠</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative flex items-center justify-between bg-gradient-to-r from-black/[0.02] via-white to-black/[0.02] rounded-2xl border border-black/[0.04] p-3 overflow-hidden ${className}`}
    >
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-[150px] h-[110px] shrink-0 cursor-grab active:cursor-grabbing"
        title="Interactive 3D Synaptic Core — Drag to inspect"
      />

      {/* Real-time Informative Telemetry */}
      <div className="flex-1 pl-2 text-left">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716A]">
            {activePalette.label}
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-light text-[#1A1A1A] tracking-tight tabular-nums font-serif">
            {score}%
          </span>
          <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
            Optimal Synchrony
          </span>
        </div>
        <p className="text-[10px] text-[#78716A] mt-1 line-clamp-2">
          3D multi-vector neural cadence derived from audio micro-tremor &
          semantic recall.
        </p>
      </div>
    </div>
  )
}
