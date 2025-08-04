@echo off
echo ========================================
echo Stopping COBIT Application
echo ========================================

echo.
echo Stopping all containers...
docker-compose down

echo.
echo Removing containers and networks...
docker-compose down --remove-orphans

echo.
echo Checking if containers are stopped...
docker ps --filter "name=cobit" --format "table {{.Names}}\t{{.Status}}" 2>nul

echo.
echo ✅ Application stopped successfully!
echo.
echo To start again, run: start-app.bat
echo.
pause 