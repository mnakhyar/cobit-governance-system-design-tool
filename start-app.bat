@echo off
echo ========================================
echo COBIT Governance System Design Tool
echo Docker Setup Script
echo ========================================

echo.
echo Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed or not running
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo ✅ Docker is available

echo.
echo Checking if containers are running...
docker ps --filter "name=cobit" --format "table {{.Names}}\t{{.Status}}" 2>nul

echo.
echo Starting COBIT application with Docker Compose...
echo.

echo 1. Building and starting MongoDB...
echo 2. Building and starting Backend API...
echo 3. Building and starting Frontend...

docker-compose up --build -d

echo.
echo Waiting for services to start...
timeout /t 10 /nobreak >nul

echo.
echo ========================================
echo Application Status:
echo ========================================

echo.
echo Checking MongoDB...
docker exec cobit-mongodb mongosh --eval "db.runCommand('ping')" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB is running
) else (
    echo ❌ MongoDB is not responding
)

echo.
echo Checking Backend API...
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend API is running
) else (
    echo ❌ Backend API is not responding
)

echo.
echo Checking Frontend...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend is running
) else (
    echo ❌ Frontend is not responding
)

echo.
echo ========================================
echo Access URLs:
echo ========================================
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:5000
echo 📊 MongoDB Compass: mongodb://admin:password123@localhost:27017
echo.
echo MongoDB Compass Connection String:
echo mongodb://admin:password123@localhost:27017/cobit-tool?authSource=admin
echo.
echo ========================================
echo Useful Commands:
echo ========================================
echo View logs: docker-compose logs -f
echo Stop app: docker-compose down
echo Restart app: docker-compose restart
echo View containers: docker ps
echo.
pause 