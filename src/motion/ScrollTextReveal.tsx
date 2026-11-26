import React, { useEffect, useRef, useState } from "react"

interface ScrollTextRevealProps {
  text: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  className?: string
  style?: React.CSSProperties
  staggerMs?: number
  threshold?: number
  scrollContainerRef?: React.RefObject<HTMLElement | null>
}

/**
 * Scroll-linked text reveal (text scrub / progressive darkening).
 * Words start in a lighter tone (38% opacity, accessible & readable)
 * and smoothly darken to 100% full contrast as scrolled into view.
 * Scoped to the phone frame's internal scroll container.
 * Never applied to buttons or critical actions.
 */
export default function ScrollTextReveal({
  text,
  as: Tag = "p",
  className = "",
  style = {},
  staggerMs = 40,
  threshold = 0.2,
  scrollContainerRef,
}: ScrollTextRevealProps) {
  const elementRef = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    if (mq.matches) {
      setRevealed(true)
      return
    }

    const target = elementRef.current
    if (!target) return

    const root = scrollContainerRef?.current || null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      {
        root,
        threshold,
        rootMargin: "0px 0px -40px 0px",
      },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [scrollContainerRef, threshold])

  const words = text.split(" ")

  return (
    <Tag
      // @ts-expect-error Tag dynamic ref
      ref={elementRef}
      aria-label={text}
      className={className}
      style={style}
    >
      {prefersReducedMotion || revealed
        ? words.map((word, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="inline-block transition-opacity duration-500 ease-out"
              style={{
                opacity: 1,
                transitionDelay: `${i * staggerMs}ms`,
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          ))
        : words.map((word, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="inline-block transition-opacity duration-500 ease-out"
              style={{
                opacity: 0.38,
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
    </Tag>
  )
}
