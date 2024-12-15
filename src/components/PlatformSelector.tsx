import React from 'react';
import { FaSpotify, FaApple } from 'react-icons/fa';

interface PlatformSelectorProps {
  platform: 'spotify' | 'apple';
  onPlatformChange: (platform: 'spotify' | 'apple') => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  platform,
  onPlatformChange,
}) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onPlatformChange('spotify')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          platform === 'spotify'
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        <FaSpotify size={20} />
        <span>Spotify</span>
      </button>

      <button
        onClick={() => onPlatformChange('apple')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          platform === 'apple'
            ? 'bg-black text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        <FaApple size={20} />
        <span>Apple Music</span>
      </button>
    </div>
  );
}