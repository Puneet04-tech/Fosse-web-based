import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './GlobalSearch.css';

export default function GlobalSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const searchData = [
    // Navigation
    { id: 1, title: 'Home', category: 'Navigation', path: '/', icon: '🏠', description: 'Return to main dashboard' },
    { id: 2, title: 'Analytics', category: 'Navigation', path: '/analysis', icon: '�', description: 'View equipment analytics' },
    { id: 3, title: 'Compounds', category: 'Navigation', path: '/compounds', icon: '⚗️', description: 'Browse chemical compounds' },
    { id: 4, title: 'Reports', category: 'Navigation', path: '/reports', icon: '�', description: 'Generate and view reports' },
    
    // Equipment
    { id: 5, title: 'Reactor Vessel', category: 'Equipment', path: '/equipment/reactor', icon: '⚗️', description: 'Main chemical reactor unit' },
    { id: 6, title: 'Heat Exchanger', category: 'Equipment', path: '/equipment/heat-exchanger', icon: '🔥', description: 'Temperature control system' },
    { id: 7, title: 'Distillation Column', category: 'Equipment', path: '/equipment/distillation', icon: '🧪', description: 'Separation and purification' },
    { id: 8, title: 'Storage Tank', category: 'Equipment', path: '/equipment/storage', icon: '🛢️', description: 'Chemical storage vessel' },
    
    // Compounds
    { id: 9, title: 'Benzene', category: 'Compound', path: '/compounds/benzene', icon: '�', description: 'Aromatic hydrocarbon C₆H₆' },
    { id: 10, title: 'Ethanol', category: 'Compound', path: '/compounds/ethanol', icon: '🍷', description: 'Alcohol compound C₂H₅OH' },
    { id: 11, title: 'Methane', category: 'Compound', path: '/compounds/methane', icon: '⛽', description: 'Simple hydrocarbon CH₄' },
    { id: 12, title: 'Ammonia', category: 'Compound', path: '/compounds/ammonia', icon: '💧', description: 'Nitrogen compound NH₃' },
    
    // Reports
    { id: 13, title: 'Equipment Analysis', category: 'Report', path: '/reports/equipment', icon: '📈', description: 'Equipment performance report' },
    { id: 14, title: 'Safety Report', category: 'Report', path: '/reports/safety', icon: '�️', description: 'Safety compliance report' },
    { id: 15, title: 'Quality Control', category: 'Report', path: '/reports/quality', icon: '✅', description: 'Quality assurance report' },
    { id: 16, title: 'Maintenance Log', category: 'Report', path: '/reports/maintenance', icon: '🔧', description: 'Equipment maintenance report' },
    
    // Features
    { id: 17, title: 'Real-time Monitoring', category: 'Feature', path: '/features/monitoring', icon: '�', description: 'Live equipment monitoring' },
    { id: 18, title: 'Predictive Analytics', category: 'Feature', path: '/features/analytics', icon: '🔮', description: 'AI-powered predictions' },
    { id: 19, title: 'Alert System', category: 'Feature', path: '/features/alerts', icon: '🚨', description: 'Real-time alerts' },
    { id: 20, title: 'Data Export', category: 'Feature', path: '/features/export', icon: '�', description: 'Export analysis data' }
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsSearching(true);
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6);
      
      setTimeout(() => {
        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
        setIsSearching(false);
      }, 300);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (item) => {
    navigate(item.path);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredSuggestions.length > 0) {
      handleSearch(filteredSuggestions[0]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Navigation': return '#667eea';
      case 'Equipment': return '#764ba2';
      case 'Compound': return '#f093fb';
      case 'Report': return '#10b981';
      case 'Feature': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="global-search" ref={searchRef}>
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search equipment, compounds, reports..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
            autoComplete="off"
            style={{ paddingRight: searchTerm ? '4rem' : '4rem', paddingLeft: searchTerm ? '3rem' : '1rem' }}
          />
          {searchTerm && (
            <button 
              className="clear-button" 
              onClick={() => {
                setSearchTerm('');
                setShowSuggestions(false);
              }}
            >
              ✕
            </button>
          )}
          <span className="search-icon">🔍</span>
        </div>

        {showSuggestions && (
          <div className="search-suggestions">
            {isSearching ? (
              <div className="search-loading">
                <div className="loading-spinner"></div>
                <span>Searching...</span>
              </div>
            ) : filteredSuggestions.length > 0 ? (
              <div className="suggestions-list">
                {filteredSuggestions.map((item) => (
                  <div 
                    key={item.id} 
                    className="suggestion-item"
                    onClick={() => handleSearch(item)}
                  >
                    <span className="suggestion-icon">{item.icon}</span>
                    <div className="suggestion-content">
                      <div className="suggestion-title">{item.title}</div>
                      <div className="suggestion-description">{item.description}</div>
                    </div>
                    <span className="suggestion-category" style={{ color: getCategoryColor(item.category) }}>
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <div className="no-results-title">No results found</div>
                <div className="no-results-description">
                  Try searching for equipment, compounds, or reports
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
