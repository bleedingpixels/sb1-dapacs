import React from 'react';
import { PlatformSelector } from '../../PlatformSelector';

export function Header({ platform, onPlatformChange }) {
  return (
    <header className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Playlist Manager</h1>
      <PlatformSelector platform={platform} onPlatformChange={onPlatformChange} />
    </header>
  );
}