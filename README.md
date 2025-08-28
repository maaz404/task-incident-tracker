# Task Incident Tracker

A full-stack task management application with user authentication, real-time updates, and comprehensive monitoring.

## Features

- 🔐 **User Authentication** - Secure registration and login with JWT
- 📝 **Task Management** - Create, edit, delete, and organize tasks
- 🔍 **Advanced Filtering** - Filter tasks by Status (Pending, In Progress, Complete) and Type (Task, Incident, Bug, Feature, Maintenance)
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Real-time Updates** - Instant task updates across the application
- 📊 **Monitoring & Metrics** - Comprehensive metrics via Prometheus and Grafana
- 🧪 **Load Testing** - Built-in k6 load testing infrastructure

## Tech Stack

- **Frontend:** React 18, CSS3, Fetch API
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database:** MongoDB with Mongoose
- **Monitoring:** Prometheus, Grafana
- **Load Testing:** k6
- **Deployment:** Docker, GitHub Actions, AWS EC2

## Quick Start

### Using Docker (Recommended)

```bash
git clone https://github.com/maaz404/task-incident-tracker.git
cd task-incident-tracker
docker-compose up -d
```

Visit `http://localhost` to use the application.
Visit `http://localhost:3000` to access Grafana dashboards (default login: admin/admin123).
Visit `http://localhost:9090` to access Prometheus metrics.

### Manual Setup

**Prerequisites:** Node.js 18+, MongoDB

1. **Backend Setup:**

```bash
cd server
npm install
npm start
```

2. **Frontend Setup:**

```bash
cd client
npm install
npm start
```

3. **Visit:** `http://localhost:3000`

## Environment Configuration

**server/.env:**

```env
MONGODB_URI=mongodb://localhost:27017/task_incident_tracker
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

**client/.env:**

```env
REACT_APP_API_URL=/api
```

## API Endpoints

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/auth/register` | User registration  |
| POST   | `/api/auth/login`    | User login         |
| GET    | `/api/tasks`         | Get user tasks     |
| POST   | `/api/tasks`         | Create new task    |
| PUT    | `/api/tasks/:id`     | Update task        |
| DELETE | `/api/tasks/:id`     | Delete task        |
| GET    | `/api/health`        | Health check       |
| GET    | `/api/metrics`       | Prometheus metrics |

## System Architecture

### Architecture Diagram

```
                              ┌──────────────┐
                              │   Client     │
                              │  (Browser)   │
                              └──────┬───────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────┐
│                         Nginx (80)                         │
└────────────────────────────┬───────────────────────────────┘
                             │
       ┌─────────────────────┼─────────────────────┐
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐      ┌───────────────┐     ┌──────────────┐
│  React App  │      │ Express API   │     │  Monitoring  │
│   (Frontend)│◄────►│   (Backend)   │────►│  Stack       │
└─────────────┘      └───────┬───────┘     └──────────────┘
                            │                     │
                            ▼                     ▼
                     ┌─────────────┐      ┌──────────────┐
                     │   MongoDB   │      │ Prometheus   │
                     │  Database   │      │  & Grafana   │
                     └─────────────┘      └──────────────┘
```

### Component Interactions:

1. **Client Browser**: User interface for interacting with the application
2. **Nginx**: Web server and reverse proxy routing requests to appropriate services
3. **React Frontend**: Single-page application handling UI and state management
4. **Express API**: RESTful API handling business logic and database operations
5. **MongoDB**: NoSQL database storing tasks, user data, and application state
6. **Monitoring Stack**: Collects metrics, logs performance data, and visualizes system health

All components are containerized with Docker for consistent deployment across environments.

## CI/CD Pipeline

This project uses GitHub Actions for Continuous Integration and Continuous Deployment.

### Pipeline Workflow

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│   Code Push   │────►│    Build      │────►│     Test      │────►│   Deploy      │
│   to Main     │     │   Containers  │     │  Application  │     │  to EC2       │
└───────────────┘     └───────────────┘     └───────────────┘     └───────────────┘
```

1. **Trigger**: Push to `main` branch initiates the workflow
2. **Build Phase**:
   - Checks out code
   - Sets up Node.js environment
   - Builds Docker images for frontend and backend
   - Pushes images to GitHub Container Registry (or DockerHub)
3. **Testing Phase**:
   - Runs unit tests
   - Performs code linting and static analysis
   - Validates Docker containers
4. **Deployment Phase**:
   - Connects to EC2 instance via SSH
   - Pulls latest Docker images
   - Updates docker-compose configuration
   - Restarts application stack
   - Runs health checks to verify deployment

### Required Secrets:

- `EC2_SSH_KEY` - Private SSH key for EC2 access
- `EC2_HOST` - EC2 public IP address
- `EC2_USERNAME` - EC2 username (ubuntu)

## Deployment Instructions

### Prerequisites

- AWS EC2 instance (t2.micro or larger recommended)
- Domain name (optional)
- Docker and Docker Compose installed on the server
- MongoDB (either local or Atlas)

### Step 1: Server Preparation

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io docker-compose

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add user to Docker group (logout/login required after this)
sudo usermod -aG docker $USER
```

### Step 2: Application Deployment

**Manual Deployment:**

1. SSH into your EC2 instance:

   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

2. Clone the repository:

   ```bash
   git clone https://github.com/maaz404/task-incident-tracker.git
   cd task-incident-tracker
   ```

3. Configure environment:

   ```bash
   # Create .env file
   cat > .env << EOL
   MONGODB_URI=mongodb://taskapp:taskapp123@mongo:27017/task_incident_tracker?authSource=task_incident_tracker
   JWT_SECRET=your_secure_secret_key
   EOL
   ```

4. Start the application:
   ```bash
   docker-compose up -d
   ```

**Automated Deployment:**

Push to the `main` branch to trigger the GitHub Actions workflow.

### Step 3: Verify Deployment

1. Access the application at `http://13.60.158.98`
2. Access Grafana at `http://13.60.158.98:3000`
3. Access Prometheus at `http://13.60.158.98:9090`

### Step 4: SSL Setup (Optional)

To enable HTTPS with Let's Encrypt:

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Certbot will modify nginx config automatically
# SSL certificates will auto-renew
```

## Monitoring & Load Testing

### Monitoring Infrastructure

The application includes a comprehensive monitoring stack:

1. **Prometheus**: Collects and stores metrics from the application

   - Endpoint: `http://localhost:9090`
   - Key metrics:
     - HTTP request count, duration, and status codes
     - MongoDB operation metrics
     - API endpoint performance
     - System resource usage (CPU, memory)

2. **Grafana**: Visualizes metrics with pre-configured dashboards
   - Endpoint: `http://localhost:3000` (default login: admin/admin123)
   - Main dashboards:
     - System Overview: CPU, memory, and network usage
     - API Performance: Request rates, latencies, and error rates
     - Database Performance: Query times and connection counts
     - User Activity: Active sessions and request patterns

### How to Access Monitoring

1. **For local development**:

   - Prometheus: http://localhost:9090
   - Grafana: http://localhost:3000

2. **For production**:
   - Prometheus: http://13.60.158.98:9090
   - Grafana: http://13.60.158.98:3000

### Load Testing with k6

The project includes k6 load testing scripts to simulate different user loads:

1. **Setup k6**:

   ```bash
   # Install k6 on your local machine
   # Windows (Chocolatey):
   choco install k6

   # macOS:
   brew install k6

   # Linux:
   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
   echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
   sudo apt update && sudo apt install k6
   ```

2. **Run load tests**:

   ```bash
   # Navigate to testing directory
   cd testing

   # Run tests (Windows)
   .\run-load-tests.bat [low|medium|high|spike|all]

   # Run tests (Linux/macOS)
   ./run-load-tests.sh [low|medium|high|spike|all]
   ```

3. **Test scenarios**:

   - **Low load**: 5 concurrent users - suitable for development testing
   - **Medium load**: 20 concurrent users - simulates normal production load
   - **High load**: 50-100 concurrent users - stress testing
   - **Spike test**: Sudden jump to 200 users - tests system recovery

4. **View results**:
   - Real-time in console
   - Detailed reports in `testing/results` directory
   - Visualization in Grafana dashboard "Load Test Results"

### Performance Tuning

Based on load testing results, consider the following optimizations:

1. **Database indexes**:

   ```javascript
   // Add to MongoDB schema as needed
   taskSchema.index({ userId: 1, status: 1 });
   taskSchema.index({ type: 1 });
   ```

2. **Caching layer**:

   - Consider adding Redis for caching frequently accessed data

3. **Load balancing**:
   - Set up multiple backend instances behind a load balancer for high traffic scenarios

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build for production
npm run build

# Run with Docker
docker-compose up --build
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/components/     # React components
│   ├── src/services/       # API services
│   └── nginx.conf          # Nginx configuration
├── server/                 # Express backend
│   ├── routes/             # API routes
│   ├── models/             # MongoDB schemas
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth & metrics middleware
│   └── app.js              # Main application file
├── monitoring/             # Monitoring configuration
│   ├── grafana/            # Grafana dashboards & config
│   └── prometheus.yml      # Prometheus configuration
├── testing/                # Load testing
│   ├── k6/                 # k6 test scripts
│   └── run-load-tests.sh   # Test runner scripts
├── .github/workflows/      # CI/CD pipeline
└── docker-compose.yml      # Docker services
```

## License

MIT License - See [LICENSE](LICENSE) for details.
