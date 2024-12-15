import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaSpotify } from 'react-icons/fa';

export function CreatePlaylistButton({ 
  platform, 
  onCreatePlaylist, 
  isCreating, 
  error,
  isAuthenticated 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCreatePlaylist(playlistName);
      setIsOpen(false);
      setSuccessMessage('Playlist created successfully!');
      setErrorMessage('');
    } catch (err) {
      setErrorMessage('Failed to create playlist. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-yellow-700 mb-2">Connect your Spotify account to create playlists</p>
      </div>
    );
  }

  return (
    <>
      {successMessage && (
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-700 mb-2">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-700 mb-2">{errorMessage}</p>
        </div>
      )}

      <button
        onClick={() => setIsOpen(true)}
        disabled={isCreating}
        className="w-full mt-4 flex items-center justify-center space-x-2 py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
      >
        <FaSpotify className="text-xl" />
        <span>Create Spotify Playlist</span>
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
            <Dialog.Title className="text-lg font-medium mb-4">
              Create New Playlist
            </Dialog.Title>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Playlist name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                disabled={isCreating}
              />

              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create Playlist'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}