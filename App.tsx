
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ChordDisplay from './components/ChordDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import { Song, SearchQuery } from './types';
import { getSongChords } from './services/geminiService';

const App: React.FC = () => {
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (query: SearchQuery) => {
    setIsLoading(true);
    setError(null);
    setSong(null);
    try {
      const songData = await getSongChords(query);
      setSong(songData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const WelcomeMessage: React.FC = () => (
    <div className="text-center p-8 text-gray-400 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-gray-200">Selamat Datang di ChordFinder AI</h2>
      <p>Masukkan judul lagu dan nama artis di atas untuk memulai pencarian chord. AI kami akan mencarikan chord gitar yang paling akurat untuk Anda.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans bg-cover bg-center" style={{backgroundImage: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 1)), url(https://picsum.photos/1920/1080?blur=5&grayscale)'}}>
      <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center mt-8 space-y-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <div className="w-full">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {song && <ChordDisplay song={song} />}
            {!isLoading && !error && !song && <WelcomeMessage />}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
