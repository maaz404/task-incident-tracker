#!/bin/bash

# EC2 Deployment Debug Script
# Run this on your EC2 instance to check deployment status

echo "=== EC2 Deployment Debug Report ==="
echo "Generated: $(date)"
echo "Host: $(hostname)"
echo "User: $(whoami)"
echo

echo "=== 1. Deployment Directory Check ==="
DEPLOY_DIR="~/task-incident-tracker"
if [ -d "$DEPLOY_DIR" ]; then
    echo "✅ Deployment directory exists: $DEPLOY_DIR"
    cd "$DEPLOY_DIR"
    echo "Last modified: $(stat -c %y . 2>/dev/null || ls -ld .)"
    echo
    echo "Directory contents:"
    ls -la
    echo
    echo "Git commit (if available):"
    git log --oneline -n 1 2>/dev/null || echo "No git repository found"
else
    echo "❌ Deployment directory not found: $DEPLOY_DIR"
fi
echo

echo "=== 2. Docker Status ==="
echo "Docker service status:"
sudo systemctl status docker --no-pager -l
echo

echo "Docker containers:"
docker ps -a
echo

if [ -d "$DEPLOY_DIR" ]; then
    cd "$DEPLOY_DIR"
    echo "Docker Compose status:"
    docker-compose ps
    echo
fi

echo "=== 3. Application Logs ==="
if [ -d "$DEPLOY_DIR" ]; then
    cd "$DEPLOY_DIR"
    echo "Recent container logs:"
    docker-compose logs --tail=20
    echo
fi

echo "=== 4. File Changes Check ==="
if [ -d "$DEPLOY_DIR" ]; then
    cd "$DEPLOY_DIR"
    echo "Recent file changes (last 24 hours):"
    find . -type f -mtime -1 -ls 2>/dev/null | head -10
    echo
    
    echo "README.md status:"
    if [ -f "README.md" ]; then
        echo "✅ README.md exists"
        echo "Size: $(wc -c < README.md) bytes"
        echo "Last modified: $(stat -c %y README.md)"
        echo "First 3 lines:"
        head -3 README.md
    else
        echo "❌ README.md missing"
    fi
    echo
fi

echo "=== 5. Network & Port Check ==="
echo "Open ports:"
sudo netstat -tlnp | grep -E ':80|:3000|:5000'
echo

echo "=== 6. Process Check ==="
echo "Node.js processes:"
ps aux | grep node | grep -v grep
echo

echo "Nginx processes:"
ps aux | grep nginx | grep -v grep
echo

echo "=== 7. Disk Space ==="
df -h
echo

echo "=== 8. Recent Deployments ==="
echo "Backup directories:"
ls -la ~/task-incident-tracker-backup-* 2>/dev/null || echo "No backup directories found"
echo

echo "=== 9. System Logs ==="
echo "Recent system messages about docker:"
sudo journalctl -u docker --since "1 hour ago" --no-pager | tail -10
echo

echo "=== Debug Report Complete ==="
