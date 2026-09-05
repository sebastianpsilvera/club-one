export const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/producto', label: 'Producto' },
  // Points at the Turismo section of the Nosotros page rather than the top of
  // it, so the label and the destination agree. ScrollToTop defers to the hash.
  { to: '/nosotros#turismo', label: 'Turismo' },
  { to: '/contacto', label: 'Contacto' },
] as const
