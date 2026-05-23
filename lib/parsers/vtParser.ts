import { VirusTotalResult } from '../../types/osint';

export function parseVirusTotal(rawData: any): VirusTotalResult {
  const stats = rawData?.data?.attributes?.last_analysis_stats || {};
  const results = rawData?.data?.attributes?.last_analysis_results || {};

  const engines: Record<string, string> = {};
  for (const [engine, result] of Object.entries(results)) {
    engines[engine] = (result as any).category || 'unknown';
  }

  return {
    malicious: stats.malicious || 0,
    suspicious: stats.suspicious || 0,
    undetected: stats.undetected || 0,
    harmless: stats.harmless || 0,
    timeout: stats.timeout || 0,
    engines,
  };
}
