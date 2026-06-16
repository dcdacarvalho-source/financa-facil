// src/context/FinanceContext.jsx
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import {
  loadData,
  saveData,
  getMonthData,
  setMonthData,
  startNewYearCycle,
  getAvailableYears,
} from '../storage/storage'

const FinanceContext = createContext(null)

export function FinanceProvider({ children }) {
  const [data, setData] = useState(() => loadData())
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().getMonth())

  useEffect(() => {
    saveData(data)
  }, [data])

  const currentYear = data.currentYear

  const monthData = useMemo(
    () => getMonthData(data, currentYear, selectedMonth),
    [data, currentYear, selectedMonth]
  )

  const updateMonthData = useCallback(
    (updater) => {
      setData((prev) => {
        const current = getMonthData(prev, prev.currentYear, selectedMonth)
        const updated = typeof updater === 'function' ? updater(current) : updater
        return setMonthData(prev, prev.currentYear, selectedMonth, updated)
      })
    },
    [selectedMonth]
  )

  const startNewYear = useCallback(() => {
    setData((prev) => startNewYearCycle(prev))
    setSelectedMonth(0)
  }, [])

  const availableYears = useMemo(() => getAvailableYears(data), [data])

  const value = {
    data,
    currentYear,
    selectedMonth,
    setSelectedMonth,
    monthData,
    updateMonthData,
    startNewYear,
    availableYears,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const ctx = useContext(FinanceContext)
  if (!ctx) throw new Error('useFinance deve ser usado dentro de FinanceProvider')
  return ctx
}
