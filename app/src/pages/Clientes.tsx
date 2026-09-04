import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { ClosingCta } from '@/components/ClosingCta'

const CATEGORIES = [
  { image: '/assets/golf-course.webp', alt: 'Cancha de golf vista desde el aire', label: 'Clubes de golf' },
  { image: '/assets/golf-bag.webp', alt: 'Bolsa de palos de golf', label: 'Clubes de campo' },
  { image: '/assets/golf-tee.webp', alt: 'Pelota de golf en el tee', label: 'Instituciones deportivas' },
]

const TESTIMONIALS = [
  {
    quote: 'Pasamos de cinco sistemas distintos a uno solo. Hoy el club funciona con la mitad de trabajo administrativo.',
    name: 'Mariana Quiroga',
    role: 'Gerente · Club de golf, Buenos Aires',
  },
  {
    quote: 'Armar el torneo del sábado tomaba dos días. Ahora el draw, los scores y el leaderboard salen solos.',
    name: 'Diego Ferrari',
    role: 'Capitán de golf · Club de golf, Córdoba',
  },
  {
    quote: 'La cobranza del mes pasó de una semana a un click. Y los socios ven su estado de cuenta en la app.',
    name: 'Lucía Márquez',
    role: 'Administración · Club de campo, Uruguay',
  },
]

const SEGMENTS = [
  { n: '01', title: 'Clubes de golf', desc: 'Tee sheet, torneos, handicaps y proshop integrados con la administración y la app del socio.' },
  { n: '02', title: 'Country clubs', desc: 'Múltiples deportes, quinchos, eventos, accesos y expensas en un mismo sistema central.' },
  { n: '03', title: 'Clubes deportivos', desc: 'Reservas de canchas, clases, profesores y cuotas al día, sin planillas ni papeles.' },
]

export function Clientes() {
  return (
    <div>
      <PageHero
        eyebrow="Clientes"
        heading={
          <>
            Clubes que ya operan
            <br />
            con <span className="text-green-dark">Club One.</span>
          </>
        }
        body="De clubes de golf boutique a instituciones con miles de socios: la plataforma se adapta a cada realidad."
        maxBody="max-w-[560px]"
      />

      <section className="bg-secondary px-8 py-24 max-[720px]:px-5">
        <div className="mx-auto max-w-(--container-max)">
          <div className="grid grid-cols-3 gap-[18px] max-[720px]:grid-cols-1">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.label} className="relative aspect-4/3 overflow-hidden rounded-[14px] bg-secondary" delay={(i % 3) * 0.06}>
                <img src={c.image} alt={c.alt} loading="lazy" className="block size-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(10,26,51,0)_0%,rgba(10,26,51,0.72)_100%)] px-5 py-[18px]">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-white uppercase">{c.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 text-center font-mono text-[13px] tracking-[0.08em] text-label">
            Y más de 120 clubes en Argentina y la región.
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto max-w-(--container-max)">
          <Reveal className="mb-14 max-w-[640px]">
            <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
              Lo que dicen
            </div>
            <h2 className="text-h2 leading-[1.06] font-bold tracking-[-0.03em] text-navy">
              La experiencia de gestionar con Club One.
            </h2>
          </Reveal>
          <div className="grid grid-cols-3 gap-[18px] max-[720px]:grid-cols-1">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} fadeOnly delay={(i % 3) * 0.06}>
                <div className="flex h-full flex-col rounded-[14px] border border-border bg-white p-[30px]">
                  <div className="mb-5 text-[44px] leading-[0.6] font-bold text-green">&ldquo;</div>
                  <p className="mb-6 flex-1 text-[18.5px] leading-[1.5] text-navy text-pretty">{t.quote}</p>
                  <div className="border-t border-border pt-4">
                    <div className="text-[14.5px] font-medium text-navy">{t.name}</div>
                    <div className="mt-1 font-mono text-[10.5px] tracking-[0.12em] text-label uppercase">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto max-w-(--container-max)">
          <Reveal className="mb-14 max-w-[640px]">
            <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
              Para quién
            </div>
            <h2 className="text-h2 leading-[1.06] font-bold tracking-[-0.03em] text-navy">
              Pensado para cada tipo de club.
            </h2>
          </Reveal>
          <div className="grid grid-cols-3 gap-x-8 gap-y-10 max-[720px]:grid-cols-1">
            {SEGMENTS.map((s, i) => (
              <Reveal key={s.n} className="border-t border-border-ink-muted pt-6" delay={(i % 3) * 0.06}>
                <div className="mb-3.5 font-mono text-xs text-green-dark">{s.n}</div>
                <h3 className="mb-[9px] text-lg font-bold text-navy">{s.title}</h3>
                <p className="text-[15px] leading-[1.6] text-ink-muted">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        heading={
          <>
            Tu club puede ser <span className="text-green">el próximo.</span>
          </>
        }
        body="Sumate a los clubes que ya simplificaron su gestión con Club One."
        links={[{ to: '/contacto', label: 'Solicitar demo', variant: 'solid' }]}
      />
    </div>
  )
}
