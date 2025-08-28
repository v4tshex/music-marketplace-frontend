import axios from 'axios';
import { auth } from '../firebase';

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_BASE_URL,
  
  timeout: 120000
});


API.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const api = API;

export const getSongs = () => API.get('/metadata');
export const getSong = (id) => API.get(`/metadata/${id}`);
export const searchSongs = (searchTerm, page = 1, limit = 10, filters) => {
  
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

export const uploadSong = (formData, onUploadProgress) =>
  API.post('/upload', formData, {
    
    timeout: 300000,
    onUploadProgress
  });
export const calculateRoyalties = (songId, numberOfPlays) => API.post('/calculate-royalty', { songId, numberOfPlays });
export const simulatePayment = (artistId, totalAmount) => API.post('/simulate-payment', { artistId, totalAmount });


export const getUserSongs = () => API.get('/user-songs');
export const getRecentUserSongs = () => API.get('/recent-user-songs');
export const getUserPurchases = (userId) => API.get(`/purchases/${userId}`);
export const purchaseSong = (userId, songId, paymentData = null, songType) => API.post('/purchase', { userId, songId, paymentData, songType });
export const createUser = (userData) => API.post('/users', userData);
export const getUser = (userId) => API.get(`/users/${userId}`);
export const updateUser = (userId, userData) => API.put(`/users/${userId}`, userData);
export const getMySongs = (userId) => API.get(`/my-songs/${userId}`);
export const deleteSong = (songId) => API.delete(`/songs/${songId}`);