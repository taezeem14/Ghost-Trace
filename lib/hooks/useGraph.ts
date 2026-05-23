import { useState, useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, Node, Edge } from 'reactflow';
import { useScanStore } from '@/store/scanStore';
import { buildInfraGraph } from '@/lib/graph/buildInfraGraph';

export const useGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { activeScan, scanResults } = useScanStore();

  useEffect(() => {
    if (activeScan && scanResults && activeScan.status === 'complete') {
      const { nodes: initialNodes, edges: initialEdges } = buildInfraGraph(activeScan.target, activeScan.type, scanResults);
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [activeScan, scanResults, setNodes, setEdges]);

  const onConnect = useCallback((params: any) => {
    // Custom connection logic if needed
  }, []);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect
  };
};
