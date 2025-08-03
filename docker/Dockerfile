# ────────────── 🏗️ BUILDER ──────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copy all files first (including .env.production and .env.staging)
COPY . .

# Set build ARG and ENV
ARG APP_ENV
ENV APP_ENV=$APP_ENV

# ✅ Install and build using correct Vite mode
# Vite uses the correct `.env.[mode]` file automatically
RUN npm install && npm run build -- --mode=$APP_ENV


# ────────────── 🚀 RUNTIME ──────────────
FROM alpine:3.20 AS runtime
WORKDIR /app

# Install required packages
RUN apk add --no-cache bash coreutils nginx

# Copy build ARG and expose as runtime ENV (optional)
ARG APP_ENV
ENV APP_ENV=$APP_ENV

# Copy static frontend build to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config and entrypoint
COPY docker/nginx.conf /etc/nginx/nginx.conf


# Expose nginx port
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]