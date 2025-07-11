'use client'

import React from 'react'
import { Home, Send, ArrowUpDown, BarChart3, Rocket, Zap, LucideIcon } from 'lucide-react'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

interface MenuItem {
  id: string
  label: string
  icon: LucideIcon
  emoji: string
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const menuItems: MenuItem[] = [
    { id: 'landing', label: 'Landing', icon: Rocket, emoji: '🚀' },
    { id: 'dashboard', label: 'Dashboard', icon: Home, emoji: '🏠' },
    { id: 'transfer', label: 'Transfer', icon: Send, emoji: '💸' },
    { id: 'custom-transfer', label: 'Custom Transfer', icon: Zap, emoji: '⚡' },
    { id: 'swap', label: 'Swap', icon: ArrowUpDown, emoji: '🔄' },
    { id: 'trading', label: 'Trading', icon: BarChart3, emoji: '📊' },
  ]

  return (
    <aside className="w-64 bg-gradient-to-b from-dark-50 to-dark-100 border-r border-white/10 min-h-screen backdrop-blur-sm transition-all duration-500 ease-in-out">
      <div className="p-6">
        {/* Navigation */}
        <nav className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-500 ease-out transform group relative overflow-hidden ${isActive
                  ? 'bg-gradient-to-r from-solana-500/30 to-primary-500/30 text-white border border-solana-500/40 shadow-xl shadow-solana-500/20 scale-105'
                  : 'text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:to-white/15 hover:border hover:border-white/20 hover:scale-105 hover:shadow-lg'
                  }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Background animation */}
                <div className={`absolute inset-0 bg-gradient-to-r from-solana-400/0 to-primary-400/0 group-hover:from-solana-400/10 group-hover:to-primary-400/10 transition-all duration-700 ease-out ${isActive ? 'from-solana-400/20 to-primary-400/20' : ''}`} />

                <div className="flex items-center space-x-4 relative z-10">
                  <div className="relative">
                    <span className={`text-2xl transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-12 ${isActive ? 'scale-110' : ''}`}>
                      {item.emoji}
                    </span>
                    {isActive && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-solana-400 to-primary-400 rounded-full opacity-30 animate-pulse" />
                    )}
                  </div>
                  <span className={`font-bold transition-all duration-300 ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                    {item.label}
                  </span>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="flex items-center space-x-2 relative z-10">
                    <div className="w-2 h-2 bg-gradient-to-r from-solana-400 to-primary-400 rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-yellow-400 rounded-full animate-ping" />
                  </div>
                )}

                {/* Hover effect */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-solana-400 to-primary-400 group-hover:h-full transition-all duration-500 rounded-l-full" />
              </button>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-12 p-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 backdrop-blur-sm transition-all duration-500 hover:from-yellow-500/20 hover:to-orange-500/20 hover:border-yellow-500/40 hover:scale-105">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-xl animate-bounce">🎯</span>
            </div>
            <p className="text-xs text-yellow-400 font-bold mb-2">Pro Tip</p>
            <p className="text-xs text-gray-300 leading-relaxed">
              Connect your wallet to start trading with AI-powered strategies!
            </p>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-4 w-32 h-32 bg-solana-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-4 w-24 h-24 bg-primary-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </aside>
  )
}
