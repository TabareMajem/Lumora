export interface User {
  id?: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id?: string;
  title: string;
  type: MediaType;
  genres: string[];
  plotSummary: string;
  releaseDate: string;
  ratings: number;
  platforms: string[];
  coverImageUrl: string;
  trailerUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Assessment {
  id?: string;
  userId: string;
  type: string;
  scores: Record<string, number>;
  completedAt: string;
}

export interface Award {
  id?: string;
  mediaId: string;
  name: string;
  year: number;
  category: string;
  winner: boolean;
}

export interface Game {
  id?: string;
  mediaId: string;
  steamId?: string;
  rawgId?: string;
  igdbId?: string;
  gameplayMechanics: string[];
  storytellingNarrative: string;
  visualAudioDesign: string;
  replayability: string;
  difficulty: string;
  socialInteraction: string;
  playerAgency: string;
  innovation: string;
  immersion: string;
}

export interface FilmSeries {
  id?: string;
  mediaId: string;
  imdbId?: string;
  omdbId?: string;
  tmdbId?: string;
  episodeCount?: number;
  seasonCount?: number;
}

export interface Recommendation {
  id?: string;
  userId: string;
  mediaId: string;
  score: number;
  recommendedAt: string;
}

export type MediaType = 'GAME' | 'FILM' | 'SERIES';

export interface AssessmentResult {
  type: string;
  scores: Record<string, number>;
  completedAt: string;
}