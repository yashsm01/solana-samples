'use client'

import React, { useState, useEffect } from 'react'
import { Send, QrCode, Copy, ArrowDown, CheckCircle, AlertCircle, Zap } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useProgram } from '@/hooks/useProgram'

export function CustomTransfer() {
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send')
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<number>(0)
  const [isSending, setIsSending] = useState(false)

  const { sendSOL, checkBalance } = useProgram()

  // Check wallet connection
  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window !== 'undefined' && (window as any).solana) {
        try {
          const response = await (window as any).solana.connect({ onlyIfTrusted: true })
          if (response.publicKey) {
            setIsConnected(true)
            setWalletAddress(response.publicKey.toString())
            const bal = await checkBalance(response.publicKey.toString())
            setBalance(bal)
          }
        } catch (error) {
          // Not connected
        }
      }
    }

    checkWallet()
  }, [checkBalance])

  const connectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).solana) {
        const response = await (window as any).solana.connect()
        setIsConnected(true)
        setWalletAddress(response.publicKey.toString())
        const bal = await checkBalance(response.publicKey.toString())
        setBalance(bal)
        toast.success('Wallet connected!')
      } else {
        toast.error('Please install Phantom wallet')
      }
    } catch (error) {
      toast.error('Failed to connect wallet')
    }
  }

  const validateAddress = (address: string) => {
    // Basic Solana address validation (base58, 32-44 characters)
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
    return base58Regex.test(address)
  }

  const handleSend = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    if (!recipient || !amount) {
      toast.error('Please enter recipient address and amount')
      return
    }

    if (!validateAddress(recipient)) {
      toast.error('Invalid recipient address')
      return
    }

    const sendAmount = parseFloat(amount)
    if (sendAmount <= 0 || sendAmount > balance) {
      toast.error('Invalid amount')
      return
    }

    setIsSending(true)

    try {
      const signature = await sendSOL(recipient, sendAmount)

      console.log('🎉 Transfer successful! Signature:', signature)

      // Reset form
      setRecipient('')
      setAmount('')

      // Refresh balance
      if (walletAddress) {
        const newBalance = await checkBalance(walletAddress)
        setBalance(newBalance)
      }

      // Success message with explorer link
      toast.success(
        <div>
          <div>✅ Custom Program Transfer Successful!</div>
          <div className="text-xs mt-1">
            <a
              href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 underline"
            >
              View on Solana Explorer 🔗
            </a>
          </div>
        </div>,
        { duration: 8000 }
      )

    } catch (error) {
      console.error('❌ Transfer failed:', error)
      // Error already handled in useProgram hook
    } finally {
      setIsSending(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Address copied to clipboard!')
  }

  const generateQRCodeURL = (address: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${address}`
  }

  return (
    <div className="bg-dark-100 border border-dark-200 rounded-xl p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Zap className="h-6 w-6 text-purple-400" />
          Custom Transfer
        </h2>
        <div className="bg-purple-600/20 px-3 py-1 rounded-full">
          <span className="text-purple-300 text-sm font-medium">Using Custom Program</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-dark-200 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('send')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'send'
            ? 'bg-purple-600 text-white'
            : 'text-gray-400 hover:text-white'
            }`}
        >
          Send SOL
        </button>
        <button
          onClick={() => setActiveTab('receive')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'receive'
            ? 'bg-purple-600 text-white'
            : 'text-gray-400 hover:text-white'
            }`}
        >
          Receive SOL
        </button>
      </div>

      {!isConnected ? (
        <div className="text-center py-8">
          <div className="bg-dark-200 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Send className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Connect Wallet</h3>
          <p className="text-gray-400 mb-4">
            Connect your Solana wallet to use the custom transfer program
          </p>
          <button
            onClick={connectWallet}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <>
          {/* Wallet Info */}
          <div className="bg-dark-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Wallet Address</span>
              <button
                onClick={() => copyToClipboard(walletAddress || '')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Copy size={14} />
              </button>
            </div>
            <div className="font-mono text-white text-sm mb-3">
              {walletAddress ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-8)}` : ''}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Balance</span>
              <span className="text-white font-medium">{balance.toFixed(4)} SOL</span>
            </div>
          </div>

          {activeTab === 'send' ? (
            <div className="space-y-4">
              {/* Recipient Address */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Enter Solana address"
                  className="w-full bg-dark-200 border border-dark-300 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (SOL)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.001"
                    className="w-full bg-dark-200 border border-dark-300 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setAmount((balance * 0.9).toFixed(6))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 text-sm font-medium"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={isSending || !recipient || !amount}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send via Custom Program
                  </>
                )}
              </button>

              {/* Program Info */}
              <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-purple-400" />
                  <span className="text-purple-300 text-sm font-medium">Custom Program Active</span>
                </div>
                <p className="text-purple-200 text-xs">
                  Using your deployed Solana program for SOL transfers
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* QR Code */}
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 inline-block mb-4">
                  <img
                    src={generateQRCodeURL(walletAddress || '')}
                    alt="Wallet QR Code"
                    className="w-48 h-48"
                  />
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Scan this QR code or share your address to receive SOL
                </p>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Address
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={walletAddress || ''}
                    readOnly
                    className="flex-1 bg-dark-200 border border-dark-300 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none"
                  />
                  <button
                    onClick={() => copyToClipboard(walletAddress || '')}
                    className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
