@echo off
echo ========================================
echo COBIT Backend Test Script
echo ========================================

echo.
echo Testing backend connection...
echo.

echo 1. Testing health endpoint...
curl -s http://localhost:5000/api/health
if %errorlevel% neq 0 (
    echo ❌ Backend is not running or MongoDB is not connected
    echo.
    echo Please:
    echo 1. Make sure MongoDB is installed and running
    echo 2. Check your .env file configuration
    echo 3. Start the backend: cd backend && npm run dev
) else (
    echo ✅ Backend is running successfully!
)

echo.
echo 2. Testing designs endpoint...
curl -s http://localhost:5000/api/cobit
if %errorlevel% neq 0 (
    echo ❌ Designs endpoint failed
) else (
    echo ✅ Designs endpoint is working!
)

echo.
echo 3. Testing frontend connection...
echo Frontend should be running at: http://localhost:3000
echo.
pause 