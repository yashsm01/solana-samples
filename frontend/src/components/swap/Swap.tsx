'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUpDown, Settings, RefreshCw, AlertTriangle, TrendingUp } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Token {
  symbol: string
  name: string
  mint: string
  decimals: number
  logoURI: string
  price: number
}

const POPULAR_TOKENS: Token[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    mint: 'So11111111111111111111111111111111111111112',
    decimals: 9,
    logoURI: '/tokens/sol.png',
    price: 23.45
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6,
    logoURI: '/tokens/usdc.png',
    price: 1.00
  },
  {
    symbol: 'RAY',
    name: 'Raydium',
    mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    decimals: 6,
    logoURI: '/tokens/ray.png',
    price: 0.85
  },
  {
    symbol: 'SRM',
    name: 'Serum',
    mint: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt',
    decimals: 6,
    logoURI: '/tokens/srm.png',
    price: 0.12
  }
]

export function Swap() {
  const [fromToken, setFromToken] = useState<Token>(POPULAR_TOKENS[0])
  const [toToken, setToToken] = useState<Token>(POPULAR_TOKENS[1])
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState(0.5)
  const [showSettings, setShowSettings] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [route, setRoute] = useState<any>(null)

  // Calculate exchange rate
  const exchangeRate = fromToken && toToken ? toToken.price / fromToken.price : 0

  // Update toAmount when fromAmount changes
  useEffect(() => {
    if (fromAmount && exchangeRate) {
      const calculated = (parseFloat(fromAmount) * exchangeRate).toFixed(6)
      setToAmount(calculated)
    } else {
      setToAmount('')
    }
  }, [fromAmount, exchangeRate])

  const handleSwapTokens = () => {
    const tempToken = fromToken
    const tempAmount = fromAmount

    setFromToken(toToken)
    setToToken(tempToken)
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    setIsLoading(true)
    try {
      // Simulate swap transaction
      await new Promise(resolve => setTimeout(resolve, 3000))
      toast.success('Swap completed successfully!')
      setFromAmount('')
      setToAmount('')
    } catch (error) {
      toast.error('Swap failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return price < 0.01 ? price.toFixed(6) : price.toFixed(2)
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Swap</h1>
        <p className="text-gray-400">Trade tokens instantly</p>
      </div>

      <div className="bg-dark-100 border border-dark-200 rounded-lg p-6">
        {/* Settings Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Swap Tokens</h2>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-400 hover:text-white hover:bg-dark-200 rounded-lg transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-dark-200 rounded-lg p-4 mb-6">
            <h3 className="text-white font-medium mb-3">Swap Settings</h3>
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Slippage Tolerance
              </label>
              <div className="flex space-x-2">
                {[0.1, 0.5, 1.0].map((value) => (
                  <button
                    key={value}
                    onClick={() => setSlippage(value)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      slippage === value
                        ? 'bg-purple-600 text-white'
                        : 'bg-dark-300 text-gray-400 hover:text-white'
                    }`}
                  >
                    {value}%
                  </button>
                ))}
                <input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(parseFloat(e.target.value) || 0.5)}
                  className="w-20 px-2 py-1 bg-dark-300 border border-dark-400 rounded text-white text-sm"
                  step="0.1"
                  min="0.1"
                  max="50"
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {/* From Token */}
          <div className="bg-dark-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">From</span>
              <span className="text-sm text-gray-400">Balance: 0.00</span>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={fromToken.symbol}
                onChange={(e) => {
                  const token = POPULAR_TOKENS.find(t => t.symbol === e.target.value)
                  if (token) setFromToken(token)
                }}
                className="bg-dark-300 border border-dark-400 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {POPULAR_TOKENS.map(token => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent text-white text-right text-lg font-medium focus:outline-none"
              />
            </div>
            <div className="text-right text-sm text-gray-400 mt-1">
              ${fromAmount ? (parseFloat(fromAmount) * fromToken.price).toFixed(2) : '0.00'}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwapTokens}
              className="p-2 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors"
            >
              <ArrowUpDown size={20} className="text-gray-400" />
            </button>
          </div>

          {/* To Token */}
          <div className="bg-dark-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">To</span>
              <span className="text-sm text-gray-400">Balance: 0.00</span>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={toToken.symbol}
                onChange={(e) => {
                  const token = POPULAR_TOKENS.find(t => t.symbol === e.target.value)
                  if (token) setToToken(token)
                }}
                className="bg-dark-300 border border-dark-400 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {POPULAR_TOKENS.map(token => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={toAmount}
                readOnly
                placeholder="0.00"
                className="flex-1 bg-transparent text-white text-right text-lg font-medium"
              />
            </div>
            <div className="text-right text-sm text-gray-400 mt-1">
              ${toAmount ? (parseFloat(toAmount) * toToken.price).toFixed(2) : '0.00'}
            </div>
          </div>

          {/* Exchange Rate */}
          {fromAmount && toAmount && (
            <div className="bg-dark-200 rounded-lg p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Rate</span>
                <span className="text-white">
                  1 {fromToken.symbol} = {exchangeRate.toFixed(6)} {toToken.symbol}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-400">Price Impact</span>
                <span className="text-green-500">{'<0.01%'}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-400">Network Fee</span>
                <span className="text-white">~0.000005 SOL</span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={isLoading || !fromAmount || parseFloat(fromAmount) <= 0}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Swapping...</span>
              </>
            ) : (
              <>
                <ArrowUpDown size={16} />
                <span>Swap</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Popular Tokens */}
      <div className="bg-dark-100 border border-dark-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Popular Tokens</h3>
        <div className="grid grid-cols-2 gap-3">
          {POPULAR_TOKENS.map((token) => (
            <div
              key={token.symbol}
              className="bg-dark-200 hover:bg-dark-300 rounded-lg p-3 cursor-pointer transition-colors"
              onClick={() => {
                if (fromToken.symbol !== token.symbol) {
                  setFromToken(token)
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">{token.symbol}</div>
                  <div className="text-sm text-gray-400">{token.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-white">${formatPrice(token.price)}</div>
                  <div className="text-xs text-green-500 flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    +2.3%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
