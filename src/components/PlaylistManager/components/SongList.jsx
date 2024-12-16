import React from 'react';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

export const SongList = ({ songs, onRemoveSong }) => {
  return (
    <ul className="space-y-2">
      {songs.map((song, index) => (
        <li key={index} className="flex items-center justify-between p-2 bg-white rounded shadow">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {song.matched ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaTimes className="text-red-500" />
              )}
              <div className="flex flex-col">
                <span>
                  <span className="font-medium">{song.title}</span>
                  <span className="text-gray-500"> by </span>
                  <span className="text-gray-700">{song.artist}</span>
                </span>
                {song.matched && (song.originalTitle !== song.title || song.originalArtist !== song.artist) && (
                  <span className="text-sm text-gray-500">
                    Originally: {song.originalTitle}
                    {song.originalArtist && ` by ${song.originalArtist}`}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => onRemoveSong(index)}
            className="p-1 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </li>
      ))}
    </ul>
  );
};
