import { NavLink } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { useParallax } from '@/hooks/useParallax'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { DeviceFrame, DeviceScreenshot } from '@/components/DeviceFrame'
import { CyclingImage } from '@/components/CyclingImage'
import { motion } from 'motion/react'

const FEATURES = [
  {
    title: 'Reservas en tiempo real',
    desc: 'Canchas, clases y salones con disponibilidad en vivo.',
  },
  {
    title: 'Estado de cuenta y pago desde la app',
    desc: 'Cuota, consumos y saldo al instante.',
  },
  {
    title: 'Credencial digital',
    desc: 'Acceso al club y a las canchas desde el celular.',
  },
  {
    title: 'Inscripción a torneos',
    desc: 'Simple y rápida, con notificaciones push.',
  },
]

const PHONE_SHOTS = [
  { src: '/assets/app-pagos.webp', alt: 'Pagos y estado de cuenta en la app' },
  { src: '/assets/app-torneo.webp', alt: 'Inscripción a un torneo desde la app' },
  { src: '/assets/app-login.webp', alt: 'Ingreso a la app de socios' },
]

export function AppSection() {
  const par = useParallax(24)
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <section className="overflow-hidden bg-[linear-gradient(155deg,#0A1A33_0%,#060F1E_100%)] px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
      <div className="mx-auto grid max-w-(--container-max) grid-cols-[1fr_0.9fr] items-center gap-16 max-[1080px]:grid-cols-1 max-[1080px]:gap-12">
        <div>
          <Reveal>
            <h2 className="mb-[18px] text-h2 leading-[1.06] font-semibold tracking-[-0.03em] text-[#F2F7FC]">
              El club, en el bolsillo <span className="text-green">del socio.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mb-[30px] max-w-[440px] text-[17px] leading-[1.65] text-ink-muted-light">
              Club One incluye una app para socios, en iOS y Android.
            </p>
          </Reveal>
          <div className="mb-[34px] flex flex-col gap-4">
            {FEATURES.map((f) => (
              <Reveal key={f.title} className="flex items-start gap-3.5">
                <Check className="mt-0.5 size-5 shrink-0 stroke-green stroke-[2.2]" />
                <div>
                  <span className="text-base font-semibold text-[#F2F7FC]">{f.title}</span>
                  <span className="text-[15.5px] text-ink-muted-light">
                    <br />
                    {f.desc}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <NavLink
              to="/producto"
              className="inline-flex items-center gap-[9px] rounded-[11px] bg-green px-[26px] py-3.5 text-[15px] font-semibold whitespace-nowrap text-navy no-underline"
            >
              Ver el producto <span className="text-green">→</span>
            </NavLink>
          </Reveal>
        </div>

        <div className="flex flex-col items-center gap-8">
          <motion.div ref={par.ref} style={{ y: par.y }} className="flex min-w-0 items-end justify-center gap-[18px]">
            <div className="w-[110px] origin-bottom max-[640px]:hidden">
              <DeviceFrame variant="phone" screenClassName="aspect-[9/19.5]">
                <DeviceScreenshot src="/assets/app-torneo.webp" alt="Inscripción a un torneo desde la app" fit="cover" />
              </DeviceFrame>
            </div>
            <div className="w-[130px] origin-bottom">
              <DeviceFrame variant="phone" screenClassName="aspect-[9/19.5]">
                {isMobile ? (
                  <CyclingImage images={PHONE_SHOTS} fit="cover" interval={4500} />
                ) : (
                  <DeviceScreenshot src="/assets/app-pagos.webp" alt="Pagos y estado de cuenta en la app" fit="cover" />
                )}
              </DeviceFrame>
            </div>
            <div className="w-[110px] origin-bottom max-[640px]:hidden">
              <DeviceFrame variant="phone" screenClassName="aspect-[9/19.5]">
                <DeviceScreenshot src="/assets/app-login.webp" alt="Ingreso a la app de socios" fit="cover" />
              </DeviceFrame>
            </div>
          </motion.div>
          <Reveal className="flex flex-wrap items-center justify-center gap-3.5">
            <NavLink to="/contacto" className="block overflow-hidden rounded-[9px] border border-white/22 leading-none">
              <img src="/assets/badge-appstore.png" alt="Download on the App Store" className="block h-[46px] w-auto" />
            </NavLink>
            <NavLink to="/contacto" className="block overflow-hidden rounded-[9px] border border-white/22 leading-none">
              <img src="/assets/badge-googleplay.png" alt="Get it on Google Play" className="block h-[46px] w-auto" />
            </NavLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
