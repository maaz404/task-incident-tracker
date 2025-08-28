# Task Tracker Monitoring Setup

This document explains how to set up and use Prometheus and Grafana monitoring for the Task Tracker API.

## 📊 Monitoring Stack

- **Prometheus**: Metrics collection and storage
- **Grafana**: Metrics visualization and dashboards
- **prom-client**: Node.js client for exposing metrics

## 🚀 Quick Start

### 1. Start All Services with Monitoring

```bash
# Windows
start-monitoring.bat

# Or manually with Docker Compose
docker-compose up -d --build
```

### 2. Access the Monitoring Interfaces

- **Grafana Dashboard**: http://localhost:3000 (admin/admin123)
- **Prometheus**: http://localhost:9090
- **API Metrics**: http://localhost:5000/metrics
- **Health Check**: http://localhost:5000/health

### 3. Verify Everything is Working

```bash
# Windows
verify-monitoring.bat

# Or manually check endpoints
curl http://localhost:5000/health
curl http://localhost:5000/metrics
```

## 📈 Available Metrics

### Custom Application Metrics

- `http_requests_total` - Total HTTP requests by method, route, and status code
- `http_request_duration_ms` - HTTP request duration histogram
- `active_connections` - Current active connections
- `mongodb_connections_active` - Active MongoDB connections
- `tasks_total` - Total tasks by status (pending/completed)

### Default Node.js Metrics

- `process_cpu_user_seconds_total` - CPU usage
- `process_resident_memory_bytes` - Memory usage
- `nodejs_heap_size_total_bytes` - Heap memory
- `nodejs_heap_size_used_bytes` - Used heap memory
- `nodejs_gc_duration_seconds` - Garbage collection metrics

## 🎯 Prometheus Configuration

The Prometheus configuration (`monitoring/prometheus.yml`) scrapes metrics from:

- **task-tracker-api**: Main application metrics at `/metrics`
- **task-tracker-health**: Health checks at `/health`
- **prometheus**: Self-monitoring

## 📊 Grafana Dashboard

The pre-configured dashboard shows:

1. **Task Status Distribution** - Pie chart of completed vs pending tasks
2. **HTTP Request Rate** - Requests per second by endpoint
3. **Response Time** - 95th and 50th percentile response times
4. **CPU Usage** - Application CPU utilization
5. **Memory Usage** - Memory consumption
6. **Service Health** - Up/down status indicator

## 🔧 Manual Setup Steps

If you want to understand what's happening:

### 1. Install prom-client

```bash
cd server
npm install prom-client
```

### 2. Add Metrics Middleware

The metrics middleware (`server/middleware/metrics.js`) automatically:

- Tracks HTTP request metrics
- Monitors response times
- Counts active connections
- Updates task counts

### 3. Expose Metrics Endpoints

- `/health` - Health check (returns JSON with status)
- `/metrics` - Prometheus metrics (text format)

### 4. Configure Prometheus

```yaml
scrape_configs:
  - job_name: "task-tracker-api"
    static_configs:
      - targets: ["backend:5000"]
    scrape_interval: 10s
    metrics_path: "/metrics"
```

### 5. Configure Grafana

- Datasource: Prometheus at `http://prometheus:9090`
- Dashboard: Pre-built JSON configuration
- Auto-provisioning: Automatic setup on container start

## 🐛 Troubleshooting

### Common Issues

1. **Metrics endpoint returns 500 error**

   ```bash
   # Check if prom-client is installed
   docker-compose logs backend
   ```

2. **Grafana shows no data**

   ```bash
   # Verify Prometheus is scraping successfully
   # Visit http://localhost:9090/targets
   ```

3. **Container startup issues**

   ```bash
   # Check all containers are running
   docker-compose ps

   # View logs for specific service
   docker-compose logs prometheus
   docker-compose logs grafana
   ```

### Verification Commands

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test metrics endpoint
curl http://localhost:5000/metrics

# Check Prometheus targets
curl http://localhost:9090/api/v1/targets

# Generate some metrics by making API requests
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📝 Customizing Metrics

To add custom metrics, edit `server/middleware/metrics.js`:

```javascript
// Add custom counter
const customMetric = new client.Counter({
  name: "custom_events_total",
  help: "Total custom events",
  registers: [register],
});

// Use in your code
customMetric.inc();
```

## 🔒 Production Considerations

1. **Security**: Change default Grafana password
2. **Storage**: Configure persistent volumes for metrics data
3. **Retention**: Set appropriate data retention policies
4. **Alerts**: Configure alerting rules for critical metrics
5. **Resources**: Monitor resource usage of monitoring stack itself

## 📚 Further Reading

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [prom-client Documentation](https://github.com/siimon/prom-client)
- [Node.js Monitoring Best Practices](https://blog.risingstack.com/node-js-performance-monitoring-with-prometheus/)
