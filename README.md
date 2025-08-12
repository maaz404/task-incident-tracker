# Task & Incident Tracker

A full-stack web application for managing tasks and tracking incidents with CRUD operations, built with Node.js/Express backend and React frontend.

##  Live Application

- **Frontend**: [https://task-incident-tracker-frontend.vercel.app](https://task-incident-tracker-frontend.vercel.app)
- **Backend API**: [https://task-incident-tracker-backend.onrender.com](https://task-incident-tracker-backend.onrender.com)
- **API Documentation**: [https://task-incident-tracker-backend.onrender.com/api/tasks](https://task-incident-tracker-backend.onrender.com/api/tasks)

## 📋 Features

### ✅ Core Functionality
- **Create Tasks**: Add new tasks with title, description, and status
- **View Tasks**: List all tasks with filtering capabilities
- **Update Tasks**: Edit existing task details
- **Delete Tasks**: Remove tasks with confirmation
- **Status Management**: Track tasks as Open, In Progress, or Resolved

### 🎨 UI/UX Features
- **Status Filtering**: Filter tasks by All/Open/In Progress/Resolved
- **Color-coded Status**: Visual status indicators (Red: Open, Orange: In Progress, Green: Resolved)
- **Form Validation**: Client-side validation with error messages
- **Loading States**: Visual feedback during API operations
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on desktop and mobile devices

### 🔧 Technical Features
- **RESTful API**: Complete CRUD operations
- **MongoDB Integration**: Persistent data storage
- **CORS Configuration**: Secure cross-origin requests
- **Environment Configuration**: Configurable API endpoints
- **Docker Support**: Containerized deployment
- **Production Ready**: Optimized for deployment

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/HTTPS    ┌──────────────────┐
│   React Frontend │ ◄──────────────► │ Node.js Backend  │
│   (Port 3000)    │                  │   (Port 5000)    │
└─────────────────┘                  └──────────────────┘
                                               │
                                               ▼
                                      ┌──────────────────┐
                                      │  MongoDB Atlas   │
                                      │    (Cloud DB)    │
                                      └──────────────────┘
```

## 📁 Project Structure

```
task-incident-tracker/
├── task-incident-tracker-backend/     # Node.js/Express API
│   ├── controllers/
│   │   └── tasksController.js         # Business logic
│   ├── models/
│   │   └── Task.js                    # MongoDB schema
│   ├── routes/
│   │   └── tasks.js                   # API routes
│   ├── middleware/
│   │   └── requestLogger.js           # Request logging
│   ├── app.js                         # Main server file
│   ├── package.json                   # Dependencies
│   ├── Dockerfile                     # Container config
│   └── .env                           # Environment variables
│
├── task-incident-tracker-frontend/    # React application
│   ├── public/
│   │   └── index.html                 # HTML template
│   ├── src/
│   │   ├── components/                # React components
│   │   │   ├── TaskList.js           # Task listing
│   │   │   ├── TaskItem.js           # Individual task
│   │   │   ├── TaskForm.js           # Add/Edit form
│   │   │   └── StatusFilter.js       # Status filter
│   │   ├── services/
│   │   │   └── taskService.js        # API communication
│   │   ├── App.js                    # Main component
│   │   ├── index.js                  # Entry point
│   │   └── index.css                 # Styling
│   ├── package.json                  # Dependencies
│   └── .env                          # Environment variables
│
├── docker-compose.yml                 # Multi-container setup
├── nginx.conf                         # Reverse proxy config
└── README.md                          # This file
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: CORS for cross-origin requests
- **Environment**: dotenv for configuration
- **Containerization**: Docker

### Frontend
- **Framework**: React 18+ with Hooks
- **HTTP Client**: Axios for API requests
- **State Management**: React useState/useEffect
- **Styling**: CSS3 with responsive design
- **Build Tool**: Create React App
- **Environment**: Environment variables for API configuration

### DevOps & Deployment
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx
- **Cloud Hosting**: AWS EC2, Vercel, Render
- **Database**: MongoDB Atlas (Cloud)
- **Version Control**: Git & GitHub

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (for cloud database)
- Docker (optional, for containerized deployment)

### 1. Clone Repository
```bash
git clone https://github.com/maaz404/task-incident-tracker.git
cd task-incident-tracker
```

### 2. Backend Setup
```bash
cd task-incident-tracker-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-incident-tracker
# PORT=5000
# NODE_ENV=development
# CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Start backend server
npm start
```

**Backend will run on**: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../task-incident-tracker-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with backend URL
# REACT_APP_API_URL=http://localhost:5000
# REACT_APP_API_BASE_PATH=/api

# Start frontend development server
npm start
```

**Frontend will run on**: `http://localhost:3001`

### 4. Database Setup
1. **Create MongoDB Atlas Account**: [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. **Create a Cluster** (free tier available)
3. **Get Connection String** and add to backend `.env` file
4. **Create Database User** with read/write permissions
5. **Whitelist IP Addresses** (or use 0.0.0.0/0 for development)

## 🌐 API Integration

### Base URL
- **Local Development**: `http://localhost:5000/api`
- **Production**: `https://task-incident-tracker-backend.onrender.com/api`

### API Endpoints

#### Tasks
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/tasks` | Get all tasks | - |
| POST | `/api/tasks` | Create new task | `{ title, description, status }` |
| PUT | `/api/tasks/:id` | Update task | `{ title, description, status }` |
| DELETE | `/api/tasks/:id` | Delete task | - |

#### Task Schema
```javascript
{
  _id: "string",           // Auto-generated MongoDB ID
  title: "string",         // Required, 3-100 characters
  description: "string",   // Optional, max 500 characters
  status: "string",        // Enum: ["Open", "In Progress", "Resolved"]
  createdAt: "datetime",   // Auto-generated timestamp
  updatedAt: "datetime"    // Auto-generated timestamp
}
```

#### Example API Usage
```javascript
// Get all tasks
GET /api/tasks
Response: [{ _id, title, description, status, createdAt, updatedAt }]

// Create task
POST /api/tasks
Body: { "title": "Fix login bug", "description": "Login not working", "status": "Open" }
Response: { _id, title, description, status, createdAt, updatedAt }

// Update task
PUT /api/tasks/60d5ecb54b24550f8c4e4b3a
Body: { "status": "In Progress" }
Response: { _id, title, description, status, createdAt, updatedAt }

// Delete task
DELETE /api/tasks/60d5ecb54b24550f8c4e4b3a
Response: { message: "Task deleted successfully" }
```

## 🚀 Deployment

### Production Deployment Options

#### Option 1: AWS EC2 (Full Control)
```bash
# 1. Launch EC2 instance (t2.micro for free tier)
# 2. Configure security groups (ports 22, 80, 443)
# 3. Install Docker and Docker Compose
# 4. Clone repository and configure environment
# 5. Run with Docker Compose

docker-compose -f docker-compose.production.yml up --build -d
```

#### Option 2: Separate Services
- **Backend**: Deploy to Render/Railway/Heroku
- **Frontend**: Deploy to Vercel/Netlify
- **Database**: MongoDB Atlas (cloud)

#### Option 3: Containerized Deployment
```bash
# Build and run all services
docker-compose up --build -d

# Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Full App (via Nginx): http://localhost
```

### Environment Configuration

#### Production Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/task-incident-tracker
CORS_ORIGINS=https://your-frontend-domain.com
```

#### Production Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_API_BASE_PATH=/api
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend routes
    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API routes
    location /api/ {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] **Create Task**: Add new task with title, description, status
- [ ] **View Tasks**: List displays all tasks with correct information
- [ ] **Filter Tasks**: Status filter shows correct subset
- [ ] **Update Task**: Edit task details and status
- [ ] **Delete Task**: Remove task with confirmation
- [ ] **Form Validation**: Required fields and error messages
- [ ] **Responsive Design**: Works on mobile and desktop
- [ ] **Error Handling**: API errors display user-friendly messages

### API Testing
```bash
# Test backend endpoints
curl -X GET http://localhost:5000/api/tasks
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Testing","status":"Open"}'
```

## 🔧 Development

### Available Scripts

#### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

#### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

#### Docker
```bash
docker-compose up --build    # Build and start all services
docker-compose down          # Stop all services
docker-compose logs -f       # View logs
```

### Development Workflow
1. **Backend Changes**: Server auto-restarts with nodemon
2. **Frontend Changes**: Hot reload in development mode
3. **Database Changes**: Update models and restart backend
4. **Styling Changes**: CSS updates reflect immediately

## 🔒 Security Considerations

- **CORS**: Configured for specific origins in production
- **Input Validation**: Server-side validation for all inputs
- **Environment Variables**: Sensitive data in `.env` files
- **MongoDB**: Connection string with authentication
- **Rate Limiting**: Consider adding in production
- **HTTPS**: Use SSL certificates in production

## 📈 Performance Optimizations

- **Frontend**: React optimizations (useCallback, useMemo)
- **Backend**: MongoDB indexing on frequently queried fields
- **Caching**: Consider Redis for frequent queries
- **CDN**: Use CDN for static assets in production
- **Compression**: Gzip compression for API responses

## 🐛 Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Check if port 5000 is available
lsof -i :5000
# Kill process if needed
kill -9 <PID>
```

#### Frontend Can't Connect to Backend
- Check API URL in frontend `.env`
- Verify backend is running and accessible
- Check CORS configuration in backend

#### Database Connection Issues
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

#### Docker Issues
```bash
# Clean up Docker
docker system prune -a
docker-compose down -v
docker-compose up --build
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines
- Follow existing code style and structure
- Add comments for complex logic
- Update README for new features
- Test changes thoroughly before committing

## 📝 Reflection Note - AI Usage

This project was developed as part of an internship with specific protocols regarding AI assistance. AI tools were utilized in the following capacity:

### AI Assistance Usage
- **Deployment Guidance**: AI was used to provide step-by-step deployment instructions for AWS EC2, Docker configuration, and cloud service integration
- **Debugging Support**: AI helped troubleshoot technical issues including CORS configuration, environment variable setup, and Docker containerization problems
- **Code Structure Optimization**: AI provided suggestions for improving code organization, error handling patterns, and best practices implementation
- **Documentation Creation**: AI assisted in creating comprehensive documentation including this README file, API documentation, and deployment guides

### Original Development Work
- **Core Application Logic**: All business logic, component architecture, and feature implementation was developed independently
- **Database Design**: MongoDB schema design and data modeling was created without AI assistance  
- **UI/UX Design**: Frontend component design, styling, and user interface decisions were made independently
- **Problem-Solving Approach**: Overall project architecture and technical decision-making process was done without AI dependency

### Learning Outcomes
The use of AI tools enhanced the learning experience by providing quick solutions to deployment challenges and configuration issues, allowing more time to focus on core application development and understanding full-stack architecture principles. AI assistance was particularly valuable for understanding DevOps concepts and production deployment best practices.

**AI Usage Classification**: Limited to deployment guidance, debugging assistance, and documentation enhancement only.

## 📄 License

This project is part of an internship program and is intended for educational and portfolio purposes.

## 👤 Author

**Maaz Sheikh** - [GitHub](https://github.com/maaz404)

---

### 📞 Support

If you have any questions or issues, please:
1. Check the troubleshooting section above
2. Review the API documentation
3. Open an issue on GitHub
4. Contact the development team

**Happy Task Tracking! 🎯**
