import React from 'react';
import './Preloader.css';

export default function Preloader() {
  return (
    <div className="preloader-overlay">
      <div className="preloader-container">
        {/* Enhanced Professional Logo/Brand */}
        <div className="brand-section">
          <div className="brand-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="50%" stopColor="#764ba2" />
                    <stop offset="100%" stopColor="#f093fb" />
                  </linearGradient>
                  <filter id="logoGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <circle cx="30" cy="30" r="28" fill="none" stroke="url(#logoGrad)" strokeWidth="2"/>
                <path d="M30 10 L40 20 L40 40 L30 50 L20 40 L20 20 Z" fill="url(#logoGrad)" opacity="0.8"/>
                <circle cx="30" cy="30" r="8" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <div className="brand-text">
              <h1 className="brand-name">ANALYTICS</h1>
              <p className="brand-tagline">Professional Platform</p>
            </div>
          </div>
        </div>

        {/* Enhanced Loading Animation */}
        <div className="loading-section">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          
          <div className="loading-text">
            <p className="loading-status">Initializing System</p>
            <div className="loading-progress">
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced System Status */}
        <div className="status-section">
          <div className="status-grid">
            <div className="status-item">
              <div className="status-indicator active"></div>
              <span className="status-label">Loading Core Modules</span>
            </div>
            <div className="status-item">
              <div className="status-indicator"></div>
              <span className="status-label">Establishing Connections</span>
            </div>
            <div className="status-item">
              <div className="status-indicator"></div>
              <span className="status-label">Preparing Dashboard</span>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="preloader-footer">
          <div className="footer-content">
            <p className="version-info">Version 2.0.1</p>
            <p className="copyright">© 2026 Elite Analytics Suite. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
