import React from 'react';

export const MovieSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col h-full animate-pulse">
      {/* Gambar Poster Kosong */}
      <div className="aspect-2/3 bg-gray-700 w-full"></div>

      {/* Info Teks Kosong */}
      <div className="p-4 flex flex-col grow space-y-3">
        {/* Bar Judul */}
        <div className="h-5 bg-gray-700 rounded w-3/4"></div>

        {/* Bar Tanggal */}
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>

        {/* Bar Deskripsi */}
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-gray-700 rounded"></div>
          <div className="h-3 bg-gray-700 rounded"></div>
          <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};
