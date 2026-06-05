import React from 'react';
import { IMAGE_SIZES } from '@/lib/constants';
import type { Movie } from '@/types/movie';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (id: number) => void;
}

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://tmdb.org';

export const MovieGrids: React.FC<MovieGridProps> = ({ movies, onMovieClick }) => {
  // Empty State fallback when search matches nothing
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
        <span className="text-4xl mb-2">🔍</span>
        <p className="text-lg font-medium">Film tidak ditemukan</p>
        <p className="text-sm text-gray-500 mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* SECTION TITLE */}
      <h2 className="text-xl md:text-2xl font-bold mb-6 tracking-wide drop-shadow-md">
        Film Populer Hari Ini
      </h2>

      {/* RESPONSIVE CSS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie.id)} />
        ))}
      </div>
    </div>
  );
};

/* ==========================================
   INTERNAL ISOLATED SUB-COMPONENT: MOVIE CARD
   ========================================== */
interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  // Uses poster path, falls back to null if completely missing
  const posterSrc = movie.poster_path
    ? `${IMAGE_BASE_URL}${IMAGE_SIZES.poster.medium || 'w500'}${movie.poster_path}`
    : null;

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col w-full text-left rounded-lg overflow-hidden bg-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-950 cursor-pointer"
    >
      {/* ASPECT RATIO POSTER CONTAINER */}
      <div className="relative aspect-2/3 w-full bg-gray-800 overflow-hidden">
        {posterSrc ? (
          <img
            src={posterSrc}
            alt={movie.title || 'Movie Poster'}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" // Native performance boost for scroll lists
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-xs text-gray-500 bg-gray-800">
            <span className="text-xl mb-1">🎬</span>
            <span className="line-clamp-2">{movie.title}</span>
          </div>
        )}

        {/* HOVER HOLLYWOOD GLASS OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3" />
      </div>

      {/* METADATA BLOCK PANEL */}
      <div className="p-3 flex flex-col gap-1 min-h-19 justify-between">
        <h3 className="text-sm font-semibold text-gray-100 line-clamp-2 group-hover:text-red-500 transition-colors duration-200">
          {movie.title}
        </h3>

        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
          {movie.release_date && <span>{new Date(movie.release_date).getFullYear()}</span>}
          {movie.vote_average !== undefined && movie.vote_average > 0 && (
            <span className="flex items-center gap-1 font-medium text-yellow-500">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
