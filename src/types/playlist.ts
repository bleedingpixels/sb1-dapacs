export interface Song {
  title: string;
  artist: string;
  album?: string;
  duration?: string;
}

export interface Playlist {
  name: string;
  songs: Song[];
  platform: 'spotify' | 'apple';
}