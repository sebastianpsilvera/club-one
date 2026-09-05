import { Plane, Trophy, Users, Wallet } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { ContactForm } from '@/components/ContactForm'

const SPECS = [
  ['Acreditación', 'Agente IATA'],
  ['Modelo', 'Mayorista'],
  ['Emisión', 'Directa'],
  ['Especialidad', 'Viajes de golf'],
]

const PAQUETES = [
  {
    icon: Trophy,
    title: 'Torneos en el exterior',
    desc: 'Inscripciones, green fees y tee times coordinados con el club de destino.',
  },
  {
    icon: Users,
    title: 'Giras y salidas grupales',
    desc: 'Grupos de socios con acompañamiento durante todo el viaje.',
  },
  {
    icon: Plane,
    title: 'Aéreos y traslados',
    desc: 'Emisión directa como agente IATA, con tarifas de volumen negociadas.',
  },
  {
    icon: Wallet,
    title: 'Administración resuelta',
    desc: 'Cobranzas, comprobantes y liquidación al club, sin trabajo extra para la administración.',
  },
]

export function Turismo() {
  return (
    <div>
      <PageHero
        eyebrow="Turismo · Agente IATA"
        heading={
          <>
            Viajes de golf,
            <br />
            <span className="text-green-dark">resueltos de punta a punta.</span>
          </>
        }
        body="Operamos como consolidadora mayorista de tickets aéreos y agencia de turismo con acreditación IATA, al servicio de los clubes que trabajan con Club One."
        maxBody="max-w-[560px]"
      />

      <section id="turismo" className="scroll-mt-[90px] bg-navy px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto grid max-w-(--container-max) grid-cols-2 items-center gap-16 max-[1080px]:grid-cols-1">
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
              <div className="grid max-w-[480px] grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/14 bg-white/14">
                {SPECS.map(([label, value]) => (
                  <div key={label} className="bg-navy p-[22px]">
                    <div className="mb-[9px] font-mono text-[10.5px] tracking-[0.16em] text-label uppercase">
                      {label}
                    </div>
                    <div className="text-base font-medium text-white">{value}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal fadeOnly className="flex flex-col gap-[18px]">
            <div className="aspect-video overflow-hidden rounded-[14px] bg-[#16294A]">
              <img
                src="/assets/turismo-bangkok.webp"
                alt="Golf y viajes internacionales"
                loading="lazy"
                className="block size-full object-cover"
              />
            </div>
            <div className="aspect-video overflow-hidden rounded-[14px] bg-[#16294A]">
              <img
                src="/assets/golf-coast.webp"
                alt="Cancha de golf costera"
                loading="lazy"
                className="block size-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto max-w-(--container-max)">
          <Reveal className="mb-14 max-w-[640px]">
            <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
              Paquetes
            </div>
            <h2 className="mb-4 text-h2 leading-[1.06] font-bold tracking-[-0.03em] text-navy">
              Armamos paquetes a medida.
            </h2>
            <p className="text-[17px] leading-[1.65] text-ink-muted text-pretty">
              Cada club tiene su calendario, su presupuesto y su grupo. Armamos el viaje sobre eso: destino, fechas,
              canchas y presupuesto, con una sola contraparte de principio a fin.
            </p>
          </Reveal>
          <div className="grid grid-cols-4 gap-[18px] max-[1080px]:grid-cols-2 max-[600px]:grid-cols-1">
            {PAQUETES.map((p, i) => (
              <Reveal key={p.title} className="rounded-[14px] border border-border bg-white p-[26px]" delay={(i % 4) * 0.06}>
                <div className="mb-[18px] flex size-[42px] items-center justify-center rounded-xl bg-navy">
                  <p.icon className="size-5 stroke-green stroke-[1.8]" />
                </div>
                <h3 className="mb-[7px] text-[17.5px] font-bold tracking-[-0.01em] text-navy">{p.title}</h3>
                <p className="text-[14.5px] leading-[1.55] text-ink-muted">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary px-8 py-[104px] max-[1080px]:py-18 max-[720px]:px-5">
        <div className="mx-auto grid max-w-(--container-max) grid-cols-[1fr_1.25fr] items-start gap-18 max-[1080px]:grid-cols-1 max-[1080px]:gap-12">
          <Reveal>
            <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
              Contacto
            </div>
            <h2 className="mb-[18px] text-[clamp(26px,2.6vw,34px)] leading-[1.12] font-bold tracking-[-0.025em] text-navy">
              Contanos qué viaje tenés en mente.
            </h2>
            <p className="max-w-[380px] text-[16px] leading-[1.65] text-ink-muted text-pretty">
              Decinos el destino, las fechas aproximadas y cuántos socios viajan, y te armamos una propuesta con
              aéreos, alojamiento y green fees.
            </p>
          </Reveal>
          <Reveal fadeOnly>
            <ContactForm
              submitLabel="Pedir propuesta"
              messagePlaceholder="Destino, fechas aproximadas y cantidad de jugadores"
            />
          </Reveal>
        </div>
      </section>
    </div>
  )
}
