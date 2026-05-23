// Maps commands to actions and Next.js API routes

export async function parseCommand(cmd: string): Promise<Array<{text: string, type: 'input' | 'output' | 'error' | 'success'}>> {
  const parts = cmd.split(' ');
  const base = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (base) {
    case 'help':
      return [
        { text: 'Available commands:', type: 'output' },
        { text: '  scan <domain>     - Perform basic reconnaissance on a domain', type: 'output' },
        { text: '  whois <domain>    - Fetch WHOIS records', type: 'output' },
        { text: '  clear             - Clear terminal (not implemented here)', type: 'output' },
        { text: '  help              - Show this message', type: 'output' }
      ];

    case 'scan':
      if (args.length === 0) return [{ text: 'Usage: scan <domain>', type: 'error' }];
      return [
        { text: `Initiating scan on ${args[0]}...`, type: 'output' },
        { text: '[*] Resolving IP addresses...', type: 'output' },
        { text: '[+] Found 192.0.2.1', type: 'success' },
        { text: 'Scan complete.', type: 'success' }
      ];

    case 'whois':
      if (args.length === 0) return [{ text: 'Usage: whois <domain>', type: 'error' }];
      return [
        { text: `Fetching WHOIS for ${args[0]}...`, type: 'output' },
        { text: 'Registrar: Example Registrar, Inc.', type: 'success' },
        { text: 'Creation Date: 1999-01-01T00:00:00Z', type: 'output' }
      ];

    default:
      return [{ text: `Command not found: ${base}`, type: 'error' }];
  }
}
