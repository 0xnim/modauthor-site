import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VersionMenu.css';

const VersionMenu = ({ versionId, modId }) => {
  const [version, setVersion] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('accessToken');
    
    // Fetch version details
    axios
      .get(`${apiUrl}/mods/${modId}/versions/${versionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setVersion(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    
    // Fetch files for the version
    axios
      .get(`${apiUrl}/mods/${modId}/versions/${versionId}/files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFiles(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [versionId]);

  function formatFileSize(size) {
    if (size < 1024) {
      return size + ' B';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' KB';
    } else if (size < 1024 * 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  const handleAddFile = () => {
    alert('Not implemented yet!');

  };
  

  return (
    <div className="version-menu">
      <h1 id="top">
        {modId} {version && version.versionNumber}
      </h1>

      <div className="version-sections">
        <div className="version-section">
          <h2>Files</h2>
          {files && (
            <ul style={{ listStyleType: 'none', padding:0}}>
              {files.map((file) => (
                <li key={file.id} style={{ listStyle: 'none', paddingLeft: 0, listStylePosition: 'inside' }}>
                  <p>Type: {capitalizeFirstLetter(file.fileType)} <br>
                  </br><a href={file.fileURL}>Download</a> {formatFileSize(file.fileSize)}<br></br>
                  Upload Date: {formatDate(file.uploadDate)}</p>
                </li>
              ))}
            </ul>
          )}
          <button>Add</button>
        </div>

        <div className="version-section">
          <h2>Dependencies</h2>
          {version && version.dependencies && (
            <ul>
              {version.dependencies.map((dependency) => (
                <li key={dependency.id}>
                  {dependency.modId} {dependency.versionNumber}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default VersionMenu;
