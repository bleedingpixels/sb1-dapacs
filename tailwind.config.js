/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#1DB954', // Spotify Green
          200: '#1ED760', // Hover Green
          300: '#17a44a', // Added shade
          400: '#10b981', // Added shade
          500: '#059669', // Added shade
        },
        spotify: {
          base: '#191414',      // Spotify's main dark background
          surface: '#282828',   // Spotify's card background
          green: '#1DB954',     // Spotify's signature green
          lightGray: '#B3B3B3', // Spotify's text color
          darkGray: '#535353',  // Spotify's secondary text
          white: '#FFFFFF',     // Spotify's light mode
          hover: '#1ed760',     // Spotify's hover green
        },
        surface: {
          light: '#FFFFFF',     // Light mode background
          dark: '#191414',      // Dark mode background
        },
        content: {
          light: '#191414',     // Light mode text
          dark: '#FFFFFF',      // Dark mode text
        },
        accent: {
          green: '#1DB954',      // Spotify Green
          gray: '#2F4F4F',       // Dark Slate Gray
          lightGray: '#B3B3B3',  // Light gray for muted text
        },
        white: '#FFFFFF', // Maintain white for light mode
      },
      borderRadius: {
        'lg': '1rem',    // Increased border radius
        'xl': '1.5rem',
      },
      boxShadow: {
        'spotify': '0 4px 14px rgba(0, 0, 0, 0.25)',                    // Custom shadow
        'spotify-depressed': 'inset 0 4px 14px rgba(0, 0, 0, 0.25)',    // Depressed shadow for dark mode
        'custom': '0 4px 14px rgba(0, 0, 0, 0.25)',                      // Additional custom shadow
        'depressed': 'inset 0 4px 14px rgba(0, 0, 0, 0.25)',            // Additional depressed shadow
      },
    },
  },
  plugins: [],
}
