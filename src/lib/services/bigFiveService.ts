import { db } from '../db';
import type { BigFiveType, Question } from '../types';

export const bigFiveService = {
  calculateResults(responses: { questionId: number; score: number }[], questions: Question[]): Record<BigFiveType, number> {
    const traitScores: Record<BigFiveType, { total: number; count: number }> = {
      OPENNESS: { total: 0, count: 0 },
      CONSCIENTIOUSNESS: { total: 0, count: 0 },
      EXTRAVERSION: { total: 0, count: 0 },
      AGREEABLENESS: { total: 0, count: 0 },
      NEUROTICISM: { total: 0, count: 0 },
    };

    // Calculate total scores for each trait
    responses.forEach((response) => {
      const question = questions.find(q => q.id === response.questionId);
      if (!question) return;

      const score = question.isReversed ? 6 - response.score : response.score;
      const trait = question.trait as BigFiveType;
      
      traitScores[trait].total += score;
      traitScores[trait].count++;
    });

    // Convert to percentages
    return Object.fromEntries(
      Object.entries(traitScores).map(([trait, { total, count }]) => [
        trait,
        (total / (count * 5)) // Normalize to 0-1 range
      ])
    ) as Record<BigFiveType, number>;
  },

  async saveResults(userId: number, scores: Record<BigFiveType, number>) {
    return db.assessments.add({
      userId,
      type: 'BIG_FIVE',
      scores,
      completedAt: new Date().toISOString(),
    });
  },

  async getLatestResults(userId: number) {
    return db.assessments
      .where({ userId, type: 'BIG_FIVE' })
      .reverse()
      .first();
  },
};