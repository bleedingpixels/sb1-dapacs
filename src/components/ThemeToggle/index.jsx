import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-accent-gray dark:bg-accent-gray text-accent-green focus:outline-none"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        // Sun Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-11.66l-.707.707M5.05 6.34l-.707.707M21 12h-1M4 12H3m16.66 5.66l-.707-.707M5.05 17.66l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ) : (
        // Moon Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293a8 8 0 01-11.586-11.586 8.001 8.001 0 1011.586 11.586z" />
        </svg>
      )}
    </button>
  );
};