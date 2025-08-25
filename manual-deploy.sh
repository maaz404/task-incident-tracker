#!/bin/bash

# Manual EC2 Deployment Script
# Use this to manually deploy when GitHub Actions isn't working as expected

set -e  # Exit on any error

DEPLOY_DIR="~/task-incident-tracker"
BACKUP_DIR="~/task-incident-tracker-backup-manual-$(date +%Y%m%d-%H%M%S)"
REPO_URL="https://github.com/maaz404/task-incident-tracker.git"

echo "=== Manual EC2 Deployment Started ==="
echo "Time: $(date)"
echo

echo "=== Step 1: Backup existing deployment ==="
if [ -d "$DEPLOY_DIR" ]; then
    echo "Creating backup: $BACKUP_DIR"
    cp -r "$DEPLOY_DIR" "$BACKUP_DIR"
    
    echo "Stopping existing containers..."
    cd "$DEPLOY_DIR"
    docker-compose down || true
    echo "Containers stopped"
else
    echo "No existing deployment to backup"
fi
echo

echo "=== Step 2: Clone latest code ==="
rm -rf "$DEPLOY_DIR"
git clone "$REPO_URL" "$DEPLOY_DIR"
cd "$DEPLOY_DIR"

echo "Latest commit:"
git log --oneline -n 1
echo

echo "=== Step 3: Verify critical files ==="
if [ -f "README.md" ]; then
    echo "✅ README.md present ($(wc -c < README.md) bytes)"
else
    echo "❌ README.md missing"
fi

if [ -f "docker-compose.yml" ]; then
    echo "✅ docker-compose.yml present"
else
    echo "❌ docker-compose.yml missing"
fi

if [ -f "client/package.json" ]; then
    echo "✅ client/package.json present"
else
    echo "❌ client/package.json missing"
fi

if [ -f "server/package.json" ]; then
    echo "✅ server/package.json present"
else
    echo "❌ server/package.json missing"
fi
echo

echo "=== Step 4: Start Docker services ==="
sudo systemctl start docker
sudo systemctl enable docker

echo "=== Step 5: Build and start containers ==="
echo "Building containers (this may take a few minutes)..."
docker-compose build --no-cache

echo "Starting containers..."
docker-compose up -d

echo "=== Step 6: Wait for containers to start ==="
sleep 30

echo "=== Step 7: Check deployment status ==="
docker-compose ps

echo

echo "=== Step 8: Test endpoints ==="
echo "Testing API endpoint..."
if curl -f -s http://localhost/api >/dev/null; then
    echo "✅ API endpoint responding"
else
    echo "❌ API endpoint not responding"
fi

echo "Testing frontend..."
if curl -f -s http://localhost >/dev/null; then
    echo "✅ Frontend responding"
else
    echo "❌ Frontend not responding"
fi
echo

echo "=== Step 9: Show recent logs ==="
docker-compose logs --tail=20

echo

echo "=== Manual Deployment Complete ==="
echo "Application should be available at: http://$(curl -s http://checkip.amazonaws.com)/"
echo "Local test: http://localhost/"
echo

echo "If there are issues, check logs with:"
echo "  cd $DEPLOY_DIR"
echo "  docker-compose logs"
echo

echo "To clean up old backups:"
echo "  ls -la ~/task-incident-tracker-backup-*"
echo "  rm -rf ~/task-incident-tracker-backup-XXXXXX"
