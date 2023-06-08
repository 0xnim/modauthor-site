import axios from "axios";
import { useState } from "react";

const AddFile = ({ modId, versionId, onCloseMenu }) => {
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [ownURL, setOwnURL] = useState(false);
  const [fileData, setFileData] = useState();

  const apiUrl = process.env.REACT_APP_API_URL;
  const fileApiURL = process.env.REACT_APP_FILE_API_URL;


  
  const handleAddFile = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("accessToken");
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      if (!ownURL) {
        let fileSize = file.size;
        const response = await axios.post(
          `${fileApiURL}/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
          }
        );
        console.log(response.data);
        let path = response.data.uniqueId + "/" + response.data.filename;
        setFileURL(`https://cdn.astromods.xyz/content/${path}`);
  
        // Set the fileData state variable correctly
        const newFileData = {
          versionId,
          fileType,
          fileSize,
          fileURL: `https://cdn.astromods.xyz/content/${path}`,
        };
  
        // Make the API call with the correct fileData
        const response2 = await axios.post(
          `${apiUrl}/mods/${modId}/versions/${versionId}/files`,
          newFileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert(response2.data);
        onCloseMenu();
      } else {
        // Set the fileData state variable correctly
        const newFileData = {
          versionId,
          fileType,
          fileURL,
        };
  
        // Make the API call with the correct fileData
        const response2 = await axios.post(
          `${apiUrl}/mods/${modId}/versions/${versionId}/files`,
          newFileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert(response2.data);
        onCloseMenu();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="file-add">
      <form onSubmit={handleAddFile}>
        <div className="form-control" class="form-control">
          <label htmlFor="fileType">File Type</label>
          <select id="fileType" value={fileType} onChange={(e) => setFileType(e.target.value)} required>
              <option value="">Select a file type</option>
              <option value="mod">Mod/DLL</option>
              <option value="managed-zip">Managed Folder</option>
              <option value="managed-file">Managed File</option>
              <option value="pack">Part Pack</option>
              <option value="texture">Texture</option>
              <option value="mod-zip">Zip</option>
              <option value="plugin">Plugin</option>
              <option value="planet">Planet</option>
              {/* add more options as needed */}
          </select>
          {/* Let user upload file by reuqesting to ${fileApiURL}/upload */}
          <div>
            {!ownURL ? (
            <>
              <label htmlFor="fileUpload">File:</label>
              <input
                type="file"
                id="fileUpload"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </>) : (
            <>
              <label htmlFor="fileURL">File URL:</label>
              <input type="text" id="fileURL" value={fileURL} onChange={(e) => setFileURL(e.target.value)} required />
              <p>Add a github file link with a latest file version in the URL.</p>
            </>
            )}
          </div>

          {/* Button to add a field to insert your own link */}
          {!ownURL ? (
            <>
          <button type="button" onClick={() => setOwnURL(!ownURL)}>Set Own URL</button>
          </>) : (
            <>
          <button type="button" onClick={() => setOwnURL(!ownURL)}>Upload File</button>
          </>)}

          <button type="submit" className="btn btn-primary">
            Add File
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFile;
