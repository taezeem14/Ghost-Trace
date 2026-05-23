import React from 'react';

interface TerminalLineProps {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export default function TerminalLine({ text, type }: TerminalLineProps) {
  let color = '#0f0'; // default output
  if (type === 'error') color = '#f00';
  if (type === 'success') color = '#0ff';
  if (type === 'input') color = '#fff';

  return (
    <div style={{ color, marginBottom: '4px', wordBreak: 'break-all', lineHeight: '1.4' }}>
      {text}
    </div>
  );
}
