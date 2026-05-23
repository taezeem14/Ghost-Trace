import { RiskLevel } from '../../types/threat';

export function classifyRisk(score: number): RiskLevel {
  if (score >= 90) return 'CRITICAL';
  if (score >= 70) return 'HIGH';
  if (score >= 40) return 'MEDIUM';
  if (score >= 20) return 'LOW';
  if (score > 0) return 'INFO';
  return 'SAFE';
}

export function getRiskColorToken(level: RiskLevel): string {
  switch (level) {
    case 'CRITICAL':
      return 'var(--ghost-danger)'; 
    case 'HIGH':
      return '#ff3333';
    case 'MEDIUM':
      return '#ffcc00';
    case 'LOW':
      return '#00ccff';
    case 'INFO':
      return '#a3a3a3';
    case 'SAFE':
      return '#00ff41';
    default:
      return '#e5e5e5';
  }
}

export function getRiskDescription(level: RiskLevel): string {
  switch (level) {
    case 'CRITICAL':
      return 'Immediate action required. High probability of malicious activity.';
    case 'HIGH':
      return 'Elevated risk. Suspicious indicators present.';
    case 'MEDIUM':
      return 'Moderate risk. Some anomalies detected.';
    case 'LOW':
      return 'Low risk. Minor issues found.';
    case 'INFO':
      return 'Informational findings only.';
    case 'SAFE':
      return 'No threats detected.';
    default:
      return 'Unknown risk level.';
  }
}
