@echo off
REM Docker Compose Commands for Task Incident Tracker (Windows)

echo Task Incident Tracker - Docker Management Scripts
echo ================================================

if "%1"=="dev" (
    echo Starting development environment...
    docker-compose -f docker-compose.dev.yml up --build
    goto end
)

if "%1"=="prod" (
    echo Starting production environment...
    docker-compose -f docker-compose.prod.yml up --build -d
    goto end
)

if "%1"=="build" (
    echo Building all services...
    docker-compose build --no-cache
    goto end
)

if "%1"=="stop" (
    echo Stopping all services...
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.prod.yml down
    goto end
)

if "%1"=="clean" (
    echo Cleaning up Docker resources...
    docker-compose down -v
    docker system prune -f
    docker volume prune -f
    goto end
)

if "%1"=="logs" (
    echo Showing logs...
    docker-compose logs -f
    goto end
)

if "%1"=="status" (
    echo Service status...
    docker-compose ps
    goto end
)

echo Usage: %0 {dev^|prod^|build^|stop^|clean^|logs^|status}
echo.
echo Commands:
echo   dev    - Start development environment
echo   prod   - Start production environment  
echo   build  - Build all Docker images
echo   stop   - Stop all running containers
echo   clean  - Clean up Docker resources
echo   logs   - Show container logs
echo   status - Show container status

:end
