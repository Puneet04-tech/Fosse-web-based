import axios from 'axios';

let API_BASE = process.env.REACT_APP_API_URL || 'https://fosse-equipment-monitor.onrender.com/api';
// Ensure API_BASE ends with '/api' for consistent endpoints
if (!API_BASE.endsWith('/api')) {
  API_BASE = API_BASE.replace(/\/$/, '') + '/api';
}

export function uploadDataset(file, username, password, onUploadProgress) {
  const fd = new FormData();
  fd.append('file', file);
  const auth = username ? { username, password } : null;
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  };
  if (auth) {
    config.auth = auth;
  }
  return axios.post(`${API_BASE}/upload/`, fd, config).then((r) => r.data);
}

export function getDatasets() {
  return axios.get(`${API_BASE}/datasets/`).then((r) => r.data);
}

export function getDatasetRows(id) {
  return axios.get(`${API_BASE}/datasets/${id}/data/`).then((r) => r.data.rows);
}

export function downloadReport(id, username, password) {
  const config = { responseType: 'blob' };
  if (username) config.auth = { username, password };
  return axios.get(`${API_BASE}/datasets/${id}/report.pdf`, config).then((r) => r.data);
}
