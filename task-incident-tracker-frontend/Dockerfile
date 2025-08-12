# Multi-stage Dockerfile for React frontend
FROM node:18-alpine AS base

WORKDIR /app

# Copy package files
COPY package*.json ./

# Development stage
FROM base AS development
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]

# Build stage
FROM base AS build
ENV NODE_ENV=production
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage - serve with nginx
FROM nginx:alpine AS production
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -g 1001 -S nginx
RUN adduser -S nginxuser -u 1001

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
