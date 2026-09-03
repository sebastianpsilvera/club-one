import { useRef } from 'react'
import { useScroll, useTransform, useReducedMotion } from 'motion/react'

/**
 * Same useScroll+useTransform pattern as useParallax, mapped onto rotation
 * instead of translation: the element unwinds one way going down the page
 * and rewinds going back up. Used for the Producto "Gestión de torneos"
 * mockup.
 */
export function useScrollFlip(angle = 22) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotateY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [angle, -angle])
  const rotateX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [angle * 0.16, -angle * 0.16])
  return { ref, rotateY, rotateX }
}
