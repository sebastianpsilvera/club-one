import { NavLink } from 'react-router-dom'

const SITE_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/producto', label: 'Producto' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/clientes', label: 'Clientes' },
  { to: '/contacto', label: 'Contacto' },
]

const PLATFORM_LINKS = ['Golf y torneos', 'Socios y CRM', 'Administración', 'App para socios']

const OFFICES = [
  { city: 'Buenos Aires', country: 'Argentina' },
  { city: 'Montevideo', country: 'Uruguay' },
  { city: 'Miami', country: 'Estados Unidos' },
]

function FootLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink to={to} className="text-[14.5px] text-[#C9D6E6] no-underline transition-colors hover:text-green">
      {children}
    </NavLink>
  )
}

export function Footer() {
  return (
    <footer className="bg-linear-[170deg] from-navy to-navy-deep">
      <div className="mx-auto max-w-(--container-max) px-8 pt-[72px] max-[720px]:px-5">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-x-8 gap-y-12 border-b border-white/16 pb-14 max-[720px]:grid-cols-2">
          <div className="max-[720px]:col-span-2">
            <div className="mb-[18px] flex items-center gap-[11px]">
              <img src="/assets/logo-clubone.webp" alt="Club One" className="block size-[34px] brightness-0 invert" />
              <span className="text-base font-bold tracking-[0.08em] text-white">
                CLUB <span className="text-green">ONE</span>
              </span>
            </div>
            <p className="max-w-[280px] text-[14.5px] leading-relaxed text-ink-muted-light">
              Sistema integral de gestión para clubes. Golf, deportes, socios y finanzas en una sola plataforma.
            </p>
          </div>
          <div>
            <div className="mb-[18px] font-mono text-[10.5px] tracking-[0.18em] text-label uppercase">Sitio</div>
            <div className="flex flex-col gap-3">
              {SITE_LINKS.map((l) => (
                <FootLink key={l.to} to={l.to}>
                  {l.label}
                </FootLink>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-[18px] font-mono text-[10.5px] tracking-[0.18em] text-label uppercase">Plataforma</div>
            <div className="flex flex-col gap-3">
              {PLATFORM_LINKS.map((l) => (
                <FootLink key={l} to="/producto">
                  {l}
                </FootLink>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-[18px] font-mono text-[10.5px] tracking-[0.18em] text-label uppercase">Contacto</div>
            <div className="flex flex-col gap-3">
              <FootLink to="/contacto">Solicitar demo</FootLink>
              <span className="text-[14.5px] text-ink-muted-light">Soporte en español</span>
              <span className="text-[14.5px] text-ink-muted-light">Buenos Aires · Argentina</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-10 border-b border-white/16 py-[30px]">
          <div className="font-mono text-[10.5px] tracking-[0.18em] text-label uppercase">Donde estamos?</div>
          <div className="flex flex-wrap items-start gap-14">
            {OFFICES.map((o) => (
              <div key={o.city} className="flex flex-col gap-1">
                <span className="text-[15px] font-semibold text-[#F2F7FC]">{o.city}</span>
                <span className="text-[13.5px] text-ink-muted-light">{o.country}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-[26px]">
          <span className="text-[13px] text-label">© 2026 Club One. Todos los derechos reservados.</span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-label">CLUBONE.TECH</span>
        </div>
      </div>
    </footer>
  )
}
