import React from 'react';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Tabs } from '../Tabs/Tabs';
import { usePlaylist } from './hooks/usePlaylist';
import { SpotifyAuthButton } from '../SpotifyAuthButton';
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';
import { ThemeToggle } from '../ThemeToggle';

export function PlaylistManager() {
  const {
    songs,
    platform,
    activeTab,
    isCreating,
    error,
    unmatchedSongs,
    setPlatform,
    setActiveTab,
    handleAddSong,
    handleRemoveSong,
    handleSongsUpload,
    createPlaylist,
    clearSongs
  } = usePlaylist();

  const { isAuthenticated } = useSpotifyAuth();

  return (
    <div className="space-y-6 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center">
        <Header platform={platform} onPlatformChange={setPlatform} />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SpotifyAuthButton />
        </div>
      </div>
      
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <Content 
        activeTab={activeTab}
        songs={songs}
        platform={platform}
        onAddSong={handleAddSong}
        onRemoveSong={handleRemoveSong}
        onSongsUpload={handleSongsUpload}
        onCreatePlaylist={createPlaylist}
        isCreating={isCreating}
        error={error}
        isAuthenticated={isAuthenticated}
        unmatchedSongs={unmatchedSongs}
        onClearSongs={clearSongs}
      />
    </div>
  );
}