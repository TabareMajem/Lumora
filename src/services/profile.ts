import { api } from '../lib/api/client';
import type { User, AssessmentResult } from '../types';

export const profile = {
  async get(userId: string): Promise<User> {
    return api.get(`/profile/${userId}`);
  },

  async update(userId: string, data: Partial<User>): Promise<User> {
    return api.patch(`/profile/${userId}`, data);
  },

  async submitAssessment(
    userId: string,
    assessmentType: string,
    result: AssessmentResult
  ): Promise<void> {
    return api.post(`/profile/${userId}/assessments`, {
      type: assessmentType,
      result,
    });
  },
};