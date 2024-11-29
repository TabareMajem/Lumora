import { db } from '../client';
import type { Recommendation } from '../../types';

export const recommendationRepository = {
  async findByUserId(userId: number) {
    const recommendations = await db.recommendations
      .where('userId')
      .equals(userId)
      .toArray();

    const mediaIds = recommendations.map((rec) => rec.mediaId);
    const media = await db.media.where('id').anyOf(mediaIds).toArray();

    return recommendations.map((rec) => ({
      ...rec,
      media: media.find((m) => m.id === rec.mediaId),
    }));
  },

  async create(data: Omit<Recommendation, 'id'>) {
    return db.recommendations.add({
      ...data,
      recommendedAt: new Date().toISOString(),
    });
  },

  async delete(id: number) {
    return db.recommendations.delete(id);
  }
};