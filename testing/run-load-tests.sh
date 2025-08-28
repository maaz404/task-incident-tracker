#!/bin/bash

# k6 Load Testing Runner Script
# This script runs different load test scenarios

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="${BASE_URL:-http://localhost}"
RESULTS_DIR="./results"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo -e "${GREEN}🚀 Starting k6 Load Testing Suite${NC}"
echo -e "${YELLOW}Base URL: ${BASE_URL}${NC}"

# Create results directory
mkdir -p ${RESULTS_DIR}

# Function to run a test scenario
run_test() {
    local scenario=$1
    local description=$2
    
    echo -e "\n${YELLOW}Running ${description}...${NC}"
    
    # Update base URL in config
    sed -i "s|baseURL: 'http://localhost'|baseURL: '${BASE_URL}'|g" ./k6/config.js
    
    # Run k6 test with specific scenario
    k6 run \
        --out json=${RESULTS_DIR}/${scenario}_${TIMESTAMP}.json \
        --out influxdb=http://localhost:8086/k6 \
        -e SCENARIO=${scenario} \
        ./k6/load-test.js
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ ${description} completed successfully${NC}"
    else
        echo -e "${RED}❌ ${description} failed${NC}"
    fi
}

# Run test scenarios based on argument
case "${1:-all}" in
    "low")
        run_test "low_load" "Low Load Test (5 concurrent users)"
        ;;
    "medium")
        run_test "medium_load" "Medium Load Test (20 concurrent users)"
        ;;
    "high")
        run_test "high_load" "High Load Test (50-100 concurrent users)"
        ;;
    "spike")
        run_test "spike_test" "Spike Test (sudden traffic spike)"
        ;;
    "all")
        echo -e "${YELLOW}Running all test scenarios...${NC}"
        run_test "low_load" "Low Load Test"
        sleep 60  # Cool down period
        run_test "medium_load" "Medium Load Test"
        sleep 120 # Cool down period
        run_test "high_load" "High Load Test"
        sleep 180 # Cool down period
        run_test "spike_test" "Spike Test"
        ;;
    *)
        echo -e "${RED}Usage: $0 [low|medium|high|spike|all]${NC}"
        echo -e "${YELLOW}Examples:${NC}"
        echo -e "  $0 low     # Run low load test only"
        echo -e "  $0 all     # Run all test scenarios"
        echo -e "  BASE_URL=http://your-ec2-ip $0 medium  # Test against EC2 instance"
        exit 1
        ;;
esac

echo -e "\n${GREEN}🎉 Load testing completed!${NC}"
echo -e "${YELLOW}Results saved in: ${RESULTS_DIR}${NC}"
echo -e "${YELLOW}View detailed results in Grafana: http://localhost:3000${NC}"
