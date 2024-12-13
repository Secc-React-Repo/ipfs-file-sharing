// src/FileUpload.js
import React, { useState } from 'react';

function FileUpload({ setFileLocation }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setFileLocation(data.fileUrl);
        setIsUploading(false);
      })
      .catch(error => {
        alert("Error uploading file.");
        console.error("Error uploading file:", error);
        setIsUploading(false);
      });
  };

  return (
    <div className="upload-container">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={isUploading} className="btn btn-primary">
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default FileUpload;
