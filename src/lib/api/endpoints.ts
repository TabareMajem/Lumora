import { db } from '../db';
import type { User, Media, Assessment, Recommendation } from '../types';

// User endpoints
export const userEndpoints = {
  async register(data: { username: string; email: string; passwordHash: string }) {
    const now = new Date().toISOString();
    return db.users.add({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
  },

  async login(email: string) {
    return db.users.where('email').equals(email).first();
  },

  async getProfile(userId: number) {
    const user = await db.users.get(userId);
    if (!user) throw new Error('User not found');

    const assessments = await db.assessments
      .where('userId')
      .equals(userId)
      .toArray();

    return { ...user, assessments };
  },

  async updateProfile(userId: number, data: Partial<User>) {
    await db.users.update(userId, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return db.users.get(userId);
  }
};

// Media endpoints
export const mediaEndpoints = {
  async getAll() {
    return db.media.toArray();
  },

  async getById(id: number) {
    return db.media.get(id);
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
    return db.media.get(id);
  },

  async delete(id: number) {
    return db.media.delete(id);
  }
};

// Assessment endpoints
export const assessmentEndpoints = {
  async getByUserId(userId: number) {
    return db.assessments
      .where('userId')
      .equals(userId)
      .toArray();
  },

  async submit(data: Omit<Assessment, 'id'>) {
    return db.assessments.add({
      ...data,
      completedAt: new Date().toISOString(),
    });
  }
};

// Recommendation endpoints
export const recommendationEndpoints = {
  async getForUser(userId: number) {
    const recommendations = await db.recommendations
      .where('userId')
      .equals(userId)
      .toArray();

    const mediaIds = recommendations.map(rec => rec.mediaId);
    const media = await db.media
      .where('id')
      .anyOf(mediaIds)
      .toArray();

    return recommendations.map(rec => ({
      ...rec,
      media: media.find(m => m.id === rec.mediaId)
    }));
  },

  async create(data: Omit<Recommendation, 'id'>) {
    return db.recommendations.add({
      ...data,
      recommendedAt: new Date().toISOString(),
    });
  },

  async submitFeedback(
    userId: number,
    mediaId: number,
    feedback: { rating?: number; comment?: string }
  ) {
    // Store feedback in recommendations
    const recommendation = await db.recommendations
      .where(['userId', 'mediaId'])
      .equals([userId, mediaId])
      .first();

    if (recommendation) {
      await db.recommendations.update(recommendation.id!, {
        ...recommendation,
        ...feedback,
        updatedAt: new Date().toISOString(),
      });
    }

    return true;
  }
};