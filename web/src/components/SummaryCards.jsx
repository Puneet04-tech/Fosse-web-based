import React, { useState } from 'react';
import analyticsService from '../services/analyticsService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SummaryCards.css';

const SummaryCards = React.memo(({ summary, datasetId, onMessage }) => {
  if (!summary) {
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

  const { total_count, averages, anomalies, type_distribution } = summary;

  const download = async () => {
    try {
      toast.info('📄 Generating real-time report...', {
        position: 'top-right',
        autoClose: 2000,
      });

      // Get real-time analysis data
      const analysis = await analyticsService.performRealTimeAnalysis(datasetId);
      
      // Create real-time report content
      const reportContent = generateRealTimeReport(analysis, datasetId);
      
      // Create and download PDF-like text file
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `realtime_report_${datasetId}_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('✅ Real-time report downloaded successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      
      onMessage && onMessage('Real-time report downloaded');
    } catch (err) {
      console.error('Error downloading report:', err);
      toast.error('❌ Failed to download report', {
        position: 'top-right',
        autoClose: 3000,
      });
      onMessage && onMessage('Failed to download report');
    }
  };

  const viewReport = async () => {
    try {
      toast.info('👁️ Loading real-time report...', {
        position: 'top-right',
        autoClose: 2000,
      });

      // Get real-time analysis data
      const analysis = await analyticsService.performRealTimeAnalysis(datasetId);
      
      // Create real-time report content
      const reportContent = generateRealTimeReport(analysis, datasetId);
      
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
      toast.error('❌ Failed to view report', {
        position: 'top-right',
        autoClose: 3000,
      });
      onMessage && onMessage('Failed to view report');
    }
  };

  const exportData = async () => {
    try {
      toast.info('📤 Exporting real-time data...', {
        position: 'top-right',
        autoClose: 2000,
      });

      // Get real-time analysis data
      const analysis = await analyticsService.performRealTimeAnalysis(datasetId);
      
      // Create CSV export
      const csvContent = generateCSVExport(analysis);
      
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
      toast.error('❌ Failed to export data', {
        position: 'top-right',
        autoClose: 3000,
      });
      onMessage && onMessage('Failed to export data');
    }
  };

  const generateRealTimeReport = (analysis, datasetId) => {
    const timestamp = new Date().toLocaleString();
    const report = `
REAL-TIME EQUIPMENT ANALYSIS REPORT
=====================================

Generated: ${timestamp}
Dataset ID: ${datasetId}

EXECUTIVE SUMMARY
-----------------
Total Equipment: ${analysis.equipment?.length || 0}
Parameters Monitored: ${analysis.parameters?.length || 0}
Data Points Analyzed: ${analysis.data?.length || 0}
Anomalies Detected: ${analysis.anomalies?.length || 0}

EQUIPMENT TYPES
---------------
${analysis.equipment?.map(eq => `• ${eq}`).join('\n') || 'No equipment data'}

PARAMETER STATISTICS
--------------------
${Object.entries(analysis.statistics || {}).map(([param, stats]) => `
${param.toUpperCase()}:
  Mean: ${stats.mean}
  Std Dev: ${stats.std}
  Min: ${stats.min}
  Max: ${stats.max}
  Count: ${stats.count}`).join('\n')}

RECENT ANOMALIES
---------------
${analysis.anomalies?.slice(0, 10).map(anomaly => `
⚠️ ${anomaly.equipment} - ${anomaly.parameter.toUpperCase()}
   Value: ${anomaly.value} (Z-score: ${anomaly.zScore})
   Time: ${new Date(anomaly.timestamp).toLocaleString()}
   Severity: ${anomaly.severity}`).join('\n') || 'No anomalies detected'}

TREND ANALYSIS
--------------
${Object.entries(analysis.trends || {}).map(([param, trend]) => `
${param.toUpperCase()}:
  Direction: ${trend.direction}
  Change: ${trend.change}%
  Volatility: ${trend.volatility}
  Status: ${trend.isStable ? 'STABLE' : 'UNSTABLE'}`).join('\n')}

SYSTEM HEALTH
------------
Overall Status: ${analysis.anomalies?.length > 0 ? 'ATTENTION REQUIRED' : 'HEALTHY'}
Alert Level: ${analysis.anomalies?.length > 5 ? 'HIGH' : analysis.anomalies?.length > 0 ? 'MEDIUM' : 'LOW'}

---
Report generated by Fosse Equipment Monitoring System
Real-time AI-powered anomaly detection and analysis
    `.trim();
    
    return report;
  };

  const generateCSVExport = (analysis) => {
    const headers = ['Timestamp', 'Equipment', 'Flowrate', 'Pressure', 'Temperature', 'Status'];
    const rows = analysis.data?.map(row => [
      new Date(row.timestamp).toLocaleString(),
      row.equipment || 'Unknown',
      row.flowrate || '',
      row.pressure || '',
      row.temperature || '',
      analysis.anomalies?.some(a => a.timestamp === row.timestamp) ? 'ANOMALY' : 'NORMAL'
    ]) || [];
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    return csvContent;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(summary, null, 2));
      onMessage && onMessage('Data copied to clipboard');
    } catch (err) {
      console.error(err);
      onMessage && onMessage('Failed to copy data');
    }
  };

  return (
    <>
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
