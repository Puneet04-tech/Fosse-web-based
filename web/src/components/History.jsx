import React from 'react';
import { getDatasets, downloadReport } from '../api';
import './History.css';

export default function History({ onSelect, onMessage }) {
  const [datasets, setDatasets] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getDatasets().then((r) => setDatasets(r)).catch(() => onMessage && onMessage('Could not load history')).finally(() => setLoading(false));
  }, []);

  const onDownload = async (id) => {
    try {
      // In a demo, prompt for credentials; in production you'd use stored creds
      const username = prompt('Basic Auth username (admin)');
      const password = prompt('Basic Auth password (adminpass)');
      if (!username) return;
      const blob = await downloadReport(id, username, password);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `dataset_${id}_report.pdf`;
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

  return (
    <div className="history-container">
      <div className="history-header">
        <h2 className="history-title">
          <span className="history-icon">📊</span>
          Analysis History
        </h2>
        <p className="history-subtitle">Recent equipment analysis datasets and reports</p>
      </div>

      {loading && (
        <div className="history-loading">
          <div className="loading-spinner"></div>
          <p>Loading analysis history...</p>
        </div>
      )}

      {!loading && datasets.length === 0 && (
        <div className="history-empty">
          <div className="empty-icon">📁</div>
          <h3>No Analysis History</h3>
          <p>Upload your first dataset to start analyzing equipment performance</p>
        </div>
      )}

      {!loading && datasets.length > 0 && (
        <div className="history-list">
          {datasets.map((ds, index) => (
            <div key={ds.id} className="history-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="history-content">
                <div className="history-info">
                  <div className="dataset-id">
                    <span className="dataset-number">#{ds.id}</span>
                    <span className="dataset-label">Dataset</span>
                  </div>
                  <div className="dataset-time">
                    <span className="time-icon">🕐</span>
                    {new Date(ds.uploaded_at).toLocaleString()}
                  </div>
                  {ds.summary && (
                    <div className="dataset-stats">
                      <div className="stat-item">
                        <span className="stat-value">{ds.summary.total_count || 0}</span>
                        <span className="stat-label">Records</span>
                      </div>
                      {ds.summary.anomalies && (
                        <div className="stat-item">
                          <span className="stat-value">{Object.values(ds.summary.anomalies).reduce((a, b) => a + b, 0)}</span>
                          <span className="stat-label">Anomalies</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="history-actions">
                  <button 
                    className="history-btn primary-btn" 
                    onClick={() => onSelect && onSelect(ds)}
                  >
                    <span className="btn-icon">🔍</span>
                    Open Analysis
                  </button>
                  <button 
                    className="history-btn secondary-btn" 
                    onClick={() => onDownload(ds.id)}
                  >
                    <span className="btn-icon">📄</span>
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="history-glow"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
