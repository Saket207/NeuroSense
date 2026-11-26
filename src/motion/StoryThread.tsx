import React, { useEffect, useRef } from "react"

interface StoryThreadProps {
  scrollContainerRef: React.RefObject<HTMLElement | null>
  className?: string
}

/**
 * High-performance vertical story thread line that draws downward linked
 * to the phone's internal scroll.
 * Uses direct DOM manipulation via requestAnimationFrame with ZERO React re-renders.
 */
export default function StoryThread({
  scrollContainerRef,
  className = "",
}: StoryThreadProps) {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        if (!container || !lineRef.current) return
        const { scrollTop, scrollHeight, clientHeight } = container
        const totalScroll = scrollHeight - clientHeight
        if (totalScroll <= 0) return
        const progress = Math.min(Math.max(scrollTop / totalScroll, 0), 1)
        lineRef.current.style.height = `${(progress * 100).toFixed(1)}%`
      })
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      container.removeEventListener("scroll", handleScroll)
    }
  }, [scrollContainerRef])

  return (
    <div
      className={`absolute left-7 top-24 bottom-24 w-0.5 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Background track line */}
      <div className="w-full h-full bg-black/[0.05] rounded-full" />

      {/* Progress drawn line with hardware-accelerated height */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#F5CE57] via-[#A855F7] to-[#10B981] rounded-full will-change-[height]"
        style={{ height: "0%" }}
      />
    </div>
  )
}
