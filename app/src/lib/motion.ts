/**
 * Shared Motion tokens for Club One. These three easing curves and three
 * durations are the only ones components should use — see
 * .claude/skills/club-one-motion/SKILL.md. All three curves come from the
 * original shipped design (button hover / card hover / flip-card timing),
 * not invented for this pass.
 */
export const EASE = {
  /** Buttons, links, opacity crossfades — quick, decisive settle. */
  out: [0.16, 0.84, 0.44, 1] as const,
  /** Hover lifts on cards/interactive surfaces — soft, slightly bouncy. */
  emphasized: [0.2, 0.7, 0.3, 1] as const,
  /** Symmetric in/out motion (3D flips, toggles). */
  inOut: [0.45, 0, 0.25, 1] as const,
}

export const DURATION = {
  /** Hover/press feedback. */
  fast: 0.3,
  /** Opacity crossfades, small state changes. */
  base: 0.5,
  /** Section reveal on scroll. */
  slow: 0.85,
}

/** whileInView reveal pattern used for every section on the site. */
export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: DURATION.slow, ease: EASE.out },
}

/** Same reveal, without the y-offset — for elements that already parallax. */
export const revealFade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: DURATION.slow, ease: EASE.out },
}
