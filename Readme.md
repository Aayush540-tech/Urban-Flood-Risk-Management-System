# 🌊 Urban Flood Risk Management System

A state-of-the-art, AI-powered predictive dashboard designed to evaluate and visualize urban flood risks. This system combines a high-performance **FastAPI** backend (leveraging Artificial Neural Networks) with a premium **React** frontend featuring a modern **Glassmorphism** aesthetic.

---

## ✨ Features

- **Premium UI/UX**: Stunning Glassmorphism design with animated background blobs, frosted glass containers, and neon accents.
- **Dual Prediction Engines**:
  - **Basic Mode**: Quick assessment using 3 fundamental factors (Topography, Dams, Population).
  - **Advanced Mode**: Comprehensive risk evaluation using 20 environmental and social data vectors.
- **Deep Analytics Dashboard**:
  - **Interactive Recharts**: Radar charts for macro-vulnerability and Bar charts for critical threat vectors.
  - **Native Python Graphics**: Server-side generated Matplotlib/Seaborn density plots for stochastic risk variation.
- **Live Risk Map**: Real-time visualization of flood-prone zones.
- **Batch Processing**: Support for large-scale risk analysis via CSV uploads.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Recharts, Lucide Icons.
- **Backend**: Python 3.9+, FastAPI, TensorFlow (Keras), NumPy, Pandas, Matplotlib, Seaborn.
- **Automation**: Custom shell scripts for environment synchronization.

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.8+**
- **Node.js 18+**
- **npm** or **yarn**

### 📦 Installation

To set up both the Python Backend and React Frontend in one go:

```bash
# 1. Clone the repository
git clone https://github.com/Aayush540-tech/Urban-Flood-Risk-Management-System.git
cd Urban-Flood-Risk-Management-System

# 2. Run the master setup script
bash setup.sh
```

---

## ⚡ Running the Application

Once setup is complete, you can start both services concurrently:

```bash
bash start.sh
```

- **Frontend URL**: `http://localhost:5173`
- **Backend API**: `http://localhost:8000`

---

## 📊 Analytics Breakdown

When a prediction is generated, the system creates a dedicated **Results Page**:
1. **Radar Chart**: Clusters inputs into Topography, Ecology, Infrastructure, and Society to show which domain is most vulnerable.
2. **Bar Chart**: Identifies the Top 5 individual factors contributing to the risk.
3. **Matplotlib Plot**: Renders a mathematical density curve of the input variation directly from Python.

---

## 📄 License

This project is developed for Urban Flood Risk Management and Research. All rights reserved.
