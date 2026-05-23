import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import DomainNode from './DomainNode';
import IPNode from './IPNode';
import SubdomainNode from './SubdomainNode';
import ASNNode from './ASNNode';
import MXNode from './MXNode';
import InfraEdge from './InfraEdge';
import GraphControls from './GraphControls';

const nodeTypes = {
  domain: DomainNode,
  ip: IPNode,
  subdomain: SubdomainNode,
  asn: ASNNode,
  mx: MXNode,
};

const edgeTypes = {
  infra: InfraEdge,
};

const initialNodes: Node[] = [
  { id: '1', type: 'domain', position: { x: 250, y: 5 }, data: { label: 'example.com' } },
];
const initialEdges: Edge[] = [];

export default function InfraGraph() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'infra' }, eds)),
    []
  );

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0a0a0a' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background color="#333" gap={16} />
        <Controls style={{ fill: '#0f0', backgroundColor: '#111', color: '#0f0', border: '1px solid #0f0' }} />
        <MiniMap nodeColor="#0f0" maskColor="rgba(0, 0, 0, 0.7)" style={{ backgroundColor: '#111', border: '1px solid #0f0' }} />
      </ReactFlow>
      <GraphControls />
    </div>
  );
}
