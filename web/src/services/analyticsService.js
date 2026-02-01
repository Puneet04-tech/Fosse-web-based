import axios from 'axios';

const API_BASE_URL = 'https://fosse-equipment-monitor.onrender.com/api';

class AnalyticsService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        throw error;
      }
    );
  }

  // Get all datasets
  async getDatasets() {
    try {
      const response = await this.client.get('/datasets/');
      return response.data;
    } catch (error) {
      console.error('Error fetching datasets:', error);
      throw error;
    }
  }

  // Get specific dataset
  async getDataset(id) {
    try {
      const response = await this.client.get(`/datasets/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dataset:', error);
      throw error;
    }
  }

  // Get dataset data for analysis
  async getDatasetData(id) {
    try {
      const response = await this.client.get(`/datasets/${id}/data/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dataset data:', error);
      throw error;
    }
  }

  // Upload new dataset
  async uploadDataset(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await this.client.post('/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading dataset:', error);
      throw error;
    }
  }

  // Perform real-time analysis on dataset
  async performRealTimeAnalysis(datasetId) {
    try {
      const data = await this.getDatasetData(datasetId);
      const dataset = await this.getDataset(datasetId);
      
      // Process real data from backend
      return this.processRealData(data.rows, dataset.summary);
    } catch (error) {
      console.error('Error performing real-time analysis:', error);
      throw error;
    }
  }

  // Process real data for analytics
  processRealData(rows, summary) {
    if (!rows || rows.length === 0) {
      return {
        equipment: [],
        parameters: [],
        data: [],
        statistics: {},
        anomalies: [],
        trends: {}
      };
    }

    // Extract equipment types and parameters from real data
    const equipmentTypes = [...new Set(rows.map(row => row.Type || 'Unknown'))];
    const parameters = ['Flowrate', 'Pressure', 'Temperature'].filter(param => 
      rows.some(row => row[param] !== undefined && row[param] !== null)
    );

    // Process data for real-time monitoring
    const processedData = rows.map((row, index) => {
      const timestamp = new Date(Date.now() - (rows.length - index) * 60000);
      const processedRow = {
        timestamp: timestamp.toISOString(),
        equipment: row.Type || 'Unknown',
        index: index
      };

      // Add parameters with real values
      parameters.forEach(param => {
        const value = parseFloat(row[param]);
        if (!isNaN(value)) {
          processedRow[param.toLowerCase()] = value;
        }
      });

      return processedRow;
    });

    // Calculate real statistics
    const statistics = this.calculateRealStatistics(processedData, parameters);
    
    // Detect real anomalies
    const anomalies = this.detectRealAnomalies(processedData, parameters, summary);
    
    // Analyze real trends
    const trends = this.analyzeRealTrends(processedData, parameters);

    return {
      equipment: equipmentTypes,
      parameters: parameters,
      data: processedData,
      statistics,
      anomalies,
      trends,
      summary
    };
  }

  // Calculate real statistics from data
  calculateRealStatistics(data, parameters) {
    const stats = {};
    
    parameters.forEach(param => {
      const values = data.map(d => d[param.toLowerCase()]).filter(v => v !== undefined);
      if (values.length > 0) {
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        const std = Math.sqrt(variance);
        const min = Math.min(...values);
        const max = Math.max(...values);
        
        stats[param.toLowerCase()] = {
          mean: parseFloat(mean.toFixed(2)),
          std: parseFloat(std.toFixed(2)),
          min: parseFloat(min.toFixed(2)),
          max: parseFloat(max.toFixed(2)),
          count: values.length
        };
      }
    });

    return stats;
  }

  // Detect real anomalies in data
  detectRealAnomalies(data, parameters, summary) {
    const anomalies = [];
    const threshold = 2; // 2 standard deviations
    
    parameters.forEach(param => {
      const values = data.map(d => d[param.toLowerCase()]).filter(v => v !== undefined);
      if (values.length > 0) {
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        const std = Math.sqrt(variance);
        
        data.forEach((row, index) => {
          const value = row[param.toLowerCase()];
          if (value !== undefined) {
            const zScore = Math.abs((value - mean) / std);
            if (zScore > threshold) {
              anomalies.push({
                timestamp: row.timestamp,
                equipment: row.equipment,
                parameter: param.toLowerCase(),
                value: parseFloat(value.toFixed(2)),
                zScore: parseFloat(zScore.toFixed(2)),
                severity: zScore > 3 ? 'high' : 'medium',
                index: index
              });
            }
          }
        });
      }
    });

    return anomalies.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  // Analyze real trends in data
  analyzeRealTrends(data, parameters) {
    const trends = {};
    
    parameters.forEach(param => {
      const values = data.map(d => d[param.toLowerCase()]).filter(v => v !== undefined);
      if (values.length > 10) {
        const firstHalf = values.slice(0, Math.floor(values.length / 2));
        const secondHalf = values.slice(Math.floor(values.length / 2));
        
        const firstMean = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
        const secondMean = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
        
        const change = ((secondMean - firstMean) / firstMean) * 100;
        
        // Calculate trend direction
        let direction = 'stable';
        if (change > 5) direction = 'increasing';
        else if (change < -5) direction = 'decreasing';
        
        // Calculate volatility
        const variance = values.reduce((sum, val) => sum + Math.pow(val - (values.reduce((s, v) => s + v, 0) / values.length), 2), 0) / values.length;
        const volatility = Math.sqrt(variance);
        
        trends[param.toLowerCase()] = {
          direction,
          change: parseFloat(change.toFixed(2)),
          volatility: parseFloat(volatility.toFixed(2)),
          firstMean: parseFloat(firstMean.toFixed(2)),
          secondMean: parseFloat(secondMean.toFixed(2)),
          isStable: Math.abs(change) < 5,
          isVolatile: volatility > (values.reduce((s, v) => s + v, 0) / values.length) * 0.1
        };
      }
    });

    return trends;
  }

  // Get real-time equipment status
  async getEquipmentStatus() {
    try {
      const datasets = await this.getDatasets();
      if (datasets.length === 0) {
        return { equipment: [], status: 'no_data' };
      }

      const latestDataset = datasets[0];
      const analysis = await this.performRealTimeAnalysis(latestDataset.id);
      
      return {
        equipment: analysis.equipment,
        status: 'active',
        lastUpdated: latestDataset.uploaded_at,
        anomalyCount: analysis.anomalies.length,
        dataPoints: analysis.data.length
      };
    } catch (error) {
      console.error('Error getting equipment status:', error);
      return { equipment: [], status: 'error' };
    }
  }

  // Generate real-time alerts
  async generateRealTimeAlerts(threshold = 2) {
    try {
      const datasets = await this.getDatasets();
      if (datasets.length === 0) {
        return [];
      }

      const latestDataset = datasets[0];
      const analysis = await this.performRealTimeAnalysis(latestDataset.id);
      
      return analysis.anomalies.filter(anomaly => anomaly.zScore > threshold);
    } catch (error) {
      console.error('Error generating alerts:', error);
      return [];
    }
  }
}

export default new AnalyticsService();
