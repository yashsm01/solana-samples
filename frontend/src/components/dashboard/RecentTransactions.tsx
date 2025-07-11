'use client'

import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react'

const MOCK_TRANSACTIONS = [
  {
    id: '1',
    type: 'send',
    amount: 1.5,
    symbol: 'SOL',
    to: '7xKXt...9dF2',
    timestamp: '2 min ago',
    status: 'confirmed'
  },
  {
    id: '2',
    type: 'receive',
    amount: 0.75,
    symbol: 'SOL',
    from: '3mPq5...8kL9',
    timestamp: '5 min ago',
    status: 'confirmed'
  },
  {
    id: '3',
    type: 'swap',
    amount: 100,
    symbol: 'USDC',
    fromSymbol: 'SOL',
    fromAmount: 2.19,
    timestamp: '12 min ago',
    status: 'confirmed'
  },
  {
    id: '4',
    type: 'send',
    amount: 0.25,
    symbol: 'SOL',
    to: '9kRt2...3xM7',
    timestamp: '1 hour ago',
    status: 'confirmed'
  }
]

export function RecentTransactions() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        <button className="text-solana-400 hover:text-solana-300 text-sm">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {MOCK_TRANSACTIONS.map((tx) => (
          <div key={tx.id} className="flex items-center space-x-3 p-3 bg-dark-200 rounded-lg">
            <div className={`p-2 rounded-lg ${
              tx.type === 'send' ? 'bg-red-500/20 text-red-400' :
              tx.type === 'receive' ? 'bg-green-500/20 text-green-400' :
              'bg-blue-500/20 text-blue-400'
            }`}>
              {tx.type === 'send' ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : tx.type === 'receive' ? (
                <ArrowDownLeft className="h-4 w-4" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-white font-medium capitalize">{tx.type}</p>
                <p className="text-white font-medium">
                  {tx.type === 'send' ? '-' : '+'}
                  {tx.amount} {tx.symbol}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-dark-400 text-sm">
                  {tx.type === 'send' ? `to ${tx.to}` :
                   tx.type === 'receive' ? `from ${tx.from}` :
                   `${tx.fromAmount} ${tx.fromSymbol}`}
                </p>
                <p className="text-dark-400 text-sm">{tx.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {MOCK_TRANSACTIONS.length === 0 && (
        <div className="text-center py-8">
          <Clock className="h-16 w-16 text-dark-400 mx-auto mb-4" />
          <p className="text-dark-400">No recent transactions</p>
        </div>
      )}
    </div>
  )
}
