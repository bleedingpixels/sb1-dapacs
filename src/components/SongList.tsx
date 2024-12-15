import React from 'react';
import { Song } from '../types/playlist';
import { FaSpotify, FaApple } from 'react-icons/fa';

interface SongListProps {
  songs: Song[];
  platform: 'spotify' | 'apple';
}

export const SongList: React.FC<SongListProps> = ({ songs, platform }) => {
  const PlatformIcon = platform === 'spotify' ? FaSpotify : FaApple;

  return (
    <div className="space-y-2">
      {songs.map((song, index) => (
        <div
          key={`${song.title}-${index}`}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <PlatformIcon 
              className={platform === 'spotify' ? 'text-green-500' : 'text-gray-900'} 
              size={20} 
            />
            <div>
              <h3 className="font-medium">{song.title}</h3>
              <p className="text-sm text-gray-600">{song.artist}</p>
            </div>
          </div>
          {song.duration && (
            <span className="text-sm text-gray-500">{song.duration}</span>
          )}
        </div>
      ))}
    </div>
  );
}