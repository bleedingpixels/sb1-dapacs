// src/utils/spotify.js

import axios from 'axios';
import Fuse from 'fuse.js';

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const SCOPES = ['playlist-modify-public', 'playlist-modify-private'];

/**
 * Generates the Spotify authentication URL.
 */
export const getSpotifyAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
    show_dialog: true, // Force showing the auth dialog
  });

  return `${SPOTIFY_AUTH_URL}?${params.toString()}`;
};

/**
 * Preprocesses song titles and artist names for better matching.
 */
const preprocessString = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/gi, ''); // Removes non-alphanumeric characters
};

/**
 * Creates a Spotify playlist and adds songs to it with improved matching.
 *
 * @param {string} accessToken - Spotify access token.
 * @param {string} playlistName - Name of the playlist to create.
 * @param {Array} songs - Array of song objects to add.
 * @returns {Object} - Created playlist details along with matched/unmatched songs.
 */
export const createSpotifyPlaylist = async (accessToken, playlistName, songs) => {
  if (!accessToken) {
    throw new Error('No access token available. Please connect to Spotify first.');
  }

  try {
    // Get current user's profile
    const { data: userProfile } = await axios.get(`${SPOTIFY_API_URL}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // Create playlist
    const { data: playlist } = await axios.post(
      `${SPOTIFY_API_URL}/users/${userProfile.id}/playlists`,
      {
        name: playlistName,
        description: 'Created with Playlist Manager',
        public: false,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // Initialize arrays to hold track URIs and unmatched songs
    const trackUris = [];
    const unmatchedSongs = [];

    // Define Fuse.js options for fuzzy searching
    const fuseOptions = {
      keys: ['name', 'artists.name'],
      threshold: 0.4, // Adjust based on desired strictness
    };

    // Iterate over each song to find the best match
    for (const song of songs) {
      const processedTitle = preprocessString(song.title);
      const processedArtist = preprocessString(song.artist);
      const query = `track:${processedTitle} artist:${processedArtist}`;

      const { data } = await axios.get(
        `${SPOTIFY_API_URL}/search`,
        {
          params: {
            q: query,
            type: 'track',
            limit: 5,
          },
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (data.tracks.items.length === 0) {
        console.warn(`No matches found for "${song.title}" by "${song.artist}".`);
        unmatchedSongs.push({
          ...song,
          suggestedMatch: null, // No suggestions available
        });
        continue;
      }

      // Use Fuse.js to find the best match among the top 5 results
      const fuse = new Fuse(data.tracks.items, fuseOptions);
      const result = fuse.search(processedTitle)[0];

      if (result) {
        const matchedTrack = result.item;
        trackUris.push(matchedTrack.uri);
        console.log(`Matched "${song.title}" to "${matchedTrack.name}" by "${matchedTrack.artists[0].name}".`);
      } else {
        console.warn(`No suitable match found for "${song.title}" by "${song.artist}".`);
        const topMatch = data.tracks.items[0];
        if (topMatch) {
          // Update song information to top match
          song.title = topMatch.name;
          song.artist = topMatch.artists[0].name;
          trackUris.push(topMatch.uri);
          console.log(`Updated song to top match: "${song.title}" by "${song.artist}".`);
        } else {
          unmatchedSongs.push({
            ...song,
            suggestedMatch: null, // No suggestions available
          });
        }
      }
    }

    // Add tracks to the playlist
    if (trackUris.length > 0) {
      await axios.post(
        `${SPOTIFY_API_URL}/playlists/${playlist.id}/tracks`,
        { uris: trackUris },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log('Tracks added to playlist successfully.');
    } else {
      console.warn('No valid tracks to add to the playlist.');
    }

    return {
      ...playlist,
      tracksAdded: trackUris.length,
      totalTracks: songs.length,
      unmatchedSongs,
    };
  } catch (error) {
    console.error('Error creating Spotify playlist:', error.response ? error.response.data : error.message);
    if (error.response?.status === 401) {
      throw new Error('Spotify session expired. Please reconnect your account.');
    }
    throw new Error(error.response?.data?.error?.message || 'Error creating Spotify playlist');
  }
};