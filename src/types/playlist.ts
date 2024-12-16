export interface Song {
  title: string;
  artist?: string; // Made artist optional
  album?: string;
  duration?: string;
}

export interface Playlist {
  name: string;
  songs: Song[];
  platform: 'spotify' /* | 'apple' */; // Temporarily disabled Apple Music
}