import React from 'react';
import { Search, Play } from 'lucide-react';

export const MovieHero: React.FC = () => {
  return (
    <div className="relative min-h-150 w-full bg-gray-950 font-sans text-white overflow-hidden">
      {/* 1. Background Image Wrapper */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://unsplash.com" /* Replace with your actual hero graphic url */
          alt="The Gorge Background"
          className="h-full w-full object-cover object-center opacity-40 brightness-75"
        />
        {/* Shadow and Vignette Overlays for Depth */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-gray-950/50" />
        <div className="absolute inset-0 bg-linear-to-r from-gray-950/80 via-transparent to-transparent" />
      </div>

      {/* 2. Absolute Content Overlay */}
      <div className="relative z-10 flex flex-col min-h-150 max-w-7xl mx-auto px-6 md:px-12">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer">
              <span className="text-xl">📺</span>
              <span>Movie</span>
            </div>
            {/* Nav Menu */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
              <a href="#home" className="text-white hover:text-primary-200 transition-colors">
                Home
              </a>
              <a href="#favorites" className="hover:text-primary-200 transition-colors">
                Favorites
              </a>
            </nav>
          </div>

          {/* Search Bar Input */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-full max-w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Movie"
              className="w-full bg-gray-900/60 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary-200 focus:ring-1 focus:ring-primary-200 placeholder-gray-500 backdrop-blur-sm"
            />
          </div>
        </header>

        {/* Hero Copy Info */}
        <main className="flex-1 flex flex-col justify-center max-w-xl md:pb-12">
          {/* Main Title - Matches Display 3xl scale */}
          <h1 className="text-display-3xl font-extrabold tracking-tight mb-4 leading-tight">
            The Gorge
          </h1>

          {/* Description - Matches Text xl/lg scales */}
          <p className="text-text-lg font-normal text-gray-300 mb-8 leading-relaxed">
            Two highly trained operatives grow close from a distance after being sent to guard
            opposite sides of a mysterious gorge. When an evil below emerges, they must work
            together to survive what lies within.
          </p>

          {/* Call to Actions Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg hover:scale-[1.02] text-sm">
              Watch Trailer
              <Play className="h-4 w-4 fill-current" />
            </button>
            <button className="bg-gray-900/80 hover:bg-gray-800 text-white border border-gray-800 font-semibold px-6 py-3 rounded-full transition-all backdrop-blur-sm text-sm">
              See Detail
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
