import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

export const FileUpload = ({ onSongsUpload }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [pastedContent, setPastedContent] = useState('');
  const [activeMode, setActiveMode] = useState('upload'); // 'upload' or 'paste'

  const processCSVContent = async (content) => {
    setIsProcessing(true);
    setUploadStatus('Processing songs...');

    try {
      const songs = content
        .split('\n')
        .map(line => line.split(','))
        .filter(row => row.length >= 1 && row[0])
        .map(row => ({
          title: row[0]?.trim() || '',
          artist: row[1]?.trim() || undefined,
          album: row[2]?.trim() || undefined
        }))
        .filter(song => song.title);

      await onSongsUpload(songs);
    } finally {
      setIsProcessing(false);
      setUploadStatus('');
      setPastedContent('');
    }
  };

  const handlePasteSubmit = (e) => {
    e.preventDefault();
    if (pastedContent.trim()) {
      processCSVContent(pastedContent);
    }
  };

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
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveMode('upload')}
          className={`px-4 py-2 rounded ${
            activeMode === 'upload'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Upload File
        </button>
        <button
          onClick={() => setActiveMode('paste')}
          className={`px-4 py-2 rounded ${
            activeMode === 'paste'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Paste CSV
        </button>
      </div>

      {activeMode === 'upload' ? (
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
      ) : (
        <form onSubmit={handlePasteSubmit} className="space-y-4">
          <textarea
            value={pastedContent}
            onChange={(e) => setPastedContent(e.target.value)}
            placeholder={`Paste your CSV content here...\n\nExample format:\nSmells Like Teen Spirit,Nirvana,Nevermind\nStairway to Heaven,Led Zeppelin,Led Zeppelin IV\nBohemian Rhapsody,Queen,A Night at the Opera\n\nFormat: Title,Artist,Album (one song per line)`}
            className="w-full h-40 p-3 border rounded resize-none font-mono text-sm"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={!pastedContent.trim() || isProcessing}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Process CSV'}
          </button>
        </form>
      )}

      {isProcessing && (
        <div className="text-center text-sm text-gray-600">
          <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mb-2"/>
          <p>{uploadStatus}</p>
        </div>
      )}

    </div>
  );
};
