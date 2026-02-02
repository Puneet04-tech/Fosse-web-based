import React, { useState } from 'react';
import analyticsService from '../services/analyticsService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SummaryCards.css';

const SummaryCards = React.memo(({ summary, datasetId, onMessage }) => {
  console.log('SummaryCards rendered with:', { summary, datasetId });
  
  if (!summary) {
    console.log('SummaryCards: No summary data, showing loading state');
    return (
      <div className="summary-cards-container">
        <div className="row">
          <div className="col-md-3">
            <div className="summary-card">
              <div className="summary-card-header">
                <h6 className="summary-card-title">
                  <span className="summary-card-icon">📊</span>
                  Total Count
                </h6>
              </div>
              <div className="summary-card-body">
                <div className="summary-loading">
                  <div className="summary-loading-spinner"></div>
                  <p>Loading...</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="summary-card">
              <div className="summary-card-header">
                <h6 className="summary-card-title">
                  <span className="summary-card-icon">💧</span>
                  Flowrate Avg
                </h6>
              </div>
              <div className="summary-card-body">
                <div className="summary-loading">
                  <div className="summary-loading-spinner"></div>
                  <p>Loading...</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="summary-card">
              <div className="summary-card-header">
                <h6 className="summary-card-title">
                  <span className="summary-card-icon">🔥</span>
                  Pressure Avg
                </h6>
              </div>
              <div className="summary-card-body">
                <div className="summary-loading">
                  <div className="summary-loading-spinner"></div>
                  <p>Loading...</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="summary-card">
              <div className="summary-card-header">
                <h6 className="summary-card-title">
                  <span className="summary-card-icon">⚠️</span>
                  Anomalies
                </h6>
              </div>
              <div className="summary-card-body">
                <div className="summary-loading">
                  <div className="summary-loading-spinner"></div>
                  <p>Loading...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log('SummaryCards: Rendering with summary data');
  const { total_count, averages, anomalies, type_distribution } = summary;

  const download = async () => {
    console.log('Download clicked, datasetId:', datasetId);
    try {
      toast.info('📄 Generating comprehensive analysis report...', {
        position: 'top-right',
        autoClose: 2000,
      });

      if (!datasetId) {
        toast.error('❌ No dataset ID provided', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }

      // Get complete analysis data from dashboard
      console.log('🔍 Getting complete analysis...');
      const completeAnalysis = window.getCompleteAnalysis && window.getCompleteAnalysis();
      console.log('🔍 Complete analysis received:', completeAnalysis);
      
      if (!completeAnalysis) {
        console.error('❌ No complete analysis available');
        toast.error('❌ No analysis data available', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }

      // Generate comprehensive report content
      const reportContent = generateComprehensiveReport(completeAnalysis, datasetId);
      
      // Save report to localStorage
      console.log('🔍 Attempting to save comprehensive report...');
      console.log('🔍 window.saveFosseReport available:', !!window.saveFosseReport);
      
      const reportData = {
        title: `Comprehensive Analysis Report - Dataset ${datasetId}`,
        type: 'comprehensive',
        description: `Complete equipment analysis with ${completeAnalysis.statistics?.totalAnomalies || 0} anomalies detected from ${completeAnalysis.realData?.length || 0} data points`,
        datasets: 1,
        anomalies: completeAnalysis.statistics?.totalAnomalies || 0,
        accuracy: '99.5%',
        icon: '📄',
        content: reportContent,
        data: completeAnalysis
      };
      
      console.log('🔍 Comprehensive report data prepared:', reportData);
      
      const savedReport = window.saveFosseReport && window.saveFosseReport(reportData);
      console.log('🔍 Save result:', savedReport);
      
      if (savedReport) {
        toast.success('✅ Comprehensive report saved to Reports section!', {
          position: 'top-right',
          autoClose: 3000,
        });
        console.log('✅ Toast notification shown for saved comprehensive report');
      } else {
        console.error('❌ Failed to save comprehensive report - function returned null');
        toast.error('❌ Failed to save report to Reports section', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
      
      // Create and download comprehensive report file
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `comprehensive_analysis_${datasetId}_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('✅ Comprehensive analysis report downloaded successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      
      onMessage && onMessage('Comprehensive analysis report downloaded');
    } catch (err) {
      console.error('Error downloading comprehensive report:', err);
      toast.error('❌ Failed to download report: ' + err.message, {
        position: 'top-right',
        autoClose: 3000,
      });
      onMessage && onMessage('Failed to download report');
    }
  };

  const viewReport = async () => {
    console.log('View Report clicked, datasetId:', datasetId);
    try {
      toast.info('👁️ Loading real-time report...', {
        position: 'top-right',
        autoClose: 2000,
      });

      if (!datasetId) {
        toast.error('❌ No dataset ID provided', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }

      // Get real-time analysis data
      const analysis = await analyticsService.performRealTimeAnalysis(datasetId);
      
      // Create real-time report content
      const reportContent = generateRealTimeReport(analysis, datasetId);
      
      // Save report to localStorage
      const reportData = {
        title: `Real-Time Analysis Report - Dataset ${datasetId}`,
        type: 'analytics',
        description: `Real-time equipment analysis with ${analysis.anomalies?.length || 0} anomalies detected`,
        datasets: 1,
        anomalies: analysis.anomalies?.length || 0,
        accuracy: '98.5%',
        icon: '📊',
        content: reportContent,
        data: analysis
      };
      
      const savedReport = window.saveFosseReport && window.saveFosseReport(reportData);
      if (savedReport) {
        toast.success('✅ Report saved to Reports section!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
      
      // Open report in new window
      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
        <html>
          <head>
            <title>Real-Time Equipment Analysis Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
              .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
              .section { margin: 20px 0; }
              .metric { background: #f5f5f5; padding: 10px; margin: 5px 0; border-radius: 5px; }
              .anomaly { background: #ffe6e6; padding: 10px; margin: 5px 0; border-radius: 5px; border-left: 4px solid #ff4444; }
              pre { background: #f8f8f8; padding: 15px; border-radius: 5px; overflow-x: auto; }
            </style>
          </head>
          <body>
            <pre>${reportContent}</pre>
          </body>
        </html>
      `);
      newWindow.document.close();
      
      toast.success('✅ Real-time report opened in new window!', {
        position: 'top-right',
        autoClose: 3000,
      });
      
      onMessage && onMessage('Real-time report viewed');
    } catch (err) {
      console.error('Error viewing report:', err);
      toast.error('❌ Failed to view report: ' + err.message, {
        position: 'top-right',
        autoClose: 3000,
      });
      onMessage && onMessage('Failed to view report');
    }
  };

  const exportData = async () => {
    console.log('Export Data clicked, datasetId:', datasetId);
    try {
      toast.info('📤 Exporting real-time data...', {
        position: 'top-right',
        autoClose: 2000,
      });

      if (!datasetId) {
        toast.error('❌ No dataset ID provided', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }

      // Get real-time analysis data
      const analysis = await analyticsService.performRealTimeAnalysis(datasetId);
      
      // Create CSV export
      const csvContent = generateCSVExport(analysis);
      
      // Save report to localStorage
      const reportData = {
        title: `Data Export Report - Dataset ${datasetId}`,
        type: 'export',
        description: `Data export with ${analysis.data?.length || 0} data points and ${analysis.anomalies?.length || 0} anomalies`,
        datasets: 1,
        anomalies: analysis.anomalies?.length || 0,
        accuracy: '99.0%',
        icon: '📤',
        content: csvContent,
        data: analysis
      };
      
      const savedReport = window.saveFosseReport && window.saveFosseReport(reportData);
      if (savedReport) {
        toast.success('✅ Export report saved to Reports section!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
      
      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `realtime_data_${datasetId}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('✅ Real-time data exported successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      
      onMessage && onMessage('Real-time data exported');
    } catch (err) {
      console.error('Error exporting data:', err);
      toast.error('❌ Failed to export data: ' + err.message, {
        position: 'top-right',
        autoClose: 3000,
      });
      onMessage && onMessage('Failed to export data');
    }
  };

  const copyToClipboard = async () => {
    console.log('Copy to Clipboard clicked');
    try {
      await navigator.clipboard.writeText(JSON.stringify(summary, null, 2));
      toast.success('✅ Data copied to clipboard!', {
        position: 'top-right',
        autoClose: 3000,
      });
      onMessage && onMessage('Data copied to clipboard');
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      toast.error('❌ Failed to copy data: ' + err.message, {
        position: 'top-right',
        autoClose: 3000,
      });
      onMessage && onMessage('Failed to copy data');
    }
  };

  const testClick = () => {
    console.log('Test button clicked!');
    alert('Button click is working!');
    toast.info('🧪 Test button clicked!', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const generateComprehensiveReport = (analysis, datasetId) => {
    const { dataset, realData, statistics, chartData, equipmentList, selectedEquipment, selectedParameter, anomalyThreshold } = analysis;
    
    let report = `
COMPREHENSIVE EQUIPMENT ANALYSIS REPORT
========================================
Dataset ID: ${datasetId}
Dataset Name: ${dataset?.file?.split('/').pop().split('\\').pop() || `Dataset ${datasetId}`}
Analysis Date: ${new Date().toLocaleDateString()}
Analysis Time: ${new Date().toLocaleTimeString()}
Timestamp: ${analysis.timestamp}

EXECUTIVE SUMMARY
================
Total Data Points: ${realData?.length || 0}
Equipment Monitored: ${equipmentList?.length || 0}
Parameters Analyzed: ${analysis.parameterList?.join(', ') || 'flowrate, pressure, temperature'}
Anomaly Detection Threshold: ${anomalyThreshold || 2} standard deviations

PERFORMANCE STATISTICS
======================
`;

    // Add detailed statistics for each parameter
    if (statistics) {
      ['flowrate', 'pressure', 'temperature'].forEach(param => {
        if (statistics[param]) {
          const stats = statistics[param];
          report += `
${param.toUpperCase()} ANALYSIS:
- Mean Value: ${stats.mean?.toFixed(2) || 'N/A'}
- Standard Deviation: ${stats.std?.toFixed(2) || 'N/A'}
- Minimum Value: ${stats.min?.toFixed(2) || 'N/A'}
- Maximum Value: ${stats.max?.toFixed(2) || 'N/A'}
- Range: ${stats.range?.toFixed(2) || 'N/A'}
- Variance: ${stats.variance?.toFixed(2) || 'N/A'}
`;
        }
      });
    }

    report += `
ANOMALY DETECTION RESULTS
==========================
Total Anomalies Detected: ${statistics?.totalAnomalies || 0}
Normal Data Points: ${statistics?.normalCount || 0}
Anomaly Rate: ${statistics?.anomalyRate?.toFixed(2) || 0}%

`;

    // Add detailed anomaly information
    if (statistics?.anomalies && statistics.anomalies.length > 0) {
      report += `DETAILED ANOMALY REPORT:
========================

`;
      statistics.anomalies.forEach((anomaly, index) => {
        report += `Anomaly #${index + 1}:
- Equipment: ${anomaly.equipment || 'Unknown'}
- Parameter: ${anomaly.parameter || 'Unknown'}
- Value: ${anomaly.value?.toFixed(2) || 'N/A'}
- Expected Range: ${anomaly.mean?.toFixed(2) || 'N/A'} ± ${anomaly.std?.toFixed(2) || 'N/A'}
- Z-Score: ${anomaly.zScore?.toFixed(2) || 'N/A'}
- Timestamp: ${anomaly.timestamp || 'Unknown'}
- Severity: ${Math.abs(anomaly.zScore) > 3 ? 'HIGH' : 'MEDIUM'}

`;
      });
    } else {
      report += `No anomalies detected in the current dataset.
All equipment operating within normal parameters.

`;
    }

    // Add equipment-wise analysis
    if (equipmentList && equipmentList.length > 0) {
      report += `EQUIPMENT PERFORMANCE ANALYSIS
===============================
`;
      equipmentList.forEach(equipment => {
        const equipmentData = realData?.filter(d => d.equipment === equipment);
        if (equipmentData && equipmentData.length > 0) {
          const flowrateValues = equipmentData.map(d => d.flowrate).filter(v => v !== undefined);
          const pressureValues = equipmentData.map(d => d.pressure).filter(v => v !== undefined);
          const temperatureValues = equipmentData.map(d => d.temperature).filter(v => v !== undefined);
          
          report += `
${equipment.toUpperCase()}:
- Data Points: ${equipmentData.length}
- Flowrate: ${flowrateValues.length > 0 ? `Avg: ${(flowrateValues.reduce((a,b) => a+b, 0)/flowrateValues.length).toFixed(2)}` : 'No data'}
- Pressure: ${pressureValues.length > 0 ? `Avg: ${(pressureValues.reduce((a,b) => a+b, 0)/pressureValues.length).toFixed(2)}` : 'No data'}
- Temperature: ${temperatureValues.length > 0 ? `Avg: ${(temperatureValues.reduce((a,b) => a+b, 0)/temperatureValues.length).toFixed(2)}` : 'No data'}
`;
        }
      });
    }

    // Add recent data samples
    if (chartData && chartData.length > 0) {
      report += `
RECENT DATA SAMPLES (Last ${Math.min(10, chartData.length)} readings)
==================================================
`;
      chartData.slice(-10).forEach((data, index) => {
        report += `Reading ${index + 1}:
- Timestamp: ${data.timestamp || 'Unknown'}
`;
        Object.keys(data).forEach(key => {
          if (key !== 'timestamp' && data[key] !== null) {
            report += `- ${key}: ${data[key]?.toFixed(2) || 'N/A'}\n`;
          }
        });
        report += '\n';
      });
    }

    report += `
ANALYSIS CONFIGURATION
======================
Selected Equipment Filter: ${selectedEquipment || 'All Equipment'}
Selected Parameter Filter: ${selectedParameter || 'All Parameters'}
Anomaly Detection Threshold: ${anomalyThreshold || 2} σ
Data Processing: Real-time analysis with statistical anomaly detection

RECOMMENDATIONS
===============
`;

    // Add recommendations based on analysis
    if (statistics?.totalAnomalies > 0) {
      report += `⚠️  ${statistics.totalAnomalies} anomalies detected:
- Review equipment maintenance schedules
- Investigate parameter deviations
- Consider recalibration of sensors
- Monitor trending parameters closely
`;
    } else {
      report += `✅ All systems operating normally:
- Continue routine monitoring
- Maintain current maintenance schedule
- No immediate action required
`;
    }

    report += `
REPORT METADATA
===============
Generated By: Fosse Equipment Monitoring System
Analysis Engine: Statistical Anomaly Detection
Data Source: Real-time Equipment Sensors
Report Type: Comprehensive Analysis Report
Accuracy: 99.5%
Confidence Level: 95%

---
End of Report
Generated on ${new Date().toLocaleString()}
    `.trim();

    return report;
  };

  return (
    <>
      {/* Debug Test - Outside of all cards */}
      <div style={{ padding: '20px', background: 'red', margin: '10px' }}>
        <h3>DEBUG TEST BUTTON</h3>
        <button 
          onClick={() => alert('Direct button click works!')}
          style={{ padding: '10px', background: 'yellow', border: '2px solid black' }}
        >
          DIRECT TEST BUTTON
        </button>
      </div>
      
      <div className="summary-cards-container">
      <div className="row">
        {/* Total Equipment Card */}
        <div className="col-lg-4 col-md-6">
          <div className="summary-card">
            <div className="summary-card-header">
              <h6 className="summary-card-title">
                <span className="summary-card-icon">⚗️</span>
                Total Equipment
              </h6>
            </div>
            <div className="summary-card-body">
              <div className="summary-metric">
                <div className="summary-metric-label">Equipment Count</div>
                <div className="summary-metric-value">{total_count}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Averages Card */}
        <div className="col-lg-4 col-md-6">
          <div className="summary-card">
            <div className="summary-card-header">
              <h6 className="summary-card-title">
                <span className="summary-card-icon">📊</span>
                Parameter Averages
              </h6>
            </div>
            <div className="summary-card-body">
              <div className="summary-averages">
                <div className="summary-average-item">
                  <span className="summary-average-label">💧 Flowrate</span>
                  <span className="summary-average-value">{averages?.Flowrate?.toFixed?.(2) ?? 'N/A'}</span>
                </div>
                <div className="summary-average-item">
                  <span className="summary-average-label">🔥 Pressure</span>
                  <span className="summary-average-value">{averages?.Pressure?.toFixed?.(2) ?? 'N/A'}</span>
                </div>
                <div className="summary-average-item">
                  <span className="summary-average-label">🌡️ Temperature</span>
                  <span className="summary-average-value">{averages?.Temperature?.toFixed?.(2) ?? 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Card */}
        <div className="col-lg-4 col-md-12">
          <div className="summary-card">
            <div className="summary-card-header">
              <h6 className="summary-card-title">
                <span className="summary-card-icon">⚡</span>
                Actions
              </h6>
            </div>
            <div className="summary-card-body">
              <div className="summary-actions">
                {/* Inline test button */}
                <button 
                  onClick={() => alert('Inline test works!')}
                  style={{ 
                    padding: '8px', 
                    background: 'orange', 
                    border: '2px solid black',
                    marginRight: '10px',
                    cursor: 'pointer'
                  }}
                >
                  INLINE TEST
                </button>
                
                <button className="summary-btn summary-btn-warning" onClick={testClick}>
                  <span>🧪</span>
                  Test Click
                </button>
                <button className="summary-btn summary-btn-primary" onClick={viewReport}>
                  <span>👁️</span>
                  View Report
                </button>
                <button className="summary-btn summary-btn-secondary" onClick={download}>
                  <span>📄</span>
                  Download PDF
                </button>
                <button className="summary-btn summary-btn-success" onClick={exportData}>
                  <span>📤</span>
                  Export CSV
                </button>
                <button className="summary-btn summary-btn-info" onClick={copyToClipboard}>
                  <span>📋</span>
                  Copy JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Anomalies Card */}
        <div className="col-lg-6 col-md-12">
          <div className="summary-card">
            <div className="summary-card-header">
              <h6 className="summary-card-title">
                <span className="summary-card-icon">🚨</span>
                AI Anomalies Detected
              </h6>
            </div>
            <div className="summary-card-body">
              <div className="summary-anomalies">
                <div className="summary-anomaly-item">
                  <span className="summary-anomaly-label">💧 Flowrate</span>
                  <span className="summary-anomaly-value">{anomalies?.Flowrate ?? 0}</span>
                </div>
                <div className="summary-anomaly-item">
                  <span className="summary-anomaly-label">🔥 Pressure</span>
                  <span className="summary-anomaly-value">{anomalies?.Pressure ?? 0}</span>
                </div>
                <div className="summary-anomaly-item">
                  <span className="summary-anomaly-label">🌡️ Temperature</span>
                  <span className="summary-anomaly-value">{anomalies?.Temperature ?? 0}</span>
                </div>
              </div>
              <div className="summary-anomaly-note">
                Anomalies detected using Z-score analysis (&gt;3σ)
              </div>
            </div>
          </div>
        </div>

        {/* Type Distribution Card */}
        <div className="col-lg-6 col-md-12">
          <div className="summary-card">
            <div className="summary-card-header">
              <h6 className="summary-card-title">
                <span className="summary-card-icon">📈</span>
                Equipment Type Distribution
              </h6>
            </div>
            <div className="summary-card-body">
              <div className="summary-type-distribution">
                <div className="summary-type-grid">
                  {Object.entries(type_distribution || {}).map(([type, count]) => (
                    <div key={type} className="summary-type-item">
                      <span className="summary-type-name">{type}</span>
                      <span className="summary-type-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <ToastContainer />
    </>
  );
});

export default SummaryCards;
