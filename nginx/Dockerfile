# Nginx Dockerfile
FROM nginx:alpine

# Copy configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Create directories for SSL
RUN mkdir -p /etc/nginx/ssl

# Create non-root user
RUN addgroup -g 1001 -S nginx
RUN adduser -S nginxuser -u 1001

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
