// src/utils/calculations.js

export function formatCurrency(value) {
  const num = Number(value) || 0
  return num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function getTotalGastosVariaveis(gastosVariaveis) {
  return gastosVariaveis.reduce((sum, g) => sum + (Number(g.valor) || 0), 0)
}

export function getResumoMensal(monthData) {
  const { raioX, gastosVariaveis } = monthData
  const renda = Number(raioX.rendaMensal) || 0
  const gastosFixos = Number(raioX.gastosFixos) || 0
  const dividas = Number(raioX.dividas) || 0
  const totalVariaveis = getTotalGastosVariaveis(gastosVariaveis)

  const totalGastos = gastosFixos + dividas + totalVariaveis
  const restante = renda - totalGastos
  const percentualComprometido = renda > 0 ? (totalGastos / renda) * 100 : 0

  return {
    renda,
    gastosFixos,
    dividas,
    totalVariaveis,
    totalGastos,
    restante,
    percentualComprometido: Math.min(percentualComprometido, 999),
  }
}

export function getReservaProgresso(reserva) {
  const meta = Number(reserva.meta) || 0
  const guardado = Number(reserva.valorGuardado) || 0
  const percentual = meta > 0 ? Math.min((guardado / meta) * 100, 100) : 0
  return { meta, guardado, percentual }
}

export function getCartaoProgresso(cartao) {
  const limite = Number(cartao.limite) || 0
  const fatura = Number(cartao.valorFatura) || 0
  const percentual = limite > 0 ? Math.min((fatura / limite) * 100, 100) : 0
  return { limite, fatura, percentual, parcelas: Number(cartao.parcelas) || 0 }
}

export function getGastosPorCategoria(gastosVariaveis) {
  const totals = {}
  gastosVariaveis.forEach((g) => {
    const cat = g.categoria || 'Outros'
    totals[cat] = (totals[cat] || 0) + (Number(g.valor) || 0)
  })
  return Object.entries(totals).map(([categoria, valor]) => ({ categoria, valor }))
}

export function getMensagemMotivacional(percentualComprometido) {
  if (percentualComprometido === 0) {
    return 'Comece registrando sua renda e seus gastos fixos. Você está no controle! 💪'
  }
  if (percentualComprometido < 50) {
    return 'Ótimo trabalho! Suas finanças estão bem equilibradas este mês. 🌱'
  }
  if (percentualComprometido < 80) {
    return 'Você está no caminho certo. Continue acompanhando de perto seus gastos. 👀'
  }
  if (percentualComprometido < 100) {
    return 'Atenção: seus gastos estão consumindo quase toda a sua renda. Vale revisar! ⚠️'
  }
  return 'Seus gastos superaram sua renda este mês. Respire, ajuste o que for possível e siga em frente. 🤝'
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
