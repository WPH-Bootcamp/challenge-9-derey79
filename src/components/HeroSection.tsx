import React from 'react';
import { IMAGE_SIZES } from '@/lib/constants';

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average: number;
}

interface HeroSectionProps {
  movie: Movie | null;
  onPlayClick?: () => void;
  onInfoClick?: () => void;
}

const BASE_IMAGE_URL = 'https://images.tmdb.org/t/p/';

export const HeroSection: React.FC<HeroSectionProps> = ({ movie, onPlayClick, onInfoClick }) => {
  if (!movie) return null;

  // Uses backdrop large path if available, falls back to poster path
  const heroImageSrc = movie.backdrop_path
    ? `${BASE_IMAGE_URL}${IMAGE_SIZES.backdrop.large}${movie.backdrop_path}`
    : movie.poster_path
      ? `${BASE_IMAGE_URL}${IMAGE_SIZES.poster.large}${movie.poster_path}`
      : null;

  return (
    <section className="relative min-h-150 w-full bg-gray-950 font-sans text-white overflow-hidden">
      {/* BACKGROUND GRAPHIC FULL SCREEN */}
      <div className="absolute inset-0 z-0">
        {heroImageSrc ? (
          <>
            <img
              src={heroImageSrc}
              alt=""
              className="h-full w-full object-cover object-center opacity-85 brightness-95"
              loading="eager"
            />
            {/* Shadow and Vignette Overlays for Depth */}
            <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-gray-950/50" />
            <div className="absolute inset-0 bg-linear-to-r from-gray-950/80 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-400">
            Tidak ada poster film
          </div>
        )}

        {/* OVERLAY GRADASI (Tailwind v4 syntax) */}
        <div className="absolute inset-0 z-20 bg-linear-to-t from-gray-950 via-gray-950/80 md:via-gray-950/60 to-gray-950/40 md:to-gray-950/20" />
      </div>

      {/* KONTEN INFORMASI FILM */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-12 lg:p-20 flex flex-col items-center text-center max-w-4xl mx-auto mb-12">
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-yellow-400 mb-4 border border-white/10">
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span className="text-white/40">•</span>
          <span className="text-gray-300">
            {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
          </span>
        </div>

        {/* Judul Besar (Uses Display 3xl Custom Scale) */}
        <h1 className="text-display-2xl font-bold tracking-tight mb-4 uppercase drop-shadow-2xl max-w-2xl line-clamp-2">
          {movie.title}
        </h1>

        {/* Sinopsis (Uses Text lg Custom Scale) */}
        <p className="text-display-xs font-normal text-gray-300 max-w-xl mb-8 line-clamp-3 md:line-clamp-4 drop-shadow">
          {movie.overview || 'Tidak ada ringkasan cerita untuk film ini.'}
        </p>

        {/* Tombol Aksi (Uses Design System Primary & Gray Tokens) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-30">
          <button
            onClick={onPlayClick}
            className="cursor-pointer w-full sm:w-auto bg-primary-200 hover:bg-primary-300 text-white font-bold px-8 py-3.5 rounded-full transition-transform duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-primary-200/20 text-sm md:text-base"
          >
            ▶ Tonton Sekarang
          </button>
          <button
            onClick={onInfoClick}
            className="cursor-pointer w-full sm:w-auto bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 backdrop-blur-md hover:bg-white/20 active:scale-95 border border-white/20 text-sm md:text-base"
          >
            ℹ️ Detail Film
          </button>
        </div>
      </div>
    </section>
  );
};
