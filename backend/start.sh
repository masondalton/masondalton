#!/bin/bash
# Start script for the NASA API backend

echo "Starting NASA API Backend..."
echo "Make sure you have activated your virtual environment!"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "Warning: .env file not found. Creating one with default API key..."
    echo "NASA_API_KEY=M1x2YeBbegbE0iSBqePw8yihMe8kvtdEaaujb302" > .env
fi

# Start the server
uvicorn main:app --reload --port 8000 --host 0.0.0.0
