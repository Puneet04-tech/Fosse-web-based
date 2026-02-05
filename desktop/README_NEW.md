# 🚀 Elite Analytics Suite - Desktop Application

**Advanced Chemical Equipment Data Analysis & Anomaly Detection System**

A premium desktop application built with PyQt5 that provides comprehensive data analysis, visualization, and AI-powered insights for chemical equipment monitoring.

## ✨ Features

### 📊 Advanced Analytics
- **Multi-Panel Dashboard**: Comprehensive overview with multiple visualizations
- **Equipment Distribution**: Enhanced pie charts with 3D effects
- **Parameter Analysis**: Multi-bar charts with statistical measures
- **Time Series Analysis**: Trend visualization over time
- **Correlation Heatmaps**: Identify relationships between parameters
- **Distribution Analysis**: Histogram-based data distribution
- **Anomaly Detection**: Advanced outlier detection and visualization

### 🎯 Statistical Analysis
- **Comprehensive Statistics**: Mean, median, standard deviation, variance, quartiles
- **Advanced Metrics**: Skewness, kurtosis, IQR, coefficient of variation
- **Statistical Tests**: Shapiro-Wilk normality tests, Pearson correlation
- **Real-time Calculations**: Instant statistical insights

### 💡 AI-Powered Insights
- **Automated Analysis**: Smart data interpretation
- **Anomaly Detection**: IQR-based outlier identification
- **Data Quality Assessment**: Completeness and stability metrics
- **Smart Recommendations**: Actionable insights for optimization
- **Predictive Suggestions**: Future analysis recommendations

### 🎨 Premium UI/UX
- **Modern Dark Theme**: Eye-friendly gradient design
- **Smooth Animations**: Professional transitions
- **Intuitive Navigation**: Tab-based interface
- **Responsive Layout**: Adaptive to different screen sizes
- **Interactive Charts**: High-quality matplotlib visualizations

### 📈 Data Management
- **CSV Upload**: Easy file selection and upload
- **Data Table View**: Sortable, searchable data grid
- **Export Functionality**: Save processed data and charts
- **Real-time Updates**: Live connection status monitoring

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Installation

1. **Create and activate a virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate
   
   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   cd desktop
   pip install -r requirements.txt
   ```

3. **Start the backend server** (in a separate terminal):
   ```bash
   cd backend
   python manage.py runserver
   ```

4. **Launch the desktop application:**
   ```bash
   python app.py
   ```

### Optional: Custom API URL
```bash
# Windows
set API_URL=http://127.0.0.1:8000/api

# macOS/Linux
export API_URL=http://127.0.0.1:8000/api
```

## 📖 User Guide

### Tab Overview

#### 1. 📁 Data Operations
- Select and upload CSV files
- View upload progress and status
- Manage dataset history
- Clear and refresh data

#### 2. 📈 Advanced Analytics
Choose from 8 visualization types:
- **Multi-Panel Dashboard**: Complete overview
- **Equipment Distribution**: Pie chart analysis
- **Parameter Analysis**: Bar charts with error bars
- **Time Series**: Temporal trends
- **Heatmap**: Correlation matrix
- **Distribution Analysis**: Histograms with statistics
- **Anomaly Detection**: Outlier visualization
- **Comprehensive Report**: Text-based summary

Controls:
- **Chart Type Selector**: Choose visualization
- **Refresh Button**: Update current chart
- **Save Chart**: Export as PNG, PDF, or SVG

#### 3. 📋 Data Table
- View all uploaded data
- Sort columns by clicking headers
- Search functionality
- Export filtered data to CSV

#### 4. 📊 Statistical Analysis
- **Statistical Summary**: Comprehensive metrics for each parameter
- **Statistical Tests**: Normality and correlation tests
- **Real-time Calculations**: Instant results

Key metrics:
- Count, Mean, Median
- Standard Deviation, Variance
- Min, Max, Range
- Quartiles (Q1, Q2, Q3)
- IQR, Skewness, Kurtosis

#### 5. 💡 AI Insights
- **Automated Analysis**: Smart data interpretation
- **Key Findings**: Stability and variation analysis
- **Anomaly Detection**: Outlier identification
- **Smart Recommendations**: Actionable advice

## 🎨 Visualizations

### Multi-Panel Dashboard
Comprehensive 4-panel view showing:
- Equipment distribution (pie chart)
- Parameter averages (bar chart)
- System status (horizontal bars)
- Key metrics summary

### Enhanced Charts
All charts feature:
- Professional color schemes (seaborn palettes)
- Bold typography and clear labels
- Grid lines for readability
- Statistical annotations
- Interactive legends

### Statistical Overlays
- Mean and median lines on distributions
- Error bars on parameter charts
- Threshold lines on anomaly detection
- Correlation coefficients on heatmaps

## 🔧 Technical Details

### Architecture
- **Frontend**: PyQt5 with custom styling
- **Visualization**: Matplotlib, Seaborn
- **Data Processing**: Pandas, NumPy
- **Statistics**: SciPy
- **Backend Communication**: Requests

### Performance
- Efficient data handling for large datasets
- Async operations for UI responsiveness
- Cached calculations for quick updates
- Optimized chart rendering

### Data Flow
1. User selects CSV file
2. File uploaded to Django backend
3. Backend processes and stores data
4. Desktop app fetches processed data
5. Real-time visualization updates
6. Statistical analysis on demand

## 🐛 Troubleshooting

### Backend Connection Issues
**Error**: "Cannot connect to backend"

**Solution**:
1. Ensure Django server is running
2. Check API_URL environment variable
3. Verify backend is on correct port (8000)
4. Check firewall settings

### Import Errors
**Error**: "No module named 'PyQt5'"

**Solution**:
```bash
pip install --upgrade -r requirements.txt
```

### Chart Display Issues
**Error**: Charts not rendering properly

**Solution**:
1. Update matplotlib: `pip install --upgrade matplotlib`
2. Restart the application
3. Clear cache and reload data

### Missing Data
**Error**: "No data available"

**Solution**:
1. Upload a valid CSV file first
2. Ensure backend successfully processed file
3. Check Data Table tab for data presence
4. Refresh dataset history

## 📊 Supported Data Formats

### CSV Requirements
- First row must contain column headers
- At least one numeric column required
- UTF-8 encoding recommended
- Comma-separated values

### Recommended Structure
```csv
Equipment_ID,Type,Flowrate,Pressure,Temperature,Efficiency
EQ001,Pump,125.5,85.3,65.2,92.1
EQ002,Valve,118.2,83.1,64.8,91.5
...
```

## 🎯 Best Practices

### Data Upload
- Clean data before upload
- Use consistent column names
- Include timestamp columns for time series
- Remove unnecessary columns

### Visualization
- Start with Multi-Panel Dashboard for overview
- Use Heatmap for correlation analysis
- Check Distribution Analysis for data quality
- Monitor Anomaly Detection regularly

### Analysis
- Calculate statistics after each upload
- Run statistical tests periodically
- Review AI insights for trends
- Export important charts for documentation

## 🌟 Advanced Features

### Custom Chart Saving
Save charts in multiple formats:
- **PNG**: For presentations (high DPI)
- **PDF**: For reports (vector)
- **SVG**: For web use (scalable)

### Data Export
Export filtered and processed data:
1. Apply search filters in Data Table
2. Click "Export CSV"
3. Choose destination
4. Open in Excel or analysis tools

### Statistical Testing
Run hypothesis tests:
1. Go to Statistical Analysis tab
2. Click "Run Tests"
3. Review normality tests (Shapiro-Wilk)
4. Check correlation analysis (Pearson)

## 📝 Version History

### v2.0 (Current)
- ✅ Enhanced UI with gradient themes
- ✅ Multi-panel dashboard
- ✅ Advanced statistical analysis
- ✅ AI-powered insights
- ✅ 8 visualization types
- ✅ Chart export functionality
- ✅ Comprehensive recommendations

### v1.0
- Basic data upload
- Simple visualizations
- Table view
- Basic statistics

## 🤝 Support

For issues, questions, or feature requests:
1. Check troubleshooting section
2. Review user guide
3. Contact development team

## 📄 License

Part of the Fosse Chemical Equipment Analysis System

---

**Made with ❤️ for Chemical Equipment Analysis**

🚀 **Elite Analytics Suite** - Transforming data into actionable insights
