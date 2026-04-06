#!/bin/bash

echo "================================================="
echo "  Installing Urban Flood Risk Management System"
echo "================================================="

# 1. Setup Backend
echo "-> Setting up Python Backend..."
cd backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "Done: Virtual environment created."
fi
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
cd ..

# 2. Setup Frontend
echo "-> Setting up React Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
    echo "Done: Frontend dependencies installed."
else
    echo "Frontend dependencies already present, skipping npm install."
fi
cd ..

echo "================================================="
echo " Setup Complete!"
echo " "
echo " To start the system, run: bash start.sh"
echo "================================================="
