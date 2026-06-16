// src/pages/Rotina.jsx
import { useFinance } from '../context/FinanceContext'
import Card from '../components/Card'

export default function Rotina() {
  const { monthData, updateMonthData } = useFinance()

  const toggleItem = (id) => {
    updateMonthData((prev) => ({
      ...prev,
      rotina: prev.rotina.map((item) =>
        item.id === id ? { ...item, feito: !item.feito } : item
      ),
    }))
  }

  const feitos = monthData.rotina.filter((i) => i.feito).length
  const total = monthData.rotina.length
  const percentual = total > 0 ? (feitos / total) * 100 : 0

  return (
    <div className="space-y-4">
      <Card title="Rotina mensal" subtitle="Checklist para manter o controle financeiro" icon="✅">
        <ul className="space-y-2">
          {monthData.rotina.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                  item.feito
                    ? 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border-2 transition-colors ${
                    item.feito
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-300 dark:border-slate-600 text-transparent'
                  }`}
                >
                  ✓
                </span>
                <span
                  className={`text-sm ${
                    item.feito
                      ? 'text-emerald-700 dark:text-emerald-300 line-through'
                      : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {feitos} de {total} itens concluídos ({percentual.toFixed(0)}%)
          </p>
        </div>
      </Card>
    </div>
  )
}
