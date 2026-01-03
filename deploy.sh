#!/bin/bash

# Define the app name as per ecosystem.config.js
APP_NAME="tes-dosen-backend"

echo "=========================================="
echo "🚀 Starting Automated Deployment"
echo "=========================================="
date

# 1. Pull latest changes from Git
echo "------------------------------------------"
echo "📥 Pulling latest code from 'master' branch..."
git pull origin master
if [ $? -eq 0 ]; then
  echo "✅ Git pull successful."
else
  echo "❌ Git pull failed! Continuing might be unsafe."
  # Uncomment exit 1 if you want to stop on git failure
  # exit 1
fi

# 2. Install Dependencies
echo "------------------------------------------"
echo "📦 Installing/Updating Node.js dependencies..."
npm install --production
if [ $? -eq 0 ]; then
  echo "✅ Dependencies installed."
else
  echo "❌ npm install failed!"
  exit 1
fi

# 3. Database Migrations
echo "------------------------------------------"
echo "🔄 Running Database Migrations..."
npx sequelize-cli db:migrate
if [ $? -eq 0 ]; then
  echo "✅ Migrations completed successfully."
else
  echo "❌ Migrations failed!"
  exit 1
fi

# 4. Restart/Reload PM2 Process
echo "------------------------------------------"
echo "♻️  Reloading PM2 process..."

# Check if the process is already running
pm2 describe $APP_NAME > /dev/null 2>&1
status=$?

if [ $status -eq 0 ]; then
    echo "Process '$APP_NAME' found. Reloading..."
    pm2 reload sample.ecosystem.config.js --env production
else
    echo "Process '$APP_NAME' not found. Starting..."
    pm2 start sample.ecosystem.config.js --env production
fi

echo "------------------------------------------"
echo "✅ Deployment Finished Successfully!"
echo "=========================================="
