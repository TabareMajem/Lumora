import { db } from '../lib/db';
import { hashPassword } from '../lib/utils/auth';
import type { User } from '../lib/db';

export const auth = {
  async login(email: string, password: string): Promise<User> {
    const user = await db.users.where('email').equals(email).first();
    if (!user) throw new Error('Invalid email or password');

    const hashedPassword = await hashPassword(password);
    if (hashedPassword !== user.passwordHash) {
      throw new Error('Invalid email or password');
    }

    return user;
  },

  async register(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    const existingUser = await db.users.where('email').equals(data.email).first();
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const passwordHash = await hashPassword(data.password);
    const now = new Date().toISOString();

    const id = await db.users.add({
      username: data.username,
      email: data.email,
      passwordHash,
      createdAt: now,
      updatedAt: now,
    });

    const user = await db.users.get(id);
    if (!user) throw new Error('Failed to create user');
    return user;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  },

  async resetPassword(email: string): Promise<void> {
    const user = await db.users.where('email').equals(email).first();
    if (!user) return; // Don't reveal if email exists

    // TODO: Implement password reset
    console.log('Password reset requested for:', email);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};