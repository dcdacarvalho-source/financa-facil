// src/pages/Mais.jsx
import { Link } from 'react-router-dom'
import Card from '../components/Card'

const items = [
  { to: '/raio-x', label: 'Raio-X Financeiro', icon: '🔍', desc: 'Renda, gastos fixos e dívidas' },
  { to: '/ajustes', label: 'Ajustes e Cortes', icon: '✂️', desc: 'Metas de economia e cortes' },
  { to: '/rotina', label: 'Rotina Mensal', icon: '✅', desc: 'Checklist financeiro do mês' },
  { to: '/comparativo', label: 'Comparativo', icon: '📊', desc: 'Gráficos e evolução mensal' },
  { to: '/ciclo', label: 'Reinício Anual', icon: '🔄', desc: 'Iniciar novo ciclo do ano' },
]

export default function Mais() {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 px-1">
        Mais opções
      </h2>
      {items.map((item) => (
        <Link key={item.to} to={item.to}>
          <Card className="flex items-center gap-3">
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">{item.label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
            <span className="text-slate-300 dark:text-slate-600">›</span>
          </Card>
        </Link>
      ))}
    </div>
  )
}
