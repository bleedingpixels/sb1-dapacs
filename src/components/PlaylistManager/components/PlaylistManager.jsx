import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlaylistManager } from './components/PlaylistManager';
import { SpotifyCallback } from './components/SpotifyCallback';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark 
                      text-content-light dark:text-content-dark transition-colors">
        <nav className="bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700">
          {/* ... */}
        </nav>
        <main className="container mx-auto px-4 py-8">
          <BrowserRouter>
            <Routes>
              <Route path="/callback" element={<SpotifyCallback />} />
              <Route path="/" element={<PlaylistManager />} />
            </Routes>
          </BrowserRouter>
        </main>
        <div className="playlist-item bg-surface-light dark:bg-surface-dark rounded-xl shadow-spotify p-6 mb-6">
          {/* Playlist Content */}
        </div>
        <div className="flex items-center justify-between p-2 bg-accent-gray dark:bg-surface-dark rounded-xl shadow-spotify gap-4">
          <div className="flex items-center gap-2">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-accent-green" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
            </svg>
            <div className="flex flex-col">
              <span>
                <span className="font-medium text-content-light">Windowlicker</span>
                <span className="text-accent-gray"> by </span>
                <span className="text-accent-gray">Aphex Twin</span>
              </span>
              <span className="text-sm text-accent-gray">Originally: windowlicker</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" className="text-accent-green" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
            </svg>
            <div className="flex flex-col">
              <span>
                <span className="font-medium text-accent-green">nirvana</span>
                <span className="text-accent-gray"> by </span>
                <span className="text-accent-gray"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

export const PlaylistManager = () => {
  return (
    <div className="playlist-manager">
      {/* ...existing playlist manager content... */}
      <div className="flex items-center justify-between p-2 bg-accent-gray dark:bg-surface-dark rounded-xl shadow-spotify gap-4">
        <div className="flex items-center gap-2">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-accent-green" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
          </svg>
          <div className="flex flex-col">
            <span>
              <span className="font-medium text-content-light">Windowlicker</span>
              <span className="text-accent-gray"> by </span>
              <span className="text-accent-gray">Aphex Twin</span>
            </span>
            <span className="text-sm text-accent-gray">Originally: windowlicker</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" className="text-accent-green" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
          </svg>
          <div className="flex flex-col">
            <span>
              <span className="font-medium text-accent-green">nirvana</span>
              <span className="text-accent-gray"> by </span>
              <span className="text-accent-gray"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};