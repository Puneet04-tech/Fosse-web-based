import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GlobalSearch from './components/GlobalSearch';
import HeroSection from './components/HeroSection';
import ChartComponent from './components/ChartComponent';
import History from './components/History';
import UploadForm from './components/UploadForm';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import EquipmentTable from './components/EquipmentTable';
import SummaryCards from './components/SummaryCards';
import Toast from './components/Toast';
import Preloader from './components/Preloader';
import ChemBackground from './components/ChemBackground';
import './styles/theme.css';
import './components/HeroSection.css';
import './components/DashboardLayout.css';

// Page Components
function HomePage() {
  const [dataset, setDataset] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  return (
    <>
      {/* Hero Section */}
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
                  onClick={() => document.getElementById('dashboard-overview')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  🚀 View Dashboard
                </button>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="hero-visualization">
                <div className="stats-card">
                  <div className="stat-item">
                    <div className="stat-number">99.9%</div>
                    <div className="stat-label">Accuracy</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">&lt;2s</div>
                    <div className="stat-label">Processing</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Overview */}
      <section id="dashboard-overview" className="dashboard-overview">
        <div className="container-fluid">
          <div className="row g-4">
            {/* Quick Stats Cards */}
            <div className="col-12">
              <div className="section-header">
                <h2 className="section-title">Dashboard Overview</h2>
                <p className="section-subtitle">Real-time insights and system performance metrics</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <div className="metric-card">
                <div className="metric-icon">📊</div>
                <div className="metric-content">
                  <h3 className="metric-value">1,247</h3>
                  <p className="metric-label">Total Analyses</p>
                  <span className="metric-change positive">+12.5%</span>
                </div>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <div className="metric-card">
                <div className="metric-icon">⚗️</div>
                <div className="metric-content">
                  <h3 className="metric-value">42</h3>
                  <p className="metric-label">Active Equipment</p>
                  <span className="metric-change positive">+3 new</span>
                </div>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <div className="metric-card">
                <div className="metric-icon">🚨</div>
                <div className="metric-content">
                  <h3 className="metric-value">3</h3>
                  <p className="metric-label">Active Alerts</p>
                  <span className="metric-change negative">-2 resolved</span>
                </div>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <div className="metric-card">
                <div className="metric-icon">⚡</div>
                <div className="metric-content">
                  <h3 className="metric-value">98.7%</h3>
                  <p className="metric-label">System Health</p>
                  <span className="metric-change positive">+0.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Analysis Section */}
      <section className="data-analysis-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="section-header">
                <h2 className="section-title">Data Analysis Hub</h2>
                <p className="section-subtitle">Upload and analyze your chemical equipment data</p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* Upload Section */}
            <div className="col-lg-4">
              <div className="upload-card">
                <div className="card-header">
                  <h3 className="card-title">📤 Data Upload</h3>
                  <p className="card-subtitle">Import CSV files for analysis</p>
                </div>
                <div className="card-body">
                  <UploadForm onUploaded={(ds) => setDataset(ds)} onMessage={(m) => setToast(m)} />
                </div>
              </div>
            </div>

            {/* Recent Analysis */}
            <div className="col-lg-8">
              <div className="analysis-card">
                <div className="card-header">
                  <h3 className="card-title">📈 Recent Analysis</h3>
                  <p className="card-subtitle">Latest equipment performance data</p>
                </div>
                <div className="card-body">
                  {dataset ? (
                    <div className="analysis-summary">
                      <SummaryCards summary={dataset.summary} datasetId={dataset.id} onMessage={(m) => setToast(m)} />
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">📊</div>
                      <h4>No Data Available</h4>
                      <p>Upload a CSV file to start analyzing your equipment data</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visualizations Section */}
      {dataset && (
        <section className="visualizations-section">
          <div className="container-fluid">
            <div className="section-header">
              <h2 className="section-title">Advanced Visualizations</h2>
              <p className="section-subtitle">Interactive charts and detailed data analysis</p>
            </div>

            <div className="row g-4">
              <div className="col-lg-8">
                <div className="chart-card">
                  <div className="card-header">
                    <h3 className="card-title">📊 Performance Trends</h3>
                    <p className="card-subtitle">Real-time equipment parameter analysis</p>
                  </div>
                  <div className="card-body">
                    <ChartComponent summary={dataset.summary} />
                  </div>
                </div>
              </div>
              
              <div className="col-lg-4">
                <div className="table-card">
                  <div className="card-header">
                    <h3 className="card-title">🔧 Equipment Status</h3>
                    <p className="card-subtitle">Current system parameters</p>
                  </div>
                  <div className="card-body">
                    <EquipmentTable datasetId={dataset.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* History Section */}
      <section className="history-section">
        <div className="container-fluid">
          <div className="section-header">
            <h2 className="section-title">Analysis History</h2>
            <p className="section-subtitle">Access your previous analyses and reports</p>
          </div>

          <div className="history-container">
            <History onSelect={(ds) => setDataset(ds)} onMessage={(m) => setToast(m)} />
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="quick-actions-section">
        <div className="container-fluid">
          <div className="section-header">
            <h2 className="section-title">Quick Actions</h2>
            <p className="section-subtitle">Navigate to key features and tools</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="action-card" onClick={() => window.location.href = '/analysis'}>
                <div className="action-icon">📊</div>
                <h4>Analytics</h4>
                <p>Advanced data analysis and reporting</p>
                <span className="action-arrow">→</span>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <div className="action-card" onClick={() => window.location.href = '/compounds'}>
                <div className="action-icon">⚗️</div>
                <h4>Compounds</h4>
                <p>Chemical compounds database</p>
                <span className="action-arrow">→</span>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <div className="action-card" onClick={() => window.location.href = '/reports'}>
                <div className="action-icon">📄</div>
                <h4>Reports</h4>
                <p>Generate and manage reports</p>
                <span className="action-arrow">→</span>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <div className="action-card" onClick={() => window.location.href = '/equipment'}>
                <div className="action-icon">🔧</div>
                <h4>Equipment</h4>
                <p>Equipment monitoring and control</p>
                <span className="action-arrow">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast} 
          onClose={() => setToast(null)} 
        />
      )}
    </>
  );
}

function AnalysisPage() {
  return (
    <main className="main-content" style={{ paddingTop: '220px' }}>
      <AnalyticsDashboard />
    </main>
  );
}

function CompoundsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  
  const compounds = [
    {
      id: 1,
      name: 'Benzene',
      formula: 'C₆H₆',
      category: 'aromatic',
      description: 'Aromatic hydrocarbon with ring structure',
      properties: { boiling: '80.1°C', melting: '5.5°C', density: '0.876 g/cm³' },
      structure: '🔬'
    },
    {
      id: 2,
      name: 'Ethanol',
      formula: 'C₂H₅OH',
      category: 'alcohol',
      description: 'Common alcohol used in various industrial processes',
      properties: { boiling: '78.4°C', melting: '-114.1°C', density: '0.789 g/cm³' },
      structure: '⚗️'
    },
    {
      id: 3,
      name: 'Methane',
      formula: 'CH₄',
      category: 'hydrocarbon',
      description: 'Simplest alkane and primary component of natural gas',
      properties: { boiling: '-161.5°C', melting: '-182.5°C', density: '0.657 g/cm³' },
      structure: '🧪'
    },
    {
      id: 4,
      name: 'Acetone',
      formula: 'C₃H₆O',
      category: 'ketone',
      description: 'Organic solvent commonly used in laboratories',
      properties: { boiling: '56°C', melting: '-95°C', density: '0.784 g/cm³' },
      structure: '🔬'
    },
    {
      id: 5,
      name: 'Sulfuric Acid',
      formula: 'H₂SO₄',
      category: 'acid',
      description: 'Strong acid widely used in chemical industry',
      properties: { boiling: '337°C', melting: '10°C', density: '1.84 g/cm³' },
      structure: '⚗️'
    },
    {
      id: 6,
      name: 'Ammonia',
      formula: 'NH₃',
      category: 'base',
      description: 'Compound of nitrogen and hydrogen, essential for fertilizers',
      properties: { boiling: '-33.3°C', melting: '-77.7°C', density: '0.682 g/cm³' },
      structure: '🧪'
    },
    {
      id: 7,
      name: 'Toluene',
      formula: 'C₇H₈',
      category: 'aromatic',
      description: 'Aromatic hydrocarbon used as solvent and fuel additive',
      properties: { boiling: '110.6°C', melting: '-95°C', density: '0.867 g/cm³' },
      structure: '🔬'
    },
    {
      id: 8,
      name: 'Methanol',
      formula: 'CH₃OH',
      category: 'alcohol',
      description: 'Simplest alcohol used as solvent and fuel',
      properties: { boiling: '64.7°C', melting: '-97.6°C', density: '0.792 g/cm³' },
      structure: '⚗️'
    },
    {
      id: 9,
      name: 'Ethane',
      formula: 'C₂H₆',
      category: 'hydrocarbon',
      description: 'Second simplest alkane, component of natural gas',
      properties: { boiling: '-88.6°C', melting: '-182.8°C', density: '1.26 g/cm³' },
      structure: '🧪'
    },
    {
      id: 10,
      name: 'Propane',
      formula: 'C₃H₈',
      category: 'hydrocarbon',
      description: 'Three-carbon alkane used as fuel',
      properties: { boiling: '-42°C', melting: '-187.7°C', density: '2.01 g/cm³' },
      structure: '🧪'
    },
    {
      id: 11,
      name: 'Butane',
      formula: 'C₄H₁₀',
      category: 'hydrocarbon',
      description: 'Four-carbon alkane used in lighters and fuel',
      properties: { boiling: '-0.5°C', melting: '-138.4°C', density: '2.48 g/cm³' },
      structure: '🧪'
    },
    {
      id: 12,
      name: 'Hexane',
      formula: 'C₆H₁₄',
      category: 'hydrocarbon',
      description: 'Six-carbon alkane used as solvent',
      properties: { boiling: '68.7°C', melting: '-95.3°C', density: '0.654 g/cm³' },
      structure: '🧪'
    },
    {
      id: 13,
      name: 'Cyclohexane',
      formula: 'C₆H₁₂',
      category: 'hydrocarbon',
      description: 'Cycloalkane used as non-polar solvent',
      properties: { boiling: '80.7°C', melting: '6.5°C', density: '0.779 g/cm³' },
      structure: '🧪'
    },
    {
      id: 14,
      name: 'Isopropanol',
      formula: 'C₃H₈O',
      category: 'alcohol',
      description: 'Isopropyl alcohol used as disinfectant and solvent',
      properties: { boiling: '82.5°C', melting: '-88.5°C', density: '0.786 g/cm³' },
      structure: '⚗️'
    },
    {
      id: 15,
      name: 'Butanol',
      formula: 'C₄H₉OH',
      category: 'alcohol',
      description: 'Four-carbon alcohol used in solvents and fuels',
      properties: { boiling: '117.7°C', melting: '-89.8°C', density: '0.81 g/cm³' },
      structure: '⚗️'
    },
    {
      id: 16,
      name: 'Phenol',
      formula: 'C₆H₅OH',
      category: 'aromatic',
      description: 'Aromatic compound used in resins and disinfectants',
      properties: { boiling: '181.7°C', melting: '40.5°C', density: '1.07 g/cm³' },
      structure: '🔬'
    },
    {
      id: 17,
      name: 'Naphthalene',
      formula: 'C₁₀H₈',
      category: 'aromatic',
      description: 'Polycyclic aromatic hydrocarbon used in mothballs',
      properties: { boiling: '218°C', melting: '80.2°C', density: '1.14 g/cm³' },
      structure: '🔬'
    },
    {
      id: 18,
      name: 'Anthracene',
      formula: 'C₁₄H₁₀',
      category: 'aromatic',
      description: 'Three-ring aromatic compound used in dyes',
      properties: { boiling: '340°C', melting: '216.2°C', density: '1.25 g/cm³' },
      structure: '🔬'
    },
    {
      id: 19,
      name: 'Formaldehyde',
      formula: 'CH₂O',
      category: 'aldehyde',
      description: 'Simplest aldehyde used in resins and preservatives',
      properties: { boiling: '-19°C', melting: '-80°C', density: '0.815 g/cm³' },
      structure: '🔬'
    },
    {
      id: 20,
      name: 'Acetaldehyde',
      formula: 'C₂H₄O',
      category: 'aldehyde',
      description: 'Aldehyde used in chemical synthesis',
      properties: { boiling: '20.2°C', melting: '-123°C', density: '0.784 g/cm³' },
      structure: '🔬'
    },
    {
      id: 21,
      name: 'Acetic Acid',
      formula: 'CH₃COOH',
      category: 'acid',
      description: 'Weak acid found in vinegar, used in food industry',
      properties: { boiling: '118.1°C', melting: '16.6°C', density: '1.05 g/cm³' },
      structure: '⚗️'
    },
    {
      id: 22,
      name: 'Formic Acid',
      formula: 'HCOOH',
      category: 'acid',
      description: 'Simplest carboxylic acid used in textiles',
      properties: { boiling: '100.8°C', melting: '8.4°C', density: '1.22 g/cm³' },
      structure: '⚗️'
    },
    {
      id: 23,
      name: 'Hydrochloric Acid',
      formula: 'HCl',
      category: 'acid',
      description: 'Strong acid used in industrial processes',
      properties: { boiling: '-85°C', melting: '-114°C', density: '1.18 g/cm³' },
      structure: '⚗️'
    },
    {
      id: 24,
      name: 'Nitric Acid',
      formula: 'HNO₃',
      category: 'acid',
      description: 'Strong acid used in fertilizer production',
      properties: { boiling: '83°C', melting: '-42°C', density: '1.51 g/cm³' },
      structure: '⚗️'
    },
    {
      id: 25,
      name: 'Sodium Hydroxide',
      formula: 'NaOH',
      category: 'base',
      description: 'Strong base used in soap making and paper industry',
      properties: { boiling: '1388°C', melting: '318°C', density: '2.13 g/cm³' },
      structure: '🧪'
    },
    {
      id: 26,
      name: 'Potassium Hydroxide',
      formula: 'KOH',
      category: 'base',
      description: 'Strong base used in fertilizers and batteries',
      properties: { boiling: '1320°C', melting: '360°C', density: '2.04 g/cm³' },
      structure: '🧪'
    },
    {
      id: 27,
      name: 'Calcium Hydroxide',
      formula: 'Ca(OH)₂',
      category: 'base',
      description: 'Strong base used in construction and water treatment',
      properties: { boiling: '580°C', melting: '580°C', density: '2.24 g/cm³' },
      structure: '🧪'
    },
    {
      id: 28,
      name: 'Carbon Dioxide',
      formula: 'CO₂',
      category: 'oxide',
      description: 'Greenhouse gas used in carbonation of beverages',
      properties: { boiling: '-78.5°C', melting: '-56.6°C', density: '1.98 g/cm³' },
      structure: '🧪'
    },
    {
      id: 29,
      name: 'Water',
      formula: 'H₂O',
      category: 'oxide',
      description: 'Universal solvent essential for life',
      properties: { boiling: '100°C', melting: '0°C', density: '1.0 g/cm³' },
      structure: '💧'
    },
    {
      id: 30,
      name: 'Hydrogen Peroxide',
      formula: 'H₂O₂',
      category: 'oxide',
      description: 'Strong oxidizer used as disinfectant and bleach',
      properties: { boiling: '150.2°C', melting: '-0.4°C', density: '1.45 g/cm³' },
      structure: '🧪'
    },
    {
      id: 31,
      name: 'Ozone',
      formula: 'O₃',
      category: 'oxide',
      description: 'Triatomic oxygen used in water treatment',
      properties: { boiling: '-112°C', melting: '-192°C', density: '2.14 g/cm³' },
      structure: '🧪'
    },
    {
      id: 32,
      name: 'Sulfur Dioxide',
      formula: 'SO₂',
      category: 'oxide',
      description: 'Toxic gas used in food preservation',
      properties: { boiling: '-10°C', melting: '-72°C', density: '2.62 g/cm³' },
      structure: '🧪'
    },
    {
      id: 33,
      name: 'Nitrogen Dioxide',
      formula: 'NO₂',
      category: 'oxide',
      description: 'Brown gas involved in air pollution',
      properties: { boiling: '21°C', melting: '-11°C', density: '1.45 g/cm³' },
      structure: '🧪'
    },
    {
      id: 34,
      name: 'Methyl Ethyl Ketone',
      formula: 'C₄H₈O',
      category: 'ketone',
      description: 'Industrial solvent used in paints and coatings',
      properties: { boiling: '79.6°C', melting: '-86°C', density: '0.805 g/cm³' },
      structure: '🔬'
    },
    {
      id: 35,
      name: 'Cyclohexanone',
      formula: 'C₆H₁₀O',
      category: 'ketone',
      description: 'Ketone used in nylon production',
      properties: { boiling: '155°C', melting: '-47°C', density: '0.947 g/cm³' },
      structure: '🔬'
    },
    {
      id: 36,
      name: 'Diethyl Ether',
      formula: 'C₄H₁₀O',
      category: 'ether',
      description: 'Solvent historically used as anesthetic',
      properties: { boiling: '34.6°C', melting: '-116°C', density: '0.713 g/cm³' },
      structure: '🔬'
    },
    {
      id: 37,
      name: 'Dimethyl Ether',
      formula: 'C₂H₆O',
      category: 'ether',
      description: 'Simple ether used as aerosol propellant',
      properties: { boiling: '-24°C', melting: '-141°C', density: '1.98 g/cm³' },
      structure: '🔬'
    },
    {
      id: 38,
      name: 'Tetrahydrofuran',
      formula: 'C₄H₈O',
      category: 'ether',
      description: 'Cyclic ether used as solvent in polymer chemistry',
      properties: { boiling: '66°C', melting: '-108°C', density: '0.889 g/cm³' },
      structure: '🔬'
    },
    {
      id: 39,
      name: 'Dioxane',
      formula: 'C₄H₈O₂',
      category: 'ether',
      description: 'Cyclic ether used as solvent in industrial applications',
      properties: { boiling: '101°C', melting: '11°C', density: '1.03 g/cm³' },
      structure: '🔬'
    },
    {
      id: 40,
      name: 'Ethyl Acetate',
      formula: 'C₄H₈O₂',
      category: 'ester',
      description: 'Ester used as solvent in paints and coatings',
      properties: { boiling: '77.1°C', melting: '-83°C', density: '0.902 g/cm³' },
      structure: '🔬'
    },
    {
      id: 41,
      name: 'Methyl Acetate',
      formula: 'C₃H₆O₂',
      category: 'ester',
      description: 'Ester used as solvent in adhesives',
      properties: { boiling: '57°C', melting: '-98°C', density: '0.932 g/cm³' },
      structure: '🔬'
    },
    {
      id: 42,
      name: 'Butyl Acetate',
      formula: 'C₆H₁₂O₂',
      category: 'ester',
      description: 'Ester used in fruit flavorings and perfumes',
      properties: { boiling: '126°C', melting: '-77°C', density: '0.882 g/cm³' },
      structure: '🔬'
    },
    {
      id: 43,
      name: 'Acetylene',
      formula: 'C₂H₂',
      category: 'alkyne',
      description: 'Simplest alkyne used in welding torches',
      properties: { boiling: '-84°C', melting: '-80.8°C', density: '1.17 g/cm³' },
      structure: '🧪'
    },
    {
      id: 44,
      name: 'Propylene',
      formula: 'C₃H₆',
      category: 'alkene',
      description: 'Alkene used in plastic manufacturing',
      properties: { boiling: '-47.6°C', melting: '-185°C', density: '1.81 g/cm³' },
      structure: '🧪'
    },
    {
      id: 45,
      name: 'Ethylene',
      formula: 'C₂H₄',
      category: 'alkene',
      description: 'Simplest alkene used in plastic production',
      properties: { boiling: '-103.7°C', melting: '-169°C', density: '1.18 g/cm³' },
      structure: '🧪'
    },
    {
      id: 46,
      name: 'Styrene',
      formula: 'C₈H₈',
      category: 'aromatic',
      description: 'Aromatic compound used in polystyrene production',
      properties: { boiling: '145°C', melting: '-30.6°C', density: '0.909 g/cm³' },
      structure: '🔬'
    },
    {
      id: 47,
      name: 'Xylene',
      formula: 'C₈H₁₀',
      category: 'aromatic',
      description: 'Aromatic compound used as solvent and fuel additive',
      properties: { boiling: '138°C', melting: '-47.9°C', density: '0.86 g/cm³' },
      structure: '🔬'
    },
    {
      id: 48,
      name: 'Chloroform',
      formula: 'CHCl₃',
      category: 'halogenated',
      description: 'Halogenated compound historically used as anesthetic',
      properties: { boiling: '61.2°C', melting: '-63.5°C', density: '1.49 g/cm³' },
      structure: '🧪'
    },
    {
      id: 49,
      name: 'Carbon Tetrachloride',
      formula: 'CCl₄',
      category: 'halogenated',
      description: 'Halogenated compound used in fire extinguishers',
      properties: { boiling: '76.7°C', melting: '-23°C', density: '1.59 g/cm³' },
      structure: '🧪'
    },
    {
      id: 50,
      name: 'Methylene Chloride',
      formula: 'CH₂Cl₂',
      category: 'halogenated',
      description: 'Halogenated solvent used in paint removers',
      properties: { boiling: '39.6°C', melting: '-95°C', density: '1.33 g/cm³' },
      structure: '🧪'
    },
    {
      id: 51,
      name: 'Freon-12',
      formula: 'CCl₂F₂',
      category: 'halogenated',
      description: 'Chlorofluorocarbon used as refrigerant',
      properties: { boiling: '-29.8°C', melting: '-158°C', density: '1.31 g/cm³' },
      structure: '🧪'
    },
    {
      id: 52,
      name: 'Urea',
      formula: 'CH₄N₂O',
      category: 'amide',
      description: 'Organic compound used in fertilizers and cosmetics',
      properties: { boiling: '133°C', melting: '133°C', density: '1.32 g/cm³' },
      structure: '🔬'
    },
    {
      id: 53,
      name: 'Acetamide',
      formula: 'C₂H₅NO',
      category: 'amide',
      description: 'Simple amide used in chemical synthesis',
      properties: { boiling: '221°C', melting: '82°C', density: '1.16 g/cm³' },
      structure: '🔬'
    },
    {
      id: 54,
      name: 'Aniline',
      formula: 'C₆H₅NH₂',
      category: 'aromatic',
      description: 'Aromatic amine used in dye production',
      properties: { boiling: '184°C', melting: '-6°C', density: '1.02 g/cm³' },
      structure: '🔬'
    },
    {
      id: 55,
      name: 'Pyridine',
      formula: 'C₅H₅N',
      category: 'aromatic',
      description: 'Aromatic heterocycle used as solvent',
      properties: { boiling: '115°C', melting: '-41.6°C', density: '0.982 g/cm³' },
      structure: '🔬'
    },
    {
      id: 56,
      name: 'Furan',
      formula: 'C₄H₄O',
      category: 'heterocycle',
      description: 'Five-membered heterocycle used in chemical synthesis',
      properties: { boiling: '31°C', melting: '-85.6°C', density: '0.937 g/cm³' },
      structure: '🔬'
    },
    {
      id: 57,
      name: 'Thiophene',
      formula: 'C₄H₄S',
      category: 'heterocycle',
      description: 'Sulfur-containing heterocycle used in pharmaceuticals',
      properties: { boiling: '84°C', melting: '-38°C', density: '1.06 g/cm³' },
      structure: '🔬'
    },
    {
      id: 58,
      name: 'Pyrrole',
      formula: 'C₄H₅N',
      category: 'heterocycle',
      description: 'Five-membered heterocycle found in porphyrins',
      properties: { boiling: '36°C', melting: '-24°C', density: '0.967 g/cm³' },
      structure: '🔬'
    }
  ];

  const categories = ['all', 'aromatic', 'alcohol', 'hydrocarbon', 'ketone', 'acid', 'base', 'aldehyde', 'oxide', 'ether', 'ester', 'alkyne', 'alkene', 'halogenated', 'amide', 'heterocycle'];
  
  const filteredCompounds = compounds.filter(compound => {
    const matchesSearch = compound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         compound.formula.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || compound.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewStructure = (compound) => {
    console.log('View Structure clicked for:', compound.name);
    
    // Create a detailed structure view
    const structureContent = `
CHEMICAL STRUCTURE ANALYSIS
============================
Compound: ${compound.name}
Formula: ${compound.formula}
Category: ${compound.category}
Description: ${compound.description}

MOLECULAR INFORMATION
=====================
Molecular Formula: ${compound.formula}
Chemical Category: ${compound.category}
Common Name: ${compound.name}

PHYSICAL PROPERTIES
==================
Boiling Point: ${compound.properties.boiling}
Melting Point: ${compound.properties.melting}
Density: ${compound.properties.density}

STRUCTURE REPRESENTATION
========================
${compound.structure}

INDUSTRIAL APPLICATIONS
=======================
${compound.description}

SAFETY INFORMATION
==================
Category: ${compound.category}
Handling: Standard laboratory safety procedures
Storage: Store according to chemical category guidelines

ANALYSIS DATE: ${new Date().toLocaleDateString()}
GENERATED BY: Fosse Chemical Database System
    `.trim();

    // Open structure in new window
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Chemical Structure - ${compound.name}</title>
          <style>
            body { 
              font-family: 'Courier New', monospace; 
              margin: 20px; 
              line-height: 1.6; 
              background: #0f172a;
              color: #e2e8f0;
            }
            .header { 
              border-bottom: 2px solid #3b82f6; 
              padding-bottom: 10px; 
              margin-bottom: 20px; 
              color: #60a5fa;
            }
            .section { 
              margin: 20px 0; 
              color: #94a3b8;
            }
            .property { 
              background: #1e293b; 
              padding: 10px; 
              margin: 5px 0; 
              border-radius: 5px;
              border-left: 4px solid #3b82f6;
            }
            pre { 
              background: #1e293b; 
              padding: 15px; 
              border-radius: 5px; 
              overflow-x: auto;
              color: #e2e8f0;
            }
            .structure-icon {
              font-size: 48px;
              text-align: center;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🧪 Chemical Structure Analysis</h1>
            <h2>${compound.name} (${compound.formula})</h2>
          </div>
          
          <div class="structure-icon">${compound.structure}</div>
          
          <pre>${structureContent}</pre>
          
          <div style="margin-top: 30px; padding: 20px; background: #1e293b; border-radius: 8px;">
            <p><strong>📊 Analysis Complete</strong></p>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>System: Fosse Chemical Database v2.0</p>
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const handleExportData = (compound) => {
    console.log('Export Data clicked for:', compound.name);
    
    // Create CSV content
    const csvContent = `Chemical Compound Data Export
Generated: ${new Date().toLocaleString()}
System: Fosse Chemical Database v2.0

Name,Formula,Category,Description,Boiling Point,Melting Point,Density
"${compound.name}","${compound.formula}","${compound.category}","${compound.description}","${compound.properties.boiling}","${compound.properties.melting}","${compound.properties.density}"

Detailed Properties:
===================
Compound Name: ${compound.name}
Molecular Formula: ${compound.formula}
Chemical Category: ${compound.category}
Description: ${compound.description}
Boiling Point: ${compound.properties.boiling}
Melting Point: ${compound.properties.melting}
Density: ${compound.properties.density}
Structure Symbol: ${compound.structure}

Export Metadata:
===============
Export Date: ${new Date().toISOString()}
Export Format: CSV/Text
Source: Fosse Chemical Database
Version: 2.0
Total Compounds: 1
    `.trim();

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compound_${compound.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    
    // Show success message
    alert(`✅ Successfully exported ${compound.name} data!`);
  };

  return (
    <main className="main-content compounds-page" style={{ paddingTop: '220px' }}>
      <div className="container-fluid">
        {/* Header Section */}
        <div className="compounds-header">
          <div className="header-content">
            <h1 className="page-title">
              <span className="title-icon">🧪</span>
              Chemical Compounds Database
            </h1>
            <p className="page-subtitle">Explore molecular structures, properties, and chemical relationships</p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="compounds-controls">
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Search compounds by name or formula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="search-icon">🔍</div>
            </div>
          </div>
          
          <div className="category-filter">
            <div className="filter-label">Category:</div>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Compounds Grid */}
        <div className="compounds-grid">
          {filteredCompounds.map((compound, index) => (
            <div key={compound.id} className="compound-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="compound-header">
                <div className="compound-icon">{compound.structure}</div>
                <div className="compound-basic">
                  <h3 className="compound-name">{compound.name}</h3>
                  <div className="compound-formula">{compound.formula}</div>
                </div>
                <div className="compound-category">
                  <span className="category-badge">{compound.category}</span>
                </div>
              </div>
              
              <div className="compound-description">
                <p>{compound.description}</p>
              </div>
              
              <div className="compound-properties">
                <h4>Physical Properties</h4>
                <div className="properties-grid">
                  <div className="property-item">
                    <span className="property-label">Boiling Point</span>
                    <span className="property-value">{compound.properties.boiling}</span>
                  </div>
                  <div className="property-item">
                    <span className="property-label">Melting Point</span>
                    <span className="property-value">{compound.properties.melting}</span>
                  </div>
                  <div className="property-item">
                    <span className="property-label">Density</span>
                    <span className="property-value">{compound.properties.density}</span>
                  </div>
                </div>
              </div>
              
              <div className="compound-actions">
                <button 
                  className="action-btn primary"
                  onClick={() => handleViewStructure(compound)}
                >
                  <span className="btn-icon">📊</span>
                  View Structure
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => handleExportData(compound)}
                >
                  <span className="btn-icon">📄</span>
                  Export Data
                </button>
              </div>
              
              <div className="compound-glow"></div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="compounds-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{compounds.length}</div>
              <div className="stat-label">Total Compounds</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{categories.length - 1}</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Database Access</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">∞</div>
              <div className="stat-label">Data Points</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ReportsPage() {
  console.log('ReportsPage component rendered!');
  const [selectedReport, setSelectedReport] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');
  
  // Load saved reports from localStorage
  const [savedReports, setSavedReports] = React.useState(() => {
    console.log('🔍 ReportsPage: Initializing savedReports state');
    const stored = localStorage.getItem('fosseReports');
    console.log('🔍 ReportsPage: Raw localStorage data:', stored);
    const parsed = stored ? JSON.parse(stored) : [];
    console.log('🔍 ReportsPage: Parsed saved reports:', parsed.length, 'items');
    return parsed;
  });
  
  // Function to refresh reports from localStorage
  const refreshReports = () => {
    console.log('🔍 ReportsPage: refreshReports called');
    const stored = localStorage.getItem('fosseReports');
    console.log('🔍 ReportsPage: Raw localStorage data on refresh:', stored);
    const newReports = stored ? JSON.parse(stored) : [];
    console.log('🔍 ReportsPage: Setting new reports:', newReports.length, 'items');
    setSavedReports(newReports);
    console.log('🔍 ReportsPage: Reports refreshed:', newReports.length, 'total reports');
  };
  
  // Auto-refresh reports every 5 minutes
  React.useEffect(() => {
    const interval = setInterval(() => {
      refreshReports();
    }, 300000); // Update every 5 minutes (300,000 ms) instead of 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Listen for storage changes from other tabs
  React.useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'fosseReports') {
        refreshReports();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Default static reports
  const defaultReports = [
    {
      id: 1,
      title: 'Equipment Performance Analysis',
      type: 'performance',
      date: '2024-01-15',
      status: 'completed',
      description: 'Comprehensive analysis of equipment performance metrics and efficiency indicators',
      datasets: 12,
      anomalies: 3,
      accuracy: '98.5%',
      downloadUrl: '#',
      icon: '📊'
    },
    {
      id: 2,
      title: 'Anomaly Detection Report',
      type: 'anomaly',
      date: '2024-01-14',
      status: 'completed',
      description: 'AI-powered anomaly detection with statistical analysis and risk assessment',
      datasets: 8,
      anomalies: 7,
      accuracy: '96.2%',
      downloadUrl: '#',
      icon: '🚨'
    },
    {
      id: 3,
      title: 'Chemical Composition Analysis',
      type: 'chemical',
      date: '2024-01-13',
      status: 'completed',
      description: 'Detailed chemical composition analysis with quality control metrics',
      datasets: 15,
      anomalies: 2,
      accuracy: '99.1%',
      downloadUrl: '#',
      icon: '🧪'
    },
    {
      id: 4,
      title: 'Trend Analysis Report',
      type: 'trend',
      date: '2024-01-12',
      status: 'completed',
      description: 'Long-term trend analysis with predictive modeling and forecasting',
      datasets: 24,
      anomalies: 8,
      accuracy: '94.7%',
      downloadUrl: '#',
      icon: '📈'
    },
    {
      id: 5,
      title: 'Safety Compliance Report',
      type: 'safety',
      date: '2024-01-11',
      status: 'scheduled',
      description: 'Safety compliance assessment with regulatory standards verification',
      datasets: 15,
      anomalies: 1,
      accuracy: '100%',
      downloadUrl: '#',
      icon: '🛡️'
    },
    {
      id: 6,
      title: 'Maintenance Optimization Report',
      type: 'maintenance',
      date: '2024-01-10',
      status: 'completed',
      description: 'Maintenance schedule optimization with cost-benefit analysis',
      datasets: 10,
      anomalies: 4,
      accuracy: '97.3%',
      downloadUrl: '#',
      icon: '🔧'
    }
  ];

  // Combine default reports with saved reports
  const allReports = React.useMemo(() => {
    const combined = [...defaultReports, ...savedReports];
    return combined.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [savedReports]);
  
  const reports = allReports;

  const reportTypes = ['all', 'performance', 'anomaly', 'chemical', 'trend', 'safety', 'maintenance'];
  
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#10b981';
      case 'processing': return '#f59e0b';
      case 'scheduled': return '#6366f1';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return '✅';
      case 'processing': return '⏳';
      case 'scheduled': return '📅';
      default: return '❓';
    }
  };

  const handleViewReport = (report) => {
    console.log('View Report clicked:', report);
    // Create a sample report content
    const reportContent = `
REPORT: ${report.title}
============================
Type: ${report.type}
Date: ${report.date}
Status: ${report.status}

Description:
${report.description}

Metrics:
- Datasets Analyzed: ${report.datasets}
- Anomalies Detected: ${report.anomalies}
- Analysis Accuracy: ${report.accuracy}

This is a comprehensive ${report.type} report generated on ${report.date}.
The analysis covered ${report.datasets} datasets and identified ${report.anomalies} anomalies
with an accuracy of ${report.accuracy}.

---
Generated by Fosse Equipment Monitoring System
    `.trim();

    // Open report in new window
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>${report.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            pre { background: #f8f8f8; padding: 15px; border-radius: 5px; white-space: pre-wrap; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <pre>${reportContent}</pre>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const handleDownloadReport = (report) => {
    console.log('Download Report clicked:', report);
    // Create a sample report content
    const reportContent = `
REPORT: ${report.title}
============================
Type: ${report.type}
Date: ${report.date}
Status: ${report.status}

Description:
${report.description}

Metrics:
- Datasets Analyzed: ${report.datasets}
- Anomalies Detected: ${report.anomalies}
- Analysis Accuracy: ${report.accuracy}

This is a comprehensive ${report.type} report generated on ${report.date}.
The analysis covered ${report.datasets} datasets and identified ${report.anomalies} anomalies
with an accuracy of ${report.accuracy}.

---
Generated by Fosse Equipment Monitoring System
    `.trim();

    // Create and download file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, '_')}_${report.date}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleExportData = (report) => {
    console.log('Export Data clicked:', report);
    // Create sample CSV data
    const csvContent = `Report Title,Type,Date,Status,Datasets,Anomalies,Accuracy
"${report.title}","${report.type}","${report.date}","${report.status}",${report.datasets},${report.anomalies},${report.accuracy}

Sample Data Points:
Timestamp,Equipment,Parameter,Value,Status
2024-01-15 10:00:00,Pump-1,Flowrate,150.5,Normal
2024-01-15 10:01:00,Pump-2,Pressure,85.2,Normal
2024-01-15 10:02:00,Valve-1,Temperature,75.8,Anomaly
2024-01-15 10:03:00,Pump-1,Flowrate,148.3,Normal
2024-01-15 10:04:00,Valve-2,Temperature,72.1,Normal
`;

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, '_')}_data_${report.date}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleGenerateNewReport = () => {
    console.log('Generate New Report clicked');
    alert('🚀 Report Generation Started!\n\nThis will:\n• Analyze latest equipment data\n• Detect anomalies using AI\n• Generate comprehensive report\n• Send notification when ready');
    
    // You could open a modal or navigate to a report generation page
    // For now, we'll show a simple confirmation
  };

  const handleViewTemplates = () => {
    console.log('View Templates clicked');
    const templatesContent = `
AVAILABLE REPORT TEMPLATES
==========================

1. 📊 Equipment Performance Report
   • Analyzes equipment efficiency
   • Tracks performance metrics
   • Identifies optimization opportunities

2. 🚨 Anomaly Detection Report  
   • AI-powered anomaly detection
   • Statistical analysis with Z-scores
   • Risk assessment and recommendations

3. 🧪 Chemical Analysis Report
   • Chemical composition analysis
   • Quality control metrics
   • Compliance verification

4. 📈 Trend Analysis Report
   • Historical trend analysis
   • Predictive modeling
   • Future performance projections

5. 🛡️ Safety Compliance Report
   • Safety protocol compliance
   • Risk assessment
   • Regulatory adherence

6. 🔧 Maintenance Optimization Report
   • Maintenance scheduling
   • Equipment lifecycle analysis
   • Cost optimization recommendations

---
Select a template to customize and generate your report!
    `.trim();

    // Open templates in new window
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Report Templates</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            pre { background: #f8f8f8; padding: 15px; border-radius: 5px; white-space: pre-wrap; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <pre>${templatesContent}</pre>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const handleScheduleReports = () => {
    console.log('Schedule Reports clicked');
    alert('📅 Report Scheduling\n\nConfigure automated report generation:\n\n• Daily/Weekly/Monthly options\n• Custom scheduling available\n• Email delivery settings\n• Multiple report types\n• Automatic data analysis\n\nContact admin to set up custom schedules!');
  };

  const handleClearSavedReports = () => {
    if (confirm('Are you sure you want to clear all saved reports? This action cannot be undone.')) {
      localStorage.removeItem('fosseReports');
      setSavedReports([]);
      console.log('All saved reports cleared');
      alert('✅ All saved reports have been cleared.');
    }
  };

  const handleTestSaveReport = () => {
    console.log('🧪 Testing manual report save...');
    const testData = {
      title: 'Test Report - Manual Save',
      type: 'test',
      description: 'This is a test report to verify saving functionality',
      datasets: 1,
      anomalies: 0,
      accuracy: '100%',
      icon: '🧪',
      content: 'This is test content for manual save verification'
    };
    
    const result = window.saveFosseReport && window.saveFosseReport(testData);
    console.log('🧪 Test save result:', result);
    
    if (result) {
      alert('✅ Test report saved successfully! Check the Reports section.');
      refreshReports(); // Refresh to show the new report
    } else {
      alert('❌ Test report save failed!');
    }
  };

  return (
    <main className="main-content reports-page" style={{ paddingTop: '220px' }}>
      {/* DEBUG TEST BUTTON */}
      <div style={{ 
        position: 'fixed', 
        top: '250px', 
        right: '20px', 
        zIndex: 9999, 
        background: 'red', 
        padding: '10px',
        border: '2px solid yellow'
      }}>
        <button 
          onClick={() => alert('Reports page button click works!')}
          style={{ padding: '10px', background: 'yellow', border: '2px solid black' }}
        >
          TEST BUTTON
        </button>
      </div>
      
      <div className="container-fluid">
        {/* Header Section */}
        <div className="reports-header">
          <div className="header-content">
            <h1 className="page-title">
              <span className="title-icon">📄</span>
              Reports & Documentation
            </h1>
            <p className="page-subtitle">Generate, manage, and export comprehensive analysis reports</p>
          </div>
          <div className="header-actions">
            <button 
              className="refresh-btn" 
              onClick={refreshReports}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginRight: '10px'
              }}
            >
              <span>🔄</span>
              Refresh Reports
            </button>
            <button 
              className="test-btn" 
              onClick={handleTestSaveReport}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginRight: '10px'
              }}
            >
              <span>🧪</span>
              Test Save
            </button>
            <button 
              className="clear-btn" 
              onClick={handleClearSavedReports}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginRight: '15px'
              }}
            >
              <span>🗑️</span>
              Clear Saved
            </button>
            <div style={{ 
              padding: '5px 10px', 
              background: 'rgba(102, 126, 234, 0.1)', 
              borderRadius: '5px',
              fontSize: '0.9rem',
              color: '#667eea'
            }}>
              {savedReports.length} saved reports
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-card primary" onClick={handleGenerateNewReport}>
            <div className="action-icon">🚀</div>
            <div className="action-content">
              <h3>Generate New Report</h3>
              <p>Create comprehensive analysis report</p>
            </div>
          </button>
          <button className="action-card secondary" onClick={handleViewTemplates}>
            <div className="action-icon">📊</div>
            <div className="action-content">
              <h3>View Templates</h3>
              <p>Browse report templates</p>
            </div>
          </button>
          <button className="action-card tertiary" onClick={handleScheduleReports}>
            <div className="action-icon">📈</div>
            <div className="action-content">
              <h3>Schedule Reports</h3>
              <p>Set up automated reporting</p>
            </div>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="reports-controls">
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="search-icon">🔍</div>
            </div>
          </div>
          
          <div className="type-filter">
            <div className="filter-label">Report Type:</div>
            <div className="filter-buttons">
              {reportTypes.map(type => (
                <button
                  key={type}
                  className={`filter-btn ${filterType === type ? 'active' : ''}`}
                  onClick={() => setFilterType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="reports-grid">
          {filteredReports.map((report, index) => (
            <div key={report.id} className="report-card" style={{ position: 'relative' }}>
              {/* New Report Badge for saved reports */}
              {report.id > 1000 && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  zIndex: 10
                }}>
                  NEW
                </div>
              )}
              
              <div className="report-header">
                <div className="report-icon">{report.icon}</div>
                <div className="report-basic">
                  <h3 className="report-title">{report.title}</h3>
                  <div className="report-meta">
                    <span className="report-date">{report.date}</span>
                    <span className="report-type">{report.type}</span>
                  </div>
                </div>
              </div>
              
              <div className="report-status">
                <div className="status-indicator" style={{ color: getStatusColor(report.status) }}>
                  <span className="status-icon">{getStatusIcon(report.status)}</span>
                  <span className="status-text">{report.status}</span>
                </div>
              </div>
              
              <div className="report-description">
                <p>{report.description}</p>
              </div>
              
              <div className="report-metrics">
                <div className="metrics-grid">
                  <div className="metric-item">
                    <span className="metric-value">{report.datasets}</span>
                    <span className="metric-label">Datasets</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-value">{report.anomalies}</span>
                    <span className="metric-label">Anomalies</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-value">{report.accuracy}</span>
                    <span className="metric-label">Accuracy</span>
                  </div>
                </div>
              </div>
              
              <div className="report-actions" style={{ position: 'relative', zIndex: 1000 }}>
                {/* Inline test button */}
                <button 
                  onClick={() => alert('Inline test works!')}
                  style={{ 
                    padding: '8px', 
                    background: 'orange', 
                    border: '2px solid black',
                    marginRight: '10px',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 1001,
                    pointerEvents: 'auto'
                  }}
                >
                  INLINE TEST
                </button>
                
                <button 
                  className="action-btn primary" 
                  onClick={() => handleViewReport(report)}
                  style={{ 
                    position: 'relative', 
                    zIndex: 1001,
                    pointerEvents: 'auto',
                    cursor: 'pointer'
                  }}
                >
                  <span className="btn-icon">👁️</span>
                  View Report
                </button>
                <button 
                  className="action-btn secondary" 
                  onClick={() => handleDownloadReport(report)}
                  style={{ 
                    position: 'relative', 
                    zIndex: 1001,
                    pointerEvents: 'auto',
                    cursor: 'pointer'
                  }}
                >
                  <span className="btn-icon">⬇️</span>
                  Download PDF
                </button>
                <button 
                  className="action-btn tertiary" 
                  onClick={() => handleExportData(report)}
                  style={{ 
                    position: 'relative', 
                    zIndex: 1001,
                    pointerEvents: 'auto',
                    cursor: 'pointer'
                  }}
                >
                  <span className="btn-icon">📤</span>
                  Export Data
                </button>
              </div>
              
              {/* Temporarily remove glow to test if it's blocking clicks */}
              {/* <div className="report-glow"></div> */}
            </div>
          ))}
        </div>

        {/* Statistics Dashboard */}
        <div className="reports-dashboard">
          <h2 className="dashboard-title">Report Statistics</h2>
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Report Generation</h3>
                <span className="card-icon">📊</span>
              </div>
              <div className="card-content">
                <div className="main-stat">
                  <span className="stat-number">156</span>
                  <span className="stat-label">Total Reports</span>
                </div>
                <div className="sub-stats">
                  <div className="sub-stat">
                    <span className="sub-value">24</span>
                    <span className="sub-label">This Month</span>
                  </div>
                  <div className="sub-stat">
                    <span className="sub-value">+12%</span>
                    <span className="sub-label">Growth</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Processing Time</h3>
                <span className="card-icon">⏱️</span>
              </div>
              <div className="card-content">
                <div className="main-stat">
                  <span className="stat-number">2.3s</span>
                  <span className="stat-label">Average Time</span>
                </div>
                <div className="sub-stats">
                  <div className="sub-stat">
                    <span className="sub-value">1.8s</span>
                    <span className="sub-label">Fastest</span>
                  </div>
                  <div className="sub-stat">
                    <span className="sub-value">4.2s</span>
                    <span className="sub-label">Slowest</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Data Accuracy</h3>
                <span className="card-icon">🎯</span>
              </div>
              <div className="card-content">
                <div className="main-stat">
                  <span className="stat-number">97.2%</span>
                  <span className="stat-label">Overall Accuracy</span>
                </div>
                <div className="sub-stats">
                  <div className="sub-stat">
                    <span className="sub-value">99.1%</span>
                    <span className="sub-label">Best</span>
                  </div>
                  <div className="sub-stat">
                    <span className="sub-value">94.7%</span>
                    <span className="sub-label">Lowest</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Storage Usage</h3>
                <span className="card-icon">💾</span>
              </div>
              <div className="card-content">
                <div className="main-stat">
                  <span className="stat-number">2.4GB</span>
                  <span className="stat-label">Total Storage</span>
                </div>
                <div className="sub-stats">
                  <div className="sub-stat">
                    <span className="sub-value">156MB</span>
                    <span className="sub-label">This Week</span>
                  </div>
                  <div className="sub-stat">
                    <span className="sub-value">89%</span>
                    <span className="sub-label">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  const [dataset, setDataset] = React.useState(null);
  const [toast, setToast] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  // Global function to save reports to localStorage
  React.useEffect(() => {
    // Make saveReport function globally available
    window.saveFosseReport = (reportData) => {
      console.log('🔍 saveFosseReport called with:', reportData);
      try {
        const existingReports = JSON.parse(localStorage.getItem('fosseReports') || '[]');
        console.log('🔍 Existing reports:', existingReports.length);
        
        const newReport = {
          id: Date.now(), // Unique ID based on timestamp
          title: reportData.title || 'Analytics Report',
          type: reportData.type || 'analytics',
          date: new Date().toISOString().split('T')[0], // Today's date
          status: 'completed',
          description: reportData.description || 'Real-time equipment analysis report generated from analytics dashboard',
          datasets: reportData.datasets || 1,
          anomalies: reportData.anomalies || 0,
          accuracy: reportData.accuracy || '95.0%',
          downloadUrl: '#',
          icon: reportData.icon || '📊',
          content: reportData.content || '', // Store the actual report content
          data: reportData.data || null // Store the data if available
        };
        
        existingReports.push(newReport);
        localStorage.setItem('fosseReports', JSON.stringify(existingReports));
        
        console.log('✅ Report saved successfully:', newReport);
        console.log('✅ Total reports in storage:', existingReports.length);
        
        // Verify it was saved
        const verify = JSON.parse(localStorage.getItem('fosseReports') || '[]');
        console.log('✅ Verification - reports in storage:', verify.length);
        
        return newReport;
      } catch (error) {
        console.error('❌ Error saving report:', error);
        return null;
      }
    };
    
    console.log('✅ saveFosseReport function registered globally');
  }, []);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000); // 3 seconds preloader
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Preloader />;

  return (
    <Router>
      <div className="fosse-theme">
        {/* Professional Background Elements */}
        <div className="background-elements">
          <div className="gradient-overlay"></div>
          <ChemBackground />
        </div>

        {/* Animated Ribbons */}
        <div className="ribbon-container">
          <div className="ribbon"></div>
          <div className="ribbon"></div>
          <div className="ribbon"></div>
          <div className="ribbon"></div>
          <div className="ribbon"></div>
          <div className="ribbon"></div>
          <div className="ribbon"></div>
          <div className="ribbon"></div>
        </div>

        {/* Floating Particles */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        {/* Sparkle Effects */}
        <div className="sparkle-container">
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
        </div>

        <Navbar />
        
        {/* Global Search Bar - Below Navbar */}
        <div className="global-search-section">
          <GlobalSearch />
        </div>

        <Routes>
          <Route 
            path="/" 
            element={<HomePage dataset={dataset} setDataset={setDataset} toast={toast} setToast={setToast} />} 
          />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/compounds" element={<CompoundsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>

        {/* Enhanced Chemical Theme Footer */}
        <footer className="enhanced-chemical-footer">
          <div className="footer-background">
            <div className="footer-particles"></div>
            <div className="footer-gradient"></div>
          </div>
          
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-brand">
                <div className="footer-logo">
                  <svg viewBox="0 0 60 60" className="footer-logo-svg">
                    <defs>
                      <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="50%" stopColor="#764ba2" />
                        <stop offset="100%" stopColor="#f093fb" />
                      </linearGradient>
                      <filter id="footerGlow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Benzene Ring */}
                    <polygon points="30,15 40,20 40,30 30,35 20,30 20,20" 
                             fill="none" stroke="url(#footerGrad)" strokeWidth="2" filter="url(#footerGlow)"/>
                    <circle cx="30" cy="25" r="8" fill="none" stroke="url(#footerGrad)" strokeWidth="1" 
                            strokeDasharray="2,2" opacity="0.7" filter="url(#footerGlow)"/>
                    
                    {/* Chemical Bonds */}
                    <line x1="30" y1="35" x2="30" y2="45" stroke="url(#footerGrad)" strokeWidth="2" filter="url(#footerGlow)"/>
                    <circle cx="30" cy="45" r="3" fill="#f093fb" filter="url(#footerGlow)"/>
                  </svg>
                </div>
                <div className="footer-text">
                  <h3 className="footer-title">Chemical Equipment Data Analysis</h3>
                  <p className="footer-subtitle">Advanced Anomaly Detection Platform</p>
                  <div className="footer-description">
                    <p>Harness the power of AI-driven analysis for comprehensive equipment parameter visualization, 
                    statistical modeling, and automated anomaly detection in chemical engineering systems.</p>
                  </div>
                </div>
              </div>

              <div className="footer-features">
                <div className="feature-item">
                  <div className="feature-icon">🤖</div>
                  <h4>AI-Powered Analysis</h4>
                  <p>Machine learning algorithms for intelligent pattern recognition</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📊</div>
                  <h4>Real-time Monitoring</h4>
                  <p>Continuous equipment performance tracking and alerting</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🔮</div>
                  <h4>Predictive Insights</h4>
                  <p>Advanced analytics for equipment failure prediction</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📈</div>
                  <h4>Professional Reports</h4>
                  <p>Comprehensive analysis documentation and reporting</p>
                </div>
              </div>

              <div className="footer-stats">
                <div className="stat-card">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Accuracy</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">&lt;2s</div>
                  <div className="stat-label">Processing</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Monitoring</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">∞</div>
                  <div className="stat-label">Scalability</div>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <div className="footer-copyright">
                <p>&copy; 2026 Chemical Equipment Data Analysis — Engineered for Excellence</p>
                <div className="footer-links">
                  <a href="#" className="footer-link">Privacy Policy</a>
                  <a href="#" className="footer-link">Terms of Service</a>
                  <a href="#" className="footer-link">Documentation</a>
                  <a href="#" className="footer-link">Support</a>
                </div>
              </div>
              <div className="footer-tech">
                <div className="tech-stack">
                  <span className="tech-label">Built with:</span>
                  <span className="tech-item">React</span>
                  <span className="tech-item">Django</span>
                  <span className="tech-item">Python</span>
                  <span className="tech-item">AI/ML</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <Toast message={toast} onClose={() => setToast('')} />
      </div>
    </Router>
  );
}
