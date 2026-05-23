import React from 'react';
import { Handle, Position } from 'reactflow';

export default function IPNode({ data }: { data: any }) {
  return (
    <div style={{ padding: '10px', border: '2px solid #f0f', borderRadius: '5px', backgroundColor: '#1a001a', color: '#f0f', minWidth: '150px', textAlign: 'center', boxShadow: '0 0 10px #f0f', fontFamily: 'monospace' }}>
      <Handle type="target" position={Position.Top} style={{ background: '#f0f' }} />
      <div><strong>IP Address</strong></div>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#f0f' }} />
    </div>
  );
}
