
import React from 'react';
import MusicIcon from './icons/MusicIcon';

const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto flex items-center justify-center space-x-3 text-white">
        <MusicIcon className="w-8 h-8 text-cyan-400" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          ChordFinder AI
        </h1>
      </div>
       <p className="text-center text-gray-400 mt-2">Pencarian Chord Lagu Populer dengan AI</p>
    </header>
  );
};

export default Header;
