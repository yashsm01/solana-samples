# Solana Trading Platform

A modern, full-featured Solana-based web application with trading, swapping, and transfer capabilities. Built with Next.js, TypeScript, and the latest Solana Web3.js libraries.

## Features

### 🔐 Wallet Integration

- Multi-wallet support (Phantom, Solflare, Sollet, Torus)
- Real-time balance tracking
- Network status monitoring
- Secure transaction signing

### 💸 Transfer Functionality

- **Send SOL**: Transfer SOL to any Solana address
- **Receive SOL**: Generate QR codes and share wallet address
- Real-time transaction confirmation
- Transaction history tracking

### 🔄 Token Swapping

- Swap between SOL and stablecoins (USDC, USDT)
- Swap between different crypto tokens
- Jupiter aggregator integration (ready for implementation)
- Slippage control and rate display
- Popular token shortcuts

### 📈 Advanced Trading Charts

- TradingView-style candlestick charts
- Multiple timeframes (1m, 5m, 15m, 1h, 4h, 1d, 1w)
- Volume indicators
- Real-time price updates
- Fullscreen mode
- Technical analysis tools

### 🎨 Modern UI/UX

- Dark theme optimized for trading
- Responsive design for all devices
- Smooth animations and transitions
- Professional trading interface
- Intuitive navigation

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Solana**: Web3.js, Wallet Adapter, SPL Token
- **Charts**: Lightweight Charts (TradingView alternative)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **UI Components**: Headless UI, Lucide React icons
- **Backend Integration**: FastAPI connection ready

## Prerequisites

- Node.js 18+
- npm or yarn
- Solana wallet (Phantom, Solflare, etc.)

## Installation

1. **Clone the repository**

   ```bash
   cd solana-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install additional required dependencies**

   ```bash
   npm install @tailwindcss/forms @tailwindcss/typography
   npm install crypto-browserify stream-browserify url browserify-zlib stream-http https-browserify assert os-browserify path-browserify
   ```

4. **Set up environment variables**
   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3001`

## Backend Integration

This frontend is designed to work with the FastAPI backend located at `../backend`. The API endpoints are automatically proxied through Next.js.

### Available API Endpoints

- `/api/backend/live/*` - Live market data
- `/api/backend/swap/*` - Token swap operations
- `/api/backend/portfolio/*` - Portfolio tracking
- `/api/backend/trades/*` - Trading history

## Project Structure

```
solana-frontend/
├── src/
│   ├── app/                    # Next.js 14 app directory
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page
│   ├── components/
│   │   ├── dashboard/         # Dashboard components
│   │   ├── layout/            # Layout components
│   │   ├── providers/         # Context providers
│   │   ├── swap/              # Swap functionality
│   │   ├── trading/           # Trading charts
│   │   └── transfer/          # Transfer functionality
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
└── ...config files
```

## Usage

### Connecting a Wallet

1. Click the "Connect Wallet" button in the header
2. Select your preferred wallet (Phantom, Solflare, etc.)
3. Approve the connection in your wallet

### Sending SOL

1. Navigate to the "Transfer" tab
2. Select "Send"
3. Enter recipient address and amount
4. Add optional memo
5. Confirm transaction in your wallet

### Receiving SOL

1. Navigate to the "Transfer" tab
2. Select "Receive"
3. Share your wallet address or QR code

### Swapping Tokens

1. Navigate to the "Swap" tab
2. Select from/to tokens
3. Enter amount to swap
4. Adjust slippage if needed
5. Confirm swap transaction

### Trading Charts

1. Navigate to the "Trading" tab
2. Select token pair from dropdown
3. Choose timeframe and chart type
4. Use fullscreen mode for detailed analysis

## Configuration

### Solana Network

Change the network in `next.config.js`:

```javascript
env: {
  SOLANA_NETWORK: 'mainnet-beta', // or 'devnet', 'testnet'
}
```

### Styling

Customize the theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      solana: { /* custom colors */ },
      dark: { /* dark theme colors */ }
    }
  }
}
```

## Development

### Adding New Features

1. Create components in appropriate directories
2. Add TypeScript interfaces in `src/types/`
3. Implement backend integration in `src/lib/`
4. Add routing if needed

### Testing

```bash
npm run type-check  # TypeScript checking
npm run lint        # ESLint
npm run build       # Production build test
```

## Production Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Start production server**

   ```bash
   npm start
   ```

3. **Environment Configuration**
   Set production environment variables:
   ```env
   NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
   NEXT_PUBLIC_BACKEND_URL=https://your-api-domain.com
   ```

## Troubleshooting

### Common Issues

1. **Wallet Connection Issues**

   - Ensure wallet extension is installed
   - Check network compatibility
   - Clear browser cache

2. **Transaction Failures**

   - Check SOL balance for fees
   - Verify network status
   - Ensure correct recipient address

3. **Chart Loading Issues**
   - Check browser compatibility
   - Disable ad blockers
   - Refresh the page

### Debug Mode

Enable detailed logging:

```bash
NODE_ENV=development npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Security Considerations

- Never share private keys or seed phrases
- Always verify transaction details before signing
- Use hardware wallets for large amounts
- Keep software updated

## License

This project is licensed under the MIT License.

## Support

For support and questions:

- Check the troubleshooting section
- Review Solana documentation
- Create an issue in the repository

---

**Made with ❤️ for the Solana ecosystem**
