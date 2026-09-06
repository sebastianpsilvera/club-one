import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { useParallax } from '@/hooks/useParallax'
import { DeviceFrame, DeviceScreenshot, SHOT_RATIO } from '@/components/DeviceFrame'
import { CyclingImage } from '@/components/CyclingImage'

const LAPTOP_SHOTS = [
  { src: '/assets/shot-teesheet.webp', alt: 'Tee sheet en el escritorio' },
  { src: '/assets/shot-torneos.webp', alt: 'Gestión de torneos en el escritorio' },
  { src: '/assets/shot-reportes.webp', alt: 'Reportes e inteligencia en el escritorio' },
]

export function DevicesTrioSection() {
  const par = useParallax(22)

  return (
    <section className="overflow-hidden bg-secondary px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
      <div className="mx-auto grid max-w-(--container-max) grid-cols-[1fr_1.12fr] items-center gap-14 max-[1080px]:grid-cols-1 max-[1080px]:gap-11">
        <Reveal>
          <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
            Un sistema · Todos los dispositivos
          </div>
          <h2 className="mb-[18px] text-h2-sm leading-[1.07] tracking-[-0.03em] text-navy text-balance">
            Una solución que se adapta a cada usuario
          </h2>
          <p className="mb-7 max-w-[460px] font-display text-[17px] leading-[1.65] text-ink-muted text-pretty">
            Gerencia, staff y socios acceden desde diferentes dispositivos. El diseño responsivo se adapta a cada
            pantalla acorde a los permisos de cada usuario.
          </p>
          <NavLink
            to="/producto"
            className="inline-flex items-center gap-[9px] rounded-[11px] bg-navy px-[26px] py-3.5 text-[15px] font-display font-semibold whitespace-nowrap text-white no-underline transition-[background-color,transform] duration-150 hover:bg-[#16294A] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50 max-[720px]:flex max-[720px]:w-full max-[720px]:justify-center"
          >
            Ver el producto <span className="text-green">→</span>
          </NavLink>
        </Reveal>

        <motion.div ref={par.ref} style={{ y: par.y }}>
          <div className="relative aspect-[3/2] w-full">
            {/* Overlap tuned to the react-mockframe proportions: the MacBook
                is wider and shorter than the old hand-built frame, so the
                tablet and phone step down and to the right of its deck rather
                than sitting on top of the lid. */}
            <div className="absolute top-[6%] left-0 z-[1] w-[76%]">
              <DeviceFrame variant="laptop" ratio={16 / 10} screenClassName="bg-[#0B1526]">
                <CyclingImage images={LAPTOP_SHOTS} fit="contain" />
              </DeviceFrame>
            </div>
            <div className="absolute right-[13%] bottom-[4%] z-[2] w-[40%]">
              <DeviceFrame variant="tablet" ratio={SHOT_RATIO.golf}>
                <DeviceScreenshot src="/assets/shot-golf.webp" alt="Reportes en la tablet de recepción" />
              </DeviceFrame>
            </div>
            <div className="absolute right-0 bottom-0 z-[3] w-[15%]">
              <DeviceFrame variant="phone" ratio={SHOT_RATIO.app}>
                <DeviceScreenshot src="/assets/app-pagos.webp" alt="La app de socios en la cancha" contain />
              </DeviceFrame>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
