import { apiClient } from './client';
import { useApiKeyStore } from '@/store/apiKeyStore';

export interface ScanOptions {
  target: string;
  type: 'domain' | 'ip' | 'email' | 'username';
}

export interface OsintResponse {
  success: boolean;
  data?: any;
  error?: string;
  threatScore?: number;
}

// Helper to inject keys into requests
const getHeadersWithKeys = () => {
  const keys = useApiKeyStore.getState().keys;
  return {
    'x-api-keys': JSON.stringify(keys) // Send keys securely in headers to our Next.js backend
  };
};

export const scanDomain = async (domain: string): Promise<OsintResponse> => {
  try {
    const { data } = await apiClient.post('/osint/domain', { domain }, { headers: getHeadersWithKeys() });
    return { success: true, data: data.data, threatScore: data.threatScore };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

export const scanIp = async (ip: string): Promise<OsintResponse> => {
  try {
    const { data } = await apiClient.post('/osint/ip', { ip }, { headers: getHeadersWithKeys() });
    return { success: true, data: data.data, threatScore: data.threatScore };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

export const scanEmail = async (email: string): Promise<OsintResponse> => {
  try {
    const { data } = await apiClient.post('/osint/email', { email }, { headers: getHeadersWithKeys() });
    return { success: true, data: data.data, threatScore: data.threatScore };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

export const scanUsername = async (username: string): Promise<OsintResponse> => {
  try {
    const { data } = await apiClient.post('/osint/username', { username }, { headers: getHeadersWithKeys() });
    return { success: true, data: data.data, threatScore: data.threatScore };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.error || error.message };
  }
};
