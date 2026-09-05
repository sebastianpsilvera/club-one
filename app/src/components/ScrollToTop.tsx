import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'

/**
 * Height of the sticky header, so a hash target isn't hidden behind it. Only
 * the non-Lenis fallback needs it — Lenis already honours the target's own
 * `scroll-margin-top`, which the hash sections set to the same value.
 */
const HEADER_OFFSET = 90

/**
 * Resets scroll position (via Lenis, so it stays in sync) on route change, or
 * scrolls to the `#hash` target when there is one. The hash case has to be
 * handled explicitly: the browser only honours a fragment on a full page load,
 * not on a client-side navigation, so `/nosotros#turismo` from the nav would
 * otherwise land at the top of the page.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (!target) return
      if (lenis) lenis.scrollTo(target as HTMLElement)
      else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET })
      return
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash, lenis])

  return null
}
