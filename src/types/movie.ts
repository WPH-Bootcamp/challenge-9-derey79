// TODO: Define TypeScript interfaces for Movie data
// Hint: Check TMDB API documentation for the movie object structure
// https://developer.themoviedb.org/reference/movie-details

export interface Movie {
  // TODO: Add movie properties based on TMDB API response
  // Examples: id, title, overview, poster_path, etc.
  // id: number;
  // title: string;
  // release_date: string;
  // overview: string;
  // poster_path: string;
  // vote_average: number;
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  backdrop_sizes?: string[];
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface HeroSectionProps {
  movie: Movie | null;
  onPlayClick?: () => void;
  onInfoClick?: () => void;
}

export interface MovieResponse {
  // TODO: Add pagination properties
  // Examples: page, results, total_pages, total_results
  page: number; // The current page number fetched
  results: Movie[]; // The actual array of movies used by your grids
  total_pages: number; // Total pages available in TMDB's database
  total_results: number; // Total item count globally
}

// TODO: Add more types as needed (Genre, Video, etc.)
export interface TMDBResponse {
  page: number;
  results: Movie[];
}

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CreditsResponse {
  id: number;
  cast: CastMember[];
}
