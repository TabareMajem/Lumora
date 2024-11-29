import { db } from '../db';
import type { BartleType, AssessmentResponse } from '../types';

export const bartleService = {
  calculateResults(responses: AssessmentResponse[]): Record<BartleType, number> {
    const scores: Record<BartleType, number> = {
      ACHIEVER: 0,
      EXPLORER: 0,
      SOCIALIZER: 0,
      KILLER: 0,
    };

    // Count responses for each type
    responses.forEach((response) => {
      scores[response.selectedType]++;
    });

    // Convert to percentages
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return Object.fromEntries(
      Object.entries(scores).map(([type, score]) => [
        type,
        score / total,
      ])
    ) as Record<BartleType, number>;
  },

  async saveResults(userId: number, scores: Record<BartleType, number>) {
    return db.assessments.add({
      userId,
      type: 'BARTLE',
      scores,
      completedAt: new Date().toISOString(),
    });
  },

  async getLatestResults(userId: number) {
    return db.assessments
      .where({ userId, type: 'BARTLE' })
      .reverse()
      .first();
  },
};