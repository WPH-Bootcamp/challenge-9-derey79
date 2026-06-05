import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; // 1. Import useQuery
import { movieService } from '@/services/movieService'; // 2. Import your service

export default function MovieLayout() {
  const [page, setPage] = useState(1);

  // 1. Ambil Data Film (GET) langsung menggunakan movieService.getPopular
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => movieService.getPopular(page),
  });

  if (isLoading) return <div className="p-4 text-center">Loading movies from API...</div>;
  if (isError) return <div className="p-4 text-red-500">Error: {(error as Error).message}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar Film Populer (Halaman {page})</h1>

      {/* Display Query Data */}
      <div className="space-y-3">
        {data?.results.map((movie) => (
          <div key={movie.id} className="p-4 border rounded shadow-sm bg-white">
            <h3 className="font-bold text-lg">{movie.title}</h3>
            <p className="text-gray-600 text-sm">{movie.overview}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button onClick={() => setPage((prev) => prev + 1)} className="border px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
}
