// src/pages/Cartao.jsx
import { useFinance } from '../context/FinanceContext'
import Card from '../components/Card'
import InputField from '../components/InputField'
import ProgressBar from '../components/ProgressBar'
import { formatCurrency, getCartaoProgresso } from '../utils/calculations'

export default function Cartao() {
  const { monthData, updateMonthData } = useFinance()
  const cartao = getCartaoProgresso(monthData.cartao)

  const handleChange = (field) => (e) => {
    const value = e.target.value
    updateMonthData((prev) => ({
      ...prev,
      cartao: {
        ...prev.cartao,
        [field]: value === '' ? '' : Number(value),
      },
    }))
  }

  const corUso = cartao.percentual < 50 ? 'emerald' : cartao.percentual < 80 ? 'amber' : 'rose'

  return (
    <div className="space-y-4">
      <Card title="Controle de cartão" subtitle="Acompanhe o uso do limite do seu cartão" icon="💳">
        <div className="space-y-3">
          <InputField
            label="Limite do cartão"
            type="number"
            prefix="R$"
            min="0"
            step="0.01"
            value={monthData.cartao.limite}
            onChange={handleChange('limite')}
            placeholder="0,00"
          />
          <InputField
            label="Valor atual da fatura"
            type="number"
            prefix="R$"
            min="0"
            step="0.01"
            value={monthData.cartao.valorFatura}
            onChange={handleChange('valorFatura')}
            placeholder="0,00"
          />
          <InputField
            label="Número de parcelas em aberto"
            type="number"
            min="0"
            step="1"
            value={monthData.cartao.parcelas}
            onChange={handleChange('parcelas')}
            placeholder="0"
          />
        </div>
      </Card>

      <Card title="Uso do limite" icon="📊">
        <ProgressBar
          percentual={cartao.percentual}
          color={corUso}
          label={`${formatCurrency(cartao.fatura)} usados`}
          valueLabel={`de ${formatCurrency(cartao.limite)}`}
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          {cartao.percentual.toFixed(0)}% do limite comprometido
          {cartao.parcelas > 0 && ` · ${cartao.parcelas} parcela(s) em aberto`}
        </p>
        {cartao.percentual >= 80 && (
          <p className="text-xs text-rose-600 dark:text-rose-400 mt-2 font-medium">
            Atenção: o uso do cartão está alto. Tente reduzir novas compras no crédito.
          </p>
        )}
      </Card>
    </div>
  )
}
