import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { useParallax } from '@/hooks/useParallax'
import { cn } from '@/lib/utils'
import { DURATION, EASE } from '@/lib/motion'

type TabKey = 'tee' | 'torneos' | 'reportes' | 'facturacion' | 'proshop'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'tee', label: 'Tee Time' },
  { key: 'torneos', label: 'Torneos' },
  { key: 'reportes', label: 'Reportes y BI' },
  { key: 'facturacion', label: 'Facturación' },
  { key: 'proshop', label: 'Proshop' },
]

const AUTO_ORDER: TabKey[] = ['tee', 'torneos', 'reportes']

const CAPTIONS: Record<TabKey, string> = {
  reportes: 'REPORTES Y BI · KPIs del club en tiempo real',
  torneos: 'TORNEOS · Configuración y gestión 360°',
  tee: 'TEE TIMES· La operación del día, en vivo',
  facturacion: 'FACTURACIÓN · Cobros, caja y medios de pago',
  proshop: 'PROSHOP · Inventario y venta rápida',
}

const SHOTS: Partial<Record<TabKey, { src: string; alt: string; fit: 'contain' | 'fill' }>> = {
  reportes: { src: '/assets/shot-reportes.webp', alt: 'Reportes e inteligencia', fit: 'contain' },
  torneos: { src: '/assets/shot-torneos.webp', alt: 'Gestión de torneos', fit: 'contain' },
  tee: { src: '/assets/shot-teesheet.webp', alt: 'Tee sheet en tiempo real', fit: 'contain' },
  facturacion: { src: '/assets/facturacion.png', alt: 'Facturación y cobros', fit: 'fill' },
}

export function ActionTabsSection() {
  const [tab, setTab] = useState<TabKey>('tee')
  const holdUntilRef = useRef(0)
  const shouldReduceMotion = useReducedMotion()
  const par = useParallax(24)

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() < holdUntilRef.current) return
      setTab((current) => {
        const idx = AUTO_ORDER.indexOf(current as (typeof AUTO_ORDER)[number])
        return idx === -1 ? 'tee' : AUTO_ORDER[(idx + 1) % AUTO_ORDER.length]
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  function pickTab(key: TabKey) {
    holdUntilRef.current = Date.now() + 15000
    setTab(key)
  }

  const shot = SHOTS[tab]

  return (
    <section className="bg-[linear-gradient(155deg,#0A1A33_0%,#060F1E_100%)] px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
      <div className="mx-auto max-w-(--container-max)">
        <Reveal className="mx-auto mb-11 max-w-[640px] text-center">
          <h2 className="mb-4 text-h2 leading-[1.06] font-semibold tracking-[-0.03em] text-white">
            Descubrí Club One <span className="text-green">en acción.</span>
          </h2>
          <p className="text-[17px] leading-[1.65] text-ink-muted-light">
            Navegar entre módulos es ágil e intuitivo. Cada pantalla fue diseñada con la experiencia del usuario como
            prioridad.
          </p>
        </Reveal>

        <Reveal className="mb-9 flex flex-wrap justify-center gap-2.5">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => pickTab(t.key)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-[13.5px] font-semibold transition-[color,background-color,border-color,transform] duration-300 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50',
                tab === t.key
                  ? 'border-green bg-green text-navy'
                  : 'border-ink-muted-light/25 bg-white/6 text-ink-muted-light hover:border-ink-muted-light/45 hover:text-white',
              )}
            >
              {t.label}
            </button>
          ))}
        </Reveal>

        <motion.div
          ref={par.ref}
          style={{ y: shouldReduceMotion ? 0 : par.y }}
          className="overflow-hidden rounded-[14px] border border-ink-muted-light/20 bg-[#0B1526] shadow-[0_50px_110px_-40px_rgba(0,0,0,0.7)]"
        >
          <div className="flex h-11 items-center gap-2 border-b border-ink-muted-light/16 bg-white/5 px-4">
            <span className="size-[11px] rounded-full bg-[#FF5F57]" />
            <span className="size-[11px] rounded-full bg-[#FEBC2E]" />
            <span className="size-[11px] rounded-full bg-[#28C840]" />
            <span className="flex flex-1 justify-center">
              <span className="inline-flex items-center gap-[7px] rounded-lg border border-ink-muted-light/18 bg-white/6 px-3.5 py-[5px] font-mono text-[11.5px] text-ink-muted-light">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#35C46A" strokeWidth="2.4" strokeLinecap="round">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 018 0v4" />
                </svg>
                www.clubonetech.com
              </span>
            </span>
            <span className="w-[33px]" />
          </div>
          <div className="relative aspect-[1896/938] bg-white">
            {tab === 'proshop' && <div className="absolute inset-0 bg-secondary" />}
            <AnimatePresence>
              {shot && (
                <motion.img
                  key={tab}
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: DURATION.base, ease: EASE.out }}
                  className={cn('absolute inset-0 size-full', shot.fit === 'contain' ? 'object-contain' : 'object-fill')}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        <Reveal className="mt-6 text-center font-mono text-xs tracking-[0.12em] text-[#5C7295]">
          {CAPTIONS[tab]}
        </Reveal>
        <Reveal className="mt-[34px] flex justify-center">
          <NavLink
            to="/producto"
            className="inline-flex items-center gap-[9px] rounded-[11px] bg-green px-[30px] py-[15px] text-[15px] font-semibold whitespace-nowrap text-navy no-underline transition-[background-color,transform] duration-150 hover:bg-green-hover active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Ver el producto <span>→</span>
          </NavLink>
        </Reveal>
      </div>
    </section>
  )
}
