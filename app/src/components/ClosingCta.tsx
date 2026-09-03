import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

type CtaLink = { to: string; label: string; variant: 'solid' | 'outline' }

type ClosingCtaProps = {
  heading: ReactNode
  body: string
  links: CtaLink[]
}

export function ClosingCta({ heading, body, links }: ClosingCtaProps) {
  return (
    <section className="bg-[radial-gradient(120%_90%_at_12%_100%,rgba(53,196,106,0.10),rgba(53,196,106,0)_58%),linear-gradient(155deg,#0A1A33_0%,#060F1E_100%)] px-8 py-[108px] max-[720px]:px-5">
      <Reveal className="mx-auto max-w-[860px] text-center">
        <h2 className="mb-[18px] text-cta leading-[1.06] font-semibold tracking-[-0.03em] text-white">
          {heading}
        </h2>
        <p className="mx-auto mb-9 max-w-[560px] text-[17.5px] leading-[1.65] text-ink-muted-light">{body}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={cn(
                'rounded-[11px] px-8 py-[15px] text-[15px] no-underline',
                l.variant === 'solid'
                  ? 'bg-green font-bold text-navy'
                  : 'border border-white/24 font-semibold text-white',
              )}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
