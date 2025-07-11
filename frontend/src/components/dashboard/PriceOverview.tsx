'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'

const MOCK_PRICES = [
  { symbol: 'SOL', price: 45.67, change: 2.45, volume: '1.2B' },
  { symbol: 'RAY', price: 0.235, change: -1.23, volume: '45.6M' },
  { symbol: 'SRM', price: 0.087, change: 5.67, volume: '23.4M' },
  { symbol: 'USDC', price: 1.000, change: 0.01, volume: '2.3B' },
]

export function PriceOverview() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-white mb-4">Price Overview</h3>
      <div className="space-y-3">
        {MOCK_PRICES.map((token) => (
          <div key={token.symbol} className="flex items-center justify-between p-3 bg-dark-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-solana-500 to-solana-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {token.symbol.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-white font-medium">{token.symbol}</p>
                <p className="text-dark-400 text-sm">Vol: {token.volume}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-medium">${token.price.toFixed(3)}</p>
              <div className={`flex items-center space-x-1 text-sm ${
                token.change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {token.change >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{token.change >= 0 ? '+' : ''}{token.change.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
