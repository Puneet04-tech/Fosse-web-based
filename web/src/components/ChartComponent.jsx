import React from 'react';
import { Bar, Pie, Line, Radar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, RadialLinearScale, Tooltip, Legend, Filler } from 'chart.js';
import { motion } from 'framer-motion';
import './ChartComponent.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, RadialLinearScale, Tooltip, Legend, Filler);

const ChartComponent = React.memo(({ summary }) => {
  if (!summary) {
    return (
      <motion.div 
        className="chart-container-enhanced"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="chart-header">
          <h2 className="chart-title">
            <span className="chart-icon">📊</span>
            Advanced Data Visualizations
          </h2>
          <p className="chart-subtitle">Interactive Chemical Equipment Analytics</p>
        </div>
        
        <div className="charts-grid">
          <motion.div 
            className="chart-card loading-chart"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="chart-card-header">
              <h3>Equipment Distribution</h3>
              <div className="chart-badge">Loading...</div>
            </div>
            <div className="chart-loading">
              <div className="loading-spinner"></div>
              <p>Analyzing equipment patterns...</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="chart-card loading-chart"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="chart-card-header">
              <h3>Type Analysis</h3>
              <div className="chart-badge">Loading...</div>
            </div>
            <div className="chart-loading">
              <div className="loading-spinner"></div>
              <p>Processing distribution data...</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="chart-card loading-chart"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="chart-card-header">
              <h3>Performance Metrics</h3>
              <div className="chart-badge">Loading...</div>
            </div>
            <div className="chart-loading">
              <div className="loading-spinner"></div>
              <p>Calculating averages...</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const typeDist = summary.type_distribution || {};
  const averages = summary.averages || {};

  // Enhanced color palette matching the theme
  const themeColors = {
    primary: ['#667eea', '#764ba2', '#f093fb', '#a78bfa', '#c084fc', '#e879f9', '#f0abfc', '#f9a8d4'],
    secondary: ['#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#172554', '#0f172a'],
    accent: ['#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#022c22', '#14532d'],
    gradient: ['#667eea', '#764ba2', '#f093fb', '#f093fb', '#764ba2', '#667eea']
  };

  // Enhanced Bar Chart with gradient
  const barData = {
    labels: Object.keys(typeDist),
    datasets: [{
      label: 'Equipment Count',
      data: Object.values(typeDist),
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(102, 126, 234, 0.8)');
        gradient.addColorStop(0.5, 'rgba(118, 75, 162, 0.8)');
        gradient.addColorStop(1, 'rgba(240, 147, 251, 0.8)');
        return gradient;
      },
      borderColor: 'rgba(102, 126, 234, 1)',
      borderWidth: 2,
      borderRadius: 12,
      borderSkipped: false,
      hoverBackgroundColor: 'rgba(102, 126, 234, 0.9)',
      hoverBorderColor: 'rgba(240, 147, 251, 1)',
      hoverBorderWidth: 3,
    }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: false 
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(102, 126, 234, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Count: ${context.parsed.y} units`;
          }
        }
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        ticks: { 
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 12, weight: '500' }
        },
        grid: { 
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        border: {
          display: false
        }
      },
      x: { 
        ticks: { 
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 12, weight: '500' }
        },
        grid: { 
          display: false 
        },
        border: {
          display: false
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };

  // Enhanced Doughnut Chart with multiple layers
  const doughnutData = {
    labels: Object.keys(typeDist),
    datasets: [
      {
        data: Object.values(typeDist),
        backgroundColor: themeColors.primary.slice(0, Object.keys(typeDist).length),
        borderColor: 'rgba(15, 23, 42, 0.8)',
        borderWidth: 3,
        hoverBackgroundColor: themeColors.primary.slice(0, Object.keys(typeDist).length).map(color => color + 'dd'),
        hoverBorderColor: 'rgba(240, 147, 251, 1)',
        hoverBorderWidth: 4,
      },
      {
        data: Object.values(typeDist).map(v => v * 0.3),
        backgroundColor: themeColors.primary.slice(0, Object.keys(typeDist).length).map(color => color + '40'),
        borderColor: 'rgba(15, 23, 42, 0.6)',
        borderWidth: 2,
        hoverBackgroundColor: themeColors.primary.slice(0, Object.keys(typeDist).length).map(color => color + '60'),
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'bottom',
        labels: { 
          color: 'rgba(255, 255, 255, 0.9)',
          padding: 15,
          font: { size: 12, weight: '500' },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(102, 126, 234, 0.5)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };

  // Enhanced Radar Chart for averages
  const validAverages = Object.entries(averages).filter(([_, value]) => value !== null);
  const radarData = {
    labels: validAverages.map(([key, _]) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())),
    datasets: [{
      label: 'Performance Metrics',
      data: validAverages.map(([_, value]) => value),
      backgroundColor: 'rgba(102, 126, 234, 0.2)',
      borderColor: 'rgba(102, 126, 234, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(240, 147, 251, 1)',
      pointBorderColor: 'rgba(15, 23, 42, 1)',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      hoverBackgroundColor: 'rgba(240, 147, 251, 0.3)',
      hoverBorderColor: 'rgba(240, 147, 251, 1)',
    }]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: false 
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(102, 126, 234, 0.5)',
        borderWidth: 1,
        padding: 12,
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: { 
          color: 'rgba(255, 255, 255, 0.7)',
          backdropColor: 'transparent',
          font: { size: 10 }
        },
        grid: { 
          color: 'rgba(255, 255, 255, 0.1)' 
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: { size: 11, weight: '500' }
        },
        border: {
          display: false
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };

  // Enhanced Line Chart for trends
  const lineData = {
    labels: Object.keys(typeDist),
    datasets: [{
      label: 'Equipment Trend',
      data: Object.values(typeDist),
      borderColor: 'rgba(102, 126, 234, 1)',
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
        gradient.addColorStop(1, 'rgba(102, 126, 234, 0.01)');
        return gradient;
      },
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgba(240, 147, 251, 1)',
      pointBorderColor: 'rgba(15, 23, 42, 1)',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      hoverBackgroundColor: 'rgba(240, 147, 251, 1)',
      hoverBorderColor: 'rgba(240, 147, 251, 1)',
    }]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: false 
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(102, 126, 234, 0.5)',
        borderWidth: 1,
        padding: 12,
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        ticks: { 
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 12, weight: '500' }
        },
        grid: { 
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        border: {
          display: false
        }
      },
      x: { 
        ticks: { 
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 12, weight: '500' }
        },
        grid: { 
          display: false 
        },
        border: {
          display: false
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <motion.div 
      className="chart-container-enhanced"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="chart-header">
        <h2 className="chart-title">
          <span className="chart-icon">📊</span>
          Advanced Data Visualizations
        </h2>
        <p className="chart-subtitle">Interactive Chemical Equipment Analytics</p>
      </div>
      
      <div className="charts-grid">
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)' }}
        >
          <div className="chart-card-header">
            <h3>Equipment Distribution</h3>
            <div className="chart-badge gradient-badge">Bar Chart</div>
          </div>
          <div className="chart-wrapper">
            <Bar data={barData} options={barOptions} />
          </div>
          <div className="chart-footer">
            <div className="chart-stats">
              <span className="stat-item">
                <span className="stat-label">Total Types:</span>
                <span className="stat-value">{Object.keys(typeDist).length}</span>
              </span>
              <span className="stat-item">
                <span className="stat-label">Total Units:</span>
                <span className="stat-value">{Object.values(typeDist).reduce((a, b) => a + b, 0)}</span>
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(240, 147, 251, 0.3)' }}
        >
          <div className="chart-card-header">
            <h3>Type Analysis</h3>
            <div className="chart-badge gradient-badge">Doughnut Chart</div>
          </div>
          <div className="chart-wrapper">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
          <div className="chart-footer">
            <div className="chart-stats">
              <span className="stat-item">
                <span className="stat-label">Categories:</span>
                <span className="stat-value">{Object.keys(typeDist).length}</span>
              </span>
              <span className="stat-item">
                <span className="stat-label">Distribution:</span>
                <span className="stat-value">Multi-layer</span>
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(118, 75, 162, 0.3)' }}
        >
          <div className="chart-card-header">
            <h3>Performance Metrics</h3>
            <div className="chart-badge gradient-badge">Radar Chart</div>
          </div>
          <div className="chart-wrapper">
            <Radar data={radarData} options={radarOptions} />
          </div>
          <div className="chart-footer">
            <div className="chart-stats">
              <span className="stat-item">
                <span className="stat-label">Parameters:</span>
                <span className="stat-value">{validAverages.length}</span>
              </span>
              <span className="stat-item">
                <span className="stat-label">Analysis:</span>
                <span className="stat-value">Multi-axis</span>
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="chart-card full-width"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(96, 165, 250, 0.3)' }}
        >
          <div className="chart-card-header">
            <h3>Trend Analysis</h3>
            <div className="chart-badge gradient-badge">Line Chart</div>
          </div>
          <div className="chart-wrapper">
            <Line data={lineData} options={lineOptions} />
          </div>
          <div className="chart-footer">
            <div className="chart-stats">
              <span className="stat-item">
                <span className="stat-label">Data Points:</span>
                <span className="stat-value">{Object.keys(typeDist).length}</span>
              </span>
              <span className="stat-item">
                <span className="stat-label">Trend:</span>
                <span className="stat-value">Smooth Curve</span>
              </span>
              <span className="stat-item">
                <span className="stat-label">Fill:</span>
                <span className="stat-value">Gradient</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default ChartComponent;
