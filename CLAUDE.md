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

- Display (headings, highlighted text): **Poppins** (Google Fonts, weights
  400, 500, 600, 700), exposed as the `font-display` utility via the
  `--font-display` token. Headings are Poppins **SemiBold (600)** by default —
  a base rule in `src/index.css` sets `h1`–`h4` to that, so individual
  headings don't carry a font class. Poppins **Regular (400)** is for
  subtitles, section intro paragraphs and other highlighted copy; add
  `font-display` explicitly there.
- Body (body copy, large text, UI): **Inter** (Google Fonts, weights 400, 500,
  600). This is `--font-sans`, i.e. the default on `body`, so ordinary copy,
  form fields, nav links, table/label text and anything not called out above
  is Inter without needing a class.
- Unlike Satoshi (the previous face) Poppins **does** ship a real 600 cut, so
  `font-semibold` is correct again and is what headings, buttons and other
  highlighted text use. The old "never use font-semibold" rule existed only
  because Satoshi had no 600 file; it no longer applies.
- Mono (eyebrows/labels/captions): **DM Mono** (Google Fonts, weights 400, 500)

Fluid type scale (all `clamp()`). The **maximums** are the desktop sizes,
bumped ~15% larger across the board per explicit request — don't re-scale
those again without a similar explicit ask. The **minimums** only bind below
~720px and are set so the longest single word in each role still fits a
360px screen (the binding case is `Latinoamérica` in the home hero H1);
lowering a floor further is a mobile-fit decision, not a re-scale of the
design. Body/eyebrow sizes were untouched and stay as the baseline
reference point:

| Token | clamp() | Used for |
|---|---|---|
| `display` | `clamp(2.375rem, 5.25vw, 4.5rem)` (38–72px) | Home hero H1 |
| `h1` | `clamp(2.25rem, 5vw, 4.125rem)` (36–66px) | Page hero H1 (Producto/Nosotros/Clientes/Contacto) |
| `h2` | `clamp(1.875rem, 3.6vw, 3.125rem)` (30–50px) | Section H2 |
| `h2-lg` | `clamp(2rem, 4.1vw, 3.5625rem)` (32–57px) | Larger editorial H2 (Nosotros history intro) |
| `h2-sm` | `clamp(1.8125rem, 3.3vw, 2.875rem)` (29–46px) | Slightly smaller section H2 (device/product feature sections) |
| `h3` | `clamp(1.6875rem, 3.3vw, 2.6875rem)` (27–43px) | Subsection H3 (alternating story rows) |
| `cta` | `clamp(1.9375rem, 4.1vw, 3.4375rem)` (31–55px) | Closing CTA heading (reused on every page) |
| `body-lg` | `1.0625rem` (17px) | Section intro paragraphs |
| `body` | `0.9375rem` (15px) | Standard body copy |
| `eyebrow` | `0.71875rem` (11.5px) | DM Mono uppercase labels, `letter-spacing: 0.22em` |

Headings use `letter-spacing: -0.03em` to `-0.035em` and `line-height` around
`1.02–1.08`. Eyebrows are always DM Mono, uppercase, `letter-spacing: 0.22em`
(labels inside dark stat/spec tiles use a tighter `0.16em`).

## Layout

- Content max-width: `1180px` (forms/hero copy use narrower `860–880px`).
  **One deliberate exception:** the Home hero runs to `1360px` and gives the
  copy column the larger share (`1.42fr / 1fr`). At 1180 with the old
  `0.92fr / 1.35fr` split the H1 had only ~478px and broke into six short
  lines while ~130px sat unused either side of the container. Below 1200px it
  falls back to the normal token.
- **Mobile CTA buttons (≤720px):** a CTA row stacks into one column with
  every button the same width, so buttons never sit side by side at two
  different content widths. In a centered section (`ClosingCta`, `PageHero`,
  `ActionTabsSection`) they're `w-full max-w-[300px]` and centered; in a
  left-aligned section (the home hero, `DevicesTrioSection`, `AppSection`)
  they're `w-full` so their edges line up with the copy above them. Applies
  to real buttons only — the mono `↗` text links just get
  `max-[720px]:text-center` on their wrapper.
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
