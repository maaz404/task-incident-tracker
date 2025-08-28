// k6 Load Testing Configuration
export const config = {
  // Base URL - update this to your EC2 instance public IP/domain
  baseURL: "http://13.60.158.98/", // Change to your EC2 public address

  // Test scenarios configuration
  scenarios: {
    // Low traffic scenario
    low_load: {
      executor: "ramping-vus",
      stages: [
        { duration: "2m", target: 5 }, // Ramp up to 5 users over 2 minutes
        { duration: "5m", target: 5 }, // Stay at 5 users for 5 minutes
        { duration: "2m", target: 0 }, // Ramp down to 0 users
      ],
    },

    // Medium traffic scenario
    medium_load: {
      executor: "ramping-vus",
      stages: [
        { duration: "3m", target: 20 }, // Ramp up to 20 users over 3 minutes
        { duration: "10m", target: 20 }, // Stay at 20 users for 10 minutes
        { duration: "3m", target: 0 }, // Ramp down to 0 users
      ],
    },

    // High traffic scenario (stress test)
    high_load: {
      executor: "ramping-vus",
      stages: [
        { duration: "5m", target: 50 }, // Ramp up to 50 users over 5 minutes
        { duration: "15m", target: 50 }, // Stay at 50 users for 15 minutes
        { duration: "5m", target: 100 }, // Spike to 100 users
        { duration: "5m", target: 50 }, // Back to 50 users
        { duration: "5m", target: 0 }, // Ramp down to 0 users
      ],
    },

    // Spike test
    spike_test: {
      executor: "ramping-vus",
      stages: [
        { duration: "1m", target: 10 }, // Normal load
        { duration: "30s", target: 200 }, // Sudden spike
        { duration: "1m", target: 10 }, // Back to normal
      ],
    },
  },

  // Performance thresholds
  thresholds: {
    http_req_duration: ["p(95)<2000", "p(99)<5000"], // 95% of requests under 2s, 99% under 5s
    http_req_failed: ["rate<0.1"], // Error rate should be less than 10%
    http_reqs: ["rate>1"], // Request rate should be greater than 1 req/s
  },

  // Test user credentials
  testUser: {
    username: "testuser",
    email: "test@example.com",
    password: "testpassword123",
  },
};

export default config;
