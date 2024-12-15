import { useState } from 'react';
import { createSpotifyPlaylist } from '../../../utils/spotify';
import { createAppleMusicPlaylist } from '../../../utils/appleMusic';
import { getSpotifyAuthUrl } from '../../../utils/spotify';

export function usePlaylist() {
  const [songs, setSongs] = useState([]);
  const [platform, setPlatform] = useState('spotify');
  const [activeTab, setActiveTab] = useState('manual');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [unmatchedSongs, setUnmatchedSongs] = useState([]);

  const handleAddSong = (newSong) => {
    setSongs([...songs, newSong]);
  };

  const handleRemoveSong = (index) => {
    setSongs(songs.filter((_, i) => i !== index));
  };

  const handleSongsUpload = (uploadedSongs) => {
    setSongs([...songs, ...uploadedSongs]);
  };

  const createPlaylist = async (playlistName) => {
    setIsCreating(true);
    setError(null);
    setUnmatchedSongs([]);

    try {
      if (platform === 'spotify') {
        const accessToken = localStorage.getItem('spotifyAccessToken');
        if (!accessToken) {
          window.location.href = getSpotifyAuthUrl();
          return;
        }
        const result = await createSpotifyPlaylist(accessToken, playlistName, songs);
        console.log('Playlist created successfully:', result);
        setUnmatchedSongs(result.unmatchedSongs);
      } else {
        const musicUserToken = localStorage.getItem('appleMusicUserToken');
        if (!musicUserToken) {
          setError('Please authenticate with Apple Music first');
          return;
        }
        const result = await createAppleMusicPlaylist(musicUserToken, playlistName, songs);
        console.log('Apple Music Playlist created successfully:', result);
        // Handle unmatched songs for Apple Music if applicable
      }
    } catch (err) {
      console.error('Error in createPlaylist:', err);
      setError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  return {
    songs,
    platform,
    activeTab,
    isCreating,
    error,
    unmatchedSongs,
    setPlatform,
    setActiveTab,
    handleAddSong,
    handleRemoveSong,
    handleSongsUpload,
    createPlaylist,
  };
}