import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type Movie } from './HeroSection';
import { HeroSection } from './HeroSection';

// Simple custom hook to debounce user text inputs
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// Fetch function matching TMDB APIs
const fetchMovies = async (query: string): Promise<Movie[]> => {
  const endpoint = query
    ? `https://themoviedb.org{encodeURIComponent(query)}`
    : `https://themoviedb.org`;

  const res = await fetch(endpoint, {
    headers: {
      // Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) throw new Error('Gagal mengambil data film');
  const data = await res.json();
  return data.results || [];
};

export const MovieDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 400); // 400ms delay

  // TanStack Query Hooks watches the debounced text value
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movies', debouncedSearchQuery],
    queryFn: () => fetchMovies(debouncedSearchQuery),
    staleTime: 1000 * 60 * 5, // Cache entries for 5 minutes
  });

  // Pick the first result as our Hero target focus
  const heroMovie = movies && movies.length > 0 ? movies[0] : null;

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <HeroSection movie={heroMovie} searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Results UI Grid Segment */}
      <div className="px-6 md:px-12 lg:px-20 py-8">
        {isLoading && <p className="text-gray-400">Sedang memuat data...</p>}
        {isError && <p className="text-red-400">Terjadi kesalahan sistem saat mengambil data.</p>}

        {!isLoading && movies && (
          <div className="mt-6">
            <h2 className="text-text-lg font-bold mb-4">
              {debouncedSearchQuery
                ? `Hasil Pencarian untuk "${debouncedSearchQuery}"`
                : 'Film Populer Hari Ini'}
            </h2>
            {/* Render secondary results collection here below the hero */}
          </div>
        )}
      </div>
    </div>
  );
};
