import { db } from '../lib/db';
import type { User, Media } from '../lib/db';

export const api = {
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 100));

    switch (endpoint) {
      case '/users':
        return db.users.toArray() as Promise<T>;
      case '/media':
        return db.media.toArray() as Promise<T>;
      default:
        throw new Error(`Endpoint ${endpoint} not implemented`);
    }
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 100));

    switch (endpoint) {
      case '/users':
        return db.users.add(data) as Promise<T>;
      case '/media':
        return db.media.add(data) as Promise<T>;
      default:
        throw new Error(`Endpoint ${endpoint} not implemented`);
    }
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const [resource, id] = endpoint.split('/').filter(Boolean);
    if (!id) throw new Error('ID is required for PUT requests');

    switch (resource) {
      case 'users':
        return db.users.update(Number(id), data) as Promise<T>;
      case 'media':
        return db.media.update(Number(id), data) as Promise<T>;
      default:
        throw new Error(`Resource ${resource} not implemented`);
    }
  },

  async delete(endpoint: string): Promise<void> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const [resource, id] = endpoint.split('/').filter(Boolean);
    if (!id) throw new Error('ID is required for DELETE requests');

    switch (resource) {
      case 'users':
        await db.users.delete(Number(id));
        break;
      case 'media':
        await db.media.delete(Number(id));
        break;
      default:
        throw new Error(`Resource ${resource} not implemented`);
    }
  }
};