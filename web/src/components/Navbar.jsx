import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`chemical-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Left Section - Brand */}
          <div className="navbar-brand-section">
            <Link to="/" className="chemical-brand" onClick={closeMobileMenu}>
              <div className="brand-icon">
                <svg viewBox="0 0 60 60" className="brand-svg">
                  <defs>
                    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="50%" stopColor="#764ba2" />
                      <stop offset="100%" stopColor="#f093fb" />
                    </linearGradient>
                    <filter id="brandGlow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Benzene Ring */}
                  <polygon points="30,15 40,20 40,30 30,35 20,30 20,20" 
                           fill="none" stroke="url(#brandGrad)" strokeWidth="2" filter="url(#brandGlow)"/>
                  <circle cx="30" cy="25" r="8" fill="none" stroke="url(#brandGrad)" strokeWidth="1" 
                          strokeDasharray="2,2" opacity="0.7" filter="url(#brandGlow)"/>
                  
                  {/* Chemical Bonds */}
                  <line x1="30" y1="35" x2="30" y2="45" stroke="url(#brandGrad)" strokeWidth="2" filter="url(#brandGlow)"/>
                  <circle cx="30" cy="45" r="3" fill="#f093fb" filter="url(#brandGlow)"/>
                </svg>
              </div>
              <div className="brand-text">
                <h1 className="brand-main">Chemical Equipment Data Analysis</h1>
                <p className="brand-subtitle">& Anomaly Detection</p>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Center Section - Navigation */}
          <div className={`navbar-nav-section ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="nav-links">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">📊</span>
                <span className="nav-text">Dashboard</span>
              </Link>
              <Link 
                to="/analysis" 
                className={`nav-link ${location.pathname === '/analysis' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">🔬</span>
                <span className="nav-text">Analysis</span>
              </Link>
              <Link 
                to="/compounds" 
                className={`nav-link ${location.pathname === '/compounds' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">⚗️</span>
                <span className="nav-text">Compounds</span>
              </Link>
              <Link 
                to="/reports" 
                className={`nav-link ${location.pathname === '/reports' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">📈</span>
                <span className="nav-text">Reports</span>
              </Link>
            </div>
          </div>

          {/* Right Section - Status Only on Desktop */}
          <div className="navbar-actions">
            <div className="status-container desktop-only">
              <div className="system-status">
                <div className="status-indicator">
                  <div className="status-dot"></div>
                  <div className="status-pulse"></div>
                </div>
                <span className="status-text">Active</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar - Below Navbar */}
      <div className="mobile-search-bar mobile-only">
        <div className="mobile-search-container">
          <form className="chemical-search" onSubmit={(e) => e.preventDefault()}>
            <div className="search-input-wrapper">
              <input 
                type="search" 
                className="search-input" 
                placeholder="Search compounds..."
                onFocus={() => setSearchActive(true)}
                onBlur={() => setSearchActive(false)}
              />
              <div className="search-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
            </div>
          </form>
        </div>
        
        {/* Mobile Status */}
        <div className="mobile-status">
          <div className="system-status">
            <div className="status-indicator">
              <div className="status-dot"></div>
              <div className="status-pulse"></div>
            </div>
            <span className="status-text">Active</span>
          </div>
        </div>
      </div>
    </>
  );
}
