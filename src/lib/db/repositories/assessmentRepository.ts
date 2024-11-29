import { db } from '../client';
import type { Assessment } from '../../types';

export const assessmentRepository = {
  async findByUserId(userId: number) {
    return db.assessments
      .where('userId')
      .equals(userId)
      .toArray();
  },

  async create(data: Omit<Assessment, 'id'>) {
    return db.assessments.add({
      ...data,
      completedAt: new Date().toISOString(),
    });
  },

  async delete(id: number) {
    return db.assessments.delete(id);
  }
};