# Task Incident Tracker

A secure full-stack web application for managing tasks and incidents, built with React, Node.js, Express, and MongoDB.

## Features

- ✅ **User Authentication**: Simple JWT-based authentication with registration and login
- ✅ **Secure Task Management**: Create, edit, and delete tasks (user-owned)
- ✅ **Basic Filtering**: Status tracking, priority levels
- ✅ **User Profiles**: Profile management
- ✅ **Simple Security**: JWT token authentication and password hashing
- ✅ **RESTful API**: Clean API with basic error handling
- ✅ **Responsive Design**: Works on desktop and mobile devices

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Security**: Bcrypt hashing for password protection
- **User Ownership**: Users can only access their own tasks
- **Input Validation**: Basic request validation
- **CORS Protection**: Cross-origin resource sharing enabled

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
   JWT_SECRET=your_super_secret_jwt_key_change_in_production_at_least_32_characters_long
   JWT_EXPIRES_IN=7d
   CORS_ORIGINS=http://localhost:3000
   ```

5. **Start the Application**

   Using Docker (Recommended):
   ```bash
   docker-compose up --build
   ```

   Or manually:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend  
   cd client
   npm start
   ```

6. **Create Your First User**

   Visit `http://localhost:3000` and register a new account, or use the API directly:

   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "username": "admin",
       "email": "admin@example.com", 
       "password": "Admin123",
       "firstName": "Admin",
       "lastName": "User"
     }'
   ```

## 📚 API Documentation

For detailed API documentation including all endpoints, authentication, and examples, see [AUTHENTICATION.md](AUTHENTICATION.md).

### Quick API Reference

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get user profile
- `PUT /api/auth/change-password` - Change password

**Tasks (Protected):**
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

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

testing ttesintinf
