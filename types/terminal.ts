export interface TerminalCommand {
  command: string;
  args: string[];
  raw: string;
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  content: string;
  timestamp: number;
}

export interface CommandResult {
  output: string | string[];
  status: 'success' | 'error';
  data?: any;
}
