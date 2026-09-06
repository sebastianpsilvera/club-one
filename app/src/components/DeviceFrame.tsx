import type { ReactNode } from 'react'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { MockFrame } from 'react-mockframe'
import { cn } from '@/lib/utils'

type DeviceVariant = 'laptop' | 'tablet' | 'phone'

/**
 * Aspect ratios of the real assets these frames hold, so a screenshot fills
 * its screen exactly — no crop, no letterbox, no stretch.
 *
 *   app-*.webp    692 x 1608  -> 0.4303
 *   shot-*.webp  ~1900 x  940 -> 2.021
 *   shot-golf     1514 x  777 -> 1.949
 */
export const SHOT_RATIO = {
  /** Any of the browser screenshots. */
  browser: 1896 / 938,
  /** The app screenshots shown on a phone. */
  app: 692 / 1608,
  /** shot-golf.webp, used on the tablet. */
  golf: 1514 / 777,
} as const

/**
 * Base screen widths, in the device's own pixels. The frame is rendered at
 * this size and then scaled to whatever width the container gives it, so the
 * bezel art stays proportional instead of being redrawn per breakpoint.
 */
const SCREEN_W: Record<DeviceVariant, number> = { laptop: 960, tablet: 820, phone: 340 }

/**
 * Device pixels drawn *below* the frame box. The MacBook's hinge and deck are
 * absolutely positioned under the lid, so they don't count towards
 * `offsetHeight` and have to be added back or the wrapper reserves too little
 * space and the deck overlaps whatever follows.
 */
const OVERHANG: Record<DeviceVariant, number> = { laptop: 40, tablet: 0, phone: 0 }

/**
 * Rendered per variant with a literal `device`, because MockFrame's props are
 * a discriminated union — a widened union of device names wouldn't narrow, and
 * `color` is only valid for the devices that declare it.
 */
function Frame({ variant, w, h, children }: { variant: DeviceVariant; w: number; h: number; children: ReactNode }) {
  if (variant === 'laptop') {
    return (
      <MockFrame device="MacBook Pro" color="space-gray" width={w} height={h}>
        {children}
      </MockFrame>
    )
  }
  if (variant === 'tablet') {
    return (
      <MockFrame device="iPad Pro" color="space-gray" width={w} height={h}>
        {children}
      </MockFrame>
    )
  }
  return (
    <MockFrame device="iPhone 17" color="black" width={w} height={h}>
      {children}
    </MockFrame>
  )
}

type DeviceFrameProps = {
  variant: DeviceVariant
  /** width / height of the content, so the screen matches it exactly. */
  ratio: number
  children: ReactNode
  className?: string
  screenClassName?: string
}

/**
 * Device mockups, built on `react-mockframe` (MIT, itself derived from
 * Marvel's devices.css) rather than hand-rolled bezels.
 *
 * react-mockframe is a fixed-pixel component: a frame is a real device-sized
 * box and its `zoom` prop is a CSS transform, which does not change the space
 * the element takes up. The site's mockups are fluid — they sit in grid
 * columns that change width at every breakpoint — so the frame is rendered at
 * its natural size and scaled to fit, with the wrapper given the scaled height
 * so surrounding layout stays correct. `offsetWidth`/`offsetHeight` are read
 * for the natural size because a CSS transform doesn't affect them.
 */
export function DeviceFrame({ variant, ratio, children, className, screenClassName }: DeviceFrameProps) {
  const screenW = SCREEN_W[variant]
  const screenH = Math.round(screenW / ratio)

  const hostRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const [scaled, setScaled] = useState<{ zoom: number; height: number } | null>(null)

  const measure = useCallback(() => {
    const host = hostRef.current
    const frame = frameRef.current
    if (!host || !frame) return
    // offsetWidth/Height are layout values, so they report the frame's natural
    // size even while it's transform-scaled.
    const naturalW = frame.offsetWidth
    const naturalH = frame.offsetHeight + OVERHANG[variant]
    if (!naturalW || !naturalH) return
    const zoom = host.clientWidth / naturalW
    setScaled({ zoom, height: naturalH * zoom })
  }, [variant])

  useLayoutEffect(() => {
    measure()
    const host = hostRef.current
    if (!host || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(host)
    return () => ro.disconnect()
  }, [measure, screenW, screenH])

  return (
    <div ref={hostRef} className={cn('w-full', className)} style={{ height: scaled?.height }}>
      {/* inline-block so this wrapper shrink-wraps the frame and its
          offsetWidth/Height report the frame's own natural size. */}
      <div
        ref={frameRef}
        style={{
          display: 'inline-block',
          transform: scaled ? `scale(${scaled.zoom})` : undefined,
          transformOrigin: 'top left',
          // Hidden until measured so the unscaled frame never flashes at full size.
          visibility: scaled ? undefined : 'hidden',
        }}
      >
        {/* MockFrame has no screenClassName, so the container context and any
            caller styling go on a wrapper that fills the screen. */}
        <Frame variant={variant} w={screenW} h={screenH}>
          <div className={cn('@container/device size-full', screenClassName)}>{children}</div>
        </Frame>
      </div>
    </div>
  )
}

type DeviceScreenshotProps = {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  /**
   * Letterbox instead of filling. Only for frames whose screen is a real
   * device ratio rather than the image's — the laptops, which are kept at a
   * true 16:10 lid so they don't read as half-shut.
   */
  contain?: boolean
}

/**
 * A screenshot filling a device screen. `object-cover` is the default and is
 * lossless wherever the screen was sized to the image's own ratio; `contain`
 * is the opt-out for the 16:10 laptop lid. Never `fill`, which would distort.
 */
export function DeviceScreenshot({ src, alt, className, loading = 'lazy', contain }: DeviceScreenshotProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={cn('block size-full object-center', contain ? 'object-contain' : 'object-cover', className)}
    />
  )
}
