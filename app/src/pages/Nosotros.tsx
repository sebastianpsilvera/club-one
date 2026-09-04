import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { ClosingCta } from '@/components/ClosingCta'
import { useReducedMotion, useInView } from 'motion/react'
import { useRef } from 'react'

const STORY = [
  {
    n: '01 · El origen',
    title: 'Todo empieza en el primer tee.',
    body: 'Nacimos operando volumen: consolidando y distribuyendo tickets de forma mayorista. Ese trabajo nos enseñó a construir sistemas que no fallan cuando la demanda aprieta.',
    image: '/assets/golf-tee.webp',
    alt: 'Pelota de golf en el tee',
    link: true,
  },
  {
    n: '02 · La fusión',
    title: 'Club One Technologies Inc. se fusiona y adquiere Vista Golf.',
    body: 'La operación suma a nuestra plataforma una década de experiencia en gestión de clubes y una base instalada que ya opera todos los días sobre el software.',
    image: '/assets/golf-bag.webp',
    alt: 'Bolsa de palos de golf',
    reverse: true,
  },
  {
    n: '03 · La expansión',
    title: 'El puntapié inicial de nuestra expansión en América Latina.',
    body: 'Argentina y Uruguay son los primeros mercados. Desde ahí seguimos hacia el resto de la región, club por club, con el mismo sistema y el mismo estándar de servicio.',
    image: '/assets/golf-course.webp',
    alt: 'Vista aérea de una cancha de golf',
  },
]

const STATS = [
  { value: 120, prefix: '+', label: 'Clubes confían en nosotros' },
  { value: 250000, prefix: '+', label: 'Socios gestionados' },
  { value: 10, suffix: ' años', label: 'De experiencia' },
  { value: 98, suffix: '%', label: 'Retención anual' },
]

const WHY = [
  { title: 'Especialización', desc: 'hacemos una sola cosa: software para clubes.' },
  { title: 'Cercanía', desc: 'soporte en español, directo con el equipo que desarrolla el producto.' },
  { title: 'Evolución continua', desc: 'mejoras y módulos nuevos todos los meses, sin costo adicional.' },
]

const TEAM = [
  { role: 'Project Manager Development', desc: '', placeholder: 'filled' as const },
  { role: 'CMO', desc: 'Marketing, Comunicación y Estrategia Comercial.', placeholder: 'filled' as const },
  { role: '', desc: '', placeholder: 'empty' as const },
  { role: '', desc: '', placeholder: 'empty' as const },
]

const HOW = [
  { n: '01', title: 'Implementación acompañada', desc: 'Migramos tus datos y capacitamos a tu equipo, área por área, hasta que el sistema queda andando.' },
  { n: '02', title: 'Soporte real', desc: 'Hablás con personas que conocen tu club y tu configuración, no con un bot ni un call center.' },
  { n: '03', title: 'Producto vivo', desc: 'El roadmap se construye con los pedidos de los clubes: lo que necesitás hoy es la mejora de mañana.' },
]

function Counter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const shouldReduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(shouldReduceMotion ? value : 0)

  useEffect(() => {
    if (!inView || shouldReduceMotion) return
    const duration = 1700
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 2)
      setDisplay(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, shouldReduceMotion])

  return (
    <div ref={ref} className="text-[clamp(30px,3vw,40px)] font-bold tracking-[-0.03em] text-navy">
      {prefix}
      {display.toLocaleString('es-AR')}
      {suffix}
    </div>
  )
}

export function Nosotros() {
  return (
    <div>
      <PageHero
        eyebrow="Sobre nosotros"
        heading={
          <>
            Tecnología al servicio
            <br />
            <span className="text-green-dark">de los clubes.</span>
          </>
        }
        body="Somos un equipo de especialistas en software y en gestión deportiva. Construimos Club One para que dirigir un club sea más simple, más humano y más rentable."
      />

      <section className="border-b border-border bg-white px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto max-w-(--container-max)">
          <Reveal className="mb-18 max-w-[760px]">
            <div className="mb-[22px] font-mono text-eyebrow font-medium tracking-[0.22em] text-label uppercase">
              Nuestra historia
            </div>
            <h2 className="text-h2-lg leading-[1.05] font-bold tracking-[-0.035em] text-navy text-balance">
              Somos una consolidadora de tickets mayorista.
            </h2>
          </Reveal>
          <div className="flex flex-col gap-24">
            {STORY.map((s) => (
              <div
                key={s.n}
                className={`grid grid-cols-[1fr_1.05fr] items-center gap-14 max-[1080px]:grid-cols-1 max-[1080px]:gap-7`}
              >
                <Reveal fadeOnly className={`relative aspect-[3/2] overflow-hidden rounded-[14px] bg-secondary ${s.reverse ? 'order-2' : ''}`}>
                  <img src={s.image} alt={s.alt} loading="lazy" className="block size-full object-cover" />
                </Reveal>
                <Reveal className={s.reverse ? 'order-1' : ''}>
                  <div className="mb-[18px] font-mono text-eyebrow tracking-[0.2em] text-green-dark uppercase">{s.n}</div>
                  <h3 className="mb-4 text-h3 leading-[1.08] font-bold tracking-[-0.03em] text-navy text-balance">
                    {s.title}
                  </h3>
                  <p className="max-w-[460px] text-[17px] leading-[1.65] text-ink-muted text-pretty">{s.body}</p>
                  {s.link && (
                    <NavLink
                      to="#turismo"
                      className="story-link mt-[22px] inline-flex items-center gap-[9px] rounded-sm border-b border-[#B9E4CB] pb-1 font-mono text-[13px] font-medium tracking-[0.08em] text-green-dark no-underline transition-colors duration-150 hover:border-green-dark hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50"
                    >
                      Ver la operación de turismo <ArrowRight className="size-[13px]" />
                    </NavLink>
                  )}
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="turismo" className="scroll-mt-[90px] bg-navy px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto max-w-(--container-max) grid grid-cols-2 items-center gap-16 max-[1080px]:grid-cols-1">
          <div>
            <Reveal>
              <div className="mb-[22px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green uppercase">
                Turismo · Agente IATA
              </div>
              <h2 className="mb-[22px] text-[clamp(30px,3.4vw,46px)] leading-[1.05] font-bold tracking-[-0.035em] text-white text-balance">
                Consolidadora de tickets y turismo.
              </h2>
              <p className="mb-5 max-w-[480px] text-[17.5px] leading-[1.65] text-[#B8C7DA] text-pretty">
                Operamos como consolidadora mayorista de tickets aéreos y como agencia de turismo con acreditación
                IATA. Emitimos directamente, negociamos tarifas de volumen y armamos los itinerarios completos.
              </p>
              <p className="mb-[34px] max-w-[480px] text-[17.5px] leading-[1.65] text-[#B8C7DA] text-pretty">
                Esa estructura es la que hoy nos permite ofrecer viajes de golf a los clubes que trabajan con Club
                One: torneos en el exterior, giras y salidas grupales, con la emisión y la administración resueltas
                por nosotros.
              </p>
              <div className="grid max-w-[480px] grid-cols-2 gap-px rounded-xl border border-white/14 bg-white/14 overflow-hidden">
                {[
                  ['Acreditación', 'Agente IATA'],
                  ['Modelo', 'Mayorista'],
                  ['Emisión', 'Directa'],
                  ['Especialidad', 'Viajes de golf'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-navy p-[22px]">
                    <div className="mb-[9px] font-mono text-[10.5px] tracking-[0.16em] text-label uppercase">{label}</div>
                    <div className="text-base font-medium text-white">{value}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal fadeOnly className="flex flex-col gap-[18px]">
            <div className="aspect-video overflow-hidden rounded-[14px] bg-[#16294A]">
              <img src="/assets/turismo-bangkok.webp" alt="Golf y viajes internacionales" loading="lazy" className="block size-full object-cover" />
            </div>
            <div className="aspect-video overflow-hidden rounded-[14px] bg-[#16294A]">
              <img src="/assets/golf-coast.webp" alt="Cancha de golf costera" loading="lazy" className="block size-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-(--container-max) grid-cols-4 gap-8 px-8 py-13 max-[720px]:grid-cols-2 max-[720px]:px-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} className="border-l border-border-ink-muted pl-6" delay={(i % 4) * 0.06}>
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              <div className="mt-2 font-mono text-[11px] tracking-[0.12em] text-label uppercase">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto grid max-w-(--container-max) grid-cols-[1fr_1.2fr] items-start gap-18 max-[1080px]:grid-cols-1 max-[1080px]:gap-11">
          <Reveal>
            <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
              Nuestra historia
            </div>
            <h2 className="text-h2 leading-[1.06] font-bold tracking-[-0.03em] text-navy">
              Nacimos adentro del club, <span className="text-green-dark">no en una oficina.</span>
            </h2>
          </Reveal>
          <div>
            <Reveal>
              <p className="mb-5 text-[17px] leading-[1.7] text-ink-muted text-pretty">
                Club One nace de la unión de dos mundos: décadas desarrollando software de gestión para clubes de
                campo y de golf, y años de experiencia real dirigiendo torneos y operando clubes desde adentro.
              </p>
              <p className="mb-9 text-[17px] leading-[1.7] text-ink-muted text-pretty">
                Por eso la plataforma habla el idioma del club: entiende de handicaps y green fees, de cuotas y
                categorías, de la asamblea y del día a día de la administración.
              </p>
            </Reveal>
            <div className="flex flex-col gap-[18px]">
              {WHY.map((w, i) => (
                <Reveal key={w.title} className="border-t border-border pt-4" delay={i * 0.05}>
                  <span className="text-[15.5px] font-medium text-navy">{w.title}</span>{' '}
                  <span className="text-[15px] text-ink-muted">— {w.desc}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto max-w-(--container-max)">
          <Reveal className="mb-14 max-w-[640px]">
            <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
              Equipo
            </div>
            <h2 className="text-h2 leading-[1.06] font-bold tracking-[-0.03em] text-navy">
              El equipo detrás de Club One.
            </h2>
          </Reveal>
          <div className="grid grid-cols-4 gap-[18px] max-[1080px]:grid-cols-2 max-[600px]:grid-cols-1">
            {TEAM.map((m, i) => (
              <Reveal key={i} fadeOnly delay={(i % 4) * 0.06}>
                <div
                  className={`overflow-hidden rounded-[14px] border bg-white ${m.placeholder === 'empty' ? 'border-dashed border-[#D2DCE8]' : 'border-border'}`}
                >
                  <div className={`h-[250px] ${m.placeholder === 'empty' ? 'bg-[#F0F4F9]' : 'bg-[linear-gradient(155deg,#0A1A33,#16294A)]'}`} />
                  <div className="p-[26px]">
                    <div className="h-[19px]" />
                    <div className="mt-1.5 mb-3.5 font-mono text-[11px] tracking-[0.14em] text-green-dark uppercase">
                      {m.role}
                    </div>
                    <p className="min-h-12 text-[14.5px] leading-[1.65] text-ink-muted">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto max-w-(--container-max)">
          <Reveal className="mb-14 max-w-[640px]">
            <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
              Cómo trabajamos
            </div>
            <h2 className="text-h2 leading-[1.06] font-bold tracking-[-0.03em] text-navy">
              Un socio tecnológico, no un proveedor más.
            </h2>
          </Reveal>
          <div className="grid grid-cols-3 gap-x-8 gap-y-10 max-[720px]:grid-cols-1">
            {HOW.map((h, i) => (
              <Reveal key={h.n} className="border-t border-border-ink-muted pt-6" delay={(i % 3) * 0.06}>
                <div className="mb-3.5 font-mono text-xs text-green-dark">{h.n}</div>
                <h3 className="mb-[9px] text-lg font-bold text-navy">{h.title}</h3>
                <p className="text-[15px] leading-[1.6] text-ink-muted">{h.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        heading={
          <>
            Conozcamos <span className="text-green">tu club.</span>
          </>
        }
        body="Contanos cómo opera hoy y te mostramos cómo Club One puede simplificarlo."
        links={[
          { to: '/contacto', label: 'Solicitar demo', variant: 'solid' },
          { to: '/clientes', label: 'Ver clientes', variant: 'outline' },
        ]}
      />
    </div>
  )
}
