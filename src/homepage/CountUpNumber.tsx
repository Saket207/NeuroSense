import React, { useEffect, useRef, useState } from "react"

interface CountUpNumberProps {
  value: string | number
  durationMs?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Counts up a numeric value when entering the viewport, matching NexGo's stats animation.
 * Handles strings like "2000+", "95%", "10/10", "42/7".
 */
export default function CountUpNumber({
  value,
  durationMs = 1200,
  className = "",
  style = {},
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState<string>("0")
  const [hasAnimated, setHasAnimated] = useState(false)

  const strVal = String(value)
  // Extract primary numeric component
  const match = strVal.match(/^(\D*)(\d+)(.*)$/)

  useEffect(() => {
    if (!match) {
      setDisplayValue(strVal)
      return
    }

    const prefix = match[1] || ""
    const targetNum = parseInt(match[2], 10)
    const suffix = match[3] || ""

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          observer.disconnect()

          const startTime = performance.now()
          const step = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / durationMs, 1)
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(targetNum * easeOut)
            setDisplayValue(`${prefix}${current}${suffix}`)

            if (progress < 1) {
              requestAnimationFrame(step)
            } else {
              setDisplayValue(strVal)
            }
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [strVal, durationMs, hasAnimated, match])

  return (
    <span ref={ref} className={className} style={style}>
      {hasAnimated ? displayValue : match ? `${match[1]}0${match[3]}` : strVal}
    </span>
  )
}
