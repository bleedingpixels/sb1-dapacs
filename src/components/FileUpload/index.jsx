import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

export const FileUpload = ({ onSongsUpload }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const onDrop = useCallback(async acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      setIsProcessing(true);
      setUploadStatus('Reading CSV file...');

      Papa.parse(file, {
        complete: async (results) => {
          setUploadStatus('Processing songs...');
          const songs = results.data
            .filter(row => row.length >= 1 && row[0])
            .map(row => ({
              title: row[0]?.trim() || '',
              artist: row[1]?.trim() || undefined,
              album: row[2]?.trim() || undefined
            }))
            .filter(song => song.title);
          
          await onSongsUpload(songs);
          setIsProcessing(false);
          setUploadStatus('');
        },
        header: false,
        skipEmptyLines: true
      });
    }
  }, [onSongsUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'],
      'application/csv': ['.csv']
    },
    maxSize: 5242880, // 5MB
    multiple: false,
    preventDropOnDocument: true
  });

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} disabled={isProcessing} />
        {isProcessing ? (
          <div className="space-y-2">
            <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"/>
            <p className="text-blue-600">{uploadStatus}</p>
          </div>
        ) : isDragActive ? (
          <p className="text-blue-600">Drop the CSV file here...</p>
        ) : isDragReject ? (
          <p className="text-red-600">Only CSV files are accepted</p>
        ) : (
          <div>
            <p className="mb-2">Drag 'n' drop a CSV file here, or click to select one</p>
            <p className="text-sm text-gray-500">
              CSV should have columns: Title (required), Artist (optional), Album (optional)
            </p>
          </div>
        )}
      </div>
      {isProcessing && (
        <div className="text-center text-sm text-gray-600">
          Please wait while your songs are being processed...
        </div>
      )}
    </div>
  );
};
