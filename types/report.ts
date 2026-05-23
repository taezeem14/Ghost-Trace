export type ReportFormat = 'pdf' | 'json' | 'csv' | 'markdown';

export interface ReportMetadata {
  title: string;
  target: string;
  dateGenerated: string;
  author?: string;
  version: string;
  summary: string;
}

export interface ExportOptions {
  format: ReportFormat;
  includeRawData: boolean;
  includeGraphs: boolean;
  sections: string[];
}
