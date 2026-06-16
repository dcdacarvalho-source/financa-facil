// src/components/BottomNav.jsx
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Início', icon: '🏠' },
  { to: '/gastos', label: 'Gastos', icon: '🧾' },
  { to: '/cartao', label: 'Cartão', icon: '💳' },
  { to: '/reserva', label: 'Reserva', icon: '🛡️' },
  { to: '/mais', label: 'Mais', icon: '⋯' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 sm:hidden">
      <div className="grid grid-cols-5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 text-[11px] gap-0.5 transition-colors ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400'
              }`
            }
          >
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
