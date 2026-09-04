import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Landmark, CircleDot, Diamond, Wine, Users, PartyPopper, CalendarClock, ScanFace, Building2 } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

const MODULES: { icon: ReactNode; title: string; desc: string; image: string }[] = [
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
    image: '/assets/mod-restaurant.jpg',
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
    image: '/assets/mod-reservas.png',
  },
  {
    icon: <ScanFace />,
    title: 'Control de accesos y estacionamiento',
    desc: 'Ingresos de socios e invitados.',
    image: '/assets/mod-accesos.jpg',
  },
  {
    icon: <Building2 />,
    title: 'Administración central',
    desc: 'Fuente única de datos para todo el club.',
    image: '/assets/mod-administracion.webp',
  },
]

function FlipCard({ icon, title, desc, image }: { icon: ReactNode; title: string; desc: string; image: string }) {
  return (
    <div className="min-h-[212px] [perspective:1400px]">
      <div className="group relative size-full min-h-[212px] [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.45,0,0.25,1)] hover:[transform:rotateY(180deg)] motion-reduce:transition-none">
        <div className="absolute inset-0 rounded-[14px] border border-border bg-white p-[26px] transition-[border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] [backface-visibility:hidden] group-hover:border-[#C4D4CB] group-hover:shadow-[0_18px_40px_-22px_rgba(10,26,51,0.28)]">
          <div className="mb-[18px] flex size-[42px] items-center justify-center rounded-xl bg-navy [&>svg]:size-5 [&>svg]:stroke-green [&>svg]:stroke-[1.8]">
            {icon}
          </div>
          <h3 className="mb-[7px] text-[17.5px] font-bold tracking-[-0.01em] text-navy">{title}</h3>
          <p className="text-[14.5px] leading-[1.55] text-ink-muted">{desc}</p>
        </div>
        <div className="absolute inset-0 overflow-hidden rounded-[14px] border border-border bg-navy [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <img src={image} alt={title} loading="lazy" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,15,30,0.86)_0%,rgba(6,15,30,0.28)_52%,rgba(6,15,30,0.08)_100%)]" />
          <div className="absolute right-6 bottom-[22px] left-6 text-[16.5px] font-bold tracking-[-0.01em] text-white">
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ModulesGrid() {
  return (
    <section className="bg-white px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
      <div className="mx-auto max-w-(--container-max)">
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
            className="rounded-sm border-b border-[#B9E4CB] pb-1 font-mono text-[13px] font-medium tracking-[0.08em] whitespace-nowrap text-green-dark no-underline transition-colors duration-150 hover:border-green-dark hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50"
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
