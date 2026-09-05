import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { Producto } from '@/pages/Producto'
import { Turismo } from '@/pages/Turismo'
import { QuienesSomos } from '@/pages/QuienesSomos'
import { Clientes } from '@/pages/Clientes'
import { Contacto } from '@/pages/Contacto'
import { ScrollToTop } from '@/components/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/producto" element={<Producto />} />
          <Route path="/turismo" element={<Turismo />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          {/* /nosotros was the combined company + turismo page before the two
              were split; keep the old path working rather than 404ing it. */}
          <Route path="/nosotros" element={<Navigate to="/quienes-somos" replace />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
