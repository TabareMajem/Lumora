import { db } from '../db';
import type { User } from '../db';

export async function updateProfile(
  userId: number,
  data: { username?: string; email?: string }
): Promise<User> {
  await db.users.update(userId, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
  
  const user = await db.users.get(userId);
  if (!user) throw new Error('User not found');
  return user;
}

export async function getUserProfile(userId: number) {
  const user = await db.users.get(userId);
  if (!user) throw new Error('User not found');

  const assessments = await db.assessments
    .where('userId')
    .equals(userId)
    .toArray();

  return { ...user, assessments };
}