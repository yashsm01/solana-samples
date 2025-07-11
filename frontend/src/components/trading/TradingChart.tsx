'use client'

import React, { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  Volume2,
  Maximize2,
  Clock,
  RefreshCw
} from 'lucide-react'

interface TokenData {
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
}

const MOCK_TOKENS: TokenData[] = [
  {
    symbol: 'SOL/USDC',
    name: 'Solana',
    price: 23.45,
    change24h: 2.34,
    volume24h: 125000000,
    marketCap: 9800000000
  },
  {
    symbol: 'RAY/USDC',
    name: 'Raydium',
    price: 0.85,
    change24h: -1.23,
    volume24h: 45000000,
    marketCap: 180000000
  }
]

export function TradingChart() {
  const [selectedToken, setSelectedToken] = useState<TokenData>(MOCK_TOKENS[0])
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H')
  const [chartType, setChartType] = useState<'candlestick' | 'line'>('candlestick')
  const [showVolume, setShowVolume] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const timeframes = [
    { label: '1m', value: '1M' },
    { label: '5m', value: '5M' },
    { label: '15m', value: '15M' },
    { label: '1h', value: '1H' },
    { label: '4h', value: '4H' },
    { label: '1d', value: '1D' }
  ]

  // Format price
  const formatPrice = (price: number) => {
    return price < 1 ? price.toFixed(6) : price.toFixed(2)
  }

  // Format volume
  const formatVolume = (volume: number) => {
    if (volume > 1e9) return `${(volume / 1e9).toFixed(1)}B`
    if (volume > 1e6) return `${(volume / 1e6).toFixed(1)}M`
    if (volume > 1e3) return `${(volume / 1e3).toFixed(1)}K`
    return volume.toString()
  }

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-dark-50 p-6' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={selectedToken.symbol}
            onChange={(e) => {
              const token = MOCK_TOKENS.find(t => t.symbol === e.target.value)
              if (token) setSelectedToken(token)
            }}
            className="bg-dark-200 border border-dark-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {MOCK_TOKENS.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">
              ${formatPrice(selectedToken.price)}
            </span>
            <span className={`flex items-center space-x-1 text-sm ${
              selectedToken.change24h >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {selectedToken.change24h >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{selectedToken.change24h >= 0 ? '+' : ''}{selectedToken.change24h.toFixed(2)}%</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-400 hover:text-white hover:bg-dark-200 rounded-lg transition-colors"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Timeframe Selection */}
          <div className="flex bg-dark-200 rounded-lg p-1">
            {timeframes.map(tf => (
              <button
                key={tf.value}
                onClick={() => setSelectedTimeframe(tf.value)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  selectedTimeframe === tf.value
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>

          {/* Chart Type */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setChartType('candlestick')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'candlestick'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-200'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'line'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-200'
              }`}
            >
              <LineChart className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
              showVolume
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-dark-200'
            }`}
          >
            <Volume2 className="h-4 w-4" />
            <span>Volume</span>
          </button>
        </div>
      </div>

      {/* Chart Container - Placeholder */}
      <div className="bg-dark-100 rounded-xl p-6">
        <div className="flex items-center justify-center h-96 border-2 border-dashed border-dark-300 rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Trading Chart</h3>
            <p className="text-gray-400 mb-4">
              Advanced trading charts for {selectedToken.symbol}
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Timeframe: {selectedTimeframe}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span>Type: {chartType}</span>
              </div>
              {showVolume && (
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Volume: ON</span>
                </div>
              )}
            </div>
            <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 mx-auto">
              <RefreshCw className="h-4 w-4" />
              <span>Load Chart Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Market Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-100 border border-dark-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">24h Volume</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            ${formatVolume(selectedToken.volume24h)}
          </p>
          <p className="text-sm text-gray-400">Trading volume</p>
        </div>

        <div className="bg-dark-100 border border-dark-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Market Cap</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            ${formatVolume(selectedToken.marketCap)}
          </p>
          <p className="text-sm text-gray-400">Total market value</p>
        </div>

        <div className="bg-dark-100 border border-dark-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Last Updated</h3>
          </div>
          <p className="text-2xl font-bold text-white">Just now</p>
          <p className="text-sm text-gray-400">Real-time data</p>
        </div>
      </div>

      {/* Trading Actions */}
      <div className="bg-dark-100 border border-dark-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Quick Trading Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Buy {selectedToken.symbol}</span>
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
            <TrendingDown className="h-5 w-5" />
            <span>Sell {selectedToken.symbol}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
