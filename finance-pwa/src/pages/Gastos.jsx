// src/pages/Gastos.jsx
import { useState, useMemo } from 'react'
import { useFinance } from '../context/FinanceContext'
import Card from '../components/Card'
import InputField from '../components/InputField'
import { CATEGORIAS, FORMAS_PAGAMENTO } from '../storage/storage'
import { formatCurrency, getTotalGastosVariaveis, uid } from '../utils/calculations'

const CATEGORIA_ICONS = {
  Alimentação: '🍽️',
  Transporte: '🚗',
  Lazer: '🎮',
  Saúde: '💊',
  Compras: '🛍️',
  Outros: '📦',
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function Gastos() {
  const { monthData, updateMonthData } = useFinance()
  const [form, setForm] = useState({
    data: todayISO(),
    descricao: '',
    categoria: CATEGORIAS[0],
    valor: '',
    formaPagamento: FORMAS_PAGAMENTO[0],
  })
  const [filtroCategoria, setFiltroCategoria] = useState('Todas')

  const total = getTotalGastosVariaveis(monthData.gastosVariaveis)

  const gastosOrdenados = useMemo(() => {
    let lista = [...monthData.gastosVariaveis]
    if (filtroCategoria !== 'Todas') {
      lista = lista.filter((g) => g.categoria === filtroCategoria)
    }
    return lista.sort((a, b) => (a.data < b.data ? 1 : -1))
  }, [monthData.gastosVariaveis, filtroCategoria])

  const handleAdd = (e) => {
    e.preventDefault()
    if (!form.descricao || !form.valor) return

    const novoGasto = {
      id: uid(),
      data: form.data,
      descricao: form.descricao,
      categoria: form.categoria,
      valor: Number(form.valor),
      formaPagamento: form.formaPagamento,
    }

    updateMonthData((prev) => ({
      ...prev,
      gastosVariaveis: [...prev.gastosVariaveis, novoGasto],
    }))

    setForm((f) => ({ ...f, descricao: '', valor: '' }))
  }

  const handleRemove = (id) => {
    updateMonthData((prev) => ({
      ...prev,
      gastosVariaveis: prev.gastosVariaveis.filter((g) => g.id !== id),
    }))
  }

  return (
    <div className="space-y-4">
      <Card title="Adicionar gasto" icon="➕">
        <form onSubmit={handleAdd} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Data"
              type="date"
              value={form.data}
              onChange={(e) => setForm((f) => ({ ...f, data: e.target.value }))}
            />
            <InputField
              label="Valor"
              type="number"
              prefix="R$"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={form.valor}
              onChange={(e) => setForm((f) => ({ ...f, valor: e.target.value }))}
            />
          </div>
          <InputField
            label="Descrição"
            type="text"
            placeholder="Ex: Almoço, Uber, Mercado..."
            value={form.descricao}
            onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Categoria"
              type="select"
              options={CATEGORIAS}
              value={form.categoria}
              onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))}
            />
            <InputField
              label="Forma de pagamento"
              type="select"
              options={FORMAS_PAGAMENTO}
              value={form.formaPagamento}
              onChange={(e) => setForm((f) => ({ ...f, formaPagamento: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 text-sm transition-colors"
          >
            Adicionar gasto
          </button>
        </form>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
            Gastos do mês
          </h3>
          <span className="font-bold text-rose-600 dark:text-rose-400">
            {formatCurrency(total)}
          </span>
        </div>

        <InputField
          type="select"
          options={['Todas', ...CATEGORIAS]}
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="mb-3"
        />

        {gastosOrdenados.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">
            Nenhum gasto registrado ainda.
          </p>
        ) : (
          <ul className="space-y-2">
            {gastosOrdenados.map((g) => (
              <li
                key={g.id}
                className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 dark:border-slate-700 p-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xl shrink-0">{CATEGORIA_ICONS[g.categoria] || '📦'}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                      {g.descricao}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(g.data + 'T00:00:00').toLocaleDateString('pt-BR')} · {g.formaPagamento}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">
                    {formatCurrency(g.valor)}
                  </span>
                  <button
                    onClick={() => handleRemove(g.id)}
                    aria-label="Remover gasto"
                    className="w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
