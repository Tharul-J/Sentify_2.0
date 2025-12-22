export enum SentimentType {
  POSITIVE = 'Positive',
  NEGATIVE = 'Negative',
  NEUTRAL = 'Neutral',
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  summary: string;
}

export interface ModelSentimentResult {
  sentiment: SentimentType;
  confidence: number;
  scores?: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export interface DualModelAnalysis {
  gemini?: ModelSentimentResult;
  finbert?: ModelSentimentResult;
  agreement: boolean;
  agreementScore: number;
  finalSentiment: SentimentType;
  finalConfidence: number;
}

export interface AnalyzedNewsItem extends NewsItem {
  sentiment: SentimentType;
  confidenceScore: number; // 0 to 1
  explanation: string;
  // Dual model analysis
  geminiSentiment?: ModelSentimentResult;
  finbertSentiment?: ModelSentimentResult;
  modelComparison?: DualModelAnalysis;
}

export interface StockTicker {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export interface AnalysisSummary {
  totalArticles: number;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  averageConfidence: number;
  marketMood: string;
  modelAgreement?: number; // Percentage agreement between models
}
