"use client";

import React, { useState, useRef, useEffect } from 'react';
import TerminalLine from './TerminalLine';
import { parseCommand } from './CommandParser';

interface OutputLine {
  id: number;
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export function GhostShell() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<OutputLine[]>([
    { id: Date.now(), text: 'GhostTrace Terminal v1.0.0', type: 'output' },
    { id: Date.now() + 1, text: 'Type "help" for a list of commands.', type: 'output' },
  ]);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      setInput('');
      
      // Add input line
      const inputLine: OutputLine = { id: Date.now(), text: `> ${cmd}`, type: 'input' };
      setHistory((prev) => [...prev, inputLine]);

      if (cmd) {
        // Parse and execute
        const result = await parseCommand(cmd);
        const resultLines = result.map((res: any, idx: number) => ({
          id: Date.now() + 100 + idx,
          text: res.text,
          type: res.type
        }));
        setHistory((prev) => [...prev, ...resultLines]);
      }
    }
  };

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div style={{
      backgroundColor: '#050505',
      color: '#0f0',
      fontFamily: '"Courier New", Courier, monospace',
      padding: '20px',
      height: '100%',
      width: '100%',
      overflowY: 'auto',
      boxSizing: 'border-box',
      border: '1px solid #333'
    }}>
      <div style={{ marginBottom: '20px' }}>
        {history.map((line) => (
          <TerminalLine key={line.id} text={line.text} type={line.type} />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#0f0', marginRight: '10px' }}>$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            color: '#0f0',
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '16px',
            outline: 'none'
          }}
          autoFocus
        />
      </div>
      <div ref={endOfTerminalRef} />
    </div>
  );
}

export default GhostShell;

