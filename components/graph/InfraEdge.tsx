import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

export default function InfraEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={{ ...style, strokeWidth: 2, stroke: '#0f0', strokeDasharray: '5,5', animation: 'dash 10s linear infinite' }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <style>
        {`
          @keyframes dash {
            to {
              stroke-dashoffset: -100;
            }
          }
        `}
      </style>
    </>
  );
}
