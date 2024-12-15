import React from 'react';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Tabs } from '../Tabs/Tabs';
import { usePlaylist } from './hooks/usePlaylist';
import { SpotifyAuthButton } from '../SpotifyAuthButton';
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';

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
    createPlaylist
  } = usePlaylist();

  const { isAuthenticated } = useSpotifyAuth();

  return (
    <div className="space-y-6">
      <Header platform={platform} onPlatformChange={setPlatform} />
      
      <div className="flex justify-end">
        <SpotifyAuthButton />
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
      />
    </div>
  );
}