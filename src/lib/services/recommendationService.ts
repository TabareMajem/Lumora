import { db } from '../db';
import { RecommendationEngine } from './recommendationEngine';
import type { Media } from '../types';

export const recommendationService = {
  async getRecommendations(userId: number, mediaType?: Media['type']) {
    const scores = await RecommendationEngine.generateRecommendations(userId, mediaType);
    
    // Store recommendations in the database
    await Promise.all(
      scores.map(score =>
        db.recommendations.add({
          userId,
          mediaId: score.mediaId,
          score: score.score,
          recommendedAt: new Date().toISOString(),
        })
      )
    );

    // Fetch full media details for recommendations
    const recommendations = await Promise.all(
      scores.map(async score => {
        const media = await db.media.get(score.mediaId);
        return {
          ...score,
          media,
        };
      })
    );

    return recommendations;
  },

  async refreshRecommendations(userId: number) {
    // Clear existing recommendations
    await db.recommendations
      .where('userId')
      .equals(userId)
      .delete();

    // Generate new recommendations
    return this.getRecommendations(userId);
  },

  async getPersonalizedExplanation(userId: number, mediaId: number): Promise<string> {
    const [media, assessment] = await Promise.all([
      db.media.get(mediaId),
      db.assessments
        .where('userId')
        .equals(userId)
        .filter(a => a.type === 'BARTLE')
        .first(),
    ]);

    if (!media || !assessment) return '';

    const bartleType = Object.entries(assessment.scores)
      .reduce((a, b) => (b[1] > a[1] ? b : a))[0];

    const explanations = {
      ACHIEVER: 'This matches your preference for achievement and progression',
      EXPLORER: 'This aligns with your love of discovery and exploration',
      SOCIALIZER: 'This content features strong social and character interactions',
      KILLER: 'This offers competitive and challenging content',
    };

    return `Recommended because: ${explanations[bartleType as keyof typeof explanations]}. 
      It matches your interests in ${media.genres.join(', ')}.`;
  }
};