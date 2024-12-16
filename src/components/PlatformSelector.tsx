import React from 'react';
import { FaSpotify /* , FaApple */ } from 'react-icons/fa'; // Apple icon commented for future use

interface PlatformSelectorProps {
  platform: 'spotify' /* | 'apple' */; // Temporarily removed Apple Music
  onPlatformChange: (platform: 'spotify' /* | 'apple' */) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  platform,
  onPlatformChange,
}) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4">
      <h2 className="text-xl font-semibold mb-4">Select Platform</h2>
      <button
        onClick={() => onPlatformChange('spotify')}
        className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
      >
        <FaSpotify className="text-2xl" />
        Connect with Spotify
      </button>
      {/* Apple Music integration coming soon
      <button
        onClick={() => onPlatformChange('apple')}
        className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors"
      >
        <FaApple className="text-2xl" />
        Connect with Apple Music
      </button>
      */}
    </div>
  );
};

export default PlatformSelector;