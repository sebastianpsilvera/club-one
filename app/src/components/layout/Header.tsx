import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NAV_LINKS } from '@/lib/nav'
import { DURATION, EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    // The mobile header is genuinely frosted: white-on-navy has contrast to
    // spare (~10:1 even at 80% over a light section). The desktop bar stays at
    // 94% on purpose — its inactive nav links are ink-muted, which already sits
    // right at the 4.5:1 AA floor, and any more transparency drops it to ~3.4:1
    // over the dark sections. Don't lower it without darkening that text first.
    <header className="sticky top-0 z-[100] border-b border-border bg-white/94 backdrop-blur-xl backdrop-saturate-150 max-[1080px]:border-white/10 max-[1080px]:bg-[rgba(8,20,40,0.80)]">
      <div className="mx-auto flex h-[72px] max-w-(--container-max) items-center justify-between gap-6 px-8 max-[720px]:px-5">
        <NavLink to="/" className="flex shrink-0 items-center gap-[11px] no-underline" onClick={() => setOpen(false)}>
          <img
            src="/assets/logo-clubone.webp"
            alt="Club One"
            className="block size-9 max-[1080px]:brightness-0 max-[1080px]:invert"
          />
          <span className="text-[16.5px] font-display font-semibold tracking-[0.08em] text-navy max-[1080px]:text-white">
            CLUB <span className="text-green-dark">ONE</span>
          </span>
        </NavLink>

        <nav className="flex items-center gap-1 max-[1080px]:hidden">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-[13px] py-2 text-[14.5px] font-medium text-ink-muted no-underline transition-colors duration-150 hover:bg-secondary/60 hover:text-navy focus-visible:bg-secondary/60 focus-visible:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50',
                  isActive && 'bg-secondary font-display font-semibold text-navy',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-5 max-[1080px]:hidden">
          {/* External app login — leaves the marketing site, so a plain anchor
              rather than a router NavLink. */}
          <a
            href="https://exact-hack-90077304.figma.site"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md text-[14.5px] font-medium text-navy no-underline transition-colors duration-150 hover:text-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50"
          >
            Acceder
          </a>
          <Button asChild className="rounded-[10px] bg-navy px-[22px] py-[11px] text-[14.5px] hover:bg-[#16294A]">
            <NavLink to="/contacto">Solicitar demo</NavLink>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Menú"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="hidden size-11 items-center justify-center rounded-[10px] border border-border bg-white transition-transform duration-150 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50 max-[1080px]:flex max-[1080px]:border-white/24 max-[1080px]:bg-white/8"
        >
          <Menu className="size-5 text-navy max-[1080px]:text-white" />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE.out }}
            className="hidden overflow-hidden border-t border-white/12 bg-navy max-[1080px]:block"
          >
            <div className="flex flex-col px-6 pt-2 pb-[22px]">
              {NAV_LINKS.map((l, i) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-md py-3.5 text-base font-medium text-[#E7EFF9] no-underline transition-colors duration-150 active:text-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50',
                    i < NAV_LINKS.length - 1 && 'border-b border-white/10',
                  )}
                >
                  {l.label}
                </NavLink>
              ))}
              <NavLink
                to="/contacto"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-[11px] bg-green py-3.5 text-center text-[15.5px] font-display font-semibold text-navy no-underline transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Solicitar demo
              </NavLink>
              {/* Mirrors the desktop "Acceder" link, which is hidden ≤1080px —
                  without this the app login is unreachable on a phone. */}
              <a
                href="https://exact-hack-90077304.figma.site"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2.5 rounded-[11px] border border-white/24 py-3.5 text-center text-[15.5px] font-medium text-[#E7EFF9] no-underline transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50"
              >
                Acceder
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
