import { api } from './api';
import type { Media } from '../lib/db';

export const mediaService = {
  async getMediaDetails(id: number): Promise<Media> {
    return api.get(`/media/${id}`);
  },

  async searchMedia(query: string, type?: Media['type']): Promise<Media[]> {
    const allMedia = await api.get<Media[]>('/media');
    return allMedia.filter(media => {
      const matchesQuery = 
        media.title.toLowerCase().includes(query.toLowerCase()) ||
        media.plotSummary.toLowerCase().includes(query.toLowerCase());
      return type ? matchesQuery && media.type === type : matchesQuery;
    });
  },

  async getRecommendations(userId: number): Promise<Media[]> {
    return api.get(`/recommendations/${userId}`);
  },

  async createMedia(data: Omit<Media, 'id'>): Promise<number> {
    return api.post('/media', data);
  },

  async updateMedia(id: number, data: Partial<Media>): Promise<void> {
    return api.put(`/media/${id}`, data);
  },

  async deleteMedia(id: number): Promise<void> {
    return api.delete(`/media/${id}`);
  }
};