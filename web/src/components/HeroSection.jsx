import React from 'react';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-particles"></div>
        <div className="hero-gradient"></div>
      </div>
      
      <div className="container-fluid">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-8">
            <div className="hero-content">
              <h1 className="hero-title">
                Advanced Chemical Analytics Platform
                <span className="hero-subtitle">
                  Intelligent Equipment Monitoring & Predictive Anomaly Detection
                </span>
              </h1>
              <p className="hero-description">
                Harness the power of AI-driven analysis for comprehensive equipment parameter visualization,
                statistical modeling, and automated anomaly detection. Built with cutting-edge technology
                for precision chemical equipment monitoring.
              </p>
              <div className="hero-badges mb-4">
                <span className="badge hero-badge me-2">🤖 AI-Powered Analysis</span>
                <span className="badge hero-badge me-2">📊 Real-time Monitoring</span>
                <span className="badge hero-badge">🔮 Predictive Insights</span>
              </div>
              <button
                className="btn hero-btn btn-lg px-4 py-3 fw-bold"
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🚀 Launch Analysis
              </button>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="hero-visualization">
              <div className="stats-card">
                <div className="stats-card-glow"></div>
                <div className="stats-card-header">
                  <span className="stats-title">System Performance</span>
                  <div className="stats-pulse"></div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">✓</div>
                  <div className="stat-content">
                    <div className="stat-number">99.9%</div>
                    <div className="stat-label">Accuracy</div>
                  </div>
                  <div className="stat-line"></div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">⚡</div>
                  <div className="stat-content">
                    <div className="stat-number">&lt;2s</div>
                    <div className="stat-label">Processing</div>
                  </div>
                  <div className="stat-line"></div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">🔄</div>
                  <div className="stat-content">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
