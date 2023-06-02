import "./VersionMenu.css";

import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

import AddFile from "./AddFile";

import AddDependency from "./AddDependency";

import EditDependency from "./EditDependency";

const VersionMenu = ({ versionId, modId, onCloseMenu }) => {
  const [version, setVersion] = useState(null);
  const [files, setFiles] = useState([]);
  const [fileAddOpen, setFileAddOpen] = useState(false);
  const [dependencies, setDependencies] = useState([]);
  const [dependencyAddOpen, setDependencyAddOpen] = useState(false);
  const [dependencyEditOpen, setDependencyEditOpen] = useState(false);
  const [reloadCurrent, setReloadCurrent] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("accessToken");

    // Fetch version details
    axios
      .get(`${apiUrl}/mods/${modId}/versions/${versionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setVersion(response.data);
        //console.log(response.data);
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
        //console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

      // Fetch dependencies for the version
      axios
      .get(`${apiUrl}/mods/${modId}/dependencies/${versionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDependencies(response.data);
        //console.log(response.data);
      }
      )
      .catch((error) => {
        console.error(error);
      }
      );


  }, [versionId, reloadCurrent]);

  function formatFileSize(size) {
    if (size < 1024) {
      return size + " B";
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + " KB";
    } else if (size < 1024 * 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + " MB";
    } else {
      return (size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleAddFile = () => {
    setFileAddOpen(true);
  };

  const handleDeleteFile = async (fileId) => {
    console.log("Deleting file with ID:", fileId);
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.delete(
        `${apiUrl}/mods/${modId}/versions/${versionId}/files/${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDependency = async (modId, versionId, dependencyId) => {
    console.log("Deleting dependency with ID:", dependencyId);
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.delete(
        `${apiUrl}/mods/${modId}/dependencies/${versionId}/${dependencyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseAddDependency = () => {
    setDependencyAddOpen(false);
  };

  const handleCloseEditDependency = () => {
    setDependencyEditOpen(false);
    setReloadCurrent(true);
  };

  const handleDeleteVersion = async (modId, versionId) => {
    console.log("Deleting version with ID:", versionId);
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.delete(
        `${apiUrl}/mods/${modId}/versions/${versionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };  
    

  return (
    <div className="version-menu">
      <h1 id="top">
        {modId} {version && version.versionNumber}
      </h1>

      <div className="version-sections" class="version-sections">
        <div className="version-section">
          <h2>Files</h2>
          {files && (
            <ul style={{ listStyleType: "none", padding: 0 }} class="ul-class">
              {files.map((file) => (
                <li
                  key={file.id}
                  style={{
                    listStyle: "none",
                    paddingLeft: 0,
                    listStylePosition: "inside",
                  }}
                >
                  <p>
                    Type: {capitalizeFirstLetter(file.fileType)} <br></br>
                    <a href={file.fileURL}>Download</a>{" "}
                    {formatFileSize(file.fileSize)}
                    <br></br>
                    Upload Date: {formatDate(file.uploadDate)}
                  </p>
                  <button onClick={() => handleDeleteFile(file.fileID)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleAddFile}>Add</button>
          {fileAddOpen && (
            <div className="file-add">
              <AddFile
                modId={modId}
                versionId={versionId}
                onCloseMenu={onCloseMenu}
              />
            </div>
          )}
        </div>

        <div className="version-section">
          <h2>Dependencies</h2>
          {version && dependencies && (
            <><ul class="ul-class" style={{ listStyleType: "none", padding: 0 }}>
              {dependencies.map((dependency) => (
                <li key={dependency.id}>
                  <p>{dependency.dependencyModID}<br></br>
                    {dependency.minimumDependencyVersion} - {dependency.maximumDependencyVersion}
                  </p>
                  <button onClick={() => setDependencyEditOpen(true)}>Edit</button> <br></br>
                  {dependencyEditOpen && (<EditDependency modId={modId} versionId={version.modVersionID} dependencyId={dependency.id} onCloseMenu={handleCloseEditDependency} />)}
                  <button onClick={() => handleDeleteDependency(modId, dependency.modVerisonId, dependency.id)}>Delete</button>
                </li>
              ))}
            </ul>
            <button onClick={() => setDependencyAddOpen(true)}>Add Dependency</button> <br></br>
            {dependencyAddOpen && (
              <div>
                <AddDependency versionId={version.modVersionID} modId={version.modId} onCloseMenu={handleCloseAddDependency}/>
              </div>
            )}
            </>
          )}
        </div>
        <div className="version-section">
          <button onClick={openDialog}>Delete</button>
          <dialog ref={dialogRef} className="delete">
            <h2>Delete</h2>
            <p>
              Are you sure you want to delete this version? This action cannot be undone.
            </p>
            <button onClick={() => handleDeleteVersion(modId, versionId)} class="confirm">Confirm</button>
            <button onClick={closeDialog}>Cancel</button>
          </dialog>
        </div>          
      </div>
      <button class="bottom" onClick={onCloseMenu}>
        Close
      </button>
    </div>
  );
};

export default VersionMenu;
