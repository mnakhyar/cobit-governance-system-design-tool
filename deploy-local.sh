#!/bin/bash

echo "========================================"
echo "COBIT Local Network Deployment"
echo "========================================"

# Get local IP address
LOCAL_IP=$(hostname -I | awk '{print $1}')
echo "Local IP Address: $LOCAL_IP"
echo

# Update environment variables
echo "Updating configuration for local network..."
sed -i "s/YOUR_LOCAL_IP/$LOCAL_IP/g" docker-compose.local.yml

# Stop existing containers
echo "Stopping existing containers..."
docker-compose -f docker-compose.local.yml down

# Build and start containers
echo "Building and starting containers..."
docker-compose -f docker-compose.local.yml up --build -d

# Wait for services to start
echo "Waiting for services to start..."
sleep 10

# Check service status
echo "Checking service status..."
docker-compose -f docker-compose.local.yml ps

echo
echo "========================================"
echo "Deployment Complete!"
echo "========================================"
echo
echo "Access URLs:"
echo "Frontend: http://$LOCAL_IP:8080"
echo "Backend API: http://$LOCAL_IP:5000"
echo "MongoDB: mongodb://$LOCAL_IP:27017"
echo
echo "Network Access:"
echo "- Frontend: http://$LOCAL_IP:8080"
echo "- API: http://$LOCAL_IP:5000/api/cobit"
echo "- Health Check: http://$LOCAL_IP:8080/health"
echo
echo "To stop services:"
echo "docker-compose -f docker-compose.local.yml down"
echo 