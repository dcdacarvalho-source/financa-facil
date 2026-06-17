// src/components/InputField.jsx
export default function InputField({
  label,
  type = 'text',
  value,
  onChange,
  prefix,
  placeholder,
  step,
  min,
  options, // for select
  className = '',
}) {
  const baseInput =
    'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-500 transition'

  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
          {label}
        </span>
      )}
      {type === 'select' ? (
        <select value={value} onChange={onChange} className={baseInput}>
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
      ) : prefix ? (
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            {prefix}
          </span>
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            step={step}
            min={min}
            className={`${baseInput} pl-8`}
          />
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          step={step}
          min={min}
          className={baseInput}
        />
      )}
    </label>
  )
}
