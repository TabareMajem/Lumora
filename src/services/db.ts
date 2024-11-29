import { prisma } from '../lib/db';

export const db = {
  async query<T>(callback: (client: typeof prisma) => Promise<T>): Promise<T> {
    try {
      return await callback(prisma);
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  },
};