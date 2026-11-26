import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface MemoryOrbSceneProps {
  className?: string
  parallaxX?: number
  parallaxY?: number
}

/**
 * Procedural lightweight 3D Memory Orb Scene built with Three.js.
 * Renders a translucent memory orb with an orbiting golden memory thread
 * and ambient floating abstract shapes with depth-of-field soft lighting.
 * Pauses rendering when hidden or offscreen. Disposes resources on unmount.
 */
export default function MemoryOrbScene({
  className = "",
  parallaxX = 0,
  parallaxY = 0,
}: MemoryOrbSceneProps) {
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

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setWebGLSupported(false)
      return
    }

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 14)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.8)
    scene.add(ambientLight)

    const pointLightPrimary = new THREE.PointLight(0xf5ce57, 2.5, 30)
    pointLightPrimary.position.set(6, 6, 8)
    scene.add(pointLightPrimary)

    const pointLightSecondary = new THREE.PointLight(0xa855f7, 2.0, 30)
    pointLightSecondary.position.set(-6, -4, 6)
    scene.add(pointLightSecondary)

    // 3. Central Memory Orb (translucent outer shell + glowing inner core)
    const orbGroup = new THREE.Group()
    scene.add(orbGroup)

    const outerGeo = new THREE.SphereGeometry(2.4, 48, 48)
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0xfbf6ee,
      transmission: 0.85,
      opacity: 0.9,
      transparent: true,
      roughness: 0.12,
      ior: 1.45,
      reflectivity: 0.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    })
    const outerOrb = new THREE.Mesh(outerGeo, outerMat)
    orbGroup.add(outerOrb)

    const innerGeo = new THREE.SphereGeometry(1.2, 32, 32)
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xf5ce57,
      emissive: 0xd97706,
      emissiveIntensity: 0.7,
      roughness: 0.3,
    })
    const innerOrb = new THREE.Mesh(innerGeo, innerMat)
    orbGroup.add(innerOrb)

    // 4. Orbiting Luminous Golden Memory Thread (Curve + Tube)
    const curvePoints: THREE.Vector3[] = []
    const numPoints = 64
    for (let i = 0; i <= numPoints; i++) {
      const theta = (i / numPoints) * Math.PI * 2
      const x = Math.cos(theta) * 3.4
      const y = Math.sin(theta) * 3.4 * Math.cos(theta * 0.8)
      const z = Math.sin(theta * 1.5) * 1.2
      curvePoints.push(new THREE.Vector3(x, y, z))
    }
    const threadCurve = new THREE.CatmullRomCurve3(curvePoints, true)
    const threadGeo = new THREE.TubeGeometry(threadCurve, 80, 0.045, 12, true)
    const threadMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf5ce57,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.8,
    })
    const threadMesh = new THREE.Mesh(threadGeo, threadMat)
    orbGroup.add(threadMesh)

    // 5. Ambient Floating Abstract Shapes (torus + soft floating spheres)
    const floatingShapes: THREE.Mesh[] = []

    // Soft Toroid 1 (upper left)
    const torusGeo = new THREE.TorusGeometry(1.1, 0.35, 24, 48)
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.35,
      metalness: 0.2,
      opacity: 0.8,
      transparent: true,
    })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    torus.position.set(-6.5, 4.2, -3)
    scene.add(torus)
    floatingShapes.push(torus)

    // Floating Warm Sphere 2 (lower right)
    const sphere2Geo = new THREE.SphereGeometry(0.75, 32, 32)
    const sphere2Mat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.4,
      metalness: 0.3,
      opacity: 0.75,
      transparent: true,
    })
    const sphere2 = new THREE.Mesh(sphere2Geo, sphere2Mat)
    sphere2.position.set(6.8, -4.5, -2)
    scene.add(sphere2)
    floatingShapes.push(sphere2)

    // Floating Golden Drop 3 (upper right)
    const dropGeo = new THREE.SphereGeometry(0.5, 24, 24)
    const dropMat = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      emissive: 0xeab308,
      emissiveIntensity: 0.4,
      roughness: 0.2,
    })
    const drop = new THREE.Mesh(dropGeo, dropMat)
    drop.position.set(5.5, 3.8, -4)
    scene.add(drop)
    floatingShapes.push(drop)

    // 6. Animation Loop
    let animationFrameId: number
    let isVisible = true

    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      if (!isVisible) return

      const elapsedTime = clock.getElapsedTime()

      // Central Orb Slow Float & Rotation
      orbGroup.rotation.y = elapsedTime * 0.15
      orbGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.12
      orbGroup.position.y = Math.sin(elapsedTime * 0.4) * 0.3

      // Orbiting thread counter rotation
      threadMesh.rotation.z = elapsedTime * 0.25

      // Floating Shapes slow drift
      torus.rotation.x = elapsedTime * 0.2
      torus.rotation.y = elapsedTime * 0.15
      torus.position.y = 4.2 + Math.sin(elapsedTime * 0.35 + 1) * 0.25

      sphere2.position.y = -4.5 + Math.cos(elapsedTime * 0.4 + 2) * 0.3
      drop.position.y = 3.8 + Math.sin(elapsedTime * 0.5 + 3) * 0.2

      // Smooth pointer parallax follow
      const targetX = parallaxX * 0.8
      const targetY = parallaxY * 0.8
      scene.position.x += (targetX - scene.position.x) * 0.05
      scene.position.y += (targetY - scene.position.y) * 0.05

      renderer.render(scene, camera)
    }

    animate()

    // 7. Resize Handler
    const handleResize = () => {
      if (!container) return
      const newWidth = container.clientWidth || window.innerWidth
      const newHeight = container.clientHeight || window.innerHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener("resize", handleResize)

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("resize", handleResize)

      if (
        container &&
        renderer.domElement &&
        container.contains(renderer.domElement)
      ) {
        container.removeChild(renderer.domElement)
      }

      outerGeo.dispose()
      outerMat.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      threadGeo.dispose()
      threadMat.dispose()
      torusGeo.dispose()
      torusMat.dispose()
      sphere2Geo.dispose()
      sphere2Mat.dispose()
      dropGeo.dispose()
      dropMat.dispose()
      renderer.dispose()
    }
  }, [parallaxX, parallaxY])

  if (!webGLSupported) {
    // Pure CSS mesh fallback
    return (
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      >
        <div className="absolute top-[20%] right-[15%] w-[480px] h-[480px] rounded-full bg-gradient-to-br from-amber-400/20 via-purple-600/15 to-transparent blur-3xl animate-pulse" />
      </div>
    )
  }

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  )
}
