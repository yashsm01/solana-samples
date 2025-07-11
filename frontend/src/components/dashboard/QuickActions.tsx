'use client'

import { Send, ArrowUpDown, TrendingUp, Plus } from 'lucide-react'

export function QuickActions() {
  const actions = [
    {
      icon: Send,
      label: 'Send',
      description: 'Transfer SOL',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: ArrowUpDown,
      label: 'Swap',
      description: 'Exchange tokens',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      label: 'Trade',
      description: 'Open chart',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Plus,
      label: 'Add Token',
      description: 'Import token',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <button
              key={index}
              className="flex flex-col items-center p-4 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors group"
            >
              <div className={`bg-gradient-to-r ${action.color} p-3 rounded-lg mb-2 group-hover:scale-105 transition-transform`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-medium text-sm">{action.label}</span>
              <span className="text-dark-400 text-xs">{action.description}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
