import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SpotifyCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = () => {
      try {
        // Check for error parameters first
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('error')) {
          throw new Error(searchParams.get('error_description') || 'Authentication failed');
        }

        // Parse hash parameters
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');

        if (!accessToken) {
          throw new Error('No access token received');
        }

        localStorage.setItem('spotifyAccessToken', accessToken);
        navigate('/');
      } catch (err) {
        setError(err.message);
        console.error('Authentication error:', err);
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Return to App
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Connecting to Spotify...</p>
      </div>
    </div>
  );
}