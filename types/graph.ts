import { Node, Edge } from 'reactflow';

export type InfraNodeType = 'domain' | 'ip' | 'email' | 'server' | 'location' | 'person' | 'vulnerability' | 'malware';

export interface InfraNodeData {
  label: string;
  type: InfraNodeType;
  details?: Record<string, any>;
  threatScore?: number;
}

export type InfraNode = Node<InfraNodeData>;

export type InfraEdgeType = 'resolves_to' | 'hosted_on' | 'registered_by' | 'associated_with' | 'vulnerable_to';

export interface InfraEdgeData {
  label?: string;
  type: InfraEdgeType;
}

export type InfraEdge = Edge<InfraEdgeData>;
