import { ShodanResult } from '../../types/osint';

export function parseShodan(rawData: any): ShodanResult {
  return {
    ip_str: rawData.ip_str || '',
    ports: rawData.ports || [],
    org: rawData.org || '',
    isp: rawData.isp || '',
    vulns: rawData.vulns || [],
    hostnames: rawData.hostnames || [],
  };
}
