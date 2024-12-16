import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

export const FileUpload = ({ onSongsUpload, accept = '.csv', maxSize = 5242880 }) => {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const songs = results.data
            .filter(row => row.length >= 1 && row[0]) // Filter out empty rows
            .map(row => ({
              title: row[0]?.trim() || '',
              artist: row[1]?.trim() || undefined,
              album: row[2]?.trim() || undefined
            }))
            .filter(song => song.title); // Only include songs with titles
          
          onSongsUpload(songs);
        },
        header: false,
        skipEmptyLines: true
      });
    }
  }, [onSongsUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxSize,
    multiple: false
  });

  return (
    <div 
      {...getRootProps()} 
      className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the CSV file here...</p>
      ) : (
        <div>
          <p className="mb-2">Drag 'n' drop a CSV file here, or click to select one</p>
          <p className="text-sm text-gray-500">
            CSV should have columns: Title, Artist (optional), Album (optional)
          </p>
        </div>
      )}
    </div>
  );
};
