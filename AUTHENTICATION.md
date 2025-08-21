# Authentication & Security Guide

This document explains how to use the authentication system in the Task Incident Tracker API.

## 🔐 Authentication Overview

The API uses **JWT (JSON Web Token)** authentication with the following features:
- Secure user registration and login
- Password hashing with bcrypt (12 rounds)
- Account lockout after failed attempts
- Rate limiting on authentication endpoints
- Token refresh capability
- Role-based authorization (user/admin)

## 🚀 Quick Start

### 1. Register a New User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "MySecure123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

### 2. Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "login": "johndoe",  // Can be username or email
  "password": "MySecure123"
}
```

### 3. Use Protected Endpoints

Include the token in the Authorization header:

```bash
GET /api/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📚 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/health` | API health check |

### Protected Endpoints (Require Authentication)

#### User Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/me` | Get current user profile |
| PUT | `/api/auth/me` | Update user profile |
| PUT | `/api/auth/change-password` | Change password |
| POST | `/api/auth/logout` | Logout user |

#### Task Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get user's tasks (with filtering) |
| GET | `/api/tasks/stats` | Get task statistics |
| GET | `/api/tasks/:id` | Get specific task |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## 🔍 Request Examples

### Register User

```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'johndoe',
    email: 'john@example.com',
    password: 'MySecure123',
    firstName: 'John',
    lastName: 'Doe'
  })
});
```

### Login User

```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    login: 'johndoe',
    password: 'MySecure123'
  })
});

const data = await response.json();
const token = data.data.token;
```

### Create Task (Protected)

```javascript
const response = await fetch('/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'Fix authentication bug',
    description: 'Update the JWT middleware',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-12-31T23:59:59.000Z'
  })
});
```

### Get Tasks with Filtering

```javascript
const response = await fetch('/api/tasks?status=pending&priority=high&page=1&limit=10', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## 🛡️ Security Features

### Password Requirements
- Minimum 6 characters
- Must contain at least one lowercase letter
- Must contain at least one uppercase letter  
- Must contain at least one number

### Account Lockout
- Account locks after 5 failed login attempts
- Lockout duration: 2 hours
- Automatic unlock after lockout period

### Rate Limiting
- Authentication endpoints: 5 requests per 15 minutes
- General API: 100 requests per 15 minutes
- Password reset: 3 requests per hour

### Token Security
- Access tokens expire in 7 days (configurable)
- Refresh tokens expire in 30 days
- Tokens include user ID and role
- Secure token generation and validation

## 🔧 Frontend Integration

### React Hook Example

```javascript
import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Verify token and get user info
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data.user);
      } else {
        // Token is invalid, remove it
        logout();
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    if (data.success) {
      setToken(data.data.token);
      setUser(data.data.user);
      localStorage.setItem('token', data.data.token);
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const authFetch = async (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    authFetch,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## 📋 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Human readable error message",
  "error": "ERROR_CODE",
  "details": [...] // Optional validation details
}
```

### Common Error Codes

- `VALIDATION_ERROR`: Input validation failed
- `USER_EXISTS`: Username or email already taken
- `INVALID_CREDENTIALS`: Wrong username/password
- `ACCOUNT_LOCKED`: Too many failed attempts
- `MISSING_TOKEN`: Authorization header missing
- `INVALID_TOKEN`: Token is malformed or invalid
- `TOKEN_EXPIRED`: Token has expired
- `INSUFFICIENT_PERMISSIONS`: User lacks required role
- `TASK_NOT_FOUND`: Task doesn't exist or no access
- `RATE_LIMIT_EXCEEDED`: Too many requests

## 🔄 Token Refresh

When an access token expires, use the refresh token:

```javascript
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken })
  });

  const data = await response.json();
  
  if (data.success) {
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('refreshToken', data.data.refreshToken);
    return data.data.token;
  } else {
    // Refresh token is invalid, redirect to login
    logout();
  }
};
```

## 🧪 Testing the API

You can test the API using curl, Postman, or any HTTP client:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123456",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "login": "testuser",
    "password": "Test123456"
  }'

# Create task (replace TOKEN with actual token)
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title": "Test Task",
    "description": "This is a test task",
    "priority": "medium"
  }'
```

## 🔒 Production Considerations

1. **Environment Variables**: Set secure JWT secrets in production
2. **HTTPS**: Always use HTTPS in production
3. **Rate Limiting**: Adjust limits based on your usage patterns
4. **Monitoring**: Log authentication events and failed attempts
5. **Token Rotation**: Implement regular token rotation
6. **Session Management**: Consider implementing session blacklisting
7. **Password Policy**: Enforce stronger password requirements if needed
