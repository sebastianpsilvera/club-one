import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { useParallax } from '@/hooks/useParallax'
import { DeviceFrame, DeviceScreenshot } from '@/components/DeviceFrame'
import { LaptopScreen, TabletTopBar } from '@/components/BrowserChrome'
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
          <h2 className="mb-[18px] text-h2-sm leading-[1.07] font-bold tracking-[-0.03em] text-navy text-balance">
            Una solucion que se adapta a cada usuario
          </h2>
          <p className="mb-7 max-w-[460px] text-[17px] leading-[1.65] text-ink-muted text-pretty">
            Gerencia, staff y socios acceden desde diferentes dispositivos. El diseño responsivo se adapta a cada
            pantalla acorde a los permisos de cada usuario.
          </p>
          <NavLink
            to="/producto"
            className="inline-flex items-center gap-[9px] rounded-[11px] bg-navy px-[26px] py-3.5 text-[15px] font-bold whitespace-nowrap text-white no-underline transition-[background-color,transform] duration-150 hover:bg-[#16294A] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50"
          >
            Ver el producto <span className="text-green">→</span>
          </NavLink>
        </Reveal>

        <motion.div ref={par.ref} style={{ y: par.y }}>
          <div className="relative aspect-[3/2] w-full">
            <div className="absolute bottom-[5%] left-0 z-[1] w-[82%]">
              <DeviceFrame variant="laptop" screenClassName="aspect-[16/10]">
                <LaptopScreen>
                  <CyclingImage images={LAPTOP_SHOTS} fit="fill" />
                </LaptopScreen>
              </DeviceFrame>
            </div>
            <div className="absolute right-0 bottom-[17%] z-[2] w-[48%]">
              <DeviceFrame variant="tablet" screenClassName="aspect-[8/5]">
                <div className="flex size-full flex-col overflow-hidden">
                  <TabletTopBar />
                  <DeviceScreenshot
                    src="/assets/shot-golf.webp"
                    alt="Reportes en la tablet de recepción"
                    fit="cover"
                    className="min-h-0 flex-1"
                  />
                  <div className="flex h-[4.5%] min-h-3 items-center justify-center bg-[#101C31]">
                    <span className="h-[3px] w-[26%] rounded-sm bg-white/30" />
                  </div>
                </div>
              </DeviceFrame>
            </div>
            <div className="absolute right-[3%] bottom-0 z-[3] w-[19%]">
              <DeviceFrame variant="phone" screenClassName="aspect-[9/19]">
                <DeviceScreenshot src="/assets/app-pagos.webp" alt="La app de socios en la cancha" fit="contain" />
              </DeviceFrame>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
