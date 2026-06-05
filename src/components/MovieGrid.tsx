import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { usePopularMovies, useSearchMovies } from '@/hooks/useMovies';
import { MovieCard } from './ui/MovieCard';

// Type definitions for the lifted props
interface MovieGridProps {
  searchQuery: string;
}

// ==========================================
// 1. REUSABLE SKELETON COMPONENT
// ==========================================
function MovieCardSkeleton() {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col animate-pulse">
      {/* Aspect Ratio placeholder fix */}
      <div className="aspect-2/3 w-full bg-slate-700" />

      {/* Typography/Meta Placeholders */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="h-4 bg-slate-700 rounded-sm w-3/4 mb-2" />
          <div className="h-3 bg-slate-700 rounded-sm w-1/4" />
        </div>

        <div className="space-y-2">
          <div className="h-3 bg-slate-700 rounded-sm w-full" />
          <div className="h-3 bg-slate-700 rounded-sm w-full" />
          <div className="h-3 bg-slate-700 rounded-sm w-2/3" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. MAIN COMPONENT LAYOUT
// ==========================================
export default function MovieGrid({ searchQuery }: MovieGridProps) {
  const [page, setPage] = useState(1);

  // Debounce the state that comes from the props
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const isSearching = debouncedSearchQuery.trim() !== '';

  const popularQuery = usePopularMovies(page);
  const searchQueryResult = useSearchMovies(debouncedSearchQuery, page);

  const activeQuery = isSearching ? searchQueryResult : popularQuery;
  const { data, isLoading, isError, error, isFetching } = activeQuery;

  // Automatically reset back to page 1 when user types a new search keyword
  // useEffect(() => {
  //   setPage(1);
  // }, [debouncedSearchQuery]);

  if (isError)
    return (
      <div className="p-8 text-center text-red-500 font-medium bg-slate-900">
        Error: {(error as Error).message}
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto bg-black">
      {/* Title Header with data fetching indicator */}
      <div className="flex items-center gap-4">
        <h1 className="mb-8 pb-4 text-2xl font-extrabold text-white tracking-tight">New Release</h1>
      </div>
      {/* <header className="mb-8 pb-4 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {searchQuery ? `Mencari: "${searchQuery}"` : 'New Release'}
          </h1>
          {isFetching && (
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
        {!isLoading && data?.total_pages && (
          <span className="text-sm text-slate-400 font-medium">
            Halaman {page} dari {data.total_pages}
          </span>
        )}
      </header> */}

      {/* 3. CONDITIONAL LOADING DISPLAY STATE */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : data?.results?.length === 0 ? (
        <div className="p-12 text-center text-slate-400">No data found.</div>
      ) : (
        <div
          className={`transition-opacity duration-200 ${isFetching ? 'opacity-60' : 'opacity-100'}`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {data?.results?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {/* Pagination UI Controls Un-commented and stylized for Dark Mode */}
      {!isLoading && data?.total_pages && data.total_pages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1 || isFetching}
            className="border border-slate-700 bg-slate-800 text-slate-200 font-medium px-5 py-2 rounded-lg hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer text-sm"
          >
            &larr; Previous
          </button>
          <span className="text-sm font-semibold text-slate-400">
            {page} / {data.total_pages}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= data.total_pages || isFetching}
            className="border border-slate-700 bg-slate-800 text-slate-200 font-medium px-5 py-2 rounded-lg hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer text-sm"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
