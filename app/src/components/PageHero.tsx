import type { ReactNode } from 'react'
import { Reveal } from '@/components/Reveal'

type PageHeroProps = {
  eyebrow: string
  heading: ReactNode
  body: string
  maxBody?: string
}

/** The shared light hero used on Producto/Nosotros/Clientes/Contacto — radial green glow, centered copy. */
export function PageHero({ eyebrow, heading, body, maxBody = 'max-w-[540px]' }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-[radial-gradient(900px_480px_at_50%_-20%,rgba(53,196,106,0.07),rgba(53,196,106,0)_60%),#fff]">
      <div className="mx-auto max-w-[880px] px-8 py-24 text-center max-[720px]:px-5 max-[720px]:py-16">
        <Reveal>
          <div className="mb-6 font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
            {eyebrow}
          </div>
        </Reveal>
        <Reveal>
          <h1 className="mb-[22px] text-h1 leading-[1.04] font-semibold tracking-[-0.035em] text-navy">{heading}</h1>
        </Reveal>
        <Reveal>
          <p className={`mx-auto text-[clamp(16px,1.3vw,18px)] leading-[1.65] text-ink-muted ${maxBody}`}>{body}</p>
        </Reveal>
      </div>
    </section>
  )
}
