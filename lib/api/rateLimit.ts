// Simple client-side rate limit tracker to avoid spamming our own or third-party APIs

interface RateLimitTracker {
  [service: string]: {
    timestamps: number[];
  };
}

const tracker: RateLimitTracker = {};

export const checkRateLimit = (service: string, limit: number, windowMs: number): boolean => {
  if (!tracker[service]) {
    tracker[service] = { timestamps: [] };
  }

  const now = Date.now();
  const windowStart = now - windowMs;

  // Clean up old timestamps
  tracker[service].timestamps = tracker[service].timestamps.filter(ts => ts > windowStart);

  if (tracker[service].timestamps.length >= limit) {
    return false; // Rate limited
  }

  return true;
};

export const recordRequest = (service: string) => {
  if (!tracker[service]) {
    tracker[service] = { timestamps: [] };
  }
  tracker[service].timestamps.push(Date.now());
};

// Wait if rate limited (used in hooks)
export const waitIfNeeded = async (service: string, limit: number, windowMs: number) => {
  while (!checkRateLimit(service, limit, windowMs)) {
    // Wait a bit before checking again
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  recordRequest(service);
};
