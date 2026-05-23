import React from 'react';
import { Handle, Position } from 'reactflow';

export default function DomainNode({ data }: { data: any }) {
  return (
    <div style={{ padding: '10px', border: '2px solid #0ff', borderRadius: '5px', backgroundColor: '#001a1a', color: '#0ff', minWidth: '150px', textAlign: 'center', boxShadow: '0 0 10px #0ff', fontFamily: 'monospace' }}>
      <Handle type="target" position={Position.Top} style={{ background: '#0ff' }} />
      <div><strong>Domain</strong></div>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#0ff' }} />
    </div>
  );
}
