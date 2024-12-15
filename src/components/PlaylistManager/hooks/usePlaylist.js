import { useState } from 'react';
import { createSpotifyPlaylist } from '../../../utils/spotify';
import { createAppleMusicPlaylist } from '../../../utils/appleMusic';

export function usePlaylist() {
  const [songs, setSongs] = useState([]);
  const [platform, setPlatform] = useState('spotify');
  const [activeTab, setActiveTab] = useState('manual');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

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

    try {
      if (platform === 'spotify') {
        const accessToken = localStorage.getItem('spotifyAccessToken');
        if (!accessToken) {
          window.location.href = getSpotifyAuthUrl();
          return;
        }
        await createSpotifyPlaylist(accessToken, 'me', playlistName, songs);
      } else {
        const musicUserToken = localStorage.getItem('appleMusicUserToken');
        if (!musicUserToken) {
          setError('Please authenticate with Apple Music first');
          return;
        }
        await createAppleMusicPlaylist(musicUserToken, playlistName, songs);
      }
    } catch (err) {
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
    setPlatform,
    setActiveTab,
    handleAddSong,
    handleRemoveSong,
    handleSongsUpload,
    createPlaylist,
  };
}