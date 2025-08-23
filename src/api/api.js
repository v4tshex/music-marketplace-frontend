import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// Export API instance for direct use
export const api = API;

export const getSongs = () => API.get('/metadata');
export const getSong = (id) => API.get(`/metadata/${id}`);
export const searchSongs = (searchTerm, page = 1, limit = 10) => 
  API.get(`/api/search?q=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`);
export const searchArtists = (searchTerm, page = 1, limit = 10) => 
  API.get(`/api/artists?q=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`);
export const getArtistSongs = (artistId, page = 1, limit = 12) => 
  API.get(`/api/artists/${artistId}/songs?page=${page}&limit=${limit}`);
export const uploadSong = (file) => API.post('/upload', file);
export const calculateRoyalties = (songId, numberOfPlays) => API.post('/calculate-royalty', { songId, numberOfPlays });
export const simulatePayment = (artistId, totalAmount) => API.post('/simulate-payment', { artistId, totalAmount });

// User songs and purchases API
export const getUserSongs = () => API.get('/api/user-songs');
export const getUserPurchases = (userId) => API.get(`/api/purchases/${userId}`);
export const purchaseSong = (userId, songId, paymentData = null) => API.post('/api/purchase', { userId, songId, paymentData });

