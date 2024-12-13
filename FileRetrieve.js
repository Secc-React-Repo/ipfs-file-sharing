// src/FileRetrieve.js
import React from 'react';

function FileRetrieve({ fileLocation }) {
  const retrieveFile = () => {
    if (!fileLocation) return;
    window.open(fileLocation, '_blank'); // Open file in new tab
  };

  return (
    <div className="retrieve-container">
      {fileLocation && (
        <div>
          <p>File URL: <a href={fileLocation} target="_blank" rel="noopener noreferrer">{fileLocation}</a></p>
          <button onClick={retrieveFile} className="btn btn-primary">
            Retrieve File
          </button>
        </div>
      )}
    </div>
  );
}

export default FileRetrieve;
