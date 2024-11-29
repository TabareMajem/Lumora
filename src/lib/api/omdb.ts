import axios from 'axios';

const OMDB_API_KEY = 'a7a2602b';
const BASE_URL = 'http://www.omdbapi.com';

const omdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: OMDB_API_KEY,
  },
});

export interface OmdbMediaDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  totalSeasons?: string;
}

export interface DetailedRatings {
  // Cinema Categories
  picture: number;
  director: number;
  actor: number;
  actress: number;
  supportingActor: number;
  supportingActress: number;
  originalScreenplay: number;
  adaptedScreenplay: number;
  cinematography: number;
  editing: number;
  visualEffects: number;
  soundMixing: number;
  soundEditing: number;
  productionDesign: number;
  costumeDesign: number;
  makeupAndHairstyling: number;
  originalScore: number;
  originalSong: number;
  animatedFeature?: number;
  documentaryFeature?: number;

  // Additional Categories
  plotComplexity: 'Simple' | 'Moderate' | 'Complex';
  characterDevelopment: 'Minimal' | 'Moderate' | 'Extensive';
  emotionalDepth: 'Low' | 'Medium' | 'High';
  visualAestheticQuality: 'Basic' | 'Intermediate' | 'High-End';
  pacing: 'Slow' | 'Balanced' | 'Fast';
  themeAndMessage: string[];
  culturalRelevance: 'Low' | 'Medium' | 'High';
  innovation: 'Conventional' | 'Somewhat Original' | 'Highly Innovative';
  interactivity?: 'Non-Interactive' | 'Limited Interaction' | 'Highly Interactive';
}

export const omdbService = {
  async searchByTitle(title: string) {
    const response = await omdbApi.get('/', {
      params: {
        s: title,
        type: 'movie,series',
      },
    });

    if (response.data.Error) {
      throw new Error(response.data.Error);
    }

    return response.data.Search;
  },

  async getDetailsByImdbId(imdbId: string): Promise<OmdbMediaDetails> {
    const response = await omdbApi.get('/', {
      params: {
        i: imdbId,
        plot: 'full',
      },
    });

    if (response.data.Error) {
      throw new Error(response.data.Error);
    }

    return response.data;
  },

  async searchByTitleAndYear(title: string, year?: string) {
    const response = await omdbApi.get('/', {
      params: {
        t: title,
        y: year,
        plot: 'full',
      },
    });

    if (response.data.Error) {
      throw new Error(response.data.Error);
    }

    return response.data;
  },
};