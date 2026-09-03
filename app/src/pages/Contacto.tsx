import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const EXPECT = [
  { title: 'Demo personalizada', desc: 'Una reunión de 45 minutos sobre tu propia operación: tu padrón, tus categorías, tu grilla.' },
  { title: 'Respuesta en 24 horas', desc: 'Te contactamos dentro del día hábil siguiente para coordinar.' },
  { title: 'Sin compromiso', desc: 'La demo es gratuita y la propuesta se arma a la medida de tu club.' },
]

export function Contacto() {
  const [sent, setSent] = useState(false)

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
              <h2 className="mb-[34px] text-[clamp(26px,2.6vw,34px)] leading-[1.12] font-semibold tracking-[-0.025em] text-navy">
                Qué podés esperar al escribirnos
              </h2>
            </Reveal>
            <div className="mb-11 flex flex-col gap-5">
              {EXPECT.map((e) => (
                <Reveal key={e.title} className="border-t border-border-ink-muted pt-[18px]">
                  <div className="mb-[5px] text-base font-semibold text-navy">{e.title}</div>
                  <p className="text-[15px] leading-[1.6] text-ink-muted">{e.desc}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="font-mono text-[11px] tracking-[0.18em] text-label uppercase">
              Buenos Aires · Argentina
            </Reveal>
          </div>

          <Reveal fadeOnly>
            <div className="rounded-2xl border border-border bg-white p-[38px] shadow-[0_24px_60px_-30px_rgba(10,26,51,0.18)] max-[720px]:p-6">
              {!sent ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSent(true)
                  }}
                >
                  <div className="mb-[18px] grid grid-cols-2 gap-[18px] max-[600px]:grid-cols-1">
                    <div>
                      <Label className="mb-[7px] text-[13px] font-semibold text-navy">Nombre y apellido *</Label>
                      <Input required name="nombre" placeholder="Tu nombre" className="h-auto rounded-[10px] border-[#D8E0EA] px-[15px] py-[13px] text-[15px]" />
                    </div>
                    <div>
                      <Label className="mb-[7px] text-[13px] font-semibold text-navy">Club *</Label>
                      <Input required name="club" placeholder="Nombre del club" className="h-auto rounded-[10px] border-[#D8E0EA] px-[15px] py-[13px] text-[15px]" />
                    </div>
                  </div>
                  <div className="mb-[18px] grid grid-cols-2 gap-[18px] max-[600px]:grid-cols-1">
                    <div>
                      <Label className="mb-[7px] text-[13px] font-semibold text-navy">Email *</Label>
                      <Input required type="email" name="email" placeholder="nombre@club.com" className="h-auto rounded-[10px] border-[#D8E0EA] px-[15px] py-[13px] text-[15px]" />
                    </div>
                    <div>
                      <Label className="mb-[7px] text-[13px] font-semibold text-navy">Teléfono</Label>
                      <Input name="telefono" placeholder="+54 11 ..." className="h-auto rounded-[10px] border-[#D8E0EA] px-[15px] py-[13px] text-[15px]" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <Label className="mb-[7px] text-[13px] font-semibold text-navy">Mensaje</Label>
                    <Textarea
                      name="mensaje"
                      rows={4}
                      placeholder="¿Qué te gustaría resolver primero?"
                      className="resize-y rounded-[10px] border-[#D8E0EA] px-[15px] py-[13px] text-[15px]"
                    />
                  </div>
                  <Button type="submit" className="h-auto w-full rounded-[11px] bg-navy py-4 text-[15.5px] hover:bg-[#16294A]">
                    Enviar consulta
                  </Button>
                  <p className="mt-3.5 text-center text-[12.5px] text-label">
                    Al enviar aceptás ser contactado por el equipo de Club One.
                  </p>
                </form>
              ) : (
                <div className="py-9 text-center">
                  <div className="mx-auto mb-[22px] flex size-16 items-center justify-center rounded-full bg-green/14">
                    <CheckCircle2 className="size-7 stroke-green-dark stroke-[2]" />
                  </div>
                  <h3 className="mb-2.5 text-[22px] font-semibold tracking-[-0.02em] text-navy">
                    ¡Recibimos tu consulta!
                  </h3>
                  <p className="mb-[26px] text-[15.5px] leading-[1.6] text-ink-muted">
                    Gracias por escribirnos. Te contactamos dentro de las próximas 24 horas hábiles.
                  </p>
                  <NavLink
                    to="/"
                    className="border-b border-[#B9E4CB] pb-[3px] font-mono text-[13px] tracking-[0.08em] text-green-dark no-underline"
                  >
                    Volver al inicio ↗
                  </NavLink>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
