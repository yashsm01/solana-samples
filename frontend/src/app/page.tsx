'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { Transfer } from '@/components/transfer/Transfer'
import { CustomTransfer } from '@/components/transfer/CustomTransfer'
import { Swap } from '@/components/swap/Swap'
import { TradingChart } from '@/components/trading/TradingChart'
import { LandingPage } from '@/components/landing/LandingPage'

type PageType = 'landing' | 'dashboard' | 'transfer' | 'custom-transfer' | 'swap' | 'trading'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing')

  const renderContent = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />
      case 'dashboard':
        return <Dashboard />
      case 'transfer':
        return <Transfer />
      case 'custom-transfer':
        return <CustomTransfer />
      case 'swap':
        return <Swap />
      case 'trading':
        return <TradingChart />
      default:
        return <LandingPage />
    }
  }

  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen">
        <LandingPage />
        {/* Navigation overlay for landing page */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="px-6 py-2 bg-solana-600 hover:bg-solana-700 text-white font-bold rounded-lg transition-colors duration-200"
          >
            Enter App →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-50">
      <Header />
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={(page) => setCurrentPage(page as PageType)} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
