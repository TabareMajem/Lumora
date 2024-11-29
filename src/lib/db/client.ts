import Dexie, { type Table } from 'dexie';
import type { User, Media, Assessment, Recommendation, Award } from '../types';

export class LumoraDB extends Dexie {
  users!: Table<User>;
  media!: Table<Media>;
  assessments!: Table<Assessment>;
  recommendations!: Table<Recommendation>;
  awards!: Table<Award>;

  constructor() {
    super('lumora');
    this.version(2).stores({
      users: '++id, username, email',
      media: '++id, title, type',
      assessments: '++id, userId, type',
      recommendations: '++id, userId, mediaId',
      awards: '++id, mediaId, name, year, category',
    });
  }
}

export const db = new LumoraDB();