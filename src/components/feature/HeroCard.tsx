import React from 'react';
import { IMAGE_SIZES } from '@/lib/constants';
import { Navbar } from '../layout/Navbar';
import { type Movie } from '@/types/movie';
import { Button } from '../ui/button';
import { PlayCircle } from 'lucide-react';

interface HeroSectionProps {
  movie: Movie | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPlayClick?: () => void;
  onInfoClick?: () => void;
}

const BASE_IMAGE_URL = 'https://images.tmdb.org/t/p/';

export const HeroCard: React.FC<HeroSectionProps> = ({
  movie,
  searchQuery,
  onSearchChange,
  onPlayClick,
  onInfoClick,
}) => {
  if (!movie) return null;

  // Uses backdrop large path if available, falls back to poster path
  const heroImageSrc = movie.backdrop_path
    ? `${BASE_IMAGE_URL}${IMAGE_SIZES.backdrop.large}${movie.backdrop_path}`
    : movie.poster_path
      ? `${BASE_IMAGE_URL}${IMAGE_SIZES.poster.large}${movie.poster_path}`
      : null;

  return (
    <section className="relative min-h-150 w-full bg-gray-950 font-sans text-white overflow-hidden">
      <Navbar searchQuery={searchQuery} onSearchChange={onSearchChange} />

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
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-12 lg:p-20 flex flex-col items-left text-left max-w-7xl mx-auto mb-12">
        {/* Judul Besar (Uses Display 3xl Custom Scale) */}
        <h1 className="text-display-2xl font-bold tracking-tight mb-4 uppercase drop-shadow-2xl max-w-2xl line-clamp-2">
          {movie.title}
        </h1>

        {/* Sinopsis (Uses Text lg Custom Scale) */}
        <p className="text-display-xs font-normal text-neutral-400 max-w-xl mb-8 line-clamp-3 md:line-clamp-4 drop-shadow">
          {movie.overview || 'Tidak ada ringkasan cerita untuk film ini.'}
        </p>

        {/* Tombol Aksi (Uses Design System Primary & Gray Tokens) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-30">
          <Button variant="heroPrimary" size="hero" onClick={onPlayClick}>
            Watch Trailer
            <PlayCircle className="fill-white stroke-red-800 ml-1 size-5" />
          </Button>

          <Button variant="heroSecondary" size="hero" onClick={onInfoClick}>
            See Detail
          </Button>
        </div>
      </div>
    </section>
  );
};
