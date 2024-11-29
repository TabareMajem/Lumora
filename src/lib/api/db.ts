import { prisma } from '../db/client';

export async function query<T>(
  callback: (client: typeof prisma) => Promise<T>
): Promise<T> {
  try {
    return await callback(prisma);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}