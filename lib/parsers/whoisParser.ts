import { WhoisResult } from '../../types/osint';

export function parseWhois(rawData: any): WhoisResult {
  return {
    domainName: rawData.domainName || rawData.domain || '',
    registrar: rawData.registrar || '',
    creationDate: rawData.creationDate || rawData.created || '',
    expirationDate: rawData.expirationDate || rawData.expires || '',
    updatedDate: rawData.updatedDate || rawData.updated || '',
    nameServers: Array.isArray(rawData.nameServer) 
      ? rawData.nameServer 
      : typeof rawData.nameServer === 'string' 
        ? rawData.nameServer.split(/[\s,]+/) 
        : [],
    rawText: rawData.rawText || JSON.stringify(rawData, null, 2),
  };
}
