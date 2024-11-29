import { db } from './index';
import type { Media } from './index';

export async function getMediaById(id: number) {
  return db.media.get(id);
}

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

export async function createMedia(data: Omit<Media, 'id'>) {
  return db.media.add(data);
}

export async function updateMedia(id: number, data: Partial<Media>) {
  return db.media.update(id, data);
}