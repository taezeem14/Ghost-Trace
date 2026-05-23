import { ThreatScore, RiskLevel, ScoreBreakdown } from '../../types/threat';
import { classifyRisk } from './riskClassify';

export function calculateThreatScore(breakdown: ScoreBreakdown): ThreatScore {
  const weights = {
    malware: 0.4,
    phishing: 0.3,
    spam: 0.1,
    vulnerability: 0.15,
    anomalies: 0.05,
  };

  const score = (
    breakdown.malware * weights.malware +
    breakdown.phishing * weights.phishing +
    breakdown.spam * weights.spam +
    breakdown.vulnerability * weights.vulnerability +
    breakdown.anomalies * weights.anomalies
  );

  const normalizedScore = Math.min(Math.max(score, 0), 100);

  return {
    score: Math.round(normalizedScore),
    level: classifyRisk(normalizedScore),
    breakdown,
  };
}
