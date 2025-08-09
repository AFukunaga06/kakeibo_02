#!/bin/bash

# Azure App Service startup script
echo "Starting budget app deployment..."

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Starting Flask application..."
python server.py