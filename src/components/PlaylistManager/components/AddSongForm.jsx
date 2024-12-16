import React, { useState } from 'react';

export const AddSongForm = ({ onAddSong }) => {
  const [songData, setSongData] = useState({ title: '', artist: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!songData.title.trim()) return; // Only validate title
    
    // Submit with optional artist
    onAddSong({
      title: songData.title.trim(),
      artist: songData.artist.trim() || undefined // Use undefined for empty artist
    });
    
    // Reset form
    setSongData({ title: '', artist: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <div className="flex-1">
        <input
          type="text"
          value={songData.title}
          onChange={(e) => setSongData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Song title (required)"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          value={songData.artist}
          onChange={(e) => setSongData(prev => ({ ...prev, artist: e.target.value }))}
          placeholder="Artist (optional)"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        disabled={!songData.title.trim()} // Only disable if title is empty
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Song
      </button>
    </form>
  );
};
