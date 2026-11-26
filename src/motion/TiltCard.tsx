import React, { useRef, useEffect } from "react"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  scale?: number
  glareOpacity?: number
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void
}

/**
 * High-performance 3D Tilt Card with dynamic specular glare highlight.
 * Driven entirely via direct DOM updates and requestAnimationFrame.
 * ZERO React re-renders during mouse movement for flawless 60/120 FPS performance.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 5,
  scale = 1.012,
  glareOpacity = 0.12,
  onClick,
  onDragOver,
  onDragLeave,
  onDrop,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only run on devices with fine pointer (mouse), not touch
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const card = cardRef.current
    if (!card) return

    const clientX = e.clientX
    const clientY = e.clientY

    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      card.style.transition = "transform 0.08s ease-out"
      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`

      if (glareRef.current) {
        const pctX = ((x / rect.width) * 100).toFixed(1)
        const pctY = ((y / rect.height) * 100).toFixed(1)
        glareRef.current.style.opacity = `${glareOpacity}`
        glareRef.current.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`
      }
    })
  }

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    const card = cardRef.current
    if (card) {
      card.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
      card.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0"
    }
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {/* Dynamic Specular Glare Highlight (direct DOM opacity) */}
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 overflow-hidden"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </div>
  )
}
