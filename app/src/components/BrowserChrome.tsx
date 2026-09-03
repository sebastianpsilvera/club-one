import type { ReactNode } from 'react'

/**
 * The simulated macOS-style top bar (traffic lights + URL pill + clock).
 * Used on every laptop mockup, which appears at very different rendered
 * widths across the site (a ~600px hero laptop vs. a ~350px trio laptop on
 * mobile) — sized off the device's own container (`@container/device` on
 * the screen wrapper in DeviceFrame), not the viewport, so the chrome stays
 * legible instead of shrinking with the whole page on a phone.
 */
export function BrowserTopBar({ url = 'www.clubonetech.com' }: { url?: string }) {
  return (
    <div className="flex h-[7.2%] min-h-6 items-center gap-1 border-b border-white/9 bg-[#101C31] px-[1.8%]">
      <span className="size-2.5 rounded-full bg-[#FF5F57]" />
      <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
      <span className="size-2.5 rounded-full bg-[#28C840]" />
      <div className="ml-[2.4%] flex h-[56%] flex-1 items-center gap-1.5 overflow-hidden rounded-full bg-white/8 px-3">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#35C46A" strokeWidth="2.6" className="shrink-0">
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 018 0v3" />
        </svg>
        <span className="whitespace-nowrap font-mono text-[10px] text-white/62 @max-[280px]/device:hidden">{url}</span>
        <span className="hidden whitespace-nowrap font-mono text-[9px] text-white/62 @max-[280px]/device:block">
          clubonetech.com
        </span>
      </div>
      <div className="ml-[2.4%] flex items-center gap-2 @max-[220px]/device:hidden">
        <span className="whitespace-nowrap font-mono text-[9.5px] text-white/40">14:08</span>
        <span className="h-[7px] w-[15px] rounded-sm border border-white/32" />
      </div>
    </div>
  )
}

/** The bottom "dock" strip used to close out a laptop mockup so there's no dead black bar. */
export function DockBar() {
  return (
    <div className="flex h-[9%] min-h-8 items-center justify-center bg-linear-to-b from-[#0B1526]/0 to-[#0B1526]/60">
      <div className="flex h-2/3 items-center gap-1.5 rounded-xl border border-white/12 bg-white/10 px-2">
        {[1, 0.34, 0.24, 0.3, 0.2].map((o, i) => (
          <span
            key={i}
            className="aspect-square h-full rounded-[26%]"
            style={{ background: `rgba(255,255,255,${i === 0 ? 1 : o})`, backgroundColor: i === 0 ? '#35C46A' : undefined }}
          />
        ))}
        <span className="hidden h-2/3 w-px bg-white/18 @min-[220px]/device:block" />
        <span className="hidden aspect-square h-full rounded-[26%] bg-white/16 @min-[220px]/device:block" />
      </div>
    </div>
  )
}

/** The compact top bar used on the tablet mockup — a single domain pill, no traffic lights. */
export function TabletTopBar({ url = 'clubonetech.com' }: { url?: string }) {
  return (
    <div className="flex h-[7%] min-h-6 items-center gap-1.5 border-b border-white/9 bg-[#101C31] px-[3%]">
      <div className="flex h-[58%] flex-1 items-center gap-1.5 overflow-hidden rounded-full bg-white/8 px-2.5">
        <span className="size-[5px] shrink-0 rounded-full bg-green" />
        <span className="whitespace-nowrap font-mono text-[8.5px] text-white/58">{url}</span>
      </div>
      <span className="font-mono text-[8.5px] text-white/38 @max-[180px]/device:hidden">14:08</span>
    </div>
  )
}

/** A full laptop screen: top bar + content + dock, so the whole screen is always covered (no letterboxing). */
export function LaptopScreen({ children, url }: { children: ReactNode; url?: string }) {
  return (
    <div className="flex size-full flex-col overflow-hidden bg-[#0B1526]">
      <BrowserTopBar url={url} />
      <div className="relative min-h-0 flex-1 overflow-hidden bg-white">{children}</div>
      <DockBar />
    </div>
  )
}
