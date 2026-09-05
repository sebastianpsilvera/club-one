import type { ReactNode } from 'react'
import { useRef } from 'react'
import type { MotionValue } from 'motion/react'
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
  Send,
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
  {
    icon: <Send />,
    title: 'Procesamiento de Handicap',
    desc: 'Envío automático de tarjetas a federación.',
  },
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
    desc: 'Integra los distintos medios de pago de forma fácil y rápida.',
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
const VB = { w: 1200, h: 560 }
const CX = VB.w / 2
const CY = VB.h / 2
const HUB_R = 110
/** Row centres per side, each set symmetric about the hub. Five tentacles on
    the left, four on the right — nine modules don't split evenly. */
const ROW_Y_LEFT = [70, 165, 280, 395, 490]
const ROW_Y_RIGHT = [118, 233, 348, 463]
/** Where each tentacle ends — just inside the module text blocks. */
const DOT_X = { left: 440, right: 760 }

type Tip = { cx: number; cy: number; side: 'left' | 'right' }

const TIPS: Tip[] = [
  ...ROW_Y_LEFT.map((y) => ({ cx: DOT_X.left, cy: y, side: 'left' as const })),
  ...ROW_Y_RIGHT.map((y) => ({ cx: DOT_X.right, cy: y, side: 'right' as const })),
]

/**
 * One tentacle, drawn from the hub's edge to a tip that sits `reach` of the
 * way out (1 = fully extended). Contracting also deepens the curve, so the
 * arms coil in towards the hub rather than just getting shorter.
 */
function tentacleD(tip: Tip, reach: number) {
  const ex = CX + (tip.cx - CX) * reach
  const ey = CY + (tip.cy - CY) * reach
  const dx = ex - CX
  const dy = ey - CY
  const len = Math.hypot(dx, dy) || 1
  const sx = CX + (dx / len) * HUB_R
  const sy = CY + (dy / len) * HUB_R
  // Perpendicular bow, away from the hub's vertical axis, deeper as it coils.
  const bow = (1 - reach) * 150 * (tip.cy < CY ? -1 : 1)
  const mx = (sx + ex) / 2 + (-dy / len) * bow
  const my = (sy + ey) / 2 + (dx / len) * bow
  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`
}

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

/**
 * One arm: the curved path plus the suction-cup dot at its tip, both driven by
 * the shared `reach` value. Split into its own component so each arm calls
 * `useTransform` exactly once, rather than looping hooks in the parent.
 */
function Tentacle({
  tip,
  reach,
  index,
  reduced,
}: {
  tip: Tip
  reach: MotionValue<number>
  index: number
  reduced: boolean
}) {
  const d = useTransform(reach, (r) => tentacleD(tip, r))
  const cx = useTransform(reach, (r) => CX + (tip.cx - CX) * r)
  const cy = useTransform(reach, (r) => CY + (tip.cy - CY) * r)

  return (
    <>
      <motion.path
        d={d}
        className="stroke-border-muted"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.1 + (index % 5) * 0.06 }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={4}
        className="fill-green"
        initial={reduced ? undefined : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: DURATION.base, ease: EASE.out, delay: 0.5 + (index % 5) * 0.06 }}
      />
    </>
  )
}

/**
 * A module's text block, which travels with the tip of its arm — so the labels
 * are pulled towards the hub as the arms coil in, instead of the lines
 * detaching from stationary text.
 */
function ModuleNode({
  module,
  tip,
  reach,
  delay,
}: {
  module: Module
  tip: Tip
  reach: MotionValue<number>
  delay: number
}) {
  // Horizontal travel only: the row keeps its vertical position, so the blocks
  // never overlap each other as they move.
  const x = useTransform(reach, (r) => ((tip.cx - CX) * (r - 1) * 100) / VB.w)
  const xPct = useTransform(x, (v) => `${v}%`)

  return (
    <motion.div
      className={`absolute w-[35%] -translate-y-1/2 ${tip.side === 'left' ? 'left-0' : 'right-0'}`}
      style={{ top: pct(tip.cy, VB.h), x: xPct }}
    >
      <Reveal fadeOnly delay={delay}>
        <ModuleBlock {...module} align={tip.side} />
      </Reveal>
    </motion.div>
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
  // How far the arms reach out of the hub, 1 being fully extended. They coil
  // in as the section enters and leaves the viewport and are at full stretch
  // exactly when it's centred — i.e. when it's actually being read. Pinned at
  // 1 under reduced motion, so the diagram is simply static.
  const reach = useTransform(scrollYProgress, [0, 0.5, 1], shouldReduceMotion ? [1, 1, 1] : [0.34, 1, 0.34])

  return (
    <section className="relative overflow-hidden bg-white px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
      <div className="relative mx-auto max-w-(--container-max)">
        {/* The module grid earlier on the page lists what each module does;
            this section is about the one thing that connects them, so the
            copy here deliberately doesn't repeat that heading. */}
        <Reveal className="mb-16 max-w-[620px] max-[1080px]:mb-10">
          <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
            Una sola fuente de datos
          </div>
          <h2 className="mb-4 text-h2 leading-[1.06] font-bold tracking-[-0.03em] text-navy">
            Todo conectado a una administración central.
          </h2>
          <p className="text-[17px] leading-[1.65] text-ink-muted">
            Cada módulo escribe y lee del mismo sistema: un socio, una cuenta corriente y un historial, sin
            planillas intermedias ni datos duplicados entre áreas.
          </p>
        </Reveal>

        {/* Radial diagram — desktop only; the stacked spine below takes over on narrow screens. */}
        <div ref={stageRef} className="max-[1080px]:hidden">
          <div className="relative aspect-[1200/560] w-full">
            <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 size-full" fill="none" aria-hidden>
              {TIPS.map((tip, i) => (
                <Tentacle key={`arm-${i}`} tip={tip} reach={reach} index={i} reduced={!!shouldReduceMotion} />
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
              <ModuleNode key={m.title} module={m} tip={TIPS[i]} reach={reach} delay={0.1 + i * 0.06} />
            ))}
            {RIGHT_MODULES.map((m, i) => (
              <ModuleNode
                key={m.title}
                module={m}
                tip={TIPS[LEFT_MODULES.length + i]}
                reach={reach}
                delay={0.1 + i * 0.06}
              />
            ))}
          </div>
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

      </div>
    </section>
  )
}
