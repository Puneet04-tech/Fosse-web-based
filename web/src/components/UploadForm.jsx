import React from 'react';
import { uploadDataset } from '../api';

export default function UploadForm({ onUploaded, onMessage }) {
  const [file, setFile] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [dragOver, setDragOver] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setMessage('');
    
    // Comprehensive validation
    if (!file) {
      const msg = '❌ Please select a CSV file to upload';
      setMessage(msg);
      onMessage && onMessage(msg);
      return;
    }
    
    // Double-check file type
    if (!file.name.endsWith('.csv')) {
      const msg = '❌ Invalid file type. Please upload a CSV file.';
      setMessage(msg);
      onMessage && onMessage(msg);
      setFile(null);
      return;
    }
    
    // Check file size again
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      const msg = '❌ File too large. Please upload a file smaller than 10MB.';
      setMessage(msg);
      onMessage && onMessage(msg);
      setFile(null);
      return;
    }
    
    // Check if file is empty
    if (file.size === 0) {
      const msg = '❌ File is empty. Please select a valid CSV file.';
      setMessage(msg);
      onMessage && onMessage(msg);
      setFile(null);
      return;
    }
    
    setBusy(true);
    const msg = '🔄 Uploading and analyzing data...';
    setMessage(msg);
    onMessage && onMessage(msg);

    try {
      const data = await uploadDataset(file, username || null, password || null, (e) => {
        setProgress(Math.round((e.loaded * 100) / e.total));
      });

      const successMsg = '✅ Upload successful! Analysis complete.';
      setMessage(successMsg);
      onMessage && onMessage(successMsg);
      onUploaded && onUploaded(data);
    } catch (err) {
      console.error('Upload error', err);
      const serverError = err.response?.data;
      let msg;
      if (serverError && serverError.error) {
        msg = serverError.details ? `❌ ${serverError.error}: ${serverError.details}` : `❌ ${serverError.error}`;
      } else {
        msg = `❌ ${err.response?.data?.error || err.message || 'Upload failed (network error)'}`;
      }
      setMessage(msg);
      onMessage && onMessage(msg);
    } finally {
      setBusy(false);
      setProgress(0);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const droppedFile = files[0];
      
      // Clear previous messages
      setMessage('');
      
      // Check file type
      if (!droppedFile.name.endsWith('.csv')) {
        const errorMsg = '❌ Invalid file type. Please upload a CSV file.';
        setMessage(errorMsg);
        onMessage && onMessage(errorMsg);
        return;
      }
      
      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (droppedFile.size > maxSize) {
        const errorMsg = '❌ File too large. Please upload a file smaller than 10MB.';
        setMessage(errorMsg);
        onMessage && onMessage(errorMsg);
        return;
      }
      
      // Check if file is empty
      if (droppedFile.size === 0) {
        const errorMsg = '❌ File is empty. Please select a valid CSV file.';
        setMessage(errorMsg);
        onMessage && onMessage(errorMsg);
        return;
      }
      
      // File is valid
      setFile(droppedFile);
      const successMsg = '✅ Valid CSV file selected';
      setMessage(successMsg);
      onMessage && onMessage(successMsg);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Clear previous messages
      setMessage('');
      
      // Check file type
      if (!selectedFile.name.endsWith('.csv')) {
        const errorMsg = '❌ Invalid file type. Please upload a CSV file.';
        setMessage(errorMsg);
        onMessage && onMessage(errorMsg);
        setFile(null);
        return;
      }
      
      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (selectedFile.size > maxSize) {
        const errorMsg = '❌ File too large. Please upload a file smaller than 10MB.';
        setMessage(errorMsg);
        onMessage && onMessage(errorMsg);
        setFile(null);
        return;
      }
      
      // Check if file is empty
      if (selectedFile.size === 0) {
        const errorMsg = '❌ File is empty. Please select a valid CSV file.';
        setMessage(errorMsg);
        onMessage && onMessage(errorMsg);
        setFile(null);
        return;
      }
      
      // File is valid
      setFile(selectedFile);
      const successMsg = '✅ Valid CSV file selected';
      setMessage(successMsg);
      onMessage && onMessage(successMsg);
    }
  };

  return (
    <div className="upload-form-container">
      <form onSubmit={submit}>
        {/* File Upload Section */}
        <div className="upload-section mb-4">
          <label className="form-label fw-bold text-white mb-3">
            📄 Select CSV File for Analysis
          </label>
          <div
            className={`file-drop-zone glow-effect ${dragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              className="file-input"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              id="file-input"
            />
            <label htmlFor="file-input" className="file-label">
              {file ? (
                <div className="file-selected">
                  <span className="file-icon">📄</span>
                  <div className="file-info">
                    <div className="file-name">{file.name}</div>
                    <div className="file-size">{(file.size / 1024).toFixed(1)} KB</div>
                  </div>
                </div>
              ) : (
                <div className="file-placeholder">
                  <span className="upload-icon">⬆️</span>
                  <div className="upload-text">
                    <strong>Click to browse</strong> or drag and drop
                  </div>
                  <div className="upload-hint">CSV files only</div>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Authentication Section */}
        <div className="auth-section mb-4">
          <h6 className="section-title text-white mb-3">🔐 Authentication</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  className="form-control auth-input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  id="username"
                />
                <label htmlFor="username">👤 Username</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  className="form-control auth-input"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  id="password"
                />
                <label htmlFor="password">🔒 Password</label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="action-section">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-primary btn-lg px-4 glow-effect"
              type="submit"
              disabled={busy || !file}
            >
              {busy ? '🔄 Processing...' : '🚀 Upload & Analyze'}
            </button>

            {busy && (
              <div className="progress flex-grow-1 glow-effect" style={{ height: '8px', maxWidth: '300px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            )}
          </div>

          {message && (
            <div className={`message-display mt-3 ${message.includes('❌') ? 'error' : message.includes('✅') ? 'success' : 'info'}`}>
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
