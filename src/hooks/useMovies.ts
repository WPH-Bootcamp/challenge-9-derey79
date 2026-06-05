import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';
import { type MovieResponse } from '@/types/movie';

// TODO: Create custom hooks using React Query
// Reference: https://tanstack.com/query/latest/docs/framework/react/overview

// Example: Hook to fetch popular movies
// export const usePopularMovies = () => {
//   // TODO: Implement useQuery hook
//   // Hint: Use movieService.getPopularMovies as queryFn
//   return useQuery({
//     queryKey: ['movies', 'popular'],
//     queryFn: () => {
//       // TODO: Call your movie service function
//       throw new Error('Not implemented');
//     },
//   });
// };
export const usePopularMovies = (page: number = 1) => {
  return useQuery<MovieResponse, Error>({
    queryKey: ['movies', 'popular', page],
    queryFn: () => movieService.getPopular(page),
    placeholderData: keepPreviousData,
  });
};

export const useSearchMovies = (query: string, page: number = 1) => {
  const trimmedQuery = query.trim();

  return useQuery<MovieResponse, Error>({
    queryKey: ['movies', 'search', trimmedQuery, page],
    queryFn: () => movieService.search(trimmedQuery, page),
    enabled: trimmedQuery !== '',
    placeholderData: keepPreviousData,
  });
};

// TODO: Add more hooks for different endpoints
// Examples: useMovieDetails, useSearchMovies, useNowPlayingMovies
export function useMovieDetail(id: number | string | null) {
  return useQuery({
    queryKey: ['movies', 'detail', id],
    queryFn: () => movieService.getMovieDetails(id!),
    enabled: id !== null && id !== undefined && id !== '', // Safety guard for empty IDs
  });
}

export const useNowPlayingMovies = (page = 1) => {
  return useQuery<MovieResponse, Error>({
    queryKey: ['movies', 'now-playing', page],
    queryFn: () => movieService.getNowPlayingMovies(page),
  });
};

// export function useCreateMovie() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (newMovie: CreateMovieInput) => movieService.create(newMovie),
//     onSuccess: () => {
//       // Otomatis refresh daftar film populer setelah sukses menambah data
//       queryClient.invalidateQueries({ queryKey: ['movies', 'popular'] });
//     },
//   });
// }
