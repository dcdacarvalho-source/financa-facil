// src/pages/Dashboard.jsx
import { useFinance } from '../context/FinanceContext'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import {
  formatCurrency,
  getResumoMensal,
  getReservaProgresso,
  getMensagemMotivacional,
} from '../utils/calculations'

export default function Dashboard() {
  const { monthData } = useFinance()
  const resumo = getResumoMensal(monthData)
  const reserva = getReservaProgresso(monthData.reserva)

  const comprometimentoColor =
    resumo.percentualComprometido < 70
      ? 'emerald'
      : resumo.percentualComprometido < 100
      ? 'amber'
      : 'rose'

  return (
    <div className="space-y-4">
      {/* Resumo principal */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Renda</p>
          <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
            {formatCurrency(resumo.renda)}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Gastos totais</p>
          <p className="text-lg sm:text-xl font-bold text-rose-600 dark:text-rose-400">
            {formatCurrency(resumo.totalGastos)}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Restante</p>
          <p
            className={`text-lg sm:text-xl font-bold ${
              resumo.restante >= 0
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {formatCurrency(resumo.restante)}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Comprometido</p>
          <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
            {resumo.percentualComprometido.toFixed(0)}%
          </p>
        </Card>
      </div>

      {/* Comprometimento da renda */}
      <Card title="Quanto da sua renda já está comprometido" icon="📈">
        <ProgressBar
          percentual={resumo.percentualComprometido}
          color={comprometimentoColor}
          label="Gastos vs. Renda"
          valueLabel={`${resumo.percentualComprometido.toFixed(0)}%`}
        />
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Fixos</p>
            <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">
              {formatCurrency(resumo.gastosFixos)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Dívidas</p>
            <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">
              {formatCurrency(resumo.dividas)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Variáveis</p>
            <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">
              {formatCurrency(resumo.totalVariaveis)}
            </p>
          </div>
        </div>
      </Card>

      {/* Reserva de emergência */}
      <Card title="Reserva de emergência" icon="🛡️">
        <ProgressBar
          percentual={reserva.percentual}
          color="blue"
          label={`${formatCurrency(reserva.guardado)} guardados`}
          valueLabel={`Meta: ${formatCurrency(reserva.meta)}`}
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          {reserva.percentual.toFixed(0)}% da sua meta alcançada
        </p>
      </Card>

      {/* Mensagem motivacional */}
      <Card className="bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20">
        <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium text-center">
          {getMensagemMotivacional(resumo.percentualComprometido)}
        </p>
      </Card>
    </div>
  )
}
