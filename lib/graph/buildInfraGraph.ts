export interface GraphData {
  nodes: any[];
  edges: any[];
}

export const buildInfraGraph = (target: string, type: string, results: any): GraphData => {
  const nodes: any[] = [];
  const edges: any[] = [];

  // Root node
  nodes.push({
    id: 'root',
    type: 'custom', // Requires a custom React Flow node component
    data: { label: target, type: type, main: true },
    position: { x: 0, y: 0 },
  });

  if (!results) return { nodes, edges };

  let currentY = 150;
  let currentX = -200;

  const addNode = (id: string, label: string, nodeType: string, parentId = 'root') => {
    nodes.push({
      id,
      type: 'custom',
      data: { label, type: nodeType },
      position: { x: currentX, y: currentY },
    });
    edges.push({
      id: `e-${parentId}-${id}`,
      source: parentId,
      target: id,
      animated: true,
      style: { stroke: '#00ffcc' }
    });
    currentX += 150;
    if (currentX > 200) {
      currentX = -200;
      currentY += 100;
    }
  };

  // Logic to parse results and generate graph based on target type
  if (type === 'domain') {
    if (results.dns) {
      results.dns.forEach((record: any, index: number) => {
        addNode(`dns-${index}`, `${record.type}: ${record.value}`, 'dns');
      });
    }
    if (results.subdomains) {
      results.subdomains.forEach((sub: string, index: number) => {
        addNode(`sub-${index}`, sub, 'subdomain');
      });
    }
    if (results.emails) {
      results.emails.forEach((email: string, index: number) => {
        addNode(`email-${index}`, email, 'email');
      });
    }
  }

  if (type === 'ip') {
    if (results.ports) {
      results.ports.forEach((port: any, index: number) => {
        addNode(`port-${index}`, `Port ${port.number} (${port.service})`, 'port');
      });
    }
    if (results.location) {
      addNode('loc', `${results.location.city}, ${results.location.country}`, 'location');
    }
  }
  
  if (type === 'email') {
    if (results.breaches) {
      results.breaches.forEach((breach: any, index: number) => {
        addNode(`breach-${index}`, breach.Name, 'breach');
      });
    }
  }

  return { nodes, edges };
};
