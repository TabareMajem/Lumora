import { db } from '../client';
import type { User } from '../../types';

export const userRepository = {
  async findById(id: number) {
    return db.users.get(id);
  },

  async findByEmail(email: string) {
    return db.users.where('email').equals(email).first();
  },

  async create(data: Omit<User, 'id'>) {
    return db.users.add({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  },

  async update(id: number, data: Partial<User>) {
    await db.users.update(id, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return this.findById(id);
  },

  async delete(id: number) {
    return db.users.delete(id);
  }
};