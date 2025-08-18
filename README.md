# Task Incident Tracker

A simple full-stack web application for managing tasks and incidents, built with React, Node.js, Express, and MongoDB.

## Features

- ✅ Create, edit, and delete tasks
- ✅ Status tracking (Open, In Progress, Resolved)
- ✅ Real-time updates and filtering
- ✅ Responsive design
- ✅ RESTful API

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/maaz404/task-incident-tracker.git
   cd task-incident-tracker
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   ```

3. **Setup Frontend**

   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**

   Create `server/.env`:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task_incident_tracker
   CORS_ORIGIN=http://localhost:3000
   ```

   Create `client/.env`:

   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

### Running the Application

1. **Start MongoDB** (if using local instance)

2. **Start Backend** (Terminal 1)

   ```bash
   cd server
   npm start
   ```

3. **Start Frontend** (Terminal 2)

   ```bash
   cd client
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
task-incident-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Route handlers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── app.js            # Express app
│   └── package.json
├── nginx/                 # Nginx configuration
└── README.md
```

## API Endpoints

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/tasks`     | Get all tasks   |
| GET    | `/api/tasks/:id` | Get task by ID  |
| POST   | `/api/tasks`     | Create new task |
| PUT    | `/api/tasks/:id` | Update task     |
| DELETE | `/api/tasks/:id` | Delete task     |

## Technology Stack

- **Frontend**: React 18, CSS3, Fetch API
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Deployment**: AWS EC2, Nginx, PM2

## Deployment

### AWS EC2 Deployment

1. **Setup EC2 Instance** with Node.js, MongoDB, and Nginx
2. **Clone repository** to EC2
3. **Install dependencies** for both client and server
4. **Build frontend** for production:
   ```bash
   cd client
   npm run build
   ```
5. **Configure Nginx** to serve frontend and proxy API requests
6. **Use PM2** to manage Node.js process:
   ```bash
   pm2 start server/app.js --name task-tracker
   pm2 startup
   pm2 save
   ```

### Docker Deployment

1. **Prerequisites**: 
   - Docker and Docker Compose installed
   - Stop any system Nginx service to avoid port conflicts: `sudo systemctl stop nginx`

2. **Build React App** (required before starting containers):
   ```bash
   cd client
   npm install
   npm run build
   cd ..
   ```

3. **Start Services**:
   ```bash
   docker compose up -d --build
   ```

4. **Verify Deployment**:
   - Visit `http://your-server-ip` to see the React app
   - API endpoints are available at `http://your-server-ip/api/tasks`
   - Check service health: `docker compose ps`

5. **View Logs**:
   ```bash
   docker compose logs -f
   ```

6. **Stop Services**:
   ```bash
   docker compose down
   ```

#### Troubleshooting Docker Deployment

**Problem: "Welcome to nginx!" page instead of React app**
- **Cause**: React build directory doesn't exist or incorrect nginx volume mount
- **Solution**: 
  ```bash
  cd client && npm run build && cd ..
  docker compose down && docker compose up -d --build
  ```

**Problem: Port 80 already in use**
- **Cause**: System nginx or other service using port 80
- **Solution**: 
  ```bash
  sudo systemctl stop nginx
  sudo lsof -i :80  # Check what's using port 80
  docker compose down && docker compose up -d
  ```

**Problem: API requests fail (Error Loading Tasks)**
- **Cause**: Backend service not running or network issues
- **Solution**:
  ```bash
  docker compose logs backend  # Check backend logs
  docker compose restart backend
  ```

**Problem: Orphan containers or network conflicts**
- **Solution**: Clean up Docker environment
  ```bash
  docker compose down -v --remove-orphans
  docker system prune -f
  docker compose up -d --build
  ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

---

**Built with ❤️ by [Maaz Sheikh](https://github.com/maaz404)**
