# syntax=docker/dockerfile:1.7
# Multi-stage build for bsp-website (VitePress)
# - builder: compiles the static site
# - runtime: nginx:alpine serving the pre-built site as non-root

FROM node:20-alpine AS builder
WORKDIR /app

# Install deps first for better layer caching
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy rest of the source and build the VitePress site
COPY . .
RUN npm run build

# ------- Runtime -------
FROM nginx:alpine AS runtime

# Copy the pre-built static site and the hardened nginx config
COPY --from=builder /app/.vitepress/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# nginx:alpine already runs the master as root (required to bind 80) and
# workers as the `nginx` user. For stricter isolation, put this behind an
# ingress/reverse proxy and run with --user or a read-only root filesystem.
CMD ["nginx", "-g", "daemon off;"]
