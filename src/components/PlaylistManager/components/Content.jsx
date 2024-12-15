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
  isAuthenticated,
  unmatchedSongs
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

      {unmatchedSongs.length > 0 && (
        <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
          <h4 className="text-yellow-800 font-semibold mb-2">Unmatched Songs</h4>
          <ul className="list-disc list-inside">
            {unmatchedSongs.map((song, index) => (
              <li key={index}>{`${song.title} by ${song.artist}`}</li>
            ))}
          </ul>
          <p className="text-yellow-700 mt-2">Please verify the song details or add them manually.</p>
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