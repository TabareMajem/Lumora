import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export async function searchMovies(query: string) {
  const response = await tmdbApi.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });

  return response.data.results;
}

export async function searchTVShows(query: string) {
  const response = await tmdbApi.get('/search/tv', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });

  return response.data.results;
}

export async function getMovieDetails(id: number) {
  const response = await tmdbApi.get(`/movie/${id}`, {
    params: {
      append_to_response: 'credits,videos,similar',
    },
  });

  return response.data;
}

export async function getTVShowDetails(id: number) {
  const response = await tmdbApi.get(`/tv/${id}`, {
    params: {
      append_to_response: 'credits,videos,similar',
    },
  });

  return response.data;
}