import axios from "axios";
import { useEffect } from "react";
import React, { useState } from "react";

// POST /mods/:modId/versions/:versionId/files - Add a file to a version
// versionId, fileType, fileSize, fileURL
const AddFile = ({ modId, versionId, onCloseMenu }) => {
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileURL, setFileURL] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleAddFile = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `${apiUrl}/mods/${modId}/versions/${versionId}/files`,
        {
          versionId,
          fileType,
          fileSize,
          fileURL,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
      onCloseMenu();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="file-add">
      <form onSubmit={handleAddFile}>
        <div className="form-control" class="form-control">
        <label htmlFor="fileType">File Type</label>
        <select id="fileType" value={fileType} onChange={(e) => setFileType(e.target.value)}>
            <option value="">Select a file type</option>
            <option value="mod">Mod/DLL</option>
            <option value="pack">Part Pack</option>
            <option value="texture">Texture</option>
            <option value="mod-zip">Zip</option>
            <option value="plugin">Plugin</option>
            {/* add more options as needed */}
        </select>

          <label htmlFor="fileSize">File Size</label>
          <input
            type="text"
            id="fileSize"
            value={fileSize}
            onChange={(e) => setFileSize(e.target.value)}
            required
          />
          <label htmlFor="fileURL">File URL</label>
          <input
            type="text"
            id="fileURL"
            value={fileURL}
            onChange={(e) => setFileURL(e.target.value)}
            required
          />
          <button className="btn btn-primary">
            Add File
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFile;
