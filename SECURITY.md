# Security Setup Guide

This guide explains how to secure your Task Incident Tracker application by properly managing secrets and environment variables.

## 🔐 Required GitHub Secrets

Navigate to your repository → Settings → Secrets and Variables → Actions, then add these repository secrets:

### Database Secrets
- `MONGO_ROOT_USERNAME`: Root MongoDB username (e.g., `admin`)
- `MONGO_ROOT_PASSWORD`: Strong root MongoDB password (generate a secure 32+ character password)
- `MONGO_DB_NAME`: Database name (e.g., `task_incident_tracker`)
- `MONGO_APP_USERNAME`: Application MongoDB username (e.g., `taskapp`)
- `MONGO_APP_PASSWORD`: Strong application MongoDB password (generate a secure 32+ character password)

### Application Secrets
- `JWT_SECRET`: JWT signing secret (generate a secure 64+ character string)
- `CORS_ORIGINS`: Allowed CORS origins (e.g., `http://localhost,http://your-domain.com`)

### Infrastructure Secrets
- `EC2_SSH_KEY`: Your EC2 instance private SSH key (entire PEM file content)
- `EC2_HOST`: Your EC2 instance public IP or domain
- `EC2_USERNAME`: EC2 username (usually `ubuntu` for Ubuntu instances)

## 🛡️ Security Best Practices Applied

### 1. **No Hardcoded Credentials**
- ✅ All sensitive values moved to environment variables
- ✅ Template files provided for local development
- ✅ Production secrets managed via GitHub Actions secrets

### 2. **Environment Separation**
- ✅ Different configurations for development, testing, and production
- ✅ Test environment uses safe test credentials
- ✅ Production environment requires all secrets to be properly configured

### 3. **Secure MongoDB Setup**
- ✅ Dynamic database initialization using environment variables
- ✅ Separate root and application users with proper permissions
- ✅ Database connections using authentication

### 4. **Docker Security**
- ✅ No default passwords in docker-compose.yml
- ✅ Environment variables required for all sensitive configuration
- ✅ Proper MongoDB authentication and authorization

## 🚀 Local Development Setup

### 1. Create Environment Files

Copy the template files and fill in your local values:

```bash
# Root directory
cp .env.template .env

# Server directory
cd server
cp .env.template .env

# Client directory  
cd ../client
cp .env.template .env
```

### 2. Generate Secure Secrets

For local development, you can use these commands to generate secure secrets:

```bash
# Generate a strong JWT secret (64 characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate a strong password (32 characters)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### 3. Update Your .env Files

**Root .env:**
```env
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your_generated_root_password
MONGO_DB_NAME=task_incident_tracker
MONGO_APP_USERNAME=taskapp
MONGO_APP_PASSWORD=your_generated_app_password
JWT_SECRET=your_generated_jwt_secret
CORS_ORIGINS=http://localhost,http://localhost:3000
REACT_APP_API_URL=http://localhost:5000/api
```

**Server .env:**
```env
NODE_ENV=development
MONGODB_URI=mongodb://taskapp:your_generated_app_password@localhost:27017/task_incident_tracker?authSource=task_incident_tracker
JWT_SECRET=your_generated_jwt_secret
CORS_ORIGINS=http://localhost,http://localhost:3000
```

**Client .env:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🔍 Security Verification

### Verify No Secrets in Code
Run this command to ensure no secrets remain in your codebase:

```bash
grep -r --exclude-dir=node_modules --exclude-dir=.git --exclude="*.md" \
  -E "(password|secret|key|token|credential|mongodb://.*:.*@)" . || echo "✅ No secrets found in code"
```

### Verify Environment Variables
Check that your environment variables are properly loaded:

```bash
# In server directory
node -e "require('dotenv').config(); console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length || 0)"
```

## 📋 Production Deployment Checklist

Before deploying to production:

- [ ] All GitHub secrets configured
- [ ] `.env` files added to `.gitignore`
- [ ] Template files committed instead of actual `.env` files
- [ ] Strong passwords generated (32+ characters)
- [ ] JWT secret generated (64+ characters)
- [ ] CORS origins properly configured for your domain
- [ ] EC2 SSH key properly configured
- [ ] Database credentials tested

## 🚨 Important Security Notes

1. **Never commit `.env` files** - They contain sensitive information
2. **Use strong, unique passwords** for each environment
3. **Rotate secrets regularly** in production
4. **Monitor access logs** for suspicious activity
5. **Keep dependencies updated** to patch security vulnerabilities

## 🔄 Secret Rotation

To rotate secrets in production:

1. Generate new secrets using the commands above
2. Update GitHub repository secrets
3. Trigger a new deployment
4. Verify the application works with new secrets
5. Update any external services using the old secrets

## 🆘 Troubleshooting

### Common Issues:

**Container fails to start:**
- Check that all required environment variables are set
- Verify database credentials are correct
- Check Docker logs: `docker-compose logs`

**Database connection fails:**
- Verify MongoDB is running: `docker-compose ps`
- Check database credentials match between Docker Compose and application
- Ensure database user has proper permissions

**GitHub Actions deployment fails:**
- Verify all required secrets are set in repository settings
- Check SSH key format (entire PEM file content)
- Verify EC2 instance is accessible

For additional help, check the application logs and GitHub Actions workflow logs.
