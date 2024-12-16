import React from 'react';
import { FaSpotify } from 'react-icons/fa';

interface PlatformSelectorProps {
  platform: 'spotify';
  onPlatformChange: (platform: 'spotify') => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  platform,
  onPlatformChange,
}) => {
  // Since we're only using Spotify, we can simplify this component
  return null; // Return null since we don't need this UI element right now
};

export default PlatformSelector;