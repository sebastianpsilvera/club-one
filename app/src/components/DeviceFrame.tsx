import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type DeviceVariant = 'laptop' | 'tablet' | 'phone'

type DeviceFrameProps = {
  variant: DeviceVariant
  /** An <img> or <video> element — sized to fill the screen area. */
  children: ReactNode
  className?: string
  screenClassName?: string
}

/**
 * Tailwind-only device mockup (no devices.css / react-mockframe dependency).
 * Structure follows the Flowbite/Preline "device mockup" pattern — an outer
 * bezel, a screen cutout, and variant-specific chrome (camera/notch, side
 * buttons, home indicator, laptop deck) — restyled to the Club One palette
 * (navy bezels, not neutral gray).
 */
export function DeviceFrame({ variant, children, className, screenClassName }: DeviceFrameProps) {
  if (variant === 'laptop') {
    return (
      <div className={cn('w-full', className)}>
        <div className="relative rounded-t-xl rounded-b-[3px] bg-[#151B24] p-[9px] pb-3 shadow-[0_34px_70px_-34px_rgba(10,26,51,0.55)]">
          <div className={cn('relative @container/device overflow-hidden rounded-[4px] bg-white', screenClassName)}>
            {children}
          </div>
          <div className="absolute top-[3.5px] left-1/2 h-[3px] w-[30px] -translate-x-1/2 rounded-full bg-[#2C333D]" />
        </div>
        <div className="-mx-[5%] h-[11px] rounded-b-[9px] bg-linear-to-b from-[#CBD2DB] to-[#9BA5B2] shadow-[0_14px_26px_-14px_rgba(10,26,51,0.5)]" />
      </div>
    )
  }

  if (variant === 'tablet') {
    return (
      <div className={cn('rounded-2xl bg-[#151B24] p-2 shadow-[0_28px_58px_-28px_rgba(10,26,51,0.5)]', className)}>
        <div className={cn('relative @container/device overflow-hidden rounded-[7px] bg-[#0B1526]', screenClassName)}>
          {children}
        </div>
      </div>
    )
  }

  // phone
  return (
    <div className={cn('rounded-[17px] bg-[#151B24] p-1 shadow-[0_24px_46px_-22px_rgba(10,26,51,0.6)]', className)}>
      <div className={cn('relative overflow-hidden rounded-[14px] bg-white', screenClassName)}>
        {children}
        <span className="absolute top-1 left-1/2 h-1 w-[36%] -translate-x-1/2 rounded-[3px] bg-[#151B24]" />
      </div>
    </div>
  )
}

type DeviceScreenshotProps = {
  src: string
  alt: string
  fit?: 'cover' | 'contain' | 'fill'
  className?: string
  loading?: 'lazy' | 'eager'
}

/** Convenience wrapper for the common case: a single static screenshot filling the screen. */
export function DeviceScreenshot({ src, alt, fit = 'cover', className, loading = 'lazy' }: DeviceScreenshotProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={cn(
        'block size-full',
        fit === 'cover' && 'object-cover',
        fit === 'contain' && 'object-contain',
        fit === 'fill' && 'object-fill',
        className,
      )}
    />
  )
}

type DeviceVideoProps = {
  src: string
  className?: string
}

/** A muted, autoplaying, looping screen recording filling the device screen. */
export function DeviceVideo({ src, className }: DeviceVideoProps) {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={cn('block size-full object-cover', className)}
    />
  )
}
