import React, { useState } from 'react';
import { Song, Playlist } from './types/playlist';
import { SongList } from './components/SongList';
import { PlaylistForm } from './components/PlaylistForm';
import { PlatformSelector } from './components/PlatformSelector';

function App() {
  const [platform, setPlatform] = useState<'spotify' | 'apple'>('spotify');
  const [playlist, setPlaylist] = useState<Playlist>({
    name: 'My Playlist',
    songs: [],
    platform: 'spotify'
  });

  const handleAddSong = (song: Song) => {
    setPlaylist(prev => ({
      ...prev,
      songs: [...prev.songs, song]
    }));
  };

  const handlePlatformChange = (newPlatform: 'spotify' | 'apple') => {
    setPlatform(newPlatform);
    setPlaylist(prev => ({
      ...prev,
      platform: newPlatform
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Playlist Manager</h1>
        
        <PlatformSelector 
          platform={platform} 
          onPlatformChange={handlePlatformChange} 
        />

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Song</h2>
          <PlaylistForm onAddSong={handleAddSong} platform={platform} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Playlist</h2>
          {playlist.songs.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No songs added yet. Start building your playlist!
            </p>
          ) : (
            <SongList songs={playlist.songs} platform={platform} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;