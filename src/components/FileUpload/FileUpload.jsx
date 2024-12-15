import React, { useRef, useState } from 'react';
import { parseCSV } from '../../utils/csvParser';
import './FileUpload.css';

export function FileUpload({ onSongsLoaded }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setError('');
    
    if (file) {
      try {
        const songs = await parseCSV(file);
        if (songs.length === 0) {
          setError('No valid songs found in the CSV file');
        } else {
          onSongsLoaded(songs);
          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      } catch (error) {
        console.error('Error parsing CSV:', error);
        setError(error.message || 'Error parsing CSV file. Please check the format.');
      }
    }
  };

  return (
    <div className="file-upload">
      <div className="upload-container">
        <p className="upload-info">Upload a CSV file with song titles and artists</p>
        <p className="upload-format">
          Supported formats:
          <br />
          • Title,Artist
          <br />
          • Artist,Title
          <br />
          • With or without headers
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="file-input"
        />
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}