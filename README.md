# Task Incident Tracker

A secure full-stack web application for managing tasks and incidents, built with React, Node.js, Express, and MongoDB.

## Features

- ✅ Create, edit, and delete tasks
- ✅ Status tracking (Open, In Progress, Resolved)
- ✅ Real-time updates and filtering
- ✅ Responsive design
- ✅ RESTful API
- 🔐 Secure environment variable management
- 🚀 Automated CI/CD with GitHub Actions
- 🐳 Docker containerization

## 🔐 Security First

This application implements security best practices:
- No hardcoded credentials in source code
- Environment-based configuration
- Secure MongoDB authentication
- GitHub Actions secrets management

**⚠️ Important:** Before running locally or deploying, please read the [Security Setup Guide](SECURITY.md).

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

2. **🔐 Setup Environment Variables (Required)**

   **Important:** Set up environment variables before proceeding:

   ```bash
   # Copy template files
   cp .env.template .env
   cp server/.env.template server/.env  
   cp client/.env.template client/.env
   
   # Edit the files with your secure values
   # See SECURITY.md for detailed instructions
   ```

3. **Setup Backend**

   ```bash
   cd server
   npm install
   ```

4. **Setup Frontend**

   ```bash
   cd ../client
   npm install
   ```

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