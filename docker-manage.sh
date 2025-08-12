#!/bin/bash

# Docker Compose Commands for Task Incident Tracker

echo "Task Incident Tracker - Docker Management Scripts"
echo "================================================"

case "$1" in
    "dev")
        echo "Starting development environment..."
        docker-compose -f docker-compose.dev.yml up --build
        ;;
    "prod")
        echo "Starting production environment..."
        docker-compose -f docker-compose.prod.yml up --build -d
        ;;
    "build")
        echo "Building all services..."
        docker-compose build --no-cache
        ;;
    "stop")
        echo "Stopping all services..."
        docker-compose down
        docker-compose -f docker-compose.dev.yml down
        docker-compose -f docker-compose.prod.yml down
        ;;
    "clean")
        echo "Cleaning up Docker resources..."
        docker-compose down -v
        docker system prune -f
        docker volume prune -f
        ;;
    "logs")
        echo "Showing logs..."
        docker-compose logs -f
        ;;
    "status")
        echo "Service status..."
        docker-compose ps
        ;;
    *)
        echo "Usage: $0 {dev|prod|build|stop|clean|logs|status}"
        echo ""
        echo "Commands:"
        echo "  dev    - Start development environment"
        echo "  prod   - Start production environment"
        echo "  build  - Build all Docker images"
        echo "  stop   - Stop all running containers"
        echo "  clean  - Clean up Docker resources"
        echo "  logs   - Show container logs"
        echo "  status - Show container status"
        exit 1
        ;;
esac
