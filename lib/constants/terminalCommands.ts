export const TerminalCommandRegistry = [
  { name: 'help', description: 'Show available commands' },
  { name: 'clear', description: 'Clear terminal output' },
  { name: 'scan', description: 'Start OSINT scan on target (e.g., scan example.com)' },
  { name: 'whois', description: 'Run WHOIS lookup on target' },
  { name: 'dns', description: 'Run DNS enumeration' },
  { name: 'shodan', description: 'Check target against Shodan' },
  { name: 'export', description: 'Export scan results to PDF/JSON' },
  { name: 'set', description: 'Set configuration variables' },
  { name: 'status', description: 'Show current scan status' },
  { name: 'history', description: 'Show command history' },
];
