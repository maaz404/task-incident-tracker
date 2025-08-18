# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better Docker layer caching)
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production && npm cache clean --force

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S taskapp -u 1001

# Copy application source code
COPY . .

# Copy environment file (optional - usually handled via docker-compose)
COPY .env* ./

# Change ownership to non-root user
RUN chown -R taskapp:nodejs /app

# Switch to non-root user
USER taskapp

# Expose port 5000
EXPOSE 5000

# Health check to ensure backend is responding
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "const http=require('http'); http.get('http://localhost:5000/api/tasks', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1));"

# Start the application
CMD ["npm", "start"]
