import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'; // Your custom default export Button
import { X, PlayCircle, Star, Film, Shield, Calendar } from 'lucide-react';
import type { CastMember, CreditsResponse } from '@/types/movie';

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  adult: boolean;
}

interface MovieModalProps {
  movieId: number;
  onClose: () => void;
}

export function MovieModal({ movieId, onClose }: MovieModalProps) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://tmdb.org';

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Parallelized network execution queries for optimal loading times
        const [detailRes, creditsRes] = await Promise.all([
          axios.get<MovieDetail>(`${BASE_URL}/movie/${movieId}`, {
            params: { api_key: API_KEY, language: 'id-ID' },
            cancelToken: source.token,
          }),
          axios.get<CreditsResponse>(`${BASE_URL}/movie/${movieId}/credits`, {
            params: { api_key: API_KEY },
            cancelToken: source.token,
          }),
        ]);

        setMovie(detailRes.data);
        setCast(creditsRes.data.cast.slice(0, 5)); // Restrict profile query display block limits strictly to 5 actors
        setError(null);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError('Gagal memuat detail film.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();

    return () => source.cancel();
  }, [movieId, API_KEY]);

  // Block base page scroll mechanics while the overlay layer window view context runs
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (error || !movie)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-red-500">
        <p>{error || 'Terjadi kesalahan sistem'}</p>
        <button onClick={onClose} className="ml-4 underline text-white">
          Tutup
        </button>
      </div>
    );

  // Formatted Local Date string mapping matching reference image geometry rules
  const formattedDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-y-auto font-sans text-white">
      {/* Absolute Close Controls Anchor Position Wrapper */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/40 hover:bg-zinc-800 border border-zinc-700 text-white transition cursor-pointer"
      >
        <X className="size-5" />
      </button>

      {/* 1. HERO HEADER AREA SECTION BANNER WINDOW COMPONENT */}
      <div
        className="relative min-h-[70vh] w-full bg-cover bg-center flex items-end px-6 md:px-16 pb-12"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.95)), url(${IMAGE_BASE_URL}original${movie.backdrop_path})`,
        }}
      >
        <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-8 items-center md:items-end z-10">
          {/* Main Structural Layout Image Floating Poster Component Block */}
          <div className="w-48 sm:w-56 md:w-64 aspect-2/3 rounded-xl overflow-hidden shadow-2xl border border-zinc-800 shrink-0">
            <img
              src={`${IMAGE_BASE_URL}w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Typography Metadata Titles Column Stack Container Frame */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-md">
              {movie.title}
            </h1>

            <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400 text-sm">
              <Calendar className="size-4" />
              <span>{formattedDate}</span>
            </div>

            {/* Recreated Dynamic Interactive Call To Action Row Controls Layout Group */}
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <Button
                variant="heroPrimary"
                size="hero"
                onClick={() => alert('Trailer segara hadir!')}
              >
                Watch Trailer
                <PlayCircle className="fill-white stroke-red-800 ml-1 size-5!" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BODY CONTENT LAYOUT SPACE AREA BLOCK */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-8 space-y-12">
        {/* Metric Info Boxes Panel Container Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-xl text-center flex flex-col items-center justify-center gap-1">
            <Star className="size-5 text-amber-400 fill-amber-400 mb-1" />
            <span className="text-xs text-zinc-500 font-bold tracking-wider uppercase">Rating</span>
            <span className="text-lg font-bold text-zinc-100">
              {movie.vote_average.toFixed(1)}/10
            </span>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-xl text-center flex flex-col items-center justify-center gap-1">
            <Film className="size-5 text-zinc-400 mb-1" />
            <span className="text-xs text-zinc-500 font-bold tracking-wider uppercase">Genre</span>
            <span className="text-lg font-bold text-zinc-100 truncate max-w-full">
              {movie.genres?.[0]?.name || 'N/A'}
            </span>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-xl text-center flex flex-col items-center justify-center gap-1">
            <Shield className="size-5 text-zinc-400 mb-1" />
            <span className="text-xs text-zinc-500 font-bold tracking-wider uppercase">
              Age Limit
            </span>
            <span className="text-lg font-bold text-zinc-100">{movie.adult ? '21+' : '13+'}</span>
          </div>
        </div>

        {/* Synopsis Paragraph Block Section Component Content Box */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold tracking-wide text-zinc-100">Overview</h2>
          <p className="text-sm sm:text-base leading-relaxed text-zinc-400 font-light max-w-4xl">
            {movie.overview || 'Sinopsis teks deskripsi film tidak tersedia untuk judul ini.'}
          </p>
        </div>

        {/* 3. CAST AND CREW COMPONENT PROFILE MAP RENDERING GRID BLOCK */}
        <div className="space-y-4 pb-12">
          <h2 className="text-xl font-bold tracking-wide text-zinc-100">Cast & Crew</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cast.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-2 bg-zinc-900/30 rounded-lg border border-zinc-900 hover:border-zinc-800 transition"
              >
                {/* Profile Circle Avatar Component Element Frame */}
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 shrink-0 shadow-inner">
                  {member.profile_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}w185${member.profile_path}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-zinc-600 font-bold">
                      N/A
                    </div>
                  )}
                </div>

                {/* Text Labels Stack Meta Area Box */}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-100 truncate leading-snug">
                    {member.name}
                  </p>
                  <p className="text-xs text-zinc-500 truncate mt-0.5">{member.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
