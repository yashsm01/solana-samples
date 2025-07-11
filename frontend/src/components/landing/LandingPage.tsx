'use client'

import { useState, useEffect } from 'react'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  gradient: string
}

const FeatureCard = ({ icon, title, description, gradient }: FeatureCardProps) => (
  <div
    className={`relative p-6 rounded-2xl bg-gradient-to-br ${gradient} shadow-2xl backdrop-blur-sm border border-white/10 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
  >
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-200 text-sm leading-relaxed">{description}</p>
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
)

const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, duration])

  return <span>{count.toLocaleString()}</span>
}

export function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast Execution",
      description: "Execute trades in milliseconds with our optimized algorithms and direct blockchain integration.",
      gradient: "from-yellow-500/20 to-orange-600/20"
    },
    {
      icon: "🎯",
      title: "Smart Straddling Strategy",
      description: "AI-powered market analysis that identifies optimal entry and exit points for maximum profit.",
      gradient: "from-purple-500/20 to-pink-600/20"
    },
    {
      icon: "🛡️",
      title: "Risk Management",
      description: "Advanced risk controls and position sizing to protect your capital in volatile markets.",
      gradient: "from-blue-500/20 to-cyan-600/20"
    },
    {
      icon: "📊",
      title: "Real-time Analytics",
      description: "Comprehensive dashboard with live market data, performance metrics, and portfolio insights.",
      gradient: "from-green-500/20 to-teal-600/20"
    }
  ]

  const stats = [
    { label: "Active Traders", value: 15000, suffix: "+" },
    { label: "Total Volume", value: 250, suffix: "M+" },
    { label: "Success Rate", value: 87, suffix: "%" },
    { label: "Profit Generated", value: 12, suffix: "M+" }
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-dark-100 to-dark-50 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-solana-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-bounce-gentle" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-solana-400 via-primary-400 to-purple-400 bg-clip-text text-transparent mb-6 leading-tight animate-pulse">
              STRADDL<span className="text-yellow-400">3</span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-white mb-4">
              Time-Based Straddling Strategy
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Dominate crypto markets with AI-powered trading strategies.
              Execute lightning-fast straddle positions and maximize your profits in any market condition.
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              className="px-8 py-4 bg-gradient-to-r from-solana-500 to-solana-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-solana-500/25 transform hover:scale-105 transition-all duration-300 text-lg group"
              onClick={() => window.location.href = '#cta'}
            >
              <span className="flex items-center justify-center gap-2">
                Start Trading Now
                <span className="group-hover:translate-x-1 transition-transform duration-300">🚀</span>
              </span>
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300 text-lg group">
              <span className="flex items-center justify-center gap-2">
                Watch Demo
                <span className="group-hover:scale-110 transition-transform duration-300">▶️</span>
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-solana-400 to-primary-400 bg-clip-text">
                  <AnimatedCounter end={stat.value} />{stat.suffix}
                </div>
                <div className="text-gray-400 font-medium mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Why Choose <span className="text-transparent bg-gradient-to-r from-solana-400 to-primary-400 bg-clip-text">STRADDL3</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built by traders, for traders. Experience the next generation of crypto trading technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className={`transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              How It <span className="text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three simple steps to start making profits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-solana-500 to-primary-500 flex items-center justify-center text-3xl font-black text-white">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Connect Wallet</h3>
              <p className="text-gray-300">
                Connect your Solana wallet and link your trading accounts to get started in seconds.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 flex items-center justify-center text-3xl font-black text-white">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Set Strategy</h3>
              <p className="text-gray-300">
                Choose your risk level and configure the AI-powered straddling strategy parameters.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-black text-white">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Profit Automatically</h3>
              <p className="text-gray-300">
                Sit back and watch as the system executes profitable trades 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

            {/* CTA Section */}
      <section id="cta" className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-solana-500/20 to-primary-500/20 backdrop-blur-sm border border-white/10 hover:scale-105 transition-all duration-500">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text animate-pulse">10X</span> Your Profits?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of traders who are already crushing the markets with STRADDL3.
              Your journey to financial freedom starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button className="px-12 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-xl hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 text-xl group">
                <span className="flex items-center justify-center gap-2">
                  Get Started - It's FREE!
                  <span className="group-hover:bounce">💰</span>
                </span>
              </button>
              <button className="px-12 py-4 bg-gradient-to-r from-solana-500 to-primary-500 text-white font-black rounded-xl hover:shadow-2xl hover:shadow-solana-500/25 transform hover:scale-105 transition-all duration-300 text-xl">
                Connect Wallet 🔗
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              ⭐ No credit card required • ⚡ Setup in 2 minutes • 🔒 Bank-level security
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-black text-transparent bg-gradient-to-r from-solana-400 to-primary-400 bg-clip-text mb-4">
            STRADDL3
          </div>
          <p className="text-gray-400 mb-6">
            Revolutionizing crypto trading with AI-powered strategies
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-solana-400 transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-solana-400 transition-colors">Discord</a>
            <a href="#" className="text-gray-400 hover:text-solana-400 transition-colors">Telegram</a>
            <a href="#" className="text-gray-400 hover:text-solana-400 transition-colors">GitHub</a>
          </div>
          <div className="mt-8 text-xs text-gray-500">
            © 2024 STRADDL3. All rights reserved. Trade responsibly.
          </div>
        </div>
      </footer>
    </div>
  )
}
