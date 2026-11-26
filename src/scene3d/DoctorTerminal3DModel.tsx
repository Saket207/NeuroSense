import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface DoctorTerminal3DModelProps {
  className?: string
  totalPatients?: number
  highPriorityCount?: number
}

/**
 * 3D Quantum Synaptic Terminal Model (Three.js) for Doctor Clinical Hub.
 * Visualizes the 8-Qubit PennyLane VQC Quantum Hybrid neural architecture:
 * - 8 Quantum Qubit Nodes in entanglement orbits
 * - Central pulsating neural core simulating phonation & speech feature embeddings
 * - Interactive 3D mouse/touch drag rotation
 * - Low GPU overhead with standard shaders and capped pixel ratio
 */
export default function DoctorTerminal3DModel({
  className = "",
  totalPatients = 6,
  highPriorityCount = 3,
}: DoctorTerminal3DModelProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [webGLSupported, setWebGLSupported] = useState(true)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

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

    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let renderer: THREE.WebGLRenderer

    try {
      const width = container.clientWidth || 340
      const height = container.clientHeight || 150

      // 1. Scene, Camera, Renderer
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50)
      camera.position.set(0, 0, 7.5)

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.0))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      container.appendChild(renderer.domElement)
    } catch {
      setWebGLSupported(false)
      return
    }

    // 2. Clinical Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const cyanLight = new THREE.PointLight(0x0284c7, 2.5, 20)
    cyanLight.position.set(5, 4, 6)
    scene.add(cyanLight)

    const amberLight = new THREE.PointLight(0xf5ce57, 2.0, 20)
    amberLight.position.set(-5, -3, 5)
    scene.add(amberLight)

    // 3. Central Quantum Hybrid Brain Group
    const brainGroup = new THREE.Group()
    scene.add(brainGroup)

    // Translucent Neural Wireframe Lattice
    const latticeGeo = new THREE.IcosahedronGeometry(1.35, 1)
    const latticeMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.7,
    })
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat)
    brainGroup.add(latticeMesh)

    // Inner Glowing Biomarker Core
    const coreGeo = new THREE.SphereGeometry(0.8, 20, 20)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf5ce57,
      emissive: 0xd97706,
      emissiveIntensity: 0.85,
      roughness: 0.25,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    brainGroup.add(coreMesh)

    // 8-Qubit Entanglement Ring (PennyLane 8-Qubit VQC Architecture)
    const ringGeo = new THREE.TorusGeometry(2.0, 0.035, 12, 48)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2,
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = Math.PI / 3.4
    brainGroup.add(ringMesh)

    // Secondary Gyroscopic Ring
    const ring2Geo = new THREE.TorusGeometry(2.25, 0.025, 12, 48)
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xf5ce57,
      metalness: 0.6,
      roughness: 0.3,
      opacity: 0.6,
      transparent: true,
    })
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2Mesh.rotation.y = Math.PI / 4.2
    brainGroup.add(ring2Mesh)

    // 8 Quantum Qubit Node Spheres (AngleEmbedding Features)
    const qubitCount = 8
    const qubitGeo = new THREE.SphereGeometry(0.12, 8, 8)
    const qubitMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x0ea5e9,
      emissiveIntensity: 1.2,
    })
    const qubits: THREE.Mesh[] = []

    for (let i = 0; i < qubitCount; i++) {
      const q = new THREE.Mesh(qubitGeo, qubitMat)
      const theta = (i / qubitCount) * Math.PI * 2
      const radius = 2.0
      q.position.set(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius * Math.cos(Math.PI / 3.4),
        Math.sin(theta) * radius * Math.sin(Math.PI / 3.4),
      )
      brainGroup.add(q)
      qubits.push(q)
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
      brainGroup.rotation.y += dx * 0.012
      brainGroup.rotation.x += dy * 0.012
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

      if (!isDragging) {
        brainGroup.rotation.y += 0.008
        brainGroup.rotation.x = Math.sin(elapsed * 0.4) * 0.12
      }

      ringMesh.rotation.z = elapsed * 0.4
      ring2Mesh.rotation.z = -elapsed * 0.28

      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.06
      coreMesh.scale.set(pulse, pulse, pulse)

      renderer.render(scene, camera)
    }

    animate()

    // 6. Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth || 340
      const h = container.clientHeight || 150
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

      latticeGeo.dispose()
      latticeMat.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      ring2Geo.dispose()
      ring2Mat.dispose()
      qubitGeo.dispose()
      qubitMat.dispose()
      renderer.dispose()
    }
  }, [])

  if (!webGLSupported) {
    return (
      <div className={`flex items-center justify-center p-3 ${className}`}>
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-2xl border border-blue-200">
          ⚛️
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative flex items-center justify-between bg-gradient-to-r from-blue-500/[0.05] via-white to-amber-500/[0.04] rounded-2xl border border-black/[0.05] p-3 overflow-hidden ${className}`}
    >
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-[145px] h-[120px] shrink-0 cursor-grab active:cursor-grabbing"
        title="Interactive 3D 8-Qubit Quantum VQC Lattice — Drag to inspect"
      />

      {/* Real-time Informative Telemetry */}
      <div className="flex-1 pl-2 text-left">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716A]">
            Quantum VQC Radar
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-[#1A1A1A] tracking-tight font-serif">
            8-Qubit AngleEmbedding
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-200">
            3 Entangler Layers
          </span>
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
            88.4% AUC
          </span>
        </div>
        <p className="text-[10px] text-[#78716A] mt-1.5 leading-relaxed line-clamp-2">
          PennyLane VQC maps acoustic voice stability & pause latency into
          8-qubit quantum Hilbert space.
        </p>
      </div>
    </div>
  )
}
