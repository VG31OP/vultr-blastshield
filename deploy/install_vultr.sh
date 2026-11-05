#!/usr/bin/env bash
# ==============================================================================
# Vultr BlastShield - One-Click Deployment Script for Vultr Cloud Compute (VM)
# OS Target: Ubuntu 22.04 / 24.04 LTS x86_64
# ==============================================================================

set -euo pipefail

echo "=========================================================="
echo "🛡️  Vultr BlastShield: Deploying Autonomous Sandbox Host  "
echo "=========================================================="

# 1. Update system & install prerequisites
apt-get update -y
apt-get install -y apt-transport-https ca-certificates curl software-properties-common git

# 2. Install Docker & Docker Compose if not present
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker Engine..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl enable --now docker
fi

# 3. Build hardened sandbox base image
echo "🔨 Building Vultr BlastShield hardened sandbox image..."
docker build -t vultr-blastshield-runner:latest -f ../backend/Dockerfile.sandbox ../backend/

# 4. Check for .env file
if [ ! -f "../.env" ]; then
    echo "⚠️  No .env file found. Copying .env.example..."
    cp ../.env.example ../.env
    echo "👉 Please edit .env with your VULTR_INFERENCE_API_KEY from my.vultr.com"
fi

# 5. Launch containers via docker-compose
echo "🚀 Launching Vultr BlastShield Stack (Backend + Frontend)..."
docker compose -f docker-compose.yml up -d --build

echo "=========================================================="
echo "✅ DEPLOYMENT COMPLETE!"
echo "🌐 Access your frontend at: http://$(curl -s ifconfig.me)"
echo "📡 Backend API status: http://$(curl -s ifconfig.me):8000/api/health"
echo "=========================================================="
