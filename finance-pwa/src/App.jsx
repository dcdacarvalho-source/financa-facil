// src/App.jsx
import { HashRouter, Routes, Route } from 'react-router-dom'
import { FinanceProvider } from './context/FinanceContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import RaioX from './pages/RaioX'
import Gastos from './pages/Gastos'
import Cartao from './pages/Cartao'
import Ajustes from './pages/Ajustes'
import Reserva from './pages/Reserva'
import Rotina from './pages/Rotina'
import Comparativo from './pages/Comparativo'
import Ciclo from './pages/Ciclo'
import Mais from './pages/Mais'

export default function App() {
  return (
    <ThemeProvider>
      <FinanceProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="raio-x" element={<RaioX />} />
              <Route path="gastos" element={<Gastos />} />
              <Route path="cartao" element={<Cartao />} />
              <Route path="ajustes" element={<Ajustes />} />
              <Route path="reserva" element={<Reserva />} />
              <Route path="rotina" element={<Rotina />} />
              <Route path="comparativo" element={<Comparativo />} />
              <Route path="ciclo" element={<Ciclo />} />
              <Route path="mais" element={<Mais />} />
            </Route>
          </Routes>
        </HashRouter>
      </FinanceProvider>
    </ThemeProvider>
  )
}
