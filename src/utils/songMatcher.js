import Fuse from 'fuse.js';

// ...existing code...

const songs = [
  // Define your songs here
  { title: 'Song One', artist: 'Artist A' },
  { title: 'Song Two', artist: 'Artist B' },
  // ...existing songs...
];

const options = {
  keys: ['title', 'artist'],
  threshold: 0.3,
};

const fuse = new Fuse(songs, options);

function matchSong(query) {
  const results = fuse.search(query);
  return results.length > 0 ? results[0].item : null;
}

export { matchSong };

// ...existing code...
