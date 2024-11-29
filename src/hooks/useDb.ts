import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';

export function useUser(id: number) {
  return useLiveQuery(() => db.users.get(id), [id]);
}

export function useMedia(id: number) {
  return useLiveQuery(() => db.media.get(id), [id]);
}

export function useRecommendations(userId: number) {
  return useLiveQuery(async () => {
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
  }, [userId]);
}