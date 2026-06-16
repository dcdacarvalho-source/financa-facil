// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/raio-x', label: 'Raio-X Financeiro', icon: '🔍' },
  { to: '/gastos', label: 'Gastos Variáveis', icon: '🧾' },
  { to: '/cartao', label: 'Controle de Cartão', icon: '💳' },
  { to: '/ajustes', label: 'Ajustes e Cortes', icon: '✂️' },
  { to: '/reserva', label: 'Reserva de Emergência', icon: '🛡️' },
  { to: '/rotina', label: 'Rotina Mensal', icon: '✅' },
  { to: '/comparativo', label: 'Comparativo', icon: '📊' },
  { to: '/ciclo', label: 'Reinício Anual', icon: '🔄' },
]

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <aside className="hidden sm:flex sm:flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-6">
      <div className="flex items-center gap-2 px-2 mb-8">
        <span className="text-2xl">💰</span>
        <div>
          <h1 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">Finança Fácil</h1>
          <p className="text-xs text-slate-400">Clareza financeira mês a mês</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                isActive
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={toggleTheme}
        className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <span className="text-lg">{theme === 'dark' ? '☀️' : '🌙'}</span>
        {theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
      </button>
    </aside>
  )
}
