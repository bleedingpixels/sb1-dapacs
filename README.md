# Spotify Playlist Manager

A React application that helps you create and manage Spotify playlists using CSV imports and manual song entries.

## Features

- 🎵 Import songs from CSV files
- 🔄 Sync with Spotify
- 🌓 Dark/Light theme support
- 📱 Responsive design
- 🎯 Smart song matching with Spotify's catalog

## Prerequisites

- Node.js 16+ and npm
- A Spotify Developer account and application
  - Create one at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
  - Set the redirect URI to `http://localhost:5173/callback`

## Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/yourusername/playlist-manager.git
   cd playlist-manager
   npm install
   ```

2. **Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SPOTIFY_CLIENT_ID=your_client_id_here
   VITE_REDIRECT_URI=http://localhost:5173/callback
   ```

## Running the Application

1. **Start Development Server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:5173`

2. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

## Using the App

1. **Connect to Spotify**
   - Click "Connect with Spotify" button
   - Authorize the application

2. **Import Songs**
   - Upload a CSV file with columns: Title (required), Artist, Album
   - Or manually add songs using the form

3. **Create Playlist**
   - Review your song list
   - Click "Create Playlist" to sync with Spotify
   - The app will automatically match your songs with Spotify's catalog

## CSV Format

```csv
Title,Artist,Album
Bohemian Rhapsody,Queen,A Night at the Opera
Yesterday,The Beatles,Help!
```

## Troubleshooting

- **Song Not Found**: The app uses Spotify's search API to find matches. Try providing more accurate song details.
- **Auth Issues**: Make sure your Spotify Developer application settings match your environment configuration.
- **CSV Import Issues**: Verify your CSV follows the required format.

## Built With

- React + Vite
- Tailwind CSS
- Spotify Web API
- React Router
- Papa Parse (CSV parsing)

## License

MIT License - feel free to use and modify for your own projects.