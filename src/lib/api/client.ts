import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export const api = {
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return apiClient.get(url, { params });
  },

  async post<T>(url: string, data?: any): Promise<T> {
    return apiClient.post(url, data);
  },

  async put<T>(url: string, data: any): Promise<T> {
    return apiClient.put(url, data);
  },

  async patch<T>(url: string, data: any): Promise<T> {
    return apiClient.patch(url, data);
  },

  async delete<T>(url: string): Promise<T> {
    return apiClient.delete(url);
  },
};