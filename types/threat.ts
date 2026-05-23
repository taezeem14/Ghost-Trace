export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO' | 'SAFE';

export interface ThreatScore {
  score: number; // 0-100
  level: RiskLevel;
  breakdown: ScoreBreakdown;
}

export interface ScoreBreakdown {
  malware: number;
  phishing: number;
  spam: number;
  vulnerability: number;
  anomalies: number;
}

export interface WeightMap {
  [category: string]: number;
}
