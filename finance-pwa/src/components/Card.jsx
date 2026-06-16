// src/components/Card.jsx
export default function Card({ title, subtitle, children, className = '', icon }) {
  return (
    <div
      className={`rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 sm:p-5 shadow-sm ${className}`}
    >
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-3">
          {icon && <span className="text-xl">{icon}</span>}
          <div>
            {title && (
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
