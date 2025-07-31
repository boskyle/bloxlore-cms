#!/bin/bash

COMPOSE_PATH="./docker/docker-compose.yml"

echo "🔧 Stopping any existing DEV container..."
docker compose -f "$COMPOSE_PATH" down

echo "🔧 Rebuilding and starting DEV container (hot reload)..."
docker compose -f "$COMPOSE_PATH" up --build

