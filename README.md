# 🚀 Elite Analytics Suite - Chemical Equipment Data Analysis Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18.0%2B-blue.svg)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-4.0%2B-green.svg)](https://www.djangoproject.com/)
[![PyQt5](https://img.shields.io/badge/PyQt5-5.15%2B-red.svg)](https://www.riverbankcomputing.com/software/pyqt/)

A comprehensive **hybrid analytics platform** for chemical equipment parameter monitoring, visualization, and anomaly detection. Features both **web-based** and **desktop** interfaces with real-time data processing capabilities.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [📚 Usage Guide](#-usage-guide)
- [🔌 API Documentation](#-api-documentation)
- [🌐 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [📊 Performance](#-performance)
- [🐛 Troubleshooting](#-bug-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🌐 **Web Application (React)**
- **🎨 Modern UI/UX**: Professional glassmorphism design with smooth animations
- **📊 Real-time Analytics**: Live data visualization with Recharts
- **📤 File Upload**: Drag-and-drop CSV upload with validation
- **🔐 Authentication**: Secure login system with optional credentials
- **📱 Responsive Design**: Mobile-first responsive layout
- **🔄 Auto-refresh**: Real-time data updates every 10 seconds
- **📈 Interactive Charts**: Multiple chart types (Line, Area, Bar, Pie)
- **🎯 Anomaly Detection**: Real-time Z-score based anomaly alerts
- **📋 Data Tables**: Sortable, filterable data displays
- **🌙 Dark Theme**: Professional dark mode interface

### 🖥️ **Desktop Application (PyQt5)**
- **🚀 Native Performance**: High-performance desktop application
- **📊 Advanced Visualization**: Matplotlib integration with multiple chart types
- **💾 Local Processing**: Offline data processing capabilities
- **📤 Export Features**: CSV export and PDF report generation
- **🔍 Data Filtering**: Advanced data filtering and search
- **📈 Real-time Updates**: Background data synchronization
- **🎛️ Professional UI**: Modern dark theme with glassmorphism effects
- **📊 Multi-threaded**: Non-blocking API calls with worker threads
- **📋 Data Management**: Complete CRUD operations for datasets
- **🔄 Auto-refresh**: Automatic data refresh every 30 seconds

### 🔧 **Backend (Django)**
- **🚀 High Performance**: Optimized for large datasets (>50,000 rows)
- **🔒 Secure API**: JWT authentication and CORS protection
- **📊 Data Processing**: Advanced statistical analysis and anomaly detection
- **📄 Report Generation**: Automated PDF report creation
- **🗄️ Database Support**: PostgreSQL, MySQL, SQLite support
- **📈 Real-time Analysis**: Live data processing capabilities
- **🔍 Advanced Filtering**: Complex query support
- **📊 Statistical Analysis**: Mean, std dev, trends, correlations
- **🚨 Anomaly Detection**: Z-score based anomaly identification
- **📋 Data Validation**: Comprehensive CSV validation and processing

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Frontend  │    │  Desktop App    │    │   Mobile App    │
│    (React)      │    │   (PyQt5)       │    │   (Future)      │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴─────────────┐
                    │     Django REST API       │
                    │   (Backend Server)        │
                    └─────────────┬─────────────┘
                                 │
                    ┌─────────────┴─────────────┐
                    │      Database             │
                    │  (PostgreSQL/MySQL/SQLite) │
                    └───────────────────────────┘
```

### Technology Stack

**Frontend (Web)**
- React 18.2.0
- React Router 6.30.3
- Recharts 2.12.7
- Bootstrap 5.3.0
- Axios 1.4.0
- React-Toastify 11.0.5

**Frontend (Desktop)**
- PyQt5 5.15.9
- Matplotlib 3.7.1
- NumPy 1.24.3
- Pandas 2.0.3
- Requests 2.31.0

**Backend**
- Django 4.2.7
- Django REST Framework 3.14.0
- Pandas 2.0.3
- NumPy 1.24.3
- Scikit-learn 1.3.0
- ReportLab 4.0.4

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### One-Command Setup
```bash
# Clone and setup everything
git clone https://github.com/yourusername/fosse-web-based.git
cd fosse-web-based
chmod +x setup.sh && ./setup.sh
```

### Manual Setup

#### 1. Backend Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Setup database
python manage.py migrate
python manage.py createsuperuser

# Start server
python manage.py runserver
```

#### 2. Web Frontend Setup
```bash
# Install dependencies
cd web
npm install

# Start development server
REACT_APP_API_URL=http://127.0.0.1:8000 npm start
```

#### 3. Desktop App Setup
```bash
# Install dependencies
cd desktop
pip install -r requirements.txt

# Set environment variable
export API_URL=http://127.0.0.1:8000/api  # Linux/Mac
# or on Windows PowerShell:
# Run desktop app
python app.py