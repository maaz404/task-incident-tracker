# Task Incident Tracker

A full-stack web application for managing tasks and incidents with real-time updates, built using React, Node.js, Express, and MongoDB. Features a complete Docker-based development and production environment.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-supported-blue.svg)](https://docker.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org)

## 🚀 **Quick Start**

### **Prerequisites**

- Docker Desktop 4.0+
- Node.js 18+ (for local development)
- Git

### **1. Clone Repository**

```bash
git clone https://github.com/your-username/task-incident-tracker.git
cd task-incident-tracker
```

### **2. Start with Docker (Recommended)**

```bash
# Windows
docker-manage.bat start dev

# Linux/macOS
chmod +x docker-manage.sh
./docker-manage.sh start dev
```

### **3. Access Application**

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017
- **Nginx (Prod)**: http://localhost:8080

## 🏗️ **Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│────│  Nginx Proxy    │────│  Node.js API    │
│   Port: 3000    │    │  Port: 80/8080  │    │  Port: 5000     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                              ┌─────────────────┐
                                              │   MongoDB       │
                                              │   Port: 27017   │
                                              └─────────────────┘
```

## 📁 **Project Structure**

```
task-incident-tracker/
├── 📂 task-incident-tracker-frontend/     # React frontend application
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── 📂 components/                 # Reusable React components
│   │   ├── 📂 services/                   # API service layer
│   │   ├── App.js                         # Main application component
│   │   └── index.js                       # Application entry point
│   ├── Dockerfile & Dockerfile.dev        # Frontend container configs
│   └── package.json                       # Frontend dependencies
├── 📂 task-incident-tracker-backend/      # Node.js backend API
│   ├── 📂 controllers/                    # Request handlers
│   ├── 📂 middleware/                     # Express middleware
│   ├── 📂 models/                         # MongoDB models
│   ├── 📂 routes/                         # API route definitions
│   ├── app.js                             # Express application
│   ├── Dockerfile & Dockerfile.dev        # Backend container configs
│   └── package.json                       # Backend dependencies
├── 📂 nginx/                              # Reverse proxy configuration
├── 📂 docs/                               # Additional documentation
├── docker-compose.yml                     # Default Docker setup
├── docker-compose.dev.yml                 # Development environment
├── docker-compose.prod.yml                # Production environment
├── docker-manage.bat/.sh                  # Docker management scripts
├── mongo-init.js                          # MongoDB initialization
└── package.json                           # Root project configuration
```

## 🐳 **Docker Commands**

### **Management Scripts**

```bash
# Windows
docker-manage.bat [command] [environment]

# Linux/macOS
./docker-manage.sh [command] [environment]
```

### **Available Commands**

| Command   | Description                  | Example                               |
| --------- | ---------------------------- | ------------------------------------- |
| `start`   | Start all services           | `docker-manage.bat start dev`         |
| `stop`    | Stop all services            | `docker-manage.bat stop`              |
| `restart` | Restart services             | `docker-manage.bat restart prod`      |
| `build`   | Build images                 | `docker-manage.bat build`             |
| `logs`    | View service logs            | `docker-manage.bat logs dev`          |
| `status`  | Show service status          | `docker-manage.bat status`            |
| `clean`   | Remove all containers/images | `docker-manage.bat clean`             |
| `shell`   | Open container shell         | `docker-manage.bat shell dev backend` |
| `db`      | Connect to MongoDB           | `docker-manage.bat db prod`           |

### **Environments**

- **`dev`**: Development with hot-reload, debugging tools
- **`prod`**: Production with optimized builds, SSL support
- **`default`**: Standard configuration

## 🛠️ **Development Setup**

### **Local Development (Without Docker)**

```bash
# Install dependencies
npm run install:all

# Start MongoDB (locally or cloud)
# Update MONGODB_URI in backend/.env

# Terminal 1: Start backend
cd task-incident-tracker-backend
npm run dev

# Terminal 2: Start frontend
cd task-incident-tracker-frontend
npm start
```

### **Environment Variables**

Create `.env` files in respective directories:

**Backend (`task-incident-tracker-backend/.env`)**

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://taskapp:taskapp123@mongo:27017/task_incident_tracker?authSource=task_incident_tracker
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=debug
```

**Frontend (`task-incident-tracker-frontend/.env`)**

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
GENERATE_SOURCEMAP=true
```

## 🎯 **Features**

### **Task Management**

- ✅ Create, read, update, delete tasks
- ✅ Status tracking (Open, In Progress, Resolved)
- ✅ Priority levels and categories
- ✅ Real-time updates
- ✅ Search and filtering
- ✅ Responsive design

### **Technical Features**

- ✅ RESTful API design
- ✅ MongoDB with Mongoose ODM
- ✅ React Hooks and Context API
- ✅ Docker multi-stage builds
- ✅ Nginx reverse proxy
- ✅ Request logging middleware
- ✅ Error handling and validation
- ✅ Production optimizations

## 🔌 **API Endpoints**

### **Tasks API**

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/tasks`     | Get all tasks   |
| GET    | `/api/tasks/:id` | Get task by ID  |
| POST   | `/api/tasks`     | Create new task |
| PUT    | `/api/tasks/:id` | Update task     |
| DELETE | `/api/tasks/:id` | Delete task     |

### **Request/Response Examples**

**Create Task**

```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Fix login bug",
  "description": "Users cannot log in after password reset",
  "status": "Open"
}
```

**Response**

```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b1c8b4567",
    "title": "Fix login bug",
    "description": "Users cannot log in after password reset",
    "status": "Open",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🚀 **Deployment**

### **Production with Docker**

```bash
# Build and start production environment
docker-manage.bat prod start

# Monitor production logs
docker-manage.bat prod logs

# Check service health
docker-manage.bat prod status
```

### **Docker Compose Profiles**

```bash
# Development with debugging
docker-compose --profile debug up -d

# Production with monitoring
docker-compose --profile monitoring up -d

# SSL-enabled production
docker-compose --profile ssl up -d
```

## 📊 **Monitoring & Logging**

### **Log Locations**

```bash
# Application logs
docker-compose logs -f backend frontend

# Nginx logs
docker-compose logs -f nginx

# MongoDB logs
docker-compose logs -f mongo

# System resource usage
docker stats
```

### **Health Checks**

- **Frontend**: http://localhost:3000
- **Backend Health**: http://localhost:5000/health
- **API Status**: http://localhost:5000/api/tasks

## 🧪 **Testing**

```bash
# Run backend tests
cd task-incident-tracker-backend
npm test

# Run frontend tests
cd task-incident-tracker-frontend
npm test

# Docker-based testing
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 🛡️ **Security**

### **Implemented Security Features**

- CORS configuration
- Input validation and sanitization
- MongoDB injection prevention
- Rate limiting (production)
- SSL/TLS encryption (production)
- Container security best practices

### **Security Configuration**

```javascript
// Backend security middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json({ limit: "10mb" }));
```

## 🔧 **Troubleshooting**

### **Common Issues**

**Port Conflicts**

```bash
# Check port usage
netstat -tulpn | grep :3000

# Kill process using port
sudo kill -9 $(lsof -t -i:3000)
```

**Docker Issues**

```bash
# Restart Docker daemon
sudo systemctl restart docker

# Clear Docker cache
docker system prune -a -f --volumes

# Rebuild without cache
docker-compose build --no-cache
```

**Database Connection**

```bash
# Test MongoDB connection
docker-compose exec mongo mongosh task_incident_tracker -u taskapp -p taskapp123

# Reset database
docker-compose exec mongo mongosh --eval "db.dropDatabase()" task_incident_tracker
```

## 📈 **Performance Optimization**

### **Frontend Optimizations**

- Code splitting with React.lazy()
- Memoization with React.memo()
- Virtual scrolling for large lists
- Image lazy loading
- Bundle analysis with webpack-bundle-analyzer

### **Backend Optimizations**

- Database indexing
- Response compression
- Caching with Redis (optional)
- Connection pooling
- Query optimization

### **Docker Optimizations**

- Multi-stage builds
- Layer caching
- .dockerignore files
- Health checks
- Resource limits

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### **Development Workflow**

```bash
# Setup development environment
git clone <repo>
npm run install:all
docker-manage.bat start dev

# Make changes and test
npm run test
docker-manage.bat logs dev

# Submit PR with tests
git push origin feature-branch
```

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- React team for the amazing framework
- Express.js community for robust backend tools
- MongoDB for flexible data storage
- Docker for containerization
- Nginx for reliable proxy services

## 📞 **Support**

- **Issues**: [GitHub Issues](https://github.com/your-username/task-incident-tracker/issues)
- **Documentation**: [Wiki](https://github.com/your-username/task-incident-tracker/wiki)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/task-incident-tracker/discussions)

---

**Built with ❤️ using React, Node.js, and Docker**
