// src/components/MonthSelector.jsx
import { MESES } from '../storage/storage'
import { useFinance } from '../context/FinanceContext'

export default function MonthSelector() {
  const { selectedMonth, setSelectedMonth, currentYear } = useFinance()

  const goPrev = () => setSelectedMonth((m) => (m === 0 ? 11 : m - 1))
  const goNext = () => setSelectedMonth((m) => (m === 11 ? 0 : m + 1))

  return (
    <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2.5 shadow-sm">
      <button
        onClick={goPrev}
        aria-label="Mês anterior"
        className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-lg"
      >
        ‹
      </button>

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        className="flex-1 text-center bg-transparent font-semibold text-slate-800 dark:text-slate-100 focus:outline-none cursor-pointer"
      >
        {MESES.map((mes, idx) => (
          <option key={mes} value={idx}>
            {mes} de {currentYear}
          </option>
        ))}
      </select>

      <button
        onClick={goNext}
        aria-label="Próximo mês"
        className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-lg"
      >
        ›
      </button>
    </div>
  )
}
