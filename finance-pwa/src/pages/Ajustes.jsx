// src/pages/Ajustes.jsx
import { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import Card from '../components/Card'
import InputField from '../components/InputField'
import { formatCurrency, uid } from '../utils/calculations'

export default function Ajustes() {
  const { monthData, updateMonthData } = useFinance()
  const [form, setForm] = useState({ descricao: '', valorAntes: '', valorDepois: '' })

  const handleMetaChange = (e) => {
    const value = e.target.value
    updateMonthData((prev) => ({
      ...prev,
      ajustes: { ...prev.ajustes, metaEconomia: value === '' ? '' : Number(value) },
    }))
  }

  const handleAddCorte = (e) => {
    e.preventDefault()
    if (!form.descricao) return

    const novoCorte = {
      id: uid(),
      descricao: form.descricao,
      valorAntes: Number(form.valorAntes) || 0,
      valorDepois: Number(form.valorDepois) || 0,
    }

    updateMonthData((prev) => ({
      ...prev,
      ajustes: { ...prev.ajustes, cortes: [...prev.ajustes.cortes, novoCorte] },
    }))

    setForm({ descricao: '', valorAntes: '', valorDepois: '' })
  }

  const handleRemoveCorte = (id) => {
    updateMonthData((prev) => ({
      ...prev,
      ajustes: { ...prev.ajustes, cortes: prev.ajustes.cortes.filter((c) => c.id !== id) },
    }))
  }

  const totalEconomizado = monthData.ajustes.cortes.reduce(
    (sum, c) => sum + (c.valorAntes - c.valorDepois),
    0
  )

  return (
    <div className="space-y-4">
      <Card title="Meta de economia do mês" icon="🎯">
        <InputField
          label="Quanto você quer economizar este mês?"
          type="number"
          prefix="R$"
          min="0"
          step="0.01"
          value={monthData.ajustes.metaEconomia}
          onChange={handleMetaChange}
          placeholder="0,00"
        />
      </Card>

      <Card title="Registrar corte de gasto" icon="✂️">
        <form onSubmit={handleAddCorte} className="space-y-3">
          <InputField
            label="O que você cortou ou reduziu?"
            type="text"
            placeholder="Ex: Assinatura de streaming, delivery..."
            value={form.descricao}
            onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Valor antes"
              type="number"
              prefix="R$"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={form.valorAntes}
              onChange={(e) => setForm((f) => ({ ...f, valorAntes: e.target.value }))}
            />
            <InputField
              label="Valor depois"
              type="number"
              prefix="R$"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={form.valorDepois}
              onChange={(e) => setForm((f) => ({ ...f, valorDepois: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 text-sm transition-colors"
          >
            Registrar corte
          </button>
        </form>
      </Card>

      <Card title="Antes x Depois" icon="📉">
        {monthData.ajustes.cortes.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">
            Nenhum corte registrado ainda.
          </p>
        ) : (
          <>
            <ul className="space-y-2">
              {monthData.ajustes.cortes.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 dark:border-slate-700 p-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                      {c.descricao}
                    </p>
                    <p className="text-xs text-slate-400">
                      <span className="line-through">{formatCurrency(c.valorAntes)}</span>
                      {' → '}
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {formatCurrency(c.valorDepois)}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveCorte(c.id)}
                    aria-label="Remover corte"
                    className="w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10 transition-colors shrink-0"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Total economizado com cortes
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(totalEconomizado)}
              </span>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
