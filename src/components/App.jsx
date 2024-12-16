import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlaylistManager from './PlaylistManager/components/PlaylistManager';
import SpotifyCallback from './SpotifyCallback';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark 
                      text-content-light dark:text-content-dark transition-colors">
        <nav className="bg-surface-light dark:bg-surface-dark border-b border-accent-gray flex justify-between p-6 rounded-xl shadow-spotify">
          {/* Navigation Items */}
          <ThemeToggle />
        </nav>
        <main className="container mx-auto px-4 py-8">
          <BrowserRouter>
            <Routes>
              <Route path="/callback" element={<SpotifyCallback />} />
              <Route path="/" element={<PlaylistManager />} />
            </Routes>
          </BrowserRouter>
        </main>
        <footer className="footer mt-auto bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-spotify">
          {/* Footer Content */}
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;