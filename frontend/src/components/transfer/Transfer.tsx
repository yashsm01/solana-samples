'use client'

import React, { useState, useEffect } from 'react'
import { Send, QrCode, Copy, ArrowDown, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

export function Transfer() {
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send')
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<number>(0)
  const [isSending, setIsSending] = useState(false)

  // Check wallet connection
  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window !== 'undefined' && (window as any).solana) {
        try {
          const response = await (window as any).solana.connect({ onlyIfTrusted: true })
          if (response.publicKey) {
            setIsConnected(true)
            setWalletAddress(response.publicKey.toString())
            await fetchBalance(response.publicKey.toString())
          }
        } catch (error) {
          // Not connected
        }
      }
    }

    checkWallet()
  }, [])

  const fetchBalance = async (address: string) => {
    try {
      const { Connection, PublicKey } = await import('@solana/web3.js')
      const connection = new Connection('https://api.devnet.solana.com')
      const publicKey = new PublicKey(address)
      const balance = await connection.getBalance(publicKey)
      setBalance(balance / 1000000000)
    } catch (error) {
      console.error('Failed to fetch balance:', error)
      setBalance(1.2345) // Demo balance
    }
  }

  const connectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).solana) {
        const response = await (window as any).solana.connect()
        setIsConnected(true)
        setWalletAddress(response.publicKey.toString())
        await fetchBalance(response.publicKey.toString())
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
      if (typeof window !== 'undefined' && (window as any).solana) {
        // Real transaction with Phantom wallet
        const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } = await import('@solana/web3.js')

        const connection = new Connection('https://api.devnet.solana.com')
        const fromPubkey = new PublicKey(walletAddress!)
        const toPubkey = new PublicKey(recipient)

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports: sendAmount * LAMPORTS_PER_SOL,
          })
        )

        const { blockhash } = await connection.getRecentBlockhash()
        transaction.recentBlockhash = blockhash
        transaction.feePayer = fromPubkey

        const signedTransaction = await (window as any).solana.signTransaction(transaction)
        const signature = await connection.sendRawTransaction(signedTransaction.serialize())

        toast.success(`Transaction sent! Signature: ${signature.slice(0, 8)}...`)

        // Reset form
        setRecipient('')
        setAmount('')

        // Refresh balance
        await fetchBalance(walletAddress!)

      } else {
        // Demo mode
        await new Promise(resolve => setTimeout(resolve, 2000))
        toast.success('Demo transaction sent successfully!')
        setRecipient('')
        setAmount('')
      }

    } catch (error) {
      console.error('Transaction failed:', error)
      toast.error('Transaction failed')
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
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-dark-100 rounded-xl border border-dark-200 overflow-hidden">
        {/* Tab Header */}
        <div className="flex border-b border-dark-200">
          <button
            onClick={() => setActiveTab('send')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === 'send'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-dark-200'
            }`}
          >
            <Send size={20} className="inline mr-2" />
            Send SOL
          </button>
          <button
            onClick={() => setActiveTab('receive')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === 'receive'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-dark-200'
            }`}
          >
            <QrCode size={20} className="inline mr-2" />
            Receive SOL
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'send' ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Send SOL</h2>
                <p className="text-gray-400">Transfer SOL to another wallet</p>
              </div>

              {!isConnected ? (
                <div className="text-center py-8">
                  <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
                  <p className="text-gray-400 mb-4">Connect your wallet to send SOL</p>
                  <button
                    onClick={connectWallet}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Connect Phantom Wallet
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-dark-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Available Balance:</span>
                      <span className="text-xl font-bold text-white">{balance.toFixed(4)} SOL</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Recipient Address
                      </label>
                      <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Enter Solana address (e.g., 7x8y9z0a...)"
                        className="w-full bg-dark-200 border border-dark-300 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      {recipient && !validateAddress(recipient) && (
                        <p className="text-red-500 text-sm mt-1">Invalid Solana address format</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Amount (SOL)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          step="0.001"
                          min="0"
                          max={balance}
                          className="w-full bg-dark-200 border border-dark-300 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          onClick={() => setAmount(balance.toString())}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 text-sm font-medium"
                        >
                          MAX
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleSend}
                      disabled={isSending || !recipient || !amount || !validateAddress(recipient)}
                      className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      {isSending ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Send SOL</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Receive SOL</h2>
                <p className="text-gray-400">Share your wallet address to receive SOL</p>
              </div>

              {!isConnected ? (
                <div className="text-center py-8">
                  <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
                  <p className="text-gray-400 mb-4">Connect your wallet to get your address</p>
                  <button
                    onClick={connectWallet}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Connect Phantom Wallet
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg inline-block mb-4">
                      <img
                        src={generateQRCodeURL(walletAddress!)}
                        alt="Wallet QR Code"
                        className="w-48 h-48"
                      />
                    </div>
                    <p className="text-gray-400 text-sm">Scan QR code to get wallet address</p>
                  </div>

                  <div className="bg-dark-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm mb-1">Your Wallet Address:</p>
                        <p className="text-white font-mono text-sm break-all">{walletAddress}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(walletAddress!)}
                        className="ml-3 p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-dark-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Current Balance:</span>
                      <span className="text-xl font-bold text-white">{balance.toFixed(4)} SOL</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
