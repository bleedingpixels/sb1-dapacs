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
    .replace(/['".,!?-]/g, '') // Remove more punctuation
    .replace(/\s+/g, ' ') // Normalize spaces
    .replace(/[&]/g, 'and')
    .replace(/feat\.|ft\./g, '') // Remove featuring indicators
    .replace(/\(.*?\)/g, '') // Remove content in parentheses
    .trim();
};

// Helper function to calculate similarity
const similarity = (str1, str2) => {
  const a = preprocessString(str1);
  const b = preprocessString(str2);
  return a === b ? 1 : (a.includes(b) || b.includes(a) ? 0.8 : 0);
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
    const addedSongs = new Set(); // Track added songs to prevent duplicates

    // Define Fuse.js options for fuzzy searching
    const fuseOptions = {
      keys: [{
        name: 'name',
        weight: 0.7
      }, {
        name: 'artists.name',
        weight: 0.3
      }],
      threshold: 0.6, // More tolerant threshold
      distance: 100, // Allow more characters between matches
      minMatchCharLength: 2
    };

    // Iterate over each song to find the best match
    for (const song of songs) {
      const processedTitle = preprocessString(song.title);
      const processedArtist = preprocessString(song.artist);
      const query = `${processedTitle}`; // Search primarily by title

      const { data } = await axios.get(
        `${SPOTIFY_API_URL}/search`,
        {
          params: {
            q: query,
            type: 'track',
            limit: 10,
            market: 'US', // Add market parameter to improve results
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

      // Sort tracks by popularity and filter duplicates
      const bestMatch = data.tracks.items
        .sort((a, b) => {
          // Calculate match scores
          const aScore = similarity(a.name, song.title) + 
                        (similarity(a.artists[0].name, song.artist) * 0.5) +
                        (a.popularity / 100 * 0.3);
          const bScore = similarity(b.name, song.title) + 
                        (similarity(b.artists[0].name, song.artist) * 0.5) +
                        (b.popularity / 100 * 0.3);
          return bScore - aScore;
        })
        .find(track => {
          const key = `${preprocessString(track.name)}-${preprocessString(track.artists[0].name)}`;
          if (!addedSongs.has(key)) {
            addedSongs.add(key);
            return true;
          }
          return false;
        });

      if (bestMatch) {
        trackUris.push(bestMatch.uri);
        console.log(`Added most popular version: "${bestMatch.name}" by "${bestMatch.artists[0].name}" (popularity: ${bestMatch.popularity})`);
      } else {
        unmatchedSongs.push({
          ...song,
          suggestedMatch: null, // No suggestions available
        });
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