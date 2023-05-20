import axios from "axios";
import { useState } from "react";

const AddFile = ({ modId, versionId, onCloseMenu }) => {
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;
  const fileApiURL = process.env.REACT_APP_FILE_API_URL;

  const handleAddFile = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append('file', file);

    // Create variable for fileSize and set it to the size of the file
    let fileSize = file.size;

    try {
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

      const fileData = {
        versionId,
        fileType,
        fileSize,
        fileURL: `https://cdn.astromods.xyz/content/${path}`,
      };

      const response2 = await axios.post(
        `${apiUrl}/mods/${modId}/versions/${versionId}/files`,
        fileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response2.data);
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
          {/* Let user upload file by reuqesting to ${fileApiURL}/upload */}

          <label htmlFor="fileUpload">File:</label>
          <input
            type="file"
            id="fileUpload"
            onChange={(e) => setFile(e.target.files[0])}
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