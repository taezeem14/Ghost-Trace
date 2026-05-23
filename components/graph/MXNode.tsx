import React from 'react';
import { Handle, Position } from 'reactflow';

export default function MXNode({ data }: { data: any }) {
  return (
    <div style={{ padding: '10px', border: '2px solid #0f0', borderRadius: '5px', backgroundColor: '#001a00', color: '#0f0', minWidth: '150px', textAlign: 'center', boxShadow: '0 0 10px #0f0', fontFamily: 'monospace' }}>
      <Handle type="target" position={Position.Top} style={{ background: '#0f0' }} />
      <div><strong>Mail Exchange</strong></div>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#0f0' }} />
    </div>
  );
}
