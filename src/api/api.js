import axios from 'axios';

// Determine the API base URL based on environment
const getApiBaseUrl = () => {
  // Check if we're running in a production environment
  const isProduction = process.env.NODE_ENV === 'production' || 
                      window.location.hostname !== 'localhost' && 
                      window.location.hostname !== '127.0.0.1';
  
  if (isProduction) {
    // In production, use relative URLs to leverage Azure Static Web Apps API proxy
    return '/api';
  } else if (window.location.port === '4280') {
    // When running with Azure Static Web Apps CLI (swa start)
    return '/api';
  } else {
    // Local development with Vite dev server
    return 'http://localhost:5000';
  }
};

const baseURL = getApiBaseUrl();

// Debug logging to help troubleshoot environment detection
console.log('API Base URL detected:', baseURL);
console.log('Environment details:', {
  NODE_ENV: process.env.NODE_ENV,
  hostname: window.location.hostname,
  port: window.location.port,
  href: window.location.href
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

