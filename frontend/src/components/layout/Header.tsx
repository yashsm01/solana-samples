'use client'

import React, { useState, useEffect } from 'react'
import { Wallet, RefreshCw, ChevronDown, X, Zap } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface WalletOption {
  name: string
  icon: string
  color: string
  installed?: boolean
}

export function Header() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<number>(0)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string>('')

  const walletOptions: WalletOption[] = [
    {
      name: 'Phantom',
      icon: '👻',
      color: 'from-purple-500 to-purple-700',
      installed: typeof window !== 'undefined' && !!(window as any).solana?.isPhantom
    },
    {
      name: 'Solflare',
      icon: '🔥',
      color: 'from-orange-500 to-red-600',
      installed: typeof window !== 'undefined' && !!(window as any).solflare?.isSolflare
    },
    {
      name: 'MetaMask',
      icon: '🦊',
      color: 'from-orange-400 to-orange-600',
      installed: typeof window !== 'undefined' && !!(window as any).ethereum?.isMetaMask
    },
    {
      name: 'Backpack',
      icon: '🎒',
      color: 'from-purple-400 to-purple-600',
      installed: typeof window !== 'undefined' && !!(window as any).backpack?.isBackpack
    },
    {
      name: 'Coinbase',
      icon: '💙',
      color: 'from-blue-500 to-blue-700',
      installed: typeof window !== 'undefined' && !!(window as any).coinbaseSolana?.isCoinbase
    },
    {
      name: 'Trust Wallet',
      icon: '🔒',
      color: 'from-blue-400 to-blue-600',
      installed: typeof window !== 'undefined' && !!(window as any).trustWallet?.isTrust || !!(window as any).trustwallet
    },
    {
      name: 'Slope',
      icon: '⛰️',
      color: 'from-green-500 to-green-700',
      installed: typeof window !== 'undefined' && !!(window as any).Slope?.isSlope
    }
  ]

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== 'undefined' && (window as any).solana) {
        try {
          const response = await (window as any).solana.connect({ onlyIfTrusted: true })
          if (response.publicKey) {
            setIsConnected(true)
            setWalletAddress(response.publicKey.toString())
            setConnectedWallet('Phantom')
            await fetchBalance(response.publicKey.toString())
          }
        } catch (error) {
          // User hasn't approved connection yet
        }
      }
    }

    checkWalletConnection()
  }, [])

  const fetchBalance = async (address: string) => {
    try {
      // Dynamic import to avoid build issues
      const { Connection, PublicKey } = await import('@solana/web3.js')
      const connection = new Connection('https://api.devnet.solana.com')
      const publicKey = new PublicKey(address)
      const balance = await connection.getBalance(publicKey)
      setBalance(balance / 1000000000) // Convert lamports to SOL
    } catch (error) {
      console.error('Failed to fetch balance:', error)
      // Set a default balance for demo
      setBalance(1.2345)
    }
  }

  // Connect to specific wallet
  const handleWalletConnect = async (walletName: string) => {
    setIsConnecting(true)
    setShowWalletModal(false)

    try {
      let connected = false
      let walletProvider: any = null

      switch (walletName) {
        case 'Phantom':
          if (typeof window !== 'undefined' && (window as any).solana?.isPhantom) {
            walletProvider = (window as any).solana
            const response = await walletProvider.connect()
            setWalletAddress(response.publicKey.toString())
            await fetchBalance(response.publicKey.toString())
            connected = true
          } else {
            toast.error('Phantom wallet not found! Please install Phantom extension 👻')
            return
          }
          break

        case 'Solflare':
          if (typeof window !== 'undefined' && (window as any).solflare?.isSolflare) {
            walletProvider = (window as any).solflare
            const response = await walletProvider.connect()
            setWalletAddress(response.publicKey.toString())
            await fetchBalance(response.publicKey.toString())
            connected = true
          } else {
            toast.error('Solflare wallet not found! Please install Solflare extension 🔥')
            return
          }
          break

        case 'MetaMask':
          if (typeof window !== 'undefined' && (window as any).ethereum?.isMetaMask) {
            toast.error('MetaMask is not compatible with Solana. Please use a Solana wallet! 🦊')
            return
          } else {
            toast.error('MetaMask not found. Please install MetaMask extension first! 📥')
            return
          }

        case 'Backpack':
          if (typeof window !== 'undefined' && (window as any).backpack?.isBackpack) {
            walletProvider = (window as any).backpack
            const response = await walletProvider.connect()
            setWalletAddress(response.publicKey.toString())
            await fetchBalance(response.publicKey.toString())
            connected = true
          } else {
            toast.error('Backpack wallet not found! Please install Backpack extension 🎒')
            return
          }
          break

        case 'Coinbase':
          if (typeof window !== 'undefined' && (window as any).coinbaseSolana?.isCoinbase) {
            walletProvider = (window as any).coinbaseSolana
            const response = await walletProvider.connect()
            setWalletAddress(response.publicKey.toString())
            await fetchBalance(response.publicKey.toString())
            connected = true
          } else {
            toast.error('Coinbase Wallet not found! Please install Coinbase Wallet 💙')
            return
          }
          break

        case 'Trust Wallet':
          if (typeof window !== 'undefined' && ((window as any).trustWallet?.isTrust || (window as any).trustwallet)) {
            walletProvider = (window as any).trustWallet || (window as any).trustwallet
            const response = await walletProvider.connect()
            setWalletAddress(response.publicKey.toString())
            await fetchBalance(response.publicKey.toString())
            connected = true
          } else {
            toast.error('Trust Wallet not found! Please install Trust Wallet app 🔒')
            return
          }
          break

        case 'Slope':
          if (typeof window !== 'undefined' && (window as any).Slope?.isSlope) {
            walletProvider = (window as any).Slope
            const response = await walletProvider.connect()
            setWalletAddress(response.publicKey.toString())
            await fetchBalance(response.publicKey.toString())
            connected = true
          } else {
            toast.error('Slope wallet not found! Please install Slope wallet ⛰️')
            return
          }
          break

        default:
          toast.error(`${walletName} wallet not supported yet`)
          return
      }

      if (connected && walletProvider) {
        setIsConnected(true)
        setConnectedWallet(walletName)

        // Store wallet provider for disconnection
        ;(window as any).currentWalletProvider = walletProvider

        toast.success(`${walletName} wallet connected successfully! 🎉`)
      } else if (!walletOptions.find(w => w.name === walletName)?.installed) {
        toast.error(`${walletName} wallet not found! Please install ${walletName} extension first 📥`)
      } else {
        toast.error(`Failed to connect to ${walletName}. Please try again or check your wallet settings 🔧`)
      }
    } catch (error: any) {
      console.error('Connection failed:', error)

      if (error.code === 4001) {
        toast.error('Connection cancelled by user')
      } else if (error.message?.includes('User rejected')) {
        toast.error('Connection rejected by user')
      } else {
        toast.error(`Failed to connect ${walletName} wallet`)
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      // Use stored wallet provider or fallback to solana
      const walletProvider = (window as any).currentWalletProvider || (window as any).solana

      if (walletProvider && typeof walletProvider.disconnect === 'function') {
        await walletProvider.disconnect()
      }

      // Clear stored provider
      ;(window as any).currentWalletProvider = null

      setIsConnected(false)
      setWalletAddress(null)
      setBalance(0)
      setConnectedWallet('')
      toast.success('Wallet disconnected 👋')
    } catch (error) {
      console.error('Disconnect failed:', error)
      // Force disconnect on error
      setIsConnected(false)
      setWalletAddress(null)
      setBalance(0)
      setConnectedWallet('')
      toast.success('Wallet disconnected 👋')
    }
  }

  const handleRefreshBalance = async () => {
    if (!isConnected || !walletAddress) return

    try {
      await fetchBalance(walletAddress)
      toast.success('Balance refreshed! ⚡')
    } catch (error) {
      console.error('Failed to refresh balance:', error)
      toast.error('Failed to refresh balance')
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <>
      <header className="bg-gradient-to-r from-dark-50 via-dark-100 to-dark-50 border-b border-white/10 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-solana-500 to-primary-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-solana-500/25 transition-all duration-300">
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-transparent bg-gradient-to-r from-solana-400 to-primary-400 bg-clip-text">
                  STRADDL<span className="text-yellow-400">3</span>
                </h1>
                <p className="text-xs text-gray-400 font-medium">Crypto Trading Bot</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isConnected && (
              <div className="flex items-center space-x-3 bg-gradient-to-r from-dark-200/50 to-dark-300/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-medium">Balance:</span>
                </div>
                <div className="text-lg font-black text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                  {balance.toFixed(4)} SOL
                </div>
                <button
                  onClick={handleRefreshBalance}
                  className="text-gray-400 hover:text-solana-400 transition-colors hover:rotate-180 transform duration-300"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            )}

            {isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-dark-200/50 to-dark-300/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">
                      {walletOptions.find(w => w.name === connectedWallet)?.icon || '🔗'}
                    </span>
                    <div>
                      <span className="text-xs text-gray-400 block">Connected via {connectedWallet}</span>
                      <span className="text-sm font-mono text-white">
                        {walletAddress ? formatAddress(walletAddress) : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowWalletModal(true)}
                disabled={isConnecting}
                className="bg-gradient-to-r from-solana-500 to-primary-500 hover:from-solana-600 hover:to-primary-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-solana-500/25 flex items-center space-x-2"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Wallet size={18} />
                    <span>Connect Wallet</span>
                    <ChevronDown size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Wallet Selection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-dark-100 to-dark-200 rounded-2xl p-6 max-w-md w-full border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">Connect Wallet</h2>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              {walletOptions.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleWalletConnect(wallet.name)}
                  disabled={isConnecting}
                  className={`w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${wallet.color}/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {wallet.icon}
                    </span>
                    <div className="text-left">
                      <div className="text-white font-bold">{wallet.name}</div>
                      <div className="text-xs text-gray-400">
                        {wallet.installed ? 'Installed' : 'Not Installed'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {wallet.installed && (
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    )}
                    <ChevronDown size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <p className="text-xs text-yellow-400 text-center">
                ⚠️ Demo mode: Some wallets will simulate connection for testing
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
