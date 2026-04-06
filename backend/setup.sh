#!/bin/bash

echo "=========================================="
echo " Setting up FastAPI Backend Environment"
echo "=========================================="

# Create virtual environment
python3 -m venv venv
echo "Virtual environment 'venv' created."

# Activate virtual environment
source venv/bin/activate

# Install requirements
echo "Installing pip requirements (including TensorFlow & FastAPI)..."
pip install --upgrade pip
pip install -r requirements.txt

# Ensure model directory exists
mkdir -p model

echo "=========================================="
echo " Setup Complete!"
echo " "
echo " 1. Make sure to place your 'flood_ann_model.h5' inside the /backend/model/ folder."
echo " 2. Activate the environment: source venv/bin/activate"
echo " 3. Start the server: uvicorn main:app --reload"
echo "=========================================="
