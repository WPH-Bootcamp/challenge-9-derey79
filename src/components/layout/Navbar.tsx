import React from 'react';
import Logo from '@/images/bxs_tv.png';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-linear-to-b from-gray-950/80 to-transparent backdrop-blur-xs px-6 md:px-12 lg:px-20 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Logo and Navigation Links */}
      <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-start">
        <div className="flex flex-wrap cursor-pointer">
          <img src={Logo} alt="MyLogo Icon" />
          <h1 className="text-display-xs font-black tracking-wider text-neutral-50 uppercase">
            Movie
          </h1>
        </div>

        <div className="flex items-center gap-6 text-text-lg font-medium text-gray-300">
          <a href="#home" className="hover:text-white transition-colors duration-200">
            Home
          </a>
          <a
            href="#favorites"
            className="hover:text-white transition-colors duration-200 flex items-center gap-1"
          >
            Favorites <span className="hidden xs:inline">Favorites</span>
          </a>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="relative w-full sm:w-72 md:w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
        <Input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-full rounded-3xl bg-neutral-800/80 border-neutral-200 transition-all focus-visible:ring-neutral-500"
          // Note: Shadcn uses focus-visible selectors instead of focus for outline styles
        />
      </div>
    </nav>
  );
};
