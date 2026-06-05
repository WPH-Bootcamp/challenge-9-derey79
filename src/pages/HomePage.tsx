import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieGrid from '@/components/MovieGrid';
import { MovieModal } from '@/components/MovieModal';
import { HeroCard } from '@/components/feature/HeroCard';
import type { Movie, TMDBResponse } from '@/types/movie';

export default function HomePage() {
  // const [movies, setMovies] = useState<Movie[]>([]);
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Added search state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchMovies = async () => {
      try {
        setLoading(true);

        const response = await axios.get<TMDBResponse>(`${BASE_URL}/movie/popular`, {
          params: {
            api_key: API_KEY,
            language: 'id-ID',
          },
          cancelToken: source.token,
        });

        const results = response.data.results;
        // setMovies(results || []);

        // Pilih 1 film secara acak dari hasil API untuk dikirim ke HeroSection
        if (results && results.length > 0) {
          const randomIndex = Math.floor(Math.random() * results.length);
          setHeroMovie(results[randomIndex]);
        }

        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request dibatalkan');
        } else if (axios.isAxiosError(err)) {
          const serverMessage = err.response?.data?.status_message || err.message;
          setError(serverMessage);
        } else {
          setError('Terjadi kesalahan sistem.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      source.cancel();
    };
  }, [API_KEY]);

  // Filter movies array based on user input
  // const filteredMovies = movies.filter((movie) =>
  //   movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* MEMANGGIL HERO SECTION */}
      {!loading && !error && heroMovie && (
        <HeroCard
          movie={heroMovie}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onPlayClick={() => alert('Fitur putar film segera hadir!')}
          // onInfoClick={() => setSelectedMovieId(heroMovie.id)}
          onInfoClick={() => {
            if (heroMovie) setSelectedMovieId(heroMovie.id);
          }}
        />
      )}

      {selectedMovieId !== null && (
        <MovieModal movieId={selectedMovieId} onClose={() => setSelectedMovieId(null)} />
      )}

      <MovieGrid searchQuery={searchQuery} />
    </div>
  );
}
