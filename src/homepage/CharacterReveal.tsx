import React, { useEffect, useRef, useState } from "react"

interface CharacterRevealProps {
  text: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  className?: string
  style?: React.CSSProperties
  staggerMs?: number
  threshold?: number
}

/**
 * Character-by-character headline reveal matching NexGo's signature motion.
 * When entering the viewport, each character transitions from opacity 0.05 to 1.
 * Fully screen-reader accessible via aria-label with aria-hidden on animated spans.
 */
export default function CharacterReveal({
  text,
  as: Tag = "h2",
  className = "",
  style = {},
  staggerMs = 30,
  threshold = 0.15,
}: CharacterRevealProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mq.addEventListener("change", handleMotionChange)
    return () => mq.removeEventListener("change", handleMotionChange)
  }, [])

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) {
      if (prefersReducedMotion) setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [threshold, prefersReducedMotion])

  // Split into words, then characters to maintain word-break behavior
  const words = text.split(" ")
  let globalCharIndex = 0

  return (
    <Tag
      // @ts-expect-error Tag dynamic ref
      ref={containerRef}
      className={className}
      style={style}
      aria-label={text}
    >
      {prefersReducedMotion ? (
        text
      ) : (
        <span aria-hidden="true" className="inline">
          {words.map((word, wIdx) => {
            const wordChars = Array.from(word)
            const wordMarkup = (
              <span
                key={`w-${wIdx}`}
                className="inline-block whitespace-nowrap"
              >
                {wordChars.map((char, cIdx) => {
                  const delay = globalCharIndex * staggerMs
                  globalCharIndex++
                  return (
                    <span
                      key={`c-${wIdx}-${cIdx}`}
                      style={{
                        transition:
                          "opacity 450ms cubic-bezier(0.16, 1, 0.3, 1)",
                        transitionDelay: `${delay}ms`,
                        opacity: isVisible ? 1 : 0.04,
                      }}
                      className="inline-block"
                    >
                      {char}
                    </span>
                  )
                })}
                {/* trailing space */}
                {wIdx < words.length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            )
            return wordMarkup
          })}
        </span>
      )}
    </Tag>
  )
}
