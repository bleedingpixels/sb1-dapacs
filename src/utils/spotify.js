import axios from 'axios';

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const SCOPES = ['playlist-modify-public', 'playlist-modify-private'];

export const getSpotifyAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
    show_dialog: true // Force showing the auth dialog
  });

  return `${SPOTIFY_AUTH_URL}?${params.toString()}`;
};

export const createSpotifyPlaylist = async (accessToken, userId, playlistName, songs) => {
  if (!accessToken) {
    throw new Error('No access token available. Please connect to Spotify first.');
  }

  try {
    // Get current user's profile first
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

    // Search and add tracks
    const trackUris = await Promise.all(
      songs.map(async (song) => {
        try {
          const query = `track:${song.title} artist:${song.artist}`;
          const { data } = await axios.get(
            `${SPOTIFY_API_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          return data.tracks.items[0]?.uri;
        } catch (error) {
          console.warn(`Could not find track: ${song.title} by ${song.artist}`);
          return null;
        }
      })
    );

    // Add tracks to playlist
    const validTrackUris = trackUris.filter(Boolean);
    if (validTrackUris.length > 0) {
      await axios.post(
        `${SPOTIFY_API_URL}/playlists/${playlist.id}/tracks`,
        { uris: validTrackUris },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    }

    return {
      ...playlist,
      tracksAdded: validTrackUris.length,
      totalTracks: songs.length,
    };
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Spotify session expired. Please reconnect your account.');
    }
    throw new Error(error.response?.data?.error?.message || 'Error creating Spotify playlist');
  }
};