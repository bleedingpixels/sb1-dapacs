import { matchSong } from '../utils/songMatcher';

// ...existing code...

function handleSearch(query, setResult) {
  const song = matchSong(query);
  if (song) {
    setResult(song);
  } else {
    setResult(null);
  }
}

// ...existing code...