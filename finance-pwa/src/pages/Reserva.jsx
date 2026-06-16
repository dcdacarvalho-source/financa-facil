// src/pages/Reserva.jsx
import { useFinance } from '../context/FinanceContext'
import Card from '../components/Card'
import InputField from '../components/InputField'
import ProgressBar from '../components/ProgressBar'
import { formatCurrency, getReservaProgresso } from '../utils/calculations'

export default function Reserva() {
  const { monthData, updateMonthData } = useFinance()
  const reserva = getReservaProgresso(monthData.reserva)

  const handleChange = (field) => (e) => {
    const value = e.target.value
    updateMonthData((prev) => ({
      ...prev,
      reserva: {
        ...prev.reserva,
        [field]: value === '' ? '' : Number(value),
      },
    }))
  }

  const faltam = Math.max(reserva.meta - reserva.guardado, 0)

  return (
    <div className="space-y-4">
      <Card title="Reserva de emergência" subtitle="Sua segurança para imprevistos" icon="🛡️">
        <div className="space-y-3">
          <InputField
            label="Meta da reserva"
            type="number"
            prefix="R$"
            min="0"
            step="0.01"
            value={monthData.reserva.meta}
            onChange={handleChange('meta')}
            placeholder="0,00"
          />
          <InputField
            label="Valor guardado até agora"
            type="number"
            prefix="R$"
            min="0"
            step="0.01"
            value={monthData.reserva.valorGuardado}
            onChange={handleChange('valorGuardado')}
            placeholder="0,00"
          />
        </div>
      </Card>

      <Card title="Progresso" icon="📈">
        <ProgressBar
          percentual={reserva.percentual}
          color="blue"
          label={formatCurrency(reserva.guardado)}
          valueLabel={`${reserva.percentual.toFixed(0)}%`}
        />
        <div className="grid grid-cols-2 gap-2 mt-4 text-center">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Meta total</p>
            <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">
              {formatCurrency(reserva.meta)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Faltam</p>
            <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">
              {formatCurrency(faltam)}
            </p>
          </div>
        </div>
        {reserva.percentual >= 100 && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-3 font-medium text-center">
            🎉 Parabéns! Você atingiu sua meta de reserva de emergência.
          </p>
        )}
      </Card>
    </div>
  )
}
