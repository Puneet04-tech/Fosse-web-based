import React from 'react';
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
      const username = prompt('Basic Auth username (admin)');
      const password = prompt('Basic Auth password (adminpass)');
      if (!username) return;
      const { downloadReport } = await import('../api');
      const blob = await downloadReport(datasetId, username, password);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `dataset_${datasetId}_report.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      onMessage && onMessage('Report downloaded');
    } catch (err) {
      console.error(err);
      onMessage && onMessage('Failed to download report');
    }
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
                <button className="summary-btn summary-btn-primary" onClick={download}>
                  <span>📄</span>
                  Download PDF Report
                </button>
                <button className="summary-btn summary-btn-secondary" onClick={copyToClipboard}>
                  <span>📋</span>
                  Copy JSON Data
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
  );
});

export default SummaryCards;
