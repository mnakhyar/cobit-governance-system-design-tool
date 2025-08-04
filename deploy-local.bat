@echo off
echo ========================================
echo COBIT Local Network Deployment
echo ========================================

REM Get local IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do set LOCAL_IP=%%a
set LOCAL_IP=%LOCAL_IP: =%

echo Local IP Address: %LOCAL_IP%
echo.

REM Update environment variables
echo Updating configuration for local network...
powershell -Command "(Get-Content docker-compose.local.yml) -replace 'YOUR_LOCAL_IP', '%LOCAL_IP%' | Set-Content docker-compose.local.yml"

REM Stop existing containers
echo Stopping existing containers...
docker-compose -f docker-compose.local.yml down

REM Build and start containers
echo Building and starting containers...
docker-compose -f docker-compose.local.yml up --build -d

REM Wait for services to start
echo Waiting for services to start...
timeout /t 10 /nobreak > nul

REM Check service status
echo Checking service status...
docker-compose -f docker-compose.local.yml ps

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Access URLs:
echo Frontend: http://%LOCAL_IP%:8080
echo Backend API: http://%LOCAL_IP%:5000
echo MongoDB: mongodb://%LOCAL_IP%:27017
echo.
echo Network Access:
echo - Frontend: http://%LOCAL_IP%:8080
echo - API: http://%LOCAL_IP%:5000/api/cobit
echo - Health Check: http://%LOCAL_IP%:8080/health
echo.
echo Press any key to continue...
pause > nul 