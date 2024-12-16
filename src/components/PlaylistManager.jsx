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
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
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
      </div>
    </ThemeProvider>
  );
}

export default App;