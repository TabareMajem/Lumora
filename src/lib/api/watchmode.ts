import axios from 'axios';

const WATCHMODE_API_KEY = import.meta.env.VITE_WATCHMODE_API_KEY;
const BASE_URL = 'https://api.watchmode.com/v1';

const watchmodeApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: WATCHMODE_API_KEY,
  },
});

export async function getStreamingInfo(titleId: string) {
  const response = await watchmodeApi.get(`/title/${titleId}/sources/`);
  return response.data;
}

export async function searchTitle(query: string) {
  const response = await watchmodeApi.get('/search/', {
    params: {
      search_field: 'name',
      search_value: query,
    },
  });
  return response.data.title_results;
}