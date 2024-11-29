import { db } from '../client';
import type { Media } from '../../types';

export const mediaRepository = {
  async findById(id: number) {
    return db.media.get(id);
  },

  async findAll() {
    return db.media.toArray();
  },

  async search(query: string, type?: Media['type']) {
    return db.media
      .filter((media) => {
        const matchesQuery =
          media.title.toLowerCase().includes(query.toLowerCase()) ||
          media.plotSummary.toLowerCase().includes(query.toLowerCase());
        return type ? matchesQuery && media.type === type : matchesQuery;
      })
      .toArray();
  },

  async create(data: Omit<Media, 'id'>) {
    return db.media.add(data);
  },

  async update(id: number, data: Partial<Media>) {
    await db.media.update(id, data);
    return this.findById(id);
  },

  async delete(id: number) {
    return db.media.delete(id);
  }
};