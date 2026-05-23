export type InputType = 'domain' | 'ipv4' | 'ipv6' | 'email' | 'url' | 'username' | 'hash';

export interface WhoisResult {
  domainName: string;
  registrar: string;
  creationDate: string;
  expirationDate: string;
  updatedDate: string;
  nameServers: string[];
  rawText: string;
}

export interface DNSResult {
  a?: string[];
  aaaa?: string[];
  mx?: Array<{ exchange: string; priority: number }>;
  txt?: string[][];
  ns?: string[];
  cname?: string[];
}

export interface SSLResult {
  valid: boolean;
  issuer: string;
  subject: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
}

export interface SubdomainResult {
  subdomains: string[];
  count: number;
}

export interface IPGeoResult {
  ip: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  isp: string;
  org: string;
}

export interface ShodanResult {
  ip_str: string;
  ports: number[];
  org: string;
  isp: string;
  vulns?: string[];
  hostnames: string[];
}

export interface AbuseIPDBResult {
  ipAddress: string;
  abuseConfidenceScore: number;
  totalReports: number;
  countryCode: string;
  isp: string;
  domain: string;
}

export interface ASNResult {
  asn: string;
  name: string;
  country: string;
  registry: string;
  cidr: string[];
}

export interface HIBPBreach {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  PwnCount: number;
  Description: string;
  DataClasses: string[];
}

export interface HunterResult {
  email: string;
  score: number;
  status: string;
  sources: Array<{ domain: string; uri: string; extracted_on: string }>;
}

export interface VirusTotalResult {
  malicious: number;
  suspicious: number;
  undetected: number;
  harmless: number;
  timeout: number;
  engines: Record<string, string>;
}

export interface URLScanResult {
  url: string;
  status: number;
  ip: string;
  server: string;
  country: string;
  hasPhishingScore: boolean;
}

export interface OTXResult {
  pulse_count: number;
  reputation: number;
  indicators: any[];
}

export interface TechStackResult {
  technologies: Array<{
    name: string;
    categories: string[];
    version?: string;
  }>;
}

export interface UsernameResult {
  username: string;
  foundOn: Array<{ site: string; url: string }>;
}

export interface ExifResult {
  make?: string;
  model?: string;
  software?: string;
  dateTime?: string;
  gpsLatitude?: number;
  gpsLongitude?: number;
}

export interface TracerouteHop {
  hop: number;
  ip: string;
  rtt1: string;
}

export interface PortScanResult {
  port: number;
  state: 'open' | 'closed' | 'filtered';
  service?: string;
}

export type ScanStatus = 'idle' | 'running' | 'completed' | 'error';

export interface ScanResult<T> {
  data: T | null;
  status: ScanStatus;
  error?: string;
  timestamp: number;
}
