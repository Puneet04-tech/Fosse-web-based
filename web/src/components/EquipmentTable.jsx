import React from 'react';
import { getDatasetRows } from '../api';

export default function EquipmentTable({ datasetId }) {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!datasetId) return;
    setLoading(true);
    getDatasetRows(datasetId).then((r) => setRows(r)).catch(() => setRows([])).finally(() => setLoading(false));
  }, [datasetId]);

  if (loading) return (
    <div className="card p-3" style={{ minHeight: 400, background: 'var(--card-bg)', color: 'white' }}>
      <h5>Equipment Data</h5>
      <div>Loading table...</div>
    </div>
  );
  if (!rows || rows.length === 0) return (
    <div className="card p-3" style={{ minHeight: 400, background: 'var(--card-bg)', color: 'white' }}>
      <h5>Equipment Data</h5>
      <div>No data available</div>
    </div>
  );

  const cols = Object.keys(rows[0]);

  return (
    <div className="card p-3" style={{ minHeight: 400, background: 'var(--card-bg)', color: 'white' }}>
      <h5>Equipment Data</h5>
      <div style={{ maxHeight: 320, overflow: 'auto' }}>
        <table className="table table-sm table-striped table-hover">
          <thead>
            <tr>
              {cols.map(c => <th key={c}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {cols.map(c => <td key={c}>{r[c]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
