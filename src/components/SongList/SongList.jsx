import React from 'react';
import { FaSpotify, FaApple, FaTrash } from 'react-icons/fa';

export function SongList({ songs, platform, onRemoveSong }) {
  if (songs.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow">
        <p className="text-gray-500">No songs added yet. Start building your playlist!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow divide-y">
      {songs.map((song, index) => (
        <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            {platform === 'spotify' ? (
              <FaSpotify className="text-green-500" />
            ) : (
              <FaApple className="text-gray-900" />
            )}
            <div>
              <h3 className="font-medium">{song.title}</h3>
              <p className="text-sm text-gray-600">{song.artist}</p>
            </div>
          </div>
          <button 
            onClick={() => onRemoveSong(index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Remove song"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
}