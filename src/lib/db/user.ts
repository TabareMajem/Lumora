import { db } from './index';
import type { User } from './index';

export async function getUserById(id: number) {
  return db.users.get(id);
}

export async function createUser(data: Omit<User, 'id'>) {
  return db.users.add({
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export async function updateUser(id: number, data: Partial<User>) {
  return db.users.update(id, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export async function getUserByEmail(email: string) {
  return db.users.where('email').equals(email).first();
}