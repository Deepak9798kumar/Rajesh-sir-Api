import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileLook() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={`http://localhost:5000/${file.url}`} target="_blank" rel="noopener noreferrer">
              {file.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileLook;