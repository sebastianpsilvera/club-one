import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Landmark, CircleDot, Diamond, Wine, Users, PartyPopper, CalendarClock, ScanFace, Building2 } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

type Module = {
  icon: ReactNode
  title: string
  desc: string
  image: string
  /**
   * Card backs are full-bleed photos by default. 'contain' is for artwork that
   * isn't a photo — a square icon would otherwise be cropped to a meaningless
   * middle band by object-cover.
   */
  fit?: 'cover' | 'contain'
}

const MODULES: Module[] = [
  { icon: <Landmark />, title: 'Golf', desc: 'Canchas, torneos, handicaps y jugadores.', image: '/assets/mod-golf.webp' },
  { icon: <CircleDot />, title: 'Tenis', desc: 'Canchas, clases y torneos.', image: '/assets/mod-tenis.jpg' },
  {
    icon: <Diamond />,
    title: 'Polo, equitación y otros deportes',
    desc: 'Reservas, gimnasio, clases y profesores.',
    image: '/assets/mod-polo.jpg',
  },
  {
    icon: <Wine />,
    title: 'Restaurant',
    desc: 'Mesas, comandas, consumos y facturación.',
    image: '/assets/mod-restaurant.webp',
  },
  {
    icon: <Users />,
    title: 'Socios y CRM',
    desc: 'Ficha 360°, segmentación y fidelización.',
    image: '/assets/mod-socios.webp',
  },
  { icon: <PartyPopper />, title: 'Eventos', desc: 'Salones, catering y seguimiento.', image: '/assets/mod-eventos.webp' },
  {
    icon: <CalendarClock />,
    title: 'Reservas y calendario',
    desc: 'Recursos, recurrencias y disponibilidad.',
    image: '/assets/mod-reservas.webp',
    fit: 'contain',
  },
  {
    icon: <ScanFace />,
    title: 'Control de accesos y estacionamiento',
    desc: 'Ingresos de socios e invitados.',
    image: '/assets/mod-accesos.webp',
  },
  {
    icon: <Building2 />,
    title: 'Administración central',
    desc: 'Fuente única de datos para todo el club.',
    image: '/assets/mod-administracion.webp',
  },
]

function FlipCard({ icon, title, desc, image, fit = 'cover' }: Module) {
  return (
    <div className="min-h-[212px] [perspective:1400px]">
      <div className="group relative size-full min-h-[212px] [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.45,0,0.25,1)] hover:[transform:rotateY(180deg)] motion-reduce:transition-none">
        {/* Front — frosted glass. The section behind it carries soft green/navy
            glows on purpose: backdrop-blur over a flat white section would be
            invisible, so the glass needs something to refract. */}
        <div className="absolute inset-0 rounded-[14px] border border-white/60 bg-white/45 p-[26px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_10px_30px_-18px_rgba(10,26,51,0.30),0_2px_10px_-6px_rgba(10,26,51,0.14)] backdrop-blur-xl backdrop-saturate-150 transition-[border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] [backface-visibility:hidden] group-hover:border-white group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_26px_54px_-24px_rgba(10,26,51,0.38),0_6px_18px_-10px_rgba(53,196,106,0.30)] motion-reduce:transition-none">
          <div className="mb-[18px] flex size-[42px] items-center justify-center rounded-xl bg-navy shadow-[0_6px_16px_-8px_rgba(10,26,51,0.6)] [&>svg]:size-5 [&>svg]:stroke-green [&>svg]:stroke-[1.8]">
            {icon}
          </div>
          <h3 className="mb-[7px] text-[17.5px] font-bold tracking-[-0.01em] text-navy">{title}</h3>
          <p className="text-[14.5px] leading-[1.55] text-ink-muted">{desc}</p>
        </div>
        {/* Back — the photo. Here the glass sits over real imagery, so the
            title panel is genuinely frosted rather than just tinted. */}
        <div className="absolute inset-0 overflow-hidden rounded-[14px] border border-white/22 bg-navy shadow-[0_26px_54px_-24px_rgba(10,26,51,0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className={cn(
              'absolute inset-0 size-full',
              fit === 'contain' ? 'p-8 pb-16 object-contain' : 'object-cover',
            )}
          />
          <div
            className={cn(
              'absolute inset-0',
              // Contained artwork sits on the navy back with nothing to darken,
              // so it only needs a footer scrim to keep the title legible.
              fit === 'contain'
                ? 'bg-[linear-gradient(to_top,rgba(6,15,30,0.86)_0%,rgba(6,15,30,0.30)_28%,rgba(6,15,30,0)_46%)]'
                : 'bg-[linear-gradient(to_top,rgba(6,15,30,0.86)_0%,rgba(6,15,30,0.28)_52%,rgba(6,15,30,0.08)_100%)]',
            )}
          />
          <div className="absolute right-4 bottom-4 left-4 rounded-[10px] border border-white/25 bg-white/12 px-4 py-3 text-[16.5px] font-bold tracking-[-0.01em] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28)] backdrop-blur-md backdrop-saturate-150">
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ModulesGrid() {
  return (
    // Soft green/navy glows over white — the same radial-glow idiom the dark
    // sections and PageHero already use, here so the frosted cards above have
    // something to blur. Flat white would make the glass effect invisible.
    <section className="relative overflow-hidden bg-white px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute top-[26%] -left-[6%] size-[560px] rounded-full bg-[radial-gradient(circle,rgba(53,196,106,0.30),rgba(53,196,106,0)_66%)] blur-[26px]" />
        <span className="absolute top-[44%] left-[38%] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(10,26,51,0.16),rgba(10,26,51,0)_66%)] blur-[26px]" />
        <span className="absolute top-[18%] -right-[4%] size-[600px] rounded-full bg-[radial-gradient(circle,rgba(53,196,106,0.22),rgba(53,196,106,0)_66%)] blur-[26px]" />
        <span className="absolute bottom-[-8%] left-[18%] size-[460px] rounded-full bg-[radial-gradient(circle,rgba(10,26,51,0.13),rgba(10,26,51,0)_66%)] blur-[26px]" />
      </div>
      <div className="relative mx-auto max-w-(--container-max)">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[620px]">
            <h2 className="mb-4 text-h2 leading-[1.06] font-bold tracking-[-0.03em] text-navy">
              Todos los módulos que tu club necesita, en un solo sistema.
            </h2>
            <p className="text-[17px] leading-[1.65] text-ink-muted">
              Cada módulo está integrado a un sistema central y vos definís los que tu club necesita.
            </p>
          </div>
          <NavLink
            to="/producto"
            className="rounded-sm border-b border-[#B9E4CB] pb-1 font-mono text-[13px] font-medium tracking-[0.08em] whitespace-nowrap text-green-dark no-underline transition-colors duration-150 hover:border-green-dark hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50 max-[720px]:w-full max-[720px]:text-center"
          >
            Ver el producto ↗
          </NavLink>
        </Reveal>
        <div className="grid grid-cols-3 gap-[18px] max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1">
          {MODULES.map((m, i) => (
            <Reveal key={m.title} fadeOnly delay={(i % 3) * 0.06}>
              <FlipCard {...m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
