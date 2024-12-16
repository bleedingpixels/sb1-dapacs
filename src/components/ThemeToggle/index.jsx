import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-white hover:bg-gray-100
                 dark:bg-gray-800 dark:hover:bg-gray-700
                 text-content-light dark:text-content-dark
                 border border-gray-200 dark:border-gray-700
                 transition-all duration-200 ease-in-out"
      aria-label="Toggle theme"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
};