import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { ClosingCta } from '@/components/ClosingCta'
import { DeviceFrame, DeviceScreenshot } from '@/components/DeviceFrame'
import { LaptopScreen } from '@/components/BrowserChrome'
import { useScrollFlip } from '@/hooks/useScrollFlip'
import {
  CalendarClock,
  Users,
  ShoppingCart,
  Trophy,
  Cloud,
  ShieldCheck,
  KeyRound,
  Smartphone,
  Building,
  BrainCircuit,
} from 'lucide-react'

const TEE_FEATURES = [
  { icon: CalendarClock, title: 'Reservas por día o semana', desc: 'Gestioná los horarios para torneos y práctica libre, por día y en forma anticipada.' },
  { icon: Users, title: 'Socios, invitados y visitantes', desc: 'Accedé a la ficha de cada jugador al instante y modificá los datos que necesites.' },
  { icon: ShoppingCart, title: 'Proshop drag & drop', desc: 'Arrastrá un producto sobre el jugador y queda cargado en su cuenta para el cobro.' },
  { icon: Trophy, title: 'Leaderboard y carga de score', desc: 'Registrá los scores de forma ágil y automatizada, y definí dónde publicar los resultados.' },
]

const TORNEOS_FEATURES = [
  { title: 'Todas las modalidades', desc: 'Medal Play y Match Play, individual, en parejas y equipos. Stableford, fourball y más.' },
  { title: 'Draw automático', desc: 'confección del draw manual o a partir de torneos clasificatorios para Match Play.' },
  { title: 'Comunicaciones personalizadas', desc: 'envío segmentado de notificaciones a jugadores inscriptos vía SmartCom™.' },
  { title: 'Ranking y Choice Score', desc: 'rankings acumulados por temporada con reglas personalizadas.' },
]

const FINANZAS_FEATURES = [
  { title: 'Cuotas y cuentas corrientes', desc: 'cuota por categoría, vencimientos, deuda acumulada y estados actualizados.' },
  { title: 'Cobranzas y pagos', desc: 'facturas, registro de pagos, proveedores, tesorería y presupuestos.' },
  { title: 'Ingresos y resultado', desc: 'evolución mensual con total facturado, cobrado, medios de pago, egresos y resultado neto.' },
  { title: 'Consumos integrados', desc: 'todos los puntos de venta unificados en el sistema central.' },
]

const OPERATIVA_COLS = [
  {
    title: 'Socios',
    items: [
      ['Padrón unificado', 'con categorías que define el club.'],
      ['Grupo familiar', 'vinculado a una única cuenta corriente.'],
      ['Estado de cuenta', 'en tiempo real: cuota, consumos y pagos.'],
      ['Historial completo', 'de reservas, torneos y comunicaciones.'],
    ],
  },
  {
    title: 'Reservas y actividades',
    items: [
      ['Canchas y salones', '— tenis, pádel, eventos y quinchos.'],
      ['Reglas configurables', 'de cupo, anticipación y cancelaciones.'],
      ['Clases y profesores', 'con agenda individual y asistencia.'],
      ['Bloqueo opcional', 'para socios con deudas o suspendidos.'],
    ],
  },
  {
    title: 'Comunicación',
    items: [
      ['Avisos segmentados', 'por categoría, actividad o deporte.'],
      ['Notificaciones', 'de reservas, vencimientos y avisos del club.'],
      ['Diseño de campañas', 'con seguimiento de apertura y respuesta.'],
      ['Soporte integrado', 'para socios y staff.'],
    ],
  },
  {
    title: 'Proshop y consumos',
    items: [
      ['Venta rápida', 'con buscador de producto y precio a la vista.'],
      ['Inventario', 'de pelotas, accesorios e indumentaria.'],
      ['Carga a cuenta', 'del socio en un click.'],
      ['Carros y alquileres', 'con control de disponibilidad.'],
    ],
  },
]

const TECH_CARDS = [
  { title: 'En la nube 24/7', desc: 'Infraestructura administrada, con respaldos automáticos y sin servidores en el club.', icon: Cloud },
  { title: 'Datos protegidos', desc: 'Cifrado en tránsito y en reposo, y acceso restringido por rol y por sede.', icon: ShieldCheck },
  { title: 'Roles y permisos', desc: 'Gerencia, administración, proshop, starter y profesores ven sólo lo que les corresponde.', icon: KeyRound },
  { title: 'Web y mobile', desc: 'La misma plataforma en escritorio, tablet y celular.', icon: Smartphone },
  { title: 'Multi-club', desc: 'Una entidad puede administrar varias sedes con padrón y finanzas separadas.', icon: Building },
  { title: 'IA integrada y reportes BI', desc: 'Dashboards, KPIs y reportes personalizables por área, exportables.', icon: BrainCircuit },
]

const STEPS = [
  { n: 'PASO 1', title: 'Relevamiento', desc: 'Conocemos cómo opera hoy el club, qué necesita y qué sistemas usa.' },
  { n: 'PASO 2', title: 'Migración', desc: 'Importamos padrón, saldos, cuotas y reservas vigentes, con validación previa.' },
  { n: 'PASO 3', title: 'Configuración', desc: 'Definimos módulos, roles y personalizaciones adaptadas a tu club.' },
  { n: 'PASO 4', title: 'Implementación', desc: 'Capacitamos al equipo y acompañamos el proceso con soporte 24/7.' },
]

export function Producto() {
  const flip = useScrollFlip(26)

  return (
    <div>
      <section className="relative overflow-hidden bg-[#060F1E]">
        <img
          src="/assets/golf-coast.webp"
          alt=""
          className="absolute inset-0 size-full object-cover object-[center_62%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,15,30,0.72)_0%,rgba(6,15,30,0.60)_50%,rgba(6,15,30,0.80)_100%)]" />
        <div className="relative z-[1] mx-auto max-w-[660px] px-8 py-[132px] text-center max-[720px]:px-5 max-[720px]:py-20">
          <Reveal>
            <div className="mb-6 font-mono text-eyebrow font-medium tracking-[0.22em] text-green uppercase">
              El producto
            </div>
          </Reveal>
          <Reveal>
            <h1 className="mb-[22px] text-h1 leading-[1.04] font-bold tracking-[-0.035em] text-white">
              Una plataforma.
              <br />
              <span className="text-green">Todos los módulos.</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mx-auto mb-[34px] max-w-[540px] text-[clamp(16px,1.3vw,18px)] leading-[1.65] text-[#C7D6E8]">
              Cada área de tu club conectada en un mismo sistema: golf, deportes, socios, finanzas, comunicación y
              operaciones.
            </p>
          </Reveal>
          <Reveal className="flex justify-center">
            <NavLink
              to="/contacto"
              className="rounded-[11px] bg-green px-8 py-[15px] text-[15px] font-bold text-navy no-underline transition-[background-color,transform] duration-150 hover:bg-green-hover active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Solicitar demo
            </NavLink>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto max-w-(--container-max)">
          <Reveal className="mb-12 max-w-[680px]">
            <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
              Módulo golf · Tee time
            </div>
            <h2 className="mb-4 text-h2 leading-[1.06] font-bold tracking-[-0.03em] text-navy">
              Reservas en <span className="text-green-dark">tiempo real.</span>
            </h2>
            <p className="text-[17px] leading-[1.65] text-ink-muted text-pretty">
              La sección Tee Time es el centro operativo del día: reservas, jugadores, estado de cancha, cobros y
              Proshop conviven en una sola pantalla que se actualiza en tiempo real.
            </p>
          </Reveal>
          <Reveal fadeOnly className="mx-auto mb-14 max-w-[1120px]">
            <DeviceFrame variant="laptop" screenClassName="aspect-[16/10]">
              <LaptopScreen>
                <DeviceScreenshot src="/assets/shot-teesheet.webp" alt="Tee sheet de Club One" fit="fill" />
              </LaptopScreen>
            </DeviceFrame>
          </Reveal>
          <div className="grid grid-cols-4 gap-8 max-[720px]:grid-cols-1">
            {TEE_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 0.06}>
                <div className="mb-3.5 flex size-[38px] items-center justify-center rounded-[10px] bg-green/12">
                  <f.icon className="size-[18px] stroke-green-dark stroke-[1.8]" />
                </div>
                <h3 className="mb-2 text-[16.5px] font-bold text-navy">{f.title}</h3>
                <p className="text-[14.5px] leading-[1.6] text-ink-muted">{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto grid max-w-(--container-max) grid-cols-[1.55fr_1fr] items-center gap-14 max-[1080px]:grid-cols-1">
          <Reveal fadeOnly className="min-[1360px]:-ml-[88px]">
            <motion.div
              ref={flip.ref}
              style={{ rotateY: flip.rotateY, rotateX: flip.rotateX, transformPerspective: 1500 }}
              className="overflow-hidden rounded-[14px] border border-[#DFE7F0] bg-white shadow-[0_1px_2px_rgba(10,26,51,0.05),0_40px_90px_-30px_rgba(10,26,51,0.28)]"
            >
              <div className="flex h-10 items-center gap-2 border-b border-border bg-secondary px-3.5">
                <span className="size-2.5 rounded-full bg-[#FF5F57]" />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="size-2.5 rounded-full bg-[#28C840]" />
              </div>
              <img
                src="/assets/shot-torneos.webp"
                alt="Gestión de torneos"
                loading="lazy"
                className="block aspect-[1911/940] w-full object-contain"
              />
            </motion.div>
          </Reveal>
          <div>
            <Reveal>
              <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
                Módulo golf · Torneos
              </div>
              <h2 className="mb-4 text-h2-sm leading-[1.08] font-bold tracking-[-0.03em] text-navy">
                Gestión de torneos 360°
              </h2>
              <p className="mb-[26px] text-[17px] leading-[1.65] text-ink-muted">
                Creá y gestioná torneos de forma intuitiva y rápida. Determiná horarios, inscripciones, modalidad,
                formato, categorías, costo y más configuraciones.
              </p>
            </Reveal>
            <div className="flex flex-col gap-[18px]">
              {TORNEOS_FEATURES.map((f, i) => (
                <Reveal key={f.title} className="border-t border-border pt-4" delay={i * 0.05}>
                  <span className="text-[15.5px] font-medium text-navy">{f.title}</span>{' '}
                  <span className="text-[15px] text-ink-muted">— {f.desc}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(120%_90%_at_88%_8%,rgba(53,196,106,0.10),rgba(53,196,106,0)_58%),linear-gradient(155deg,#0A1A33_0%,#060F1E_100%)] px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto grid max-w-(--container-max) grid-cols-[1fr_1.15fr] items-center gap-18 max-[1080px]:grid-cols-1">
          <div>
            <Reveal>
              <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green uppercase">
                Módulo administración
              </div>
              <h2 className="mb-4 text-h2-sm leading-[1.08] font-bold tracking-[-0.03em] text-white">
                Finanzas <span className="text-green">bajo control.</span>
              </h2>
              <p className="mb-[26px] text-[17px] leading-[1.65] text-ink-muted-light">
                Cuotas, consumos y facturación en un mismo tablero, con la cobranza del mes a un solo click y la
                gestión de estado de cuenta socio por socio.
              </p>
            </Reveal>
            <div className="flex flex-col gap-[18px]">
              {FINANZAS_FEATURES.map((f, i) => (
                <Reveal key={f.title} className="border-t border-ink-muted-light/22 pt-4" delay={i * 0.05}>
                  <span className="text-[15.5px] font-medium text-white">{f.title}</span>{' '}
                  <span className="text-[15px] text-ink-muted-light">— {f.desc}</span>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal fadeOnly>
            <div className="overflow-hidden rounded-[14px] border border-ink-muted-light/20 bg-[#0B1526] shadow-[0_50px_110px_-40px_rgba(0,0,0,0.7)]">
              <div className="flex h-10 items-center gap-2 border-b border-ink-muted-light/16 bg-white/5 px-3.5">
                <span className="size-2.5 rounded-full bg-[#FF5F57]" />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="size-2.5 rounded-full bg-[#28C840]" />
              </div>
              <img
                src="/assets/shot-golf.webp"
                alt="Reportes de green fees e ingresos"
                loading="lazy"
                className="block aspect-[1513/777] w-full object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto max-w-(--container-max)">
          <Reveal className="mb-14 max-w-[680px]">
            <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
              Operativa del club
            </div>
            <h2 className="mb-4 text-h2 leading-[1.06] font-bold tracking-[-0.03em] text-navy">
              CRM, reservas y comunicación
            </h2>
            <p className="text-[17px] leading-[1.65] text-ink-muted">
              Club One permite administrar el vínculo con el socio: quién es, qué reserva, qué consume y cómo se
              comunica con el club.
            </p>
          </Reveal>
          <div className="grid grid-cols-4 gap-x-8 gap-y-10 max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1">
            {OPERATIVA_COLS.map((col, i) => (
              <Reveal key={col.title} className="border-t border-border-ink-muted pt-6" delay={(i % 4) * 0.06}>
                <h3 className="mb-4 text-[17px] font-bold text-navy">{col.title}</h3>
                <div className="flex flex-col gap-3">
                  {col.items.map(([b, rest]) => (
                    <div key={b} className="text-[14.5px] leading-[1.55] text-ink-muted">
                      <span className="font-medium text-navy">{b}</span> {rest}
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary px-8 py-[116px] max-[1080px]:py-[84px] max-[720px]:px-5 max-[720px]:py-16">
        <div className="mx-auto max-w-(--container-max)">
          <Reveal className="mb-14 max-w-[680px]">
            <div className="mb-[18px] font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
              Tecnología
            </div>
            <h2 className="mb-4 text-h2 leading-[1.06] font-bold tracking-[-0.03em] text-navy">
              Compromiso con la innovación y seguridad
            </h2>
            <p className="text-[17px] leading-[1.65] text-ink-muted">
              Club One funciona 100% en la nube, se accede desde cualquier navegador y crece con el club: de una sede
              a varias, de un deporte a todos.
            </p>
          </Reveal>
          <div className="mb-18 grid grid-cols-3 gap-[18px] max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1">
            {TECH_CARDS.map((c, i) => (
              <Reveal key={c.title} fadeOnly delay={(i % 3) * 0.06}>
                <div className="rounded-[14px] border border-border bg-white p-6">
                  <h3 className="mb-2 text-base font-bold text-navy">{c.title}</h3>
                  <p className="text-[14.5px] leading-[1.6] text-ink-muted">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mb-8 font-mono text-eyebrow font-medium tracking-[0.22em] text-green-dark uppercase">
            Puesta en marcha
          </Reveal>
          <div className="grid grid-cols-4 gap-8 max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} className="border-t border-border-ink-muted pt-[22px]" delay={(i % 4) * 0.06}>
                <div className="mb-3.5 font-mono text-xs text-green-dark">{s.n}</div>
                <h3 className="mb-2 text-[17px] font-bold text-navy">{s.title}</h3>
                <p className="text-[14.5px] leading-[1.6] text-ink-muted">{s.desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 text-[14.5px] text-label">
              Actualizaciones y mejoras continuas. Soporte en español durante toda la operación.
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingCta
        heading={
          <>
            Descubrí Club One <span className="text-green">en acción.</span>
          </>
        }
        body="Te mostramos cómo cada módulo se adapta a la operación de tu club."
        links={[{ to: '/contacto', label: 'Solicitar demo', variant: 'solid' }]}
      />
    </div>
  )
}
