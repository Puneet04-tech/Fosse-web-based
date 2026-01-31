import React from 'react';

export default function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1050 }}>
      <div className="alert alert-info alert-dismissible fade show" role="alert">
        {message}
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      </div>
    </div>
  );
}
