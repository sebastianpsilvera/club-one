import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import './index.css'
// react-mockframe ships its device art as plain CSS, one file per family.
// Only the families actually used by DeviceFrame are pulled in.
import 'react-mockframe/styles/mockframe.css'
import 'react-mockframe/styles/mockframe-iphones.css'
import 'react-mockframe/styles/mockframe-tablets.css'
import 'react-mockframe/styles/mockframe-laptops.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactLenis root options={{ duration: 1.05 }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactLenis>
  </StrictMode>,
)
