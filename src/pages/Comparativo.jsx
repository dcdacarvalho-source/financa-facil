// src/pages/Comparativo.jsx
import { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { useFinance } from '../context/FinanceContext'
import { getMonthData, MESES } from '../storage/storage'
import Card from '../components/Card'
import {
  getResumoMensal,
  getGastosPorCategoria,
  formatCurrency,
} from '../utils/calculations'

const CATEGORIA_COLORS = {
  Alimentação: '#10b981',
  Transporte: '#3b82f6',
  Lazer: '#f59e0b',
  Saúde: '#ef4444',
  Compras: '#8b5cf6',
  Outros: '#94a3b8',
}

export default function Comparativo() {
  const { data, currentYear, selectedMonth } = useFinance()

  const dadosMensais = useMemo(() => {
    return MESES.map((nome, idx) => {
      const monthData = getMonthData(data, currentYear, idx)
      const resumo = getResumoMensal(monthData)
      return {
        mes: nome.slice(0, 3),
        Renda: resumo.renda,
        Gastos: resumo.totalGastos,
      }
    })
  }, [data, currentYear])

  const monthData = getMonthData(data, currentYear, selectedMonth)
  const gastosCategoria = getGastosPorCategoria(monthData.gastosVariaveis)

  return (
    <div className="space-y-4">
      <Card title={`Renda vs. Gastos em ${currentYear}`} subtitle="Comparação entre os meses" icon="📊">
        <div className="h-64 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dadosMensais}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} width={40} />
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Renda" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Gastos" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card
        title={`Gastos por categoria — ${MESES[selectedMonth]}`}
        subtitle="Distribuição dos gastos variáveis do mês selecionado"
        icon="🥧"
      >
        {gastosCategoria.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">
            Nenhum gasto variável registrado neste mês.
          </p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gastosCategoria}
                  dataKey="valor"
                  nameKey="categoria"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ categoria, percent }) => `${categoria} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  fontSize={11}
                >
                  {gastosCategoria.map((entry) => (
                    <Cell key={entry.categoria} fill={CATEGORIA_COLORS[entry.categoria] || '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  )
}
