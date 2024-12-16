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
  if (!str) return '';
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
 * Matches a single song with Spotify's catalog
 */
export const findSpotifyMatch = async (accessToken, song) => {
  const processedTitle = preprocessString(song.title);
  const processedArtist = preprocessString(song.artist || '');
  const query = song.artist ? `${processedTitle} ${processedArtist}` : processedTitle;

  const { data } = await axios.get(
    `${SPOTIFY_API_URL}/search`,
    {
      params: {
        q: query,
        type: 'track',
        limit: 10,
        market: 'US',
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (data.tracks.items.length === 0) {
    return { matched: false, original: song };
  }

  const bestMatch = data.tracks.items
    .sort((a, b) => {
      const artistWeight = song.artist ? 0.5 : 0;
      const aScore = similarity(a.name, song.title) + 
                    (song.artist ? similarity(a.artists[0].name, song.artist) * artistWeight : 0) +
                    (a.popularity / 100 * 0.3);
      const bScore = similarity(b.name, song.title) + 
                    (song.artist ? similarity(b.artists[0].name, song.artist) * artistWeight : 0) +
                    (b.popularity / 100 * 0.3);
      return bScore - aScore;
    })[0];

  return {
    matched: true,
    original: song,
    spotifyUri: bestMatch.uri,
    matchedTitle: bestMatch.name,
    matchedArtist: bestMatch.artists[0].name,
    popularity: bestMatch.popularity
  };
};

/**
 * Creates a Spotify playlist and adds songs to it with improved matching.
 *
 * @param {string} accessToken - Spotify access token.
 * @param {string} playlistName - Name of the playlist to create.
 * @param {Array} matchedSongs - Array of matched song objects to add.
 * @returns {Object} - Created playlist details along with matched/unmatched songs.
 */
export const createSpotifyPlaylist = async (accessToken, playlistName, matchedSongs) => {
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

    // Add matched tracks to the playlist
    const trackUris = matchedSongs.filter(song => song.matched).map(song => song.spotifyUri);
    
    if (trackUris.length > 0) {
      await axios.post(
        `${SPOTIFY_API_URL}/playlists/${playlist.id}/tracks`,
        { uris: trackUris },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    }

    return {
      ...playlist,
      tracksAdded: trackUris.length,
      totalTracks: matchedSongs.length,
    };
  } catch (error) {
    console.error('Error creating Spotify playlist:', error.response ? error.response.data : error.message);
    if (error.response?.status === 401) {
      throw new Error('Spotify session expired. Please reconnect your account.');
    }
    throw new Error(error.response?.data?.error?.message || 'Error creating Spotify playlist');
  }
};