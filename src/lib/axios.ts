import axios from 'axios';

// TODO: Create axios instance with base configuration
// Hint: Use environment variables for API URL and API key
// Reference: https://axios-http.com/docs/instance
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const API_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  // TODO: Configure baseURL from environment variable
  // TODO: Add default headers (API key, content-type)
  baseURL: API_BASE_URL,
  timeout: 10000, // Batas waktu request 10 detik
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// TODO: Add request interceptor if needed
// Hint: You can add API key to every request here

// TODO: Add response interceptor for error handling
api.interceptors.request.use(
  (config) => {
    // Initialize query params object if it doesn't exist
    config.params = config.params || {};

    // 2. Automatically inject the TMDB API Key into the query string
    if (API_KEY) {
      config.params['api_key'] = API_KEY;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
