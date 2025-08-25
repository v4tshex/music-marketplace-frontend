import axios from 'axios';
import { auth } from '../firebase';

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
});

// Add request interceptor to include authentication token
API.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Export API instance for direct use
export const api = API;

export const getSongs = () => API.get('/metadata');
export const getSong = (id) => API.get(`/metadata/${id}`);
export const searchSongs = (searchTerm, page = 1, limit = 10, filters) => {
  // Backward compatible: if no filters passed, use existing query
  if (!filters) {
    return API.get(`/search?q=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`);
  }
  const params = new URLSearchParams();
  if (searchTerm !== undefined && searchTerm !== null) params.set('q', searchTerm);
  params.set('page', String(page));
  params.set('limit', String(limit));
  if (filters.explicit !== undefined) params.set('explicit', String(filters.explicit));
  if (filters.hasPreview !== undefined) params.set('hasPreview', String(filters.hasPreview));
  if (filters.minDurationSec !== undefined && filters.minDurationSec !== "") params.set('minDurationSec', String(filters.minDurationSec));
  if (filters.maxDurationSec !== undefined && filters.maxDurationSec !== "") params.set('maxDurationSec', String(filters.maxDurationSec));
  if (filters.sortBy) params.set('sortBy', filters.sortBy);
  if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);
  return API.get(`/search?${params.toString()}`);
};
export const searchArtists = (searchTerm, page = 1, limit = 10) => 
  API.get(`/artists?q=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`);
export const getArtistSongs = (artistId, page = 1, limit = 12) => 
  API.get(`/artists/${artistId}/songs?page=${page}&limit=${limit}`);
export const uploadSong = (file) => API.post('/upload', file);
export const calculateRoyalties = (songId, numberOfPlays) => API.post('/calculate-royalty', { songId, numberOfPlays });
export const simulatePayment = (artistId, totalAmount) => API.post('/simulate-payment', { artistId, totalAmount });

// User songs and purchases API
export const getUserSongs = () => API.get('/user-songs');
export const getRecentUserSongs = () => API.get('/recent-user-songs');
export const getUserPurchases = (userId) => API.get(`/purchases/${userId}`);
export const purchaseSong = (userId, songId, paymentData = null, songType) => API.post('/purchase', { userId, songId, paymentData, songType });
export const createUser = (userData) => API.post('/users', userData);
export const getUser = (userId) => API.get(`/users/${userId}`);
export const updateUser = (userId, userData) => API.put(`/users/${userId}`, userData);
export const getMySongs = (userId) => API.get(`/my-songs/${userId}`);
export const deleteSong = (songId) => API.delete(`/songs/${songId}`);