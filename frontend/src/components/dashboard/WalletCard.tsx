'use client'

import React from 'react'
import { Wallet, Copy, ExternalLink, RefreshCw } from 'lucide-react'
import { toast } from 'react-hot-toast'

export function WalletCard() {
  const isConnected = false // Mock connection state
  const balance = 0 // Mock balance

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('Mock-Wallet-Address')
    toast.success('Address copied to clipboard!')
  }

  const handleRefreshBalance = () => {
    toast.success('Balance refreshed!')
  }

  return (
    <div className="bg-dark-100 border border-dark-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Wallet</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefreshBalance}
            className="p-2 text-gray-400 hover:text-white hover:bg-dark-200 rounded-lg transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {isConnected ? (
        <div className="space-y-4">
          {/* Wallet Address */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Wallet Address</label>
            <div className="flex items-center space-x-2 bg-dark-200 rounded-lg p-3">
              <span className="flex-1 font-mono text-sm text-white">
                Mock-Wallet-Address...
              </span>
              <button
                onClick={handleCopyAddress}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <Copy size={14} />
              </button>
              <button className="p-1 text-gray-400 hover:text-white transition-colors">
                <ExternalLink size={14} />
              </button>
            </div>
          </div>

          {/* Balance */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">SOL Balance</label>
            <div className="bg-dark-200 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">
                {balance.toFixed(4)} SOL
              </div>
              <div className="text-sm text-gray-400">
                ≈ ${(balance * 23.45).toFixed(2)} USD
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              Send
            </button>
            <button className="bg-dark-200 hover:bg-dark-300 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              Receive
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Wallet className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-white mb-2">No Wallet Connected</h4>
          <p className="text-gray-400 mb-4">
            Connect your Solana wallet to view balance and manage transactions
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  )
}
