---
name: club-one-motion
description: Motion conventions for the Club One site (app/). Use whenever adding or reviewing animation in app/src — reveals, parallax, hover, or any new interactive component. Read before writing motion code; the values here are derived from app/src/lib/motion.ts and the components that already use it (Hero, Reveal, useParallax, ActionTabsSection) — don't introduce new curves, durations, or a second animation engine.
---

# Club One motion

Single animation engine: **Motion** (`motion/react`, the renamed Framer
Motion). Smooth scroll is **Lenis**, wired once at the app root
(`src/main.tsx`). Do not add GSAP, react-spring, or any other animation
library — if a motion problem seems to need one, solve it with Motion's
`useScroll`/`useTransform`/`animate` instead, or ask before reaching for a
new dependency.

Source of truth for the tokens below: `app/src/lib/motion.ts`. If you need a
new easing or duration, it almost certainly means an existing one will do —
check there first.

## The three easing curves

| Name | Value | Use for |
|---|---|---|
| `EASE.out` | `cubic-bezier(0.16, 0.84, 0.44, 1)` | Button/link hover, opacity crossfades, scroll reveals — quick, decisive settle. This is the site's default. |
| `EASE.emphasized` | `cubic-bezier(0.2, 0.7, 0.3, 1)` | Hover lifts on cards/interactive surfaces — a touch softer, slightly springy. |
| `EASE.inOut` | `cubic-bezier(0.45, 0, 0.25, 1)` | Symmetric in/out motion only — toggles and transforms that reverse themselves. |

These three came from the original shipped design (button hover, card hover,
and the module flip-card timing respectively) — they are not arbitrary.
Don't add a fourth without a concrete reason.

## The three durations

| Name | Value | Use for |
|---|---|---|
| `DURATION.fast` | `0.3s` | Hover/press feedback, the mobile menu open/close. |
| `DURATION.base` | `0.5s` | Opacity crossfades (tab panels, cycling device screens). |
| `DURATION.slow` | `0.85s` | Section reveal on scroll. |

## Pattern: `whileInView` reveal

Every section entrance on the site uses the same reveal — fade up 24px,
once, the first time it enters the viewport. Don't hand-roll this; use the
`<Reveal>` component (`src/components/Reveal.tsx`):

```tsx
<Reveal>
  <h2>Section heading</h2>
</Reveal>

// Element already has scroll-linked parallax (see below)? Skip the y-offset
// so the two transforms don't fight each other:
<Reveal fadeOnly>
  <FlipCard ... />
</Reveal>
```

Internally this is:

```tsx
initial={{ opacity: 0, y: fadeOnly ? 0 : 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.15 }}
transition={{ duration: DURATION.slow, ease: EASE.out }}
```

`<Reveal>` checks `useReducedMotion()` itself and renders the plain static
element (no animation, no wrapper motion props) when the user has reduced
motion enabled — callers never need to check this themselves.

## Pattern: `useScroll` + `useTransform` parallax

Scroll-linked drift (device mockups, background glow orbs) uses the
`useParallax` hook (`src/hooks/useParallax.ts`), not scroll listeners or
GSAP ScrollTrigger:

```tsx
const par = useParallax(24) // amplitude in px
<motion.div ref={par.ref} style={{ y: par.y }}>...</motion.div>
```

It tracks the element's own scroll progress (`offset: ['start end', 'end
start']`) and maps it to `[amplitude, -amplitude]` — the element drifts up
as it crosses the viewport, tied directly to scroll position (no spring/
inertia, matching the original design's scrub feel). It collapses to
`[0, 0]` automatically under `useReducedMotion()`.

## Hard rules

1. **Every animation respects `useReducedMotion()`.** Either use `<Reveal>`
   / `useParallax` (which already do this), or check the hook yourself
   before animating. A purely-decorative CSS `@keyframes` loop (the feature
   marquee) must be gated with the `motion-safe:` / `motion-reduce:`
   Tailwind variants instead — same rule, CSS mechanism. A hover-triggered
   CSS transition uses `motion-reduce:transition-none` instead — same
   intent, since there's no keyframe loop to gate. A Motion component that
   isn't using `<Reveal>`/`useParallax` (e.g. the SVG connectors in
   `ModulesHub`) must read `useReducedMotion()` itself and drop its
   `initial` so the finished state renders immediately.
2. **One hero animation per page, quiet transitions elsewhere.** Each page
   gets exactly one "showcase" moment — on Home that's the hero (video
   background, parallax orbs, cycling device mockup); everywhere else on
   that page, motion is limited to the reveal/parallax/crossfade patterns
   above. Don't add a second attention-grabbing animation (a new looping
   effect, a second scroll-scrubbed 3D transform, etc.) to a page that
   already has its hero moment — if a section feels like it needs one,
   that's a sign to simplify the section instead.

   The one sanctioned exception on Home is `ModulesHub`, whose radial
   diagram is scroll-scrubbed (`scale` `0.9 → 1 → 0.9` across the same
   `['start end', 'end start']` offsets `useParallax` uses). It stays
   quiet by construction: it's a single scalar, it sits at exactly `1`
   when the section is centred — i.e. whenever it's actually being read —
   and it collapses to `[1, 1, 1]` under `useReducedMotion()`. Treat that
   as the ceiling for a non-hero section, not a precedent to build on.
