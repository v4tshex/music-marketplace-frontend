import axios from 'axios';

// Determine the API base URL using Vite environment variables
const getApiBaseUrl = () => {
  // Use Vite environment variable with fallback logic
  const apiUrl = import.meta.env.VITE_API_URL;
  
  if (apiUrl) {
    return apiUrl;
  }
  
  // Fallback for development if no env var is set
  if (import.meta.env.DEV) {
    return 'http://localhost:5000';
  }
  
  // Default fallback for production (should not reach here if env vars are properly set)
  console.warn('VITE_API_URL not set, using default production URL');
  return '/api';
};

const baseURL = getApiBaseUrl();

// Debug logging to help troubleshoot environment detection
console.log('API Base URL:', baseURL);
console.log('Environment details:', {
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  VITE_API_URL: import.meta.env.VITE_API_URL
});

const API = axios.create({ 
  baseURL,
  timeout: 10000
});

// Export API instance for direct use
export const api = API;

export const getSongs = () => API.get('/metadata');
export const getSong = (id) => API.get(`/metadata/${id}`);
export const searchSongs = (searchTerm, page = 1, limit = 10) => 
  API.get(`/search?q=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`);
export const searchArtists = (searchTerm, page = 1, limit = 10) => 
  API.get(`/artists?q=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`);
export const getArtistSongs = (artistId, page = 1, limit = 12) => 
  API.get(`/artists/${artistId}/songs?page=${page}&limit=${limit}`);
export const uploadSong = (file) => API.post('/upload', file);
export const calculateRoyalties = (songId, numberOfPlays) => API.post('/calculate-royalty', { songId, numberOfPlays });
export const simulatePayment = (artistId, totalAmount) => API.post('/simulate-payment', { artistId, totalAmount });

// User songs and purchases API
export const getUserSongs = () => API.get('/user-songs');
export const getUserPurchases = (userId) => API.get(`/purchases/${userId}`);
export const purchaseSong = (userId, songId, paymentData = null) => API.post('/purchase', { userId, songId, paymentData });

