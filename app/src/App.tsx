import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { Producto } from '@/pages/Producto'
import { Nosotros } from '@/pages/Nosotros'
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
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
