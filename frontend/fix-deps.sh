#!/bin/bash

echo "🔧 Fixing dependency issues..."

# Clean everything
echo "🧹 Cleaning previous installation..."
rm -rf node_modules package-lock.json

# Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Install with legacy peer deps to avoid conflicts
echo "📦 Installing dependencies with legacy peer deps..."
if ! npm install --legacy-peer-deps; then
    echo "❌ Installation failed"
    exit 1
fi

# Install additional dev dependencies
echo "📦 Installing dev dependencies..."
npm install @tailwindcss/forms @tailwindcss/typography --save-dev --legacy-peer-deps

echo "📦 Installing polyfills..."
npm install crypto-browserify stream-browserify url browserify-zlib stream-http https-browserify assert os-browserify path-browserify --save-dev --legacy-peer-deps

echo "✅ Dependencies fixed successfully!"
echo ""
echo "You can now run:"
echo "  npm run dev"
echo ""
