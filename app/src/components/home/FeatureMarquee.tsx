import { Sparkles, Cloud, Smartphone, Expand } from 'lucide-react'

const FEATURES = [
  { icon: Sparkles, label: 'IA potenciado' },
  { icon: Cloud, label: 'En la nube 24/7' },
  { icon: Smartphone, label: 'Web y mobile' },
  { icon: Expand, label: 'Escalable y flexible' },
]

function FeatureItem({ icon: Icon, label }: { icon: typeof Sparkles; label: string }) {
  return (
    <span className="flex shrink-0 items-center gap-3.5 font-mono text-xs font-medium tracking-[0.18em] text-[#DCE7F5] uppercase">
      <Icon className="size-[19px] shrink-0 stroke-green stroke-[1.6]" />
      {label}
      <span className="size-[5px] shrink-0 rounded-full bg-green/50" />
    </span>
  )
}

export function FeatureMarquee() {
  return (
    <section className="overflow-hidden border-y border-white/7 bg-[#071527]">
      <div className="relative py-5 [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] items-center gap-11 motion-reduce:animate-none">
          {Array.from({ length: 6 }).map((_, set) =>
            FEATURES.map((f, i) => <FeatureItem key={`${set}-${i}`} {...f} />),
          )}
        </div>
      </div>
    </section>
  )
}
