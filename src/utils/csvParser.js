import Papa from 'papaparse';

const detectColumns = (headers) => {
  const normalizedHeaders = headers.map(h => h.toLowerCase().trim());
  
  // Common variations of column names
  const titleVariations = ['title', 'song', 'track', 'name', 'song title', 'track name'];
  const artistVariations = ['artist', 'performer', 'singer', 'artist name'];

  const titleIndex = normalizedHeaders.findIndex(h => titleVariations.includes(h));
  const artistIndex = normalizedHeaders.findIndex(h => artistVariations.includes(h));

  // If headers are found, use them
  if (titleIndex !== -1 && artistIndex !== -1) {
    return { titleIndex, artistIndex, hasHeaders: true };
  }

  // If no headers found, analyze first row content
  return analyzeFirstRow(normalizedHeaders);
};

const analyzeFirstRow = (firstRow) => {
  // Heuristic: Check if the first column looks more like a title or an artist
  const isTitleFirst = firstRow.some(cell => 
    cell.includes(' - ') || // Common song title format
    cell.includes('feat.') || // Features are common in titles
    cell.includes('ft.') ||
    cell.match(/\([^)]*\)/) // Parentheses are common in titles
  );

  return {
    titleIndex: isTitleFirst ? 0 : 1,
    artistIndex: isTitleFirst ? 1 : 0,
    hasHeaders: false
  };
};

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        if (results.data.length < 2) {
          reject(new Error('CSV file is empty or invalid'));
          return;
        }

        try {
          const { titleIndex, artistIndex, hasHeaders } = detectColumns(results.data[0]);
          
          // Start from index 1 if headers were detected, otherwise from 0
          const startIndex = hasHeaders ? 1 : 0;
          
          const songs = results.data
            .slice(startIndex)
            .filter(row => row.length >= Math.max(titleIndex, artistIndex) + 1 &&
                          row[titleIndex]?.trim() &&
                          row[artistIndex]?.trim())
            .map(row => ({
              title: row[titleIndex].trim(),
              artist: row[artistIndex].trim()
            }));

          resolve(songs);
        } catch (error) {
          reject(new Error('Error processing CSV: ' + error.message));
        }
      },
      error: (error) => {
        reject(new Error('Error parsing CSV: ' + error.message));
      }
    });
  });
};