import { z } from 'zod';

const mediaBaseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['GAME', 'FILM', 'SERIES']),
  genres: z.array(z.string()).min(1, 'At least one genre is required'),
  plotSummary: z.string().min(10, 'Plot summary must be at least 10 characters'),
  releaseDate: z.coerce.date(),
  ratings: z.number().min(0).max(10),
  platforms: z.array(z.string()),
  coverImageUrl: z.string().url('Cover image must be a valid URL'),
  trailerUrl: z.string().url('Trailer must be a valid URL').optional(),
});

export const gameSchema = mediaBaseSchema.extend({
  type: z.literal('GAME'),
  steamId: z.string().optional(),
  rawgId: z.string().optional(),
  igdbId: z.string().optional(),
  gameplayMechanics: z.array(z.string()),
  storytellingNarrative: z.string(),
  visualAudioDesign: z.string(),
  replayability: z.string(),
  difficulty: z.string(),
  socialInteraction: z.string(),
  playerAgency: z.string(),
  innovation: z.string(),
  immersion: z.string(),
});

export const filmSeriesSchema = mediaBaseSchema.extend({
  type: z.enum(['FILM', 'SERIES']),
  imdbId: z.string().optional(),
  omdbId: z.string().optional(),
  tmdbId: z.string().optional(),
  episodeCount: z.number().optional(),
  seasonCount: z.number().optional(),
});