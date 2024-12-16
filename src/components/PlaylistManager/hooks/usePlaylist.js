import { useState } from 'react';
import { createSpotifyPlaylist, findSpotifyMatch } from '../../../utils/spotify';
import { createAppleMusicPlaylist } from '../../../utils/appleMusic';
import { getSpotifyAuthUrl } from '../../../utils/spotify';

export function usePlaylist() {
  const [songs, setSongs] = useState([]);
  const [matchedSongs, setMatchedSongs] = useState([]);
  const [platform, setPlatform] = useState('spotify');
  const [activeTab, setActiveTab] = useState('manual');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [unmatchedSongs, setUnmatchedSongs] = useState([]);

  const clearSongs = () => {
    setMatchedSongs([]);
    setUnmatchedSongs([]);
    setError(null);
  };

  const matchSong = async (song) => {
    try {
      const accessToken = localStorage.getItem('spotifyAccessToken');
      if (!accessToken) {
        setError('Please connect to Spotify first');
        return null;
      }
      
      const matchResult = await findSpotifyMatch(accessToken, song);
      if (!matchResult.matched) {
        setUnmatchedSongs(prev => [...prev, song]);
      }
      return matchResult;
    } catch (error) {
      console.error('Error matching song:', error);
      return { matched: false, original: song };
    }
  };

  const handleAddSong = async (song) => {
    if (!song.title) return;
    
    const matchResult = await matchSong(song);
    if (matchResult) {
      setMatchedSongs(prev => [...prev, matchResult]);
      // Remove setSongs since we're now using matchedSongs directly
    }
  };

  const handleRemoveSong = (index) => {
    setMatchedSongs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSongsUpload = async (uploadedSongs) => {
    if (!Array.isArray(uploadedSongs) || uploadedSongs.length === 0) {
      setError('No valid songs found in the CSV file');
      return;
    }

    const results = [];
    for (const song of uploadedSongs) {
      if (!song.title) continue;
      const matchResult = await matchSong(song);
      if (matchResult) {
        results.push(matchResult);
      }
    }
    
    setMatchedSongs(prev => [...prev, ...results]);
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
        const result = await createSpotifyPlaylist(accessToken, playlistName, matchedSongs);
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
    // Transform matched songs for display
    songs: matchedSongs.map(song => ({
      title: song.matched ? song.matchedTitle : song.original.title,
      artist: song.matched ? song.matchedArtist : song.original.artist,
      matched: song.matched,
      spotifyUri: song.spotifyUri,
      originalTitle: song.original.title,
      originalArtist: song.original.artist
    })),
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
    clearSongs,
  };
}