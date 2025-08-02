#!/bin/bash

set -e

echo "🚧 Rebuilding and running STAGING frontend..."

# ────────────── 🔧 CONFIG ──────────────
PROJECT_NAME="bloxlore-cms-production-frontend"
SERVICE_NAME="frontend"
COMPOSE_PATH="./docker-compose-production.yml"

PORT=8085

# ────────────── 🛑 CLEAN PORT CONFLICTS ──────────────
echo "🔍 Checking for existing container using port $PORT..."
CONTAINER_IDS=$(docker ps --filter "publish=$PORT" --format "{{.ID}}")

if [ -n "$CONTAINER_IDS" ]; then
  echo "⚠️  Port $PORT is currently in use. Stopping conflicting container(s): $CONTAINER_IDS"
  echo "$CONTAINER_IDS" | xargs -r docker rm -f
else
  echo "✅ Port $PORT is free."
fi

# ────────────── 🧼 REMOVE EXISTING FRONTEND ──────────────
echo "🧼 Removing existing frontend container if it exists..."
docker compose -p "$PROJECT_NAME" -f "$COMPOSE_PATH" rm -sf "$SERVICE_NAME"

# ────────────── 🏗️ BUILD ──────────────
echo "🏗️ Building with APP_ENV=staging..."
docker compose -p "$PROJECT_NAME" -f "$COMPOSE_PATH" build --build-arg APP_ENV=production "$SERVICE_NAME"

# ────────────── 🚀 START ──────────────
echo "🚀 Starting fresh staging frontend..."
docker compose -p "$PROJECT_NAME" -f "$COMPOSE_PATH" up -d --no-deps "$SERVICE_NAME"

echo "✅ STAGING frontend now running on port $PORT"