'use client'

import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-hot-toast'

interface SolanaWalletContextType {
  balance: number | null
  isLoading: boolean
  refreshBalance: () => Promise<void>
  formatBalance: (lamports: number) => string
  formatAddress: (address: string) => string
  connected: boolean
  publicKey: string | null
}

const SolanaWalletContext = createContext<SolanaWalletContextType | undefined>(undefined)

interface SolanaWalletProviderProps {
  children: React.ReactNode
}

export function SolanaWalletProvider({ children }: SolanaWalletProviderProps) {
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [connected] = useState(false)
  const [publicKey] = useState<string | null>(null)

  const refreshBalance = async () => {
    setIsLoading(true)
    try {
      // Mock balance for now - will implement actual wallet connection later
      setBalance(0)
    } catch (error) {
      console.error('Error fetching balance:', error)
      toast.error('Failed to fetch wallet balance')
      setBalance(null)
    } finally {
      setIsLoading(false)
    }
  }

  const formatBalance = (lamports: number): string => {
    return (lamports / 1000000000).toFixed(4) // LAMPORTS_PER_SOL = 1000000000
  }

  const formatAddress = (address: string): string => {
    if (address.length < 8) return address
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const value: SolanaWalletContextType = {
    balance,
    isLoading,
    refreshBalance,
    formatBalance,
    formatAddress,
    connected,
    publicKey,
  }

  return (
    <SolanaWalletContext.Provider value={value}>
      {children}
    </SolanaWalletContext.Provider>
  )
}

export function useSolanaWallet() {
  const context = useContext(SolanaWalletContext)
  if (context === undefined) {
    throw new Error('useSolanaWallet must be used within a SolanaWalletProvider')
  }
  return context
}
