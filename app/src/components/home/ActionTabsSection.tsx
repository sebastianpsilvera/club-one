import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { useParallax } from '@/hooks/useParallax'
import { cn } from '@/lib/utils'
import { DURATION, EASE } from '@/lib/motion'

type TabKey =
  | 'reservas'
  | 'torneos'
  | 'reportes'
  | 'facturacion'
  | 'proshop'
  | 'driving'
  | 'mantenimiento'
  | 'casilla'
  | 'academia'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'reservas', label: 'Reservas' },
  { key: 'torneos', label: 'Torneos' },
  { key: 'reportes', label: 'Reportes y BI' },
  { key: 'facturacion', label: 'Facturación' },
  { key: 'proshop', label: 'Proshop' },
  { key: 'driving', label: 'Driving Range' },
  { key: 'mantenimiento', label: 'Mantenimiento de Campo' },
  { key: 'casilla', label: 'Casilla de Palos' },
  { key: 'academia', label: 'Academia' },
]

const AUTO_ORDER: TabKey[] = ['reservas', 'torneos', 'reportes']

const CAPTIONS: Record<TabKey, string> = {
  reportes: 'REPORTES Y BI · KPIs del club en tiempo real',
  torneos: 'TORNEOS · Configuración y gestión 360°',
  reservas: 'RESERVAS · La operación del día, en vivo',
  facturacion: 'FACTURACIÓN · Cobros, caja y medios de pago',
  proshop: 'PROSHOP · Inventario y venta rápida',
  driving: 'DRIVING RANGE · Práctica y entrenamiento',
  mantenimiento: 'MANTENIMIENTO DE CAMPO · Cuidado de canchas y greens',
  casilla: 'CASILLA DE PALOS · Guardado y retiro de equipos',
  academia: 'ACADEMIA · Alumnos, profesores y clases',
}

const SHOTS: Partial<Record<TabKey, { src: string; alt: string; fit: 'contain' | 'fill' | 'cover' }>> = {
  reportes: { src: '/assets/shot-reportes.webp', alt: 'Reportes e inteligencia', fit: 'contain' },
  torneos: { src: '/assets/shot-torneos.webp', alt: 'Gestión de torneos', fit: 'contain' },
  reservas: { src: '/assets/shot-teesheet.webp', alt: 'Reservas y tee sheet en tiempo real', fit: 'contain' },
  facturacion: { src: '/assets/facturacion.png', alt: 'Facturación y cobros', fit: 'fill' },
  proshop: { src: '/assets/shot-proshop.webp', alt: 'Proshop: punto de venta e inventario', fit: 'contain' },
  // These four are photographs rather than UI screenshots, so they fill the
  // frame with object-cover; the screenshots stay 'contain' since the frame
  // already matches their ratio and cropping one would cut off real UI.
  driving: { src: '/assets/shot-driving.webp', alt: 'Driving range', fit: 'cover' },
  mantenimiento: { src: '/assets/shot-mantenimiento.webp', alt: 'Mantenimiento de canchas y greens', fit: 'cover' },
  casilla: { src: '/assets/shot-casilla.webp', alt: 'Casilla de palos', fit: 'cover' },
  academia: { src: '/assets/shot-academia.webp', alt: 'Academia de golf: alumnos y clases', fit: 'contain' },
}

export function ActionTabsSection() {
  const [tab, setTab] = useState<TabKey>('reservas')
  const holdUntilRef = useRef(0)
  const shouldReduceMotion = useReducedMotion()
  const par = useParallax(24)

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() < holdUntilRef.current) return
      setTab((current) => {
        const idx = AUTO_ORDER.indexOf(current as (typeof AUTO_ORDER)[number])
        return idx === -1 ? 'reservas' : AUTO_ORDER[(idx + 1) % AUTO_ORDER.length]
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
    // Sized to the viewport so the whole section — heading, tabs, mockup,
    // caption and CTA — is visible at once instead of running 1340px tall and
    // forcing a scroll. The mockup is driven off vh, so it grows on taller
    // screens rather than being pinned to one size. Reverts to normal flow
    // below 1080px, where a viewport-tall section would squash the mockup.
    <section className="flex min-h-[100svh] flex-col justify-center bg-[linear-gradient(155deg,#0A1A33_0%,#060F1E_100%)] px-8 pt-[88px] pb-10 max-[1080px]:block max-[1080px]:min-h-0 max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
      <div className="mx-auto w-full max-w-(--container-max)">
        <Reveal className="mx-auto mb-7 max-w-[640px] text-center max-[1080px]:mb-11">
          <h2 className="mb-4 text-h2 leading-[1.06] font-bold tracking-[-0.03em] text-white">
            Descubrí Club One <span className="text-green">en acción.</span>
          </h2>
          <p className="text-[17px] leading-[1.65] text-ink-muted-light">
            Navegar entre módulos es ágil e intuitivo. Cada pantalla fue diseñada con la experiencia del usuario como
            prioridad.
          </p>
        </Reveal>

        <Reveal className="mb-6 flex flex-wrap justify-center gap-2.5 max-[1080px]:mb-9">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => pickTab(t.key)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-[13.5px] font-medium transition-[color,background-color,border-color,transform] duration-300 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50',
                // Eight labels of very uneven length; tighten them on mobile so
                // they pack into fewer, less ragged centered rows.
                'max-[720px]:px-3.5 max-[720px]:py-2 max-[720px]:text-[12.5px]',
                tab === t.key
                  ? 'border-green bg-green text-navy'
                  : 'border-ink-muted-light/25 bg-white/6 text-ink-muted-light hover:border-ink-muted-light/45 hover:text-white',
              )}
            >
              {t.label}
            </button>
          ))}
        </Reveal>

        {/* The mockup absorbs whatever vertical space the heading, tabs,
            caption and CTA leave over, so the section always adds up to one
            viewport instead of overflowing it — and it grows on taller
            screens. Its width follows from the screenshot's own aspect ratio,
            so the shot is never cropped or stretched. Below 1080px this
            reverts to the normal width-driven flow. */}
        <div className="flex justify-center max-[1080px]:block">
          <motion.div
            ref={par.ref}
            style={{ y: shouldReduceMotion ? 0 : par.y }}
            /* 595px is everything else in the section at its measured height —
               heading, tabs, caption, CTA, padding (incl. clearance for the
               sticky header) and the 44px chrome bar.
               Capping the width at the leftover height × the shot's aspect
               makes the mockup exactly fill what's left of one viewport, so it
               grows on tall screens and never pushes the section past the fold. */
            className="w-full max-w-[min(1180px,calc((100svh-643px)*2.021))] overflow-hidden rounded-[14px] border border-ink-muted-light/20 bg-[#0B1526] shadow-[0_50px_110px_-40px_rgba(0,0,0,0.7)] max-[1080px]:max-w-full"
          >
          <div className="flex h-11 shrink-0 items-center gap-2 border-b border-ink-muted-light/16 bg-white/5 px-4">
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
          <div className="relative aspect-[1896/938] w-full bg-white">
            {!shot && <div className="absolute inset-0 bg-secondary" />}
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
                  className={cn(
                    'absolute inset-0 size-full',
                    shot.fit === 'contain' && 'object-contain',
                    shot.fit === 'cover' && 'object-cover',
                    shot.fit === 'fill' && 'object-fill',
                  )}
                />
              )}
            </AnimatePresence>
            </div>
          </motion.div>
        </div>
        <Reveal className="mt-5 text-center font-mono text-xs tracking-[0.12em] text-[#5C7295] max-[1080px]:mt-6">
          {CAPTIONS[tab]}
        </Reveal>
        <Reveal className="mt-6 flex justify-center max-[1080px]:mt-[34px]">
          <NavLink
            to="/producto"
            className="inline-flex items-center gap-[9px] rounded-[11px] bg-green px-[30px] py-[15px] text-[15px] font-bold whitespace-nowrap text-navy no-underline transition-[background-color,transform] duration-150 hover:bg-green-hover active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 max-[720px]:w-full max-[720px]:max-w-[300px] max-[720px]:justify-center"
          >
            Ver el producto <span>→</span>
          </NavLink>
        </Reveal>
      </div>
    </section>
  )
}
