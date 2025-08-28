@echo off
REM k6 Load Testing Runner Script for Windows
REM This script runs different load test scenarios

setlocal enabledelayedexpansion

set BASE_URL=%BASE_URL%
if "%BASE_URL%"=="" set BASE_URL=http://localhost

set RESULTS_DIR=.\results
set TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%

echo 🚀 Starting k6 Load Testing Suite
echo Base URL: %BASE_URL%

REM Create results directory
if not exist "%RESULTS_DIR%" mkdir "%RESULTS_DIR%"

REM Function to run a test scenario
if "%1"=="low" goto :run_low
if "%1"=="medium" goto :run_medium
if "%1"=="high" goto :run_high
if "%1"=="spike" goto :run_spike
if "%1"=="all" goto :run_all
if "%1"=="" goto :run_all

echo Usage: %0 [low^|medium^|high^|spike^|all]
echo Examples:
echo   %0 low     # Run low load test only
echo   %0 all     # Run all test scenarios
echo   set BASE_URL=http://your-ec2-ip ^&^& %0 medium  # Test against EC2 instance
exit /b 1

:run_low
echo Running Low Load Test (5 concurrent users)...
k6 run --out json=%RESULTS_DIR%\low_load_%TIMESTAMP%.json -e SCENARIO=low_load .\k6\load-test.js
goto :end

:run_medium
echo Running Medium Load Test (20 concurrent users)...
k6 run --out json=%RESULTS_DIR%\medium_load_%TIMESTAMP%.json -e SCENARIO=medium_load .\k6\load-test.js
goto :end

:run_high
echo Running High Load Test (50-100 concurrent users)...
k6 run --out json=%RESULTS_DIR%\high_load_%TIMESTAMP%.json -e SCENARIO=high_load .\k6\load-test.js
goto :end

:run_spike
echo Running Spike Test (sudden traffic spike)...
k6 run --out json=%RESULTS_DIR%\spike_test_%TIMESTAMP%.json -e SCENARIO=spike_test .\k6\load-test.js
goto :end

:run_all
echo Running all test scenarios...
echo Running Low Load Test...
k6 run --out json=%RESULTS_DIR%\low_load_%TIMESTAMP%.json -e SCENARIO=low_load .\k6\load-test.js
timeout /t 60 /nobreak > nul

echo Running Medium Load Test...
k6 run --out json=%RESULTS_DIR%\medium_load_%TIMESTAMP%.json -e SCENARIO=medium_load .\k6\load-test.js
timeout /t 120 /nobreak > nul

echo Running High Load Test...
k6 run --out json=%RESULTS_DIR%\high_load_%TIMESTAMP%.json -e SCENARIO=high_load .\k6\load-test.js
timeout /t 180 /nobreak > nul

echo Running Spike Test...
k6 run --out json=%RESULTS_DIR%\spike_test_%TIMESTAMP%.json -e SCENARIO=spike_test .\k6\load-test.js
goto :end

:end
echo.
echo 🎉 Load testing completed!
echo Results saved in: %RESULTS_DIR%
echo View detailed results in Grafana: http://localhost:3000

endlocal
