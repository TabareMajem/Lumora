import Dexie, { type Table } from 'dexie';

export interface User {
  id?: number;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id?: number;
  title: string;
  type: 'GAME' | 'FILM' | 'SERIES';
  genres: string[];
  plotSummary: string;
  releaseDate: string;
  ratings: number;
  platforms: string[];
  coverImageUrl: string;
  trailerUrl?: string;
}

export interface Assessment {
  id?: number;
  userId: number;
  type: string;
  scores: Record<string, number>;
  completedAt: string;
}

export interface Recommendation {
  id?: number;
  userId: number;
  mediaId: number;
  score: number;
  recommendedAt: string;
}

class LumoraDB extends Dexie {
  users!: Table<User>;
  media!: Table<Media>;
  assessments!: Table<Assessment>;
  recommendations!: Table<Recommendation>;

  constructor() {
    super('lumora');
    this.version(1).stores({
      users: '++id, username, email',
      media: '++id, title, type',
      assessments: '++id, userId, type',
      recommendations: '++id, userId, mediaId',
    });
  }
}

export const db = new LumoraDB();