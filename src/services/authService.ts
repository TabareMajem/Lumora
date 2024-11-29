import { api } from './api';
import { hashPassword } from '../lib/utils/auth';
import type { User } from '../lib/db';

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const users = await api.get<User[]>('/users');
    const user = users.find(u => u.email === email);
    
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
    const hashedPassword = await hashPassword(data.password);
    const now = new Date().toISOString();

    const userId = await api.post<number>('/users', {
      username: data.username,
      email: data.email,
      passwordHash: hashedPassword,
      createdAt: now,
      updatedAt: now,
    });

    const user = await api.get<User>(`/users/${userId}`);
    if (!user) throw new Error('Failed to create user');
    return user;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  },

  async resetPassword(email: string): Promise<void> {
    // Implement password reset logic
    console.log('Password reset requested for:', email);
  }
};