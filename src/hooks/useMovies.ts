import { useQuery } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';

// TODO: Create custom hooks using React Query
// Reference: https://tanstack.com/query/latest/docs/framework/react/overview

// Example: Hook to fetch popular movies
export const usePopularMovies = () => {
  // TODO: Implement useQuery hook
  // Hint: Use movieService.getPopularMovies as queryFn
  return useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => {
      // TODO: Call your movie service function
      throw new Error('Not implemented');
    },
  });
};

// TODO: Add more hooks for different endpoints
// Examples: useMovieDetails, useSearchMovies, useNowPlayingMovies
export function useMovieDetail(id: number | string) {
  return useQuery({
    queryKey: ['movies', 'detail', id],
    queryFn: () => movieService.getById(id),
    enabled: !!id, // Hanya jalan jika ID tersedia
  });
}

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
