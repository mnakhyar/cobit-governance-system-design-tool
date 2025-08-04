#!/bin/bash

echo "========================================"
echo "COBIT Governance System Design Tool"
echo "Docker Setup Script"
echo "========================================"

echo ""
echo "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed"
    echo "Please install Docker from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

echo "✅ Docker is available"

echo ""
echo "Checking if containers are running..."
docker ps --filter "name=cobit" --format "table {{.Names}}\t{{.Status}}" 2>/dev/null

echo ""
echo "Starting COBIT application with Docker Compose..."
echo ""

echo "1. Building and starting MongoDB..."
echo "2. Building and starting Backend API..."
echo "3. Building and starting Frontend..."

docker-compose up --build -d

echo ""
echo "Waiting for services to start..."
sleep 10

echo ""
echo "========================================"
echo "Application Status:"
echo "========================================"

echo ""
echo "Checking MongoDB..."
if docker exec cobit-mongodb mongosh --eval "db.runCommand('ping')" >/dev/null 2>&1; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB is not responding"
fi

echo ""
echo "Checking Backend API..."
if curl -s http://localhost:5000/api/health >/dev/null 2>&1; then
    echo "✅ Backend API is running"
else
    echo "❌ Backend API is not responding"
fi

echo ""
echo "Checking Frontend..."
if curl -s http://localhost:3000 >/dev/null 2>&1; then
    echo "✅ Frontend is running"
else
    echo "❌ Frontend is not responding"
fi

echo ""
echo "========================================"
echo "Access URLs:"
echo "========================================"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo "📊 MongoDB Compass: mongodb://admin:password123@localhost:27017"
echo ""
echo "MongoDB Compass Connection String:"
echo "mongodb://admin:password123@localhost:27017/cobit-tool?authSource=admin"
echo ""
echo "========================================"
echo "Useful Commands:"
echo "========================================"
echo "View logs: docker-compose logs -f"
echo "Stop app: docker-compose down"
echo "Restart app: docker-compose restart"
echo "View containers: docker ps"
echo "" 