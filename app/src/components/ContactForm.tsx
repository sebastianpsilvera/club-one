import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const FIELD = 'h-auto rounded-[10px] border-[#D8E0EA] px-[15px] py-[13px] text-[15px]'
const LABEL = 'mb-[7px] text-[13px] font-medium text-navy'

type ContactFormProps = {
  /** Submit button copy — the ask differs per page. */
  submitLabel?: string
  /** Placeholder for the free-text field. */
  messagePlaceholder?: string
}

/**
 * The shared enquiry form, used on Contacto and on the Turismo page. It's a
 * client-side mock: there is no backend wired up yet, so submitting only swaps
 * in the confirmation state.
 */
export function ContactForm({
  submitLabel = 'Enviar consulta',
  messagePlaceholder = '¿Qué te gustaría resolver primero?',
}: ContactFormProps) {
  const [sent, setSent] = useState(false)

  return (
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
              <Label className={LABEL}>Nombre y apellido *</Label>
              <Input required name="nombre" placeholder="Tu nombre" className={FIELD} />
            </div>
            <div>
              <Label className={LABEL}>Club *</Label>
              <Input required name="club" placeholder="Nombre del club" className={FIELD} />
            </div>
          </div>
          <div className="mb-[18px] grid grid-cols-2 gap-[18px] max-[600px]:grid-cols-1">
            <div>
              <Label className={LABEL}>Email *</Label>
              <Input required type="email" name="email" placeholder="nombre@club.com" className={FIELD} />
            </div>
            <div>
              <Label className={LABEL}>Teléfono</Label>
              <Input name="telefono" placeholder="+54 11 ..." className={FIELD} />
            </div>
          </div>
          <div className="mb-6">
            <Label className={LABEL}>Mensaje</Label>
            <Textarea
              name="mensaje"
              rows={4}
              placeholder={messagePlaceholder}
              className="resize-y rounded-[10px] border-[#D8E0EA] px-[15px] py-[13px] text-[15px]"
            />
          </div>
          <Button type="submit" className="h-auto w-full rounded-[11px] bg-navy py-4 text-[15.5px] hover:bg-[#16294A]">
            {submitLabel}
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
          <h3 className="mb-2.5 text-[22px] tracking-[-0.02em] text-navy">¡Recibimos tu consulta!</h3>
          <p className="mb-[26px] text-[15.5px] leading-[1.6] text-ink-muted">
            Gracias por escribirnos. Te contactamos dentro de las próximas 24 horas hábiles.
          </p>
          <NavLink
            to="/"
            className="rounded-sm border-b border-[#B9E4CB] pb-[3px] font-mono text-[13px] tracking-[0.08em] text-green-dark no-underline transition-colors duration-150 hover:border-green-dark hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50"
          >
            Volver al inicio ↗
          </NavLink>
        </div>
      )}
    </div>
  )
}
