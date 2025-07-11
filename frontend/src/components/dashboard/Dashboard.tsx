'use client'

import React from 'react'
import { TrendingUp, DollarSign, Activity, Wallet } from 'lucide-react'

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="text-sm text-gray-400">
          Welcome to Solana Trading Platform
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-100 border border-dark-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Portfolio Value</p>
              <p className="text-2xl font-bold text-white">$0.00</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-dark-100 border border-dark-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">SOL Balance</p>
              <p className="text-2xl font-bold text-white">0.0000</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Wallet className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-dark-100 border border-dark-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">24h P&L</p>
              <p className="text-2xl font-bold text-white">$0.00</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-dark-100 border border-dark-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Trades</p>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Activity className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-dark-100 border border-dark-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors text-left">
            <h3 className="font-medium text-white mb-2">Transfer SOL</h3>
            <p className="text-sm text-gray-400">Send or receive SOL tokens</p>
          </button>
          <button className="p-4 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors text-left">
            <h3 className="font-medium text-white mb-2">Swap Tokens</h3>
            <p className="text-sm text-gray-400">Exchange tokens instantly</p>
          </button>
          <button className="p-4 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors text-left">
            <h3 className="font-medium text-white mb-2">Trading View</h3>
            <p className="text-sm text-gray-400">Advanced charts & analysis</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-dark-100 border border-dark-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="text-center py-8">
          <Activity className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No recent activity</p>
          <p className="text-sm text-gray-500 mt-2">Connect your wallet to start trading</p>
        </div>
      </div>
    </div>
  )
}
