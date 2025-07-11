#!/bin/bash

echo "🚀 Setting up Solana Trading Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Clean install
echo "🧹 Cleaning previous installations..."
rm -rf node_modules package-lock.json

# Install dependencies
echo "📦 Installing dependencies..."
if ! npm install; then
    echo "❌ Failed to install dependencies. Trying with legacy peer deps..."
    if ! npm install --legacy-peer-deps; then
        echo "❌ Installation failed. Please check package.json for invalid packages."
        exit 1
    fi
fi

# Install additional required dependencies
echo "📦 Installing additional dependencies..."
npm install @tailwindcss/forms @tailwindcss/typography --save-dev
npm install crypto-browserify stream-browserify url browserify-zlib stream-http https-browserify assert os-browserify path-browserify --save-dev

# Create environment file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating environment file..."
    cat > .env.local << EOL
# Solana Trading Platform Environment Configuration

# Solana Network Configuration
# Options: 'devnet', 'testnet', 'mainnet-beta'
NEXT_PUBLIC_SOLANA_NETWORK=devnet

# Backend API URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# Application Settings
NEXT_PUBLIC_APP_NAME="Solana Trading Platform"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# Optional: Custom RPC Endpoints
# NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# Optional: Jupiter API Configuration
# NEXT_PUBLIC_JUPITER_API_URL=https://quote-api.jup.ag/v6
EOL
    echo "✅ Environment file created (.env.local)"
else
    echo "✅ Environment file already exists"
fi

# Check if backend is running
echo "🔍 Checking backend connection..."
if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ Backend is running on http://localhost:8000"
else
    echo "⚠️  Backend is not running. Please start the backend server first:"
    echo "   cd ../backend && python run.py"
fi

echo "🎉 Setup complete!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "The application will be available at:"
echo "  http://localhost:3001"
echo ""
echo "Make sure you have a Solana wallet extension installed (Phantom, Solflare, etc.)"
