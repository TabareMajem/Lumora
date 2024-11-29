import { db } from '../db';
import type { Media } from '../db';

export async function searchMedia(query: string, type?: Media['type']) {
  return db.media
    .filter((media) => {
      const matchesQuery =
        media.title.toLowerCase().includes(query.toLowerCase()) ||
        media.plotSummary.toLowerCase().includes(query.toLowerCase());
      return type ? matchesQuery && media.type === type : matchesQuery;
    })
    .toArray();
}

export async function getMediaById(id: number) {
  return db.media.get(id);
}