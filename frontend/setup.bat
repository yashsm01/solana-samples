@echo off
echo 🚀 Setting up Solana Trading Platform...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js detected
node --version

REM Clean install
echo 🧹 Cleaning previous installations...
if exist "node_modules" rmdir /s /q node_modules
if exist "package-lock.json" del package-lock.json

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies. Trying with legacy peer deps...
    call npm install --legacy-peer-deps
    if %errorlevel% neq 0 (
        echo ❌ Installation failed. Please check package.json for invalid packages.
        pause
        exit /b 1
    )
)

REM Install additional required dependencies
echo 📦 Installing additional dependencies...
call npm install @tailwindcss/forms @tailwindcss/typography --save-dev
call npm install crypto-browserify stream-browserify url browserify-zlib stream-http https-browserify assert os-browserify path-browserify --save-dev

REM Create environment file if it doesn't exist
if not exist ".env.local" (
    echo 📝 Creating environment file...
    (
        echo # Solana Trading Platform Environment Configuration
        echo.
        echo # Solana Network Configuration
        echo # Options: 'devnet', 'testnet', 'mainnet-beta'
        echo NEXT_PUBLIC_SOLANA_NETWORK=devnet
        echo.
        echo # Backend API URL
        echo NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
        echo.
        echo # Application Settings
        echo NEXT_PUBLIC_APP_NAME="Solana Trading Platform"
        echo NEXT_PUBLIC_APP_VERSION="1.0.0"
        echo.
        echo # Optional: Custom RPC Endpoints
        echo # NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
        echo.
        echo # Optional: Jupiter API Configuration
        echo # NEXT_PUBLIC_JUPITER_API_URL=https://quote-api.jup.ag/v6
    ) > .env.local
    echo ✅ Environment file created (.env.local)
) else (
    echo ✅ Environment file already exists
)

REM Check if backend is running
echo 🔍 Checking backend connection...
curl -s http://localhost:8000/health >nul 2>&1
if %errorlevel% eq 0 (
    echo ✅ Backend is running on http://localhost:8000
) else (
    echo ⚠️  Backend is not running. Please start the backend server first:
    echo    cd ..\backend ^&^& python run.py
)

echo.
echo 🎉 Setup complete!
echo.
echo To start the development server:
echo   npm run dev
echo.
echo The application will be available at:
echo   http://localhost:3001
echo.
echo Make sure you have a Solana wallet extension installed (Phantom, Solflare, etc.)
echo.
pause
