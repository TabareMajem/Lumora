import { api } from './api';
import type { User, Assessment } from '../lib/db';

export const profileService = {
  async getProfile(userId: number): Promise<User> {
    return api.get(`/users/${userId}`);
  },

  async updateProfile(userId: number, data: Partial<User>): Promise<void> {
    return api.put(`/users/${userId}`, data);
  },

  async submitAssessment(
    userId: number,
    assessmentType: string,
    result: Record<string, number>
  ): Promise<void> {
    return api.post('/assessments', {
      userId,
      type: assessmentType,
      scores: result,
      completedAt: new Date().toISOString(),
    });
  },

  async getAssessments(userId: number): Promise<Assessment[]> {
    return api.get(`/users/${userId}/assessments`);
  }
};