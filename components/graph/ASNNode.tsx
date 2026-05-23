import React from 'react';
import { Handle, Position } from 'reactflow';

export default function ASNNode({ data }: { data: any }) {
  return (
    <div style={{ padding: '10px', border: '2px solid #f90', borderRadius: '5px', backgroundColor: '#1a0a00', color: '#f90', minWidth: '150px', textAlign: 'center', boxShadow: '0 0 10px #f90', fontFamily: 'monospace' }}>
      <Handle type="target" position={Position.Top} style={{ background: '#f90' }} />
      <div><strong>ASN</strong></div>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#f90' }} />
    </div>
  );
}
