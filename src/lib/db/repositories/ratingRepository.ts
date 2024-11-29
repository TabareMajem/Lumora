import { db } from '../sqlite';
import { v4 as uuidv4 } from 'uuid';
import { stringifyJsonField, parseJsonField } from '../../utils/json';

export interface DetailedRating {
  id?: string;
  userId: string;
  mediaId: string;
  type: 'FILM' | 'SERIES' | 'GAME';
  scores: Record<string, number | string>;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const ratingRepository = {
  create: db.prepare(`
    INSERT INTO ratings (id, userId, mediaId, type, scores, comment, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `),

  update: db.prepare(`
    UPDATE ratings
    SET scores = ?, comment = ?, updatedAt = ?
    WHERE id = ?
  `),

  getByUserAndMedia: db.prepare(`
    SELECT * FROM ratings
    WHERE userId = ? AND mediaId = ?
  `),

  getByMedia: db.prepare(`
    SELECT * FROM ratings
    WHERE mediaId = ?
  `),

  getByUser: db.prepare(`
    SELECT * FROM ratings
    WHERE userId = ?
  `),

  delete: db.prepare(`
    DELETE FROM ratings
    WHERE id = ?
  `),

  async submitRating(data: Omit<DetailedRating, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const existing = this.getByUserAndMedia.get(data.userId, data.mediaId);

    if (existing) {
      return this.update.run(
        stringifyJsonField(data.scores),
        data.comment,
        now,
        existing.id
      );
    }

    return this.create.run(
      uuidv4(),
      data.userId,
      data.mediaId,
      data.type,
      stringifyJsonField(data.scores),
      data.comment,
      now,
      now
    );
  },

  async getRatings(mediaId: string) {
    const ratings = this.getByMedia.all(mediaId);
    return ratings.map(rating => ({
      ...rating,
      scores: parseJsonField(rating.scores),
    }));
  },

  async getUserRating(userId: string, mediaId: string) {
    const rating = this.getByUserAndMedia.get(userId, mediaId);
    if (!rating) return null;

    return {
      ...rating,
      scores: parseJsonField(rating.scores),
    };
  },

  async calculateAverageRatings(mediaId: string) {
    const ratings = await this.getRatings(mediaId);
    if (!ratings.length) return null;

    const scores = ratings.reduce((acc, rating) => {
      Object.entries(rating.scores).forEach(([key, value]) => {
        if (!acc[key]) acc[key] = [];
        acc[key].push(Number(value));
      });
      return acc;
    }, {} as Record<string, number[]>);

    return Object.entries(scores).reduce((acc, [key, values]) => {
      acc[key] = values.reduce((sum, val) => sum + val, 0) / values.length;
      return acc;
    }, {} as Record<string, number>);
  }
};