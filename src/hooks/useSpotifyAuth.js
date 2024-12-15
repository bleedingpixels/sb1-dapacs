import { useState, useEffect } from 'react';
import { getSpotifyAuthUrl } from '../utils/spotify';

export function useSpotifyAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('spotifyAccessToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const login = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  const logout = () => {
    localStorage.removeItem('spotifyAccessToken');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  };
}