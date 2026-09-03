import { Reveal } from '@/components/Reveal'

export function TestimonialSection() {
  return (
    <section className="bg-white px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
      <Reveal className="mx-auto max-w-[820px] text-center">
        <div className="mb-[26px] text-[80px] leading-[0.6] font-bold text-green">&ldquo;</div>
        <p className="mb-8 text-[clamp(24px,2.8vw,33px)] leading-[1.4] tracking-[-0.01em] text-navy text-pretty">
          Pasamos de cinco sistemas distintos a uno solo. Hoy el club funciona con la mitad de trabajo administrativo
          y nuestros socios reservan su green fee desde la app.
        </p>
        <div className="text-[15.5px] font-semibold text-navy">Mariana Quiroga</div>
        <div className="mt-1.5 font-mono text-eyebrow tracking-[0.14em] text-ink-muted-light/80 uppercase">
          Gerente · Club de golf, Buenos Aires
        </div>
      </Reveal>
    </section>
  )
}
