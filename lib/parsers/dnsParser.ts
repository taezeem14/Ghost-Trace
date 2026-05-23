import { DNSResult } from '../../types/osint';

export function parseDNS(records: any): DNSResult {
  const result: DNSResult = {};
  
  if (records.A) result.a = records.A;
  if (records.AAAA) result.aaaa = records.AAAA;
  if (records.MX) {
    result.mx = records.MX.map((mx: any) => ({
      exchange: mx.exchange,
      priority: mx.priority,
    }));
  }
  if (records.TXT) result.txt = records.TXT;
  if (records.NS) result.ns = records.NS;
  if (records.CNAME) result.cname = records.CNAME;

  return result;
}
