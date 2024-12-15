import axios from 'axios';

const APPLE_MUSIC_API_URL = 'https://api.music.apple.com/v1';
const DEVELOPER_TOKEN = import.meta.env.VITE_APPLE_DEVELOPER_TOKEN;

export const createAppleMusicPlaylist = async (musicUserToken, playlistName, songs) => {
  try {
    // Create playlist
    const { data: playlist } = await axios.post(
      `${APPLE_MUSIC_API_URL}/me/library/playlists`,
      {
        attributes: {
          name: playlistName,
          description: 'Created with Playlist Manager',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${DEVELOPER_TOKEN}`,
          'Music-User-Token': musicUserToken,
        },
      }
    );

    // Search and add tracks
    const trackIds = await Promise.all(
      songs.map(async (song) => {
        const query = `${song.title} ${song.artist}`;
        const { data } = await axios.get(
          `${APPLE_MUSIC_API_URL}/catalog/us/search?term=${encodeURIComponent(query)}&types=songs&limit=1`,
          {
            headers: {
              Authorization: `Bearer ${DEVELOPER_TOKEN}`,
            },
          }
        );
        return data.results.songs.data[0]?.id;
      })
    );

    // Add tracks to playlist
    const validTrackIds = trackIds.filter(Boolean);
    if (validTrackIds.length > 0) {
      await axios.post(
        `${APPLE_MUSIC_API_URL}/me/library/playlists/${playlist.id}/tracks`,
        {
          data: validTrackIds.map(id => ({
            id,
            type: 'songs',
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${DEVELOPER_TOKEN}`,
            'Music-User-Token': musicUserToken,
          },
        }
      );
    }

    return playlist;
  } catch (error) {
    console.error('Error creating Apple Music playlist:', error);
    throw error;
  }
};