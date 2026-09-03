import { Hero } from '@/components/home/Hero'
import { FeatureMarquee } from '@/components/home/FeatureMarquee'
import { ModulesGrid } from '@/components/home/ModulesGrid'
import { ActionTabsSection } from '@/components/home/ActionTabsSection'
import { DevicesTrioSection } from '@/components/home/DevicesTrioSection'
import { AppSection } from '@/components/home/AppSection'
import { TeamSection } from '@/components/home/TeamSection'
import { TestimonialSection } from '@/components/home/TestimonialSection'
import { ClosingCta } from '@/components/ClosingCta'

export function Home() {
  return (
    <div>
      <Hero />
      <FeatureMarquee />
      <ModulesGrid />
      <ActionTabsSection />
      <DevicesTrioSection />
      <AppSection />
      <TeamSection />
      <TestimonialSection />
      <ClosingCta
        heading={
          <>
            Veamos cómo funciona, <span className="text-green">con los datos de tu club.</span>
          </>
        }
        body="Coordinamos una demo sobre tu propia operación: tu padrón, tus categorías y tu grilla de salidas. En una reunión vas a ver exactamente cómo quedaría tu club adentro de la plataforma."
        links={[
          { to: '/contacto', label: 'Solicitar demo', variant: 'solid' },
          { to: '/producto', label: 'Ver el producto', variant: 'outline' },
        ]}
      />
    </div>
  )
}
