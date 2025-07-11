@echo off
echo 🔧 Fixing dependency issues...

REM Clean everything
echo 🧹 Cleaning previous installation...
if exist "node_modules" rmdir /s /q node_modules
if exist "package-lock.json" del package-lock.json

REM Clear npm cache
echo 🧹 Clearing npm cache...
call npm cache clean --force

REM Install with legacy peer deps to avoid conflicts
echo 📦 Installing dependencies with legacy peer deps...
call npm install --legacy-peer-deps

if %errorlevel% neq 0 (
    echo ❌ Installation failed
    pause
    exit /b 1
)

REM Install additional dev dependencies
echo 📦 Installing dev dependencies...
call npm install @tailwindcss/forms @tailwindcss/typography --save-dev --legacy-peer-deps

echo 📦 Installing polyfills...
call npm install crypto-browserify stream-browserify url browserify-zlib stream-http https-browserify assert os-browserify path-browserify --save-dev --legacy-peer-deps

echo ✅ Dependencies fixed successfully!
echo.
echo You can now run:
echo   npm run dev
echo.
pause
