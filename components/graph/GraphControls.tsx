import React from 'react';

export default function GraphControls() {
  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10, background: 'rgba(0,0,0,0.8)', border: '1px solid #0f0', padding: '10px', color: '#0f0', fontFamily: 'monospace', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', textTransform: 'uppercase' }}>Layout Controls</h3>
      <button style={{ background: '#000', color: '#0f0', border: '1px solid #0f0', padding: '5px 10px', cursor: 'pointer', display: 'block', width: '100%', marginBottom: '5px' }}>
        Auto Layout
      </button>
      <button style={{ background: '#000', color: '#0f0', border: '1px solid #0f0', padding: '5px 10px', cursor: 'pointer', display: 'block', width: '100%' }}>
        Clear Graph
      </button>
    </div>
  );
}
