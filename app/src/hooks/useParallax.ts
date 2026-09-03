import { useRef } from 'react'
import { useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react'

/**
 * The one scroll-linked parallax pattern used across the site: an element
 * drifts `amplitude` px up as it crosses the viewport, tied directly to
 * scroll progress (no spring/inertia — mirrors the original design's scrub).
 * Returns `{ ref, y }` — spread `style={{ y }}` onto a motion.div using `ref`.
 */
export function useParallax(amplitude = 30) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [amplitude, -amplitude],
  )
  return { ref, y }
}
