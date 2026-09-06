import { NavLink } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

type Member = { name?: string; role: string; desc: string; photo?: string; placeholder: 'filled' | 'empty' }

const TEAM: Member[] = [
  { role: 'Project Manager Development', desc: '', placeholder: 'filled' },
  {
    name: 'Sebastian Silvera',
    role: 'CMO',
    desc: 'Marketing, Comunicación y Estrategia Comercial.',
    photo: '/assets/team-sebastian.webp',
    placeholder: 'filled',
  },
  { role: '', desc: '', placeholder: 'empty' },
  { role: '', desc: '', placeholder: 'empty' },
]

function TeamCard({ name, role, desc, photo, placeholder }: Member) {
  return (
    <div
      className={cn(
        'rounded-[14px] border bg-white p-7',
        placeholder === 'empty' ? 'border-dashed border-[#D2DCE8]' : 'border-border',
      )}
    >
      {photo ? (
        <img
          src={photo}
          alt={name ?? ''}
          loading="lazy"
          className="mb-5 size-[74px] rounded-[14px] object-cover object-top"
        />
      ) : (
        <div
          className={cn('mb-5 size-[74px] rounded-[14px]', placeholder === 'empty' ? 'bg-[#F0F4F9]' : 'bg-navy')}
        />
      )}
      <div className="h-[19px] text-[19px] leading-[19px] font-display font-semibold tracking-[-0.01em] text-navy">{name}</div>
      <div className="mt-1.5 mb-3.5 h-[11px] font-mono text-[11px] tracking-[0.14em] text-green-dark uppercase">
        {role}
      </div>
      <p className="min-h-12 text-[14.5px] leading-[1.65] text-ink-muted">{desc}</p>
    </div>
  )
}

export function TeamSection() {
  return (
    <section className="bg-secondary px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
      <div className="mx-auto max-w-(--container-max)">
        <Reveal className="mb-14 max-w-[640px]">
          <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
            Equipo
          </div>
          <h2 className="mb-4 text-h2 leading-[1.06] tracking-[-0.03em] text-navy">Nuestro equipo</h2>
          <p className="font-display text-[17px] leading-[1.65] text-ink-muted">
            Un equipo que unió tecnología y un profundo conocimiento del mundo de los clubes de golf. Nos une la
            pasión por innovar.
          </p>
        </Reveal>
        <div className="mb-10 grid grid-cols-4 gap-[18px] max-[1080px]:grid-cols-2 max-[600px]:grid-cols-1">
          {TEAM.map((m, i) => (
            <Reveal key={i} fadeOnly delay={(i % 4) * 0.06}>
              <TeamCard {...m} />
            </Reveal>
          ))}
        </div>
        <Reveal className="max-[720px]:text-center">
          <NavLink
            to="/quienes-somos"
            className="rounded-sm border-b border-[#B9E4CB] pb-1 font-mono text-[13px] font-medium tracking-[0.08em] text-green-dark no-underline transition-colors duration-150 hover:border-green-dark hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50"
          >
            Conocé más sobre nosotros ↗
          </NavLink>
        </Reveal>
      </div>
    </section>
  )
}
