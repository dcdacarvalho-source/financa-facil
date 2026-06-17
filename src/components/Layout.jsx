// src/components/Layout.jsx
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import MonthSelector from './MonthSelector'
import { useTheme } from '../context/ThemeContext'

export default function Layout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header mobile */}
        <header className="sm:hidden sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💰</span>
            <h1 className="font-bold text-slate-800 dark:text-slate-100">Finança Fácil</h1>
          </div>
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-lg"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </header>

        <main className="flex-1 px-4 sm:px-6 py-4 sm:py-6 max-w-4xl w-full mx-auto pb-24 sm:pb-10">
          <div className="mb-4">
            <MonthSelector />
          </div>
          <Outlet />
        </main>

        <BottomNav />
      </div>
    </div>
  )
}
