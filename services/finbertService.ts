/**
 * FinBERT Sentiment Analysis Service
 * Communicates with Flask backend for FinBERT model predictions
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export interface FinBERTSentiment {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  scores: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export async function analyzeWithFinBERT(texts: string[]): Promise<FinBERTSentiment[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sentiment/finbert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texts }),
    });

    if (!response.ok) {
      throw new Error(`FinBERT API error: ${response.statusText}`);
    }

    const results = await response.json();
    return results;
  } catch (error) {
    console.error('FinBERT analysis failed:', error);
    throw error;
  }
}
