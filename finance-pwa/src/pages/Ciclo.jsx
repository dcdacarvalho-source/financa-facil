// src/pages/Ciclo.jsx
import { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import Card from '../components/Card'

export default function Ciclo() {
  const { currentYear, startNewYear, availableYears } = useFinance()
  const [confirmando, setConfirmando] = useState(false)

  const handleConfirm = () => {
    startNewYear()
    setConfirmando(false)
  }

  return (
    <div className="space-y-4">
      <Card title="Reinício anual" subtitle={`Ano atual: ${currentYear}`} icon="🔄">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Ao iniciar um novo ciclo anual, o ano atual passa a ser <strong>{currentYear + 1}</strong>{' '}
          com todos os meses zerados. Seus dados de {currentYear} continuam salvos no histórico e
          podem ser consultados a qualquer momento.
        </p>

        {!confirmando ? (
          <button
            onClick={() => setConfirmando(true)}
            className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 text-sm transition-colors"
          >
            Iniciar novo ciclo anual ({currentYear + 1})
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm font-medium text-rose-600 dark:text-rose-400 text-center">
              Tem certeza? Você passará a editar o ano {currentYear + 1}.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setConfirmando(false)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 text-sm transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </Card>

      <Card title="Histórico de anos" icon="📂">
        {availableYears.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">Nenhum histórico ainda.</p>
        ) : (
          <ul className="space-y-2">
            {availableYears.map((year) => (
              <li
                key={year}
                className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-700 p-3"
              >
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{year}</span>
                {year === currentYear && (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                    Ano atual
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs text-slate-400 mt-3">
          Observação: nesta versão, a navegação por mês/ano funciona dentro do ano atual. Dados de
          anos anteriores permanecem salvos no armazenamento do seu navegador.
        </p>
      </Card>
    </div>
  )
}
