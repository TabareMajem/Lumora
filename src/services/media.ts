import { api } from '../lib/api/client';
import type { Media, MediaType } from '../types';

export const media = {
  async getDetails(id: string): Promise<Media> {
    return api.get(`/media/${id}`);
  },

  async search(query: string, type?: MediaType): Promise<Media[]> {
    return api.get('/media/search', { query, type });
  },

  async getRecommendations(userId: string): Promise<Media[]> {
    return api.get('/media/recommendations', { userId });
  },
};