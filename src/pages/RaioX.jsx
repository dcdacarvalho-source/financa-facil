// src/pages/RaioX.jsx
import { useFinance } from '../context/FinanceContext'
import Card from '../components/Card'
import InputField from '../components/InputField'
import { formatCurrency, getResumoMensal } from '../utils/calculations'

export default function RaioX() {
  const { monthData, updateMonthData } = useFinance()
  const resumo = getResumoMensal(monthData)

  const handleChange = (field) => (e) => {
    const value = e.target.value
    updateMonthData((prev) => ({
      ...prev,
      raioX: {
        ...prev.raioX,
        [field]: value === '' ? '' : Number(value),
      },
    }))
  }

  return (
    <div className="space-y-4">
      <Card title="Raio-X Financeiro" subtitle="Informe os números principais do seu mês" icon="🔍">
        <div className="space-y-3">
          <InputField
            label="Renda mensal"
            type="number"
            prefix="R$"
            min="0"
            step="0.01"
            value={monthData.raioX.rendaMensal}
            onChange={handleChange('rendaMensal')}
            placeholder="0,00"
          />
          <InputField
            label="Gastos fixos (aluguel, contas, assinaturas...)"
            type="number"
            prefix="R$"
            min="0"
            step="0.01"
            value={monthData.raioX.gastosFixos}
            onChange={handleChange('gastosFixos')}
            placeholder="0,00"
          />
          <InputField
            label="Dívidas (parcelas, empréstimos...)"
            type="number"
            prefix="R$"
            min="0"
            step="0.01"
            value={monthData.raioX.dividas}
            onChange={handleChange('dividas')}
            placeholder="0,00"
          />
        </div>
      </Card>

      <Card title="Resultado automático" icon="🧮">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Renda mensal</span>
            <span className="font-medium">{formatCurrency(resumo.renda)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Gastos fixos + dívidas</span>
            <span className="font-medium">
              {formatCurrency(resumo.gastosFixos + resumo.dividas)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Gastos variáveis (já lançados)</span>
            <span className="font-medium">{formatCurrency(resumo.totalVariaveis)}</span>
          </div>
          <hr className="border-slate-200 dark:border-slate-700" />
          <div className="flex justify-between text-base font-bold">
            <span>Total restante</span>
            <span className={resumo.restante >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
              {formatCurrency(resumo.restante)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}
