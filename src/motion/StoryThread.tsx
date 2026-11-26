import React, { useEffect, useState, useRef } from "react"

interface StoryThreadProps {
  scrollContainerRef: React.RefObject<HTMLElement | null>
  className?: string
}

/**
 * Vertical story thread line that draws downward linked to the phone's internal scroll.
 * Pulsing milestone nodes highlight key screening steps.
 */
export default function StoryThread({
  scrollContainerRef,
  className = "",
}: StoryThreadProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const totalScroll = scrollHeight - clientHeight
      if (totalScroll <= 0) return
      const progress = Math.min(Math.max(scrollTop / totalScroll, 0), 1)
      setScrollProgress(progress)
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => container.removeEventListener("scroll", handleScroll)
  }, [scrollContainerRef])

  return (
    <div
      className={`absolute left-7 top-24 bottom-24 w-0.5 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Background track line */}
      <div className="w-full h-full bg-black/[0.05] rounded-full" />

      {/* Progress drawn line */}
      <div
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#F5CE57] via-[#A855F7] to-[#10B981] rounded-full transition-all duration-150"
        style={{ height: `${Math.round(scrollProgress * 100)}%` }}
      />
    </div>
  )
}
