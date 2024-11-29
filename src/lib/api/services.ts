import { userEndpoints, mediaEndpoints, assessmentEndpoints, recommendationEndpoints } from './endpoints';
import { hashPassword } from '../utils/auth';
import type { Media } from '../types';

// User service
export const userService = {
  async register(data: { username: string; email: string; password: string }) {
    const passwordHash = await hashPassword(data.password);
    const userId = await userEndpoints.register({
      username: data.username,
      email: data.email,
      passwordHash,
    });
    return userEndpoints.getProfile(userId);
  },

  async login(email: string, password: string) {
    const user = await userEndpoints.login(email);
    if (!user) throw new Error('Invalid email or password');

    const hashedPassword = await hashPassword(password);
    if (hashedPassword !== user.passwordHash) {
      throw new Error('Invalid email or password');
    }

    return user;
  },

  async getProfile(userId: number) {
    return userEndpoints.getProfile(userId);
  },

  async updateProfile(userId: number, data: { username?: string; email?: string }) {
    return userEndpoints.updateProfile(userId, data);
  }
};

// Media service
export const mediaService = {
  async search(query: string, type?: Media['type']) {
    return mediaEndpoints.search(query, type);
  },

  async getDetails(id: number) {
    const media = await mediaEndpoints.getById(id);
    if (!media) throw new Error('Media not found');
    return media;
  },

  async getRecommendations(userId: number) {
    return recommendationEndpoints.getForUser(userId);
  },

  async submitFeedback(userId: number, mediaId: number, feedback: { rating?: number; comment?: string }) {
    return recommendationEndpoints.submitFeedback(userId, mediaId, feedback);
  }
};

// Assessment service
export const assessmentService = {
  async getUserAssessments(userId: number) {
    return assessmentEndpoints.getByUserId(userId);
  },

  async submitAssessment(userId: number, type: string, scores: Record<string, number>) {
    return assessmentEndpoints.submit({
      userId,
      type,
      scores,
      completedAt: new Date().toISOString(),
    });
  }
};