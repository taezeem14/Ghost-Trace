export const APILimits = {
  shodan: {
    requestsPerSecond: 1,
    dailyLimit: 100,
  },
  virustotal: {
    requestsPerMinute: 4,
    dailyLimit: 500,
  },
  abuseipdb: {
    dailyLimit: 1000,
  },
  hunter: {
    monthlyLimit: 25,
  },
  urlscan: {
    requestsPerHour: 50,
  },
};
