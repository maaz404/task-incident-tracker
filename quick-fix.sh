#!/bin/bash

# Quick Fix Script for EC2 Deployment Issues
# Run this to quickly restart services and check status

set -e

DEPLOY_DIR="~/task-incident-tracker"

echo "=== Quick Fix for EC2 Deployment ==="
echo "Time: $(date)"
echo

if [ ! -d "$DEPLOY_DIR" ]; then
    echo "❌ Deployment directory not found: $DEPLOY_DIR"
    echo "Run the manual-deploy.sh script instead"
    exit 1
fi

cd "$DEPLOY_DIR"

echo "=== Step 1: Stop containers ==="
docker-compose down

echo "=== Step 2: Pull latest images ==="
docker-compose pull

echo "=== Step 3: Rebuild containers ==="
docker-compose build --no-cache

echo "=== Step 4: Start containers ==="
docker-compose up -d

echo "=== Step 5: Wait and check ==="
sleep 20
docker-compose ps

echo

echo "=== Step 6: Test services ==="
echo "Testing API..."
if curl -f -s http://localhost:5000 >/dev/null 2>&1; then
    echo "✅ Backend API responding"
else
    echo "❌ Backend API not responding"
fi

echo "Testing frontend..."
if curl -f -s http://localhost >/dev/null 2>&1; then
    echo "✅ Frontend responding"
else
    echo "❌ Frontend not responding"
fi

echo

echo "=== Recent logs ==="
docker-compose logs --tail=15

echo

echo "=== Quick Fix Complete ==="
echo "Check your application at your EC2 public IP address"
