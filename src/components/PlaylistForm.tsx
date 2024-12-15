import React, { useState } from 'react';
import { Song } from '../types/playlist';

interface PlaylistFormProps {
  onAddSong: (song: Song) => void;
  platform: 'spotify' | 'apple';
}

export const PlaylistForm: React.FC<PlaylistFormProps> = ({ onAddSong, platform }) => {
  const [song, setSong] = useState<Song>({
    title: '',
    artist: '',
    album: '',
    duration: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (song.title && song.artist) {
      onAddSong(song);
      setSong({ title: '', artist: '', album: '', duration: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Song Title *
        </label>
        <input
          type="text"
          id="title"
          value={song.title}
          onChange={(e) => setSong({ ...song, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
          Artist *
        </label>
        <input
          type="text"
          id="artist"
          value={song.artist}
          onChange={(e) => setSong({ ...song, artist: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="album" className="block text-sm font-medium text-gray-700">
          Album
        </label>
        <input
          type="text"
          id="album"
          value={song.album}
          onChange={(e) => setSong({ ...song, album: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
          Duration
        </label>
        <input
          type="text"
          id="duration"
          value={song.duration}
          placeholder="3:45"
          onChange={(e) => setSong({ ...song, duration: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Song
      </button>
    </form>
  );
}