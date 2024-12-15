import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Add axios for API requests

// ...existing code...

function SongSearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state

  // Debounce the search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const fetchSuggestions = async (searchTerm) => {
    setIsLoading(true);
    setError(null); // Reset error state
    try {
      const token = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN; // Use environment variable
      console.log('Spotify Access Token:', token); // Debug: Log the token

      if (!token) {
        throw new Error('Spotify access token is missing.');
      }

      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchTerm,
          type: 'track',
          limit: 5,
        },
      });
      console.log('Spotify API Response:', response.data); // Debug: Log response data

      if (response.data.tracks.items.length === 0) {
        setError('No songs found.');
      }

      setSuggestions(response.data.tracks.items);
    } catch (error) {
      console.error('Error fetching Spotify suggestions:', error);
      setError('Failed to fetch suggestions. Please check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestion = (track) => {
    setQuery(track.name);
    setResult({
      title: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
    });
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for a song..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {isLoading && <div className="absolute right-2 top-2">Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((track) => (
            <li
              key={track.id}
              onClick={() => handleSelectSuggestion(track)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {track.name} by {track.artists.map(artist => artist.name).join(', ')}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>} {/* Display error */}
      {result ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{result.title}</h3>
          <p className="text-gray-600">{result.artist}</p>
        </div>
      ) : (
        query.length > 2 && !isLoading && !error && <p className="mt-4 text-gray-600">No match found.</p>
      )}
    </div>
  );
}

// ...existing code...

export default SongSearch;