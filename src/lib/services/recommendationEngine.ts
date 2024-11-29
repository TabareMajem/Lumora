import { db } from '../db';
import { awardService } from './awardService';
import type { Media, Assessment, User } from '../types';

interface RecommendationScore {
  mediaId: number;
  score: number;
  matchFactors: {
    bartleTypeMatch: number;
    genreMatch: number;
    ratingWeight: number;
    awardBonus: number;
  };
}

export class RecommendationEngine {
  private static readonly WEIGHT_BARTLE = 0.35;
  private static readonly WEIGHT_GENRE = 0.25;
  private static readonly WEIGHT_RATING = 0.15;
  private static readonly WEIGHT_AWARDS = 0.25;

  static async generateRecommendations(
    userId: number,
    mediaType?: Media['type']
  ): Promise<RecommendationScore[]> {
    const [user, media, bartleAssessment] = await Promise.all([
      db.users.get(userId),
      db.media.where('type').equals(mediaType || '').toArray(),
      db.assessments
        .where({ userId, type: 'BARTLE' })
        .reverse()
        .first(),
    ]);

    if (!user) throw new Error('User not found');

    const scores = await Promise.all(
      media.map(async (item) => {
        const { total, factors } = await this.calculateCompatibilityScore(
          item,
          user,
          bartleAssessment
        );

        return {
          mediaId: item.id!,
          score: total,
          matchFactors: factors,
        };
      })
    );

    return scores.sort((a, b) => b.score - a.score);
  }

  private static async calculateCompatibilityScore(
    media: Media,
    user: User,
    bartleAssessment?: Assessment
  ): Promise<{ total: number; factors: RecommendationScore['matchFactors'] }> {
    const [genreMatch, awardScore] = await Promise.all([
      this.calculateGenreMatch(media),
      awardService.calculateAwardScore(media.id!),
    ]);

    const factors = {
      bartleTypeMatch: bartleAssessment ? await this.calculateBartleMatch(media, bartleAssessment) : 0,
      genreMatch,
      ratingWeight: this.calculateRatingWeight(media.ratings),
      awardBonus: awardScore,
    };

    const total =
      factors.bartleTypeMatch * this.WEIGHT_BARTLE +
      factors.genreMatch * this.WEIGHT_GENRE +
      factors.ratingWeight * this.WEIGHT_RATING +
      factors.awardBonus * this.WEIGHT_AWARDS;

    return { total, factors };
  }

  private static async calculateBartleMatch(
    media: Media,
    assessment: Assessment
  ): Promise<number> {
    const bartleScores = assessment.scores as Record<string, number>;
    
    // Define Bartle type weights for different media attributes
    const mediaAttributes = {
      GAME: {
        'Action': { KILLER: 0.8, ACHIEVER: 0.6 },
        'RPG': { EXPLORER: 0.8, ACHIEVER: 0.6 },
        'MMO': { SOCIALIZER: 0.9, KILLER: 0.5 },
        'Puzzle': { EXPLORER: 0.7, ACHIEVER: 0.6 },
      },
      FILM: {
        'Action': { KILLER: 0.6, ACHIEVER: 0.5 },
        'Adventure': { EXPLORER: 0.8, ACHIEVER: 0.4 },
        'Drama': { SOCIALIZER: 0.7, EXPLORER: 0.4 },
        'Documentary': { EXPLORER: 0.9, SOCIALIZER: 0.4 },
      },
      SERIES: {
        'Drama': { SOCIALIZER: 0.8, EXPLORER: 0.4 },
        'Mystery': { EXPLORER: 0.7, ACHIEVER: 0.5 },
        'Comedy': { SOCIALIZER: 0.7, KILLER: 0.3 },
        'Documentary': { EXPLORER: 0.9, ACHIEVER: 0.4 },
      },
    };

    const mediaTypeAttributes = mediaAttributes[media.type];
    let matchScore = 0;
    let weightSum = 0;

    media.genres.forEach(genre => {
      const genreWeights = mediaTypeAttributes[genre];
      if (genreWeights) {
        Object.entries(genreWeights).forEach(([bartleType, weight]) => {
          matchScore += bartleScores[bartleType] * weight;
          weightSum += weight;
        });
      }
    });

    return weightSum > 0 ? matchScore / weightSum : 0;
  }

  private static async calculateGenreMatch(media: Media): Promise<number> {
    // Simple genre matching - can be enhanced with user preferences
    const popularGenres = {
      GAME: ['Action', 'Adventure', 'RPG'],
      FILM: ['Drama', 'Action', 'Comedy'],
      SERIES: ['Drama', 'Comedy', 'Thriller'],
    };

    const preferredGenres = popularGenres[media.type];
    const matchingGenres = media.genres.filter(genre => 
      preferredGenres.includes(genre)
    );

    return matchingGenres.length / Math.max(media.genres.length, preferredGenres.length);
  }

  private static calculateRatingWeight(rating: number): number {
    // Normalize rating to 0-1 scale
    return Math.min(Math.max(rating / 10, 0), 1);
  }
}