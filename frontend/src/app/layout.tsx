import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers/Providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solana Trading Platform',
  description: 'Advanced Solana trading platform with swap, transfer, and chart analysis',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-50 text-white`}>
        <Providers>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              className: 'bg-gradient-to-r from-dark-100 to-dark-200 text-white border border-white/10 backdrop-blur-sm shadow-2xl font-bold',
              success: {
                iconTheme: {
                  primary: '#8b5cf6',
                  secondary: '#ffffff',
                },
                style: {
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 95, 70, 0.1))',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
                style: {
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(127, 29, 29, 0.1))',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
