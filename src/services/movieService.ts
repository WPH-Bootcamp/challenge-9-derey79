import api from '@/lib/axios';
// import { Movie, MovieResponse } from '@/types/movie';
import type { Movie, MovieResponse } from '@/types/movie';

// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started

// export interface Movie {
//   id: number;
//   title: string;
//   overview: string;
//   poster_path: string;
//   release_date: string;
//   vote_average: number;
//   genre_ids: number[];
// }

// export interface MovieResponse {
//   page: number;
//   results: Movie[];
//   total_pages: number;
//   total_results: number;
// }

export interface CreateMovieInput {
  title: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
}

export const movieService = {
  // TODO: Implement getPopularMovies function
  // Endpoint: GET /movie/popular
  getPopular: async (page = 1): Promise<MovieResponse> => {
    return api.get('/movie/popular', { params: { page } });
  },

  // TODO: Implement getNowPlayingMovies function
  // Endpoint: GET /movie/now_playing
  getNowPlayingMovies: async (page = 1): Promise<MovieResponse> => {
    return api.get('/movie/now_playing', { params: { page } });
  },

  // TODO: Implement getMovieDetails function
  // Endpoint: GET /movie/{movie_id}
  getMovieDetails: async (id: number | string): Promise<Movie> => {
    return api.get(`/movie/${id}`);
  },

  // TODO: Implement searchMovies function
  // Endpoint: GET /search/movie
  search: async (query: string, page = 1): Promise<MovieResponse> => {
    return api.get('/search/movie', { params: { query, page } });
  },

  // TODO: Add more endpoints as needed

  /**
   * TMDB movie details endpoint: /movie/{id}
   */
  getById: async (id: number | string): Promise<Movie> => {
    return api.get(`/movie/${id}`);
  },

  /**
   * TMDB search endpoint pattern is: /search/movie
   */
};
