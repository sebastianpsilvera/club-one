import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { ContactForm } from '@/components/ContactForm'

const EXPECT = [
  { title: 'Demo personalizada', desc: 'Una reunión de 45 minutos sobre tu propia operación: tu padrón, tus categorías, tu grilla.' },
  { title: 'Respuesta en 24 horas', desc: 'Te contactamos dentro del día hábil siguiente para coordinar.' },
  { title: 'Sin compromiso', desc: 'La demo es gratuita y la propuesta se arma a la medida de tu club.' },
]

export function Contacto() {
  return (
    <div>
      <PageHero
        eyebrow="Contacto"
        heading={
          <>
            Hablemos de <span className="text-green-dark">tu club.</span>
          </>
        }
        body="Coordinamos una demo personalizada con los datos de tu club, sin compromiso."
        maxBody="max-w-[520px]"
      />

      <section className="bg-secondary px-8 py-[104px] max-[1080px]:py-18 max-[720px]:px-5">
        <div className="mx-auto grid max-w-(--container-max) grid-cols-[1fr_1.25fr] items-start gap-18 max-[1080px]:grid-cols-1 max-[1080px]:gap-12">
          <div>
            <Reveal>
              <h2 className="mb-[34px] text-[clamp(26px,2.6vw,34px)] leading-[1.12] font-bold tracking-[-0.025em] text-navy">
                Qué podés esperar al escribirnos
              </h2>
            </Reveal>
            <div className="mb-11 flex flex-col gap-5">
              {EXPECT.map((e) => (
                <Reveal key={e.title} className="border-t border-border-ink-muted pt-[18px]">
                  <div className="mb-[5px] text-base font-medium text-navy">{e.title}</div>
                  <p className="text-[15px] leading-[1.6] text-ink-muted">{e.desc}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="font-mono text-[11px] tracking-[0.18em] text-label uppercase">
              Buenos Aires · Argentina
            </Reveal>
          </div>

          <Reveal fadeOnly>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  )
}
