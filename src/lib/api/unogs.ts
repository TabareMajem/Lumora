import axios from 'axios';

const UNOGS_API_KEY = import.meta.env.VITE_UNOGS_API_KEY;
const BASE_URL = 'https://unogs-unogs-v1.p.rapidapi.com/search';

const unogsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': UNOGS_API_KEY,
    'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com',
  },
});

export async function searchNetflixContent(query: string) {
  const response = await unogsApi.get('/titles', {
    params: {
      query,
      limit: '20',
      type: 'movie,series',
    },
  });
  return response.data.results;
}

export async function getNetflixAvailability(netflixId: string) {
  const response = await unogsApi.get(`/titles/${netflixId}/availability`);
  return response.data;
}