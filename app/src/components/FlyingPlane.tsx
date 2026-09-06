import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

/**
 * An airliner that crosses the section as you scroll past it, trailing a
 * contrail. Scroll-linked rather than looping, so it follows the same
 * `['start end', 'end start']` scrub the rest of the site uses and adds no
 * self-running animation to the page. Under `prefers-reduced-motion` it parks
 * mid-flight and the contrail is drawn statically.
 *
 * Decorative only — `aria-hidden`, and it never intercepts pointer events.
 */
export function FlyingPlane({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Left to right across the band, climbing slightly as it goes.
  const x = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['38%', '38%'] : ['-16%', '112%'])
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['34%', '-34%'])
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.85, 1],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0],
  )
  // The trail grows behind the aircraft as it crosses.
  const trail = useTransform(scrollYProgress, [0.05, 0.6], shouldReduceMotion ? [0.55, 0.55] : [0, 1])

  return (
    // Given a band to fly in rather than the whole section, so it never
    // crosses the copy.
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-x-0 overflow-hidden ${className ?? ''}`}>
      <motion.div style={{ x, y, opacity }} className="absolute top-1/2 left-0 w-[132px] max-[720px]:w-[92px]">
        <svg viewBox="-190 0 322 64" fill="none" className="w-[420px] max-[720px]:w-[300px] overflow-visible">
          {/* Contrail: two strands that fan out and fade, drawn from the engines. */}
          <motion.path
            d="M-4 27 C -60 25, -120 23, -186 20"
            stroke="url(#trail)"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ pathLength: trail }}
          />
          <motion.path
            d="M-4 37 C -60 39, -120 41, -186 44"
            stroke="url(#trail)"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ pathLength: trail }}
          />
          <defs>
            <linearGradient id="trail" x1="0" y1="0" x2="-186" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.5" />
              <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0.12" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Airliner, viewed from above, nose to the right. */}
          <g>
            {/* swept main wings */}
            <path d="M74 25 L32 2 L20 4 L52 26 Z" fill="#DCE6F2" />
            <path d="M74 39 L32 62 L20 60 L52 38 Z" fill="#B9C8DC" />
            {/* tailplanes */}
            <path d="M24 25 L7 11 L1 12.5 L14 26 Z" fill="#DCE6F2" />
            <path d="M24 39 L7 53 L1 51.5 L14 38 Z" fill="#B9C8DC" />
            {/* fuselage */}
            <path
              d="M124 32 C118 26 104 22.5 86 22.5 H26 C14 22.5 8 27 8 32 C8 37 14 41.5 26 41.5 H86 C104 41.5 118 38 124 32 Z"
              fill="#F2F6FB"
            />
            {/* cabin shading along the belly */}
            <path
              d="M124 32 C118 38 104 41.5 86 41.5 H26 C14 41.5 8 37 8 32 Z"
              fill="#C6D3E3"
              fillOpacity="0.75"
            />
            {/* engines */}
            <ellipse cx="56" cy="20" rx="7" ry="3.4" fill="#8FA6C4" />
            <ellipse cx="56" cy="44" rx="7" ry="3.4" fill="#7E96B6" />
            {/* cockpit glass */}
            <path d="M114 30.5 C110 28.6 106 27.8 102 27.6 L102 36.4 C106 36.2 110 35.4 114 33.5 Z" fill="#35C46A" fillOpacity="0.55" />
          </g>
        </svg>
      </motion.div>
    </div>
  )
}
