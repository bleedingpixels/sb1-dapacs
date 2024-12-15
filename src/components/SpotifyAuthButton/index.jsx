import React from 'react';
import { FaSpotify } from 'react-icons/fa';
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';

export function SpotifyAuthButton() {
  const { isAuthenticated, login, logout } = useSpotifyAuth();

  return (
    <button
      onClick={isAuthenticated ? logout : login}
      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
    >
      <FaSpotify />
      <span>{isAuthenticated ? 'Disconnect Spotify' : 'Connect Spotify'}</span>
    </button>
  );
}