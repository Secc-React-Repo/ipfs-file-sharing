// src/App.js
import React, { useState } from 'react';
import FileUpload from './FileUpload';
import FileRetrieve from './FileRetrieve';
import './App.css';

function App() {
  const [fileLocation, setFileLocation] = useState('');

  return (
    <div className="app-container">
      <h2>IPFS File Sharing</h2>

      {/* Upload File */}
      <FileUpload setFileLocation={setFileLocation} />

      {/* Retrieve File */}
      <FileRetrieve fileLocation={fileLocation} />
    </div>
  );
}

export default App;
