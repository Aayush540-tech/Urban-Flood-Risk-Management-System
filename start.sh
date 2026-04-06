#!/bin/bash

echo "==============================================="
echo " Starting Urban Flood Risk Management System"
echo "==============================================="

# Start the FastAPI backend in the background
echo "-> Starting Python FastAPI Backend (Port 8000)..."
cd backend
# Check if venv exists, otherwise warn
if [ -d "venv" ]; then
    source venv/bin/activate
    uvicorn main:app --reload &
    BACKEND_PID=$!
else
    echo "ERROR: Virtual environment not found in /backend/venv. Please run setup.sh first!"
    exit 1
fi
cd ..

# Start the React frontend
echo "-> Starting React Vite Frontend (Port 5173)..."
cd frontend
npm run dev &
FRONTEND_PID=$!

echo "==============================================="
echo " Both services are running successfully!"
echo " "
echo " - React UI: http://localhost:5173"
echo " - Python API: http://localhost:8000"
echo " "
echo " Press Ctrl+C at any time to stop both servers."
echo "==============================================="

# Setup a trap to catch Ctrl+C (SIGINT) and kill both background servers
trap "echo -e '\nStopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

# Wait for background processes to keep terminal open
wait
