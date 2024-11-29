import { db } from '../db';
import type { ValueType } from '../types';

export const valuesService = {
  calculateResults(responses: { questionId: number; type: ValueType }[]): Record<ValueType, number> {
    const scores: Record<ValueType, number> = {
      LEADERSHIP: 0,
      CREATIVITY: 0,
      EMPATHY: 0,
      DETERMINATION: 0,
      WISDOM: 0,
      INTEGRITY: 0,
      COLLABORATION: 0,
      INDEPENDENCE: 0,
    };

    // Count responses for each type
    responses.forEach((response) => {
      scores[response.type]++;
    });

    // Convert to percentages
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return Object.fromEntries(
      Object.entries(scores).map(([type, score]) => [
        type,
        score / total,
      ])
    ) as Record<ValueType, number>;
  },

  async saveResults(userId: number, scores: Record<ValueType, number>) {
    return db.assessments.add({
      userId,
      type: 'VALUES',
      scores,
      completedAt: new Date().toISOString(),
    });
  },

  async getLatestResults(userId: number) {
    return db.assessments
      .where({ userId, type: 'VALUES' })
      .reverse()
      .first();
  },
};