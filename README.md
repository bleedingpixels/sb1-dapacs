# Playlist Manager

## Description

Playlist Manager is a React-based application designed to help users manage their music playlists efficiently. With features like CSV import, Spotify integration, theme toggling, and responsive design, it offers a seamless experience for organizing and enjoying your favorite tracks.

## Features

- **CSV Import**: Import songs using a CSV file with the required and optional fields.
- **Spotify Integration**: Connect your Spotify account to synchronize and manage playlists directly.
- **Theme Toggle**: Switch between light and dark modes to suit your preference.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Interactive UI**: Enjoy smooth transitions and a user-friendly interface.

## Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/yourusername/playlist-manager.git
   cd playlist-manager
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

## Running the Project

1. **Start the Development Server**

   ```sh
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:3000` to view the application.

2. **Build for Production**

   ```sh
   npm run build
   ```

3. **Preview the Production Build**

   ```sh
   npm run preview
   ```

## Usage

- **Connecting to Spotify**

  1. Click on the "Connect to Spotify" button in the navigation bar.
  2. Authenticate with your Spotify account.
  3. Grant the necessary permissions to allow the app to access your playlists.

- **Importing Songs**

  Upload a CSV file with the format: Title (required), Artist (optional), Album (optional) to add songs to your playlist.

- **Managing Playlist**

  Add, remove, and organize your songs within the playlist manager interface.

- **Theme Toggling**

  Use the theme toggle button to switch between light and dark modes.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Vite**: Fast development build tool.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **PostCSS**: Tool for transforming CSS with JavaScript.
- **React Router**: Client-side routing for React applications.
- **Papaparse**: Fast and powerful CSV parser for JavaScript.
- **Spotify API**: Integration with Spotify for playlist management.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
