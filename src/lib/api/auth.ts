import { db } from '../db';
import { hashPassword, verifyPassword } from '../utils/auth';
import type { User } from '../db';

export async function login(email: string, password: string): Promise<User> {
  const user = await db.users.where('email').equals(email).first();
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  return user;
}

export async function resetPassword(email: string): Promise<void> {
  const user = await db.users.where('email').equals(email).first();
  if (!user) {
    // Don't reveal whether the email exists
    return;
  }

  // TODO: Implement password reset email functionality
  console.log(`Password reset requested for ${email}`);
}