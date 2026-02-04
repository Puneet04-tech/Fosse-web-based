# 🚀 Elite Analytics Suite - Complete Workflow Guide

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [Starting the Application](#starting-the-application)
5. [Application Workflow](#application-workflow)
6. [Features & Usage](#features--usage)
7. [Troubleshooting](#troubleshooting)
8. [Advanced Configuration](#advanced-configuration)

---

## 🎯 System Overview

The Elite Analytics Suite is a comprehensive chemical equipment monitoring platform consisting of three main components:

```
┌─────────────────────────────────────────────────────────────┐
│                    Elite Analytics Suite                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Web App    │  │  Desktop App │  │   Backend    │      │
│  │   (React)    │  │   (PyQt5)    │  │  (Django)    │      │
│  │              │  │              │  │              │      │
│  │ • Analytics  │  │ • Native UI  │  │ • REST API   │      │
│  │ • Dashboard  │  │ • Charts     │  │ • Processing │      │
│  │ • Reports    │  │ • Export     │  │ • Database   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                    ┌───────▼────────┐                        │
│                    │   SQLite DB    │                        │
│                    │  (Data Store)  │                        │
│                    └────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Components:

1. **Backend (Django REST API)**
   - Port: 8000
   - Role: Data processing, API endpoints, database management
   - Location: `/backend`

2. **Web Application (React)**
   - Port: 3000
   - Role: Browser-based interface with stunning UI
   - Location: `/web`

3. **Desktop Application (PyQt5)**
   - Standalone: No port required
   - Role: Native desktop client for offline analysis
   - Location: `/desktop`

---

## 📦 Prerequisites

### Required Software:

#### 1. **Python 3.8+**
```bash
# Check Python version
python --version
# Should output: Python 3.8.x or higher
```

**Installation:**
- Windows: Download from [python.org](https://www.python.org/downloads/)
- macOS: `brew install python3`
- Linux: `sudo apt-get install python3 python3-pip`

#### 2. **Node.js 16+**
```bash
# Check Node.js version
node --version
# Should output: v16.x.x or higher

# Check npm version
npm --version
# Should output: 8.x.x or higher
```

**Installation:**
- Download from [nodejs.org](https://nodejs.org/)
- Or use nvm: `nvm install 16`

#### 3. **Git**
```bash
# Check Git version
git --version
```

**Installation:**
- Windows: Download from [git-scm.com](https://git-scm.com/)
- macOS: `brew install git`
- Linux: `sudo apt-get install git`

### System Requirements:
- **OS**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 2GB free space
- **Display**: 1366x768 minimum resolution

---

## 🔧 Installation & Setup

### Step 1: Clone the Repository

```bash
# Clone the project
git clone https://github.com/Puneet04-tech/Fosse-web-based.git

# Navigate to project directory
cd Fosse-web-based
```

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Create superuser (admin account)
python manage.py createsuperuser
# Follow prompts to set username, email, and password

# (Optional) Create test user
python create_test_user.py
```

**Expected Output:**
```
✅ Database migrations completed
✅ Superuser created successfully
✅ Backend setup complete
```

### Step 3: Web Application Setup

```bash
# Open new terminal
# Navigate to web folder
cd web

# Install dependencies
npm install

# (Optional) Build for production
npm run build
```

**Expected Output:**
```
✅ Dependencies installed: 1250+ packages
✅ Build completed: 319.12 kB (main.js)
✅ Web app ready
```

### Step 4: Desktop Application Setup

```bash
# Open new terminal
# Navigate to desktop folder
cd desktop

# Install dependencies (use same or new virtual environment)
pip install -r requirements.txt
```

**Expected Output:**
```
✅ PyQt5 installed
✅ Matplotlib installed
✅ Dependencies ready
```

---

## 🚀 Starting the Application

### Option 1: Full Stack Launch (All Components)

#### Terminal 1: Backend Server
```bash
cd backend
# Activate venv if not already active
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# Start Django server
python manage.py runserver

# Expected output:
# Starting development server at http://127.0.0.1:8000/
# Quit the server with CTRL-BREAK.
```

#### Terminal 2: Web Application
```bash
cd web

# Start development server
npm start

# Expected output:
# Compiled successfully!
# Local: http://localhost:3000
# On Your Network: http://192.168.x.x:3000
```

**Browser will automatically open:** `http://localhost:3000`

#### Terminal 3: Desktop Application (Optional)
```bash
cd desktop

# Set API URL (if different from default)
# Windows:
set API_URL=http://127.0.0.1:8000/api

# macOS/Linux:
export API_URL=http://127.0.0.1:8000/api

# Run desktop app
python app.py

# Expected output:
# Desktop application window opens
```

### Option 2: Individual Components

#### Backend Only:
```bash
cd backend
venv\Scripts\activate
python manage.py runserver
```
- Access: `http://127.0.0.1:8000/api/`
- Admin: `http://127.0.0.1:8000/admin/`

#### Web Only:
```bash
cd web
npm start
```
- Access: `http://localhost:3000`
- Note: Requires backend to be running

#### Desktop Only:
```bash
cd desktop
python app.py
```
- Note: Requires backend to be running

---

## 📊 Application Workflow

### 1. Web Application Workflow

#### A. Initial Page Load
```
User Opens Browser
    ↓
Stunning Animation Plays
    ↓
Hero Section Displays
    • Title slides in
    • Subtitle follows
    • Description fades in
    ↓
Stats Card Appears
    • System Performance metrics
    • Animated icons
    • Live pulse indicator
```

#### B. Data Upload Process
```
1. Click "Upload CSV" or Drag & Drop
    ↓
2. File Validation
    • Check format
    • Verify columns
    • Validate data types
    ↓
3. Upload to Backend
    • Progress indicator
    • Processing status
    ↓
4. Data Processing
    • Statistical analysis
    • Anomaly detection (Z-score)
    • Parameter calculation
    ↓
5. Results Display
    • Dashboard updates
    • Charts render
    • Summary cards populate
```

#### C. Analytics Dashboard Usage
```
1. Select Dataset
    ↓
2. Choose Equipment Type
    ↓
3. Select Parameter
    ↓
4. View Real-time Charts
    • Line charts
    • Anomaly markers
    • Reference lines
    ↓
5. Adjust Threshold (1σ - 5σ)
    ↓
6. Export Results
```

### 2. Desktop Application Workflow

#### A. Application Launch
```
1. Desktop App Starts
    ↓
2. Connection Test
    • Check backend availability
    • Display status
    ↓
3. Load Datasets
    • Fetch history
    • Populate list
    ↓
4. Ready State
    • Enable controls
    • Show demo chart
```

#### B. Data Analysis Process
```
1. File Selection
    • Choose CSV file
    • Display file info
    ↓
2. Upload & Process
    • Upload to backend
    • Progress indicator
    • Receive results
    ↓
3. Visualization
    • Equipment distribution (Pie)
    • Parameter analysis (Bar)
    • Data summary (Text)
    • Anomaly detection (Bar)
    ↓
4. Export Options
    • Export as CSV
    • Save charts
    • Generate reports
```

### 3. Backend Processing Workflow

#### Data Processing Pipeline
```
CSV File Upload
    ↓
Validation
    • Format check
    • Column validation
    • Data type verification
    ↓
Data Parsing
    • Read CSV
    • Convert to DataFrame
    • Handle missing values
    ↓
Statistical Analysis
    • Calculate mean, std dev
    • Compute correlations
    • Identify trends
    ↓
Anomaly Detection
    • Z-score calculation
    • Threshold application
    • Flag anomalies
    ↓
Storage
    • Save to database
    • Store metadata
    • Cache results
    ↓
Response
    • Return JSON
    • Include summary
    • Provide metrics
```

---

## 🎨 Features & Usage

### Web Application Features

#### 1. **Homepage**
- **Stunning Animations**: Text slides in on every page load
- **Hero Section**: 
  - Main title with gradient effect
  - Subtitle with floating animation
  - Description with fade-in
- **Stats Card**:
  - System Performance header
  - Live pulse indicator
  - 99.9% Accuracy
  - <2s Processing
  - 24/7 Monitoring
- **Interactive Elements**:
  - Hover effects on icons
  - Animated underlines
  - Glow effects

#### 2. **Analytics Dashboard**
- **Real-time Filtering**:
  ```
  1. Select equipment from dropdown
  2. Choose parameter to analyze
  3. Adjust anomaly threshold (1σ - 5σ)
  4. View updated charts instantly
  ```

- **Chart Features**:
  - Interactive line charts
  - Anomaly markers (red dots)
  - Reference lines (mean ± threshold)
  - Hover tooltips
  - Legend with filtering

- **Summary Cards**:
  - Total data points
  - Average value
  - Anomalies detected
  - Standard deviation

#### 3. **Data Upload**
```
Supported Formats: CSV
Required Columns:
  • timestamp (datetime)
  • equipment_name (string)
  • parameter_name (string)
  • value (numeric)
  • unit (string)

Sample Data Structure:
timestamp,equipment_name,parameter_name,value,unit
2024-02-01 10:00:00,Pump,flowrate,560,L/min
2024-02-01 10:01:00,Pump,pressure,360,psi
```

#### 4. **Compounds Database**
- **58 Chemical Compounds**
- **16 Categories**
- **Interactive Cards**:
  - Molecular formula
  - Molecular weight
  - Density
  - Boiling/Melting points
  - Safety information
- **Export Options**: CSV export

#### 5. **Reports System**
- **Report Dashboard**:
  - Statistics overview
  - Activity tracking
  - Distribution analysis
- **Report Cards**:
  - Gradient designs
  - Hover animations
  - Timestamp display
- **Filtering**:
  - By type
  - By date
  - Search functionality
- **Actions**:
  - View details
  - Download PDF
  - Export CSV

### Desktop Application Features

#### 1. **Modern UI**
- **Dark Theme**: Eye-friendly interface
- **Glassmorphism**: Frosted glass effects
- **Color Coding**:
  - Blue: Primary actions
  - Green: Success states
  - Red: Errors/Warnings
  - Yellow: Pending states

#### 2. **Data Operations Tab**
- **File Selection**:
  - Browse for CSV files
  - File size display
  - Status indicator

- **Upload & Analysis**:
  - Progress bar
  - Status messages
  - Error handling

- **Data Management**:
  - Refresh history
  - Clear data
  - Export results

#### 3. **Analytics Tab**
- **Chart Types**:
  1. **Equipment Distribution** (Pie Chart)
     - Visual breakdown by equipment
     - Percentage labels
     - Color-coded segments
  
  2. **Parameter Analysis** (Bar Chart)
     - Average values per parameter
     - Value labels on bars
     - Grid background
  
  3. **Data Summary** (Text Report)
     - Total records
     - Statistical averages
     - Anomaly counts
  
  4. **Anomaly Detection** (Bar Chart)
     - Anomalies per parameter
     - Red color scheme
     - Warning indicators

- **Chart Controls**:
  - Type selector dropdown
  - Refresh button
  - Auto-update on data change

#### 4. **Data Table Tab**
- **Features**:
  - Sortable columns
  - Search/filter
  - Alternating row colors
  - Resizable columns

- **Search Functionality**:
  - Real-time filtering
  - Multi-column search
  - Case-insensitive

- **Export**:
  - Export visible data
  - CSV format
  - Custom filename

### Backend API Features

#### Available Endpoints:

1. **Dataset Management**
```
GET  /api/datasets/          - List all datasets
POST /api/upload/            - Upload new dataset (authenticated)
POST /api/desktop-upload/    - Upload from desktop (no auth)
GET  /api/datasets/{id}/     - Get dataset details
GET  /api/datasets/{id}/data/ - Get dataset data
```

2. **Report Generation**
```
GET /api/datasets/{id}/report.pdf  - Download PDF report
```

3. **Admin Interface**
```
GET /admin/  - Django admin panel
```

#### API Response Format:
```json
{
  "id": 1,
  "filename": "sample_data.csv",
  "uploaded_at": "2024-02-04T10:30:00Z",
  "summary": {
    "total_count": 1000,
    "averages": {
      "flowrate": 550.5,
      "pressure": 340.2,
      "temperature": 175.0
    },
    "anomalies": {
      "flowrate": 15,
      "pressure": 8,
      "temperature": 5
    }
  }
}
```

---

## 🔍 Troubleshooting

### Common Issues & Solutions

#### 1. Backend Won't Start

**Problem**: `ModuleNotFoundError` or import errors

**Solution**:
```bash
# Ensure virtual environment is activated
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Check Python version
python --version  # Should be 3.8+
```

#### 2. Web App Connection Error

**Problem**: `ERR_CONNECTION_REFUSED` or API errors

**Solution**:
```bash
# Check backend is running
curl http://127.0.0.1:8000/api/

# Update API URL in web/.env
REACT_APP_API_URL=http://127.0.0.1:8000/api

# Restart web server
npm start
```

#### 3. Desktop App Backend Error

**Problem**: "❌ Backend server not running"

**Solution**:
```bash
# Verify backend is running
# Open browser: http://127.0.0.1:8000/api/

# Set correct API URL
# Windows:
set API_URL=http://127.0.0.1:8000/api

# macOS/Linux:
export API_URL=http://127.0.0.1:8000/api

# Restart desktop app
python app.py
```

#### 4. Database Migration Errors

**Problem**: Database is locked or migration fails

**Solution**:
```bash
# Delete database (WARNING: Loses data)
rm db.sqlite3

# Delete migration files (keep __init__.py)
rm backend/api/migrations/0*.py

# Create fresh migrations
python manage.py makemigrations
python manage.py migrate

# Create new superuser
python manage.py createsuperuser
```

#### 5. Port Already in Use

**Problem**: Port 8000 or 3000 already occupied

**Solution**:
```bash
# Backend (use different port)
python manage.py runserver 8001

# Web (use different port)
PORT=3001 npm start  # macOS/Linux
set PORT=3001 && npm start  # Windows
```

#### 6. CSV Upload Fails

**Problem**: File validation errors

**Solution**:
- Ensure CSV has required columns:
  - timestamp
  - equipment_name
  - parameter_name
  - value
  - unit
- Check date format: `YYYY-MM-DD HH:MM:SS`
- Verify numeric values don't contain text
- Remove special characters from equipment names

#### 7. Charts Not Displaying

**Problem**: Blank charts or rendering errors

**Solution**:
```bash
# Web app
# Clear browser cache
# Hard reload: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

# Desktop app
# Restart application
# Check console for matplotlib errors
```

---

## ⚙️ Advanced Configuration

### Environment Variables

#### Backend (.env)
```bash
# Create backend/.env file
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

#### Web (.env)
```bash
# Create web/.env file
REACT_APP_API_URL=http://127.0.0.1:8000/api
REACT_APP_ENV=development
```

#### Desktop (Environment)
```bash
# Set API URL
API_URL=http://127.0.0.1:8000/api
```

### Performance Tuning

#### Backend Optimization
```python
# backend/config/settings.py

# For production
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com']

# Database connection pooling
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'CONN_MAX_AGE': 600,
    }
}

# Caching
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379',
    }
}
```

#### Web App Optimization
```json
// web/package.json - Build optimization
{
  "scripts": {
    "build": "GENERATE_SOURCEMAP=false react-scripts build"
  }
}
```

### Database Configuration

#### Using PostgreSQL (Production)
```bash
# Install PostgreSQL driver
pip install psycopg2-binary

# Update settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'analytics_db',
        'USER': 'postgres',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

#### Using MySQL
```bash
# Install MySQL driver
pip install mysqlclient

# Update settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'analytics_db',
        'USER': 'root',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

---

## 📚 Additional Resources

### Sample Data Files
Located in `/sample_data/`:
- `sample_equipment_data.csv` - Normal operation data
- `anomaly_test_data.csv` - Data with anomalies
- `extreme_anomaly_data.csv` - Extreme test cases

### Documentation Files
Located in `/docs/`:
- `Project_Report.md` - Comprehensive project documentation
- `WORKFLOW.md` - This file
- `README_anomaly_test.md` - Anomaly detection guide

### API Documentation
- Swagger UI: `http://127.0.0.1:8000/api/docs/`
- ReDoc: `http://127.0.0.1:8000/api/redoc/`
- Admin Panel: `http://127.0.0.1:8000/admin/`

---

## 🚀 Quick Start Checklist

- [ ] Install Python 3.8+
- [ ] Install Node.js 16+
- [ ] Clone repository
- [ ] Setup backend (venv, pip install, migrate)
- [ ] Create superuser
- [ ] Setup web app (npm install)
- [ ] Setup desktop app (pip install)
- [ ] Start backend server (port 8000)
- [ ] Start web server (port 3000)
- [ ] Open browser: `http://localhost:3000`
- [ ] Upload sample CSV file
- [ ] Explore analytics dashboard
- [ ] View compounds database
- [ ] Generate reports
- [ ] (Optional) Run desktop app

---

## 📞 Support

### Getting Help
- GitHub Issues: [Report bugs or request features](https://github.com/Puneet04-tech/Fosse-web-based/issues)
- Documentation: Check `/docs` folder
- Project Report: See `docs/Project_Report.md`

### Useful Commands

```bash
# Check all processes
# Backend running?
curl http://127.0.0.1:8000/api/

# Database status
python manage.py showmigrations

# View logs
python manage.py runserver --verbosity 2

# Run tests
python manage.py test

# Create backup
python manage.py dumpdata > backup.json

# Restore backup
python manage.py loaddata backup.json
```

---

**📌 Note**: Always activate the virtual environment before running Python commands, and ensure the backend is running before starting the web or desktop applications.


