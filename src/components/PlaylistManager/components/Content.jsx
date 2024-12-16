import React, { useState } from 'react';
import { SongForm } from '../../SongForm/SongForm';
import { FileUpload } from '../../FileUpload/FileUpload';
import { SongList } from '../../SongList/SongList';
import { CreatePlaylistButton } from './CreatePlaylistButton';

export const Content = ({
  activeTab,
  songs = [], // Add default value
  platform,
  onAddSong,
  onRemoveSong,
  onSongsUpload,
  onCreatePlaylist,
  isCreating,
  error,
  isAuthenticated,
  unmatchedSongs = [], // Add default value
}) => {
  const [playlistName, setPlaylistName] = useState('');

  return (
    <div className="space-y-6">
      {activeTab === 'manual' && (
        <div className="space-y-4">
          <SongForm onAddSong={onAddSong} />
          {Array.isArray(songs) && songs.length > 0 && ( // Add null check
            <SongList songs={songs} onRemoveSong={onRemoveSong} />
          )}
        </div>
      )}

      {activeTab === 'upload' && (
        <FileUpload onSongsUpload={onSongsUpload} />
      )}

      {Array.isArray(songs) && songs.length > 0 && ( // Add null check
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Enter playlist name"
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={() => onCreatePlaylist(playlistName)}
              disabled={!playlistName.trim() || isCreating || !isAuthenticated}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? 'Creating...' : 'Create Playlist'}
            </button>
          </div>
        </div>
      )}

      {unmatchedSongs.length > 0 && (
        <div className="p-4 bg-red-100 border border-red-300 rounded">
          <h4 className="text-red-800 font-semibold mb-2">Unmatched Songs</h4>
          <ul className="list-disc list-inside">
            {unmatchedSongs.map((song, index) => (
              <li key={index}>
                {`${song.title} by ${song.artist}`}
                {/* Add a button or link to manually search and add the correct song */}
              </li>
            ))}
          </ul>
          <p className="text-red-700 mt-2">Please verify the song details or add them manually.</p>
        </div>
      )}

      {error && (
        <div className="text-red-500">{error}</div>
      )}
    </div>
  );
};