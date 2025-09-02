
import React, { useState } from 'react';
import { SearchQuery } from '../types';
import SearchIcon from './icons/SearchIcon';

interface SearchBarProps {
  onSearch: (query: SearchQuery) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && artist) {
      onSearch({ title, artist });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 max-w-2xl w-full mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul Lagu (cth: Hampa)"
          className="flex-grow bg-gray-900 border border-gray-600 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition duration-200"
          required
        />
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Nama Artis (cth: Ari Lasso)"
          className="flex-grow bg-gray-900 border border-gray-600 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition duration-200"
          required
        />
        <button
          type="submit"
          disabled={isLoading || !title || !artist}
          className="flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <SearchIcon className="w-5 h-5 mr-2" />
              Cari Chord
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
