import { useEffect, useRef } from 'react'

/**
 * Drives the muted YouTube background loop in the hero: keeps it playing,
 * seeks back before the end so YouTube's end-screen (play buttons) never
 * paints, and re-arms the player API handshake continuously. Ported from
 * the static build's kickVideo/ytSend logic.
 */
export function useHeroVideo(iframeRef: React.RefObject<HTMLIFrameElement | null>) {
  const durationRef = useRef<number | null>(null)

  useEffect(() => {
    const frame = iframeRef.current
    if (!frame) return

    const ytSend = (func: string, args: unknown[] = []) => {
      frame.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*')
    }
    const play = () => {
      ytSend('mute')
      ytSend('playVideo')
    }

    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== 'string' || e.data.indexOf('"info"') < 0) return
      let parsed: { info?: { duration?: number; currentTime?: number; playerState?: number } }
      try {
        parsed = JSON.parse(e.data)
      } catch {
        return
      }
      const info = parsed?.info
      if (!info) return
      if (typeof info.duration === 'number' && info.duration > 0) durationRef.current = info.duration
      if (
        typeof info.currentTime === 'number' &&
        durationRef.current &&
        info.currentTime > durationRef.current - 1.2
      ) {
        ytSend('seekTo', [0, true])
        play()
      }
      if (info.playerState === undefined) return
      if (info.playerState === 1 || info.playerState === 3) return
      if (info.playerState === 0) ytSend('seekTo', [0, true])
      play()
    }
    window.addEventListener('message', onMessage)

    let tries = 0
    let timeoutId: ReturnType<typeof setTimeout>
    const kick = () => {
      frame.contentWindow?.postMessage(JSON.stringify({ event: 'listening' }), '*')
      play()
      tries += 1
      timeoutId = setTimeout(kick, tries < 10 ? 800 : 2500)
    }
    kick()

    const userKick = () => play()
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'wheel', 'touchstart']
    events.forEach((ev) => window.addEventListener(ev, userKick, { passive: true }))

    return () => {
      window.removeEventListener('message', onMessage)
      events.forEach((ev) => window.removeEventListener(ev, userKick))
      clearTimeout(timeoutId)
    }
  }, [iframeRef])
}
