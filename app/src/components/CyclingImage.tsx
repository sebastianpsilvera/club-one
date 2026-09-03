import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type Shot = { src: string; alt: string }

type CyclingImageProps = {
  images: Shot[]
  /** ms between transitions */
  interval?: number
  fit?: 'cover' | 'contain' | 'fill'
  className?: string
}

/** Crossfades through a set of screenshots on a timer — the hero/device "live product" effect. */
export function CyclingImage({ images, interval = 5000, fit = 'fill', className }: CyclingImageProps) {
  const [index, setIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion || images.length <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [images.length, interval, shouldReduceMotion])

  const fitClass = fit === 'cover' ? 'object-cover' : fit === 'contain' ? 'object-contain' : 'object-fill'

  return (
    <div className={cn('relative size-full', className)}>
      <AnimatePresence initial={false}>
        <motion.img
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          initial={shouldReduceMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 0.84, 0.44, 1] }}
          className={cn('absolute inset-0 size-full', fitClass)}
        />
      </AnimatePresence>
    </div>
  )
}
