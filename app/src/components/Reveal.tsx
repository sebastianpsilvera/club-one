import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { DURATION, EASE } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Skip the y-offset — use for elements that already parallax. */
  fadeOnly?: boolean
  /** Stagger start, in seconds. */
  delay?: number
  as?: 'div' | 'span'
}

/**
 * The one scroll-reveal pattern used across the whole site: fade up once,
 * on first entering the viewport. Respects prefers-reduced-motion by
 * rendering the final state immediately instead of animating.
 */
export function Reveal({ children, className, fadeOnly = false, delay = 0, as = 'div' }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const Comp = motion[as]

  if (shouldReduceMotion) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: fadeOnly ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: DURATION.slow, ease: EASE.out, delay }}
    >
      {children}
    </Comp>
  )
}
