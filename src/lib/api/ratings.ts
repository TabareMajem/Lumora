import { ratingRepository, type DetailedRating } from '../db/repositories/ratingRepository';

export const ratingsApi = {
  async submitRating(rating: Omit<DetailedRating, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      return await ratingRepository.submitRating(rating);
    } catch (error) {
      console.error('Error submitting rating:', error);
      throw error;
    }
  },

  async getRatingsByMedia(mediaId: string) {
    try {
      return await ratingRepository.getRatings(mediaId);
    } catch (error) {
      console.error('Error getting ratings:', error);
      throw error;
    }
  },

  async getUserRating(userId: string, mediaId: string) {
    try {
      return await ratingRepository.getUserRating(userId, mediaId);
    } catch (error) {
      console.error('Error getting user rating:', error);
      throw error;
    }
  },

  async calculateAverageRatings(mediaId: string) {
    try {
      return await ratingRepository.calculateAverageRatings(mediaId);
    } catch (error) {
      console.error('Error calculating average ratings:', error);
      throw error;
    }
  }
};