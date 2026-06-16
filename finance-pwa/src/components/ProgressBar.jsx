// src/components/ProgressBar.jsx
export default function ProgressBar({ percentual, color = 'emerald', label, valueLabel }) {
  const pct = Math.max(0, Math.min(100, percentual))

  const colorMap = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    violet: 'bg-violet-500',
  }

  // Cor automática baseada no percentual (para barras de "comprometimento")
  const barColor = colorMap[color] || colorMap.emerald

  return (
    <div className="w-full">
      {(label || valueLabel) && (
        <div className="flex justify-between items-center mb-1.5 text-xs sm:text-sm">
          <span className="text-slate-600 dark:text-slate-300">{label}</span>
          <span className="font-medium text-slate-800 dark:text-slate-100">{valueLabel}</span>
        </div>
      )}
      <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
