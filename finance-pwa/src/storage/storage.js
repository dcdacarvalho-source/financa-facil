// src/storage/storage.js
// Camada de persistência usando localStorage.
// Estrutura geral dos dados salvos:
//
// financa-facil:data = {
//   currentYear: 2026,
//   years: {
//     "2026": {
//       months: {
//         "0": { ...dadosDoMes },   // 0 = Janeiro ... 11 = Dezembro
//         "1": { ... },
//         ...
//       }
//     },
//     "2025": { months: { ... } } // anos arquivados após reinício anual
//   }
// }
//
// Cada "dadosDoMes" tem o formato definido em createEmptyMonth()

const STORAGE_KEY = 'financa-facil:data'

export const CATEGORIAS = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Saúde',
  'Compras',
  'Outros',
]

export const FORMAS_PAGAMENTO = [
  'Dinheiro',
  'Débito',
  'Crédito',
  'Pix',
  'Boleto',
]

export const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

export const ROTINA_PADRAO = [
  { id: 'revisar-gastos', label: 'Revisar gastos do mês' },
  { id: 'atualizar-orcamento', label: 'Atualizar orçamento' },
  { id: 'pagar-cartao', label: 'Pagar fatura do cartão' },
  { id: 'guardar-reserva', label: 'Guardar valor na reserva de emergência' },
]

function createEmptyMonth() {
  return {
    raioX: {
      rendaMensal: 0,
      gastosFixos: 0,
      dividas: 0,
    },
    gastosVariaveis: [], // { id, data, descricao, categoria, valor, formaPagamento }
    cartao: {
      limite: 0,
      valorFatura: 0,
      parcelas: 0,
    },
    ajustes: {
      metaEconomia: 0,
      cortes: [], // { id, descricao, valorAntes, valorDepois }
    },
    reserva: {
      meta: 0,
      valorGuardado: 0,
    },
    rotina: ROTINA_PADRAO.map((item) => ({ ...item, feito: false })),
  }
}

function createEmptyYear() {
  return { months: {} }
}

function getDefaultData() {
  const now = new Date()
  return {
    currentYear: now.getFullYear(),
    years: {
      [now.getFullYear()]: createEmptyYear(),
    },
  }
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultData()
    const parsed = JSON.parse(raw)
    if (!parsed.years || !parsed.currentYear) return getDefaultData()
    return parsed
  } catch (e) {
    console.error('Erro ao carregar dados:', e)
    return getDefaultData()
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Erro ao salvar dados:', e)
  }
}

export function getMonthData(data, year, monthIndex) {
  const yearData = data.years[year]
  if (!yearData) return createEmptyMonth()
  const monthData = yearData.months[monthIndex]
  if (!monthData) return createEmptyMonth()
  // Garante compatibilidade com versões anteriores (merge com estrutura padrão)
  const empty = createEmptyMonth()
  return {
    raioX: { ...empty.raioX, ...monthData.raioX },
    gastosVariaveis: monthData.gastosVariaveis || [],
    cartao: { ...empty.cartao, ...monthData.cartao },
    ajustes: {
      metaEconomia: monthData.ajustes?.metaEconomia ?? 0,
      cortes: monthData.ajustes?.cortes || [],
    },
    reserva: { ...empty.reserva, ...monthData.reserva },
    rotina: monthData.rotina || empty.rotina,
  }
}

export function setMonthData(data, year, monthIndex, monthData) {
  const newData = { ...data, years: { ...data.years } }
  if (!newData.years[year]) {
    newData.years[year] = createEmptyYear()
  } else {
    newData.years[year] = { ...newData.years[year], months: { ...newData.years[year].months } }
  }
  newData.years[year].months[monthIndex] = monthData
  return newData
}

export function startNewYearCycle(data) {
  // Mantém o histórico (ano antigo permanece em data.years),
  // apenas avança o ano corrente para um novo ano vazio.
  const nextYear = data.currentYear + 1
  const newData = { ...data, years: { ...data.years } }
  if (!newData.years[nextYear]) {
    newData.years[nextYear] = createEmptyYear()
  }
  newData.currentYear = nextYear
  return newData
}

export function getAvailableYears(data) {
  return Object.keys(data.years)
    .map((y) => parseInt(y, 10))
    .sort((a, b) => b - a)
}

export { createEmptyMonth }
