import { useState, useCallback } from 'react';
import { useScanStore } from '@/store/scanStore';
import { useTerminalStore } from '@/store/terminalStore';
import { useHistoryStore } from '@/store/historyStore';
import { scanDomain, scanIp, scanEmail, scanUsername, OsintResponse } from '@/lib/api/osint';
import { buildInfraGraph } from '@/lib/graph/buildInfraGraph';

export const useOsintScan = () => {
  const { setCache, getCache, setActiveScan, setScanResults } = useScanStore();
  const { addEntry, setProcessing } = useTerminalStore();
  const { addHistory } = useHistoryStore();
  const [isScanning, setIsScanning] = useState(false);

  const executeScan = useCallback(async (target: string, type: 'domain' | 'ip' | 'email' | 'username') => {
    setIsScanning(true);
    setProcessing(true);
    setActiveScan({ type, target, status: 'scanning' });
    
    addEntry('system', `Initializing trace on ${type}: ${target}...`);

    // Check cache first
    const cached = getCache(type, target);
    if (cached) {
      addEntry('system', 'Retrieved results from local cache.');
      setScanResults(cached.data, cached.threatScore);
      setActiveScan({ type, target, status: 'complete' });
      setIsScanning(false);
      setProcessing(false);
      return cached;
    }

    try {
      let result: OsintResponse;

      switch (type) {
        case 'domain':
          result = await scanDomain(target);
          break;
        case 'ip':
          result = await scanIp(target);
          break;
        case 'email':
          result = await scanEmail(target);
          break;
        case 'username':
          result = await scanUsername(target);
          break;
        default:
          throw new Error('Invalid scan type');
      }

      if (result.success) {
        addEntry('success', `Trace completed successfully.`);
        
        // Update stores
        setCache(type, target, { data: result.data, threatScore: result.threatScore });
        setScanResults(result.data, result.threatScore || 0);
        setActiveScan({ type, target, status: 'complete' });
        
        addHistory({
          target,
          type,
          threatScore: result.threatScore || 0,
          summary: `Scan completed with threat score ${result.threatScore || 0}`
        });

      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      addEntry('error', `Trace failed: ${error.message}`);
      setActiveScan({ type, target, status: 'error' });
    } finally {
      setIsScanning(false);
      setProcessing(false);
    }
  }, [setCache, getCache, setActiveScan, setScanResults, addEntry, setProcessing, addHistory]);

  return { executeScan, isScanning };
};
