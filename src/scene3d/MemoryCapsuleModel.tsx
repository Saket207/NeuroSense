import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface MemoryCapsuleModelProps {
  className?: string
  factsCount?: number
  patientName?: string
}

/**
 * Procedural 3D Memory Capsule / Nostalgia Locket Model (Three.js).
 * Designed specifically for the elderly patient profile & autobiographical memory bank.
 * Renders an interactive, rotating golden locket with orbiting memory particles.
 * Drag to inspect; low GPU overhead with standard shaders and capped pixel ratio.
 */
export default function MemoryCapsuleModel({
  className = "",
  factsCount = 10,
  patientName = "Patient",
}: MemoryCapsuleModelProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [webGLSupported, setWebGLSupported] = useState(true)

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
    const height = container.clientHeight || 135

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50)
    camera.position.set(0, 0, 7.2)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.0))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    container.appendChild(renderer.domElement)

    // 2. Warm Editorial Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.2)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xf5ce57, 2.5, 20)
    pointLight.position.set(4, 4, 6)
    scene.add(pointLight)

    const rimLight = new THREE.PointLight(0xa855f7, 1.8, 20)
    rimLight.position.set(-4, -3, 4)
    scene.add(rimLight)

    // 3. Central Memory Capsule Group
    const capsuleGroup = new THREE.Group()
    scene.add(capsuleGroup)

    // Translucent Locket Shell (Golden Amber)
    const shellGeo = new THREE.IcosahedronGeometry(1.2, 1)
    const shellMat = new THREE.MeshStandardMaterial({
      color: 0xf5ce57,
      roughness: 0.25,
      metalness: 0.6,
      wireframe: true,
    })
    const shellMesh = new THREE.Mesh(shellGeo, shellMat)
    capsuleGroup.add(shellMesh)

    // Glowing Inner Nostalgia Core
    const coreGeo = new THREE.SphereGeometry(0.75, 20, 20)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    capsuleGroup.add(coreMesh)

    // Orbiting Golden Halo Rings (Childhood & Family Anchors)
    const ring1Geo = new THREE.TorusGeometry(1.85, 0.04, 12, 48)
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xf5ce57,
      emissive: 0xb45309,
      emissiveIntensity: 0.3,
      metalness: 0.85,
      roughness: 0.2,
    })
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1Mesh.rotation.x = Math.PI / 3.2
    capsuleGroup.add(ring1Mesh)

    const ring2Geo = new THREE.TorusGeometry(2.1, 0.03, 12, 48)
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      metalness: 0.7,
      roughness: 0.3,
      opacity: 0.75,
      transparent: true,
    })
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2Mesh.rotation.y = Math.PI / 3.8
    capsuleGroup.add(ring2Mesh)

    // Orbiting Memory Star Particles (representing 10 verified life facts)
    const particleCount = 10
    const starGeo = new THREE.SphereGeometry(0.08, 8, 8)
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xfef08a,
      emissiveIntensity: 1.2,
    })
    for (let i = 0; i < particleCount; i++) {
      const star = new THREE.Mesh(starGeo, starMat)
      const theta = (i / particleCount) * Math.PI * 2
      const radius = 1.55 + (i % 2) * 0.35
      star.position.set(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius,
        i % 2 === 0 ? 0.3 : -0.3,
      )
      capsuleGroup.add(star)
    }

    // 4. Interactive Drag & Spin
    let isDragging = false
    let prevX = 0
    let prevY = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevX = e.clientX
      prevY = e.clientY
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const dx = e.clientX - prevX
      const dy = e.clientY - prevY
      capsuleGroup.rotation.y += dx * 0.012
      capsuleGroup.rotation.x += dy * 0.012
      prevX = e.clientX
      prevY = e.clientY
    }
    const onMouseUp = () => {
      isDragging = false
    }

    container.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)

    // 5. Render Loop
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

      const elapsed = clock.getElapsedTime()

      // Idle float & rotation
      if (!isDragging) {
        capsuleGroup.rotation.y += 0.007
        capsuleGroup.rotation.x = Math.sin(elapsed * 0.45) * 0.12
        capsuleGroup.position.y = Math.sin(elapsed * 1.2) * 0.08
      }

      // Gyroscopic opposite rotation
      ring1Mesh.rotation.z = elapsed * 0.35
      ring2Mesh.rotation.z = -elapsed * 0.25

      // Breathing pulse of core
      const pulse = 1 + Math.sin(elapsed * 2.0) * 0.05
      coreMesh.scale.set(pulse, pulse, pulse)

      renderer.render(scene, camera)
    }

    animate()

    // 6. Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth || 320
      const h = container.clientHeight || 135
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    // 7. Cleanup
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

      shellGeo.dispose()
      shellMat.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      ring1Geo.dispose()
      ring1Mat.dispose()
      ring2Geo.dispose()
      ring2Mat.dispose()
      starGeo.dispose()
      starMat.dispose()
      renderer.dispose()
    }
  }, [])

  if (!webGLSupported) {
    return (
      <div className={`flex items-center justify-center p-3 ${className}`}>
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-2xl border border-amber-300">
          ⏳
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative flex items-center justify-between bg-gradient-to-r from-amber-500/[0.04] via-white to-purple-500/[0.04] rounded-2xl border border-black/[0.04] p-3 overflow-hidden ${className}`}
    >
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-[140px] h-[115px] shrink-0 cursor-grab active:cursor-grabbing"
        title="Interactive 3D Memory Capsule — Drag to rotate"
      />

      {/* Real-time Informative Telemetry */}
      <div className="flex-1 pl-2 text-left">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716A]">
            Memory Capsule
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-[#1A1A1A] tracking-tight font-serif">
            {factsCount} Verified Facts
          </span>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
            Active
          </span>
        </div>
        <p className="text-[10px] text-[#78716A] mt-1 leading-relaxed line-clamp-2">
          Anchored in {patientName}&apos;s verified lived childhood memories,
          hometown, and family milestones.
        </p>
      </div>
    </div>
  )
}
