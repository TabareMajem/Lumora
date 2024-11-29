import axios from 'axios';

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

const rawgApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: RAWG_API_KEY,
  },
});

export interface GameDetails {
  id: number;
  name: string;
  description: string;
  released: string;
  background_image: string;
  rating: number;
  ratings_count: number;
  metacritic: number;
  genres: Array<{ id: number; name: string }>;
  platforms: Array<{ platform: { id: number; name: string } }>;
  developers: Array<{ id: number; name: string }>;
  publishers: Array<{ id: number; name: string }>;
  esrb_rating: { id: number; name: string } | null;
  screenshots: Array<{ id: number; image: string }>;
}

export interface GameRatings {
  gameplay: number;
  graphics: number;
  audio: number;
  story: number;
  performance: number;
  content: number;
  innovation: number;
  replayability: number;
}

export const rawgService = {
  async searchGames(query: string) {
    const response = await rawgApi.get('/games', {
      params: {
        search: query,
        page_size: 20,
      },
    });
    return response.data.results;
  },

  async getGameDetails(id: number): Promise<GameDetails> {
    const response = await rawgApi.get(`/games/${id}`);
    return response.data;
  },

  async getGameScreenshots(id: number) {
    const response = await rawgApi.get(`/games/${id}/screenshots`);
    return response.data.results;
  },

  async getGameAchievements(id: number) {
    const response = await rawgApi.get(`/games/${id}/achievements`);
    return response.data.results;
  },

  async getGameDLC(id: number) {
    const response = await rawgApi.get(`/games/${id}/additions`);
    return response.data.results;
  },

  async getGameSeries(id: number) {
    const response = await rawgApi.get(`/games/${id}/game-series`);
    return response.data.results;
  },
};