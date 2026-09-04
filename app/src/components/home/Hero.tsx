import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { DeviceFrame } from '@/components/DeviceFrame'
import { LaptopScreen } from '@/components/BrowserChrome'
import { CyclingImage } from '@/components/CyclingImage'
import { useParallax } from '@/hooks/useParallax'
import { Reveal } from '@/components/Reveal'

const HERO_SHOTS = [
  { src: '/assets/shot-reportes.webp', alt: 'Club One — Reportes e inteligencia' },
  { src: '/assets/shot-teesheet.webp', alt: 'Club One — Tee sheet en tiempo real' },
  { src: '/assets/shot-torneos.webp', alt: 'Club One — Gestión de torneos' },
]

export function Hero() {
  const orbA = useParallax(76)
  const orbB = useParallax(56)

  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/golf-course.webp"
          className="absolute inset-0 size-full object-cover object-[center_62%]"
        >
          <source src="/assets/hero-video.webm" type="video/webm" />
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-r from-[rgba(6,15,30,0.72)] via-[rgba(6,15,30,0.52)] to-[rgba(6,15,30,0.42)]" />
      </div>
      <div className="absolute inset-0 z-1 bg-[linear-gradient(90deg,rgba(10,26,51,0.58)_0%,rgba(10,26,51,0.24)_42%,rgba(10,26,51,0.04)_66%,rgba(10,26,51,0)_100%)] max-[860px]:bg-[linear-gradient(180deg,rgba(10,26,51,0.66)_0%,rgba(10,26,51,0.40)_42%,rgba(10,26,51,0.78)_100%)]" />
      <div className="absolute inset-0 z-1 bg-[rgba(10,26,51,0.15)] max-[860px]:bg-[rgba(10,26,51,0.04)]" />

      <div className="relative z-2 mx-auto grid max-w-(--container-max) grid-cols-[0.92fr_1.35fr] items-center gap-14 px-8 pt-[84px] pb-[108px] max-[1080px]:grid-cols-1 max-[1080px]:gap-[52px] max-[1080px]:pt-[60px] max-[1080px]:pb-[72px] max-[720px]:gap-14 max-[720px]:pt-14 max-[720px]:pb-[72px]">
        <div>
          <Reveal>
            <h1 className="mb-6 text-display leading-[1.02] font-bold tracking-[-0.035em] text-white">
              El Sistema de gestion para clubes de golf,
              <br />
              <span className="text-green">#1&nbsp;en innovacion de Latinoamerica</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mb-[34px] max-w-[460px] text-[clamp(16px,1.25vw,18px)] leading-[1.65] text-[#B8C7DA]">
              Todo tu Club en una sola plataforma. Conoce Club One.
            </p>
          </Reveal>
          <Reveal>
            <div className="mb-9 flex flex-wrap gap-3 max-[720px]:mb-0 max-[720px]:gap-2.5">
              <Button
                asChild
                className="rounded-[11px] bg-white px-[30px] py-[15px] text-[15px] text-navy hover:bg-[#E9F0F8]"
              >
                <NavLink to="/contacto">Solicitar demo</NavLink>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-[11px] border-white/28 bg-white/6 px-[30px] py-[15px] text-[15px] text-white hover:border-white hover:bg-white/12"
              >
                <NavLink to="/producto">Ver el producto</NavLink>
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="relative mr-[-200px] min-w-0 max-[1080px]:mr-0">
          <motion.div
            ref={orbA.ref}
            style={{ y: orbA.y }}
            className="pointer-events-none absolute -top-[70px] -right-[30px] size-[360px] rounded-full bg-[radial-gradient(circle,rgba(53,196,106,0.18),rgba(53,196,106,0)_65%)] blur-[8px] max-[1080px]:hidden"
          />
          <motion.div
            ref={orbB.ref}
            style={{ y: orbB.y }}
            className="pointer-events-none absolute -bottom-[90px] -left-[60px] size-[300px] rounded-full bg-[radial-gradient(circle,rgba(10,26,51,0.08),rgba(10,26,51,0)_65%)] blur-[8px] max-[1080px]:hidden"
          />
          <DeviceFrame variant="laptop" className="mx-auto" screenClassName="aspect-[16/10]">
            <LaptopScreen>
              <CyclingImage images={HERO_SHOTS} fit="fill" />
            </LaptopScreen>
          </DeviceFrame>
        </div>
      </div>
    </section>
  )
}
