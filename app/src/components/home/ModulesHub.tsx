import type { ReactNode } from 'react'
import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import {
  Landmark,
  CircleDot,
  Diamond,
  Wine,
  Users,
  PartyPopper,
  CalendarClock,
  ScanFace,
  BrainCircuit,
  CreditCard,
  Globe,
} from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { DURATION, EASE } from '@/lib/motion'

type Module = { icon: ReactNode; title: string; desc: string }

/** The four modules drawn to the left of the hub, top to bottom. */
const LEFT_MODULES: Module[] = [
  { icon: <Landmark />, title: 'Golf', desc: 'Canchas, torneos, handicaps y jugadores.' },
  { icon: <CircleDot />, title: 'Tenis', desc: 'Canchas, clases y torneos.' },
  {
    icon: <Diamond />,
    title: 'Polo, equitación y otros deportes',
    desc: 'Reservas, gimnasio, clases y profesores.',
  },
  { icon: <Wine />, title: 'Restaurant', desc: 'Mesas, comandas, consumos y facturación.' },
]

/** The four modules drawn to the right of the hub, top to bottom. */
const RIGHT_MODULES: Module[] = [
  { icon: <Users />, title: 'Socios y CRM', desc: 'Ficha 360°, segmentación y fidelización.' },
  { icon: <PartyPopper />, title: 'Eventos', desc: 'Salones, catering y seguimiento.' },
  {
    icon: <CalendarClock />,
    title: 'Reservas y calendario',
    desc: 'Recursos, recurrencias y disponibilidad.',
  },
  {
    icon: <ScanFace />,
    title: 'Control de accesos y estacionamiento',
    desc: 'Ingresos de socios e invitados.',
  },
]

const CAPABILITIES: Module[] = [
  {
    icon: <BrainCircuit />,
    title: 'IA integrada y reportes BI',
    desc: 'Dashboards, KPIs y reportes personalizables por área, exportables.',
  },
  {
    icon: <CreditCard />,
    title: 'Cobranzas y medios de pago',
    desc: 'Integra los distintos medios de pago de forma facil y rapida.',
  },
  {
    icon: <Globe />,
    title: 'Conectividad simplificada',
    desc: 'Web, mobile y nube. Sin instalar nada y sin servidores en el club.',
  },
]

/* ---------------------------------------------------------------------------
   Diagram geometry. Everything below is expressed in the SVG's own viewBox
   units, and the HTML nodes are positioned as percentages of that same box —
   so the connector lines stay attached to the module blocks at any width.
--------------------------------------------------------------------------- */
const VB = { w: 1200, h: 520 }
const CX = VB.w / 2
const CY = VB.h / 2
const HUB_R = 110
/** Vertical centre of each of the four rows, symmetric about the hub. */
const ROW_Y = [90, 205, 315, 430]
/** Where each spoke ends — just inside the module text blocks. */
const DOT_X = { left: 440, right: 760 }

/** A spoke starts on the hub's edge (never inside it) and ends at the node dot. */
function spoke(x: number, y: number) {
  const dx = x - CX
  const dy = y - CY
  const len = Math.hypot(dx, dy)
  return { x1: CX + (dx / len) * HUB_R, y1: CY + (dy / len) * HUB_R, x2: x, y2: y }
}

const SPOKES = [
  ...ROW_Y.map((y) => ({ ...spoke(DOT_X.left, y), cx: DOT_X.left, cy: y })),
  ...ROW_Y.map((y) => ({ ...spoke(DOT_X.right, y), cx: DOT_X.right, cy: y })),
]

const pct = (value: number, total: number) => `${(value / total) * 100}%`

function ModuleIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center [&>svg]:size-[22px] [&>svg]:stroke-green [&>svg]:stroke-[1.6]">
      {children}
    </span>
  )
}

function ModuleBlock({ icon, title, desc, align }: Module & { align: 'left' | 'right' }) {
  return (
    <div className={`flex items-start gap-3.5 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
      <ModuleIcon>{icon}</ModuleIcon>
      <div>
        <h3 className="text-[16.5px] leading-[1.25] font-bold tracking-[-0.01em] text-navy">{title}</h3>
        <p className="mt-1 text-[13.5px] leading-[1.5] text-ink-muted">{desc}</p>
      </div>
    </div>
  )
}

function Hub() {
  return (
    <div className="flex aspect-square flex-col items-center justify-center rounded-full bg-navy px-6 text-center shadow-[0_36px_80px_-34px_rgba(10,26,51,0.55)]">
      <img src="/assets/logo-clubone.webp" alt="" className="mb-3 block size-8 brightness-0 invert" />
      <div className="text-[15px] leading-[1.2] font-bold tracking-[-0.01em] text-white">Administración central</div>
      <div className="mt-1.5 font-mono text-[9.5px] tracking-[0.16em] text-green uppercase">
        Fuente única de datos
      </div>
    </div>
  )
}

export function ModulesHub() {
  const stageRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'end start'] })
  // The tree expands as the section comes into view and contracts as it leaves,
  // sitting at its true size exactly when the section is centred — i.e. when
  // it's actually being read. Collapses to a no-op under reduced motion.
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], shouldReduceMotion ? [1, 1, 1] : [0.9, 1, 0.9])

  return (
    <section className="relative overflow-hidden bg-secondary px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
      <div className="relative mx-auto max-w-(--container-max)">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 right-0 font-bold text-[64px] leading-none text-navy/6 select-none max-[720px]:hidden"
        >
          01
        </span>

        <Reveal className="mb-16 max-w-[620px] max-[1080px]:mb-10">
          <h2 className="mb-4 text-h2 leading-[1.06] font-bold tracking-[-0.03em] text-navy">
            Todos los módulos que tu club necesita, en un solo sistema.
          </h2>
          <p className="text-[17px] leading-[1.65] text-ink-muted">
            Cada módulo está integrado a un sistema central y vos definís los que tu club necesita.
          </p>
        </Reveal>

        {/* Radial diagram — desktop only; the stacked spine below takes over on narrow screens. */}
        <div ref={stageRef} className="max-[1080px]:hidden">
          <motion.div style={{ scale }} className="relative aspect-[1200/520] w-full">
            <svg
              viewBox={`0 0 ${VB.w} ${VB.h}`}
              className="absolute inset-0 size-full"
              fill="none"
              aria-hidden
            >
              {SPOKES.map((s, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={s.x1}
                  y1={s.y1}
                  x2={s.x2}
                  y2={s.y2}
                  className="stroke-border-muted"
                  strokeWidth={1.5}
                  initial={shouldReduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.1 + (i % 4) * 0.06 }}
                />
              ))}
              {SPOKES.map((s, i) => (
                <motion.circle
                  key={`dot-${i}`}
                  cx={s.cx}
                  cy={s.cy}
                  r={4}
                  className="fill-green"
                  initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: DURATION.base, ease: EASE.out, delay: 0.5 + (i % 4) * 0.06 }}
                />
              ))}
            </svg>

            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: pct(HUB_R * 2, VB.w) }}
            >
              <Reveal fadeOnly>
                <Hub />
              </Reveal>
            </div>

            {LEFT_MODULES.map((m, i) => (
              <div
                key={m.title}
                className="absolute left-0 w-[35%] -translate-y-1/2"
                style={{ top: pct(ROW_Y[i], VB.h) }}
              >
                <Reveal fadeOnly delay={0.1 + i * 0.06}>
                  <ModuleBlock {...m} align="left" />
                </Reveal>
              </div>
            ))}

            {RIGHT_MODULES.map((m, i) => (
              <div
                key={m.title}
                className="absolute right-0 w-[35%] -translate-y-1/2"
                style={{ top: pct(ROW_Y[i], VB.h) }}
              >
                <Reveal fadeOnly delay={0.1 + i * 0.06}>
                  <ModuleBlock {...m} align="right" />
                </Reveal>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stacked spine — same "everything hangs off the hub" idea, narrow screens. */}
        <div className="hidden max-[1080px]:block">
          <Reveal fadeOnly className="mx-auto w-[190px]">
            <Hub />
          </Reveal>
          <div className="relative mt-9 border-l border-border-muted pl-7">
            {[...LEFT_MODULES, ...RIGHT_MODULES].map((m, i) => (
              <Reveal key={m.title} className="relative pb-7 last:pb-0" delay={(i % 4) * 0.05}>
                <span className="absolute top-[7px] -left-8 size-2 rounded-full bg-green" />
                <ModuleBlock {...m} align="left" />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-[72px] grid grid-cols-3 gap-9 border-t border-border-muted pt-11 max-[1080px]:mt-14 max-[720px]:grid-cols-1 max-[720px]:gap-7">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06}>
              <ModuleIcon>{c.icon}</ModuleIcon>
              <h3 className="mt-3.5 mb-2 text-[16.5px] font-bold tracking-[-0.01em] text-navy">{c.title}</h3>
              <p className="text-[13.5px] leading-[1.55] text-ink-muted">{c.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <NavLink
            to="/producto"
            className="rounded-sm border-b border-[#B9E4CB] pb-1 font-mono text-[13px] font-medium tracking-[0.08em] whitespace-nowrap text-green-dark no-underline transition-colors duration-150 hover:border-green-dark hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50"
          >
            Ver el producto ↗
          </NavLink>
        </Reveal>
      </div>
    </section>
  )
}
