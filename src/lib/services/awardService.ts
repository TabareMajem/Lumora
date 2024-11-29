import { db } from '../db';
import { getAwardSignificance } from '../constants/awards';
import type { Award, Media } from '../types';

export const awardService = {
  async addAward(data: Omit<Award, 'id' | 'significance'>) {
    const significance = getAwardSignificance(data.name, data.category);
    return db.awards.add({ ...data, significance });
  },

  async getMediaAwards(mediaId: number) {
    return db.awards.where('mediaId').equals(mediaId).toArray();
  },

  async calculateAwardScore(mediaId: number): Promise<number> {
    const awards = await this.getMediaAwards(mediaId);
    if (!awards.length) return 0;

    // Calculate weighted score based on award significance and winner status
    const totalScore = awards.reduce((score, award) => {
      const winnerMultiplier = award.winner ? 1 : 0.5; // Nominations worth half of wins
      return score + (award.significance * winnerMultiplier);
    }, 0);

    // Normalize to 0-1 range (assuming max possible score of 100)
    return Math.min(totalScore / 100, 1);
  },

  async getTopAwardWinners(type?: Media['type'], limit = 10) {
    const media = await db.media.toArray();
    const mediaWithAwards = await Promise.all(
      media.map(async item => ({
        ...item,
        awardScore: await this.calculateAwardScore(item.id!),
      }))
    );

    return mediaWithAwards
      .filter(m => !type || m.type === type)
      .sort((a, b) => b.awardScore - a.awardScore)
      .slice(0, limit);
  },

  async getAwardSummary(mediaId: number) {
    const awards = await this.getMediaAwards(mediaId);
    const wins = awards.filter(a => a.winner);
    const nominations = awards.filter(a => !a.winner);

    return {
      totalAwards: awards.length,
      wins: wins.length,
      nominations: nominations.length,
      majorAwards: awards.filter(a => a.significance >= 9).length,
      recentAwards: awards.filter(a => a.year >= new Date().getFullYear() - 2).length,
    };
  },
};