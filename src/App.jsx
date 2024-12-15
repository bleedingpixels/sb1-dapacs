import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlaylistManager } from './components/PlaylistManager';
import { SpotifyCallback } from './components/SpotifyCallback';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Routes>
            <Route path="/callback" element={<SpotifyCallback />} />
            <Route path="/" element={<PlaylistManager />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;