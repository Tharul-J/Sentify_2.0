import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem, AnalyzedNewsItem, SentimentType, ModelSentimentResult, DualModelAnalysis } from "../types";
import { analyzeWithFinBERT } from "./finbertService";

// Helper to check if we are in a live environment or simulation
export const hasApiKey = (): boolean => {
  return !!import.meta.env.VITE_GEMINI_API_KEY;
};

const getAIClient = () => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    return null;
  }
  return new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
};

/**
 * Analyze news with dual models (Gemini and/or FinBERT)
 */
export const analyzeNewsBatch = async (
  news: NewsItem[], 
  useGemini: boolean = true, 
  useFinBERT: boolean = false
): Promise<AnalyzedNewsItem[]> => {
  const ai = getAIClient();
  
  // Fallback for UI dev without a real key
  if (!ai && !useFinBERT) {
    console.log("No API Key found. Running in Simulation Mode.");
    return simulateAnalysis(news);
  }

  const results: AnalyzedNewsItem[] = [];

  // Prepare texts for batch FinBERT analysis
  let finbertResults: any[] = [];
  if (useFinBERT) {
    try {
      // Give more weight to headline by mentioning it twice to emphasize primary sentiment
      const texts = news.map(item => `HEADLINE: ${item.title}. HEADLINE AGAIN: ${item.title}. Additional context: ${item.summary.substring(0, 200)}`);
      finbertResults = await analyzeWithFinBERT(texts);
      console.log(`✓ FinBERT analyzed ${finbertResults.length} articles`);
    } catch (error) {
      console.error("FinBERT batch analysis failed:", error);
    }
  }

  for (let i = 0; i < news.length; i++) {
    const item = news[i];
    let geminiResult: ModelSentimentResult | undefined;
    let finbertResult: ModelSentimentResult | undefined;

    // Analyze with Gemini
    if (useGemini && ai) {
      try {
        const prompt = `
          Role: Financial Analyst with expertise in news sentiment analysis.
          Task: Analyze the sentiment of this financial news. Focus PRIMARILY on the headline as it contains the main message.
          
          MAIN HEADLINE: "${item.title}"
          Supporting Context: "${item.summary.substring(0, 300)}"
          
          Important Guidelines:
          - The headline sentiment takes priority over any hypothetical scenarios in the context
          - Words like "pleased", "stellar", "gain", "surge" indicate POSITIVE sentiment
          - Words like "plunge", "loss", "crash", "disappointing" indicate NEGATIVE sentiment
          - Don't be misled by hypothetical "what-if" scenarios mentioned in the context
          
          Output Requirements:
          1. Sentiment: strictly "Positive", "Negative", or "Neutral" based on the headline's primary message.
          2. Confidence Score: 0.0 to 1.0 based on how explicit the sentiment is.
          3. Explanation: A concise, professional 1-sentence rationale for the investor.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                sentiment: { type: Type.STRING, enum: ["Positive", "Negative", "Neutral"] },
                confidenceScore: { type: Type.NUMBER },
                explanation: { type: Type.STRING }
              }
            }
          }
        });

        const json = JSON.parse(response.text || "{}");
        geminiResult = {
          sentiment: json.sentiment as SentimentType,
          confidence: json.confidenceScore || 0.5,
        };
      } catch (error) {
        console.error("Gemini analysis failed for item:", item.id, error);
      }
    }

    // Get FinBERT result
    if (useFinBERT && finbertResults[i]) {
      const fb = finbertResults[i];
      finbertResult = {
        sentiment: fb.sentiment.charAt(0).toUpperCase() + fb.sentiment.slice(1) as SentimentType,
        confidence: fb.confidence,
        scores: fb.scores
      };
    }

    // Calculate model comparison if both models used
    let modelComparison: DualModelAnalysis | undefined;
    if (geminiResult && finbertResult) {
      const agreement = geminiResult.sentiment === finbertResult.sentiment;
      const agreementScore = agreement ? 1.0 : 0.0;
      
      // Ensemble: average confidence if agreed, lower confidence if disagreed
      const finalSentiment = agreement 
        ? geminiResult.sentiment 
        : (geminiResult.confidence > finbertResult.confidence ? geminiResult.sentiment : finbertResult.sentiment);
      
      const finalConfidence = agreement
        ? (geminiResult.confidence + finbertResult.confidence) / 2
        : Math.max(geminiResult.confidence, finbertResult.confidence) * 0.7; // Penalize disagreement

      modelComparison = {
        gemini: geminiResult,
        finbert: finbertResult,
        agreement,
        agreementScore,
        finalSentiment,
        finalConfidence
      };
    }

    // Determine final sentiment and confidence
    const finalSentiment = modelComparison?.finalSentiment || geminiResult?.sentiment || finbertResult?.sentiment || SentimentType.NEUTRAL;
    const finalConfidence = modelComparison?.finalConfidence || geminiResult?.confidence || finbertResult?.confidence || 0.5;
    
    // Generate explanation
    let explanation = "";
    if (modelComparison) {
      if (modelComparison.agreement) {
        explanation = `Both models agree: ${finalSentiment} sentiment detected with high confidence.`;
      } else {
        explanation = `Models disagree: Gemini detected ${geminiResult?.sentiment}, FinBERT detected ${finbertResult?.sentiment}. Using higher confidence prediction.`;
      }
    } else if (geminiResult) {
      explanation = "Analyzed by Gemini AI for financial sentiment.";
    } else if (finbertResult) {
      explanation = "Analyzed by FinBERT specialized financial model.";
    } else {
      explanation = "Analysis unavailable.";
    }

    results.push({
      ...item,
      sentiment: finalSentiment,
      confidenceScore: finalConfidence,
      explanation,
      geminiSentiment: geminiResult,
      finbertSentiment: finbertResult,
      modelComparison
    });
  }

  return results;
};

// Simulation logic to enable frontend development without burning tokens or needing keys
const simulateAnalysis = (news: NewsItem[]): AnalyzedNewsItem[] => {
  return news.map(item => {
    const text = (item.title + " " + item.summary).toLowerCase();
    const isPositive = text.includes('grow') || text.includes('surge') || text.includes('record') || text.includes('high') || text.includes('rally');
    const isNegative = text.includes('drop') || text.includes('fail') || text.includes('loss') || text.includes('suit') || text.includes('cut');
    
    let sentiment = SentimentType.NEUTRAL;
    if (isPositive) sentiment = SentimentType.POSITIVE;
    if (isNegative) sentiment = SentimentType.NEGATIVE;

    return {
      ...item,
      sentiment,
      confidenceScore: 0.75 + (Math.random() * 0.2),
      explanation: "Simulated analysis: Key terms matched in local offline mode."
    };
  });
};