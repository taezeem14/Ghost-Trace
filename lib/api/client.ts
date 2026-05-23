import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Implement exponential backoff retry logic
const MAX_RETRIES = 3;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    
    if (!config) {
      return Promise.reject(error);
    }
    
    config.retryCount = config.retryCount ?? 0;
    
    // Only retry on 429 Rate Limit or 5xx Server Errors
    const shouldRetry = error.response?.status === 429 || (error.response?.status >= 500 && error.response?.status < 600);
    
    if (shouldRetry && config.retryCount < MAX_RETRIES) {
      config.retryCount += 1;
      
      // Exponential backoff: 1s, 2s, 4s... + jitter
      const delay = Math.min(1000 * Math.pow(2, config.retryCount - 1) + Math.random() * 500, 10000);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return apiClient(config);
    }
    
    return Promise.reject(error);
  }
);
