# Club One — design tokens

Source of truth for the Club One brand, extracted from the verified static
implementation at `site/` (itself ported 1:1 from the Claude Design handoff
in `project/SiteDeploy.dc.html`). The React app in `app/` reads these values
— don't invent new colors or type sizes; if something's missing here, pull
it from `site/css/style.css` / `site/*.html` rather than guessing.

## Color palette

| Token | Hex | Use |
|---|---|---|
| `navy` | `#0A1A33` | Primary brand color — text, header/footer bg, primary buttons |
| `navy-deep` | `#060F1E` | Darkest gradient stop (footer, dark section gradients) |
| `green` | `#35C46A` | Accent — CTAs, highlights, active states |
| `green-dark` | `#1E9E52` | Accent on light backgrounds (links, small text accents) |
| `green-hover` | `#4AD87E` | Hover state for green buttons |
| `bg-light` | `#F6F9FC` | Light section background (alternates with white) |
| `ink-muted` | `#5C6F8A` | Body copy on light backgrounds |
| `ink-muted-light` | `#8FA6C4` | Body copy on dark backgrounds |
| `label` | `#5C7295` | Faint labels/eyebrows on dark backgrounds |
| `border` | `#E3EAF2` | Default hairline border on light backgrounds |
| `border-muted` | `#D6DFE9` | Divider rules inside light sections |
| `white` | `#ffffff` | — |

Dark sections use a diagonal gradient `linear-gradient(155deg, #0A1A33 0%, #060F1E 100%)`,
sometimes with a soft radial green glow mixed in (`rgba(53,196,106,0.10)`).

`ink-muted`/`ink-muted-light` are named that way — not `muted`/`muted-light`
— on purpose: shadcn/ui already owns `muted`/`muted-foreground` as its own
background/foreground semantic pair (see `src/index.css`). Reusing that name
for this palette's body-text gray silently overrides shadcn's token instead
of adding a new one, since both live in the same Tailwind `@theme` color
namespace — don't reintroduce that collision.

## Type

- Sans (body/headings): **Satoshi** (Fontshare, loaded via
  `https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap`
  in `index.html` — Fontshare's free-for-commercial license, no local font
  files in the repo). Satoshi ships exactly five static weights — 300, 400,
  500, 700, 900 — **there is no 600/semibold cut**. Because of that, every
  `font-semibold` in the codebase was deliberately remapped to a real weight
  Satoshi actually has: `font-bold` (700) for headings (`h1`/`h2`/`h3`),
  primary CTA buttons, and card/display titles; `font-medium` (500) for
  secondary UI text — nav links, form labels, tab pills, names/values, inline
  emphasis. Don't reintroduce `font-semibold` — it renders as a
  browser-synthesized fallback weight since Satoshi has no 600 file.
- Mono (eyebrows/labels/captions): **DM Mono** (Google Fonts, weights 400, 500)

Fluid type scale (all `clamp()`). Headings/titles were bumped ~15% larger
across the board per explicit request — don't re-scale again without a
similar explicit ask; body/eyebrow sizes were untouched and stay as the
baseline reference point:

| Token | clamp() | Used for |
|---|---|---|
| `display` | `clamp(2.875rem, 5.25vw, 4.5rem)` (46–72px) | Home hero H1 |
| `h1` | `clamp(2.75rem, 5vw, 4.125rem)` (44–66px) | Page hero H1 (Producto/Nosotros/Clientes/Contacto) |
| `h2` | `clamp(2.125rem, 3.6vw, 3.125rem)` (34–50px) | Section H2 |
| `h2-lg` | `clamp(2.25rem, 4.1vw, 3.5625rem)` (36–57px) | Larger editorial H2 (Nosotros history intro) |
| `h2-sm` | `clamp(2rem, 3.3vw, 2.875rem)` (32–46px) | Slightly smaller section H2 (device/product feature sections) |
| `h3` | `clamp(1.875rem, 3.3vw, 2.6875rem)` (30–43px) | Subsection H3 (alternating story rows) |
| `cta` | `clamp(2.25rem, 4.1vw, 3.4375rem)` (36–55px) | Closing CTA heading (reused on every page) |
| `body-lg` | `1.0625rem` (17px) | Section intro paragraphs |
| `body` | `0.9375rem` (15px) | Standard body copy |
| `eyebrow` | `0.71875rem` (11.5px) | DM Mono uppercase labels, `letter-spacing: 0.22em` |

Headings use `letter-spacing: -0.03em` to `-0.035em` and `line-height` around
`1.02–1.08`. Eyebrows are always DM Mono, uppercase, `letter-spacing: 0.22em`
(labels inside dark stat/spec tiles use a tighter `0.16em`).

## Layout

- Content max-width: `1180px` (forms/hero copy use narrower `860–880px`)
- Section vertical rhythm: `116px` desktop → `84px` ≤1080px → `64px` ≤720px
- Border radius: buttons/cards `10–14px` (shadcn `--radius` is set to `0.625rem` / 10px)
- Grid gaps: `18px` (dense card grids) to `72px` (two-column hero-style sections)

## Motion

See `.claude/skills/club-one-motion/SKILL.md` for the concrete easing curves,
durations, and reveal/parallax patterns — those values are derived from this
palette/rhythm, not picked independently.

## Stack

- `app/` — Vite + React + TypeScript + Tailwind v4 (`@tailwindcss/vite`, no
  `tailwind.config.js` — theme lives in `src/index.css` via `@theme`) +
  shadcn/ui, wired to the tokens above (see `src/index.css` `:root` block).
- Animation: **Motion** (`motion/react`, the renamed Framer Motion) only.
  GSAP, react-spring, or any second animation engine are explicitly not used.
- Smooth scroll: **Lenis**, instantiated once at the app root.
- `site/` — the static HTML/CSS/JS build (kept as a reference/fallback;
  not the actively developed version once `app/` is complete).
- `project/` — the original Claude Design export bundle. Treat as read-only
  source material.
