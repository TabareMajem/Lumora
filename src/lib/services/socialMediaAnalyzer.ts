import OpenAI from 'openai';
import axios from 'axios';
import type { BartleType, BigFiveType, ValueType } from '../types';

interface AnalysisResult {
  bartleTypes: Record<BartleType, number>;
  bigFive: Record<BigFiveType, number>;
  values: Record<ValueType, number>;
  summary: string;
}

export class SocialMediaAnalyzer {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  async analyzeSocialProfile(platform: string, handle: string): Promise<AnalysisResult> {
    try {
      // Fetch social media data
      const data = await this.fetchSocialData(platform, handle);
      
      // Process and structure the data
      const processedData = this.processSocialData(data);
      
      // Generate psychological profile using AI
      const profile = await this.generatePsychologicalProfile(processedData);
      
      return this.formatResults(profile);
    } catch (error) {
      console.error('Error analyzing social profile:', error);
      throw error;
    }
  }

  private async fetchSocialData(platform: string, handle: string) {
    // This is a mock implementation
    // In a real application, you would integrate with social media APIs
    return {
      posts: [
        { text: 'Example post 1', timestamp: new Date().toISOString() },
        { text: 'Example post 2', timestamp: new Date().toISOString() },
      ],
      interactions: [],
      profile: {
        bio: 'Example bio',
        interests: ['gaming', 'technology', 'movies'],
      },
    };
  }

  private processSocialData(rawData: any) {
    return {
      posts: rawData.posts,
      interactions: rawData.interactions,
      profile: rawData.profile,
    };
  }

  private async generatePsychologicalProfile(processedData: any): Promise<string> {
    const prompt = this.constructAIPrompt(processedData);
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a psychological profiling expert. Analyze the provided social media data to generate a psychological profile that includes:
            1. Bartle Types (ACHIEVER, EXPLORER, SOCIALIZER, KILLER)
            2. Big Five Traits (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)
            3. Values (Leadership, Creativity, Empathy, Determination, Wisdom, Integrity, Collaboration, Independence)
            
            Provide scores as percentages (0-100) for each category and a brief summary of the analysis.
            Format the response as JSON.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
    });

    return response.choices[0].message.content;
  }

  private constructAIPrompt(data: any): string {
    return `
    Analyze the following social media activity data:

    Posts:
    ${JSON.stringify(data.posts)}

    Profile Information:
    ${JSON.stringify(data.profile)}

    Interactions:
    ${JSON.stringify(data.interactions)}

    Generate a psychological profile based on:
    1. Content themes and topics
    2. Writing style and tone
    3. Interaction patterns
    4. Expressed interests and values
    5. Behavioral indicators`;
  }

  private formatResults(aiResponse: string): AnalysisResult {
    const parsed = JSON.parse(aiResponse);
    
    return {
      bartleTypes: this.normalizeScores(parsed.bartleTypes),
      bigFive: this.normalizeScores(parsed.bigFive),
      values: this.normalizeScores(parsed.values),
      summary: parsed.summary,
    };
  }

  private normalizeScores(scores: Record<string, number>): Record<string, number> {
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return Object.fromEntries(
      Object.entries(scores).map(([key, value]) => [key, value / total])
    );
  }
}