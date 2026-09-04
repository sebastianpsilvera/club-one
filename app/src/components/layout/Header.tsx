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
    <header className="sticky top-0 z-[100] border-b border-border bg-white/94 backdrop-blur-md max-[1080px]:border-white/10 max-[1080px]:bg-[rgba(8,20,40,0.94)]">
      <div className="mx-auto flex h-[72px] max-w-(--container-max) items-center justify-between gap-6 px-8 max-[720px]:px-5">
        <NavLink to="/" className="flex shrink-0 items-center gap-[11px] no-underline" onClick={() => setOpen(false)}>
          <img
            src="/assets/logo-clubone.webp"
            alt="Club One"
            className="block size-9 max-[1080px]:brightness-0 max-[1080px]:invert"
          />
          <span className="text-[16.5px] font-bold tracking-[0.08em] text-navy max-[1080px]:text-white">
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
                  isActive && 'bg-secondary font-bold text-navy',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-5 max-[1080px]:hidden">
          <NavLink
            to="/contacto"
            className="rounded-md text-[14.5px] font-medium text-navy no-underline transition-colors duration-150 hover:text-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50"
          >
            Acceder
          </NavLink>
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
                className="mt-3 rounded-[11px] bg-green py-3.5 text-center text-[15.5px] font-bold text-navy no-underline transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Solicitar demo
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
