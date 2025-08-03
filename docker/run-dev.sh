#!/bin/bash

COMPOSE_PATH="./docker-compose.yml"

echo "🔧 Stopping and cleaning up any existing DEV containers, volumes, and orphans..."
docker compose -f "$COMPOSE_PATH" down --volumes --remove-orphans

echo "🚀 Rebuilding and starting DEV container (with hot reload)..."
docker compose -f "$COMPOSE_PATH" up --build