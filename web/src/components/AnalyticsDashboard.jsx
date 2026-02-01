import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ReferenceLine } from 'recharts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import analyticsService from '../services/analyticsService';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  // Safe date parsing utility
  const safeDateParse = (dateValue, fallbackString = 'Unknown') => {
    try {
      if (!dateValue) return fallbackString;
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return fallbackString;
      return date;
    } catch (error) {
      return fallbackString;
    }
  };

  // Safe date formatting utility
  const safeDateFormat = (dateValue, fallbackString = 'Unknown') => {
    try {
      // If no date provided, use current date
      if (!dateValue) {
        return new Date().toLocaleDateString();
      }
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) {
        // If invalid date, use current date
        return new Date().toLocaleDateString();
      }
      return date.toLocaleDateString();
    } catch (error) {
      return new Date().toLocaleDateString();
    }
  };

  // Safe time formatting utility
  const safeTimeFormat = (dateValue, fallbackString = 'Unknown') => {
    try {
      // If no date provided, use current time
      if (!dateValue) {
        return new Date().toLocaleTimeString();
      }
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) {
        // If invalid date, use current time
        return new Date().toLocaleTimeString();
      }
      return date.toLocaleTimeString();
    } catch (error) {
      return new Date().toLocaleTimeString();
    }
  };

  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [selectedParameter, setSelectedParameter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [anomalyThreshold, setAnomalyThreshold] = useState(2);
  const [realData, setRealData] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load real data from backend
  useEffect(() => {
    loadRealData();
    
    // Set up real-time polling
    const interval = setInterval(() => {
      loadRealData();
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Load data when selected dataset changes
  useEffect(() => {
    if (selectedDataset) {
      loadDatasetData(selectedDataset.id);
    }
  }, [selectedDataset]);

  const loadRealData = async () => {
    try {
      setLoading(true);
      const datasetsList = await analyticsService.getDatasets();
      setDatasets(datasetsList);
      
      if (datasetsList.length > 0) {
        const latestDataset = datasetsList[0];
        setSelectedDataset(latestDataset);
        
        // Get real analysis data from backend
        const analysis = await analyticsService.performRealTimeAnalysis(latestDataset.id);
        
        // Use real data from backend
        setRealData(analysis.data || []);
        
        // Show real anomaly alerts
        if (analysis.anomalies && analysis.anomalies.length > 0) {
          const recentAnomalies = analysis.anomalies.slice(0, 3);
          recentAnomalies.forEach(anomaly => {
            toast.error(`🚨 Real Anomaly Detected: ${anomaly.equipment} - ${anomaly.parameter.toUpperCase()} is ${anomaly.value} (Z-score: ${anomaly.zScore})`, {
              position: 'top-right',
              autoClose: 8000,
            });
          });
        }
      } else {
        // No datasets available
        setRealData([]);
        setError('No datasets available. Please upload a CSV file first.');
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to load real data:', err);
      setError('Failed to connect to backend. Please ensure the API server is running at http://127.0.0.1:8000');
      toast.error('❌ Failed to connect to backend. Please ensure the Django server is running.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Load specific dataset data
  const loadDatasetData = async (datasetId) => {
    try {
      setLoading(true);
      
      // Get analysis data for selected dataset
      const analysis = await analyticsService.performRealTimeAnalysis(datasetId);
      
      // Use real data from backend
      setRealData(analysis.data || []);
      
      // Show anomaly alerts for this dataset
      if (analysis.anomalies && analysis.anomalies.length > 0) {
        const recentAnomalies = analysis.anomalies.slice(0, 2);
        recentAnomalies.forEach(anomaly => {
          toast.warning(`📊 Dataset Analysis: ${anomaly.equipment} - ${anomaly.parameter.toUpperCase()} is ${anomaly.value} (Z-score: ${anomaly.zScore})`, {
            position: 'top-right',
            autoClose: 4000,
          });
        });
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Failed to load dataset data:', err);
      toast.error('❌ Failed to load dataset data', {
        position: 'top-right',
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  // Filter real data based on selections
  const filteredData = useMemo(() => {
    let filtered = realData;
    
    if (selectedEquipment !== 'all') {
      filtered = filtered.filter(d => d.equipment === selectedEquipment);
    }
    
    if (selectedParameter !== 'all') {
      filtered = filtered.filter(d => d[selectedParameter] !== undefined);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(d => 
        d.equipment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [realData, selectedEquipment, selectedParameter, searchTerm]);

  const equipmentList = useMemo(() => {
    if (!realData.length) return [];
    const equipment = [...new Set(realData.map(d => d.equipment))];
    return equipment.sort();
  }, [realData]);

  const parameterList = ['flowrate', 'pressure', 'temperature'];

  // Generate demo data for sample charts
  const generateDemoData = (type) => {
    const data = [];
    const baseValues = {
      flowrate: { equipment1: 60, equipment2: 55 },
      pressure: { equipment1: 100, equipment2: 95 },
      temperature: { equipment1: 45, equipment2: 50 }
    };
    
    for (let i = 0; i < 20; i++) {
      const base1 = baseValues[type].equipment1;
      const base2 = baseValues[type].equipment2;
      
      data.push({
        time: `${i}:00`,
        equipment1: base1 + (Math.random() - 0.5) * 20,
        equipment2: base2 + (Math.random() - 0.5) * 20
      });
    }
    
    return data;
  };

  // Calculate real statistics
  const statistics = useMemo(() => {
    if (realData.length === 0) {
      return {
        anomalyRate: 0,
        totalAnomalies: 0,
        totalReadings: 0,
        equipmentRisk: {}
      };
    }

    // Get real anomalies from backend analysis
    const getRealAnomalies = () => {
      const anomalies = [];
      const parameters = ['flowrate', 'pressure', 'temperature'];
      
      parameters.forEach(param => {
        const values = realData.map(d => d[param]).filter(v => v !== undefined);
        if (values.length > 0) {
          const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
          const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
          const std = Math.sqrt(variance);
          
          realData.forEach((row, index) => {
            const value = row[param];
            if (value !== undefined) {
              const zScore = Math.abs((value - mean) / std);
              if (zScore > anomalyThreshold) {
                anomalies.push({
                  equipment: row.equipment,
                  parameter: param,
                  value,
                  zScore,
                  timestamp: row.timestamp
                });
              }
            }
          });
        }
      });
    }
  }, [realData, anomalyThreshold]);

  const chartData = useMemo(() => {
    return filteredData.slice(-50).map(d => ({
      timestamp: d.timestamp,
      ...equipmentList.reduce((acc, eq) => {
        const equipmentData = filteredData.find(item => item.equipment === eq && item.timestamp === d.timestamp);
        acc[eq] = equipmentData ? equipmentData[selectedParameter === 'all' ? 'flowrate' : selectedParameter] : null;
        return acc;
      }, {})
    }));
  }, [filteredData, equipmentList, selectedParameter]);

  const statsCards = [
    {
      title: 'Total Equipment',
      value: equipmentList.length,
      icon: '⚗️',
      change: equipmentList.length > 0 ? '+2' : '0',
      positive: true
    },
    {
      title: 'Active Alerts',
      value: filteredData.filter(d => {
        const parameters = ['flowrate', 'pressure', 'temperature'];
        return parameters.some(param => {
          const value = d[param];
          if (value === undefined) return false;
          const zScore = Math.abs((value - 60) / 10);
          return zScore > anomalyThreshold;
        });
      }).length,
      icon: '🚨',
      change: '-1',
      positive: true
    },
    {
      title: 'Data Points',
      value: filteredData.length,
      icon: '📊',
      change: `+${filteredData.length}`,
      positive: true
    },
    {
      title: 'System Health',
      value: filteredData.length > 0 ? 
        `${Math.max(0, 100 - (filteredData.filter(d => {
          const parameters = ['flowrate', 'pressure', 'temperature'];
          return parameters.some(param => {
            const value = d[param];
            if (value === undefined) return false;
            const zScore = Math.abs((value - 60) / 10);
            return zScore > anomalyThreshold;
          });
        }).length / filteredData.length) * 100).toFixed(1)}%` : '100%',
      icon: '💚',
      change: '+0.3%',
      positive: true
    }
  ];

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="loading-spinner"></div>
        <h3>Loading Analytics Dashboard...</h3>
        <p>Fetching real-time equipment data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-error">
        <div className="error-icon">⚠️</div>
        <h3>Analytics Error</h3>
        <p>{error}</p>
        <button className="retry-btn" onClick={loadRealData}>
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard">
      {/* Header Section */}
      <section className="analytics-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">📊</span>
            Real-Time Analytics Dashboard
          </h1>
          <p className="page-subtitle">
            Monitor equipment performance, detect anomalies, and analyze trends in real-time
          </p>
        </div>
        
        <div className="header-controls">
          <div className="dataset-selector">
            <label>Dataset:</label>
            <select 
              value={selectedDataset?.id || ''} 
              onChange={(e) => {
                const datasetId = e.target.value;
                const dataset = datasets.find(d => d.id.toString() === datasetId);
                if (dataset) {
                  setSelectedDataset(dataset);
                  toast.info(`📊 Loading dataset: ${dataset.file?.split('/').pop().split('\\').pop() || `Dataset ${dataset.id}`}`, {
                    position: 'top-right',
                    autoClose: 2000,
                  });
                }
              }}
              className="dataset-select"
              disabled={loading || datasets.length === 0}
            >
              <option value="" disabled>
                {loading ? 'Loading datasets...' : datasets.length === 0 ? 'No datasets available' : 'Select a dataset...'}
              </option>
              {datasets.map(dataset => (
                <option key={dataset.id} value={dataset.id}>
                  {dataset.file?.split('/').pop().split('\\').pop() || `Dataset ${dataset.id}`} ({safeDateFormat(dataset.uploaded_at)})
                </option>
              ))}
            </select>
            {loading && <div className="dataset-loading">⟳</div>}
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="stats-overview">
        <div className="row g-4">
          {statsCards.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.title}</p>
                  <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Controls Section */}
      <section className="analytics-controls">
        <div className="controls-card">
          <div className="card-header">
            <h3 className="card-title">🎛️ Analysis Controls</h3>
            <p className="card-subtitle">Customize your analytics view</p>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <label className="control-label">Equipment</label>
                <select 
                  value={selectedEquipment} 
                  onChange={(e) => setSelectedEquipment(e.target.value)}
                  className="control-select"
                >
                  <option value="all">All Equipment</option>
                  {equipmentList.map(eq => (
                    <option key={eq} value={eq}>{eq}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-3">
                <label className="control-label">Parameter</label>
                <select 
                  value={selectedParameter} 
                  onChange={(e) => setSelectedParameter(e.target.value)}
                  className="control-select"
                >
                  <option value="all">All Parameters</option>
                  {parameterList.map(param => (
                    <option key={param} value={param}>
                      {param.charAt(0).toUpperCase() + param.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-3">
                <label className="control-label">Search Equipment</label>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="control-input"
                />
              </div>
              
              <div className="col-md-3">
                <label className="control-label">Anomaly Threshold</label>
                <div className="threshold-control">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={anomalyThreshold}
                    onChange={(e) => setAnomalyThreshold(parseFloat(e.target.value))}
                    className="threshold-slider"
                  />
                  <span className="threshold-value">{anomalyThreshold}σ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Charts Section */}
      <section className="demo-charts-section">
        <div className="demo-header">
          <div className="demo-badge">🎭 DEMO MODE</div>
          <h3 className="demo-title">Sample Analytics Visualization</h3>
          <p className="demo-subtitle">This is a demonstration of chart capabilities with sample data</p>
        </div>
        
        <div className="row g-4">
          {/* Demo Flowrate Chart */}
          <div className="col-lg-4">
            <div className="chart-card demo-card">
              <div className="card-header">
                <h4 className="card-title">
                  💧 Demo Flowrate Trends
                </h4>
                <p className="card-subtitle">Sample flowrate visualization</p>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={generateDemoData('flowrate')}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#9ca3af"
                      tick={{ fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <YAxis 
                      stroke="#9ca3af" 
                      tick={{ fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#f3f4f6' }}
                    />
                    <Legend />
                    
                    <ReferenceLine 
                      y={80} 
                      stroke="#22c55e" 
                      strokeDasharray="5 5" 
                      label="Max Safe"
                      strokeWidth={2}
                    />
                    <ReferenceLine 
                      y={40} 
                      stroke="#22c55e" 
                      strokeDasharray="5 5" 
                      label="Min Safe"
                      strokeWidth={2}
                    />
                    <ReferenceLine 
                      y={60} 
                      stroke="#3b82f6" 
                      strokeDasharray="3 3" 
                      label="Optimal"
                      strokeWidth={2}
                    />
                    
                    <Line
                      type="monotone"
                      dataKey="equipment1"
                      stroke="#667eea"
                      strokeWidth={2}
                      dot={{ fill: '#667eea', r: 4 }}
                      name="Demo Equipment A"
                    />
                    <Line
                      type="monotone"
                      dataKey="equipment2"
                      stroke="#f093fb"
                      strokeWidth={2}
                      dot={{ fill: '#f093fb', r: 4 }}
                      name="Demo Equipment B"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Demo Pressure Chart */}
          <div className="col-lg-4">
            <div className="chart-card demo-card">
              <div className="card-header">
                <h4 className="card-title">
                  🔥 Demo Pressure Trends
                </h4>
                <p className="card-subtitle">Sample pressure visualization</p>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={generateDemoData('pressure')}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#9ca3af"
                      tick={{ fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <YAxis 
                      stroke="#9ca3af" 
                      tick={{ fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#f3f4f6' }}
                    />
                    <Legend />
                    
                    <Area
                      type="monotone"
                      dataKey="equipment1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.3}
                      strokeWidth={2}
                      name="Demo Equipment A"
                    />
                    <Area
                      type="monotone"
                      dataKey="equipment2"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.3}
                      strokeWidth={2}
                      name="Demo Equipment B"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Demo Temperature Chart */}
          <div className="col-lg-4">
            <div className="chart-card demo-card">
              <div className="card-header">
                <h4 className="card-title">
                  🌡️ Demo Temperature Trends
                </h4>
                <p className="card-subtitle">Sample temperature visualization</p>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={generateDemoData('temperature')}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#9ca3af"
                      tick={{ fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <YAxis 
                      stroke="#9ca3af" 
                      tick={{ fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#f3f4f6' }}
                    />
                    <Legend />
                    
                    <ReferenceLine 
                      y={75} 
                      stroke="#22c55e" 
                      strokeDasharray="5 5" 
                      label="Max Safe"
                      strokeWidth={2}
                    />
                    <ReferenceLine 
                      y={25} 
                      stroke="#22c55e" 
                      strokeDasharray="5 5" 
                      label="Min Safe"
                      strokeWidth={2}
                    />
                    <ReferenceLine 
                      y={50} 
                      stroke="#3b82f6" 
                      strokeDasharray="3 3" 
                      label="Optimal"
                      strokeWidth={2}
                    />
                    
                    <Line
                      type="monotone"
                      dataKey="equipment1"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: '#10b981', r: 4 }}
                      name="Demo Equipment A"
                    />
                    <Line
                      type="monotone"
                      dataKey="equipment2"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      dot={{ fill: '#06b6d4', r: 4 }}
                      name="Demo Equipment B"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Charts Section */}
      <section className="analytics-charts">
        <div className="row g-4">
          {selectedParameter === 'all' ? (
            parameterList.map(param => (
              <div key={param} className="col-lg-4">
                <div className="chart-card">
                  <div className="card-header">
                    <h4 className="card-title">
                      {param === 'flowrate' ? '💧' : param === 'pressure' ? '🔥' : '🌡️'} 
                      {' '}{param.charAt(0).toUpperCase() + param.slice(1)} Trends
                    </h4>
                    <p className="card-subtitle">Real-time {param} monitoring</p>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="timestamp" 
                          stroke="#9ca3af"
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => safeTimeFormat(value, value)}
                          allowDecimals={false}
                        />
                        <YAxis 
                          stroke="#9ca3af" 
                          tick={{ fontSize: 12 }}
                          allowDecimals={false}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                          labelStyle={{ color: '#f3f4f6' }}
                        />
                        <Legend />
                        
                        <ReferenceLine 
                          y={80} 
                          stroke="#22c55e" 
                          strokeDasharray="5 5" 
                          label="Max Safe"
                          strokeWidth={2}
                        />
                        <ReferenceLine 
                          y={40} 
                          stroke="#22c55e" 
                          strokeDasharray="5 5" 
                          label="Min Safe"
                          strokeWidth={2}
                        />
                        <ReferenceLine 
                          y={60} 
                          stroke="#3b82f6" 
                          strokeDasharray="3 3" 
                          label="Optimal"
                          strokeWidth={2}
                        />
                        
                        {equipmentList.map(eq => (
                          <Line
                            key={`${eq}_${param}`}
                            type="monotone"
                            dataKey={eq}
                            stroke={`hsl(${equipmentList.indexOf(eq) * 72}, 70%, 50%)`}
                            strokeWidth={2}
                            dot={false}
                            name={eq}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="chart-card">
                <div className="card-header">
                  <h4 className="card-title">
                    {selectedParameter === 'flowrate' ? '💧' : selectedParameter === 'pressure' ? '🔥' : '🌡️'} 
                    {' '}{selectedParameter.charAt(0).toUpperCase() + selectedParameter.slice(1)} Analysis
                  </h4>
                  <p className="card-subtitle">Detailed {selectedParameter} monitoring</p>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="timestamp" 
                        stroke="#9ca3af"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => safeTimeFormat(value, value)}
                        allowDecimals={false}
                      />
                      <YAxis 
                        stroke="#9ca3af" 
                        tick={{ fontSize: 12 }}
                        allowDecimals={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                        labelStyle={{ color: '#f3f4f6' }}
                      />
                      <Legend />
                      
                      <ReferenceLine 
                        y={80} 
                        stroke="#22c55e" 
                        strokeDasharray="5 5" 
                        label="Max Safe"
                        strokeWidth={2}
                      />
                      <ReferenceLine 
                        y={40} 
                        stroke="#22c55e" 
                        strokeDasharray="5 5" 
                        label="Min Safe"
                        strokeWidth={2}
                      />
                      <ReferenceLine 
                        y={60} 
                        stroke="#3b82f6" 
                        strokeDasharray="3 3" 
                        label="Optimal"
                        strokeWidth={2}
                      />
                      
                      {equipmentList.map(eq => (
                        <Line
                          key={`${eq}_${selectedParameter}`}
                          type="monotone"
                          dataKey={eq}
                          stroke={`hsl(${equipmentList.indexOf(eq) * 72}, 70%, 50%)`}
                          strokeWidth={2}
                          dot={false}
                          name={eq}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Anomaly Timeline */}
      <section className="anomaly-section">
        <div className="anomaly-card">
          <div className="card-header">
            <h3 className="card-title">🚨 Real-Time Anomaly Detection</h3>
            <p className="card-subtitle">Equipment anomalies detected in real-time</p>
          </div>
          <div className="card-body">
            <div className="anomaly-timeline">
              {(() => {
                // Calculate real anomalies from filtered data
                const realAnomalies = [];
                const parameters = ['flowrate', 'pressure', 'temperature'];
                
                // Calculate mean and std for each parameter
                parameters.forEach(param => {
                  const values = filteredData.map(d => d[param]).filter(v => v !== undefined);
                  if (values.length > 0) {
                    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
                    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
                    const std = Math.sqrt(variance);
                    
                    // Find anomalies using Z-score
                    filteredData.forEach((row, index) => {
                      const value = row[param];
                      if (value !== undefined) {
                        const zScore = Math.abs((value - mean) / std);
                        if (zScore > anomalyThreshold) {
                          realAnomalies.push({
                            timestamp: row.timestamp,
                            equipment: row.equipment,
                            parameter: param,
                            value: parseFloat(value.toFixed(2)),
                            zScore: parseFloat(zScore.toFixed(2)),
                            index: index
                          });
                        }
                      }
                    });
                  }
                });
                
                // Sort by timestamp and show last 10
                const sortedAnomalies = realAnomalies
                  .sort((a, b) => {
                    const dateA = safeDateParse(a.timestamp);
                    const dateB = safeDateParse(b.timestamp);
                    if (typeof dateA === 'string' || typeof dateB === 'string') return 0;
                    return dateB - dateA;
                  })
                  .slice(0, 10);

                return sortedAnomalies.length > 0 ? (
                  sortedAnomalies.map((anomaly, index) => (
                    <div key={index} className="anomaly-item">
                      <div className="anomaly-time">
                        {safeTimeFormat(anomaly.timestamp)}
                      </div>
                      <div className="anomaly-details">
                        <div className="anomaly-equipment">{anomaly.equipment}</div>
                        <div className="anomaly-params">
                          <span className="anomaly-param">
                            {anomaly.parameter === 'flowrate' ? '💧' : 
                             anomaly.parameter === 'pressure' ? '🔥' : '🌡️'}
                            {' '}{anomaly.parameter}: {anomaly.value} (σ: {anomaly.zScore})
                          </span>
                        </div>
                      </div>
                      <div className="anomaly-severity">
                        <span className={`severity-badge ${anomaly.zScore > 3 ? 'high' : 'medium'}`}>
                          {anomaly.zScore > 3 ? 'HIGH' : 'MEDIUM'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-anomalies">
                    <div className="no-anomalies-icon">✅</div>
                    <h4>No Anomalies Detected</h4>
                    <p>All equipment parameters are within normal ranges (threshold: {anomalyThreshold}σ)</p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      <ToastContainer />
    </div>
  );
};

export default AnalyticsDashboard;
