# Anomaly Test Data for Analysis System

## 📊 Test CSV Files Created

### 1. `anomaly_test_data.csv` - Moderate Anomalies
This file contains subtle anomalies that will be detected with Z-score threshold of 2σ:

#### 🚨 Expected Anomalies:
- **Pump 1 Flowrate**: 180.5 (normal range: 75-85) - **HIGH ANOMALY**
- **Reactor A Flowrate**: 15.2 (normal range: 45-55) - **LOW ANOMALY**

### 2. `extreme_anomaly_data.csv` - Extreme Anomalies
This file contains obvious anomalies that will be detected even with higher thresholds:

#### 🚨 Expected Anomalies:
- **Pump 1 Flowrate**: 250.0 (normal range: 75-85) - **EXTREME HIGH ANOMALY**
- **Reactor A Flowrate**: 12.0 (normal range: 45-55) - **EXTREME LOW ANOMALY**
- **Pump 1 Flowrate**: 5.0 (normal range: 75-85) - **EXTREME LOW ANOMALY**

## 🎯 How to Test

### Web Application:
1. Start the backend server: `python manage.py runserver`
2. Start the web frontend: `npm start`
3. Upload either CSV file through the web interface
4. Navigate to the Analytics Dashboard
5. Set anomaly threshold to 2σ for moderate anomalies or 3σ for extreme ones
6. Observe the anomaly detection section and charts

### Desktop Application:
1. Run the desktop app: `python app_final_working.py`
2. Upload either CSV file
3. Go to Analytics tab
4. Switch between different chart types
5. Check the Anomaly Detection chart

## 📈 Expected Chart Behaviors

### Normal Data Ranges:
- **Chemical Reactors**: Flowrate 45-55, Pressure 95-100, Temperature 48-53
- **Centrifugal Pumps**: Flowrate 75-85, Pressure 118-123, Temperature 65-69
- **Heat Exchangers**: Flowrate 118-128, Pressure 85-89, Temperature 76-81
- **Compressors**: Flowrate 35-40, Pressure 195-205, Temperature 55-59

### Anomaly Detection:
- **Z-score > 2σ**: Medium severity anomalies
- **Z-score > 3σ**: High severity anomalies
- **Charts will show**: Points outside normal ranges with reference lines

## 🔍 Analysis System Features Tested

1. **Real-time Anomaly Detection**: Identifies statistical outliers
2. **Chart Visualization**: Shows anomalies as points beyond reference lines
3. **Equipment-wise Analysis**: Tracks anomalies per equipment type
4. **Parameter Monitoring**: Monitors flowrate, pressure, and temperature separately
5. **Timeline View**: Shows when anomalies occurred

## 📊 Expected Results

### Anomaly Timeline Should Show:
- Time stamps when anomalies occurred
- Equipment names with anomaly details
- Parameter values and Z-scores
- Severity levels (MEDIUM/HIGH)

### Charts Should Show:
- Reference lines for normal ranges
- Anomalous data points clearly visible
- Color-coded severity indicators
- Interactive tooltips with anomaly details

## 🎯 Testing Tips

1. **Start with moderate anomalies** (`anomaly_test_data.csv`) to test basic detection
2. **Use extreme anomalies** (`extreme_anomaly_data.csv`) to test system limits
3. **Adjust threshold values** to see how sensitivity affects detection
4. **Compare both files** to understand how anomaly severity impacts visualization
5. **Check equipment distribution** to see how anomalies affect different equipment types

## 🚨 Important Notes

- The system uses Z-score statistical analysis for anomaly detection
- Normal data creates a baseline, and anomalies are deviations from this baseline
- Higher thresholds (3σ) detect only extreme anomalies
- Lower thresholds (2σ) detect more subtle anomalies
- The system automatically calculates mean and standard deviation for each parameter
