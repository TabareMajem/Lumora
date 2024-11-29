import { db } from './index';
import type { Recommendation } from './index';

export async function getRecommendationsForUser(userId: number) {
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
}

export async function createRecommendation(data: Omit<Recommendation, 'id'>) {
  return db.recommendations.add({
    ...data,
    recommendedAt: new Date().toISOString(),
  });
}