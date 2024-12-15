import React from 'react';
import { FaSpotify, FaApple } from 'react-icons/fa';
import './PlatformSelector.css';

export function PlatformSelector({ platform, onPlatformChange }) {
  return (
    <div className="platform-buttons">
      <button
        className={platform === 'spotify' ? 'active' : ''}
        onClick={() => onPlatformChange('spotify')}
      >
        <FaSpotify /> Spotify
      </button>
      <button
        className={platform === 'apple' ? 'active' : ''}
        onClick={() => onPlatformChange('apple')}
      >
        <FaApple /> Apple Music
      </button>
    </div>
  );
}