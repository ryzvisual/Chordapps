
import React from 'react';
import { Song } from '../types';

interface ChordDisplayProps {
  song: Song;
}

const ChordDisplay: React.FC<ChordDisplayProps> = ({ song }) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 md:p-8 w-full max-w-4xl mx-auto text-white">
      <div className="mb-6 pb-4 border-b border-gray-600">
        <h2 className="text-3xl font-bold text-cyan-400">{song.title}</h2>
        <h3 className="text-xl text-gray-300 mt-1">{song.artist}</h3>
      </div>
      <pre className="whitespace-pre-wrap font-mono text-sm md:text-base leading-relaxed overflow-x-auto">
        <code>{song.chords}</code>
      </pre>
    </div>
  );
};

export default ChordDisplay;
