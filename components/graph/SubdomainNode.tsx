import React from 'react';
import { Handle, Position } from 'reactflow';

export default function SubdomainNode({ data }: { data: any }) {
  return (
    <div style={{ padding: '10px', border: '2px solid #ff0', borderRadius: '5px', backgroundColor: '#1a1a00', color: '#ff0', minWidth: '150px', textAlign: 'center', boxShadow: '0 0 10px #ff0', fontFamily: 'monospace' }}>
      <Handle type="target" position={Position.Top} style={{ background: '#ff0' }} />
      <div><strong>Subdomain</strong></div>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#ff0' }} />
    </div>
  );
}
