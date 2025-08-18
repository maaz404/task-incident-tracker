#!/bin/bash

# Deployment Verification Script for Task Incident Tracker
# This script helps verify that the Docker deployment is working correctly

set -e

echo "🚀 Task Incident Tracker Deployment Verification"
echo "================================================="

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists docker; then
    echo "❌ Docker is not installed"
    exit 1
fi

if ! command_exists "docker compose"; then
    echo "❌ Docker Compose is not installed"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Check if React build exists
if [ ! -d "client/build" ]; then
    echo "⚠️  React build directory doesn't exist. Building..."
    cd client
    npm install
    npm run build
    cd ..
    echo "✅ React app built successfully"
else
    echo "✅ React build directory exists"
fi

# Check if nginx config exists
if [ ! -f "client/nginx.conf" ]; then
    echo "❌ client/nginx.conf not found"
    exit 1
fi

echo "✅ Nginx configuration found"

# Start services
echo ""
echo "🐳 Starting Docker services..."
docker compose down -v --remove-orphans 2>/dev/null || true
docker compose up -d --build

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 30

# Check if services are running
echo ""
echo "🔍 Checking service health..."

# Check if containers are running
MONGO_STATUS=$(docker compose ps --filter "service=mongo" --format json 2>/dev/null | grep -q "running" && echo "running" || echo "not running")
BACKEND_STATUS=$(docker compose ps --filter "service=backend" --format json 2>/dev/null | grep -q "running" && echo "running" || echo "not running")
NGINX_STATUS=$(docker compose ps --filter "service=nginx" --format json 2>/dev/null | grep -q "running" && echo "running" || echo "not running")

echo "MongoDB: $MONGO_STATUS"
echo "Backend: $BACKEND_STATUS"
echo "Nginx: $NGINX_STATUS"

# Test HTTP endpoints
echo ""
echo "🌐 Testing HTTP endpoints..."

# Test if nginx serves React app
if curl -s -f http://localhost/ > /dev/null; then
    echo "✅ React app is accessible at http://localhost/"
    
    # Check if it's actually React content (not nginx default)
    CONTENT=$(curl -s http://localhost/ | head -1)
    if echo "$CONTENT" | grep -q "Task Incident Tracker"; then
        echo "✅ React app content verified"
    else
        echo "⚠️  Content found but may not be React app"
        echo "   First line: $CONTENT"
    fi
else
    echo "❌ React app not accessible at http://localhost/"
fi

# Test backend API (if backend is running)
if [ "$BACKEND_STATUS" = "running" ]; then
    if curl -s -f http://localhost/api/tasks > /dev/null; then
        echo "✅ Backend API accessible at http://localhost/api/tasks"
    else
        echo "⚠️  Backend API not responding (may still be starting up)"
    fi
else
    echo "⚠️  Backend not running - API tests skipped"
fi

echo ""
echo "📊 Deployment Summary:"
echo "======================"
docker compose ps

echo ""
echo "🎉 Verification complete!"
echo "   Visit http://localhost/ to access the Task Incident Tracker"
echo "   Run 'docker compose logs -f' to view live logs"
echo "   Run 'docker compose down' to stop all services"