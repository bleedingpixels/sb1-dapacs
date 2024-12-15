import React from 'react';
import { SongForm } from '../../SongForm/SongForm';
import { FileUpload } from '../../FileUpload/FileUpload';
import { SongList } from '../../SongList/SongList';
import { CreatePlaylistButton } from './CreatePlaylistButton';

export function Content({ 
  activeTab, 
  songs, 
  platform, 
  onAddSong, 
  onRemoveSong, 
  onSongsUpload,
  onCreatePlaylist,
  isCreating,
  error,
  isAuthenticated
}) {
  return (
    <div className="space-y-6">
      {activeTab === 'manual' ? (
        <SongForm onAddSong={onAddSong} />
      ) : (
        <FileUpload onSongsLoaded={onSongsUpload} />
      )}

      <SongList 
        songs={songs} 
        platform={platform} 
        onRemoveSong={onRemoveSong}
      />

      {songs.length > 0 && (
        <CreatePlaylistButton
          platform={platform}
          onCreatePlaylist={onCreatePlaylist}
          isCreating={isCreating}
          error={error}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  );
}