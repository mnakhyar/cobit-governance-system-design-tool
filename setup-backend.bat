@echo off
echo ========================================
echo COBIT Backend Setup Script
echo ========================================

echo.
echo Step 1: Installing backend dependencies...
cd backend
npm install

echo.
echo Step 2: Creating environment file...
if not exist .env (
    copy env.example .env
    echo Environment file created!
) else (
    echo Environment file already exists.
)

echo.
echo Step 3: MongoDB Setup Options:
echo.
echo Option A: MongoDB Atlas (Cloud - Recommended)
echo 1. Go to https://www.mongodb.com/atlas
echo 2. Create free account
echo 3. Create a cluster
echo 4. Get connection string
echo 5. Update .env file with your connection string
echo.
echo Option B: Local MongoDB
echo 1. Download from https://www.mongodb.com/try/download/community
echo 2. Install MongoDB Community Server
echo 3. MongoDB will run as a Windows service
echo.
echo After setting up MongoDB, run:
echo npm run dev
echo.
echo To test the backend:
echo curl http://localhost:5000/api/health
echo.
pause 